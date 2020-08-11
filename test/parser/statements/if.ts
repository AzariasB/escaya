import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - If', () => {
  // Invalid cases
  for (const arg of [
    'if/("',
    'if\nx else;',
    'if\nelse /x/g',
    'if\n else',
    'if else',
    'if catch else',
    'if(x) { case y: {...x} } else',
    'if(x) { case y: foo /a/ } else',
    'if(x) { case y:{ class { x() {} } } else }',
    'if({x=y}) { case y: [...a] else }'
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
    'if (/(?:)/gimuy) debugger;',
    `if (yield === void 0) { async = false; }`,
    `function f() { if (1) { return () => { while (true) hi(); } } }`,
    `if(1)/  foo/`,
    `if (foo) a; if (bar) b; else c;`,
    `if (a > 2) {b = c }`,
    `if(foo) a = b;`,
    `if (a) function a(){}`,
    `if (a) b()`,
    `if(a)b;else c;`,
    'if (++a);',
    'if (a) --a;',
    `if (1) { eval(42) }`,
    `if (true) if (false) {} else ; else {}`
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

  it('if (x) let: y;', () => {
    t.deepEqual(parseScript('if (x) let: y;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 4,
            end: 5
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'LabelledStatement',
              label: {
                type: 'LabelIdentifier',

                name: 'let',
                start: 7,
                end: 11
              },
              labelledItem: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',

                  name: 'y',
                  start: 12,
                  end: 13
                },
                start: 12,
                end: 14
              },
              start: 7,
              end: 14
            },
            start: 7,
            end: 14
          },
          alternate: null,
          start: 0,
          end: 14
        }
      ],
      start: 0,
      end: 14
    });
  });

  it('if (x) var foo = 1; var foo = 1;', () => {
    t.deepEqual(parseScript('if (x) var foo = 1; var foo = 1;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 4,
            end: 5
          },
          consequent: {
            type: 'VariableStatement',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'foo',
                  start: 11,
                  end: 14
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 17,
                  end: 18
                },
                start: 11,
                end: 18
              }
            ],
            start: 7,
            end: 19
          },
          alternate: null,
          start: 0,
          end: 19
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'foo',
                start: 24,
                end: 27
              },
              initializer: {
                type: 'NumericLiteral',
                value: 1,
                start: 30,
                end: 31
              },
              start: 24,
              end: 31
            }
          ],
          start: 20,
          end: 32
        }
      ],
      start: 0,
      end: 32
    });
  });

  it('if (yield === void 0) { foo = false; }', () => {
    t.deepEqual(parseScript('if (yield === void 0) { foo = false; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 4,
              end: 9
            },
            operator: '===',
            right: {
              type: 'UnaryExpression',
              operator: 'void',
              operand: {
                type: 'NumericLiteral',
                value: 0,
                start: 19,
                end: 20
              },
              start: 14,
              end: 20
            },
            start: 4,
            end: 20
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'foo',
                    start: 24,
                    end: 27
                  },
                  operator: '=',
                  right: {
                    type: 'BooleanLiteral',
                    value: false,
                    start: 30,
                    end: 35
                  },
                  start: 24,
                  end: 35
                },
                start: 24,
                end: 36
              }
            ],
            start: 22,
            end: 38
          },
          alternate: null,
          start: 0,
          end: 38
        }
      ],
      start: 0,
      end: 38
    });
  });

  it('if (yield === void 0) { async = false; }', () => {
    t.deepEqual(parseScript('if (yield === void 0) { async = false; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 4,
              end: 9
            },
            operator: '===',
            right: {
              type: 'UnaryExpression',
              operator: 'void',
              operand: {
                type: 'NumericLiteral',
                value: 0,
                start: 19,
                end: 20
              },
              start: 14,
              end: 20
            },
            start: 4,
            end: 20
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'async',
                    start: 24,
                    end: 29
                  },
                  operator: '=',
                  right: {
                    type: 'BooleanLiteral',
                    value: false,
                    start: 32,
                    end: 37
                  },
                  start: 24,
                  end: 37
                },
                start: 24,
                end: 38
              }
            ],
            start: 22,
            end: 40
          },
          alternate: null,
          start: 0,
          end: 40
        }
      ],
      start: 0,
      end: 40
    });
  });

  it('if(1)/  foo/', () => {
    t.deepEqual(parseScript('if(1)/  foo/', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 3,
            end: 4
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: '  foo',
              flag: '',
              start: 5,
              end: 12
            },
            start: 5,
            end: 12
          },
          alternate: null,
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('if (foo) a; if (bar) b; else c;', () => {
    t.deepEqual(parseScript('if (foo) a; if (bar) b; else c;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'foo',
            start: 4,
            end: 7
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'a',
              start: 9,
              end: 10
            },
            start: 9,
            end: 11
          },
          alternate: null,
          start: 0,
          end: 11
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'bar',
            start: 16,
            end: 19
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'b',
              start: 21,
              end: 22
            },
            start: 21,
            end: 23
          },
          alternate: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'c',
              start: 29,
              end: 30
            },
            start: 29,
            end: 31
          },
          start: 12,
          end: 31
        }
      ],
      start: 0,
      end: 31
    });
  });

  it('if (a > 2) {b = c }', () => {
    t.deepEqual(parseScript('if (a > 2) {b = c }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 4,
              end: 5
            },
            operator: '>',
            right: {
              type: 'NumericLiteral',
              value: 2,
              start: 8,
              end: 9
            },
            start: 4,
            end: 9
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 12,
                    end: 13
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 16,
                    end: 17
                  },
                  start: 12,
                  end: 17
                },
                start: 12,
                end: 17
              }
            ],
            start: 11,
            end: 19
          },
          alternate: null,
          start: 0,
          end: 19
        }
      ],
      start: 0,
      end: 19
    });
  });

  it('if(foo) a = b;', () => {
    t.deepEqual(parseScript('if(foo) a = b;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'foo',
            start: 3,
            end: 6
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',

                name: 'a',
                start: 8,
                end: 9
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',

                name: 'b',
                start: 12,
                end: 13
              },
              start: 8,
              end: 13
            },
            start: 8,
            end: 14
          },
          alternate: null,
          start: 0,
          end: 14
        }
      ],
      start: 0,
      end: 14
    });
  });

  it('if (foo) bar; else doo;', () => {
    t.deepEqual(parseScript('if (foo) bar; else doo;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'foo',
            start: 4,
            end: 7
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'bar',
              start: 9,
              end: 12
            },
            start: 9,
            end: 13
          },
          alternate: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'doo',
              start: 19,
              end: 22
            },
            start: 19,
            end: 23
          },
          start: 0,
          end: 23
        }
      ],
      start: 0,
      end: 23
    });
  });

  it('if(a)b;else c;', () => {
    t.deepEqual(parseScript('if(a)b;else c;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'a',
            start: 3,
            end: 4
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'b',
              start: 5,
              end: 6
            },
            start: 5,
            end: 7
          },
          alternate: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'c',
              start: 12,
              end: 13
            },
            start: 12,
            end: 14
          },
          start: 0,
          end: 14
        }
      ],
      start: 0,
      end: 14
    });
  });

  it('if (true) if (false) {} else ; else {}', () => {
    t.deepEqual(parseScript('if (true) if (false) {} else ; else {}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 4,
            end: 8
          },
          consequent: {
            type: 'IfStatement',
            expression: {
              type: 'BooleanLiteral',
              value: false,
              start: 14,
              end: 19
            },
            consequent: {
              type: 'BlockStatement',
              leafs: [],
              start: 21,
              end: 23
            },
            alternate: {
              type: 'EmptyStatement',
              start: 29,
              end: 30
            },
            start: 10,
            end: 30
          },
          alternate: {
            type: 'BlockStatement',
            leafs: [],
            start: 36,
            end: 38
          },
          start: 0,
          end: 38
        }
      ],
      start: 0,
      end: 38
    });
  });
});
