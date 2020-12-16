import { Expression, BindingPattern } from '.';
import { BindingIdentifier } from './binding-identifier';
import { Node } from '../node';

/**
 * Binding element
 */

export interface BindingElement extends Node<'BindingElement'> {
  readonly left: BindingPattern | BindingIdentifier;
  readonly right: Expression;
  /*@internal*/
  readonly parent?: BindingPattern;
}

export function createBindingElement(left: BindingPattern | BindingIdentifier, right: Expression): BindingElement {
  return {
    type: 'BindingElement',
    left,
    right
  };
}
