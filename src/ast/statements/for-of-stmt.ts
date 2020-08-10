import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression, BindingPattern } from '../expressions/index';
import { ForDeclaration } from '../declarations/for-declaration';

export interface ForOfBase extends SyntaxNode {
  // The expression or declaration before `of`.
  readonly initializer: ForDeclaration | BindingPattern | Expression;
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
  initializer: ForDeclaration | BindingPattern | Expression,
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
