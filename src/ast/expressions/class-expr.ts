import { Expression } from '.';
import { BindingIdentifier } from './binding-identifier';
import { SyntaxNode } from '../syntax-node';
import { ClassElement } from './class-element';

/**
 * Class expression.
 */
export interface ClassExpression extends SyntaxNode {
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
