import { AsciiCharTypes, AsciiCharFlags } from './asciiChar';
import { Char } from './char';
import { unicodeLookup } from './unicode';

export function isIdentifierPart(code: number): any {
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
  return code <= 0x7f
    ? AsciiCharTypes[code] & AsciiCharFlags.IsIdentifierPart
    : (unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1 ||
        code === Char.ZeroWidthJoiner ||
        code === Char.ZeroWidthNonJoiner;
}

// Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.

export function toHex(code: number): number {
  if (code <= Char.Nine) return code - Char.Zero;
  code = code | 32;
  if (code < Char.LowerA) return -1;
  if (code <= Char.LowerF) return code - Char.LowerA + 10;
  return -1;
}

export function fromCodePoint(code: number): string {
  if (code <= 0xffff) return String.fromCharCode(code);
  return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
}
