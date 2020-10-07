import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Misc - Hashbang', () => {
  for (const arg of [
    '#\\u0021\n',
    '#\\u{21}\n',
    'function fn() {#\\u0021\n}',
    'async function* fn() {#\\x21\n}',
    '#\\041',
    '#\\u0021',
    'function fn() {#!   }',
    '!!!',
    '"use strict";\n#!',
    ';#!',
    '#!\n#!',
    '/*\n*/#!'
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

  for (const arg of [
    '#!',
    '#!/*',
    '#! these characters should be treated as a comment',
    '#!"use strict" with ({}) {}',
    '#!---IGNORED---\n function\nFN\n(\n)\n {\n}\nFN();',
    '#!---IGNORED---\r',
    '#!---IGNORED---\xE2\x80\xA9'
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
