import { Node } from '../node';
import { Expression } from '.';
import { CommaOperator } from './commaOperator';

export interface ParenthesizedExpression extends Node {
  readonly expression: Expression | CommaOperator;
}

export function createParenthesizedExpression(expression: Expression | CommaOperator): ParenthesizedExpression {
  return {
    type: 'ParenthesizedExpression',
    expression
  };
}
