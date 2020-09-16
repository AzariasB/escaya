import { AssignmentRestProperty } from './assignment-rest-property';
import { IdentifierReference } from './identifierreference';
import { PropertyName } from './property-name';
import { AssignmentElement } from './assignment-element';
import { Node } from '../node';

/**
 * Object assignment pattern.
 */
export interface ObjectAssignmentPattern extends Node {
  readonly properties: (IdentifierReference | PropertyName | AssignmentRestProperty)[];
  /* @internal */
  readonly parent?: AssignmentElement;
}

export function createObjectAssignmentPattern(
  properties: (IdentifierReference | PropertyName | AssignmentRestProperty)[]
): ObjectAssignmentPattern {
  return {
    type: 'ObjectAssignmentPattern',
    properties
  };
}
