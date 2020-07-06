import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of [
    '(-1) = a',
    '(- 0) = a',
    '1 = a',
    '(-1) *= a',
    '(- 0) *= a',
    '1 *= a',
    '(-1) /= a',
    '++(a + b)',
    '(a = b) <<= c',
    'a + b %= c',
    '(a = b) /= c',
    '(- 0) /= a',
    '1 /= a',
    '(-1) %= a',
    '(- 0) %= a',
    '1 %= a',
    '(-1) += a',
    '(- 0) += a',
    '1 += a',
    '(-1) -= a',
    '(- 0) -= a',
    '1 -= a',
    '(-1) <<= a',
    '(- 0) <<= a',
    '1 <<= a',
    '(-1) >>= a',
    '(- 0) >>= a',
    '1 >>= a',
    '(-1) >>>= a',
    '(- 0) >>>= a',
    '1 >>>= a',
    '(-1) &= a',
    '(- 0) &= a',
    '1 &= a',
    '(-1) ^= a',
    '(- 0) ^= a',
    '1 ^= a',
    'a - a = 1',
    'a - 4 = 1',
    '(-1) |= a',
    '(- 0) |= a',
    '1 |= a'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases
  for (const arg of [
    '(a + b) >> c',
    '(a % b) + c',
    'a << b instanceof c',
    'a >> (b >> c)',
    '(a << b) in c',
    '(a * b) / c',
    '!(void a)',
    '++a + b',
    '(-1).a'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
