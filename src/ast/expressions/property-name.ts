import { SyntaxNode } from '../syntax-node';
import { Expression, PropertyKey } from '.';
import { BindingElement } from './binding-element';
import { AssignmentElement } from './assignment-element';

/**
 * Property name
 */
export interface PropertyName extends SyntaxNode {
  readonly key: PropertyKey;
  readonly value: Expression | BindingElement | AssignmentElement;
}

export function createPropertyName(
  key: PropertyKey,
  value: Expression | BindingElement | AssignmentElement
): PropertyName {
  return {
    type: 'PropertyName',
    key,
    value
  };
}
