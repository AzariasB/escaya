import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Exponentiation', () => {
  // Invalid cases
  for (const arg of [
    '**',
    'a **',
    `(!3 ** 2)`,
    '(+x ** 2)',
    '(async function f() { (await x ** y) }',
    '(a * +a ** a ** 3)',
    '(+x ** 2)',
    '(delete 3 ** 2)',
    '(-x ** 2)',
    '(~3 ** 2)',
    '(typeof 3 ** 2)',
    '!1 ** 2',
    'typeof O.p ** 10',
    'void O.p ** 10',
    '--delete O.p ** 10',
    '(!3 ** 2)',
    '(delete 3 ** 2)',
    '~O.p ** 10'
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
    '(x-- ** a)',
    '(--x ** a)',
    '(x++ ** a)',
    '(++x ** a)',
    '(2 ** 4)',
    '(+c * b ** a ** 3)',
    'a ** b ** c',
    '(new x ** 2)',
    '(new x() ** 2)',
    '(true ** a)',
    `(delete O.p) ** 10`,
    `(~O.p) ** 10`,
    `(-O.p) ** 10`,
    `(typeof O.p) ** 10`,
    `(void 0) ** 10`,
    `2 ** ++exponent, 8`,
    `2 ** -1 * 2, 1`,
    `2 ** (3 ** 2)`,
    `(!x) ** 10`,
    `--base ** 2`,
    `!(3 ** 2)`,
    `(typeof x) ** 10`,
    `2 ** !s`,
    `2 ** +n`,
    `2 ** +1n`,
    `2 ** +0b01101n`,
    `x ** y ** z`,
    `++x ** y`,
    `(-x) ** y`,
    `2 ** 3 ** 2, 512`,
    `16 / 2 ** 2, 4`,
    `(base **= 3) === -27`,
    `new x ** 2;`,
    `true ** a`,
    `++x ** a`,
    `+a * b ** c ** 3`,
    `(new x ** 2)`,
    `(+c * b ** a ** 3)`
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
