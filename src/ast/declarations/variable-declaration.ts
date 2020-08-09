import { SyntaxNode } from '../syntax-node';
import { Expression } from '../expressions/index';

/**
 * Variable declaration
 */

export interface VariableDeclaration extends SyntaxNode {
  readonly binding: any;
  readonly initializer: Expression | null;
}

export function createVariableDeclaration(binding: any, initializer: Expression | null): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    binding,
    initializer
  };
}
