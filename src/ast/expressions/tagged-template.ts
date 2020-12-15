import { Node } from '../node';
import { LeftHandSideExpression } from '.';
import { TemplateExpression } from './template-expression';
import { TemplateLiteral } from './template-literal';

/**
 * Tagged template
 */
export interface TaggedTemplate extends Node<'TaggedTemplate'> {
  readonly member: LeftHandSideExpression;
  readonly literal: TemplateLiteral | TemplateExpression;
}

export function createTaggedTemplate(
  member: LeftHandSideExpression,
  literal: TemplateLiteral | TemplateExpression
): TaggedTemplate {
  return {
    type: 'TaggedTemplate',
    member,
    literal
  };
}
