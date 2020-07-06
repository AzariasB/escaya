import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Await', () => {
  // Invalid cases
  for (const arg of [
    'class x {async f(foo = await){}}',
    'async function f(foo = await){}',
    'let x = async function f(foo = await){}',
    'class x {async *f(foo = await){}}',
    'async function *f(foo = await){}',
    'let x = async function *f(foo = await){}',
    'let o = {async *f(foo = await){}}',
    'let o = {async f(foo = await){}}',
    // 'class x {*f(foo = await){}}',
    'class x {async f(foo = await){}}',
    'async function f(foo = await){}',
    'let x = async function f(foo = await){}',
    '{ (x = [await x]) }',
    //'let x = async function f(await){}',
    //'let o = {async *f(await){}}',
    'class x {async *f(foo = await){}}',
    'async function *f(foo = await){}',
    'let x = async function *f(foo = await){}',
    'let o = {async *f(foo = await){}}',
    'let o = {async f(foo = await){}}',
    '(y) = (1) = x',
    '(1) = x',
    '({a:(a,y) = 0} = 1)',
    'x in [2=y]',
    '[(a = 0)] = 1',
    '1 = x',
    'x, {a: 1} = [];',
    '(catch = "sentinal 453543")',
    '([x] = await bar) => {}',
    'async (foo = await bar) => {}',
    'a[await p];',
    'await a[0];',
    'await a;',
    'await call();',
    //'function call(foo=await bar){}',
    //'class x {f(await){}}',
    'let f = () => (y=await foo) => y;',
    'async f() { x = { async await(){} } }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
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
    `async function caught_reject() {
      try {
        await reject;
      } catch (e) {
        assertEquals("b", e);
      }
    }`,
    `async r => result = [...{ x = await x }] = y;`,
    `result = [...{ x = await }] = y;`,
    `{ (x = [await]) }`,
    `let y = async x => { await x; }`,
    `async ([a = await])`,
    `async ({await})`,
    `async ({a: b = await})`,
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
    'class x {*f(await){}}',
    'async(await)',
    'function *f(){  (await) => x  }',
    'function *f(){  foo(await)  }',
    'function *f(foo = await){}',
    'let x = function *f(foo = await){}',
    'let o = {*f(foo = await){}}',
    'class x {f(foo = await){}}',
    'class x {*f(foo = await){}}',
    'async function await(){}',
    'function *await(){}',
    'async function f(){ new (await foo) }',
    'async function f(){ await \n x; }',
    'async function f(){ await foo\n/foo/g }',
    '(await())',
    'async(await);',
    'await => async.await[async / (async => foo)]',
    'await => async.await[async / (async => foo.bar)]',
    'await => async.await[async / ((async) => foo.bar)]',
    'await => async.await[async / (async = async(async, await, bar))]',
    'class X { await(){} }',
    'f(x, await(y, z))',
    'class X { static await(){} }',
    'x = await(y);',
    'class X { await() {} }',
    'let async = await;',
    'x = { await: false }',
    'class test{ async method (param){ await foo();  }  method2(){}  }',
    'async function test() { await foo(); }',
    'var a = async function test() { await foo(); }',
    'var test = async a => await test();',
    '({ async* f(a, b, ...c) { await 1; } })',
    '({ async* f(a, b = 2) { await 1; } })',
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
    'async function asyncFn() { await 1; }',
    'var O = { async method() { await 1; } }',
    "var O = { async ['meth' + 'od']() { await 1; } }",
    "var O = { async 'method'() { await 1; } }",
    'function f() { var await; }',
    'function f() { class await { } }',
    'function f() { var o = { await: 10 } }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { class C { *await() { } } }',
    'var O = { async 0() { await 1; } }',
    'async function await() {}',
    'var asyncFn = async({ foo = 1 }) => foo;',
    'var asyncFn = async({ foo = 1 } = {}) => foo;',
    'function* g() { var f = async(yield); }',
    'function* g() { var f = async(x = yield); }',
    'function foo() { var await = 1; return await; }',
    'function foo(await) { return await; }',
    'y = async x => await x',
    'o = (await) => x',
    'function f() { var await; }',
    'function call(foo=await){}',
    'function call(await){}',
    `async function f() {
        let { [await "a"]: a } = { a: 1 };
        return a;
      }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Double wrapped group in the middle', () => {
    t.deepEqual(parseScript('x = ((y)) = z'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'y'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('Assign with dud group', () => {
    t.deepEqual(parseScript('a = ((b)) = c;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'c'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });
});
