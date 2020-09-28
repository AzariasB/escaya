import { Comment } from './';

/**
 * MultiLine
 */
export type MultiLine = Comment;

export function createHTMLClose(comment: string, newLine: boolean): MultiLine {
  return {
    type: 'MultiLine',
    comment,
    newLine
  };
}
