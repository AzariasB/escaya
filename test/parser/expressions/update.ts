import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Update', () => {
  // Invalid cases
  for (const arg of [
    'foo\n++',
    'if (foo\n++);',
    '++([])',
    '([])++',
    //'[]++',
    //'++{}',
    'class x extends ++a {}',
    'class x extends --a {}',
    '({}--)',
    '++(x) => b',
    '++x => b',
    `if (a
  ++b);`,
    `if (a
    ++
    b);`,
    'x.foo++.bar',
    `a
++`,
    `function f(){ return a
  ++; }`,
    `let x = () => a
  ++;`,
    `z=[b
    ++c];`,
    `for (;b
      ++c;);`,
    `z={x:b
        ++c};`,
    `(b
          ++c);`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '+a++ / 1',
    '({}.x++)',
    '[].x++',
    '(this.x++)',
    'this.x++',
    'let x = () => a++;',
    'a++',
    'function f(){ return a++; }',
    '(x)++;',
    '(((x)))++;',
    'if (a) a++;',
    '++{}.foo',
    '++/b/.c',
    '++this.x',
    'typeof a++',
    'typeof ++a',
    `new b
    ++c;`,
    `() => b
    ++c;`,
    `while (true) {b
      ++c};`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
