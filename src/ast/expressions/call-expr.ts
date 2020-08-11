import { Expression, LeftHandSideExpression } from '.';
import { SyntaxNode } from '../syntax-node';

/**
 * Call expression.
 */
export interface CallExpression extends SyntaxNode {
  readonly expression: LeftHandSideExpression;
  readonly arguments: Expression[];
}

export function createCallExpression(expression: LeftHandSideExpression, _arguments: Expression[]): CallExpression {
  return {
    type: 'CallExpression',
    expression,
    arguments: _arguments
  };
}
