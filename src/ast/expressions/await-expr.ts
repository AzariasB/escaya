import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';
/**
 * An await expression.
 */
export interface AwaitExpression extends SyntaxNode {
  readonly expression: Expression;
}

export function createAwaitExpression(expression: Expression): AwaitExpression {
  return {
    type: 'AwaitExpression',
    expression
  };
}
