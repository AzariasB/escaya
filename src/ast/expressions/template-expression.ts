import { SyntaxNode } from '../syntax-node';
import { TemplateElement } from './template-element';
/**
 * Template expression.
 */
export interface TemplateExpression extends SyntaxNode {
  readonly elements: TemplateElement[];
}

export function createTemplateExpression(elements: TemplateElement[]): TemplateExpression {
  return {
    type: 'TemplateExpression',
    elements
  };
}
