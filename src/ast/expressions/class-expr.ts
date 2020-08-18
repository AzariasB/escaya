import { Expression } from '.';
import { BindingIdentifier } from './binding-identifier';
import { Node } from '../node';
import { ClassElement } from './class-element';

/**
 * Class expression.
 */
export interface ClassExpression extends Node {
  readonly name: BindingIdentifier | null;
  readonly heritage: Expression | null;
  readonly elements: ClassElement[];
}

export function createClassExpression(
  name: BindingIdentifier | null,
  heritage: Expression | null,
  elements: ClassElement[]
): ClassExpression {
  return {
    type: 'ClassExpression',
    name,
    heritage,
    elements
  };
}
