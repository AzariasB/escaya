import { Node } from '../node';
import { MemberExpression } from './member-expr';
import { TemplateExpression } from './template-expression';
import { TemplateLiteral } from './template-literal';

/**
 * Tagged template
 */
export interface TaggedTemplate extends Node {
  readonly member: MemberExpression;
  readonly literal: TemplateLiteral | TemplateExpression;
}

export function createTaggedTemplate(
  member: MemberExpression,
  literal: TemplateLiteral | TemplateExpression
): TaggedTemplate {
  return {
    type: 'TaggedTemplate',
    member,
    literal
  };
}
