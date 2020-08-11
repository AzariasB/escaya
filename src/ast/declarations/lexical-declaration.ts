import { SyntaxNode } from '../syntax-node';
import { LexicalBinding } from '../statements/lexical-binding';

/**
 * Lexical declaration statement
 */
export interface LexicalDeclaration extends SyntaxNode {
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
