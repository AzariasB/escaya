import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Parenthesized', () => {
  it('(', () => {
    t.deepEqual(recovery('(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 1,
              end: 1,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 1,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        }
      ],
      text: '(',
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

  it('(...', () => {
    t.deepEqual(recovery('(...', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingRestElement',
                argument: {
                  type: 'BindingIdentifier',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 168,
                  flags: 0
                },
                start: 1,
                end: 4,
                kind: 175,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,
                kind: 13,
                flags: 2
              },
              start: 4,
              end: 4,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 4,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '(...',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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

  it('(a', () => {
    t.deepEqual(recovery('(a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2,
              kind: 13,
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
      text: '(a',
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

  it('(!', () => {
    t.deepEqual(recovery('(!', 'recovery.js'), {
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
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 2,
              kind: 160,
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
      text: '(!',
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

  it('(!=', () => {
    t.deepEqual(recovery('(!=', 'recovery.js'), {
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
                type: 'IdentifierReference',
                name: '',
                start: 1,
                end: 1,
                kind: 13,
                flags: 2
              },
              operator: '!=',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 3,
              kind: 155,
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
      text: '(!=',
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

  it('(!=,,,,,,', () => {
    t.deepEqual(recovery('(!=,,,,,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 1,
                    end: 1,
                    kind: 13,
                    flags: 2
                  },
                  operator: '!=',
                  right: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 4,
                    end: 4,
                    kind: 13,
                    flags: 2
                  },
                  start: 1,
                  end: 4,
                  kind: 155,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 6,
                  end: 6,
                  kind: 13,
                  flags: 2
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
              start: 0,
              end: 9,
              kind: 147,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '(!=,,,,,,',
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

  it('(((((((((((((((((', () => {
    t.deepEqual(recovery('(((((((((((((((((', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'ParenthesizedExpression',
                      expression: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'ParenthesizedExpression',
                          expression: {
                            type: 'ParenthesizedExpression',
                            expression: {
                              type: 'ParenthesizedExpression',
                              expression: {
                                type: 'ParenthesizedExpression',
                                expression: {
                                  type: 'ParenthesizedExpression',
                                  expression: {
                                    type: 'ParenthesizedExpression',
                                    expression: {
                                      type: 'ParenthesizedExpression',
                                      expression: {
                                        type: 'ParenthesizedExpression',
                                        expression: {
                                          type: 'ParenthesizedExpression',
                                          expression: {
                                            type: 'ParenthesizedExpression',
                                            expression: {
                                              type: 'IdentifierReference',
                                              name: '',
                                              start: 17,
                                              end: 17,
                                              kind: 13,
                                              flags: 2
                                            },
                                            start: 16,
                                            end: 17,
                                            kind: 189,
                                            flags: 0
                                          },
                                          start: 15,
                                          end: 17,
                                          kind: 189,
                                          flags: 0
                                        },
                                        start: 14,
                                        end: 17,
                                        kind: 189,
                                        flags: 0
                                      },
                                      start: 13,
                                      end: 17,
                                      kind: 189,
                                      flags: 0
                                    },
                                    start: 12,
                                    end: 17,
                                    kind: 189,
                                    flags: 0
                                  },
                                  start: 11,
                                  end: 17,
                                  kind: 189,
                                  flags: 0
                                },
                                start: 10,
                                end: 17,
                                kind: 189,
                                flags: 0
                              },
                              start: 9,
                              end: 17,
                              kind: 189,
                              flags: 0
                            },
                            start: 8,
                            end: 17,
                            kind: 189,
                            flags: 0
                          },
                          start: 7,
                          end: 17,
                          kind: 189,
                          flags: 0
                        },
                        start: 6,
                        end: 17,
                        kind: 189,
                        flags: 0
                      },
                      start: 5,
                      end: 17,
                      kind: 189,
                      flags: 0
                    },
                    start: 4,
                    end: 17,
                    kind: 189,
                    flags: 0
                  },
                  start: 3,
                  end: 17,
                  kind: 189,
                  flags: 0
                },
                start: 2,
                end: 17,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 17,
              kind: 189,
              flags: 0
            },
            start: 0,
            end: 17,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '(((((((((((((((((',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('(with babel', () => {
    t.deepEqual(recovery('(with babel', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 1,
              end: 1,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 1,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        },
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'babel',
            start: 5,
            end: 11,
            kind: 13,
            flags: 0
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
          start: 1,
          end: 11,
          kind: 128,
          flags: 0
        }
      ],
      text: '(with babel',
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
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 5
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

  it('!(', () => {
    t.deepEqual(recovery('!(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 2,
                end: 2,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 2,
              kind: 189,
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
        }
      ],
      text: '!(',
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

  it('([,[', () => {
    t.deepEqual(recovery('([,[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'Elison',
                  start: 3,
                  end: 3,
                  kind: 176,
                  flags: 0
                },
                {
                  type: 'ArrayLiteral',
                  kind: 178,
                  elements: [],
                  start: 3,
                  end: 4,
                  flags: 0
                }
              ],
              start: 1,
              end: 4,
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
      text: '([,[',
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

  it('([...b', () => {
    t.deepEqual(recovery('([...b', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 5,
                    end: 6,
                    kind: 13,
                    flags: 0
                  },
                  start: 2,
                  end: 6,
                  kind: 177,
                  flags: 0
                }
              ],
              start: 1,
              end: 6,
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
      text: '([...b',
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

  it('([...b!', () => {
    t.deepEqual(recovery('([...b!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 5,
                    end: 6,
                    kind: 13,
                    flags: 0
                  },
                  start: 2,
                  end: 6,
                  kind: 177,
                  flags: 0
                },
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
              start: 1,
              end: 7,
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
      text: '([...b!',
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

  it('(a b c [] {} ...', () => {
    t.deepEqual(recovery('(a b c [] {} ...', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2,
              kind: 13,
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
            type: 'IdentifierReference',
            name: 'b',
            start: 2,
            end: 4,
            kind: 13,
            flags: 0
          },
          start: 2,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'c',
              start: 4,
              end: 6,
              kind: 13,
              flags: 0
            },
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            computed: true,
            start: 4,
            end: 9,
            kind: 154,
            flags: 0
          },
          start: 4,
          end: 9,
          kind: 122,
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
      text: '(a b c [] {} ...',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 3,
          length: 1
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
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 13,
          length: 3
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

  it('(while then I switch from Babel', () => {
    t.deepEqual(recovery('(while then I switch from Babel', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 1,
              end: 1,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 1,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'then',
            start: 6,
            end: 11,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 11,
              end: 13,
              kind: 13,
              flags: 0
            },
            start: 11,
            end: 13,
            kind: 122,
            flags: 0
          },
          start: 1,
          end: 13,
          kind: 139,
          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'from',
            start: 20,
            end: 25,
            kind: 13,
            flags: 0
          },
          clauses: [],
          start: 13,
          end: 25,
          kind: 136,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'Babel',
            start: 25,
            end: 31,
            kind: 13,
            flags: 0
          },
          start: 25,
          end: 31,
          kind: 122,
          flags: 0
        }
      ],
      text: '(while then I switch from Babel',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 21,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 26,
          length: 5
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
});
