import { Expression } from '.';
import { SyntaxNode } from '../syntax-node';

/**
 * Yield expression.
 */
export interface YieldExpression extends SyntaxNode {
  readonly delegate: boolean;
  readonly argument: Expression | null;
}

export function createYieldExpression(delegate: boolean, argument: Expression | null): YieldExpression {
  return {
    type: 'YieldExpression',
    delegate,
    argument
  };
}
