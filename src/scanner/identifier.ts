import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { toHex, fromCodePoint } from './common';
import { Token, descKeywordTable } from '../token';
import { CharTypes, isIdentifierPart } from './charClassifier';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { unicodeLookup } from './unicode';

export function scanIdentifier(parser: ParserState, context: Context): Token {
  const start = parser.index;
  let char = parser.source.charCodeAt(parser.index);

  while ((CharTypes[char] & 0b00000000000000000000000000000101) > 0) {
    char = parser.source.charCodeAt(++parser.index);
  }

  const value = parser.source.slice(start, parser.index);

  if (char > Chars.UpperZ) return scanIdentifierSlowPath(parser, context, value, 1);

  parser.tokenValue = value;

  const token: Token | undefined = descKeywordTable[value];

  return token === void 0 ? Token.Identifier : token;
}

export function scanIdentifierSlowPath(
  parser: ParserState,
  context: Context,
  value: string,
  maybeKeyword: 0 | 1
): Token {
  let start = parser.index;
  let ch = parser.source.charCodeAt(parser.index);
  let code: number | null = null;

  while (parser.index < parser.length) {
    if ((ch & 0xfc00) !== 0xd800) {
      if (isIdentifierPart(ch)) {
        parser.index++;
      } else if (ch === Chars.Backslash) {
        value += parser.source.slice(start, parser.index);
        code = scanIdentifierEscape(parser, context);
        // We intentionally check for '-1' so we can break out of the loop
        // if we have encountered an error, and avoid double diagnostics
        if (code < 0) break;
        maybeKeyword = 1;
        value += fromCodePoint(code);
        start = parser.index;
      } else {
        break;
      }
    } else {
      parser.index++;
      // lower surrogate
      const low = parser.source.charCodeAt(parser.index);
      // high surrogate and there is a next code unit
      if ((low & 0xfc00) === 0xdc00) {
        ch = ((ch & 0x3ff) << 10) + (low & 0x3ff) + 0x10000;
        // Check if this is a valid surrogate pair
        if (((unicodeLookup[(ch >>> 5) + 0] >>> ch) & 31 & 1) === 0) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidAstralCharacter,
            DiagnosticKind.Error,
            fromCodePoint(ch)
          );
        }
        parser.index++;
      }
    }
    ch = parser.source.charCodeAt(parser.index);
  }

  value += parser.source.slice(start, parser.index);

  const length = value.length;

  parser.tokenValue = value;

  // All keywords are of length 2 ≥ length ≥ 10, and in range 0x97 - 0x122 so we optimize for that.
  if (maybeKeyword && length >= 2 && length <= 11) {
    const token: Token | undefined = descKeywordTable[parser.tokenValue];

    if (token !== void 0) {
      return token;
      // TODO: Fix escaped keywords
    }
  }

  return Token.Identifier;
}

export function scanIdentifierEscape(parser: ParserState, context: Context): number {
  if (parser.source.charCodeAt(parser.index + 1) !== Chars.LowerU) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Lexer,
      DiagnosticCode.InvalidUnicodeEscapeSequence,
      DiagnosticKind.Error
    );
    // We intentionally return '-1' here so we can return more
    // "human friendly" diagnostic messages.
    //
    // Example 'x\\u{0 foo' will be parsed as 2x 'IdentifierReference', where
    // the former returns 'Invalid hexadecimal escape sequence' at pos 0, 5, and
    // the latter will return "Unexpected token 'identifier'" at pos 5, 9.
    return -1;
  }

  parser.index += 2; // skips '\\', 'u'

  let char = parser.source.charCodeAt(parser.index);

  // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
  // hex digits between { } is arbitrary. \ and u have already been scanned.
  if (char === Chars.LeftBrace) {
    parser.index++; // skips '{'

    char = parser.source.charCodeAt(parser.index);

    let digit = toHex(char);

    if (digit < 0) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Lexer,
        DiagnosticCode.InvalidHexEscapeSequence,
        DiagnosticKind.Error
      );

      return -1;
    }

    let code = 0;

    while (digit >= 0) {
      code = (code << 4) | digit;
      if (code > Chars.LastUnicodeChar) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnicodeOverflow, DiagnosticKind.Error);
        return -1;
      }
      digit = toHex((char = parser.source.charCodeAt(++parser.index)));
    }

    // At least 4 characters have to be read
    if (0 < digit || char !== Chars.RightBrace) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Lexer,
        DiagnosticCode.InvalidHexEscapeSequence,
        DiagnosticKind.Error
      );

      return -1;
    }
    parser.index++; // consumes '}'

    return code;
  }

  // \uNNNN

  let code = 0;

  for (let i = 0; i < 4; i++) {
    let digit = toHex(char);

    if (digit < 0) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Lexer,
        DiagnosticCode.InvalidHexEscapeSequence,
        DiagnosticKind.Error
      );
      return -1;
    }
    code = (code << 4) | digit;
    char = parser.source.charCodeAt(++parser.index);
  }

  // Check if this is a valid unicode escape sequence
  if (!isIdentifierPart(code)) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Lexer,
      DiagnosticCode.InvalidUnicodeEscapeSequence,
      DiagnosticKind.Error
    );
    return -1;
  }
  return code;
}

export function scanIdentifierEscapeIdStart(parser: ParserState, context: Context): Token {
  const cookedChar = scanIdentifierEscape(parser, context);
  if (cookedChar > 0) {
    return scanIdentifierSlowPath(parser, context, fromCodePoint(cookedChar), /* maybeKeyword */ 1);
  }
  if (parser.source.charCodeAt(parser.index) === Chars.Backslash) parser.index++;
  parser.tokenValue = fromCodePoint(cookedChar);
  return Token.Identifier;
}

// TODO: Uncomment this as soon as class fields reach stage 4

export function scanPrivateName(parser: ParserState, ch: number): Token | any {
  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidCharacter, DiagnosticKind.Error, '#');

  if (((unicodeLookup[(ch >>> 5) + 34816] >>> ch) & 31 & 1) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    return Token.Unknown;
  }

  while ((CharTypes[ch] & 0b00000000000000000000000000000101) > 0) {
    ch = parser.source.charCodeAt(++parser.index);
  }

  return Token.PrivateName;
}
