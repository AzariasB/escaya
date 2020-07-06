import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Conditional', () => {
  // Invalid cases
  for (const arg of [
    `a ? b
    c : d`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of ['a === b ? c : d % e;', 'a=b?c:d', 'a?b=c:d', 'a?b:c=d', 'a?b:c']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
