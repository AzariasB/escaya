import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression } from '../expressions/index';
import { ForDeclaration } from '../declarations/for-declaration';

/**
 * For statement.
 */
export interface ForStatement extends SyntaxNode {
  // The expression or declaration before the first `;`, if present
  readonly initializer: ForDeclaration | Expression | null;
  // The expression before the second `;`, if present
  readonly condition: Expression | null;
  // The expression after the second `;`, if present
  readonly incrementor: Expression | null;
  readonly statement: Statement;
}

export function createForStatement(
  initializer: Expression | null,
  condition: Expression | null,
  incrementor: Expression | null,
  statement: Statement
): ForStatement {
  return {
    type: 'ForStatement',
    initializer,
    condition,
    incrementor,
    statement
  };
}
