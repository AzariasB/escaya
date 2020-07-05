import { ParserState } from '../common';
import { Chars } from './chars';

// A set of flags for maintaining the internal state machine.
export const enum State {
  None = 0,
  NewLine = 1 << 0,
  LineStart = 1 << 1,
  LastIsCR = 1 << 2,
  Collecting = 1 << 3,
  Trailing = 1 << 4,
  Leading = 1 << 5
}

// Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.

export function toHex(code: number): number {
  if (code <= Chars.Nine) return code - Chars.Zero;
  code = code | 32;
  if (code < Chars.LowerA) return -1;
  if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
  return -1;
}

export function fromCodePoint(code: number): string {
  if (code <= 0xffff) return String.fromCharCode(code);
  return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
}
