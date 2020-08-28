import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Call', () => {
  // Invalid cases
  for (const arg of [
    'foo(,)',
    'foo(,,);',
    '[',
    '[,',
    '[] += a',
    'yield({a=1})',
    'foo({a=1})',
    'async({a=1})',
    'async(a)(b)async',
    'yield({a=1}. {b=2}, {c=3} = {}))',
    'a.b( c() ).d.e(()).f.g',
    '(a)(( async () => {}) => {})',
    'foo(a,b,,)',
    'foo()["bar"',
    'foo()`bar',
    'foo(',
    'foo(...)',
    'async(async() () => {})(async() () => {})(y)(n)(c)', // crazy #1
    'async(async() () => {})(async() () => {})(y)(n)(c)', // crazy #2
    'async(async() () => {})(async() () => {})(async() () => {})(async() () => {})(async() () => {})' // crazy #3
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

  // Valid cases. Testing random cases to verify we have no issues with bitwise masks
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
    'x(b, c, d, !e)',
    'a(1,);',
    'a(1,2,3,);',
    'yield(100)',
    'a(...[],);',
    'a(1, 2, ...[],);',
    'a(...[], 2, ...[],);',
    'x(b, c, d, ++e)',
    'x(b, c, d, e = f)',
    'x(b, c, d, e--)',
    'x(x=1,y=x,x+y)',
    'x(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'y(y/=x,{}=x)',
    'a.b.c( foo() );',
    'a.b( c() ).d;',
    'foo(...(function*(){ yield 1; yield 2; yield 3; })())',
    'foo(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8, ...[9])',
    'f(new C());',
    'x(Infinity, 1 / 1e-9999);',
    'x(Infinity == -Infinity);',
    'foo(function f(f=new.target){})',
    'foo()(1, 2, 3, ...{})',
    '(async(a, ...(b)))',
    'g([0.1]);',
    'foo(...[],)',
    'f(...x, y, z);',
    'f(....5);',
    'f(...g);',
    'x.y(z(-x, -625))',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    'foo(x,y,)',
    'foo(200)',
    'foo(a)(b)(c)(d)(e)',
    'a.b( o.bar )',
    'a.b( o["bar"] )',
    'a.b( foo() )',
    'a.b( c() ).d',
    'eval(...{}, "x = 0;");',
    'a.b( c() ).d.e;',
    'f();',
    'g(a);',
    'a.b( c() ).d.e',
    'foo(x=1,y=x,x+y)',
    'a().b',
    '(async((a), ...[b] = xxx))',
    '(async((a), ...(b) = xxx))',
    'a.b( c() ).d.e;',
    ` obj
    .foo
        ["bar"]
            .baz()
                .foo
                    ["bar"]()
                        .baz()()`,
    'foo({c=3} = {})',
    '"foo", async',
    'foo(123, async,await,)',
    'foo("string", async / 1 -2, await,)',
    'foo(x,x=1);',
    'fn(a(), ...b())',
    'foo()(1, 2, 3, ...{})',
    'foo(0)',
    'foo(NaN)',
    'foo("")',
    'foo(false)',
    'foo({})',
    'foo([])',
    `foo();
     foo("foo");
     foo("foo", "bar");
     foo(bar());
     foo(bar("test"));`,
    'a.b( foo() );',
    'foo(async,)',
    'foo("abc", async)',
    'foo(1, async,)',
    'foo(async,await,)',
    'foo(async.await[foo])',
    'foo(async.abc = await)',
    'f();',
    'g(a);',
    'h(a, b);',
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
    'i(a, b, ...c);',
    'a.replace(/ /g, "")',
    'foo(a)(b)',
    'foo(a, b, c)',
    'async(a)(s)(y)(n)(c)',
    'async().a',
    'async()()'
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
