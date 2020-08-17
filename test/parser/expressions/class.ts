import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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
    '(class x {})',
    '(class x extends y {})',
    '(class x { a() {}})',
    'class n extends ([] = x) {}',
    'class n extends ({} = x) {}',
    'f = ([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }]) => {}',
    '(class o {f(){ function x(){}}})',
    '(class A {async * 34(){}})',
    '(class A {set [foo](x){}})',
    '(class X {})',
    '(class x{}())',
    '(class A {set prototype(x){}})',
    '(class x{}.foo())',
    'x = class{} / x',
    'class x { get prototype(){} }',
    '(class x { async prototype(){} })',
    '(class A {static 2(){}})',
    '(class x { get [y](){}})',
    '(class x{*[x](){}})'
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
