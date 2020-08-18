import { Node } from '../node';

/**
 * This expression.
 */
export type ThisExpression = Node;

export function createThisExpression(): ThisExpression {
  return { type: 'ThisExpression' };
}
