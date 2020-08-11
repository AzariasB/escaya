import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Function', () => {
  // Invalid cases
  for (const arg of [
    'while (true) function f(){}',
    'function x(,,,,,,,,,,,,,a) {}',
    'if (x) function f(){}',
    'if (x) ; else function f(){}'
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
    'function f(...rest){}',
    'function f(a, b, ...rest){}',
    'foo(function(){})',
    'foo(function*(){})',
    'foo(function f(){})',
    'function f([a, [b], c]) {}',
    'function* g() {   [...{ x = yield }] = y   }',
    'function fk({x: [a, {b: []}]}) {}',
    'function f([foo] = x, b = y){}',
    'function i(package,package){}',
    'function f([foo], b){}',
    'function f([foo] = x, b){}',
    'function f([foo], b = y){}',
    'function f([foo], [bar]){}',
    'function addRange(to, from, start, end) {}',
    'function f([foo=a,bar=b]){}',
    'async function f(yield) {}',
    'function f([foo] = x, [bar] = y){}',
    'function f([foo,,bar] = x){}',
    'function f(){ foo: bar: function f(){} }',
    'function f(){ let f; }',
    'function f() {let f}',
    'function* a( [ {  x  =  y  }  =  a ] )  { }',
    'function a( a = b  ) {} n => {  "use strict"; }',
    'function f() {var f}',
    'function a([ { a = x }, {} = b]) {}',
    'function f(){} function f(){}',
    'function g() {  function f(){} function f(){} }',
    'function f(x) { { const x = y } }',
    // 'function f(){ foo = new.target }',
    'function f(arg=1) {g(arg); arg = 42; g(arg)}',
    "function f(arg) {'use strict'; g(arg); arg = 42; g(arg)}",
    'function f(arg, {a=(g(arg), arg=42)}) {g(arg)}',
    'function f(arg) {g(arg); g(function() {arg = 42}); g(arg)}',
    'function fn2([a, b,]) {}',
    'function fn2([,,]) {}',
    'function fn([]) {}',
    'function fn2([,,,,,,,...args]) {}',
    'function fn1([...args]) {}',
    'function fn3([x, {y}, ...z]) {}',
    'function fn4([,x, {y}, , ...z]) {}',
    'function fn5({x: [...y]}) {}',
    'function fnc({x: {}}) {}',
    'function fnd({x: {y}}) {}',
    'function fne({x: {} = 42}) {}',
    'function fnf({x: {y} = 42}) {}',
    'function fna({x: y}) {}',
    'function fn2({a: {p: q, }, }) {}',
    'function f(x = y, [foo] = z){}',
    'function f(x = y, [foo]){}',
    'function f([foo=a]){}',
    `function f(x = x) {}`,
    `function f([x] = []) {}`,
    `function f([{ x }] = [null]) {}`,
    `function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
    `function test(t, t) { }`,
    `function arguments() { }`,
    `function a() { function a() {} function a() {} }`,
    'function f(arg, ...arguments) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg, arguments=[]) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(...arg) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg) {g(arg); g(function() {arguments[0] = 42}); g(arg)}',
    'function f(arg, x=1) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg=1) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg) {g(arg); arg = 42; g(arg)}',
    'function f(arg=1) {g(arg); arg = 42; g(arg)}',
    'function f(arg) {g(arg); g(() => arg = 42); g(arg)}',
    'function f(arg) {g(arg); h(arguments); g(arg)}',
    'function f(arg) {g(arg); g(() => arguments[0] = 42); g(arg)}',
    'function f() { ++(yield); }',
    'function f(a, a) {}',
    'function foo () {"use strict";}',
    'function f() {} function f() {}',
    'function a() { function a() {} function a() {} }',
    'function arguments() { }',
    'function arguments() { function foo() { "use strict"; } }',
    'function arguments(eval) { function foo() { "use strict"; } }',
    'function arguments(eval) { function foo() { "use strict"; } function eval() {} }',
    'function arguments() { eval = arguments; function foo() { "use strict"; } }',
    'function arguments(eval) { eval = arguments; function foo() { "use strict"; } }',
    'function arguments(eval) { eval = arguments; function foo() { "use strict"; } "use strict"; }',
    'function arguments(eval) { function foo() { "use strict"; } eval = arguments;  }',
    `function a() {
      return 'hello \
          world';
    }`,
    'function *f() { (yield x ** y) }',
    `function foo(package) {}`,
    `function compareArray(a, b) {
      if (b.length !== a.length) {
          return;
      }
      for (var i = 0; i < a.length; i++) {
          b[0];
      }
  }`,
    `function shouldThrow(func, errorMessage) {
    var errorThrown = false;
    var error = null;
    try {
        func();
    } catch (e) {
        errorThrown = true;
        error = e;
    }
   }`,
    'function f(arg=1) {}',
    'function f( [a=[...b], ...c] = obj){}',
    'function f(a=b){}',
    'function f(a=b=c){}',
    'function f(a = b,){}',
    'function f(a,b,){}',
    'function f(){foo}',
    'function f(){foo;bar}',
    'function *f(await) {}',
    'function f(await) {}',
    'function f(yield) {}',
    'function f() { class x extends await { }   }',
    'function f() { class await { }   }',
    'function *f(){ class x { [yield y](){} }  }',
    'function *f(){ class x { [yield](){} }  }',
    'function *f(){ class x { yield(){} }  }',
    'function f() { throw `${delete(y)}`; }',
    'function x([...args]) {}',
    'function x([,,,,,,,...args]) {}',
    'function x([x, {y}, ...z]) {}',
    'function x([,x, {y}, , ...z]) {}',
    'function x({x: [...y]}) {}',
    'function fn1([a, b = 42]) {}',
    'function x([a = 42, b,]) {}',
    'function x([a,, b = a, c = 42]) {}',
    'function x([{}]) {}',
    'function x([{} = 42]) {}',
    'function x([a, {b: c}]) {}',
    'function x([a, {b: []}]) {}',
    'function x([,,]) {}',
    'function x([,]) {}',
    'function x(x, {a: r, b: s, c: t}, y) {}',
    'function x({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}',
    'function x({x: {y: {z: {} = 42}}}) {}',
    'function x({x = 42}) {}',
    'function x({x, y}) {}',
    'function x({x}) {}',
    'function x({x, y = 42}) {}',
    'function x([a, b]) {}',
    'function x([a, b,]) {}',
    'function x([a,, b,]) {}',
    'function f([a = await]) {}',
    'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
    'function f([...[]] = function*() {}) {}',
    'function f({ x, } = { x: 23 }) {}',
    'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}',
    'function f({ x, }) {}',
    `function *f(){  foo(await)  }`,
    `function *f(){  (await) => x  }`,
    'function f(){ return ++a; }',
    '-function(val){  return val }',
    'function f(arg) {g(arg)}',
    'function *f(){  foo(await)  }',
    'function f({a: b = await}) {}',
    '"use strict"; function* await() {}',
    `function await(yield) {}`,
    'function f({a = await}) {}',
    'function f({await}) {}',
    'function f(a = await) {}',
    `function *f(await){}`,
    'function *f(){   x = `1 ${ yield x } 2`   }',
    'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
    'function *f(){   x = `1 ${ yield } 2`   }',
    'function *f(){   x = `1 ${ yield } 2 ${ 3 } 4`   }',
    'function f(...await) {}',
    'function f(arg) {function h() { g(arg) }; h()}',
    'function f(arg) {function h() { g(arg) }; return h}',
    'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
    `function
    x
    (
    )
    {
    }
    ;`,
    `function                                                    y                                   (                                          )                                              {};
    y();
    `,
    `function
    z
    (
    )
    {
    }
    ;
    `,
    'function f([foo,bar] = x){}',
    'function f([foo=a,bar] = x){}',
    'function f([,,]){}',
    'function f([,,] = x){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([]){}',
    'function f([] = x){}',
    'function *f(){}',
    'async function f(){}',
    'async function *f(){}',
    'function f(x = y, [foo] = z){}',
    'function f(x = y, [foo]){}',
    'function f(x, [foo]){}',
    'function f(x, [foo] = y){}',
    'function f([foo=a]){}',
    'function f([foo=a] = c){}',
    'function f([a=b+=c]){}',
    'function f([a=b=c]){}',
    'function f([a = b = c] = arr){}',
    'function f([,,foo]){}',
    'function f([,,foo] = x){}',
    'function f([foo,,]){}',
    'function f([foo,,] = x){}',
    'function f([foo]){}',
    'function f([foo] = x){}',
    'function f([,foo]){}',
    'function f([foo,] = x){}',
    'function f({b: []}) {}',
    'function f([{b}]) {}',
    'function f() {} function f() {}',
    'function f() {function f() {}}',
    'function f([a, {b: []}]) {}',
    'function f({...a}){}',
    'function f([x, ...[a, b]] = obj){}',
    'function f([foo, ...bar]){}',
    'function f([foo, ...bar] = obj){}',
    'function f([...[a, b]]){}',
    'function f([...[a, b]] = obj){}',
    'function f( [a=[...b], ...c]){}',
    'function f([...bar]){}',
    'function f([...bar] = obj){}',
    'function f([foo] = x, b = y){}',
    'function f(x, [foo]){}',
    'function f([foo=a,bar=b] = x){}',
    'function f([...bar] = obj){}',
    'function f([foo, ...bar] = obj){}',
    'function f({foo} = x, b){}',
    'function f({foo} = x, b = y){}',
    'function f(x, {foo} = y){}',
    'function f(x = y, {foo} = z){}',
    'function f({foo=a} = x){}',
    'function f({foo=a,bar} = x){}',
    'function f({foo,bar=b} = x){}',
    'function f({foo=a,bar=b} = x){}',
    'function f({foo:a} = x){}',
    'function f({foo:a,bar} = x){}',
    'function f({foo:a,bar:b} = x){}',
    'function f(x, {foo} = y){}',
    'function f(x = y, {foo} = z){}',
    'function f({foo=a} = x){}',
    'function f({foo=a,bar} = x){}',
    'function f({foo,bar=b} = x){}',
    'function f({foo=a,bar=b} = x){}',
    'function f({foo:a} = x){}',
    'function f({foo:a,bar} = x){}',
    'function f({foo,bar:b} = x){}',
    'function f({foo:a,bar:b} = x){}',
    'function g({a}, {b} = {b: 2}) { return [a, b] }',
    'function h({a}, {b} = {b: 2}, c) { return [a, b, c] }',
    'function i({a}, {b}, c, ...rest) { return [a, b, c, rest] }',
    'function f({a}, {b}, {c = ""}) { return [a, b, c] }',
    'function z() {}; `z`;',
    'function z() {}; `${z}`;',
    'function z() {}; `${z}${z}`;',
    'function z() {}; `${z}${z}${z}`;',
    "function z() {}; `${'z'}${z}${z}`;",
    "function z() {}; `${'z'}${'z'}${z}`;",
    "function z() {}; `${'z'}${'z'}${async}`;",
    "function z() {}; '' + z + '';",
    'function z() {}; z`${`${z}`}`;',
    'function z() {}; z``;',
    'function z() {}; ``;',
    'function f({foo:a,bar:b} = x){}',
    'function f({foo:a=b} = x){}',
    'function f({foo:a=b, bar:c=d} = x){}',
    'function f({foo}){}',
    'function f({foo=a}){}',
    'function f({foo:a}){}',
    'function f({foo:a=b}){}',
    'function f({foo}, bar){}',
    'function f(foo, {bar}){}',
    'function *f(await){}',
    '(function *f(await){})',
    'function f(await){}',
    'function await(){}',
    'function call(foo=await){}',
    'function f([]){}',
    'function f([] = x){}',
    'function f([foo,]){}',
    'function f([foo,] = x){}',
    'function f([foo,,] = x){}',
    'function f([,foo]){}',
    'function f([,foo] = x){}',
    'function f([foo,bar]){}',
    'function f([foo,bar] = x){}',
    'function f([foo,,bar]){}',
    'function f() {   class x { foo(x=new (await)()){} }   }',
    "function f(arg) {g(arg); g(function() {eval('arg = 42')}); g(arg)}",
    'function f(arg) {g(arg); g(() => arg = 42); g(arg)}',
    "function f(arg) {g(arg); g(() => eval('arg = 42')); g(arg)}",
    "function f(...arg) {g(arg); eval('arg = 42'); g(arg)}",
    'function f(arg) {}',
    'function fn2([,,,,,,,...args]) {}',
    'function fn1([...args]) {}',
    'function fn3([x, {y}, ...z]) {}',
    'function fn4([,x, {y}, , ...z]) {}',
    `function foo () {"use strict";}`,
    `function __decl(){return 1;}`,
    `function __func__2(){b};`,
    `function x(...{ a }){}`,
    `function santa() { function package() {} function evdal() { "use strict"; }}`,
    `function foo(bar, eval) { function bar() { "use strict"; } }`,
    '(function(){})',
    '"use strict"; (function(){}).hasOwnProperty("x");',
    'function __func(){ delete arguments; return arguments; }',
    'function hello() { say_hi_to_ariya(); }',
    'function arguments() { }',
    'function hello(a, b) { sayHi(); }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { var await = 10; var o = { await }; }',
    'function f() { class C { await() { } } }',
    'function f() { class C { *await() { } } }',
    'function f() { var fe = function await() { } }',
    'function f([...x]) {}',
    'function f([x = 23] = []) {}',
    `function j(...a) {}
    function k() {}
    var l = function () {};
    var m = function (a = 1, b, c) {};
    function* o() {
      yield 42;
    }
    function* p() {
      yield 42;
      yield 7;
      return "answer";
    }
    let q = function* () {};
    let r = a => a;
    let s = (a, b) => a + b;
    let t = (a, b = 0) => a + b;
    let u = (a, b) => {};
    let v = () => {};
    let w = () => ({});
    let x = () => {
      let a = 42;
      return a;
    };
    let y = () => ({
      a: 1,
      b: 2
    });`,
    'function f() { var fe = function await() { } }',
    'function f() { function await() { } }',
    'function f() { const await = 10; }',
    'function f(a = async function (x) { await x; }) { a(); } f();',
    'function f() {var async = 1; return async;}',
    'function f() {let async = 1; return async;}',
    'function f() {const async = 1; return async;}',
    'function f() {function async() {} return async();}',
    'function f() {var async = async => async; return async();}',
    'function *f(){   s = {foo: yield /x/}   }',
    'function *f(){   s = {foo: yield /x/g}   }',
    'function *f(){   s = {foo: yield}   }',
    'function f() {function foo() { var await = 1; return await; }}',
    'function f() {function foo(await) { return await; }}',
    'function f() {function* foo() { var await = 1; return await; }}',
    'function f() {function* foo(await) { return await; }}',
    'function f() {var f = () => { var await = 1; return await; }}',
    "'use strict'; var O = { method() { var asyncFn = async function*() {}} }",
    "'use strict'; var f = () => {async function* f() {}}",
    "'use strict'; var f = () => {var O = { async *method() {} };}",
    'var hi = function arguments() { };',
    'function f(x) {var x}',
    'function f(x) {{var x}}',
    'function foo() {}',
    'function f(){}\n/foo/',
    'function f(){}\n/foo/g',
    'typeof function f(){}\n/foo/g',
    'function f([foo=a,bar]){}',
    'function ref(a,) {}',
    'function eval() { }',
    'function interface() { }',
    'function yield() { }',
    'function f(arg, x=1) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg, ...x) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg=1) {g(arg); arguments[0] = 42; g(arg)}',
    "function f(arg) {'use strict'; g(arg); arguments[0] = 42; g(arg)}",
    'function f(arg) {g(arg); f.arguments[0] = 42; g(arg)}',
    'function f(arg, args=arguments) {g(arg); args[0] = 42; g(arg)}',
    'function f(arg) {g(arg); arg = 42; g(arg)}',
    "function f(arg) {g(arg); eval('arg = 42'); g(arg)}",
    'function f(arg) {g(arg); var arg = 42; g(arg)}',
    'function f(arg, x=1) {g(arg); arg = 42; g(arg)}',
    'function f(arg, ...x) {g(arg); arg = 42; g(arg)}'
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
