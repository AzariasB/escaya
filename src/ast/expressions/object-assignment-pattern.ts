import { AssignmentRestProperty } from './assignment-rest-property';
import { IdentifierReference } from './identifierreference';
import { IdentifierName } from './identifiername';
import { BindingElement } from './binding-element';
import { AssignmentElement } from './assignment-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';
import { Node } from '../node';

/**
 * Object assignment pattern.
 */
export interface ObjectAssignmentPattern extends Node {
  readonly properties: (IdentifierReference | IdentifierName | AssignmentElement | AssignmentRestProperty)[];
  /* @internal */
  readonly parent?: BindingElement | VariableDeclaration | Parameter;
}

export function createObjectAssignmentPattern(
  properties: (IdentifierReference | IdentifierName | AssignmentElement | AssignmentRestProperty)[]
): ObjectAssignmentPattern {
  return {
    type: 'ObjectAssignmentPattern',
    properties
  };
}
