import { Node } from '../node';
import { VariableDeclaration } from '../declarations/variable-declaration';

/**
 * Variable statement and variable declaration
 */
export interface VariableStatement extends Node<'VariableStatement'> {
  readonly declarations: VariableDeclaration[];
}

export function createVariableStatement(declarations: VariableDeclaration[]): VariableStatement {
  return {
    type: 'VariableStatement',
    declarations
  };
}
