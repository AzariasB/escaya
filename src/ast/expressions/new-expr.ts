import { Expression } from './';
import { Node } from '../node';

/**
 * New expression.
 */
export interface NewExpression extends Node {
  readonly expression: Expression;
  readonly arguments: Expression[];
}

export function createNewExpression(expression: Expression, _arguments: Expression[]): NewExpression {
  return {
    type: 'NewExpression',
    expression,
    arguments: _arguments
  };
}
