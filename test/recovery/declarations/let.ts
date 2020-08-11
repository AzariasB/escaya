import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Let', () => {
  it('Unclosed block statement', () => {
    t.deepEqual(recovery('let', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'let',
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
      text: 'let',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('Unclosed block statement3', () => {
    t.deepEqual(recovery('let {', 'recovery.js'), {
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
                type: 'ObjectBindingPattern',
                properties: [],
                start: 3,
                end: 5,
                kind: 169,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 5,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let {',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statement3', () => {
    t.deepEqual(recovery('let.', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'let',
              start: 0,
              end: 3,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
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
        }
      ],
      text: 'let.',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statement324', () => {
    t.deepEqual(recovery('let =>', 'recovery.js'), {
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
                name: 'let',
                start: 0,
                end: 3,
                kind: 168,
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
              start: 6,
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
      text: 'let =>',
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

  it('Unclosed block statement234', () => {
    t.deepEqual(recovery('=> let {', 'recovery.js'), {
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
                type: 'ObjectBindingPattern',
                properties: [],
                start: 6,
                end: 8,
                kind: 169,
                flags: 0
              },
              initializer: null,
              start: 6,
              end: 8,
              kind: 146,
              flags: 0
            }
          ],
          start: 2,
          end: 8,
          kind: 145,
          flags: 0
        }
      ],
      text: '=> let {',
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

  it('Unclosed block statementfds', () => {
    t.deepEqual(recovery('let =>', 'recovery.js'), {
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
                name: 'let',
                start: 0,
                end: 3,
                kind: 168,
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
              start: 6,
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
      text: 'let =>',
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

  it('Unclosed block statement233', () => {
    t.deepEqual(recovery('let a.b[[', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`,` expected',
          source: 2,
          start: 6
        },
        {
          code: 16,
          kind: 2,
          length: 1,
          message: 'Variable declaration or lexical binding expected',
          source: 2,
          start: 7
        },
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`]` expected',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 9,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 5,
                flags: 0,
                kind: 168,
                name: 'a',
                start: 3,
                type: 'BindingIdentifier'
              },
              end: 5,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 3,
              type: 'LexicalBinding'
            },
            {
              binding: {
                end: 7,
                flags: 0,
                kind: 168,
                name: 'b',
                start: 6,
                type: 'BindingIdentifier'
              },
              end: 7,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 6,
              type: 'LexicalBinding'
            },
            {
              binding: {
                elements: [
                  {
                    end: 9,
                    flags: 0,
                    kind: 172,
                    left: {
                      elements: [],
                      end: 9,
                      flags: 0,
                      kind: 174,
                      start: 8,
                      type: 'ArrayBindingPattern'
                    },
                    right: null,
                    start: 8,
                    type: 'BindingElement'
                  }
                ],
                end: 9,
                flags: 0,
                kind: 174,
                start: 7,
                type: 'ArrayBindingPattern'
              },
              end: 9,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 7,
              type: 'LexicalBinding'
            }
          ],
          end: 9,
          flags: 0,
          isConst: false,
          kind: 145,
          start: 0,
          type: 'LexicalDeclaration'
        }
      ],
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'let a.b[['
    });
  });

  it('let [a', () => {
    t.deepEqual(recovery('let [a', 'recovery.js'), {
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
                    name: 'a',
                    start: 5,
                    end: 6,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 3,
                end: 6,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 6,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let [a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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

  it('Unclosed block statemendfdsft', () => {
    t.deepEqual(recovery('let [break] = x', 'recovery.js'), {
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
                elements: [],
                start: 3,
                end: 5,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 5,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 145,
          flags: 0
        },
        {
          type: 'BreakStatement',
          label: null,
          start: 5,
          end: 10,
          kind: 124,
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
      text: 'let [break] = x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 5,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 12,
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

  it('Unclosed block statementdasf', () => {
    t.deepEqual(recovery('let catch', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [],
          start: 0,
          end: 3,
          kind: 145,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 3,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            kind: 140,
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 9,
              end: 9,
              kind: 123,
              flags: 0
            },
            flags: 0,
            start: 3,
            end: 9
          },
          finalizer: null,
          start: 3,
          end: 9,
          kind: 138,
          flags: 0
        }
      ],
      text: 'let catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 4,
          length: 5
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

  it('Unclosed block statementdfs', () => {
    t.deepEqual(recovery('let (catch)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'let',
              start: 0,
              end: 3,
              kind: 13,
              flags: 0
            },
            arguments: [],
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
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 5,
            end: 5,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            kind: 140,
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 10,
              end: 10,
              kind: 123,
              flags: 0
            },
            flags: 0,
            start: 5,
            end: 10
          },
          finalizer: null,
          start: 5,
          end: 10,
          kind: 138,
          flags: 0
        }
      ],
      text: 'let (catch)',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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
  it('Unclosed block statementafdadsf', () => {
    t.deepEqual(recovery('let.catch', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'let',
              start: 0,
              end: 3,
              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'catch',
              start: 4,
              end: 9,
              kind: 13,
              flags: 0
            },
            computed: false,
            start: 0,
            end: 9,
            kind: 154,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'let.catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('let let let ! let . let /a/', () => {
    t.deepEqual(recovery('let let let ! let . let /a/', 'recovery.js'), {
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
                type: 'BindingIdentifier',
                name: 'let',
                start: 3,
                end: 7,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 7,
              kind: 146,
              flags: 0
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'let',
                start: 7,
                end: 11,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 7,
              end: 11,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 11,
          kind: 145,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'MemberExpression',
                  member: {
                    type: 'IdentifierReference',
                    name: 'let',
                    start: 13,
                    end: 17,
                    kind: 13,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'let',
                    start: 19,
                    end: 23,
                    kind: 13,
                    flags: 0
                  },
                  computed: false,
                  start: 13,
                  end: 23,
                  kind: 154,
                  flags: 0
                },
                start: 11,
                end: 23,
                kind: 160,
                flags: 0
              },
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: 'a',
                start: 25,
                end: 26,
                kind: 13,
                flags: 0
              },
              start: 11,
              end: 26,
              kind: 155,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 27,
              end: 27,
              kind: 13,
              flags: 2
            },
            start: 11,
            end: 27,
            kind: 155,
            flags: 0
          },
          start: 11,
          end: 27,
          kind: 122,
          flags: 0
        }
      ],
      text: 'let let let ! let . let /a/',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 8,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration or lexical binding expected',
          code: 16,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
  it('Unclosed block statement879', () => {
    t.deepEqual(recovery('let const y = ;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [],
          start: 0,
          end: 3,
          kind: 145,
          flags: 0
        },
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'y',
                start: 9,
                end: 11,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'IdentifierReference',
                name: '',
                start: 13,
                end: 13,
                kind: 13,
                flags: 2
              },
              start: 9,
              end: 13,
              kind: 146,
              flags: 0
            }
          ],
          start: 3,
          end: 15,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let const y = ;',
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
      length: 15,
      end: 15
    });
  });
  it('Unclosed block statement', () => {
    t.deepEqual(recovery('let const = b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [],
          start: 0,
          end: 3,
          kind: 145,
          flags: 0
        },
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 3,
          end: 9,
          kind: 145,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 11,
            end: 13,
            kind: 13,
            flags: 0
          },
          start: 11,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'let const = b',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 10,
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

  it('let { =', () => {
    t.deepEqual(recovery('let { =', 'recovery.js'), {
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
                type: 'ObjectBindingPattern',
                properties: [],
                start: 3,
                end: 5,
                kind: 169,
                flags: 0
              },
              initializer: {
                type: 'IdentifierReference',
                name: '',
                start: 7,
                end: 7,
                kind: 13,
                flags: 2
              },
              start: 3,
              end: 7,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let { =',
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
  it('let { x: b = c /', () => {
    t.deepEqual(recovery('let { x: b = c /', 'recovery.js'), {
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
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 5,
                      end: 8,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 8,
                        end: 10,
                        kind: 168,
                        flags: 0
                      },
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'c',
                          start: 12,
                          end: 14,
                          kind: 13,
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
                        start: 12,
                        end: 16,
                        kind: 155,
                        flags: 0
                      },
                      start: 8,
                      end: 16,
                      kind: 172,
                      flags: 0
                    },
                    start: 5,
                    end: 16,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 3,
                end: 16,
                kind: 169,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 16,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 16,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let { x: b = c /',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });
});
