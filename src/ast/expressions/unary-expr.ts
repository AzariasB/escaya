import { LeftHandSideExpression } from '.';
import { SyntaxNode } from '../syntax-node';

// The set of syntax tokens which are valid unary expression operators
export type UnaryOperator = '+' | '-' | '!' | '~' | 'delete' | 'void' | 'typeof';

// see: https://tc39.github.io/ecma262/#prod-UnaryExpression
export interface UnaryExpression extends SyntaxNode {
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
