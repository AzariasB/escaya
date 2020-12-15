import { Node } from '../node';

/**
 * Template literal.
 */
export interface TemplateLiteral extends Node<'TemplateLiteral'> {
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
