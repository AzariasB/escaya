import { Chars } from './chars';
import { Token } from '../token';
import { CharFlags, CharTypes, isIdentifierPart } from './charClassifier';
import { ParserState, Context } from '../common';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';

export function scanRegExp(parser: ParserState, context: Context): Token {
  if (parser.index >= parser.length) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedRegExp, DiagnosticKind.Error);
  }

  const bodyStart = parser.index;

  const enum Preparse {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2
  }

  let preparseState = Preparse.Empty;

  while (true) {
    const ch = parser.source.charCodeAt(parser.index);
    parser.index++;

    if (preparseState & Preparse.Escape) {
      preparseState &= ~Preparse.Escape;
    } else {
      if (ch <= 0x5e) {
        if (ch === Chars.Slash) {
          if (!preparseState) break;
        } else if (ch === Chars.Backslash) {
          preparseState |= Preparse.Escape;
        } else if (ch === Chars.LeftBracket) {
          preparseState |= Preparse.Class;
        } else if (ch === Chars.RightBracket) {
          preparseState &= Preparse.Escape;
        } else if (CharTypes[ch] & CharFlags.LineTerminator) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.UnterminatedRegExp,
            DiagnosticKind.Error
          );
          break;
        }
      } else if ((ch & ~1) === Chars.LineSeparator) {
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedRegExp, DiagnosticKind.Error);
        break;
      }
    }
    if (parser.index >= parser.length) {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedRegExp, DiagnosticKind.Error);
      break;
    }
  }

  const bodyEnd = parser.index - 1;

  const enum Flags {
    Empty = 0,
    Global = 0x01,
    IgnoreCase = 0x02,
    Multiline = 0x04,
    Unicode = 0x08,
    Sticky = 0x10,
    DotAll = 0x20
  }

  let mask = Flags.Empty;

  const flagsStart = parser.index;

  let char = parser.source.charCodeAt(parser.index);

  while (isIdentifierPart(char)) {
    switch (char) {
      case Chars.LowerG:
        if (mask & Flags.Global) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.Global;
        break;

      case Chars.LowerI:
        if (mask & Flags.IgnoreCase) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.IgnoreCase;
        break;

      case Chars.LowerM:
        if (mask & Flags.Multiline) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.Multiline;
        break;

      case Chars.LowerU:
        if (mask & Flags.Unicode) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.Unicode;
        break;

      case Chars.LowerY:
        if (mask & Flags.Sticky) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.Sticky;
        break;

      case Chars.LowerS:
        if (mask & Flags.DotAll) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Lexer,
            DiagnosticCode.DuplicateRegExpFlag,
            DiagnosticKind.Error
          );
        }
        mask |= Flags.DotAll;
        break;
      // falls through

      default:
        addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownRegExpFlag, DiagnosticKind.Error);
    }

    parser.index++;
    char = parser.source.charCodeAt(parser.index);
  }

  parser.regExpPattern = parser.source.slice(bodyStart, bodyEnd);
  parser.regExpFlags = parser.source.slice(flagsStart, parser.index);

  return Token.RegularExpression;
}
