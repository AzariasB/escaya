import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Const', () => {
  it('const ...a = 1;', () => {
    t.deepStrictEqual(recovery('const ...a = 1;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 9,
              end: 10,

              flags: 0
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',

              value: 1,
              start: 12,
              end: 14,

              flags: 0
            },
            start: 9,
            end: 14,

            flags: 0
          },
          start: 9,
          end: 15,

          flags: 0
        }
      ],
      text: 'const ...a = 1;',
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
          length: 3
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

  it('const a = 2, ...b = ', () => {
    t.deepStrictEqual(recovery('const a = 2, ...b = ', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 5,
                end: 7,

                flags: 0
              },
              initializer: {
                type: 'NumericLiteral',

                value: 2,
                start: 9,
                end: 11,

                flags: 0
              },
              start: 5,
              end: 11,

              flags: 0
            }
          ],
          start: 0,
          end: 12,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'b',
              start: 16,
              end: 17,

              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,

              flags: 2
            },
            start: 16,
            end: 19,

            flags: 0
          },
          start: 16,
          end: 19,

          flags: 0
        }
      ],
      text: 'const a = 2, ...b = ',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Lexical binding expected',
          code: 16,
          start: 13,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 18,
          length: 2
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

  it('const l\\u006', () => {
    t.deepStrictEqual(recovery('const l\\u006', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'l',
                start: 5,
                end: 7,

                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,

              flags: 0
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: '￿',
                start: 7,
                end: 8,

                flags: 0
              },
              initializer: null,
              start: 7,
              end: 8,

              flags: 0
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'u006',
                start: 8,
                end: 12,

                flags: 0
              },
              initializer: null,
              start: 8,
              end: 12,

              flags: 0
            }
          ],
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      text: 'const l\\u006',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid hexadecimal escape sequence',
          code: 50,
          start: 7,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 8,
          length: 4
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

  it('const {x:y=/ {', () => {
    t.deepStrictEqual(recovery('const {x:y=/ {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 7,
                      end: 9,

                      flags: 0
                    },
                    value: {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'y',
                        start: 9,
                        end: 10,

                        flags: 0
                      },
                      right: {
                        type: 'RegularExpressionLiteral',
                        pattern: ' ',
                        flag: '',
                        start: 11,
                        end: 14,

                        flags: 0
                      },
                      start: 9,
                      end: 14,

                      flags: 0
                    },
                    start: 7,
                    end: 14,

                    flags: 0
                  }
                ],
                start: 5,
                end: 14,

                flags: 0
              },
              initializer: null,
              start: 5,
              end: 14,

              flags: 0
            }
          ],
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'const {x:y=/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 11,
          length: 3
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

  it('const {/ {', () => {
    t.deepStrictEqual(recovery('const {/ {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [],
                start: 5,
                end: 7,

                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,

              flags: 0
            }
          ],
          start: 0,
          end: 7,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 8,
              end: 10,

              flags: 0
            },
            start: 7,
            end: 10,

            flags: 0
          },
          start: 7,
          end: 10,

          flags: 0
        }
      ],
      text: 'const {/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('const a;b;', () => {
    t.deepStrictEqual(recovery('const a;b;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 5,
                end: 7,

                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,

              flags: 0
            }
          ],
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 8,
            end: 9,

            flags: 0
          },
          start: 8,
          end: 10,

          flags: 0
        }
      ],
      text: 'const a;b;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 7,
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

  it('const \nb;', () => {
    t.deepStrictEqual(recovery('const \nb;', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 45,
          kind: 3,
          length: 1,
          message: 'Missing initializer in destructuring declaration',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 9,
      fileName: 'recovery.js',
      incremental: false,

      type: 'RootNode',
      webCompat: true,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 8,
                flags: 0,

                name: 'b',
                start: 5,
                type: 'BindingIdentifier'
              },
              end: 8,
              flags: 0,
              initializer: null,

              start: 5,
              type: 'LexicalBinding'
            }
          ],
          end: 9,
          flags: 0,
          isConst: true,

          start: 0,
          type: 'LexicalDeclaration'
        }
      ],
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'const \nb;'
    });
  });

  it('const a\nb;', () => {
    t.deepStrictEqual(recovery('const a\nb;', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 45,
          kind: 3,
          length: 1,
          message: 'Missing initializer in destructuring declaration',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 10,
      fileName: 'recovery.js',
      incremental: false,

      type: 'RootNode',
      webCompat: true,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 7,
                flags: 0,

                name: 'a',
                start: 5,
                type: 'BindingIdentifier'
              },
              end: 7,
              flags: 0,
              initializer: null,

              start: 5,
              type: 'LexicalBinding'
            }
          ],
          end: 7,
          flags: 0,
          isConst: true,

          start: 0,
          type: 'LexicalDeclaration'
        },
        {
          end: 10,
          expression: {
            end: 9,
            flags: 0,

            name: 'b',
            start: 7,
            type: 'IdentifierReference'
          },
          flags: 0,

          start: 7,
          type: 'ExpressionStatement'
        }
      ],
      length: 10,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'const a\nb;'
    });
  });

  it('const', () => {
    t.deepStrictEqual(recovery('const', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,

          flags: 0
        }
      ],
      text: 'const',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('const {', () => {
    t.deepStrictEqual(recovery('const {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [],
                start: 5,
                end: 7,

                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,

              flags: 0
            }
          ],
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'const {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('!{const ,,,', () => {
    t.deepStrictEqual(recovery('!{const ,,,', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'IdentifierReference',
                      name: 'const',
                      start: 2,
                      end: 7,

                      flags: 0
                    }
                  ],
                  start: 1,
                  end: 9,

                  flags: 0
                },
                start: 0,
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
              }
            ],
            start: 0,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: '!{const ,,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 2,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('const ({', () => {
    t.deepStrictEqual(recovery('const ({', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 7,
              end: 8,

              flags: 0
            },
            start: 5,
            end: 8,

            flags: 0
          },
          start: 5,
          end: 8,

          flags: 0
        }
      ],
      text: 'const ({',
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
});
