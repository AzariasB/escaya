import { ParserState, Context } from '../common';
import { fromCodePoint, toHex, Escape } from './common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, addDiagnosticByIndex, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharTypes, CharFlags } from './charClassifier';

export const escapeChars = [
  /*   0 - Null               */ Chars.Unknown,
  /*   1 - Start of Heading   */ Chars.Unknown,
  /*   2 - Start of Text      */ Chars.Unknown,
  /*   3 - End of Text        */ Chars.Unknown,
  /*   4 - End of Transm.     */ Chars.Unknown,
  /*   5 - Enquiry            */ Chars.Unknown,
  /*   6 - Acknowledgment     */ Chars.Unknown,
  /*   7 - Bell               */ Chars.Unknown,
  /*   8 - Backspace          */ Chars.Unknown,
  /*   9 - Horizontal Tab     */ Chars.Unknown,
  /*  10 - Line Feed          */ Chars.LineFeed,
  /*  11 - Vertical Tab       */ Chars.Unknown,
  /*  12 - Form Feed          */ Chars.Unknown,
  /*  13 - Carriage Return    */ Chars.CarriageReturn,
  /*  14 - Shift Out          */ Chars.Unknown,
  /*  15 - Shift In           */ Chars.Unknown,
  /*  16 - Data Line Escape   */ Chars.Unknown,
  /*  17 - Device Control 1   */ Chars.Unknown,
  /*  18 - Device Control 2   */ Chars.Unknown,
  /*  19 - Device Control 3   */ Chars.Unknown,
  /*  20 - Device Control 4   */ Chars.Unknown,
  /*  21 - Negative Ack.      */ Chars.Unknown,
  /*  22 - Synchronous Idle   */ Chars.Unknown,
  /*  23 - End of Transmit    */ Chars.Unknown,
  /*  24 - Cancel             */ Chars.Unknown,
  /*  25 - End of Medium      */ Chars.Unknown,
  /*  26 - Substitute         */ Chars.Unknown,
  /*  27 - Escape             */ Chars.Unknown,
  /*  28 - File Separator     */ Chars.Unknown,
  /*  29 - Group Separator    */ Chars.Unknown,
  /*  30 - Record Separator   */ Chars.Unknown,
  /*  31 - Unit Separator     */ Chars.Unknown,
  /*  32 - Space              */ Chars.Unknown,
  /*  33 - !                  */ Chars.Unknown,
  /*  34 - "                  */ Chars.Unknown,
  /*  35 - #                  */ Chars.Unknown,
  /*  36 - $                  */ Chars.Unknown,
  /*  37 - %                  */ Chars.Unknown,
  /*  38 - &                  */ Chars.Unknown,
  /*  39 - '                  */ Chars.Unknown,
  /*  40 - (                  */ Chars.Unknown,
  /*  41 - )                  */ Chars.Unknown,
  /*  42 - *                  */ Chars.Unknown,
  /*  43 - +                  */ Chars.Unknown,
  /*  44 - ,                  */ Chars.Unknown,
  /*  45 - -                  */ Chars.Unknown,
  /*  46 - .                  */ Chars.Unknown,
  /*  47 - /                  */ Chars.Unknown,
  /*  48 - 0                  */ Chars.Zero,
  /*  49 - 1                  */ Chars.One,
  /*  50 - 2                  */ Chars.Two,
  /*  51 - 3                  */ Chars.Three,
  /*  52 - 4                  */ Chars.Four,
  /*  53 - 5                  */ Chars.Five,
  /*  54 - 6                  */ Chars.Six,
  /*  55 - 7                  */ Chars.Seven,
  /*  56 - 8                  */ Chars.Eight,
  /*  57 - 9                  */ Chars.Nine,
  /*  58 - :                  */ Chars.Unknown,
  /*  59 - ;                  */ Chars.Unknown,
  /*  60 - <                  */ Chars.Unknown,
  /*  61 - =                  */ Chars.Unknown,
  /*  62 - >                  */ Chars.Unknown,
  /*  63 - ?                  */ Chars.Unknown,
  /*  64 - @                  */ Chars.Unknown,
  /*  65 - A                  */ Chars.Unknown,
  /*  66 - B                  */ Chars.Unknown,
  /*  67 - C                  */ Chars.Unknown,
  /*  68 - D                  */ Chars.Unknown,
  /*  69 - E                  */ Chars.Unknown,
  /*  70 - F                  */ Chars.Unknown,
  /*  71 - G                  */ Chars.Unknown,
  /*  72 - H                  */ Chars.Unknown,
  /*  73 - I                  */ Chars.Unknown,
  /*  74 - J                  */ Chars.Unknown,
  /*  75 - K                  */ Chars.Unknown,
  /*  76 - L                  */ Chars.Unknown,
  /*  77 - M                  */ Chars.Unknown,
  /*  78 - N                  */ Chars.Unknown,
  /*  79 - O                  */ Chars.Unknown,
  /*  80 - P                  */ Chars.Unknown,
  /*  81 - Q                  */ Chars.Unknown,
  /*  82 - R                  */ Chars.Unknown,
  /*  83 - S                  */ Chars.Unknown,
  /*  84 - T                  */ Chars.Unknown,
  /*  85 - U                  */ Chars.Unknown,
  /*  86 - V                  */ Chars.Unknown,
  /*  87 - W                  */ Chars.Unknown,
  /*  88 - X                  */ Chars.Unknown,
  /*  89 - Y                  */ Chars.Unknown,
  /*  90 - Z                  */ Chars.Unknown,
  /*  91 - [                  */ Chars.Unknown,
  /*  92 - \                  */ Chars.Unknown,
  /*  93 - ]                  */ Chars.Unknown,
  /*  94 - ^                  */ Chars.Unknown,
  /*  95 - _                  */ Chars.Unknown,
  /*  96 - `                  */ Chars.Unknown,
  /*  97 - a                  */ Chars.Unknown,
  /*  98 - b                  */ Chars.LowerB,
  /*  99 - c                  */ Chars.Unknown,
  /* 100 - d                  */ Chars.Unknown,
  /* 101 - e                  */ Chars.Unknown,
  /* 102 - f                  */ Chars.LowerF,
  /* 103 - g                  */ Chars.Unknown,
  /* 104 - h                  */ Chars.Unknown,
  /* 105 - i                  */ Chars.Unknown,
  /* 106 - j                  */ Chars.Unknown,
  /* 107 - k                  */ Chars.Unknown,
  /* 108 - l                  */ Chars.Unknown,
  /* 109 - m                  */ Chars.Unknown,
  /* 110 - n                  */ Chars.LowerN,
  /* 111 - o                  */ Chars.Unknown,
  /* 112 - p                  */ Chars.Unknown,
  /* 113 - q                  */ Chars.Unknown,
  /* 114 - r                  */ Chars.LowerR,
  /* 115 - s                  */ Chars.Unknown,
  /* 116 - t                  */ Chars.LowerT,
  /* 117 - u                  */ Chars.LowerU,
  /* 118 - v                  */ Chars.LowerV,
  /* 119 - w                  */ Chars.Unknown,
  /* 120 - x                  */ Chars.LowerX,
  /* 121 - y                  */ Chars.Unknown,
  /* 122 - z                  */ Chars.Unknown,
  /* 123 - {                  */ Chars.Unknown,
  /* 124 - |                  */ Chars.Unknown,
  /* 125 - }                  */ Chars.Unknown,
  /* 126 - ~                  */ Chars.Unknown,
  /* 127 - Delete             */ Chars.Unknown
];

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

    // Null character, octals
    case Chars.Zero:
    case Chars.One:
    case Chars.Two:
    case Chars.Three: {
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
    case Chars.Seven: {
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
    }

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
