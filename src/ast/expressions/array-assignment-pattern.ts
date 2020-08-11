import { SyntaxNode } from '../syntax-node';
import { AssignmentElement } from './assignment-element';
import { AssignmentRestElement } from './assignment-rest-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter, LeftHandSideExpression } from '.';
import { Elison } from './elison';

/**
 * Array assignment pattern.
 */
export interface ArrayAssignmentPattern extends SyntaxNode {
  readonly elements: (Elison | AssignmentRestElement | AssignmentElement | LeftHandSideExpression)[];
  /* @internal */
  readonly parent?: VariableDeclaration | Parameter | AssignmentElement;
}

export function createArrayAssignmentPattern(
  elements: (Elison | AssignmentRestElement | AssignmentElement | LeftHandSideExpression)[]
): ArrayAssignmentPattern {
  return {
    type: 'ArrayAssignmentPattern',
    elements
  };
}
