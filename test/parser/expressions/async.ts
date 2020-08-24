import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async', () => {
  // Invalid cases
  for (const arg of [
    'async({a: x, ...x = y} = obj)',
    'async({a: x, ...{x}} = obj)',
    'async foo \n ..',
    'async \n foo \n ..',
    //'async () => {} \n  /x/',
    //'async (x, y) => {} \n  /x/',
    'async async => {} \n  / x',
    'async (a, ...x = 10) => x;',
    '()=>{}[x]',
    '()=>{}{x}',
    '()=>{}.x',
    '()=>{}(foo)',
    'a => {}() => {}',
    'async => {} ++foo'
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
    'async[x] * y',
    'async + c',
    'async + c + d',
    'async \n (foo);',
    'let x = async \n (foo)',
    'new async();',
    'async \n x => y',
    'a + async + c + d',
    '(((a + async) + c) + d)',
    '((async + c) + d)',
    '(async + c)',
    '((((a + b) + async) + c) + d)',
    '(((a + async) + c) + d)',
    '((a+b)+(async+d))',
    'async \n instanceof obj',
    'async \n in obj',
    'async \n in x',
    'async \n foo;',
    'async\n()',
    'async in x',
    'async instanceof x',
    'async \n function f(){}',
    'x = async \n a => b',
    'x = async \n function f(){}',
    'async \n [x]',
    '(async \n [x])',
    'new async;',
    '()=>{}\n(foo)',
    '()=>{}\n`x`',
    'async => {}\n++foo',
    'x({async foo(){}, bar(){}});',
    '(async((a), ...b))',
    '(async(a, ...b))',
    '(async(a, ...[b] = xxx))',
    '(async(a, ...([b] = xxx)))',
    'async () => {} \n  /x/',
    'async () => {} \n  /x/',
    'async()=>{} \n [x]',
    'async()=>{} \n {x}',
    '()=>{} \n [x]',
    '()=>{} \n {x}',
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
