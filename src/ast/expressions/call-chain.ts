import { Expression } from '.';
import { MemberChain } from './member-chain-expr';
import { SyntaxNode } from '../syntax-node';

/**
 * Call chain expression.
 */
export interface CallChain extends SyntaxNode {
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
