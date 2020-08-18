import { Node } from '../node';

/**
 * String literal.
 */
export interface StringLiteral extends Node {
  readonly value: string;
}

export function createStringLiteral(value: string): StringLiteral {
  return {
    type: 'StringLiteral',
    value
  };
}
