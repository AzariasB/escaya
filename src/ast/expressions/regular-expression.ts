import { Node } from '../node';

export type RegExpFlags = 'g' | 'i' | 'm' | 'u' | 's' | 'y';

/**
 * Regular expression literal
 */
export interface RegularExpressionLiteral extends Node<'RegularExpressionLiteral'> {
  readonly pattern: string;
  readonly flag: string;
}

export function createRegularExpressionLiteral(pattern: string, flag: string): RegularExpressionLiteral {
  return {
    type: 'RegularExpressionLiteral',
    pattern,
    flag
  };
}
