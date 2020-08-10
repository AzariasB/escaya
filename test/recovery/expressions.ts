import * as t from 'assert';
import { recovery } from '../../src/escaya';

describe('Recovery - Expressions', () => {
  it('[a] = [((1', () => {
    t.deepEqual(recovery('[a] = [((1', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentElement',
            left: {
              type: 'ArrayAssignmentPattern',
              elements: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 0,
              end: 5,
              kind: 214,
              flags: 0
            },
            right: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 9,
                      end: 10,
                      kind: 10,
                      flags: 0
                    },
                    start: 8,
                    end: 10,
                    kind: 189,
                    flags: 0
                  },
                  start: 7,
                  end: 10,
                  kind: 189,
                  flags: 0
                }
              ],
              start: 5,
              end: 10,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a] = [((1',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 10,
        end: 10
      },
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('({} = 1', () => {
    t.deepEqual(recovery('({} = 1', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'AssignmentElement',
              left: {
                type: 'ObjectAssignmentPattern',
                properties: [],
                start: 1,
                end: 5,
                kind: 211,
                flags: 0
              },
              right: {
                type: 'NumericLiteral',
                value: 1,
                start: 5,
                end: 7,
                kind: 10,
                flags: 0
              },
              start: 1,
              end: 7,
              kind: 213,
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
        }
      ],
      text: '({} = 1',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 6,
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
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });
  /*
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
    it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
    it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
    it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
    it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
    it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });
  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {});
  });

*/

  it('(1', () => {
    t.deepEqual(recovery('(1', 'recovery.js'), {
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
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '(1',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('++(!', () => {
    t.deepEqual(recovery('++(!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 13,
                  flags: 2
                },
                start: 3,
                end: 4,
                kind: 160,
                flags: 0
              },
              start: 2,
              end: 4,
              kind: 189,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 161,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '++(!',
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

  it('++!{(', () => {
    t.deepEqual(recovery('++!{(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'CallExpression',
                expression: {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 3,
                  end: 4,
                  kind: 179,
                  flags: 0
                },
                arguments: [],
                start: 3,
                end: 5,
                kind: 156,
                flags: 0
              },
              start: 2,
              end: 5,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 161,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '++!{(',
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

  it('!{(', () => {
    t.deepEqual(recovery('!{(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'CallExpression',
              expression: {
                type: 'ObjectLiteral',
                properties: [],
                start: 1,
                end: 2,
                kind: 179,
                flags: 0
              },
              arguments: [],
              start: 1,
              end: 3,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 2,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('(...x.y)', () => {
    t.deepEqual(recovery('(...x.y)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingRestElement',
                argument: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 4,
                  end: 5,
                  kind: 168,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 175,
                flags: 0
              }
            ],
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'y',
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
      text: '(...x.y)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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
          message: 'Statement expected',
          code: 8,
          start: 7,
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
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('()', () => {
    t.deepEqual(recovery('()', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 2,
            end: 2,
            kind: 13,
            flags: 2
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '()',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
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
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it(') =>', () => {
    t.deepEqual(recovery(') =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [],
      text: ') =>',
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
          message: 'Statement expected',
          code: 8,
          start: 2,
          length: 2
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

  it('(...x = y) => x', () => {
    t.deepEqual(recovery('(...x = y) => x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingRestElement',
                argument: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 4,
                  end: 5,
                  kind: 168,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 175,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 7,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                start: 5,
                end: 9,
                kind: 152,
                flags: 0
              },
              start: 5,
              end: 9,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 9,
            kind: 188,
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
            name: 'x',
            start: 13,
            end: 15,
            kind: 13,
            flags: 0
          },
          start: 13,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: '(...x = y) => x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          start: 11,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('(', () => {
    t.deepEqual(recovery('(', 'recovery.js'), {
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
      text: '(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 0,
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
        start: 1,
        end: 1
      },
      start: 0,
      length: 1,
      end: 1
    });
  });

  it('((((((', () => {
    t.deepEqual(recovery('((((((', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
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
                    start: 4,
                    end: 6,
                    kind: 189,
                    flags: 0
                  },
                  start: 3,
                  end: 6,
                  kind: 189,
                  flags: 0
                },
                start: 2,
                end: 6,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 6,
              kind: 189,
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
      text: '((((((',
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

  it('a(!', () => {
    t.deepEqual(recovery('a(!', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 3,
                  end: 3,
                  kind: 13,
                  flags: 2
                },
                start: 2,
                end: 3,
                kind: 160,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a(!',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('a(...', () => {
    t.deepEqual(recovery('a(...', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
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
        }
      ],
      text: 'a(...',
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
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('a((((((((', () => {
    t.deepEqual(recovery('a((((((((', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'ParenthesizedExpression',
                      expression: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'ParenthesizedExpression',
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
                          start: 7,
                          end: 9,
                          kind: 189,
                          flags: 0
                        },
                        start: 6,
                        end: 9,
                        kind: 189,
                        flags: 0
                      },
                      start: 5,
                      end: 9,
                      kind: 189,
                      flags: 0
                    },
                    start: 4,
                    end: 9,
                    kind: 189,
                    flags: 0
                  },
                  start: 3,
                  end: 9,
                  kind: 189,
                  flags: 0
                },
                start: 2,
                end: 9,
                kind: 189,
                flags: 0
              }
            ],
            start: 0,
            end: 9,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a((((((((',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 9,
        end: 9
      },
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('a((((((((!!', () => {
    t.deepEqual(recovery('a((((((((!!', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'ParenthesizedExpression',
                      expression: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'ParenthesizedExpression',
                          expression: {
                            type: 'ParenthesizedExpression',
                            expression: {
                              type: 'UnaryExpression',
                              operator: '!',
                              operand: {
                                type: 'UnaryExpression',
                                operator: '!',
                                operand: {
                                  type: 'IdentifierReference',
                                  name: '',
                                  start: 11,
                                  end: 11,
                                  kind: 13,
                                  flags: 2
                                },
                                start: 10,
                                end: 11,
                                kind: 160,
                                flags: 0
                              },
                              start: 9,
                              end: 11,
                              kind: 160,
                              flags: 0
                            },
                            start: 8,
                            end: 11,
                            kind: 189,
                            flags: 0
                          },
                          start: 7,
                          end: 11,
                          kind: 189,
                          flags: 0
                        },
                        start: 6,
                        end: 11,
                        kind: 189,
                        flags: 0
                      },
                      start: 5,
                      end: 11,
                      kind: 189,
                      flags: 0
                    },
                    start: 4,
                    end: 11,
                    kind: 189,
                    flags: 0
                  },
                  start: 3,
                  end: 11,
                  kind: 189,
                  flags: 0
                },
                start: 2,
                end: 11,
                kind: 189,
                flags: 0
              }
            ],
            start: 0,
            end: 11,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a((((((((!!',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('a...........', () => {
    t.deepEqual(recovery('a...........', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 0,
            end: 1,
            kind: 13,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a...........',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 1,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 7,
          length: 3
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
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 12,
        end: 12
      },
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('a...........!!', () => {
    t.deepEqual(recovery('a...........!!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 0,
            end: 1,
            kind: 13,
            flags: 0
          },
          start: 0,
          end: 1,
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
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,
                kind: 13,
                flags: 2
              },
              start: 13,
              end: 14,
              kind: 160,
              flags: 0
            },
            start: 12,
            end: 14,
            kind: 160,
            flags: 0
          },
          start: 12,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a...........!!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 1,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 7,
          length: 3
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

  it(',,,,,,,,,,,,,,,,,,,,,,,,,,,,a', () => {
    t.deepEqual(recovery(',,,,,,,,,,,,,,,,,,,,,,,,,,,,a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 28,
            end: 29,
            kind: 13,
            flags: 0
          },
          start: 28,
          end: 29,
          kind: 122,
          flags: 0
        }
      ],
      text: ',,,,,,,,,,,,,,,,,,,,,,,,,,,,a',
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
          message: 'Statement expected',
          code: 8,
          start: 1,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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
          message: 'Statement expected',
          code: 8,
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 24,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 26,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 27,
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
        start: 29,
        end: 29
      },
      start: 0,
      length: 29,
      end: 29
    });
  });

  it('a[=.', () => {
    t.deepEqual(recovery('a[=.', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,
                kind: 13,
                flags: 2
              },
              start: 2,
              end: 4,
              kind: 152,
              flags: 0
            },
            computed: true,
            start: 0,
            end: 4,
            kind: 154,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a[=.',
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
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
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
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('`++', () => {
    t.deepEqual(recovery('`++', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TemplateLiteral',
            raw: '++',
            value: '',
            start: 0,
            end: 3,
            kind: 197,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '`++',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated template literal',
          code: 52,
          start: 0,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('`${', () => {
    t.deepEqual(recovery('`${', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TemplateExpression',
            elements: [
              {
                type: 'TemplateElement',
                raw: '',
                value: '',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 3,
                  end: 3,
                  kind: 13,
                  flags: 2
                },
                start: 0,
                end: 3,
                kind: 195,
                flags: 0
              },
              {
                type: 'TemplateElement',
                raw: '',
                value: '',
                expression: null,
                start: 3,
                end: 3,
                kind: 195,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            kind: 196,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '`${',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 0,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('?:b', () => {
    t.deepEqual(recovery('?:b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 2,
            end: 3,
            kind: 13,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '?:b',
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
          message: 'Statement expected',
          code: 8,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('[k', () => {
    t.deepEqual(recovery('[k', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'IdentifierReference',
                name: 'k',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 2,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '[k',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('+=>', () => {
    t.deepEqual(recovery('+=>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 2,
              end: 2,
              kind: 13,
              flags: 2
            },
            operator: '>',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 3,
              end: 3,
              kind: 13,
              flags: 2
            },
            start: 2,
            end: 3,
            kind: 155,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '+=>',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('+= >', () => {
    t.deepEqual(recovery('+= >', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 2,
              end: 2,
              kind: 13,
              flags: 2
            },
            operator: '>',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 2,
            end: 4,
            kind: 155,
            flags: 0
          },
          start: 2,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '+= >',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
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
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('+ =>', () => {
    t.deepEqual(recovery('+ =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 4,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '+ =>',
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
          length: 2
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

  it('+ = >', () => {
    t.deepEqual(recovery('+ = >', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'UnaryExpression',
              operator: '+',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 1,
                end: 1,
                kind: 13,
                flags: 2
              },
              start: 0,
              end: 1,
              kind: 160,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              operator: '>',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              start: 3,
              end: 5,
              kind: 155,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '+ = >',
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
          length: 1
        },
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

  it('+ /= >', () => {
    t.deepEqual(recovery('+ /= >', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'RegularExpressionLiteral',
              pattern: '= ',
              flag: '',
              start: 1,
              end: 6,
              kind: 15,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '+ /= >',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 2,
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
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('+!{', () => {
    t.deepEqual(recovery('+!{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [],
                start: 2,
                end: 3,
                kind: 179,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '+!{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 2,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('={function', () => {
    t.deepEqual(recovery('={function', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
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
                start: 10,
                end: 10,
                kind: 184,
                flags: 0
              },
              start: 2,
              end: 10,
              kind: 186,
              flags: 0
            }
          ],
          start: 1,
          end: 10,
          kind: 123,
          flags: 0
        }
      ],
      text: '={function',
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
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 2,
          length: 8
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 10,
        end: 10
      },
      start: 0,
      length: 10,
      end: 10
    });
  });

  it(')=/++!{class', () => {
    t.deepEqual(recovery(')=/++!{class', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 0
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 1
        },
        {
          code: 12,
          kind: 2,
          length: 10,
          message: 'Unterminated regular expression',
          source: 0,
          start: 2
        }
      ],
      directives: [],
      end: 12,
      EOF: {
        end: 12,
        kind: 16384,
        start: 12,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 12,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 12,
          expression: {
            end: 12,
            flag: '',
            flags: 0,
            kind: 15,
            pattern: '++!{clas',
            start: 2,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,
          kind: 122,
          start: 2,
          type: 'ExpressionStatement'
        }
      ],
      text: ')=/++!{class'
    });
  });

  it('[a/', () => {
    t.deepEqual(recovery('[a/', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
                  kind: 13,
                  flags: 0
                },
                operator: '/',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 3,
                  end: 3,
                  kind: 13,
                  flags: 2
                },
                start: 1,
                end: 3,
                kind: 155,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a/',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('/ / / ', () => {
    t.deepEqual(recovery('/ / /', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'RegularExpressionLiteral',
              pattern: ' ',
              flag: '',
              start: 0,
              end: 3,
              kind: 15,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 5,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '/ / /',
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

  it('/000//////++!', () => {
    t.deepEqual(recovery('/000//////++!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '000',
            flag: '',
            start: 0,
            end: 5,
            kind: 15,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '/000//////++!',
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
        start: 13,
        end: 13
      },
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('/* */ / // foo', () => {
    t.deepEqual(recovery('/* */ / // foo', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'RegularExpressionLiteral',
              pattern: ' ',
              flag: '',
              start: 0,
              end: 9,
              kind: 15,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 10,
              end: 14,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '/* */ / // foo',
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
        start: 14,
        end: 14
      },
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('/* */ / // foo /', () => {
    t.deepEqual(recovery('/* */ / // foo /', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'RegularExpressionLiteral',
                pattern: ' ',
                flag: '',
                start: 0,
                end: 9,
                kind: 15,
                flags: 0
              },
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: 'foo',
                start: 10,
                end: 14,
                kind: 13,
                flags: 0
              },
              start: 0,
              end: 14,
              kind: 155,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 16,
              end: 16,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 16,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '/* */ / // foo /',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 16,
        end: 16
      },
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('package\n/', () => {
    t.deepEqual(recovery('package\n/', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 7,
          kind: 2,
          length: 1,
          message: 'Expression expected',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 9,
      EOF: {
        end: 9,
        kind: 16384,
        start: 9,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 9,
          expression: {
            end: 9,
            flags: 0,
            kind: 155,
            left: {
              end: 7,
              flags: 0,
              kind: 13,
              name: 'package',
              start: 0,
              type: 'IdentifierReference'
            },
            operator: '/',
            right: {
              end: 9,
              flags: 2,
              kind: 13,
              name: '',
              start: 9,
              type: 'IdentifierReference'
            },
            start: 0,
            type: 'BinaryExpression'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      text: 'package\n/'
    });
  });

  it('(foo.)', () => {
    t.deepEqual(recovery('(foo.)', 'recovery.js', { module: true }), {
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
                name: 'foo',
                start: 1,
                end: 4,
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
              computed: false,
              start: 1,
              end: 5,
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
        }
      ],
      text: '(foo.)',
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

  it('foo.\nif (3===4) {}\n', () => {
    t.deepEqual(recovery('foo.\nif (3===4) {}\n', 'recovery.js', { module: true }), {
      children: [],
      context: 0,
      diagnostics: [],
      directives: [],
      end: 19,
      EOF: {
        end: 19,
        kind: 16384,
        start: 19,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 19,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 15,
          expression: {
            arguments: [
              {
                end: 14,
                flags: 0,
                kind: 155,
                left: {
                  end: 10,
                  flags: 0,
                  kind: 10,
                  start: 9,
                  type: 'NumericLiteral',
                  value: 3
                },
                operator: '===',
                right: {
                  end: 14,
                  flags: 0,
                  kind: 10,
                  start: 13,
                  type: 'NumericLiteral',
                  value: 4
                },
                start: 9,
                type: 'BinaryExpression'
              }
            ],
            end: 15,
            expression: {
              computed: false,
              end: 7,
              expression: {
                end: 7,
                flags: 0,
                kind: 13,
                name: 'if',
                start: 4,
                type: 'IdentifierName'
              },
              flags: 0,
              kind: 154,
              member: {
                end: 3,
                flags: 0,
                kind: 13,
                name: 'foo',
                start: 0,
                type: 'IdentifierReference'
              },
              start: 0,
              type: 'MemberExpression'
            },
            flags: 0,
            kind: 156,
            start: 0,
            type: 'CallExpression'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 18,
          flags: 0,
          kind: 123,
          start: 15,
          leafs: [],
          type: 'BlockStatement'
        }
      ],
      text: 'foo.\nif (3===4) {}\n'
    });
  });

  it('foo. && true;', () => {
    t.deepEqual(recovery('foo. && true;', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'foo',
                start: 0,
                end: 3,
                kind: 13,
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
            operator: '&&',
            right: {
              type: 'BooleanLiteral',
              value: true,
              start: 7,
              end: 12,
              kind: 166,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'foo. && true;',
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
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 13,
        end: 13
      },
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('(foo.bar. || true);', () => {
    t.deepEqual(recovery('(foo.bar. || true);', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'MemberExpression',
                member: {
                  type: 'MemberExpression',
                  member: {
                    type: 'IdentifierReference',
                    name: 'foo',
                    start: 1,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'bar',
                    start: 5,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  computed: false,
                  start: 1,
                  end: 8,
                  kind: 154,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 9,
                  end: 9,
                  kind: 13,
                  flags: 2
                },
                computed: false,
                start: 1,
                end: 9,
                kind: 154,
                flags: 0
              },
              operator: '||',
              right: {
                type: 'BooleanLiteral',
                value: true,
                start: 12,
                end: 17,
                kind: 166,
                flags: 0
              },
              start: 1,
              end: 17,
              kind: 155,
              flags: 0
            },
            start: 0,
            end: 18,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: '(foo.bar. || true);',
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
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 19,
        end: 19
      },
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('if (foo.', () => {
    t.deepEqual(recovery('if (foo.', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 4,
              end: 7,
              kind: 13,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,
              kind: 13,
              flags: 2
            },
            computed: false,
            start: 4,
            end: 8,
            kind: 154,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 8,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 8,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if (foo.',
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
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('x = 2,;', () => {
    t.deepEqual(recovery('x = 2,;', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 0,
                  end: 1,
                  kind: 13,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'NumericLiteral',
                  value: 2,
                  start: 3,
                  end: 5,
                  kind: 10,
                  flags: 0
                },
                start: 0,
                end: 5,
                kind: 152,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,
                kind: 13,
                flags: 2
              }
            ],
            start: 0,
            end: 6,
            kind: 147,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'x = 2,;',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('{ foo: ', () => {
    t.deepEqual(recovery('{ foo:', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'foo',
                  start: 1,
                  end: 6,
                  kind: 13,
                  flags: 0
                },
                labelledItem: {
                  type: 'ExpressionStatement',
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
                  kind: 122,
                  flags: 0
                },
                start: 1,
                end: 6,
                kind: 134,
                flags: 0
              },
              start: 1,
              end: 6,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ foo:',
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

  it('{ foo: bar,', () => {
    t.deepEqual(recovery('{ foo: bar,', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'foo',
                  start: 1,
                  end: 6,
                  kind: 13,
                  flags: 0
                },
                labelledItem: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CommaOperator',
                    expressions: [
                      {
                        type: 'IdentifierReference',
                        name: 'bar',
                        start: 6,
                        end: 10,
                        kind: 13,
                        flags: 0
                      },
                      {
                        type: 'IdentifierReference',
                        name: '',
                        start: 11,
                        end: 11,
                        kind: 13,
                        flags: 2
                      }
                    ],
                    start: 6,
                    end: 11,
                    kind: 147,
                    flags: 0
                  },
                  start: 6,
                  end: 11,
                  kind: 122,
                  flags: 0
                },
                start: 1,
                end: 11,
                kind: 134,
                flags: 0
              },
              start: 1,
              end: 11,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 11,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ foo: bar,',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('foo(a,foo.', () => {
    t.deepEqual(recovery('foo(a,foo.', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 0,
              end: 3,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 4,
                end: 5,
                kind: 13,
                flags: 0
              },
              {
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 6,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 10,
                  end: 10,
                  kind: 13,
                  flags: 2
                },
                computed: false,
                start: 6,
                end: 10,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'foo(a,foo.',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
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
        start: 10,
        end: 10
      },
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('typeof', () => {
    t.deepEqual(recovery('typeof', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'typeof',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 6,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: 'typeof',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 0,
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
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('new', () => {
    t.deepEqual(recovery('new', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 3,
              end: 3,
              kind: 13,
              flags: 2
            },
            arguments: [],
            start: 0,
            end: 3,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 0,
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('a==b?', () => {
    t.deepEqual(recovery('a==b?', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            shortCircuit: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              operator: '==',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              },
              start: 0,
              end: 4,
              kind: 155,
              flags: 0
            },
            consequent: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            alternate: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 5,
            kind: 153,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a==b?',
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

  it('a==b?c:', () => {
    t.deepEqual(recovery('a==b?c:', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            shortCircuit: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              operator: '==',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              },
              start: 0,
              end: 4,
              kind: 155,
              flags: 0
            },
            consequent: {
              type: 'IdentifierReference',
              name: 'c',
              start: 5,
              end: 6,
              kind: 13,
              flags: 0
            },
            alternate: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 7,
            kind: 153,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a==b?c:',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('a==b?:', () => {
    t.deepEqual(recovery('a==b?:', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            shortCircuit: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              operator: '==',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              },
              start: 0,
              end: 4,
              kind: 155,
              flags: 0
            },
            consequent: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            alternate: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 6,
            kind: 153,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a==b?:',
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

  it('var package = yield!', () => {
    t.deepEqual(recovery('var package = yield!', 'recovery.js', { module: true }), {
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
                name: '',
                start: 3,
                end: 11,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 13,
                end: 19,
                kind: 13,
                flags: 0
              },
              start: 3,
              end: 19,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 19,
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
              start: 20,
              end: 20,
              kind: 13,
              flags: 2
            },
            start: 19,
            end: 20,
            kind: 160,
            flags: 0
          },
          start: 19,
          end: 20,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var package = yield!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 4,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 19,
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
        start: 20,
        end: 20
      },
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('let[ let yield foo; var package: bar ]', () => {
    t.deepEqual(recovery('let[ let yield foo; var package: bar ]', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: '',
                    start: 4,
                    end: 8,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: '',
                    start: 8,
                    end: 14,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'foo',
                    start: 14,
                    end: 18,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 3,
                end: 18,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 18,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 19,
          kind: 145,
          flags: 0
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: '',
                start: 23,
                end: 31,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 23,
              end: 31,
              kind: 144,
              flags: 0
            }
          ],
          start: 19,
          end: 31,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'bar',
            start: 32,
            end: 36,
            kind: 13,
            flags: 0
          },
          start: 32,
          end: 36,
          kind: 122,
          flags: 0
        }
      ],
      text: 'let[ let yield foo; var package: bar ]',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 5,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 9,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 24,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 31,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 37,
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
        start: 38,
        end: 38
      },
      start: 0,
      length: 38,
      end: 38
    });
  });

  /* it('function(//\n/', () => {
    t.deepEqual(recovery('function(//\n/', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 10,
          kind: 3,
          length: 1,
          message: 'Function declaration require a name in this context',
          source: 2,
          start: 8
        },
        {
          code: 12,
          kind: 2,
          length: 2,
          message: 'Unterminated regular expression',
          source: 0,
          start: 12
        }
      ],
      directives: [],
      end: 13,
      EOF: {
        end: 13,
        kind: 16384,
        start: 13,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      leafs: [
        {
          async: false,
          contents: {
            directives: [],
            end: 14,
            flags: 0,
            kind: 184,
            leafs: [],
            start: 14,
            type: 'FunctionBody'
          },
          end: 14,
          flags: 0,
          generator: false,
          kind: 186,
          name: null,
          params: [
            {
              end: 14,
              flags: 0,
              kind: 168,
              name: '',
              start: 14,
              type: 'BindingIdentifier'
            }
          ],
          start: 0,
          type: 'FunctionDeclaration'
        }
      ],
      length: 13,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'function(//\n/'
    });
  });*/
  /*
  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });

  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });

  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });

  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });

  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });

  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {});
  });
*/
  it('//\n/', () => {
    t.deepEqual(recovery('//\n/', 'recovery.js'), {
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
      end: 4,
      EOF: {
        end: 4,
        kind: 16384,
        start: 4,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 4,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 5,
          expression: {
            end: 5,
            flag: '',
            flags: 0,
            kind: 15,
            pattern: '',
            start: 0,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      text: '//\n/'
    });
  });

  it('1-+', () => {
    t.deepEqual(recovery('1-+', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'NumericLiteral',
              value: 1,
              start: 0,
              end: 1,
              kind: 10,
              flags: 0
            },
            operator: '-',
            right: {
              type: 'UnaryExpression',
              operator: '+',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              start: 2,
              end: 3,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '1-+',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('1---', () => {
    t.deepEqual(recovery('1---', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'PostfixUpdateExpression',
              operator: '--',
              operand: {
                type: 'NumericLiteral',
                value: 1,
                start: 0,
                end: 1,
                kind: 10,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 162,
              flags: 0
            },
            operator: '-',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 4,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '1---',
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

  it('1..', () => {
    t.deepEqual(recovery('1..', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
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
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '1..',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('1!{%', () => {
    t.deepEqual(recovery('1!{%', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 0,
            end: 1,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [],
                start: 2,
                end: 3,
                kind: 179,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 160,
              flags: 0
            },
            operator: '%',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 1,
            end: 4,
            kind: 155,
            flags: 0
          },
          start: 1,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '1!{%',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 3,
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
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('"string', () => {
    t.deepEqual(recovery('"string', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: '',
            start: 0,
            end: 7,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '"string',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated string literal',
          code: 55,
          start: 0,
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
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('"str /', () => {
    t.deepEqual(recovery('"str /', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: '',
            start: 0,
            end: 6,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '"str /',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated string literal',
          code: 55,
          start: 0,
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
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('/#¤%&/()==)(/&%*//+-345', () => {
    t.deepEqual(recovery('/#¤%&/()==)(/&%*//+-345', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'CallExpression',
              expression: {
                type: 'RegularExpressionLiteral',
                pattern: '#¤%&',
                flag: '',
                start: 0,
                end: 6,
                kind: 15,
                flags: 0
              },
              arguments: [],
              start: 0,
              end: 8,
              kind: 156,
              flags: 0
            },
            operator: '==',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,
                kind: 13,
                flags: 2
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'RegularExpressionLiteral',
                    pattern: '&%*',
                    flag: '',
                    start: 12,
                    end: 17,
                    kind: 15,
                    flags: 0
                  },
                  operator: '/',
                  right: {
                    type: 'UnaryExpression',
                    operator: '+',
                    operand: {
                      type: 'UnaryExpression',
                      operator: '-',
                      operand: {
                        type: 'NumericLiteral',
                        value: 345,
                        start: 20,
                        end: 23,
                        kind: 10,
                        flags: 0
                      },
                      start: 19,
                      end: 23,
                      kind: 160,
                      flags: 0
                    },
                    start: 18,
                    end: 23,
                    kind: 160,
                    flags: 0
                  },
                  start: 12,
                  end: 23,
                  kind: 155,
                  flags: 0
                }
              ],
              start: 10,
              end: 23,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 23,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 122,
          flags: 0
        }
      ],
      text: '/#¤%&/()==)(/&%*//+-345',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 20,
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
        start: 23,
        end: 23
      },
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('/#¤%&()==)(&%*+-345', () => {
    t.deepEqual(recovery('/#¤%&()==)(&%*+-345', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '#¤%&()==)(&%*+-34',
            flag: '',
            start: 0,
            end: 19,
            kind: 15,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: '/#¤%&()==)(&%*+-345',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 0,
          length: 19
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 19,
        end: 19
      },
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('¤%&()==)(&%*+-345', () => {
    t.deepEqual(recovery('¤%&()==)(&%*+-345', 'recovery.js'), {
      kind: 209,
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
                name: '',
                start: 0,
                end: 0,
                kind: 13,
                flags: 2
              },
              operator: '%',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              start: 0,
              end: 2,
              kind: 155,
              flags: 0
            },
            operator: '&',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              operator: '==',
              right: {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 8,
                  end: 8,
                  kind: 13,
                  flags: 2
                },
                arguments: [
                  {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 9,
                        end: 9,
                        kind: 13,
                        flags: 2
                      },
                      operator: '&',
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: '',
                          start: 10,
                          end: 10,
                          kind: 13,
                          flags: 2
                        },
                        operator: '%',
                        right: {
                          type: 'IdentifierReference',
                          name: '',
                          start: 11,
                          end: 11,
                          kind: 13,
                          flags: 2
                        },
                        start: 10,
                        end: 11,
                        kind: 155,
                        flags: 0
                      },
                      start: 9,
                      end: 11,
                      kind: 155,
                      flags: 0
                    },
                    operator: '*',
                    right: {
                      type: 'UnaryExpression',
                      operator: '+',
                      operand: {
                        type: 'UnaryExpression',
                        operator: '-',
                        operand: {
                          type: 'NumericLiteral',
                          value: 345,
                          start: 14,
                          end: 17,
                          kind: 10,
                          flags: 0
                        },
                        start: 13,
                        end: 17,
                        kind: 160,
                        flags: 0
                      },
                      start: 12,
                      end: 17,
                      kind: 160,
                      flags: 0
                    },
                    start: 9,
                    end: 17,
                    kind: 155,
                    flags: 0
                  }
                ],
                start: 7,
                end: 17,
                kind: 156,
                flags: 0
              },
              start: 5,
              end: 17,
              kind: 155,
              flags: 0
            },
            start: 0,
            end: 17,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '¤%&()==)(&%*+-345',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid character',
          code: 9,
          start: 0,
          length: 0
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 1,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 5,
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
          message: '`,` expected',
          code: 5,
          start: 14,
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
        start: 17,
        end: 17
      },
      start: 0,
      length: 17,
      end: 17
    });
  });

  it('+//!458+!{while', () => {
    t.deepEqual(recovery('+//!458+!{while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 1,
              end: 1,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 1,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        }
      ],
      text: '+//!458+!{while',
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
          length: 14
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('+/!458+!{while', () => {
    t.deepEqual(recovery('+/!458+!{while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'RegularExpressionLiteral',
              pattern: '!458+!{whil',
              flag: '',
              start: 1,
              end: 14,
              kind: 15,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '+/!458+!{while',
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
          length: 13
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

  it('+!458+!{while', () => {
    t.deepEqual(recovery('+!458+!{while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: '+',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'NumericLiteral',
                  value: 458,
                  start: 2,
                  end: 5,
                  kind: 10,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 160,
                flags: 0
              },
              start: 0,
              end: 5,
              kind: 160,
              flags: 0
            },
            operator: '+',
            right: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'while',
                    start: 8,
                    end: 13,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 7,
                end: 13,
                kind: 179,
                flags: 0
              },
              start: 6,
              end: 13,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: '+!458+!{while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 13,
        end: 13
      },
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('++!{while', () => {
    t.deepEqual(recovery('++!{while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'while',
                    start: 4,
                    end: 9,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 3,
                end: 9,
                kind: 179,
                flags: 0
              },
              start: 2,
              end: 9,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 161,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '++!{while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 4,
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
        start: 9,
        end: 9
      },
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('++while', () => {
    t.deepEqual(recovery('++while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 2,
              end: 2,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 2,
            kind: 161,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 7,
            end: 7,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            start: 7,
            end: 7,
            kind: 122,
            flags: 0
          },
          start: 2,
          end: 7,
          kind: 139,
          flags: 0
        }
      ],
      text: '++while',
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
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('++€--', () => {
    t.deepEqual(recovery('++€--', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'PrefixUpdateExpression',
              operator: '--',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              start: 2,
              end: 5,
              kind: 161,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 161,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '++€--',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid character',
          code: 9,
          start: 2,
          length: 0
        },
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

  it('++a-', () => {
    t.deepEqual(recovery('++a-', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'PrefixUpdateExpression',
              operator: '++',
              operand: {
                type: 'IdentifierReference',
                name: 'a',
                start: 2,
                end: 3,
                kind: 13,
                flags: 0
              },
              start: 0,
              end: 3,
              kind: 161,
              flags: 0
            },
            operator: '-',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 4,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '++a-',
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

  it('+{', () => {
    t.deepEqual(recovery('+{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 2,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 2,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '+{',
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
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('+(', () => {
    t.deepEqual(recovery('+(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 2,
              kind: 189,
              flags: 0
            },
            start: 0,
            end: 2,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '+(',
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
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('+!!', () => {
    t.deepEqual(recovery('+!!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 3,
                  end: 3,
                  kind: 13,
                  flags: 2
                },
                start: 2,
                end: 3,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '+!!',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('+!![', () => {
    t.deepEqual(recovery('+!![', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'ArrayLiteral',
                  kind: 178,
                  elements: [],
                  start: 3,
                  end: 4,
                  flags: 0
                },
                start: 2,
                end: 4,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 4,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '+!![',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 3,
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
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('/=', () => {
    t.deepEqual(recovery('/=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 0,
            end: 2,
            kind: 15,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '/=',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 0,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('*=', () => {
    t.deepEqual(recovery('*=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [],
      text: '*=',
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
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('a <<', () => {
    t.deepEqual(recovery('a <<', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            operator: '<<',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 4,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a <<',
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
          length: 2
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

  it('a(!', () => {
    t.deepEqual(recovery('a(!', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 3,
                  end: 3,
                  kind: 13,
                  flags: 2
                },
                start: 2,
                end: 3,
                kind: 160,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a(!',
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
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('a(€', () => {
    t.deepEqual(recovery('a(€', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 2,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a(€',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid character',
          code: 9,
          start: 2,
          length: 0
        }
      ],
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

  it('a  +=  -=  *=  n  %=  <<=  >>=  >>>=  |=  ^=  &=', () => {
    t.deepEqual(recovery('a  +=  -=  *=  n  %=  <<=  >>=  >>>=  |=  ^=  &=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            operator: '+=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: '',
                start: 5,
                end: 5,
                kind: 13,
                flags: 2
              },
              operator: '-=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 9,
                  end: 9,
                  kind: 13,
                  flags: 2
                },
                operator: '*=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'n',
                    start: 13,
                    end: 16,
                    kind: 13,
                    flags: 0
                  },
                  operator: '%=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 20,
                      end: 20,
                      kind: 13,
                      flags: 2
                    },
                    operator: '<<=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 25,
                        end: 25,
                        kind: 13,
                        flags: 2
                      },
                      operator: '>>=',
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: '',
                          start: 30,
                          end: 30,
                          kind: 13,
                          flags: 2
                        },
                        operator: '>>>=',
                        right: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'IdentifierReference',
                            name: '',
                            start: 36,
                            end: 36,
                            kind: 13,
                            flags: 2
                          },
                          operator: '|=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'IdentifierReference',
                              name: '',
                              start: 40,
                              end: 40,
                              kind: 13,
                              flags: 2
                            },
                            operator: '^=',
                            right: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'IdentifierReference',
                                name: '',
                                start: 44,
                                end: 44,
                                kind: 13,
                                flags: 2
                              },
                              operator: '&=',
                              right: {
                                type: 'IdentifierReference',
                                name: '',
                                start: 48,
                                end: 48,
                                kind: 13,
                                flags: 2
                              },
                              start: 44,
                              end: 48,
                              kind: 152,
                              flags: 0
                            },
                            start: 40,
                            end: 48,
                            kind: 152,
                            flags: 0
                          },
                          start: 36,
                          end: 48,
                          kind: 152,
                          flags: 0
                        },
                        start: 30,
                        end: 48,
                        kind: 152,
                        flags: 0
                      },
                      start: 25,
                      end: 48,
                      kind: 152,
                      flags: 0
                    },
                    start: 20,
                    end: 48,
                    kind: 152,
                    flags: 0
                  },
                  start: 13,
                  end: 48,
                  kind: 152,
                  flags: 0
                },
                start: 9,
                end: 48,
                kind: 152,
                flags: 0
              },
              start: 5,
              end: 48,
              kind: 152,
              flags: 0
            },
            start: 0,
            end: 48,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 48,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a  +=  -=  *=  n  %=  <<=  >>=  >>>=  |=  ^=  &=',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 11,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 22,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 27,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 32,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 38,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 42,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 46,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 48,
        end: 48
      },
      start: 0,
      length: 48,
      end: 48
    });
  });

  it('a  >>> ', () => {
    t.deepEqual(recovery('a  >>> ', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            operator: '>>>',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 6,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a  >>> ',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('Unclosed block statement33', () => {
    t.deepEqual(recovery('a  >>>   >>>  b', 'recovery.js'), {
      kind: 209,
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
                kind: 13,
                flags: 0
              },
              operator: '>>>',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,
                kind: 13,
                flags: 2
              },
              start: 0,
              end: 6,
              kind: 155,
              flags: 0
            },
            operator: '>>>',
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 12,
              end: 15,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a  >>>   >>>  b',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
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
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('new {', () => {
    t.deepEqual(recovery('new {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 3,
              end: 5,
              kind: 179,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 5,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new {',
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
  /*
  it('{!super new class ++ | }', () => {
    t.deepEqual(recovery('{', 'recovery.js'), {
      "kind": 209,
      "directives": [],
      "statements": [
          {
              "type": "BlockStatement",
              "statements": [
                  {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "UnaryExpression",
                          "operator": "!",
                          "operand": {
                              "type": "SuperProperty",
                              "expression": null,
                              "name": null,
                              "start": 2,
                              "end": 7,
                              "kind": 192,
                              "flags": 0
                          },
                          "start": 1,
                          "end": 7,
                          "kind": 160,
                          "flags": 0
                      },
                      "start": 1,
                      "end": 7,
                      "kind": 122,
                      "flags": 0
                  },
                  {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "NewExpression",
                              "expression": {
                                  "type": "PostfixUpdateExpression",
                                  "operator": "++",
                                  "operand": {
                                      "type": "ClassExpression",
                                      "name": null,
                                      "super": null,
                                      "elements": [],
                                      "start": 11,
                                      "end": 17,
                                      "kind": 149,
                                      "flags": 0
                                  },
                                  "start": 17,
                                  "end": 20,
                                  "kind": 162,
                                  "flags": 0
                              },
                              "arguments": [],
                              "start": 7,
                              "end": 20,
                              "kind": 163,
                              "flags": 0
                          },
                          "operator": "|",
                          "right": {
                              "type": "IdentifierReference",
                              "name": "",
                              "start": 22,
                              "end": 22,
                              "kind": 13,
                              "flags": 2
                          },
                          "start": 7,
                          "end": 22,
                          "kind": 155,
                          "flags": 0
                      },
                      "start": 7,
                      "end": 22,
                      "kind": 122,
                      "flags": 0
                  }
              ],
              "start": 0,
              "end": 24,
              "kind": 123,
              "flags": 0
          }
      ],
      "text": "{!super new class ++ | }",
      "fileName": "recovery.js",
      "context": 0,
      "mutualFlags": 0,
      "diagnostics": [
          {
              "kind": 3,
              "source": 2,
              "message": "Member access on super must be in a method",
              "code": 31,
              "start": 8,
              "length": 3
          },
          {
              "kind": 2,
              "source": 2,
              "message": "`{` expected",
              "code": 5,
              "start": 18,
              "length": 2
          },
          {
              "kind": 2,
              "source": 2,
              "message": "Expression expected",
              "code": 7,
              "start": 23,
              "length": 1
          }
      ],
      "detached": false,
      "isIncremental": false,
      "parent": null,
      "children": [],
      "EOF": {
          "type": "CST",
          "kind": 16384,
          "start": 24,
          "end": 24
      },
      "start": 0,
      "length": 24,
      "end": 24
  });
  });
*/
  it('a *=  *= c', () => {
    t.deepEqual(recovery('a *=  *= c', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 7,
          kind: 2,
          length: 2,
          message: 'Expression expected',
          source: 2,
          start: 6
        }
      ],
      directives: [],
      end: 10,
      EOF: {
        end: 10,
        kind: 16384,
        start: 10,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 10,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 10,
          expression: {
            end: 10,
            flags: 0,
            kind: 152,
            left: {
              end: 1,
              flags: 0,
              kind: 13,
              name: 'a',
              start: 0,
              type: 'IdentifierReference'
            },
            operator: '*=',
            right: {
              end: 10,
              flags: 0,
              kind: 152,
              left: {
                end: 4,
                flags: 2,
                kind: 13,
                name: '',
                start: 4,
                type: 'IdentifierReference'
              },
              operator: '*=',
              right: {
                end: 10,
                flags: 0,
                kind: 13,
                name: 'c',
                start: 8,
                type: 'IdentifierReference'
              },
              start: 4,
              type: 'AssignmentExpression'
            },
            start: 0,
            type: 'AssignmentExpression'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      text: 'a *=  *= c'
    });
  });
});
