import { SyntaxNode } from '../syntax-node';

/**
 * Boolean literal expression.
 */
export interface BooleanLiteral extends SyntaxNode {
  readonly value: boolean;
}

export function createBooleanLiteral(value: boolean): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value
  };
}
