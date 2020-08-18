import { Node } from '../node';
import { Expression } from '.';

export interface ParenthesizedExpression extends Node {
  readonly expression: Expression[];
}

export function createParenthesizedExpression(expression: Expression[]): ParenthesizedExpression {
  return {
    type: 'ParenthesizedExpression',
    expression
  };
}
