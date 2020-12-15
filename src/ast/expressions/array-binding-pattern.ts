import { Node } from '../node';
import { BindingElement } from './binding-element';
import { BindingRestElement } from './binding-rest-element';
import { Elison } from './elison';
import { BindingIdentifier } from './binding-identifier';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';

/**
 * Array binding pattern
 */
export interface ArrayBindingPattern extends Node<'ArrayBindingPattern'> {
  readonly elements: (Elison | BindingRestElement | BindingIdentifier | BindingElement)[];
  /* @internal */
  readonly parent?: VariableDeclaration | BindingRestElement | Parameter | BindingElement;
}

export function createArrayBindingPattern(
  elements: (Elison | BindingRestElement | BindingIdentifier | BindingElement)[]
): ArrayBindingPattern {
  return {
    type: 'ArrayBindingPattern',
    elements
  };
}
