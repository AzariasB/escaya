import { Node } from '../node';

/**
 * Elison
 *
 * - https://tc39.es/ecma262/#prod-ArrayLiteral
 * - https://tc39.es/ecma262/#prod-ArrayAssignmentPattern
 * - https://tc39.es/ecma262/#prod-ArrayBindingPattern
 *
 * Category: CST
 */

export type Elison = Node;

export function createElison(): Elison {
  return { type: 'Elison' };
}
