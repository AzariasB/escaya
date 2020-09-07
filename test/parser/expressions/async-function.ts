import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async function', () => {
  // Invalid cases
  for (const arg of [
    'async function g() {   s = {"foo": await = x} = x   }',
    'async function g() {   s = {"foo": await a = x} = x   },',
    'async function g() {   s = {"foo": await /brains/ = x} = x   }',
    `(async function () { var await; })`,
    '(async function () { void await; });',
    '(async function () { await: ; });',
    '(async function foo (foo) { super() })',
    '(async function foo (foo = super()) { var bar; });',
    '(async function(...a,) {})',
    '(async function() { } () => 1)',
    '(async function() { } foo5 => 1)',
    '(async function foo4() { } => 1)',
    '(async function foo3() { } () => 1)',
    '(async function foo1() { } foo2 => 1)'
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
    '(async function() { var a; for await ({ a = class b { } } of [{}]) { } })();',
    `(async function() { for await (let { a = class b { } } of [{}]) { } })();`,
    `(function f() { async function yield() {} })`,
    `f(async function(x) { await x })`,
    '(async function(x = 1) {})',
    '(async function(x = 1, ...a) {})',
    '(async function a() { await 0; })',
    '(async function(x, y = 1, z, v = 2, ...a) {})',
    '(async function(x, y = 1, z, v = 2) {})',
    '(async function(x, y = 1, z) {})',
    '(async function(x, y = 1, ...a) {})',
    '(async function a(){}(0))',
    '(async function() { (await y); })',
    '(async function* (){})',
    `(function* g() { (async function yield() {}); })`,
    `(function f() { ({ async [yield]() {} }); })`,
    '(function f() { ({ async yield() {} }); })',
    `x = async function(a) { await a }`,
    '({ async [yield]() {} });',
    'f(async function(x) { await x })',
    `(async function foo(a, b = 39,) {})`,
    `(async function(){})`,
    `(async function foo(a, b = 39,) { })`,
    `(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})`,
    `(async function * () { for await (x of xs); })`,
    `(async function * () { await a; yield b; })`,
    `(async function foo(a,) {})`,
    `(async function foo(_ = (function() {}())) { })`,
    `(async function foo() { }.prototype)`,
    `var gen = async function *() { yield { ...yield, y: 1, ...yield yield, }; };`,
    `(function f() { async function yield() {} })`,
    `(function f() { ({ async yield() {} }); })`,
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a, b) { await a }',
    '(async function foo() { }.prototype)',
    '(async function foo(x, y = x, z = y) { })',
    '(async function foo(x = y, y) { })',
    '(async function foo(a, b = 39,) { })',
    '(async function foo(a, b,) { })',
    '(async function foo(_ = (function() {}())) { })',
    'x = async function f(){ let f = 1 }',
    'x = async function f(){ var f = 1 }',
    'x = async function *f(){ var f = 1 }',
    'x = async function *f(){ const f = 1 }',
    'x = function *f(){ let f = 1 }',
    '(async function foo(x = x) { })',
    '(async function foo(a, b = 39,) {})',
    '(async function(){})',
    '(async function f(){ await \n x; })',
    '(function f() { async function yield() {} })',
    '({ async [yield]() {} });',
    'async function foo(a = async () => await b) {}',
    '(function(x) { async function inner() { await x } })'
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
