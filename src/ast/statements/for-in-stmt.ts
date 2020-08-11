import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression, AssignmentPattern } from '../expressions/index';
import { ForDeclaration } from '../declarations/for-declaration';
/**
 * For-in statement.
 */
export interface ForInStatement extends SyntaxNode {
  // The expression or declaration before `of`.
  readonly initializer: ForDeclaration | AssignmentPattern | Expression;
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createForInStatement(
  initializer: ForDeclaration | AssignmentPattern | Expression,
  expression: Expression,
  statement: Statement
): ForInStatement {
  return {
    type: 'ForInStatement',
    initializer,
    expression,
    statement
  };
}
