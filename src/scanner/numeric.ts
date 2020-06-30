import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharFlags, CharTypes } from './charClassifier';

export const enum NumberKind {
  None = 0,
  Decimal = 1 << 0,
  Hex = 1 << 1,
  Octal = 1 << 2,
  Binary = 1 << 3,
  BigInt = 1 << 4,
  Float = 1 << 5,
  Exponent = 1 << 6,
  Scientific = 1 << 7,
  SMI = 1 << 8,
  DecimalWithLeadingZero = 1 << 9,
  ImplicitOctal = 1 << 10
}

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
  /*  65 - A                  */ Chars.Unknown,
  /*  66 - B                  */ Chars.Unknown,
  /*  67 - C                  */ Chars.Unknown,
  /*  68 - D                  */ Chars.Unknown,
  /*  69 - E                  */ Chars.UpperE,
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
  /*  98 - b                  */ Chars.Unknown,
  /*  99 - c                  */ Chars.Unknown,
  /* 100 - d                  */ Chars.Unknown,
  /* 101 - e                  */ Chars.LowerE,
  /* 102 - f                  */ Chars.Unknown,
  /* 103 - g                  */ Chars.Unknown,
  /* 104 - h                  */ Chars.Unknown,
  /* 105 - i                  */ Chars.Unknown,
  /* 106 - j                  */ Chars.Unknown,
  /* 107 - k                  */ Chars.Unknown,
  /* 108 - l                  */ Chars.Unknown,
  /* 109 - m                  */ Chars.Unknown,
  /* 110 - n                  */ Chars.Unknown,
  /* 111 - o                  */ Chars.Unknown,
  /* 112 - p                  */ Chars.Unknown,
  /* 113 - q                  */ Chars.Unknown,
  /* 114 - r                  */ Chars.Unknown,
  /* 115 - s                  */ Chars.Unknown,
  /* 116 - t                  */ Chars.Unknown,
  /* 117 - u                  */ Chars.Unknown,
  /* 118 - v                  */ Chars.Unknown,
  /* 119 - w                  */ Chars.Unknown,
  /* 120 - x                  */ Chars.Unknown,
  /* 121 - y                  */ Chars.Unknown,
  /* 122 - z                  */ Chars.Unknown,
  /* 123 - {                  */ Chars.Unknown,
  /* 124 - |                  */ Chars.Unknown,
  /* 125 - }                  */ Chars.Unknown,
  /* 126 - ~                  */ Chars.Unknown,
  /* 127 - Delete             */ Chars.Unknown
];

export function scanNumber(parser: ParserState, _context: Context, ch: number, type: NumberKind): Token {
  let start = parser.index;

  // Optimization: most decimal values fit into 4 bytes.
  let value = 0;
  let digit = 9;

  while (CharTypes[ch] & (CharFlags.NumericLiteral | CharFlags.Decimal)) {
    switch (escapeChars[ch]) {
      // `0`...`9`
      case Chars.Zero:
      case Chars.One:
      case Chars.Two:
      case Chars.Three:
      case Chars.Four:
      case Chars.Five:
      case Chars.Six:
      case Chars.Seven:
      case Chars.Eight:
      case Chars.Nine:
        if (type === NumberKind.Float) break;

        if (digit < 0 && type & NumberKind.SMI) {
          type = NumberKind.Decimal;
          break;
        }
        value = value * 10 + (ch - Chars.Zero);
        break;

      case Chars.LowerN:
        parser.tokenValue = type & NumberKind.SMI ? value : parseFloat(parser.source.slice(start, parser.index));
        return Token.BigIntLiteral;

      // `e`, `E`
      case Chars.LowerE:
      case Chars.UpperE:
        type = NumberKind.Exponent;
        break;

      // `.`
      case Chars.Period:
        type = NumberKind.Float;
        break;

      // `-`, `+`
      case Chars.Hyphen:
      case Chars.Plus:
        type = NumberKind.Scientific;
      default:
    }

    parser.index++;
    ch = parser.source.charCodeAt(parser.index);
    --digit;
  }

  if (type === NumberKind.Exponent) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  if (CharTypes[ch] & CharFlags.IdentifierStart) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  parser.tokenValue = type & NumberKind.SMI ? value : parseFloat(parser.source.slice(start, parser.index));
  return Token.NumericLiteral;
}
