import { BindingIdentifier } from './binding-identifier';
import { FunctionBody } from './function-body';
import { Parameter } from '.';
import { Node } from '../node';

/**
 * Function expression.
 */
export interface FunctionExpression extends Node {
  readonly name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  readonly generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  readonly async: boolean;
  readonly params: Parameter[];
  readonly contents: FunctionBody;
}

export function createFunctionExpression(
  name: BindingIdentifier | null,
  generator: boolean,
  async: boolean,
  params: Parameter[],
  contents: FunctionBody
): FunctionExpression {
  return {
    type: 'FunctionExpression',
    name,
    generator,
    async,
    params,
    contents
  };
}
