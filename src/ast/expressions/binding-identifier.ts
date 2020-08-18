import { Node } from '../node';

/**
 * Binding identifier
 */
export interface BindingIdentifier extends Node {
  readonly name: string;
}

export function createBindingIdentifier(name: string): BindingIdentifier {
  return {
    type: 'BindingIdentifier',
    name
  };
}
