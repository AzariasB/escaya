import { Binding } from '../expressions';
import { SyntaxNode } from '../syntax-node';

/**
 * For binding
 */
export interface ForBinding extends SyntaxNode {
  readonly binding: Binding;
}

export function createForBinding(binding: Binding): ForBinding {
  return {
    type: 'ForBinding',
    binding
  };
}
