import { Expression, BindingPattern } from '.';
import { BindingIdentifier } from './binding-identifier';
import { SyntaxNode } from '../syntax-node';

/**
 * Binding element.
 */

export interface BindingElement extends SyntaxNode {
  readonly left: BindingPattern | BindingIdentifier;
  // May be 'null' in recovery mode
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
