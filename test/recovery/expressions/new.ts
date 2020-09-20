import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - New', () => {
  it('new f(..g);', () => {
    t.deepEqual(recovery('new f(..g);', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'f',
              start: 3,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'MemberExpression',
                member: {
                  type: 'MemberExpression',
                  member: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 6,
                    end: 6,
                    kind: 13,
                    flags: 2
                  },
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 7,
                    end: 7,
                    kind: 13,
                    flags: 2
                  },
                  computed: false,
                  start: 6,
                  end: 7,
                  kind: 154,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierName',
                  name: 'g',
                  start: 8,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 6,
                end: 9,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new f(..g);',
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

  it('new f(.g);', () => {
    t.deepEqual(recovery('new f(.g);', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'f',
              start: 3,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 6,
                  end: 6,
                  kind: 13,
                  flags: 2
                },
                expression: {
                  type: 'IdentifierName',
                  name: 'g',
                  start: 7,
                  end: 8,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 6,
                end: 8,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 9,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new f(.g);',
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
      length: 10,
      end: 10
    });
  });

  it('new x.import(!', () => {
    t.deepEqual(recovery('new x.import(!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'x',
                start: 3,
                end: 5,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'import',
                start: 6,
                end: 12,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 0,
              end: 12,
              kind: 154,
              flags: 0
            },
            arguments: [
              {
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
              }
            ],
            start: 0,
            end: 14,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new x.import(!',
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

  it('new x.new', () => {
    t.deepEqual(recovery('new x.new', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'x',
                start: 3,
                end: 5,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'new',
                start: 6,
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
            arguments: [],
            start: 0,
            end: 9,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new x.new',
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

  it('new !!=ximport(!', () => {
    t.deepEqual(recovery('new !!=ximport(!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'NewExpression',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                },
                start: 3,
                end: 5,
                kind: 160,
                flags: 0
              },
              arguments: [],
              start: 0,
              end: 5,
              kind: 163,
              flags: 0
            },
            operator: '!=',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'ximport',
                start: 7,
                end: 14,
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
                    start: 16,
                    end: 16,
                    kind: 13,
                    flags: 2
                  },
                  start: 15,
                  end: 16,
                  kind: 160,
                  flags: 0
                }
              ],
              start: 7,
              end: 16,
              kind: 156,
              flags: 0
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
      text: 'new !!=ximport(!',
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

  it('new 123 (abc', () => {
    t.deepEqual(recovery('new 123 (abc', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'NumericLiteral',

              value: 123,
              start: 3,
              end: 7,
              kind: 10,
              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'abc',
                start: 9,
                end: 12,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 12,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new 123 (abc',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 9,
          length: 3
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

  it('new a( b(() => {', () => {
    t.deepEqual(recovery('new a( b(() => {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 3,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 8,
                  kind: 13,
                  flags: 0
                },
                arguments: [
                  {
                    type: 'ArrowFunction',
                    arrowParameters: true,
                    params: [],
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
                    start: 9,
                    end: 16,
                    kind: 188,
                    flags: 0
                  }
                ],
                start: 6,
                end: 16,
                kind: 156,
                flags: 0
              }
            ],
            start: 0,
            end: 16,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new a( b(() => {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('new class Babel Parser !!', () => {
    t.deepEqual(recovery('new class Babel Parser !!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'ClassExpression',
              name: {
                type: 'BindingIdentifier',
                name: 'Babel',
                start: 9,
                end: 15,
                kind: 168,
                flags: 0
              },
              heritage: null,
              elements: [],
              start: 3,
              end: 15,
              kind: 149,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 15,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'Parser',
            start: 15,
            end: 22,
            kind: 13,
            flags: 0
          },
          start: 15,
          end: 22,
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
                start: 25,
                end: 25,
                kind: 13,
                flags: 2
              },
              start: 24,
              end: 25,
              kind: 160,
              flags: 0
            },
            start: 22,
            end: 25,
            kind: 160,
            flags: 0
          },
          start: 22,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new class Babel Parser !!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 16,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 24,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('new new new . a. 1 . !', () => {
    t.deepEqual(recovery('new new new . a. 1 . !', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'NewExpression',
              expression: {
                type: 'NewExpression',
                expression: {
                  type: 'MemberExpression',
                  member: {
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
                      name: 'a',
                      start: 13,
                      end: 15,
                      kind: 13,
                      flags: 0
                    },
                    computed: false,
                    start: 7,
                    end: 15,
                    kind: 154,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 16,
                    end: 16,
                    kind: 13,
                    flags: 2
                  },
                  computed: false,
                  start: 7,
                  end: 16,
                  kind: 154,
                  flags: 0
                },
                arguments: [],
                start: 7,
                end: 16,
                kind: 163,
                flags: 0
              },
              arguments: [],
              start: 3,
              end: 16,
              kind: 163,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 16,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'NumericLiteral',

              value: 1,
              start: 16,
              end: 18,
              kind: 10,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 20,
              end: 20,
              kind: 13,
              flags: 2
            },
            computed: false,
            start: 16,
            end: 20,
            kind: 154,
            flags: 0
          },
          start: 16,
          end: 20,
          kind: 122,
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
              start: 22,
              end: 22,
              kind: 13,
              flags: 2
            },
            start: 20,
            end: 22,
            kind: 160,
            flags: 0
          },
          start: 20,
          end: 22,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new new new . a. 1 . !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 21,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });

  it('.new', () => {
    t.deepEqual(recovery('.new', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            arguments: [],
            start: 1,
            end: 4,
            kind: 163,
            flags: 0
          },
          start: 1,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '.new',
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
          message: 'Expression expected',
          code: 7,
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

  it('new.;', () => {
    t.deepEqual(recovery('new.;', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
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
            arguments: [],
            start: 0,
            end: 4,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new.;',
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

  it('new.target', () => {
    t.deepEqual(recovery('new.target', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              expression: {
                type: 'IdentifierName',
                name: 'target',
                start: 4,
                end: 10,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 0,
              end: 10,
              kind: 154,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 10,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new.target',
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
      length: 10,
      end: 10
    });
  });

  it('function x() { new.foo', () => {
    t.deepEqual(recovery('function x() { new.foo', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'NewTarget',
                  start: 14,
                  end: 22,
                  kind: 198,
                  flags: 0
                },
                start: 14,
                end: 22,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 22,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 22,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function x() { new.foo',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`foo` is not a valid meta-property for keyword `new`.',
          code: 93,
          start: 19,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });

  it('function x() { new.!!', () => {
    t.deepEqual(recovery('function x() { new.!!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'NewTarget',
                  start: 14,
                  end: 20,
                  kind: 198,
                  flags: 0
                },
                start: 14,
                end: 20,
                kind: 122,
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
                    start: 21,
                    end: 21,
                    kind: 13,
                    flags: 2
                  },
                  start: 20,
                  end: 21,
                  kind: 160,
                  flags: 0
                },
                start: 20,
                end: 21,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 21,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function x() { new.!!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`new` is not a valid meta-property for keyword `new`.',
          code: 93,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 20,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });
});
