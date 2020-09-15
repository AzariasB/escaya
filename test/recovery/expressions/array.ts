import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Array', () => {
  it('[,', () => {
    t.deepEqual(recovery('[,', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'Elison',
                start: 2,
                end: 2,
                kind: 176,
                flags: 0
              }
            ],
            start: 0,
            end: 2,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '[,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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

  it('[/a', () => {
    t.deepEqual(recovery('[/a', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'RegularExpressionLiteral',
                pattern: '',
                flag: '',
                start: 1,
                end: 3,
                kind: 15,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '[/a',
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

  it('[a[5', () => {
    t.deepEqual(recovery('[a[5', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
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
                  type: 'NumericLiteral',

                  value: 5,
                  start: 3,
                  end: 4,
                  kind: 10,
                  flags: 0
                },
                computed: true,
                start: 1,
                end: 4,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 4,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a[5',
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

  it('[..., ]', () => {
    t.deepEqual(recovery('[..., ]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 13,
                  flags: 2
                },
                start: 1,
                end: 4,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 7,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '[..., ]',
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
      length: 7,
      end: 7
    });
  });

  it('[...) => {', () => {
    t.deepEqual(recovery('[...) => {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 13,
                  flags: 2
                },
                start: 1,
                end: 4,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 4,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 4,
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
      text: '[...) => {',
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
          message: 'Statement expected',
          code: 8,
          start: 6,
          length: 2
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

  it('[[2=x]', () => {
    t.deepEqual(recovery('[[2=x]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'ArrayLiteral',
                elements: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'NumericLiteral',

                      value: 2,
                      start: 2,
                      end: 3,
                      kind: 10,
                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 4,
                      end: 5,
                      kind: 13,
                      flags: 0
                    },
                    start: 2,
                    end: 5,
                    kind: 152,
                    flags: 0
                  }
                ],
                start: 1,
                end: 6,
                kind: 178,
                flags: 0
              }
            ],
            start: 0,
            end: 6,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '[[2=x]',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('[[(a)], ((((((([b])', () => {
    t.deepEqual(recovery('[[(a)], ((((((([b])', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'ArrayLiteral',
                elements: [
                  {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 3,
                      end: 4,
                      kind: 13,
                      flags: 0
                    },
                    start: 2,
                    end: 5,
                    kind: 189,
                    flags: 0
                  }
                ],
                start: 1,
                end: 6,
                kind: 178,
                flags: 0
              },
              {
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
                              type: 'ArrayLiteral',
                              elements: [
                                {
                                  type: 'IdentifierReference',
                                  name: 'b',
                                  start: 16,
                                  end: 17,
                                  kind: 13,
                                  flags: 0
                                }
                              ],
                              start: 15,
                              end: 18,
                              kind: 178,
                              flags: 0
                            },
                            start: 14,
                            end: 19,
                            kind: 189,
                            flags: 0
                          },
                          start: 13,
                          end: 19,
                          kind: 189,
                          flags: 0
                        },
                        start: 12,
                        end: 19,
                        kind: 189,
                        flags: 0
                      },
                      start: 11,
                      end: 19,
                      kind: 189,
                      flags: 0
                    },
                    start: 10,
                    end: 19,
                    kind: 189,
                    flags: 0
                  },
                  start: 9,
                  end: 19,
                  kind: 189,
                  flags: 0
                },
                start: 7,
                end: 19,
                kind: 189,
                flags: 0
              }
            ],
            start: 0,
            end: 19,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: '[[(a)], ((((((([b])',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('[...c = 1] =', () => {
    t.deepEqual(recovery('[...c = 1] =', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentElement',
            left: {
              type: 'ArrayAssignmentPattern',
              elements: [
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'AssignmentElement',
                    left: {
                      type: 'IdentifierReference',
                      name: 'c',
                      start: 4,
                      end: 5,
                      kind: 13,
                      flags: 0
                    },
                    right: {
                      type: 'NumericLiteral',

                      value: 1,
                      start: 7,
                      end: 9,
                      kind: 10,
                      flags: 0
                    },
                    start: 4,
                    end: 9,
                    kind: 152,
                    flags: 0
                  },
                  start: 1,
                  end: 9,
                  kind: 177,
                  flags: 0
                }
              ],
              start: 0,
              end: 10,
              kind: 178,
              flags: 0
            },
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 12,
              end: 12,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 12,
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '[...c = 1] =',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
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

  it('[a, ...', () => {
    t.deepEqual(recovery('[a, ...', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 7,
                  end: 7,
                  kind: 13,
                  flags: 2
                },
                start: 3,
                end: 7,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 7,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a, ...',
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

  it('[delete x.', () => {
    t.deepEqual(recovery('[delete x.', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'UnaryExpression',
                operator: 'delete',
                operand: {
                  type: 'MemberExpression',
                  member: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 7,
                    end: 9,
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
                  computed: false,
                  start: 7,
                  end: 10,
                  kind: 154,
                  flags: 0
                },
                start: 1,
                end: 10,
                kind: 160,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '[delete x.',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('[.../x/ y]', () => {
    t.deepEqual(recovery('[.../x/ y]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'RegularExpressionLiteral',
                  pattern: 'x',
                  flag: '',
                  start: 4,
                  end: 7,
                  kind: 15,
                  flags: 0
                },
                start: 1,
                end: 7,
                kind: 177,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'y',
                start: 7,
                end: 9,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '[.../x/ y]',
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
      length: 10,
      end: 10
    });
  });

  it('[...[x].map(y,', () => {
    t.deepEqual(recovery('[...[x].map(y,', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'CallExpression',
                  expression: {
                    type: 'MemberExpression',
                    member: {
                      type: 'ArrayLiteral',
                      elements: [
                        {
                          type: 'IdentifierReference',
                          name: 'x',
                          start: 5,
                          end: 6,
                          kind: 13,
                          flags: 0
                        }
                      ],
                      start: 4,
                      end: 7,
                      kind: 178,
                      flags: 0
                    },
                    expression: {
                      type: 'IdentifierName',
                      name: 'map',
                      start: 8,
                      end: 11,
                      kind: 13,
                      flags: 0
                    },
                    computed: false,
                    start: 1,
                    end: 11,
                    kind: 154,
                    flags: 0
                  },
                  arguments: [
                    {
                      type: 'IdentifierReference',
                      name: 'y',
                      start: 12,
                      end: 13,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 1,
                  end: 14,
                  kind: 156,
                  flags: 0
                },
                start: 1,
                end: 14,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 14,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '[...[x].map(y,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('[{} = 2/=', () => {
    t.deepEqual(recovery('[{} = 2/=', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'AssignmentElement',
                left: {
                  type: 'ObjectAssignmentPattern',
                  properties: [],
                  start: 1,
                  end: 3,
                  kind: 179,
                  flags: 0
                },
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'NumericLiteral',

                    value: 2,
                    start: 5,
                    end: 7,
                    kind: 10,
                    flags: 0
                  },
                  operator: '/=',
                  right: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 9,
                    end: 9,
                    kind: 13,
                    flags: 2
                  },
                  start: 5,
                  end: 9,
                  kind: 152,
                  flags: 0
                },
                start: 1,
                end: 9,
                kind: 213,
                flags: 0
              }
            ],
            start: 0,
            end: 9,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '[{} = 2/=',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 7,
          length: 2
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

  it('[50', () => {
    t.deepEqual(recovery('[50', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'NumericLiteral',

                value: 50,
                start: 1,
                end: 3,
                kind: 10,
                flags: 0
              }
            ],
            start: 0,
            end: 3,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '[50',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
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

  it('[', () => {
    t.deepEqual(recovery('[', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [],
            start: 0,
            end: 1,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        }
      ],
      text: '[',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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

  it('[a', () => {
    t.deepEqual(recovery('[a', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 2,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('[a b', () => {
    t.deepEqual(recovery('[a b', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 2,
                end: 4,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 4,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a b',
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

  it('[!(', () => {
    t.deepEqual(recovery('[!(', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'ParenthesizedExpression',
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
                  kind: 189,
                  flags: 0
                },
                start: 1,
                end: 3,
                kind: 160,
                flags: 0
              }
            ],
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
      text: '[!(',
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

  it('[a b () [] {} {} = b(', () => {
    t.deepEqual(recovery('[a b () [] {} {} = b(', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 1,
                end: 2,
                kind: 13,
                flags: 0
              },
              {
                type: 'MemberExpression',
                member: {
                  type: 'CallExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  arguments: [],
                  start: 2,
                  end: 7,
                  kind: 156,
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
                start: 2,
                end: 10,
                kind: 154,
                flags: 0
              },
              {
                type: 'ObjectLiteral',
                properties: [],
                start: 10,
                end: 13,
                kind: 179,
                flags: 0
              },
              {
                type: 'AssignmentElement',
                left: {
                  type: 'ObjectAssignmentPattern',
                  properties: [],
                  start: 13,
                  end: 16,
                  kind: 179,
                  flags: 0
                },
                right: {
                  type: 'CallExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 18,
                    end: 20,
                    kind: 13,
                    flags: 0
                  },
                  arguments: [],
                  start: 18,
                  end: 21,
                  kind: 156,
                  flags: 0
                },
                start: 13,
                end: 21,
                kind: 213,
                flags: 0
              }
            ],
            start: 0,
            end: 21,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 122,
          flags: 0
        }
      ],
      text: '[a b () [] {} {} = b(',
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
          message: '`,` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('[,,(a]', () => {
    t.deepEqual(recovery('[,,(a]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'Elison',
                start: 2,
                end: 2,
                kind: 176,
                flags: 0
              },
              {
                type: 'Elison',
                start: 3,
                end: 3,
                kind: 176,
                flags: 0
              },
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 4,
                  end: 5,
                  kind: 13,
                  flags: 0
                },
                start: 3,
                end: 5,
                kind: 189,
                flags: 0
              }
            ],
            start: 0,
            end: 6,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '[,,(a]',
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

  it('[!,,a]', () => {
    t.deepEqual(recovery('[!,,a]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
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
              {
                type: 'Elison',
                start: 4,
                end: 4,
                kind: 176,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 4,
                end: 5,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 6,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '[!,,a]',
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
      length: 6,
      end: 6
    });
  });

  it('[,,a(])', () => {
    t.deepEqual(recovery('[,,a(])', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'Elison',
                start: 2,
                end: 2,
                kind: 176,
                flags: 0
              },
              {
                type: 'Elison',
                start: 3,
                end: 3,
                kind: 176,
                flags: 0
              },
              {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 3,
                  end: 4,
                  kind: 13,
                  flags: 0
                },
                arguments: [],
                start: 3,
                end: 5,
                kind: 156,
                flags: 0
              }
            ],
            start: 0,
            end: 6,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '[,,a(])',
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

  it('[,/,a]', () => {
    t.deepEqual(recovery('[,/,a]', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 12,
          kind: 2,
          length: 4,
          message: 'Unterminated regular expression',
          source: 0,
          start: 2
        }
      ],
      directives: [],
      end: 6,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 6,
          expression: {
            elements: [
              {
                end: 2,
                flags: 0,
                kind: 176,
                start: 2,
                type: 'Elison'
              },
              {
                end: 6,
                flag: '',
                flags: 0,
                kind: 15,
                pattern: ',a',
                start: 2,
                type: 'RegularExpressionLiteral'
              }
            ],
            end: 6,
            flags: 0,
            kind: 178,
            start: 0,
            type: 'ArrayLiteral'
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
      text: '[,/,a]'
    });
  });

  it(',,a]', () => {
    t.deepEqual(recovery(',,a]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 2,
            end: 3,
            kind: 13,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: ',,a]',
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
          message: 'Statement expected',
          code: 8,
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

  it(',{,a]', () => {
    t.deepEqual(recovery(',{,a]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 1,
          end: 2,
          kind: 123,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 3,
            end: 4,
            kind: 13,
            flags: 0
          },
          start: 3,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: ',{,a]',
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

  it('[,,a]', () => {
    t.deepEqual(recovery('[,,a]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'Elison',
                start: 2,
                end: 2,
                kind: 176,
                flags: 0
              },
              {
                type: 'Elison',
                start: 3,
                end: 3,
                kind: 176,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              }
            ],
            start: 0,
            end: 5,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '[,,a]',
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

  it('[,,a] =', () => {
    t.deepEqual(recovery('[,,a] =', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentElement',
            left: {
              type: 'ArrayAssignmentPattern',
              elements: [
                {
                  type: 'Elison',
                  start: 2,
                  end: 2,
                  kind: 176,
                  flags: 0
                },
                {
                  type: 'Elison',
                  start: 3,
                  end: 3,
                  kind: 176,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 3,
                  end: 4,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 0,
              end: 5,
              kind: 178,
              flags: 0
            },
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
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '[,,a] =',
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

  it('[1...=>(', () => {
    t.deepEqual(recovery('[1...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'MemberExpression',
                member: {
                  type: 'MemberExpression',
                  member: {
                    type: 'FloatingPointLiteral',
                    value: 1,
                    start: 1,
                    end: 3,
                    kind: 10,
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
                  computed: false,
                  start: 1,
                  end: 4,
                  kind: 154,
                  flags: 0
                },
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                },
                computed: false,
                start: 1,
                end: 5,
                kind: 154,
                flags: 0
              }
            ],
            start: 0,
            end: 5,
            kind: 178,
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
          start: 7,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '[1...=>(',
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
          length: 2
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
      webCompat: true,
      end: 8
    });
  });

  it('[[[[]...](', () => {
    t.deepEqual(recovery('[[[[]...](', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'ArrayLiteral',
                kind: 178,
                elements: [
                  {
                    type: 'CallExpression',
                    expression: {
                      type: 'ArrayLiteral',
                      kind: 178,
                      elements: [
                        {
                          type: 'ArrayLiteral',
                          kind: 178,
                          elements: [],
                          start: 3,
                          end: 5,
                          flags: 0
                        },
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'IdentifierReference',
                            name: '',
                            start: 8,
                            end: 8,
                            kind: 13,
                            flags: 2
                          },
                          start: 5,
                          end: 8,
                          kind: 177,
                          flags: 0
                        }
                      ],
                      start: 2,
                      end: 9,
                      flags: 0
                    },
                    arguments: [],
                    start: 2,
                    end: 10,
                    kind: 156,
                    flags: 0
                  }
                ],
                start: 1,
                end: 10,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '[[[[]...](',
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
          length: 3
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
          message: '`)` expected',
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

  it('...](', () => {
    t.deepEqual(recovery('...](', 'recovery.js'), {
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
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 4,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 4,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '...](',
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
          length: 3
        },
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

  it(']...](', () => {
    t.deepEqual(recovery(']...](', 'recovery.js'), {
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
          start: 5,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: ']...](',
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
          message: 'Statement expected',
          code: 8,
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

  it('[...](', () => {
    t.deepEqual(recovery('[...](', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 4,
                    end: 4,
                    kind: 13,
                    flags: 2
                  },
                  start: 1,
                  end: 4,
                  kind: 177,
                  flags: 0
                }
              ],
              start: 0,
              end: 5,
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
      text: '[...](',
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

  it('[...]', () => {
    t.deepEqual(recovery('[...]', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 4,
                  end: 4,
                  kind: 13,
                  flags: 2
                },
                start: 1,
                end: 4,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 5,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '[...]',
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

  it('[...](', () => {
    t.deepEqual(recovery('[...](', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 4,
                    end: 4,
                    kind: 13,
                    flags: 2
                  },
                  start: 1,
                  end: 4,
                  kind: 177,
                  flags: 0
                }
              ],
              start: 0,
              end: 5,
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
      text: '[...](',
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
});
