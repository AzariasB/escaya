import { Expression } from '.';
import { BindingIdentifier } from './binding-identifier';
import { Node } from '../node';
import { ClassElement } from './class-element';
import { Semicolon } from './semicolon';

/**
 * Class expression.
 */
export interface ClassExpression extends Node {
  readonly name: BindingIdentifier | null;
  readonly heritage: Expression | null;
  readonly elements: (Semicolon | ClassElement)[];
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
