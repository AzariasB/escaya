import { Node } from '../node';
import { LexicalBinding } from '../statements/lexical-binding';

/**
 * Lexical declaration statement
 */
export interface LexicalDeclaration extends Node {
  readonly declarations: LexicalBinding[];
  // 'isConstOrLet' creates confusion, so we set 'isConst'
  // to 'true' for lexical 'const' declarations
  readonly isConst: boolean;
}

export function createLexicalDeclaration(isConst: boolean, declarations: LexicalBinding[]): LexicalDeclaration {
  return {
    type: 'LexicalDeclaration',
    isConst,
    declarations
  };
}
