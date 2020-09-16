import { Node } from '../node';
import { PropertyKey } from '.';
import { AssignmentExpression } from './assignment-expr';
import { BindingElement } from './binding-element';
import { AssignmentElement } from './assignment-element';

/**
 * Property name
 */
export interface PropertyName extends Node {
  readonly key: PropertyKey;
  readonly value: AssignmentExpression | BindingElement | AssignmentElement;
}

export function createPropertyName(
  key: PropertyKey,
  value: AssignmentExpression | BindingElement | AssignmentElement
): PropertyName {
  return {
    type: 'PropertyName',
    key,
    value
  };
}
