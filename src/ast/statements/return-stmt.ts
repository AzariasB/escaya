import { SyntaxNode } from '../syntax-node';
import { Expression } from '../expressions/index';

/**
 * Return statement.
 */
export interface ReturnStatement extends SyntaxNode {
  readonly expression: Expression | null;
}

export function createReturnStatement(expression: Expression | null): ReturnStatement {
  return {
    type: 'ReturnStatement',
    expression
  };
}
