import { LeftHandSideExpression } from '.';
import { Node } from '../node';

// The set of syntax tokens which are valid unary expression operators
export type UnaryOperator = '+' | '-' | '!' | '~' | 'delete' | 'void' | 'typeof';

// see: https://tc39.github.io/ecma262/#prod-UnaryExpression
export interface UnaryExpression extends Node {
  readonly operator: UnaryOperator;
  readonly operand: LeftHandSideExpression;
}

export function createUnaryExpression(operator: UnaryOperator, operand: LeftHandSideExpression): UnaryExpression {
  return {
    type: 'UnaryExpression',
    operator,
    operand
  };
}
