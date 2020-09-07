import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Async', () => {
  it('async(', () => {
    t.deepEqual(recovery('async(', 'recovery.js'), {
      kind: 209,
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
            arguments: [],
            start: 0,
            end: 6,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(',
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

  it('async(async=>!', () => {
    t.deepEqual(recovery('async(async=>!', 'recovery.js'), {
      kind: 209,
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
                  start: 13,
                  end: 14,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 6,
                end: 14,
                kind: 188,
                flags: 0
              }
            ],
            start: 0,
            end: 14,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(async=>!',
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

  it('async( a [] => async!', () => {
    t.deepEqual(recovery('async( a [] => async!', 'recovery.js'), {
      kind: 209,
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
                  name: 'a',
                  start: 6,
                  end: 8,
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
                computed: true,
                start: 6,
                end: 11,
                kind: 154,
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'async',
            start: 14,
            end: 20,
            kind: 13,
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
      text: 'async( a [] => async!',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 12,
          length: 2
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
  /*
  it('!async(async!', () => {
    t.deepEqual(recovery('!async(async!', 'recovery.js'), {
      "kind": 209,
      "directives": [],
      "leafs": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "CallExpression",
                  "expression": {
                      "type": "IdentifierReference",
                      "name": "async",
                      "start": 0,
                      "end": 5,
                      "kind": 13,
                      "flags": 0
                  },
                  "arguments": [
                      {
                          "type": "IdentifierReference",
                          "name": "async",
                          "start": 6,
                          "end": 11,
                          "kind": 13,
                          "flags": 0
                      },
                      {
                          "type": "UnaryExpression",
                          "operator": "!",
                          "operand": {
                              "type": "IdentifierReference",
                              "name": "",
                              "start": 12,
                              "end": 12,
                              "kind": 13,
                              "flags": 2
                          },
                          "start": 11,
                          "end": 12,
                          "kind": 160,
                          "flags": 0
                      }
                  ],
                  "start": 0,
                  "end": 12,
                  "kind": 156,
                  "flags": 0
              },
              "start": 0,
              "end": 12,
              "kind": 122,
              "flags": 0
          }
      ],
      "text": "async(async!",
      "fileName": "recovery.js",
      "context": 0,
      "mutualFlags": 0,
      "diagnostics": [
          {
              "kind": 2,
              "source": 2,
              "message": "Expression expected",
              "code": 7,
              "start": 11,
              "length": 1
          }
      ],
      "detached": false,
      "incremental": false,
      "parent": null,
      "children": [],
      "start": 0,
      "length": 12,
      "end": 12
  });
  });
*/
  it('async(for it is an CallExpression!', () => {
    t.deepEqual(recovery('async(for it is an CallExpression!', 'recovery.js'), {
      kind: 209,
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
            arguments: [],
            start: 0,
            end: 6,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: 'it',
            start: 9,
            end: 12,
            kind: 13,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: 'an',
            start: 15,
            end: 18,
            kind: 13,
            flags: 0
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'is',
            start: 12,
            end: 15,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'CallExpression',
              start: 18,
              end: 33,
              kind: 13,
              flags: 0
            },
            start: 18,
            end: 33,
            kind: 122,
            flags: 0
          },
          start: 6,
          end: 33,
          kind: 132,
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
              start: 34,
              end: 34,
              kind: 13,
              flags: 2
            },
            start: 33,
            end: 34,
            kind: 160,
            flags: 0
          },
          start: 33,
          end: 34,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async(for it is an CallExpression!',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 10,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 13,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 16,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 19,
          length: 14
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 33,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 34,
      end: 34
    });
  });

  it('async(for', () => {
    t.deepEqual(recovery('async(for', 'recovery.js'), {
      kind: 209,
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
            arguments: [],
            start: 0,
            end: 6,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 9,
            end: 9,
            kind: 122,
            flags: 0
          },
          start: 6,
          end: 9,
          kind: 132,
          flags: 0
        }
      ],
      text: 'async(for',
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
          length: 3
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

  it('async(for) {}', () => {
    t.deepEqual(recovery('async(for) {}', 'recovery.js'), {
      kind: 209,
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
            arguments: [],
            start: 0,
            end: 6,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 10,
            end: 13,
            kind: 123,
            flags: 0
          },
          start: 6,
          end: 13,
          kind: 132,
          flags: 0
        }
      ],
      text: 'async(for) {}',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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
      length: 13,
      end: 13
    });
  });

  it('async(for) =>{}', () => {
    t.deepEqual(recovery('async(for) =>{}', 'recovery.js'), {
      kind: 209,
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
            arguments: [],
            start: 0,
            end: 6,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 9,
            end: 9,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 10,
              end: 10,
              kind: 13,
              flags: 2
            },
            start: 10,
            end: 10,
            kind: 122,
            flags: 0
          },
          start: 6,
          end: 10,
          kind: 132,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 15,
          kind: 123,
          flags: 0
        }
      ],
      text: 'async(for) =>{}',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 9,
          length: 1
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
      length: 15,
      end: 15
    });
  });

  it('async(a, for) =>{}', () => {
    t.deepEqual(recovery('async(a, for) =>{}', 'recovery.js'), {
      kind: 209,
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
                type: 'IdentifierReference',
                name: 'a',
                start: 6,
                end: 7,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 8,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: '',
            start: 12,
            end: 12,
            kind: 13,
            flags: 2
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 12,
            end: 12,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,
              kind: 13,
              flags: 2
            },
            start: 13,
            end: 13,
            kind: 122,
            flags: 0
          },
          start: 8,
          end: 13,
          kind: 132,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 16,
          end: 18,
          kind: 123,
          flags: 0
        }
      ],
      text: 'async(a, for) =>{}',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 1
        },
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

  it('async(async!', () => {
    t.deepEqual(recovery('async(async!', 'recovery.js'), {
      kind: 209,
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
                type: 'IdentifierReference',
                name: 'async',
                start: 6,
                end: 11,
                kind: 13,
                flags: 0
              },
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                start: 11,
                end: 12,
                kind: 160,
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
      text: 'async(async!',
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
      length: 12,
      end: 12
    });
  });
});
