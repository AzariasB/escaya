import { AssignmentRestProperty } from './assignment-rest-property';
import { IdentifierReference } from './identifierreference';
import { IdentifierName } from './identifiername';
import { AssignmentElement } from './assignment-element';
import { Node } from '../node';

/**
 * Object assignment pattern.
 */
export interface ObjectAssignmentPattern extends Node {
  readonly properties: (IdentifierReference | IdentifierName | AssignmentElement | AssignmentRestProperty)[];
  /* @internal */
  readonly parent?: AssignmentElement;
}

export function createObjectAssignmentPattern(
  properties: (IdentifierReference | IdentifierName | AssignmentElement | AssignmentRestProperty)[]
): ObjectAssignmentPattern {
  return {
    type: 'ObjectAssignmentPattern',
    properties
  };
}
