import { SyntaxNode } from '../syntax-node';
import { Expression, Binding } from '../expressions';

/**
 * Lexical binding
 */

export interface LexicalBinding extends SyntaxNode {
  readonly binding: Binding;
  readonly initializer: Expression | null;
}

export function createLexicalBinding(binding: Binding, initializer: Expression | null): LexicalBinding {
  return {
    type: 'LexicalBinding',
    binding,
    initializer
  };
}
