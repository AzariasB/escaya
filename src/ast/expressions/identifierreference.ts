import { Node } from '../node';

/**
 * Identifier reference.
 */
export interface IdentifierReference extends Node<'IdentifierReference'> {
  readonly name: string;
}

export function createIdentifierReference(name: string): IdentifierReference {
  return {
    type: 'IdentifierReference',
    name
  };
}
