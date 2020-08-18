import { Expression } from '.';
import { Node } from '../node';
import { UpdateOp } from './prefix-update-expr';

// see: https://tc39.github.io/ecma262/#prod-UpdateExpression
export interface PostfixUpdateExpression extends Node {
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
