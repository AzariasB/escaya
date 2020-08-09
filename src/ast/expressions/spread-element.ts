import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

/**
 * An Spread element
 */
export interface SpreadElement extends SyntaxNode {
  readonly argument: Expression;
}

export function createSpreadElement(argument: Expression): SpreadElement {
  return {
    type: 'SpreadElement',
    argument
  };
}
