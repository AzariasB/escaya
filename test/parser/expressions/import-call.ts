import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

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
    '(a, import(x).then()) => {}',
    'function failsParse() { return import.then(); }',
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
    'import(/foo/) /bar/',
    'import(() => {} + x).promise'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
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
    'import(/foo/) / bar',
    `import(/foo/)
   /bar/g`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
