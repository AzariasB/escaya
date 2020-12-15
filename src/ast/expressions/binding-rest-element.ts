import { Node } from '../node';
import { BindingIdentifier } from './binding-identifier';
import { BindingPattern } from './';

/**
 * Binding rest element
 */
export interface BindingRestElement extends Node<'BindingRestElement'> {
  readonly argument: BindingPattern | BindingIdentifier;
}

export function createBindingRestElement(argument: BindingPattern | BindingIdentifier): BindingRestElement {
  return { type: 'BindingRestElement', argument };
}
