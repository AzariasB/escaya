import { SyntaxNode } from '../syntax-node';

/**
 * New target expression.
 */
export interface NewTarget extends SyntaxNode {}

export function createNewTarget(): NewTarget {
  return {
    type: 'NewTarget'
  };
}
