import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Await', () => {
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
    'await +42',
    'function *f(foo = await){}',
    'class x {*f(foo = await){}}',
    'function *f(foo = await){}',
    'let x = function *f(foo = await){}',
    'let o = {*f(foo = await){}}',
    'class x {f(foo = await){}}',
    'function f(foo = await){}',
    'let x = function f(foo = await){}',
    'let o = {f(foo = await){}}',
    'function *f(foo = await){}',
    'let x = function *f(foo = await){}',
    'class x {*f(foo = await){}}',
    'let o = {*f(foo = await){}}',
    'class x {f(foo = await){}}',
    'function f(foo = await){}',
    'let x = function f(foo = await){}',
    'let o = {f(foo = await){}}',
    '({...await} = obj)',
    'result = [...{ x = await }] = y;',
    'let o = {*f(await){}}',
    'let o = {f(await){}}',
    `await
    / x`,
    `await
    / x / g`,
    'await/x',
    'x / await',
    'await / x',
    'a = (b, c)',
    'arguments = 42',
    'let o = {async *await(){}}',
    'let o = {async await(){}}',
    'await',
    'await()',
    'await[x]',
    'await = 16',
    'await - 25',
    'call(await())',
    'call(await[1])',
    'call(await.foo)',
    'function* foo() { var await = 1; return await; }',
    'var f = () => { var await = 1; return await; }',
    'var O = { method() { var await = 1; return await; } };',
    'var O = { method(await) { return await; } };',
    'var O = { *method() { var await = 1; return await; } };',
    'async function foo(a, b) { await a + await b };',
    'async function wrap() { (a = await b) };',
    'async function foo(a, b) { await a };',
    'var O = { *method(await) { return await; } };',
    `await => async.await[async = bar / (async + 1)]`,
    `await => async.await[async / (async => foo)]`,
    `await => async.await[async / (async => foo.bar)]`,
    `await => async.await[async / (async = async(async, await, bar))]`,
    `f(x, await(y, z))`,
    `x(async () => { await y.x('foo'); });`,
    `async r => result = [...{ x = await x }] = y;`,
    `result = [...{ x = await }] = y;`,
    `{ (x = [await]) }`,
    `let y = async x => { await x; }`,
    `async ([a = await])`,
    `async ({await})`,
    'class x {*f(await){}}',
    'async(await)',
    'function *f(){  (await) => x  }',
    'function *f(){  foo(await)  }',
    'function *f(foo = await){}',
    'let x = function *f(foo = await){}',
    'let o = {*f(foo = await){}}',
    'class x {f(foo = await){}}',
    'class x {*f(foo = await){}}',
    '({ async* f(a, b, ...c) { await 1; } })',
    '({ async* f(a, b = 2) { await 1; } })',
    'function *await(){}',
    'class x {f(foo = await){}}',
    'class x {*f(foo = await){}}',
    'async function await(){}',
    '({ async* f(a, b) { await 1; } })',
    '({ async* f(a) { await 1; } })',
    '({ async* f(a, b, ...c) { yield 1; } })',
    '({ async* f(a, b = 2) { yield 1; } })',
    '({ async* f(a, b) { yield 1; } })',
    '({ async* f(a) { yield 1; } })',
    '(x = class A {[await](){}; "x"(){}}) => {}',
    `await;`,
    'class await {}',
    `function await(yield) {}`,
    `await => async`,
    `await => async.await[foo]`,
    'var await = 1',
    'async(await)',
    '({ await: async })',
    'await => {}',
    'await => async',
    'await => async.await[foo]',
    'await => async.await[async = bar / (async + 1)]',
    'var asyncFn = async function() { await 1; };',
    'var asyncFn = async function withName() { await 1; };',
    'async function asyncFn() { await 1; }',
    'var O = { async method() { await 1; } }',
    'function f() { var await; }',
    'function f() { class await { } }',
    'function f() { var o = { await: 10 } }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { class C { *await() { } } }',
    'function* g() { var f = async(yield); }',
    'function* g() { var f = async(x = yield); }',
    'function foo() { var await = 1; return await; }',
    'function foo(await) { return await; }',
    `await`,
    `async ({a: b = await})`,
    `async (a = await)`,
    `async (await)`,
    'function f() { var await; }',
    'function f() { let await; }',
    'function f() { const await = 10; }',
    'function f() { function await() { } }',
    'function f() { function* await() { } }',
    'function f() { var fe = function await() { } }',
    'function f() { class await { } }',
    'function f() { var o = { await: 10 } }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { var await = 10; var o = { await }; }',
    'function f() { class C { await() { } } }',
    `i = async function i() {
      await j();
      await j();
      await j();
      await j();
      await j();
      await j();
      await j();
      await j();
      await j();
      return j();
    };`,
    '({ async* f(a) { yield 1; } })',
    '(x = class A {[await](){}; "x"(){}}) => {}',
    `await;`,
    'class await {}',
    `function await(yield) {}`,
    `await => async`,
    `await => async.await[foo]`,
    'var await = 1',
    'async(await)',
    '({ await: async })',
    'await => {}',
    'await => async',
    'await => async.await[foo]',
    'await => async.await[async = bar / (async + 1)]',
    'var asyncFn = async function() { await 1; };',
    'var asyncFn = async function withName() { await 1; };',
    "var asyncFn = async () => await 'test';",
    'async function await() {}',
    'f(x, await(y, z))',
    'class X { static await(){} }',
    'x = await(y);',
    'class X { await() {} }',
    'await \n / x',
    'await \n / x / g',
    'class test{ async method (param){ await foo();  }  method2(){}  }',
    'async function test() { await foo(); }',
    'var a = async function test() { await foo(); }',
    'var test = async a => await test();',
    'let async = await;',
    'x = { await: false }',
    'y = async x => await x',
    'o = (await) => x',
    '(await) => x',
    'call(await)',
    'function f() { var await; }',
    'function call(foo=await){}',
    'function call(await){}',
    `async function f() {
        let { [await "a"]: a } = { a: 1 };
        return a;
      }`,
    `async function caught_reject() {
      try {
        await reject;
      } catch (e) {
        assertEquals("b", e);
      }
    }`
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
