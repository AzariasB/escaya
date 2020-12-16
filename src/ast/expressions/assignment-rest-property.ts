import { Node } from '../node';
import { Expression } from '.';
import { AssignmentElement } from './assignment-element';
import { ArrayAssignmentPattern } from './array-assignment-pattern';
import { ObjectAssignmentPattern } from './object-assignment-pattern';

/**
 * Assignment rest property
 */
export interface AssignmentRestProperty extends Node<'AssignmentRestProperty'> {
  readonly argument: ArrayAssignmentPattern | ObjectAssignmentPattern | AssignmentElement | Expression;
}

export function createAssignmentRestProperty(
  argument: ArrayAssignmentPattern | ObjectAssignmentPattern | AssignmentElement | Expression
): AssignmentRestProperty {
  return {
    type: 'AssignmentRestProperty',
    argument
  };
}
