import { Node } from '../node';
import { TemplateElement } from './template-element';
/**
 * Template expression.
 */
export interface TemplateExpression extends Node {
  readonly elements: TemplateElement[];
}

export function createTemplateExpression(elements: TemplateElement[]): TemplateExpression {
  return {
    type: 'TemplateExpression',
    elements
  };
}
