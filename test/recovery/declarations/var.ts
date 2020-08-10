import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Var', () => {
  it('Unclosed block statement', () => {
    t.deepEqual(recovery('var', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [],
          start: 0,
          end: 3,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('Unclosed block statement2342', () => {
    t.deepEqual(recovery('var !', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [],
          start: 0,
          end: 3,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 5,
              end: 5,
              flags: 2
            },
            start: 3,
            end: 5,
            kind: 160,
            flags: 0
          },
          start: 3,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statement4235', () => {
    t.deepEqual(recovery('var {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [],
                start: 3,
                end: 5,
                kind: 169,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 5,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statementsdfa', () => {
    t.deepEqual(recovery('{var', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'VariableStatement',
              declarations: [],
              start: 1,
              end: 4,
              kind: 143,
              flags: 0
            }
          ],
          start: 0,
          end: 4,
          kind: 123,
          flags: 0
        }
      ],
      text: '{var',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 1,
          length: 3
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statemendfsft', () => {
    t.deepEqual(recovery('{var x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 4,
                    end: 6,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 4,
                  end: 6,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
              kind: 143,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 123,
          flags: 0
        }
      ],
      text: '{var x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 5,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('{ var x(,,,,,,,,,,,,,,,,,,,,,,,,,,,, a , b !![', () => {
    t.deepEqual(recovery('{ var x(,,,,,,,,,,,,,,,,,,,,,,,,,,,, a , b !![', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 5,
                    end: 7,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 7,
              kind: 143,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 9,
                      end: 9,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 11,
                      end: 11,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 13,
                      end: 13,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 15,
                      end: 15,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 17,
                      end: 17,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 19,
                      end: 19,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 21,
                      end: 21,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 23,
                      end: 23,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 25,
                      end: 25,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 27,
                      end: 27,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 29,
                      end: 29,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 31,
                      end: 31,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 33,
                      end: 33,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 35,
                      end: 35,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 36,
                      end: 38,
                      kind: 13,
                      flags: 0
                    },
                    {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 40,
                      end: 42,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 7,
                  end: 42,
                  kind: 147,
                  flags: 0
                },
                start: 7,
                end: 42,
                kind: 189,
                flags: 0
              },
              start: 7,
              end: 42,
              kind: 122,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'ArrayLiteral',
                    kind: 178,
                    elements: [],
                    start: 45,
                    end: 46,
                    flags: 0
                  },
                  start: 44,
                  end: 46,
                  kind: 160,
                  flags: 0
                },
                start: 42,
                end: 46,
                kind: 160,
                flags: 0
              },
              start: 42,
              end: 46,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 46,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ var x(,,,,,,,,,,,,,,,,,,,,,,,,,,,, a , b !![',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 27,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 29,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 31,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 33,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 35,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 43,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 45,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 46,
        end: 46
      },
      start: 0,
      length: 46,
      end: 46
    });
  });

  it('Unclosed block statementasdf', () => {
    t.deepEqual(recovery('{,var', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 1,
          kind: 123,
          flags: 0
        },
        {
          type: 'VariableStatement',
          declarations: [],
          start: 2,
          end: 5,
          kind: 143,
          flags: 0
        }
      ],
      text: '{,var',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 1,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statementadsf', () => {
    t.deepEqual(recovery('{var y = b ; /', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'y',
                    start: 4,
                    end: 6,
                    kind: 168,
                    flags: 0
                  },
                  initializer: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 8,
                    end: 10,
                    kind: 13,
                    flags: 0
                  },
                  start: 4,
                  end: 10,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 143,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                operator: '/',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 14,
                  end: 14,
                  kind: 13,
                  flags: 2
                },
                start: 12,
                end: 14,
                kind: 155,
                flags: 0
              },
              start: 12,
              end: 14,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 14,
          kind: 123,
          flags: 0
        }
      ],
      text: '{var y = b ; /',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 13,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 14,
        end: 14
      },
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('Unclosed block statement234765', () => {
    t.deepEqual(recovery('var/{', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 12,
          kind: 2,
          length: 2,
          message: 'Unterminated regular expression',
          source: 0,
          start: 3
        }
      ],
      directives: [],
      end: 5,
      EOF: {
        end: 5,
        kind: 16384,
        start: 5,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 5,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          declarations: [],
          end: 3,
          flags: 0,
          kind: 143,
          start: 0,
          type: 'VariableStatement'
        },
        {
          end: 5,
          expression: {
            end: 5,
            flag: '',
            flags: 0,
            kind: 15,
            pattern: '',
            start: 3,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,
          kind: 122,
          start: 3,
          type: 'ExpressionStatement'
        }
      ],
      text: 'var/{'
    });
  });

  it('var [a, ,, b/, b=, ...a', () => {
    t.deepEqual(recovery('var [a, ,, b/, b=, ...a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 5,
                    end: 6,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'Elison',
                    start: 3,
                    end: 9,
                    kind: 176,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'b',
                    start: 10,
                    end: 12,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: '',
                    start: 12,
                    end: 13,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'b',
                      start: 14,
                      end: 16,
                      kind: 168,
                      flags: 0
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 18,
                      end: 18,
                      kind: 13,
                      flags: 2
                    },
                    start: 14,
                    end: 18,
                    kind: 172,
                    flags: 0
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 22,
                      end: 23,
                      kind: 168,
                      flags: 0
                    },
                    start: 18,
                    end: 23,
                    kind: 175,
                    flags: 0
                  }
                ],
                start: 3,
                end: 23,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 23,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 23,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var [a, ,, b/, b=, ...a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 22,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 23,
        end: 23
      },
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('var o = {one: function() {} two:2};', () => {
    t.deepEqual(recovery('var o = {one: function() {} two:2};', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'o',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'one',
                      start: 9,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: {
                        type: 'BindingIdentifier',
                        name: '',
                        start: 22,
                        end: 22,
                        kind: 168,
                        flags: 0
                      },
                      generator: false,
                      async: false,
                      params: [],
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 24,
                        end: 27,
                        kind: 184,
                        flags: 0
                      },
                      start: 13,
                      end: 27,
                      kind: 185,
                      flags: 0
                    },
                    start: 9,
                    end: 27,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'two',
                      start: 27,
                      end: 32,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 32,
                      end: 33,
                      kind: 10,
                      flags: 0
                    },
                    start: 27,
                    end: 33,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 7,
                end: 34,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 34,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 35,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var o = {one: function() {} two:2};',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Expected an identifier',
          code: 20,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 3
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 35,
        end: 35
      },
      start: 0,
      length: 35,
      end: 35
    });
  });
  it('var o = {one: function() {} two:2 three: 3};', () => {
    t.deepEqual(recovery('var o = {one: function() {} two:2 three: 3};', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'o',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'one',
                      start: 9,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: {
                        type: 'BindingIdentifier',
                        name: '',
                        start: 22,
                        end: 22,
                        kind: 168,
                        flags: 0
                      },
                      generator: false,
                      async: false,
                      params: [],
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 24,
                        end: 27,
                        kind: 184,
                        flags: 0
                      },
                      start: 13,
                      end: 27,
                      kind: 185,
                      flags: 0
                    },
                    start: 9,
                    end: 27,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'two',
                      start: 27,
                      end: 32,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 32,
                      end: 33,
                      kind: 10,
                      flags: 0
                    },
                    start: 27,
                    end: 33,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'three',
                      start: 33,
                      end: 40,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 3,
                      start: 40,
                      end: 42,
                      kind: 10,
                      flags: 0
                    },
                    start: 33,
                    end: 42,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 7,
                end: 43,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 43,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 44,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var o = {one: function() {} two:2 three: 3};',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Expected an identifier',
          code: 20,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 34,
          length: 5
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 44,
        end: 44
      },
      start: 0,
      length: 44,
      end: 44
    });
  });
  it('var o = {one: function() {} two:2, three: 3 "four":4};', () => {
    t.deepEqual(recovery('var o = {one: function() {} two:2, three: 3 "four":4};', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'o',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'one',
                      start: 9,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: {
                        type: 'BindingIdentifier',
                        name: '',
                        start: 22,
                        end: 22,
                        kind: 168,
                        flags: 0
                      },
                      generator: false,
                      async: false,
                      params: [],
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 24,
                        end: 27,
                        kind: 184,
                        flags: 0
                      },
                      start: 13,
                      end: 27,
                      kind: 185,
                      flags: 0
                    },
                    start: 9,
                    end: 27,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'two',
                      start: 27,
                      end: 32,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 32,
                      end: 33,
                      kind: 10,
                      flags: 0
                    },
                    start: 27,
                    end: 33,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'three',
                      start: 34,
                      end: 41,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 3,
                      start: 41,
                      end: 43,
                      kind: 10,
                      flags: 0
                    },
                    start: 34,
                    end: 43,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'StringLiteral',
                      value: 'four',
                      start: 43,
                      end: 50,
                      kind: 12,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 4,
                      start: 51,
                      end: 52,
                      kind: 10,
                      flags: 0
                    },
                    start: 43,
                    end: 52,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 7,
                end: 53,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 53,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 54,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var o = {one: function() {} two:2, three: 3 "four":4};',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Expected an identifier',
          code: 20,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 44,
          length: 6
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 54,
        end: 54
      },
      start: 0,
      length: 54,
      end: 54
    });
  });
  it('var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};', () => {
    t.deepEqual(recovery('var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'o',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'one',
                      start: 9,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: {
                        type: 'BindingIdentifier',
                        name: '',
                        start: 22,
                        end: 22,
                        kind: 168,
                        flags: 0
                      },
                      generator: false,
                      async: false,
                      params: [],
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 24,
                        end: 27,
                        kind: 184,
                        flags: 0
                      },
                      start: 13,
                      end: 27,
                      kind: 185,
                      flags: 0
                    },
                    start: 9,
                    end: 27,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'two',
                      start: 27,
                      end: 32,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 32,
                      end: 33,
                      kind: 10,
                      flags: 0
                    },
                    start: 27,
                    end: 33,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'three',
                      start: 34,
                      end: 41,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'ObjectLiteral',
                      properties: [
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'IdentifierName',
                            name: 'aa',
                            start: 43,
                            end: 46,
                            kind: 13,
                            flags: 0
                          },
                          value: {
                            type: 'StringLiteral',
                            value: 'a',
                            start: 46,
                            end: 50,
                            kind: 12,
                            flags: 0
                          },
                          start: 43,
                          end: 50,
                          kind: 227,
                          flags: 0
                        },
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'IdentifierName',
                            name: 'bb',
                            start: 50,
                            end: 54,
                            kind: 13,
                            flags: 0
                          },
                          value: {
                            type: 'StringLiteral',
                            value: 'b',
                            start: 54,
                            end: 58,
                            kind: 12,
                            flags: 0
                          },
                          start: 50,
                          end: 58,
                          kind: 227,
                          flags: 0
                        }
                      ],
                      start: 41,
                      end: 59,
                      kind: 179,
                      flags: 0
                    },
                    start: 34,
                    end: 59,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'four',
                      start: 59,
                      end: 65,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 4,
                      start: 65,
                      end: 67,
                      kind: 10,
                      flags: 0
                    },
                    start: 59,
                    end: 67,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 7,
                end: 68,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 68,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 69,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Expected an identifier',
          code: 20,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 51,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 60,
          length: 4
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 69,
        end: 69
      },
      start: 0,
      length: 69,
      end: 69
    });
  });
  it('Unclosed block statement0987324', () => {
    t.deepEqual(recovery('{var let foo const try const = finally', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'let',
                    start: 4,
                    end: 8,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 4,
                  end: 8,
                  kind: 144,
                  flags: 0
                },
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'foo',
                    start: 8,
                    end: 12,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 8,
                  end: 12,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 143,
              flags: 0
            },
            {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [],
              start: 12,
              end: 18,
              kind: 145,
              flags: 0
            },
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 22,
                end: 22,
                kind: 123,
                flags: 0
              },
              catchClause: null,
              finalizer: null,
              start: 18,
              end: 22,
              kind: 138,
              flags: 0
            },
            {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [],
              start: 22,
              end: 28,
              kind: 145,
              flags: 0
            }
          ],
          start: 0,
          end: 28,
          kind: 123,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 30,
            end: 30,
            kind: 123,
            flags: 0
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 38,
            end: 38,
            kind: 123,
            flags: 0
          },
          start: 30,
          end: 38,
          kind: 138,
          flags: 0
        }
      ],
      text: '{var let foo const try const = finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 9,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 13,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 23,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 29,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 31,
          length: 7
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 38,
        end: 38
      },
      start: 0,
      length: 38,
      end: 38
    });
  });
});
