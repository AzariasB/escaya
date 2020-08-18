import { Node } from '../node';

/**
 * Numeric literal.
 */
export interface NumericLiteral extends Node {
  readonly value: number;
}

export function createNumericLiteral(value: number): NumericLiteral {
  return {
    type: 'NumericLiteral',
    value
  };
}
