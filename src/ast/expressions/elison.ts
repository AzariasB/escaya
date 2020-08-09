import { SyntaxKind, SyntaxNode } from '../syntax-node';

export interface Elison extends SyntaxNode {}

export function createElison(): Elison {
  return { type: 'Elison' };
}
