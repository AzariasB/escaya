import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions';
import { SwitchStatement } from './switch-stmt';

/**
 * Default and case clause statement.
 */

export interface DefaultClause extends Node {
  readonly leafs: Statement[];
  readonly parent?: SwitchStatement;
}

export interface CaseClause extends Node {
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
