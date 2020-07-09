import { ParserState, Context } from '../common';
import { fromCodePoint, toHex } from './common';
import { Token } from '../token';
import { Chars } from './chars';
import { DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostic/enums';
import { addDiagnostic } from '../diagnostic/diagnostics';
import { unicodeLookup } from './unicode';
import { escapeChars } from './tables';
import { CharTypes, CharFlags } from './charClassifier';

/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
export function scanTemplateSpan(parser: ParserState, context: Context, source: string): Token {
  parser.index++;

  let ret: string | null = '';
  let lastIsCR = 0;
  const start = parser.index;
  let ch = source.charCodeAt(parser.index);

  while (parser.index < parser.length) {
    // '`'
    if (ch === Chars.Backtick) {
      parser.tokenValue = ret;
      parser.index++; // skips '`'
      parser.tokenRaw = source.slice(start, parser.index - 1);
      return Token.TemplateTail;
    }

    // '${'
    if (ch === Chars.Dollar) {
      const index = parser.index + 1;
      if (index < parser.length && source.charCodeAt(index) === Chars.LeftBrace) {
        parser.index = index + 1; // Consume '$', '{'
        parser.tokenValue = ret;
        parser.tokenRaw = source.slice(start, parser.index - 2);
        return Token.TemplateCont;
      }
      ret += '$';
    }

    // Escape character
    if (ch === Chars.Backslash) {
      parser.index++;
      const ch = source.charCodeAt(parser.index);
      // The TV of LineContinuation :: \ LineTerminatorSequence is the empty
      // code unit sequence.
      if ((unicodeLookup[(ch >>> 5) + 69632] >>> ch) & 31 & 1) {
        if (ch === Chars.CarriageReturn) {
          parser.index++;
          if (source.charCodeAt(parser.index) === Chars.LineFeed) {
            parser.index++;
          }
        }
        parser.columnOffset = parser.index;
        parser.line++;
      } else {
        const code = parseTemplateEscape(parser, context, source, ch);
        // Invalid escape sequence checking is handled in the parser
        ret = code < 0 ? null : (ret as string) + code;
      }
    } else {
      parser.index++;
      // Fast check for characters that require special handling.
      // Catches 0, \n, \r, 0x2028, and 0x2029 as efficiently
      // as possible, and lets through all common ASCII characters
      if ((ch - 0xe) & 0x2000) {
        // The TRV of LineTerminatorSequence :: <CR> is the CV 0x000A.
        // The TRV of LineTerminatorSequence :: <CR><LF> is the sequence
        // consisting of the CV 0x000A.
        if (ch === Chars.CarriageReturn) {
          lastIsCR = 1;
          parser.line++;
          parser.columnOffset = parser.index;
        } else if (ch === Chars.LineFeed || (ch ^ Chars.LineSeparator) <= 1) {
          if (lastIsCR === 1) parser.line++;
          parser.columnOffset = parser.index;
          lastIsCR = 0;
        }
      }
      if (ret != null) ret += fromCodePoint(ch);
    }
    ch = source.charCodeAt(parser.index);
  }

  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedTemplate, DiagnosticKind.Error);

  parser.tokenValue = ret;

  return Token.TemplateTail;
}

export function parseTemplateEscape(
  parser: ParserState,
  context: Context,
  source: string,
  ch: number
): string | number {
  parser.index++;
  switch (escapeChars[ch]) {
    case Chars.LowerB:
      return '\b';
    case Chars.LowerT:
      return '\t';
    case Chars.LowerN:
      return '\n';
    case Chars.LowerV:
      return '\v';
    case Chars.LowerF:
      return '\f';
    case Chars.LowerR:
      return '\r';

    // ASCII escapes
    case Chars.LowerX: {
      const first = source.charCodeAt(parser.index);
      if (
        (CharTypes[first] & CharFlags.Hex) === 0 ||
        (CharTypes[source.charCodeAt(parser.index + 1)] & CharFlags.Hex) === 0
      ) {
        if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
        }
        // NotEscapeSequence :
        //  x [lookahread not one of HexDigit]
        //  x HexDigit [lookahread not one of HexDigit]
        if (CharTypes[first] & CharFlags.Hex) parser.index++;

        return -1;
      }

      parser.index++;
      const code = (toHex(first) << 4) | toHex(source.charCodeAt(parser.index));
      parser.index++;
      return code;
    }

    // UCS-2/Unicode escapes
    case Chars.LowerU:
      ch = source.charCodeAt(parser.index);

      if (ch === Chars.LeftBrace) {
        parser.index++; // skips: '{'

        // \u{N}

        // The first digit is required, so handle it *out* of the loop.
        ch = source.charCodeAt(parser.index);

        let digit = toHex(ch);

        if (digit < 0) {
          if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
          }
          return -1;
        }
        let code = 0;

        do {
          code = (code << 4) | digit;
          // Check this early to avoid `code` wrapping to a negative on overflow (which is
          // reserved for abnormal conditions).
          if (code > Chars.LastUnicodeChar) {
            if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
              addDiagnostic(
                parser,
                context,
                DiagnosticSource.Lexer,
                DiagnosticCode.UnicodeOverflow,
                DiagnosticKind.Error
              );
            }
            return -1;
          }

          parser.index++;

          digit = toHex(source.charCodeAt(parser.index));
        } while (digit >= 0);

        if (0 < digit || source.charCodeAt(parser.index) !== Chars.RightBrace) {
          if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.UnsupportedUnicodeIdent,
              DiagnosticKind.Error
            );
          }
          return -1;
        }

        parser.index++; // skips: '}'

        return fromCodePoint(code);
      }

      // \uNNNN
      if ((CharTypes[ch] & CharFlags.Hex) === 0) return -1; // first one is mandatory

      let code = 0;
      for (let i = 0; i < 4; i++) {
        const digit = toHex(ch);
        if (digit < 0) {
          if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
          }
          return -1;
        }
        parser.index++;
        ch = source.charCodeAt(parser.index);
        code = (code << 4) | digit;
      }

      return fromCodePoint(code);

    case Chars.Zero: // fall through
    case Chars.One: // fall through
    case Chars.Two: // fall through
    case Chars.Three: // fall through
    case Chars.Four: // fall through
    case Chars.Five: // fall through
    case Chars.Six: // fall through
    case Chars.Seven:
      const next = source.charCodeAt(parser.index);

      // NotEscapeSequence :
      //   0 DecimalDigit
      //   DecimalDigit but not 0

      if (ch === Chars.Zero && (next < Chars.Zero || next > Chars.Nine)) return '\0';

      if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.TemplateBadEscape, DiagnosticKind.Error);
      }

      // Continue to parse out the octal escapes in 'recovery mode' as if we were in sloppy mode
      // even if template literals may not contain octal escape sequences

      if (next >= Chars.Zero && next <= Chars.Nine) parser.index++;
      return -1;

    // `8`, `9` (invalid escapes)
    case Chars.Eight:
    case Chars.Nine:
      if ((context & Context.TaggedTemplate) !== Context.TaggedTemplate) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.TemplateBadEscape, DiagnosticKind.Error);
      }
      return -1;
  }

  // Other escaped characters are interpreted as their non-escaped version.
  return fromCodePoint(ch);
}

export function scanTemplateTail(parser: ParserState, context: Context): boolean {
  if (parser.index >= parser.length) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedTemplate, DiagnosticKind.Error);
    return false;
  }

  parser.index--;
  parser.token = scanTemplateSpan(parser, context, parser.source);
  return true;
}
