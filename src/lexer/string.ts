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
export function scanString(state: ParserState, context: Context, quote: number): Token {
  let ret = '';
  const source = state.source;
  state.index++;
  let start = state.index;
  let cp = source.charCodeAt(state.index);

  while ((AsciiCharTypes[cp] & AsciiCharFlags.IsStringLiteralLineTerminator) === 0) {
    if (cp === Char.Backslash) {
      ret += source.substring(start, state.index);
      // Most common escape sequences first
      state.index++;
      cp = source.charCodeAt(state.index);
      const escape = oneCharASCII[cp];
      if (escape) {
        state.index++;
        ret += escape;
      } else {
        ret += scanStringEscape(state, context, source, cp);
      }
      start = state.index;
    } else {
      if (cp === quote) {
        ret += source.substring(start, state.index);
        state.index++;
        state.tokenValue = ret;
        return Token.StringLiteral;
      }
      state.index++;
    }

    if (state.index >= state.length) break;
    cp = source.charCodeAt(state.index);
  }

  addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedString, DiagnosticKind.Error);

  state.tokenValue = ret;
  return Token.StringLiteral;
}

export function scanStringEscape(state: ParserState, context: Context, source: string, cp: number): string {
  state.index++;
  switch (cp) {
    case Char.Zero:
    case Char.One:
    case Char.Two:
    case Char.Three:
      let code = cp - Char.Zero;
      let index = state.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next < Char.Zero || next > Char.Seven) {
          // Verify that it's `\0` if we're in strict mode.
          if (code !== 0 && context & Context.Strict) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
            return '';
          }
        } else if (context & Context.Strict) {
          addDiagnostic(
            state,
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
              state.lastChar = next;
              code = (code << 3) | (next - Char.Zero);
              index++;
            }
          }

          state.index = index;
        }
      }

      return fromCodePoint(code);
    case Char.Four:
    case Char.Five:
    case Char.Six:
    case Char.Seven: {
      if (context & Context.Strict) {
        addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.StrictOctalEscape, DiagnosticKind.Error);
        return '';
      }
      let code = cp - Char.Zero;
      const index = state.index;

      if (index < source.length) {
        const next = source.charCodeAt(index);
        if (next >= Char.Zero && next <= Char.Seven) {
          code = (code << 3) | (next - Char.Zero);
          state.index = index + 1;
        }
      }

      return fromCodePoint(code);
    }

    // `8`, `9` (invalid escapes)
    case Char.Eight:
    case Char.Nine: {
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidEightAndNine, DiagnosticKind.Error);
      return '';
    }
    case Char.LowerU:
      cp = source.charCodeAt(state.index);
      if (cp === Char.LeftBrace) {
        // \u{N}
        // The first digit is required, so handle it *out* of the loop.
        state.index++;
        cp = state.lastChar = source.charCodeAt(state.index);
        let code = toHex(cp);
        if (code < 0) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
          return '';
        }
        state.index++;
        cp = state.lastChar = source.charCodeAt(state.index);
        while (cp !== Char.RightBrace) {
          const digit = toHex(cp);
          if (digit < 0) {
            addDiagnostic(
              state,
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
            addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnicodeOverflow, DiagnosticKind.Error);
            return '';
          }
          state.index++;
          cp = source.charCodeAt(state.index);
        }
        state.index++;
        return fromCodePoint(code);
      } else {
        // \uNNNN
        let code = toHex(cp);
        if (code < 0) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
          return '';
        }

        for (let i = 0; i < 3; i++) {
          state.index++;
          cp = source.charCodeAt(state.index);
          const digit = toHex(cp);
          if (digit < 0) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
            return '';
          }
          code = (code << 4) | digit;
        }
        state.index++;
        return fromCodePoint(code);
      }

    // ASCII escapes
    case Char.LowerX:
      const hi = toHex(source.charCodeAt(state.index));
      if (hi < 0) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Lexer,
          DiagnosticCode.InvalidHexEscapeSequence,
          DiagnosticKind.Error
        );
        return '';
      }
      state.index++;
      const ch2 = source.charCodeAt(state.index);
      const lo = toHex(ch2);
      if (lo < 0) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Lexer,
          DiagnosticCode.InvalidHexEscapeSequence,
          DiagnosticKind.Error
        );
        return '';
      }
      state.index++;
      return fromCodePoint((hi << 4) | lo);

    default:
      return fromCodePoint(cp);
  }
}
