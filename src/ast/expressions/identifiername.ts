import { SyntaxNode } from '../syntax-node';

/**
 * IdentifierName.
 */
export interface IdentifierName extends SyntaxNode {
  readonly name: string;
}

export function createIdentifierName(name: string): IdentifierName {
  return {
    type: 'IdentifierName',
    name
  };
}
