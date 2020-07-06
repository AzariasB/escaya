import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Optional chaining', () => {
  // Invalid cases
  for (const arg of [
    'obj?.0',
    'obj?.foo = 0',
    'obj?.foo.bar = 0',
    'obj?.().foo = 0',
    'obj?.foo++',
    'x?.[y] = foo',
    'a.?',
    'a.[]',
    'null?.`hello`;',
    'null?.fn`hello`;',
    'a?.`hello`;',
    'async .?() => {}',
    //'a?..200',
    'log(import?.meta)',
    // 'new foo?.bar',
    //'a?.--',
    '[x?.?.y]',
    'a.? (?) [?]',
    'a.?2.3',
    'a:?.b',
    '[x?.?.y = 1]',
    'async .?() => {}',
    '({0: x?.a, 1: x} = 0)',
    '({a:let?.foo} = 0);',
    'x?.[y] = foo',
    'foo?.bar *= x',
    '[foo?.bar] = x',
    'foo?.bar = x',
    //'obj?.\\u{0062}',
    //'obj?.\\u0061',
    'log(import?.meta)',
    'function f() { return import?.("foo").then(party); }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
          recovery(`${arg}`, 'recovery.js');
        });
      });
    });
  }

  // Valid cases
  for (const arg of ['null?.(1, ...a)', 'arr?.[0]', 'obj?.[undefined]', 'arr ?. length']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
          recovery(`${arg}`, 'recovery.js');
        });
      });
    });
  }
});
