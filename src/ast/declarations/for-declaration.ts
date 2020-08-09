import { SyntaxNode } from '../syntax-node';
import { LexicalDeclaration } from './lexical-declaration';
import { VariableDeclaration } from './variable-declaration';

/**
 * For declaration.
 */
export interface ForDeclaration extends SyntaxNode {
  readonly isConst: boolean;
  readonly declarations: (VariableDeclaration | LexicalDeclaration)[];
}

export function createForDeclaration(
  isConst: boolean,
  declarations: (VariableDeclaration | LexicalDeclaration)[]
): ForDeclaration {
  return {
    type: 'ForDeclaration',
    isConst,
    declarations
  };
}
