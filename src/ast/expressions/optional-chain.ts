import { CallChain } from './call-chain';
import { MemberChain } from './member-chain-expr';
import { Node } from '../node';

/**
 * OptionalChain
 */

export interface OptionalChain extends Node {
  readonly chain: MemberChain | CallChain | null;
}

export function createOptionalChain(chain: MemberChain | CallChain | null): OptionalChain {
  return {
    type: 'OptionalChain',
    chain
  };
}
