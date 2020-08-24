import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Misc - Pass', () => {
  for (const arg of [
    '0b100n',
    '0o533n',
    '0xabcn',
    '45n',
    //'a(x:b)',
    //'a(x:c(y:b))',
    `"x\\\\0"; "use strict";`,
    'x \n /foo',
    'x \n /foo/g',
    'debugger \n /foo/',
    'debugger \n /foo/g',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);'
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
