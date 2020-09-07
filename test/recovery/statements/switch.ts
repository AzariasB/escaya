import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Switch', () => {
  it('switch (true) { case true: function g() {} }', () => {
    t.deepEqual(recovery('switch (true) { case true: function g() {} }', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 8,
            end: 12,
            kind: 166,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'BooleanLiteral',
                value: true,
                start: 20,
                end: 25,
                kind: 166,
                flags: 0
              },
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'g',
                    start: 35,
                    end: 37,
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
                    start: 39,
                    end: 42,
                    kind: 184,
                    flags: 0
                  },
                  start: 26,
                  end: 42,
                  kind: 186,
                  flags: 0
                }
              ],
              start: 15,
              end: 42,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 44,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (true) { case true: function g() {} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 44,
      end: 44
    });
  });

  it('switch (x) { default: function *f(){} function *f(){} }', () => {
    t.deepEqual(recovery('switch (x) { default: function *f(){} function *f(){} }', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9,
            kind: 13,
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
                    start: 32,
                    end: 33,
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
                    start: 35,
                    end: 37,
                    kind: 184,
                    flags: 0
                  },
                  start: 21,
                  end: 37,
                  kind: 186,
                  flags: 0
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 48,
                    end: 49,
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
                    start: 51,
                    end: 53,
                    kind: 184,
                    flags: 0
                  },
                  start: 37,
                  end: 53,
                  kind: 186,
                  flags: 0
                }
              ],
              start: 12,
              end: 53,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 55,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (x) { default: function *f(){} function *f(){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 55,
      end: 55
    });
  });

  it('switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f', () => {
    t.deepEqual(recovery('switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 8,
            end: 9,
            kind: 10,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 1,
                start: 17,
                end: 19,
                kind: 10,
                flags: 0
              },
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 24,
                        end: 26,
                        kind: 168,
                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 28,
                        end: 30,
                        kind: 10,
                        flags: 0
                      },
                      start: 24,
                      end: 30,
                      kind: 144,
                      flags: 0
                    }
                  ],
                  start: 20,
                  end: 31,
                  kind: 143,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 31,
                    end: 33,
                    kind: 13,
                    flags: 0
                  },
                  start: 31,
                  end: 34,
                  kind: 122,
                  flags: 0
                }
              ],
              start: 12,
              end: 34,
              kind: 141,
              flags: 0
            },
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'ObjectBindingPattern',
                        properties: [
                          {
                            type: 'BindingIdentifier',
                            name: 'f',
                            start: 49,
                            end: 50,
                            kind: 168,
                            flags: 0
                          }
                        ],
                        start: 47,
                        end: 51,
                        kind: 169,
                        flags: 0
                      },
                      initializer: {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 53,
                        end: 55,
                        kind: 13,
                        flags: 0
                      },
                      start: 47,
                      end: 55,
                      kind: 144,
                      flags: 0
                    }
                  ],
                  start: 43,
                  end: 56,
                  kind: 143,
                  flags: 0
                }
              ],
              start: 34,
              end: 56,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 58,
          kind: 136,
          flags: 0
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 64,
                    end: 65,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 62,
                end: 66,
                kind: 169,
                flags: 0
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'f',
                start: 68,
                end: 70,
                kind: 13,
                flags: 0
              },
              start: 62,
              end: 70,
              kind: 144,
              flags: 0
            }
          ],
          start: 58,
          end: 70,
          kind: 143,
          flags: 0
        }
      ],
      text: 'switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 70,
      end: 70
    });
  });

  it('switch case !', () => {
    t.deepEqual(recovery('switch case !', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 6,
            end: 6,
            kind: 13,
            flags: 2
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 13,
                  end: 13,
                  kind: 13,
                  flags: 2
                },
                start: 11,
                end: 13,
                kind: 160,
                flags: 0
              },
              leafs: [],
              start: 6,
              end: 13,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 13,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch case !',
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
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('switch++', () => {
    t.deepEqual(recovery('switch++', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
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
            kind: 161,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch++',
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

  it('switch!', () => {
    t.deepEqual(recovery('switch!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
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
            start: 6,
            end: 7,
            kind: 160,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 7,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch!',
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

  it('switch )', () => {
    t.deepEqual(recovery('switch )', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 6,
            end: 6,
            kind: 13,
            flags: 2
          },
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch )',
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

  it('switch foo+bar / for as keyword', () => {
    t.deepEqual(recovery('switch foo+bar / for as keyword', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 6,
              end: 10,
              kind: 13,
              flags: 0
            },
            operator: '+',
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'bar',
                start: 11,
                end: 14,
                kind: 13,
                flags: 0
              },
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,
                kind: 13,
                flags: 2
              },
              start: 14,
              end: 16,
              kind: 155,
              flags: 0
            },
            start: 6,
            end: 16,
            kind: 155,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 16,
          kind: 136,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'IdentifierReference',
            name: 'as',
            start: 20,
            end: 23,
            kind: 13,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 31,
            end: 31,
            kind: 13,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'keyword',
            start: 23,
            end: 31,
            kind: 13,
            flags: 0
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
          start: 16,
          end: 31,
          kind: 132,
          flags: 0
        }
      ],
      text: 'switch foo+bar / for as keyword',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 21,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 24,
          length: 7
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

  it('as keyword', () => {
    t.deepEqual(recovery('switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 6,
            end: 6,
            flags: 2
          },
          clauses: [],
          start: 0,
          end: 6,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 0,
          length: 6
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

  it('switch{', () => {
    t.deepEqual(recovery('switch{', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 6,
            end: 7,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 7,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch{',
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

  it('{switch', () => {
    t.deepEqual(recovery('{switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'SwitchStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 7,
                end: 7,
                kind: 13,
                flags: 2
              },
              clauses: [],
              start: 1,
              end: 7,
              kind: 136,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 123,
          flags: 0
        }
      ],
      text: '{switch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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

  it('switch({', () => {
    t.deepEqual(recovery('switch({', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 7,
            end: 8,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch({',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('switch default {', () => {
    t.deepEqual(recovery('switch default {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 6,
            end: 6,
            kind: 13,
            flags: 2
          },
          clauses: [
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 14,
                  end: 16,
                  kind: 123,
                  flags: 0
                }
              ],
              start: 6,
              end: 16,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 16,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch default {',
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
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
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

  it('switch { default :! ', () => {
    t.deepEqual(recovery('switch { default :! ', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'default',
                  start: 8,
                  end: 16,
                  kind: 13,
                  flags: 0
                },
                value: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 19,
                    end: 19,
                    kind: 13,
                    flags: 2
                  },
                  start: 18,
                  end: 19,
                  kind: 160,
                  flags: 0
                },
                start: 8,
                end: 19,
                kind: 227,
                flags: 0
              }
            ],
            start: 6,
            end: 19,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 19,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch { default :! ',
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

  it('switch { case default case case ', () => {
    t.deepEqual(recovery('switch { case default case case', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'case',
                start: 8,
                end: 13,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'default',
                start: 13,
                end: 21,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'case',
                start: 21,
                end: 26,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'case',
                start: 26,
                end: 31,
                kind: 13,
                flags: 0
              }
            ],
            start: 6,
            end: 31,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 31,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch { case default case case',
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
          message: '`,` expected',
          code: 5,
          start: 14,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 22,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 27,
          length: 4
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 26,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 27,
          length: 4
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

  it('switch(x switch', () => {
    t.deepEqual(recovery('switch(x switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'x',
            start: 7,
            end: 8,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 15,
            end: 15,
            flags: 2
          },
          clauses: [],
          start: 8,
          end: 15,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch(x switch',
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
          length: 6
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

  it('switch ! switch { default switch ', () => {
    t.deepEqual(recovery('switch ! switch { default switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
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
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'default',
                start: 17,
                end: 25,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'switch',
                start: 25,
                end: 32,
                kind: 13,
                flags: 0
              }
            ],
            start: 15,
            end: 32,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 8,
          end: 32,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch ! switch { default switch',
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
          start: 9,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 16,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 26,
          length: 6
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 25,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 26,
          length: 6
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

  it('I switch to try this ! in a { but in a while loop with in a switch { default clause', () => {
    t.deepEqual(
      recovery('I switch to try this ! in a { but in a while loop with in a switch { default clause', 'recovery.js'),
      {
        kind: 209,
        webCompat: true,
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
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
            type: 'SwitchStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'to',
              start: 8,
              end: 11,
              kind: 13,
              flags: 0
            },
            clauses: [],
            start: 1,
            end: 11,
            kind: 136,
            flags: 0
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,
              kind: 123,
              flags: 0
            },
            catchClause: null,
            finalizer: null,
            start: 11,
            end: 15,
            kind: 138,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ThisExpression',
              start: 15,
              end: 20,
              kind: 165,
              flags: 0
            },
            start: 15,
            end: 20,
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
                  name: '',
                  start: 22,
                  end: 22,
                  kind: 13,
                  flags: 2
                },
                start: 20,
                end: 22,
                kind: 160,
                flags: 0
              },
              operator: 'in',
              right: {
                type: 'IdentifierReference',
                name: 'a',
                start: 25,
                end: 27,
                kind: 13,
                flags: 0
              },
              start: 20,
              end: 27,
              kind: 155,
              flags: 0
            },
            start: 20,
            end: 27,
            kind: 122,
            flags: 0
          },
          {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'but',
                    start: 29,
                    end: 33,
                    kind: 13,
                    flags: 0
                  },
                  operator: 'in',
                  right: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 36,
                    end: 38,
                    kind: 13,
                    flags: 0
                  },
                  start: 29,
                  end: 38,
                  kind: 155,
                  flags: 0
                },
                start: 29,
                end: 38,
                kind: 122,
                flags: 0
              },
              {
                type: 'WhileStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'loop',
                  start: 44,
                  end: 49,
                  kind: 13,
                  flags: 0
                },
                statement: {
                  type: 'WithStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 54,
                      end: 54,
                      kind: 13,
                      flags: 2
                    },
                    operator: 'in',
                    right: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 57,
                      end: 59,
                      kind: 13,
                      flags: 0
                    },
                    start: 54,
                    end: 59,
                    kind: 155,
                    flags: 0
                  },
                  statement: {
                    type: 'SwitchStatement',
                    expression: {
                      type: 'ObjectLiteral',
                      properties: [
                        {
                          type: 'IdentifierReference',
                          name: 'default',
                          start: 68,
                          end: 76,
                          kind: 13,
                          flags: 0
                        },
                        {
                          type: 'IdentifierReference',
                          name: 'clause',
                          start: 76,
                          end: 83,
                          kind: 13,
                          flags: 0
                        }
                      ],
                      start: 66,
                      end: 83,
                      kind: 179,
                      flags: 0
                    },
                    clauses: [],
                    start: 59,
                    end: 83,
                    kind: 136,
                    flags: 0
                  },
                  start: 49,
                  end: 83,
                  kind: 128,
                  flags: 0
                },
                start: 38,
                end: 83,
                kind: 139,
                flags: 0
              }
            ],
            start: 27,
            end: 83,
            kind: 123,
            flags: 0
          }
        ],
        text: 'I switch to try this ! in a { but in a while loop with in a switch { default clause',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 2,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 9,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 12,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 16,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 21,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 23,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 28,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 39,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 45,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 50,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 55,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 60,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 67,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`,` expected',
            code: 5,
            start: 77,
            length: 6
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 83,
        end: 83
      }
    );
  });

  it('case {', () => {
    t.deepEqual(recovery('case {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
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
      text: 'case {',
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
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('switch switch default', () => {
    t.deepEqual(recovery('switch switch default', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 6,
            end: 6,
            kind: 13,
            flags: 2
          },
          clauses: [],
          start: 0,
          end: 6,
          kind: 136,
          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 13,
            end: 13,
            kind: 13,
            flags: 2
          },
          clauses: [
            {
              type: 'DefaultClause',
              leafs: [],
              start: 13,
              end: 21,
              kind: 142,
              flags: 0
            }
          ],
          start: 6,
          end: 21,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch switch default',
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
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 14,
          length: 7
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

  it('default{switch', () => {
    t.deepEqual(recovery('default{switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'SwitchStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,
                kind: 13,
                flags: 2
              },
              clauses: [],
              start: 8,
              end: 14,
              kind: 136,
              flags: 0
            }
          ],
          start: 7,
          end: 14,
          kind: 123,
          flags: 0
        }
      ],
      text: 'default{switch',
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
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 8,
          length: 6
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

  it('case{switch default', () => {
    t.deepEqual(recovery('case{switch default', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'SwitchStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,
                kind: 13,
                flags: 2
              },
              clauses: [
                {
                  type: 'DefaultClause',
                  leafs: [],
                  start: 11,
                  end: 19,
                  kind: 142,
                  flags: 0
                }
              ],
              start: 5,
              end: 19,
              kind: 136,
              flags: 0
            }
          ],
          start: 4,
          end: 19,
          kind: 123,
          flags: 0
        }
      ],
      text: 'case{switch default',
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
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 7
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

  it('switch( x ,, a! switch ! { default : yep ++', () => {
    t.deepEqual(recovery('switch( x ,, a! switch ! { default : yep ++', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 9,
                kind: 13,
                flags: 0
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
                name: 'a',
                start: 12,
                end: 14,
                kind: 13,
                flags: 0
              }
            ],
            start: 7,
            end: 14,
            kind: 147,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 14,
          kind: 136,
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
              start: 15,
              end: 15,
              kind: 13,
              flags: 2
            },
            start: 14,
            end: 15,
            kind: 160,
            flags: 0
          },
          start: 14,
          end: 15,
          kind: 122,
          flags: 0
        },
        {
          type: 'SwitchStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: 'default',
                    start: 26,
                    end: 34,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'PostfixUpdateExpression',
                    operator: '++',
                    operand: {
                      type: 'IdentifierReference',
                      name: 'yep',
                      start: 36,
                      end: 40,
                      kind: 13,
                      flags: 0
                    },
                    start: 40,
                    end: 43,
                    kind: 162,
                    flags: 0
                  },
                  start: 26,
                  end: 43,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 24,
              end: 43,
              kind: 179,
              flags: 0
            },
            start: 22,
            end: 43,
            kind: 160,
            flags: 0
          },
          clauses: [],
          start: 15,
          end: 43,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch( x ,, a! switch ! { default : yep ++',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 16,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 41,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 43,
      end: 43
    });
  });

  it('{ switch', () => {
    t.deepEqual(recovery('{ switch', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'SwitchStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              clauses: [],
              start: 1,
              end: 8,
              kind: 136,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ switch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('switch !', () => {
    t.deepEqual(recovery('switch !', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
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
          clauses: [],
          start: 0,
          end: 8,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch !',
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

  it('switch x { case y:', () => {
    t.deepEqual(recovery('switch x { case y:', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 6,
            end: 8,
            kind: 13,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'y',
                start: 15,
                end: 17,
                kind: 13,
                flags: 0
              },
              leafs: [],
              start: 10,
              end: 18,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 18,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch x { case y:',
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
          message: '`)` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('switch (x) { case: default !!', () => {
    t.deepEqual(recovery('switch (x) { case: default !!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9,
            kind: 13,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 17,
                end: 17,
                kind: 13,
                flags: 2
              },
              leafs: [],
              start: 12,
              end: 18,
              kind: 141,
              flags: 0
            },
            {
              type: 'DefaultClause',
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
                        start: 29,
                        end: 29,
                        kind: 13,
                        flags: 2
                      },
                      start: 28,
                      end: 29,
                      kind: 160,
                      flags: 0
                    },
                    start: 26,
                    end: 29,
                    kind: 160,
                    flags: 0
                  },
                  start: 26,
                  end: 29,
                  kind: 122,
                  flags: 0
                }
              ],
              start: 18,
              end: 29,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 29,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (x) { case: default !!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 27,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('switch x {  case :::', () => {
    t.deepEqual(recovery('switch x {  case :::', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 6,
            end: 8,
            kind: 13,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,
                kind: 13,
                flags: 2
              },
              leafs: [],
              start: 10,
              end: 18,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 18,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch x {  case :::',
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
          message: '`)` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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

  it('switch { case x: { !}', () => {
    t.deepEqual(recovery('switch { case x: { !}', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'case',
                start: 8,
                end: 13,
                kind: 13,
                flags: 0
              },
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 13,
                  end: 15,
                  kind: 13,
                  flags: 0
                },
                value: {
                  type: 'ObjectLiteral',
                  properties: [],
                  start: 16,
                  end: 18,
                  kind: 179,
                  flags: 0
                },
                start: 13,
                end: 18,
                kind: 227,
                flags: 0
              }
            ],
            start: 6,
            end: 18,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 18,
          kind: 136,
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
              start: 20,
              end: 20,
              kind: 13,
              flags: 2
            },
            start: 18,
            end: 20,
            kind: 160,
            flags: 0
          },
          start: 18,
          end: 20,
          kind: 122,
          flags: 0
        }
      ],
      text: 'switch { case x: { !}',
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
          message: '`,` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('switch (x) { case x: { !}', () => {
    t.deepEqual(recovery('switch (x) { case x: { !}', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'x',
            start: 8,
            end: 9,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: 'x',
                start: 17,
                end: 19,
                flags: 0
              },
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
                          start: 24,
                          end: 24,
                          flags: 2
                        },
                        start: 22,
                        end: 24,
                        kind: 160,
                        flags: 0
                      },
                      start: 22,
                      end: 24,
                      kind: 122,
                      flags: 0
                    }
                  ],
                  start: 20,
                  end: 25,
                  kind: 123,
                  flags: 0
                }
              ],
              start: 12,
              end: 25,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 25,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (x) { case x: { !}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 24,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('switch { case foo: default: bar }', () => {
    t.deepEqual(recovery('switch { case foo: default: bar }', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'case',
                start: 8,
                end: 13,
                kind: 13,
                flags: 0
              },
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'foo',
                  start: 13,
                  end: 17,
                  kind: 13,
                  flags: 0
                },
                value: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 18,
                  end: 18,
                  kind: 13,
                  flags: 2
                },
                start: 13,
                end: 18,
                kind: 227,
                flags: 0
              },
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'default',
                  start: 18,
                  end: 26,
                  kind: 13,
                  flags: 0
                },
                value: {
                  type: 'IdentifierReference',
                  name: 'bar',
                  start: 27,
                  end: 31,
                  kind: 13,
                  flags: 0
                },
                start: 18,
                end: 31,
                kind: 227,
                flags: 0
              }
            ],
            start: 6,
            end: 33,
            kind: 179,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 33,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch { case foo: default: bar }',
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
          message: '`,` expected',
          code: 5,
          start: 14,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('switch (f(a function(){} c);) { default x: { !}', () => {
    t.deepEqual(recovery('switch (f(a function(){} c);) { default x: { !}', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'f',
              start: 8,
              end: 9,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 10,
                end: 11,
                kind: 13,
                flags: 0
              },
              {
                type: 'FunctionExpression',
                name: null,
                generator: false,
                async: false,
                params: [],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 22,
                  end: 24,
                  kind: 184,
                  flags: 0
                },
                start: 11,
                end: 24,
                kind: 185,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'c',
                start: 24,
                end: 26,
                kind: 13,
                flags: 0
              }
            ],
            start: 8,
            end: 27,
            kind: 156,
            flags: 0
          },
          clauses: [],
          start: 0,
          end: 27,
          kind: 136,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 27,
          end: 28,
          kind: 148,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 29,
          end: 31,
          kind: 123,
          flags: 0
        },
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'x',
            start: 39,
            end: 42,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 46,
                    end: 46,
                    kind: 13,
                    flags: 2
                  },
                  start: 44,
                  end: 46,
                  kind: 160,
                  flags: 0
                },
                start: 44,
                end: 46,
                kind: 122,
                flags: 0
              }
            ],
            start: 42,
            end: 47,
            kind: 123,
            flags: 0
          },
          start: 39,
          end: 47,
          kind: 134,
          flags: 0
        }
      ],
      text: 'switch (f(a function(){} c);) { default x: { !}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 12,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 27,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 28,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 32,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 46,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 47,
      end: 47
    });
  });

  it('switch (x) { default x: { !}', () => {
    t.deepEqual(recovery('switch (x) { default x: { !}', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9,
            kind: 13,
            flags: 0
          },
          clauses: [
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'x',
                    start: 20,
                    end: 23,
                    kind: 13,
                    flags: 0
                  },
                  labelledItem: {
                    type: 'BlockStatement',
                    leafs: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'UnaryExpression',
                          operator: '!',
                          operand: {
                            type: 'IdentifierReference',
                            name: '',
                            start: 27,
                            end: 27,
                            kind: 13,
                            flags: 2
                          },
                          start: 25,
                          end: 27,
                          kind: 160,
                          flags: 0
                        },
                        start: 25,
                        end: 27,
                        kind: 122,
                        flags: 0
                      }
                    ],
                    start: 23,
                    end: 28,
                    kind: 123,
                    flags: 0
                  },
                  start: 20,
                  end: 28,
                  kind: 134,
                  flags: 0
                }
              ],
              start: 12,
              end: 28,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 28,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (x) { default x: { !}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 27,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      end: 28
    });
  });
});
