import { Expression, AssignmentPattern } from '.';
import { SyntaxNode } from '../syntax-node';

/**
 * Assignment element.
 */
export interface AssignmentElement extends SyntaxNode {
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
