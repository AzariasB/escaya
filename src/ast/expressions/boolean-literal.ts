import { SyntaxKind, SyntaxNode, SyntaxNodeFlags } from '../syntax-node';

/**
 * Boolean literal expression.
 */
export interface BooleanLiteral extends SyntaxNode {
  readonly kind?: SyntaxKind.BooleanLiteral;
  readonly value: boolean;
}

export function createBooleanLiteral(value: boolean): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value
  };
}
