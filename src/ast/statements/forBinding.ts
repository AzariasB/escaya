import { Node } from '../node';
import { VariableDeclaration } from '../declarations/variable-declaration';

/**
 * For binding
 */
export interface ForBinding extends Node<'ForBinding'> {
  // The expression or declaration before the first `;`, if present
  readonly declarations: VariableDeclaration[];
}

export function createForBinding(declarations: VariableDeclaration[]): ForBinding {
  return {
    type: 'ForBinding',
    declarations
  };
}
