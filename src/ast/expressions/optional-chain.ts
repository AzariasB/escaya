import { CallChain } from './call-chain';
import { IdentifierName } from './identifiername';
import { Expression } from './';
import { Node } from '../node';

/**
 * OptionalChain
 */

export interface OptionalChain extends Node {
  readonly chain: Expression | Expression[] | IdentifierName | null;
}

export function createOptionalChain(chain: Expression | Expression[] | IdentifierName | null): OptionalChain {
  return {
    type: 'OptionalChain',
    chain
  };
}
