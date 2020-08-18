import { Expression } from '.';
import { Node } from '../node';

export interface ConciseBody extends Node {
  readonly expression: Expression;
}

export function createConciseBody(expression: Expression): ConciseBody {
  return {
    type: 'ConciseBody',
    expression
  };
}
