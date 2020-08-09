import { CallChain } from './call-chain';
import { MemberChain } from './member-chain-expr';
import { SyntaxNode } from '../syntax-node';

/**
 * OptionalChain
 */

export interface OptionalChain extends SyntaxNode {
  readonly chain: MemberChain | CallChain | null;
}

export function createOptionalChain(chain: MemberChain | CallChain | null): OptionalChain {
  return {
    type: 'OptionalChain',
    chain
  };
}
