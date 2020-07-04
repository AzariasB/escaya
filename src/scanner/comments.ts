import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { unicodeLookup } from './unicode';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { State } from './common';

export function skipSingleHTMLComment(parser: ParserState, context: Context, state: State): State {
  if (context & (Context.OptionsDisableWebCompat | Context.Strict)) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.HtmlCommentInModule, DiagnosticKind.Error);
  }
  return skipSingleLineComment(parser, state);
}

export function skipSingleLineComment(parser: ParserState, state: State): State {
  let char = parser.source.charCodeAt(parser.index);
  while (parser.index < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = parser.source.charCodeAt(++parser.index);
  }
  return state;
}

export function skipMultiLineComment(parser: ParserState, context: Context, state: State): State | void {
  let char = parser.source.charCodeAt(parser.index);

  while (parser.index < parser.length) {
    if (char < 0x43) {
      if (char === Chars.Asterisk) {
        state = (state | State.LastIsCR) ^ State.LastIsCR;
        while (char === Chars.Asterisk) {
          char = parser.source.charCodeAt(parser.index++);
        }
        if (char === Chars.Slash) return state;
      }

      if (char === Chars.CarriageReturn) {
        state |= State.NewLine | State.LastIsCR;
        parser.columnOffset = parser.index;
        parser.index++;
        parser.hasLineTerminator = true;
        parser.line++;
      } else if (char === Chars.LineFeed) {
        parser.columnOffset = parser.index;
        parser.index++;
        parser.hasLineTerminator = true;
        if ((state & State.LastIsCR) === 0) parser.line++;
        state = ((state | State.LastIsCR) ^ State.LastIsCR) | State.NewLine;
      }
    }

    if ((char & ~1) === Chars.LineSeparator) {
      parser.columnOffset = parser.index;
      state |= State.NewLine;
      parser.index++;
      parser.line++;
      parser.hasLineTerminator = true;
    }
    char = parser.source.charCodeAt(parser.index++);
  }
  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedComment, DiagnosticKind.Error);
}
