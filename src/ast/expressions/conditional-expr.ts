import { Expression } from './';
import { Node } from '../node';
import { AssignmentExpression } from './assignment-expr';
import { BinaryExpression } from './binary-expr';

/**
 * Conditional expression.
 */
export interface ConditionalExpression extends Node {
  // The `ShortCircuitExpression`.
  readonly shortCircuit: Expression;
  // The first `AssignmentExpression`.
  readonly consequent: AssignmentExpression;
  // The second `AssignmentExpression`.
  readonly alternate: AssignmentExpression;
}

export function createConditionalExpression(
  shortCircuit: BinaryExpression | Expression,
  consequent: AssignmentExpression,
  alternate: AssignmentExpression
): ConditionalExpression {
  return {
    type: 'ConditionalExpression',
    shortCircuit,
    consequent,
    alternate
  };
}
