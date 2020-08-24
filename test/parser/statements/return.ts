import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Return', () => {
  // Invalid cases
  for (const arg of [
    'return',
    'return/("',
    'return\nx;',
    'return\n/x/g',
    'return\n',
    'return',
    'return catch',
    'return(x) { case y: {...x} }',
    'return(x) { case y: foo /a/ }',
    'return(x) { case y:{ class { x() {} } }}',
    '*() => {return}',
    '() => return'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
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
    `x => {return \n /foo/}`,
    `x => {return \n /foo/y}`,
    `(a, b) => {return}`,
    `function f(){   return 15;    }`,
    `function f(){   {return}    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }
});
