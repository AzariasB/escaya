import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of ['({ *method(x = yield) {} })', '[,', '[] += a']) {
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
