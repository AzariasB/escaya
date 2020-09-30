import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Try', () => {
  it('try { throw [,]; } catch ([x = 23]) {}', () => {
    t.deepEqual(recovery('try { throw [,]; } catch ([x = 23]) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ThrowStatement',
                expression: {
                  type: 'ArrayLiteral',
                  elements: [
                    {
                      type: 'Elison',
                      start: 14,
                      end: 14,

                      flags: 0
                    }
                  ],
                  start: 11,
                  end: 15,

                  flags: 0
                },
                start: 5,
                end: 16,

                flags: 0
              }
            ],
            start: 3,
            end: 18,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingElement',
                  left: {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 27,
                    end: 28,

                    flags: 0
                  },
                  right: {
                    type: 'NumericLiteral',

                    value: 23,
                    start: 30,
                    end: 33,

                    flags: 0
                  },
                  start: 27,
                  end: 33,

                  flags: 0
                }
              ],
              start: 26,
              end: 34,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 35,
              end: 38,

              flags: 0
            },
            start: 18,
            end: 38,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 38,

          flags: 0
        }
      ],
      text: 'try { throw [,]; } catch ([x = 23]) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 38,
      end: 38
    });
  });

  it('try [', () => {
    t.deepEqual(recovery('try [', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [],
            start: 3,
            end: 5,

            flags: 0
          },
          start: 3,
          end: 5,
          flags: 0
        }
      ],
      text: 'try [',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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

  it('try [switch', () => {
    t.deepEqual(recovery('try [switch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [],
            start: 3,
            end: 5,

            flags: 0
          },
          start: 3,
          end: 5,

          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
          },
          clauses: [],
          start: 5,
          end: 11,

          flags: 0
        }
      ],
      text: 'try [switch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 5,
          length: 6
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

  it('throw )()) => x', () => {
    t.deepEqual(recovery('throw )()) => x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 5,
            end: 5,

            flags: 2
          },
          start: 0,
          end: 5,

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

              flags: 2
            },
            start: 7,
            end: 9,

            flags: 0
          },
          start: 7,
          end: 9,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 13,
            end: 15,

            flags: 0
          },
          start: 13,
          end: 15,

          flags: 0
        }
      ],
      text: 'throw )()) => x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 11,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('throw (', () => {
    t.deepEqual(recovery('throw (', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            start: 5,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'throw (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('throw { => x', () => {
    t.deepEqual(recovery('throw { => x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 5,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 10,
            end: 12,

            flags: 0
          },
          start: 10,
          end: 12,

          flags: 0
        }
      ],
      text: 'throw { => x',
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
          length: 2
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

  it('as keyword', () => {
    t.deepEqual(recovery('try', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        }
      ],
      text: 'try',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 0,
          length: 3
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

  it('with parens and no catch', () => {
    t.deepEqual(recovery('try (x)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',

              name: 'x',
              start: 5,
              end: 6,
              flags: 0
            },
            start: 3,
            end: 7,

            flags: 0
          },
          start: 3,
          end: 7,

          flags: 0
        }
      ],
      text: 'try (x)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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
      length: 7,
      end: 7
    });
  });

  it('with unclosed parans and no catch', () => {
    t.deepEqual(recovery('try(x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',

              name: 'x',
              start: 4,
              end: 5,
              flags: 0
            },
            start: 3,
            end: 5,

            flags: 0
          },
          start: 3,
          end: 5,

          flags: 0
        }
      ],
      text: 'try(x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('with unclosed parans and catch', () => {
    t.deepEqual(recovery('try(x catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',

              name: 'x',
              start: 4,
              end: 5,
              flags: 0
            },
            start: 3,
            end: 5,

            flags: 0
          },
          start: 3,
          end: 5,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 5,
            end: 5,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',

            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 11,
              end: 11,

              flags: 0
            },
            flags: 0,
            start: 5,
            end: 11
          },
          finalizer: null,
          start: 5,
          end: 11,

          flags: 0
        }
      ],
      text: 'try(x catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 6,
          length: 5
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

  it('with unclosed parans and finally', () => {
    t.deepEqual(recovery('try(x, y catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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

                  name: 'x',
                  start: 4,
                  end: 5,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',

                  name: 'y',
                  start: 6,
                  end: 8,
                  flags: 0
                }
              ],
              start: 3,
              end: 8,

              flags: 0
            },
            start: 3,
            end: 8,

            flags: 0
          },
          start: 3,
          end: 8,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',

            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 14,
              end: 14,

              flags: 0
            },
            flags: 0,
            start: 8,
            end: 14
          },
          finalizer: null,
          start: 8,
          end: 14,

          flags: 0
        }
      ],
      text: 'try(x, y catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 9,
          length: 5
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

  it('try(x, y catch,', () => {
    t.deepEqual(recovery('try(x, y catch,', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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
                  name: 'x',
                  start: 4,
                  end: 5,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 6,
                  end: 8,

                  flags: 0
                }
              ],
              start: 3,
              end: 8,

              flags: 0
            },
            start: 3,
            end: 8,

            flags: 0
          },
          start: 3,
          end: 8,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 14,
              end: 14,

              flags: 0
            },
            start: 8,
            end: 14,

            flags: 0
          },
          finalizer: null,
          start: 8,
          end: 14,

          flags: 0
        }
      ],
      text: 'try(x, y catch,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 9,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 14,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('try(x, y, catch', () => {
    t.deepEqual(recovery('try(x, y, catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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
                  name: 'x',
                  start: 4,
                  end: 5,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 6,
                  end: 8,

                  flags: 0
                }
              ],
              start: 3,
              end: 9,

              flags: 0
            },
            start: 3,
            end: 9,

            flags: 0
          },
          start: 3,
          end: 9,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,

              flags: 0
            },
            start: 9,
            end: 15,

            flags: 0
          },
          finalizer: null,
          start: 9,
          end: 15,

          flags: 0
        }
      ],
      text: 'try(x, y, catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('try(x, y,,,,, catch', () => {
    t.deepEqual(recovery('try(x, y,,,,, catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 4,
                      end: 5,

                      flags: 0
                    },
                    {
                      type: 'IdentifierReference',
                      name: 'y',
                      start: 6,
                      end: 8,

                      flags: 0
                    }
                  ],
                  start: 3,
                  end: 9,

                  flags: 0
                },
                start: 3,
                end: 9,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 10,
                end: 10,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 12,
                end: 12,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 13,
                end: 13,

                flags: 2
              }
            ],
            start: 3,
            end: 13,

            flags: 0
          },
          start: 3,
          end: 13,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 13,
            end: 13,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 19,

              flags: 0
            },
            start: 13,
            end: 19,

            flags: 0
          },
          finalizer: null,
          start: 13,
          end: 19,

          flags: 0
        }
      ],
      text: 'try(x, y,,,,, catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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
          start: 14,
          length: 5
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

  it('try(x,,,,,, y catch', () => {
    t.deepEqual(recovery('try(x,,,,,, y catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 4,
                      end: 5,

                      flags: 0
                    }
                  ],
                  start: 3,
                  end: 6,

                  flags: 0
                },
                start: 3,
                end: 6,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 7,
                end: 7,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 9,
                end: 9,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 10,
                end: 10,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: 'y',
                start: 11,
                end: 13,

                flags: 0
              }
            ],
            start: 3,
            end: 13,

            flags: 0
          },
          start: 3,
          end: 13,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 13,
            end: 13,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 19,

              flags: 0
            },
            start: 13,
            end: 19,

            flags: 0
          },
          finalizer: null,
          start: 13,
          end: 19,

          flags: 0
        }
      ],
      text: 'try(x,,,,,, y catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
          message: '`;` expected',
          code: 92,
          start: 14,
          length: 5
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

  it('try(x,,,, y,,,, catch', () => {
    t.deepEqual(recovery('try(x,,,, y,,,, catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 4,
                      end: 5,

                      flags: 0
                    }
                  ],
                  start: 3,
                  end: 6,

                  flags: 0
                },
                start: 3,
                end: 6,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 7,
                end: 7,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: 'y',
                start: 9,
                end: 11,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 12,
                end: 12,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 13,
                end: 13,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 15,
                end: 15,

                flags: 2
              }
            ],
            start: 3,
            end: 15,

            flags: 0
          },
          start: 3,
          end: 15,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 15,
            end: 15,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 21,
              end: 21,

              flags: 0
            },
            start: 15,
            end: 21,

            flags: 0
          },
          finalizer: null,
          start: 15,
          end: 21,

          flags: 0
        }
      ],
      text: 'try(x,,,, y,,,, catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
          start: 16,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });

  it(',try(x, y catch', () => {
    t.deepEqual(recovery(',try(x, y catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 4,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 1,
          end: 4,

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
                  name: 'x',
                  start: 5,
                  end: 6,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 7,
                  end: 9,

                  flags: 0
                }
              ],
              start: 4,
              end: 9,

              flags: 0
            },
            start: 4,
            end: 9,

            flags: 0
          },
          start: 4,
          end: 9,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,

              flags: 0
            },
            start: 9,
            end: 15,

            flags: 0
          },
          finalizer: null,
          start: 9,
          end: 15,

          flags: 0
        }
      ],
      text: ',try(x, y catch',
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
          message: '`{` expected',
          code: 5,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('try(x, /a/,, catch', () => {
    t.deepEqual(recovery('try(x, /a/,, catch', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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
                  name: 'x',
                  start: 4,
                  end: 5,

                  flags: 0
                },
                {
                  type: 'RegularExpressionLiteral',
                  pattern: 'a',
                  flag: '',
                  start: 6,
                  end: 10,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 11,
                  end: 11,

                  flags: 2
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,

                  flags: 2
                }
              ],
              start: 3,
              end: 12,

              flags: 0
            },
            start: 3,
            end: 12,

            flags: 0
          },
          start: 3,
          end: 12,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 12,
            end: 12,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 18,
              end: 18,

              flags: 0
            },
            start: 12,
            end: 18,

            flags: 0
          },
          finalizer: null,
          start: 12,
          end: 18,

          flags: 0
        }
      ],
      text: 'try(x, /a/,, catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 3,
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
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 18,
      type: 'RootNode',
      webCompat: true,
      end: 18
    });
  });

  it('try /a/', () => {
    t.deepEqual(recovery('try /a/', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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

            flags: 0
          },
          start: 3,
          end: 7,

          flags: 0
        }
      ],
      text: 'try /a/',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
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

  it('try /a/ catch /a/ finally', () => {
    t.deepEqual(recovery('try /a/ catch /a/ finally', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

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

            flags: 0
          },
          start: 3,
          end: 7,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 7,
            end: 7,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 13,
              end: 13,

              flags: 0
            },
            start: 7,
            end: 13,

            flags: 0
          },
          finalizer: null,
          start: 7,
          end: 13,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: 'a',
            flag: '',
            start: 13,
            end: 17,

            flags: 0
          },
          start: 13,
          end: 17,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 17,
            end: 17,

            flags: 0
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 25,
            end: 25,

            flags: 0
          },
          start: 17,
          end: 25,

          flags: 0
        }
      ],
      text: 'try /a/ catch /a/ finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 8,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 14,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 18,
          length: 7
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('try/{', () => {
    t.deepEqual(recovery('try/{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 3,
            end: 5,

            flags: 0
          },
          start: 3,
          end: 5,

          flags: 0
        }
      ],
      text: 'try/{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
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

  it('{try', () => {
    t.deepEqual(recovery('{try', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 4,
                end: 4,

                flags: 0
              },
              catchClause: null,
              finalizer: null,
              start: 1,
              end: 4,

              flags: 0
            }
          ],
          start: 0,
          end: 4,

          flags: 0
        }
      ],
      text: '{try',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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

  it('{catch', () => {
    t.deepEqual(recovery('{catch', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 1,
                end: 1,

                flags: 0
              },
              catchClause: {
                type: 'CatchClause',

                binding: null,
                block: {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 6,
                  end: 6,

                  flags: 0
                },
                flags: 0,
                start: 1,
                end: 6
              },
              finalizer: null,
              start: 1,
              end: 6,

              flags: 0
            }
          ],
          start: 0,
          end: 6,

          flags: 0
        }
      ],
      text: '{catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 1,
          length: 5
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

  it('{finally', () => {
    t.deepEqual(recovery('{finally', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 1,
                end: 1,

                flags: 0
              },
              catchClause: null,
              finalizer: {
                type: 'BlockStatement',
                leafs: [],
                start: 8,
                end: 8,

                flags: 0
              },
              start: 1,
              end: 8,

              flags: 0
            }
          ],
          start: 0,
          end: 8,

          flags: 0
        }
      ],
      text: '{finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 1,
          length: 7
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

  it('(finally{', () => {
    t.deepEqual(recovery('(finally{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
              flags: 2
            },
            start: 0,
            end: 1,

            flags: 0
          },
          start: 0,
          end: 1,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 1,
            end: 1,

            flags: 0
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 9,

            flags: 0
          },
          start: 1,
          end: 9,

          flags: 0
        }
      ],
      text: '(finally{',
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
          length: 7
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

  it('catch/a/a{', () => {
    t.deepEqual(recovery('catch/a/a{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 0,
            end: 0,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 5,
              end: 5,

              flags: 0
            },
            start: 0,
            end: 5,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: 'a',
            flag: 'a',
            start: 5,
            end: 9,

            flags: 0
          },
          start: 5,
          end: 9,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 9,
          end: 10,

          flags: 0
        }
      ],
      text: 'catch/a/a{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 0,
          length: 5
        },
        {
          kind: 2,
          source: 0,
          message: 'Unknown regular expression flag',
          code: 14,
          start: 5,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 9,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('try/catch/finally/{', () => {
    t.deepEqual(recovery('try/catch/finally/{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'RegularExpressionLiteral',
              pattern: 'catch',
              flag: 'finally',
              start: 3,
              end: 17,

              flags: 0
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 18,
              end: 19,

              flags: 0
            },
            start: 3,
            end: 19,

            flags: 0
          },
          start: 3,
          end: 19,

          flags: 0
        }
      ],
      text: 'try/catch/finally/{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unknown regular expression flag',
          code: 14,
          start: 3,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('try try try { I have tried it !! } or I try again and finally catch some sleep :)', () => {
    t.deepEqual(
      recovery('try try try { I have tried it !! } or I try again and finally catch some sleep :)', 'recovery.js'),
      {
        type: 'RootNode',
        webCompat: true,
        directives: [],
        leafs: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 3,
              end: 3,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 0,
            end: 3,

            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 7,
              end: 7,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 3,
            end: 7,

            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'I',
                    start: 13,
                    end: 15,

                    flags: 0
                  },
                  start: 13,
                  end: 15,

                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'have',
                    start: 15,
                    end: 20,

                    flags: 0
                  },
                  start: 15,
                  end: 20,

                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'tried',
                    start: 20,
                    end: 26,

                    flags: 0
                  },
                  start: 20,
                  end: 26,

                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'it',
                    start: 26,
                    end: 29,

                    flags: 0
                  },
                  start: 26,
                  end: 29,

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
                        type: 'IdentifierReference',
                        name: '',
                        start: 32,
                        end: 32,

                        flags: 2
                      },
                      start: 31,
                      end: 32,

                      flags: 0
                    },
                    start: 29,
                    end: 32,

                    flags: 0
                  },
                  start: 29,
                  end: 32,

                  flags: 0
                }
              ],
              start: 11,
              end: 34,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 7,
            end: 34,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'or',
              start: 34,
              end: 37,

              flags: 0
            },
            start: 34,
            end: 37,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 37,
              end: 39,

              flags: 0
            },
            start: 37,
            end: 39,

            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 43,
              end: 43,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 39,
            end: 43,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'again',
              start: 43,
              end: 49,

              flags: 0
            },
            start: 43,
            end: 49,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'and',
              start: 49,
              end: 53,

              flags: 0
            },
            start: 49,
            end: 53,

            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 53,
              end: 53,

              flags: 0
            },
            catchClause: null,
            finalizer: {
              type: 'BlockStatement',
              leafs: [],
              start: 61,
              end: 61,

              flags: 0
            },
            start: 53,
            end: 61,

            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 61,
              end: 61,

              flags: 0
            },
            catchClause: {
              type: 'CatchClause',
              binding: null,
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 67,
                end: 67,

                flags: 0
              },
              start: 61,
              end: 67,

              flags: 0
            },
            finalizer: null,
            start: 61,
            end: 67,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'some',
              start: 67,
              end: 72,

              flags: 0
            },
            start: 67,
            end: 72,

            flags: 0
          },
          {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'sleep',
              start: 72,
              end: 80,

              flags: 0
            },
            labelledItem: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 80,
                end: 80,

                flags: 2
              },
              start: 80,
              end: 80,

              flags: 0
            },
            start: 72,
            end: 80,

            flags: 0
          }
        ],
        text: 'try try try { I have tried it !! } or I try again and finally catch some sleep :)',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 4,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 8,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 16,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 21,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 27,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 30,
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
            message: 'Missing catch or finally after try',
            code: 120,
            start: 35,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 38,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 40,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 44,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 50,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 54,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 62,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 68,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 73,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 80,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 81,
        end: 81
      }
    );
  });

  it('finaly I tried it! or { maybe I (should) try again ?', () => {
    t.deepEqual(recovery('finaly I tried it! or { maybe I (should) try again ?', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'finaly',
            start: 0,
            end: 6,

            flags: 0
          },
          start: 0,
          end: 6,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'I',
            start: 6,
            end: 8,

            flags: 0
          },
          start: 6,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'tried',
            start: 8,
            end: 14,

            flags: 0
          },
          start: 8,
          end: 14,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'it',
            start: 14,
            end: 17,

            flags: 0
          },
          start: 14,
          end: 17,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: 'or',
              start: 18,
              end: 21,

              flags: 0
            },
            start: 17,
            end: 21,

            flags: 0
          },
          start: 17,
          end: 21,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'maybe',
                start: 23,
                end: 29,

                flags: 0
              },
              start: 23,
              end: 29,

              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'I',
                  start: 29,
                  end: 31,

                  flags: 0
                },
                arguments: [
                  {
                    type: 'IdentifierReference',
                    name: 'should',
                    start: 33,
                    end: 39,

                    flags: 0
                  }
                ],
                start: 29,
                end: 40,

                flags: 0
              },
              start: 29,
              end: 40,

              flags: 0
            },
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 44,
                end: 44,

                flags: 0
              },
              catchClause: null,
              finalizer: null,
              start: 40,
              end: 44,

              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ConditionalExpression',
                shortCircuit: {
                  type: 'IdentifierReference',
                  name: 'again',
                  start: 44,
                  end: 50,

                  flags: 0
                },
                consequent: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 52,
                  end: 52,

                  flags: 2
                },
                alternate: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 52,
                  end: 52,

                  flags: 2
                },
                start: 44,
                end: 52,

                flags: 0
              },
              start: 44,
              end: 52,

              flags: 0
            }
          ],
          start: 21,
          end: 52,

          flags: 0
        }
      ],
      text: 'finaly I tried it! or { maybe I (should) try again ?',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 9,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 15,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 30,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 41,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 45,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 51,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 52,
      end: 52
    });
  });

  it('try {} catch(x)', () => {
    t.deepEqual(recovery('try {} catch(x)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',

            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 13,
              end: 14,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,

              flags: 0
            },
            flags: 0,
            start: 6,
            end: 15
          },
          finalizer: null,
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'try {} catch(x)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 14,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('try {!} catch(x', () => {
    t.deepEqual(recovery('try {!} catch(x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',

                    name: '',
                    start: 6,
                    end: 6,
                    flags: 2
                  },
                  start: 5,
                  end: 6,

                  flags: 0
                },
                start: 5,
                end: 6,

                flags: 0
              }
            ],
            start: 3,
            end: 7,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',

            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 14,
              end: 15,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,

              flags: 0
            },
            flags: 0,
            start: 7,
            end: 15
          },
          finalizer: null,
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'try {!} catch(x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('try {,,,,,,} catch(x,,,)', () => {
    t.deepEqual(recovery('try {,,,,,,} catch(x,,,)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 5,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 12,
            end: 12,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',

            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 19,
              end: 20,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 20,
              end: 20,

              flags: 0
            },
            flags: 0,
            start: 12,
            end: 20
          },
          finalizer: null,
          start: 12,
          end: 20,

          flags: 0
        }
      ],
      text: 'try {,,,,,,} catch(x,,,)',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 13,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 23,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('try {/a//d -!} catch(x) { foo:', () => {
    t.deepEqual(recovery('try {/a//d -!} catch(x) { foo:', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'RegularExpressionLiteral',
                      pattern: 'a',
                      flag: '',
                      start: 5,
                      end: 8,

                      flags: 0
                    },
                    operator: '/',
                    right: {
                      type: 'IdentifierReference',
                      name: 'd',
                      start: 9,
                      end: 10,

                      flags: 0
                    },
                    start: 5,
                    end: 10,

                    flags: 0
                  },
                  operator: '-',
                  right: {
                    type: 'UnaryExpression',
                    operator: '!',
                    operand: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 13,
                      end: 13,

                      flags: 2
                    },
                    start: 12,
                    end: 13,

                    flags: 0
                  },
                  start: 5,
                  end: 13,

                  flags: 0
                },
                start: 5,
                end: 13,

                flags: 0
              }
            ],
            start: 3,
            end: 14,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 21,
              end: 22,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'foo',
                    start: 25,
                    end: 30,

                    flags: 0
                  },
                  labelledItem: {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 30,
                      end: 30,

                      flags: 2
                    },
                    start: 30,
                    end: 30,

                    flags: 0
                  },
                  start: 25,
                  end: 30,

                  flags: 0
                }
              ],
              start: 23,
              end: 30,

              flags: 0
            },
            start: 14,
            end: 30,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 30,

          flags: 0
        }
      ],
      text: 'try {/a//d -!} catch(x) { foo:',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 29,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 30,
      end: 30
    });
  });

  it('try {/a//d -!} catch(x) { foo:  ? : b', () => {
    t.deepEqual(recovery('try {/a//d -!} catch(x) { foo:  ? : b', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'RegularExpressionLiteral',
                      pattern: 'a',
                      flag: '',
                      start: 5,
                      end: 8,

                      flags: 0
                    },
                    operator: '/',
                    right: {
                      type: 'IdentifierReference',
                      name: 'd',
                      start: 9,
                      end: 10,

                      flags: 0
                    },
                    start: 5,
                    end: 10,

                    flags: 0
                  },
                  operator: '-',
                  right: {
                    type: 'UnaryExpression',
                    operator: '!',
                    operand: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 13,
                      end: 13,

                      flags: 2
                    },
                    start: 12,
                    end: 13,

                    flags: 0
                  },
                  start: 5,
                  end: 13,

                  flags: 0
                },
                start: 5,
                end: 13,

                flags: 0
              }
            ],
            start: 3,
            end: 14,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 21,
              end: 22,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'foo',
                    start: 25,
                    end: 30,

                    flags: 0
                  },
                  labelledItem: {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ConditionalExpression',
                      shortCircuit: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 30,
                        end: 30,

                        flags: 2
                      },
                      consequent: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 33,
                        end: 33,

                        flags: 2
                      },
                      alternate: {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 35,
                        end: 37,

                        flags: 0
                      },
                      start: 30,
                      end: 37,

                      flags: 0
                    },
                    start: 30,
                    end: 37,

                    flags: 0
                  },
                  start: 25,
                  end: 37,

                  flags: 0
                }
              ],
              start: 23,
              end: 37,

              flags: 0
            },
            start: 14,
            end: 37,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 37,

          flags: 0
        }
      ],
      text: 'try {/a//d -!} catch(x) { foo:  ? : b',
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
          start: 34,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 36,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it('try {a?b:c/a{!!!}} catch(x)', () => {
    t.deepEqual(recovery('try {a?b:c/a{!!!}} catch(x)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ConditionalExpression',
                  shortCircuit: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 5,
                    end: 6,

                    flags: 0
                  },
                  consequent: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 7,
                    end: 8,

                    flags: 0
                  },
                  alternate: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'c',
                      start: 9,
                      end: 10,

                      flags: 0
                    },
                    operator: '/',
                    right: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 11,
                      end: 12,

                      flags: 0
                    },
                    start: 9,
                    end: 12,

                    flags: 0
                  },
                  start: 5,
                  end: 12,

                  flags: 0
                },
                start: 5,
                end: 12,

                flags: 0
              },
              {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'UnaryExpression',
                      operator: '!',
                      operand: {
                        type: 'UnaryExpression',
                        operator: '!',
                        operand: {
                          type: 'UnaryExpression',
                          operator: '!',
                          operand: {
                            type: 'IdentifierReference',
                            name: '',
                            start: 16,
                            end: 16,

                            flags: 2
                          },
                          start: 15,
                          end: 16,

                          flags: 0
                        },
                        start: 14,
                        end: 16,

                        flags: 0
                      },
                      start: 13,
                      end: 16,

                      flags: 0
                    },
                    start: 13,
                    end: 16,

                    flags: 0
                  }
                ],
                start: 12,
                end: 17,

                flags: 0
              }
            ],
            start: 3,
            end: 18,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 25,
              end: 26,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 27,
              end: 27,

              flags: 0
            },
            start: 18,
            end: 27,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 27,

          flags: 0
        }
      ],
      text: 'try {a?b:c/a{!!!}} catch(x)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 12,
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
          message: '`{` expected',
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
    });
  });

  it('try {} catch(x/[])', () => {
    t.deepEqual(recovery('try {} catch(x/[])', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 13,
              end: 14,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 14,
              end: 14,

              flags: 0
            },
            start: 6,
            end: 14,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 14,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '[]',
            flag: '',
            start: 14,
            end: 18,

            flags: 0
          },
          start: 14,
          end: 18,

          flags: 0
        }
      ],
      text: 'try {} catch(x/[])',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 14,
          length: 4
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

  it('try {} catch([[[{x}]]])', () => {
    t.deepEqual(recovery('try {} catch([[[{x}]]])', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'ArrayBindingPattern',
                  elements: [
                    {
                      type: 'ArrayBindingPattern',
                      elements: [
                        {
                          type: 'ObjectBindingPattern',
                          properties: [
                            {
                              type: 'BindingIdentifier',
                              name: 'x',
                              start: 17,
                              end: 18,

                              flags: 0
                            }
                          ],
                          start: 16,
                          end: 19,

                          flags: 0
                        }
                      ],
                      start: 15,
                      end: 20,

                      flags: 0
                    }
                  ],
                  start: 14,
                  end: 21,

                  flags: 0
                }
              ],
              start: 13,
              end: 22,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 23,
              end: 23,

              flags: 0
            },
            start: 6,
            end: 23,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: 'try {} catch([[[{x}]]])',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 22,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      type: 'RootNode',
      webCompat: true,
      end: 23
    });
  });

  it('try {} catch(x,[x])', () => {
    t.deepEqual(recovery('try {} catch(x,[x])', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 13,
              end: 14,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 14,
              end: 14,

              flags: 0
            },
            start: 6,
            end: 14,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 14,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',

            elements: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 16,
                end: 17,

                flags: 0
              }
            ],
            start: 15,
            end: 18,
            flags: 0
          },
          start: 15,
          end: 18,

          flags: 0
        }
      ],
      text: 'try {} catch(x,[x])',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('try {} catch(break,,,)', () => {
    t.deepEqual(recovery('try {} catch(break,,,)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: '',
              start: 13,
              end: 18,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 18,
              end: 18,

              flags: 0
            },
            start: 6,
            end: 18,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 18,

          flags: 0
        }
      ],
      text: 'try {} catch(break,,,)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 13,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 21,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });
  it('try {} catch({{}{{}{}{{}{}{}{}{}{{x)!{}', () => {
    t.deepEqual(recovery('try {} catch({{}{{}{}{{}{}{}{}{}{{x)!{}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 6,

            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ObjectBindingPattern',
              properties: [],
              start: 13,
              end: 14,

              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 14,
              end: 16,

              flags: 0
            },
            start: 6,
            end: 16,

            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 16,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'BlockStatement',
              leafs: [],
              start: 17,
              end: 19,

              flags: 0
            },
            {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 21,

              flags: 0
            },
            {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 22,
                  end: 24,

                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 24,
                  end: 26,

                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 26,
                  end: 28,

                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 28,
                  end: 30,

                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 30,
                  end: 32,

                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [
                    {
                      type: 'BlockStatement',
                      leafs: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'IdentifierReference',
                            name: 'x',
                            start: 34,
                            end: 35,

                            flags: 0
                          },
                          start: 34,
                          end: 35,

                          flags: 0
                        }
                      ],
                      start: 33,
                      end: 35,

                      flags: 0
                    }
                  ],
                  start: 32,
                  end: 35,

                  flags: 0
                }
              ],
              start: 21,
              end: 35,

              flags: 0
            }
          ],
          start: 16,
          end: 35,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 37,
              end: 39,

              flags: 0
            },
            start: 36,
            end: 39,

            flags: 0
          },
          start: 36,
          end: 39,

          flags: 0
        }
      ],
      text: 'try {} catch({{}{{}{}{{}{}{}{}{}{{x)!{}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 35,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 39,
      end: 39
    });
  });
});
