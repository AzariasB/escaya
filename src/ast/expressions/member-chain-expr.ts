import { Expression } from '.';
import { IdentifierName } from './identifiername';
import { CallChain } from './call-chain';
import { Node } from '../node';

/**
 * Member chain expression.
 */
export interface MemberChain extends Node<'MemberChain'> {
  readonly chain: MemberChain | CallChain | null;
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
