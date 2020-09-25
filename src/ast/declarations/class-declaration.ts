import { Expression } from '../expressions';
import { BindingIdentifier } from '../expressions/binding-identifier';
import { Node } from '../node';
import { ClassElement } from '../expressions/class-element';
import { Semicolon } from '../expressions/semicolon';

/**
 * Class declaration
 */
export interface ClassDeclaration extends Node {
  // May be null in `export default class { ... }`
  readonly name: BindingIdentifier | null;
  readonly heritage: Expression | null;
  readonly elements: (Semicolon | ClassElement)[];
}

export function createClassDeclaration(
  name: BindingIdentifier | null,
  heritage: Expression | null,
  elements: (Semicolon | ClassElement)[]
): ClassDeclaration {
  return {
    type: 'ClassDeclaration',
    name,
    heritage,
    elements
  };
}
