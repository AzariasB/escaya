import { AsciiCharTypes, AsciiCharFlags } from './asciiChar';
import { Char } from './char';
import { unicodeLookup } from './unicode';

export const enum ScannerState {
  None = 0,
  NewLine = 1 << 0,
  SameLine = 1 << 1,
  LastIsCR = 1 << 2,
  LineStart = 1 << 3,
  Collecting = 1 << 4,
  Trailing = (1 << 5) | Collecting
}

export function isIdentifierPart(cp: number): any {
  /*
   * ES2020 11.6 IdentifierPart
   *  $ (dollar sign)
   *  _ (underscore)
   *  <ZWNJ>
   *  <ZWJ>
   *  or any character with the Unicode property «ID_Continue».
   *
   * We use a lookup table for small and thus common characters for speed.
   */
  return cp <= 0x7f
    ? AsciiCharTypes[cp] & AsciiCharFlags.IsIdentifierPart
    : (unicodeLookup[(cp >>> 5) + 104448] >>> cp) & 31 & 1;
}

// Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.

export function toHex(cp: number): number {
  if (cp <= Char.Nine) return cp - Char.Zero;
  cp = cp | 32;
  if (cp < Char.LowerA) return -1;
  if (cp <= Char.LowerF) return cp - Char.LowerA + 10;
  return -1;
}

export function fromCodePoint(cp: number): string {
  if (cp <= 0xffff) return String.fromCharCode(cp);
  return String.fromCharCode(cp >>> 10) + String.fromCharCode(cp & 0x3ff);
}
