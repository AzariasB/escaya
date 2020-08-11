import { SyntaxNode } from '../syntax-node';

/**
 * String literal.
 */
export interface StringLiteral extends SyntaxNode {
  readonly value: string;
}

export function createStringLiteral(value: string): StringLiteral {
  return {
    type: 'StringLiteral',
    value
  };
}
