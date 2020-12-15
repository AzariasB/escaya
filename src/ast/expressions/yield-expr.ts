import { Expression } from '.';
import { Node } from '../node';

/**
 * Yield expression.
 */
export interface YieldExpression extends Node<'YieldExpression'> {
  readonly delegate: boolean;
  readonly argument: Expression | null;
}

export function createYieldExpression(delegate: boolean, argument: Expression | null): YieldExpression {
  return {
    type: 'YieldExpression',
    delegate,
    argument
  };
}
