import { SyntaxNode } from '../syntax-node';

/**
 * Bigint literal.
 */
export interface BigIntLiteral extends SyntaxNode {
  readonly value: number | null;
}

export function createBigIntLiteral(value: number | null): BigIntLiteral {
  return {
    type: 'BigIntLiteral',
    value
  };
}
