import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';
import { CallExpression } from './call-expr';
import { NewExpression } from './new-expr';

/**
 * Assignment rest element
 */
export interface AssignmentRestElement extends SyntaxNode {
  readonly argument: Expression;
  /* @internal */
  readonly parent?: CallExpression | NewExpression;
}

export function createAssignmentRestElement(argument: Expression): AssignmentRestElement {
  return {
    type: 'AssignmentRestElement',
    argument
  };
}
