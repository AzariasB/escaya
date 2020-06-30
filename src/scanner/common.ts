import { Chars } from './chars';

/**
 * A set of flags for maintaining the internal state machine.
 */
export const enum LexerState {
  None = 0,
  NewLine = 1 << 0,
  LineStart = 1 << 1,
  LastIsCR = 1 << 2
}

// Intentionally negative
export const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

// Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.

export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

export function fromCodePoint(code: number): string {
  if (code > 0xffff) {
    return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
  }
  return String.fromCharCode(code);
}
