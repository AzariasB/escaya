import { Comments } from './';

/**
 * HTMLOpen
 */
export interface HTMLOpen extends Comments {}

export function createHTMLClose(comment: string, newLine: boolean): HTMLOpen {
  return {
    type: 'HTMLOpen',
    comment,
    newLine
  };
}
