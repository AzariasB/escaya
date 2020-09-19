import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Char } from './char';
import { unicodeLookup } from './unicode';

export function skipSingleLineComment(state: ParserState): void {
  let cp = state.source.charCodeAt(state.index);
  while (state.index < state.length && ((unicodeLookup[(cp >>> 5) + 69632] >>> cp) & 31 & 1) === 0) {
    cp = state.source.charCodeAt(++state.index);
  }
}

export function skipMultiLineComment(state: ParserState, context: Context): void {
  let lastIsCR = 0;
  while (state.index < state.length) {
    let cp = state.source.charCodeAt(state.index);

    if (cp === Char.Asterisk) {
      while (cp === Char.Asterisk) {
        cp = state.source.charCodeAt(++state.index);
      }
      if (cp === Char.Slash) {
        state.index++;
        return;
      }
    } else if ((unicodeLookup[(cp >>> 5) + 69632] >>> cp) & 31 & 1) {
      if (cp === Char.CarriageReturn) {
        lastIsCR = 1;
        state.line++;
      } else {
        if (lastIsCR === 0) state.line++;
        lastIsCR = 0;
      }
      state.lineTerminatorBeforeNextToken = true;
      state.index++;
      state.columnOffset = state.index;
    } else {
      state.index++;
    }
  }
  addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnclosedComment, DiagnosticKind.Error);
}
