import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - While', () => {
  // Invalid cases
  for (const arg of [
    'while 1 break;',
    'while "hood" break;',
    `while '' break;`,
    'while(0) { function f(){ break; } }',
    'while (false) label1: label2: function f() {}',
    'while (false) const x = null;',
    'while (false) function* g() {}',
    'while({1}){ break ; };',
    'while({1}){ break ; };',
    'while (function* () {} += x);'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  // Valid cases
  for (const arg of [
    'while (foo) bar;',
    'while (function* () {} === x);',
    'while ((/(?!$\\x92$)/gimy)){}',
    'while(/a/) { /b/ }',
    'while(/a/)  /b/ ',
    'while (/["-{-]/gmuy[true] >>>= (((2e308)))) {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('while({}){}', () => {
    t.deepEqual(parseScript('while({}){}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: []
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

  it('while(1)  {}', () => {
    t.deepEqual(parseScript('while(1)  {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1
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

  it('while (a<5) {}', () => {
    t.deepEqual(parseScript('while (a<5) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            right: {
              type: 'NumericLiteral',
              value: 5
            },
            operator: '<'
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

  it('while(1===1) {}', () => {
    t.deepEqual(parseScript('while(1===1) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'NumericLiteral',
              value: 1
            },
            right: {
              type: 'NumericLiteral',
              value: 1
            },
            operator: '==='
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
  /*
  it(`while (false) let // ASI
  x = 1;`, () => {
    t.deepEqual(
      parseScript(
        `while (false) let // ASI
    x = 1;`
      ),
      {
        directives: [],
        leafs: [
          {
            expression: {
              type: 'BooleanLiteral',
              value: false
            },
            statement: {
              expression: {
                name: 'let',
                type: 'IdentifierReference'
              },
              type: 'ExpressionStatement'
            },
            type: 'WhileStatement'
          },
          {
            expression: {
              binding: {
                name: 'x',
                type: 'IdentifierReference'
              },
              expression: {
                type: 'NumericLiteral',
                value: 1
              },
              operator: '=',
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        type: 'Script',
        webCompat: true
      }
    );
  });
*/
  it('while (i-->1) {}', () => {
    t.deepEqual(parseScript('while (i-->1) {}'), {
      directives: [],
      leafs: [
        {
          expression: {
            left: {
              operand: {
                name: 'i',
                type: 'IdentifierReference'
              },
              operator: '--',
              type: 'PostfixUpdateExpression'
            },
            operator: '>',
            right: {
              type: 'NumericLiteral',
              value: 1
            },
            type: 'BinaryExpression'
          },
          statement: {
            statements: [],
            type: 'BlockStatement'
          },
          type: 'WhileStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('a: while (true) continue a;', () => {
    t.deepEqual(parseScript('a: while (true) continue a;'), {
      directives: [],
      leafs: [
        {
          label: {
            name: 'a',
            type: 'LabelIdentifier'
          },
          labelledItem: {
            expression: {
              type: 'BooleanLiteral',
              value: true
            },
            statement: {
              label: {
                name: 'a',
                type: 'LabelIdentifier'
              },
              type: 'ContinueStatement'
            },
            type: 'WhileStatement'
          },
          type: 'LabelledStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('while (this) try {} catch (h) {}', () => {
    t.deepEqual(parseScript('while (this) try {} catch (h) {}'), {
      directives: [],
      leafs: [
        {
          expression: {
            type: 'ThisExpression'
          },
          statement: {
            block: {
              statements: [],
              type: 'BlockStatement'
            },
            catchClause: {
              binding: {
                name: 'h',
                type: 'BindingIdentifier'
              },
              block: {
                statements: [],
                type: 'BlockStatement'
              },
              type: 'CatchClause'
            },
            finalizer: null,
            type: 'TryStatement'
          },
          type: 'WhileStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
  it('while (foo) bar;', () => {
    t.deepEqual(parseScript('while (foo) bar;'), {
      directives: [],
      leafs: [
        {
          expression: {
            name: 'foo',
            type: 'IdentifierReference'
          },
          statement: {
            expression: {
              name: 'bar',
              type: 'IdentifierReference'
            },
            type: 'ExpressionStatement'
          },
          type: 'WhileStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('while (x < 10) { x++; y--; }', () => {
    t.deepEqual(parseScript('while (x < 10) { x++; y--; }'), {
      directives: [],
      leafs: [
        {
          expression: {
            left: {
              name: 'x',
              type: 'IdentifierReference'
            },
            operator: '<',
            right: {
              type: 'NumericLiteral',
              value: 10
            },
            type: 'BinaryExpression'
          },
          statement: {
            statements: [
              {
                expression: {
                  operand: {
                    name: 'x',
                    type: 'IdentifierReference'
                  },
                  operator: '++',
                  type: 'PostfixUpdateExpression'
                },
                type: 'ExpressionStatement'
              },
              {
                expression: {
                  operand: {
                    name: 'y',
                    type: 'IdentifierReference'
                  },
                  operator: '--',
                  type: 'PostfixUpdateExpression'
                },
                type: 'ExpressionStatement'
              }
            ],
            type: 'BlockStatement'
          },
          type: 'WhileStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
