import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Call', () => {
  // Invalid cases
  for (const arg of ['foo(,)', 'foo(,,);', '[', '[,', '[] += a', 'yield({a=1})', 'foo({a=1})', 'async({a=1})']) {
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
    'x(b, c, d, !e)',
    'x(b, c, d, ++e)',
    'x(b, c, d, e = f)',
    'x(b, c, d, e--)',
    'x(x=1,y=x,x+y)',
    'x(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'y(y/=x,{}=x)',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'foo(function f(f=new.target){})',
    'foo()(1, 2, 3, ...{})',
    '(async(a, ...(b)))',
    'foo(...[],)',
    'f(...x, y, z);',
    'f(....5);',
    'f(...g);',
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
    'h(a, b);',
    'i(a, b, ...c);',
    'a.b( c() ).d.e',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
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
    'async({a})',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
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
    'a.b( o.bar );',
    'a.b( o["bar"] );',
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
