import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

export interface ParenthesizedExpression extends SyntaxNode {
  readonly expression: Expression[];
}

export function createParenthesizedExpression(expression: Expression[]): ParenthesizedExpression {
  return {
    type: 'ParenthesizedExpression',
    expression
  };
}
