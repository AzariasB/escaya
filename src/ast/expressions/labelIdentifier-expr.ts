import { Node } from '../node';

export interface LabelIdentifier extends Node {
  readonly name: string;
}

export function createLabelIdentifier(name: string): LabelIdentifier {
  return {
    type: 'LabelIdentifier',
    name
  };
}
