import { LeftHandSideExpression } from '.';
import { SyntaxNode } from '../syntax-node';

export type UpdateOp = '++' | '--';

// see: https://tc39.github.io/ecma262/#prod-UpdateExpression
export interface PrefixUpdateExpression extends SyntaxNode {
  readonly operator: UpdateOp;
  readonly operand: LeftHandSideExpression;
}

export function createPrefixUpdateExpression(
  operator: UpdateOp,
  operand: LeftHandSideExpression
): PrefixUpdateExpression {
  return {
    type: 'PrefixUpdateExpression',
    operator,
    operand
  };
}
