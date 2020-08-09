import { Expression } from './';
import { SyntaxNode } from '../syntax-node';

/**
 * New expression.
 */
export interface NewExpression extends SyntaxNode {
  readonly expression: Expression;
  readonly arguments: Expression[];
}

export function createNewExpression(expression: Expression, _arguments: Expression[]): NewExpression {
  return {
    type: 'NewExpression',
    expression,
    arguments: _arguments
  };
}
