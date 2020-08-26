import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Object', () => {
  it('({...', () => {
    t.deepEqual(recovery('({...', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'SpreadProperty',
                  argument: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 5,
                    end: 5,
                    kind: 13,
                    flags: 2
                  },
                  start: 2,
                  end: 5,
                  kind: 215,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({...',
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

  it('({...[', () => {
    t.deepEqual(recovery('({...[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'SpreadProperty',
                  argument: {
                    type: 'ArrayLiteral',
                    elements: [],
                    start: 5,
                    end: 6,
                    kind: 178,
                    flags: 0
                  },
                  start: 2,
                  end: 6,
                  kind: 215,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
              kind: 179,
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
      text: '({...[',
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

  it('({x=', () => {
    t.deepEqual(recovery('({x=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'CoverInitializedName',
                  left: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
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
                  kind: 181,
                  flags: 0
                }
              ],
              start: 1,
              end: 4,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '({x=',
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

  it('({x=}=', () => {
    t.deepEqual(recovery('({x=}=', 'recovery.js'), {
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
                properties: [
                  {
                    type: 'AssignmentElement',
                    left: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 2,
                      end: 4,
                      kind: 13,
                      flags: 0
                    },
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
                    kind: 181,
                    flags: 0
                  }
                ],
                start: 1,
                end: 5,
                kind: 179,
                flags: 0
              },
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 6,
              kind: 213,
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
      text: '({x=}=',
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

  it('({x=})=', () => {
    t.deepEqual(recovery('({x=})=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'CoverInitializedName',
                    left: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 2,
                      end: 4,
                      kind: 13,
                      flags: 0
                    },
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
                    kind: 181,
                    flags: 0
                  }
                ],
                start: 1,
                end: 5,
                kind: 179,
                flags: 0
              },
              start: 0,
              end: 6,
              kind: 189,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 7,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '({x=})=',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
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

  it('({for, x=y', () => {
    t.deepEqual(recovery('({for, x=y', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'for',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'CoverInitializedName',
                  left: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 6,
                    end: 9,
                    kind: 13,
                    flags: 0
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'y',
                    start: 9,
                    end: 10,
                    kind: 13,
                    flags: 0
                  },
                  start: 6,
                  end: 10,
                  kind: 181,
                  flags: 0
                }
              ],
              start: 1,
              end: 10,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '({for, x=y',
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

  it('({!for, x=y', () => {
    t.deepEqual(recovery('({!for, x=y', 'recovery.js'), {
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
            end: 2,
            kind: 189,
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
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ForStatement',
          initializer: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,
                kind: 13,
                flags: 2
              },
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 7,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 10,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                start: 7,
                end: 11,
                kind: 152,
                flags: 0
              }
            ],
            start: 6,
            end: 11,
            kind: 147,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,
            kind: 13,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,
              kind: 13,
              flags: 2
            },
            start: 11,
            end: 11,
            kind: 122,
            flags: 0
          },
          start: 3,
          end: 11,
          kind: 132,
          flags: 0
        }
      ],
      text: '({!for, x=y',
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
          message: 'Expression expected',
          code: 7,
          start: 3,
          length: 3
        },
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
          message: '`;` expected',
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

  it('({ x/', () => {
    t.deepEqual(recovery('({ x/', 'recovery.js'), {
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
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 4,
                kind: 179,
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
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x/',
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

  it('({ x(/', () => {
    t.deepEqual(recovery('({ x(/', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`)` expected',
          source: 2,
          start: 5
        }
      ],
      directives: [],
      end: 6,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          end: 6,
          expression: {
            end: 6,
            expression: {
              end: 6,
              flags: 0,
              kind: 155,
              left: {
                end: 5,
                flags: 0,
                kind: 179,
                properties: [
                  {
                    async: false,
                    contents: {
                      directives: [],
                      end: 5,
                      flags: 0,
                      kind: 184,
                      leafs: [],
                      start: 5,
                      type: 'FunctionBody'
                    },
                    end: 5,
                    flags: 0,
                    generator: false,
                    kind: 182,
                    name: {
                      end: 4,
                      flags: 0,
                      kind: 13,
                      name: 'x',
                      start: 2,
                      type: 'IdentifierName'
                    },
                    propertySetParameterList: [],
                    start: 4,
                    type: 'MethodDefinition',
                    uniqueFormalParameters: []
                  }
                ],
                start: 1,
                type: 'ObjectLiteral'
              },
              operator: '/',
              right: {
                end: 6,
                flags: 2,
                kind: 13,
                name: '',
                start: 6,
                type: 'IdentifierReference'
              },
              start: 1,
              type: 'BinaryExpression'
            },
            flags: 0,
            kind: 189,
            start: 0,
            type: 'ParenthesizedExpression'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 6,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '({ x(/'
    });
  });

  it('({ {}', () => {
    t.deepEqual(recovery('({ {}', 'recovery.js'), {
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
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 2,
          end: 5,
          kind: 123,
          flags: 0
        }
      ],
      text: '({ {}',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('({// foo', () => {
    t.deepEqual(recovery('({// foo', 'recovery.js'), {
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
      text: '({// foo',
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
          length: 6
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

  it('(/{', () => {
    t.deepEqual(recovery('(/{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: '',
              flag: '',
              start: 1,
              end: 3,
              kind: 15,
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
      text: '(/{',
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

  it('({--a', () => {
    t.deepEqual(recovery('({--a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'PostfixUpdateExpression',
              operator: '--',
              operand: {
                type: 'ObjectLiteral',
                properties: [],
                start: 1,
                end: 2,
                kind: 179,
                flags: 0
              },
              start: 2,
              end: 4,
              kind: 162,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 4,
            end: 5,
            kind: 13,
            flags: 0
          },
          start: 4,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({--a',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('({ a(x:!', () => {
    t.deepEqual(recovery('({ a(x:!', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                      name: 'x',
                      start: 5,
                      end: 6,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 6,
                    end: 6,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 6,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
              kind: 179,
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
        },
        {
          type: 'ExpressionStatement',
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
            start: 7,
            end: 8,
            kind: 160,
            flags: 0
          },
          start: 7,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a(x:!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
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
      length: 8,
      end: 8
    });
  });

  it('({get get x(x', () => {
    t.deepEqual(recovery('({get get x(x', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'get',
                    start: 5,
                    end: 9,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 9,
                    end: 9,
                    kind: 184,
                    flags: 0
                  },
                  start: 9,
                  end: 9,
                  kind: 182,
                  flags: 0
                },
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x',
                      start: 12,
                      end: 13,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 9,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 13,
                    end: 13,
                    kind: 184,
                    flags: 0
                  },
                  start: 11,
                  end: 13,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 13,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get get x(x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('({x set set get get x', () => {
    t.deepEqual(recovery('({x set set get get x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 2,
                  end: 3,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [
                    {
                      type: 'BindingIdentifier',
                      name: 'get',
                      start: 11,
                      end: 15,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'set',
                    start: 7,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 15,
                    end: 15,
                    kind: 184,
                    flags: 0
                  },
                  start: 11,
                  end: 15,
                  kind: 182,
                  flags: 0
                },
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 19,
                    end: 21,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 21,
                    end: 21,
                    kind: 184,
                    flags: 0
                  },
                  start: 21,
                  end: 21,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 21,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 21,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 122,
          flags: 0
        }
      ],
      text: '({x set set get get x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 4,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 16,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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

  it('({x set set !! get get x', () => {
    t.deepEqual(recovery('({x set set !! get get x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 2,
                  end: 3,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 11,
                      end: 13,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'set',
                    start: 7,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 13,
                    end: 13,
                    kind: 184,
                    flags: 0
                  },
                  start: 11,
                  end: 13,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 13,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 189,
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
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: 'get',
              start: 14,
              end: 18,
              kind: 13,
              flags: 0
            },
            start: 13,
            end: 18,
            kind: 160,
            flags: 0
          },
          start: 13,
          end: 18,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'get',
            start: 18,
            end: 22,
            kind: 13,
            flags: 0
          },
          start: 18,
          end: 22,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 22,
            end: 24,
            kind: 13,
            flags: 0
          },
          start: 22,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: '({x set set !! get get x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 4,
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
          message: '`)` expected',
          code: 5,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 19,
          length: 3
        },
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
      length: 24,
      end: 24
    });
  });

  it('({get != set', () => {
    t.deepEqual(recovery('({get != set', 'recovery.js'), {
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
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'get',
                    start: 2,
                    end: 5,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 5,
                kind: 179,
                flags: 0
              },
              operator: '!=',
              right: {
                type: 'IdentifierReference',
                name: 'set',
                start: 8,
                end: 12,
                kind: 13,
                flags: 0
              },
              start: 1,
              end: 12,
              kind: 155,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get != set',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 6,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('({get ! = set', () => {
    t.deepEqual(recovery('({get ! = set', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'get',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
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
            type: 'AssignmentExpression',
            left: {
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
              start: 5,
              end: 7,
              kind: 160,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'set',
              start: 9,
              end: 13,
              kind: 13,
              flags: 0
            },
            start: 5,
            end: 13,
            kind: 152,
            flags: 0
          },
          start: 5,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get ! = set',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 6,
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
      length: 13,
      end: 13
    });
  });

  it('({get!}', () => {
    t.deepEqual(recovery('({get!}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'get',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
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
          start: 5,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get!}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('({a:', () => {
    t.deepEqual(recovery('({a:', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 4,
                    end: 4,
                    kind: 13,
                    flags: 2
                  },
                  start: 2,
                  end: 4,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 1,
              end: 4,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '({a:',
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

  it('({x:0x', () => {
    t.deepEqual(recovery('({x:0x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'NumericLiteral',
                    value: 0,
                    start: 4,
                    end: 6,
                    kind: 10,
                    flags: 0
                  },
                  start: 2,
                  end: 6,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
              kind: 179,
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
      text: '({x:0x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Hex integer literal like sequence without any digits',
          code: 64,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
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

  it('({x:=(', () => {
    t.deepEqual(recovery('({x:=(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  value: {
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
                    start: 2,
                    end: 6,
                    kind: 152,
                    flags: 0
                  },
                  start: 2,
                  end: 6,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
              kind: 179,
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
      text: '({x:=(',
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

  it('({ 1n', () => {
    t.deepEqual(recovery('({ 1n', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'BigIntLiteral',
                  value: '1',
                  start: 2,
                  end: 5,
                  kind: 11,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ 1n',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 36,
          start: 3,
          length: 2
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

  it('({ => {}', () => {
    t.deepEqual(recovery('({ => {}', 'recovery.js'), {
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
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 5,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '({ => {}',
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
          length: 2
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

  it('({x=>', () => {
    t.deepEqual(recovery('({x=>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 2,
                  end: 3,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 3,
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
        }
      ],
      text: '({x=>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 3,
          length: 2
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

  it('({[', () => {
    t.deepEqual(recovery('({[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 3,
                    end: 3,
                    kind: 13,
                    flags: 2
                  },
                  start: 2,
                  end: 3,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 3,
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
        }
      ],
      text: '({[',
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

  it('({[x', () => {
    t.deepEqual(recovery('({[x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 3,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  start: 2,
                  end: 4,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 4,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '({[x',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('({[x=', () => {
    t.deepEqual(recovery('({[x=', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
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
                      type: 'IdentifierReference',
                      name: '',
                      start: 5,
                      end: 5,
                      kind: 13,
                      flags: 2
                    },
                    start: 3,
                    end: 5,
                    kind: 152,
                    flags: 0
                  },
                  start: 2,
                  end: 5,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({[x=',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('({', () => {
    t.deepEqual(recovery('({', 'recovery.js'), {
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
      text: '({',
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
      length: 2,
      end: 2
    });
  });

  it('({[', () => {
    t.deepEqual(recovery('({[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 3,
                    end: 3,
                    kind: 13,
                    flags: 2
                  },
                  start: 2,
                  end: 3,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 3,
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
        }
      ],
      text: '({[',
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

  it('({[yield = await', () => {
    t.deepEqual(recovery('({[yield = await', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'yield',
                      start: 3,
                      end: 8,
                      kind: 13,
                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'await',
                      start: 10,
                      end: 16,
                      kind: 13,
                      flags: 0
                    },
                    start: 3,
                    end: 16,
                    kind: 152,
                    flags: 0
                  },
                  start: 2,
                  end: 16,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 16,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 16,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '({[yield = await',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 11,
          length: 5
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

  it('({ a b c d', () => {
    t.deepEqual(recovery('({ a b c d', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 2,
                  end: 4,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 4,
                  end: 6,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 6,
                  end: 8,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'd',
                  start: 8,
                  end: 10,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 10,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a b c d',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
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

  it('({ a b c d } = x', () => {
    t.deepEqual(recovery('({ a b c d } = x', 'recovery.js'), {
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
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 6,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 8,
                    end: 10,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 12,
                kind: 179,
                flags: 0
              },
              right: {
                type: 'IdentifierReference',
                name: 'x',
                start: 14,
                end: 16,
                kind: 13,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 213,
              flags: 0
            },
            start: 0,
            end: 16,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a b c d } = x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 9,
          length: 1
        },
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

  it('({ x( {}', () => {
    t.deepEqual(recovery('({ x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 5,
                        end: 8,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 5,
                      end: 8,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 8,
                    end: 8,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 8,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('({ async x( {}', () => {
    t.deepEqual(recovery('({ async x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  async: true,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 11,
                        end: 14,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 11,
                      end: 14,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 8,
                    end: 10,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 14,
                    end: 14,
                    kind: 184,
                    flags: 0
                  },
                  start: 10,
                  end: 14,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 14,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ async x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('({ x(! {}', () => {
    t.deepEqual(recovery('({ x(! {}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 5,
                    end: 5,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
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
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 6,
              end: 9,
              kind: 179,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 160,
            flags: 0
          },
          start: 5,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(! {}',
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
      length: 9,
      end: 9
    });
  });

  it('({ x(++! {}', () => {
    t.deepEqual(recovery('({ x(++! {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'PostfixUpdateExpression',
              operator: '++',
              operand: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'MethodDefinition',
                    async: false,
                    generator: false,
                    propertySetParameterList: [],
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 2,
                      end: 4,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 5,
                      end: 5,
                      kind: 184,
                      flags: 0
                    },
                    start: 4,
                    end: 5,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 1,
                end: 5,
                kind: 179,
                flags: 0
              },
              start: 5,
              end: 7,
              kind: 162,
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 8,
              end: 11,
              kind: 179,
              flags: 0
            },
            start: 7,
            end: 11,
            kind: 160,
            flags: 0
          },
          start: 7,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(++! {}',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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
      length: 11,
      end: 11
    });
  });

  it('({ get x( {}', () => {
    t.deepEqual(recovery('({ get x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 9,
                    end: 12,
                    kind: 184,
                    flags: 0
                  },
                  start: 8,
                  end: 12,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ get x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('({ x(', () => {
    t.deepEqual(recovery('({ x(', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 5,
                    end: 5,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('({ x( !}', () => {
    t.deepEqual(recovery('({ x( !}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 5,
                    end: 5,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
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
      text: '({ x( !}',
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

  it('({ get foo(b) {} })', () => {
    t.deepEqual(recovery('({ get foo(b) {} })', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'foo',
                    start: 6,
                    end: 10,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 11,
                    end: 11,
                    kind: 184,
                    flags: 0
                  },
                  start: 10,
                  end: 11,
                  kind: 182,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 11,
                  end: 12,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 16,
          kind: 123,
          flags: 0
        }
      ],
      text: '({ get foo(b) {} })',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 14,
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

  it('({ x(! a = b {}', () => {
    t.deepEqual(recovery('({ x(! a = b {}', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 5,
                    end: 5,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
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
            type: 'AssignmentExpression',
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
              start: 5,
              end: 8,
              kind: 160,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 10,
              end: 12,
              kind: 13,
              flags: 0
            },
            start: 5,
            end: 12,
            kind: 152,
            flags: 0
          },
          start: 5,
          end: 12,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 12,
          end: 15,
          kind: 123,
          flags: 0
        }
      ],
      text: '({ x(! a = b {}',
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
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 13,
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

  it('({ x( {}!', () => {
    t.deepEqual(recovery('({ x( {}!', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 5,
                        end: 8,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 5,
                      end: 8,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 8,
                    end: 8,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 8,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
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
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 9,
            kind: 160,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x( {}!',
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
});
