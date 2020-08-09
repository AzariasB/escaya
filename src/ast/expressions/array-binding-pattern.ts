import { SyntaxNode } from '../syntax-node';
import { BindingElement } from './binding-element';
import { BindingRestElement } from './binding-rest-element';
import { VariableDeclaration } from '../declarations/variable-declaration';
import { Parameter } from '.';

/**
 * Array binding pattern.
 */
export interface ArrayBindingPattern extends SyntaxNode {
  readonly elements: (BindingRestElement | BindingElement)[];
  /* @internal */
  readonly parent?: VariableDeclaration | BindingRestElement | Parameter | BindingElement;
}

export function createArrayBindingPattern(elements: (BindingRestElement | BindingElement)[]): ArrayBindingPattern {
  return {
    type: 'ArrayBindingPattern',
    elements
  };
}
