import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Misc - Loc', () => {
  it('a,b,c(a=b,c)', () => {
    t.deepStrictEqual(parseScript('a,b,c(a=b,c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1
              },
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 2,
                end: 3
              },
              {
                type: 'CallExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 4,
                  end: 5
                },
                arguments: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 6,
                      end: 7
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 8,
                      end: 9
                    },
                    start: 6,
                    end: 9
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 10,
                    end: 11
                  }
                ],
                start: 4,
                end: 12
              }
            ],
            start: 0,
            end: 12
          },
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('({a:b})', () => {
    t.deepStrictEqual(parseScript('({a:b})', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
                    end: 3
                  },
                  value: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 5
                  },
                  start: 2,
                  end: 5
                }
              ],
              start: 1,
              end: 6
            },
            start: 0,
            end: 7
          },
          start: 0,
          end: 7
        }
      ],
      start: 0,
      end: 7
    });
  });

  it('a ** b - d', () => {
    t.deepStrictEqual(parseScript('a ** b - d', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1
              },
              operator: '**',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: '-',
            right: {
              type: 'IdentifierReference',
              name: 'd',
              start: 9,
              end: 10
            },
            start: 0,
            end: 10
          },
          start: 0,
          end: 10
        }
      ],
      start: 0,
      end: 10
    });
  });

  it('[50..foo] = x', () => {
    t.deepStrictEqual(parseScript('[50..foo] = x', { loc: true }), {
      type: 'Script',
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
                  type: 'MemberExpression',
                  member: {
                    type: 'FloatingPointLiteral',
                    value: 50,
                    start: 1,
                    end: 4
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'foo',
                    start: 5,
                    end: 8
                  },
                  computed: false,
                  start: 1,
                  end: 8
                }
              ],
              start: 0,
              end: 9
            },
            right: {
              type: 'IdentifierReference',
              name: 'x',
              start: 12,
              end: 13
            },
            start: 0,
            end: 13
          },
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });

  it('a={"b":c=d}', () => {
    t.deepStrictEqual(parseScript('a={"b":c=d}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '=',
            right: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'PropertyName',
                  key: {
                    type: 'StringLiteral',
                    value: 'b',
                    start: 3,
                    end: 6
                  },
                  value: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'c',
                      start: 7,
                      end: 8
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'd',
                      start: 9,
                      end: 10
                    },
                    start: 7,
                    end: 10
                  },
                  start: 3,
                  end: 10
                }
              ],
              start: 2,
              end: 11
            },
            start: 0,
            end: 11
          },
          start: 0,
          end: 11
        }
      ],
      start: 0,
      end: 11
    });
  });

  it('1 -2 / 4', () => {
    t.deepStrictEqual(parseScript('1 -2 / 4', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
              end: 1
            },
            operator: '-',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'NumericLiteral',
                value: 2,
                start: 3,
                end: 4
              },
              operator: '/',
              right: {
                type: 'NumericLiteral',
                value: 4,
                start: 7,
                end: 8
              },
              start: 5,
              end: 8
            },
            start: 0,
            end: 8
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });

  it('x = {y}', () => {
    t.deepStrictEqual(parseScript('x = {y}', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
              end: 1
            },
            operator: '=',
            right: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 5,
                  end: 6
                }
              ],
              start: 4,
              end: 7
            },
            start: 0,
            end: 7
          },
          start: 0,
          end: 7
        }
      ],
      start: 0,
      end: 7
    });
  });

  it('0, [ x = y ] = [];', () => {
    t.deepStrictEqual(parseScript('0, [ x = y ] = [];', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'NumericLiteral',
                value: 0,
                start: 0,
                end: 1
              },
              {
                type: 'AssignmentElement',
                left: {
                  type: 'ArrayAssignmentPattern',
                  elements: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 5,
                        end: 6
                      },
                      right: {
                        type: 'IdentifierReference',
                        name: 'y',
                        start: 9,
                        end: 10
                      },
                      start: 5,
                      end: 10
                    }
                  ],
                  start: 3,
                  end: 12
                },
                right: {
                  type: 'ArrayLiteral',
                  elements: [],
                  start: 15,
                  end: 17
                },
                start: 3,
                end: 17
              }
            ],
            start: 0,
            end: 17
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('of = 42', () => {
    t.deepStrictEqual(parseScript('of = 42', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'of',
              start: 0,
              end: 2
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 42,
              start: 5,
              end: 7
            },
            start: 0,
            end: 7
          },
          start: 0,
          end: 7
        }
      ],
      start: 0,
      end: 7
    });
  });

  it('(2[x,x],x)>x', () => {
    t.deepStrictEqual(parseScript('(2[x,x],x)>x', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'CommaOperator',
                expressions: [
                  {
                    type: 'MemberExpression',
                    member: {
                      type: 'NumericLiteral',
                      value: 2,
                      start: 1,
                      end: 2
                    },
                    expression: {
                      type: 'CommaOperator',
                      expressions: [
                        {
                          type: 'IdentifierReference',
                          name: 'x',
                          start: 3,
                          end: 4
                        },
                        {
                          type: 'IdentifierReference',
                          name: 'x',
                          start: 5,
                          end: 6
                        }
                      ],
                      start: 3,
                      end: 6
                    },
                    computed: true,
                    start: 1,
                    end: 7
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 8,
                    end: 9
                  }
                ],
                start: 0,
                end: 9
              },
              start: 0,
              end: 10
            },
            operator: '>',
            right: {
              type: 'IdentifierReference',
              name: 'x',
              start: 11,
              end: 12
            },
            start: 0,
            end: 12
          },
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('a&&(b=c)&&(d=e)', () => {
    t.deepStrictEqual(parseScript('a&&(b=c)&&(d=e)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1
              },
              operator: '&&',
              right: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 5
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 6,
                    end: 7
                  },
                  start: 4,
                  end: 7
                },
                start: 3,
                end: 8
              },
              start: 0,
              end: 8
            },
            operator: '&&',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'd',
                  start: 11,
                  end: 12
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'e',
                  start: 13,
                  end: 14
                },
                start: 11,
                end: 14
              },
              start: 10,
              end: 15
            },
            start: 0,
            end: 15
          },
          start: 0,
          end: 15
        }
      ],
      start: 0,
      end: 15
    });
  });

  it('x = {...[a, b]}', () => {
    t.deepStrictEqual(parseScript('x = {...[a, b]}', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
              end: 1
            },
            operator: '=',
            right: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'SpreadProperty',
                  argument: {
                    type: 'ArrayLiteral',
                    elements: [
                      {
                        type: 'IdentifierReference',
                        name: 'a',
                        start: 9,
                        end: 10
                      },
                      {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 12,
                        end: 13
                      }
                    ],
                    start: 8,
                    end: 14
                  },
                  start: 5,
                  end: 14
                }
              ],
              start: 4,
              end: 15
            },
            start: 0,
            end: 15
          },
          start: 0,
          end: 15
        }
      ],
      start: 0,
      end: 15
    });
  });

  it('while(x) { (a=b,c)}', () => {
    t.deepStrictEqual(parseScript('while(x) { (a=b,c)}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 6,
            end: 7
          },
          statement: {
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
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'a',
                          start: 12,
                          end: 13
                        },
                        operator: '=',
                        right: {
                          type: 'IdentifierReference',
                          name: 'b',
                          start: 14,
                          end: 15
                        },
                        start: 12,
                        end: 15
                      },
                      {
                        type: 'IdentifierReference',
                        name: 'c',
                        start: 16,
                        end: 17
                      }
                    ],
                    start: 11,
                    end: 17
                  },
                  start: 11,
                  end: 18
                },
                start: 11,
                end: 18
              }
            ],
            start: 9,
            end: 19
          },
          start: 0,
          end: 19
        }
      ],
      start: 0,
      end: 19
    });
  });

  it('(a=b,c)', () => {
    t.deepStrictEqual(parseScript('(a=b,c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 1,
                    end: 2
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 3,
                    end: 4
                  },
                  start: 1,
                  end: 4
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 5,
                  end: 6
                }
              ],
              start: 0,
              end: 6
            },
            start: 0,
            end: 7
          },
          start: 0,
          end: 7
        }
      ],
      start: 0,
      end: 7
    });
  });

  it('a = b();', () => {
    t.deepStrictEqual(parseScript('a = b();', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '=',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              arguments: [],
              start: 4,
              end: 7
            },
            start: 0,
            end: 7
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });
});
