import { SyntaxNode } from '../syntax-node';

/**
 * Identifier reference.
 */
export interface IdentifierReference extends SyntaxNode {
  readonly name: string;
}

export function createIdentifierReference(name: string): IdentifierReference {
  return {
    type: 'IdentifierReference',
    name
  };
}
