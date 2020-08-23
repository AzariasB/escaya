import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Function', () => {
  // Invalid cases
  for (const arg of [
    '(function(){',
    '[,',
    '[] += a',
    '(function ([...{ x }, y]) {})',
    '(function ([...[x], y]) {})',
    '(function ([...x = []]) {})',
    '(function (...x = []) {})',
    '(function ([...[x], y] = [1, 2, 3]) {})',
    '(function ([...{ x }, y] = [1, 2, 3]) {})',
    '(function ([a, ...b = 20,,]) { })',
    '(function ([a, ...b,]) { })',
    '(function f(x, ...x) {g(x); x = 42; g(x)})',
    '(function ([a, ...b,,]) { })',
    '(function break(){})',
    '(function function(){})',
    'function f(1, async = 1){}',
    'function f("abc", async = 1){}',
    'function f(1, async = b){}',
    '(async function await(){})'
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
    '(function([[,] = function* g() {}]) {})',
    '(function([cover = (function () {}), xCover = (0, function() {})]) {})',
    '(function([fn = function () {}, xFn = function x() {}]) {})',
    '(function([x = 23]) {})',
    '(function([...[x, y, z]]) {})',
    '(function({x, ...y}) {})',
    '(function([...[,]]) {})',
    '(function([...x]) {})',
    '(function([...{ length }]) {})',
    '(function([x = 23] = [undefined]) {})',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    '(function(obj) {}({a: 1, b: 2, ...null}));',
    'function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {}',
    `(function foo(y, z) {{ function x() {} } })(1);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {} } })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {}} })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
    // Rest parameter shouldn't be shadowed
    `(function foo(...x) { var x; {  function x() {}  } })(1);`,
    // Don't shadow complex rest parameter
    //`(function foo(...[x]) { var x; { function x() {} } })(1);`,
    // Hoisting is not affected by other simple parameters
    `(function foo(y, z) {{function x() {}} })(1);`,
    // Hoisting is not affected by other complex parameters
    ` (function foo([y] = [], z) {{function x() {} } })();`,
    // Should allow shadowing function names
    `{(function foo() { { function foo() { return 0; } } })();}`,
    `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
    '(function y(...x) { {  function x() {} } })(1);',
    '(function f([,] = x){})',
    '(function f([,,]){})',
    `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
    `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
    `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
    '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
    '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
    '(function foo(x) { {  function x() {} } })(1);',
    '(function({x}, {y} = {}, {z}, {v} = {}, ...a) {})',
    '(function({x}, {}, {z} = {}, ...a) {})',
    '(function({x}, {y} = {}, ...a) {})',
    '(function({x}, {y} = {}) {})',
    '(function({x}, {y} = {}, {z}, ...a) {})',
    '(function(x, {y}, {z} = {}) {})',
    '(function([...[x, y, z]]) {})',
    '(function([...[,]]) {})',
    '(function([...{ length }]) {})',
    'foo(function(){})',
    '(function f(...rest){})',
    'f( ({...c}=o, c) )',
    'function f({foo}){}',
    'function f({foo:a}){}',
    'function f({foo:a=b}){}',
    'function f({foo}, bar){}',
    'function f(foo, {bar}){}',
    'function f({foo} = x, b){}',
    'function f({foo} = x, b = y){}',
    'function f(x, {foo} = y){}',
    'function f(x = y, {foo} = z){}',
    'function f({foo=a} = x){}',
    'function f([]){}',
    'function f([] = x){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([,,]){}',
    'function f([,,] = x){}',
    '(function f(a, b, ...rest){})',
    '(function([x = 23] = [undefined]) {})',
    'function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {}',
    'function a6({a3, b2: { ba1, ...ba2 } }) {}',
    'function a7({a1 = 1, ...b1} = {}) {}',
    '(function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {})',
    '(function a6({a3, b2: { ba1, ...ba2 } }) {})',
    '(function a7({a1 = 1, ...b1} = {}) {})',
    '(function a8([{...a1}]) {})',
    '(function a9([{a1, ...a2}]) {})',
    '(function a10([a1, {...a2}]) {})',
    '(function b2(a, ...b) {})',
    '(function([[,] = function* g() {}]) {})',
    '(function call(foo=await){})',
    'function *f(){  foo(await)  }',
    '(function([cover = (function () {}), xCover = (0, function() {})]) {})',
    '(function foo([[x]]) { { function x() {}}})([[1]]);',
    'function f(x) {g(x)}',
    'function f(x) {function h() { g(x) }; h()}',
    'function f(x) {function h() { g(x) }; return h}',
    'function f(x=1) {g(x)}',
    'function f(x, xuments) {g(x); xuments[0] = 42; g(x)}',
    'function f(x, ...xuments) {g(x); xuments[0] = 42; g(x)}',
    'function f(x, xuments=[]) {g(x); xuments[0] = 42; g(x)}',
    'function f(...x) {g(x); xuments[0] = 42; g(x)}',
    'function f(x) {g(x); g(function() {xuments[0] = 42}); g(x)}',
    'function f(x) {g(x); x = 42; g(x)}',
    'function f(x=1) {g(x); x = 42; g(x)}',
    'function f(x, {a=(g(x), x=42)}) {g(x)}',
    'function f(x) {g(x); g(function() {x = 42}); g(x)}',
    'function f(x) {g(x); g(() => x = 42); g(x)}',
    'function f(x) {g(x); xuments[0] = 42; g(x)}',
    'foo(function* f(){})',
    '(function (x = yield) {})',
    'foo(async function f(){})',
    '(function f(...rest){})',
    '(function f(a, b, ...rest){})',
    'typeof async function f(){}',
    // // Don't shadow nested complex parameter
    '(function y([[x]]) {{function x() {}}})([[1]]);',
    // Don't shadow rest parameter
    '(function y(...x) {{ function x() {}}})(1);',
    // Don't shadow complex rest parameter
    '(function y(...[x]) {{function x() {}}})(1);',
    // Don't shadow complex parameter
    '(function y(x = 0) { var x; {function x() {}}})(1);',
    // Don't shadow nested complex parameter
    '(function y([[x]]) { var x; { function x() {} }})([[1]]);',
    // Don't shadow rest parameter
    '(function y(...x) { var x; {function x() {}}})(1);',
    // Don't shadow complex rest parameter
    '(function y(...[x]) {var x;{ function x() {} }})(1);',
    // Hoisting is not affected by other simple parameters
    '(function y(y, z) {{function x() {}}})(1);',
    // Hoisting is not affected by other complex parameters
    '(function y([y] = [], z) {{function x() {}}})();',
    // Hoisting is not affected by rest parameters
    '(function y(y, ...z) {{function x() {} }})();',
    // Hoisting is not affected by complex rest parameters
    '(function y(y, ...[z]) {{function x() {}}})();',
    // No hoisting within a function scope
    `(function() {
      { function* bar() {} }
    })();`,
    // Lexical shadowing allowed, no hoisting
    `(function() {
      function* x() { yield 1; }
      { function* x() { yield 2 } }
    })();`,
    // No hoisting within a function scope
    `(function() {
      { async function bar() {} }
    })();`,
    // Lexical shadowing allowed, no hoisting
    `(function() {
      var y;
      async function x() { y = 1; }
      { async function x() { y = 2; } }
      x();
    })();`,
    '(function(x, {y} = {}, {z}) {})',
    '(function({x}, {y} = {}, {z}, ...a) {})',
    '(function(x, {y} = {}, {z}, {v} = {}) {})',
    '(function({x}, {y} = {}, {z}, {v} = {}, ...a) {})',
    '(function() { var { x : {} } = { x : val }; })',
    '(function() { "use strict"; let {} = val; })',
    '(function({ x = y = 1 }) {}({}));',
    '(function({ x: x = y = 1 }) {}({}));',
    '(function([ x = y = 1 ]) {}([]));',
    '(function() { ((s = 17, y = s) => s)() })();',
    'function f1() { let y = 10; return x1 + y }',
    'a.foo = (function () { return function () {}; })();',
    'function f() { x = 27; }',
    'x = function f([x],){}',
    'x = function f({a},){}',
    'x = function f([x] = y,){}',
    'x = function f({a} = b,){}',
    'x = function f(a=b){}',
    'x = function f(a=b=c){}',
    'x = function f([] = x){}',
    'x = function f([,]){}',
    'x = function f([,] = x){}',
    'x = function f([foo]){}',
    'x = function f([foo,,bar] = x){}',
    'x = function f([foo], [bar]){}',
    'x = function f([foo] = x, [bar] = y){}',
    'x = function f([foo], b){}',
    'x = function f([foo] = x, b){}',
    'x = function f([foo], b = y){}',
    'x = function f([foo=a,bar=b] = x){}',
    'x = function f([...[a, b]] = obj){}',
    'x = function f([...[a, b]]){}',
    '(function foo([x = 1] = [2]) {})',
    '(function foo({x1:[y1 = 1]}) {})',
    '(function foo([x1, {y1:y1 = 1}]) {})',
    '(function foo({x1:[y1 = 1] = [2]} = {x1:[3]}) {})',
    '(function foo([{y1:y1 = 1} = {y1:2}] = [{y1:3}]) {})',
    '(function *fn( x1, {x2, x3}, [x4, x5], x6  ) {})',
    '(function *fn({x:x}, y  ) {})',
    'function *f(){   s = {foo: yield /x/}   }',
    'function *f(){   s = {foo: yield /x/g}   }',
    'function f(x) {((xs) => {xuments[0] = 42})(xuments); }',
    'function f(x) {g(x); g(() => xuments[0] = 42); g(x)}',
    'function f({x:x = 1}) {}',
    'function f({x:x = 1}, {y:b=(x=2)}) {}',
    'function f(x) {g(x)}',
    'function f({x:x = (x = 2)}) {}',
    '(function (x) { function y() { return null; } x.y = z; })(x || (x = {}));',
    '(function () { function C() {} C.prototype.foo = function () { }; return C; }());',
    '(function fn({a = 1, ...b} = {}) {   return {a, b}; })',
    `function iceFapper(idiot) {}`,
    '(function([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) {})',
    '(function([cover = (function () {}), xCover = (0, function() {})]) {})',
    '{{{ function g() {} }}}',
    `(function x() {
      function* y() {
        do {
          yield 23;
          yield 42;
        } while(false)
        return 999;
      }
      var gen = y();
    })();`,
    '(function f({foo=a,bar} = x){})',
    '(function f({foo:a=b, bar:c=d} = x){})',
    '(function f({} = x){})',
    '(function f([...bar] = obj){})',
    '(function f([foo=a]){})',
    '(function f([foo], b = y){})',
    '(function f([foo,,]){})',
    '(function f([foo=a,bar=b] = x){})',
    '(function f([foo] = x, b = y){})',
    '(function () {})',
    '(function (a,b) {})',
    '(function (a = b) {})',
    '(function (x, y, z) {})',
    '(function({} = null) {})',
    '(function *fn( {x1:x1}, [y1]  ) {})',
    '(async function([,]) {})',
    '(async function({x:x}) {})'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
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
