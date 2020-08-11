import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Throw', () => {
  it('throw ) => babel', () => {
    t.deepEqual(recovery('throw ) => babel', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 7,
            end: 7,
            kind: 13,
            flags: 2
          },
          start: 0,
          end: 7,
          kind: 137,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'babel',
            start: 10,
            end: 16,
            kind: 13,
            flags: 0
          },
          start: 10,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'throw ) => babel',
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
      length: 16,
      end: 16
    });
  });

  it('throw (!!"', () => {
    t.deepEqual(recovery('throw (!!"', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'StringLiteral',
                  value: '',
                  start: 9,
                  end: 11,
                  kind: 12,
                  flags: 0
                },
                start: 8,
                end: 11,
                kind: 160,
                flags: 0
              },
              start: 7,
              end: 11,
              kind: 160,
              flags: 0
            },
            start: 5,
            end: 11,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw (!!"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated string literal',
          code: 55,
          start: 9,
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

  it('throw ( ]]]]}}}} [x = throw babel', () => {
    t.deepEqual(recovery('throw ( ]]]]}}}} [x = throw babel', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
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
            start: 5,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 18,
                  end: 19,
                  kind: 13,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 21,
                  end: 21,
                  kind: 13,
                  flags: 2
                },
                start: 18,
                end: 21,
                kind: 152,
                flags: 0
              }
            ],
            start: 16,
            end: 21,
            flags: 0
          },
          start: 16,
          end: 21,
          kind: 122,
          flags: 0
        },
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'babel',
            start: 27,
            end: 33,
            kind: 13,
            flags: 0
          },
          start: 21,
          end: 33,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw ( ]]]]}}}} [x = throw babel',
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
          message: 'Expression expected',
          code: 7,
          start: 22,
          length: 5
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

  it('as keyword', () => {
    t.deepEqual(recovery('throw', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          start: 0,
          end: 5,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw',
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

  it('with paren', () => {
    t.deepEqual(recovery('throw(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 6,
              end: 6,
              flags: 2
            },
            start: 5,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw(',
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

  it('malformed throw', () => {
    t.deepEqual(recovery('throw (x) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 7,
              end: 8,
              kind: 13,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 9,
          end: 12,
          kind: 123,
          flags: 0
        }
      ],
      text: 'throw (x) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 10,
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

  it('throw with finally', () => {
    t.deepEqual(recovery('throw {x} finally', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
            flags: 0
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 17,
            end: 17,
            kind: 123,
            flags: 0
          },
          start: 9,
          end: 17,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 10,
          length: 7
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

  it('throw {x} catch finally', () => {
    t.deepEqual(recovery('throw {x} catch finally', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
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
              kind: 123,
              flags: 0
            },
            start: 9,
            end: 15,
            kind: 140,
            flags: 0
          },
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 23,
            end: 23,
            kind: 123,
            flags: 0
          },
          start: 9,
          end: 23,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} catch finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 10,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 16,
          length: 7
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
});
