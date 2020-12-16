import { Node } from '../node';
import { BindingIdentifier } from './binding-identifier';
/**
 * Binding rest property
 */
export interface BindingRestProperty extends Node<'BindingRestProperty'> {
  readonly argument: BindingIdentifier;
}

export function createBindingRestProperty(argument: BindingIdentifier): BindingRestProperty {
  return {
    type: 'BindingRestProperty',
    argument
  };
}
