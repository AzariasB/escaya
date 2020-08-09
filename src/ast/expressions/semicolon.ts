import { SyntaxNode } from '../syntax-node';

/**
 * Semicolon
 */
export interface Semicolon extends SyntaxNode {}

export function createSemicolon(): Semicolon {
  return { type: 'Semicolon' };
}
