import { Node } from '../node';
import { Expression } from '.';

/**
 * An super call expression.
 */
export interface SuperCall extends Node {
  readonly arguments: Expression[];
}

export function createSuperCall(_arguments: Expression[]): SuperCall {
  return {
    type: 'SuperCall',
    arguments: _arguments
  };
}
