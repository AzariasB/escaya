import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Member', () => {
  it('a[.', () => {
    t.deepEqual(recovery('a[.', 'recovery.js'), {
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
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
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
              start: 2,
              end: 3,
              kind: 154,
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
        }
      ],
      text: 'a[.',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('a[.(b', () => {
    t.deepEqual(recovery('a[.(b', 'recovery.js'), {
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
              type: 'CallExpression',
              expression: {
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 2,
                  end: 2,
                  kind: 13,
                  flags: 2
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
                start: 2,
                end: 3,
                kind: 154,
                flags: 0
              },
              arguments: [
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 4,
                  end: 5,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 2,
              end: 5,
              kind: 156,
              flags: 0
            },
            computed: true,
            start: 0,
            end: 5,
            kind: 154,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a[.(b',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('a.(b', () => {
    t.deepEqual(recovery('a.(b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
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
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 4,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a.(b',
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
          message: '`,` expected',
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

  it('a(b.c.d[a', () => {
    t.deepEqual(recovery('a(b.c.d[a', 'recovery.js'), {
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
                type: 'MemberExpression',
                member: {
                  type: 'MemberExpression',
                  member: {
                    type: 'MemberExpression',
                    member: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 2,
                      end: 3,
                      kind: 13,
                      flags: 0
                    },
                    expression: {
                      type: 'IdentifierName',
                      name: 'c',
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
                    type: 'IdentifierName',
                    name: 'd',
                    start: 6,
                    end: 7,
                    kind: 13,
                    flags: 0
                  },
                  computed: false,
                  start: 2,
                  end: 7,
                  kind: 154,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 8,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                computed: true,
                start: 2,
                end: 9,
                kind: 154,
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
      text: 'a(b.c.d[a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('a....[b', () => {
    t.deepEqual(recovery('a....[b', 'recovery.js'), {
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
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 6,
                end: 7,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 7,
            kind: 178,
            flags: 0
          },
          start: 5,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a....[b',
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
          length: 3
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
          message: '`,` expected',
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

  it('!a....[b!', () => {
    t.deepEqual(recovery('!a....[b!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2,
              kind: 13,
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              },
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 9,
                  end: 9,
                  kind: 13,
                  flags: 2
                },
                start: 8,
                end: 9,
                kind: 160,
                flags: 0
              }
            ],
            start: 6,
            end: 9,
            kind: 178,
            flags: 0
          },
          start: 6,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '!a....[b!',
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
          message: 'Statement expected',
          code: 8,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('a`!a?.``b?.c!!=> {`', () => {
    t.deepEqual(recovery('a`!a?.``b?.c!!=> {`', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'TaggedTemplate',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              literal: {
                type: 'TemplateLiteral',
                raw: 'b?.c!!=> {',
                value: 'b?.c!!=> {',
                start: 1,
                end: 7,
                kind: 197,
                flags: 0
              },
              start: 0,
              end: 7,
              kind: 194,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'b?.c!!=> {',
              value: 'b?.c!!=> {',
              start: 7,
              end: 19,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 19,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`!a?.``b?.c!!=> {`',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('a?.``b?.c', () => {
    t.deepEqual(recovery('a?.``b?.c', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'OptionalExpression',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              chain: {
                type: 'OptionalChain',
                chain: null,
                start: 3,
                end: 3,
                kind: 226,
                flags: 0
              },
              start: 0,
              end: 3,
              kind: 157,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'b',
              value: '',
              start: 3,
              end: 5,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'OptionalExpression',
            member: {
              type: 'IdentifierReference',
              name: 'b',
              start: 5,
              end: 6,
              kind: 13,
              flags: 0
            },
            chain: {
              type: 'OptionalChain',
              chain: {
                type: 'MemberChain',
                chain: null,
                property: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 8,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 8,
                end: 9,
                kind: 158,
                flags: 0
              },
              start: 8,
              end: 9,
              kind: 226,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 157,
            flags: 0
          },
          start: 5,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a?.``b?.c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid optional chain in tagged template',
          code: 80,
          start: 3,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 5,
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

  it('a?.``b?.c!!x=> {', () => {
    t.deepEqual(recovery('a?.``b?.c!!x=> {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'OptionalExpression',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              chain: {
                type: 'OptionalChain',
                chain: null,
                start: 3,
                end: 3,
                kind: 226,
                flags: 0
              },
              start: 0,
              end: 3,
              kind: 157,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'b',
              value: '',
              start: 3,
              end: 5,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'OptionalExpression',
            member: {
              type: 'IdentifierReference',
              name: 'b',
              start: 5,
              end: 6,
              kind: 13,
              flags: 0
            },
            chain: {
              type: 'OptionalChain',
              chain: {
                type: 'MemberChain',
                chain: null,
                property: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 8,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 8,
                end: 9,
                kind: 158,
                flags: 0
              },
              start: 8,
              end: 9,
              kind: 226,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 157,
            flags: 0
          },
          start: 5,
          end: 9,
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
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 11,
                    end: 12,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 14,
                  end: 16,
                  kind: 184,
                  flags: 0
                },
                async: false,
                start: 11,
                end: 16,
                kind: 188,
                flags: 0
              },
              start: 10,
              end: 16,
              kind: 160,
              flags: 0
            },
            start: 9,
            end: 16,
            kind: 160,
            flags: 0
          },
          start: 9,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a?.``b?.c!!x=> {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid optional chain in tagged template',
          code: 80,
          start: 3,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 9,
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

  it('a?.``b?.c!!.x=> {', () => {
    t.deepEqual(recovery('a?.``b?.c!!.x=> {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'OptionalExpression',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1,
                kind: 13,
                flags: 0
              },
              chain: {
                type: 'OptionalChain',
                chain: null,
                start: 3,
                end: 3,
                kind: 226,
                flags: 0
              },
              start: 0,
              end: 3,
              kind: 157,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'b',
              value: '',
              start: 3,
              end: 5,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'OptionalExpression',
            member: {
              type: 'IdentifierReference',
              name: 'b',
              start: 5,
              end: 6,
              kind: 13,
              flags: 0
            },
            chain: {
              type: 'OptionalChain',
              chain: {
                type: 'MemberChain',
                chain: null,
                property: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 8,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 8,
                end: 9,
                kind: 158,
                flags: 0
              },
              start: 8,
              end: 9,
              kind: 226,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 157,
            flags: 0
          },
          start: 5,
          end: 9,
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
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 11,
                  end: 11,
                  kind: 13,
                  flags: 2
                },
                expression: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 12,
                  end: 13,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 11,
                end: 13,
                kind: 154,
                flags: 0
              },
              start: 10,
              end: 13,
              kind: 160,
              flags: 0
            },
            start: 9,
            end: 13,
            kind: 160,
            flags: 0
          },
          start: 9,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 15,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: 'a?.``b?.c!!.x=> {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid optional chain in tagged template',
          code: 80,
          start: 3,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 9,
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
          message: '`;` expected',
          code: 92,
          start: 13,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('a`/`', () => {
    t.deepEqual(recovery('a`/`', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: '/',
              value: '/',
              start: 1,
              end: 4,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`/`',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('a`a??.b`', () => {
    t.deepEqual(recovery('a`a??.b`', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'a??.b',
              value: 'a??.b',
              start: 1,
              end: 8,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`a??.b`',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('a`a.?b`', () => {
    t.deepEqual(recovery('a`a.?b`', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'a.?b',
              value: 'a.?b',
              start: 1,
              end: 7,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 7,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`a.?b`',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('a`foo/bar**zoo`', () => {
    t.deepEqual(recovery('a`foo/bar**zoo`', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'foo/bar**zoo',
              value: 'foo/bar**zoo',
              start: 1,
              end: 15,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`foo/bar**zoo`',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('a`foo/bar**zoo', () => {
    t.deepEqual(recovery('a`foo/bar**zoo', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'TaggedTemplate',
            member: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            literal: {
              type: 'TemplateLiteral',
              raw: 'foo/bar**zoo',
              value: '',
              start: 1,
              end: 14,
              kind: 197,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 194,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a`foo/bar**zoo',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated template literal',
          code: 52,
          start: 1,
          length: 13
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

  it('a[x=/**', () => {
    t.deepEqual(recovery('a[x=/**', 'recovery.js'), {
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
                name: 'x',
                start: 2,
                end: 3,
                kind: 13,
                flags: 0
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
      text: 'a[x=/**',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: '`*/` expected',
          code: 86,
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

  it('a[x=/**() =>a', () => {
    t.deepEqual(recovery('a[x=/**() =>a', 'recovery.js'), {
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
                name: 'x',
                start: 2,
                end: 3,
                kind: 13,
                flags: 0
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
      text: 'a[x=/**() =>a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: '`*/` expected',
          code: 86,
          start: 4,
          length: 9
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

  it('a.b[', () => {
    t.deepEqual(recovery('a.b[', 'recovery.js'), {
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
                type: 'IdentifierName',
                name: 'b',
                start: 2,
                end: 3,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 0,
              end: 3,
              kind: 154,
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
      text: 'a.b[',
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
