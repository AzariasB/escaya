import { Context, ParserState } from '../common';
import { isIdentifierPart, fromCodePoint, toHex } from './common';
import { addLexerDiagnostic } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { unicodeLookup } from './unicode';
import { Token } from './../ast/token';
import { AsciiCharTypes, AsciiCharFlags } from './asciiChar';
import { Char } from './char';

export const descKeywordTable = new Map<string, Token>();

const kwdObj: { [key: string]: Token } = {
  this: Token.ThisKeyword,
  function: Token.FunctionKeyword,
  if: Token.IfKeyword,
  return: Token.ReturnKeyword,
  var: Token.VarKeyword,
  else: Token.ElseKeyword,
  for: Token.ForKeyword,
  new: Token.NewKeyword,
  in: Token.InKeyword,
  typeof: Token.TypeofKeyword,
  while: Token.WhileKeyword,
  case: Token.CaseKeyword,
  break: Token.BreakKeyword,
  try: Token.TryKeyword,
  catch: Token.CatchKeyword,
  delete: Token.DeleteKeyword,
  throw: Token.ThrowKeyword,
  switch: Token.SwitchKeyword,
  continue: Token.ContinueKeyword,
  default: Token.DefaultKeyword,
  instanceof: Token.InstanceofKeyword,
  do: Token.DoKeyword,
  void: Token.VoidKeyword,
  finally: Token.FinallyKeyword,
  async: Token.AsyncKeyword,
  await: Token.AwaitKeyword,
  class: Token.ClassKeyword,
  const: Token.ConstKeyword,
  constructor: Token.ConstructorKeyword,
  debugger: Token.DebuggerKeyword,
  export: Token.ExportKeyword,
  extends: Token.ExtendsKeyword,
  false: Token.FalseKeyword,
  from: Token.FromKeyword,
  get: Token.GetKeyword,
  implements: Token.ImplementsKeyword,
  import: Token.ImportKeyword,
  interface: Token.InterfaceKeyword,
  let: Token.LetKeyword,
  null: Token.NullKeyword,
  of: Token.OfKeyword,
  package: Token.PackageKeyword,
  private: Token.PrivateKeyword,
  protected: Token.ProtectedKeyword,
  public: Token.PublicKeyword,
  set: Token.SetKeyword,
  static: Token.StaticKeyword,
  super: Token.SuperKeyword,
  true: Token.TrueKeyword,
  with: Token.WithKeyword,
  yield: Token.YieldKeyword,
  as: Token.AsKeyword,
  enum: Token.EnumKeyword,
  target: Token.TargetIdentifier,
  meta: Token.MetaIdentifier
};
for (const key in kwdObj) {
  if (Object.prototype.hasOwnProperty.call(kwdObj, key)) {
    descKeywordTable.set(key, kwdObj[key]);
  }
}
export function scanIdentifier(state: ParserState, context: Context): Token {
  const start = state.index;
  let cp = state.source.charCodeAt(state.index);
  while (AsciiCharTypes[cp] & AsciiCharFlags.IsIdentifierPart) {
    cp = state.source.charCodeAt(++state.index);
  }

  state.tokenValue = state.source.slice(start, state.index);

  if (cp > Char.UpperZ) return scanIdentifierSlowPath(state, context);

  return Token.Identifier;
}

export function scanKeywordOrIdentifier(state: ParserState, context: Context): Token {
  const start = state.index;
  let cp = state.source.charCodeAt(state.index);
  while (AsciiCharTypes[cp] & AsciiCharFlags.IsIdentifierPart) {
    cp = state.source.charCodeAt(++state.index);
  }

  state.tokenValue = state.source.slice(start, state.index);

  if (cp > Char.UpperZ) return scanIdentifierSlowPath(state, context);

  // Reserved words are between 2 and 11 characters long and start with a lowercase letter
  const len = state.tokenValue.length;
  if (len >= 2 && len <= 11) {
    const token: Token | undefined = descKeywordTable.get(state.tokenValue);
    return token === void 0 ? Token.Identifier : token;
  }
  return Token.Identifier;
}

export function scanIdentifierSlowPath(state: ParserState, context: Context): Token {
  let start = state.index;
  const source = state.source;
  let cp = source.charCodeAt(state.index);
  let code: number | null = null;

  do {
    if (isIdentifierPart(cp)) {
      state.index++;
    } else if (cp === Char.Backslash) {
      state.tokenValue += source.slice(start, state.index);
      code = scanIdentifierEscape(state, context);
      // We intentionally check for '-1' so we can break out of the loop
      // if we have encountered an error, and avoid double diagnostics
      if (code < 0) break;
      state.tokenValue += fromCodePoint(code);
      start = state.index;
    } else {
      // Check for lead surrogate (U+d800..U+dbff)
      if ((cp & 0xfffffc00) !== 0xd800) break;
      state.index++;
      const trail = source.charCodeAt(state.index);
      // trail surrogate (U+dc00..U+dfff)
      if ((trail & 0xfffffc00) === 0xdc00) {
        // https://tc39.es/ecma262/#sec-utf16decodesurrogatepair
        cp = ((cp & 0x3ff) << 10) + (trail & 0x3ff) + 0x10000;
        // Check if this is a valid surrogate pair
        if (!isIdentifierPart(cp)) {
          addLexerDiagnostic(
            state,
            context,
            start,
            state.index,
            DiagnosticCode.InvalidAstralCharacter,
            fromCodePoint(cp)
          );
        }
        state.index++;
      }
    }

    cp = source.charCodeAt(state.index);
  } while (state.index < state.length);

  state.tokenValue += source.slice(start, state.index);

  const length = state.tokenValue.length;

  // All keywords are of length 2 ≥ length ≥ 10, and in range 0x97 - 0x122 so we optimize for that.
  if (length >= 2 && length <= 11) {
    const token: Token | undefined = descKeywordTable.get(state.tokenValue);

    if (token !== void 0) {
      return token;
      // TODO: Fix escaped keywords
    }
  }

  return Token.Identifier;
}

export function scanIdentifierEscape(state: ParserState, context: Context): number {
  let index = state.index;

  const start = index;

  if (state.source.charCodeAt(index + 1) !== Char.LowerU) {
    addLexerDiagnostic(state, context, start, index, DiagnosticCode.InvalidUnicodeEscapeSequence);
    return -1;
  }

  index += 2; // skips '\\', 'u'

  let cp = state.source.charCodeAt(index);

  // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
  // hex digits between { } is arbitrary. \ and u have already been scanned.
  if (cp === Char.LeftBrace) {
    index++; // skips '{'

    let digit = toHex(state.source.charCodeAt(index));

    let code = 0;

    while (digit >= 0) {
      code = (code << 4) | digit;
      if (code > Char.LastUnicodeChar) {
        addLexerDiagnostic(state, context, start, index, DiagnosticCode.UnicodeOverflow);
        return -1;
      }

      cp = state.source.charCodeAt(++index);

      digit = toHex(cp);
    }

    // At least 4 characters have to be read
    if (0 < digit || cp !== Char.RightBrace) {
      // For cases like 'x\u{0 foo' where '}' is missing, the opening '{'
      // should be treated as an 'BlockStatement', so we return without
      // setting the new index value
      addLexerDiagnostic(state, context, start, index, DiagnosticCode.InvalidHexEscapeSequence);
      return -1;
    }

    state.index = index + 1; // consumes '}'

    return code;
  }

  // \uNNNN

  let code = 0;

  for (let i = 0; i < 4; i++) {
    const digit = toHex(cp);

    if (digit < 0) {
      addLexerDiagnostic(state, context, start, index, DiagnosticCode.InvalidHexEscapeSequence);
      return -1;
    }
    code = (code << 4) | digit;
    cp = state.source.charCodeAt(++index);
  }

  // Check if this is a valid unicode escape sequence
  if (!isIdentifierPart(code)) {
    addLexerDiagnostic(state, context, start, index, DiagnosticCode.InvalidHexEscapeSequence);
    return -1;
  }

  state.index = index;

  return code;
}

export function scanIdentifierEscapeIdStart(state: ParserState, context: Context): Token {
  const cookedCP = scanIdentifierEscape(state, context);
  if (cookedCP > 0) {
    state.tokenValue = fromCodePoint(cookedCP);
    return scanIdentifierSlowPath(state, context);
  }
  if (state.source.charCodeAt(state.index) === Char.Backslash) state.index++;
  state.tokenValue = fromCodePoint(cookedCP);
  return Token.Identifier;
}

export function scanMaybeIdentifier(state: ParserState, context: Context) {
  const cp = state.source.charCodeAt(state.index);
  // IdentifierContinue
  if ((unicodeLookup[(cp >>> 5) + 34816] >>> cp) & 31 & 1) {
    return scanIdentifierSlowPath(state, context);
  }

  // lead surrogate (U+d800..U+dbff)
  if ((cp & 0xfffffc00) === 0xd800) {
    // trail surrogate (U+dc00..U+dfff)
    if ((state.source.charCodeAt(state.index + 1) & 0xfffffc00) !== 0xdc00) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Lexer,
        DiagnosticCode.InvalidTrailSurrogate,
        DiagnosticKind.Error,
        fromCodePoint(cp)
      );
    }

    return scanIdentifierSlowPath(state, context);
  }

  addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidCharacter, DiagnosticKind.Error);
  // Increment the index so we can stay on track and avoid infinity loops
  state.index++;
  return Token.Unknown;
}
