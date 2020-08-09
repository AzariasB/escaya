import { BindingRestProperty } from './binding-rest-property';
import { PropertyName } from './property-name';
import { BindingElement } from './binding-element';
import { AssignmentElement } from './assignment-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';
import { SyntaxNode } from '../syntax-node';

/**
 * Object assignment pattern.
 */
export interface ObjectAssignmentPattern extends SyntaxNode {
  readonly properties: (PropertyName | AssignmentElement | BindingRestProperty)[];
  /* @internal */
  readonly parent?: BindingElement | VariableDeclaration | Parameter;
}

export function createObjectAssignmentPattern(
  properties: (PropertyName | AssignmentElement | BindingRestProperty)[]
): ObjectAssignmentPattern {
  return {
    type: 'ObjectAssignmentPattern',
    properties
  };
}
