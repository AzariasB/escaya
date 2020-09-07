import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Var', () => {
  it('var', () => {
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('var /a/', () => {
    t.deepEqual(recovery('var /a/', 'recovery.js'), {
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
            type: 'RegularExpressionLiteral',
            pattern: 'a',
            flag: '',
            start: 3,
            end: 7,
            kind: 15,
            flags: 0
          },
          start: 3,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var /a/',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 4,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('var / a', () => {
    t.deepEqual(recovery('var / a', 'recovery.js'), {
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
            type: 'RegularExpressionLiteral',
            pattern: ' ',
            flag: '',
            start: 3,
            end: 7,
            kind: 15,
            flags: 0
          },
          start: 3,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var / a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 4,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('var !', () => {
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
              name: '',
              start: 5,
              end: 5,
              kind: 13,
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
          message: '`;` expected',
          code: 92,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('var {', () => {
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('{var', () => {
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('{var x', () => {
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
      incremental: false,
      parent: null,
      children: [],
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
                      start: 8,
                      end: 8,
                      kind: 13,
                      flags: 2
                    },
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
                      start: 10,
                      end: 10,
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
                      start: 12,
                      end: 12,
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
                      start: 14,
                      end: 14,
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
                      start: 16,
                      end: 16,
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
                      start: 18,
                      end: 18,
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
                      start: 20,
                      end: 20,
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
                      start: 22,
                      end: 22,
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
                      start: 24,
                      end: 24,
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
                      start: 26,
                      end: 26,
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
                      start: 28,
                      end: 28,
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
                      start: 30,
                      end: 30,
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
                      start: 32,
                      end: 32,
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
                      start: 34,
                      end: 34,
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
          message: 'Variable declaration expected',
          code: 116,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
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
          start: 10,
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
          start: 12,
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
          start: 14,
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
          start: 16,
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
          start: 18,
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
          start: 20,
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
          start: 22,
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
          start: 24,
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
          start: 26,
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
          start: 28,
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
          start: 30,
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
          start: 32,
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
          start: 34,
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 46,
      end: 46
    });
  });

  it('var b = new B; // no error', () => {
    t.deepEqual(recovery('var b = new B; // no error', 'recovery.js'), {
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
                name: 'b',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'NewExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'B',
                  start: 11,
                  end: 13,
                  kind: 13,
                  flags: 0
                },
                arguments: [],
                start: 7,
                end: 13,
                kind: 163,
                flags: 0
              },
              start: 3,
              end: 13,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 14,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var b = new B; // no error',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it(`var v = { foo: function () {
  }, a: b, get baz() {
  } };`, () => {
    t.deepEqual(
      recovery(
        `var v = { foo: function () {
    }, a: b, get baz() {
    } };`,
        'recovery.js'
      ),
      {
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
                  name: 'v',
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
                        name: 'foo',
                        start: 9,
                        end: 13,
                        kind: 13,
                        flags: 0
                      },
                      value: {
                        type: 'FunctionExpression',
                        name: null,
                        generator: false,
                        async: false,
                        params: [],
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 26,
                          end: 34,
                          kind: 184,
                          flags: 0
                        },
                        start: 14,
                        end: 34,
                        kind: 185,
                        flags: 0
                      },
                      start: 9,
                      end: 34,
                      kind: 227,
                      flags: 0
                    },
                    {
                      type: 'PropertyName',
                      key: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 35,
                        end: 37,
                        kind: 13,
                        flags: 0
                      },
                      value: {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 38,
                        end: 40,
                        kind: 13,
                        flags: 0
                      },
                      start: 35,
                      end: 40,
                      kind: 227,
                      flags: 0
                    },
                    {
                      type: 'MethodDefinition',
                      async: false,
                      generator: false,
                      getter: true,
                      setter: false,
                      propertySetParameterList: null,
                      uniqueFormalParameters: [],
                      name: {
                        type: 'IdentifierName',
                        name: 'baz',
                        start: 45,
                        end: 49,
                        kind: 13,
                        flags: 0
                      },
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 51,
                        end: 59,
                        kind: 184,
                        flags: 0
                      },
                      start: 49,
                      end: 59,
                      kind: 182,
                      flags: 0
                    }
                  ],
                  start: 7,
                  end: 61,
                  kind: 179,
                  flags: 0
                },
                start: 3,
                end: 61,
                kind: 144,
                flags: 0
              }
            ],
            start: 0,
            end: 62,
            kind: 143,
            flags: 0
          }
        ],
        text: 'var v = { foo: function () {\n    }, a: b, get baz() {\n    } };',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 62,
        end: 62
      }
    );
  });

  it('var tt = { aa:  };', () => {
    t.deepEqual(recovery('var tt = { aa:  };', 'recovery.js'), {
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
                name: 'tt',
                start: 3,
                end: 6,
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
                      name: 'aa',
                      start: 10,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 14,
                      end: 14,
                      kind: 13,
                      flags: 2
                    },
                    start: 10,
                    end: 14,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 8,
                end: 17,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 17,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 18,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var tt = { aa:  };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 16,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 18,
      end: 18
    });
  });

  it('var v = { a', () => {
    t.deepEqual(recovery('var v = { a', 'recovery.js'), {
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
                name: 'v',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 9,
                    end: 11,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 7,
                end: 11,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 11,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 11,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var v = { a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 10,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('var v = { a: 1', () => {
    t.deepEqual(recovery('var v = { a: 1', 'recovery.js'), {
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
                name: 'v',
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
                      name: 'a',
                      start: 9,
                      end: 11,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 12,
                      end: 14,
                      kind: 10,
                      flags: 0
                    },
                    start: 9,
                    end: 14,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 7,
                end: 14,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 14,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 14,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var v = { a: 1',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 13,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('var x = {', () => {
    t.deepEqual(recovery('var x = {', 'recovery.js'), {
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
                name: 'x',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [],
                start: 7,
                end: 9,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 9,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 9,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var x = {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 8,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it(`var v = {
      a
    ; `, () => {
    t.deepEqual(
      recovery(
        `var v = {
        a
      ;`,
        'recovery.js'
      ),
      {
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
                  name: 'v',
                  start: 3,
                  end: 5,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 9,
                      end: 19,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 7,
                  end: 19,
                  kind: 179,
                  flags: 0
                },
                start: 3,
                end: 19,
                kind: 144,
                flags: 0
              }
            ],
            start: 0,
            end: 27,
            kind: 143,
            flags: 0
          }
        ],
        text: 'var v = {\n        a\n      ;',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`,` expected',
            code: 5,
            start: 26,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 27,
        end: 27
      }
    );
  });

  it('var v = { foo() { }; a: b; get baz() { }; }', () => {
    t.deepEqual(recovery('var v = { foo() { }; a: b; get baz() { }; }', 'recovery.js'), {
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
                name: 'v',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'MethodDefinition',
                    async: false,
                    generator: false,
                    getter: false,
                    setter: false,
                    propertySetParameterList: null,
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'foo',
                      start: 9,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 15,
                      end: 19,
                      kind: 184,
                      flags: 0
                    },
                    start: 13,
                    end: 19,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 7,
                end: 19,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 19,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 20,
          kind: 143,
          flags: 0
        },
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'a',
            start: 20,
            end: 23,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'b',
              start: 23,
              end: 25,
              kind: 13,
              flags: 0
            },
            start: 23,
            end: 26,
            kind: 122,
            flags: 0
          },
          start: 20,
          end: 26,
          kind: 134,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'get',
            start: 26,
            end: 30,
            kind: 13,
            flags: 0
          },
          start: 26,
          end: 30,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'baz',
              start: 30,
              end: 34,
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 30,
            end: 36,
            kind: 156,
            flags: 0
          },
          start: 30,
          end: 36,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 36,
          end: 40,
          kind: 123,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 40,
          end: 41,
          kind: 148,
          flags: 0
        }
      ],
      text: 'var v = { foo() { }; a: b; get baz() { }; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 31,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 37,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 42,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 43,
      end: 43
    });
  });

  it('var v = { a; b; c }', () => {
    t.deepEqual(recovery('var v = { a; b; c }', 'recovery.js'), {
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
                name: 'v',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 9,
                    end: 11,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 7,
                end: 11,
                kind: 179,
                flags: 0
              },
              start: 3,
              end: 11,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 12,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 12,
            end: 14,
            kind: 13,
            flags: 0
          },
          start: 12,
          end: 15,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'c',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
          start: 15,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var v = { a; b; c }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 18,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('{,var', () => {
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('{var y = b ; /', () => {
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
                type: 'RegularExpressionLiteral',
                pattern: '',
                flag: '',
                start: 12,
                end: 15,
                kind: 15,
                flags: 0
              },
              start: 12,
              end: 15,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 15,
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
          source: 0,
          message: 'Unknown regular expression flag',
          code: 14,
          start: 13,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('var/{', () => {
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
      fileName: 'recovery.js',
      incremental: false,
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
                    type: 'Elison',
                    start: 3,
                    end: 10,
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
                  }
                ],
                start: 3,
                end: 12,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 12,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 12,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
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
                  start: 13,
                  end: 13,
                  kind: 13,
                  flags: 2
                },
                start: 12,
                end: 13,
                kind: 155,
                flags: 0
              },
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 14,
                  end: 16,
                  kind: 13,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 17,
                  end: 17,
                  kind: 13,
                  flags: 2
                },
                start: 14,
                end: 17,
                kind: 152,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 18,
                end: 18,
                kind: 13,
                flags: 2
              }
            ],
            start: 12,
            end: 18,
            kind: 147,
            flags: 0
          },
          start: 12,
          end: 18,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 22,
            end: 23,
            kind: 13,
            flags: 0
          },
          start: 22,
          end: 23,
          kind: 122,
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
          message: '`,` expected',
          code: 5,
          start: 12,
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
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
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
                      end: 12,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: null,
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
                      end: 31,
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
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
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
                      end: 12,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: null,
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
                      end: 31,
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
                      end: 39,
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
      incremental: false,
      parent: null,
      children: [],
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
                      end: 12,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: null,
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
                      end: 31,
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
                      end: 40,
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
      incremental: false,
      parent: null,
      children: [],
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
                      end: 12,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'FunctionExpression',
                      name: null,
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
                      end: 31,
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
                      end: 40,
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
                            end: 45,
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
                            end: 53,
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
                      end: 64,
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 69,
      end: 69
    });
  });
});
