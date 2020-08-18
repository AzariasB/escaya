import { Node } from '../node';
import { Expression } from '.';

/**
 * A list of comma-separated expressions.
 */
export interface CommaOperator extends Node {
  readonly expressions: Expression[];
}

export function createCommaOperator(expressions: Expression[]): CommaOperator {
  return {
    type: 'CommaOperator',
    expressions
  };
}
