import { Node } from '../node';
import { Expression } from '.';
import { CommaOperator } from './commaOperator';

/**
 * Parenthesized expression
 *
 * - https://tc39.es/ecma262/#prod-ParenthesizedExpression
 *
 * Category: CST
 */

export interface ParenthesizedExpression extends Node {
  readonly expression: Expression | CommaOperator;
}

export function createParenthesizedExpression(expression: Expression | CommaOperator): ParenthesizedExpression {
  return {
    type: 'ParenthesizedExpression',
    expression
  };
}
