import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Binary', () => {
  it('(a + b) >>', () => {
    t.deepStrictEqual(recovery('(a + b) >>', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
                  flags: 0
                },
                operator: '+',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 4,
                  end: 6,
                  flags: 0
                },
                start: 1,
                end: 6,
                flags: 0
              },
              start: 0,
              end: 7,
              flags: 0
            },
            operator: '>>',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 10,
              end: 10,
              flags: 2
            },
            start: 0,
            end: 10,
            flags: 0
          },
          start: 0,
          end: 10,
          flags: 0
        }
      ],
      text: '(a + b) >>',
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

  it('a ?? b ??', () => {
    t.deepStrictEqual(recovery('a ?? b ??', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                flags: 0
              },
              operator: '??',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 6,

                flags: 0
              },
              start: 0,
              end: 6,
              flags: 0
            },
            operator: '??',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,

              flags: 2
            },
            start: 0,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,
          flags: 0
        }
      ],
      text: 'a ?? b ??',
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
          length: 2
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

  it('~3 ** => { **', () => {
    t.deepStrictEqual(recovery('~3 ** => { **', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: '~',
              operand: {
                type: 'NumericLiteral',
                value: 3,
                start: 1,
                end: 2,

                flags: 0
              },
              start: 0,
              end: 2,

              flags: 0
            },
            operator: '**',
            right: {
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
          start: 0,
          end: 5,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 10,
                  end: 10,
                  flags: 2
                },
                operator: '**',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 13,
                  end: 13,
                  flags: 2
                },
                start: 10,
                end: 13,
                flags: 0
              },
              start: 10,
              end: 13,
              flags: 0
            }
          ],
          start: 8,
          end: 13,
          flags: 0
        }
      ],
      text: '~3 ** => { **',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message:
            'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
          code: 34,
          start: 3,
          length: 2
        },
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
          start: 11,
          length: 2
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

  it('typeof 3 *[', () => {
    t.deepStrictEqual(recovery('typeof 3 *[', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: 'typeof',
              operand: {
                type: 'NumericLiteral',
                value: 3,
                start: 6,
                end: 8,
                flags: 0
              },
              start: 0,
              end: 8,

              flags: 0
            },
            operator: '*',
            right: {
              type: 'ArrayLiteral',
              elements: [],
              start: 10,
              end: 11,

              flags: 0
            },
            start: 0,
            end: 11,
            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'typeof 3 *[',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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
  it('typeof 3 *[ {x=y}', () => {
    t.deepStrictEqual(recovery('typeof 3 *[ {x=y}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: 'typeof',
              operand: {
                type: 'NumericLiteral',

                value: 3,
                start: 6,
                end: 8,
                flags: 0
              },
              start: 0,
              end: 8,
              flags: 0
            },
            operator: '*',
            right: {
              type: 'ArrayLiteral',
              elements: [
                {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'CoverInitializedName',
                      left: {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 13,
                        end: 14,
                        flags: 0
                      },
                      right: {
                        type: 'IdentifierReference',
                        name: 'y',
                        start: 15,
                        end: 16,
                        flags: 0
                      },
                      start: 13,
                      end: 16,
                      flags: 0
                    }
                  ],
                  start: 11,
                  end: 17,
                  flags: 0
                }
              ],
              start: 10,
              end: 17,

              flags: 0
            },
            start: 0,
            end: 17,
            flags: 0
          },
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: 'typeof 3 *[ {x=y}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
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
  it('[**??!!))==abc', () => {
    t.deepStrictEqual(recovery('[**??!!))==abc', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 1,
                    end: 1,
                    flags: 2
                  },
                  operator: '**',
                  right: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 3,
                    end: 3,
                    flags: 2
                  },
                  start: 1,
                  end: 3,
                  flags: 0
                },
                operator: '??',
                right: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'UnaryExpression',
                    operator: '!',
                    operand: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 7,
                      end: 7,

                      flags: 2
                    },
                    start: 6,
                    end: 7,

                    flags: 0
                  },
                  start: 5,
                  end: 7,

                  flags: 0
                },
                start: 1,
                end: 7,

                flags: 0
              }
            ],
            start: 0,
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
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,

              flags: 2
            },
            operator: '==',
            right: {
              type: 'IdentifierReference',
              name: 'abc',
              start: 11,
              end: 14,

              flags: 0
            },
            start: 9,
            end: 14,

            flags: 0
          },
          start: 9,
          end: 14,

          flags: 0
        }
      ],
      text: '[**??!!))==abc',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
          length: 2
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
          message: 'Statement expected',
          code: 8,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
          length: 2
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

  it('a**/', () => {
    t.deepStrictEqual(recovery('a**/', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,

              flags: 0
            },
            operator: '**',
            right: {
              type: 'RegularExpressionLiteral',
              pattern: '',
              flag: '',
              start: 3,
              end: 5,

              flags: 0
            },
            start: 0,
            end: 5,
            flags: 0
          },
          start: 0,
          end: 5,
          flags: 0
        }
      ],
      text: 'a**/',
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

  it('+/ a', () => {
    t.deepStrictEqual(recovery('+/ a', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'RegularExpressionLiteral',
              pattern: ' ',
              flag: '',
              start: 1,
              end: 4,
              flags: 0
            },
            start: 0,
            end: 4,
            flags: 0
          },
          start: 0,
          end: 4,
          flags: 0
        }
      ],
      text: '+/ a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
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

  it('a - (', () => {
    t.deepStrictEqual(recovery('a - (', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              flags: 0
            },
            operator: '-',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,

                flags: 2
              },
              start: 3,
              end: 5,
              flags: 0
            },
            start: 0,
            end: 5,

            flags: 0
          },
          start: 0,
          end: 5,

          flags: 0
        }
      ],
      text: 'a - (',
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
});
