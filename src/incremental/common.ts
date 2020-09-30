import { Context, ParserState, finishNode } from '../common';
import { NodeFlags } from '../ast/node';
import { IdentifierReference } from '../ast/expressions/identifierreference';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { DictionaryMap } from '../dictionary/dictionary-map';
import { nextToken } from '../lexer/scan';

// Throws in 'normal parsing mode', and insert an 'IdentifierReference' in
// reover and incremental mode
export function createIdentifier(
  state: ParserState,
  context: Context,
  code = DiagnosticCode.ExpectedExpression
): IdentifierReference {
  addDiagnostic(state, context, DiagnosticSource.Parser, code, DiagnosticKind.Error);
  const ident: any = finishNode(state, context, state.startIndex, DictionaryMap.IdentifierReference(''));
  ident.flags |= NodeFlags.HasErrors;
  return ident;
}

// Throws in 'normal parsing mode', and insert an 'IdentifierReference' in
// reover and incremental mode
export function createBindingIdentifier(
  state: ParserState,
  context: Context,
  code: DiagnosticCode,
  shouldConsume = true
): IdentifierReference {
  addDiagnostic(state, context, DiagnosticSource.Parser, code, DiagnosticKind.Early);
  const start = state.startIndex;
  if (shouldConsume) nextToken(state, context);
  return finishNode(state, context, start, DictionaryMap.BindingIdentifier(''));
}
