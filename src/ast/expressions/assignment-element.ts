import { Expression, AssignmentPattern } from '.';
import { Node } from '../node';

/**
 * Assignment element.
 */
export interface AssignmentElement extends Node {
  readonly left: AssignmentPattern | Expression;
  // May be 'null' in recovery mode
  readonly right: Expression | null;
  /*@internal*/
  readonly parent?: AssignmentPattern;
}

export function createAssignmentElement(left: AssignmentPattern | Expression, right: Expression): AssignmentElement {
  return {
    type: 'AssignmentElement',
    left,
    right
  };
}
