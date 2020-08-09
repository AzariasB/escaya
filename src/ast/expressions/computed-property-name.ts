import { Expression } from '.';
import { SyntaxNode } from '../syntax-node';

export interface ComputedPropertyName extends SyntaxNode {
  readonly expression: Expression;
}

export function ComputedPropertyName(expression: Expression): ComputedPropertyName {
  return { type: 'ComputedPropertyName', expression };
}
