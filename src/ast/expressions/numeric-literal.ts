import { Node } from '../node';

/**
 * Numeric literal
 */
export interface NumericLiteral extends Node<'NumericLiteral'> {
  readonly value: number;
}

export function createNumericLiteral(value: number): NumericLiteral {
  return {
    type: 'NumericLiteral',
    value
  };
}
