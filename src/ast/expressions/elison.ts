import { Node } from '../node';

export type Elison = Node;

export function createElison(): Elison {
  return { type: 'Elison' };
}
