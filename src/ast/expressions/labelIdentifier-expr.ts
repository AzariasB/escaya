import { SyntaxNode } from '../syntax-node';

export interface LabelIdentifier extends SyntaxNode {
  readonly name: string;
}

export function createLabelIdentifier(name: string): LabelIdentifier {
  return {
    type: 'LabelIdentifier',
    name
  };
}
