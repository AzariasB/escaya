import { ParserState, Context } from '../common';
import { fromCodePoint, toHex } from './common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharTypes, CharFlags } from './charClassifier';
import { oneCharASCII } from './tables';

/**
 * Scan a string token.
 */
export function scanString(parser: ParserState, context: Context, source: string, quote: number): Token {
  let ret = '';

  parser.index++;
  let start = parser.index;
  let ch = source.charCodeAt(parser.index);

  while ((CharTypes[ch] & CharFlags.LineTerminator) === 0) {
    if (ch === Chars.Backslash) {
      ret += source.substring(start, parser.index);
      // Most common escape sequences first
      parser.index++;
      ch = source.charCodeAt(parser.index);
      const escape = oneCharASCII[ch];
      if (escape) {
        parser.index++;
        ret += escape;
      } else {
        ret += scanStringEscape(parser, context, source, ch);
      }
      start = parser.index;
    } else {
      if (ch === quote) {
        ret += source.substring(start, parser.index);
        parser.index++;
        parser.tokenValue = ret;
        return Token.StringLiteral;
      }
      parser.index++;
    }

    if (parser.index >= parser.length) break;
    ch = source.charCodeAt(parser.index);
  }

  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedString, DiagnosticKind.Error);

  parser.tokenValue = ret;
  return Token.StringLiteral;
}

export function scanStringEscape(parser: ParserState, context: Context, source: string, ch: number): string {
  parser.index++;
  switch (ch) {
    case Chars.Zero:
    case Chars.One:
    case Chars.Two:
    case Chars.Three:
      let code = ch - Chars.Zero;
      let index = parser.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next < Chars.Zero || next > Chars.Seven) {
          // Verify that it's `\0` if we're in strict mode.
          if (code !== 0 && context & Context.Strict) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
            return '';
          }
        } else if (context & Context.Strict) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
          return '';
        } else {
          code = (code << 3) | (next - Chars.Zero);
          index++;

          if (index < source.length) {
            const next = source.charCodeAt(index);

            if (next >= Chars.Zero && next <= Chars.Seven) {
              parser.lastChar = next;
              code = (code << 3) | (next - Chars.Zero);
              index++;
            }
          }

          parser.index = index;
        }
      }

      return fromCodePoint(code);
    case Chars.Four:
    case Chars.Five:
    case Chars.Six:
    case Chars.Seven: {
      if (context & Context.Strict) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.StrictOctalEscape, DiagnosticKind.Error);
        return '';
      }
      let code = ch - Chars.Zero;
      const index = parser.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next >= Chars.Zero && next <= Chars.Seven) {
          code = (code << 3) | (next - Chars.Zero);
          parser.index = index + 1;
        }
      }

      return fromCodePoint(code);
    }

    // `8`, `9` (invalid escapes)
    case Chars.Eight:
    case Chars.Nine: {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidEightAndNine, DiagnosticKind.Error);
      return '';
    }
    case Chars.LowerU: {
      let ch = source.charCodeAt(parser.index);
      if (ch === Chars.LeftBrace) {
        // \u{N}
        // The first digit is required, so handle it *out* of the loop.
        parser.index++;
        ch = parser.lastChar = source.charCodeAt(parser.index);
        let code = toHex(ch);
        if (code < 0) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
          return '';
        }
        parser.index++;
        ch = parser.lastChar = source.charCodeAt(parser.index);
        while (ch !== Chars.RightBrace) {
          const digit = toHex(ch);
          if (digit < 0) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
            return '';
          }
          code = (code << 4) | digit;

          // Check this early to avoid `code` wrapping to a negative on overflow (which is
          // reserved for abnormal conditions).
          if (code > Chars.LastUnicodeChar) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.UnicodeOverflow,
              DiagnosticKind.Error
            );
            return '';
          }
          parser.index++;
          ch = source.charCodeAt(parser.index);
        }
        parser.index++;
        return fromCodePoint(code);
      } else {
        // \uNNNN
        let code = toHex(ch);
        if (code < 0) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
          return '';
        }

        for (let i = 0; i < 3; i++) {
          parser.index++;
          ch = source.charCodeAt(parser.index);
          const digit = toHex(ch);
          if (digit < 0) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
            return '';
          }
          code = (code << 4) | digit;
        }
        parser.index++;
        return fromCodePoint(code);
      }
    }
    // ASCII escapes
    case Chars.LowerX:
      const ch1 = source.charCodeAt(parser.index);
      const hi = toHex(ch1);
      if (hi < 0) {
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Lexer,
          DiagnosticCode.InvalidHexEscapeSequence,
          DiagnosticKind.Error
        );
        return '';
      }
      parser.index++;
      const ch2 = source.charCodeAt(parser.index);
      const lo = toHex(ch2);
      if (lo < 0) {
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Lexer,
          DiagnosticCode.InvalidHexEscapeSequence,
          DiagnosticKind.Error
        );
        return '';
      }
      parser.index++;
      return fromCodePoint((hi << 4) | lo);

    default:
      return fromCodePoint(ch);
  }
}
