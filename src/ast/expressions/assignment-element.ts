import { IdentifierReference } from './identifierreference';
import { Expression, AssignmentPattern } from '.';
import { Node } from '../node';

/**
 * Assignment element.
 */
export interface AssignmentElement extends Node {
  readonly left: AssignmentPattern | IdentifierReference;
  readonly right: Expression;
  /*@internal*/
  readonly parent?: AssignmentPattern;
}

export function createAssignmentElement(
  left: AssignmentPattern | IdentifierReference,
  right: Expression
): AssignmentElement {
  return {
    type: 'AssignmentElement',
    left,
    right
  };
}
