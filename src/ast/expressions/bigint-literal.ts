import { Node } from '../node';

/**
 * Bigint literal.
 */
export interface BigIntLiteral extends Node<'BigIntLiteral'> {
  readonly value: number | null;
}

export function createBigIntLiteral(value: number | null): BigIntLiteral {
  return {
    type: 'BigIntLiteral',
    value
  };
}
