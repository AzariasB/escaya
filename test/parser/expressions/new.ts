import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - New', () => {
  // Invalid cases
  for (const arg of [
    'new x(await foo);',
    'foo.|1.',
    `foo.123.`,
    'while (0) { new.target }',
    'do { new.target } while (0)',
    'new new .target',
    'function f(x=() => new."target") {}',
    'new.target',
    '{ new.target }',
    '() => { new.target }',
    '() => new.target',
    'if (1) { new.target }',
    'if (1) {} else { new.target }',
    'while (0) { new.target }',
    'function f(){ new.foo }',
    '_ => new.target',
    '_ => _ => _ => _ => new.target',
    'function f(){ new.target = foo }',
    'function f(){ new.target-- }',
    '(f=new.target) => {}',
    `new await foo;`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
          recovery(`${arg}`, 'recovery.js');
        });
      });
    });
  }

  // Valid cases
  for (const arg of [
    'new foo',
    'new foo();',
    'new foo(1);',
    'new foo(1, 2);',
    // The first () will be processed as a part of the NewExpression and the
    // second () will be processed as part of LeftHandSideExpression.
    'new foo()();',
    // The first () will be processed as a part of the inner NewExpression and
    // the second () will be processed as a part of the outer NewExpression.
    'new new foo()();',
    'new foo.bar;',
    'new foo.bar();',
    'new foo.bar.baz;',
    'new foo.bar().baz;',
    'new foo[bar];',
    'new foo[bar]();',
    'new function(foo) {\n    this.foo = foo;\n}(1);',
    'new function(foo) {\n    this.foo = foo;\n}();',
    'new function test(foo) {\n    this.foo = foo;\n}(1);',
    'new function test(foo) {\n    this.foo = foo;\n}();',
    'new true();',
    'new async()()',
    'new a()().b.c[d];',
    'new async()().b.c[d];',
    'new (a()().b.c[d]);',
    'new (b());',
    'new (async(await));',
    'new async / b',
    'new async / await',
    'new async / await()',
    'new async / await(async = foo)',
    'new async / await(async,)',
    'new async / await(foo, async)',
    'new async / await("foo", async)',
    'new async / await(123, async)',
    'new async / await(foo, async)',
    'new 0();',
    'new (!0)();',
    'new (bar = function(foo) {\n    this.foo = foo;\n})(123);',
    'new x(1);',
    'new x;',
    'new new x;',
    'new new x.y;',
    '({ set a(b = new.target){} })',
    'foo({bar(){ new.target }})',
    'foo(function f(f=new.target){})',
    '({foo(x=new.target){}})',
    '(function a(b = new.target){})',
    'new (function(foo){this.foo=foo;})(1);',
    'new (function(foo){this.foo=foo;})();',
    'new (function test(foo){this.foo=foo;})(1);',
    'new (function test(foo){this.foo=foo;})();',
    'new true;',
    'new (0);',
    'new (!0);',
    'new (bar = function(foo) {this.foo=foo;})(123);',
    'new (bar = function(foo) {this.foo=foo;})();',
    'new x(1);',
    'new x();',
    'new x();',
    'new x()()()()()()();',
    'new (x()()()()()()());',
    'new new x()();',
    'new await()()',
    'new foo()();',
    'new (foo)();',
    'new (foo);',
    'new Foo',
    'new a.b.c.d',
    'new async(x)(y)',
    'new Foo["bar"]',
    'new Foo.Bar()',
    'new Foo["bar"](X)',
    'new Foo(X, Y, Z)',
    'new Foo.Bar(X, Y, Z)',
    'new x().y',
    'new x()`y`',
    'new a.b.c.d()',
    'new Foo["bar"]()',
    'new Foo(X)',
    'new Foo.Bar(X)',
    'new Foo["bar"](X)',
    'new Foo["bar"](X, Y, Z)',
    'new x().y = z',
    'new x().y + z',
    'new x()[y] = z',
    'new x()[y] + z',
    '++new x().y',
    'new x().y++',
    'delete new x()',
    'delete new x().y',
    'typeof new x()',
    'new new A().foo',
    'new new A.foo()',
    'new "foo".__proto__.constructor',
    'new 1..__proto__.constructor',
    'new 0x2.__proto__.constructor',
    'new true.__proto__.constructor',
    'typeof new x().y',
    '[...new A()]',
    'class x extends new A() {}',
    'x({[new A()]:y})',
    'f(new /z/())',
    'f(new /z/)',
    'f(new /z/.foo)',
    'new arguments',
    'new async',
    'new async (x, y)',
    'new async (...x)',
    'new async function(){}',
    'typeof async',
    'new await',
    'new class{}',
    'new class extends x{}',
    'class x extends (x) {}',
    'new function(){}',
    'new function(){}(x)',
    'class x extends y { constructor() { new super.foo }}',
    'class x extends y { constructor() { new super() }}',
    'new this'
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
  }
});
