import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * An if statement with an optional else branch.
 */
export interface IfStatement extends Node {
  readonly expression: Expression;
  readonly consequent: Statement;
  readonly alternate: Statement | null;
}

export function createIfStatement(
  expression: Expression,
  consequent: Statement,
  alternate: Statement | null
): IfStatement {
  return {
    type: 'IfStatement',
    expression,
    consequent,
    alternate
  };
}
