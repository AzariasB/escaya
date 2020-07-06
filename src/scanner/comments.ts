import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { unicodeLookup } from './unicode';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { State } from './common';

export function skipSingleLineComment(parser: ParserState, source: string, state: State): State {
  let char = source.charCodeAt(parser.index);
  while (parser.index < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = source.charCodeAt(++parser.index);
  }
  return state | State.NewLine;
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
    } else if ((unicodeLookup[(ch >>> 5) + 69632] >>> ch) & 31 & 1) {
      if (ch === Chars.CarriageReturn) {
        state |= State.NewLine | State.LastIsCR;
        parser.line++;
      } else {
        if ((state & State.LastIsCR) === 0) parser.line++;
        state = ((state | State.LastIsCR) ^ State.LastIsCR) | State.NewLine;
      }
      parser.hasLineTerminator = true;
      parser.index++;
      parser.columnOffset = parser.index;
    } else {
      state &= ~State.LastIsCR;
      parser.index++;
    }
  }

  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnterminatedComment, DiagnosticKind.Error);
}
