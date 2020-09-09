import { Node } from '../node';

/**
 * Numeric literal
 */
export interface NumericLiteral extends Node {
  readonly value: number;
  readonly floatingPoint: boolean;
}

export function createNumericLiteral(value: number, floatingPoint: boolean): NumericLiteral {
  return {
    type: 'NumericLiteral',
    value,
    floatingPoint
  };
}
