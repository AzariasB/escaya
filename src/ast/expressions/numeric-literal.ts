import { SyntaxNode } from '../syntax-node';

/**
 * Numeric literal.
 */
export interface NumericLiteral extends SyntaxNode {
  readonly value: number;
}

export function createNumericLiteral(value: number): NumericLiteral {
  return {
    type: 'NumericLiteral',
    value
  };
}
