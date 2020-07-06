import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Do while', () => {
  // Invalid cases
  for (const arg of [
    'switch (x',
    'switch (x);',
    'switch (x) {',
    'switch {}',
    `do let
    [] = y; while (a);`
    // 'do let [x] = y; while (a);'
    //'switch(x) { default: break; case y: break; case z: break; default: break; }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  // Valid cases
  for (const arg of ['do do x; while ((/(?:^)/gi)) while (x);', 'switch (x) { case x: function * f() {} }']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('do {} while({})', () => {
    t.deepEqual(parseScript('do {} while({})'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          statement: {
            type: 'BlockStatement',
            statements: []
          },
          expression: {
            type: 'ObjectLiteral',
            properties: []
          }
        }
      ],
      webCompat: true
    });
  });
});
