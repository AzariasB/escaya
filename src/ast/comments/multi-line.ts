import { Comments } from './';

/**
 * MultiLine
 */
export interface MultiLine extends Comments {}

export function createHTMLClose(comment: string, newLine: boolean): MultiLine {
  return {
    type: 'MultiLine',
    comment,
    newLine
  };
}
