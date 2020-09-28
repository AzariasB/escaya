import { Node } from '../node';

export interface Comments extends Node {
  type: 'SingleLine' | 'MultiLine' | 'HTMLClose' | 'HTMLOpen';
  comment: any;
  newLine: any;
}
