import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - With', () => {
  // Invalid cases
  for (const arg of [
    //`with ({}) let [a] = [42];`,
    //'with ({}) b: function a(){}',
    'try {}',
    'try catch',
    'try ()',
    '"use strict"; with ({}) { }',
    'with(1) b: function a(){}',
    // `with ({}) let [a] = [42];`,
    // `while(true) let[a] = 0`,
    `with ({}) let []`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  // Invalid cases
  for (const arg of ['with ({}) { }', `with (x) foo;`, 'with ({}) async function f() {}']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { impliedStrict: true });
      });
    });
  }

  it('with (foo) bar;', () => {
    t.deepEqual(parseScript('with (foo) bar;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo'
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'bar'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('with (o) {}', () => {
    t.deepEqual(parseScript('with (o) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'o'
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });
});
