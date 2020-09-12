import { BindingRestProperty } from './binding-rest-property';
import { BindingElement } from './binding-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';
import { BindingIdentifier } from './binding-identifier';
import { PropertyName } from './property-name';
import { Node } from '../node';

/**
 * Object binding pattern.
 */
export interface ObjectBindingPattern extends Node {
  readonly properties: (PropertyName | BindingRestProperty | BindingElement | BindingIdentifier)[];
  /* @internal */
  readonly parent?: BindingElement | VariableDeclaration | Parameter;
}

export function createObjectBindingPattern(
  properties: (PropertyName | BindingRestProperty | BindingElement | BindingIdentifier)[]
): ObjectBindingPattern {
  return {
    type: 'ObjectBindingPattern',
    properties
  };
}
