import { Node } from '../node';
import { Statement } from '.';
import { Expression, AssignmentPattern } from '../expressions/index';
import { LexicalDeclaration } from '../declarations/lexical-declaration';
import { ForBinding } from './forBinding';

/**
 * For-in statement.
 */
export interface ForInStatement extends Node<'ForInStatement'> {
  /* 'null' can only occur in recovery mode */
  readonly initializer: LexicalDeclaration | ForBinding | AssignmentPattern | Expression | null;
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createForInStatement(
  initializer: LexicalDeclaration | ForBinding | AssignmentPattern | Expression | null,
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
