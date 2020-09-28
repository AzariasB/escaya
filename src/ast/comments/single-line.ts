import { Comments } from './';

/**
 * SingleLine
 */
export interface SingleLine extends Comments {}

export function createHTMLClose(comment: string, newLine: boolean): SingleLine {
  return {
    type: 'SingleLine',
    comment,
    newLine
  };
}
