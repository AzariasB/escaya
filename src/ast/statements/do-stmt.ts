import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * Do-while statement.
 */
export interface DoWhileStatement extends SyntaxNode {
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
