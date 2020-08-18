import { Node } from '../node';

/**
 * Null expression.
 */
export interface NullLiteral extends Node {
  value: null;
}

export function createNullExpression(): NullLiteral {
  return {
    type: 'NullLiteral',
    value: null
  };
}
