import { SyntaxNode } from '../syntax-node';

/**
 * Do-while statement.
 */
export type EmptyStatement = SyntaxNode;

export function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement'
  };
}
