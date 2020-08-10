import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Char } from './char';
import { unicodeLookup } from './unicode';

export function skipSingleLineComment(state: ParserState): void {
  let char = state.source.charCodeAt(state.index);
  while (state.index < state.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = state.source.charCodeAt(++state.index);
  }
}

export function skipMultiLineComment(state: ParserState, context: Context): void {
  let lastIsCR = 0;
  while (state.index < state.length) {
    let ch = state.source.charCodeAt(state.index);

    if (ch === Char.Asterisk) {
      while (ch === Char.Asterisk) {
        ch = state.source.charCodeAt(++state.index);
      }
      if (ch === Char.Slash) {
        state.index++;
        return;
      }
    } else if ((unicodeLookup[(ch >>> 5) + 69632] >>> ch) & 31 & 1) {
      if (ch === Char.CarriageReturn) {
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
