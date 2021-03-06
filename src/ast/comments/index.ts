import { Node } from '../node';
import { MultiLine } from './multi-line';
import { SingleLine } from './single-line';
import { HTMLClose } from './html-close';
import { HTMLOpen } from './html-open';

export interface Comment extends Node<'SingleLine' | 'MultiLine' | 'HTMLClose' | 'HTMLOpen'> {
  comment?: string;
  newLine: boolean;
}

/**
 * The set of all comments
 */
export type Comments = MultiLine | SingleLine | HTMLOpen | HTMLClose;
