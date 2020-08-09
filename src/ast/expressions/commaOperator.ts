import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

/**
 * A list of comma-separated expressions.
 */
export interface CommaOperator extends SyntaxNode {
  readonly expressions: Expression[];
}

export function createCommaOperator(expressions: Expression[]): CommaOperator {
  return {
    type: 'CommaOperator',
    expressions
  };
}
