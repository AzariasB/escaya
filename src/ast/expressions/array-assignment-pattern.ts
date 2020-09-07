import { Node } from '../node';
import { AssignmentElement } from './assignment-element';
import { AssignmentRestElement } from './assignment-rest-element';
import { Expression } from '.';
import { Elison } from './elison';

/**
 * Array assignment pattern.
 */
export interface ArrayAssignmentPattern extends Node {
  readonly elements: (Elison | AssignmentRestElement | AssignmentElement | Expression)[];
  /* @internal */
  readonly parent?: AssignmentElement;
}

export function createArrayAssignmentPattern(
  elements: (Elison | AssignmentRestElement | AssignmentElement | Expression)[]
): ArrayAssignmentPattern {
  return {
    type: 'ArrayAssignmentPattern',
    elements
  };
}
