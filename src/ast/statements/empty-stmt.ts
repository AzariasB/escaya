import { Node } from '../node';

/**
 * Empty statement.
 */
export type EmptyStatement = Node<'EmptyStatement'>;

export function createEmptyStatement(): EmptyStatement {
  return {
    type: 'EmptyStatement'
  };
}
