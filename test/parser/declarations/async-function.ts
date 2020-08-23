import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Async Function', () => {
  // Invalid cases
  for (const arg of ['async function * f(']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true, loc: true });
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
    'async function f(){    function g(x=(await)=y){}   }',
    'async function f(){ var f }',
    'async function f(){ let f }',
    'x=async function f(){ let f }',
    'async function *f(){ var f }',
    'async function x(a) { await 1; }',
    'async function x(a, b = 2) { await 1; }',
    'async function x(a, b, ...c) { await 1; }',
    'async function f(){ let f = 1 }',
    'async function f(){ var f = 1 }',
    'function *f(){ const f = 1 }',
    'async function * f(){}',
    'async function * f(){}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
