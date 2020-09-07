import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Misc - Pattern', () => {
  it('var [,a] = 0;', () => {
    t.deepEqual(parseScript('var [,a] = 0;', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'Elison',
                    start: 4,
                    end: 6
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 6,
                    end: 7
                  }
                ],
                start: 4,
                end: 8
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 11,
                end: 12
              },
              start: 4,
              end: 12
            }
          ],
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });

  it('var [a]=[1];', () => {
    t.deepEqual(parseScript('var [a]=[1];', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 5,
                    end: 6
                  }
                ],
                start: 4,
                end: 7
              },
              initializer: {
                type: 'ArrayLiteral',

                elements: [
                  {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 9,
                    end: 10
                  }
                ],
                start: 8,
                end: 11
              },
              start: 4,
              end: 11
            }
          ],
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('var [a, a] = 0;', () => {
    t.deepEqual(parseScript('var [a, a] = 0;', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 5,
                    end: 6
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 8,
                    end: 9
                  }
                ],
                start: 4,
                end: 10
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 13,
                end: 14
              },
              start: 4,
              end: 14
            }
          ],
          start: 0,
          end: 15
        }
      ],
      start: 0,
      end: 15
    });
  });

  it('try {} catch ([e]) {}', () => {
    t.deepEqual(parseScript('try {} catch ([e]) {}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingIdentifier',
                  name: 'e',
                  start: 15,
                  end: 16
                }
              ],
              start: 14,
              end: 17
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 21
            },
            start: 7,
            end: 21
          },
          finalizer: null,
          start: 0,
          end: 21
        }
      ],
      start: 0,
      end: 21
    });
  });

  it('try {} catch ([e, ...a]) {}', () => {
    t.deepEqual(parseScript('try {} catch ([e, ...a]) {}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingIdentifier',
                  name: 'e',
                  start: 15,
                  end: 16
                },
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 21,
                    end: 22
                  },
                  start: 18,
                  end: 22
                }
              ],
              start: 14,
              end: 23
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 25,
              end: 27
            },
            start: 7,
            end: 27
          },
          finalizer: null,
          start: 0,
          end: 27
        }
      ],
      start: 0,
      end: 27
    });
  });

  it('var [{a = 0}] = 0;', () => {
    t.deepEqual(parseScript('var [{a = 0}] = 0;', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingElement',
                          left: {
                            type: 'BindingIdentifier',
                            name: 'a',
                            start: 6,
                            end: 7
                          },
                          right: {
                            type: 'NumericLiteral',
                            value: 0,
                            start: 10,
                            end: 11
                          },
                          start: 6,
                          end: 11
                        }
                      ],
                      start: 5,
                      end: 12
                    },
                    right: null,
                    start: 5,
                    end: 12
                  }
                ],
                start: 4,
                end: 13
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 16,
                end: 17
              },
              start: 4,
              end: 17
            }
          ],
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('var [{__proto__:a, __proto__:b}] = 0;', () => {
    t.deepEqual(parseScript('var [{__proto__:a, __proto__:b}] = 0;', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'IdentifierName',
                            name: '__proto__',
                            start: 6,
                            end: 16
                          },
                          value: {
                            type: 'BindingIdentifier',
                            name: 'a',
                            start: 16,
                            end: 17
                          },
                          start: 6,
                          end: 17
                        },
                        {
                          type: 'PropertyName',
                          key: {
                            type: 'IdentifierName',
                            name: '__proto__',
                            start: 19,
                            end: 29
                          },
                          value: {
                            type: 'BindingIdentifier',
                            name: 'b',
                            start: 29,
                            end: 30
                          },
                          start: 19,
                          end: 30
                        }
                      ],
                      start: 5,
                      end: 31
                    },
                    right: null,
                    start: 5,
                    end: 31
                  }
                ],
                start: 4,
                end: 32
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 35,
                end: 36
              },
              start: 4,
              end: 36
            }
          ],
          start: 0,
          end: 37
        }
      ],
      start: 0,
      end: 37
    });
  });

  it('var a, {x: {y: a}} = 0', () => {
    t.deepEqual(parseScript('var a, {x: {y: a}} = 0', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 4,
                end: 5
              },
              initializer: null,
              start: 4,
              end: 5
            },
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'x',
                      start: 8,
                      end: 10
                    },
                    value: {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [
                          {
                            type: 'PropertyName',
                            key: {
                              type: 'IdentifierName',
                              name: 'y',
                              start: 12,
                              end: 14
                            },
                            value: {
                              type: 'BindingIdentifier',
                              name: 'a',
                              start: 15,
                              end: 16
                            },
                            start: 12,
                            end: 16
                          }
                        ],
                        start: 11,
                        end: 17
                      },
                      right: null,
                      start: 11,
                      end: 17
                    },
                    start: 8,
                    end: 17
                  }
                ],
                start: 7,
                end: 18
              },
              initializer: {
                type: 'NumericLiteral',
                value: 0,
                start: 21,
                end: 22
              },
              start: 7,
              end: 22
            }
          ],
          start: 0,
          end: 22
        }
      ],
      start: 0,
      end: 22
    });
  });

  it('(a, b, [c]) => 0', () => {
    t.deepEqual(parseScript('(a, b, [c]) => 0', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 1,
                end: 2
              },
              {
                type: 'BindingIdentifier',
                name: 'b',
                start: 4,
                end: 5
              },
              {
                type: 'ArrayBindingPattern',

                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 8,
                    end: 9
                  }
                ],
                start: 7,
                end: 10
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'NumericLiteral',
                value: 0,
                start: 15,
                end: 16
              },
              start: 15,
              end: 16
            },
            async: false,
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

  it('try {} catch ({e}) {}', () => {
    t.deepEqual(parseScript('try {} catch ({e}) {}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'e',
                  start: 15,
                  end: 16
                }
              ],
              start: 14,
              end: 17
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 21
            },
            start: 7,
            end: 21
          },
          finalizer: null,
          start: 0,
          end: 21
        }
      ],
      start: 0,
      end: 21
    });
  });

  it('try {} catch ({e = 0}) {}', () => {
    t.deepEqual(parseScript('try {} catch ({e = 0}) {}', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingElement',
                  left: {
                    type: 'BindingIdentifier',
                    name: 'e',
                    start: 15,
                    end: 16
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 0,
                    start: 19,
                    end: 20
                  },
                  start: 15,
                  end: 20
                }
              ],
              start: 14,
              end: 21
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 23,
              end: 25
            },
            start: 7,
            end: 25
          },
          finalizer: null,
          start: 0,
          end: 25
        }
      ],
      start: 0,
      end: 25
    });
  });
});
