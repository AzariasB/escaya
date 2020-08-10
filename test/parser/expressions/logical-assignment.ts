import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Logical Assignment', () => {
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
    'a.foo["baz"] &&= result.foo.baz',
    'a.foo.bar().baz &&= result.foo.bar().baz',
    'c.foo.bar().baz ??= result.foo.bar().baz',
    'x &&= "foo"',
    'x &&= 42',
    'x ||= 42',
    //'bar?.value ?? [] : []',
    `class a extends (a ??= 0) {}`,
    '() => { let a = (a &&= 0); }',
    '() => { fn &&= 1; }',
    '() => { b ||= 0;}',
    `let a = (a ||= 0);`,
    `const a = (a &&= 0);`,
    `(a = (b ??= 0), b) => {}`,
    'x ??= y();',
    'obj[pk] &&= true;',
    'obj[pk] ??= true;',
    'a ||= false;',
    'a ||= true;',
    'a.baz &&= result.baz',
    'f ||= (a => a)',
    'f ||= (f.toString(), (a => a))',
    '(x ||= (y ||= [])).push(100);',
    '(x ??= (y ??= [])).push(100);',
    '(x &&= (y &&= [])).push(100);',
    '(x ||= y ||= []).push(100);',
    '(x ??= y ??= []).push(100);',
    '(x &&= y &&= []).push(100);',
    ' f &&= (a => a)',
    '(x ||= []).push(100);',
    'a.baz &&= result.baz',
    '(x ||= bar?.value ?? []).push(100);',
    '(x ??= bar?.value ?? []).push(100);',
    '(x &&= bar?.value ?? []).push(100);'
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
