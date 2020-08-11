import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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
    'new foo',
    'new foo();',
    'new foo(1);',
    'new foo(1, 2);',
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
    'new async()()',
    'new a()().b.c[d];',
    'new async()().b.c[d];',
    'new (a()().b.c[d]);',
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
    'new (function test(foo){this.foo=foo;})(1);',
    'new (function test(foo){this.foo=foo;})();',
    'new true;',
    'new (0);',
    'new (!0);',
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
    'new this',
    //'({ set a(b = new.target){} })',
    'new true();'
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
