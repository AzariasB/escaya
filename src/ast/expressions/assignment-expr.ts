import { Expression } from './';
import { ArrayAssignmentPattern } from './array-assignment-pattern';
import { ObjectAssignmentPattern } from './object-assignment-pattern';
import { Node } from '../node';

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
export interface AssignmentExpression extends Node {
  readonly left: ObjectAssignmentPattern | ArrayAssignmentPattern | Expression;
  readonly operator: AssignmentOperator | LogicalAssignmentOperator;
  readonly right: Expression;
}

export function createAssignmentExpression(
  left: ObjectAssignmentPattern | ArrayAssignmentPattern | Expression,
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
