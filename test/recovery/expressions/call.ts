import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Call', () => {
  it('a(', () => {
    t.deepEqual(recovery('a(', 'recovery.js'), {
      kind: 209,
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
      text: 'a(',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('async(async => c', () => {
    t.deepEqual(recovery('async(async => c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ArrowFunction',
                params: {
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 6,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 14,
                    end: 16,
                    kind: 13,
                    flags: 0
                  },
                  start: 14,
                  end: 16,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 6,
                end: 16,
                kind: 188,
                flags: 0
              }
            ],
            start: 0,
            end: 16,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(async => c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('foo(/ {', () => {
    t.deepEqual(recovery('foo(/ {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
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
                type: 'RegularExpressionLiteral',
                pattern: ' ',
                flag: '',
                start: 4,
                end: 7,
                kind: 15,
                flags: 0
              }
            ],
            start: 0,
            end: 7,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
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

  it('async(async x => c', () => {
    t.deepEqual(recovery('async(async x => c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 11,
                    end: 13,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 16,
                    end: 18,
                    kind: 13,
                    flags: 0
                  },
                  start: 16,
                  end: 18,
                  kind: 187,
                  flags: 0
                },
                async: true,
                start: 6,
                end: 18,
                kind: 188,
                flags: 0
              }
            ],
            start: 0,
            end: 18,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 18,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(async x => c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('async(async [ => c', () => {
    t.deepEqual(recovery('async(async [ => c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 6,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 13,
                  end: 13,
                  kind: 13,
                  flags: 2
                },
                computed: true,
                start: 6,
                end: 13,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 13,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'c',
            start: 16,
            end: 18,
            kind: 13,
            flags: 0
          },
          start: 16,
          end: 18,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(async [ => c',
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
          length: 2
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

  it('async(async  => c', () => {
    t.deepEqual(recovery('async(async  => c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ArrowFunction',
                params: {
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 6,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 15,
                    end: 17,
                    kind: 13,
                    flags: 0
                  },
                  start: 15,
                  end: 17,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 6,
                end: 17,
                kind: 188,
                flags: 0
              }
            ],
            start: 0,
            end: 17,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(async  => c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('async ....x', () => {
    t.deepEqual(recovery('async ....x', 'recovery.js'), {
      kind: 209,
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
            kind: 13,
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
            type: 'IdentifierReference',
            name: 'x',
            start: 10,
            end: 11,
            kind: 13,
            flags: 0
          },
          start: 10,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async ....x',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 9,
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

  it('async ( ....x', () => {
    t.deepEqual(recovery('async ( ....x', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
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
                start: 7,
                end: 13,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 13,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async ( ....x',
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
      length: 13,
      end: 13
    });
  });

  it('async ( ...x', () => {
    t.deepEqual(recovery('async ( ...x', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 11,
                  end: 12,
                  kind: 13,
                  flags: 0
                },
                start: 7,
                end: 12,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 12,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async ( ...x',
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

  it('async ( ...x =>', () => {
    t.deepEqual(recovery('async ( ...x =>', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
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
                    type: 'ConciseBody',
                    expression: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 15,
                      end: 15,
                      kind: 13,
                      flags: 2
                    },
                    start: 15,
                    end: 15,
                    kind: 187,
                    flags: 0
                  },
                  async: false,
                  start: 11,
                  end: 15,
                  kind: 188,
                  flags: 0
                },
                start: 7,
                end: 15,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 15,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async ( ...x =>',
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

  it('!=>async a(b c', () => {
    t.deepEqual(recovery('!=>async a(b c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 0,
              end: 0,
              kind: 13,
              flags: 2
            },
            operator: '!=',
            right: {
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
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 8,
                    end: 10,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 11,
                      end: 12,
                      kind: 13,
                      flags: 0
                    },
                    start: 10,
                    end: 12,
                    kind: 189,
                    flags: 0
                  },
                  start: 10,
                  end: 12,
                  kind: 187,
                  flags: 0
                },
                async: true,
                start: 3,
                end: 12,
                kind: 188,
                flags: 0
              },
              start: 2,
              end: 12,
              kind: 155,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'c',
            start: 12,
            end: 14,
            kind: 13,
            flags: 0
          },
          start: 12,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '!=>async a(b c',
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
          length: 2
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
          code: 5,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('!= >async a(b c', () => {
    t.deepEqual(recovery('!= >async a(b c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 0,
              end: 0,
              kind: 13,
              flags: 2
            },
            operator: '!=',
            right: {
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
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 9,
                    end: 11,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 12,
                      end: 13,
                      kind: 13,
                      flags: 0
                    },
                    start: 11,
                    end: 13,
                    kind: 189,
                    flags: 0
                  },
                  start: 11,
                  end: 13,
                  kind: 187,
                  flags: 0
                },
                async: true,
                start: 4,
                end: 13,
                kind: 188,
                flags: 0
              },
              start: 2,
              end: 13,
              kind: 155,
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'c',
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
      text: '!= >async a(b c',
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
          length: 2
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
          message: '`=>` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('! =>async a(b c', () => {
    t.deepEqual(recovery('! =>async a(b c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 9,
                end: 11,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 12,
                  end: 13,
                  kind: 13,
                  flags: 0
                },
                start: 11,
                end: 13,
                kind: 189,
                flags: 0
              },
              start: 11,
              end: 13,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 4,
            end: 13,
            kind: 188,
            flags: 0
          },
          start: 4,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'c',
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
      text: '! =>async a(b c',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('a(b c', () => {
    t.deepEqual(recovery('a(b c', 'recovery.js'), {
      kind: 209,
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
              kind: 13,
              flags: 0
            },
            arguments: [
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
                start: 3,
                end: 5,
                kind: 13,
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
      text: 'a(b c',
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
