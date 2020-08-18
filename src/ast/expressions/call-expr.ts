import { Expression, LeftHandSideExpression } from '.';
import { Node } from '../node';

/**
 * Call expression.
 */
export interface CallExpression extends Node {
  readonly expression: LeftHandSideExpression;
  readonly arguments: Expression[];
}

export function createCallExpression(expression: LeftHandSideExpression, _arguments: Expression[]): CallExpression {
  return {
    type: 'CallExpression',
    expression,
    arguments: _arguments
  };
}
