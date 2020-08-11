import { Expression } from '.';
import { SyntaxNode } from '../syntax-node';
import { UpdateOp } from './prefix-update-expr';

// see: https://tc39.github.io/ecma262/#prod-UpdateExpression
export interface PostfixUpdateExpression extends SyntaxNode {
  readonly operator: UpdateOp;
  readonly operand: Expression;
}

export function createPostfixUpdateExpression(operator: UpdateOp, operand: Expression): PostfixUpdateExpression {
  return {
    type: 'PostfixUpdateExpression',
    operator,
    operand
  };
}
