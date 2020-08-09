import { SyntaxNode } from '../syntax-node';

/**
 * Do-while statement.
 */
export interface EmptyStatement extends SyntaxNode {}

export function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement'
  };
}
