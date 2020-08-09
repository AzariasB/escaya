import { Expression } from './';
import { SyntaxNode } from '../syntax-node';

export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  | '**=';

export type LogicalAssignmentOperator = '||=' | '&&=' | '??=';

/**
 * Assignment expression.
 */
export interface AssignmentExpression extends SyntaxNode {
  readonly left: Expression;
  readonly operator: AssignmentOperator | LogicalAssignmentOperator;
  readonly right: Expression;
}

export function createAssignmentExpression(
  left: Expression,
  operator: AssignmentOperator | LogicalAssignmentOperator,
  right: Expression
): AssignmentExpression {
  return {
    type: 'AssignmentExpression',
    left,
    operator,
    right
  };
}
