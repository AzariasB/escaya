import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Import call', () => {
  // Invalid cases
  for (const arg of [
    'import(x, y).then(z);',
    'import.then(doLoad);',
    'import(',
    'import[]',
    'import]',
    'import[x]',
    'import(...y)',
    'import+',
    'import = 1',
    '[import(x).then()] = [1];',
    'import("") -= 5',
    'import("") = 2',
    'import("") >>>= 2',
    //'new import(x);',
    '(import(1)) => {}',
    '(import(y=x)) => {}',
    '(a, import(x).then()) => {}',
    '(1, import(foo)) => {}',
    '(a, import(x).then()) => {}',
    'function x() { return import.then(); }',
    'import()',
    'import(a, b)',
    '(import(foo)) => {}',
    '[import(y=x)] = [1];',
    'import("") --',
    'import(x,);',
    'import("") >>>= 2',
    'function *f(x = import(yield)) {}',
    'import(a b)',
    'import(a, b);',
    'import(...a);',
    'import("")++',
    '[import]',
    'import();',
    'import("", "");',
    'import("",);',
    'import(/foo/) /bar/',
    'import(() => {} + x).promise'
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
    'f(...[import(y=x)])',
    'x = {[import(y=x)]: 1}',
    'import(() => {})',
    'import(/foo/)',
    'new (import(x));',
    'import("foo").then();',
    'x  = import(/foo/) / bar',
    'function f(x = import(await)) {}',
    '(import(y=x))',
    '{import(y=x)}',
    'import(delete obj.prop);',
    'import(void 0);',
    'import(typeof {});',
    'import(a + b);',
    'import(+void 0);',
    'import(-void 0);',
    'import(!void 0);',
    'import(~void 0);',
    'import(delete void typeof +-~! 0);',
    'let f = () => import("");',
    '(async () => await import(import(import("foo"))));',
    'async function * f() { await import(import(import("foo"))) }',
    'async function * f() { await import("foo") }',
    'if (false) { } else { import(import(import("foo"))); }',
    'if (true) import("foo");',
    'function fn() { return import("foo"); }',
    'let x = 0; while (!x) { x++;  import(import(import("foo"))); };',
    'import("foo");',
    `import('./module.js')`,
    'import(import(x))',
    'x = import(x)',
    'foo(import("foo").den());',
    'import(/foo/)',
    'var x = import(x)',
    'let x = import(x)',
    'new (import(x));',
    'new (import(x));',
    'foo(import("foo").den());',
    'for(x of import(x)) {}',
    'import(x).then()',
    'f(...[import(y=x)])',
    'x = {[import(y=x)]: 1}',
    'var {[import(y=x)]: x} = {}',
    '({[import(y=x)]: x} = {})',
    'async () => { await import(x) }',
    'const importResult = import("test.js");',
    'let x = () => import("../foo/bar/zoo.js")',
    'import(/foo/) / bar',
    `import(/foo/)
   /bar/g`
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
