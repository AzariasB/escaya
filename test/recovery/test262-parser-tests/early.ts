import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('test262-parser-tests - early tests', () => {
  it('!{ *a(b, b){} };', () => {
    t.deepEqual(recovery('!{ *a(b, b){} };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: true,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: 'b',
                      start: 6,
                      end: 7,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'b',
                      start: 8,
                      end: 10,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 5,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 11,
                    end: 13,
                    kind: 184,
                    flags: 0
                  },
                  start: 5,
                  end: 13,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 15,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ *a(b, b){} };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('({ a(eval) { "use strict"; } });', () => {
    t.deepEqual(recovery('({ a(eval) { "use strict"; } });', 'recovery.js'), {
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
                      name: 'eval',
                      start: 5,
                      end: 9,
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
                    leafs: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'StringLiteral',
                          value: 'use strict',
                          start: 12,
                          end: 25,
                          kind: 12,
                          flags: 0
                        },
                        start: 12,
                        end: 26,
                        kind: 122,
                        flags: 0
                      }
                    ],
                    start: 10,
                    end: 28,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 28,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 30,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 31,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 32,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a(eval) { "use strict"; } });',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 32,
      end: 32
    });
  });

  it('for (let let of a);', () => {
    t.deepEqual(recovery('for (let let of a);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForAwaitStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 8,
                  end: 12,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 12,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 12,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 18,
            end: 19,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 129,
          flags: 0
        }
      ],
      text: 'for (let let of a);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 9,
          length: 3
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

  it('function* a(){ function* b({[yield]: c}){} }', () => {
    t.deepEqual(recovery('function* a(){ function* b({[yield]: c}){} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'b',
                  start: 24,
                  end: 26,
                  kind: 168,
                  flags: 0
                },
                generator: true,
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
                              type: 'YieldExpression',
                              delegate: false,
                              argument: null,
                              start: 29,
                              end: 34,
                              kind: 193,
                              flags: 0
                            },
                            start: 28,
                            end: 35,
                            kind: 171,
                            flags: 0
                          },
                          value: {
                            type: 'BindingIdentifier',
                            name: 'c',
                            start: 36,
                            end: 38,
                            kind: 168,
                            flags: 0
                          },
                          start: 28,
                          end: 38,
                          kind: 227,
                          flags: 0
                        }
                      ],
                      start: 27,
                      end: 39,
                      kind: 169,
                      flags: 0
                    },
                    right: null,
                    start: 27,
                    end: 39,
                    kind: 172,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 40,
                  end: 42,
                  kind: 184,
                  flags: 0
                },
                start: 14,
                end: 42,
                kind: 186,
                flags: 0
              }
            ],
            start: 13,
            end: 44,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 44,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* a(){ function* b({[yield]: c}){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`Yield` expression not allowed in formal parameters',
          code: 24,
          start: 29,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 44,
      end: 44
    });
  });

  it('for(([0]) in 0);', () => {
    t.deepEqual(recovery('for(([0]) in 0);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrayLiteral',
              kind: 178,
              elements: [
                {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 6,
                  end: 7,
                  kind: 10,
                  flags: 0
                }
              ],
              start: 5,
              end: 8,
              flags: 0
            },
            start: 4,
            end: 9,
            kind: 189,
            flags: 0
          },
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 12,
            end: 14,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 15,
            end: 16,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for(([0]) in 0);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('for(const {a, a} of 1);', () => {
    t.deepEqual(recovery('for(const {a, a} of 1);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForAwaitStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 11,
                      end: 12,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 13,
                      end: 15,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  start: 9,
                  end: 16,
                  kind: 169,
                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 16,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 16,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 19,
            end: 21,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 129,
          flags: 0
        }
      ],
      text: 'for(const {a, a} of 1);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('for (let let in a);', () => {
    t.deepEqual(recovery('for (let let in a);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 8,
                  end: 12,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 12,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 12,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 18,
            end: 19,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for (let let in a);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 9,
          length: 3
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

  it('"use strict"; function static() { }', () => {
    t.deepEqual(recovery('"use strict"; function static() { }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'static',
            start: 22,
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
            end: 35,
            kind: 184,
            flags: 0
          },
          start: 13,
          end: 35,
          kind: 186,
          flags: 0
        }
      ],
      text: '"use strict"; function static() { }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 35,
      end: 35
    });
  });

  it('(a) => { const a = 1; }', () => {
    t.deepEqual(recovery('(a) => { const a = 1; }', 'recovery.js'), {
      kind: 209,
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
                end: 2,
                kind: 13,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: true,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 14,
                        end: 16,
                        kind: 168,
                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',
                        value: 1,
                        start: 18,
                        end: 20,
                        kind: 10,
                        flags: 0
                      },
                      start: 14,
                      end: 20,
                      kind: 146,
                      flags: 0
                    }
                  ],
                  start: 8,
                  end: 21,
                  kind: 145,
                  flags: 0
                }
              ],
              start: 6,
              end: 23,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 0,
            end: 23,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('class a extends b { c() { !function* (c = super.d()){} } }', () => {
    t.deepEqual(recovery('class a extends b { c() { !function* (c = super.d()){} } }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
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
                  name: 'c',
                  start: 19,
                  end: 21,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'UnaryExpression',
                        operator: '!',
                        operand: {
                          type: 'FunctionExpression',
                          name: null,
                          generator: true,
                          async: false,
                          params: [
                            {
                              type: 'BindingElement',
                              left: {
                                type: 'BindingIdentifier',
                                name: 'c',
                                start: 38,
                                end: 39,
                                kind: 168,
                                flags: 0
                              },
                              right: {
                                type: 'CallExpression',
                                expression: {
                                  type: 'SuperProperty',
                                  expression: null,
                                  name: {
                                    type: 'IdentifierName',
                                    name: 'd',
                                    start: 48,
                                    end: 49,
                                    kind: 13,
                                    flags: 0
                                  },
                                  start: 41,
                                  end: 49,
                                  kind: 192,
                                  flags: 0
                                },
                                arguments: [],
                                start: 41,
                                end: 51,
                                kind: 156,
                                flags: 0
                              },
                              start: 38,
                              end: 51,
                              kind: 172,
                              flags: 0
                            }
                          ],
                          contents: {
                            type: 'FunctionBody',
                            directives: [],
                            leafs: [],
                            start: 52,
                            end: 54,
                            kind: 184,
                            flags: 0
                          },
                          start: 27,
                          end: 54,
                          kind: 185,
                          flags: 0
                        },
                        start: 25,
                        end: 54,
                        kind: 160,
                        flags: 0
                      },
                      start: 25,
                      end: 54,
                      kind: 122,
                      flags: 0
                    }
                  ],
                  start: 23,
                  end: 56,
                  kind: 184,
                  flags: 0
                },
                start: 21,
                end: 56,
                kind: 182,
                flags: 0
              },
              start: 19,
              end: 56,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 58,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class a extends b { c() { !function* (c = super.d()){} } }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Member access on super must be in a method',
          code: 31,
          start: 47,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 58,
      end: 58
    });
  });

  it('function a() { "use strict"; var private; }', () => {
    t.deepEqual(recovery('function a() { "use strict"; var private; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 14,
                  end: 27,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 122,
                flags: 0
              },
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'private',
                      start: 32,
                      end: 40,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 32,
                    end: 40,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 28,
                end: 41,
                kind: 143,
                flags: 0
              }
            ],
            start: 12,
            end: 43,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 43,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a() { "use strict"; var private; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 43,
      end: 43
    });
  });

  it('"use strict"; yield:;', () => {
    t.deepEqual(recovery('"use strict"; yield:;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
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
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'yield',
              start: 13,
              end: 20,
              kind: 13,
              flags: 0
            },
            labelledItem: {
              type: 'EmptyStatement',
              start: 20,
              end: 21,
              kind: 148,
              flags: 0
            },
            start: 13,
            end: 21,
            kind: 134,
            flags: 0
          },
          start: 13,
          end: 21,
          kind: 122,
          flags: 0
        }
      ],
      text: '"use strict"; yield:;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('"use strict"; var yield;', () => {
    t.deepEqual(recovery('"use strict"; var yield;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'yield',
                start: 17,
                end: 23,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 17,
              end: 23,
              kind: 144,
              flags: 0
            }
          ],
          start: 13,
          end: 24,
          kind: 143,
          flags: 0
        }
      ],
      text: '"use strict"; var yield;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('class a extends b { c() { !function* (){ super.d(); } } }', () => {
    t.deepEqual(recovery('class a extends b { c() { !function* (){ super.d(); } } }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
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
                  name: 'c',
                  start: 19,
                  end: 21,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'UnaryExpression',
                        operator: '!',
                        operand: {
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
                                  type: 'CallExpression',
                                  expression: {
                                    type: 'SuperProperty',
                                    expression: null,
                                    name: {
                                      type: 'IdentifierName',
                                      name: 'd',
                                      start: 47,
                                      end: 48,
                                      kind: 13,
                                      flags: 0
                                    },
                                    start: 40,
                                    end: 48,
                                    kind: 192,
                                    flags: 0
                                  },
                                  arguments: [],
                                  start: 40,
                                  end: 50,
                                  kind: 156,
                                  flags: 0
                                },
                                start: 40,
                                end: 51,
                                kind: 122,
                                flags: 0
                              }
                            ],
                            start: 39,
                            end: 53,
                            kind: 184,
                            flags: 0
                          },
                          start: 27,
                          end: 53,
                          kind: 185,
                          flags: 0
                        },
                        start: 25,
                        end: 53,
                        kind: 160,
                        flags: 0
                      },
                      start: 25,
                      end: 53,
                      kind: 122,
                      flags: 0
                    }
                  ],
                  start: 23,
                  end: 55,
                  kind: 184,
                  flags: 0
                },
                start: 21,
                end: 55,
                kind: 182,
                flags: 0
              },
              start: 19,
              end: 55,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 57,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class a extends b { c() { !function* (){ super.d(); } } }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Member access on super must be in a method',
          code: 31,
          start: 46,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 57,
      end: 57
    });
  });

  it('!{ a(){ let b; var b; } };', () => {
    t.deepEqual(recovery('!{ a(){ let b; var b; } };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
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
                    leafs: [
                      {
                        type: 'LexicalDeclaration',
                        isConst: false,
                        declarations: [
                          {
                            type: 'LexicalBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 11,
                              end: 13,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 11,
                            end: 13,
                            kind: 146,
                            flags: 0
                          }
                        ],
                        start: 7,
                        end: 14,
                        kind: 145,
                        flags: 0
                      },
                      {
                        type: 'VariableStatement',
                        declarations: [
                          {
                            type: 'VariableDeclaration',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 18,
                              end: 20,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,
                            kind: 144,
                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,
                        kind: 143,
                        flags: 0
                      }
                    ],
                    start: 6,
                    end: 23,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 23,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 25,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 25,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ a(){ let b; var b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('switch (a) { default: continue; }', () => {
    t.deepEqual(recovery('switch (a) { default: continue; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
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
                  type: 'ContinueStatement',
                  label: null,
                  start: 21,
                  end: 31,
                  kind: 125,
                  flags: 0
                }
              ],
              start: 12,
              end: 31,
              kind: 142,
              flags: 0
            }
          ],
          start: 0,
          end: 33,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch (a) { default: continue; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `continue` statement can only be used within an enclosing iteration statement',
          code: 42,
          start: 22,
          length: 8
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

  it('var a = super();', () => {
    t.deepEqual(recovery('var a = super();', 'recovery.js'), {
      kind: 209,
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
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'SuperCall',
                arguments: [],
                start: 7,
                end: 15,
                kind: 191,
                flags: 0
              },
              start: 3,
              end: 15,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 16,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var a = super();',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message:
            'Calls to super must be in the "constructor" method of a class expression or class declaration that has a super class',
          code: 32,
          start: 13,
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

  it('class a { static b(c, c){} }', () => {
    t.deepEqual(recovery('class a { static b(c, c){} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [
            {
              type: 'ClassElement',
              static: true,
              method: {
                type: 'MethodDefinition',
                async: false,
                generator: false,
                propertySetParameterList: [],
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 19,
                    end: 20,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 21,
                    end: 23,
                    kind: 168,
                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'b',
                  start: 16,
                  end: 18,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 24,
                  end: 26,
                  kind: 184,
                  flags: 0
                },
                start: 18,
                end: 26,
                kind: 182,
                flags: 0
              },
              start: 16,
              end: 26,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 28,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class a { static b(c, c){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      end: 28
    });
  });

  it('continue;', () => {
    t.deepEqual(recovery('continue;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ContinueStatement',
          label: null,
          start: 0,
          end: 9,
          kind: 125,
          flags: 0
        }
      ],
      text: 'continue;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `continue` statement can only be used within an enclosing iteration statement',
          code: 42,
          start: 0,
          length: 8
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

  it('!{ a(){ let b; let b; } };', () => {
    t.deepEqual(recovery('!{ a(){ let b; let b; } };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
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
                    leafs: [
                      {
                        type: 'LexicalDeclaration',
                        isConst: false,
                        declarations: [
                          {
                            type: 'LexicalBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 11,
                              end: 13,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 11,
                            end: 13,
                            kind: 146,
                            flags: 0
                          }
                        ],
                        start: 7,
                        end: 14,
                        kind: 145,
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
                              name: 'b',
                              start: 18,
                              end: 20,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,
                            kind: 146,
                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,
                        kind: 145,
                        flags: 0
                      }
                    ],
                    start: 6,
                    end: 23,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 23,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 25,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 25,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ a(){ let b; let b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('for(const a = 1;;) { var a; }', () => {
    t.deepEqual(recovery('for(const a = 1;;) { var a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 9,
                  end: 11,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 13,
                  end: 15,
                  kind: 10,
                  flags: 0
                },
                start: 9,
                end: 15,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 15,
            kind: 201,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 24,
                      end: 26,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 24,
                    end: 26,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 20,
                end: 27,
                kind: 143,
                flags: 0
              }
            ],
            start: 18,
            end: 29,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 29,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(const a = 1;;) { var a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 29,
      end: 29
    });
  });

  it('function a() { "use strict"; function b(arguments) {} }', () => {
    t.deepEqual(recovery('function a() { "use strict"; function b(arguments) {} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 14,
                  end: 27,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 122,
                flags: 0
              },
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'b',
                  start: 37,
                  end: 39,
                  kind: 168,
                  flags: 0
                },
                generator: false,
                async: false,
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'arguments',
                    start: 40,
                    end: 49,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 50,
                  end: 53,
                  kind: 184,
                  flags: 0
                },
                start: 28,
                end: 53,
                kind: 186,
                flags: 0
              }
            ],
            start: 12,
            end: 55,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 55,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a() { "use strict"; function b(arguments) {} }',
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

  it('"use strict"; delete (a);', () => {
    t.deepEqual(recovery('"use strict"; delete (a);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
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
            operator: 'delete',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 22,
                end: 23,
                kind: 13,
                flags: 0
              },
              start: 20,
              end: 24,
              kind: 189,
              flags: 0
            },
            start: 13,
            end: 24,
            kind: 160,
            flags: 0
          },
          start: 13,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: '"use strict"; delete (a);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('(((...a)))', () => {
    t.deepEqual(recovery('(((...a)))', 'recovery.js'), {
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
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 6,
                      end: 7,
                      kind: 168,
                      flags: 0
                    },
                    start: 3,
                    end: 7,
                    kind: 175,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 9,
                    end: 9,
                    kind: 13,
                    flags: 2
                  },
                  start: 8,
                  end: 9,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 2,
                end: 9,
                kind: 188,
                flags: 0
              },
              start: 1,
              end: 10,
              kind: 189,
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
      text: '(((...a)))',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
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

  it('{ const a; }', () => {
    t.deepEqual(recovery('{ const a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 7,
                    end: 9,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 7,
                  end: 9,
                  kind: 146,
                  flags: 0
                }
              ],
              start: 1,
              end: 10,
              kind: 145,
              flags: 0
            }
          ],
          start: 0,
          end: 12,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ const a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'A destructuring declaration must have an initializer',
          code: 45,
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

  it('function* a(){ ({b = yield}) => 1; }', () => {
    t.deepEqual(recovery('function* a(){ ({b = yield}) => 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
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
                  type: 'ArrowFunction',
                  params: [
                    {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingElement',
                          left: {
                            type: 'IdentifierName',
                            name: 'b',
                            start: 17,
                            end: 20,
                            kind: 13,
                            flags: 0
                          },
                          right: {
                            type: 'YieldExpression',
                            delegate: false,
                            argument: null,
                            start: 20,
                            end: 26,
                            kind: 193,
                            flags: 0
                          },
                          start: 17,
                          end: 26,
                          kind: 181,
                          flags: 0
                        }
                      ],
                      start: 16,
                      end: 27,
                      kind: 179,
                      flags: 0
                    }
                  ],
                  contents: {
                    type: 'ConciseBody',
                    expression: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 31,
                      end: 33,
                      kind: 10,
                      flags: 0
                    },
                    start: 31,
                    end: 33,
                    kind: 187,
                    flags: 0
                  },
                  async: false,
                  start: 14,
                  end: 33,
                  kind: 188,
                  flags: 0
                },
                start: 14,
                end: 34,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 36,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 36,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* a(){ ({b = yield}) => 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 36,
      end: 36
    });
  });

  it('{ function a(){} function a(){} }', () => {
    t.deepEqual(recovery('{ function a(){} function a(){} }', 'recovery.js'), {
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
                name: 'a',
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
            },
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 25,
                end: 27,
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
                start: 29,
                end: 31,
                kind: 184,
                flags: 0
              },
              start: 16,
              end: 31,
              kind: 186,
              flags: 0
            }
          ],
          start: 0,
          end: 33,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ function a(){} function a(){} }',
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

  it('function a(){ c: while(1) continue b; }', () => {
    t.deepEqual(recovery('function a(){ c: while(1) continue b; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'c',
                    start: 13,
                    end: 16,
                    kind: 13,
                    flags: 0
                  },
                  labelledItem: {
                    type: 'WhileStatement',
                    expression: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 23,
                      end: 24,
                      kind: 10,
                      flags: 0
                    },
                    statement: {
                      type: 'ContinueStatement',
                      label: {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 34,
                        end: 36,
                        kind: 13,
                        flags: 0
                      },
                      start: 25,
                      end: 37,
                      kind: 125,
                      flags: 0
                    },
                    start: 16,
                    end: 37,
                    kind: 139,
                    flags: 0
                  },
                  start: 13,
                  end: 37,
                  kind: 134,
                  flags: 0
                },
                start: 13,
                end: 37,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 39,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 39,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a(){ c: while(1) continue b; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 39,
      end: 39
    });
  });

  it('/./\\u0069', () => {
    t.deepEqual(recovery('/./\\u0069', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '.',
            flag: '',
            start: 0,
            end: 3,
            kind: 15,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'i',
            start: 3,
            end: 9,
            kind: 13,
            flags: 0
          },
          start: 3,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '/./\\u0069',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('for(const {a, a} in 1);', () => {
    t.deepEqual(recovery('for(const {a, a} in 1);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 11,
                      end: 12,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 13,
                      end: 15,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  start: 9,
                  end: 16,
                  kind: 169,
                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 16,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 16,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 19,
            end: 21,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for(const {a, a} in 1);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('([a]) => { const a = 1; }', () => {
    t.deepEqual(recovery('([a]) => { const a = 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'ArrayBindingPattern',
                kind: 178,
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 2,
                    end: 3,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 4,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: true,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 16,
                        end: 18,
                        kind: 168,
                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',
                        value: 1,
                        start: 20,
                        end: 22,
                        kind: 10,
                        flags: 0
                      },
                      start: 16,
                      end: 22,
                      kind: 146,
                      flags: 0
                    }
                  ],
                  start: 10,
                  end: 23,
                  kind: 145,
                  flags: 0
                }
              ],
              start: 8,
              end: 25,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 0,
            end: 25,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: '([a]) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('function* a(){ ({ *b(c = d + e(yield)){} }); }', () => {
    t.deepEqual(recovery('function* a(){ ({ *b(c = d + e(yield)){} }); }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
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
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ObjectLiteral',
                    properties: [
                      {
                        type: 'MethodDefinition',
                        async: false,
                        generator: true,
                        propertySetParameterList: [],
                        uniqueFormalParameters: [
                          {
                            type: 'BindingElement',
                            left: {
                              type: 'BindingIdentifier',
                              name: 'c',
                              start: 21,
                              end: 22,
                              kind: 168,
                              flags: 0
                            },
                            right: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'IdentifierReference',
                                name: 'd',
                                start: 24,
                                end: 26,
                                kind: 13,
                                flags: 0
                              },
                              operator: '+',
                              right: {
                                type: 'CallExpression',
                                expression: {
                                  type: 'IdentifierReference',
                                  name: 'e',
                                  start: 28,
                                  end: 30,
                                  kind: 13,
                                  flags: 0
                                },
                                arguments: [
                                  {
                                    type: 'YieldExpression',
                                    delegate: false,
                                    argument: null,
                                    start: 31,
                                    end: 36,
                                    kind: 193,
                                    flags: 0
                                  }
                                ],
                                start: 28,
                                end: 37,
                                kind: 156,
                                flags: 0
                              },
                              start: 24,
                              end: 37,
                              kind: 155,
                              flags: 0
                            },
                            start: 21,
                            end: 37,
                            kind: 172,
                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 17,
                          end: 20,
                          kind: 13,
                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 38,
                          end: 40,
                          kind: 184,
                          flags: 0
                        },
                        start: 20,
                        end: 40,
                        kind: 182,
                        flags: 0
                      }
                    ],
                    start: 16,
                    end: 42,
                    kind: 179,
                    flags: 0
                  },
                  start: 14,
                  end: 43,
                  kind: 189,
                  flags: 0
                },
                start: 14,
                end: 44,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 46,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 46,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* a(){ ({ *b(c = d + e(yield)){} }); }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`Yield` expression not allowed in formal parameters',
          code: 24,
          start: 31,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 46,
      end: 46
    });
  });

  it('function a() { "use strict"; interface = 1; }', () => {
    t.deepEqual(recovery('function a() { "use strict"; interface = 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 14,
                  end: 27,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'interface',
                    start: 28,
                    end: 38,
                    kind: 13,
                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 40,
                    end: 42,
                    kind: 10,
                    flags: 0
                  },
                  start: 28,
                  end: 42,
                  kind: 152,
                  flags: 0
                },
                start: 28,
                end: 43,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 45,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 45,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a() { "use strict"; interface = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 45,
      end: 45
    });
  });

  it('{ var a; const a = 1; }', () => {
    t.deepEqual(recovery('{ var a; const a = 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                    name: 'a',
                    start: 5,
                    end: 7,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 143,
              flags: 0
            },
            {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 14,
                    end: 16,
                    kind: 168,
                    flags: 0
                  },
                  initializer: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 18,
                    end: 20,
                    kind: 10,
                    flags: 0
                  },
                  start: 14,
                  end: 20,
                  kind: 146,
                  flags: 0
                }
              ],
              start: 8,
              end: 21,
              kind: 145,
              flags: 0
            }
          ],
          start: 0,
          end: 23,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ var a; const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('for(const a;;);', () => {
    t.deepEqual(recovery('for(const a;;);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 9,
                  end: 11,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 11,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 11,
            kind: 201,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 14,
            end: 15,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(const a;;);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'A destructuring declaration must have an initializer',
          code: 45,
          start: 11,
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

  it('({get a(){}} = 0)', () => {
    t.deepEqual(recovery('({get a(){}} = 0)', 'recovery.js'), {
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
                    type: 'MethodDefinition',
                    async: false,
                    generator: false,
                    propertySetParameterList: [],
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 5,
                      end: 7,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 9,
                      end: 11,
                      kind: 184,
                      flags: 0
                    },
                    start: 7,
                    end: 11,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 1,
                end: 14,
                kind: 211,
                flags: 0
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 14,
                end: 16,
                kind: 10,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 213,
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
      text: '({get a(){}} = 0)',
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

  it('function* a(){ (b = yield* c) => 1; }', () => {
    t.deepEqual(recovery('function* a(){ (b = yield* c) => 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
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
                  type: 'ArrowFunction',
                  params: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 16,
                        end: 17,
                        kind: 13,
                        flags: 0
                      },
                      right: {
                        type: 'YieldExpression',
                        delegate: true,
                        argument: {
                          type: 'IdentifierReference',
                          name: 'c',
                          start: 26,
                          end: 28,
                          kind: 13,
                          flags: 0
                        },
                        start: 19,
                        end: 28,
                        kind: 193,
                        flags: 0
                      },
                      start: 16,
                      end: 28,
                      kind: 152,
                      flags: 0
                    }
                  ],
                  contents: {
                    type: 'ConciseBody',
                    expression: {
                      type: 'NumericLiteral',
                      value: 1,
                      start: 32,
                      end: 34,
                      kind: 10,
                      flags: 0
                    },
                    start: 32,
                    end: 34,
                    kind: 187,
                    flags: 0
                  },
                  async: false,
                  start: 14,
                  end: 34,
                  kind: 188,
                  flags: 0
                },
                start: 14,
                end: 35,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 37,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 37,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* a(){ (b = yield* c) => 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it('for({a: 0} of 0);', () => {
    t.deepEqual(recovery('for({a: 0} of 0);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForAwaitStatement',
          initializer: {
            type: 'ObjectAssignmentPattern',
            properties: [
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 5,
                  end: 7,
                  kind: 13,
                  flags: 0
                },
                value: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 7,
                  end: 9,
                  kind: 10,
                  flags: 0
                },
                start: 5,
                end: 9,
                kind: 227,
                flags: 0
              }
            ],
            start: 4,
            end: 10,
            kind: 179,
            flags: 0
          },
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 13,
            end: 15,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 16,
            end: 17,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 131,
          flags: 0
        }
      ],
      text: 'for({a: 0} of 0);',
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

  it('b: break a;', () => {
    t.deepEqual(recovery('b: break a;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'b',
              start: 0,
              end: 2,
              kind: 13,
              flags: 0
            },
            labelledItem: {
              type: 'BreakStatement',
              label: {
                type: 'IdentifierReference',
                name: 'a',
                start: 8,
                end: 10,
                kind: 13,
                flags: 0
              },
              start: 2,
              end: 11,
              kind: 124,
              flags: 0
            },
            start: 0,
            end: 11,
            kind: 134,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'b: break a;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('(a, ...b)', () => {
    t.deepEqual(recovery('(a, ...b)', 'recovery.js'), {
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
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'BindingIdentifier',
                    name: 'b',
                    start: 7,
                    end: 8,
                    kind: 168,
                    flags: 0
                  },
                  start: 3,
                  end: 8,
                  kind: 175,
                  flags: 0
                }
              ],
              start: 0,
              end: 8,
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
      text: '(a, ...b)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('__proto__: __proto__: 1;', () => {
    t.deepEqual(recovery('__proto__: __proto__: 1;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: '__proto__',
              start: 0,
              end: 10,
              kind: 13,
              flags: 0
            },
            labelledItem: {
              type: 'ExpressionStatement',
              expression: {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: '__proto__',
                  start: 10,
                  end: 21,
                  kind: 13,
                  flags: 0
                },
                labelledItem: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 21,
                    end: 23,
                    kind: 10,
                    flags: 0
                  },
                  start: 21,
                  end: 24,
                  kind: 122,
                  flags: 0
                },
                start: 10,
                end: 24,
                kind: 134,
                flags: 0
              },
              start: 10,
              end: 24,
              kind: 122,
              flags: 0
            },
            start: 0,
            end: 24,
            kind: 134,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: '__proto__: __proto__: 1;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('switch(1) { case 2: !function(){ break; }; }', () => {
    t.deepEqual(recovery('switch(1) { case 2: !function(){ break; }; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 7,
            end: 8,
            kind: 10,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 2,
                start: 16,
                end: 18,
                kind: 10,
                flags: 0
              },
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'UnaryExpression',
                    operator: '!',
                    operand: {
                      type: 'FunctionExpression',
                      name: null,
                      generator: false,
                      async: false,
                      params: [],
                      contents: {
                        type: 'FunctionBody',
                        directives: [],
                        leafs: [
                          {
                            type: 'BreakStatement',
                            label: null,
                            start: 32,
                            end: 39,
                            kind: 124,
                            flags: 0
                          }
                        ],
                        start: 31,
                        end: 41,
                        kind: 184,
                        flags: 0
                      },
                      start: 21,
                      end: 41,
                      kind: 185,
                      flags: 0
                    },
                    start: 19,
                    end: 41,
                    kind: 160,
                    flags: 0
                  },
                  start: 19,
                  end: 42,
                  kind: 122,
                  flags: 0
                }
              ],
              start: 11,
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
      text: 'switch(1) { case 2: !function(){ break; }; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
          start: 38,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 44,
      end: 44
    });
  });

  it('switch(1) { case 2: let a; case 3: let a; }', () => {
    t.deepEqual(recovery('switch(1) { case 2: let a; case 3: let a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 7,
            end: 8,
            kind: 10,
            flags: 0
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 2,
                start: 16,
                end: 18,
                kind: 10,
                flags: 0
              },
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: false,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 23,
                        end: 25,
                        kind: 168,
                        flags: 0
                      },
                      initializer: null,
                      start: 23,
                      end: 25,
                      kind: 146,
                      flags: 0
                    }
                  ],
                  start: 19,
                  end: 26,
                  kind: 145,
                  flags: 0
                }
              ],
              start: 11,
              end: 26,
              kind: 141,
              flags: 0
            },
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 3,
                start: 31,
                end: 33,
                kind: 10,
                flags: 0
              },
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: false,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 38,
                        end: 40,
                        kind: 168,
                        flags: 0
                      },
                      initializer: null,
                      start: 38,
                      end: 40,
                      kind: 146,
                      flags: 0
                    }
                  ],
                  start: 34,
                  end: 41,
                  kind: 145,
                  flags: 0
                }
              ],
              start: 26,
              end: 41,
              kind: 141,
              flags: 0
            }
          ],
          start: 0,
          end: 43,
          kind: 136,
          flags: 0
        }
      ],
      text: 'switch(1) { case 2: let a; case 3: let a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 43,
      end: 43
    });
  });

  it('if(1) break;', () => {
    t.deepEqual(recovery('if(1) break;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 3,
            end: 4,
            kind: 10,
            flags: 0
          },
          consequent: {
            type: 'BreakStatement',
            label: null,
            start: 5,
            end: 12,
            kind: 124,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 12,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(1) break;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
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

  it('for(let a in b) d: function c(){}', () => {
    t.deepEqual(recovery('for(let a in b) d: function c(){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 7,
                  end: 9,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 9,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 12,
            end: 14,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'LabelledStatement',
              label: {
                type: 'LabelIdentifier',
                name: 'd',
                start: 15,
                end: 18,
                kind: 13,
                flags: 0
              },
              labelledItem: {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'c',
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
              },
              start: 15,
              end: 33,
              kind: 134,
              flags: 0
            },
            start: 15,
            end: 33,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 33,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for(let a in b) d: function c(){}',
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

  it('if(1) c: b: function a(){}', () => {
    t.deepEqual(recovery('if(1) c: b: function a(){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 3,
            end: 4,
            kind: 10,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'LabelledStatement',
              label: {
                type: 'LabelIdentifier',
                name: 'c',
                start: 5,
                end: 8,
                kind: 13,
                flags: 0
              },
              labelledItem: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'b',
                    start: 8,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  labelledItem: {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 20,
                      end: 22,
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
                      start: 24,
                      end: 26,
                      kind: 184,
                      flags: 0
                    },
                    start: 11,
                    end: 26,
                    kind: 186,
                    flags: 0
                  },
                  start: 8,
                  end: 26,
                  kind: 134,
                  flags: 0
                },
                start: 8,
                end: 26,
                kind: 122,
                flags: 0
              },
              start: 5,
              end: 26,
              kind: 134,
              flags: 0
            },
            start: 5,
            end: 26,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 26,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(1) c: b: function a(){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('(class static {})', () => {
    t.deepEqual(recovery('(class static {})', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ClassExpression',
              name: {
                type: 'BindingIdentifier',
                name: '',
                start: 6,
                end: 13,
                kind: 168,
                flags: 0
              },
              heritage: null,
              elements: [],
              start: 1,
              end: 16,
              kind: 149,
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
      text: '(class static {})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 7,
          length: 6
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

  it('while(1) !function(){ continue; };', () => {
    t.deepEqual(recovery('while(1) !function(){ continue; };', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 6,
            end: 7,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'FunctionExpression',
                name: null,
                generator: false,
                async: false,
                params: [],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [
                    {
                      type: 'ContinueStatement',
                      label: null,
                      start: 21,
                      end: 31,
                      kind: 125,
                      flags: 0
                    }
                  ],
                  start: 20,
                  end: 33,
                  kind: 184,
                  flags: 0
                },
                start: 10,
                end: 33,
                kind: 185,
                flags: 0
              },
              start: 8,
              end: 33,
              kind: 160,
              flags: 0
            },
            start: 8,
            end: 34,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 34,
          kind: 139,
          flags: 0
        }
      ],
      text: 'while(1) !function(){ continue; };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `continue` statement can only be used within an enclosing iteration statement',
          code: 42,
          start: 22,
          length: 8
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 34,
      end: 34
    });
  });

  it('{ var a; let a; }', () => {
    t.deepEqual(recovery('{ var a; let a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
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
                    name: 'a',
                    start: 5,
                    end: 7,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 143,
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
                    start: 12,
                    end: 14,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 12,
                  end: 14,
                  kind: 146,
                  flags: 0
                }
              ],
              start: 8,
              end: 15,
              kind: 145,
              flags: 0
            }
          ],
          start: 0,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ var a; let a; }',
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

  it('super()', () => {
    t.deepEqual(recovery('super()', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SuperCall',
            arguments: [],
            start: 0,
            end: 7,
            kind: 191,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'super()',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message:
            'Calls to super must be in the "constructor" method of a class expression or class declaration that has a super class',
          code: 32,
          start: 5,
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

  it('({ get __proto(){}, "__proto__": null, __proto__: null, })', () => {
    t.deepEqual(recovery('({ get __proto(){}, "__proto__": null, __proto__: null, })', 'recovery.js'), {
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
                    name: '__proto',
                    start: 6,
                    end: 14,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 16,
                    end: 18,
                    kind: 184,
                    flags: 0
                  },
                  start: 14,
                  end: 18,
                  kind: 182,
                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'StringLiteral',
                    value: '__proto__',
                    start: 19,
                    end: 31,
                    kind: 12,
                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 32,
                    end: 37,
                    kind: 164,
                    flags: 0
                  },
                  start: 19,
                  end: 37,
                  kind: 227,
                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: '__proto__',
                    start: 38,
                    end: 49,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 49,
                    end: 54,
                    kind: 164,
                    flags: 0
                  },
                  start: 38,
                  end: 54,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 1,
              end: 57,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 58,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 58,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ get __proto(){}, "__proto__": null, __proto__: null, })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 58,
      end: 58
    });
  });

  it('(function({a: b}, {c: b}){})', () => {
    t.deepEqual(recovery('(function({a: b}, {c: b}){})', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
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
                        type: 'PropertyName',
                        key: {
                          type: 'IdentifierName',
                          name: 'a',
                          start: 11,
                          end: 13,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'BindingIdentifier',
                          name: 'b',
                          start: 13,
                          end: 15,
                          kind: 168,
                          flags: 0
                        },
                        start: 11,
                        end: 15,
                        kind: 227,
                        flags: 0
                      }
                    ],
                    start: 10,
                    end: 16,
                    kind: 169,
                    flags: 0
                  },
                  right: null,
                  start: 10,
                  end: 16,
                  kind: 172,
                  flags: 0
                },
                {
                  type: 'BindingElement',
                  left: {
                    type: 'ObjectBindingPattern',
                    properties: [
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'IdentifierName',
                          name: 'c',
                          start: 19,
                          end: 21,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'BindingIdentifier',
                          name: 'b',
                          start: 21,
                          end: 23,
                          kind: 168,
                          flags: 0
                        },
                        start: 19,
                        end: 23,
                        kind: 227,
                        flags: 0
                      }
                    ],
                    start: 17,
                    end: 24,
                    kind: 169,
                    flags: 0
                  },
                  right: null,
                  start: 17,
                  end: 24,
                  kind: 172,
                  flags: 0
                }
              ],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 25,
                end: 27,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 27,
              kind: 185,
              flags: 0
            },
            start: 0,
            end: 28,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 28,
          kind: 122,
          flags: 0
        }
      ],
      text: '(function({a: b}, {c: b}){})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      end: 28
    });
  });

  it('"use strict"; function a(b, { b }){}', () => {
    t.deepEqual(recovery('"use strict"; function a(b, { b }){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'b',
              start: 25,
              end: 26,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingElement',
              left: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'b',
                    start: 29,
                    end: 31,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 27,
                end: 33,
                kind: 169,
                flags: 0
              },
              right: null,
              start: 27,
              end: 33,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 34,
            end: 36,
            kind: 184,
            flags: 0
          },
          start: 13,
          end: 36,
          kind: 186,
          flags: 0
        }
      ],
      text: '"use strict"; function a(b, { b }){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 36,
      end: 36
    });
  });

  it('!{ set a([b, b]){} };', () => {
    t.deepEqual(recovery('!{ set a([b, b]){} };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ArrayBindingPattern',
                        elements: [
                          {
                            type: 'BindingIdentifier',
                            name: 'b',
                            start: 10,
                            end: 11,
                            kind: 168,
                            flags: 0
                          },
                          {
                            type: 'BindingIdentifier',
                            name: 'b',
                            start: 12,
                            end: 14,
                            kind: 168,
                            flags: 0
                          }
                        ],
                        start: 9,
                        end: 15,
                        kind: 174,
                        flags: 0
                      },
                      right: null,
                      start: 9,
                      end: 15,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 16,
                    end: 18,
                    kind: 184,
                    flags: 0
                  },
                  start: 8,
                  end: 18,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 20,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 20,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ set a([b, b]){} };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('{ let a; var a; }', () => {
    t.deepEqual(recovery('{ let a; var a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
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
                }
              ],
              start: 1,
              end: 8,
              kind: 145,
              flags: 0
            },
            {
              type: 'VariableStatement',
              declarations: [
                {
                  type: 'VariableDeclaration',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 12,
                    end: 14,
                    kind: 168,
                    flags: 0
                  },
                  initializer: null,
                  start: 12,
                  end: 14,
                  kind: 144,
                  flags: 0
                }
              ],
              start: 8,
              end: 15,
              kind: 143,
              flags: 0
            }
          ],
          start: 0,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ let a; var a; }',
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

  it('{ const a = 1; function a(){} }', () => {
    t.deepEqual(recovery('{ const a = 1; function a(){} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'LexicalDeclaration',
              isConst: true,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 7,
                    end: 9,
                    kind: 168,
                    flags: 0
                  },
                  initializer: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 11,
                    end: 13,
                    kind: 10,
                    flags: 0
                  },
                  start: 7,
                  end: 13,
                  kind: 146,
                  flags: 0
                }
              ],
              start: 1,
              end: 14,
              kind: 145,
              flags: 0
            },
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 23,
                end: 25,
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
                start: 27,
                end: 29,
                kind: 184,
                flags: 0
              },
              start: 14,
              end: 29,
              kind: 186,
              flags: 0
            }
          ],
          start: 0,
          end: 31,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ const a = 1; function a(){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 31,
      end: 31
    });
  });

  it('function a(package) { "use strict"; }', () => {
    t.deepEqual(recovery('function a(package) { "use strict"; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'package',
              start: 11,
              end: 18,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 21,
                  end: 34,
                  kind: 12,
                  flags: 0
                },
                start: 21,
                end: 35,
                kind: 122,
                flags: 0
              }
            ],
            start: 19,
            end: 37,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 37,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a(package) { "use strict"; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it('!{ get a(){ let b; var b; } };', () => {
    t.deepEqual(recovery('!{ get a(){ let b; var b; } };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [
                      {
                        type: 'LexicalDeclaration',
                        isConst: false,
                        declarations: [
                          {
                            type: 'LexicalBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 15,
                              end: 17,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 15,
                            end: 17,
                            kind: 146,
                            flags: 0
                          }
                        ],
                        start: 11,
                        end: 18,
                        kind: 145,
                        flags: 0
                      },
                      {
                        type: 'VariableStatement',
                        declarations: [
                          {
                            type: 'VariableDeclaration',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 22,
                              end: 24,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 22,
                            end: 24,
                            kind: 144,
                            flags: 0
                          }
                        ],
                        start: 18,
                        end: 25,
                        kind: 143,
                        flags: 0
                      }
                    ],
                    start: 10,
                    end: 27,
                    kind: 184,
                    flags: 0
                  },
                  start: 8,
                  end: 27,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 29,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 29,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 30,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ get a(){ let b; var b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 30,
      end: 30
    });
  });

  it('for (const let of a);', () => {
    t.deepEqual(recovery('for (const let of a);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForAwaitStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 10,
                  end: 14,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 10,
                end: 14,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 14,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 17,
            end: 19,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 20,
            end: 21,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 129,
          flags: 0
        }
      ],
      text: 'for (const let of a);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 11,
          length: 3
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

  it('"use strict"; function a(b, ...[b]){}', () => {
    t.deepEqual(recovery('"use strict"; function a(b, ...[b]){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'b',
              start: 25,
              end: 26,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingRestElement',
              argument: {
                type: 'ArrayBindingPattern',
                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'b',
                    start: 32,
                    end: 33,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 31,
                end: 34,
                kind: 174,
                flags: 0
              },
              start: 27,
              end: 34,
              kind: 175,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 35,
            end: 37,
            kind: 184,
            flags: 0
          },
          start: 13,
          end: 37,
          kind: 186,
          flags: 0
        }
      ],
      text: '"use strict"; function a(b, ...[b]){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it('"use strict"; function a(...yield) {}', () => {
    t.deepEqual(recovery('"use strict"; function a(...yield) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'use strict',
            start: 0,
            end: 12,
            kind: 12,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: 'yield',
                start: 28,
                end: 33,
                kind: 168,
                flags: 0
              },
              start: 25,
              end: 33,
              kind: 175,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 34,
            end: 37,
            kind: 184,
            flags: 0
          },
          start: 13,
          end: 37,
          kind: 186,
          flags: 0
        }
      ],
      text: '"use strict"; function a(...yield) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 37,
      end: 37
    });
  });

  it('({a}) => { const a = 1; }', () => {
    t.deepEqual(recovery('({a}) => { const a = 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 2,
                    end: 3,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 4,
                kind: 179,
                flags: 0
              }
            ],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: true,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 16,
                        end: 18,
                        kind: 168,
                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',
                        value: 1,
                        start: 20,
                        end: 22,
                        kind: 10,
                        flags: 0
                      },
                      start: 16,
                      end: 22,
                      kind: 146,
                      flags: 0
                    }
                  ],
                  start: 10,
                  end: 23,
                  kind: 145,
                  flags: 0
                }
              ],
              start: 8,
              end: 25,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 0,
            end: 25,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: '({a}) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('for(let a;;) { var a; }', () => {
    t.deepEqual(recovery('for(let a;;) { var a; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 7,
                  end: 9,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 9,
            kind: 201,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 18,
                      end: 20,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 18,
                    end: 20,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 14,
                end: 21,
                kind: 143,
                flags: 0
              }
            ],
            start: 12,
            end: 23,
            kind: 123,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(let a;;) { var a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      end: 23
    });
  });

  it('function a() { "use strict"; ({ b(c, c) { } }); }', () => {
    t.deepEqual(recovery('function a() { "use strict"; ({ b(c, c) { } }); }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 14,
                  end: 27,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 122,
                flags: 0
              },
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
                            name: 'c',
                            start: 34,
                            end: 35,
                            kind: 168,
                            flags: 0
                          },
                          {
                            type: 'BindingIdentifier',
                            name: 'c',
                            start: 36,
                            end: 38,
                            kind: 168,
                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 31,
                          end: 33,
                          kind: 13,
                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 39,
                          end: 43,
                          kind: 184,
                          flags: 0
                        },
                        start: 33,
                        end: 43,
                        kind: 182,
                        flags: 0
                      }
                    ],
                    start: 30,
                    end: 45,
                    kind: 179,
                    flags: 0
                  },
                  start: 28,
                  end: 46,
                  kind: 189,
                  flags: 0
                },
                start: 28,
                end: 47,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 49,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 49,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a() { "use strict"; ({ b(c, c) { } }); }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 49,
      end: 49
    });
  });

  it('class a extends b { constructor() { function* c(){ super(); } } }', () => {
    t.deepEqual(recovery('class a extends b { constructor() { function* c(){ super(); } } }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,
            kind: 13,
            flags: 0
          },
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
                  name: 'constructor',
                  start: 19,
                  end: 31,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [
                    {
                      type: 'FunctionDeclaration',
                      name: {
                        type: 'BindingIdentifier',
                        name: 'c',
                        start: 45,
                        end: 47,
                        kind: 168,
                        flags: 0
                      },
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
                              type: 'SuperCall',
                              arguments: [],
                              start: 50,
                              end: 58,
                              kind: 191,
                              flags: 0
                            },
                            start: 50,
                            end: 59,
                            kind: 122,
                            flags: 0
                          }
                        ],
                        start: 49,
                        end: 61,
                        kind: 184,
                        flags: 0
                      },
                      start: 35,
                      end: 61,
                      kind: 186,
                      flags: 0
                    }
                  ],
                  start: 33,
                  end: 63,
                  kind: 184,
                  flags: 0
                },
                start: 31,
                end: 63,
                kind: 182,
                flags: 0
              },
              start: 19,
              end: 63,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 65,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class a extends b { constructor() { function* c(){ super(); } } }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message:
            'Calls to super must be in the "constructor" method of a class expression or class declaration that has a super class',
          code: 32,
          start: 56,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 65,
      end: 65
    });
  });

  it('function a() { "use strict"; static = 1; }', () => {
    t.deepEqual(recovery('function a() { "use strict"; static = 1; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 14,
                  end: 27,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'static',
                    start: 28,
                    end: 35,
                    kind: 13,
                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 37,
                    end: 39,
                    kind: 10,
                    flags: 0
                  },
                  start: 28,
                  end: 39,
                  kind: 152,
                  flags: 0
                },
                start: 28,
                end: 40,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 42,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 42,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a() { "use strict"; static = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 42,
      end: 42
    });
  });

  it('({a(b){}} = 0)', () => {
    t.deepEqual(recovery('({a(b){}} = 0)', 'recovery.js'), {
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
                    type: 'MethodDefinition',
                    async: false,
                    generator: false,
                    propertySetParameterList: [],
                    uniqueFormalParameters: [
                      {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 4,
                        end: 5,
                        kind: 168,
                        flags: 0
                      }
                    ],
                    name: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 2,
                      end: 3,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 6,
                      end: 8,
                      kind: 184,
                      flags: 0
                    },
                    start: 3,
                    end: 8,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 1,
                end: 11,
                kind: 211,
                flags: 0
              },
              right: {
                type: 'NumericLiteral',
                value: 0,
                start: 11,
                end: 13,
                kind: 10,
                flags: 0
              },
              start: 1,
              end: 13,
              kind: 213,
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
      text: '({a(b){}} = 0)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('(a, a) => 1;', () => {
    t.deepEqual(recovery('(a, a) => 1;', 'recovery.js'), {
      kind: 209,
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
                end: 2,
                kind: 13,
                flags: 0
              },
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 3,
                end: 5,
                kind: 13,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'NumericLiteral',
                value: 1,
                start: 9,
                end: 11,
                kind: 10,
                flags: 0
              },
              start: 9,
              end: 11,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 11,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a, a) => 1;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('!{ set a({b}){ let b; } };', () => {
    t.deepEqual(recovery('!{ set a({b}){ let b; } };', 'recovery.js'), {
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
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [
                          {
                            type: 'BindingIdentifier',
                            name: 'b',
                            start: 10,
                            end: 11,
                            kind: 168,
                            flags: 0
                          }
                        ],
                        start: 9,
                        end: 12,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 9,
                      end: 12,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [
                      {
                        type: 'LexicalDeclaration',
                        isConst: false,
                        declarations: [
                          {
                            type: 'LexicalBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'b',
                              start: 18,
                              end: 20,
                              kind: 168,
                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,
                            kind: 146,
                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,
                        kind: 145,
                        flags: 0
                      }
                    ],
                    start: 13,
                    end: 23,
                    kind: 184,
                    flags: 0
                  },
                  start: 8,
                  end: 23,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 25,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 25,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{ set a({b}){ let b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      end: 26
    });
  });

  it('for(let let in 1);', () => {
    t.deepEqual(recovery('for(let let in 1);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 7,
                  end: 11,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 11,
                kind: 146,
                flags: 0
              }
            ],
            start: 4,
            end: 11,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 14,
            end: 16,
            kind: 10,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 17,
            end: 18,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 18,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for(let let in 1);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 8,
          length: 3
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

  it('function* a(){ ({ *b(c = yield d){} }); }', () => {
    t.deepEqual(recovery('function* a(){ ({ *b(c = yield d){} }); }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,
            kind: 168,
            flags: 0
          },
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
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ObjectLiteral',
                    properties: [
                      {
                        type: 'MethodDefinition',
                        async: false,
                        generator: true,
                        propertySetParameterList: [],
                        uniqueFormalParameters: [
                          {
                            type: 'BindingElement',
                            left: {
                              type: 'BindingIdentifier',
                              name: 'c',
                              start: 21,
                              end: 22,
                              kind: 168,
                              flags: 0
                            },
                            right: {
                              type: 'YieldExpression',
                              delegate: false,
                              argument: {
                                type: 'IdentifierReference',
                                name: 'd',
                                start: 30,
                                end: 32,
                                kind: 13,
                                flags: 0
                              },
                              start: 24,
                              end: 32,
                              kind: 193,
                              flags: 0
                            },
                            start: 21,
                            end: 32,
                            kind: 172,
                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 17,
                          end: 20,
                          kind: 13,
                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 33,
                          end: 35,
                          kind: 184,
                          flags: 0
                        },
                        start: 20,
                        end: 35,
                        kind: 182,
                        flags: 0
                      }
                    ],
                    start: 16,
                    end: 37,
                    kind: 179,
                    flags: 0
                  },
                  start: 14,
                  end: 38,
                  kind: 189,
                  flags: 0
                },
                start: 14,
                end: 39,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
            end: 41,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 41,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function* a(){ ({ *b(c = yield d){} }); }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`Yield` expression not allowed in formal parameters',
          code: 24,
          start: 25,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 41,
      end: 41
    });
  });

  it('({ __proto__: null, __proto__: null })', () => {
    t.deepEqual(recovery('({ __proto__: null, __proto__: null })', 'recovery.js'), {
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
                    name: '__proto__',
                    start: 2,
                    end: 13,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 13,
                    end: 18,
                    kind: 164,
                    flags: 0
                  },
                  start: 2,
                  end: 18,
                  kind: 227,
                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: '__proto__',
                    start: 19,
                    end: 30,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 30,
                    end: 35,
                    kind: 164,
                    flags: 0
                  },
                  start: 19,
                  end: 35,
                  kind: 227,
                  flags: 0
                }
              ],
              start: 1,
              end: 37,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 38,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 38,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ __proto__: null, __proto__: null })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 38,
      end: 38
    });
  });
});
