import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

/**
 * An super call expression.
 */
export interface SuperCall extends SyntaxNode {
  readonly arguments: Expression[];
}

export function createSuperCall(_arguments: Expression[]): SuperCall {
  return {
    type: 'SuperCall',
    arguments: _arguments
  };
}
