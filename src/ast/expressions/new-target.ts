import { Node } from '../node';

/**
 * New target expression.
 */
export type NewTarget = Node<'NewTarget'>;

export function createNewTarget(): NewTarget {
  return {
    type: 'NewTarget'
  };
}
