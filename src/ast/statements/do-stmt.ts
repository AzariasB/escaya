import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * Do-while statement.
 */
export interface DoWhileStatement extends Node {
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createDoWhileStatement(expression: Expression, statement: Statement): DoWhileStatement {
  return {
    type: 'DoWhileStatement',
    expression,
    statement
  };
}
