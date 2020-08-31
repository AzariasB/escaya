import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Conditional', () => {
  // Invalid cases
  for (const arg of ['a ? await x : c', 'a ? b : await c', 'a ? b : yield c', 'a ? b, c : d']) {
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
    'foo?.3:0',
    'a ? b : c = d',
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
    'a ? b = d : c',
    `(y ? y : true)`,
    'true ? y : false',
    'a ? !b : !c',
    'a ? !b : !c;',
    `x?4:6`,
    'a, b ? c : d',
    `x && y ? 1 : 2`,
    'async === b ? c : d % e;',
    'true ? foo : bar',
    'a?b:c',
    'a=b?c:d',
    'x?.4:6',
    'a?b:c=d',
    'x && y ? a : b',
    'true ? y : z',
    'a === b ? c : d % e;',
    '0 ? v => (v) : v => 0;',
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
