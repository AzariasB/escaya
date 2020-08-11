import { SyntaxNode } from '../syntax-node';

/**
 * Null expression.
 */
export interface NullLiteral extends SyntaxNode {
  value: null;
}

export function createNullExpression(): NullLiteral {
  return {
    type: 'NullLiteral',
    value: null
  };
}
