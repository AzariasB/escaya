import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - For', () => {
  it('for (var i = 0; i < 40000; i++) { src = { ...i, x: -9007199254740991 }; clone = { ...src }; }', () => {
    t.deepEqual(
      recovery(
        'for (var i = 0; i < 40000; i++) { src = { ...i, x: -9007199254740991 }; clone = { ...src }; }',
        'recovery.js'
      ),
      {
        type: 'RootNode',
        webCompat: true,
        directives: [],
        leafs: [
          {
            type: 'ForStatement',
            variableDeclarationList: true,
            initializer: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'i',
                  start: 8,
                  end: 10,

                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',

                  value: 0,
                  start: 12,
                  end: 14,

                  flags: 0
                },
                start: 8,
                end: 14,

                flags: 0
              }
            ],
            condition: {
              type: 'PostfixUpdateExpression',
              operator: '++',
              operand: {
                type: 'IdentifierReference',
                name: 'i',
                start: 26,
                end: 28,

                flags: 0
              },
              start: 28,
              end: 30,

              flags: 0
            },
            incrementor: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'i',
                start: 15,
                end: 17,

                flags: 0
              },
              operator: '<',
              right: {
                type: 'NumericLiteral',

                value: 40000,
                start: 19,
                end: 25,

                flags: 0
              },
              start: 15,
              end: 25,

              flags: 0
            },
            statement: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'src',
                      start: 33,
                      end: 37,

                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'ObjectLiteral',
                      properties: [
                        {
                          type: 'SpreadProperty',
                          argument: {
                            type: 'IdentifierReference',
                            name: 'i',
                            start: 45,
                            end: 46,

                            flags: 0
                          },
                          start: 41,
                          end: 46,

                          flags: 0
                        },
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'IdentifierName',
                            name: 'x',
                            start: 47,
                            end: 49,

                            flags: 0
                          },
                          value: {
                            type: 'UnaryExpression',
                            operator: '-',
                            operand: {
                              type: 'NumericLiteral',

                              value: 9007199254740991,
                              start: 52,
                              end: 68,

                              flags: 0
                            },
                            start: 50,
                            end: 68,

                            flags: 0
                          },
                          start: 47,
                          end: 68,

                          flags: 0
                        }
                      ],
                      start: 39,
                      end: 70,

                      flags: 0
                    },
                    start: 33,
                    end: 70,

                    flags: 0
                  },
                  start: 33,
                  end: 71,

                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'clone',
                      start: 71,
                      end: 77,

                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'ObjectLiteral',
                      properties: [
                        {
                          type: 'SpreadProperty',
                          argument: {
                            type: 'IdentifierReference',
                            name: 'src',
                            start: 85,
                            end: 88,

                            flags: 0
                          },
                          start: 81,
                          end: 88,

                          flags: 0
                        }
                      ],
                      start: 79,
                      end: 90,

                      flags: 0
                    },
                    start: 71,
                    end: 90,

                    flags: 0
                  },
                  start: 71,
                  end: 91,

                  flags: 0
                }
              ],
              start: 31,
              end: 93,

              flags: 0
            },
            start: 0,
            end: 93,
            flags: 0
          }
        ],
        text: 'for (var i = 0; i < 40000; i++) { src = { ...i, x: -9007199254740991 }; clone = { ...src }; }',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 93,
        end: 93
      }
    );
  });

  it('for ([{__proto__: 1, __proto__: 2}];;);', () => {
    t.deepEqual(recovery('for ([{__proto__: 1, __proto__: 2}];;);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: '__proto__',
                      start: 7,
                      end: 16,

                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',

                      value: 1,
                      start: 17,
                      end: 19,

                      flags: 0
                    },
                    start: 7,
                    end: 19,

                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: '__proto__',
                      start: 20,
                      end: 30,

                      flags: 0
                    },
                    value: {
                      type: 'NumericLiteral',

                      value: 2,
                      start: 31,
                      end: 33,

                      flags: 0
                    },
                    start: 20,
                    end: 33,

                    flags: 0
                  }
                ],
                start: 6,
                end: 34,

                flags: 0
              }
            ],
            start: 5,
            end: 35,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 38,
            end: 39,
            flags: 0
          },
          start: 0,
          end: 39,
          flags: 0
        }
      ],
      text: 'for ([{__proto__: 1, __proto__: 2}];;);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 137,
          kind: 3,
          length: 31,
          message: 'Redefinition of `__proto__` property',
          source: 2,
          start: 5
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

  it('for ([a];;);', () => {
    t.deepEqual(recovery('for ([a];;);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 6,
                end: 7,

                flags: 0
              }
            ],
            start: 5,
            end: 8,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 11,
            end: 12,
            flags: 0
          },
          start: 0,
          end: 12,
          flags: 0
        }
      ],
      text: 'for ([a];;);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('for (((x)=>{}).x of y);', () => {
    t.deepEqual(recovery('for (((x)=>{}).x of y);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ArrowFunction',
                arrowParameters: true,
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 7,
                    end: 8,

                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 11,
                  end: 13,

                  flags: 0
                },
                async: false,
                start: 6,
                end: 13,

                flags: 0
              },
              start: 5,
              end: 14,
              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'x',
              start: 15,
              end: 16,

              flags: 0
            },
            computed: false,
            start: 5,
            end: 16,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'y',
            start: 19,
            end: 21,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,
            flags: 0
          },
          await: false,
          start: 0,
          end: 23,
          flags: 0
        }
      ],
      text: 'for (((x)=>{}).x of y);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('for ({}[y] ^= x;;) x;', () => {
    t.deepEqual(recovery('for ({}[y] ^= x;;) x;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'ObjectLiteral',
                properties: [],
                start: 5,
                end: 7,

                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: 'y',
                start: 8,
                end: 9,

                flags: 0
              },
              computed: true,
              start: 7,
              end: 10,

              flags: 0
            },
            operator: '^=',
            right: {
              type: 'IdentifierReference',
              name: 'x',
              start: 13,
              end: 15,

              flags: 0
            },
            start: 10,
            end: 15,

            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 18,
              end: 20,

              flags: 0
            },
            start: 18,
            end: 21,

            flags: 0
          },
          start: 0,
          end: 21,
          flags: 0
        }
      ],
      text: 'for ({}[y] ^= x;;) x;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('for', () => {
    t.deepEqual(recovery('for', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',

            name: '',
            start: 3,
            end: 3,
            flags: 2
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 3,
            end: 3,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',

            name: '',
            start: 3,
            end: 3,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 3,
              end: 3,
              flags: 2
            },
            start: 3,
            end: 3,

            flags: 0
          },
          start: 0,
          end: 3,
          flags: 0
        }
      ],
      text: 'for',
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

  it('for)', () => {
    t.deepEqual(recovery('for)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 3,
            end: 3,

            flags: 2
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 3,
            end: 3,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,

              flags: 2
            },
            start: 4,
            end: 4,

            flags: 0
          },
          start: 0,
          end: 4,
          flags: 0
        }
      ],
      text: 'for)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 1
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
  it('for keyword11', () => {
    t.deepEqual(recovery('for(!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',

              name: '',
              start: 5,
              end: 5,
              flags: 2
            },
            start: 4,
            end: 5,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          incrementor: {
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
      text: 'for(!',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });
  it('for(let x', () => {
    t.deepEqual(recovery('for(let x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,

                flags: 0
              }
            ],
            start: 4,
            end: 9,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,

            flags: 2
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
      text: 'for(let x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
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
  it('for keywordd', () => {
    t.deepEqual(recovery('for(let.xy', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',

              name: 'let',
              start: 4,
              end: 7,
              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'xy',
              start: 8,
              end: 10,

              flags: 0
            },
            computed: false,
            start: 0,
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
          start: 0,
          end: 10,
          flags: 0
        }
      ],
      text: 'for(let.xy',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
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
      length: 10,
      end: 10
    });
  });
  it('for(let.s =', () => {
    t.deepEqual(recovery('for(let.s =', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'let',
                start: 4,
                end: 7,

                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 's',
                start: 8,
                end: 9,

                flags: 0
              },
              computed: false,
              start: 0,
              end: 9,

              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,

              flags: 2
            },
            start: 9,
            end: 11,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
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
      text: 'for(let.s =',
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
  it('for let.for', () => {
    t.deepEqual(recovery('for let.for', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'let',
              start: 3,
              end: 7,

              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'for',
              start: 8,
              end: 11,

              flags: 0
            },
            computed: false,
            start: 0,
            end: 11,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
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
      text: 'for let.for',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 8,
          length: 3
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
  it('for(for) {}', () => {
    t.deepEqual(recovery('for(for) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 4,
            end: 4,

            flags: 2
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 4,
            end: 4,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 4,
            end: 4,

            flags: 2
          },
          statement: {
            type: 'ForStatement',
            variableDeclarationList: false,
            initializer: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            condition: null,
            incrementor: {
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
              end: 11,

              flags: 0
            },
            start: 4,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'for(for) {}',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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
      length: 11,
      end: 11
    });
  });

  it('for(var in x) {', () => {
    t.deepEqual(recovery('for(var in x) {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForBinding',
            declarations: [],
            start: 4,
            end: 7,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 10,
            end: 12,

            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 13,
            end: 15,

            flags: 0
          },
          start: 0,
          end: 15,
          flags: 0
        }
      ],
      text: 'for(var in x) {',
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
  it('for)var', () => {
    t.deepEqual(recovery('for)var', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 3,
            end: 3,

            flags: 2
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 3,
            end: 3,

            flags: 2
          },
          statement: {
            type: 'VariableStatement',
            declarations: [],
            start: 4,
            end: 7,
            flags: 0
          },
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'for)var',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
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
  it('for(var x of y,,,', () => {
    t.deepEqual(recovery('for(var x of y,,,', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForBinding',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,

                flags: 0
              }
            ],
            start: 4,
            end: 9,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'y',
            start: 12,
            end: 14,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
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
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 17,
                  end: 17,

                  flags: 2
                }
              ],
              start: 14,
              end: 17,

              flags: 0
            },
            start: 14,
            end: 17,

            flags: 0
          },
          await: false,
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: 'for(var x of y,,,',
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

  it('for ( of of) { }', () => {
    t.deepEqual(recovery('for ( of of) { }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'IdentifierReference',
            name: 'of',
            start: 5,
            end: 8,

            flags: 0
          },
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
            start: 12,
            end: 16,

            flags: 0
          },
          await: false,
          start: 0,
          end: 16,
          flags: 0
        }
      ],
      text: 'for ( of of) { }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 11,
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

  it('for (var of of) { }', () => {
    t.deepEqual(recovery('for (var of of) { }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForBinding',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'of',
                  start: 8,
                  end: 11,

                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 11,

                flags: 0
              }
            ],
            start: 5,
            end: 11,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 14,
            end: 14,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 15,
            end: 19,

            flags: 0
          },
          await: false,
          start: 0,
          end: 19,

          flags: 0
        }
      ],
      text: 'for (var of of) { }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 14,
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

  it('for(const =', () => {
    t.deepEqual(recovery('for(const =', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'AssignmentExpression',
            left: {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [],
              start: 4,
              end: 9,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,

              flags: 2
            },
            start: 9,
            end: 11,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
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
      text: 'for(const =',
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
  it('for (const x of for', () => {
    t.deepEqual(recovery('for (const x of for', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 10,
                  end: 12,

                  flags: 0
                },
                initializer: null,
                start: 10,
                end: 12,

                flags: 0
              }
            ],
            start: 5,
            end: 12,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 15,
            end: 15,

            flags: 2
          },
          statement: {
            type: 'ForStatement',
            variableDeclarationList: false,
            initializer: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,

              flags: 2
            },
            condition: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,

              flags: 2
            },
            incrementor: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,

              flags: 2
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 19,
                end: 19,

                flags: 2
              },
              start: 19,
              end: 19,

              flags: 0
            },
            start: 15,
            end: 19,

            flags: 0
          },
          await: false,
          start: 0,
          end: 19,

          flags: 0
        }
      ],
      text: 'for (const x of for',
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
          length: 3
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
  it('for (const x of', () => {
    t.deepEqual(recovery('for (const x of', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 10,
                  end: 12,

                  flags: 0
                },
                initializer: null,
                start: 10,
                end: 12,

                flags: 0
              }
            ],
            start: 5,
            end: 12,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 15,
            end: 15,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 15,
              end: 15,

              flags: 2
            },
            start: 15,
            end: 15,

            flags: 0
          },
          await: false,
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'for (const x of',
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
  it('for (a.d.', () => {
    t.deepEqual(recovery('for (a.d.', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',

                name: 'a',
                start: 5,
                end: 6,
                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'd',
                start: 7,
                end: 8,

                flags: 0
              },
              computed: false,
              start: 5,
              end: 8,

              flags: 0
            },
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 9,
              end: 9,
              flags: 2
            },
            computed: false,
            start: 5,
            end: 9,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',

            name: '',
            start: 9,
            end: 9,
            flags: 2
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
      text: 'for (a.d.',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
  it('for(a[', () => {
    t.deepEqual(recovery('for(a[', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',

              name: 'a',
              start: 4,
              end: 5,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 6,
              end: 6,
              flags: 2
            },
            computed: true,
            start: 4,
            end: 6,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 6,
            end: 6,
            flags: 2
          },
          incrementor: {
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
          start: 0,
          end: 6,

          flags: 0
        }
      ],
      text: 'for(a[',
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
  it('for(ab.[a', () => {
    t.deepEqual(recovery('for(ab.[a', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',

                name: 'ab',
                start: 4,
                end: 6,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',

                name: '',
                start: 7,
                end: 7,
                flags: 2
              },
              computed: false,
              start: 4,
              end: 7,

              flags: 0
            },
            expression: {
              type: 'IdentifierReference',

              name: 'a',
              start: 8,
              end: 9,
              flags: 0
            },
            computed: true,
            start: 4,
            end: 9,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',

            name: '',
            start: 9,
            end: 9,
            flags: 2
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
      text: 'for(ab.[a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          message: '`]` expected',
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
  it('for(,,,,,,,,,,,,', () => {
    t.deepEqual(recovery('for(,,,,,,,,,,,,', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,

                flags: 2
              },
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
            start: 4,
            end: 16,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 16,
            end: 16,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 16,
            end: 16,

            flags: 2
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
      text: 'for(,,,,,,,,,,,,',
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
        },
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
  it('for(,,,,,,,,,[) {break;', () => {
    t.deepEqual(recovery('for(,,,,,,,,,[) {break;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,

                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,

                flags: 2
              },
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
                type: 'ArrayLiteral',
                elements: [],
                start: 13,
                end: 14,
                flags: 0
              }
            ],
            start: 4,
            end: 14,

            flags: 0
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 14,
            end: 14,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'BreakStatement',
                label: null,
                start: 17,
                end: 23,
                flags: 0
              }
            ],
            start: 15,
            end: 23,

            flags: 0
          },
          start: 0,
          end: 23,
          flags: 0
        }
      ],
      text: 'for(,,,,,,,,,[) {break;',
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
        },
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
          message: '`]` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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
      end: 23
    });
  });
  it('for unary', () => {
    t.deepEqual(recovery('for!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',

              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 3,
            end: 4,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',

            name: '',
            start: 4,
            end: 4,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',

            name: '',
            start: 4,
            end: 4,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',

              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,

            flags: 0
          },
          start: 0,
          end: 4,
          flags: 0
        }
      ],
      text: 'for!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 1
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
});
