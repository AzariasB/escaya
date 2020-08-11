import { SyntaxNode } from '../syntax-node';
import { Expression } from '../expressions/index';

/**
 * Throw statement.
 */
export interface ThrowStatement extends SyntaxNode {
  readonly expression: Expression;
}

export function createThrowStatement(expression: Expression): ThrowStatement {
  return {
    type: 'ThrowStatement',
    expression
  };
}
