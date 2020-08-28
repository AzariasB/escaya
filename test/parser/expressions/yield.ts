import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Yield', () => {
  // Invalid cases
  for (const arg of [
    'function* fn() { (yield fn) => {}; } ',
    'function* fn() {  (a, b, yield) => {}; } ',
    'function* fn() {  yield => {}; }',
    'function* fn(x = yield* yield) {} ',
    //'(a=yield) {}',
    // 'function *f(){ ~yield }',
    '+function* yield() {}',
    //'function* fn() { (x = yield fn) => {}; }',
    //'function* fn() { (a, b = 3, x = yield) => {};}',
    // 'function* fn() {  (x = yield) => {}; }',
    // 'function yield() { "use strict"; }',
    '"use strict"; function yield() {}',
    'function* fn(x = yield) {} ',
    //'"use strict"; function fn(x = yield) {}',
    '(yield 3) {}',
    //'(yield = 1) {}',
    //'({yield} = x)',
    //'var obj = { *gf(b, a = yield) {} }',
    '(a = yield 3) {}',
    'function* gf() { (yield)++; }',
    'function *as(){ o = {async *f(yield) {}} }',
    //'var g = function*() { yield 3 + yield 4; };',
    'let gfe = function* yield() { }',
    //'function *gf({yield}){}',
    'function* fn() { function yield() {} }',
    '"use strict"; (function *g() { ( x = class { [(yield, 1)]() { }  ) => {} });',
    'function *gen(val = yield * g) {}',
    'function *gen(val = yield) {}',
    'function *f(yield){ }',
    //'function *f(){ ({x} = yield x) => {} }',
    'function *g(a, b, c, ...yield){}',
    '(function *(x, ...yield){})',
    //'async (a = yield b)',
    //'function *g() {  ({a: b = yield}) => x  }',
    'function *g() { let yield; }',
    `(function*() { function*(x = yield 3) {} })`,
    `o = {async *f(yield) {}}`,
    `async function as(){ async function f(x=yield 100) {} }`,
    `async function as(){ async function *f(x=yield 100) {} }`,
    'function *g() { try { } catch (yield) { }}',
    'function *g() { var {foo: yield} = {a: 42};}',
    'function *g() { var [yield 24] = [42];}',
    'function *g() { class C extends yield { }}',
    'function *f(yield){ }',
    'function *f(x=yield){ }',
    'function *f(){  x = {*foo(a=yield x){}}  }',
    'function *f(){  return function(x=yield y) {};  }',
    'function* fn(yield) {}',
    //'function fn(yield) { "use strict"; } ',
    'function *g() { function f(x = x + foo(a, yield y)) {}; }',
    'function* gf() { const yield = 10; }',
    'function *f(){  class x{*foo(a=yield x){}}  }',
    //'async (x = yield y)',
    'function *g() { ({a: yield 24} = {a: 42});}',
    'function *g() { [yield 24] = [42];}',
    // `async function as(){ class A {f(yield) {}} }`,
    // 'function*g() { for ({yield} in 0); }',
    //'function* gf() { 1 + yield; }',
    // 'function* gf() { 1 + yield 2; }',
    'function* gf() { var gfe = function* yield() { } }',
    'function* gf() { class yield { } }',
    'function* gf() {var a = yield in {};}',
    // 'function* f(){ 5 + yield x + y; }',
    //'function* gf() { var o = { yield }; }',
    'function f() { return yield 100; }',
    `({ *[yield iter]() {} })`,
    `function* f() { [yield* {a = 0}]; }`,
    `(function*() {  function*({x: y = yield 3}) {} })`,
    // `(function*({yield}) {})`,
    '(function*() { function(x = yield 3) {} })'
    // `function *a({yield = 0}){}`,
    // 'function* gf() { +yield; }',
    // 'function* gf() { +yield 2; }',
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
    '{ (x = [yield]) => z }',
    '{ (x = [yield]) }',
    '{ (x = {[yield]: 1}) => z }',
    '{ (x = {[yield]: 1}) }',
    '{ (x = x + yield) => x; }',
    '{ yield = {}; }',
    '{ yield => {}; }',
    '{ (x = x + yield); }',
    '{ (x = yield) => {}; }',
    '{ (x = yield); }',
    '({ *g1() {   [yield 1]  }})',
    '({ *g1() {   (yield 1)  }})',
    '({ *g1() {   return {x: yield 1}  }})',
    '({ *g1() {   (yield)  }})',
    'function *f(){  class x extends (yield y){}  }',
    'function *f(){  class x{[yield foo](a){}}  }',
    'function *f(){  class x extends yield y{}  }',
    'function *g(){ (x = [yield y]) }',
    'function *g(){ (x = {[yield y]: 1}) }',
    'function *g(){ (x = [yield]) }',
    'function *g() { (x = yield); }',
    '(x = x + yield);',
    `function* f(){ yield
    /foo/ }`,
    `yield
      /foo/g`,
    `yield
      /foo`,
    '({ *g1() {   [yield 1]  }})',
    '({ *g1() {   (yield 1)  }})',
    '({ *g1() {   return {x: yield 1}  }})',
    '({ *g1() {   (yield)  }})',
    '({ *g1() {   return {x: yield}  }})',
    'function *g(){ async (x = {[yield y]: 1}) }',
    'function *g(){ async (x = {[yield]: 1}) }',
    'function *g() { async (x = yield); }',
    'async (x = z = yield) => {}',
    'function *f(){ async (x = yield) }',
    'function *f(){ async (yield) }',
    'class A { *yield() {} }',
    'function *a(){yield class{}}',
    'function *a(){yield-1}',
    '(x = yield) => {}',
    'x = { *test () { yield *v } };',
    '(function () { yield* 10 })',
    'function fn(x = yield) {}',
    'function fn(x = yield* yield) {}',
    'function * x() {yield 3 + (yield 4);}',
    'function * x() {yield * 3 + (yield * 4);}',
    'function * x() {(yield * 3) + (yield * 4);}',
    'function * x() {yield 3; yield 4;}',
    'function * x() {yield * 3; yield * 4;}',
    'function * x() {(function (yield) { })}',
    'function * x() {(function yield() { })}',
    'function * x() {yield { yield: 12 }}',
    'function * x() {yield /* comment */ { yield: 12 }}',
    'function * x() {yield * \n { yield: 12 }}',
    'function * x() {yield /* comment */ * \n { yield: 12 }}',
    'function * x() {yield 1; return}',
    'function * x() {yield * 1; return}',
    'function * x() {yield 1; return 37}',
    'function * x() {yield * 1; return 37}',
    'function * x() {({ yield: 1 })}',
    'function * x() {({ get yield() { } })}',
    'function * x() {({ [yield]: x } = { })}',
    'function * x() {yield;}',
    'function * x() {yield}',
    'function * x() {yield\n}',
    'function * x() {yield /* comment */}',
    'function * x() {yield // comment\n}',
    'function * x() {(yield)}',
    'function * x() {[yield]}',
    'function * x() {yield, yield}',
    'function * x() {yield; yield}',
    'function * x() {(yield) ? yield : yield}',
    'function * x() {(yield) \n ? yield : yield}',
    'function * x() {yield\nfor (;;) {}}',
    'function * x() {x = class extends (yield) {}}',
    'function * x() {x = class extends f(yield) {}}',
    'function * x() {x = class extends (null, yield) { }}',
    'function * x() {x = class extends (a ? null : yield) { }}',
    `function* x({y = (0x44FB6C6428574)}) { while (({} = ([]), {} = function (z) { while (((yield))) ;}) => f = [, ]) {}}`,
    `x(10, y(...(function*() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    })()));`,
    `x(...(function*(){ yield 1; yield 2; yield 3; })())`,
    `function* c() { log += 'C1'; yield 1; log += 'C2'; }`,
    `function *gen1() { yield 1; return 2; }`,
    `(function TestConciseGenerator() {
      var o = {
        __proto__: {
          m() {
            return 42;
          }
        },
        *g() {
          yield super.m();
        },
      };
      assertEquals(42, o.g().next().value);
    })();`,
    `generatorFn = function*() { yield true; };`,
    `var gen = function *() {
      yield {
          ...yield,
          y: 1,
          ...yield yield,
        };
    };`,
    `function* x() {class y extends (yield arguments) {}}`,
    `var f = function *(a) { yield a+1; return; };`,
    `var gfe = function* () { switch (1) { case yield* 'foo': break; } }`,
    `function* foo() {  return ( yield* ( async ( j ) => {}) ) }`,
    `function* foo() { switch ( y (yield) - ((a) => {})) { } }`,
    `function* foo() { switch ( y (yield) - (async (a) => {})) { } }`,
    `function* foo() { a(yield* function t(k) {}, ...(c) => {}) }`,
    `function* foo() { yield 2; yield 3; yield 4 }`,
    `({} = ({x} = (function* y(z) { (yield) }))) => (p);`,
    `({} = ([x] = (function* y(z) { (yield) }))) => (p);`,
    `([] = ({x} = (function* y(z) { (yield) }))) => (p);`,
    `([] = ({x} = (function* y(z) { async (yield) }))) => (p);`,
    `(a = ({x} = (function* y(z) { async (yield) }))) => (p);`,
    `(a = ({x} = (function* y(z) { async (yield) }))) => (await);`,
    `(a = ({async} = (function* y(z) { async (yield) }))) => (p);`,
    `(a = ({x} = (function* y(z) { async (yield) }))) => (p);`,
    `(x = (function* () { async (yield) }), {[x]: a} ) => 7`,
    `bar(...(function*(){ yield 1; yield 2; yield 3; })());`,
    `(function*() { yield* {} })().next()`,
    `{
      let x = 42;
      function* foo() {
        yield x;
        for (let x in {a: 1, b: 2}) {
          let i = 2;
          yield x;
          yield i;
          do {
            yield i;
          } while (i-- > 0);
        }
        yield x;
        return 5;
      }
      g = foo();
    }`,
    `(x = (function* () { (yield) }), {[x]: a} ) => 7`,
    `function *foo() {({ [yield]: x } = { })}`,
    `function *foo() {({ yield: 1 })}`,
    `function *foo() {yield, yield}`,
    `function *foo() {(yield) ? yield : yield}`,
    `function *foo() {x = class extends (yield) {}}`,
    `function *foo() {x = class extends (null, yield) { }}`,
    `function *foo() {x = class extends (a ? null : yield) { }}`,
    `function *foo() {yield * 2;}`,
    `function *foo() {yield yield 1;}`,
    `function *foo() {yield 3 + (yield 4);}`,
    `function *foo() {(yield * 3) + (yield * 4);}`,
    `function *foo() {(function (yield) { })}`,
    `{ (x = [yield]) => z }`,
    `{ (x = [yield]) }`,
    `{ (x = {[yield]: 1}) => z }`,
    `{ (x = {[yield]: 1}) }`,
    `{ (x = x + yield) => x; }`,
    `{ yield = {}; }`,
    `{ yield => {}; }`,
    `{ (x = x + yield); }`,
    `{ (x = yield) => {}; }`,
    `{ (x = yield); }`,
    `function *g(){ (x = [yield y]) }`,
    `function *g(){ (x = {[yield y]: 1}) }`,
    `function *g(){ (x = [yield]) }`,
    `function *g(){ (x = {[yield]: 1}) }`,
    `function *g() { (x = y = yield z) }`,
    `function *g() { (x = yield); }`,
    `(x = x + yield);`,
    `function *g() { (x = x + foo(a, yield y)); }`,
    `function *g() { return yield.x; }`,
    `function *g(){ async (x = [yield y]) }`,
    `function *g(){ async (x = {[yield y]: 1}) }`,
    `function *g(){ async (x = [yield]) }`,
    `function *g(){ async (x = {[yield]: 1}) }`,
    `function *g() { async (x = yield); }`,
    `function *g() { async (x = x + foo(a, yield y)); }`,
    `function *f(){ async (x = yield y) }`,
    `async (x = z = yield) => {}`,
    `async (x = z = yield)`,
    `async (x = (yield)) => {}`,
    `function *f(){ async (x = yield) }`,
    `function *f(){ async (yield) }`,
    `iter = yield();`,
    `function *f({x: x}) { function f({x: yield}) {} }`,
    `async (x = yield)`,
    `({x} = yield) => {}`,
    `function* foo(a, b, c, d) { yield a; yield b; yield c; yield d; }`,
    `function* g25() {
      try {
        throw (yield (1 + (yield 2) + 3))
      } catch (e) {
        if (typeof e == 'object') throw e;
        return e + (yield (4 + (yield 5) + 6));
      }
    }`,
    `function foo() { return ({ x: 42, g: function* (a) { yield this.x } }).g(0); }`,
    `yield *= x;`,
    `function* g() { yield 1; try { yield 2; } catch (e) { yield e; } yield 3; }`,
    `function* g8() { for (var x = 0; x < 4; x++) { yield x; } }`,
    `function *a(){yield void 0}`,
    `function *a(){yield ~0}`,
    `function *a(){yield ++a;}`,
    `([x, {y: [yield]}] = z)`,
    'function* a(b, c, d) { throw `_":${((yield* (6002.22)))}¿Z${null}UâÑ?${([])}â.Ò÷${((`m`))}`; }',
    `([x, {y: [yield]}])`,
    `function *f(){ delete ("x"[(yield)]) }`,
    `function *f() { (yield x ** y) }`,
    `function *f({x: x}) { function f({x: yield}) {} }`,
    `({ *g1() {   return {x: yield}  }})`,
    `function *f() { 1 ? yield : 1 ; }`,
    `function *f() { yield 1 ? 2 : 3; }`,
    `function *f() { (yield 1) ? yield 2 : yield 3; }`,
    `function *g() { function f(x = yield) {} }`,
    `function *g() { function f(x = x + yield) {} }`,
    `(x = x + yield) => x;`,
    `(function *g(){ async (x = {[yield y]: 1}) })`,
    `(function *g(){ async (x = [yield y]) })`,
    `async (x = yield) => {}`,
    `async (yield)`,
    `async (x = yield)`,
    `async (x = (yield)) => {}`,
    `async (x = z = yield) => {}`,
    `async (x = z = yield)`,
    `(function *f(){ async (x = yield) })`,
    `yield`,
    `yield  => {}`,
    `yield => yield ? foo : bar`,
    `await: yield`,
    `function foo() { function *b() {} }`,
    `function foo() { function * gen() { yield * a; return } }`,
    `function* f(){ () => yield; }`,
    `function fn(x = yield* yield) {}`,
    `function * gen() { (yield * a) + (yield * b);; }`,
    `function * gen() { yield, yield }`,
    `function f() { const yield = 10; }`,
    `function f() { var o = { yield: 10 } }`,
    `function f() { class C { *yield() { } } }`,
    `yield = foo`,
    `yield: foo`,
    `function *g() { yield {...(x,y),}}`,
    `function *g(){ return x + (yield f); }`,
    `var gen = function *g() {
      callCount += 1;
      yield {
           ...yield yield,
           ...(function(arg) {
              var yield = arg;
              return {...yield};
           }(yield)),
           ...yield,
        }
    };`,
    `function *f() { (yield 1) ? yield 2 : yield 3; }`,
    `function *f() { 1 ? yield : 1 ; }`,
    `function *f() { 1 ? 1 : yield ; }`,
    `function *g() { [...yield]; }`,
    `function *f() { 1 ? 2 : yield 3; }`,
    `function *f(){ return { ...(yield) } }`,
    `function *g() {x={     ...yield x,    };}`,
    `function *g() {x={     ...yield yield,    };}`,
    `({ *g1() {   (yield)  }})`,
    `function *g() { yield {...(x),}}`,
    `([yield])`,
    `function *g() {yield {     ...yield yield    };}`,
    `function* g(x) { yield x = 3; }`,
    `function* g(x) { yield x = yield 3; }`,
    `function* f(){ call(yield x + y); }`,
    `function* f(){ call(yield x); }`,
    `function* f(){ yield x + y; }`,
    `function* f(){ yield x; }`,
    `function *g() { function f(x = yield) {}; }`,
    `function x() { yield *y }`,
    'function fn(yield) {}',
    '(yield) => {}',
    'yield => {}',
    `function* g() { class C_ {  get [yield]() {}
          set [yield](param) { yieldSet = param }
        }
        C = C_
      }`,
    '(function* () { yield yield 10 })',
    'function fn() { function yield() {} }',
    'async (yield)',
    '({x} = yield) => {}',
    'async (x = yield)',
    'function* f(){ yield x + y; }',
    'function* f(){ yield; }',
    'function* f(){ yield x; }',
    'function f(){ yield; }',
    'function * yield() { }',
    'function *a(){yield class{}}',
    'function *a(){yield-1}',
    'function* fn() {() => yield; () => { yield }; }',
    'function* fn() { () => (x = yield) => {}; }',
    '(x = yield) => {}',
    'x = { *test () { yield *v } };',
    '(function () { yield* 10 })',
    'function fn(x = yield) {}',
    'function fn(x = yield* yield) {}',
    '(yield) => {}',
    'yield => {}',
    'function* fn() { function fn2(x = yield) {} } ',
    `function* g() { class C_ {  get [yield]() {}
        set [yield](param) { yieldSet = param }
      }
      C = C_
    }`,
    '(function* () { yield yield 10 })',
    'async (yield)',
    '({x} = yield) => {}',
    'async (x = yield)',
    'function* f(){ yield x + y; }',
    'function* f(){ yield; }',
    'function* f(){ yield x; }',
    'function f(){ yield; }',
    'function * yield() { }',
    'function yield() {} ',
    'function* fn() { (function yield() {}); } ',
    '+function yield() {} ',
    'function* yield() {} ',
    'function fn(x = yield* yield) {} ',
    'function fn(x = yield) {}',
    'function* fn() { () => (yield) => {}; }',
    'function *g() { function f(x = x + yield) {}; }',
    '({a:(b) = 0} = 1)'
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
