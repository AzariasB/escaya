import { Expression } from '.';
import { Node } from '../node';
import { OptionalExpression } from './optional-expr';

/**
 * Member expression.
 */
export interface MemberExpression extends Node<'MemberExpression'> {
  // The object whose property is being accessed.
  readonly member: Expression | OptionalExpression;
  // The name of the property to be accessed.
  readonly expression: Expression;
  readonly computed: boolean;
}

export function createMemberExpression(
  member: Expression,
  expression: Expression | OptionalExpression,
  computed: boolean
): MemberExpression {
  return {
    type: 'MemberExpression',
    member,
    expression,
    computed
  };
}
