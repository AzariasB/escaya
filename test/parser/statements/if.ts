import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - If', () => {
  // Invalid cases
  for (const arg of [
    'if();',
    'if (1) let x = 10;',
    'if (true) const x = null;',
    '"use strict"; if (true) function f() {  } else function _f() {}',
    '"use strict"; if (true) function f() {  } else function _f() {}',
    'if (false) ; else class C {}',
    'if (true) let x; else let y;',
    'if(!("A"))',
    'if(!(1))',
    'if(!(true))',
    'if (x); else foo: bar: function f(){}',
    'if true;',
    'if (true) class C {} else class D {}',
    'with ({}) b: function a(){}'
    //'if (x) async function f(){}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  // Valid cases
  for (const arg of [
    'if (/(?:)/gimuy) debugger;',
    `if (x) var foo = 1; var foo = 1;`,
    `if (yield === void 0) { async = false; }`,
    `function f() { if (1) { return () => { while (true) hi(); } } }`,
    `if(1)/  foo/`,
    `if (foo) a; if (bar) b; else c;`,
    `if (a > 2) {b = c }`,
    `if(foo) a = b;`,
    `if (a) function a(){}`,
    `if (foo) bar; else doo;`,
    `if (a) b()`,
    `if(a)b;else c;`,
    `if (1) { eval(42) }`,
    `if (true) if (false) {} else ; else {}`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('if(a) {}', () => {
    t.deepEqual(parseScript('if(a) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a'
          },
          consequent: {
            type: 'BlockStatement',
            statements: []
          },
          alternate: null
        }
      ],
      webCompat: true
    });
  });

  it('if (a > 2) {b = c }', () => {
    t.deepEqual(parseScript('if (a > 2) {b = c }'), {
      directives: [],
      leafs: [
        {
          alternate: null,
          consequent: {
            statements: [
              {
                expression: {
                  left: {
                    name: 'b',
                    type: 'IdentifierReference'
                  },
                  right: {
                    name: 'c',
                    type: 'IdentifierReference'
                  },
                  operator: '=',
                  type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
              }
            ],
            type: 'BlockStatement'
          },
          expression: {
            left: {
              name: 'a',
              type: 'IdentifierReference'
            },
            operator: '>',
            right: {
              type: 'NumericLiteral',
              value: 2
            },
            type: 'BinaryExpression'
          },
          type: 'IfStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('if(x) {} else y;', () => {
    t.deepEqual(parseScript('if(x) {} else y;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x'
          },
          consequent: {
            type: 'BlockStatement',
            statements: []
          },
          alternate: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'y'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('if (x) var foo = 1; var foo = 1;', () => {
    t.deepEqual(parseScript('if (x) var foo = 1; var foo = 1;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x'
          },
          consequent: {
            type: 'VariableStatement',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'foo'
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1
                }
              }
            ]
          },
          alternate: null
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'foo'
              },
              initializer: {
                type: 'NumericLiteral',
                value: 1
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('function f() { if (1) { return () => { while (true) hi(); } } }', () => {
    t.deepEqual(parseScript('function f() { if (1) { return () => { while (true) hi(); } } }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f'
          },
          params: { leafs: [], type: 'FormalParameters' },
          contents: {
            type: 'FunctionBody',
            statements: [
              {
                type: 'IfStatement',
                expression: {
                  type: 'NumericLiteral',
                  value: 1
                },
                consequent: {
                  type: 'BlockStatement',
                  statements: [
                    {
                      type: 'ReturnStatement',
                      expression: {
                        type: 'ArrowFunction',
                        params: [],
                        contents: {
                          type: 'FunctionBody',
                          statements: [
                            {
                              type: 'WhileStatement',
                              expression: {
                                type: 'BooleanLiteral',
                                value: true
                              },
                              statement: {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'CallExpression',
                                  expression: {
                                    type: 'IdentifierReference',
                                    name: 'hi'
                                  },
                                  arguments: []
                                }
                              }
                            }
                          ],
                          directives: []
                        },
                        async: false
                      }
                    }
                  ]
                },
                alternate: null
              }
            ],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });

  it('if (foo) a; if (bar) b; else c;', () => {
    t.deepEqual(parseScript('if (foo) a; if (bar) b; else c;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo'
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'a'
            }
          },
          alternate: null
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'bar'
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'b'
            }
          },
          alternate: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'c'
            }
          }
        }
      ],
      webCompat: true
    });
  });
});
