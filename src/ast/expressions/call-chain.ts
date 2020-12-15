import { Expression } from '.';
import { MemberChain } from './member-chain-expr';
import { Node } from '../node';

/**
 * Call chain expression.
 */
export interface CallChain extends Node<'CallChain'> {
  readonly chain: MemberChain | CallChain | null;
  readonly arguments: Expression[] | null;
}

export function createCallChain(chain: MemberChain | CallChain | null, _arguments: Expression[] | null): CallChain {
  return {
    type: 'CallChain',
    chain,
    arguments: _arguments
  };
}
