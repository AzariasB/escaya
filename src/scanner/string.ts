import { ParserState, Context } from '../common';
import { fromCodePoint, toHex, Escape } from './common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, addDiagnosticByIndex, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharTypes, CharFlags } from './charClassifier';
import { escapeChars } from './tables';

/**
 * Scan a string token.
 */
export function scanString(parser: ParserState, context: Context, quote: number): Token {
  let ret = '';

  parser.index++;

  let ch = parser.source.charCodeAt(parser.index);

  while (parser.index < parser.length) {
    if (ch === Chars.Backslash) {
      const index = parser.index;
      parser.index++;

      if (parser.index >= parser.length) break;

      ch = parser.source.charCodeAt(parser.index);

      const code = parseEscape(parser, context, ch);
      if (code >= 0) {
        ret += fromCodePoint(code);
      } else {
        handleStringError(parser, context, code as Escape, index);
      }
    } else {
      if (ch === quote) {
        parser.index++; // Consume the quote
        parser.tokenValue = ret;
        return Token.StringLiteral;
      }

      if (CharTypes[ch] & CharFlags.LineTerminator) break;

      ret += fromCodePoint(ch);
    }

    parser.index++;

    if (parser.index >= parser.length) break;

    ch = parser.source.charCodeAt(parser.index);
  }

  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedString, DiagnosticKind.Error);

  parser.tokenValue = ret;
  return Token.StringLiteral;
}

export function parseEscape(parser: ParserState, context: Context, first: number): number {
  switch (escapeChars[first]) {
    // Magic escapes
    case Chars.LowerB:
      return Chars.Backspace;
    case Chars.LowerF:
      return Chars.FormFeed;
    case Chars.LowerR:
      return Chars.CarriageReturn;
    case Chars.LowerN:
      return Chars.LineFeed;
    case Chars.LowerT:
      return Chars.Tab;
    case Chars.LowerV:
      return Chars.VerticalTab;

    // Line continuations
    case Chars.CarriageReturn: {
      const index = parser.index;

      if (index < parser.length) {
        const ch = parser.source.charCodeAt(index);

        if (ch === Chars.LineFeed) {
          parser.index = index + 1;
        }
      }
    }
    // falls through

    case Chars.LineFeed:
      parser.columnOffset = parser.index;
      parser.line++;
      return Escape.Empty;

    case Chars.Zero:
    case Chars.One:
    case Chars.Two:
    case Chars.Three: {
      // 1 to 3 octal digits

      let code = first - Chars.Zero;
      let index = parser.index + 1;

      if (index < parser.length) {
        const next = parser.source.charCodeAt(index);

        if (next < Chars.Zero || next > Chars.Seven) {
          // Verify that it's `\0` if we're in strict mode.
          if (code !== 0 && context & Context.Strict) return Escape.StrictOctal;
        } else if (context & Context.Strict) {
          // This happens in cases like `\00` in strict mode.
          return Escape.StrictOctal;
        } else {
          parser.lastChar = next;
          code = (code << 3) | (next - Chars.Zero);
          index++;

          if (index < parser.length) {
            const next = parser.source.charCodeAt(index);

            if (next >= Chars.Zero && next <= Chars.Seven) {
              parser.lastChar = next;
              code = (code << 3) | (next - Chars.Zero);
              index++;
            }
          }

          parser.index = index - 1;
        }
      }

      return code;
    }

    case Chars.Four:
    case Chars.Five:
    case Chars.Six:
    case Chars.Seven:
      // 1 to 2 octal digits

      if (context & Context.Strict) return Escape.StrictOctal;
      let code = first - Chars.Zero;
      const index = parser.index + 1;

      if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
          code = (code << 3) | (next - Chars.Zero);
          parser.lastChar = next;
          parser.index = index;
        }
      }

      return code;

    // `8`, `9` (invalid escapes)
    case Chars.Eight:
    case Chars.Nine:
      return Escape.EightOrNine;

    // ASCII escapes
    case Chars.LowerX: {
      const hi = toHex(parser.source.charCodeAt(++parser.index));
      if (hi < 0) return Escape.InvalidHex;
      const lo = toHex(parser.source.charCodeAt(++parser.index));
      if (lo < 0) return Escape.InvalidHex;
      return (hi << 4) | lo;
    }

    // UCS-2/Unicode escapes
    case Chars.LowerU: {
      parser.index++; // skips 'u'

      let ch = parser.source.charCodeAt(parser.index);

      if (parser.index < parser.length && ch === Chars.LeftBrace) {
        let index = parser.index + 1;

        let code = 0;
        let value = toHex(parser.source.charCodeAt(index));

        if (value < 0) return Escape.InvalidHex;

        while (value >= 0) {
          code = code * 16 + value;
          if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;
          value = toHex(parser.source.charCodeAt(++index));
        }

        if (code < 0 || parser.source.charCodeAt(index) !== Chars.RightBrace) {
          return Escape.InvalidHex;
        }

        parser.index = index;
        return code;
      }

      let code = toHex(ch);

      if (code < 0) return Escape.InvalidHex;

      for (let i = 0; i < 3; i++) {
        ch = parser.source.charCodeAt(++parser.index);
        const digit = toHex(ch);
        if (digit < 0) return Escape.InvalidHex;
        code = (code << 4) | digit;
      }

      return code;
    }

    default:
      return first;
  }
}

export function handleStringError(parser: ParserState, context: Context, code: Escape, start: number): void {
  if (code === Escape.StrictOctal) {
    addDiagnosticByIndex(
      parser,
      context,
      start,
      DiagnosticSource.Lexer,
      DiagnosticCode.StrictOctalEscape,
      DiagnosticKind.Error
    );
  } else if (code === Escape.EightOrNine) {
    addDiagnosticByIndex(
      parser,
      context,
      start,
      DiagnosticSource.Lexer,
      DiagnosticCode.InvalidEightAndNine,
      DiagnosticKind.Error
    );
  } else if (code === Escape.InvalidHex) {
    addDiagnosticByIndex(
      parser,
      context,
      start,
      DiagnosticSource.Lexer,
      DiagnosticCode.InvalidHexEscapeSequence,
      DiagnosticKind.Error
    );
  } else if (code === Escape.OutOfRange) {
    addDiagnosticByIndex(
      parser,
      context,
      start,
      DiagnosticSource.Lexer,
      DiagnosticCode.UnicodeOverflow,
      DiagnosticKind.Error
    );
  }
}
