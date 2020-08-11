import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Misc - Assignment', () => {
  it('[{a=0},{a=0}] = 0', () => {
    t.deepEqual(parseScript('[{a=0},{a=0}] = 0'), {
      type: 'Script',
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
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 2,
                        end: 4
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
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
                {
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 8,
                        end: 10
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 10,
                        end: 11
                      },
                      start: 8,
                      end: 11
                    }
                  ],
                  start: 7,
                  end: 12
                }
              ],
              start: 0,
              end: 15
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[x,] = 0', () => {
    t.deepEqual(parseScript('[x,] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                }
              ],
              start: 0,
              end: 6
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 7,
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

  it('[x,,] = 0', () => {
    t.deepEqual(parseScript('[x,,] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                },
                {
                  type: 'Elison',
                  start: 4,
                  end: 4
                }
              ],
              start: 0,
              end: 7
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[[x]] = 0', () => {
    t.deepEqual(parseScript('[[x]] = 0'), {
      type: 'Script',
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
                  type: 'ArrayAssignmentPattern',
                  kind: 178,
                  elements: [
                    {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 2,
                      end: 3
                    }
                  ],
                  start: 1,
                  end: 4
                }
              ],
              start: 0,
              end: 7
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[x, y, ...z] = 0', () => {
    t.deepEqual(parseScript('[x, y, ...z] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                },
                {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 4,
                  end: 5
                },
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'z',
                    start: 10,
                    end: 11
                  },
                  start: 7,
                  end: 11
                }
              ],
              start: 0,
              end: 14
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 15,
              end: 16
            },
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

  it('[, x,,] = 0', () => {
    t.deepEqual(parseScript('[, x,,] = 0'), {
      type: 'Script',
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
                  start: 3,
                  end: 2
                },
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 3,
                  end: 4
                },
                {
                  type: 'Elison',
                  start: 6,
                  end: 6
                }
              ],
              start: 0,
              end: 9
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[...[x]] = 0', () => {
    t.deepEqual(parseScript('[...[x]] = 0'), {
      type: 'Script',
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
                    type: 'ArrayAssignmentPattern',
                    kind: 178,
                    elements: [
                      {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 5,
                        end: 6
                      }
                    ],
                    start: 4,
                    end: 7
                  },
                  start: 1,
                  end: 7
                }
              ],
              start: 0,
              end: 10
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[x, ...{0: y}] = 0', () => {
    t.deepEqual(parseScript('[x, ...{0: y}] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                },
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'ObjectAssignmentPattern',
                    properties: [
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 8,
                          end: 9
                        },
                        value: {
                          type: 'IdentifierReference',
                          name: 'y',
                          start: 11,
                          end: 12
                        },
                        start: 8,
                        end: 12
                      }
                    ],
                    start: 7,
                    end: 13
                  },
                  start: 4,
                  end: 13
                }
              ],
              start: 0,
              end: 16
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 17,
              end: 18
            },
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('[x, x] = 0', () => {
    t.deepEqual(parseScript('[x, x] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                },
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 4,
                  end: 5
                }
              ],
              start: 0,
              end: 8
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[x, ...x] = 0', () => {
    t.deepEqual(parseScript('[x, ...x] = 0'), {
      type: 'Script',
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
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 1,
                  end: 2
                },
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 7,
                    end: 8
                  },
                  start: 4,
                  end: 8
                }
              ],
              start: 0,
              end: 11
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[x.a=a] = b', () => {
    t.deepEqual(parseScript('[x.a=a] = b'), {
      type: 'Script',
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
                  type: 'AssignmentElement',
                  left: {
                    type: 'MemberExpression',
                    member: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 1,
                      end: 2
                    },
                    expression: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 3,
                      end: 4
                    },
                    computed: false,
                    start: 1,
                    end: 4
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 5,
                    end: 6
                  },
                  start: 1,
                  end: 6
                }
              ],
              start: 0,
              end: 9
            },
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

  it('[x[a]=a] = b', () => {
    t.deepEqual(parseScript('[x[a]=a] = b'), {
      type: 'Script',
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
                  type: 'AssignmentElement',
                  left: {
                    type: 'MemberExpression',
                    member: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 1,
                      end: 2
                    },
                    expression: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 3,
                      end: 4
                    },
                    computed: true,
                    start: 1,
                    end: 5
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 6,
                    end: 7
                  },
                  start: 1,
                  end: 7
                }
              ],
              start: 0,
              end: 10
            },
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

  it('[...[...a[x]]] = b', () => {
    t.deepEqual(parseScript('[...[...a[x]]] = b'), {
      type: 'Script',
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
                    type: 'ArrayAssignmentPattern',
                    kind: 178,
                    elements: [
                      {
                        type: 'AssignmentRestProperty',
                        argument: {
                          type: 'MemberExpression',
                          member: {
                            type: 'IdentifierReference',
                            name: 'a',
                            start: 8,
                            end: 9
                          },
                          expression: {
                            type: 'IdentifierReference',
                            name: 'x',
                            start: 10,
                            end: 11
                          },
                          computed: true,
                          start: 8,
                          end: 12
                        },
                        start: 5,
                        end: 12
                      }
                    ],
                    start: 4,
                    end: 13
                  },
                  start: 1,
                  end: 13
                }
              ],
              start: 0,
              end: 16
            },
            right: {
              type: 'IdentifierReference',
              name: 'b',
              start: 17,
              end: 18
            },
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('[{a=0},{a=0}] = 0', () => {
    t.deepEqual(parseScript('[{a=0},{a=0}] = 0'), {
      type: 'Script',
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
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 2,
                        end: 4
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
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
                {
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 8,
                        end: 10
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 10,
                        end: 11
                      },
                      start: 8,
                      end: 11
                    }
                  ],
                  start: 7,
                  end: 12
                }
              ],
              start: 0,
              end: 15
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('[a = 0, ...{b = 0}] = 0', () => {
    t.deepEqual(parseScript('[a = 0, ...{b = 0}] = 0'), {
      type: 'Script',
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
                  type: 'AssignmentElement',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 1,
                    end: 2
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 0,
                    start: 5,
                    end: 6
                  },
                  start: 1,
                  end: 6
                },
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'ObjectAssignmentPattern',
                    properties: [
                      {
                        type: 'AssignmentElement',
                        left: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 12,
                          end: 15
                        },
                        right: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 16,
                          end: 17
                        },
                        start: 12,
                        end: 17
                      }
                    ],
                    start: 11,
                    end: 18
                  },
                  start: 8,
                  end: 18
                }
              ],
              start: 0,
              end: 21
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 22,
              end: 23
            },
            start: 0,
            end: 23
          },
          start: 0,
          end: 23
        }
      ],
      start: 0,
      end: 23
    });
  });

  it('[{a=0}, ...b] = 0', () => {
    t.deepEqual(parseScript('[{a=0}, ...b] = 0'), {
      type: 'Script',
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
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 2,
                        end: 4
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
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
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 11,
                    end: 12
                  },
                  start: 8,
                  end: 12
                }
              ],
              start: 0,
              end: 15
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
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

  it('({x} = 0)', () => {
    t.deepEqual(parseScript('({x} = 0)'), {
      type: 'Script',
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
                    name: 'x',
                    start: 2,
                    end: 3
                  }
                ],
                start: 1,
                end: 6
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 7,
                end: 8
              },
              start: 1,
              end: 8
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

  it('({x,} = 0)', () => {
    t.deepEqual(parseScript('({x,} = 0)'), {
      type: 'Script',
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
                    name: 'x',
                    start: 2,
                    end: 3
                  }
                ],
                start: 1,
                end: 7
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 8,
                end: 9
              },
              start: 1,
              end: 9
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

  it('({x,y} = 0)', () => {
    t.deepEqual(parseScript('({x,y} = 0)'), {
      type: 'Script',
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
                    name: 'x',
                    start: 2,
                    end: 3
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'y',
                    start: 4,
                    end: 5
                  }
                ],
                start: 1,
                end: 8
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 9,
                end: 10
              },
              start: 1,
              end: 10
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

  it('({x,y,} = 0)', () => {
    t.deepEqual(parseScript('({x,y,} = 0)'), {
      type: 'Script',
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
                    name: 'x',
                    start: 2,
                    end: 3
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'y',
                    start: 4,
                    end: 5
                  }
                ],
                start: 1,
                end: 9
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 10,
                end: 11
              },
              start: 1,
              end: 11
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
  it('({x = 0,} = 1)', () => {
    t.deepEqual(parseScript('({x = 0,} = 1)'), {
      type: 'Script',
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
                      end: 5
                    },
                    right: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 6,
                      end: 7
                    },
                    start: 2,
                    end: 7
                  }
                ],
                start: 1,
                end: 11
              },
              right: {
                type: 'NumericLiteral',
                value: 1,
                start: 12,
                end: 13
              },
              start: 1,
              end: 13
            },
            start: 0,
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

  it('({0: y} = 0)', () => {
    t.deepEqual(parseScript('({0: y} = 0)'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 2,
                      end: 3
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'y',
                      start: 5,
                      end: 6
                    },
                    start: 2,
                    end: 6
                  }
                ],
                start: 1,
                end: 9
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 10,
                end: 11
              },
              start: 1,
              end: 11
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

  it('({0: x, 1: x} = 0)', () => {
    t.deepEqual(parseScript('({0: x, 1: x} = 0)'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 2,
                      end: 3
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 5,
                      end: 6
                    },
                    start: 2,
                    end: 6
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 8,
                      end: 9
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 11,
                      end: 12
                    },
                    start: 8,
                    end: 12
                  }
                ],
                start: 1,
                end: 15
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 16,
                end: 17
              },
              start: 1,
              end: 17
            },
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('({x: y = z = 0} = 1)', () => {
    t.deepEqual(parseScript('({x: y = z = 0} = 1)'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 2,
                      end: 4
                    },
                    value: {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierReference',
                        name: 'y',
                        start: 5,
                        end: 6
                      },
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'z',
                          start: 9,
                          end: 10
                        },
                        operator: '=',
                        right: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 13,
                          end: 14
                        },
                        start: 9,
                        end: 14
                      },
                      start: 5,
                      end: 14
                    },
                    start: 2,
                    end: 14
                  }
                ],
                start: 1,
                end: 17
              },
              right: {
                type: 'NumericLiteral',
                value: 1,
                start: 18,
                end: 19
              },
              start: 1,
              end: 19
            },
            start: 0,
            end: 20
          },
          start: 0,
          end: 20
        }
      ],
      start: 0,
      end: 20
    });
  });

  it('({x: [y] = 0} = 1)', () => {
    t.deepEqual(parseScript('({x: [y] = 0} = 1)'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 2,
                      end: 4
                    },
                    value: {
                      type: 'AssignmentElement',
                      left: {
                        type: 'ArrayAssignmentPattern',
                        elements: [
                          {
                            type: 'IdentifierReference',
                            name: 'y',
                            start: 6,
                            end: 7
                          }
                        ],
                        start: 5,
                        end: 10
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 11,
                        end: 12
                      },
                      start: 5,
                      end: 12
                    },
                    start: 2,
                    end: 12
                  }
                ],
                start: 1,
                end: 15
              },
              right: {
                type: 'NumericLiteral',
                value: 1,
                start: 16,
                end: 17
              },
              start: 1,
              end: 17
            },
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });
  it('({a:let} = 0);', () => {
    t.deepEqual(parseScript('({a:let} = 0);'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 2,
                      end: 4
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'let',
                      start: 4,
                      end: 7
                    },
                    start: 2,
                    end: 7
                  }
                ],
                start: 1,
                end: 10
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 11,
                end: 12
              },
              start: 1,
              end: 12
            },
            start: 0,
            end: 13
          },
          start: 0,
          end: 14
        }
      ],
      start: 0,
      end: 14
    });
  });

  it('({a:yield} = 0);', () => {
    t.deepEqual(parseScript('({a:yield} = 0);'), {
      type: 'Script',
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
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 2,
                      end: 4
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'yield',
                      start: 4,
                      end: 9
                    },
                    start: 2,
                    end: 9
                  }
                ],
                start: 1,
                end: 12
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 13,
                end: 14
              },
              start: 1,
              end: 14
            },
            start: 0,
            end: 15
          },
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('({yield = 0} = 0);', () => {
    t.deepEqual(parseScript('({yield = 0} = 0);'), {
      type: 'Script',
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
                      name: 'yield',
                      start: 2,
                      end: 9
                    },
                    right: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 10,
                      end: 11
                    },
                    start: 2,
                    end: 11
                  }
                ],
                start: 1,
                end: 14
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 15,
                end: 16
              },
              start: 1,
              end: 16
            },
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

  it('(function*() { [...{ x = yield }] = 0; })', () => {
    t.deepEqual(parseScript('(function*() { [...{ x = yield }] = 0; })'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: null,
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
                      type: 'AssignmentElement',
                      left: {
                        type: 'ArrayAssignmentPattern',
                        elements: [
                          {
                            type: 'AssignmentRestProperty',
                            argument: {
                              type: 'ObjectAssignmentPattern',
                              properties: [
                                {
                                  type: 'AssignmentElement',
                                  left: {
                                    type: 'IdentifierName',
                                    name: 'x',
                                    start: 21,
                                    end: 24
                                  },
                                  right: {
                                    type: 'YieldExpression',
                                    delegate: false,
                                    argument: null,
                                    start: 25,
                                    end: 30
                                  },
                                  start: 21,
                                  end: 30
                                }
                              ],
                              start: 19,
                              end: 32
                            },
                            start: 16,
                            end: 32
                          }
                        ],
                        start: 15,
                        end: 35
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 36,
                        end: 37
                      },
                      start: 15,
                      end: 37
                    },
                    start: 15,
                    end: 38
                  }
                ],
                start: 13,
                end: 40
              },
              start: 1,
              end: 40
            },
            start: 0,
            end: 41
          },
          start: 0,
          end: 41
        }
      ],
      start: 0,
      end: 41
    });
  });
});
