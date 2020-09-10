import { Node } from '../node';

/**
 * Numeric literal
 */
export interface NumericLiteral extends Node {
  readonly value: number;
  readonly floating: boolean;
}

export function createNumericLiteral(value: number, floating: boolean): NumericLiteral {
  return {
    type: 'NumericLiteral',
    value,
    floating
  };
}
