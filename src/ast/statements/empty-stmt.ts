import { SyntaxNode } from '../syntax-node';

/**
 * Empty statement.
 */
export type EmptyStatement = SyntaxNode;

export function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement'
  };
}
