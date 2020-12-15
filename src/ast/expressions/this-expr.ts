import { Node } from '../node';

/**
 * This expression.
 */
export type ThisExpression = Node<'ThisExpression'>;

export function createThisExpression(): ThisExpression {
  return { type: 'ThisExpression' };
}
