import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Throw', () => {
  // Invalid cases
  for (const arg of [
    'throw/("',
    `throw
    x;`,
    `throw
    /x/g`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'throw a = "string", b',
    'throw f.code = "MODULE_NOT_FOUND", f',
    'throw foo;',
    'throw.500',
    'throw``',
    `throw 12`,
    `throw x * y`,
    'throw /(?=[^\\x4f-\\xF5(-)])/imy',
    `function f() { do throw pass
  while(x);
}`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('throw foo;', () => {
    t.deepEqual(parseScript('throw foo;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo'
          }
        }
      ],
      webCompat: true
    });
  });

  it('throw x * y', () => {
    t.deepEqual(parseScript('throw x * y'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x'
            },
            right: {
              type: 'IdentifierReference',
              name: 'y'
            },
            operator: '*'
          }
        }
      ],
      webCompat: true
    });
  });

  it('throw 1;', () => {
    t.deepEqual(parseScript('throw 1;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1
          }
        }
      ],
      webCompat: true
    });
  });
});
