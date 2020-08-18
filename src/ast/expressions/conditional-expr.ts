import { Expression } from './';
import { Node } from '../node';

/**
 * Conditional expression.
 */
export interface ConditionalExpression extends Node {
  // The `ShortCircuitExpression`.
  readonly shortCircuit: Expression;
  // The first `AssignmentExpression`.
  readonly consequent: Expression;
  // The second `AssignmentExpression`.
  readonly alternate: Expression;
}

export function createConditionalExpression(
  shortCircuit: Expression,
  consequent: Expression,
  alternate: Expression
): ConditionalExpression {
  return {
    type: 'ConditionalExpression',
    shortCircuit,
    consequent,
    alternate
  };
}
