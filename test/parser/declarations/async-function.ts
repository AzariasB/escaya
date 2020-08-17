import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Async Function', () => {
  // Invalid cases
  for (const arg of ['while (true) function f(){}']) {
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
    'async function *f(){ var f }'
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
