import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - BigInt', () => {
  // Invalid cases
  for (const arg of ['0b2n;', '0e0n;', `0xgn;`, '00n;', '012348n;', '08n;', '0o9n;', '++1n', '1n = isiah']) {
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
    '1n',
    '678888n / 78290n',
    '(1n)',
    'x[1n]',
    '1n.foo',
    '99 / 100n',
    `(void 0) ** 10`,
    `2 ** (3 ** 2)`,
    `(!x) / 10n`,
    `--base ** 2`,
    `!(3 - 2n)`,
    `(typeof 1n)`,
    `!1n`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
