import { OptionalChain } from './optional-chain';
import { Expression } from '.';
import { Node } from '../node';

/**
 * Optional expression.
 */
export interface OptionalExpression extends Node {
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
