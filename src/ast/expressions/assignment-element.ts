import { Expression, AssignmentPattern } from '.';
import { ArrayAssignmentPattern } from './array-assignment-pattern';
import { ObjectAssignmentPattern } from './object-assignment-pattern';
import { SyntaxNode } from '../syntax-node';

/**
 * Assignment element.
 */
export interface AssignmentElement extends SyntaxNode {
  readonly left: ObjectAssignmentPattern | ArrayAssignmentPattern | Expression;
  // May be 'null' in recovery mode
  readonly right: Expression | null;
  /*@internal*/
  readonly parent?: AssignmentPattern;
}

export function createAssignmentElement(
  left: ObjectAssignmentPattern | AssignmentPattern,
  right: Expression
): AssignmentElement {
  return {
    type: 'AssignmentElement',
    left,
    right
  };
}
