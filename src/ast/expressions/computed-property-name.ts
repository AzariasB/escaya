import { Expression } from '.';
import { Node } from '../node';

export interface ComputedPropertyName extends Node<'ComputedPropertyName'> {
  readonly expression: Expression;
}

export function ComputedPropertyName(expression: Expression): ComputedPropertyName {
  return { type: 'ComputedPropertyName', expression };
}
