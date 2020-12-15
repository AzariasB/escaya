import { BindingIdentifier } from '../expressions/binding-identifier';
import { FunctionBody } from '../expressions/function-body';
import { Node } from '../node';
import { Parameter } from '../expressions';

/**
 * Function declaration
 */
export interface FunctionDeclaration extends Node<'FunctionDeclaration'> {
  readonly name: BindingIdentifier | null;
  // True for `GeneratorDeclaration`, false otherwise.
  readonly generator: boolean;
  // True for `AsyncFunctionDeclaration`, false otherwise.
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
