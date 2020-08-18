import { Node } from '../node';
import { Expression } from '.';

// [MODIFIED]

/**
 * Spread property
 */
export interface SpreadProperty extends Node {
  readonly argument: Expression;
}

export function createSpreadProperty(argument: Expression): SpreadProperty {
  return {
    type: 'SpreadProperty',
    argument
  };
}
