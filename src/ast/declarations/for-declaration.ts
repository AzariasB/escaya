import { Node } from '../node';
import { LexicalDeclaration } from './lexical-declaration';
import { VariableDeclaration } from './variable-declaration';

/**
 * For declaration.
 */
export interface ForDeclaration extends Node {
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
