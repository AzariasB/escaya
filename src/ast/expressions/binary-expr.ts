import { Expression } from './';
import { Node } from '../node';

// The set of syntax tokens which are valid binary expression operators
export type BinaryOperator =
  | '||'
  | '&&'
  | '|'
  | '^'
  | '&'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'in'
  | 'instanceof'
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '**'
  | '??';

/**
 * Binary expression.
 */
export interface BinaryExpression extends Node {
  readonly left: Expression;
  readonly operator: BinaryOperator;
  readonly right: Expression;
}

export function createBinaryExpression(
  left: Expression,
  operator: BinaryOperator,
  right: Expression
): BinaryExpression {
  return {
    type: 'BinaryExpression',
    left,
    operator,
    right
  };
}
