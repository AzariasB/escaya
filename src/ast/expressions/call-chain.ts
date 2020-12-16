import { Expression } from '.';
import { MemberChain } from './member-chain-expr';
import { OptionalChain } from './optional-chain';

/**
 * Call chain expression.
 */
export interface CallChain extends OptionalChain<'CallChain'> {
  readonly arguments: Expression[] | null;
}

export function createCallChain(chain: MemberChain | CallChain | null, _arguments: Expression[] | null): CallChain {
  return {
    type: 'CallChain',
    chain,
    arguments: _arguments
  };
}
