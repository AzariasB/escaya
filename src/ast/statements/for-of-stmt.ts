import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression, AssignmentPattern } from '../expressions/index';
import { ForDeclaration } from '../declarations/for-declaration';

export interface ForOfBase extends SyntaxNode {
  /* 'null' can only occur in recovery mode */
  readonly initializer: ForDeclaration | AssignmentPattern | Expression | null;
  readonly expression: Expression;
  readonly statement: Statement;
}

/**
 * For statement.
 */
export type ForOfStatement = ForOfBase;

/**
 * For-await statement.
 */
export type ForAwaitStatement = ForOfBase;

export function createForOfAwaitStatement(
  initializer: ForDeclaration | AssignmentPattern | Expression | null,
  expression: Expression,
  statement: Statement,
  isAwait: boolean
): ForOfStatement | ForAwaitStatement {
  return isAwait
    ? {
        type: 'ForOfStatement',
        initializer,
        expression,
        statement
      }
    : {
        type: 'ForAwaitStatement',
        initializer,
        expression,
        statement
      };
}
