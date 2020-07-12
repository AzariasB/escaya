import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Block', () => {
  // Invalid cases
  for (const arg of ['{', '}', '{ (x = [await x]) }']) {
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
    '{a}',
    '{ function let(){} }',
    '{ (x = [yield]) }',
    '{ (x = [yield]) => z }',
    'function f() {let f}',
    '"use strict"; { function f() {} function f() {} }',
    'var x; { let x; }',
    'let f = 123; switch (1) { default: function f() {  }  }',
    '{ let f = 123; { function f() {  } } }',
    '{ let x; } var x',
    'function fn() {}{x: 42};;',
    '{}/1/;;',
    'function f() {let f}',
    '{ function *f(){} } function *f(){}',
    'function f(){} function f(){}',
    '{ function f(){} } function f(){}',
    `{}
  /foo/`,
    `{
    let result;
    let x = 1;
    switch (x) {
      case 1:
        let x = 2;
        result = x;
        break;
      default:
        result = 0;
        break;
    }
  }`,
    '{ function* f() {} function* f() {} }',
    'try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }',
    '{ function f() { a = f; f = 123; b = f; return x; } }',
    'function x() { { var f; var f } }',
    '{ { var f; } var f }',
    '{ function f() {} async function* f() {} }',
    '{ function f() {} ; function f() {} }',
    '{ if (x) function f() {} ; function f() {} }',
    '{ async function f(){} } async function f(){}',
    '{ var f; var f; }',
    '{ let x }',
    '{ (x = [await]) }',
    '{\u2000\u2006\ufeff\u3000\u3000\u3000\u3000\u205f;  \n}',
    'function fn() {}{x: 42};',
    'function fn() {}let a, b = 42, c;b;;',
    `function f(){
    return
    /x/
  }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('Empty block', () => {
    t.deepEqual(parseScript('{}'), {
      directives: [],
      leafs: [
        {
          statements: [],
          type: 'BlockStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Block with regular expression (ASI)', () => {
    t.deepEqual(
      parseScript(`{}
    /foo/`),
      {
        directives: [],
        leafs: [
          {
            statements: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              flags: '',
              pattern: 'foo',
              type: 'RegularExpressionLiteral'
            },
            type: 'ExpressionStatement'
          }
        ],
        type: 'Script',
        webCompat: true
      }
    );
  });

  it('Block with simple "IdentifierReference"', () => {
    t.deepEqual(parseScript('{a}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          statements: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'a'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('Variable statement with block with lexical declaration', () => {
    t.deepEqual(parseScript('var x; { let x; }'), {
      directives: [],
      leafs: [
        {
          declarations: [
            {
              binding: {
                name: 'x',
                type: 'BindingIdentifier'
              },
              initializer: null,
              type: 'VariableDeclaration'
            }
          ],
          type: 'VariableStatement'
        },
        {
          statements: [
            {
              declarations: [
                {
                  binding: {
                    name: 'x',
                    type: 'BindingIdentifier'
                  },
                  initializer: null,
                  type: 'LexicalBinding'
                }
              ],
              kind: 'let',
              type: 'LexicalDeclaration'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Block with lexical declaration and variable statement', () => {
    t.deepEqual(parseScript('{ let x; } var x'), {
      directives: [],
      leafs: [
        {
          statements: [
            {
              declarations: [
                {
                  binding: {
                    name: 'x',
                    type: 'BindingIdentifier'
                  },
                  initializer: null,
                  type: 'LexicalBinding'
                }
              ],
              kind: 'let',
              type: 'LexicalDeclaration'
            }
          ],
          type: 'BlockStatement'
        },
        {
          declarations: [
            {
              binding: {
                name: 'x',
                type: 'BindingIdentifier'
              },
              initializer: null,
              type: 'VariableDeclaration'
            }
          ],
          type: 'VariableStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Block with function declaration and let as identifier', () => {
    t.deepEqual(parseScript('{ function let(){} }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          statements: [
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'let'
              },
              params: { leafs: [], type: 'FormalParameters' },
              contents: {
                type: 'FunctionBody',
                statements: [],
                directives: []
              },
              async: false,
              generator: false
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('Block with debugger and ASI', () => {
    t.deepEqual(parseScript('{debugger}'), {
      directives: [],
      leafs: [
        {
          statements: [
            {
              type: 'DebuggerStatement'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
