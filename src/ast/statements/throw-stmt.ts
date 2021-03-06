import { Node } from '../node';
import { Expression } from '../expressions/index';

/**
 * Throw statement.
 */
export interface ThrowStatement extends Node<'ThrowStatement'> {
  readonly expression: Expression;
}

export function createThrowStatement(expression: Expression): ThrowStatement {
  return {
    type: 'ThrowStatement',
    expression
  };
}
