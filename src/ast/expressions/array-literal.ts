import { Node } from '../node';
import { Expression } from '.';
import { SpreadElement } from './spread-element';
import { Elison } from './elison';

/**
 * An IdentifierReference expression.
 */
export interface ArrayLiteral extends Node {
  readonly elements: (Elison | SpreadElement | Expression)[];
}

export function createArrayLiteral(elements: (Elison | SpreadElement | Expression)[]): ArrayLiteral {
  return {
    type: 'ArrayLiteral',
    elements
  };
}
