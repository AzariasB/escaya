import { Comment } from './';

/**
 * HTMLOpen
 */
export type HTMLOpen = Comment;

export function createHTMLClose(comment: string, newLine: boolean): HTMLOpen {
  return {
    type: 'HTMLOpen',
    comment,
    newLine
  };
}
