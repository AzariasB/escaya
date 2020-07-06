import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Unary', () => {
  // Invalid cases
  for (const arg of [
    '(((x)))\n++;',
    'if (a\n++\nb);',
    '- async({a = 1}, {b = 2}, {c = 3} = {});',
    '- async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    '- async({a = 1});',
    'async function f(){   async function fh([- await x]) { }   }',
    `!  a.b
    /foo/`,
    'async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    '! async({a = 1}, {b = 2}, {c = 3} = {});',
    '! async({a = 1});',
    'async function f(){   async function fh({x: ! await x}) { "use strict"; }   }',
    'async function f(){   async function g(x = ! await x) { "use strict"; }  }',
    //'async function f(){   function g(x = ! await x) {}  }',
    'async function f(){   function fh({x: ! await x}) {}   }',
    'typeof async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    'async function f(){   async function fh({x: void await x}) {}   }'
    // 'new typeof x.x',

    //'let x = ! async (x) => x'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '!a',
    '+a',
    '~a',
    'delete x.y',
    '! x.def + ! y.x',
    '! x.abc + y.x',
    'x + ! y.x',
    `! a.b
  /foo`,
    '! async({a});',
    'typeof x',
    'void x'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
