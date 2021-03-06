import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { scanNumber, parseFloatingPointLiteral } from './numeric';
import { scanTemplateSpan } from './template';
import { Token } from './../ast/token';
import { scanString } from './string';
import { scanRegExp } from './regexp';
import { Char } from './char';
import {
  scanIdentifier,
  scanIdentifierOrKeyword,
  scanIdentifierEscapeIdStart,
  scanMaybeIdentifier
} from './identifiers';
import { skipWhitespace } from './whitespace';
import { ScannerState } from './common';

export const firstCharKinds = [
  /*   0 - Null               */ Token.Unknown,
  /*   1 - Start of Heading   */ Token.Unknown,
  /*   2 - Start of Text      */ Token.Unknown,
  /*   3 - End of Text        */ Token.Unknown,
  /*   4 - End of Transm.     */ Token.Unknown,
  /*   5 - Enquiry            */ Token.Unknown,
  /*   6 - Acknowledgment     */ Token.Unknown,
  /*   7 - Bell               */ Token.Unknown,
  /*   8 - Backspace          */ Token.Unknown,
  /*   9 - Horizontal Tab     */ Token.Unknown,
  /*  10 - Line Feed          */ Token.Unknown,
  /*  11 - Vertical Tab       */ Token.Unknown,
  /*  12 - Form Feed          */ Token.Unknown,
  /*  13 - Carriage Return    */ Token.Unknown,
  /*  14 - Shift Out          */ Token.Unknown,
  /*  15 - Shift In           */ Token.Unknown,
  /*  16 - Data Line Escape   */ Token.Unknown,
  /*  17 - Device Control 1   */ Token.Unknown,
  /*  18 - Device Control 2   */ Token.Unknown,
  /*  19 - Device Control 3   */ Token.Unknown,
  /*  20 - Device Control 4   */ Token.Unknown,
  /*  21 - Negative Ack.      */ Token.Unknown,
  /*  22 - Synchronous Idle   */ Token.Unknown,
  /*  23 - End of Transmit    */ Token.Unknown,
  /*  24 - Cancel             */ Token.Unknown,
  /*  25 - End of Medium      */ Token.Unknown,
  /*  26 - Substitute         */ Token.Unknown,
  /*  27 - Escape             */ Token.Unknown,
  /*  28 - File Separator     */ Token.Unknown,
  /*  29 - Group Separator    */ Token.Unknown,
  /*  30 - Record Separator   */ Token.Unknown,
  /*  31 - Unit Separator     */ Token.Unknown,
  /*  32 - Space              */ Token.Unknown,
  /*  33 - !                  */ Token.Negate,
  /*  34 - "                  */ Token.StringLiteral,
  /*  35 - #                  */ Token.Unknown,
  /*  36 - $                  */ Token.Identifier,
  /*  37 - %                  */ Token.Modulo,
  /*  38 - &                  */ Token.BitwiseAnd,
  /*  39 - '                  */ Token.StringLiteral,
  /*  40 - (                  */ Token.LeftParen,
  /*  41 - )                  */ Token.RightParen,
  /*  42 - *                  */ Token.Multiply,
  /*  43 - +                  */ Token.Add,
  /*  44 - ,                  */ Token.Comma,
  /*  45 - -                  */ Token.Subtract,
  /*  46 - .                  */ Token.Period,
  /*  47 - /                  */ Token.Divide,
  /*  48 - 0                  */ Token.NumericLiteral,
  /*  49 - 1                  */ Token.NumericLiteral,
  /*  50 - 2                  */ Token.NumericLiteral,
  /*  51 - 3                  */ Token.NumericLiteral,
  /*  52 - 4                  */ Token.NumericLiteral,
  /*  53 - 5                  */ Token.NumericLiteral,
  /*  54 - 6                  */ Token.NumericLiteral,
  /*  55 - 7                  */ Token.NumericLiteral,
  /*  56 - 8                  */ Token.NumericLiteral,
  /*  57 - 9                  */ Token.NumericLiteral,
  /*  58 - :                  */ Token.Colon,
  /*  59 - ;                  */ Token.Semicolon,
  /*  60 - <                  */ Token.LessThan,
  /*  61 - =                  */ Token.Assign,
  /*  62 - >                  */ Token.GreaterThan,
  /*  63 - ?                  */ Token.QuestionMark,
  /*  64 - @                  */ Token.Unknown,
  /*  65 - A                  */ Token.Identifier,
  /*  66 - B                  */ Token.Identifier,
  /*  67 - C                  */ Token.Identifier,
  /*  68 - D                  */ Token.Identifier,
  /*  69 - E                  */ Token.Identifier,
  /*  70 - F                  */ Token.Identifier,
  /*  71 - G                  */ Token.Identifier,
  /*  72 - H                  */ Token.Identifier,
  /*  73 - I                  */ Token.Identifier,
  /*  74 - J                  */ Token.Identifier,
  /*  75 - K                  */ Token.Identifier,
  /*  76 - L                  */ Token.Identifier,
  /*  77 - M                  */ Token.Identifier,
  /*  78 - N                  */ Token.Identifier,
  /*  79 - O                  */ Token.Identifier,
  /*  80 - P                  */ Token.Identifier,
  /*  81 - Q                  */ Token.Identifier,
  /*  82 - R                  */ Token.Identifier,
  /*  83 - S                  */ Token.Identifier,
  /*  84 - T                  */ Token.Identifier,
  /*  85 - U                  */ Token.Identifier,
  /*  86 - V                  */ Token.Identifier,
  /*  87 - W                  */ Token.Identifier,
  /*  88 - X                  */ Token.Identifier,
  /*  89 - Y                  */ Token.Identifier,
  /*  90 - Z                  */ Token.Identifier,
  /*  91 - [                  */ Token.LeftBracket,
  /*  92 - \                  */ Token.EscapedIdentifier,
  /*  93 - ]                  */ Token.RightBracket,
  /*  94 - ^                  */ Token.BitwiseXor,
  /*  95 - _                  */ Token.Identifier,
  /*  96 - `                  */ Token.TemplateTail,
  /*  97 - a                  */ Token.IdentifierOrKeyword,
  /*  98 - b                  */ Token.IdentifierOrKeyword,
  /*  99 - c                  */ Token.IdentifierOrKeyword,
  /* 100 - d                  */ Token.IdentifierOrKeyword,
  /* 101 - e                  */ Token.IdentifierOrKeyword,
  /* 102 - f                  */ Token.IdentifierOrKeyword,
  /* 103 - g                  */ Token.IdentifierOrKeyword,
  /* 104 - h                  */ Token.Identifier,
  /* 105 - i                  */ Token.IdentifierOrKeyword,
  /* 106 - j                  */ Token.Identifier,
  /* 107 - k                  */ Token.Identifier,
  /* 108 - l                  */ Token.IdentifierOrKeyword,
  /* 109 - m                  */ Token.IdentifierOrKeyword,
  /* 110 - n                  */ Token.IdentifierOrKeyword,
  /* 111 - o                  */ Token.IdentifierOrKeyword,
  /* 112 - p                  */ Token.IdentifierOrKeyword,
  /* 113 - q                  */ Token.Identifier,
  /* 114 - r                  */ Token.IdentifierOrKeyword,
  /* 115 - s                  */ Token.IdentifierOrKeyword,
  /* 116 - t                  */ Token.IdentifierOrKeyword,
  /* 117 - u                  */ Token.IdentifierOrKeyword,
  /* 118 - v                  */ Token.IdentifierOrKeyword,
  /* 119 - w                  */ Token.IdentifierOrKeyword,
  /* 120 - x                  */ Token.Identifier,
  /* 121 - y                  */ Token.IdentifierOrKeyword,
  /* 122 - z                  */ Token.IdentifierOrKeyword,
  /* 123 - {                  */ Token.LeftBrace,
  /* 124 - |                  */ Token.BitwiseOr,
  /* 125 - }                  */ Token.RightBrace,
  /* 126 - ~                  */ Token.Complement
];

export function scanSingleToken(state: ParserState, context: Context): Token {
  skipWhitespace(state, context, ScannerState.None);
  if (state.index >= state.length) return Token.EOF;
  state.tokenIndex = state.index;
  let cp = state.source.charCodeAt(state.index);
  if (cp > 127) return scanMaybeIdentifier(state, context);

  const token = firstCharKinds[cp];
  switch (token) {
    case Token.RightBrace:
    case Token.LeftBrace:
    case Token.Comma:
    case Token.Colon:
    case Token.Complement:
    case Token.LeftParen:
    case Token.RightParen:
    case Token.Semicolon:
    case Token.LeftBracket:
    case Token.RightBracket:
      state.index++;
      return token;

    // `a`...`z`,
    case Token.IdentifierOrKeyword:
      return scanIdentifierOrKeyword(state, context, cp);

    //  `A`...`Z`, `_var`, `$var`
    case Token.Identifier:
      return scanIdentifier(state, context, cp);

    // `0`...`9`
    case Token.NumericLiteral:
      return scanNumber(state, context, cp);

    // `.`, `...`, `.123` (numeric literal)
    case Token.Period:
      let index = state.index + 1;

      if (index < state.length) {
        cp = state.source.charCodeAt(index);

        if (cp >= Char.Zero && cp <= Char.Nine) {
          return parseFloatingPointLiteral(state, context, cp);
        }

        if (cp === Char.Period) {
          index++;
          if (index < state.length && state.source.charCodeAt(index) === Char.Period) {
            state.index = index + 1;
            return Token.Ellipsis;
          }
        }
      }
      state.index++;
      return Token.Period;

    // `'string'`, `"string"`
    case Token.StringLiteral:
      return scanString(state, context, cp);

    // `=`, `==`, `===`, `=>`
    case Token.Assign:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.StrictEqual;
        }
        return Token.LooseEqual;
      }
      if (cp === Char.GreaterThan) {
        state.index++;
        return Token.Arrow;
      }
      return Token.Assign;

    // `+`, `++`, `+=`
    case Token.Add:
      state.index++;
      cp = state.source.charCodeAt(state.index);

      if (cp === Char.Plus) {
        state.index++;
        return Token.Increment;
      }
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.AddAssign;
      }
      return Token.Add;

    // ``string``
    case Token.TemplateTail:
      return scanTemplateSpan(state, context);

    // `?`, `?.`, `??`, `??=`,
    case Token.QuestionMark:
      state.index++;

      cp = state.source.charCodeAt(state.index);

      if (cp === Char.Period) {
        state.index++;
        // The specs explicitly disallows a digit after `?.`, for example `?.a`
        // or `?.5` then it should be treated as a ternary rather than as an optional chain
        cp = state.source.charCodeAt(state.index);

        if (cp >= Char.Zero && cp <= Char.Nine) {
          return Token.QuestionMark;
        }

        return Token.QuestionMarkPeriod;
      }

      if (cp === Char.QuestionMark) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.NullishAssign;
        }
        return Token.Nullish;
      }

      return Token.QuestionMark;

    // `!`, `!=`, `!==`
    case Token.Negate:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.StrictNotEqual;
        }
        return Token.LooseNotEqual;
      }
      return Token.Negate;

    // `*`, `**`, `*=`, `**=`
    case Token.Multiply:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.MultiplyAssign;
      }
      if (cp === Char.Asterisk) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.ExponentiateAssign;
        }
        return Token.Exponentiate;
      }
      return Token.Multiply;

    // `/`, `/=`, `/>`, '/*..*/'
    case Token.Divide:
      state.index++;
      cp = state.source.charCodeAt(state.index);

      if (context & Context.AllowRegExp) return scanRegExp(state, context);

      if (cp === Char.EqualSign) {
        state.index++;
        return Token.DivideAssign;
      }
      return Token.Divide;

    // `-`, `--`, `-=`, `-->`
    case Token.Subtract:
      state.index++;

      cp = state.source.charCodeAt(state.index);

      if (cp === Char.Hyphen) {
        state.index++;
        return Token.Decrement;
      }

      if (cp === Char.EqualSign) {
        state.index++;
        return Token.SubtractAssign;
      }
      return Token.Subtract;

    // `<`, `<=`, `<<`, `<<=`, `</`, `<!--`
    case Token.LessThan:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.LessThanOrEqual;
      }
      if (cp === Char.LessThan) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.ShiftLeftAssign;
        }
        return Token.ShiftLeft;
      }
      return Token.LessThan;

    // `&`, `&&`, `&=`, `&&=`
    case Token.BitwiseAnd:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.Ampersand) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.LogicalAndAssign;
        }
        return Token.LogicalAnd;
      }
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.BitwiseAndAssign;
      }
      return Token.BitwiseAnd;

    // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
    case Token.GreaterThan:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.GreaterThanOrEqual;
      }
      if (cp === Char.GreaterThan) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.GreaterThan) {
          state.index++;
          if (state.source.charCodeAt(state.index) === Char.EqualSign) {
            state.index++;
            return Token.LogicalShiftRightAssign;
          }
          return Token.LogicalShiftRight;
        }
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.ShiftRightAssign;
        }
        return Token.ShiftRight;
      }
      return Token.GreaterThan;

    // `|`, `||`, `|=`
    case Token.BitwiseOr:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.VerticalBar) {
        state.index++;
        if (state.source.charCodeAt(state.index) === Char.EqualSign) {
          state.index++;
          return Token.LogicalOrAssign;
        }
        return Token.LogicalOr;
      }
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.BitwiseOrAssign;
      }
      return Token.BitwiseOr;

    // `%`, `%=`
    case Token.Modulo:
      state.index++;
      cp = state.source.charCodeAt(state.index);

      if (cp === Char.EqualSign) {
        state.index++;
        return Token.ModuloAssign;
      }
      return Token.Modulo;

    // `^`, `^=`
    case Token.BitwiseXor:
      state.index++;
      cp = state.source.charCodeAt(state.index);
      if (cp === Char.EqualSign) {
        state.index++;
        return Token.BitwiseXorAssign;
      }
      return Token.BitwiseXor;

    // `\\u{N}var`
    case Token.EscapedIdentifier:
      return scanIdentifierEscapeIdStart(state, context);

    default:
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidCharacter, DiagnosticKind.Error);
      state.index++;
  }
  // ASCII range > 127

  return Token.EOF;
}

export function nextToken(state: ParserState, context: Context): void {
  // Position of 'index' before whitespace.
  state.startIndex = state.index;
  state.lineTerminatorBeforeNextToken = false;
  state.endIndex = state.index;
  state.line = state.lineForNextToken;
  state.endColumn = state.columnForNextToken;
  state.token = scanSingleToken(state, context);
  // In 'recovery' mode the 'start' of the token is 'before' any
  // whitespace. However in 'normal parsing mode' we need to adjust
  // 'startIndex' to be equal to 'tokenIndex' to be in line with
  // other parsers such as 'Tenko' and 'Acorn'
  if ((context & Context.ErrorRecovery) === 0) {
    state.startIndex = state.tokenIndex;
    state.columnForNextToken = state.index - state.columnOffset;
    state.lineForNextToken = state.line;
  }
}
