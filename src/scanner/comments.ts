import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { unicodeLookup } from './unicode';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { State } from './common';
import { CharTypes, CharFlags } from './charClassifier';

export function skipSingleHTMLComment(parser: ParserState, context: Context, source: string, state: State): State {
  if (context & (Context.OptionsDisableWebCompat | Context.Module)) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.HtmlCommentInModule, DiagnosticKind.Error);
  }

  return skipSingleLineComment(parser, source, state);
}

export function skipSingleLineComment(parser: ParserState, source: string, state: State): State {
  let char = source.charCodeAt(parser.index);
  while (parser.index < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = source.charCodeAt(++parser.index);
  }
  return state;
}

export function skipMultiLineComment(
  parser: ParserState,
  context: Context,
  source: string,
  state: State
): State | void {
  while (parser.index < parser.length) {
    let ch = source.charCodeAt(parser.index);

    if (ch === Chars.Asterisk) {
      while (ch === Chars.Asterisk) {
        ch = source.charCodeAt(++parser.index);
      }
      state = (state | State.LastIsCR) ^ State.LastIsCR;
      if (ch === Chars.Slash) {
        parser.index++;
        return state;
      }
    } else if ((ch - 0xe) & 0x2000) {
      if (ch === Chars.CarriageReturn) {
        state |= State.NewLine | State.LastIsCR;
        parser.index++;
        parser.columnOffset = parser.index;
        parser.line++;
        parser.hasLineTerminator = true;
      } else if (ch === Chars.LineFeed || (ch & ~1) === Chars.LineSeparator) {
        parser.index++;
        parser.columnOffset = parser.index;
        parser.hasLineTerminator = true;
        if ((state & State.LastIsCR) === 0) parser.line++;
        state = ((state | State.LastIsCR) ^ State.LastIsCR) | State.NewLine;
      } else {
        state &= ~State.LastIsCR;
        parser.index++;
      }
    } else {
      state &= ~State.LastIsCR;
      parser.index++;
    }
  }

  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedComment, DiagnosticKind.Error);
}
