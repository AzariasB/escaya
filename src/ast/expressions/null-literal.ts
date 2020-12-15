import { Node } from '../node';

/**
 * Null literal.
 */
export interface NullLiteral extends Node<'NullLiteral'> {
  value: null;
}

export function createNullExpression(): NullLiteral {
  return {
    type: 'NullLiteral',
    value: null
  };
}
