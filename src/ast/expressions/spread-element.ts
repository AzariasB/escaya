import { Node } from '../node';
import { Expression } from '.';

/**
 * An Spread element
 */
export interface SpreadElement extends Node {
  readonly argument: Expression;
}

export function createSpreadElement(argument: Expression): SpreadElement {
  return {
    type: 'SpreadElement',
    argument
  };
}
