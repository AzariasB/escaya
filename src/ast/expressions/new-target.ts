import { Node } from '../node';

/**
 * New target expression.
 */
export type NewTarget = Node;

export function createNewTarget(): NewTarget {
  return {
    type: 'NewTarget'
  };
}
