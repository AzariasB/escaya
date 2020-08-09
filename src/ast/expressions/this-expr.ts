import { SyntaxKind, SyntaxNode, SyntaxNodeFlags } from '../syntax-node';

/**
 * This expression.
 */
export interface ThisExpression extends SyntaxNode {
  readonly kind?: SyntaxKind.ThisExpression;
}

export function createThisExpression(): ThisExpression {
  return {
    type: 'ThisExpression'
  };
}
