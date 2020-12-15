import { IdentifierReference } from './identifierreference';
import { Node } from '../node';
import { Expression, PropertyKey } from '.';
import { AssignmentExpression } from './assignment-expr';
import { BindingElement } from './binding-element';
import { BindingIdentifier } from './binding-identifier';
import { AssignmentElement } from './assignment-element';
import { IdentifierName } from './identifiername';

/**
 * Property name
 */
export interface PropertyName extends Node<'PropertyName'> {
  readonly key: PropertyKey | IdentifierReference | IdentifierName;
  readonly value: AssignmentExpression | BindingElement | AssignmentElement | BindingIdentifier | Expression;
}

export function createPropertyName(
  key: PropertyKey,
  value: AssignmentExpression | BindingElement | AssignmentElement | BindingIdentifier
): PropertyName {
  return {
    type: 'PropertyName',
    key,
    value
  };
}
