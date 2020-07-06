import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Misc - fail', () => {
  for (const arg of [
    `class x extends y {
  constructor(){
    super
  }
}`,
    '0b2'
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
});
