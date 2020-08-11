import { SyntaxNode } from '../syntax-node';

/**
 * New target expression.
 */
export type NewTarget = SyntaxNode;

export function createNewTarget(): NewTarget {
  return {
    type: 'NewTarget'
  };
}
