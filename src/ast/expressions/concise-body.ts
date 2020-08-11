import { Expression } from '.';
import { SyntaxNode } from '../syntax-node';

export interface ConciseBody extends SyntaxNode {
  readonly expression: Expression;
}

export function createConciseBody(expression: Expression): ConciseBody {
  return {
    type: 'ConciseBody',
    expression
  };
}
