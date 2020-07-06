import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Call', () => {
  // Invalid cases
  for (const arg of [
    'foo(',
    'foo(a,,);',
    'foo(,,);',
    'foo(a,b,,)',
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
    'foo(x,);',
    'foo(a)(b)',
    'foo(a)(b)(c)(d)(e)',
    'foo(...a)',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'foo()(1, 2, 3, ...{})',
    'foo(...[],)',
    'foo(...[],);',
    'a(b, c, d, !e)',
    'a(b, c, d, ++e)',
    'a(b, c, d, e = f)',
    'a(b, c, d, e--)',
    '(function(obj) {}(1, 2, 3, ...[]));',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
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
    'g(a);',
    'h(a, b);',
    'i(a, b, ...c);',
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
