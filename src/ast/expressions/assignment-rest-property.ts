import { Node } from '../node';
import { Expression } from '.';

/**
 * Assignment rest property
 */
export interface AssignmentRestProperty extends Node {
  readonly argument: Expression;
}

export function createAssignmentRestProperty(argument: Expression): AssignmentRestProperty {
  return {
    type: 'AssignmentRestProperty',
    argument
  };
}
