import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Arrows', () => {
  it('() =>', () => {
    t.deepEqual(recovery('() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              start: 5,
              end: 5,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 5,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '() =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
          length: 2
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

  it('( a [] => async!', () => {
    t.deepEqual(recovery('( a [] => async!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 1,
                end: 3,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              computed: true,
              start: 1,
              end: 6,
              kind: 154,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 9,
            end: 15,
            kind: 13,
            flags: 0
          },
          start: 9,
          end: 15,
          kind: 122,
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
              start: 16,
              end: 16,
              kind: 13,
              flags: 2
            },
            start: 15,
            end: 16,
            kind: 160,
            flags: 0
          },
          start: 15,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '( a [] => async!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 7,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 15,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('( {}[a] => async!', () => {
    t.deepEqual(recovery('( {}[a] => async!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'ObjectLiteral',
                properties: [],
                start: 1,
                end: 4,
                kind: 179,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 5,
                end: 6,
                kind: 13,
                flags: 0
              },
              computed: true,
              start: 1,
              end: 7,
              kind: 154,
              flags: 0
            },
            start: 0,
            end: 7,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 10,
            end: 16,
            kind: 13,
            flags: 0
          },
          start: 10,
          end: 16,
          kind: 122,
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
              start: 17,
              end: 17,
              kind: 13,
              flags: 2
            },
            start: 16,
            end: 17,
            kind: 160,
            flags: 0
          },
          start: 16,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '( {}[a] => async!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 8,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 16,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 17,
      end: 17
    });
  });

  it('(x[, {}[a] => async', () => {
    t.deepEqual(recovery('(x[, {}[a] => async', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'x',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'CommaOperator',
                expressions: [
                  {
                    type: 'IdentifierReference',
                    name: '',
                    start: 3,
                    end: 3,
                    kind: 13,
                    flags: 2
                  },
                  {
                    type: 'MemberExpression',
                    member: {
                      type: 'ObjectLiteral',
                      properties: [],
                      start: 4,
                      end: 7,
                      kind: 179,
                      flags: 0
                    },
                    expression: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 8,
                      end: 9,
                      kind: 13,
                      flags: 0
                    },
                    computed: true,
                    start: 4,
                    end: 10,
                    kind: 154,
                    flags: 0
                  }
                ],
                start: 3,
                end: 10,
                kind: 147,
                flags: 0
              },
              computed: true,
              start: 1,
              end: 10,
              kind: 154,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 13,
            end: 19,
            kind: 13,
            flags: 0
          },
          start: 13,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: '(x[, {}[a] => async',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 11,
          length: 2
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

  it('(x, {}[a] => async', () => {
    t.deepEqual(recovery('(x, {}[a] => async', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'MemberExpression',
                  member: {
                    type: 'ObjectLiteral',
                    properties: [],
                    start: 3,
                    end: 6,
                    kind: 179,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 7,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  computed: true,
                  start: 3,
                  end: 9,
                  kind: 154,
                  flags: 0
                }
              ],
              start: 0,
              end: 9,
              kind: 147,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 12,
            end: 18,
            kind: 13,
            flags: 0
          },
          start: 12,
          end: 18,
          kind: 122,
          flags: 0
        }
      ],
      text: '(x, {}[a] => async',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 2
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

  it('a => var v = 0; }', () => {
    t.deepEqual(recovery('a => var v = 0; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 0,
                end: 1,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,
                kind: 13,
                flags: 2
              },
              start: 4,
              end: 4,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 4,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'v',
                start: 8,
                end: 10,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 12,
                end: 14,
                kind: 10,
                flags: 0
              },
              start: 8,
              end: 14,
              kind: 144,
              flags: 0
            }
          ],
          start: 4,
          end: 15,
          kind: 143,
          flags: 0
        }
      ],
      text: 'a => var v = 0; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 5,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 16,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 17,
      end: 17
    });
  });

  it('() =>(', () => {
    t.deepEqual(recovery('() =>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 6,
                  end: 6,
                  kind: 13,
                  flags: 2
                },
                start: 5,
                end: 6,
                kind: 189,
                flags: 0
              },
              start: 5,
              end: 6,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 6,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '() =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(() =>', () => {
    t.deepEqual(recovery('(() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrowFunction',
              params: [],
              contents: {
                type: 'ConciseBody',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 6,
                  end: 6,
                  kind: 13,
                  flags: 2
                },
                start: 6,
                end: 6,
                kind: 187,
                flags: 0
              },
              async: false,
              start: 1,
              end: 6,
              kind: 188,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '(() =>',
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
          length: 2
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

  it('(=>', () => {
    t.deepEqual(recovery('(=>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 1,
              end: 1,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 1,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        }
      ],
      text: '(=>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 1,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('(a n => {', () => {
    t.deepEqual(recovery('(a n => {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'n',
                start: 2,
                end: 4,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 7,
              end: 9,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 2,
            end: 9,
            kind: 188,
            flags: 0
          },
          start: 2,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a n => {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 3,
          length: 1
        },
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

  it('(a ...n => {', () => {
    t.deepEqual(recovery('(a ...n => {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'n',
                start: 6,
                end: 7,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 10,
              end: 12,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 6,
            end: 12,
            kind: 188,
            flags: 0
          },
          start: 6,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a ...n => {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 3,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 11,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('...=>(', () => {
    t.deepEqual(recovery('...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            start: 5,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 5,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 0,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 3,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('1...=>(', () => {
    t.deepEqual(recovery('1...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'MemberExpression',
              member: {
                type: 'NumericLiteral',
                value: 1,
                start: 0,
                end: 2,
                kind: 10,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              computed: false,
              start: 0,
              end: 3,
              kind: 154,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            computed: false,
            start: 0,
            end: 4,
            kind: 154,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            start: 6,
            end: 7,
            kind: 189,
            flags: 0
          },
          start: 6,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '1...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 1
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

  it('1(...=>(', () => {
    t.deepEqual(recovery('1(...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'NumericLiteral',
              value: 1,
              start: 0,
              end: 1,
              kind: 10,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                },
                start: 5,
                end: 5,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 5,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,
              kind: 13,
              flags: 2
            },
            start: 7,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 7,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '1(...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 5,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 7,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('a-- =>b', () => {
    t.deepEqual(recovery('a-- =>b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PostfixUpdateExpression',
            operator: '--',
            operand: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            start: 1,
            end: 3,
            kind: 162,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 6,
            end: 7,
            kind: 13,
            flags: 0
          },
          start: 6,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a-- =>b',
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
          length: 2
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

  it('..1...=>(', () => {
    t.deepEqual(recovery('..1...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0.1,
            start: 1,
            end: 3,
            kind: 10,
            flags: 0
          },
          start: 1,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '..1...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 0,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 6,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(a =>(', () => {
    t.deepEqual(recovery('(a =>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrowFunction',
              params: [
                {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 1,
                  end: 2,
                  kind: 168,
                  flags: 0
                }
              ],
              contents: {
                type: 'ConciseBody',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 6,
                    end: 6,
                    kind: 13,
                    flags: 2
                  },
                  start: 5,
                  end: 6,
                  kind: 189,
                  flags: 0
                },
                start: 5,
                end: 6,
                kind: 187,
                flags: 0
              },
              async: false,
              start: 1,
              end: 6,
              kind: 188,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(1)...=>(', () => {
    t.deepEqual(recovery('(1)...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'NumericLiteral',
              value: 1,
              start: 1,
              end: 2,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '(1)...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 6,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(1)function...=>(', () => {
    t.deepEqual(recovery('(1)function...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'NumericLiteral',
              value: 1,
              start: 1,
              end: 2,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: null,
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 11,
            end: 11,
            kind: 184,
            flags: 0
          },
          start: 3,
          end: 11,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 17,
              end: 17,
              kind: 13,
              flags: 2
            },
            start: 16,
            end: 17,
            kind: 189,
            flags: 0
          },
          start: 16,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '(1)function...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
          length: 8
        },
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 11,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 14,
          length: 2
        },
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
      length: 17,
      end: 17
    });
  });
});
