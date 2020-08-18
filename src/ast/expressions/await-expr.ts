import { Node } from '../node';
import { Expression } from '.';
/**
 * An await expression.
 */
export interface AwaitExpression extends Node {
  readonly expression: Expression;
}

export function createAwaitExpression(expression: Expression): AwaitExpression {
  return {
    type: 'AwaitExpression',
    expression
  };
}
