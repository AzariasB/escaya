import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * A list of statements.
 */
export interface WithStatement extends SyntaxNode {
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createWithStatement(expression: Expression, statement: Statement): WithStatement {
  return {
    type: 'WithStatement',
    expression,
    statement
  };
}
