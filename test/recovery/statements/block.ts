import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Block', () => {
  it('{ function let(){} }', () => {
    t.deepEqual(recovery('{ function let(){} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'let',
                start: 10,
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
                start: 16,
                end: 18,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 18,
              kind: 186,
              flags: 0
            }
          ],
          start: 0,
          end: 20,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ function let(){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('{ async *[await = 5]() {}}', () => {
    t.deepEqual(recovery('{ async *[await = 5]() {}}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 1,
                  end: 7,
                  kind: 13,
                  flags: 0
                },
                operator: '*',
                right: {
                  type: 'CallExpression',
                  expression: {
                    type: 'ArrayLiteral',
                    elements: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'await',
                          start: 10,
                          end: 15,
                          kind: 13,
                          flags: 0
                        },
                        operator: '=',
                        right: {
                          type: 'NumericLiteral',
                          value: 5,
                          start: 17,
                          end: 19,
                          kind: 10,
                          flags: 0
                        },
                        start: 10,
                        end: 19,
                        kind: 152,
                        flags: 0
                      }
                    ],
                    start: 9,
                    end: 20,
                    kind: 178,
                    flags: 0
                  },
                  arguments: [],
                  start: 9,
                  end: 22,
                  kind: 156,
                  flags: 0
                },
                start: 1,
                end: 22,
                kind: 155,
                flags: 0
              },
              start: 1,
              end: 22,
              kind: 122,
              flags: 0
            },
            {
              type: 'BlockStatement',
              leafs: [],
              start: 22,
              end: 25,
              kind: 123,
              flags: 0
            }
          ],
          start: 0,
          end: 26,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ async *[await = 5]() {}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 23,
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

  it('{ (x = [yield]) }', () => {
    t.deepEqual(recovery('{ (x = [yield]) }', 'recovery.js'), {
      kind: 209,
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
                    type: 'ArrayLiteral',
                    elements: [
                      {
                        type: 'IdentifierReference',
                        name: 'yield',
                        start: 8,
                        end: 13,
                        kind: 13,
                        flags: 0
                      }
                    ],
                    start: 6,
                    end: 14,
                    kind: 178,
                    flags: 0
                  },
                  start: 3,
                  end: 14,
                  kind: 152,
                  flags: 0
                },
                start: 1,
                end: 15,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 15,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ (x = [yield]) }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 17,
      end: 17
    });
  });

  it('{}let a, b = 42, c;b;;', () => {
    t.deepEqual(recovery('{}let a, b = 42, c;b;;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        },
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 5,
                end: 7,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,
              kind: 146,
              flags: 0
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'b',
                start: 8,
                end: 10,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'NumericLiteral',
                value: 42,
                start: 12,
                end: 15,
                kind: 10,
                flags: 0
              },
              start: 8,
              end: 15,
              kind: 146,
              flags: 0
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'c',
                start: 16,
                end: 18,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 16,
              end: 18,
              kind: 146,
              flags: 0
            }
          ],
          start: 2,
          end: 19,
          kind: 145,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 19,
            end: 20,
            kind: 13,
            flags: 0
          },
          start: 19,
          end: 21,
          kind: 122,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 21,
          end: 22,
          kind: 148,
          flags: 0
        }
      ],
      text: '{}let a, b = 42, c;b;;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });

  it('{ function f(){} } function f(){}', () => {
    t.deepEqual(recovery('{ function f(){} } function f(){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'f',
                start: 10,
                end: 12,
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
                end: 16,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 186,
              flags: 0
            }
          ],
          start: 0,
          end: 18,
          kind: 123,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 27,
            end: 29,
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
            start: 31,
            end: 33,
            kind: 184,
            flags: 0
          },
          start: 18,
          end: 33,
          kind: 186,
          flags: 0
        }
      ],
      text: '{ function f(){} } function f(){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 33,
      end: 33
    });
  });

  it('try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }', () => {
    t.deepEqual(
      recovery('try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }', 'recovery.js'),
      {
        kind: 209,
        directives: [],
        leafs: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ThrowStatement',
                  expression: {
                    type: 'ObjectLiteral',
                    properties: [],
                    start: 11,
                    end: 14,
                    kind: 179,
                    flags: 0
                  },
                  start: 5,
                  end: 15,
                  kind: 137,
                  flags: 0
                }
              ],
              start: 3,
              end: 17,
              kind: 123,
              flags: 0
            },
            catchClause: {
              type: 'CatchClause',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 26,
                    end: 28,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 25,
                end: 30,
                kind: 169,
                flags: 0
              },
              block: {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'SwitchStatement',
                    expression: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 42,
                      end: 43,
                      kind: 10,
                      flags: 0
                    },
                    clauses: [
                      {
                        type: 'DefaultClause',
                        leafs: [
                          {
                            type: 'FunctionDeclaration',
                            name: {
                              type: 'BindingIdentifier',
                              name: 'f',
                              start: 64,
                              end: 66,
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
                              start: 68,
                              end: 73,
                              kind: 184,
                              flags: 0
                            },
                            start: 55,
                            end: 73,
                            kind: 186,
                            flags: 0
                          }
                        ],
                        start: 46,
                        end: 73,
                        kind: 142,
                        flags: 0
                      }
                    ],
                    start: 33,
                    end: 74,
                    kind: 136,
                    flags: 0
                  }
                ],
                start: 31,
                end: 76,
                kind: 123,
                flags: 0
              },
              start: 17,
              end: 76,
              kind: 140,
              flags: 0
            },
            finalizer: null,
            start: 0,
            end: 76,
            kind: 138,
            flags: 0
          }
        ],
        text: 'try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 76,
        end: 76
      }
    );
  });

  it('{ { var f; } var f }', () => {
    t.deepEqual(recovery('{ { var f; } var f }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 7,
                        end: 9,
                        kind: 168,
                        flags: 0
                      },
                      initializer: null,
                      start: 7,
                      end: 9,
                      kind: 144,
                      flags: 0
                    }
                  ],
                  start: 3,
                  end: 10,
                  kind: 143,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 123,
              flags: 0
            },
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 16,
                    end: 18,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 16,
                  end: 18,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 12,
              end: 18,
              kind: 143,
              flags: 0
            }
          ],
          start: 0,
          end: 20,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ { var f; } var f }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('{', () => {
    t.deepEqual(recovery('{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 1,
          kind: 123,
          flags: 0
        }
      ],
      text: '{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 0,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 1,
      end: 1
    });
  });

  it('{!', () => {
    t.deepEqual(recovery('{!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 2,
                  end: 2,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        }
      ],
      text: '{!',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('{;;;,,,', () => {
    t.deepEqual(recovery('{;;;,,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'EmptyStatement',
              start: 1,
              end: 2,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 2,
              end: 3,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 3,
              end: 4,
              kind: 148,
              flags: 0
            }
          ],
          start: 0,
          end: 4,
          kind: 123,
          flags: 0
        }
      ],
      text: '{;;;,,,',
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

  it('{async(,,', () => {
    t.deepEqual(recovery('{async(,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CommaOperator',
                expressions: [
                  {
                    type: 'CallExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'async',
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
                  {
                    type: 'IdentifierReference',
                    name: '',
                    start: 8,
                    end: 8,
                    kind: 13,
                    flags: 2
                  },
                  {
                    type: 'IdentifierReference',
                    name: '',
                    start: 9,
                    end: 9,
                    kind: 13,
                    flags: 2
                  }
                ],
                start: 1,
                end: 9,
                kind: 147,
                flags: 0
              },
              start: 1,
              end: 9,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 9,
          kind: 123,
          flags: 0
        }
      ],
      text: '{async(,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 7,
          length: 1
        },
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('{(catch)', () => {
    t.deepEqual(recovery('{(catch)', 'recovery.js'), {
      kind: 209,
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
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 2,
                  end: 2,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            },
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 2,
                end: 2,
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
                  start: 7,
                  end: 7,
                  kind: 123,
                  flags: 0
                },
                flags: 0,
                start: 2,
                end: 7
              },
              finalizer: null,
              start: 2,
              end: 7,
              kind: 138,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 123,
          flags: 0
        }
      ],
      text: '{(catch)',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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

  it('!{}}}}', () => {
    t.deepEqual(recovery('!{}}}}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 3,
              kind: 179,
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
      text: '!{}}}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('function!{', () => {
    t.deepEqual(recovery('function!{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
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
            start: 8,
            end: 8,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 9,
              end: 10,
              kind: 179,
              flags: 0
            },
            start: 8,
            end: 10,
            kind: 160,
            flags: 0
          },
          start: 8,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function!{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('class!{', () => {
    t.deepEqual(recovery('class!{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,
          kind: 150,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 6,
              end: 7,
              kind: 179,
              flags: 0
            },
            start: 5,
            end: 7,
            kind: 160,
            flags: 0
          },
          start: 5,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'class!{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 5,
          length: 1
        },
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
  it('(!{', () => {
    t.deepEqual(recovery('(!{', 'recovery.js'), {
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
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '(!{',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });
  it('({){/a/}', () => {
    t.deepEqual(recovery('({){/a/}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 2,
              kind: 179,
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
                type: 'RegularExpressionLiteral',
                pattern: 'a',
                flag: '',
                start: 4,
                end: 7,
                kind: 15,
                flags: 0
              },
              start: 4,
              end: 7,
              kind: 122,
              flags: 0
            }
          ],
          start: 3,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '({){/a/}',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
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

  it('{!}', () => {
    t.deepEqual(recovery('{!}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 2,
                  end: 2,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 3,
          kind: 123,
          flags: 0
        }
      ],
      text: '{!}',
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
  it('{while !} do while {', () => {
    t.deepEqual(recovery('{while !} do while {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'WhileStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 8,
                  end: 8,
                  kind: 13,
                  flags: 2
                },
                start: 6,
                end: 8,
                kind: 160,
                flags: 0
              },
              statement: {
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
              start: 1,
              end: 8,
              kind: 139,
              flags: 0
            }
          ],
          start: 0,
          end: 9,
          kind: 123,
          flags: 0
        },
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 20,
            end: 20,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 18,
              end: 20,
              kind: 179,
              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 20,
                end: 20,
                kind: 13,
                flags: 2
              },
              start: 20,
              end: 20,
              kind: 122,
              flags: 0
            },
            start: 12,
            end: 20,
            kind: 139,
            flags: 0
          },
          start: 9,
          end: 20,
          kind: 127,
          flags: 0
        }
      ],
      text: '{while !} do while {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
          length: 1
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
          message: '`(` expected',
          code: 5,
          start: 19,
          length: 1
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

  it('{!', () => {
    t.deepEqual(recovery('{!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 2,
                  end: 2,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        }
      ],
      text: '{!',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });
  it('{=v', () => {
    t.deepEqual(recovery('{=v', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 1,
          kind: 123,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'v',
            start: 2,
            end: 3,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '{=v',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });
  it('{/aaa?b', () => {
    t.deepEqual(recovery('{/aaa?b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'RegularExpressionLiteral',
                pattern: 'aaa?',
                flag: '',
                start: 1,
                end: 7,
                kind: 15,
                flags: 0
              },
              start: 1,
              end: 7,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 123,
          flags: 0
        }
      ],
      text: '{/aaa?b',
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
          length: 6
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

  it('{a?.b', () => {
    t.deepEqual(recovery('{a?.b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'OptionalExpression',
                member: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
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
                      name: 'b',
                      start: 4,
                      end: 5,
                      kind: 13,
                      flags: 0
                    },
                    computed: false,
                    start: 4,
                    end: 5,
                    kind: 158,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 226,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 157,
                flags: 0
              },
              start: 1,
              end: 5,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 123,
          flags: 0
        }
      ],
      text: '{a?.b',
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
  it('{a?.[a{}]', () => {
    t.deepEqual(recovery('{a?.[a{}]', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'OptionalExpression',
                member: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
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
                      name: 'a',
                      start: 5,
                      end: 6,
                      kind: 13,
                      flags: 0
                    },
                    computed: true,
                    start: 4,
                    end: 6,
                    kind: 158,
                    flags: 0
                  },
                  start: 4,
                  end: 6,
                  kind: 226,
                  flags: 0
                },
                start: 1,
                end: 6,
                kind: 157,
                flags: 0
              },
              start: 1,
              end: 6,
              kind: 122,
              flags: 0
            },
            {
              type: 'BlockStatement',
              leafs: [],
              start: 6,
              end: 8,
              kind: 123,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '{a?.[a{}]',
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
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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
  it('{!////////', () => {
    t.deepEqual(recovery('{!////////', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 2,
                  end: 2,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        }
      ],
      text: '{!////////',
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
          length: 8
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

  it('{(,,,clause)', () => {
    t.deepEqual(recovery('{(,,,clause)', 'recovery.js'), {
      kind: 209,
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
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 2,
                      end: 2,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 3,
                      end: 3,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 4,
                      end: 4,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: 'clause',
                      start: 5,
                      end: 11,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 1,
                  end: 11,
                  kind: 147,
                  flags: 0
                },
                start: 1,
                end: 12,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 12,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 12,
          kind: 123,
          flags: 0
        }
      ],
      text: '{(,,,clause)',
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
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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
  it('{finally(,,,,,,,,', () => {
    t.deepEqual(recovery('{finally(,,,,,,,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 1,
                end: 1,
                kind: 123,
                flags: 0
              },
              catchClause: null,
              finalizer: {
                type: 'BlockStatement',
                leafs: [],
                start: 8,
                end: 8,
                kind: 123,
                flags: 0
              },
              start: 1,
              end: 8,
              kind: 138,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'CommaOperator',
                  expressions: [
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 9,
                      end: 9,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 10,
                      end: 10,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 11,
                      end: 11,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 12,
                      end: 12,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 13,
                      end: 13,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 14,
                      end: 14,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 15,
                      end: 15,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 16,
                      end: 16,
                      kind: 13,
                      flags: 2
                    },
                    {
                      type: 'IdentifierReference',
                      name: '',
                      start: 17,
                      end: 17,
                      kind: 13,
                      flags: 2
                    }
                  ],
                  start: 8,
                  end: 17,
                  kind: 147,
                  flags: 0
                },
                start: 8,
                end: 17,
                kind: 189,
                flags: 0
              },
              start: 8,
              end: 17,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: '{finally(,,,,,,,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 1,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
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
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
  it('{catch finally {}}', () => {
    t.deepEqual(recovery('{catch finally {}}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 1,
                end: 1,
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
                  start: 6,
                  end: 6,
                  kind: 123,
                  flags: 0
                },
                flags: 0,
                start: 1,
                end: 6
              },
              finalizer: {
                type: 'BlockStatement',
                leafs: [],
                start: 14,
                end: 17,
                kind: 123,
                flags: 0
              },
              start: 1,
              end: 17,
              kind: 138,
              flags: 0
            }
          ],
          start: 0,
          end: 18,
          kind: 123,
          flags: 0
        }
      ],
      text: '{catch finally {}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 1,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 7,
          length: 7
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

  it('switch!{', () => {
    t.deepEqual(recovery('switch!{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 7,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 6,
            end: 8,
            kind: 160,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch!{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
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
  it('{switch !', () => {
    t.deepEqual(recovery('{switch !', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'SwitchStatement',
              expression: {
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
                start: 7,
                end: 9,
                kind: 160,
                flags: 0
              },
              clauses: [],
              start: 1,
              end: 9,
              kind: 136,
              flags: 0
            }
          ],
          start: 0,
          end: 9,
          kind: 123,
          flags: 0
        }
      ],
      text: '{switch !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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
  it('for = {', () => {
    t.deepEqual(recovery('for = {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 3,
              end: 3,
              kind: 13,
              flags: 2
            },
            operator: '=',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 5,
              end: 7,
              kind: 179,
              flags: 0
            },
            start: 3,
            end: 7,
            kind: 152,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 7,
            end: 7,
            kind: 13,
            flags: 2
          },
          incrementor: {
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
          start: 0,
          end: 7,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for = {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 4,
          length: 1
        },
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
  it('{for = b', () => {
    t.deepEqual(recovery('{for = b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ForStatement',
              initializer: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 13,
                  flags: 2
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 8,
                  kind: 13,
                  flags: 0
                },
                start: 4,
                end: 8,
                kind: 152,
                flags: 0
              },
              condition: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              incrementor: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              statement: {
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
              start: 1,
              end: 8,
              kind: 132,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '{for = b',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('U{ x = { foo: default }', () => {
    t.deepEqual(recovery('U{ x = { foo: default }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'U',
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
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 2,
                  end: 4,
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
                        type: 'IdentifierName',
                        name: 'foo',
                        start: 8,
                        end: 12,
                        kind: 13,
                        flags: 0
                      },
                      value: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 13,
                        end: 13,
                        kind: 13,
                        flags: 2
                      },
                      start: 8,
                      end: 13,
                      kind: 227,
                      flags: 0
                    },
                    {
                      type: 'IdentifierReference',
                      name: 'default',
                      start: 13,
                      end: 21,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 6,
                  end: 23,
                  kind: 179,
                  flags: 0
                },
                start: 2,
                end: 23,
                kind: 152,
                flags: 0
              },
              start: 2,
              end: 23,
              kind: 122,
              flags: 0
            }
          ],
          start: 1,
          end: 23,
          kind: 123,
          flags: 0
        }
      ],
      text: 'U{ x = { foo: default }',
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
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 14,
          length: 7
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 13,
          length: 10
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 22,
          length: 1
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

  it('{ 1 = 2', () => {
    t.deepEqual(recovery('{ 1 = 2', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 1,
                  end: 3,
                  kind: 10,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'NumericLiteral',
                  value: 2,
                  start: 5,
                  end: 7,
                  kind: 10,
                  flags: 0
                },
                start: 1,
                end: 7,
                kind: 152,
                flags: 0
              },
              start: 1,
              end: 7,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ 1 = 2',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 4,
          length: 1
        },
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

  it('{({x(eval){"use strict";}})}}', () => {
    t.deepEqual(recovery('{({x(eval){"use strict";}})}}', 'recovery.js'), {
      kind: 209,
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
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'MethodDefinition',
                      async: false,
                      generator: false,
                      propertySetParameterList: [],
                      uniqueFormalParameters: [
                        {
                          type: 'BindingIdentifier',
                          name: 'eval',
                          start: 5,
                          end: 9,
                          kind: 168,
                          flags: 0
                        }
                      ],
                      name: {
                        type: 'IdentifierName',
                        name: 'x',
                        start: 3,
                        end: 4,
                        kind: 13,
                        flags: 0
                      },
                      contents: {
                        type: 'FunctionBody',
                        directives: [
                          {
                            type: 'Directive',
                            value: 'use strict',
                            raw: 'use strict',
                            start: 11,
                            end: 23,
                            kind: 229,
                            flags: 0
                          }
                        ],
                        leafs: [],
                        start: 10,
                        end: 25,
                        kind: 184,
                        flags: 0
                      },
                      start: 4,
                      end: 25,
                      kind: 182,
                      flags: 0
                    }
                  ],
                  start: 2,
                  end: 26,
                  kind: 179,
                  flags: 0
                },
                start: 1,
                end: 27,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 27,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 28,
          kind: 123,
          flags: 0
        }
      ],
      text: '{({x(eval){"use strict";}})}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 28,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 29,
      end: 29
    });
  });

  it('{ new', () => {
    t.deepEqual(recovery('{ new', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'NewExpression',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 5,
                  end: 5,
                  flags: 2
                },
                arguments: [],
                start: 1,
                end: 5,
                kind: 163,
                flags: 0
              },
              start: 1,
              end: 5,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ new',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('{"dd"', () => {
    t.deepEqual(recovery('{"dd"', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'StringLiteral',
                value: 'dd',
                start: 1,
                end: 5,
                kind: 12,
                flags: 0
              },
              start: 1,
              end: 5,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 123,
          flags: 0
        }
      ],
      text: '{"dd"',
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
          length: 4
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

  it('{++', () => {
    t.deepEqual(recovery('{++', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'PrefixUpdateExpression',
                operator: '++',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 3,
                  end: 3,
                  flags: 2
                },
                start: 1,
                end: 3,
                kind: 161,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 3,
          kind: 123,
          flags: 0
        }
      ],
      text: '{++',
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

  it('aa0+{', () => {
    t.deepEqual(recovery('aa0+{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'aa0',
              start: 0,
              end: 3,
              flags: 0
            },
            operator: '+',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 4,
              end: 5,
              kind: 179,
              flags: 0
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
      text: 'aa0+{',
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
  it('2=3{!!', () => {
    t.deepEqual(recovery('2=3{!!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'NumericLiteral',
              value: 2,
              start: 0,
              end: 1,
              kind: 10,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 3,
              start: 2,
              end: 3,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 152,
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
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 6,
                    end: 6,
                    kind: 13,
                    flags: 2
                  },
                  start: 5,
                  end: 6,
                  kind: 160,
                  flags: 0
                },
                start: 4,
                end: 6,
                kind: 160,
                flags: 0
              },
              start: 4,
              end: 6,
              kind: 122,
              flags: 0
            }
          ],
          start: 3,
          end: 6,
          kind: 123,
          flags: 0
        }
      ],
      text: '2=3{!!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 1,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
          length: 1
        },
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
  it('1/2{', () => {
    t.deepEqual(recovery('1/2{', 'recovery.js'), {
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
            operator: '/',
            right: {
              type: 'NumericLiteral',
              value: 2,
              start: 2,
              end: 3,
              kind: 10,
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
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 3,
          end: 4,
          kind: 123,
          flags: 0
        }
      ],
      text: '1/2{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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
  it('{2/--3', () => {
    t.deepEqual(recovery('{2/--3', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'NumericLiteral',
                  value: 2,
                  start: 1,
                  end: 2,
                  kind: 10,
                  flags: 0
                },
                operator: '/',
                right: {
                  type: 'PrefixUpdateExpression',
                  operator: '--',
                  operand: {
                    type: 'NumericLiteral',
                    value: 3,
                    start: 5,
                    end: 6,
                    kind: 10,
                    flags: 0
                  },
                  start: 3,
                  end: 6,
                  kind: 161,
                  flags: 0
                },
                start: 1,
                end: 6,
                kind: 155,
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
      text: '{2/--3',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid left-hand side expression in postfix operation',
          code: 99,
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
  it('{p++ ! a - /3 =/ b', () => {
    t.deepEqual(recovery('{p++ ! a - /3 =/ b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'PostfixUpdateExpression',
                operator: '++',
                operand: {
                  type: 'IdentifierReference',
                  name: 'p',
                  start: 1,
                  end: 2,
                  kind: 13,
                  flags: 0
                },
                start: 2,
                end: 4,
                kind: 162,
                flags: 0
              },
              start: 1,
              end: 4,
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
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  start: 4,
                  end: 8,
                  kind: 160,
                  flags: 0
                },
                operator: '-',
                right: {
                  type: 'RegularExpressionLiteral',
                  pattern: '3 =',
                  flag: '',
                  start: 10,
                  end: 16,
                  kind: 15,
                  flags: 0
                },
                start: 4,
                end: 16,
                kind: 155,
                flags: 0
              },
              start: 4,
              end: 16,
              kind: 122,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'b',
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
      text: '{p++ ! a - /3 =/ b',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('{..b', () => {
    t.deepEqual(recovery('{..b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 1,
          kind: 123,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'b',
            start: 3,
            end: 4,
            flags: 0
          },
          start: 3,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '{..b',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 2,
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
  it('x={...b}{}', () => {
    t.deepEqual(recovery('x={...b}{}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
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
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'SpreadProperty',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 6,
                    end: 7,
                    kind: 13,
                    flags: 0
                  },
                  start: 3,
                  end: 7,
                  kind: 215,
                  flags: 0
                }
              ],
              start: 2,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 8,
          end: 10,
          kind: 123,
          flags: 0
        }
      ],
      text: 'x={...b}{}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 8,
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
});
