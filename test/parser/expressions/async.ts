import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async', () => {
  // Invalid cases
  for (const arg of [
    'foo(async[])',
    'x = {x=y};',
    '({a:(a,y) = 0} = 1)',
    '({...obj1,} = foo)',
    '({...obj1,a} = foo)',
    '({...(a,b)} = foo)',
    'x, {a: {a: 1} = []};',
    'x, [foo + y, bar] = doo;',
    '({foo: {x:y} += x})',
    '...{a: b}.c = [])'
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
  }

  // Valid cases
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
  }
});
