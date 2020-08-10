import { SyntaxNode } from '../syntax-node';

/**
 * Semicolon
 */
export type Semicolon = SyntaxNode;

export function createSemicolon(): Semicolon {
  return { type: 'Semicolon' };
}
