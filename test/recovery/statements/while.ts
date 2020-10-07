import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - While', () => {
  it('while walking he ran for his life', () => {
    t.deepStrictEqual(recovery('while walking he ran for his life', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'walking',
            start: 5,
            end: 13,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'he',
              start: 13,
              end: 16,

              flags: 0
            },
            start: 13,
            end: 16,

            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'ran',
            start: 16,
            end: 20,

            flags: 0
          },
          start: 16,
          end: 20,

          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: 'his',
            start: 24,
            end: 28,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 33,
            end: 33,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'life',
            start: 28,
            end: 33,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 33,
              end: 33,

              flags: 2
            },
            start: 33,
            end: 33,

            flags: 0
          },
          start: 20,
          end: 33,

          flags: 0
        }
      ],
      text: 'while walking he ran for his life',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 17,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 21,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 25,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 29,
          length: 4
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 33,
      end: 33
    });
  });

  it('while {!for!', () => {
    t.deepStrictEqual(recovery('while {!for!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,

                flags: 2
              },
              start: 7,
              end: 8,

              flags: 0
            },
            start: 7,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
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
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 12,
            end: 12,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 12,
            end: 12,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 12,
              end: 12,

              flags: 2
            },
            start: 12,
            end: 12,

            flags: 0
          },
          start: 8,
          end: 12,

          flags: 0
        }
      ],
      text: 'while {!for!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('as keyword', () => {
    t.deepStrictEqual(recovery('while', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 5,
              end: 5,
              flags: 2
            },
            start: 5,
            end: 5,

            flags: 0
          },
          start: 0,
          end: 5,

          flags: 0
        }
      ],
      text: 'while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 0,
          length: 5
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

  it('while{', () => {
    t.deepStrictEqual(recovery('while{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 5,
            end: 6,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,

              flags: 2
            },
            start: 6,
            end: 6,

            flags: 0
          },
          start: 0,
          end: 6,

          flags: 0
        }
      ],
      text: 'while{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('{while', () => {
    t.deepStrictEqual(recovery('{while', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'WhileStatement',
              expression: {
                type: 'IdentifierReference',

                name: '',
                start: 6,
                end: 6,
                flags: 2
              },
              statement: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',

                  name: '',
                  start: 6,
                  end: 6,
                  flags: 2
                },
                start: 6,
                end: 6,

                flags: 0
              },
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
      text: '{while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('while/{', () => {
    t.deepStrictEqual(recovery('while/{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            start: 7,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'while/{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 5,
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

  it('while while{', () => {
    t.deepStrictEqual(recovery('while while{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 11,
              end: 12,

              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',

                name: '',
                start: 12,
                end: 12,
                flags: 2
              },
              start: 12,
              end: 12,

              flags: 0
            },
            start: 5,
            end: 12,

            flags: 0
          },
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      text: 'while while{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('{while while', () => {
    t.deepStrictEqual(recovery('{while while', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'WhileStatement',
              expression: {
                type: 'IdentifierReference',

                name: '',
                start: 6,
                end: 6,
                flags: 2
              },
              statement: {
                type: 'WhileStatement',
                expression: {
                  type: 'IdentifierReference',

                  name: '',
                  start: 12,
                  end: 12,
                  flags: 2
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',

                    name: '',
                    start: 12,
                    end: 12,
                    flags: 2
                  },
                  start: 12,
                  end: 12,

                  flags: 0
                },
                start: 6,
                end: 12,

                flags: 0
              },
              start: 1,
              end: 12,

              flags: 0
            }
          ],
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      text: '{while while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
          length: 5
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

  it('while (x {', () => {
    t.deepStrictEqual(recovery('while (x {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 7,
            end: 8,
            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: 'while (x {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('{ while {}', () => {
    t.deepStrictEqual(recovery('{ while {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'WhileStatement',
              expression: {
                type: 'ObjectLiteral',
                properties: [],
                start: 7,
                end: 10,

                flags: 0
              },
              statement: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',

                  name: '',
                  start: 10,
                  end: 10,
                  flags: 2
                },
                start: 10,
                end: 10,

                flags: 0
              },
              start: 1,
              end: 10,

              flags: 0
            }
          ],
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: '{ while {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('while {}{', () => {
    t.deepStrictEqual(recovery('while {}{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 5,
            end: 8,

            flags: 0
          },
          statement: {
            type: 'BlockStatement',
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
      text: 'while {}{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('while(x/{', () => {
    t.deepStrictEqual(recovery('while(x/{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',

              name: 'x',
              start: 6,
              end: 7,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 8,
              end: 9,

              flags: 0
            },
            start: 6,
            end: 9,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 9,
              end: 9,
              flags: 2
            },
            start: 9,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,

          flags: 0
        }
      ],
      text: 'while(x/{',
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

  it('while(do) {', () => {
    t.deepStrictEqual(recovery('while(do) {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 6,
            end: 6,

            flags: 2
          },
          statement: {
            type: 'DoWhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,

              flags: 2
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,

                flags: 2
              },
              start: 8,
              end: 8,

              flags: 0
            },
            start: 6,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 9,
          end: 11,

          flags: 0
        }
      ],
      text: 'while(do) {',
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
          length: 2
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
          message: '`}` expected',
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

  it('while(catch){', () => {
    t.deepStrictEqual(recovery('while(catch){', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: '',
            start: 6,
            end: 6,
            flags: 2
          },
          statement: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 6,
              end: 6,

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
              start: 6,
              end: 11
            },
            finalizer: null,
            start: 6,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 12,
          end: 13,

          flags: 0
        }
      ],
      text: 'while(catch){',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 12,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('while label', () => {
    t.deepStrictEqual(recovery('while label', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'label',
            start: 5,
            end: 11,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 11,
              end: 11,
              flags: 2
            },
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'while label',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('while { break', () => {
    t.deepStrictEqual(recovery('while { break', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'break',
                start: 7,
                end: 13,

                flags: 0
              }
            ],
            start: 5,
            end: 13,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,

              flags: 2
            },
            start: 13,
            end: 13,

            flags: 0
          },
          start: 0,
          end: 13,

          flags: 0
        }
      ],
      text: 'while { break',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 7,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 8,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('while I wait for the train', () => {
    t.deepStrictEqual(recovery('while I wait for the train', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'I',
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'wait',
              start: 7,
              end: 12,

              flags: 0
            },
            start: 7,
            end: 12,

            flags: 0
          },
          start: 0,
          end: 12,

          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: 'the',
            start: 16,
            end: 20,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 26,
            end: 26,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'train',
            start: 20,
            end: 26,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 26,
              end: 26,

              flags: 2
            },
            start: 26,
            end: 26,

            flags: 0
          },
          start: 12,
          end: 26,

          flags: 0
        }
      ],
      text: 'while I wait for the train',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 8,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 13,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 17,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 21,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('while wait for the train I take a break and finally try to sleep !!', () => {
    t.deepStrictEqual(recovery('while wait for the train I take a break and finally try to sleep !!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'wait',
            start: 5,
            end: 10,

            flags: 0
          },
          statement: {
            type: 'ForStatement',
            variableDeclarationList: false,
            initializer: {
              type: 'IdentifierReference',
              name: 'the',
              start: 14,
              end: 18,

              flags: 0
            },
            condition: {
              type: 'IdentifierReference',
              name: 'I',
              start: 24,
              end: 26,

              flags: 0
            },
            incrementor: {
              type: 'IdentifierReference',
              name: 'train',
              start: 18,
              end: 24,

              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'take',
                start: 26,
                end: 31,

                flags: 0
              },
              start: 26,
              end: 31,

              flags: 0
            },
            start: 10,
            end: 31,

            flags: 0
          },
          start: 0,
          end: 31,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 31,
            end: 33,

            flags: 0
          },
          start: 31,
          end: 33,

          flags: 0
        },
        {
          type: 'BreakStatement',
          label: {
            type: 'IdentifierReference',
            name: 'and',
            start: 39,
            end: 43,

            flags: 0
          },
          start: 33,
          end: 43,

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
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 51,
            end: 51,

            flags: 0
          },
          start: 43,
          end: 51,

          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 55,
            end: 55,

            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 51,
          end: 55,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'to',
            start: 55,
            end: 58,

            flags: 0
          },
          start: 55,
          end: 58,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'sleep',
            start: 58,
            end: 64,

            flags: 0
          },
          start: 58,
          end: 64,

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
                start: 67,
                end: 67,

                flags: 2
              },
              start: 66,
              end: 67,

              flags: 0
            },
            start: 64,
            end: 67,

            flags: 0
          },
          start: 64,
          end: 67,

          flags: 0
        }
      ],
      text: 'while wait for the train I take a break and finally try to sleep !!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 11,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 19,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 27,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 32,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 34,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 44,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 52,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 56,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 59,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 65,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 66,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 67,
      end: 67
    });
  });

  it('I ran into infite loop while try to develop this {', () => {
    t.deepStrictEqual(recovery('I ran into infite loop while try to develop this {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'I',
            start: 0,
            end: 1,

            flags: 0
          },
          start: 0,
          end: 1,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'ran',
            start: 1,
            end: 5,

            flags: 0
          },
          start: 1,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'into',
            start: 5,
            end: 10,

            flags: 0
          },
          start: 5,
          end: 10,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'infite',
            start: 10,
            end: 17,

            flags: 0
          },
          start: 10,
          end: 17,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'loop',
            start: 17,
            end: 22,

            flags: 0
          },
          start: 17,
          end: 22,

          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 28,
            end: 28,

            flags: 2
          },
          statement: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 32,
              end: 32,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 28,
            end: 32,

            flags: 0
          },
          start: 22,
          end: 32,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'to',
            start: 32,
            end: 35,

            flags: 0
          },
          start: 32,
          end: 35,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'develop',
            start: 35,
            end: 43,

            flags: 0
          },
          start: 35,
          end: 43,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ThisExpression',
            start: 43,
            end: 48,

            flags: 0
          },
          start: 43,
          end: 48,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 48,
          end: 50,

          flags: 0
        }
      ],
      text: 'I ran into infite loop while try to develop this {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 2,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 6,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 11,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 18,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 23,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 29,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 33,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 36,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 44,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 49,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 50,
      end: 50
    });
  });

  it('while !', () => {
    t.deepStrictEqual(recovery('while !', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
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
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 7,
              end: 7,
              flags: 2
            },
            start: 7,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'while !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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

  it('while class', () => {
    t.deepStrictEqual(recovery('while class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ClassExpression',
            name: null,
            heritage: null,
            elements: [],
            start: 5,
            end: 11,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 11,
              end: 11,
              flags: 2
            },
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'while class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('while!{!', () => {
    t.deepStrictEqual(recovery('while!{!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 6,
              end: 7,

              flags: 0
            },
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,

                flags: 2
              },
              start: 7,
              end: 8,

              flags: 0
            },
            start: 7,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        }
      ],
      text: 'while!{!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('(while(x,,,,,', () => {
    t.deepStrictEqual(recovery('(while(x,,,,,', 'recovery.js'), {
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
          type: 'WhileStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,

                flags: 0
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
            start: 7,
            end: 13,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,

              flags: 2
            },
            start: 13,
            end: 13,

            flags: 0
          },
          start: 1,
          end: 13,

          flags: 0
        }
      ],
      text: '(while(x,,,,,',
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
          length: 5
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
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('while(,,,,,,,,,,', () => {
    t.deepStrictEqual(recovery('while(,,,,,,,,,,', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,

                flags: 2
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
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,

                flags: 2
              }
            ],
            start: 6,
            end: 16,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 16,
              end: 16,

              flags: 2
            },
            start: 16,
            end: 16,

            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: 'while(,,,,,,,,,,',
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

  it('while(/a/,,,/bb while x() {} while ', () => {
    t.deepStrictEqual(recovery('while(/a/,,,/bb while x() {} while', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'RegularExpressionLiteral',
                pattern: 'a',
                flag: '',
                start: 6,
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
                type: 'RegularExpressionLiteral',
                pattern: 'bb while x() {} whil',
                flag: '',
                start: 12,
                end: 34,

                flags: 0
              }
            ],
            start: 6,
            end: 34,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 34,
              end: 34,

              flags: 2
            },
            start: 34,
            end: 34,

            flags: 0
          },
          start: 0,
          end: 34,

          flags: 0
        }
      ],
      text: 'while(/a/,,,/bb while x() {} while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 12,
          length: 22
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 34,
      end: 34
    });
  });

  it('while ! (x) {}', () => {
    t.deepStrictEqual(recovery('while ! (x) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',

                name: 'x',
                start: 9,
                end: 10,
                flags: 0
              },
              start: 7,
              end: 11,

              flags: 0
            },
            start: 5,
            end: 11,

            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 11,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'while ! (x) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 12,
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

  it('while({} [] ! {', () => {
    t.deepStrictEqual(recovery('while({} [] ! {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'ObjectLiteral',
              properties: [],
              start: 6,
              end: 8,

              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 10,
              end: 10,

              flags: 2
            },
            computed: true,
            start: 6,
            end: 11,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [],
                start: 13,
                end: 15,

                flags: 0
              },
              start: 11,
              end: 15,

              flags: 0
            },
            start: 11,
            end: 15,

            flags: 0
          },
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'while({} [] ! {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          message: '`)` expected',
          code: 5,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('while x break {}', () => {
    t.deepStrictEqual(recovery('while x break {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 7,
            end: 13,

            flags: 0
          },
          start: 0,
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
      text: 'while x break {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 8,
          length: 5
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

  it('while(x){', () => {
    t.deepStrictEqual(recovery('while(x){', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 6,
            end: 7,
            flags: 0
          },
          statement: {
            type: 'BlockStatement',
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
      text: 'while(x){',
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

  it('while x do{', () => {
    t.deepStrictEqual(recovery('while x do{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 5,
            end: 7,
            flags: 0
          },
          statement: {
            type: 'DoWhileStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 11,
              end: 11,
              flags: 2
            },
            statement: {
              type: 'BlockStatement',
              leafs: [],
              start: 10,
              end: 11,

              flags: 0
            },
            start: 7,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'while x do{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
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
          message: '`}` expected',
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

  it('while for{', () => {
    t.deepStrictEqual(recovery('while for{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          statement: {
            type: 'ForStatement',
            variableDeclarationList: false,
            initializer: {
              type: 'ObjectLiteral',
              properties: [],
              start: 9,
              end: 10,

              flags: 0
            },
            condition: {
              type: 'IdentifierReference',

              name: '',
              start: 10,
              end: 10,
              flags: 2
            },
            incrementor: {
              type: 'IdentifierReference',

              name: '',
              start: 10,
              end: 10,
              flags: 2
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',

                name: '',
                start: 10,
                end: 10,
                flags: 2
              },
              start: 10,
              end: 10,

              flags: 0
            },
            start: 5,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: 'while for{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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

  it('while try{', () => {
    t.deepStrictEqual(recovery('while try{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          statement: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 9,
              end: 10,

              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 5,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: 'while try{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('while continue{', () => {
    t.deepStrictEqual(recovery('while continue{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 5,
            end: 5,

            flags: 2
          },
          statement: {
            type: 'ContinueStatement',
            label: null,
            start: 5,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 14,
          end: 15,

          flags: 0
        }
      ],
      text: 'while continue{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 8
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
      length: 15,
      end: 15
    });
  });

  it('while let{', () => {
    t.deepStrictEqual(recovery('while let{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'let',
            start: 5,
            end: 9,
            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: 'while let{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('while let.let => {{', () => {
    t.deepStrictEqual(recovery('while let.let => {{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'let',
              start: 5,
              end: 9,

              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'let',
              start: 10,
              end: 13,

              flags: 0
            },
            computed: false,
            start: 5,
            end: 13,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,

              flags: 2
            },
            start: 13,
            end: 13,

            flags: 0
          },
          start: 0,
          end: 13,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'BlockStatement',
              leafs: [],
              start: 18,
              end: 19,

              flags: 0
            }
          ],
          start: 16,
          end: 19,

          flags: 0
        }
      ],
      text: 'while let.let => {{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 2
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

  it('while ;;;;;;;;;;;;;;;;;;;;;;;;;;; ,,, do{', () => {
    t.deepStrictEqual(recovery('while ;;;;;;;;;;;;;;;;;;;;;;;;;;; ,,, do{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 5,
            end: 5,

            flags: 2
          },
          statement: {
            type: 'EmptyStatement',
            start: 5,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 7,
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
          type: 'EmptyStatement',
          start: 9,
          end: 10,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 10,
          end: 11,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 11,
          end: 12,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 12,
          end: 13,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 13,
          end: 14,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 14,
          end: 15,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 15,
          end: 16,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 16,
          end: 17,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 17,
          end: 18,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 18,
          end: 19,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 19,
          end: 20,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 20,
          end: 21,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 21,
          end: 22,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 22,
          end: 23,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 23,
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
          type: 'EmptyStatement',
          start: 25,
          end: 26,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 26,
          end: 27,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 27,
          end: 28,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 28,
          end: 29,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 29,
          end: 30,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 30,
          end: 31,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 31,
          end: 32,

          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 32,
          end: 33,

          flags: 0
        },
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 41,
            end: 41,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 40,
            end: 41,

            flags: 0
          },
          start: 37,
          end: 41,

          flags: 0
        }
      ],
      text: 'while ;;;;;;;;;;;;;;;;;;;;;;;;;;; ,,, do{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 34,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 35,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 36,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 40,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 41,
      end: 41
    });
  });

  it('while x) {}', () => {
    t.deepStrictEqual(recovery('while x) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'while x) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
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

  it('while !do{', () => {
    t.deepStrictEqual(recovery('while !do{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
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
          statement: {
            type: 'DoWhileStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 10,
              end: 10,
              flags: 2
            },
            statement: {
              type: 'BlockStatement',
              leafs: [],
              start: 9,
              end: 10,

              flags: 0
            },
            start: 7,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

          flags: 0
        }
      ],
      text: 'while !do{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('{!while!foo!bar;', () => {
    t.deepStrictEqual(recovery('{!while!foo!bar;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
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
                  start: 2,
                  end: 2,

                  flags: 2
                },
                start: 1,
                end: 2,

                flags: 0
              },
              start: 1,
              end: 2,

              flags: 0
            },
            {
              type: 'WhileStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 8,
                  end: 11,

                  flags: 0
                },
                start: 7,
                end: 11,

                flags: 0
              },
              statement: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',
                    name: 'bar',
                    start: 12,
                    end: 15,

                    flags: 0
                  },
                  start: 11,
                  end: 15,

                  flags: 0
                },
                start: 11,
                end: 16,

                flags: 0
              },
              start: 2,
              end: 16,

              flags: 0
            }
          ],
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: '{!while!foo!bar;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('a(while){', () => {
    t.deepStrictEqual(recovery('a(while){', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,

              flags: 0
            },
            arguments: [],
            start: 0,
            end: 2,

            flags: 0
          },
          start: 0,
          end: 2,

          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 7,
            end: 7,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 8,
            end: 9,

            flags: 0
          },
          start: 2,
          end: 9,

          flags: 0
        }
      ],
      text: 'a(while){',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 2,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
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
});
