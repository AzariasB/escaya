import { Token } from '../token';
import { DiagnosticCode } from './enums';

// Token based errors
export function tokenErrors(token: Token): DiagnosticCode {
  if (token & (Token.FutureKeyword | Token.Keyword)) return DiagnosticCode.UnexpectedKeyword;
  if (token & Token.IsIdentifier) return DiagnosticCode.UnexpectedIdentifier;

  switch (token) {
    case Token.NumericLiteral:
    case Token.StringLiteral:
    case Token.TrueKeyword:
    case Token.FalseKeyword:
    case Token.BigIntLiteral:
    case Token.RegularExpression:
    case Token.NullKeyword:
    case Token.EndOfSource:

    // Our 'special tokens' and others, report as unknown
    case Token.TargetKeyword:
    case Token.MetaKeyword:
    case Token.PrivateName:
    case Token.MaybeKeyword:
    case Token.Unknown:
    default:
      return DiagnosticCode.UnknownToken;
  }
}
