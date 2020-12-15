import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * A list of statements.
 */
export interface WhileStatement extends Node<'WhileStatement'> {
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createWhileStatement(expression: Expression, statement: Statement): WhileStatement {
  return {
    type: 'WhileStatement',
    expression,
    statement
  };
}
