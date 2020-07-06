import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Member', () => {
  // Invalid cases
  for (const arg of ['abc???.£', 'foo.|1.', 'let[x]' /*`foo.123.`*/]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of ['[x()[y] = a + b] = z', 'await[x]', 'let.x', 'let(x)', 'let?.x']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
