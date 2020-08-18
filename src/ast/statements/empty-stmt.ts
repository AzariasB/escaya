import { Node } from '../node';

/**
 * Empty statement.
 */
export type EmptyStatement = Node;

export function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement'
  };
}
