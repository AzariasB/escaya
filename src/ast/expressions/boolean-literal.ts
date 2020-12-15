import { Node } from '../node';

/**
 * Boolean literal expression.
 */
export interface BooleanLiteral extends Node<'BooleanLiteral'> {
  readonly value: boolean;
}

export function createBooleanLiteral(value: boolean): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value
  };
}
