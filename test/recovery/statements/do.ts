import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Declarations - Do while', () => {
  it('incomplete do while', () => {
    t.deepEqual(recovery('do while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 8,
            end: 8,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 8,
              end: 8,
              flags: 2
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 8,
                end: 8,
                flags: 2
              },
              start: 8,
              end: 8,
              kind: 122,
              flags: 0
            },
            start: 2,
            end: 8,
            kind: 139,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do while',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 5
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

  it('missing the head and the body - while still survives', () => {
    t.deepEqual(recovery('do(while', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 8,
            end: 8,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 3,
                end: 3,
                flags: 2
              },
              start: 2,
              end: 3,
              kind: 189,
              flags: 0
            },
            start: 2,
            end: 3,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do(while',
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
          length: 5
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

  it('with a following for statement', () => {
    t.deepEqual(recovery('do while for (a in b) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 24,
            end: 24,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,
              kind: 13,
              flags: 2
            },
            statement: {
              type: 'ForInStatement',
              initializer: {
                type: 'IdentifierReference',
                name: 'a',
                start: 14,
                end: 15,
                kind: 13,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: 'b',
                start: 18,
                end: 20,
                kind: 13,
                flags: 0
              },
              statement: {
                type: 'BlockStatement',
                leafs: [],
                start: 21,
                end: 24,
                kind: 123,
                flags: 0
              },
              start: 8,
              end: 24,
              kind: 130,
              flags: 0
            },
            start: 2,
            end: 24,
            kind: 139,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do while for (a in b) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 9,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
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

  it('with EmptyStatement', () => {
    t.deepEqual(recovery('do while;;;;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 8,
              end: 8,
              flags: 2
            },
            statement: {
              type: 'EmptyStatement',
              start: 8,
              end: 9,
              kind: 148,
              flags: 0
            },
            start: 2,
            end: 9,
            kind: 139,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 127,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 10,
          end: 11,
          kind: 148,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 11,
          end: 12,
          kind: 148,
          flags: 0
        }
      ],
      text: 'do while;;;;',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
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
      length: 12,
      end: 12
    });
  });

  it('with ASI', () => {
    t.deepEqual(recovery('do while;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 8,
              end: 8,
              flags: 2
            },
            statement: {
              type: 'EmptyStatement',
              start: 8,
              end: 9,
              kind: 148,
              flags: 0
            },
            start: 2,
            end: 9,
            kind: 139,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do while;',
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

  it('do { x = { y: z; } } while)', () => {
    t.deepEqual(recovery('do { x = { y: z; } } while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 18,
            end: 18,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 4,
                    end: 6,
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
                          name: 'y',
                          start: 10,
                          end: 13,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'IdentifierReference',
                          name: 'z',
                          start: 13,
                          end: 15,
                          kind: 13,
                          flags: 0
                        },
                        start: 10,
                        end: 15,
                        kind: 227,
                        flags: 0
                      }
                    ],
                    start: 8,
                    end: 15,
                    kind: 179,
                    flags: 0
                  },
                  start: 4,
                  end: 15,
                  kind: 152,
                  flags: 0
                },
                start: 4,
                end: 16,
                kind: 122,
                flags: 0
              }
            ],
            start: 2,
            end: 18,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 18,
          kind: 127,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 27,
            end: 27,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 27,
              end: 27,
              kind: 13,
              flags: 2
            },
            start: 27,
            end: 27,
            kind: 122,
            flags: 0
          },
          start: 20,
          end: 27,
          kind: 139,
          flags: 0
        }
      ],
      text: 'do { x = { y: z; } } while)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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

  it('Unclosed block statement4235', () => {
    t.deepEqual(recovery('do { foo("bar") = baz } while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 30,
            end: 30,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'CallExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'foo',
                      start: 4,
                      end: 8,
                      kind: 13,
                      flags: 0
                    },
                    arguments: [
                      {
                        type: 'StringLiteral',
                        value: 'bar',
                        start: 9,
                        end: 14,
                        kind: 12,
                        flags: 0
                      }
                    ],
                    start: 4,
                    end: 15,
                    kind: 156,
                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'baz',
                    start: 17,
                    end: 21,
                    kind: 13,
                    flags: 0
                  },
                  start: 4,
                  end: 21,
                  kind: 152,
                  flags: 0
                },
                start: 4,
                end: 21,
                kind: 122,
                flags: 0
              }
            ],
            start: 2,
            end: 23,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 30,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do { foo("bar") = baz } while)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 29,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 30,
      end: 30
    });
  });

  it('do { function x({[]})  } (while)', () => {
    t.deepEqual(recovery('do { function x({[]})  } (while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 26,
            end: 26,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 13,
                  end: 15,
                  kind: 168,
                  flags: 0
                },
                generator: false,
                async: false,
                params: [
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'ComputedPropertyName',
                            expression: {
                              type: 'IdentifierReference',
                              name: '',
                              start: 19,
                              end: 19,
                              kind: 13,
                              flags: 2
                            },
                            start: 17,
                            end: 19,
                            kind: 171,
                            flags: 0
                          },
                          value: {
                            type: 'BindingIdentifier',
                            name: '',
                            start: 19,
                            end: 20,
                            kind: 168,
                            flags: 0
                          },
                          start: 17,
                          end: 20,
                          kind: 227,
                          flags: 0
                        }
                      ],
                      start: 16,
                      end: 20,
                      kind: 169,
                      flags: 0
                    },
                    right: null,
                    start: 16,
                    end: 20,
                    kind: 172,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 21,
                  end: 21,
                  kind: 184,
                  flags: 0
                },
                start: 4,
                end: 21,
                kind: 186,
                flags: 0
              }
            ],
            start: 2,
            end: 24,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 127,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 32,
            end: 32,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 32,
              end: 32,
              kind: 13,
              flags: 2
            },
            start: 32,
            end: 32,
            kind: 122,
            flags: 0
          },
          start: 26,
          end: 32,
          kind: 139,
          flags: 0
        }
      ],
      text: 'do { function x({[]})  } (while)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
          code: 5,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 26,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 31,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 32,
      end: 32
    });
  });

  it('Unclosed block statement4325', () => {
    t.deepEqual(recovery('do(async while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 15,
            end: 15,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: 'async',
                start: 3,
                end: 8,
                flags: 0
              },
              start: 2,
              end: 8,
              kind: 189,
              flags: 0
            },
            start: 2,
            end: 8,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do(async while)',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('do(yield function ( {x } while)', () => {
    t.deepEqual(recovery('do(yield function ( {x } while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'FunctionExpression',
            name: null,
            generator: false,
            async: false,
            params: [
              {
                type: 'BindingElement',
                left: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x',
                      start: 21,
                      end: 22,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  start: 19,
                  end: 24,
                  kind: 169,
                  flags: 0
                },
                right: null,
                start: 19,
                end: 24,
                kind: 172,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 24,
              end: 24,
              kind: 184,
              flags: 0
            },
            start: 8,
            end: 24,
            kind: 185,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 3,
                end: 8,
                kind: 13,
                flags: 0
              },
              start: 2,
              end: 8,
              kind: 189,
              flags: 0
            },
            start: 2,
            end: 8,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 127,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 31,
            end: 31,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 31,
              end: 31,
              kind: 13,
              flags: 2
            },
            start: 31,
            end: 31,
            kind: 122,
            flags: 0
          },
          start: 24,
          end: 31,
          kind: 139,
          flags: 0
        }
      ],
      text: 'do(yield function ( {x } while)',
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
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 25,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('Unclosed block statement453897', () => {
    t.deepEqual(recovery('do { class { function x() {}   } while /a/ - 2 ** a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 51,
            end: 51,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ClassDeclaration',
                name: null,
                heritage: null,
                elements: [
                  {
                    type: 'ClassElement',
                    static: false,
                    method: {
                      type: 'MethodDefinition',
                      async: false,
                      generator: false,
                      propertySetParameterList: [],
                      uniqueFormalParameters: [],
                      name: {
                        type: 'IdentifierName',
                        name: 'x',
                        start: 21,
                        end: 23,
                        kind: 13,
                        flags: 0
                      },
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [],
                        start: 25,
                        end: 28,
                        kind: 184,
                        flags: 0
                      },
                      start: 23,
                      end: 28,
                      kind: 182,
                      flags: 0
                    },
                    start: 12,
                    end: 28,
                    kind: 151,
                    flags: 0
                  }
                ],
                start: 4,
                end: 32,
                kind: 150,
                flags: 0
              },
              {
                type: 'WhileStatement',
                expression: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'RegularExpressionLiteral',
                    pattern: 'a',
                    flag: '',
                    start: 38,
                    end: 42,
                    kind: 15,
                    flags: 0
                  },
                  operator: '-',
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 44,
                      end: 46,
                      kind: 10,
                      flags: 0
                    },
                    operator: '**',
                    right: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 49,
                      end: 51,
                      kind: 13,
                      flags: 0
                    },
                    start: 46,
                    end: 51,
                    kind: 155,
                    flags: 0
                  },
                  start: 38,
                  end: 51,
                  kind: 155,
                  flags: 0
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 51,
                    end: 51,
                    kind: 13,
                    flags: 2
                  },
                  start: 51,
                  end: 51,
                  kind: 122,
                  flags: 0
                },
                start: 32,
                end: 51,
                kind: 139,
                flags: 0
              }
            ],
            start: 2,
            end: 51,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 51,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do { class { function x() {}   } while /a/ - 2 ** a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 11,
          length: 1
        },
        {
          code: 39,
          kind: 2,
          length: 1,
          message: 'Unexpected token. A accessor was expected',
          source: 2,
          start: 22
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 39,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 50,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 51,
      end: 51
    });
  });
  /*
  it('Unclosed block statement3223', () => {
    t.deepEqual(recovery('do { class { function () {}   } while /a/ - 2 ** a', 'recovery.js'),{
      "kind": 209,
      "directives": [],
      "statements": [
          {
              "type": "DoWhileStatement",
              "expression": {
                  "type": "IdentifierReference",
                  "name": "",
                  "start": 50,
                  "end": 50,
                  "kind": 13,
                  "flags": 2
              },
              "statement": {
                  "type": "BlockStatement",
                  "statements": [
                      {
                          "type": "ClassDeclaration",
                          "name": null,
                          "heritage": null,
                          "elements": [
                              {
                                  "type": "ClassElement",
                                  "static": false,
                                  "method": {
                                      "type": "MethodDefinition",
                                      "async": false,
                                      "generator": false,
                                      "propertySetParameterList": [],
                                      "uniqueFormalParameters": [],
                                      "name": {
                                          "type": "IdentifierName",
                                          "name": "function",
                                          "start": 12,
                                          "end": 21,
                                          "kind": 13,
                                          "flags": 0
                                      },
                                      "contents": {
                                          "type": "FunctionBody",
                                          "directives": [],
                                          "statements": [],
                                          "start": 24,
                                          "end": 27,
                                          "kind": 184,
                                          "flags": 0
                                      },
                                      "start": 21,
                                      "end": 27,
                                      "kind": 182,
                                      "flags": 0
                                  },
                                  "start": 12,
                                  "end": 27,
                                  "kind": 151,
                                  "flags": 0
                              }
                          ],
                          "start": 4,
                          "end": 31,
                          "kind": 150,
                          "flags": 0
                      },
                      {
                          "type": "WhileStatement",
                          "expression": {
                              "type": "IdentifierReference",
                              "name": "",
                              "start": 39,
                              "end": 39,
                              "kind": 13,
                              "flags": 2
                          },
                          "statement": {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "BinaryExpression",
                                  "left": {
                                      "type": "IdentifierReference",
                                      "name": "a",
                                      "start": 39,
                                      "end": 40,
                                      "kind": 13,
                                      "flags": 0
                                  },
                                  "operator": "/",
                                  "right": {
                                      "type": "UnaryExpression",
                                      "operator": "-",
                                      "operand": {
                                          "type": "BinaryExpression",
                                          "left": {
                                              "type": "NumericLiteral",
                                              "value": 2,
                                              "start": 43,
                                              "end": 45,
                                              "kind": 10,
                                              "flags": 0
                                          },
                                          "operator": "**",
                                          "right": {
                                              "type": "IdentifierReference",
                                              "name": "a",
                                              "start": 48,
                                              "end": 50,
                                              "kind": 13,
                                              "flags": 0
                                          },
                                          "start": 43,
                                          "end": 50,
                                          "kind": 155,
                                          "flags": 0
                                      },
                                      "start": 41,
                                      "end": 50,
                                      "kind": 160,
                                      "flags": 0
                                  },
                                  "start": 39,
                                  "end": 50,
                                  "kind": 155,
                                  "flags": 0
                              },
                              "start": 39,
                              "end": 50,
                              "kind": 122,
                              "flags": 0
                          },
                          "start": 31,
                          "end": 50,
                          "kind": 139,
                          "flags": 0
                      }
                  ],
                  "start": 2,
                  "end": 50,
                  "kind": 123,
                  "flags": 0
              },
              "start": 0,
              "end": 50,
              "kind": 127,
              "flags": 0
          }
      ],
      "text": "do { class { function () {}   } while /a/ - 2 ** a",
      "fileName": "recovery.js",
      "context": 0,
      "mutualFlags": 0,
      "diagnostics": [
          {
              "kind": 3,
              "source": 2,
              "message": "Class declaration require a name in this context",
              "code": 11,
              "start": 11,
              "length": 1
          },
          {
              "kind": 2,
              "source": 2,
              "message": "`(` expected",
              "code": 5,
              "start": 38,
              "length": 1
          },
          {
              "kind": 2,
              "source": 2,
              "message": "Expression expected",
              "code": 7,
              "start": 39,
              "length": 1
          },
          {
              "kind": 2,
              "source": 2,
              "message": "`}` expected",
              "code": 5,
              "start": 49,
              "length": 1
          }
      ],
      "detached": false,
      "incremental": false,
      "parent": null,
      "children": [],
      "EOF": {
          "type": "CST",
          "kind": 16384,
          "start": 50,
          "end": 50
      },
      "start": 0,
      "length": 50,
      "end": 50
  });
  });
*/
  it('do {123 - 3 %&/ 33 / (async break continue bad input a b c 1 2 3)}{}{}{{}{async: await}(while)', () => {
    t.deepEqual(
      recovery(
        'do {123 - 3 %&/ 33 / (async break continue bad input a b c 1 2 3)}{}{}{{}{async: await}(while)',
        'recovery.js'
      ),
      {
        kind: 209,
        directives: [],
        leafs: [
          {
            type: 'DoWhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 65,
              end: 65,
              kind: 13,
              flags: 2
            },
            statement: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'NumericLiteral',
                        value: 123,
                        start: 4,
                        end: 7,
                        kind: 10,
                        flags: 0
                      },
                      operator: '-',
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'NumericLiteral',
                          value: 3,
                          start: 9,
                          end: 11,
                          kind: 10,
                          flags: 0
                        },
                        operator: '%',
                        right: {
                          type: 'IdentifierReference',
                          name: '',
                          start: 13,
                          end: 13,
                          kind: 13,
                          flags: 2
                        },
                        start: 11,
                        end: 13,
                        kind: 155,
                        flags: 0
                      },
                      start: 4,
                      end: 13,
                      kind: 155,
                      flags: 0
                    },
                    operator: '&',
                    right: {
                      type: 'CallExpression',
                      expression: {
                        type: 'RegularExpressionLiteral',
                        pattern: ' 33 ',
                        flag: '',
                        start: 14,
                        end: 20,
                        kind: 15,
                        flags: 0
                      },
                      arguments: [
                        {
                          type: 'IdentifierReference',
                          name: 'async',
                          start: 22,
                          end: 27,
                          kind: 13,
                          flags: 0
                        }
                      ],
                      start: 14,
                      end: 27,
                      kind: 156,
                      flags: 0
                    },
                    start: 4,
                    end: 27,
                    kind: 155,
                    flags: 0
                  },
                  start: 4,
                  end: 27,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'BreakStatement',
                  label: null,
                  start: 27,
                  end: 33,
                  kind: 124,
                  flags: 0
                },
                {
                  type: 'ContinueStatement',
                  label: {
                    type: 'IdentifierReference',
                    name: 'bad',
                    start: 42,
                    end: 46,
                    kind: 13,
                    flags: 0
                  },
                  start: 33,
                  end: 46,
                  kind: 125,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'input',
                    start: 46,
                    end: 52,
                    kind: 13,
                    flags: 0
                  },
                  start: 46,
                  end: 52,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 52,
                    end: 54,
                    kind: 13,
                    flags: 0
                  },
                  start: 52,
                  end: 54,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 54,
                    end: 56,
                    kind: 13,
                    flags: 0
                  },
                  start: 54,
                  end: 56,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 56,
                    end: 58,
                    kind: 13,
                    flags: 0
                  },
                  start: 56,
                  end: 58,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 58,
                    end: 60,
                    kind: 10,
                    flags: 0
                  },
                  start: 58,
                  end: 60,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NumericLiteral',
                    value: 2,
                    start: 60,
                    end: 62,
                    kind: 10,
                    flags: 0
                  },
                  start: 60,
                  end: 62,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NumericLiteral',
                    value: 3,
                    start: 62,
                    end: 64,
                    kind: 10,
                    flags: 0
                  },
                  start: 62,
                  end: 64,
                  kind: 122,
                  flags: 0
                }
              ],
              start: 2,
              end: 64,
              kind: 123,
              flags: 0
            },
            start: 0,
            end: 65,
            kind: 127,
            flags: 0
          },
          {
            type: 'BlockStatement',
            leafs: [],
            start: 66,
            end: 68,
            kind: 123,
            flags: 0
          },
          {
            type: 'BlockStatement',
            leafs: [],
            start: 68,
            end: 70,
            kind: 123,
            flags: 0
          },
          {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'BlockStatement',
                leafs: [],
                start: 71,
                end: 73,
                kind: 123,
                flags: 0
              },
              {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'LabelledStatement',
                      label: {
                        type: 'LabelIdentifier',
                        name: 'async',
                        start: 74,
                        end: 80,
                        kind: 13,
                        flags: 0
                      },
                      labelledItem: {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'IdentifierReference',
                          name: 'await',
                          start: 80,
                          end: 86,
                          kind: 13,
                          flags: 0
                        },
                        start: 80,
                        end: 86,
                        kind: 122,
                        flags: 0
                      },
                      start: 74,
                      end: 86,
                      kind: 134,
                      flags: 0
                    },
                    start: 74,
                    end: 86,
                    kind: 122,
                    flags: 0
                  }
                ],
                start: 73,
                end: 87,
                kind: 123,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 88,
                    end: 88,
                    kind: 13,
                    flags: 2
                  },
                  start: 87,
                  end: 88,
                  kind: 189,
                  flags: 0
                },
                start: 87,
                end: 88,
                kind: 122,
                flags: 0
              },
              {
                type: 'WhileStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 94,
                  end: 94,
                  kind: 13,
                  flags: 2
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 94,
                    end: 94,
                    kind: 13,
                    flags: 2
                  },
                  start: 94,
                  end: 94,
                  kind: 122,
                  flags: 0
                },
                start: 88,
                end: 94,
                kind: 139,
                flags: 0
              }
            ],
            start: 70,
            end: 94,
            kind: 123,
            flags: 0
          }
        ],
        text: 'do {123 - 3 %&/ 33 / (async break continue bad input a b c 1 2 3)}{}{}{{}{async: await}(while)',
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
          },
          {
            kind: 2,
            source: 2,
            message: '`,` expected',
            code: 5,
            start: 28,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 34,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 47,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 53,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 55,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 57,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 59,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 61,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 63,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 64,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 65,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 88,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 93,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 94,
        end: 94
      }
    );
  });

  it('Unclosed block statementd333', () => {
    t.deepEqual(recovery('do{{{}}[][[[]]]}(while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 17,
            end: 17,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'BlockStatement',
                    leafs: [],
                    start: 4,
                    end: 6,
                    kind: 123,
                    flags: 0
                  }
                ],
                start: 3,
                end: 7,
                kind: 123,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'MemberExpression',
                  member: {
                    type: 'ArrayLiteral',
                    kind: 178,
                    elements: [],
                    flags: 0,
                    start: 7,
                    end: 9
                  },
                  expression: {
                    type: 'ArrayLiteral',
                    kind: 178,
                    elements: [
                      {
                        type: 'ArrayLiteral',
                        kind: 178,
                        elements: [],
                        flags: 0,
                        start: 11,
                        end: 13
                      }
                    ],
                    flags: 0,
                    start: 10,
                    end: 14
                  },
                  computed: true,
                  start: 7,
                  end: 15,
                  kind: 154,
                  flags: 0
                },
                start: 7,
                end: 15,
                kind: 122,
                flags: 0
              }
            ],
            start: 2,
            end: 16,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 127,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 23,
            end: 23,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 23,
              end: 23,
              flags: 2
            },
            start: 23,
            end: 23,
            kind: 122,
            flags: 0
          },
          start: 17,
          end: 23,
          kind: 139,
          flags: 0
        }
      ],
      text: 'do{{{}}[][[[]]]}(while)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
          code: 5,
          start: 16,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('do {} while sleeeeeeping on the keyboard,,,,,,,,,,,,,,,,,(while)', () => {
    t.deepEqual(recovery('do {} while sleeeeeeping on the keyboard,,,,,,,,,,,,,,,,,(while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'sleeeeeeping',
            start: 11,
            end: 24,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 2,
            end: 5,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 127,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'on',
            start: 24,
            end: 27,
            kind: 13,
            flags: 0
          },
          start: 24,
          end: 27,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'the',
            start: 27,
            end: 31,
            kind: 13,
            flags: 0
          },
          start: 27,
          end: 31,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: 'keyboard',
                start: 31,
                end: 40,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 42,
                end: 42,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 44,
                end: 44,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 46,
                end: 46,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 48,
                end: 48,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 50,
                end: 50,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 52,
                end: 52,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 54,
                end: 54,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 56,
                end: 56,
                kind: 13,
                flags: 2
              },
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 58,
                  end: 58,
                  kind: 13,
                  flags: 2
                },
                start: 57,
                end: 58,
                kind: 189,
                flags: 0
              }
            ],
            start: 31,
            end: 58,
            kind: 147,
            flags: 0
          },
          start: 31,
          end: 58,
          kind: 122,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 64,
            end: 64,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 64,
              end: 64,
              kind: 13,
              flags: 2
            },
            start: 64,
            end: 64,
            kind: 122,
            flags: 0
          },
          start: 58,
          end: 64,
          kind: 139,
          flags: 0
        }
      ],
      text: 'do {} while sleeeeeeping on the keyboard,,,,,,,,,,,,,,,,,(while)',
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
          length: 12
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 25,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 28,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 32,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 42,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 44,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 46,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 48,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 50,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 52,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 54,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 56,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 58,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 63,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 64,
      end: 64
    });
  });

  it('Unclosed block statement4534325', () => {
    t.deepEqual(recovery('do while!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          statement: {
            type: 'WhileStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 9,
                end: 9,
                flags: 2
              },
              start: 8,
              end: 9,
              kind: 160,
              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 9,
                end: 9,
                flags: 2
              },
              start: 9,
              end: 9,
              kind: 122,
              flags: 0
            },
            start: 2,
            end: 9,
            kind: 139,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do while!',
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

  it('Unclosed block statement24334', () => {
    t.deepEqual(recovery('do(while)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 9,
            end: 9,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 3,
                end: 3,
                flags: 2
              },
              start: 2,
              end: 3,
              kind: 189,
              flags: 0
            },
            start: 2,
            end: 3,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 127,
          flags: 0
        }
      ],
      text: 'do(while)',
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
          length: 5
        },
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
});
