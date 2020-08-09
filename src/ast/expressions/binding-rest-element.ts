import { SyntaxNode } from '../syntax-node';
import { BindingIdentifier } from './binding-identifier';
import { BindingPattern } from './';

/**
 * Binding rest element
 */
export interface BindingRestElement extends SyntaxNode {
  readonly argument: BindingPattern | BindingIdentifier;
}

export function createBindingRestElement(argument: BindingPattern | BindingIdentifier): BindingRestElement {
  return { type: 'BindingRestElement', argument };
}
