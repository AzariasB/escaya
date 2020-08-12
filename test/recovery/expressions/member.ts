import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Member', () => {
  it('(a.{ x( {}', () => {
    t.deepEqual(recovery('(a.{ x( {}', 'recovery.js'), {
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
                end: 2,
                kind: 13,
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
              start: 1,
              end: 3,
              kind: 154,
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
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 4,
                  end: 6,
                  kind: 13,
                  flags: 0
                },
                arguments: [
                  {
                    type: 'ObjectLiteral',
                    properties: [],
                    start: 7,
                    end: 10,
                    kind: 179,
                    flags: 0
                  }
                ],
                start: 4,
                end: 10,
                kind: 156,
                flags: 0
              },
              start: 4,
              end: 10,
              kind: 122,
              flags: 0
            }
          ],
          start: 3,
          end: 10,
          kind: 123,
          flags: 0
        }
      ],
      text: '(a.{ x( {}',
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
          message: '`,` expected',
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

  it('a.1', () => {
    t.deepEqual(recovery('a.1', 'recovery.js'), {
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
        }
      ],
      text: 'a.1',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('a.[(', () => {
    t.deepEqual(recovery('a.[(', 'recovery.js'), {
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
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              computed: false,
              start: 0,
              end: 2,
              kind: 154,
              flags: 0
            },
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,
                kind: 13,
                flags: 2
              },
              start: 3,
              end: 4,
              kind: 189,
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
      text: 'a.[(',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('(!a.b.[', () => {
    t.deepEqual(recovery('(!a.b.[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'MemberExpression',
                member: {
                  type: 'MemberExpression',
                  member: {
                    type: 'MemberExpression',
                    member: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 2,
                      end: 3,
                      kind: 13,
                      flags: 0
                    },
                    expression: {
                      type: 'IdentifierName',
                      name: 'b',
                      start: 4,
                      end: 5,
                      kind: 13,
                      flags: 0
                    },
                    computed: false,
                    start: 2,
                    end: 5,
                    kind: 154,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 6,
                    end: 6,
                    kind: 13,
                    flags: 2
                  },
                  computed: false,
                  start: 2,
                  end: 6,
                  kind: 154,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 7,
                  end: 7,
                  kind: 13,
                  flags: 2
                },
                computed: true,
                start: 2,
                end: 7,
                kind: 154,
                flags: 0
              },
              start: 1,
              end: 7,
              kind: 160,
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
      text: '(!a.b.[',
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

  it('a[b c d', () => {
    t.deepEqual(recovery('a[b c d', 'recovery.js'), {
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
              type: 'IdentifierReference',
              name: 'b',
              start: 2,
              end: 3,
              kind: 13,
              flags: 0
            },
            computed: true,
            start: 0,
            end: 3,
            kind: 154,
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
            name: 'c',
            start: 3,
            end: 5,
            kind: 13,
            flags: 0
          },
          start: 3,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'd',
            start: 5,
            end: 7,
            kind: 13,
            flags: 0
          },
          start: 5,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a[b c d',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('a[b, c d', () => {
    t.deepEqual(recovery('a[b, c d', 'recovery.js'), {
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
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 2,
                  end: 3,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 4,
                  end: 6,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 2,
              end: 6,
              kind: 147,
              flags: 0
            },
            computed: true,
            start: 0,
            end: 6,
            kind: 154,
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
            name: 'd',
            start: 6,
            end: 8,
            kind: 13,
            flags: 0
          },
          start: 6,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a[b, c d',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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
