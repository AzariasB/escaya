import { Node } from '../node';

export interface LabelIdentifier extends Node<'LabelIdentifier'> {
  readonly name: string;
}

export function createLabelIdentifier(name: string): LabelIdentifier {
  return {
    type: 'LabelIdentifier',
    name
  };
}
