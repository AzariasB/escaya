import { Comment } from './';

/**
 * HTMLClose
 */
export type HTMLClose = Comment;

export function createHTMLClose(comment: string, newLine: boolean): HTMLClose {
  return {
    type: 'HTMLClose',
    comment,
    newLine
  };
}
