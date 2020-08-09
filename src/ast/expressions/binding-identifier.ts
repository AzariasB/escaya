import { SyntaxNode } from '../syntax-node';

/**
 * Binding identifier
 */
export interface BindingIdentifier extends SyntaxNode {
  readonly name: string;
}

export function createBindingIdentifier(name: string): BindingIdentifier {
  return {
    type: 'BindingIdentifier',
    name
  };
}
