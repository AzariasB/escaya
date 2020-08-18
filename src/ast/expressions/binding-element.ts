import { Expression, BindingPattern } from '.';
import { BindingIdentifier } from './binding-identifier';
import { Node } from '../node';

/**
 * Binding element
 */

export interface BindingElement extends Node {
  readonly left: BindingPattern | BindingIdentifier;
  readonly right: Expression | null; // Optional initializer
  /*@internal*/
  readonly parent?: BindingPattern;
}

export function createBindingElement(
  left: BindingPattern | BindingIdentifier,
  right: Expression | null
): BindingElement {
  return {
    type: 'BindingElement',
    left,
    right
  };
}
