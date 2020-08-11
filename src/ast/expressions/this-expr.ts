import { SyntaxNode } from '../syntax-node';

/**
 * This expression.
 */
export type ThisExpression = SyntaxNode;

export function createThisExpression(): ThisExpression {
  return { type: 'ThisExpression' };
}
