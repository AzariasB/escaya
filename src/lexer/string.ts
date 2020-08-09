import { Token } from './../ast/token';
import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Char } from './char';
import { fromCodePoint, toHex } from './common';
import { AsciiCharFlags, AsciiCharTypes } from './asciiChar';

export const oneCharASCII = [
  /*   0 - Null               */ 0,
  /*   1 - Start of Heading   */ 0,
  /*   2 - Start of Text      */ 0,
  /*   3 - End of Text        */ 0,
  /*   4 - End of Transm.     */ 0,
  /*   5 - Enquiry            */ 0,
  /*   6 - Acknowledgment     */ 0,
  /*   7 - Bell               */ 0,
  /*   8 - Back Space         */ 0,
  /*   9 - Horizontal Tab     */ 0,
  /*  10 - Line Feed          */ 0,
  /*  11 - Vertical Tab       */ 0,
  /*  12 - Form Feed          */ 0,
  /*  13 - Carriage Return    */ 0,
  /*  14 - Shift Out          */ 0,
  /*  15 - Shift In           */ 0,
  /*  16 - Data Line Escape   */ 0,
  /*  17 - Device Control 1   */ 0,
  /*  18 - Device Control 2   */ 0,
  /*  19 - Device Control 3   */ 0,
  /*  20 - Device Control 4   */ 0,
  /*  21 - Negative Ack.      */ 0,
  /*  22 - Synchronous Idle   */ 0,
  /*  23 - End of Transmit    */ 0,
  /*  24 - Cancel             */ 0,
  /*  25 - End of Medium      */ 0,
  /*  26 - Substitute         */ 0,
  /*  27 - Escape             */ 0,
  /*  28 - File Separator     */ 0,
  /*  29 - Group Separator    */ 0,
  /*  30 - Record Separator   */ 0,
  /*  31 - Unit Separator     */ 0,
  /*  32 - Space              */ ' ',
  /*  33 - !                  */ '!',
  /*  34 - "                  */ '"',
  /*  35 - #                  */ '#',
  /*  36 - $                  */ '$',
  /*  37 - %                  */ '%',
  /*  38 - &                  */ '&',
  /*  39 - '                  */ "'",
  /*  40 - (                  */ '(',
  /*  41 - )                  */ ')',
  /*  42 - *                  */ '*',
  /*  43 - +                  */ '+',
  /*  44 - ,                  */ ',',
  /*  45 - -                  */ '-',
  /*  46 - .                  */ '.',
  /*  47 - /                  */ '/',
  /*  48 - 0                  */ 0,
  /*  49 - 1                  */ 0,
  /*  50 - 2                  */ 0,
  /*  51 - 3                  */ 0,
  /*  52 - 4                  */ 0,
  /*  53 - 5                  */ 0,
  /*  54 - 6                  */ 0,
  /*  55 - 7                  */ 0,
  /*  56 - 8                  */ 0,
  /*  57 - 9                  */ 0,
  /*  58 - :                  */ ':',
  /*  59 - ;                  */ ';',
  /*  60 - <                  */ '<',
  /*  61 - =                  */ '=',
  /*  62 - >                  */ '>',
  /*  63 - ?                  */ '?',
  /*  64 - @                  */ '@',
  /*  65 - A                  */ 'A',
  /*  66 - B                  */ 'B',
  /*  67 - C                  */ 'C',
  /*  68 - D                  */ 'D',
  /*  69 - E                  */ 'E',
  /*  70 - F                  */ 'F',
  /*  71 - G                  */ 'G',
  /*  72 - H                  */ 'H',
  /*  73 - I                  */ 'I',
  /*  74 - J                  */ 'J',
  /*  75 - K                  */ 'K',
  /*  76 - L                  */ 'L',
  /*  77 - M                  */ 'M',
  /*  78 - N                  */ 'N',
  /*  79 - O                  */ 'O',
  /*  80 - P                  */ 'P',
  /*  81 - Q                  */ 'Q',
  /*  82 - R                  */ 'R',
  /*  83 - S                  */ 'S',
  /*  84 - T                  */ 'T',
  /*  85 - U                  */ 'U',
  /*  86 - V                  */ 'V',
  /*  87 - W                  */ 'W',
  /*  88 - X                  */ 'X',
  /*  89 - Y                  */ 'Y',
  /*  90 - Z                  */ 'Z',
  /*  91 - [                  */ '[',
  /*  92 - \                  */ '\\',
  /*  93 - ]                  */ ']',
  /*  94 - ^                  */ '^',
  /*  95 - _                  */ '_',
  /*  96 - `                  */ '`',
  /*  97 - a                  */ 'a',
  /*  98 - b                  */ '\b',
  /*  99 - c                  */ 'c',
  /* 100 - d                  */ 'd',
  /* 101 - e                  */ 'e',
  /* 102 - f                  */ '\f',
  /* 103 - g                  */ 'g',
  /* 104 - h                  */ 'h',
  /* 105 - i                  */ 'i',
  /* 106 - j                  */ 'j',
  /* 107 - k                  */ 'k',
  /* 108 - l                  */ 'l',
  /* 109 - m                  */ 'm',
  /* 110 - n                  */ '\n',
  /* 111 - o                  */ 'o',
  /* 112 - p                  */ 'p',
  /* 113 - q                  */ 'q',
  /* 114 - r                  */ '\r',
  /* 115 - s                  */ 's',
  /* 116 - t                  */ '\t',
  /* 117 - u                  */ 0,
  /* 118 - v                  */ '\v',
  /* 119 - w                  */ 'w',
  /* 120 - x                  */ 0,
  /* 121 - y                  */ 'y',
  /* 122 - z                  */ 'z',
  /* 123 - {                  */ '{',
  /* 124 - |                  */ '|',
  /* 125 - }                  */ '}',
  /* 126 - ~                  */ '~',
  /* 127 - Delete             */ 0
];

/**
 * Scan a string token.
 */
export function scanString(parser: ParserState, context: Context, quote: number): Token {
  let ret = '';
  let source = parser.source;

  let start = parser.index;
  let ch = source.charCodeAt(parser.index);

  while ((AsciiCharTypes[ch] & AsciiCharFlags.IsStringLiteralLineTerminator) === 0) {
    if (ch === Char.Backslash) {
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
    case Char.Zero:
    case Char.One:
    case Char.Two:
    case Char.Three:
      let code = ch - Char.Zero;
      let index = parser.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next < Char.Zero || next > Char.Seven) {
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
          code = (code << 3) | (next - Char.Zero);
          index++;

          if (index < source.length) {
            const next = source.charCodeAt(index);

            if (next >= Char.Zero && next <= Char.Seven) {
              parser.lastChar = next;
              code = (code << 3) | (next - Char.Zero);
              index++;
            }
          }

          parser.index = index;
        }
      }

      return fromCodePoint(code);
    case Char.Four:
    case Char.Five:
    case Char.Six:
    case Char.Seven: {
      if (context & Context.Strict) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.StrictOctalEscape, DiagnosticKind.Error);
        return '';
      }
      let code = ch - Char.Zero;
      const index = parser.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next >= Char.Zero && next <= Char.Seven) {
          code = (code << 3) | (next - Char.Zero);
          parser.index = index + 1;
        }
      }

      return fromCodePoint(code);
    }

    // `8`, `9` (invalid escapes)
    case Char.Eight:
    case Char.Nine: {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidEightAndNine, DiagnosticKind.Error);
      return '';
    }
    case Char.LowerU: {
      let ch = source.charCodeAt(parser.index);
      if (ch === Char.LeftBrace) {
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
        while (ch !== Char.RightBrace) {
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
          if (code > Char.LastUnicodeChar) {
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
    case Char.LowerX:
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
