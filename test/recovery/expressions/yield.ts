import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Yield', () => {
  it('yield(!', () => {
    t.deepEqual(recovery('yield(!', 'recovery.js'), {
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
              name: 'yield',
              start: 0,
              end: 5,
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
                  start: 7,
                  end: 7,
                  kind: 13,
                  flags: 2
                },
                start: 6,
                end: 7,
                kind: 160,
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
      text: 'yield(!',
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

  it('function* fn() { (yield!', () => {
    t.deepEqual(recovery('function* fn() { (yield!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'fn',
            start: 9,
            end: 12,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'YieldExpression',
                    delegate: false,
                    argument: {
                      type: 'UnaryExpression',
                      operator: '!',
                      operand: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 24,
                        end: 24,
                        kind: 13,
                        flags: 2
                      },
                      start: 23,
                      end: 24,
                      kind: 160,
                      flags: 0
                    },
                    start: 18,
                    end: 24,
                    kind: 193,
                    flags: 0
                  },
                  start: 16,
                  end: 24,
                  kind: 189,
                  flags: 0
                },
                start: 16,
                end: 24,
                kind: 122,
                flags: 0
              }
            ],
            start: 14,
            end: 24,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* fn() { (yield!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('{ (x = y = yield z', () => {
    t.deepEqual(recovery('{ (x = y = yield z', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 3,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'y',
                      start: 6,
                      end: 8,
                      kind: 13,
                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'yield',
                      start: 10,
                      end: 16,
                      kind: 13,
                      flags: 0
                    },
                    start: 6,
                    end: 16,
                    kind: 152,
                    flags: 0
                  },
                  start: 3,
                  end: 16,
                  kind: 152,
                  flags: 0
                },
                start: 1,
                end: 16,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 122,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'z',
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
          start: 0,
          end: 18,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ (x = y = yield z',
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

  it('function f(){ 5 + yield x;', () => {
    t.deepEqual(recovery('function f(){ 5 + yield x;', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'NumericLiteral',
                    value: 5,
                    start: 13,
                    end: 15,
                    kind: 10,
                    flags: 0
                  },
                  operator: '+',
                  right: {
                    type: 'IdentifierReference',
                    name: 'yield',
                    start: 17,
                    end: 23,
                    kind: 13,
                    flags: 0
                  },
                  start: 13,
                  end: 23,
                  kind: 155,
                  flags: 0
                },
                start: 13,
                end: 23,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 23,
                  end: 25,
                  kind: 13,
                  flags: 0
                },
                start: 23,
                end: 26,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 26,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function f(){ 5 + yield x;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 24,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 25,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('= {[yield]: 1}) => z', () => {
    t.deepEqual(recovery('= {[yield]: 1}) => z', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ArrayLiteral',
                elements: [
                  {
                    type: 'IdentifierReference',
                    name: 'yield',
                    start: 4,
                    end: 9,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 3,
                end: 10,
                kind: 178,
                flags: 0
              },
              start: 3,
              end: 10,
              kind: 122,
              flags: 0
            }
          ],
          start: 1,
          end: 10,
          kind: 123,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 11,
            end: 13,
            kind: 10,
            flags: 0
          },
          start: 11,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'z',
            start: 18,
            end: 20,
            kind: 13,
            flags: 0
          },
          start: 18,
          end: 20,
          kind: 122,
          flags: 0
        }
      ],
      text: '= {[yield]: 1}) => z',
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
          message: '`;` expected',
          code: 92,
          start: 10,
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
          start: 16,
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

  it('function *g(){ (x = {[yield y]: 1}) }', () => {
    t.deepEqual(recovery('function *g(){ (x = {[yield y]: 1}) }', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'g',
            start: 10,
            end: 11,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 16,
                      end: 17,
                      kind: 13,
                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'ObjectLiteral',
                      properties: [
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'ComputedPropertyName',
                            expression: {
                              type: 'YieldExpression',
                              delegate: false,
                              argument: {
                                type: 'IdentifierReference',
                                name: 'y',
                                start: 27,
                                end: 29,
                                kind: 13,
                                flags: 0
                              },
                              start: 22,
                              end: 29,
                              kind: 193,
                              flags: 0
                            },
                            start: 21,
                            end: 30,
                            kind: 171,
                            flags: 0
                          },
                          value: {
                            type: 'NumericLiteral',
                            value: 1,
                            start: 31,
                            end: 33,
                            kind: 10,
                            flags: 0
                          },
                          start: 21,
                          end: 33,
                          kind: 227,
                          flags: 0
                        }
                      ],
                      start: 19,
                      end: 34,
                      kind: 179,
                      flags: 0
                    },
                    start: 16,
                    end: 34,
                    kind: 152,
                    flags: 0
                  },
                  start: 14,
                  end: 35,
                  kind: 189,
                  flags: 0
                },
                start: 14,
                end: 35,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 37,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 37,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function *g(){ (x = {[yield y]: 1}) }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it(':yield/(', () => {
    t.deepEqual(recovery(':yield/(', 'recovery.js'), {
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
              name: 'yield',
              start: 1,
              end: 6,
              kind: 13,
              flags: 0
            },
            operator: '/',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              start: 7,
              end: 8,
              kind: 189,
              flags: 0
            },
            start: 1,
            end: 8,
            kind: 155,
            flags: 0
          },
          start: 1,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: ':yield/(',
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

  it('a:yield/x', () => {
    t.deepEqual(recovery('a:yield/x', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'a',
            start: 0,
            end: 2,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 2,
                end: 7,
                kind: 13,
                flags: 0
              },
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: 'x',
                start: 8,
                end: 9,
                kind: 13,
                flags: 0
              },
              start: 2,
              end: 9,
              kind: 155,
              flags: 0
            },
            start: 2,
            end: 9,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 134,
          flags: 0
        }
      ],
      text: 'a:yield/x',
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

  it('yield = ((y)) =', () => {
    t.deepEqual(recovery('yield = ((y)) =', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'y',
                    start: 10,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  start: 9,
                  end: 12,
                  kind: 189,
                  flags: 0
                },
                start: 7,
                end: 13,
                kind: 189,
                flags: 0
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 15,
                end: 15,
                kind: 13,
                flags: 2
              },
              start: 7,
              end: 15,
              kind: 152,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: 'yield = ((y)) =',
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

  it('function* g() { yield }', () => {
    t.deepEqual(recovery('function* g() { yield }', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [],
      directives: [],
      end: 23,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          async: false,
          contents: {
            directives: [],
            end: 23,
            flags: 0,
            kind: 184,
            leafs: [
              {
                end: 21,
                expression: {
                  argument: null,
                  delegate: false,
                  end: 21,
                  flags: 0,
                  kind: 193,
                  start: 15,
                  type: 'YieldExpression'
                },
                flags: 0,
                kind: 122,
                start: 15,
                type: 'ExpressionStatement'
              }
            ],
            start: 13,
            type: 'FunctionBody'
          },
          end: 23,
          flags: 0,
          generator: true,
          kind: 186,
          name: {
            end: 11,
            flags: 0,
            kind: 168,
            name: 'g',
            start: 9,
            type: 'BindingIdentifier'
          },
          params: [],
          start: 0,
          type: 'FunctionDeclaration'
        }
      ],
      length: 23,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'function* g() { yield }'
    });
  });

  it('function* g() { yield\n* foo }', () => {
    t.deepEqual(recovery('function* g() { yield\n* foo }', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 7,
          kind: 3,
          length: 1,
          message: 'Expression expected',
          source: 2,
          start: 22
        }
      ],
      directives: [],
      end: 29,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          async: false,
          contents: {
            directives: [],
            end: 29,
            flags: 0,
            kind: 184,
            leafs: [
              {
                end: 27,
                expression: {
                  argument: {
                    end: 27,
                    flags: 0,
                    kind: 13,
                    name: 'foo',
                    start: 23,
                    type: 'IdentifierReference'
                  },
                  delegate: true,
                  end: 27,
                  flags: 0,
                  kind: 193,
                  start: 15,
                  type: 'YieldExpression'
                },
                flags: 0,
                kind: 122,
                start: 15,
                type: 'ExpressionStatement'
              }
            ],
            start: 13,
            type: 'FunctionBody'
          },
          end: 29,
          flags: 0,
          generator: true,
          kind: 186,
          name: {
            end: 11,
            flags: 0,
            kind: 168,
            name: 'g',
            start: 9,
            type: 'BindingIdentifier'
          },
          params: [],
          start: 0,
          type: 'FunctionDeclaration'
        }
      ],
      length: 29,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'function* g() { yield\n* foo }'
    });
  });

  it('function* g() { yield* }', () => {
    t.deepEqual(recovery('function* g() { yield* }', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'g',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'YieldExpression',
                  delegate: true,
                  argument: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 22,
                    end: 22,
                    kind: 13,
                    flags: 2
                  },
                  start: 15,
                  end: 22,
                  kind: 193,
                  flags: 0
                },
                start: 15,
                end: 22,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 24,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* g() { yield* }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('yield', () => {
    t.deepEqual(recovery('yield', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'yield',
            start: 0,
            end: 5,
            kind: 13,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'yield',
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

  it('(yield', () => {
    t.deepEqual(recovery('(yield', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 1,
              end: 6,
              kind: 13,
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
      text: '(yield',
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
          length: 5
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

  it('(!yield', () => {
    t.deepEqual(recovery('(!yield', 'recovery.js'), {
      kind: 209,
      webCompat: true,
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
                type: 'IdentifierReference',
                name: 'yield',
                start: 2,
                end: 7,
                kind: 13,
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
      text: '(!yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 2,
          length: 5
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

  it('function *a yield (', () => {
    t.deepEqual(recovery('function *a yield (', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 10,
            end: 11,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 11,
            end: 11,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 11,
              end: 17,
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 11,
            end: 19,
            kind: 156,
            flags: 0
          },
          start: 11,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function *a yield (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 18,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('function async * yield (', () => {
    t.deepEqual(recovery('function async * yield (', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 8,
            end: 14,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 14,
              end: 14,
              kind: 13,
              flags: 2
            },
            operator: '*',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 16,
                end: 22,
                kind: 13,
                flags: 0
              },
              arguments: [],
              start: 16,
              end: 24,
              kind: 156,
              flags: 0
            },
            start: 14,
            end: 24,
            kind: 155,
            flags: 0
          },
          start: 14,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function async * yield (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 23,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('(*foo=bar yield', () => {
    t.deepEqual(recovery('(*foo=bar yield', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 1,
                  end: 1,
                  kind: 13,
                  flags: 2
                },
                operator: '*',
                right: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 155,
                flags: 0
              },
              start: 0,
              end: 5,
              kind: 189,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'bar',
              start: 6,
              end: 9,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 152,
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
            name: 'yield',
            start: 9,
            end: 15,
            kind: 13,
            flags: 0
          },
          start: 9,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: '(*foo=bar yield',
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
        },
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
          message: '`;` expected',
          code: 92,
          start: 10,
          length: 5
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

  it('!yield(', () => {
    t.deepEqual(recovery('!yield(', 'recovery.js'), {
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
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 1,
                end: 6,
                kind: 13,
                flags: 0
              },
              arguments: [],
              start: 1,
              end: 7,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 7,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '!yield(',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 7,
      end: 7
    });
  });

  // Also in this case 'yield' will be parsed out in its own production becae
  // not part of the function body. '{' is missing
  it('async function *x(yield yield x', () => {
    t.deepEqual(recovery('async function *x(yield yield x', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 16,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 18,
              end: 23,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 23,
              end: 29,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 29,
              end: 31,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 31,
            end: 31,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 31,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function *x(yield yield x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 18,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 24,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 30,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 31,
      end: 31
    });
  });

  it('async function *x(yield { yield x', () => {
    t.deepEqual(recovery('async function *x(yield { yield x', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 16,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 18,
              end: 23,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingElement',
              left: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'yield',
                    start: 25,
                    end: 31,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 31,
                    end: 33,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 23,
                end: 33,
                kind: 169,
                flags: 0
              },
              right: null,
              start: 23,
              end: 33,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 33,
            end: 33,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 33,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function *x(yield { yield x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 18,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 24,
          length: 1
        },
        {
          code: 21,
          kind: 3,
          length: 8,
          message: 'Unexpected `yield` as identifier in this context',
          source: 2,
          start: 25
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 32,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `yield`',
          code: 124,
          start: 31,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 32,
          length: 1
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
});
