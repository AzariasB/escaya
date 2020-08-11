import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('leafs - Return', () => {
  // Invalid cases
  for (const arg of [
    'switch/("',
    'switch\nx;',
    'switch\n/x/g',
    'switch\n',
    'switch',
    'switch catch',
    'switch(x) { case y: {...x} }',
    'switch(x) { case y: foo /a/ }',
    'switch(x) { case y:{ class { x() {} } }}',
    //'switch({x=y}) { case y: [...a] }',
    '*() => {return}',
    '() => return'
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
    `x => {return}`,
    `(a, b) => {return}`,
    `function f(){   return 15;    }`,
    `function f(){   {return}    }`
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
