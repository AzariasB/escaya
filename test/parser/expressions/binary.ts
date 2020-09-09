import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of ['`~3 ** 2;', 'typeof 3 ** 2;', '[] += a']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    '(a + b) >> c',
    '(a % b) + c',
    'a << b instanceof c',
    'a >> (b >> c)',
    '(a << b) in c',
    'x = a ** b + c',
    'x = a + b instanceof c',
    'x = a + b ** c',
    'x = a + b / c',
    'x = a / b + c',
    'x( a instanceof b + c )',
    'a ?? b ?? c ? d : e',
    'a ?? b ? c : d',
    'a ?? b',
    'a ?? b ?? c',
    'x( a ** b + c )',
    '( a + b ** c )',
    '(a * b) / c',
    '!(void a)',
    '++a + b',
    'let * 2',
    '(-1).a'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('a < b == c', () => {
    t.deepEqual(parseScript('a < b == c', { loc: true }), {
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
              operator: '<',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '==',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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

  it('a in (b == c)', () => {
    t.deepEqual(parseScript('a in (b == c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: 'in',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                operator: '==',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 11,
                  end: 12
                },
                start: 6,
                end: 12
              },
              start: 5,
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

  it('a != (b != c)', () => {
    t.deepEqual(parseScript('a != (b != c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '!=',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                operator: '!=',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 11,
                  end: 12
                },
                start: 6,
                end: 12
              },
              start: 5,
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

  it('a === (b === c)', () => {
    t.deepEqual(parseScript('a === (b === c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '===',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 7,
                  end: 8
                },
                operator: '===',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 13,
                  end: 14
                },
                start: 7,
                end: 14
              },
              start: 6,
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

  it('a ^ b ^ c', () => {
    t.deepEqual(parseScript('a ^ b ^ c', { loc: true }), {
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
              operator: '^',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '^',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 8,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('void a + b', () => {
    t.deepEqual(parseScript('void a + b', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: 'void',
              operand: {
                type: 'IdentifierReference',
                name: 'a',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: '+',
            right: {
              type: 'IdentifierReference',
              name: 'b',
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

  it('a + (b |= c)', () => {
    t.deepEqual(parseScript('a + (b |= c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '+',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 5,
                  end: 6
                },
                operator: '|=',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 10,
                  end: 11
                },
                start: 5,
                end: 11
              },
              start: 4,
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

  it('(-1).a += b', () => {
    t.deepEqual(parseScript('(-1).a += b', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'UnaryExpression',
                  operator: '-',
                  operand: {
                    type: 'NumericLiteral',
                    floatingPoint: false,
                    value: 1,
                    start: 2,
                    end: 3
                  },
                  start: 1,
                  end: 3
                },
                start: 0,
                end: 4
              },
              expression: {
                type: 'IdentifierName',
                name: 'a',
                start: 5,
                end: 6
              },
              computed: false,
              start: 0,
              end: 6
            },
            operator: '+=',
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 10,
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

  it('(- 0)[a] = b', () => {
    t.deepEqual(parseScript('(- 0)[a] = b', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'UnaryExpression',
                  operator: '-',
                  operand: {
                    type: 'NumericLiteral',
                    floatingPoint: false,
                    value: 0,
                    start: 3,
                    end: 4
                  },
                  start: 1,
                  end: 4
                },
                start: 0,
                end: 5
              },
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 6,
                end: 7
              },
              computed: true,
              start: 0,
              end: 8
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'b',
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

  it('a << b > c', () => {
    t.deepEqual(parseScript('a << b > c', { loc: true }), {
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
              operator: '<<',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: '>',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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

  it('a << b < c', () => {
    t.deepEqual(parseScript('a << b < c', { loc: true }), {
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
              operator: '<<',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: '<',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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

  it('(1).a++', () => {
    t.deepEqual(parseScript('(1).a++', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PostfixUpdateExpression',
            operator: '++',
            operand: {
              type: 'MemberExpression',
              member: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'NumericLiteral',
                  floatingPoint: false,
                  value: 1,
                  start: 1,
                  end: 2
                },
                start: 0,
                end: 3
              },
              expression: {
                type: 'IdentifierName',
                name: 'a',
                start: 4,
                end: 5
              },
              computed: false,
              start: 0,
              end: 5
            },
            start: 5,
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

  it('(- 0)[a]().a++', () => {
    t.deepEqual(parseScript('(- 0)[a]().a++', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PostfixUpdateExpression',
            operator: '++',
            operand: {
              type: 'MemberExpression',
              member: {
                type: 'CallExpression',
                expression: {
                  type: 'MemberExpression',
                  member: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'UnaryExpression',
                      operator: '-',
                      operand: {
                        type: 'NumericLiteral',
                        floatingPoint: false,
                        value: 0,
                        start: 3,
                        end: 4
                      },
                      start: 1,
                      end: 4
                    },
                    start: 0,
                    end: 5
                  },
                  expression: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 6,
                    end: 7
                  },
                  computed: true,
                  start: 0,
                  end: 8
                },
                arguments: [],
                start: 0,
                end: 10
              },
              expression: {
                type: 'IdentifierName',
                name: 'a',
                start: 11,
                end: 12
              },
              computed: false,
              start: 0,
              end: 12
            },
            start: 12,
            end: 14
          },
          start: 0,
          end: 14
        }
      ],
      start: 0,
      end: 14
    });
  });

  it('a != (b & c)', () => {
    t.deepEqual(parseScript('a != (b & c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '!=',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                operator: '&',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 10,
                  end: 11
                },
                start: 6,
                end: 11
              },
              start: 5,
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

  it('(a << b) >> c', () => {
    t.deepEqual(parseScript('(a << b) >> c', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2
                },
                operator: '<<',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                start: 1,
                end: 7
              },
              start: 0,
              end: 8
            },
            operator: '>>',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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

  it('a << b in c', () => {
    t.deepEqual(parseScript('a << b in c', { loc: true }), {
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
              operator: '<<',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: 'in',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 10,
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

  it('a / b / c', () => {
    t.deepEqual(parseScript('a / b / c', { loc: true }), {
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
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '/',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 8,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('a|=b^=c&=d>>>=e>>=f<<=g%=h/=i*=j**=k-=l+=m=n', () => {
    t.deepEqual(parseScript('a|=b^=c&=d>>>=e>>=f<<=g%=h/=i*=j**=k-=l+=m=n', { loc: true }), {
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
            operator: '|=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: 'b',
                start: 3,
                end: 4
              },
              operator: '^=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 6,
                  end: 7
                },
                operator: '&=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 9,
                    end: 10
                  },
                  operator: '>>>=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'e',
                      start: 14,
                      end: 15
                    },
                    operator: '>>=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'IdentifierReference',
                        name: 'f',
                        start: 18,
                        end: 19
                      },
                      operator: '<<=',
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'g',
                          start: 22,
                          end: 23
                        },
                        operator: '%=',
                        right: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'IdentifierReference',
                            name: 'h',
                            start: 25,
                            end: 26
                          },
                          operator: '/=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'IdentifierReference',
                              name: 'i',
                              start: 28,
                              end: 29
                            },
                            operator: '*=',
                            right: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'IdentifierReference',
                                name: 'j',
                                start: 31,
                                end: 32
                              },
                              operator: '**=',
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'IdentifierReference',
                                  name: 'k',
                                  start: 35,
                                  end: 36
                                },
                                operator: '-=',
                                right: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'IdentifierReference',
                                    name: 'l',
                                    start: 38,
                                    end: 39
                                  },
                                  operator: '+=',
                                  right: {
                                    type: 'AssignmentExpression',
                                    left: {
                                      type: 'IdentifierReference',
                                      name: 'm',
                                      start: 41,
                                      end: 42
                                    },
                                    operator: '=',
                                    right: {
                                      type: 'IdentifierReference',
                                      name: 'n',
                                      start: 43,
                                      end: 44
                                    },
                                    start: 41,
                                    end: 44
                                  },
                                  start: 38,
                                  end: 44
                                },
                                start: 35,
                                end: 44
                              },
                              start: 31,
                              end: 44
                            },
                            start: 28,
                            end: 44
                          },
                          start: 25,
                          end: 44
                        },
                        start: 22,
                        end: 44
                      },
                      start: 18,
                      end: 44
                    },
                    start: 14,
                    end: 44
                  },
                  start: 9,
                  end: 44
                },
                start: 6,
                end: 44
              },
              start: 3,
              end: 44
            },
            start: 0,
            end: 44
          },
          start: 0,
          end: 44
        }
      ],
      start: 0,
      end: 44
    });
  });
  it('a=b+=c-=d**=e*=f/=g%=h<<=i>>=j>>>=k&=l^=m|=n', () => {
    t.deepEqual(parseScript('a=b+=c-=d**=e*=f/=g%=h<<=i>>=j>>>=k&=l^=m|=n', { loc: true }), {
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
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: 'b',
                start: 2,
                end: 3
              },
              operator: '+=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 5,
                  end: 6
                },
                operator: '-=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 8,
                    end: 9
                  },
                  operator: '**=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'e',
                      start: 12,
                      end: 13
                    },
                    operator: '*=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'IdentifierReference',
                        name: 'f',
                        start: 15,
                        end: 16
                      },
                      operator: '/=',
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'g',
                          start: 18,
                          end: 19
                        },
                        operator: '%=',
                        right: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'IdentifierReference',
                            name: 'h',
                            start: 21,
                            end: 22
                          },
                          operator: '<<=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'IdentifierReference',
                              name: 'i',
                              start: 25,
                              end: 26
                            },
                            operator: '>>=',
                            right: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'IdentifierReference',
                                name: 'j',
                                start: 29,
                                end: 30
                              },
                              operator: '>>>=',
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'IdentifierReference',
                                  name: 'k',
                                  start: 34,
                                  end: 35
                                },
                                operator: '&=',
                                right: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'IdentifierReference',
                                    name: 'l',
                                    start: 37,
                                    end: 38
                                  },
                                  operator: '^=',
                                  right: {
                                    type: 'AssignmentExpression',
                                    left: {
                                      type: 'IdentifierReference',
                                      name: 'm',
                                      start: 40,
                                      end: 41
                                    },
                                    operator: '|=',
                                    right: {
                                      type: 'IdentifierReference',
                                      name: 'n',
                                      start: 43,
                                      end: 44
                                    },
                                    start: 40,
                                    end: 44
                                  },
                                  start: 37,
                                  end: 44
                                },
                                start: 34,
                                end: 44
                              },
                              start: 29,
                              end: 44
                            },
                            start: 25,
                            end: 44
                          },
                          start: 21,
                          end: 44
                        },
                        start: 18,
                        end: 44
                      },
                      start: 15,
                      end: 44
                    },
                    start: 12,
                    end: 44
                  },
                  start: 8,
                  end: 44
                },
                start: 5,
                end: 44
              },
              start: 2,
              end: 44
            },
            start: 0,
            end: 44
          },
          start: 0,
          end: 44
        }
      ],
      start: 0,
      end: 44
    });
  });

  it('x in y', () => {
    t.deepEqual(parseScript('x in y', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x',
              start: 0,
              end: 1
            },
            operator: 'in',
            right: {
              type: 'IdentifierReference',
              name: 'y',
              start: 5,
              end: 6
            },
            start: 0,
            end: 6
          },
          start: 0,
          end: 6
        }
      ],
      start: 0,
      end: 6
    });
  });
  it('-(x ** y)', () => {
    t.deepEqual(parseScript('-(x ** y)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '-',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 2,
                  end: 3
                },
                operator: '**',
                right: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 7,
                  end: 8
                },
                start: 2,
                end: 8
              },
              start: 1,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('x * y % z', () => {
    t.deepEqual(parseScript('x * y % z', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x',
              start: 0,
              end: 1
            },
            operator: '*',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'y',
                start: 4,
                end: 5
              },
              operator: '%',
              right: {
                type: 'IdentifierReference',
                name: 'z',
                start: 8,
                end: 9
              },
              start: 6,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('x - y + z', () => {
    t.deepEqual(parseScript('x - y + z', { loc: true }), {
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
                name: 'x',
                start: 0,
                end: 1
              },
              operator: '-',
              right: {
                type: 'IdentifierReference',
                name: 'y',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '+',
            right: {
              type: 'IdentifierReference',
              name: 'z',
              start: 8,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('1+2;', () => {
    t.deepEqual(parseScript('1+2;', { loc: true }), {
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
              floatingPoint: false,
              value: 1,
              start: 0,
              end: 1
            },
            operator: '+',
            right: {
              type: 'NumericLiteral',
              floatingPoint: false,
              value: 2,
              start: 2,
              end: 3
            },
            start: 0,
            end: 3
          },
          start: 0,
          end: 4
        }
      ],
      start: 0,
      end: 4
    });
  });

  it('(1)[a] += b', () => {
    t.deepEqual(parseScript('(1)[a] += b', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              member: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'NumericLiteral',
                  floatingPoint: false,
                  value: 1,
                  start: 1,
                  end: 2
                },
                start: 0,
                end: 3
              },
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 4,
                end: 5
              },
              computed: true,
              start: 0,
              end: 6
            },
            operator: '+=',
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 10,
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

  it('a % b & c >>> d ^ e instanceof f - g || h && i != j | k', () => {
    t.deepEqual(parseScript('a % b & c >>> d ^ e instanceof f - g || h && i != j | k', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 0,
                    end: 1
                  },
                  operator: '%',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 5
                  },
                  start: 0,
                  end: 5
                },
                operator: '&',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 8,
                    end: 9
                  },
                  operator: '>>>',
                  right: {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 14,
                    end: 15
                  },
                  start: 10,
                  end: 15
                },
                start: 0,
                end: 15
              },
              operator: '^',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'e',
                  start: 18,
                  end: 19
                },
                operator: 'instanceof',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'f',
                    start: 31,
                    end: 32
                  },
                  operator: '-',
                  right: {
                    type: 'IdentifierReference',
                    name: 'g',
                    start: 35,
                    end: 36
                  },
                  start: 33,
                  end: 36
                },
                start: 20,
                end: 36
              },
              start: 0,
              end: 36
            },
            operator: '||',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'h',
                start: 40,
                end: 41
              },
              operator: '&&',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'i',
                    start: 45,
                    end: 46
                  },
                  operator: '!=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'j',
                    start: 50,
                    end: 51
                  },
                  start: 47,
                  end: 51
                },
                operator: '|',
                right: {
                  type: 'IdentifierReference',
                  name: 'k',
                  start: 54,
                  end: 55
                },
                start: 47,
                end: 55
              },
              start: 42,
              end: 55
            },
            start: 0,
            end: 55
          },
          start: 0,
          end: 55
        }
      ],
      start: 0,
      end: 55
    });
  });

  it('a % b & c << d ^ e instanceof f - g || h && i != j | k', () => {
    t.deepEqual(parseScript('a % b & c << d ^ e instanceof f - g || h && i != j | k', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 0,
                    end: 1
                  },
                  operator: '%',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 5
                  },
                  start: 0,
                  end: 5
                },
                operator: '&',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 8,
                    end: 9
                  },
                  operator: '<<',
                  right: {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 13,
                    end: 14
                  },
                  start: 10,
                  end: 14
                },
                start: 0,
                end: 14
              },
              operator: '^',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'e',
                  start: 17,
                  end: 18
                },
                operator: 'instanceof',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'f',
                    start: 30,
                    end: 31
                  },
                  operator: '-',
                  right: {
                    type: 'IdentifierReference',
                    name: 'g',
                    start: 34,
                    end: 35
                  },
                  start: 32,
                  end: 35
                },
                start: 19,
                end: 35
              },
              start: 0,
              end: 35
            },
            operator: '||',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'h',
                start: 39,
                end: 40
              },
              operator: '&&',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'i',
                    start: 44,
                    end: 45
                  },
                  operator: '!=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'j',
                    start: 49,
                    end: 50
                  },
                  start: 46,
                  end: 50
                },
                operator: '|',
                right: {
                  type: 'IdentifierReference',
                  name: 'k',
                  start: 53,
                  end: 54
                },
                start: 46,
                end: 54
              },
              start: 41,
              end: 54
            },
            start: 0,
            end: 54
          },
          start: 0,
          end: 54
        }
      ],
      start: 0,
      end: 54
    });
  });

  it('a * b & c >>> d ^ e < f - g || h && i != j | k', () => {
    t.deepEqual(parseScript('a * b & c >>> d ^ e < f - g || h && i != j | k', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 0,
                    end: 1
                  },
                  operator: '*',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 5
                  },
                  start: 0,
                  end: 5
                },
                operator: '&',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 8,
                    end: 9
                  },
                  operator: '>>>',
                  right: {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 14,
                    end: 15
                  },
                  start: 10,
                  end: 15
                },
                start: 0,
                end: 15
              },
              operator: '^',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'e',
                  start: 18,
                  end: 19
                },
                operator: '<',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'f',
                    start: 22,
                    end: 23
                  },
                  operator: '-',
                  right: {
                    type: 'IdentifierReference',
                    name: 'g',
                    start: 26,
                    end: 27
                  },
                  start: 24,
                  end: 27
                },
                start: 20,
                end: 27
              },
              start: 0,
              end: 27
            },
            operator: '||',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'h',
                start: 31,
                end: 32
              },
              operator: '&&',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'i',
                    start: 36,
                    end: 37
                  },
                  operator: '!=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'j',
                    start: 41,
                    end: 42
                  },
                  start: 38,
                  end: 42
                },
                operator: '|',
                right: {
                  type: 'IdentifierReference',
                  name: 'k',
                  start: 45,
                  end: 46
                },
                start: 38,
                end: 46
              },
              start: 33,
              end: 46
            },
            start: 0,
            end: 46
          },
          start: 0,
          end: 46
        }
      ],
      start: 0,
      end: 46
    });
  });

  it('a / b & c << d ^ e instanceof f + g || h && i != j | k', () => {
    t.deepEqual(parseScript('a / b & c << d ^ e instanceof f + g || h && i != j | k', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 0,
                      end: 1
                    },
                    operator: '/',
                    right: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 4,
                      end: 5
                    },
                    start: 0,
                    end: 5
                  },
                  operator: '&',
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'c',
                      start: 8,
                      end: 9
                    },
                    operator: '<<',
                    right: {
                      type: 'IdentifierReference',
                      name: 'd',
                      start: 13,
                      end: 14
                    },
                    start: 10,
                    end: 14
                  },
                  start: 0,
                  end: 14
                },
                operator: '^',
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'e',
                    start: 17,
                    end: 18
                  },
                  operator: 'instanceof',
                  right: {
                    type: 'IdentifierReference',
                    name: 'f',
                    start: 30,
                    end: 31
                  },
                  start: 19,
                  end: 31
                },
                start: 0,
                end: 31
              },
              operator: '+',
              right: {
                type: 'IdentifierReference',
                name: 'g',
                start: 34,
                end: 35
              },
              start: 0,
              end: 35
            },
            operator: '||',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'h',
                start: 39,
                end: 40
              },
              operator: '&&',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'i',
                    start: 44,
                    end: 45
                  },
                  operator: '!=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'j',
                    start: 49,
                    end: 50
                  },
                  start: 46,
                  end: 50
                },
                operator: '|',
                right: {
                  type: 'IdentifierReference',
                  name: 'k',
                  start: 53,
                  end: 54
                },
                start: 46,
                end: 54
              },
              start: 41,
              end: 54
            },
            start: 0,
            end: 54
          },
          start: 0,
          end: 54
        }
      ],
      start: 0,
      end: 54
    });
  });

  it('a * b + c', () => {
    t.deepEqual(parseScript('a * b + c', { loc: true }), {
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
              operator: '*',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '+',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 8,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('a & b ^ c', () => {
    t.deepEqual(parseScript('a & b ^ c', { loc: true }), {
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
              operator: '&',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            operator: '^',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 8,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('a&&b', () => {
    t.deepEqual(parseScript('a&&b', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '&&',
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 3,
              end: 4
            },
            start: 0,
            end: 4
          },
          start: 0,
          end: 4
        }
      ],
      start: 0,
      end: 4
    });
  });

  it('a << b >> c >>> d', () => {
    t.deepEqual(parseScript('a << b >> c >>> d', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 0,
                  end: 1
                },
                operator: '<<',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 5,
                  end: 6
                },
                start: 0,
                end: 6
              },
              operator: '>>',
              right: {
                type: 'IdentifierReference',
                name: 'c',
                start: 10,
                end: 11
              },
              start: 0,
              end: 11
            },
            operator: '>>>',
            right: {
              type: 'IdentifierReference',
              name: 'd',
              start: 16,
              end: 17
            },
            start: 0,
            end: 17
          },
          start: 0,
          end: 17
        }
      ],
      start: 0,
      end: 17
    });
  });

  it('a == b < c', () => {
    t.deepEqual(parseScript('a == b < c', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '==',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              operator: '<',
              right: {
                type: 'IdentifierReference',
                name: 'c',
                start: 9,
                end: 10
              },
              start: 7,
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

  it('a | b ^ c', () => {
    t.deepEqual(parseScript('a | b ^ c', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '|',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'b',
                start: 4,
                end: 5
              },
              operator: '^',
              right: {
                type: 'IdentifierReference',
                name: 'c',
                start: 8,
                end: 9
              },
              start: 6,
              end: 9
            },
            start: 0,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('a * x ? b : c ? d : e', () => {
    t.deepEqual(parseScript('a * x ? b : c ? d : e', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            shortCircuit: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a',
                start: 0,
                end: 1
              },
              operator: '*',
              right: {
                type: 'IdentifierReference',
                name: 'x',
                start: 4,
                end: 5
              },
              start: 0,
              end: 5
            },
            consequent: {
              type: 'IdentifierReference',
              name: 'b',
              start: 8,
              end: 9
            },
            alternate: {
              type: 'ConditionalExpression',
              shortCircuit: {
                type: 'IdentifierReference',
                name: 'c',
                start: 12,
                end: 13
              },
              consequent: {
                type: 'IdentifierReference',
                name: 'd',
                start: 16,
                end: 17
              },
              alternate: {
                type: 'IdentifierReference',
                name: 'e',
                start: 20,
                end: 21
              },
              start: 12,
              end: 21
            },
            start: 0,
            end: 21
          },
          start: 0,
          end: 21
        }
      ],
      start: 0,
      end: 21
    });
  });

  it('x = a > b instanceof c', () => {
    t.deepEqual(parseScript('x = a > b instanceof c', { loc: true }), {
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
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 4,
                  end: 5
                },
                operator: '>',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 8,
                  end: 9
                },
                start: 4,
                end: 9
              },
              operator: 'instanceof',
              right: {
                type: 'IdentifierReference',
                name: 'c',
                start: 21,
                end: 22
              },
              start: 4,
              end: 22
            },
            start: 0,
            end: 22
          },
          start: 0,
          end: 22
        }
      ],
      start: 0,
      end: 22
    });
  });

  it('foo( a instanceof b + c )', () => {
    t.deepEqual(parseScript('foo( a instanceof b + c )', { loc: true }), {
      type: 'Script',
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
              end: 3
            },
            arguments: [
              {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 5,
                    end: 6
                  },
                  operator: 'instanceof',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 18,
                    end: 19
                  },
                  start: 5,
                  end: 19
                },
                operator: '+',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 22,
                  end: 23
                },
                start: 5,
                end: 23
              }
            ],
            start: 0,
            end: 25
          },
          start: 0,
          end: 25
        }
      ],
      start: 0,
      end: 25
    });
  });

  it('foo( a instanceof b > c )', () => {
    t.deepEqual(parseScript('foo( a instanceof b > c )', { loc: true }), {
      type: 'Script',
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
              end: 3
            },
            arguments: [
              {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 5,
                    end: 6
                  },
                  operator: 'instanceof',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 18,
                    end: 19
                  },
                  start: 5,
                  end: 19
                },
                operator: '>',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 22,
                  end: 23
                },
                start: 5,
                end: 23
              }
            ],
            start: 0,
            end: 25
          },
          start: 0,
          end: 25
        }
      ],
      start: 0,
      end: 25
    });
  });

  it('foo( a / b + c )', () => {
    t.deepEqual(parseScript('foo( a / b + c )', { loc: true }), {
      type: 'Script',
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
              end: 3
            },
            arguments: [
              {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 5,
                    end: 6
                  },
                  operator: '/',
                  right: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 9,
                    end: 10
                  },
                  start: 5,
                  end: 10
                },
                operator: '+',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 13,
                  end: 14
                },
                start: 5,
                end: 14
              }
            ],
            start: 0,
            end: 16
          },
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('(a << b) in c', () => {
    t.deepEqual(parseScript('(a << b) in c', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2
                },
                operator: '<<',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                start: 1,
                end: 7
              },
              start: 0,
              end: 8
            },
            operator: 'in',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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

  it('a << b instanceof c', () => {
    t.deepEqual(parseScript('a << b instanceof c', { loc: true }), {
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
              operator: '<<',
              right: {
                type: 'IdentifierReference',
                name: 'b',
                start: 5,
                end: 6
              },
              start: 0,
              end: 6
            },
            operator: 'instanceof',
            right: {
              type: 'IdentifierReference',
              name: 'c',
              start: 18,
              end: 19
            },
            start: 0,
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

  it('a >> (b >> c)', () => {
    t.deepEqual(parseScript('a >> (b >> c)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a',
              start: 0,
              end: 1
            },
            operator: '>>',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 6,
                  end: 7
                },
                operator: '>>',
                right: {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 11,
                  end: 12
                },
                start: 6,
                end: 12
              },
              start: 5,
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

  it('simple block', () => {
    t.deepEqual(parseScript('(a + b) >> c', { loc: true }), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2
                },
                operator: '+',
                right: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 5,
                  end: 6
                },
                start: 1,
                end: 6
              },
              start: 0,
              end: 7
            },
            operator: '>>',
            right: {
              type: 'IdentifierReference',
              name: 'c',
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
});
