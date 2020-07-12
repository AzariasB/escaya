import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Async function', () => {
  // Invalid cases
  for (const arg of [
    '(async function () { var await; });',
    '0, async function*(...x = []) {};',
    '(async function f(...a,) {})',
    '(async function foo1() { } foo2 => 1)',
    'var f = async() => ((async(x = await 1) => x)();',
    'class C { async constructor() {} }',
    'class C {}; class C2 extends C { async constructor() {} }',
    'class C { static async prototype() {} }',
    'class C {}; class C2 extends C { static async prototype() {} }',
    '(async function foo3() { } () => 1)',
    '(async function foo4() { } => 1)',
    '(async function() { } foo5 => 1)',
    '(async function() { } () => 1)',
    '(async function() { } => 1)',
    '(async function(...a,) {})',
    `async function wrap() { async function await() { } };`,
    '(async function () { void await; });',
    '(async function () { await: ; });',
    '(async function foo (foo) { super() })',
    '(async function foo (foo) { super.prop });',
    '(async function foo (foo = super()) { var bar; });',
    '(async function*(await) { });',
    '(async function foo(await) { })',
    '(async\nfunction foo() { })',
    'async ()\n=> a',
    '(async`foo23` foo24 => 1)',
    '(async`foo25` () => 1)',
    '(async`foo26`.bar27 => 1)',
    '(async`foo28`.bar29 foo30 => 1)',
    '(async`foo31`.bar32 () => 1)',
    'var f = async() => await;',
    'var O = { *async method() {} };',
    'var O = { async method*() {} };',
    'async(...a = b) => b',
    'async(...a,) => b',
    'async(...a, b) => b',
    `(async
                function f() {})`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'var O = { async 0(arguments) {} }',
    'var O = { async method(foo, bar) {} }',
    'async function await() {}',
    'class X { static async await(){} }',
    `(async function ref(a, b = 39,) {});`,
    `x = async function(a) { await a }`,
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = async () => await b) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    '(function f() { async function yield() {} })',
    '(function f() { ({ async yield() {} }); })',
    '({ async [yield]() {} });',
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a, b) { await a }',
    '(async function foo() { }.prototype)',
    '(async function foo(x, y = x, z = y) { })',
    '(async function foo(x = y, y) { })',
    '(async function foo(a, b = 39,) { })',
    '(async function foo(a, b,) { })',
    '(async function foo(_ = (function() {}())) { })',
    '(async function foo(x = x) { })',
    '(async function foo(a, b = 39,) {})',
    '(async function(){})',
    'async function foo(a = class {async bar() { await b }}) {}',
    '(async function f(){ await \n x; })',
    '(function f() { async function yield() {} })',
    '({ async [yield]() {} });',
    'let x = function *f(foo = await){}',
    'let o = {f(foo = await){}}',
    '(function* g() { (async function yield() {}) })',
    '(function f() { ({ async [yield]() {} }) })',
    'x = async function(a) { await a }',
    'class X { static async await(){} }',
    '(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})',
    'async function foo(a = async () => await b) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    '(function(x) { async function inner() { await x } })',
    'async function foo(promise) { await promise }',
    'foo = async function(promise) { await promise }',
    'f(a, async promise => await promise)',
    'foo = function({ async: bar }) {}',
    'async function fn() { function g(x = await) {} }',
    'var O = { async method(eval) {} }',
    "var O = { async ['meth' + 'od'](eval) {} }",
    "var O = { async 'method'(eval) {} }",
    'var O = { async 0(eval) {} }',
    'var O = { async method(arguments) {} }',
    "var O = { async ['meth' + 'od'](arguments) {} }",
    "var O = { async 'method'(arguments) {} }",
    'var O = { async 0(arguments) {} }',
    'var O = { async method(foo, bar) {} }',
    '(function* g() { (async function yield() {}); })',
    '"use strict"; ({ async yield() {} });',
    '(function f() { ({ async [yield]() {} }); })'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Double wrapped group in the middle', () => {
    t.deepEqual(parseScript('x = ((y)) = z'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'y'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('Assign with dud group', () => {
    t.deepEqual(parseScript('a = ((b)) = c;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'c'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });
});
