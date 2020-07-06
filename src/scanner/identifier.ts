import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { toHex, fromCodePoint } from './common';
import { Token, descKeywordTable } from '../token';
import { CharTypes, CharFlags, isIdentifierPart } from './charClassifier';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { unicodeLookup } from './unicode';

export function scanIdentifier(parser: ParserState, context: Context, source: string): Token {
  const start = parser.index;
  let char;

  do {
    char = source.charCodeAt(++parser.index);
  } while (CharTypes[char] & CharFlags.IdentifierPart);

  parser.tokenValue = source.slice(start, parser.index);

  if (char > Chars.UpperZ) return scanIdentifierSlowPath(parser, context, source);

  return Token.Identifier;
}

export function scanKeywordOrIdentifier(parser: ParserState, context: Context, source: string): Token {
  const start = parser.index;
  let char;

  do {
    char = source.charCodeAt(++parser.index);
  } while (CharTypes[char] & CharFlags.IdentifierPart);

  parser.tokenValue = source.slice(start, parser.index);

  if (char > Chars.UpperZ) return scanIdentifierSlowPath(parser, context, source);

  const token: Token | undefined = descKeywordTable.get(parser.tokenValue);

  return token === void 0 ? Token.Identifier : token;
}

export function scanIdentifierSlowPath(parser: ParserState, context: Context, source: string): Token {
  let start = parser.index;
  let ch = source.charCodeAt(parser.index);
  let code: number | null = null;

  do {
    if (isIdentifierPart(ch)) {
      parser.index++;
    } else if (ch === Chars.Backslash) {
      parser.tokenValue += source.slice(start, parser.index);
      code = scanIdentifierEscape(parser, context, source);
      // We intentionally check for '-1' so we can break out of the loop
      // if we have encountered an error, and avoid double diagnostics
      if (code < 0) break;
      parser.tokenValue += fromCodePoint(code);
      start = parser.index;
    } else {
      // Check for lead surrogate (U+d800..U+dbff)
      if ((ch & 0xfffffc00) !== 0xd800) break;
      parser.index++;
      const trail = source.charCodeAt(parser.index);
      // trail surrogate (U+dc00..U+dfff)
      if ((trail & 0xfffffc00) === 0xdc00) {
        ch = ((ch & 0x3ff) << 10) + (trail & 0x3ff) + 0x10000;
        // Check if this is a valid surrogate pair
        if (!isIdentifierPart(ch)) {
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

    ch = source.charCodeAt(parser.index);
  } while (parser.index < parser.length);

  parser.tokenValue += source.slice(start, parser.index);

  const length = parser.tokenValue.length;

  // All keywords are of length 2 ≥ length ≥ 10, and in range 0x97 - 0x122 so we optimize for that.
  if (length >= 2 && length <= 11) {
    const token: Token | undefined = descKeywordTable.get(parser.tokenValue);

    if (token !== void 0) {
      return token;
      // TODO: Fix escaped keywords
    }
  }

  return Token.Identifier;
}

export function scanIdentifierEscape(parser: ParserState, context: Context, source: string): number {
  if (source.charCodeAt(parser.index + 1) !== Chars.LowerU) {
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

  let char = source.charCodeAt(parser.index);

  // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
  // hex digits between { } is arbitrary. \ and u have already been scanned.
  if (char === Chars.LeftBrace) {
    parser.index++; // skips '{'

    char = source.charCodeAt(parser.index);

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

    do {
      code = (code << 4) | digit;
      if (code > Chars.LastUnicodeChar) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnicodeOverflow, DiagnosticKind.Error);
        return -1;
      }
      digit = toHex((char = source.charCodeAt(++parser.index)));
    } while (digit >= 0);

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
    const digit = toHex(char);

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
    char = source.charCodeAt(++parser.index);
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

export function scanIdentifierEscapeIdStart(parser: ParserState, context: Context, source: string): Token {
  const cookedChar = scanIdentifierEscape(parser, context, source);
  if (cookedChar > 0) {
    parser.tokenValue = fromCodePoint(cookedChar);
    return scanIdentifierSlowPath(parser, context, source);
  }
  if (source.charCodeAt(parser.index) === Chars.Backslash) parser.index++;
  parser.tokenValue = fromCodePoint(cookedChar);
  return Token.Identifier;
}

export function scanPrivateName(parser: ParserState, context: Context, source: string, ch: number): Token | any {
  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidCharacter, DiagnosticKind.Error, '#');

  if (((unicodeLookup[(ch >>> 5) + 34816] >>> ch) & 31 & 1) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    return Token.Unknown;
  }

  while ((CharTypes[ch] & 0b00000000000000000000000000000101) > 0) {
    ch = source.charCodeAt(++parser.index);
  }

  return Token.PrivateName;
}
