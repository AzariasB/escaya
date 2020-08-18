import { BindingIdentifier } from '../expressions/binding-identifier';
import { FunctionBody } from '../expressions/function-body';
import { Node } from '../node';
import { Parameter } from '../expressions';
/**
 * Function declaration.
 */
export interface FunctionDeclaration extends Node {
  // *only* null in recovery mode, throws an error otherwise.
  readonly name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  readonly generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  readonly async: boolean;
  readonly params: Parameter[];
  readonly contents: FunctionBody;
}

export function createFunctionDeclaration(
  name: BindingIdentifier | null,
  generator: boolean,
  async: boolean,
  params: Parameter[],
  contents: FunctionBody
): FunctionDeclaration {
  return {
    type: 'FunctionDeclaration',
    name,
    generator,
    async,
    params,
    contents
  };
}
