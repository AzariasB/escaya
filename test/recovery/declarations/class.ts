import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Class', () => {
  it('class foo { "static *async ', () => {
    t.deepStrictEqual(recovery('class foo { "static *async ', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 5,
            end: 9,

            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 11,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: '',
            start: 11,
            end: 27,

            flags: 0
          },
          start: 11,
          end: 27,

          flags: 0
        }
      ],
      text: 'class foo { "static *async ',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated string literal',
          code: 55,
          start: 12,
          length: 15
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

  it('class foo(/ {', () => {
    t.deepStrictEqual(recovery('class foo(/ {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 5,
            end: 9,

            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 9,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: ' ',
              flag: '',
              start: 10,
              end: 13,

              flags: 0
            },
            start: 9,
            end: 13,

            flags: 0
          },
          start: 9,
          end: 13,

          flags: 0
        }
      ],
      text: 'class foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 10,
          length: 3
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

  it('class { adf&/()})', () => {
    t.deepStrictEqual(recovery('class { adf&/()})', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'adf',
                  start: 7,
                  end: 11,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 11,
                  end: 11,

                  flags: 0
                },
                start: 11,
                end: 11,

                flags: 0
              },
              start: 7,
              end: 11,

              flags: 0
            }
          ],
          start: 0,
          end: 11,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,

              flags: 2
            },
            operator: '&',
            right: {
              type: 'RegularExpressionLiteral',
              pattern: '()}',
              flag: '',
              start: 12,
              end: 17,

              flags: 0
            },
            start: 11,
            end: 17,

            flags: 0
          },
          start: 11,
          end: 17,

          flags: 0
        }
      ],
      text: 'class { adf&/()})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 12,
          length: 5
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

  it('class x{[yield](a){}}', () => {
    t.deepStrictEqual(recovery('class x{[yield](a){}}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ArrayLiteral',
              elements: [
                {
                  type: 'IdentifierReference',
                  name: 'yield',
                  start: 9,
                  end: 14,

                  flags: 0
                }
              ],
              start: 8,
              end: 15,

              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 16,
                end: 17,

                flags: 0
              }
            ],
            start: 8,
            end: 18,

            flags: 0
          },
          start: 8,
          end: 18,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 18,
          end: 20,

          flags: 0
        }
      ],
      text: 'class x{[yield](a){}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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

  it('class x{   *', () => {
    t.deepStrictEqual(recovery('class x{   *', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 8,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,

              flags: 2
            },
            operator: '*',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 12,
              end: 12,

              flags: 2
            },
            start: 8,
            end: 12,

            flags: 0
          },
          start: 8,
          end: 12,

          flags: 0
        }
      ],
      text: 'class x{   *',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('class x { async *prot\\u006fty', () => {
    t.deepStrictEqual(recovery('class x { async *prot\\u006fty', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [
            {
              type: 'ClassElement',
              static: false,
              method: {
                type: 'MethodDefinition',
                async: true,
                generator: true,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'prototy',
                  start: 17,
                  end: 29,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 29,
                  end: 29,

                  flags: 0
                },
                start: 29,
                end: 29,

                flags: 0
              },
              start: 9,
              end: 29,

              flags: 0
            }
          ],
          start: 0,
          end: 29,

          flags: 0
        }
      ],
      text: 'class x { async *prot\\u006fty',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 17,
          length: 12
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

  it('class A { async class(x)', () => {
    t.deepStrictEqual(recovery('class A { async class(x)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'A',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [
            {
              type: 'ClassElement',
              static: false,
              method: {
                type: 'MethodDefinition',
                async: true,
                generator: false,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 22,
                    end: 23,

                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'class',
                  start: 15,
                  end: 21,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 24,
                  end: 24,

                  flags: 0
                },
                start: 21,
                end: 24,

                flags: 0
              },
              start: 9,
              end: 24,

              flags: 0
            }
          ],
          start: 0,
          end: 24,

          flags: 0
        }
      ],
      text: 'class A { async class(x)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
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

  it('class foo extends foo(/ {', () => {
    t.deepStrictEqual(recovery('class foo extends foo(/ {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 5,
            end: 9,

            flags: 0
          },
          heritage: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 17,
              end: 21,

              flags: 0
            },
            arguments: [
              {
                type: 'RegularExpressionLiteral',
                pattern: ' ',
                flag: '',
                start: 22,
                end: 25,

                flags: 0
              }
            ],
            start: 17,
            end: 25,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 25,

          flags: 0
        }
      ],
      text: 'class foo extends foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 22,
          length: 3
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

  it('class foo extends/ {', () => {
    t.deepStrictEqual(recovery('class foo extends/ {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 5,
            end: 9,

            flags: 0
          },
          heritage: {
            type: 'RegularExpressionLiteral',
            pattern: ' ',
            flag: '',
            start: 17,
            end: 20,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 20,

          flags: 0
        }
      ],
      text: 'class foo extends/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 17,
          length: 3
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

  it('class foo extends {', () => {
    t.deepStrictEqual(recovery('class foo extends {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 5,
            end: 9,

            flags: 0
          },
          heritage: {
            type: 'ObjectLiteral',
            properties: [],
            start: 17,
            end: 19,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 19,

          flags: 0
        }
      ],
      text: 'class foo extends {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('class true {}', () => {
    t.deepStrictEqual(recovery('class true {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 5,
            end: 10,

            flags: 0
          },
          start: 5,
          end: 10,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 10,
          end: 13,

          flags: 0
        }
      ],
      text: 'class true {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 11,
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

  it('class a { ;;; };', () => {
    t.deepStrictEqual(recovery('class a { ;;; }', 'recovery.js'), {
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
              type: 'Semicolon',
              start: 9,
              end: 11,

              flags: 0
            },
            {
              type: 'Semicolon',
              start: 11,
              end: 12,

              flags: 0
            },
            {
              type: 'Semicolon',
              start: 12,
              end: 13,

              flags: 0
            }
          ],
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'class a { ;;; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('class  { static prototype', () => {
    t.deepStrictEqual(recovery('class  { static prototype', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
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
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'prototype',
                  start: 15,
                  end: 25,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 25,
                  end: 25,

                  flags: 0
                },
                start: 25,
                end: 25,

                flags: 0
              },
              start: 15,
              end: 25,

              flags: 0
            }
          ],
          start: 0,
          end: 25,

          flags: 0
        }
      ],
      text: 'class  { static prototype',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 7,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Classes may not have a static property named prototype',
          code: 40,
          start: 16,
          length: 9
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

  it('class { async get(x', () => {
    t.deepStrictEqual(recovery('class { async get(x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                async: true,
                generator: false,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 18,
                    end: 19,

                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 13,
                  end: 17,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 19,
                  end: 19,

                  flags: 0
                },
                start: 17,
                end: 19,

                flags: 0
              },
              start: 7,
              end: 19,

              flags: 0
            }
          ],
          start: 0,
          end: 19,

          flags: 0
        }
      ],
      text: 'class { async get(x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('class class class (class)', () => {
    t.deepStrictEqual(recovery('class class class (class)', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 5,
          end: 11,

          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 11,
          end: 17,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ClassExpression',
              name: null,
              heritage: null,
              elements: [],
              start: 19,
              end: 24,

              flags: 0
            },
            start: 17,
            end: 25,

            flags: 0
          },
          start: 17,
          end: 25,

          flags: 0
        }
      ],
      text: 'class class class (class)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 12,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
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

  it('class { class', () => {
    t.deepStrictEqual(recovery('class { class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'class',
                  start: 7,
                  end: 13,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 13,
                  end: 13,

                  flags: 0
                },
                start: 13,
                end: 13,

                flags: 0
              },
              start: 7,
              end: 13,

              flags: 0
            }
          ],
          start: 0,
          end: 13,

          flags: 0
        }
      ],
      text: 'class { class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 8,
          length: 5
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

  it('class function async yield await class', () => {
    t.deepStrictEqual(recovery('class function async yield await class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 14,
            end: 20,

            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 20,
            end: 20,

            flags: 0
          },
          start: 5,
          end: 20,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'yield',
            start: 20,
            end: 26,

            flags: 0
          },
          start: 20,
          end: 26,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'await',
            start: 26,
            end: 32,

            flags: 0
          },
          start: 26,
          end: 32,

          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 32,
          end: 38,

          flags: 0
        }
      ],
      text: 'class function async yield await class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 21,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 27,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 33,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 38,
      end: 38
    });
  });

  it('[class}!', () => {
    t.deepStrictEqual(recovery('[class}!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',

            elements: [
              {
                type: 'ClassExpression',
                name: null,
                heritage: null,
                elements: [],
                start: 1,
                end: 6,

                flags: 0
              }
            ],
            start: 0,
            end: 6,
            flags: 0
          },
          start: 0,
          end: 6,

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
              start: 8,
              end: 8,

              flags: 2
            },
            start: 7,
            end: 8,

            flags: 0
          },
          start: 7,
          end: 8,

          flags: 0
        }
      ],
      text: '[class}!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 6,
          length: 1
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
      end: 8
    });
  });

  it('!class!!', () => {
    t.deepStrictEqual(recovery('!class!!', 'recovery.js'), {
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
              type: 'ClassExpression',
              name: null,
              heritage: null,
              elements: [],
              start: 1,
              end: 6,

              flags: 0
            },
            start: 0,
            end: 6,

            flags: 0
          },
          start: 0,
          end: 6,

          flags: 0
        },
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
                start: 8,
                end: 8,

                flags: 2
              },
              start: 7,
              end: 8,

              flags: 0
            },
            start: 6,
            end: 8,

            flags: 0
          },
          start: 6,
          end: 8,

          flags: 0
        }
      ],
      text: '!class!!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 6,
          length: 1
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
      end: 8
    });
  });

  it('class x { async get constructor ', () => {
    t.deepStrictEqual(recovery('class x { async get constructor', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [
            {
              type: 'ClassElement',
              static: false,
              method: {
                type: 'MethodDefinition',
                async: true,
                generator: false,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 15,
                  end: 19,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 19,
                  end: 19,

                  flags: 0
                },
                start: 19,
                end: 19,

                flags: 0
              },
              start: 9,
              end: 19,

              flags: 0
            },
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
                  leafs: [],
                  start: 31,
                  end: 31,

                  flags: 0
                },
                start: 31,
                end: 31,

                flags: 0
              },
              start: 19,
              end: 31,

              flags: 0
            }
          ],
          start: 0,
          end: 31,

          flags: 0
        }
      ],
      text: 'class x { async get constructor',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 20,
          length: 11
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

  it('class z y(){} x() {{', () => {
    t.deepStrictEqual(recovery('class z y(){} x() {{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'z',
            start: 5,
            end: 7,

            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 7,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'y',
              start: 7,
              end: 9,

              flags: 0
            },
            arguments: [],
            start: 7,
            end: 11,

            flags: 0
          },
          start: 7,
          end: 11,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 11,
          end: 13,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 13,
              end: 15,

              flags: 0
            },
            arguments: [],
            start: 13,
            end: 17,

            flags: 0
          },
          start: 13,
          end: 17,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'BlockStatement',
              leafs: [],
              start: 19,
              end: 20,

              flags: 0
            }
          ],
          start: 17,
          end: 20,

          flags: 0
        }
      ],
      text: 'class z y(){} x() {{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('class {', () => {
    t.deepStrictEqual(recovery('class {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 7,

          flags: 0
        }
      ],
      text: 'class {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
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

  it('{class', () => {
    t.deepStrictEqual(recovery('{class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ClassDeclaration',
              name: null,
              heritage: null,
              elements: [],
              start: 1,
              end: 6,

              flags: 0
            }
          ],
          start: 0,
          end: 6,

          flags: 0
        }
      ],
      text: '{class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 1,
          length: 5
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

  it('if(class) {', () => {
    t.deepStrictEqual(recovery('if(class) {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ClassExpression',
            name: null,
            heritage: null,
            elements: [],
            start: 3,
            end: 8,

            flags: 0
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 11,

            flags: 0
          },
          alternate: null,
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'if(class) {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 10,
          length: 1
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

  it('class(class{', () => {
    t.deepStrictEqual(recovery('class(class{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ClassExpression',
              name: null,
              heritage: null,
              elements: [],
              start: 6,
              end: 12,

              flags: 0
            },
            start: 5,
            end: 12,

            flags: 0
          },
          start: 5,
          end: 12,

          flags: 0
        }
      ],
      text: 'class(class{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('class a {class', () => {
    t.deepStrictEqual(recovery('class a {class', 'recovery.js'), {
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
                  name: 'class',
                  start: 9,
                  end: 14,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 14,
                  end: 14,

                  flags: 0
                },
                start: 14,
                end: 14,

                flags: 0
              },
              start: 9,
              end: 14,

              flags: 0
            }
          ],
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'class a {class',
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
          length: 5
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

  it('class a { a() {}', () => {
    t.deepStrictEqual(recovery('class a { a() {}', 'recovery.js'), {
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
                  name: 'a',
                  start: 9,
                  end: 11,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 13,
                  end: 16,

                  flags: 0
                },
                start: 11,
                end: 16,

                flags: 0
              },
              start: 9,
              end: 16,

              flags: 0
            }
          ],
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: 'class a { a() {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('class [}', () => {
    t.deepStrictEqual(recovery('class [}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',

            elements: [],
            flags: 0,
            start: 5,
            end: 7
          },
          start: 5,
          end: 7,

          flags: 0
        }
      ],
      text: 'class [}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
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

  it('class { async get () {}}', () => {
    t.deepStrictEqual(recovery('class { async get () {}}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                async: true,
                generator: false,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 13,
                  end: 17,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 20,
                  end: 23,

                  flags: 0
                },
                start: 17,
                end: 23,

                flags: 0
              },
              start: 7,
              end: 23,

              flags: 0
            }
          ],
          start: 0,
          end: 24,

          flags: 0
        }
      ],
      text: 'class { async get () {}}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
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

  it('class{ static x', () => {
    t.deepStrictEqual(recovery('class{ static x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
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
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 13,
                  end: 15,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 15,
                  end: 15,

                  flags: 0
                },
                start: 15,
                end: 15,

                flags: 0
              },
              start: 13,
              end: 15,

              flags: 0
            }
          ],
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'class{ static x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 5,
          length: 1
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

  it('class while { constructor x', () => {
    t.deepStrictEqual(recovery('class while { constructor x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'constructor',
                start: 13,
                end: 25,

                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 25,
                end: 27,

                flags: 0
              }
            ],
            start: 11,
            end: 27,

            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 27,
              end: 27,

              flags: 2
            },
            start: 27,
            end: 27,

            flags: 0
          },
          start: 5,
          end: 27,

          flags: 0
        }
      ],
      text: 'class while { constructor x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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

  it('class { constructor x', () => {
    t.deepStrictEqual(recovery('class { constructor x', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 19,
                  end: 21,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 21,
                  end: 21,

                  flags: 0
                },
                start: 21,
                end: 21,

                flags: 0
              },
              start: 7,
              end: 21,

              flags: 0
            }
          ],
          start: 0,
          end: 21,

          flags: 0
        }
      ],
      text: 'class { constructor x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token. A accessor was expected',
          code: 39,
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

  it('class extends {', () => {
    t.deepStrictEqual(recovery('class extends {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: {
            type: 'ObjectLiteral',
            properties: [],
            start: 13,
            end: 15,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'class extends {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('Unterminated regexp after class', () => {
    t.deepStrictEqual(recovery('class /a', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 12,
          kind: 2,
          length: 2,
          message: 'Unterminated regular expression',
          source: 0,
          start: 6
        }
      ],
      directives: [],
      end: 8,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,

      type: 'RootNode',
      webCompat: true,
      length: 8,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          elements: [],
          end: 5,
          flags: 0,

          name: null,
          start: 0,
          heritage: null,
          type: 'ClassDeclaration'
        },
        {
          end: 8,
          expression: {
            end: 8,
            flag: '',
            flags: 0,

            pattern: '',
            start: 5,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,

          start: 5,
          type: 'ExpressionStatement'
        }
      ],
      text: 'class /a'
    });
  });

  it('Unterminated regexp in parenthesis after class', () => {
    t.deepStrictEqual(recovery('class a (/a', 'recovery.js'), {
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
          elements: [],
          start: 0,
          end: 7,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: '',
              flag: '',
              start: 9,
              end: 11,

              flags: 0
            },
            start: 7,
            end: 11,

            flags: 0
          },
          start: 7,
          end: 11,

          flags: 0
        }
      ],
      text: 'class a (/a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 9,
          length: 2
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

  it('Unterminated regexp in parenthesis after class element', () => {
    t.deepStrictEqual(recovery('class a {/a', 'recovery.js'), {
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
          elements: [],
          start: 0,
          end: 9,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 9,
            end: 11,

            flags: 0
          },
          start: 9,
          end: 11,

          flags: 0
        }
      ],
      text: 'class a {/a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 9,
          length: 2
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

  it('class extends { class', () => {
    t.deepStrictEqual(recovery('class extends { class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'class',
                start: 15,
                end: 21,

                flags: 0
              }
            ],
            start: 13,
            end: 21,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 21,

          flags: 0
        }
      ],
      text: 'class extends { class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 7
        },
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 15,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 16,
          length: 5
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

  it('class extends class', () => {
    t.deepStrictEqual(recovery('class extends class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: {
            type: 'ClassExpression',
            name: null,
            heritage: null,
            elements: [],
            start: 13,
            end: 19,

            flags: 0
          },
          elements: [],
          start: 0,
          end: 19,

          flags: 0
        }
      ],
      text: 'class extends class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 14,
          length: 5
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

  it('class { a() {{', () => {
    t.deepStrictEqual(recovery('class { a() {{', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [
                    {
                      type: 'BlockStatement',
                      leafs: [],
                      start: 13,
                      end: 14,

                      flags: 0
                    }
                  ],
                  start: 11,
                  end: 14,

                  flags: 0
                },
                start: 9,
                end: 14,

                flags: 0
              },
              start: 7,
              end: 14,

              flags: 0
            }
          ],
          start: 0,
          end: 14,

          flags: 0
        }
      ],
      text: 'class { a() {{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('class{set(x,...', () => {
    t.deepStrictEqual(recovery('class{set(x,...', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 10,
                    end: 11,

                    flags: 0
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 12,
                      end: 15,

                      flags: 0
                    },
                    start: 12,
                    end: 15,

                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'set',
                  start: 6,
                  end: 9,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 15,
                  end: 15,

                  flags: 0
                },
                start: 9,
                end: 15,

                flags: 0
              },
              start: 6,
              end: 15,

              flags: 0
            }
          ],
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'class{set(x,...',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 12,
          length: 3
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

  it('class{foo(....a) class', () => {
    t.deepStrictEqual(recovery('class{foo(....a) class', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 10,
                      end: 13,

                      flags: 0
                    },
                    start: 10,
                    end: 13,

                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'foo',
                  start: 6,
                  end: 9,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 13,
                  end: 13,

                  flags: 0
                },
                start: 9,
                end: 13,

                flags: 0
              },
              start: 6,
              end: 13,

              flags: 0
            }
          ],
          start: 0,
          end: 13,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 14,
            end: 15,

            flags: 0
          },
          start: 14,
          end: 15,

          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 16,
          end: 22,

          flags: 0
        }
      ],
      text: 'class{foo(....a) class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 15,
          length: 1
        },
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 17,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });
});
