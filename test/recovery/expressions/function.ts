import * as t from 'assert';
import { recovery } from '../../../src/escaya';

// See the tests for Function declaration for more function tests

describe('Recovery - Expressions - Function', () => {
  it('(function', () => {
    t.deepStrictEqual(recovery('(function', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: {
                type: 'BindingIdentifier',
                name: '',
                start: 9,
                end: 9,

                flags: 0
              },
              generator: false,
              async: false,
              params: [],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 9,
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
        }
      ],
      text: '(function',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 1,
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

  it('(function foo(/ {', () => {
    t.deepStrictEqual(recovery('(function foo(/ {', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`)` expected',
          source: 2,
          start: 14
        },
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`}` expected',
          source: 2,
          start: 16
        }
      ],
      directives: [],
      end: 17,
      fileName: 'recovery.js',
      incremental: false,

      type: 'RootNode',
      webCompat: true,
      leafs: [
        {
          end: 17,
          expression: {
            end: 17,
            expression: {
              end: 17,
              flags: 0,
              left: {
                async: false,
                contents: {
                  directives: [],
                  end: 14,
                  flags: 0,

                  leafs: [],
                  start: 14,
                  type: 'FunctionBody'
                },
                end: 14,
                flags: 0,
                generator: false,

                name: {
                  end: 13,
                  flags: 0,

                  name: 'foo',
                  start: 9,
                  type: 'BindingIdentifier'
                },
                params: [],
                start: 1,
                type: 'FunctionExpression'
              },
              operator: '/',
              right: {
                end: 17,
                flags: 0,
                properties: [],
                start: 15,
                type: 'ObjectLiteral'
              },
              start: 1,
              type: 'BinaryExpression'
            },
            flags: 0,

            start: 0,
            type: 'ParenthesizedExpression'
          },
          flags: 0,

          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 17,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '(function foo(/ {'
    });
  });

  it('(function foo() { if (true) {', () => {
    t.deepStrictEqual(recovery('(function foo() { if (true) {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: {
                type: 'BindingIdentifier',
                name: 'foo',
                start: 9,
                end: 13,

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
                    type: 'IfStatement',
                    expression: {
                      type: 'BooleanLiteral',
                      value: true,
                      start: 22,
                      end: 26,

                      flags: 0
                    },
                    consequent: {
                      type: 'BlockStatement',
                      leafs: [],
                      start: 27,
                      end: 29,

                      flags: 0
                    },
                    alternate: null,
                    start: 17,
                    end: 29,
                    flags: 0
                  }
                ],
                start: 15,
                end: 29,

                flags: 0
              },
              start: 1,
              end: 29,

              flags: 0
            },
            start: 0,
            end: 29,

            flags: 0
          },
          start: 0,
          end: 29,

          flags: 0
        }
      ],
      text: '(function foo() { if (true) {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it(`(function (A) {
    function foo() {
        if (true) {
            B.
            ;
            var B;
            (function (B) {
                function baz() { }
                B.baz = baz;
            })(B || (B = {}));
        }
    }
})(A || (A = {}));`, () => {
    t.deepStrictEqual(
      recovery(
        `(function (A) {
      function foo() {
          if (true) {
              B.
              ;
              var B;
              (function (B) {
                  function baz() { }
                  B.baz = baz;
              })(B || (B = {}));
          }
      }
  })(A || (A = {}));`,
        'recovery.js'
      ),
      {
        type: 'RootNode',
        webCompat: true,
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'FunctionExpression',
                  name: null,
                  generator: false,
                  async: false,
                  params: [
                    {
                      type: 'BindingIdentifier',
                      name: 'A',
                      start: 11,
                      end: 12,

                      flags: 0
                    }
                  ],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [
                      {
                        type: 'FunctionDeclaration',
                        name: {
                          type: 'BindingIdentifier',
                          name: 'foo',
                          start: 30,
                          end: 34,

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
                              type: 'IfStatement',
                              expression: {
                                type: 'BooleanLiteral',
                                value: true,
                                start: 53,
                                end: 57,

                                flags: 0
                              },
                              consequent: {
                                type: 'BlockStatement',
                                leafs: [
                                  {
                                    type: 'ExpressionStatement',
                                    expression: {
                                      type: 'MemberExpression',
                                      member: {
                                        type: 'IdentifierReference',
                                        name: 'B',
                                        start: 60,
                                        end: 76,

                                        flags: 0
                                      },
                                      expression: {
                                        type: 'IdentifierReference',
                                        name: '',
                                        start: 77,
                                        end: 77,

                                        flags: 2
                                      },
                                      computed: false,
                                      start: 60,
                                      end: 77,
                                      flags: 0
                                    },
                                    start: 60,
                                    end: 93,

                                    flags: 0
                                  },
                                  {
                                    type: 'VariableStatement',
                                    declarations: [
                                      {
                                        type: 'VariableDeclaration',
                                        binding: {
                                          type: 'BindingIdentifier',
                                          name: 'B',
                                          start: 111,
                                          end: 113,

                                          flags: 0
                                        },
                                        initializer: null,
                                        start: 111,
                                        end: 113,
                                        flags: 0
                                      }
                                    ],
                                    start: 93,
                                    end: 114,
                                    flags: 0
                                  },
                                  {
                                    type: 'ExpressionStatement',
                                    expression: {
                                      type: 'CallExpression',
                                      expression: {
                                        type: 'ParenthesizedExpression',
                                        expression: {
                                          type: 'FunctionExpression',
                                          name: null,
                                          generator: false,
                                          async: false,
                                          params: [
                                            {
                                              type: 'BindingIdentifier',
                                              name: 'B',
                                              start: 140,
                                              end: 141,

                                              flags: 0
                                            }
                                          ],
                                          contents: {
                                            type: 'FunctionBody',
                                            directives: [],
                                            leafs: [
                                              {
                                                type: 'FunctionDeclaration',
                                                name: {
                                                  type: 'BindingIdentifier',
                                                  name: 'baz',
                                                  start: 171,
                                                  end: 175,

                                                  flags: 0
                                                },
                                                generator: false,
                                                async: false,
                                                params: [],
                                                contents: {
                                                  type: 'FunctionBody',
                                                  directives: [],
                                                  leafs: [],
                                                  start: 177,
                                                  end: 181,

                                                  flags: 0
                                                },
                                                start: 144,
                                                end: 181,
                                                flags: 0
                                              },
                                              {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                  type: 'AssignmentExpression',
                                                  left: {
                                                    type: 'MemberExpression',
                                                    member: {
                                                      type: 'IdentifierReference',
                                                      name: 'B',
                                                      start: 181,
                                                      end: 201,

                                                      flags: 0
                                                    },
                                                    expression: {
                                                      type: 'IdentifierName',
                                                      name: 'baz',
                                                      start: 202,
                                                      end: 205,

                                                      flags: 0
                                                    },
                                                    computed: false,
                                                    start: 181,
                                                    end: 205,
                                                    flags: 0
                                                  },
                                                  operator: '=',
                                                  right: {
                                                    type: 'IdentifierReference',
                                                    name: 'baz',
                                                    start: 207,
                                                    end: 211,

                                                    flags: 0
                                                  },
                                                  start: 181,
                                                  end: 211,
                                                  flags: 0
                                                },
                                                start: 181,
                                                end: 212,

                                                flags: 0
                                              }
                                            ],
                                            start: 142,
                                            end: 228,

                                            flags: 0
                                          },
                                          start: 130,
                                          end: 228,

                                          flags: 0
                                        },
                                        start: 114,
                                        end: 229,

                                        flags: 0
                                      },
                                      arguments: [
                                        {
                                          type: 'BinaryExpression',
                                          left: {
                                            type: 'IdentifierReference',
                                            name: 'B',
                                            start: 230,
                                            end: 231,

                                            flags: 0
                                          },
                                          operator: '||',
                                          right: {
                                            type: 'ParenthesizedExpression',
                                            expression: {
                                              type: 'AssignmentExpression',
                                              left: {
                                                type: 'IdentifierReference',
                                                name: 'B',
                                                start: 236,
                                                end: 237,

                                                flags: 0
                                              },
                                              operator: '=',
                                              right: {
                                                type: 'ObjectLiteral',
                                                properties: [],
                                                start: 239,
                                                end: 242,
                                                flags: 0
                                              },
                                              start: 236,
                                              end: 242,
                                              flags: 0
                                            },
                                            start: 234,
                                            end: 243,

                                            flags: 0
                                          },
                                          start: 230,
                                          end: 243,
                                          flags: 0
                                        }
                                      ],
                                      start: 114,
                                      end: 244,
                                      flags: 0
                                    },
                                    start: 114,
                                    end: 245,

                                    flags: 0
                                  }
                                ],
                                start: 58,
                                end: 257,

                                flags: 0
                              },
                              alternate: null,
                              start: 38,
                              end: 257,
                              flags: 0
                            }
                          ],
                          start: 36,
                          end: 265,

                          flags: 0
                        },
                        start: 15,
                        end: 265,
                        flags: 0
                      }
                    ],
                    start: 13,
                    end: 269,

                    flags: 0
                  },
                  start: 1,
                  end: 269,

                  flags: 0
                },
                start: 0,
                end: 270,

                flags: 0
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'A',
                    start: 271,
                    end: 272,

                    flags: 0
                  },
                  operator: '||',
                  right: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'IdentifierReference',
                        name: 'A',
                        start: 277,
                        end: 278,

                        flags: 0
                      },
                      operator: '=',
                      right: {
                        type: 'ObjectLiteral',
                        properties: [],
                        start: 280,
                        end: 283,
                        flags: 0
                      },
                      start: 277,
                      end: 283,
                      flags: 0
                    },
                    start: 275,
                    end: 284,

                    flags: 0
                  },
                  start: 271,
                  end: 284,
                  flags: 0
                }
              ],
              start: 0,
              end: 285,
              flags: 0
            },
            start: 0,
            end: 286,

            flags: 0
          }
        ],
        text:
          '(function (A) {\n      function foo() {\n          if (true) {\n              B.\n              ;\n              var B;\n              (function (B) {\n                  function baz() { }\n                  B.baz = baz;\n              })(B || (B = {}));\n          }\n      }\n  })(A || (A = {}));',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 92,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 286,
        end: 286
      }
    );
  });

  it('function for (var of X) { }', () => {
    t.deepStrictEqual(recovery('function for (var of X) { }', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: null,
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,
          flags: 0
        },
        {
          type: 'ForStatement',
          variableDeclarationList: true,
          initializer: [
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'of',
                start: 17,
                end: 20,

                flags: 0
              },
              initializer: null,
              start: 17,
              end: 20,
              flags: 0
            },
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'X',
                start: 20,
                end: 22,

                flags: 0
              },
              initializer: null,
              start: 20,
              end: 22,
              flags: 0
            }
          ],
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 22,
            end: 22,

            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 23,
            end: 27,

            flags: 0
          },
          start: 8,
          end: 27,
          flags: 0
        }
      ],
      text: 'function for (var of X) { }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 9,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'For declaration expected',
          code: 17,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'For declaration expected',
          code: 17,
          start: 22,
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

  it('(function!', () => {
    t.deepStrictEqual(recovery('(function!', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'FunctionExpression',
              name: {
                type: 'BindingIdentifier',
                name: '',
                start: 9,
                end: 9,

                flags: 0
              },
              generator: false,
              async: false,
              params: [],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 9,
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
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 10,
              end: 10,

              flags: 2
            },
            start: 9,
            end: 10,
            flags: 0
          },
          start: 9,
          end: 10,

          flags: 0
        }
      ],
      text: '(function!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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
});
