import { Node } from '../node';
import { Expression } from '../expressions/index';

/**
 * Return statement.
 */
export interface ReturnStatement extends Node<'ReturnStatement'> {
  readonly expression: Expression | null;
}

export function createReturnStatement(expression: Expression | null): ReturnStatement {
  return {
    type: 'ReturnStatement',
    expression
  };
}
