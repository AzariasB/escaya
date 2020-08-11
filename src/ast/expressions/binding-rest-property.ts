import { SyntaxNode } from '../syntax-node';
import { BindingIdentifier } from './binding-identifier';
/**
 * Binding rest property
 */
export interface BindingRestProperty extends SyntaxNode {
  readonly argument: BindingIdentifier;
}

export function createBindingRestProperty(argument: BindingIdentifier): BindingRestProperty {
  return {
    type: 'BindingRestProperty',
    argument
  };
}
