import { Node } from '../node';

/**
 * Semicolon
 */
export type Semicolon = Node;

export function createSemicolon(): Semicolon {
  return { type: 'Semicolon' };
}
