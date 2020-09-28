import { Comment } from './';

/**
 * SingleLine
 */
export type SingleLine = Comment;

export function createHTMLClose(comment: string, newLine: boolean): SingleLine {
  return {
    type: 'SingleLine',
    comment,
    newLine
  };
}
