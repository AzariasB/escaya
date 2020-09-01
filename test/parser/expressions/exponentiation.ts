import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Exponentiation', () => {
  // Invalid cases
  for (const arg of [
    'delete O.p ** 10',
    'delete x ** 10,',
    '!O.p ** 10',
    '+O.p ** 10',
    '-x ** 10',
    '!1 ** 2',
    'typeof x ** 10',
    '++~x ** 10',
    '{ x } **= { x: 2 }',
    '{ x: x **= 2 ] = { x: 2 }',
    '(delete 3 ** 2)',
    '!1 ** 2;',
    '({ x: x **= 2 ] = { x: 2 })',
    '[ x **= 2 ] = [ 2 ]',
    '[ x ] **= [ 2 ]'
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

  // Valid cases. Testing random cases to verify we have no issues with bit masks
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
    `16 / 2 ** 2, 4`,
    `(base **= 3) === -27`,
    `new x ** 2;`,
    `true ** a`,
    `++x ** a`,
    `x ** y ** z`,
    `++x ** y`,
    `(-x) ** y`,
    `(+c * b ** a ** 3)`,
    `2 ** 3 ** 2, 512`
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
