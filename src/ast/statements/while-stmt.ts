import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * A list of statements.
 */
export interface WhileStatement extends SyntaxNode {
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
