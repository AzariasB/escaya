import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { Expression } from '../expressions';
import { SwitchStatement } from './switch-stmt';

/**
 * Default and case clause statement.
 */

export interface DefaultClause extends SyntaxNode {
  readonly leafs: Statement[];
  readonly parent?: SwitchStatement;
}

export interface CaseClause extends SyntaxNode {
  readonly expression: Expression;
  readonly leafs: Statement[];
  readonly parent?: SwitchStatement;
}

export function createCaseClause(expression: Expression, leafs: Statement[]): CaseClause {
  return {
    type: 'CaseClause',
    expression,
    leafs
  };
}

export function createDefaultClause(leafs: Statement[]): DefaultClause {
  return {
    type: 'DefaultClause',
    leafs
  };
}
