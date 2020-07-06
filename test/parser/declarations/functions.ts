import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Declarations - Function', () => {
  // Invalid cases
  for (const arg of [
    'function f(...(x)){}',
    'function f(...rest.foo){}',
    'function f(...rest + x){}',
    'function f(a, ...rest, b){}',
    'function f(...rest = x){}',
    'function f(...rest, b){}',
    'function f(,,){}',
    'function *f(yield) {}',
    'let f = async function f(await) {}',
    //'function f(x = package = 10) { "use strict"; }',
    'let f = function *f(yield) {}',
    'function test({...x = 1}) {}',
    'function f() { class x extends await y { }   }',
    'function f() { class x extends foo(await y) { }   }',
    // 'function f() { class x { foo(await y){} }   }',
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
    'function f([.x]){}',
    'let f = async function *await() {}',
    'function f(,){}',
    'function f(...a = x,){}',
    'function f([...bar = foo]){}',
    'function f([...bar = foo] = obj){}',
    'function f([...foo,] = obj){}',
    'function f([...[a, b],]){}',
    'function f([...foo,,]){}',
    'function f([...foo,,] = obj){}',
    'function f([...bar = foo]){}',
    'function f([...bar = foo] = obj){}',
    'function f([...foo,] = obj){}'
    //'for (a in b) function f(){} ',
    //'while (true) function f(){}',
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'function f(...rest){}',
    'function f(a, b, ...rest){}',
    'foo(function(){})',
    'foo(function*(){})',
    'foo(function f(){})',
    'function f([a, [b], c]) {}',
    'function fk({x: [a, {b: []}]}) {}',
    'function f([foo] = x, b = y){}',
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
    'function f(){ foo = new.target }',
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
    'function f(arg, ...x) {g(arg); arg = 42; g(arg)}',
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
    'function f() {function foo() { var await = 1; return await; }}',
    'function f() {function foo(await) { return await; }}',
    'function f() {function* foo() { var await = 1; return await; }}',
    'function f() {function* foo(await) { return await; }}',
    'function f() {var f = () => { var await = 1; return await; }}',
    "'use strict'; var O = { method() { var asyncFn = async function*() {}} }",
    "'use strict'; var f = () => {async function* f() {}}",
    "'use strict'; var f = () => {var O = { async *method() {} };}",
    'var hi = function arguments() { };',
    'function f(a, a) { function f(a, a) {} }',
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
    `function __func__3(){1};`,
    `function __func__4(){1+c};`,
    `function __func__5(){inc(d)};`,
    `function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
    `function test(t, t) { }`,
    `function arguments() { }`,
    `function a() { function a() {} function a() {} }`,
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
    'function f() { class x extends await { }   }',
    'function f() { class await { }   }',
    'function *f(){ class x { [yield y](){} }  }',
    'function *f(){ class x { [yield](){} }  }',
    'function *f(){ class x { yield(){} }  }',
    'function f() { throw `${delete(y)}`; }',
    'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
    'function f([...[]] = function*() {}) {}',
    'function f({ x, } = { x: 23 }) {}',
    'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}',
    'function f({ x, }) {}',
    'function f(arg) {g(arg)}',
    'function f(arg) {function h() { g(arg) }; h()}',
    'function f(arg) {function h() { g(arg) }; return h}',
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
    'let f = function f(await) {}',
    'function f(yield) {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Array in object', () => {
    t.deepEqual(parseScript('function fk({x: [a, {b: []}]}) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'fk'
          },
          params: {
            type: 'FormalParameters',
            leafs: [
              {
                type: 'BindingElement',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingProperty',
                      key: {
                        type: 'BindingIdentifier',
                        name: 'x'
                      },
                      value: {
                        type: 'ArrayBindingPattern',
                        leafs: [
                          {
                            type: 'BindingIdentifier',
                            name: 'a'
                          },
                          {
                            type: 'ObjectBindingPattern',
                            properties: [
                              {
                                type: 'BindingProperty',
                                key: {
                                  type: 'BindingIdentifier',
                                  name: 'b'
                                },
                                value: {
                                  type: 'ArrayBindingPattern',
                                  leafs: []
                                },
                                computed: false
                              }
                            ]
                          }
                        ]
                      },
                      computed: false
                    }
                  ]
                },
                initializer: null
              }
            ]
          },
          contents: {
            type: 'FunctionBody',
            statements: [],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });

  it('Double identifier in array sans default', () => {
    t.deepEqual(parseScript('function f([foo,bar=b]){}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f'
          },
          params: {
            type: 'FormalParameters',
            leafs: [
              {
                type: 'BindingElement',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'BindingIdentifier',
                        name: 'b'
                      }
                    }
                  ]
                },
                initializer: null
              }
            ]
          },
          contents: {
            type: 'FunctionBody',
            statements: [],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });
});
