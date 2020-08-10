import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'async(...x/y);',
    'async(...a, b);',
    'async(...a);',
    'async(a, ...b);',
    'async()',
    'async\n()',
    'log(async()[foo]);',
    'f(async in {})',
    'f(a + async in b)',
    'f(async instanceof {})',
    'async(yield);',
    'async: foo',
    'foo(async[x])',
    'foo(async(x,y,z))',
    'async = 5 + 5;',
    'async + 10;',
    'async\n(2);',
    'async \n / x',
    'async \n  / x / g',
    'async / x',
    'async(x, y)',
    'async \n (x, y)',
    'async(a, b) * c',
    'async() * b',
    'async \n (a, b) * c',
    'f(a, b) * c',
    'async(), x',
    'x / async',
    'x + async',
    'async',
    'f(async)'
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
