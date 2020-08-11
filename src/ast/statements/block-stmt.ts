import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';

/**
 * A list of statements.
 */
export interface BlockStatement extends SyntaxNode {
  readonly leafs: Statement[];
}

export function createBlockStatement(leafs: Statement[]): BlockStatement {
  return {
    type: 'BlockStatement',
    leafs
  };
}
