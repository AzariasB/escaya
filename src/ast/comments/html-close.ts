import { Comments } from './';

/**
 * HTMLClose
 */
export interface HTMLClose extends Comments {}

export function createHTMLClose(comment: string, newLine: boolean): HTMLClose {
  return {
    type: 'HTMLClose',
    comment,
    newLine
  };
}
