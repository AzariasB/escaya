import { Node } from '../node';
import { LexicalBinding } from '../statements/lexical-binding';

/**
 * Lexical declaration
 */
export interface LexicalDeclaration extends Node<'LexicalDeclaration'> {
  readonly declarations: LexicalBinding[];
  readonly isConst: boolean;
}

export function createLexicalDeclaration(isConst: boolean, declarations: LexicalBinding[]): LexicalDeclaration {
  return {
    type: 'LexicalDeclaration',
    isConst,
    declarations
  };
}
