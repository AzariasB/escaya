import { Node } from '../node';
import { Statement } from '.';
import { Expression, AssignmentPattern } from '../expressions/index';
import { LexicalDeclaration } from '../declarations/lexical-declaration';
import { ForBinding } from './forBinding';

export interface ForOfStatement extends Node<'ForOfStatement'> {
  /* 'null' can only occur in recovery mode */
  readonly initializer: LexicalDeclaration | ForBinding | AssignmentPattern | Expression | null;
  readonly expression: Expression;
  readonly statement: Statement;
  readonly await: boolean;
}

/**
 * For-of statement.
 */

export function createForOfStatement(
  initializer: LexicalDeclaration | ForBinding | AssignmentPattern | Expression | null,
  expression: Expression,
  statement: Statement,
  isAwait: boolean
): ForOfStatement {
  return {
    type: 'ForOfStatement',
    initializer,
    expression,
    statement,
    await: isAwait
  };
}
