import { Node } from '../node';

/**
 * Identifier reference.
 */
export interface IdentifierReference extends Node {
  readonly name: string;
}

export function createIdentifierReference(name: string): IdentifierReference {
  return {
    type: 'IdentifierReference',
    name
  };
}
