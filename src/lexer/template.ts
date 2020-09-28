import { ParserState, Context } from '../common';
import { fromCodePoint, toHex } from './common';
import { Token } from '../ast/token';
import { Char } from './char';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { unicodeLookup } from './unicode';
import { AsciiCharTypes, AsciiCharFlags } from './asciiChar';

export const escapeChar = [
  /*   0 - Null               */ Char.Unknown,
  /*   1 - Start of Heading   */ Char.Unknown,
  /*   2 - Start of Text      */ Char.Unknown,
  /*   3 - End of Text        */ Char.Unknown,
  /*   4 - End of Transm.     */ Char.Unknown,
  /*   5 - Enquiry            */ Char.Unknown,
  /*   6 - Acknowledgment     */ Char.Unknown,
  /*   7 - Bell               */ Char.Unknown,
  /*   8 - Backspace          */ Char.Unknown,
  /*   9 - Horizontal Tab     */ Char.Unknown,
  /*  10 - Line Feed          */ Char.LineFeed,
  /*  11 - Vertical Tab       */ Char.Unknown,
  /*  12 - Form Feed          */ Char.Unknown,
  /*  13 - Carriage Return    */ Char.CarriageReturn,
  /*  14 - Shift Out          */ Char.Unknown,
  /*  15 - Shift In           */ Char.Unknown,
  /*  16 - Data Line Escape   */ Char.Unknown,
  /*  17 - Device Control 1   */ Char.Unknown,
  /*  18 - Device Control 2   */ Char.Unknown,
  /*  19 - Device Control 3   */ Char.Unknown,
  /*  20 - Device Control 4   */ Char.Unknown,
  /*  21 - Negative Ack.      */ Char.Unknown,
  /*  22 - Synchronous Idle   */ Char.Unknown,
  /*  23 - End of Transmit    */ Char.Unknown,
  /*  24 - Cancel             */ Char.Unknown,
  /*  25 - End of Medium      */ Char.Unknown,
  /*  26 - Substitute         */ Char.Unknown,
  /*  27 - Escape             */ Char.Unknown,
  /*  28 - File Separator     */ Char.Unknown,
  /*  29 - Group Separator    */ Char.Unknown,
  /*  30 - Record Separator   */ Char.Unknown,
  /*  31 - Unit Separator     */ Char.Unknown,
  /*  32 - Space              */ Char.Unknown,
  /*  33 - !                  */ Char.Unknown,
  /*  34 - "                  */ Char.Unknown,
  /*  35 - #                  */ Char.Unknown,
  /*  36 - $                  */ Char.Unknown,
  /*  37 - %                  */ Char.Unknown,
  /*  38 - &                  */ Char.Unknown,
  /*  39 - '                  */ Char.Unknown,
  /*  40 - (                  */ Char.Unknown,
  /*  41 - )                  */ Char.Unknown,
  /*  42 - *                  */ Char.Unknown,
  /*  43 - +                  */ Char.Unknown,
  /*  44 - ,                  */ Char.Unknown,
  /*  45 - -                  */ Char.Unknown,
  /*  46 - .                  */ Char.Unknown,
  /*  47 - /                  */ Char.Unknown,
  /*  48 - 0                  */ Char.Zero,
  /*  49 - 1                  */ Char.One,
  /*  50 - 2                  */ Char.Two,
  /*  51 - 3                  */ Char.Three,
  /*  52 - 4                  */ Char.Four,
  /*  53 - 5                  */ Char.Five,
  /*  54 - 6                  */ Char.Six,
  /*  55 - 7                  */ Char.Seven,
  /*  56 - 8                  */ Char.Eight,
  /*  57 - 9                  */ Char.Nine,
  /*  58 - :                  */ Char.Unknown,
  /*  59 - ;                  */ Char.Unknown,
  /*  60 - <                  */ Char.Unknown,
  /*  61 - =                  */ Char.Unknown,
  /*  62 - >                  */ Char.Unknown,
  /*  63 - ?                  */ Char.Unknown,
  /*  64 - @                  */ Char.Unknown,
  /*  65 - A                  */ Char.Unknown,
  /*  66 - B                  */ Char.Unknown,
  /*  67 - C                  */ Char.Unknown,
  /*  68 - D                  */ Char.Unknown,
  /*  69 - E                  */ Char.Unknown,
  /*  70 - F                  */ Char.Unknown,
  /*  71 - G                  */ Char.Unknown,
  /*  72 - H                  */ Char.Unknown,
  /*  73 - I                  */ Char.Unknown,
  /*  74 - J                  */ Char.Unknown,
  /*  75 - K                  */ Char.Unknown,
  /*  76 - L                  */ Char.Unknown,
  /*  77 - M                  */ Char.Unknown,
  /*  78 - N                  */ Char.Unknown,
  /*  79 - O                  */ Char.Unknown,
  /*  80 - P                  */ Char.Unknown,
  /*  81 - Q                  */ Char.Unknown,
  /*  82 - R                  */ Char.Unknown,
  /*  83 - S                  */ Char.Unknown,
  /*  84 - T                  */ Char.Unknown,
  /*  85 - U                  */ Char.Unknown,
  /*  86 - V                  */ Char.Unknown,
  /*  87 - W                  */ Char.Unknown,
  /*  88 - X                  */ Char.Unknown,
  /*  89 - Y                  */ Char.Unknown,
  /*  90 - Z                  */ Char.Unknown,
  /*  91 - [                  */ Char.Unknown,
  /*  92 - \                  */ Char.Unknown,
  /*  93 - ]                  */ Char.Unknown,
  /*  94 - ^                  */ Char.Unknown,
  /*  95 - _                  */ Char.Unknown,
  /*  96 - `                  */ Char.Unknown,
  /*  97 - a                  */ Char.Unknown,
  /*  98 - b                  */ Char.LowerB,
  /*  99 - c                  */ Char.Unknown,
  /* 100 - d                  */ Char.Unknown,
  /* 101 - e                  */ Char.Unknown,
  /* 102 - f                  */ Char.LowerF,
  /* 103 - g                  */ Char.Unknown,
  /* 104 - h                  */ Char.Unknown,
  /* 105 - i                  */ Char.Unknown,
  /* 106 - j                  */ Char.Unknown,
  /* 107 - k                  */ Char.Unknown,
  /* 108 - l                  */ Char.Unknown,
  /* 109 - m                  */ Char.Unknown,
  /* 110 - n                  */ Char.LowerN,
  /* 111 - o                  */ Char.Unknown,
  /* 112 - p                  */ Char.Unknown,
  /* 113 - q                  */ Char.Unknown,
  /* 114 - r                  */ Char.LowerR,
  /* 115 - s                  */ Char.Unknown,
  /* 116 - t                  */ Char.LowerT,
  /* 117 - u                  */ Char.LowerU,
  /* 118 - v                  */ Char.LowerV,
  /* 119 - w                  */ Char.Unknown,
  /* 120 - x                  */ Char.LowerX,
  /* 121 - y                  */ Char.Unknown,
  /* 122 - z                  */ Char.Unknown,
  /* 123 - {                  */ Char.Unknown,
  /* 124 - |                  */ Char.Unknown,
  /* 125 - }                  */ Char.Unknown,
  /* 126 - ~                  */ Char.Unknown,
  /* 127 - Delete             */ Char.Unknown
];

/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
export function scanTemplateSpan(state: ParserState, context: Context): Token {
  state.index++;
  let ret: string | null = '';
  let lastIsCR = 0;
  let cp = state.source.charCodeAt(state.index);
  const start = state.index;
  while (state.index < state.length) {
    // '`'
    if (cp === Char.Backtick) {
      state.tokenValue = ret;
      state.index++; // skips '`'
      state.tokenRaw = state.source.slice(start, state.index - 1);
      return Token.TemplateTail;
    }

    // '${'
    if (cp === Char.Dollar) {
      if (state.source.charCodeAt(state.index + 1) === Char.LeftBrace) {
        state.tokenRaw = state.source.slice(start, state.index);
        state.index = state.index += 2; // Consume '$', '{'
        state.tokenValue = ret;
        return Token.TemplateCont;
      }
      ret += '$';
    }

    // Escape character
    if (cp === Char.Backslash) {
      state.index++;
      cp = state.source.charCodeAt(state.index);
      // The TV of LineContinuation :: \ LineTerminatorSequence is the empty
      // code unit sequence.
      if ((unicodeLookup[(cp >>> 5) + 69632] >>> cp) & 31 & 1) {
        if (cp === Char.CarriageReturn) {
          state.index++;
          if (state.source.charCodeAt(state.index) === Char.LineFeed) state.index++;
        }
        state.columnOffset = state.index;
        state.line++;
      } else {
        const code = parseTemplateEscape(
          state,
          context,
          state.source,
          (context & Context.TaggedTemplate) === Context.TaggedTemplate,
          cp
        );
        // Invalid escape sequence checking is handled in the state
        ret = code < 0 ? null : (ret as string) + code;
      }
    } else {
      state.index++;
      // Fast check for characters that require special handling.
      // Catches 0, \n, \r, 0x2028, and 0x2029 as efficiently
      // as possible, and lets through all common ASCII characters
      if ((cp - 0xe) & 0x2000) {
        // The TRV of LineTerminatorSequence :: <CR> is the CV 0x000A.
        // The TRV of LineTerminatorSequence :: <CR><LF> is the sequence
        // consisting of the CV 0x000A.
        if (cp === Char.CarriageReturn) {
          lastIsCR = 1;
          state.line++;
          state.columnOffset = state.index;
        } else if (cp === Char.LineFeed || (cp ^ Char.LineSeparator) <= 1) {
          if (lastIsCR === 1) state.line++;
          state.columnOffset = state.index;
          lastIsCR = 0;
        }
      }
      if (ret != null) ret += fromCodePoint(cp);
    }
    cp = state.source.charCodeAt(state.index);
  }

  addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedTemplate, DiagnosticKind.Error);

  state.tokenValue = ret;

  return Token.TemplateTail;
}

export function parseTemplateEscape(
  state: ParserState,
  context: Context,
  source: string,
  isTagged: boolean,
  cp: number
): string | number {
  state.index++;
  switch (escapeChar[cp]) {
    case Char.LowerB:
      return '\b';
    case Char.LowerT:
      return '\t';
    case Char.LowerN:
      return '\n';
    case Char.LowerV:
      return '\v';
    case Char.LowerF:
      return '\f';
    case Char.LowerR:
      return '\r';

    // ASCII escapes
    case Char.LowerX: {
      const first = source.charCodeAt(state.index);
      if (
        (AsciiCharTypes[first] & AsciiCharFlags.Hex) === 0 ||
        (AsciiCharTypes[source.charCodeAt(state.index + 1)] & AsciiCharFlags.Hex) === 0
      ) {
        if (!isTagged) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidHexEscapeSequence,
            DiagnosticKind.Error
          );
        }
        // NotEscapeSequence :
        //  x [lookahread not one of HexDigit]
        //  x HexDigit [lookahread not one of HexDigit]
        if (AsciiCharTypes[first] & AsciiCharFlags.Hex) state.index++;

        return -1;
      }

      state.index++;
      const code = (toHex(first) << 4) | toHex(source.charCodeAt(state.index));
      state.index++;
      return code;
    }

    // UCS-2/Unicode escapes
    case Char.LowerU:
      cp = source.charCodeAt(state.index);

      if (cp === Char.LeftBrace) {
        // The first digit is required, so handle it *out* of the loop.
        cp = source.charCodeAt(++state.index);

        let digit = toHex(cp);

        if (digit < 0) {
          if (!isTagged) {
            addDiagnostic(
              state,
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
          if (code > Char.LastUnicodeChar) {
            if (!isTagged) {
              addDiagnostic(
                state,
                context,
                DiagnosticSource.Lexer,
                DiagnosticCode.UnicodeOverflow,
                DiagnosticKind.Error
              );
            }
            return -1;
          }

          digit = toHex(source.charCodeAt(++state.index));
        } while (digit >= 0);

        if (0 < digit || source.charCodeAt(state.index) !== Char.RightBrace) {
          if (!isTagged) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.UnsupportedUnicodeIdent,
              DiagnosticKind.Error
            );
          }
          return -1;
        }

        state.index++; // skips: '}'

        return fromCodePoint(code);
      }

      // \uNNNN
      if ((AsciiCharTypes[cp] & AsciiCharFlags.Hex) === 0) return -1; // first one is mandatory

      let code = 0;
      for (let i = 0; i < 4; i++) {
        const digit = toHex(cp);
        if (digit < 0) {
          if (!isTagged) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Lexer,
              DiagnosticCode.InvalidHexEscapeSequence,
              DiagnosticKind.Error
            );
          }
          return -1;
        }
        cp = source.charCodeAt(++state.index);
        code = (code << 4) | digit;
      }

      return fromCodePoint(code);

    // '0 ... 7'
    case Char.Zero:
    case Char.One:
    case Char.Two:
    case Char.Three:
    case Char.Four:
    case Char.Five:
    case Char.Six:
    case Char.Seven:
      const next = source.charCodeAt(state.index);

      // NotEscapeSequence :
      //   0 DecimalDigit
      //   DecimalDigit but not 0

      if (cp === Char.Zero && (next < Char.Zero || next > Char.Nine)) return '\0';

      if (!isTagged) {
        addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.TemplateBadEscape, DiagnosticKind.Error);
      }

      // Continue to parse out the octal escapes in 'recovery mode' as if we were in sloppy mode
      // even if template literals may not contain octal escape sequences

      if (next >= Char.Zero && next <= Char.Nine) state.index++;

      return -1;

    // `8`, `9` (invalid escapes)
    case Char.Eight:
    case Char.Nine:
      if (!isTagged) {
        addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.TemplateBadEscape, DiagnosticKind.Error);
      }
      return -1;
  }

  // Other escaped characters are interpreted as their non-escaped version.
  return fromCodePoint(cp);
}

export function scanTemplateTail(state: ParserState, context: Context): any {
  state.index--;
  return scanTemplateSpan(state, context);
}
