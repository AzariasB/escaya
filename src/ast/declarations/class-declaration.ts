import { Expression } from '../expressions';
import { BindingIdentifier } from '../expressions/binding-identifier';
import { Node } from '../node';
import { ClassElement } from '../expressions/class-element';
/**
 * Class expression.
 */
export interface ClassDeclaration extends Node {
  // *only* 'null' in recovery mode
  readonly name: BindingIdentifier | null;
  readonly heritage: Expression | null;
  readonly elements: ClassElement[];
}

export function createClassDeclaration(
  // *only* null in recovery mode
  name: BindingIdentifier | null,
  heritage: Expression | null,
  elements: ClassElement[]
): ClassDeclaration {
  return {
    type: 'ClassDeclaration',
    name,
    heritage,
    elements
  };
}
