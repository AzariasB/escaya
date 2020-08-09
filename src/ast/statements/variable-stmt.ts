import { SyntaxNode } from '../syntax-node';
import { VariableDeclaration } from '../declarations/variable-declaration';

/**
 * Variable statement and variable declaration
 */
export interface VariableStatement extends SyntaxNode {
  readonly declarations: VariableDeclaration[];
}

export function createVariableStatement(declarations: VariableDeclaration[]): VariableStatement {
  return {
    type: 'VariableStatement',
    declarations
  };
}
