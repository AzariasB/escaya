import { SyntaxNode } from '../syntax-node';
import { BindingElement } from './binding-element';
import { BindingRestElement } from './binding-rest-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter, LeftHandSideExpression } from '.';
import { Elison } from './elison';

/**
 * Array assignment pattern.
 */
export interface ArrayAssignmentPattern extends SyntaxNode {
  readonly elements: (Elison | BindingRestElement | BindingElement | LeftHandSideExpression)[];
  /* @internal */
  readonly parent?: VariableDeclaration | Parameter | BindingElement;
}

export function createArrayAssignmentPattern(
  elements: (Elison | BindingRestElement | BindingElement | LeftHandSideExpression)[]
): ArrayAssignmentPattern {
  return {
    type: 'ArrayAssignmentPattern',
    elements
  };
}
