import { Node } from '../node';
import { Expression } from '../expressions/index';
import { BindingIdentifier } from '../expressions/binding-identifier';
import { ArrayBindingPattern } from '../expressions/array-binding-pattern';
import { ObjectBindingPattern } from '../expressions/object-binding-pattern';

/**
 * Variable declaration
 */

export interface VariableDeclaration extends Node<'VariableDeclaration'> {
  readonly binding: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
  readonly initializer: Expression | null;
}

export function createVariableDeclaration(
  binding: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern,
  initializer: Expression | null
): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    binding,
    initializer
  };
}
