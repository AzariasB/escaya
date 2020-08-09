import { SyntaxKind, SyntaxNode } from '../syntax-node';
import { Expression } from '.';
import { SpreadElement } from './spread-element';
import { Elison } from './elison';

/**
 * An IdentifierReference expression.
 */
export interface ArrayLiteral extends SyntaxNode {
  readonly elements: (Elison | SpreadElement | Expression)[];
}

export function createArrayLiteral(elements: (Elison | SpreadElement | Expression)[]): ArrayLiteral {
  return {
    type: 'ArrayLiteral',
    kind: SyntaxKind.ArrayLiteral,
    elements
  };
}
