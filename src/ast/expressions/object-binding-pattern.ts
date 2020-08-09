import { BindingRestProperty } from './binding-rest-property';
import { PropertyName } from './property-name';
import { BindingElement } from './binding-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';
import { BindingIdentifier } from './binding-identifier';
import { SyntaxNode } from '../syntax-node';

/**
 * Object binding pattern.
 */
export interface ObjectBindingPattern extends SyntaxNode {
  readonly properties: (PropertyName | BindingElement | BindingRestProperty | BindingIdentifier)[];
  /* @internal */
  readonly parent?: BindingElement | VariableDeclaration | Parameter;
}

export function createObjectBindingPattern(
  properties: (PropertyName | BindingElement | BindingRestProperty | BindingIdentifier)[]
): ObjectBindingPattern {
  return {
    type: 'ObjectBindingPattern',
    properties
  };
}
