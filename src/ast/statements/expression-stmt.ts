import { Node } from '../node';
import { Expression } from '../expressions/index';

/**
 * An expression statement.
 */
export interface ExpressionStatement extends Node<'ExpressionStatement'> {
  readonly expression: Expression;
}

export function createExpressionStatement(expression: Expression): ExpressionStatement {
  return {
    type: 'ExpressionStatement',
    expression
  };
}
