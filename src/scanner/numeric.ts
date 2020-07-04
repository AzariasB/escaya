import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharFlags, CharTypes } from './charClassifier';
import { toHex, fromCodePoint } from './common';

export const leadingZeroChars = [
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
  /*  10 - Line Feed          */ Chars.Unknown,
  /*  11 - Vertical Tab       */ Chars.Unknown,
  /*  12 - Form Feed          */ Chars.Unknown,
  /*  13 - Carriage Return    */ Chars.Unknown,
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
  /*  43 - +                  */ Chars.Plus,
  /*  44 - ,                  */ Chars.Unknown,
  /*  45 - -                  */ Chars.Hyphen,
  /*  46 - .                  */ Chars.Period,
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
  /*  65 - A                  */ Chars.UpperA,
  /*  66 - B                  */ Chars.UpperB,
  /*  67 - C                  */ Chars.UpperC,
  /*  68 - D                  */ Chars.UpperD,
  /*  69 - E                  */ Chars.UpperE,
  /*  70 - F                  */ Chars.UpperF,
  /*  71 - G                  */ Chars.Unknown,
  /*  72 - H                  */ Chars.Unknown,
  /*  73 - I                  */ Chars.Unknown,
  /*  74 - J                  */ Chars.Unknown,
  /*  75 - K                  */ Chars.Unknown,
  /*  76 - L                  */ Chars.Unknown,
  /*  77 - M                  */ Chars.Unknown,
  /*  78 - N                  */ Chars.Unknown,
  /*  79 - O                  */ Chars.UpperO,
  /*  80 - P                  */ Chars.Unknown,
  /*  81 - Q                  */ Chars.Unknown,
  /*  82 - R                  */ Chars.Unknown,
  /*  83 - S                  */ Chars.Unknown,
  /*  84 - T                  */ Chars.Unknown,
  /*  85 - U                  */ Chars.Unknown,
  /*  86 - V                  */ Chars.Unknown,
  /*  87 - W                  */ Chars.Unknown,
  /*  88 - X                  */ Chars.UpperX,
  /*  89 - Y                  */ Chars.Unknown,
  /*  90 - Z                  */ Chars.Unknown,
  /*  91 - [                  */ Chars.Unknown,
  /*  92 - \                  */ Chars.Unknown,
  /*  93 - ]                  */ Chars.Unknown,
  /*  94 - ^                  */ Chars.Unknown,
  /*  95 - _                  */ Chars.Unknown,
  /*  96 - `                  */ Chars.Unknown,
  /*  97 - a                  */ Chars.LowerA,
  /*  98 - b                  */ Chars.LowerB,
  /*  99 - c                  */ Chars.LowerC,
  /* 100 - d                  */ Chars.LowerD,
  /* 101 - e                  */ Chars.LowerE,
  /* 102 - f                  */ Chars.LowerF,
  /* 103 - g                  */ Chars.Unknown,
  /* 104 - h                  */ Chars.Unknown,
  /* 105 - i                  */ Chars.Unknown,
  /* 106 - j                  */ Chars.Unknown,
  /* 107 - k                  */ Chars.Unknown,
  /* 108 - l                  */ Chars.Unknown,
  /* 109 - m                  */ Chars.Unknown,
  /* 110 - n                  */ Chars.LowerN,
  /* 111 - o                  */ Chars.LowerO,
  /* 112 - p                  */ Chars.Unknown,
  /* 113 - q                  */ Chars.Unknown,
  /* 114 - r                  */ Chars.Unknown,
  /* 115 - s                  */ Chars.Unknown,
  /* 116 - t                  */ Chars.Unknown,
  /* 117 - u                  */ Chars.Unknown,
  /* 118 - v                  */ Chars.Unknown,
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

export function scanNumber(parser: ParserState, context: Context, ch: number, isFloat: boolean): Token {
  const enum NumberKind {
    None = 0,
    Decimal = 1 << 0,
    Hex = 1 << 1,
    Octal = 1 << 2,
    Binary = 1 << 3,
    DecimalWithLeadingZero = 1 << 9,
    ImplicitOctal = 1 << 10
  }

  // Optimization: most decimal values fit into 4 bytes.
  let value = 0;
  let start = parser.index;
  let type = NumberKind.Decimal;

  if (isFloat) {
    do {
      ch = parser.source.charCodeAt(++parser.index);
    } while (ch <= Chars.Nine && ch >= Chars.Zero);
  } else {
    if (ch === Chars.Zero) {
      parser.index++; // skips '0'

      ch = parser.source.charCodeAt(parser.index);

      if (CharTypes[ch] & CharFlags.OctHexBin) {
        let digits = 0;

        do {
          switch (leadingZeroChars[ch]) {
            // `x`, `X`
            case Chars.LowerX:
            case Chars.UpperX:
              if (type & 0b00001110) {
                addDiagnostic(
                  parser,
                  context,
                  DiagnosticSource.Lexer,
                  DiagnosticCode.IdafterNumber,
                  DiagnosticKind.Error
                );
              }
              type = NumberKind.Hex;
              break;

            // `b`, `B`
            case Chars.LowerB:
            case Chars.UpperB:
              if (type === NumberKind.Hex) {
                value = value * 0x0010 + toHex(ch);
                break;
              }

              if (type & 0b00001100) {
                addDiagnostic(
                  parser,
                  context,
                  DiagnosticSource.Lexer,
                  DiagnosticCode.IdafterNumber,
                  DiagnosticKind.Error
                );
              }

              type = NumberKind.Binary;
              break;

            // `o`, `O`
            case Chars.LowerO:
            case Chars.UpperO:
              if (type & 0b00001110) {
                addDiagnostic(
                  parser,
                  context,
                  DiagnosticSource.Lexer,
                  DiagnosticCode.IdafterNumber,
                  DiagnosticKind.Error
                );
              }

              type = NumberKind.Octal;
              break;

            // `0`...`7`
            case Chars.Zero:
            case Chars.One:
              if (type & NumberKind.Binary) {
                value = value * 2 + (ch - Chars.Zero);
                break;
              }
            case Chars.Two:
            case Chars.Three:
            case Chars.Four:
            case Chars.Five:
            case Chars.Six:
            case Chars.Seven:
              if (type === NumberKind.Octal) {
                value = value * 8 + (ch - Chars.Zero);
                break;
              }

            // `8`...`9`
            case Chars.Eight:
            case Chars.Nine:
              if (type === NumberKind.Hex) {
                value = value * 0x0010 + toHex(ch);
                break;
              }

              if (type & 0b00001100) {
                addDiagnostic(
                  parser,
                  context,
                  DiagnosticSource.Lexer,
                  type === NumberKind.Binary ? DiagnosticCode.BinarySequence : DiagnosticCode.OctalSequence,
                  DiagnosticKind.Error
                );
              }

              break;

            // `a-f`...`A-F`
            case Chars.LowerA:
            case Chars.LowerC:
            case Chars.LowerD:
            case Chars.LowerE:
            case Chars.LowerF:
            case Chars.UpperA:
            case Chars.UpperC:
            case Chars.UpperD:
            case Chars.UpperE:
            case Chars.UpperF:
              if (type & 0b00001100) {
                addDiagnostic(
                  parser,
                  context,
                  DiagnosticSource.Lexer,
                  type === NumberKind.Binary ? DiagnosticCode.BinarySequence : DiagnosticCode.OctalSequence,
                  DiagnosticKind.Error
                );
              }

              if (type === NumberKind.Hex) value = value * 0x0010 + toHex(ch);
              break;

            // `n`
            case Chars.LowerN:
              parser.tokenValue = value;
              parser.index++;
              return Token.BigIntLiteral;
          }

          digits++;
          parser.index++;
          ch = parser.source.charCodeAt(parser.index);
        } while (CharTypes[ch] & 0b100100001);

        if (CharTypes[ch] & 0b000000011) {
          addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.IdafterNumber, DiagnosticKind.Error);
        }

        if (type & 0b00001110 && digits <= 1) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            type & NumberKind.Binary
              ? // Binary integer literal like sequence without any digits
                DiagnosticCode.BinarySequenceNoDigits
              : type & NumberKind.Octal
              ? // Octal integer literal like sequence without any digits
                DiagnosticCode.OctalSequenceNoDigits
              : // Hex integer literal like sequence without any digits
                DiagnosticCode.HexSequenceNoDigits,
            DiagnosticKind.Error
          );
        }

        parser.tokenValue = value;
        return Token.NumericLiteral;
      }

      // Implicit octal with fallback to decimal with leading zero
      if (ch >= Chars.Zero && ch <= Chars.Eight) {
        // Octal integer literals are not permitted in strict mode code
        if (context & Context.Strict) {
          addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.StrictOctal, DiagnosticKind.Error);
        }

        type = NumberKind.ImplicitOctal;

        do {
          value = value * 8 + (ch - Chars.Zero);

          ch = parser.source.charCodeAt(++parser.index);

          if (ch >= Chars.Eight) {
            type = NumberKind.DecimalWithLeadingZero;
            break;
          }
        } while (ch >= Chars.Zero && ch <= Chars.Nine);

        if (type === NumberKind.ImplicitOctal) {
          parser.tokenValue = value;
          return Token.NumericLiteral;
        }
      }
    }

    let digit = 9;

    while (ch <= Chars.Nine && ch >= Chars.Zero) {
      value = value * 10 + (ch - Chars.Zero);
      ch = parser.source.charCodeAt(++parser.index);
      --digit;
    }
    if (
      (CharTypes[ch] & 0b000000011) === 0 &&
      type !== NumberKind.DecimalWithLeadingZero &&
      digit >= 0 &&
      ch !== Chars.Period
    ) {
      // Most numbers are pure decimal integers without fractional component
      // or exponential notation - handle that with optimized code
      parser.tokenValue = value;
      return Token.NumericLiteral;
    }

    if (ch === Chars.Period) {
      ch = parser.source.charCodeAt(++parser.index);
      while (ch <= Chars.Nine && ch >= Chars.Zero) {
        ch = parser.source.charCodeAt(++parser.index);
      }
    }
  }

  if (ch === Chars.LowerN) {
    parser.index++;
    parser.tokenValue = parseFloat(parser.source.slice(start, parser.index));
    return Token.BigIntLiteral;
  }

  if ((ch | 32) === Chars.LowerE) {
    parser.index++;
    ch = parser.source.charCodeAt(parser.index);

    // '-', '+'
    if (ch === Chars.Plus || ch === Chars.Hyphen) {
      parser.index++;
      ch = parser.source.charCodeAt(parser.index);
    }
    let digits = 0;

    while (ch <= Chars.Nine && ch >= Chars.Zero) {
      ch = parser.source.charCodeAt(++parser.index);
      digits++;
    }
    if (digits === 0) {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.MissingExponent, DiagnosticKind.Error);
    }
  }
  // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
  // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
  // For example : 3in is an error and not the two input elements 3 and in
  if ((CharTypes[ch] & 0b00000000000000000000000000000011) > 0) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.IdafterNumber, DiagnosticKind.Error);
  }
  parser.tokenValue = parseFloat(parser.source.slice(start, parser.index));

  return Token.NumericLiteral;
}
