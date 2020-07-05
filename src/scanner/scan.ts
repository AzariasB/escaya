import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { skipMultiLineComment, skipSingleLineComment, skipSingleHTMLComment } from './comments';
import { Token } from '../token';
import {
  scanIdentifier,
  scanKeywordOrIdentifier,
  scanIdentifierSlowPath,
  scanIdentifierEscapeIdStart,
  scanPrivateName
} from './identifier';
import { State, fromCodePoint } from './common';
import { scanNumber } from './numeric';
import { scanRegExp } from './regexp';
import { unicodeLookup } from './unicode';
import { scanTemplateSpan } from './template';
import { scanString } from './string';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { oneCharTokens } from './tables';

// Scan for a single token
export function scan(parser: ParserState, context: Context): Token {
  // Position of 'index' before whitespace.
  parser.startIndex = parser.index;

  let state = parser.index === 0 ? State.LineStart : State.None;
  let source = parser.source;

  while (parser.index < parser.length) {
    let ch = source.charCodeAt(parser.index);

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

        // general whitespace
        case Token.WhiteSpace:
          parser.index++;
          break;

        //  `A`...`Z`, `_var`, `$var`
        case Token.Identifier:
          return scanIdentifier(parser, context, source);

        // `a`...`z`,
        case Token.MaybeKeyword:
          return scanKeywordOrIdentifier(parser, context, source);

        // `0`...`9`
        case Token.NumericLiteral:
          return scanNumber(parser, context, source, ch, false);

        // `'string'`, `"string"`
        case Token.StringLiteral:
          return scanString(parser, context, source, ch);

        // ``string``
        case Token.TemplateTail:
          return scanTemplateSpan(parser, context, source);

        // `\\u{N}var`
        case Token.EscapedIdentifier:
          return scanIdentifierEscapeIdStart(parser, context, source);

        // `#foo`, `#!shebang`
        case Token.PrivateName:
          if (state & State.LineStart && source.charCodeAt(parser.index + 1) === Chars.Exclamation) {
            state = skipSingleLineComment(parser, source, state);
            continue;
          }
          return scanPrivateName(parser, context, source, ch);

        case Token.CarriageReturn:
          state |= State.NewLine | State.LastIsCR;
          parser.index++;
          parser.hasLineTerminator = true;
          parser.columnOffset = parser.index;
          parser.line++;
          break;

        case Token.LineFeed:
          parser.index++;
          parser.columnOffset = parser.index;
          parser.hasLineTerminator = true;
          if ((state & State.LastIsCR) === 0) parser.line++;
          state = ((state | State.LastIsCR) ^ State.LastIsCR) | State.NewLine;
          break;

        // `.`, `...`, `.123` (numeric literal)
        case Token.Period:
          let index = parser.index + 1;

          if (index < parser.length) {
            ch = source.charCodeAt(index);

            if (ch >= Chars.Zero && ch <= Chars.Nine) {
              return scanNumber(parser, context, source, ch, true);
            }

            if (ch === Chars.Period) {
              index++;
              if (index < parser.length && source.charCodeAt(index) === Chars.Period) {
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

          if (source.charCodeAt(parser.index) === Chars.EqualSign) {
            parser.index++;
            if (source.charCodeAt(parser.index) === Chars.EqualSign) {
              parser.index++;
              return Token.StrictNotEqual;
            }
            return Token.LooseNotEqual;
          }

          return Token.Negate;

        // `%`, `%=`
        case Token.Modulo:
          parser.index++;
          if (source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Modulo;
          parser.index++;
          return Token.ModuloAssign;

        // `^`, `^=`
        case Token.BitwiseXor:
          parser.index++;
          if (source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.BitwiseXor;
          parser.index++;
          return Token.BitwiseXorAssign;

        // `|`, `||`, `|=`
        case Token.BitwiseOr:
          parser.index++;
          if (parser.index >= parser.length) return Token.BitwiseOr;

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.VerticalBar) {
            parser.index++;

            if (source.charCodeAt(parser.index) !== Chars.EqualSign) {
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
          ch = source.charCodeAt(parser.index);

          if (ch === Chars.Ampersand) {
            parser.index++;

            if (source.charCodeAt(parser.index) !== Chars.EqualSign) {
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
          ch = source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            if (source.charCodeAt(parser.index) === Chars.EqualSign) {
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

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.MultiplyAssign;
          }

          if (ch !== Chars.Asterisk) return Token.Multiply;

          parser.index++;

          if (source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Exponentiate;
          parser.index++;

          return Token.ExponentiateAssign;

        // `+`, `++`, `+=`
        case Token.Add:
          parser.index++;

          if (parser.index >= parser.length) return Token.Add;

          ch = source.charCodeAt(parser.index);

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

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.Slash) {
            state = skipSingleLineComment(parser, source, state);
            continue;
          }

          if (ch === Chars.Asterisk) {
            state = skipMultiLineComment(parser, context, source, state) as State;
            continue;
          }

          if (context & Context.AllowRegExp) {
            return scanRegExp(parser, context);
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
            ch = source.charCodeAt(index);

            if (ch === Chars.Period) {
              // The specs explicitly disallows a digit after `?.`, for example `?.a`
              // or `?.5` then it should be treated as a ternary rather than as an optional chain
              ch = source.charCodeAt(index + 1);

              if (ch >= Chars.Zero && ch <= Chars.Nine) {
                parser.index = index + 1;
                return Token.QuestionMark;
              }

              parser.index = index + 1;

              return Token.QuestionMarkPeriod;
            }

            if (ch === Chars.QuestionMark) {
              index++;
              if (source.charCodeAt(index) === Chars.EqualSign) {
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

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.Hyphen) {
            parser.index++;
            if (source.charCodeAt(parser.index) === Chars.GreaterThan && state & (State.NewLine | State.LineStart)) {
              state = skipSingleHTMLComment(parser, context, source, state);
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

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.LessThan) {
            if (source.charCodeAt(++parser.index) === Chars.EqualSign) {
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
              // Treat HTML open-comment as comment-till-end-of-line.
              source.charCodeAt(parser.index + 2) === Chars.Hyphen &&
              source.charCodeAt(parser.index + 1) === Chars.Hyphen
            ) {
              state = skipSingleHTMLComment(parser, context, source, state);
              continue;
            }
          }
          return Token.LessThan;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Token.GreaterThan:
          parser.index++;

          if (parser.index >= parser.length) return Token.GreaterThan;

          ch = source.charCodeAt(parser.index);

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.GreaterThanOrEqual;
          }

          if (ch !== Chars.GreaterThan) return Token.GreaterThan;
          parser.index++;

          if (parser.index < parser.length) {
            ch = source.charCodeAt(parser.index);

            if (ch === Chars.GreaterThan) {
              parser.index++;

              if (source.charCodeAt(parser.index) !== Chars.EqualSign) {
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
          state = ((state | State.LastIsCR) ^ State.LastIsCR) | State.NewLine;
          parser.line++;
          parser.columnOffset = parser.index;
          parser.hasLineTerminator = true;
        }
        continue;
      }

      // IdentifierContinue
      if ((unicodeLookup[(ch >>> 5) + 34816] >>> ch) & 31 & 1) {
        return scanIdentifierSlowPath(parser, context, source);
      }

      // lead surrogate (U+d800..U+dbff)
      if ((ch & 0xfffffc00) === 0xd800) {
        // trail surrogate (U+dc00..U+dfff)
        if ((source.charCodeAt(parser.index + 1) & 0xfffffc00) !== 0xdc00) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidTrailSurrogate,
            DiagnosticKind.Error,
            fromCodePoint(ch)
          );
        }

        return scanIdentifierSlowPath(parser, context, source);
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
