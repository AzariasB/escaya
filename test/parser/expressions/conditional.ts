import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Conditional', () => {
  // Invalid cases
  for (const arg of [
    `a ? b
    c : d`,
    'a ? await x : c',
    'a ? b : await c',
    'a ? b : yield c'
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
    'foo?.3:0',
    'foo ? .3 : 0',
    'a ? b : c = d',
    'a ? b = d : c',
    'x = (0) ? 1 : 2',
    '(y ? y : true)',
    '"1" ? y : ""',
    '("1" ? "" : "1")',
    'x() ? 1 : 2, 1',
    '(false ? false : true)',
    'foo => bar ? zoo : doo',
    'await === b ? c : d % e;',
    'a === await ? c : d % e;',
    'a === b ? await : d % e;',
    'a === b ? c : await % await;',
    'a === b ? async : d % e;',
    'a === b ? c : d % async;',
    `a ? b = d : c`,
    `x = (0) ? 1 : 2`,
    'a ? b = d : c',
    'x = (0) ? 1 : 2',
    'Symbol() ? 1 : 2, 1',
    `(y ? y : true)`,
    'true ? y : false',
    'a ? !b : !c',
    'a ? !b : !c;',
    `a === b ? c : d % e`,
    `a=b?c:d`,
    `x?4:6`,
    `x && y ? 1 : 2`,
    'async === b ? c : d % e;',
    'true ? foo : bar',
    'a?b:c',
    'a=b?c:d',
    'a?b:c=d',
    'x && y ? a : b',
    'a === b ? c : d % e',
    'true ? y : z',
    'x && y ? 1 : 2',
    'a === b ? c : d % e;',
    'a=b?c:d',
    'a=b?c:d',
    'a?b=c:d',
    'a?b:c=d',
    'a?b:c'
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
