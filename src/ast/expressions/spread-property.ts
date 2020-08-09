import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

// [MODIFIED]

/**
 * Spread property
 */
export interface SpreadProperty extends SyntaxNode {
  readonly argument: Expression;
}

export function createSpreadProperty(argument: Expression): SpreadProperty {
  return {
    type: 'SpreadProperty',
    argument
  };
}
