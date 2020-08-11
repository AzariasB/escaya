import { SyntaxNode } from '../syntax-node';

/**
 * Template literal.
 */
export interface TemplateLiteral extends SyntaxNode {
  readonly raw: string;
  readonly value: string;
}

export function createTemplateLiteral(raw: string, value: string): TemplateLiteral {
  return {
    type: 'TemplateLiteral',
    raw,
    value
  };
}
