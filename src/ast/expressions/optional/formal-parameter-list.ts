import { Node } from '../../node';
import { BindingElement } from '../binding-element';

/**
 * Formal parameter list
 */
export interface FormalParameterList extends Node<'FormalParameterList'> {
  readonly parameters: BindingElement;
}

export function createFormalParameterList(parameters: BindingElement): FormalParameterList {
  return {
    type: 'FormalParameterList',
    parameters
  };
}
