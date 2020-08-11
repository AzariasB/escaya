import { OptionalChain } from './optional-chain';
import { Expression } from '.';
import { SyntaxNode } from '../syntax-node';

/**
 * Optional expression.
 */
export interface OptionalExpression extends SyntaxNode {
  readonly member: Expression;
  readonly chain: OptionalChain;
}

export function createOptionalExpression(member: Expression, chain: OptionalChain): OptionalExpression {
  return {
    type: 'OptionalExpression',
    member,
    chain
  };
}
