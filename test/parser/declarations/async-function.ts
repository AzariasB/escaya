import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Async Function', () => {
  // Invalid cases
  for (const arg of [
    'async function * f(',
    'async function f(x = await y){}',
    'async function *f(x = await y){}',
    'async function f(await){}',
    'async function *f(await){}',
    'async function f(){   function g(x = typeof await x) {}  }',
    'async function f(){   function h({x: typeof await x}) {}   }'
    // 'async(a = (a0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789abcdefghijklmnopqrstuvwzi = await) => { DO_NOT_INCLUDE_ME}) => {};',
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true, loc: true });
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
    'async function f(){    function g(x=(await)=y){}   }',
    'async function f(){ var f }',
    'async function f(){ let f }',
    'x=async function f(){ let f }',
    'async function *f(){ var f }',
    'async function x(a) { await 1; }',
    'async function x(a, b = 2) { await 1; }',
    'async function x(a, b, ...c) { await 1; }',
    'async function f(){ new await x; }',
    'async function f(){ [new await foo] }',
    'async function f(){ (new await foo) }',
    'async function f(){ let f = 1 }',
    `async function f() { let y = await x * x }`,
    `async function f() {} var f;`,
    'async function wrap() {\n({a = await b} = obj)\n}',
    'async function wrap() {\n(a = await b)\n}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = async () => await b) {}',
    'async function foo(a = async function foo() { await b }) {}',
    'async function foo() { await + 1 }',
    'async function f() { for await ([a] of []); }',
    'async function f() { for await ([a = 1] of []); }',
    "async function f() { 'use strict'; for await ({a} of []); }",
    'async function * f() { for await ({a: a} of []); }',
    'async function * f() { for await ({0: a} of []); }',
    'async function * f() { for await ({0: a = 1} of []); }',
    'async function x({x}) { var y = x; var x = 2; return y; }',
    'async function x({x}) { { var y = x; var x = 2; } return y; }',
    'async function x({x}, g = () => x) { { var x = 2; } return g(); }',
    'async function x({x}) { var g = () => x; var x = 2; return g(); }',
    'async function x({x}) { { var g = () => x; var x = 2; } return g(); }',
    'async function x({x}, g = () => eval("x")) { var x = 2; return g(); }',
    'async function x(y, g = () => y) { var y = 2; return g(); }',
    'async function x({x}, y) { var z = y; var y = 2; return z; }',
    'async function x({x}, y, [z], v) { var x, y, z; return x*y*z*v }',
    'async function x({x}) { function x() { return 2 }; return x(); }',
    'async function x(x = (y = 1)) { z = 1; await undefined; w = 1; };',
    'async function x(a, b, c) { await a; }',
    'async function a({x}) { var x = 2; return x }',
    'async function a() { await 4; } var await = 5',
    'async function a() { function b() { return await; } }',
    'async function a() { var k = { async: 4 } }',
    'async function a() { await 4; }',
    'async function a() { var t = !await 1 }',
    'async function a() { var t = ~await 1; }',
    'async function a() { var t = !(await 1); }',
    'async function a() { var t = ~(await 1);  }',
    'async function a() { var t = typeof (await 1); }',
    'async function a() { var t = typeof typeof await 1;  }',
    'async function a() { var t = void void await 1;  }',
    'async function a() { await 2 + 3; }',
    '"use strict"; async function a() { var t = +(await 1); }',
    '"use strict"; async function a() { var t = void (await 1); }',
    '"use strict"; async function a() { var t = !void void await 1; }',
    '"use strict"; async function a() { var t = +(await 1); }',
    '"use strict"; async function a() { var t = +(await 1); }',
    'async function foo({x}) { { var x = 2; } return x; }',
    'async function foo(a = x) { var x = 2; return a; }',
    'async function foo(a = x) { function x() {}; return a; }',
    'async function foo(a = eval("x")) { var x; return a; }',
    'async function foo(a = function() { return x }) { var x; return a(); }',
    'async function foo(a = () => x) { var x; return a(); }',
    'async function foo(a = () => eval("x")) { var x; return a(); }',
    'async function foo(x, y = () => x) { return x + y(); }',
    'async function foo(x = {a: 1, m() { return 2 }}) { return x.a + x.m(); }',
    'async function foo(x = () => 1) { return x() }',
    'async function async(x, y) { return x - y; }',
    'async function async() { return 12; }',
    'async function foo(a, b = () => a, c = b) { function b() { return a; } var a = 2; return [b, c]; }',
    'async function foo(a = x) { let x = 2; return a; }',
    'async function foo(a = () => eval("x")) { var x; return a(); }',
    'async function foo(x = (y = 1)) { z = 1; await undefined; w = 1; };',
    'async function f() { let a = function(a = await) {}; }',
    'async function f(a = async function() { await 1; }) {}',
    'async function foo(y = eval("var x = 2")) { with ({}) { return x; } }',
    'async function foo(y = eval("var x = 2"), z = x) { return z; }',
    'async function foo(y = eval("var x = 2"), z = eval("x")) { return z; }',
    'async function foo(z = eval("var y = 2")) { return y; }',
    'async function foo(f = () => x) { eval("var x = 2"); return f() }',
    'async function foo() { return await bar() + await z(); }',
    'async function foo(a, b) { await a + await b }',
    'async function foo(a) { return a ? await bar() : await z(); }',
    'async function af(x) { var x = 0; with (obj) { x = await af(); } return x; }',
    `async function f(x = async function(){await x}){}`,
    `async function f(x = async () => await x){}`,
    `async function f(){ async(await x); }`,
    `function f() { async function yield() {} }`,
    'async (a = async () => { await 1; }) => {}',
    `async function yield() {}`,
    `function f() { ({ async yield() {} }); }`,
    `function* g() { ({ async yield() {} }); }`,
    'async function* a() { yield; (r = a) => {} }',
    'async function* x(a, b, ...c) { await 1; }',
    'async function* x(a, b = 2) { await 1; }',
    'async function* x(a) { yield 1; }',
    'async function* x(a, b = 2) { yield 1; }',
    'async function* x(a, b, ...c) { yield 1; }',
    'async function x() { let x = await 1; eval("var i = 5"); let y = await 2; debugger; }',
    'new (async function*() {})',
    '(async function*() {}).caller',
    '(async function*() {}).arguments',
    'async function fib(n) { return (n == 0 || n == 1) ? n : await fib(n - 1) + await fib(n - 2); }',
    'var hardcoreFib = async function fib2(n) { return (n == 0 || n == 1) ? n : await fib2(n - 1) + await fib2(n - 2); }',
    '() => class extends (async function() {}) {}',
    'async function f() {   class x { foo(x=new (await)()){} }   }',
    'async function f() {   class x extends await y { }   }',
    `async function yield() {}`,
    'async function x () { a = { a: await(a) } }',
    'async function* a(){}',
    'async function f() {   class x { await(){} }   }',
    'async function f() {   class x { foo(x=await){} }   }',
    'async function fn() { const x = await import([a]); }',
    'async function fn() { const x = await import([]); }',
    'async function fn() { const x = await import(() => {}); }',
    'async function fn() { const x = await import(await a); }',
    'async function fn() { const x = await getpromise(); }',
    'async function fn() { const x = await import(a()()); }',
    'async function fn() { const x = await import(a()[0]); }',
    'async function fn() { const x = await import(a().x); }',
    'async function fn() { const x = await import(b()); }',
    'async function fn() { const x = await import((((((("./foo"))))))); }',
    'async function fn() { const x = await import(x += a); }',
    'async function fn() { const x = await import(x = a); }',
    'async function fn() { const x = await import(delete void typeof +-~! 0 && b); }',
    'async function fn() { const x = await import(false || b); }',
    'async function fn() { const x = await import({}); }',
    'async function fn() { const x = await import({}); }',
    'async function fn() { (await x)[a] += y; }',
    'async function fn() { x[await a] += y; }',
    'async function fn() { (await x).a += await y; }',
    'async function fn() { (await x)[a] += await y; }',
    'async function fn() { x[await a] += await y; }',
    'async function fn() { (await x) ** y; }',
    'async function fn() { return (await x), y; }',
    'async function fn() { return x, await y; }',
    'async function fn() { x.a.b = await y; }',
    'async function fn() {  x[z] = await y; }',
    'async function fn() {x[z].b = await y; }',
    'async function fn() { const x = await import({}); }',
    'async function fn() { x.a[z] = await y;; }',
    'async function fn() { (await x) && y; }',
    'async function fn() { x && await y; }',
    'async function fn() {  x = await y; }',
    'async function fn() { x + await y; }',
    'async function fn() {(await x) + y; }',
    'async function fn() {(await x).a = y; }',
    'async function fn() {  (await x.a).b = y; }',
    'async function fn() { (await x)[z] = y; }',
    'async function fn() { x[await z].b = y;}',
    'async function fn() { (await x[z]).b = y; }',
    'async function * fn() { return import(yield 42); }',
    'async function f() { let\narguments }',
    'async function f() { let\ninterface }',
    'async function f() { let\npackage }',
    'async function f() { for await (x[a in b] of y); }',
    'async function a() { await a.b[c](d).e; }',
    'await.b[c](d).e;',
    'async function * fn() { import(yield * ["Mr. X", "Mr. Y", "Mr. Z"]); }',
    'async function* f(a = async function*() { await 1; }) {}',
    'async function * foo() { yield ()=>{}; }',
    'async function af1(a) { await a; return await foo.call({ x : 100 }); /** comment**/ }',
    `async function f6({x}, g = () => x) { { var x = 2; } return g(); }`,
    'async function f2(d, e, f) { let x = await f1(d + 10, e + 20, f + 30); return x; }',
    `async function f10({x}, y) { var y; return y }`,
    `async function f13({x}, y, [z], v) { var x, y, z; return x*y*z*v }`,
    `async function f20({x}) { function x() { return 2 }; return x(); }`,
    `async function f6(x = {a: 1, m() { return 2 }}) { return x.a + x.m(); }`,
    `"use strict"; async function foo() { function bar() { await = 1; } bar(); }`,
    `async function f() { for await ("foo".x of y) {} }`,
    `async function f(){ for await (function(){ }[foo] of x); }`,
    `async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {  }`,
    `async function fn() { (await x)[a] += y; }`,
    `async function fn() { (await x) ** y; }`,
    `async function fn() { x.a.b = await y; }`,
    `async function fn() {x[z].b = await y; }`,
    `async function fn() { const x = await import({}); }`,
    `async function fn() { x.a[z] = await y;; }`,
    'async function f(){} { async function f(){} }',
    `async function fn() {(await x).a = y; }`,
    `async function fn() {  (await x.a).b = y; }`,
    `await.b[c](d).e;`,
    `async function* f([[] = function() {}()]) { }`,
    `async function* f([[x]]) {  }`,
    `async function af(a, b, a) { }`,
    `async function await() { }`,
    `async function as(){ let f = async function f(yield) {} }`,
    `async function* f([arrow = () => {}]) {  }`,
    `async function* f([fn = function () {}, xFn = function x() {}]) {  }`,
    `async function* f([{ x }]) {  }`,
    `async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}`,
    `async function* f({ x: y = 33 } = { }) {}`,
    `async function f1(a = x, x) { return a }`,
    `async function f4(a = () => x, x) { return a() }`,
    `async function f2({x}) { { var x = 2; } return x; }`,
    'async function *gen() { yield [...yield]; }',
    `function g() { async function f() {} var f;   }`,
    `async function foo(a = async () => await b) {}`,
    `async function foo(a = {async bar() { await b }}) {}`,
    `async function foo(a = {async bar() { await b }}) {}`,
    'async function f(){   (fail = class extends (await x) {}) => {}   }',
    `async function foo(a = class {async bar() { await b }}) {}`,
    'async function f(){   (fail = new x(await x)) => {}   }',
    `async function foo(a, b) { await a }`,
    'async function f(){ var f = 1 }',
    `async function foo() {}`,
    `async function foo(a = {async bar() { await b }}) {}`,
    'function *f(){ const f = 1 }',
    'async function * f(){}',
    'async function * f(){}',
    `async function *gen() {
      yield {
          ...yield,
          y: 1,
          ...yield yield,
        };
    }`,
    `async function *gen() {
      yield [...yield];
    }`,
    `async function *gen() {
      yield [...yield yield];
    }`,
    `"use strict"; async function * fn() {
      for await ([ {} = yield ] of [iterable]) {
      }
    }`,
    `async function f() {
      let x = await y;
            const a = (b) => {};
    }`,
    `async function f() {
      (((x = await y)));
            const a = (b) => {};
    }`,
    `async function f() {
      let x = await y;
            async (b) => {};
    }`,
    `async function f() {
      (((x = await y)));
            async (b) => {};
    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
