import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('test262-parser-tests - early tests', () => {
  it('!{ *a(b, b){} };', () => {
    t.deepStrictEqual(recovery('!{ *a(b, b){} };', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                  getter: false,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: 'b',
                      start: 6,
                      end: 7,

                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'b',
                      start: 8,
                      end: 10,

                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 4,
                    end: 5,

                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 11,
                    end: 13,

                    flags: 0
                  },
                  start: 5,
                  end: 13,

                  flags: 0
                }
              ],
              start: 1,
              end: 15,

              flags: 0
            },
            start: 0,
            end: 15,

            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: '!{ *a(b, b){} };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 8,
          length: 4
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

  it('({ a(eval) { "use strict"; } });', () => {
    t.deepStrictEqual(recovery('({ a(eval) { "use strict"; } });', 'recovery.js'), {
      type: 'RootNode',
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
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  getter: false,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: 'eval',
                      start: 5,
                      end: 9,

                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 4,

                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [
                      {
                        type: 'Directive',
                        value: 'use strict',
                        raw: '"use strict',
                        start: 12,
                        end: 25,

                        flags: 0
                      }
                    ],
                    leafs: [],
                    start: 10,
                    end: 28,

                    flags: 0
                  },
                  start: 4,
                  end: 28,

                  flags: 0
                }
              ],
              start: 1,
              end: 30,

              flags: 0
            },
            start: 0,
            end: 31,

            flags: 0
          },
          start: 0,
          end: 32,

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
    t.deepStrictEqual(recovery('for (let let of a);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 8,
                  end: 12,

                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 12,

                flags: 0
              }
            ],
            start: 5,
            end: 12,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 15,
            end: 17,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 18,
            end: 19,

            flags: 0
          },
          await: false,
          start: 0,
          end: 19,

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
    t.deepStrictEqual(recovery('function* a(){ function* b({[yield]: c}){} }', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,

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

                  flags: 0
                },
                generator: true,
                async: false,
                params: [
                  {
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

                            flags: 0
                          },
                          start: 28,
                          end: 35,

                          flags: 0
                        },
                        value: {
                          type: 'BindingIdentifier',
                          name: 'c',
                          start: 36,
                          end: 38,

                          flags: 0
                        },
                        start: 28,
                        end: 38,

                        flags: 0
                      }
                    ],
                    start: 27,
                    end: 39,

                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 40,
                  end: 42,

                  flags: 0
                },
                start: 14,
                end: 42,

                flags: 0
              }
            ],
            start: 13,
            end: 44,

            flags: 0
          },
          start: 0,
          end: 44,

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
          message: '`Yield` expression cannot be used in function parameters',
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
      type: 'RootNode',
      webCompat: true,
      end: 44
    });
  });

  it('for(([0]) in 0);', () => {
    t.deepStrictEqual(recovery('for(([0]) in 0);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrayLiteral',

              elements: [
                {
                  type: 'NumericLiteral',

                  value: 0,
                  start: 6,
                  end: 7,

                  flags: 0
                }
              ],
              start: 5,
              end: 8,
              flags: 0
            },
            start: 4,
            end: 9,

            flags: 0
          },
          expression: {
            type: 'NumericLiteral',

            value: 0,
            start: 12,
            end: 14,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 15,
            end: 16,

            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: 'for(([0]) in 0);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 104,
          kind: 3,
          length: 10,
          message: 'Invalid left-hand side in for-loop',
          source: 2,
          start: 4
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

  it('for(const {a, a} of 1);', () => {
    t.deepStrictEqual(recovery('for(const {a, a} of 1);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'LexicalDeclaration',
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

                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 13,
                      end: 15,

                      flags: 0
                    }
                  ],
                  start: 9,
                  end: 16,

                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 16,

                flags: 0
              }
            ],
            start: 4,
            end: 16,

            flags: 0
          },
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 19,
            end: 21,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,

            flags: 0
          },
          await: false,
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: 'for(const {a, a} of 1);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 15,
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

  it('for (let let in a);', () => {
    t.deepStrictEqual(recovery('for (let let in a);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 8,
                  end: 12,

                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 12,

                flags: 0
              }
            ],
            start: 5,
            end: 12,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 15,
            end: 17,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 18,
            end: 19,

            flags: 0
          },
          start: 0,
          end: 19,

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
    t.deepStrictEqual(recovery('"use strict"; function static() { }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'static',
            start: 22,
            end: 29,

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

            flags: 0
          },
          start: 13,
          end: 35,

          flags: 0
        }
      ],
      text: '"use strict"; function static() { }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unexpected reserved word in strict mode',
          code: 18,
          start: 23,
          length: 6
        },
        {
          code: 139,
          kind: 3,
          length: 1,
          message: 'Function name may not contain any reserved words or be eval or arguments in strict mode',
          source: 2,
          start: 34
        }
      ],
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
    t.deepStrictEqual(recovery('(a) => { const a = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: true,
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 1,
                end: 2,

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

                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',

                        value: 1,
                        start: 18,
                        end: 20,

                        flags: 0
                      },
                      start: 14,
                      end: 20,

                      flags: 0
                    }
                  ],
                  start: 8,
                  end: 21,

                  flags: 0
                }
              ],
              start: 6,
              end: 23,

              flags: 0
            },
            async: false,
            start: 0,
            end: 23,

            flags: 0
          },
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: '(a) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 15,
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

  it('class a extends b { c() { !function* (c = super.d()){} } }', () => {
    t.deepStrictEqual(recovery('class a extends b { c() { !function* (c = super.d()){} } }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,

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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'c',
                  start: 19,
                  end: 21,

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

                                flags: 0
                              },
                              right: {
                                type: 'CallExpression',
                                expression: {
                                  type: 'SuperProperty',
                                  computed: false,
                                  super: {
                                    type: 'IdentifierName',
                                    name: 'd',
                                    start: 48,
                                    end: 49,

                                    flags: 0
                                  },
                                  start: 41,
                                  end: 49,

                                  flags: 0
                                },
                                arguments: [],
                                start: 41,
                                end: 51,

                                flags: 0
                              },
                              start: 38,
                              end: 51,

                              flags: 0
                            }
                          ],
                          contents: {
                            type: 'FunctionBody',
                            directives: [],
                            leafs: [],
                            start: 52,
                            end: 54,

                            flags: 0
                          },
                          start: 27,
                          end: 54,

                          flags: 0
                        },
                        start: 25,
                        end: 54,

                        flags: 0
                      },
                      start: 25,
                      end: 54,

                      flags: 0
                    }
                  ],
                  start: 23,
                  end: 56,

                  flags: 0
                },
                start: 21,
                end: 56,

                flags: 0
              },
              start: 19,
              end: 56,

              flags: 0
            }
          ],
          start: 0,
          end: 58,

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
    t.deepStrictEqual(recovery('function a() { "use strict"; var private; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 14,
                end: 27,

                flags: 0
              }
            ],
            leafs: [
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

                      flags: 0
                    },
                    initializer: null,
                    start: 32,
                    end: 40,

                    flags: 0
                  }
                ],
                start: 28,
                end: 41,

                flags: 0
              }
            ],
            start: 12,
            end: 43,

            flags: 0
          },
          start: 0,
          end: 43,

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
    t.deepStrictEqual(recovery('"use strict"; yield:;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'yield',
            start: 13,
            end: 20,

            flags: 0
          },
          labelledItem: {
            type: 'EmptyStatement',
            start: 20,
            end: 21,

            flags: 0
          },
          start: 13,
          end: 21,

          flags: 0
        }
      ],
      text: '"use strict"; yield:;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 21,
          kind: 3,
          length: 6,
          message: 'Unexpected `yield` as identifier in this context',
          source: 2,
          start: 13
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

  it('"use strict"; var yield;', () => {
    t.deepStrictEqual(recovery('"use strict"; var yield;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: '',
                start: 17,
                end: 23,

                flags: 0
              },
              initializer: null,
              start: 17,
              end: 23,

              flags: 0
            }
          ],
          start: 13,
          end: 24,

          flags: 0
        }
      ],
      text: '"use strict"; var yield;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 18,
          length: 5
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

  it('class a extends b { c() { !function* (){ super.d(); } } }', () => {
    t.deepStrictEqual(recovery('class a extends b { c() { !function* (){ super.d(); } } }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,

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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'c',
                  start: 19,
                  end: 21,

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
                                    computed: false,
                                    super: {
                                      type: 'IdentifierName',
                                      name: 'd',
                                      start: 47,
                                      end: 48,

                                      flags: 0
                                    },
                                    start: 40,
                                    end: 48,

                                    flags: 0
                                  },
                                  arguments: [],
                                  start: 40,
                                  end: 50,

                                  flags: 0
                                },
                                start: 40,
                                end: 51,

                                flags: 0
                              }
                            ],
                            start: 39,
                            end: 53,

                            flags: 0
                          },
                          start: 27,
                          end: 53,

                          flags: 0
                        },
                        start: 25,
                        end: 53,

                        flags: 0
                      },
                      start: 25,
                      end: 53,

                      flags: 0
                    }
                  ],
                  start: 23,
                  end: 55,

                  flags: 0
                },
                start: 21,
                end: 55,

                flags: 0
              },
              start: 19,
              end: 55,

              flags: 0
            }
          ],
          start: 0,
          end: 57,

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
    t.deepStrictEqual(recovery('!{ a(){ let b; var b; } };', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                  getter: false,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 4,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 11,
                            end: 13,

                            flags: 0
                          }
                        ],
                        start: 7,
                        end: 14,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,

                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,

                        flags: 0
                      }
                    ],
                    start: 6,
                    end: 23,

                    flags: 0
                  },
                  start: 4,
                  end: 23,

                  flags: 0
                }
              ],
              start: 1,
              end: 25,

              flags: 0
            },
            start: 0,
            end: 25,

            flags: 0
          },
          start: 0,
          end: 26,

          flags: 0
        }
      ],
      text: '!{ a(){ let b; var b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate lexical binding `b`',
          code: 123,
          start: 19,
          length: 1
        }
      ],
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
    t.deepStrictEqual(recovery('switch (a) { default: continue; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 8,
            end: 9,

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

                  flags: 0
                }
              ],
              start: 12,
              end: 31,

              flags: 0
            }
          ],
          start: 0,
          end: 33,

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
    t.deepStrictEqual(recovery('var a = super();', 'recovery.js'), {
      type: 'RootNode',
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
                start: 3,
                end: 5,

                flags: 0
              },
              initializer: {
                type: 'SuperCall',
                arguments: [],
                start: 7,
                end: 15,

                flags: 0
              },
              start: 3,
              end: 15,

              flags: 0
            }
          ],
          start: 0,
          end: 16,

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
    t.deepStrictEqual(recovery('class a { static b(c, c){} }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,

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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 19,
                    end: 20,

                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 21,
                    end: 23,

                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'b',
                  start: 16,
                  end: 18,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 24,
                  end: 26,

                  flags: 0
                },
                start: 18,
                end: 26,

                flags: 0
              },
              start: 16,
              end: 26,

              flags: 0
            }
          ],
          start: 0,
          end: 28,

          flags: 0
        }
      ],
      text: 'class a { static b(c, c){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `c`',
          code: 124,
          start: 21,
          length: 4
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

  it('continue;', () => {
    t.deepStrictEqual(recovery('continue;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ContinueStatement',
          label: null,
          start: 0,
          end: 9,

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
    t.deepStrictEqual(recovery('!{ a(){ let b; let b; } };', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                  getter: false,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 2,
                    end: 4,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 11,
                            end: 13,

                            flags: 0
                          }
                        ],
                        start: 7,
                        end: 14,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,

                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,

                        flags: 0
                      }
                    ],
                    start: 6,
                    end: 23,

                    flags: 0
                  },
                  start: 4,
                  end: 23,

                  flags: 0
                }
              ],
              start: 1,
              end: 25,

              flags: 0
            },
            start: 0,
            end: 25,

            flags: 0
          },
          start: 0,
          end: 26,

          flags: 0
        }
      ],
      text: '!{ a(){ let b; let b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 19,
          length: 1
        }
      ],
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
    t.deepStrictEqual(recovery('for(const a = 1;;) { var a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 9,
                  end: 11,

                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',

                  value: 1,
                  start: 13,
                  end: 15,

                  flags: 0
                },
                start: 9,
                end: 15,

                flags: 0
              }
            ],
            start: 4,
            end: 15,

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

                      flags: 0
                    },
                    initializer: null,
                    start: 24,
                    end: 26,

                    flags: 0
                  }
                ],
                start: 20,
                end: 27,

                flags: 0
              }
            ],
            start: 18,
            end: 29,

            flags: 0
          },
          start: 0,
          end: 29,

          flags: 0
        }
      ],
      text: 'for(const a = 1;;) { var a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate lexical binding `a`',
          code: 123,
          start: 25,
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

  it('function a() { "use strict"; function b(arguments) {} }', () => {
    t.deepStrictEqual(recovery('function a() { "use strict"; function b(arguments) {} }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 14,
                end: 27,

                flags: 0
              }
            ],
            leafs: [
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'b',
                  start: 37,
                  end: 39,

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

                    flags: 0
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 50,
                  end: 53,

                  flags: 0
                },
                start: 28,
                end: 53,

                flags: 0
              }
            ],
            start: 12,
            end: 55,

            flags: 0
          },
          start: 0,
          end: 55,

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
    t.deepStrictEqual(recovery('"use strict"; delete (a);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
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

                flags: 0
              },
              start: 20,
              end: 24,

              flags: 0
            },
            start: 13,
            end: 24,

            flags: 0
          },
          start: 13,
          end: 25,

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
    t.deepStrictEqual(recovery('(((...a)))', 'recovery.js'), {
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
                arrowParameters: true,
                params: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 6,
                      end: 7,

                      flags: 0
                    },
                    start: 3,
                    end: 7,

                    flags: 0
                  }
                ],
                contents: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 8,
                  end: 8,

                  flags: 2
                },
                async: false,
                start: 2,
                end: 8,

                flags: 0
              },
              start: 1,
              end: 9,

              flags: 0
            },
            start: 0,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,

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
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 10,
      type: 'RootNode',
      webCompat: true,
      end: 10
    });
  });

  it('{ const a; }', () => {
    t.deepStrictEqual(recovery('{ const a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                    flags: 0
                  },
                  initializer: null,
                  start: 7,
                  end: 9,

                  flags: 0
                }
              ],
              start: 1,
              end: 10,

              flags: 0
            }
          ],
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      text: '{ const a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
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
    t.deepStrictEqual(recovery('function* a(){ ({b = yield}) => 1; }', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,

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
                  arrowParameters: true,
                  params: [
                    {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingElement',
                          left: {
                            type: 'IdentifierReference',
                            name: 'b',
                            start: 17,
                            end: 18,

                            flags: 0
                          },
                          right: {
                            type: 'YieldExpression',
                            delegate: false,
                            argument: null,
                            start: 20,
                            end: 26,

                            flags: 0
                          },
                          start: 17,
                          end: 26,

                          flags: 0
                        }
                      ],
                      start: 16,
                      end: 27,

                      flags: 0
                    }
                  ],
                  contents: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 31,
                    end: 33,

                    flags: 0
                  },
                  async: false,
                  start: 14,
                  end: 33,

                  flags: 0
                },
                start: 14,
                end: 34,

                flags: 0
              }
            ],
            start: 13,
            end: 36,

            flags: 0
          },
          start: 0,
          end: 36,

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
      type: 'RootNode',
      webCompat: true,
      end: 36
    });
  });

  it('{ function a(){} function a(){} }', () => {
    t.deepStrictEqual(recovery('{ function a(){} function a(){} }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                flags: 0
              },
              start: 1,
              end: 16,

              flags: 0
            },
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 25,
                end: 27,

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

                flags: 0
              },
              start: 16,
              end: 31,

              flags: 0
            }
          ],
          start: 0,
          end: 33,

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
    t.deepStrictEqual(recovery('function a(){ c: while(1) continue b; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

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
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'c',
                  start: 13,
                  end: 16,

                  flags: 0
                },
                labelledItem: {
                  type: 'WhileStatement',
                  expression: {
                    type: 'NumericLiteral',

                    value: 1,
                    start: 23,
                    end: 24,

                    flags: 0
                  },
                  statement: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'IdentifierReference',
                      name: 'b',
                      start: 34,
                      end: 36,

                      flags: 0
                    },
                    start: 25,
                    end: 37,

                    flags: 0
                  },
                  start: 16,
                  end: 37,

                  flags: 0
                },
                start: 13,
                end: 37,

                flags: 0
              }
            ],
            start: 12,
            end: 39,

            flags: 0
          },
          start: 0,
          end: 39,

          flags: 0
        }
      ],
      text: 'function a(){ c: while(1) continue b; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 126,
          kind: 3,
          length: 1,
          message: 'Unknown label `b`',
          source: 2,
          start: 36
        }
      ],
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
    t.deepStrictEqual(recovery('/./\\u0069', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

            flags: 0
          },
          start: 0,
          end: 3,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'i',
            start: 3,
            end: 9,

            flags: 0
          },
          start: 3,
          end: 9,

          flags: 0
        }
      ],
      text: '/./\\u0069',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 92,
          kind: 2,
          length: 6,
          message: '`;` expected',
          source: 2,
          start: 3
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

  it('for(const {a, a} in 1);', () => {
    t.deepStrictEqual(recovery('for(const {a, a} in 1);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'LexicalDeclaration',
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

                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: 'a',
                      start: 13,
                      end: 15,

                      flags: 0
                    }
                  ],
                  start: 9,
                  end: 16,

                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 16,

                flags: 0
              }
            ],
            start: 4,
            end: 16,

            flags: 0
          },
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 19,
            end: 21,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,

            flags: 0
          },
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: 'for(const {a, a} in 1);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 15,
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

  it('([a]) => { const a = 1; }', () => {
    t.deepStrictEqual(recovery('([a]) => { const a = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: true,
            params: [
              {
                type: 'ArrayBindingPattern',

                elements: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 2,
                    end: 3,

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

                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',

                        value: 1,
                        start: 20,
                        end: 22,

                        flags: 0
                      },
                      start: 16,
                      end: 22,

                      flags: 0
                    }
                  ],
                  start: 10,
                  end: 23,

                  flags: 0
                }
              ],
              start: 8,
              end: 25,

              flags: 0
            },
            async: false,
            start: 0,
            end: 25,

            flags: 0
          },
          start: 0,
          end: 25,

          flags: 0
        }
      ],
      text: '([a]) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 124,
          kind: 3,
          length: 1,
          message: 'Duplicate binding `a`',
          source: 2,
          start: 17
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

  it('function* a(){ ({ *b(c = d + e(yield)){} }); }', () => {
    t.deepStrictEqual(recovery('function* a(){ ({ *b(c = d + e(yield)){} }); }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,

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
                        getter: false,
                        setter: false,
                        propertySetParameterList: null,
                        uniqueFormalParameters: [
                          {
                            type: 'BindingElement',
                            left: {
                              type: 'BindingIdentifier',
                              name: 'c',
                              start: 21,
                              end: 22,

                              flags: 0
                            },
                            right: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'IdentifierReference',
                                name: 'd',
                                start: 24,
                                end: 26,

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

                                  flags: 0
                                },
                                arguments: [
                                  {
                                    type: 'YieldExpression',
                                    delegate: false,
                                    argument: null,
                                    start: 31,
                                    end: 36,

                                    flags: 0
                                  }
                                ],
                                start: 28,
                                end: 37,

                                flags: 0
                              },
                              start: 24,
                              end: 37,

                              flags: 0
                            },
                            start: 21,
                            end: 37,

                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 19,
                          end: 20,

                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 38,
                          end: 40,

                          flags: 0
                        },
                        start: 20,
                        end: 40,

                        flags: 0
                      }
                    ],
                    start: 16,
                    end: 42,

                    flags: 0
                  },
                  start: 14,
                  end: 43,

                  flags: 0
                },
                start: 14,
                end: 44,

                flags: 0
              }
            ],
            start: 13,
            end: 46,

            flags: 0
          },
          start: 0,
          end: 46,

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
          message: '`Yield` expression cannot be used in function parameters',
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
    t.deepStrictEqual(recovery('function a() { "use strict"; interface = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 14,
                end: 27,

                flags: 0
              }
            ],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'interface',
                    start: 28,
                    end: 38,

                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'NumericLiteral',

                    value: 1,
                    start: 40,
                    end: 42,

                    flags: 0
                  },
                  start: 28,
                  end: 42,

                  flags: 0
                },
                start: 28,
                end: 43,

                flags: 0
              }
            ],
            start: 12,
            end: 45,

            flags: 0
          },
          start: 0,
          end: 45,

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
    t.deepStrictEqual(recovery('{ var a; const a = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,

                  flags: 0
                }
              ],
              start: 1,
              end: 8,

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

                    flags: 0
                  },
                  initializer: {
                    type: 'NumericLiteral',

                    value: 1,
                    start: 18,
                    end: 20,

                    flags: 0
                  },
                  start: 14,
                  end: 20,

                  flags: 0
                }
              ],
              start: 8,
              end: 21,

              flags: 0
            }
          ],
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: '{ var a; const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 15,
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

  it('for(const a;;);', () => {
    t.deepStrictEqual(recovery('for(const a;;);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 9,
                  end: 11,

                  flags: 0
                },
                initializer: null,
                start: 9,
                end: 11,

                flags: 0
              }
            ],
            start: 4,
            end: 11,

            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 14,
            end: 15,

            flags: 0
          },
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'for(const a;;);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
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
    t.deepStrictEqual(recovery('({get a(){}} = 0)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                    getter: true,
                    setter: false,
                    propertySetParameterList: null,
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 5,
                      end: 7,

                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 9,
                      end: 11,

                      flags: 0
                    },
                    start: 7,
                    end: 11,

                    flags: 0
                  }
                ],
                start: 1,
                end: 12,

                flags: 0
              },
              right: {
                type: 'NumericLiteral',

                value: 0,
                start: 14,
                end: 16,

                flags: 0
              },
              start: 1,
              end: 16,
              flags: 0
            },
            start: 0,
            end: 17,

            flags: 0
          },
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: '({get a(){}} = 0)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
          start: 13,
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

  it('function* a(){ (b = yield* c) => 1; }', () => {
    t.deepStrictEqual(recovery('function* a(){ (b = yield* c) => 1; }', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,

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
                  arrowParameters: true,
                  params: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 16,
                        end: 17,

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

                          flags: 0
                        },
                        start: 19,
                        end: 28,

                        flags: 0
                      },
                      start: 16,
                      end: 28,

                      flags: 0
                    }
                  ],
                  contents: {
                    type: 'NumericLiteral',
                    value: 1,
                    start: 32,
                    end: 34,

                    flags: 0
                  },
                  async: false,
                  start: 14,
                  end: 34,

                  flags: 0
                },
                start: 14,
                end: 35,

                flags: 0
              }
            ],
            start: 13,
            end: 37,

            flags: 0
          },
          start: 0,
          end: 37,

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
      type: 'RootNode',
      webCompat: true,
      end: 37
    });
  });

  it('for({a: 0} of 0);', () => {
    t.deepStrictEqual(recovery('for({a: 0} of 0);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ObjectAssignmentPattern',
            properties: [
              {
                type: 'PropertyName',
                key: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 5,
                  end: 6,

                  flags: 0
                },
                value: {
                  type: 'NumericLiteral',

                  value: 0,
                  start: 7,
                  end: 9,

                  flags: 0
                },
                start: 5,
                end: 9,

                flags: 0
              }
            ],
            start: 4,
            end: 10,

            flags: 0
          },
          expression: {
            type: 'NumericLiteral',

            value: 0,
            start: 13,
            end: 15,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 16,
            end: 17,

            flags: 0
          },
          await: false,
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: 'for({a: 0} of 0);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid left-hand side in for-loop',
          code: 104,
          start: 4,
          length: 11
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

  it('b: break a;', () => {
    t.deepStrictEqual(recovery('b: break a;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'b',
            start: 0,
            end: 2,

            flags: 0
          },
          labelledItem: {
            type: 'BreakStatement',
            label: {
              type: 'IdentifierReference',
              name: 'a',
              start: 8,
              end: 10,

              flags: 0
            },
            start: 2,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'b: break a;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 126,
          kind: 3,
          length: 1,
          message: 'Unknown label `a`',
          source: 2,
          start: 10
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

  it('(a, ...b)', () => {
    t.deepStrictEqual(recovery('(a, ...b)', 'recovery.js'), {
      type: 'RootNode',
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
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2,

                  flags: 0
                },
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'BindingIdentifier',
                    name: 'b',
                    start: 7,
                    end: 8,

                    flags: 0
                  },
                  start: 3,
                  end: 8,

                  flags: 0
                }
              ],
              start: 0,
              end: 8,

              flags: 0
            },
            start: 0,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,

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
    t.deepStrictEqual(recovery('__proto__: __proto__: 1;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: '__proto__',
            start: 0,
            end: 10,

            flags: 0
          },
          labelledItem: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: '__proto__',
              start: 10,
              end: 21,

              flags: 0
            },
            labelledItem: {
              type: 'ExpressionStatement',
              expression: {
                type: 'NumericLiteral',

                value: 1,
                start: 21,
                end: 23,

                flags: 0
              },
              start: 21,
              end: 24,

              flags: 0
            },
            start: 10,
            end: 24,

            flags: 0
          },
          start: 0,
          end: 24,

          flags: 0
        }
      ],
      text: '__proto__: __proto__: 1;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 92,
          kind: 2,
          length: 1,
          message: '`;` expected',
          source: 2,
          start: 20
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

  it('switch(1) { case 2: !function(){ break; }; }', () => {
    t.deepStrictEqual(recovery('switch(1) { case 2: !function(){ break; }; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 7,
            end: 8,

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

                            flags: 0
                          }
                        ],
                        start: 31,
                        end: 41,

                        flags: 0
                      },
                      start: 21,
                      end: 41,

                      flags: 0
                    },
                    start: 19,
                    end: 41,

                    flags: 0
                  },
                  start: 19,
                  end: 42,

                  flags: 0
                }
              ],
              start: 11,
              end: 42,

              flags: 0
            }
          ],
          start: 0,
          end: 44,

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
    t.deepStrictEqual(recovery('switch(1) { case 2: let a; case 3: let a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 7,
            end: 8,

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

                        flags: 0
                      },
                      initializer: null,
                      start: 23,
                      end: 25,

                      flags: 0
                    }
                  ],
                  start: 19,
                  end: 26,

                  flags: 0
                }
              ],
              start: 11,
              end: 26,

              flags: 0
            },
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',

                value: 3,
                start: 31,
                end: 33,

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

                        flags: 0
                      },
                      initializer: null,
                      start: 38,
                      end: 40,

                      flags: 0
                    }
                  ],
                  start: 34,
                  end: 41,

                  flags: 0
                }
              ],
              start: 26,
              end: 41,

              flags: 0
            }
          ],
          start: 0,
          end: 43,

          flags: 0
        }
      ],
      text: 'switch(1) { case 2: let a; case 3: let a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 39,
          length: 1
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

  it('if(1) break;', () => {
    t.deepStrictEqual(recovery('if(1) break;', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 3,
            end: 4,

            flags: 0
          },
          consequent: {
            type: 'BreakStatement',
            label: null,
            start: 5,
            end: 12,

            flags: 0
          },
          alternate: null,
          start: 0,
          end: 12,

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
    t.deepStrictEqual(recovery('for(let a in b) d: function c(){}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,

                flags: 0
              }
            ],
            start: 4,
            end: 9,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 12,
            end: 14,

            flags: 0
          },
          statement: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'd',
              start: 15,
              end: 18,

              flags: 0
            },
            labelledItem: {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'c',
                start: 27,
                end: 29,

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

                flags: 0
              },
              start: 18,
              end: 33,

              flags: 0
            },
            start: 15,
            end: 33,

            flags: 0
          },
          start: 0,
          end: 33,

          flags: 0
        }
      ],
      text: 'for(let a in b) d: function c(){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 77,
          kind: 3,
          length: 8,
          message:
            'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          source: 2,
          start: 19
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

  it('if(1) c: b: function a(){}', () => {
    t.deepStrictEqual(recovery('if(1) c: b: function a(){}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 3,
            end: 4,

            flags: 0
          },
          consequent: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'c',
              start: 5,
              end: 8,

              flags: 0
            },
            labelledItem: {
              type: 'LabelledStatement',
              label: {
                type: 'LabelIdentifier',
                name: 'b',
                start: 8,
                end: 11,

                flags: 0
              },
              labelledItem: {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 20,
                  end: 22,

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

                  flags: 0
                },
                start: 11,
                end: 26,

                flags: 0
              },
              start: 8,
              end: 26,

              flags: 0
            },
            start: 5,
            end: 26,

            flags: 0
          },
          alternate: null,
          start: 0,
          end: 26,

          flags: 0
        }
      ],
      text: 'if(1) c: b: function a(){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 77,
          kind: 3,
          length: 8,
          message:
            'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          source: 2,
          start: 12
        }
      ],
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
    t.deepStrictEqual(recovery('(class static {})', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                flags: 0
              },
              heritage: null,
              elements: [],
              start: 1,
              end: 16,

              flags: 0
            },
            start: 0,
            end: 17,

            flags: 0
          },
          start: 0,
          end: 17,

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
    t.deepStrictEqual(recovery('while(1) !function(){ continue; };', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 6,
            end: 7,

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

                      flags: 0
                    }
                  ],
                  start: 20,
                  end: 33,

                  flags: 0
                },
                start: 10,
                end: 33,

                flags: 0
              },
              start: 8,
              end: 33,

              flags: 0
            },
            start: 8,
            end: 34,

            flags: 0
          },
          start: 0,
          end: 34,

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
    t.deepStrictEqual(recovery('{ var a; let a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,

                  flags: 0
                }
              ],
              start: 1,
              end: 8,

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

                    flags: 0
                  },
                  initializer: null,
                  start: 12,
                  end: 14,

                  flags: 0
                }
              ],
              start: 8,
              end: 15,

              flags: 0
            }
          ],
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: '{ var a; let a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 13,
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

  it('super()', () => {
    t.deepStrictEqual(recovery('super()', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SuperCall',
            arguments: [],
            start: 0,
            end: 7,

            flags: 0
          },
          start: 0,
          end: 7,

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
    t.deepStrictEqual(recovery('({ get __proto(){}, "__proto__": null, __proto__: null, })', 'recovery.js'), {
      type: 'RootNode',
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
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  getter: true,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: '__proto',
                    start: 6,
                    end: 14,

                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 16,
                    end: 18,

                    flags: 0
                  },
                  start: 14,
                  end: 18,

                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'StringLiteral',
                    value: '__proto__',
                    start: 19,
                    end: 31,

                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 32,
                    end: 37,

                    flags: 0
                  },
                  start: 19,
                  end: 37,

                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: '__proto__',
                    start: 38,
                    end: 48,

                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 49,
                    end: 54,

                    flags: 0
                  },
                  start: 38,
                  end: 54,

                  flags: 0
                }
              ],
              start: 1,
              end: 57,

              flags: 0
            },
            start: 0,
            end: 58,

            flags: 0
          },
          start: 0,
          end: 58,

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
    t.deepStrictEqual(recovery('(function({a: b}, {c: b}){})', 'recovery.js'), {
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
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'PropertyName',
                      key: {
                        type: 'IdentifierName',
                        name: 'a',
                        start: 11,
                        end: 13,

                        flags: 0
                      },
                      value: {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 13,
                        end: 15,

                        flags: 0
                      },
                      start: 11,
                      end: 15,

                      flags: 0
                    }
                  ],
                  start: 10,
                  end: 16,

                  flags: 0
                },
                {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'PropertyName',
                      key: {
                        type: 'IdentifierName',
                        name: 'c',
                        start: 19,
                        end: 21,

                        flags: 0
                      },
                      value: {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 21,
                        end: 23,

                        flags: 0
                      },
                      start: 19,
                      end: 23,

                      flags: 0
                    }
                  ],
                  start: 17,
                  end: 24,

                  flags: 0
                }
              ],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 25,
                end: 27,

                flags: 0
              },
              start: 1,
              end: 27,

              flags: 0
            },
            start: 0,
            end: 28,

            flags: 0
          },
          start: 0,
          end: 28,

          flags: 0
        }
      ],
      text: '(function({a: b}, {c: b}){})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 21,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      type: 'RootNode',
      webCompat: true,
      end: 28
    });
  });

  it('"use strict"; function a(b, { b }){}', () => {
    t.deepStrictEqual(recovery('"use strict"; function a(b, { b }){}', 'recovery.js'), {
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,

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

              flags: 0
            },
            {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'b',
                  start: 29,
                  end: 31,

                  flags: 0
                }
              ],
              start: 27,
              end: 33,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 34,
            end: 36,

            flags: 0
          },
          start: 13,
          end: 36,

          flags: 0
        }
      ],
      text: '"use strict"; function a(b, { b }){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 31,
          length: 4
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 36,
      type: 'RootNode',
      webCompat: true,
      end: 36
    });
  });

  it('!{ set a([b, b]){} };', () => {
    t.deepStrictEqual(recovery('!{ set a([b, b]){} };', 'recovery.js'), {
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
                  getter: false,
                  setter: true,
                  propertySetParameterList: {
                    type: 'ArrayBindingPattern',
                    elements: [
                      {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 10,
                        end: 11,

                        flags: 0
                      },
                      {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 12,
                        end: 14,

                        flags: 0
                      }
                    ],
                    start: 9,
                    end: 15,

                    flags: 0
                  },
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,

                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 16,
                    end: 18,

                    flags: 0
                  },
                  start: 8,
                  end: 18,

                  flags: 0
                }
              ],
              start: 1,
              end: 20,

              flags: 0
            },
            start: 0,
            end: 20,

            flags: 0
          },
          start: 0,
          end: 21,

          flags: 0
        }
      ],
      text: '!{ set a([b, b]){} };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 12,
          length: 4
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      type: 'RootNode',
      webCompat: true,
      end: 21
    });
  });

  it('{ let a; var a; }', () => {
    t.deepStrictEqual(recovery('{ let a; var a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                    flags: 0
                  },
                  initializer: null,
                  start: 5,
                  end: 7,

                  flags: 0
                }
              ],
              start: 1,
              end: 8,

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

                    flags: 0
                  },
                  initializer: null,
                  start: 12,
                  end: 14,

                  flags: 0
                }
              ],
              start: 8,
              end: 15,

              flags: 0
            }
          ],
          start: 0,
          end: 17,

          flags: 0
        }
      ],
      text: '{ let a; var a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate lexical binding `a`',
          code: 123,
          start: 13,
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

  it('{ const a = 1; function a(){} }', () => {
    t.deepStrictEqual(recovery('{ const a = 1; function a(){} }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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

                    flags: 0
                  },
                  initializer: {
                    type: 'NumericLiteral',

                    value: 1,
                    start: 11,
                    end: 13,

                    flags: 0
                  },
                  start: 7,
                  end: 13,

                  flags: 0
                }
              ],
              start: 1,
              end: 14,

              flags: 0
            },
            {
              type: 'FunctionDeclaration',
              name: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 23,
                end: 25,

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

                flags: 0
              },
              start: 14,
              end: 29,

              flags: 0
            }
          ],
          start: 0,
          end: 31,

          flags: 0
        }
      ],
      text: '{ const a = 1; function a(){} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 25,
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

  it('function a(package) { "use strict"; }', () => {
    t.deepStrictEqual(recovery('function a(package) { "use strict"; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

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

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 21,
                end: 34,

                flags: 0
              }
            ],
            leafs: [],
            start: 19,
            end: 37,

            flags: 0
          },
          start: 0,
          end: 37,

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
    t.deepStrictEqual(recovery('!{ get a(){ let b; var b; } };', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                  getter: true,
                  setter: false,
                  propertySetParameterList: null,
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 15,
                            end: 17,

                            flags: 0
                          }
                        ],
                        start: 11,
                        end: 18,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 22,
                            end: 24,

                            flags: 0
                          }
                        ],
                        start: 18,
                        end: 25,

                        flags: 0
                      }
                    ],
                    start: 10,
                    end: 27,

                    flags: 0
                  },
                  start: 8,
                  end: 27,

                  flags: 0
                }
              ],
              start: 1,
              end: 29,

              flags: 0
            },
            start: 0,
            end: 29,

            flags: 0
          },
          start: 0,
          end: 30,

          flags: 0
        }
      ],
      text: '!{ get a(){ let b; var b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate lexical binding `b`',
          code: 123,
          start: 23,
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

  it('for (const let of a);', () => {
    t.deepStrictEqual(recovery('for (const let of a);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 10,
                  end: 14,

                  flags: 0
                },
                initializer: null,
                start: 10,
                end: 14,

                flags: 0
              }
            ],
            start: 5,
            end: 14,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 17,
            end: 19,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 20,
            end: 21,

            flags: 0
          },
          await: false,
          start: 0,
          end: 21,

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
    t.deepStrictEqual(recovery('"use strict"; function a(b, ...[b]){}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,

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

                    flags: 0
                  }
                ],
                start: 31,
                end: 34,

                flags: 0
              },
              start: 27,
              end: 34,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 35,
            end: 37,

            flags: 0
          },
          start: 13,
          end: 37,

          flags: 0
        }
      ],
      text: '"use strict"; function a(b, ...[b]){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 32,
          length: 1
        }
      ],
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
    t.deepStrictEqual(recovery('"use strict"; function a(...yield) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 22,
            end: 24,

            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: '',
                start: 28,
                end: 33,

                flags: 0
              },
              start: 25,
              end: 33,

              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 34,
            end: 37,

            flags: 0
          },
          start: 13,
          end: 37,

          flags: 0
        }
      ],
      text: '"use strict"; function a(...yield) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 28,
          length: 5
        }
      ],
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
    t.deepStrictEqual(recovery('({a}) => { const a = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: true,
            params: [
              {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 2,
                    end: 3,

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

                        flags: 0
                      },
                      initializer: {
                        type: 'NumericLiteral',

                        value: 1,
                        start: 20,
                        end: 22,

                        flags: 0
                      },
                      start: 16,
                      end: 22,

                      flags: 0
                    }
                  ],
                  start: 10,
                  end: 23,

                  flags: 0
                }
              ],
              start: 8,
              end: 25,

              flags: 0
            },
            async: false,
            start: 0,
            end: 25,

            flags: 0
          },
          start: 0,
          end: 25,

          flags: 0
        }
      ],
      text: '({a}) => { const a = 1; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 124,
          kind: 3,
          length: 1,
          message: 'Duplicate binding `a`',
          source: 2,
          start: 17
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

  it('for(let a;;) { var a; }', () => {
    t.deepStrictEqual(recovery('for(let a;;) { var a; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 9,

                flags: 0
              }
            ],
            start: 4,
            end: 9,

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

                      flags: 0
                    },
                    initializer: null,
                    start: 18,
                    end: 20,

                    flags: 0
                  }
                ],
                start: 14,
                end: 21,

                flags: 0
              }
            ],
            start: 12,
            end: 23,

            flags: 0
          },
          start: 0,
          end: 23,

          flags: 0
        }
      ],
      text: 'for(let a;;) { var a; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate lexical binding `a`',
          code: 123,
          start: 19,
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

  it('function a() { "use strict"; ({ b(c, c) { } }); }', () => {
    t.deepStrictEqual(recovery('function a() { "use strict"; ({ b(c, c) { } }); }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 14,
                end: 27,

                flags: 0
              }
            ],
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
                        getter: false,
                        setter: false,
                        propertySetParameterList: null,
                        uniqueFormalParameters: [
                          {
                            type: 'BindingIdentifier',
                            name: 'c',
                            start: 34,
                            end: 35,

                            flags: 0
                          },
                          {
                            type: 'BindingIdentifier',
                            name: 'c',
                            start: 36,
                            end: 38,

                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 31,
                          end: 33,

                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 39,
                          end: 43,

                          flags: 0
                        },
                        start: 33,
                        end: 43,

                        flags: 0
                      }
                    ],
                    start: 30,
                    end: 45,

                    flags: 0
                  },
                  start: 28,
                  end: 46,

                  flags: 0
                },
                start: 28,
                end: 47,

                flags: 0
              }
            ],
            start: 12,
            end: 49,

            flags: 0
          },
          start: 0,
          end: 49,

          flags: 0
        }
      ],
      text: 'function a() { "use strict"; ({ b(c, c) { } }); }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `c`',
          code: 124,
          start: 36,
          length: 5
        }
      ],
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
    t.deepStrictEqual(recovery('class a extends b { constructor() { function* c(){ super(); } } }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'b',
            start: 15,
            end: 17,

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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'constructor',
                  start: 19,
                  end: 31,

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

                              flags: 0
                            },
                            start: 50,
                            end: 59,

                            flags: 0
                          }
                        ],
                        start: 49,
                        end: 61,

                        flags: 0
                      },
                      start: 35,
                      end: 61,

                      flags: 0
                    }
                  ],
                  start: 33,
                  end: 63,

                  flags: 0
                },
                start: 31,
                end: 63,

                flags: 0
              },
              start: 19,
              end: 63,

              flags: 0
            }
          ],
          start: 0,
          end: 65,

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
    t.deepStrictEqual(recovery('function a() { "use strict"; static = 1; }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 8,
            end: 10,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [
              {
                type: 'Directive',
                value: 'use strict',
                raw: '"use strict',
                start: 14,
                end: 27,

                flags: 0
              }
            ],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'static',
                    start: 28,
                    end: 35,

                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'NumericLiteral',

                    value: 1,
                    start: 37,
                    end: 39,

                    flags: 0
                  },
                  start: 28,
                  end: 39,

                  flags: 0
                },
                start: 28,
                end: 40,

                flags: 0
              }
            ],
            start: 12,
            end: 42,

            flags: 0
          },
          start: 0,
          end: 42,

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
    t.deepStrictEqual(recovery('({a(b){}} = 0)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
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
                    getter: false,
                    setter: false,
                    propertySetParameterList: null,
                    uniqueFormalParameters: [
                      {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 4,
                        end: 5,

                        flags: 0
                      }
                    ],
                    name: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 2,
                      end: 3,

                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 6,
                      end: 8,

                      flags: 0
                    },
                    start: 3,
                    end: 8,

                    flags: 0
                  }
                ],
                start: 1,
                end: 9,

                flags: 0
              },
              right: {
                type: 'NumericLiteral',

                value: 0,
                start: 11,
                end: 13,

                flags: 0
              },
              start: 1,
              end: 13,
              flags: 0
            },
            start: 0,
            end: 14,

            flags: 0
          },
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: '({a(b){}} = 0)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
          start: 10,
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

  it('(a, a) => 1;', () => {
    t.deepStrictEqual(recovery('(a, a) => 1;', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: true,
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 1,
                end: 2,

                flags: 0
              },
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 3,
                end: 5,

                flags: 0
              }
            ],
            contents: {
              type: 'NumericLiteral',
              value: 1,
              start: 9,
              end: 11,

              flags: 0
            },
            async: false,
            start: 0,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 12,

          flags: 0
        }
      ],
      text: '(a, a) => 1;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `a`',
          code: 124,
          start: 3,
          length: 8
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      type: 'RootNode',
      webCompat: true,
      end: 12
    });
  });

  it('!{ set a({b}){ let b; } };', () => {
    t.deepStrictEqual(recovery('!{ set a({b}){ let b; } };', 'recovery.js'), {
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
                  getter: false,
                  setter: true,
                  propertySetParameterList: {
                    type: 'ObjectBindingPattern',
                    properties: [
                      {
                        type: 'BindingIdentifier',
                        name: 'b',
                        start: 10,
                        end: 11,

                        flags: 0
                      }
                    ],
                    start: 9,
                    end: 12,

                    flags: 0
                  },
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 6,
                    end: 8,

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

                              flags: 0
                            },
                            initializer: null,
                            start: 18,
                            end: 20,

                            flags: 0
                          }
                        ],
                        start: 14,
                        end: 21,

                        flags: 0
                      }
                    ],
                    start: 13,
                    end: 23,

                    flags: 0
                  },
                  start: 8,
                  end: 23,

                  flags: 0
                }
              ],
              start: 1,
              end: 25,

              flags: 0
            },
            start: 0,
            end: 25,

            flags: 0
          },
          start: 0,
          end: 26,

          flags: 0
        }
      ],
      text: '!{ set a({b}){ let b; } };',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Duplicate binding `b`',
          code: 124,
          start: 19,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 26,
      type: 'RootNode',
      webCompat: true,
      end: 26
    });
  });

  it('for(let let in 1);', () => {
    t.deepStrictEqual(recovery('for(let let in 1);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 7,
                  end: 11,

                  flags: 0
                },
                initializer: null,
                start: 7,
                end: 11,

                flags: 0
              }
            ],
            start: 4,
            end: 11,

            flags: 0
          },
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 14,
            end: 16,

            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 17,
            end: 18,

            flags: 0
          },
          start: 0,
          end: 18,

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
    t.deepStrictEqual(recovery('function* a(){ ({ *b(c = yield d){} }); }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 9,
            end: 11,

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
                        getter: false,
                        setter: false,
                        propertySetParameterList: null,
                        uniqueFormalParameters: [
                          {
                            type: 'BindingElement',
                            left: {
                              type: 'BindingIdentifier',
                              name: 'c',
                              start: 21,
                              end: 22,

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

                                flags: 0
                              },
                              start: 24,
                              end: 32,

                              flags: 0
                            },
                            start: 21,
                            end: 32,

                            flags: 0
                          }
                        ],
                        name: {
                          type: 'IdentifierName',
                          name: 'b',
                          start: 19,
                          end: 20,

                          flags: 0
                        },
                        contents: {
                          type: 'FunctionBody',
                          directives: [],
                          leafs: [],
                          start: 33,
                          end: 35,

                          flags: 0
                        },
                        start: 20,
                        end: 35,

                        flags: 0
                      }
                    ],
                    start: 16,
                    end: 37,

                    flags: 0
                  },
                  start: 14,
                  end: 38,

                  flags: 0
                },
                start: 14,
                end: 39,

                flags: 0
              }
            ],
            start: 13,
            end: 41,

            flags: 0
          },
          start: 0,
          end: 41,

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
          message: '`Yield` expression cannot be used in function parameters',
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
    t.deepStrictEqual(recovery('({ __proto__: null, __proto__: null })', 'recovery.js'), {
      type: 'RootNode',
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
                    name: '__proto__',
                    start: 2,
                    end: 12,

                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 13,
                    end: 18,

                    flags: 0
                  },
                  start: 2,
                  end: 18,

                  flags: 0
                },
                {
                  type: 'PropertyName',
                  key: {
                    type: 'IdentifierName',
                    name: '__proto__',
                    start: 19,
                    end: 29,

                    flags: 0
                  },
                  value: {
                    type: 'NullLiteral',
                    value: null,
                    start: 30,
                    end: 35,

                    flags: 0
                  },
                  start: 19,
                  end: 35,

                  flags: 0
                }
              ],
              start: 1,
              end: 37,

              flags: 0
            },
            start: 0,
            end: 38,

            flags: 0
          },
          start: 0,
          end: 38,

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
