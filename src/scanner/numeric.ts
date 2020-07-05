import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from './chars';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { CharFlags, CharTypes } from './charClassifier';
import { toHex } from './common';
import { leadingZeroChars } from './tables';

export function scanNumber(parser: ParserState, context: Context, source: string, ch: number, isFloat: boolean): Token {
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
  let type = NumberKind.Decimal;
  let disallowBigInt = false;

  const start = parser.index;

  if (isFloat) {
    do {
      ch = source.charCodeAt(++parser.index);
    } while (ch <= Chars.Nine && ch >= Chars.Zero);

    disallowBigInt = true;
  } else {
    // Zero digits - '0' - is structured as an optimized finite state machine
    // and does a quick scan for a hexadecimal, binary, octal or implicit octal
    if (ch === Chars.Zero) {
      parser.index++; // skips '0'

      ch = source.charCodeAt(parser.index);

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
                  DiagnosticCode.UnexpectedIdentNumber,
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
                  DiagnosticCode.UnexpectedIdentNumber,
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
                  DiagnosticCode.UnexpectedIdentNumber,
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
              if (type & NumberKind.Octal) {
                value = value * 8 + (ch - Chars.Zero);
                break;
              }

            // `8`...`9`, `a-f`...`A-F`
            case Chars.Eight:
            case Chars.Nine:
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
              if (type & NumberKind.Hex) {
                value = value * 0x0010 + toHex(ch);
                break;
              }
              addDiagnostic(
                parser,
                context,
                DiagnosticSource.Lexer,
                type === NumberKind.Binary ? DiagnosticCode.BinarySequence : DiagnosticCode.OctalSequence,
                DiagnosticKind.Error
              );

            // `n`
            case Chars.LowerN:
              parser.tokenValue = value;
              parser.index++;
              return Token.BigIntLiteral;
          }

          digits++;
          parser.index++;
          ch = source.charCodeAt(parser.index);
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

        // BigInt suffix is invalid in non-octal decimal integr literal,
        // so we need to set 'disallowBigInt' to 'true' here
        disallowBigInt = true;

        type = NumberKind.ImplicitOctal;

        do {
          value = value * 8 + (ch - Chars.Zero);

          ch = source.charCodeAt(++parser.index);

          if (ch >= Chars.Eight) {
            type = NumberKind.DecimalWithLeadingZero;
            break;
          }
        } while (ch >= Chars.Zero && ch <= Chars.Nine);

        // BigInt suffix is disallowed in legacy octal integer literal
        if (ch === Chars.LowerN) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.InvalidBigIntLiteral,
            DiagnosticKind.Error
          );
        }

        if (type === NumberKind.ImplicitOctal) {
          parser.tokenValue = value;
          return Token.NumericLiteral;
        }
      }
    }

    let digit = 9;

    while (ch <= Chars.Nine && ch >= Chars.Zero) {
      value = value * 10 + (ch - Chars.Zero);
      ch = source.charCodeAt(++parser.index);
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
      disallowBigInt = true;
      ch = source.charCodeAt(++parser.index);
      while (ch <= Chars.Nine && ch >= Chars.Zero) {
        ch = source.charCodeAt(++parser.index);
      }
    }
  }

  if (ch === Chars.LowerN) {
    if (disallowBigInt) {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidBigIntLiteral, DiagnosticKind.Error);
    }
    parser.index++;
    parser.tokenValue = parseFloat(source.slice(start, parser.index));
    return Token.BigIntLiteral;
  }

  if ((ch | 32) === Chars.LowerE) {
    parser.index++;
    ch = source.charCodeAt(parser.index);

    // '-', '+'
    if (ch === Chars.Plus || ch === Chars.Hyphen) {
      parser.index++;
      ch = source.charCodeAt(parser.index);
    }
    let digits = 0;

    while (ch <= Chars.Nine && ch >= Chars.Zero) {
      ch = source.charCodeAt(++parser.index);
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
  parser.tokenValue = parseFloat(source.slice(start, parser.index));

  return Token.NumericLiteral;
}
