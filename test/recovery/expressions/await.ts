import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Await', () => {
  it('5 + (await bar(', () => {
    t.deepStrictEqual(recovery('5 + (await bar(', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'NumericLiteral',
              value: 5,
              start: 0,
              end: 1,
              flags: 0
            },
            operator: '+',
            right: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'await',
                start: 5,
                end: 10,
                flags: 0
              },
              start: 3,
              end: 10,
              flags: 0
            },
            start: 0,
            end: 10,
            flags: 0
          },
          start: 0,
          end: 10,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'bar',
              start: 10,
              end: 14,
              flags: 0
            },
            arguments: [],
            start: 10,
            end: 15,

            flags: 0
          },
          start: 10,
          end: 15,
          flags: 0
        }
      ],
      text: '5 + (await bar(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 11,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('class x {*f(foo = await bar', () => {
    t.deepStrictEqual(recovery('class x {*f(foo = await bar', 'recovery.js'), {
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
          end: 9,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,

              flags: 2
            },
            operator: '*',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'f',
                start: 10,
                end: 11,

                flags: 0
              },
              arguments: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'foo',
                    start: 12,
                    end: 15,

                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'await',
                    start: 17,
                    end: 23,

                    flags: 0
                  },
                  start: 12,
                  end: 23,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'bar',
                  start: 23,
                  end: 27,

                  flags: 0
                }
              ],
              start: 10,
              end: 27,

              flags: 0
            },
            start: 9,
            end: 27,

            flags: 0
          },
          start: 9,
          end: 27,

          flags: 0
        }
      ],
      text: 'class x {*f(foo = await bar',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 24,
          length: 3
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

  it('await p + await q', () => {
    t.deepStrictEqual(recovery('await p + await q', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'await',
            start: 0,
            end: 5,

            flags: 0
          },
          start: 0,
          end: 5,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'p',
              start: 5,
              end: 7,

              flags: 0
            },
            operator: '+',
            right: {
              type: 'IdentifierReference',
              name: 'await',
              start: 9,
              end: 15,

              flags: 0
            },
            start: 5,
            end: 15,

            flags: 0
          },
          start: 5,
          end: 15,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'q',
            start: 15,
            end: 17,

            flags: 0
          },
          start: 15,
          end: 17,

          flags: 0
        }
      ],
      text: 'await p + await q',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('([x] = await bar =>', () => {
    t.deepStrictEqual(recovery('([x] = await bar =>', 'recovery.js'), {
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'AssignmentElement',
              left: {
                type: 'ArrayAssignmentPattern',
                elements: [
                  {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 2,
                    end: 3,

                    flags: 0
                  }
                ],
                start: 1,
                end: 4,

                flags: 0
              },
              right: {
                type: 'IdentifierReference',
                name: 'await',
                start: 6,
                end: 12,

                flags: 0
              },
              start: 1,
              end: 12,
              flags: 0
            },
            start: 0,
            end: 12,

            flags: 0
          },
          start: 0,
          end: 12,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            arrowParameters: false,
            params: {
              type: 'BindingIdentifier',
              name: 'bar',
              start: 12,
              end: 16,

              flags: 0
            },
            contents: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,

              flags: 2
            },
            async: false,
            start: 12,
            end: 19,

            flags: 0
          },
          start: 12,
          end: 19,

          flags: 0
        }
      ],
      text: '([x] = await bar =>',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 19,
      type: 'RootNode',
      webCompat: true,
      end: 19
    });
  });

  it('(x=(await z)=', () => {
    t.deepStrictEqual(recovery('(x=(await z)=', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: 'x',
                start: 1,
                end: 2,

                flags: 0
              },
              operator: '=',
              right: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'await',
                  start: 4,
                  end: 9,

                  flags: 0
                },
                start: 3,
                end: 9,

                flags: 0
              },
              start: 1,
              end: 9,

              flags: 0
            },
            start: 0,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 9,

          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'z',
            start: 9,
            end: 11,

            flags: 0
          },
          start: 9,
          end: 11,

          flags: 0
        }
      ],
      text: '(x=(await z)=',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
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
          message: 'Statement expected',
          code: 8,
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

  it('async function foo(a, b) { await a +', () => {
    t.deepStrictEqual(recovery('async function foo(a, b) { await a +', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 14,
            end: 18,

            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'a',
              start: 19,
              end: 20,

              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'b',
              start: 21,
              end: 23,

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
                  type: 'AwaitExpression',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 32,
                      end: 34,

                      flags: 0
                    },
                    operator: '+',
                    right: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 36,
                      end: 36,

                      flags: 2
                    },
                    start: 32,
                    end: 36,

                    flags: 0
                  },
                  start: 26,
                  end: 36,

                  flags: 0
                },
                start: 26,
                end: 36,

                flags: 0
              }
            ],
            start: 24,
            end: 36,

            flags: 0
          },
          start: 0,
          end: 36,

          flags: 0
        }
      ],
      text: 'async function foo(a, b) { await a +',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 35,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 36,
      end: 36
    });
  });
  it('class x {f(foo = await){', () => {
    t.deepStrictEqual(recovery('class x {f(foo = await){', 'recovery.js'), {
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
                async: false,
                generator: false,
                getter: false,
                setter: false,
                propertySetParameterList: null,
                uniqueFormalParameters: [
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'foo',
                      start: 11,
                      end: 14,

                      flags: 0
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: 'await',
                      start: 16,
                      end: 22,

                      flags: 0
                    },
                    start: 11,
                    end: 22,
                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'f',
                  start: 9,
                  end: 10,

                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 23,
                  end: 24,

                  flags: 0
                },
                start: 10,
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
      text: 'class x {f(foo = await){',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('(await!', () => {
    t.deepStrictEqual(recovery('(await!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'await',
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
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            start: 6,
            end: 7,
            flags: 0
          },
          start: 6,
          end: 7,

          flags: 0
        }
      ],
      text: '(await!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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
});
