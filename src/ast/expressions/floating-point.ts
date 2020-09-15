import { Node } from '../node';

/**
 * Floating point literal
 */
export interface FloatingPointLiteral extends Node {
  readonly value: number;
}

export function createFloatingPointLiteral(value: number): FloatingPointLiteral {
  return {
    type: 'FloatingPointLiteral',
    value
  };
}
