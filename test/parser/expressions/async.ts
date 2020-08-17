import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async', () => {
  // Invalid cases
  for (const arg of ['async({a: x, ...x = y} = obj)', 'async({a: x, ...{x}} = obj)', '[] += a']) {
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
    'async(x,)',
    'async(x,) => x',
    'async(a, ...b);',
    'async()',
    'async/x',
    'async \n / x',
    'async\n()',
    '(async((a), ...b))',
    '(async(a, ...b))',
    '(async(a, ...[b] = xxx))',
    '(async(a, ...([b] = xxx)))',
    'log(async()[foo]);',
    'f(async in {})',
    'f(a + async in b)',
    'f(async instanceof {})',
    'async(yield);',
    'async([].x);',
    'async ({} + 1);',
    'async: foo',
    'foo(async[x])',
    'foo(async(x,y,z))',
    'async = 5 + 5;',
    'async + 10;',
    'async\n(2);',
    'async \n / x',
    'async \n  / x / g',
    'async / x',
    'async (x, {a: x})',
    'async (x, {x})',
    'async (x, {"foo": x})',
    'async (x, {15: x})',
    'async (x, {a: {x}})',
    'async (x, {a: {b: x}})',
    'async ({[a]: x, b: x})',
    'async ({[a]: x, [b]: x})',
    'async ({a: x, b: x})',
    'async ({a: x, c: {b: x}})',
    'async ({a: x, ...x})',
    'async ({a: x, ...x = y})',
    'async ({a: x, ...{x}})',
    'async({x, a: x} = obj)',
    'async({x, x} = obj)',
    'async({x, "foo": x} = obj)',
    'async({x, a: {x}} = obj)',
    'async({x, a: {b: x}} = obj)',
    'async({[a]: x, b: x} = obj)',
    'async({a: x, ...x} = obj)',
    'async(x, y)',
    'async \n (x, y)',
    'async(a, b) * c',
    'async() * b',
    'async \n (a, b) * c',
    'async ({__proto__: a, __proto__: b});',
    'async ({__proto__: a, __proto__: b}) => x;',
    '(a, [b, [c, {__proto__: d, __proto__: e}]], f) => x;',
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
