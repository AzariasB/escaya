import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Function', () => {
  it('function foo(/ {', () => {
    t.deepStrictEqual(recovery('function foo(/ {', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`)` expected',
          source: 2,
          start: 13
        },
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`}` expected',
          source: 2,
          start: 15
        }
      ],
      directives: [],
      end: 16,
      fileName: 'recovery.js',
      incremental: false,

      type: 'RootNode',
      webCompat: true,
      leafs: [
        {
          async: false,
          contents: {
            directives: [],
            end: 13,
            flags: 0,

            leafs: [],
            start: 13,
            type: 'FunctionBody'
          },
          end: 13,
          flags: 0,
          generator: false,

          name: {
            end: 12,
            flags: 0,

            name: 'foo',
            start: 8,
            type: 'BindingIdentifier'
          },
          params: [],
          start: 0,
          type: 'FunctionDeclaration'
        },
        {
          end: 16,
          expression: {
            end: 16,
            flags: 0,

            left: {
              end: 13,
              flags: 2,

              name: '',
              start: 13,
              type: 'IdentifierReference'
            },
            operator: '/',
            right: {
              end: 16,
              flags: 0,

              properties: [],
              start: 14,
              type: 'ObjectLiteral'
            },
            start: 13,
            type: 'BinaryExpression'
          },
          flags: 0,

          start: 13,
          type: 'ExpressionStatement'
        }
      ],
      length: 16,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'function foo(/ {'
    });
  });

  it('function x(...(a, b, c', () => {
    t.deepStrictEqual(recovery('function x(...(a, b, c', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 11,
                end: 14,

                flags: 0
              },
              start: 11,
              end: 14,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

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
                  name: 'a',
                  start: 15,
                  end: 16,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 17,
                  end: 19,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 20,
                  end: 22,

                  flags: 0
                }
              ],
              start: 14,
              end: 22,

              flags: 0
            },
            start: 14,
            end: 22,

            flags: 0
          },
          start: 14,
          end: 22,

          flags: 0
        }
      ],
      text: 'function x(...(a, b, c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('function x(...(a, b, c', () => {
    t.deepStrictEqual(recovery('function x(...(a, b, c', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 11,
                end: 14,

                flags: 0
              },
              start: 11,
              end: 14,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

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
                  name: 'a',
                  start: 15,
                  end: 16,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 17,
                  end: 19,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 20,
                  end: 22,

                  flags: 0
                }
              ],
              start: 14,
              end: 22,

              flags: 0
            },
            start: 14,
            end: 22,

            flags: 0
          },
          start: 14,
          end: 22,

          flags: 0
        }
      ],
      text: 'function x(...(a, b, c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('function *f(yield', () => {
    t.deepStrictEqual(recovery('function *f(yield', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 10,
            end: 11,

            flags: 0
          },
          generator: true,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 12,
              end: 17,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 17,
            end: 17,

            flags: 0
          },
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: 'function *f(yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 12,
          length: 5
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

  it('function x((', () => {
    t.deepStrictEqual(recovery('function x((', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 12,
              end: 12,

              flags: 2
            },
            start: 11,
            end: 12,

            flags: 0
          },
          start: 11,
          end: 12,

          flags: 0
        }
      ],
      text: 'function x((',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('async ! function x(...(a, {', () => {
    t.deepStrictEqual(recovery('async ! function x(...(a, {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 0,
            end: 5,

            flags: 0
          },
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'CallExpression',
              expression: {
                type: 'FunctionExpression',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 16,
                  end: 18,

                  flags: 0
                },
                generator: false,
                async: false,
                params: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 19,
                      end: 22,

                      flags: 0
                    },
                    start: 19,
                    end: 22,

                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 22,
                  end: 22,

                  flags: 0
                },
                start: 7,
                end: 22,

                flags: 0
              },
              arguments: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 23,
                  end: 24,

                  flags: 0
                },
                {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 25,
                  end: 27,

                  flags: 0
                }
              ],
              start: 7,
              end: 27,

              flags: 0
            },
            start: 5,
            end: 27,

            flags: 0
          },
          start: 5,
          end: 27,

          flags: 0
        }
      ],
      text: 'async ! function x(...(a, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('async => function x(...(a, {', () => {
    t.deepStrictEqual(recovery('async => function x(...(a, {', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: false,
            params: {
              end: 5,
              flags: 0,

              name: 'async',
              start: 0,
              type: 'BindingIdentifier'
            },
            contents: {
              type: 'CallExpression',
              expression: {
                type: 'FunctionExpression',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 17,
                  end: 19,

                  flags: 0
                },
                generator: false,
                async: false,
                params: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 20,
                      end: 23,

                      flags: 0
                    },
                    start: 20,
                    end: 23,

                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 23,
                  end: 23,

                  flags: 0
                },
                start: 8,
                end: 23,

                flags: 0
              },
              arguments: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 24,
                  end: 25,

                  flags: 0
                },
                {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 26,
                  end: 28,

                  flags: 0
                }
              ],
              start: 8,
              end: 28,

              flags: 0
            },
            async: false,
            start: 0,
            end: 28,

            flags: 0
          },
          start: 0,
          end: 28,

          flags: 0
        }
      ],
      text: 'async => function x(...(a, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 27,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      type: 'RootNode',
      webCompat: true,
      end: 28
    });
  });

  it('function !! x(...(a, {', () => {
    t.deepStrictEqual(recovery('function !! x(...(a, {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

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
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 11,
                  end: 13,

                  flags: 0
                },
                arguments: [
                  {
                    type: 'AssignmentRestElement',
                    argument: {
                      type: 'ParenthesizedExpression',
                      expression: {
                        type: 'CommaOperator',
                        expressions: [
                          {
                            type: 'IdentifierReference',
                            name: 'a',
                            start: 18,
                            end: 19,

                            flags: 0
                          },
                          {
                            type: 'ObjectLiteral',
                            properties: [],
                            start: 20,
                            end: 22,

                            flags: 0
                          }
                        ],
                        start: 17,
                        end: 22,

                        flags: 0
                      },
                      start: 17,
                      end: 22,

                      flags: 0
                    },
                    start: 17,
                    end: 22,

                    flags: 0
                  }
                ],
                start: 11,
                end: 22,

                flags: 0
              },
              start: 10,
              end: 22,

              flags: 0
            },
            start: 8,
            end: 22,

            flags: 0
          },
          start: 8,
          end: 22,

          flags: 0
        }
      ],
      text: 'function !! x(...(a, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('function; async function; (function function async function)', () => {
    t.deepStrictEqual(recovery('function; async function; (function function async function)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
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
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 8,
          end: 9,

          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: null,
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 24,
            end: 24,

            flags: 0
          },
          start: 9,
          end: 24,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 24,
          end: 25,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: {
                type: 'BindingIdentifier',
                name: '',
                start: 35,
                end: 35,

                flags: 0
              },
              generator: false,
              async: false,
              params: [],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 35,
                end: 35,

                flags: 0
              },
              start: 27,
              end: 35,

              flags: 0
            },
            start: 25,
            end: 35,

            flags: 0
          },
          start: 25,
          end: 35,

          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 44,
            end: 50,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 50,
            end: 50,

            flags: 0
          },
          start: 35,
          end: 50,

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
            start: 59,
            end: 59,

            flags: 0
          },
          start: 50,
          end: 59,

          flags: 0
        }
      ],
      text: 'function; async function; (function function async function)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 8,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 24,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 36,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 51,
          length: 8
        },
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 59,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 60,
      end: 60
    });
  });

  it('function break () {}', () => {
    t.deepStrictEqual(recovery('function break () {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
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
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'BreakStatement',
          label: null,
          start: 8,
          end: 14,

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

              flags: 2
            },
            start: 14,
            end: 17,

            flags: 0
          },
          start: 14,
          end: 17,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 17,
          end: 20,

          flags: 0
        }
      ],
      text: 'function break () {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 9,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 18,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('function async async(...(a, {', () => {
    t.deepStrictEqual(recovery('function async async(...(a, {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 8,
            end: 14,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 14,
              end: 20,

              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'CommaOperator',
                    expressions: [
                      {
                        type: 'IdentifierReference',
                        name: 'a',
                        start: 25,
                        end: 26,

                        flags: 0
                      },
                      {
                        type: 'ObjectLiteral',
                        properties: [],
                        start: 27,
                        end: 29,

                        flags: 0
                      }
                    ],
                    start: 24,
                    end: 29,

                    flags: 0
                  },
                  start: 24,
                  end: 29,

                  flags: 0
                },
                start: 21,
                end: 29,
                flags: 0
              }
            ],
            start: 14,
            end: 29,

            flags: 0
          },
          start: 14,
          end: 29,

          flags: 0
        }
      ],
      text: 'function async async(...(a, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 28,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 29,
      end: 29
    });
  });

  it('function async(async', () => {
    t.deepStrictEqual(recovery('function async(async', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 8,
            end: 14,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'async',
              start: 15,
              end: 20,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 20,
            end: 20,

            flags: 0
          },
          start: 0,
          end: 20,

          flags: 0
        }
      ],
      text: 'function async(async',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 15,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('function x(...(a, {', () => {
    t.deepStrictEqual(recovery('function x(...(a, {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 11,
                end: 14,

                flags: 0
              },
              start: 11,
              end: 14,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

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
                  name: 'a',
                  start: 15,
                  end: 16,

                  flags: 0
                },
                {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 17,
                  end: 19,

                  flags: 0
                }
              ],
              start: 14,
              end: 19,

              flags: 0
            },
            start: 14,
            end: 19,

            flags: 0
          },
          start: 14,
          end: 19,

          flags: 0
        }
      ],
      text: 'function x(...(a, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 14,
          length: 1
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

  it('function x(...(a, {, [', () => {
    t.deepStrictEqual(recovery('function x(...(a, {, [', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 11,
                end: 14,

                flags: 0
              },
              start: 11,
              end: 14,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

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
                  name: 'a',
                  start: 15,
                  end: 16,

                  flags: 0
                },
                {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 17,
                  end: 19,

                  flags: 0
                },
                {
                  type: 'ArrayLiteral',
                  elements: [],
                  start: 20,
                  end: 22,

                  flags: 0
                }
              ],
              start: 14,
              end: 22,

              flags: 0
            },
            start: 14,
            end: 22,

            flags: 0
          },
          start: 14,
          end: 22,

          flags: 0
        }
      ],
      text: 'function x(...(a, {, [',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
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

  it('function x(...(a, b, ...[(c,b', () => {
    t.deepStrictEqual(recovery('function x(...(a, b, ...[(c,b', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 11,
                end: 14,

                flags: 0
              },
              start: 11,
              end: 14,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'CommaOperator',
                expressions: [
                  {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 15,
                    end: 16,

                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 17,
                    end: 19,

                    flags: 0
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'ArrayBindingPattern',
                      elements: [],
                      start: 24,
                      end: 25,

                      flags: 0
                    },
                    start: 20,
                    end: 25,

                    flags: 0
                  }
                ],
                start: 14,
                end: 25,

                flags: 0
              },
              start: 14,
              end: 25,

              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'c',
                start: 26,
                end: 27,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 28,
                end: 29,

                flags: 0
              }
            ],
            start: 14,
            end: 29,

            flags: 0
          },
          start: 14,
          end: 29,

          flags: 0
        }
      ],
      text: 'function x(...(a, b, ...[(c,b',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 28,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 29,
      end: 29
    });
  });

  it('async function *foo(x) { async; await; yield;', () => {
    t.deepStrictEqual(recovery('async function *foo(x) { async; await; yield;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 16,
            end: 19,

            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 20,
              end: 21,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 24,
                  end: 30,

                  flags: 0
                },
                start: 24,
                end: 31,

                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AwaitExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 37,
                    end: 37,

                    flags: 2
                  },
                  start: 31,
                  end: 37,

                  flags: 0
                },
                start: 31,
                end: 38,

                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'YieldExpression',
                  delegate: false,
                  argument: null,
                  start: 38,
                  end: 44,

                  flags: 0
                },
                start: 38,
                end: 45,

                flags: 0
              }
            ],
            start: 22,
            end: 45,

            flags: 0
          },
          start: 0,
          end: 45,

          flags: 0
        }
      ],
      text: 'async function *foo(x) { async; await; yield;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 37,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 44,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 45,
      end: 45
    });
  });

  it('Unterminated regexp after function', () => {
    t.deepStrictEqual(recovery('function /a', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 8,
            end: 11,

            flags: 0
          },
          start: 8,
          end: 11,

          flags: 0
        }
      ],
      text: 'function /a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 9,
          length: 2
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

  it('function true {}', () => {
    t.deepStrictEqual(recovery('function true {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 8,
            end: 13,

            flags: 0
          },
          start: 8,
          end: 13,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 16,

          flags: 0
        }
      ],
      text: 'function true {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 9,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 14,
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
  it('function{', () => {
    t.deepStrictEqual(recovery('function{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,

          flags: 0
        }
      ],
      text: 'function{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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

  it('Unclosed block statement33', () => {
    t.deepStrictEqual(recovery('function a{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 10,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'function a{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('function a(function {', () => {
    t.deepStrictEqual(recovery('function a(function {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 19,
            end: 19,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 19,
            end: 21,

            flags: 0
          },
          start: 11,
          end: 21,

          flags: 0
        }
      ],
      text: 'function a(function {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 11,
          length: 8
        },
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 20,
          length: 1
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

  it('function (function, break {', () => {
    t.deepStrictEqual(recovery('function (function, break {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 10,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

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
            start: 18,
            end: 18,

            flags: 0
          },
          start: 10,
          end: 18,

          flags: 0
        },
        {
          type: 'BreakStatement',
          label: null,
          start: 19,
          end: 25,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 25,
          end: 27,

          flags: 0
        }
      ],
      text: 'function (function, break {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 8
        },
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 18,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
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

  it('function (x,,,,,,,, {', () => {
    t.deepStrictEqual(recovery('function (x,,,,,,,, {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 10,
              end: 11,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 12,
            end: 12,

            flags: 0
          },
          start: 0,
          end: 12,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 19,
          end: 21,

          flags: 0
        }
      ],
      text: 'function (x,,,,,,,, {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 16,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 20,
          length: 1
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

  it('function !(', () => {
    t.deepStrictEqual(recovery('function !(', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,

                flags: 2
              },
              start: 10,
              end: 11,

              flags: 0
            },
            start: 8,
            end: 11,

            flags: 0
          },
          start: 8,
          end: 11,

          flags: 0
        }
      ],
      text: 'function !(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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

  it('function while() {}', () => {
    t.deepStrictEqual(recovery('function while() {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
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
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 15,
            end: 15,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 16,
            end: 19,

            flags: 0
          },
          start: 8,
          end: 19,

          flags: 0
        }
      ],
      text: 'function while() {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 9,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
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

  it('Unclosed block statement32424fdas', () => {
    t.deepStrictEqual(recovery('async function', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: null,
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'async function',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 6,
          length: 8
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

  it('async function * {', () => {
    t.deepStrictEqual(recovery('async function * {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 16,
            end: 16,

            flags: 0
          },
          generator: true,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 16,
            end: 18,

            flags: 0
          },
          start: 0,
          end: 18,

          flags: 0
        }
      ],
      text: 'async function * {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 17,
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

  it('Unclosed block statement+0+09', () => {
    t.deepStrictEqual(recovery('function * a {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 10,
            end: 12,

            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 12,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'function * a {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('function(...[{[x]},,,,', () => {
    t.deepStrictEqual(recovery('function(...[{[x]},,,,', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'ObjectBindingPattern',
                    properties: [
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'ComputedPropertyName',
                          expression: {
                            type: 'IdentifierReference',
                            name: 'x',
                            start: 15,
                            end: 16,

                            flags: 0
                          },
                          start: 14,
                          end: 17,

                          flags: 0
                        },
                        value: {
                          type: 'BindingIdentifier',
                          name: '',
                          start: 17,
                          end: 18,

                          flags: 0
                        },
                        start: 14,
                        end: 18,

                        flags: 0
                      }
                    ],
                    start: 13,
                    end: 19,

                    flags: 0
                  },
                  {
                    type: 'Elison',
                    start: 12,
                    end: 21,

                    flags: 0
                  },
                  {
                    type: 'Elison',
                    start: 12,
                    end: 22,

                    flags: 0
                  }
                ],
                start: 12,
                end: 22,

                flags: 0
              },
              start: 9,
              end: 22,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 22,
            end: 22,

            flags: 0
          },
          start: 0,
          end: 22,

          flags: 0
        }
      ],
      text: 'function(...[{[x]},,,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
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
      type: 'RootNode',
      webCompat: true,
      end: 22
    });
  });

  it('function foo() { if(true) function bar() {} }', () => {
    t.deepStrictEqual(recovery('function foo() { if(true) function bar() {} }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 8,
            end: 12,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'IfStatement',
                expression: {
                  type: 'BooleanLiteral',
                  value: true,
                  start: 20,
                  end: 24,

                  flags: 0
                },
                consequent: {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'bar',
                    start: 34,
                    end: 38,

                    flags: 0
                  },
                  generator: false,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 40,
                    end: 43,

                    flags: 0
                  },
                  start: 25,
                  end: 43,

                  flags: 0
                },
                alternate: null,
                start: 16,
                end: 43,

                flags: 0
              }
            ],
            start: 14,
            end: 45,

            flags: 0
          },
          start: 0,
          end: 45,

          flags: 0
        }
      ],
      text: 'function foo() { if(true) function bar() {} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 45,
      end: 45
    });
  });

  it('function ({function (function (', () => {
    t.deepStrictEqual(recovery('function ({function (function (', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'function',
                  start: 11,
                  end: 19,

                  flags: 0
                }
              ],
              start: 10,
              end: 19,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 19,
            end: 19,

            flags: 0
          },
          start: 0,
          end: 19,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: null,
              generator: false,
              async: false,
              params: [],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 31,
                end: 31,

                flags: 0
              },
              start: 21,
              end: 31,

              flags: 0
            },
            start: 19,
            end: 31,

            flags: 0
          },
          start: 19,
          end: 31,

          flags: 0
        }
      ],
      text: 'function ({function (function (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 9,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 11,
          length: 10
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 30,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 31,
      type: 'RootNode',
      webCompat: true,
      end: 31
    });
  });
});
