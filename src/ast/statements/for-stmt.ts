import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions/index';
import { VariableDeclaration } from '../declarations/variable-declaration';

/**
 * For statement.
 */
export interface ForStatement extends Node {
  // The expression or declaration before the first `;`, if present
  readonly initializer: VariableDeclaration | Expression | null;
  // The expression before the second `;`, if present
  readonly condition: Expression | null;
  // The expression after the second `;`, if present
  readonly incrementor: Expression | null;
  readonly variableDeclarationList: boolean;
  readonly statement: Statement;
}

export function createForStatement(
  initializer: Expression | null,
  condition: Expression | null,
  incrementor: Expression | null,
  variableDeclarationList: boolean,
  statement: Statement
): ForStatement {
  return {
    type: 'ForStatement',
    initializer,
    condition,
    incrementor,
    variableDeclarationList,
    statement
  };
}
