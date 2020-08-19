import { ArrayLiteral } from './array-literal';
import { Node } from '../node';
import { Expression } from '.';

/**
 * An spread element
 */
export interface SpreadElement extends Node {
  readonly argument: Expression;
  /* @internal */
  readonly parent?: ArrayLiteral;
}

export function createSpreadElement(argument: Expression): SpreadElement {
  return {
    type: 'SpreadElement',
    argument
  };
}
