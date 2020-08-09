import { SyntaxNode } from '../syntax-node';
import { MemberExpression } from './member-expr';
import { TemplateExpression } from './template-expression';
import { TemplateLiteral } from './template-literal';

/**
 * Tagged template
 */
export interface TaggedTemplate extends SyntaxNode {
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
