import { SyntaxNode } from '../syntax-node';

export type Elison = SyntaxNode;

export function createElison(): Elison {
  return { type: 'Elison' };
}
