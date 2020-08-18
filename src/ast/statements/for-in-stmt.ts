import { Node } from '../node';
import { Statement } from '.';
import { Expression, AssignmentPattern } from '../expressions/index';
import { ForDeclaration } from '../declarations/for-declaration';
/**
 * For-in statement.
 */
export interface ForInStatement extends Node {
  /* 'null' can only occur in recovery mode */
  readonly initializer: ForDeclaration | AssignmentPattern | Expression | null;
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createForInStatement(
  initializer: ForDeclaration | AssignmentPattern | Expression | null,
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
