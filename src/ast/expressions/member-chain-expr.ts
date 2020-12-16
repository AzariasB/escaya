import { Expression } from '.';
import { IdentifierName } from './identifiername';
import { CallChain } from './call-chain';
import { OptionalChain } from './optional-chain';

/**
 * Member chain expression.
 */
export interface MemberChain extends OptionalChain<'MemberChain'> {
  readonly member: Expression | IdentifierName | null;
  readonly computed: boolean;
}

export function createMemberChain(
  chain: MemberChain | CallChain | null,
  member: Expression | IdentifierName | null,
  computed: boolean
): MemberChain {
  return {
    type: 'MemberChain',
    chain,
    member,
    computed
  };
}
