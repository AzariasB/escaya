import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Statements - Throw', () => {
  // Invalid cases
  for (const arg of [
    'throw/("',
    'throw\nx;',
    'throw\n/x/g',
    'throw\n',
    'throw',
    'throw catch',
    'throw -',
    'throw (..',
    'throw 1,b,',
    'throw a.',
    'throw a..b',
    'throw /x',
    'throw x/',
    'throw throw',
    'throw ;;',
    'throw {',
    'throw }',
    '{ throw',
    'throw !',
    'throw ++',
    'throw function (',
    'throw function (x',
    'throw function (x)',
    'throw function (x) {',
    'throw function (x {}',
    'throw ((x)))',
    'throw ((x)) = x)',
    'throw class',
    'throw class {',
    'throw class x',
    'throw {x=y',
    'throw ((x)',
    'throw (a b c = d, 123, [a] {x',
    'throw (a b,c = d, 123, [a] {x})',
    'throw {x',
    'throw {x:y',
    'throw {[x]:y',
    'throw [x /a/',
    'throw [x ...y]',
    'throw [x, y',
    'throw () => class x ',
    'throw x => class  {',
    'throw let => class x'
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
    'throw a.b',
    'throw !a',
    'throw ++a',
    'throw function (x) {}',
    'throw class x {}',
    'throw !foo',
    'throw 123',
    'throw yield = await',
    'throw async',
    'throw await',
    'throw ((x))',
    'throw { x: "Error" }',
    'throw x * y',
    'throw (a,b,c = d, 123, [a], {x})',
    'throw {x}',
    'throw {x:y}',
    'throw {[x]:y}',
    'throw [x, /a/]',
    'throw [x, ...y]',
    'throw [x, y]',
    'throw x > class x {}',
    'throw class x {}',
    'throw () => class x {}',
    'throw x => class x {}',
    'throw let => class x {}',
    'throw async => class x {}',
    'throw yield => class x {}',
    'throw await => class x {}',
    'throw a => b',
    'throw a >= b',
    'throw a >= (1)',
    'throw x = a, f',
    'throw ((((((d = null)))) ? (((--r))) : ((/|[--]*||[^\\u2B7a+-?]+|(?!)/giy))));',
    'throw /(?=[^\\x4f-\\xF5(-)])/imy',
    'throw a >= /** comment */ /a/',
    'throw a ** b',
    'throw x ? y : z',
    'throw !x ? y : z',
    'throw x++ ? (y) : z / 1',
    'throw x ? y => b : z',
    'throw x ? y : z => b',
    'throw x => b ? y : z',
    'throw ++x',
    'throw typeof x === "foo"'
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

  it('throw /(?=[^\\x4f-\\xF5(-)])/imy', () => {
    t.deepEqual(parseScript('throw /(?=[^\\x4f-\\xF5(-)])/imy', { loc: true }), {
      directives: [],
      end: 30,
      start: 0,
      leafs: [
        {
          end: 30,
          expression: {
            end: 30,
            flag: 'imy',
            pattern: '(?=[^\\x4f-\\xF5(-)])',
            start: 6,
            type: 'RegularExpressionLiteral'
          },
          start: 0,
          type: 'ThrowStatement'
        }
      ],
      type: 'Script'
    });
  });

  it(`function f() { do throw pass
    while(x);
  }`, () => {
    t.deepEqual(
      parseScript(
        `function f() { do throw pass
      while(x);
    }`,
        { loc: true }
      ),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'f',
              start: 9,
              end: 10
            },
            generator: false,
            async: false,
            params: [],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [
                {
                  type: 'DoWhileStatement',
                  expression: {
                    type: 'IdentifierReference',

                    name: 'x',
                    start: 41,
                    end: 42
                  },
                  statement: {
                    type: 'ThrowStatement',
                    expression: {
                      type: 'IdentifierReference',

                      name: 'pass',
                      start: 24,
                      end: 28
                    },
                    start: 18,
                    end: 28
                  },
                  start: 15,
                  end: 44
                }
              ],
              start: 13,
              end: 50
            },
            start: 0,
            end: 50
          }
        ],
        start: 0,
        end: 50
      }
    );
  });

  it('throw foo;', () => {
    t.deepEqual(parseScript('throw foo;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'foo',
            start: 6,
            end: 9
          },
          start: 0,
          end: 10
        }
      ],
      start: 0,
      end: 10
    });
  });

  it('throw 12', () => {
    t.deepEqual(parseScript('throw 12', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'NumericLiteral',
            value: 12,
            start: 6,
            end: 8
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });

  it('throw x * y', () => {
    t.deepEqual(parseScript('throw x * y', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',

              name: 'x',
              start: 6,
              end: 7
            },
            operator: '*',
            right: {
              type: 'IdentifierReference',

              name: 'y',
              start: 10,
              end: 11
            },
            start: 6,
            end: 11
          },
          start: 0,
          end: 11
        }
      ],
      start: 0,
      end: 11
    });
  });
});
