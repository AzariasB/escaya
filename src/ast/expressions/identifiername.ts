import { Node } from '../node';

/**
 * IdentifierName
 */
export interface IdentifierName extends Node<'IdentifierName'> {
  readonly name: string;
}

export function createIdentifierName(name: string): IdentifierName {
  return {
    type: 'IdentifierName',
    name
  };
}
