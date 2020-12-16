import { IdentifierName } from './identifiername';
import { Expression } from './';
import { Node } from '../node';

/**
 * OptionalChain
 */

export interface OptionalChain<T extends 'CallChain' | 'OptionalChain' | 'MemberChain' = 'OptionalChain'>
  extends Node<T> {
  readonly chain: Expression | Expression[] | IdentifierName | null;
}

export function createOptionalChain(chain: Expression | Expression[] | IdentifierName | null): OptionalChain {
  return {
    type: 'OptionalChain',
    chain
  };
}
