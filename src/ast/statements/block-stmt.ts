import { Node } from '../node';
import { Statement } from '.';

/**
 * Block statement. A list of statements.
 */
export interface BlockStatement extends Node {
  readonly leafs: Statement[];
}

export function createBlockStatement(leafs: Statement[]): BlockStatement {
  return {
    type: 'BlockStatement',
    leafs
  };
}
