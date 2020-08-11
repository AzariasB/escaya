import { SyntaxNode } from '../syntax-node';
import { Expression } from '../expressions/index';

/**
 * An expression statement.
 */
export interface ExpressionStatement extends SyntaxNode {
  readonly expression: Expression;
}

export function createExpressionStatement(expression: Expression): ExpressionStatement {
  return {
    type: 'ExpressionStatement',
    expression
  };
}
