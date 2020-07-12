import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Call', () => {
  // Invalid cases
  for (const arg of [
    'foo(',
    'foo(a,,);',
    'foo(,,);',
    'foo(a,b,,)',
    'foo(...)',
    'foo()`bar',
    'yield({a=1})',
    '(async((a), ...(b) = xxx))',
    '(async((a), ...[b] = xxx))',
    'foo(,)',
    'foo()["bar"',
    'foo(...)',
    'sync(a)(b)async',
    'a.b( c() ).d.e(()).f.g',
    '(async((a), ...[b] = xxx))',
    '(async((a), ...(b) = xxx))',
    'async({a=1})',
    'yield({a=1})',
    'foo({a=1})',
    'foo(,,);',
    'async({a=1})',
    'async({a=1}. {b=2}, {c=3} = {}))',
    'yield({a=1}. {b=2}, {c=3} = {}))',
    'foo(a,,);',
    'foo({a=1}. {b=2}, {c=3} = {}))',
    '(a)(( async () => {}) => {})',
    'async(async() () => {})(async() () => {})(y)(n)(c)',
    'async(async() () => {})(async() () => {})(y)(n)(c)',
    'async(async() () => {})(async() () => {})(async() () => {})(async() () => {})(async() () => {})'
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

  // Valid cases
  for (const arg of [
    'a(a,)',
    'foo(a)',
    'call(await)',
    'call(await.foo)',
    'async({c=3} = {})',
    'async({a})',
    'x(x,);',
    'x(a)(b)',
    'x(a)(b)(c)(d)(e)',
    'x(...a)',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'x()(1, 2, 3, ...{})',
    'x(...[],)',
    'x(...[],);',
    'x(b, c, d, !e)',
    'x(b, c, d, ++e)',
    'x(b, c, d, e = f)',
    'x(b, c, d, e--)',
    '(function(obj) {}(1, 2, 3, ...[]));',
    'x(x=1,y=x,x+y)',
    'x(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'foo()(1, 2, 3, ...{})',
    '(async(a, ...(b)))',
    'foo(...[],)',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    'a.b( c() ).d.e;',
    'f();',
    'g(a);',
    'h(a, b);',
    'i(a, b, ...c);',
    'a.replace(/ /g, "")',
    'foo(a)(b)',
    'foo(a, b, c)',
    'async(a)(s)(y)(n)(c)',
    'async().a',
    'async()()',
    'async(async(async(async(async(async())))))',
    'a.b( o.bar )',
    'a.b( o["bar"] )',
    'a.b( foo() )',
    'a.b( c() ).d',
    'a.b( c() ).d.e',
    'foo()(1, 2, 3)',
    'foo(x,y,)',
    'foo(200)',
    'foo(a)(b)(c)(d)(e)',
    'foo(...[],);',
    '(function(obj) {}(1, 2, 3, ...[]));',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a().b',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'foo()(1, 2, 3, ...{})',
    'foo(...[],)',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    'a.b( c() ).d.e;',
    'f();',
    `foo(bar, baz)`,
    'async (...a, ...b);',
    'async (...a, b);',
    `(    foo  )()`,
    `f(...a)`,
    `f(...a, ...b)`,
    `f(...a, ...b)`,
    'f();',
    'foo(...[1.1, 2.2, 3.3, 4.4, 5.5])',
    'foo(...[1])',
    'foo(...[1, 2, 3])',
    'foo(...new Set([1]))',
    'foo(...new Set([1, 2, 3, 4, 5, 6]))',
    'foo(..."")',
    'foo(...[])',
    'foo(...new Set)',
    'foo(...(function*() { })())',
    'foo(...[1, 2, 3], 4)',
    'foo(...new Set([1, 2, 3, 4]))',
    `foo(...(function*() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    })())`,
    ` obj
                          .foo
                              ["bar"]
                                  .baz()
                                      .foo
                                          ["bar"]()
                                              .baz()()`,
    'foo({c=3} = {})',
    '"foo", async',
    'foo(async,)',
    'foo("abc", async)',
    'foo(1, async,)',
    'foo(async,await,)',
    'foo(async.await[foo])',
    'foo(async.abc = await)',
    'foo(123, async,await,)',
    'foo("string", async / 1 -2, await,)',
    'async({a})',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
    'foo()(1, 2, 3, ...{})',
    'foo(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8, ...[9])',
    'foo(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8)',
    'foo.bar(...[1, 2, 3, 4, 5, 6])',
    'foo.bar(...new Set([1, 2]))',
    'foo.bar(..."")',
    'foo(...(function*(){ yield 1; yield 2; yield 3; })())',
    'foo(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8, ...[9])',
    'O.nested, O.nested["returnThis"](..."test")',
    'foo.bar("tes", ..."t!!")',
    'foo.bar(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8, ...[9])',
    'fn(...b(), d())',
    'fn(a(), ...b())',
    'fn(async(), ...b())',
    'fn(a(), ...b(), ...c(), d(), e())',
    'foo(1, ...[2], 3)',
    'foo(...[1])',
    'foo(0)',
    'foo(NaN)',
    'foo("")',
    'foo(false)',
    'foo({})',
    'foo([])',
    'foo(1, ...[2], 3)',
    'foo(...a);',
    '(async(...a, ...b))',
    '(async(a, ...b))',
    '(async(a, ...b = y))',
    '(async(...b = y, d))',
    '(async(...b = y, ...d))',
    `foo();
     foo("foo");
     foo("foo", "bar");
     foo(bar());
     foo(bar("test"));`,
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a.b( foo() );',
    'foo(a, b, ...c)'
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
