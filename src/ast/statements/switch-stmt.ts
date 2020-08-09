import { SyntaxNode } from '../syntax-node';
import { CaseClause, DefaultClause } from './case-clause';
import { Expression } from '../expressions/index';

/**
 * Switch statements.
 */
export interface SwitchStatement extends SyntaxNode {
  readonly expression: Expression;
  readonly clauses: (CaseClause | DefaultClause)[];
}

export function createSwitchStatement(
  expression: Expression,
  clauses: (CaseClause | DefaultClause)[]
): SwitchStatement {
  return {
    type: 'SwitchStatement',
    expression,
    clauses
  };
}
