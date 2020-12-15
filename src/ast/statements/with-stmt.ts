import { Node } from '../node';
import { Statement } from '.';
import { Expression } from '../expressions/index';

/**
 * With statements
 */
export interface WithStatement extends Node<'WithStatement'> {
  readonly expression: Expression;
  readonly statement: Statement;
}

export function createWithStatement(expression: Expression, statement: Statement): WithStatement {
  return {
    type: 'WithStatement',
    expression,
    statement
  };
}
