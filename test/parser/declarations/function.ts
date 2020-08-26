import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Function', () => {
  // Invalid cases
  for (const arg of [
    'function f({x,x}){}',
    'while (true) function f(){}',
    'function x(,,,,,,,,,,,,,a) {}',
    'function *g() {   s = {"foo": yield a = x} = x   }',
    'function test({...{}}) {}',
    'function test({...{a}}) {}',
    'function x() { "use strict"; 00; }',
    //'function x() { 00; "use strict"; }',
    'function f(...(x)){}',
    'function f(...rest.foo){}',
    'function f(...rest + x){}',
    'function f(a, ...rest, b){}',
    'function f(...rest = x){}',
    'function f(...rest, b){}',
    'function f(x = await y){}',
    'function f(x) { const x = y }',
    'function foo() { return(); }',
    'function foo(...b, a) { return a }',
    'function foo(b, a, a,,) { return a }',
    'function f(b, a, b, a, [fine]) {}',
    'function f(b, a, b, ...a) {}',
    'const f = 1; function f() {}',
    'function x() {	let a = { s = 5 };}',
    'function g(){ const f = 1; function f() {} }',
    // 'function f(b, a, b, a) {"use strict"}',
    // 'function f(b, a, a) {"use strict"}',
    // 'function f(b, a, b, a) {"use strict"}',
    // 'function f(b, a, b, a, [fine]) {"use strict"}',
    // 'function f(b, a, b, ...a) {"use strict"}',
    // 'function g(){ { function f() {} let f = 1; } }',
    // 'function g(){ { function f() {} const f = 1; } }',
    'function f() { for (var [x, y] = {} in {}); }',
    'function f() { for ("unassignable" in {}); }',
    'function f(b, a, b, a, [fine]) {"use strict"}',
    'function f(){  for (var x;;); const x = 1  }',
    'function f() { { { var x; } let x; } }',
    'function f() { { { var x; } let x; } }',
    'function f() { { var x; let x; } }',
    'function f() { { var x; let x; } }',
    '(function (e) { var e; const e = undefined; });',
    'function foo([x], [x]) {}',
    'function x(x = class x {}) { const x = y; }',
    '(function() { "use strict"; { const f = 1; var f; } })',
    'function x() {}const y = 4, x = 5;',
    'function x() {}const y = 4, x = 5;',
    'function f(x) { let x }',
    'function x() {}const x = function() {};',
    'function foo() {try {} catch([x]) { function x() {} } }',
    'function foo() {try {} catch([x]) { let x = 10;} }',
    'function foo() {try {} catch([x]) { var x = 10;} }',
    //'function foo({x:{z:[z1]}}, z1) {}',
    'function foo([x]) { let x = 10;}',
    'function foo([x], [x]) {}',
    '(function() { "use strict"; { const f = 1; var f; } })',
    'function foo([x, x]) {}',
    'function x(x = class x {}) { const x = y; }',
    'async function af(x) { let x; }',
    'function foo({x:x, x:x}) {}',
    'function f([a, a]) {}',
    'function f([{foo}] = x, {foo}){}',
    'function f([{foo}] = x, [{foo}]){}',
    'function f([b, a, a]) {}',
    'function f(){ var x; const x = y; }',
    'function f(){ let x; function x(){} }',
    'function f(){ function x(){} let x; }',
    'function foo(...a,) { }',
    'function f(){ const x = y; function x(){} }',
    'function f(){ function x(){} const x = y; }',
    'function a() { const x = 1; var x = 2; }',
    'function* f(a) { let a; }',
    'function* f([a]){ let a; }',
    'function* f({a}){ let a; }',
    'function *f(){   s = {foo: yield / x}   }',
    //'function l(){((/)/))(/]/)};',
    'function f(){  for (var x;;); const x = 1  }',
    'function f(,,){}',
    'function *f(yield) {}',
    'function d(a){let a;}',
    'function d(){new.',
    'function f([a = await b]) {}',
    'function f({a: b = await c}) {}',
    'function f({a = await b}) {}',
    'function f(a = await b) {}',
    //'function f(x = package = 10) { "use strict"; }',
    //'function f(){ "use strict"; with (x) y; }',
    'let f = function *f(yield) {}',
    'function test({...x = 1}) {}',
    'function f() { class x extends await y { }   }',
    'function f() { class x extends foo(await y) { }   }',
    'function f() { class x { foo(await y){} }   }',
    // 'function *f(){ class x { foo(x=new (yield)()){} }  }',
    // 'function *f(){ class x extends yield y { }  }',
    // 'function f(){ class x { foo(x=new (yield)()){} }  }',
    'function f(){ class x extends foo(yield y) { }  }',
    //'function f(){ class x extends foo(yield) { }  }',
    'function f(){ class yield { }  }',
    // 'function f(){ class x extends yield { }  }',
    'function f(){ class x extends yield y { }  }',
    // 'function f(){ class x extends foo(yield) { }  }',
    // 'function f(){ class x { [yield](){} }  }',
    'function f({...[a, b]}){}',
    'function f({...a.b}){}',
    'function f({...{a: b}}){}',
    'function f([...[a, b],,] = obj){}',
    'function f([...foo, bar] = obj){}',
    'function f([...foo, bar]){}',
    'function f([...foo, bar] = obj){}',
    'function f([...[a, b],]){}',
    'function f([...foo,,]){}',
    'function f([...foo,,] = obj){}',
    'function f([...bar = foo]){}',
    'function f([...bar = foo] = obj){}',
    'function f([...foo,] = obj){}',
    'function f([x=x()=x]){}',
    'function *f(){   for (yield in y);   }',
    'function f([x=x()=x]){},({x:{1:y()=x},x:{7:3}})>x',
    'function *f(x = (class) = f) {}',
    'function *f(x = (finally) = f) {}',
    'function* f() {((yield[this] = y));}',
    'function f([.x]){}',
    'function f([b, a], {b}) {}',
    // 'function f([b, a], b) {}',
    // 'function f([b, a], b=x) {}',
    'function f([b, a, a]) {}',
    'function f([b, a, b, a]) {}',
    //     'function f(a, a, b) {"use strict"}',
    // 'function f(b, a, a) {"use strict"}',
    "function fn() { 'use strict'; return ...[1,2,3];} fn();",
    'function fn() { var ...x = [1,2,3]; } fn();',
    "function fn() { 'use strict'; var ...x = [1,2,3];} fn();",
    'function fn() { var [...x,] = [1,2,3]; } fn();',
    "function fn() { 'use strict'; var [...x, y] = [1,2,3];} fn();",
    'function fn() { var [...x, y] = [1,2,3]; } fn();',
    "function fn() { 'use strict'; var { x } = {x: ...[1,2,3]}} fn();",
    'function fn() { var { x } = {x: ...[1,2,3]} } fn();',
    'let f = async function *await() {}',
    'function f(,){}',
    'function f(...a = x,){}',
    'function f([...bar = foo]){}',
    'function f([...bar = foo] = obj){}',
    'function foo() { return(); }',
    // 'function foo() {"use strict"; try {} catch([eval]) {} }',
    'function fn() { var [...x,] = [1,2,3];} fn();',
    'function foo() {try {} catch({x:abc+1}) {} }',
    'function f([...foo,] = obj){}',
    'function f([...[a, b],]){}',
    'function f([...foo,,]){}',
    'function f([...foo,,] = obj){}',
    'function f([...bar = foo]){}',
    'function f([...bar = foo] = obj){}',
    'function f([...foo,] = obj){}',
    //   'function f(){ var f = 123; if (true) function f(){} }',
    `function f(){
      var f = 123;
      if (true) async function f(){}
    }`,
    `function g(){
      var f = 123;
      oops: async function f(){}
    }`
    /* `function g(){
      var f = 123;
      oops: function f(){}
    }`*/
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

  for (const arg of [
    // 'function f(){ var f = 123; if (true) function f(){} }',
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
    'function f(...[a]) {}',
    'function f(...{a}) {}',
    'function f(a = 1) {}',
    'function f([a, [b], c]) {}',
    'function* g() {   [...{ x = yield }] = y   }',
    'function x({ a = "", b = 0, c = false }) {}',
    'function f14([a = 1, [b = "hello", { x, y: c = false }]]) {}',
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
    'function *f(x = await){}',
    'function f([foo] = x, [bar] = y){}',
    'function f([foo,,bar] = x){}',
    'function f(){ foo: bar: function f(){} }',
    'function eval() { function inner() { "use strict" } }',
    'function f(){ let f; }',
    'function f() {let f}',
    'function* a( [ {  x  =  y  }  =  a ] )  { }',
    'function a( a = b  ) {} n => {  "use strict"; }',
    'function f() {var f}',
    'function a([ { a = x }, {} = b]) {}',
    'function f(){} function f(){}',
    'function g() {  function f(){} function f(){} }',
    'function f(x) { { const x = y } }',
    'function f(){ foo = new.target }',
    'function f(arg=1) {g(arg); arg = 42; g(arg)}',
    "function f(arg) {'use strict'; g(arg); arg = 42; g(arg)}",
    'function f(arg, {a=(g(arg), arg=42)}) {g(arg)}',
    'function f(arg) {g(arg); g(function() {arg = 42}); g(arg)}',
    'function f(){ new.target = foo }',
    'function f(){ new.target-- }',
    'function f(){ foo + new.target }',
    'function f(f=new.target){}',
    'function fn2([a, b,]) {}',
    'function fn2([,,]) {}',
    'function fn([]) {}',
    'function fn2([,,,,,,,...args]) {}',
    'function fn1([...args]) {}',
    'function fn3([x, {y}, ...z]) {}',
    'function fn4([,x, {y}, , ...z]) {}',
    'function fn5({x: [...y]}) {}',
    `function x() {if (x) return / /; else ;}`,
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
    'function f(){ function g(){} }',
    `function f([x] = []) {}`,
    `function f([{ x }] = [null]) {}`,
    `function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
    `function test(t, t) { }`,
    `function arguments() { }`,
    'function foo(arguments) { }',
    'function foo(bar, eval) { }',
    'function foo(bar, arguments) { }',
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
    'function foo({x:x}, {y:y}, {z:z}) {}',
    'function f(arg) {g(arg); g(() => arguments[0] = 42); g(arg)}',
    'function f() { ++(yield); }',
    'function f(a, a) {}',
    'function foo () {"use strict";}',
    'function f() {} function f() {}',
    'function a() { function a() {} function a() {} }',
    'function arguments() { }',
    'function *f(await){}',
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
    `async\nfunction foo() { }`,
    'function *f(){  foo(await)  }',
    'function f({a: b = await}) {}',
    '"use strict"; function* await() {}',
    'function f([x]){}',
    `function await(yield) {}`,
    'function f({a = await}) {}',
    'function f({await}) {}',
    'function f(a = await) {}',
    `function *f(await){}`,
    'function *f(x = delete ((arguments) = f)) {}',
    `function f(){ "use strict"
    /* suffix = */ [foo]; eval = 1; }`,
    'function fn4([[x, y, ...z]]) {}',
    'function *f(){   x = `1 ${ yield x } 2`   }',
    'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
    'function *f(){   x = `1 ${ yield } 2`   }',
    'function *f(){   x = `1 ${ yield } 2 ${ 3 } 4`   }',
    'function f(...await) {}',
    `function fooInline(a, b, c, ...rest) { arguments; this; return [a, b, c, ...rest]; }`,
    `function singleRest(...[d]) { return d; }`,
    `function objRest(...{'0': a, '1': b, length}) { return [a, b, length]; }`,
    `function spread() { return { ...p }; }`,
    `function z(x = {a: 1, m() { return 2 }}) { return x.a + x.m(); }`,
    `function g({x = {a:10,b:20}}, {y = [1,2,3], n = [], p = /abc/}) {}`,
    `"use strict"; function a() {} function a() {}`,
    `function x(){""[new.target]}`,
    `function f(){ let: foo; }`,
    `function fk({x: [a, {b: []}]}) {}`,
    `function f(x) {var x}`,
    `function f() {var f}`,
    `function f() {{var f}}`,
    `function *f() {
      let
      interface
    }`,
    `function f() {   class x { foo(x=new (await)()){} }   }`,
    `function f() { var await; }`,
    `function f() { function* await() { } }`,
    `function f() { var fe = function await() { } }`,
    `function f() { var o = { get await() { } } }`,
    `function f() { var o = { await() { } } }`,
    `function f() { var o = { *await() { } } }`,
    `function f() { var await = 10; var o = { await }; }`,
    `function f() { class C { *await() { } } }`,
    `function f(){ "use strict"; foo; } with (x) y;`,
    `function* f4({x}) { { var y = x; var x = 2; } return y; }`,
    `function f(){\n'foo';\n}`,
    'function f(){\n"foo"\n}',
    'function f(x, y){"use strict";}',
    'function x() { "use asm"; "use strict"; foo }',
    'function a() { "use strict" } "use strict"; foo;',
    'function f(){ "Esprima uses directives"; "use strict";}',
    'function f(){ 123; "use strict";}',
    'function f(){"use strict";}',
    '+function f(){"use strict";}',
    `function* f8({x}) { { var g = () => x; var x = 2; } return g(); }`,
    `function* f21({x}) { { function x() { return 2 } } return x; }`,
    `function* f12(y, g = () => y) { var y = 2; return g(); }`,
    'function f(arg) {function h() { g(arg) }; h()}',
    'function f(arg) {function h() { g(arg) }; return h}',
    `function f( [a=[...b], ...c]){}`,
    `function f( [a=[...b], ...c] = obj){}`,
    `function *f(){ return { ...(yield) } }`,
    `function foo(package) {}`,
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
    `function f7(value) {
      switch (value) {
      case 0: return "0";
      case -0: return "-0";
      case 1: case 2: case 3: case 4:  // Dummy fillers.
      }
      switch (value) {
      case 0x3fffffff: return "MaxSmi";
      case 0x3ffffffe:
      case 0x3ffffffd:
      case 0x3ffffffc:
      case 0x3ffffffb:
      case 0x3ffffffa:  // Dummy fillers
      }
      switch (value) {
      case -0x40000000: return "MinSmi";
      case -0x3fffffff:
      case -0x3ffffffe:
      case -0x3ffffffd:
      case -0x3ffffffc:
      case -0x3ffffffb:  // Dummy fillers
      }
      switch (value) {
      case 10: return "A";
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:  // Dummy fillers
      }
      return "default";
    }`,
    'function f() {} function f() {}',
    'function f() {function f() {}}',
    'function f([a, {b: []}]) {}',
    'function f(x) { arguments; return x() + x(); }',
    'function Regular() { this[0] >>=  0; this[1] ^=  1; }',
    'function foo() { return (0 > ("10"||10) - 1); }',
    'function f({...a}){}',
    'function f([x, ...[a, b]] = obj){}',
    'function boom(o) { o.g = h }',
    'function f([foo, ...bar]){}',
    'function f([foo, ...bar] = obj){}',
    'function f([...[a, b]]){}',
    'function f([...[a, b]] = obj){}',
    'function f( [a=[...b], ...c]){}',
    'function f([...bar]){}',
    `function f(a,b,c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var x = 0;
      x = y[a & 1](z[b & 1](c) | 0) | 0;
      return x | 0;
    }`,
    `function g(a) {
      a = a | 0;
      return (a + 23) | 0;
    }`,
    `function h(a) {
      a = a | 0;
      return (a + 42) | 0;
    }`,
    'function f([...bar] = obj){}',
    'function f([foo] = x, b = y){}',
    'function f(x, [foo]){}',
    'function foo() { return a.reduce(bar); }',
    'function foo() { return -"0" }',
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
    'function f(x) { var x; }',
    'function f(x) { function x() {} }',
    'function f([f]) { }',
    'function f(f) { }',
    'function f(x) { { const x = y } }',
    'function f(x) { { let x } }',
    'function f(x) { { var x } }',
    'function f(x) { var x }',
    'function f(){ function x(){} var x = y; }',
    'function f(){ var x = y; function x(){} }',
    'function f(a, ...b) {}',
    'function emptyWithObject(...[{}]) {}',
    'function emptyWithRest(...[...[]]) {}',
    'function empty(...[]) {}',
    'function multiElementWithArray(...[[a], b, [c]]) {}',
    'function multiElementWithInitializer(...[a = 0, b, c = 1]) {}',
    'function multiElementWithLeading(x, y, ...[a, b, c]) {}',
    'function multiElementWithObject(...[{p: q}, {r}, {s = 0}]) {}',
    'function multiElementWithRest(...[a, b, ...c]) {}',
    'function multiElement(...[a, b, c]) {}',
    'function singleElementWithArray(...[[a]]) {}',
    'function singleElementWithInitializer(...[a = 0]) {}',
    'function singleElementWithLeading(x, ...[a]) {}',
    'function singleElementWithObject(...[{p: q}]) {}',
    'function singleElementWithRest(...[...a]) {}',
    'function singleElement(...[a]) {}',
    'function emptyWithArray(...{p: []}) {}',
    'function f(){ let f }',
    'function f(){ var f }',
    'function g() {  function f(){} function f(){} }',
    'function f([foo,bar]){}',
    'function f([foo,bar] = x){}',
    'function f([foo,,bar]){}',
    'function foo(yield) { }',
    'function foo(bar, yield) { }',
    'function yield() { }',
    'function foo(bar, let) { }',
    'function foo(let) { }',
    'function let(let) { let: let(let + let(0)); }',
    'function f(x) {{let x}}',
    'function f() { for (new.target in {}); }',
    'function f() { new.target++ }',
    'function f() {var f}',
    'function f(x) {{var x}}',
    'function f(x) {var x}',
    'function f() {{let f}}',
    'function f() {} ; function f() {}',
    'function * gen() { function x() { try { } catch (yield) { } } }',
    'function * gen() { function x() { (function yield() { }) } }',
    'function * gen() { function x() { yield = 1; } }',
    'function * gen() { function x() { function yield(yield) { yield: yield (yield + yield(0)); } } }',
    'function * gen() { function x() { ({ get yield() { 1 } }) } }',
    'function * gen() { function x() {var foo, yield;} }',
    'function x() { yield * 2; }',
    'function x() { ++yield; }',
    'function x() { ({ yield: 1 }) }',
    'function x() { ({ get yield() { 1 } }) }',
    'function f() {   class x { foo(x=new (await)()){} }   }',
    "function f(arg) {g(arg); g(function() {eval('arg = 42')}); g(arg)}",
    `function test() { "use strict" + 42; }`,
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
    'function *f(){ return [...yield x]; }',
    'function *f(){ return [...yield]; }',
    'function f([...x]) {}',
    'function g(){ var f = 1; function f() {} }',
    `function f(async = await){}`,
    `function f([async = await]){}`,
    'function f(one) { class x { } { class x { } function g() { one; x; } g() } } f()',
    'function g() { var x = 1; { let x = 2; function g() { x; } g(); } }',
    'function f([x = 23] = []) {}',
    `function __f_4(one) {
      var __v_10 = one + 1;
      {
        let __v_10 = one + 3;
        function __f_6() {
     one;
     __v_10;
        }
        __f_6();
      }
    }`,
    `(function () {
      let q;
      let w;
      let e;
      if (true) [q, w, e] = [1, 2, 3].map(()=>123);
    })();`,
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
    'function f({__proto__: a, __proto__: b}) {}',
    'function f(a, [b, [c, {__proto__: d, __proto__: e}]], f) {}',
    'function* f() { yield* yield; }',
    'function* f() { yield* yield y; }',
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
    'function f(x=(await)=y){}',
    'function f(a, a, b) {}',
    'function f(a, b, a) {}',
    'function f(b, a, b, a) {}',
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
    'function f4({a = x}) { const x = 2; return a; }',
    'function f7({a = function() { return x }}) { var x; return a(); }',
    'function f20({[y]: x}) { var y = "b"; return x; }',
    'function f21({[eval("y")]: x}) { var y = "b"; return x; }',
    'function f1({a = x}, x) { return a }',
    'function f5({a = () => x}, x) { return a() }',
    'function f11({a = b}, {b}) { return a }',
    'function f30({x = a}, ...a) { return x[0] }',
    'var f = 1; function f() {}',
    "function fn() { 'use strict';} fn(...([1, 2, 3]));",
    "function fn() { 'use strict';} fn(...Array(...[1,2,3,4]));",
    "function fn() { 'use strict';} fn(0, 1, ...[2, 3, 4], 5, 6, 7, ...'89', 10);",
    "function fn() { 'use strict';} fn(...NaN);",
    'function fn() {} fn(...([1, 2, 3]));',
    'function fn() {} fn(...Array(...[1,2,3,4]));',
    "function fn() {} fn(...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9);",
    "function fn() {} fn(...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9, ...[10]);",
    'function f5(x, ...a) { arguments[0] = 0; return x }',
    'function f8(x, ...a) { a = []; return arguments[1] }',
    'function f7({a: x}) { x = 2; return arguments[0].a }',
    'function f35({x = () => a}, ...a) { return x()[0] }',
    'function f34({x = function() { return a }}, ...a) { return x()[0] }',
    'function f3({x}) { var y = x; var x = 2; return y; }',
    'function f7({x}) { var g = () => x; var x = 2; return g(); }',
    'function f8({x}) { { var g = () => x; var x = 2; } return g(); }',
    'function f13({x}, y, [z], v) { var x, y, z; return x*y*z*v }',
    'function ref(a,) {}',
    'function eval() { }',
    'function interface() { }',
    'function f2({c, d}, {a, b}) { return c - d + a - b; }',
    'function f3([{a, b}]) { return a - b; }',
    'function yield() { }',
    'function f(x) { { const x = y } }',
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
