import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Yield', () => {
  // Invalid cases
  for (const arg of [
    '{ (x = [yield y]) => z }',
    '{ (x = [yield y]) }',
    '{ (x = {[yield y]: 1}) => z }',
    'function f(){ yield x; }',
    '({...(a,b)} = foo)',
    '{ (x = {[yield y]: 1}) }',
    '{ (x = x + yield y) => x; }',
    '{ (x = yield) = {}; }',
    '{ (x = x + yield y); }',
    '{ (x = y = yield z) => {}; }',
    '{ (x = u + yield z) => {}; }',
    '{ (x = y = yield z); }',
    '{ (x = x + foo(a, yield y)) => x; }',
    '{ (x = x + foo(a, yield y)); }',
    'function* fn() { (yield) => {}; }',
    'function* fn() { (yield fn) => {}; }',
    'function* fn() { (a, b, yield) => {};  }',
    'function* fn(x = yield* yield) {}',
    'function* fn(x = yield) {}',
    'function* fn() { (x = (yield) => {}) => {}; }',
    //'function *g(){ (x = [yield y]) => z }',
    // 'function *g(){ (x = {[yield y]: 1}) => z }',
    //'function *g(){ (x = [yield]) => z }',
    // 'function *g(){ (x = {[yield]: 1}) => z }',
    // 'function *g(){ (x = {[yield]: 1}) }',
    // 'function *g() { (x = x + yield) => x; }',
    // 'function *g() { (x = x + yield y) => x; }',
    'function *g() { yield = {}; }',
    'function *g() { yield => {}; }',
    //'function *g() { (x = x + yield); }',
    // 'function *g() { (x = x + yield y); }',
    // 'function *g() { (x = y = yield z) => {}; }',
    //'function *g() { (x = x + foo(a, yield y)) => x; }',
    // 'function *g(){ async (x = [yield]) => z }',
    //'function *g() { async (x = x + yield) => x; }',
    //'function *g() { async (x = x + yield y) => x; }',
    'function *g() { async yield = {}; }',
    // 'function *g() { async yield => {}; }',
    //'function *g() { async (x = x + yield); }',
    //'function *g() { async (x = yield) => {}; }',
    // 'function *g() { async (x = yield) = {}; }',
    //'function *g() { async (x = x + foo(a, yield y)) => x; }',
    // 'function *f(){ async (x = z = yield y) => {} }',
    // 'function *f(){ async (x = yield y) => {} }',
    // 'function *f(){ async (x = yield) => {} }',
    'async (x = yield y) => {}',
    'async (x = yield y)',
    'function *f(x=yield){ }',
    '5 + yield x',
    '5 + yield x + y',
    'call(yield x)',
    'call(yield x + y)',
    'yield x + y',
    //'function* f(){ 5 + yield x; }',
    'function f(){ 5 + yield x; }',
    `function* f(){ yield
      /foo }`,
    // 'function *g() { function f(x = x + yield y) {}; }',
    // 'function *g() { (x = u + yield z) => {}; }',
    // 'function *g() { function f(x = x + foo(a, yield y)) {}; }',
    `function *f() {
      (
      yield
        x
      )
    }`,
    `function *f() {
      (
      yield
        /x/
      )
    }`,
    `function *f() {
      (
      yield
        /x/g
      )
    }`,
    `function *f() {
      yield
        /x
    }`,
    'function f(){  class x{*foo(a=yield){}}  }',
    'function f(){  x = {*foo(a=yield){}}  }',
    // 'function f(){  return function(x=yield y) {};  }',
    'function *g() { yield = {}; }',
    'function *g() { yield = {}; }',
    'function *g() { yield = {}; }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
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
    `yield
    x`,
    `yield
    * x`,
    `yield
    /x/g`,
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
    '(yield) => {}',
    'yield => {}',
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
    //'({ *method(x = yield) {} })',
    'function *g() { function f(x = x + yield) {}; }',
    '({a:(b) = 0} = 1)'
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
