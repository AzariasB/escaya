import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Char } from './char';
import { skipSingleLineComment } from './comments';

// Skip initial BOM and/or shebang.
export function skipMeta(state: ParserState, context: Context) {
  let index = state.index;
  if (index === state.length) return;
  if (state.source.charCodeAt(index) === Char.ByteOrderMark) {
    index++;
    state.index = index;
  }

  if (state.source.charCodeAt(index) === Char.Hash) {
    index++;
    if (index < state.length && state.source.charCodeAt(index) === Char.Exclamation) {
      state.index = index + 1;
      skipSingleLineComment(state);
    } else {
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.InvalidCharacter, DiagnosticKind.Error);
    }
  }
}
