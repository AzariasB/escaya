import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { skipMultiLineComment, skipSingleLineComment, skipSingleHTMLComment } from './comments';
import { Token } from '../token';
import { scanIdentifier, scanIdentifierSlowPath, scanIdentifierEscapeIdStart, scanPrivateName } from './identifier';
import { scanNumber } from './numeric';
import { LexerState, fromCodePoint } from './common';
import { unicodeLookup } from './unicode';
import { scanString } from './string';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';

export const oneCharTokens = [
  /*   0 - Null               */ Token.Unknown,
  /*   1 - Start of Heading   */ Token.Unknown,
  /*   2 - Start of Text      */ Token.Unknown,
  /*   3 - End of Text        */ Token.Unknown,
  /*   4 - End of Transm.     */ Token.Unknown,
  /*   5 - Enquiry            */ Token.Unknown,
  /*   6 - Acknowledgment     */ Token.Unknown,
  /*   7 - Bell               */ Token.Unknown,
  /*   8 - Backspace          */ Token.Unknown,
  /*   9 - Horizontal Tab     */ Token.WhiteSpace,
  /*  10 - Line Feed          */ Token.LineFeed,
  /*  11 - Vertical Tab       */ Token.WhiteSpace,
  /*  12 - Form Feed          */ Token.WhiteSpace,
  /*  13 - Carriage Return    */ Token.CarriageReturn,
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
  /*  32 - Space              */ Token.WhiteSpace,
  /*  33 - !                  */ Token.Negate,
  /*  34 - "                  */ Token.StringLiteral,
  /*  35 - #                  */ Token.PrivateName,
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
  /*  97 - a                  */ Token.Identifier,
  /*  98 - b                  */ Token.Identifier,
  /*  99 - c                  */ Token.Identifier,
  /* 100 - d                  */ Token.Identifier,
  /* 101 - e                  */ Token.Identifier,
  /* 102 - f                  */ Token.Identifier,
  /* 103 - g                  */ Token.Identifier,
  /* 104 - h                  */ Token.Identifier,
  /* 105 - i                  */ Token.Identifier,
  /* 106 - j                  */ Token.Identifier,
  /* 107 - k                  */ Token.Identifier,
  /* 108 - l                  */ Token.Identifier,
  /* 109 - m                  */ Token.Identifier,
  /* 110 - n                  */ Token.Identifier,
  /* 111 - o                  */ Token.Identifier,
  /* 112 - p                  */ Token.Identifier,
  /* 113 - q                  */ Token.Identifier,
  /* 114 - r                  */ Token.Identifier,
  /* 115 - s                  */ Token.Identifier,
  /* 116 - t                  */ Token.Identifier,
  /* 117 - u                  */ Token.Identifier,
  /* 118 - v                  */ Token.Identifier,
  /* 119 - w                  */ Token.Identifier,
  /* 120 - x                  */ Token.Identifier,
  /* 121 - y                  */ Token.Identifier,
  /* 122 - z                  */ Token.Identifier,
  /* 123 - {                  */ Token.LeftBrace,
  /* 124 - |                  */ Token.BitwiseOr,
  /* 125 - }                  */ Token.RightBrace,
  /* 126 - ~                  */ Token.Complement,
  /* 127 - Delete             */ Token.Unknown,
  /* 128 - Cc category        */ Token.Unknown,
  /* 129 - Cc category        */ Token.Unknown,
  /* 130 - Cc category        */ Token.Unknown,
  /* 131 - Cc category        */ Token.Unknown,
  /* 132 - Cc category        */ Token.Unknown,
  /* 133 - Cc category        */ Token.Unknown,
  /* 134 - Cc category        */ Token.Unknown,
  /* 135 - Cc category        */ Token.Unknown,
  /* 136 - Cc category        */ Token.Unknown,
  /* 137 - Cc category        */ Token.Unknown,
  /* 138 - Cc category        */ Token.Unknown,
  /* 139 - Cc category        */ Token.Unknown,
  /* 140 - Cc category        */ Token.Unknown,
  /* 141 - Cc category        */ Token.Unknown,
  /* 142 - Cc category        */ Token.Unknown,
  /* 143 - Cc category        */ Token.Unknown,
  /* 144 - Cc category        */ Token.Unknown,
  /* 145 - Cc category        */ Token.Unknown,
  /* 146 - Cc category        */ Token.Unknown,
  /* 147 - Cc category        */ Token.Unknown,
  /* 148 - Cc category        */ Token.Unknown,
  /* 149 - Cc category        */ Token.Unknown,
  /* 150 - Cc category        */ Token.Unknown,
  /* 151 - Cc category        */ Token.Unknown,
  /* 152 - Cc category        */ Token.Unknown,
  /* 153 - Cc category        */ Token.Unknown,
  /* 154 - Cc category        */ Token.Unknown,
  /* 155 - Cc category        */ Token.Unknown,
  /* 156 - Cc category        */ Token.Unknown,
  /* 157 - Cc category        */ Token.Unknown,
  /* 158 - Cc category        */ Token.Unknown,
  /* 159 - Cc category        */ Token.Unknown,
  /* 160 - Zs category (nbsp) */ Token.Unknown,
  /* 161 - Po category        */ Token.Unknown,
  /* 162 - Sc category        */ Token.Unknown,
  /* 163 - Sc category        */ Token.Unknown,
  /* 164 - Sc category        */ Token.Unknown,
  /* 165 - Sc category        */ Token.Unknown,
  /* 166 - So category        */ Token.Unknown,
  /* 167 - So category        */ Token.Unknown,
  /* 168 - Sk category        */ Token.Unknown,
  /* 169 - So category        */ Token.Unknown,
  /* 170 - Ll category        */ Token.Identifier,
  /* 171 - Pi category        */ Token.Unknown,
  /* 172 - Sm category        */ Token.Unknown,
  /* 173 - Cf category        */ Token.Unknown,
  /* 174 - So category        */ Token.Unknown,
  /* 175 - Sk category        */ Token.Unknown,
  /* 176 - So category        */ Token.Unknown,
  /* 177 - Sm category        */ Token.Unknown,
  /* 178 - No category        */ Token.Unknown,
  /* 179 - No category        */ Token.Unknown,
  /* 180 - Sk category        */ Token.Unknown,
  /* 181 - Ll category        */ Token.Identifier,
  /* 182 - So category        */ Token.Unknown,
  /* 183 - Po category        */ Token.Unknown,
  /* 184 - Sk category        */ Token.Unknown,
  /* 185 - No category        */ Token.Unknown,
  /* 186 - Ll category        */ Token.Identifier,
  /* 187 - Pf category        */ Token.Unknown,
  /* 188 - No category        */ Token.Unknown,
  /* 189 - No category        */ Token.Unknown,
  /* 190 - No category        */ Token.Unknown,
  /* 191 - Po category        */ Token.Unknown,
  /* 192 - Lu category        */ Token.Identifier,
  /* 193 - Lu category        */ Token.Identifier,
  /* 194 - Lu category        */ Token.Identifier,
  /* 195 - Lu category        */ Token.Identifier,
  /* 196 - Lu category        */ Token.Identifier,
  /* 197 - Lu category        */ Token.Identifier,
  /* 198 - Lu category        */ Token.Identifier,
  /* 199 - Lu category        */ Token.Identifier,
  /* 200 - Lu category        */ Token.Identifier,
  /* 201 - Lu category        */ Token.Identifier,
  /* 202 - Lu category        */ Token.Identifier,
  /* 203 - Lu category        */ Token.Identifier,
  /* 204 - Lu category        */ Token.Identifier,
  /* 205 - Lu category        */ Token.Identifier,
  /* 206 - Lu category        */ Token.Identifier,
  /* 207 - Lu category        */ Token.Identifier,
  /* 208 - Lu category        */ Token.Identifier,
  /* 209 - Lu category        */ Token.Identifier,
  /* 210 - Lu category        */ Token.Identifier,
  /* 211 - Lu category        */ Token.Identifier,
  /* 212 - Lu category        */ Token.Identifier,
  /* 213 - Lu category        */ Token.Identifier,
  /* 214 - Lu category        */ Token.Identifier,
  /* 215 - Sm category        */ Token.Unknown,
  /* 216 - Lu category        */ Token.Identifier,
  /* 217 - Lu category        */ Token.Identifier,
  /* 218 - Lu category        */ Token.Identifier,
  /* 219 - Lu category        */ Token.Identifier,
  /* 220 - Lu category        */ Token.Identifier,
  /* 221 - Lu category        */ Token.Identifier,
  /* 222 - Lu category        */ Token.Identifier,
  /* 223 - Ll category        */ Token.Identifier,
  /* 224 - Ll category        */ Token.Identifier,
  /* 225 - Ll category        */ Token.Identifier,
  /* 226 - Ll category        */ Token.Identifier,
  /* 227 - Ll category        */ Token.Identifier,
  /* 228 - Ll category        */ Token.Identifier,
  /* 229 - Ll category        */ Token.Identifier,
  /* 230 - Ll category        */ Token.Identifier,
  /* 231 - Ll category        */ Token.Identifier,
  /* 232 - Ll category        */ Token.Identifier,
  /* 233 - Ll category        */ Token.Identifier,
  /* 234 - Ll category        */ Token.Identifier,
  /* 235 - Ll category        */ Token.Identifier,
  /* 236 - Ll category        */ Token.Identifier,
  /* 237 - Ll category        */ Token.Identifier,
  /* 238 - Ll category        */ Token.Identifier,
  /* 239 - Ll category        */ Token.Identifier,
  /* 240 - Ll category        */ Token.Identifier,
  /* 241 - Ll category        */ Token.Identifier,
  /* 242 - Ll category        */ Token.Identifier,
  /* 243 - Ll category        */ Token.Identifier,
  /* 244 - Ll category        */ Token.Identifier,
  /* 245 - Ll category        */ Token.Identifier,
  /* 246 - Ll category        */ Token.Identifier,
  /* 247 - Sm category        */ Token.Unknown,
  /* 248 - Ll category        */ Token.Identifier,
  /* 249 - Ll category        */ Token.Identifier,
  /* 250 - Ll category        */ Token.Identifier,
  /* 251 - Ll category        */ Token.Identifier,
  /* 252 - Ll category        */ Token.Identifier,
  /* 253 - Ll category        */ Token.Identifier,
  /* 254 - Ll category        */ Token.Identifier,
  /* 255 - Ll category        */ Token.Identifier
];

export function scan(parser: ParserState, context: Context): Token {
  // Position of 'index' before whitespace.
  parser.startIndex = parser.index;

  let state = parser.index === 0 ? LexerState.LineStart : LexerState.None;

  while (parser.index < parser.length) {
    let ch = parser.source.charCodeAt(parser.index);

    if (ch < 127) {
      const token = oneCharTokens[ch];

      switch (oneCharTokens[ch]) {
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
          // One character tokens
          parser.index++;
          return token;

        /* general whitespace */
        case Token.WhiteSpace:
          parser.index++;
          break;

        // `a`...`z`, `A`...`Z`, `_var`, `$var`
        case Token.Identifier:
          return scanIdentifier(parser, context);

        // `0`...`9`
        case Token.NumericLiteral:
          return scanNumber(parser, context, ch, false);

        // `'string'`, `"string"`
        case Token.StringLiteral:
          return scanString(parser, context, ch);

        // ``string``
        case Token.TemplateTail:
        //return scanTemplateSpan(parser, context);

        // `\\u{N}var`
        case Token.EscapedIdentifier:
          return scanIdentifierEscapeIdStart(parser, context);

        // `#foo`, `#!shebang`
        case Token.PrivateName:
          if (state & LexerState.LineStart && parser.source.charCodeAt(parser.index + 1) === Chars.Exclamation) {
            state = skipSingleLineComment(parser, state);
            continue;
          }
          return scanPrivateName(parser, context, ch);

        case Token.CarriageReturn:
          state |= LexerState.NewLine | LexerState.LastIsCR;
          parser.index++;
          parser.hasLineTerminator = true;
          parser.columnOffset = parser.index;
          parser.line++;
          break;

        case Token.LineFeed:
          parser.index++;
          parser.columnOffset = parser.index;
          parser.hasLineTerminator = true;
          if ((state & LexerState.LastIsCR) === 0) parser.line++;
          state = (state & ~LexerState.LastIsCR) | LexerState.NewLine;
          break;

        // `.`, `...`, `.123` (numeric literal)
        case Token.Period:
          let index = parser.index + 1;

          if (index < parser.length) {
            ch = parser.source.charCodeAt(index);

            if (ch >= Chars.Zero && ch <= Chars.Nine) {
              parser.index++;
              return scanNumber(parser, context, ch, true);
            }

            if (ch === Chars.Period) {
              index++;
              if (index < parser.length && parser.source.charCodeAt(index) === Chars.Period) {
                parser.index = index + 1;
                return Token.Ellipsis;
              }
            }
          }
          parser.index++;
          return Token.Period;

        // `!`, `!=`, `!==`
        case Token.Negate:
          parser.index++;

          if (parser.source.charCodeAt(parser.index) === Chars.EqualSign) {
            parser.index++;
            if (parser.source.charCodeAt(parser.index) === Chars.EqualSign) {
              parser.index++;
              return Token.StrictNotEqual;
            }
            return Token.LooseNotEqual;
          }

          return Token.Negate;

        // `%`, `%=`
        case Token.Modulo:
          parser.index++;
          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Modulo;
          parser.index++;
          return Token.ModuloAssign;

        // `^`, `^=`
        case Token.BitwiseXor:
          parser.index++;
          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.BitwiseXor;
          parser.index++;
          return Token.BitwiseXorAssign;

        // `|`, `||`, `|=`
        case Token.BitwiseOr:
          parser.index++;
          if (parser.index >= parser.length) return Token.BitwiseOr;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.VerticalBar) {
            parser.index++;

            if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) {
              return Token.LogicalOr;
            }
            parser.index++;

            return Token.LogicalOrAssign;
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.BitwiseOrAssign;
          }

          return Token.BitwiseOr;

        // `&`, `&&`, `&=`
        case Token.BitwiseAnd:
          parser.index++;

          if (parser.index >= parser.length) return Token.BitwiseAnd;
          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.Ampersand) {
            parser.index++;

            if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) {
              return Token.LogicalAnd;
            }
            parser.index++;

            return Token.LogicalAndAssign;
          }
          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.BitwiseAndAssign;
          }

          return Token.BitwiseAnd;

        // `=`, `==`, `===`, `=>`
        case Token.Assign:
          parser.index++;
          if (parser.index >= parser.length) return Token.Assign;
          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            if (parser.source.charCodeAt(parser.index) === Chars.EqualSign) {
              parser.index++;
              return Token.StrictEqual;
            }
            return Token.LooseEqual;
          }
          if (ch === Chars.GreaterThan) {
            parser.index++;
            return Token.Arrow;
          }

          return Token.Assign;

        // `*`, `**`, `*=`, `**=`
        case Token.Multiply:
          parser.index++;

          if (parser.index >= parser.length) return Token.Multiply;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.MultiplyAssign;
          }

          if (ch !== Chars.Asterisk) return Token.Multiply;

          parser.index++;

          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Exponentiate;
          parser.index++;

          return Token.ExponentiateAssign;

        // `+`, `++`, `+=`
        case Token.Add:
          parser.index++;

          if (parser.index >= parser.length) return Token.Add;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.Plus) {
            parser.index++;
            return Token.Increment;
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.AddAssign;
          }

          return Token.Add;

        // `/`, `/=`, `/>`, '/*..*/'
        case Token.Divide:
          parser.index++;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.Slash) {
            state = skipSingleLineComment(parser, state);
            continue;
          }

          if (ch === Chars.Asterisk) {
            state = skipMultiLineComment(parser, context, state) as LexerState;
            continue;
          }

          if (context & Context.AllowRegExp) {
            //  return scanRegExp(parser, context);
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.DivideAssign;
          }

          return Token.Divide;

        // `?`, `?.`, `??`, `??=`
        case Token.QuestionMark: {
          let index = parser.index + 1;

          if (index < parser.length) {
            ch = parser.source.charCodeAt(index);

            if (ch === Chars.Period) {
              ch = parser.source.charCodeAt(index + 1);

              if (ch >= Chars.Zero && ch <= Chars.Nine) {
                parser.index = index + 1;
                return Token.QuestionMark;
              }

              parser.index = index + 1;

              return Token.QuestionMarkPeriod;
            }

            if (ch === Chars.QuestionMark) {
              index++;
              if (parser.source.charCodeAt(index) === Chars.EqualSign) {
                parser.index = index + 1;
                return Token.CoalesceAssign;
              }

              parser.index = index;
              return Token.Coalesce;
            }
          }
          parser.index++;
          return Token.QuestionMark;
        }

        // `-`, `--`, `-=`, `-->`
        case Token.Subtract:
          parser.index++;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.Hyphen) {
            parser.index++;
            if (
              parser.source.charCodeAt(parser.index) === Chars.GreaterThan &&
              state & (LexerState.NewLine | LexerState.LineStart)
            ) {
              state = skipSingleHTMLComment(parser, context, state);
              continue;
            }
            return Token.Decrement;
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.SubtractAssign;
          }
          return Token.Subtract;

        // `<`, `<=`, `<<`, `<<=`, `</`, `<!--`
        case Token.LessThan:
          parser.index++;

          if (parser.index >= parser.length) return Token.LessThan;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.LessThan) {
            if (parser.source.charCodeAt(++parser.index) === Chars.EqualSign) {
              parser.index++;
              return Token.ShiftLeftAssign;
            }
            return Token.ShiftLeft;
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.LessThanOrEqual;
          }
          // Check for <!-- comments
          if (ch === Chars.Exclamation) {
            if (
              parser.source.charCodeAt(parser.index + 2) === Chars.Hyphen &&
              parser.source.charCodeAt(parser.index + 1) === Chars.Hyphen
            ) {
              state = skipSingleHTMLComment(parser, context, state);
              continue;
            }
          }
          return Token.LessThan;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Token.GreaterThan:
          parser.index++;

          if (parser.index >= parser.length) return Token.GreaterThan;

          ch = parser.source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.GreaterThanOrEqual;
          }

          if (ch !== Chars.GreaterThan) return Token.GreaterThan;
          parser.index++;

          if (parser.index < parser.length) {
            ch = parser.source.charCodeAt(parser.index);

            if (ch === Chars.GreaterThan) {
              parser.index++;

              if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) {
                return Token.LogicalShiftRight;
              }

              parser.index++;

              return Token.LogicalShiftRightAssign;
            }

            if (ch === Chars.EqualSign) {
              parser.index++;
              return Token.ShiftRightAssign;
            }
          }
          return Token.ShiftRight;

        default:
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidCharacter,
            DiagnosticKind.Error,
            fromCodePoint(ch)
          );

          parser.index++;
      }
      // ASCII range > 127
    } else {
      // Non-ASCII code points can only be identifiers or whitespace.
      if ((unicodeLookup[(ch >>> 5) + 104448] >>> ch) & 31 & 1) {
        parser.index++;
        if ((ch & ~1) === Chars.LineSeparator) {
          state = (state & ~LexerState.LastIsCR) | LexerState.NewLine;
          parser.line++;
          parser.columnOffset = parser.index;
          parser.hasLineTerminator = true;
        }
        continue;
      }

      // IdentifierContinue
      if ((unicodeLookup[(ch >>> 5) + 34816] >>> ch) & 31 & 1) {
        return scanIdentifierSlowPath(parser, context, '', 0);
      }

      // high surrogate
      if ((ch & 0xfc00) === 0xd800) {
        // low surrogate
        if ((parser.source.charCodeAt(parser.index + 1) & 0xfc00) !== 0xdc00) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidLowerSurrogate,
            DiagnosticKind.Error,
            fromCodePoint(ch)
          );
        }

        return scanIdentifierSlowPath(parser, context, '', 0);
      }

      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Lexer,
        DiagnosticCode.InvalidCharacter,
        DiagnosticKind.Error,
        fromCodePoint(ch)
      );

      // Increment the index so we can stay on track and avoid infinity loops
      parser.index++;
    }
  }
  return Token.EndOfSource;
}

export function nextToken(parser: ParserState, context: Context): void {
  parser.hasLineTerminator = false;
  parser.endIndex = parser.index;
  parser.line = parser.startLine;
  parser.endColumn = parser.startColumn;
  parser.startIndex = parser.index;
  parser.token = scan(parser, context);
  parser.startLine = parser.line;
  parser.startColumn = parser.index - parser.columnOffset;
}
