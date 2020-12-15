import { Node } from '../node';

/**
 * Semicolon
 *
 * See: https://tc39.es/ecma262/#prod-ClassElement
 *
 * Category: CST
 */

export type Semicolon = Node<'Semicolon'>;

export function createSemicolon(): Semicolon {
  return { type: 'Semicolon' };
}
