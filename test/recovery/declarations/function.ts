import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Function', () => {
  it('async function *foo(x) { async; await; yield;', () => {
    t.deepEqual(recovery('async function *foo(x) { async; await; yield;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 16,
            end: 19,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 20,
              end: 21,
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
                  type: 'IdentifierReference',
                  name: 'async',
                  start: 24,
                  end: 30,
                  kind: 13,
                  flags: 0
                },
                start: 24,
                end: 31,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AwaitExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 37,
                    end: 37,
                    kind: 13,
                    flags: 2
                  },
                  start: 31,
                  end: 37,
                  kind: 190,
                  flags: 0
                },
                start: 31,
                end: 38,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'YieldExpression',
                  delegate: false,
                  argument: null,
                  start: 38,
                  end: 44,
                  kind: 193,
                  flags: 0
                },
                start: 38,
                end: 45,
                kind: 122,
                flags: 0
              }
            ],
            start: 22,
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
      text: 'async function *foo(x) { async; await; yield;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 37,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 44,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 45,
      end: 45
    });
  });

  it('Unterminated regexp after function', () => {
    t.deepEqual(recovery('function /a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
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
            start: 8,
            end: 8,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 8,
            end: 11,
            kind: 15,
            flags: 0
          },
          start: 8,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function /a',
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

  it('function true {}', () => {
    t.deepEqual(recovery('function true {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
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
            start: 8,
            end: 8,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 8,
            end: 13,
            kind: 166,
            flags: 0
          },
          start: 8,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 16,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function true {}',
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
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 14,
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
  it('function{', () => {
    t.deepEqual(recovery('function{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
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
            start: 8,
            end: 9,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 8,
          length: 1
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

  it('Unclosed block statement33', () => {
    t.deepEqual(recovery('function a{', 'recovery.js'), {
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
            leafs: [],
            start: 10,
            end: 11,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('function a(function {', () => {
    t.deepEqual(recovery('function a(function {', 'recovery.js'), {
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
              name: 'function',
              start: 11,
              end: 19,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingElement',
              left: {
                type: 'ObjectBindingPattern',
                properties: [],
                start: 19,
                end: 21,
                kind: 169,
                flags: 0
              },
              right: null,
              start: 19,
              end: 21,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 21,
            end: 21,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function a(function {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
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

  it('function (function, break {', () => {
    t.deepEqual(recovery('function (function, break {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'function',
              start: 10,
              end: 18,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 19,
            end: 19,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 186,
          flags: 0
        },
        {
          type: 'BreakStatement',
          label: null,
          start: 19,
          end: 25,
          kind: 124,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 25,
          end: 27,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function (function, break {',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 20,
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
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

  it('function (x,,,,,,,, {', () => {
    t.deepEqual(recovery('function (x,,,,,,,, {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 10,
              end: 11,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 12,
            end: 12,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 186,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 19,
          end: 21,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function (x,,,,,,,, {',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 15,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 16,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 18,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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

  it('function !(', () => {
    t.deepEqual(recovery('function !(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
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
            start: 8,
            end: 8,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,
                kind: 13,
                flags: 2
              },
              start: 10,
              end: 11,
              kind: 189,
              flags: 0
            },
            start: 8,
            end: 11,
            kind: 160,
            flags: 0
          },
          start: 8,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function !(',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('function while() {}', () => {
    t.deepEqual(recovery('function while() {}', 'recovery.js'), {
      kind: 209,
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
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 186,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 15,
            end: 15,
            kind: 13,
            flags: 2
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 16,
            end: 19,
            kind: 123,
            flags: 0
          },
          start: 8,
          end: 19,
          kind: 139,
          flags: 0
        }
      ],
      text: 'function while() {}',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
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

  it('Unclosed block statement32424fdas', () => {
    t.deepEqual(recovery('async function', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: null,
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 14,
            end: 14,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 6,
          length: 8
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

  it('async function * {', () => {
    t.deepEqual(recovery('async function * {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 16,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 16,
            end: 18,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 18,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function * {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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

  it('Unclosed block statement+0+09', () => {
    t.deepEqual(recovery('function * a {', 'recovery.js'), {
      kind: 209,
      directives: [],
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
          generator: true,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 12,
            end: 14,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function * a {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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

  it('function(...[{[x]},,,,', () => {
    t.deepEqual(recovery('function(...[{[x]},,,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingRestElement',
              argument: {
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
                            type: 'ComputedPropertyName',
                            expression: {
                              type: 'IdentifierReference',
                              name: 'x',
                              start: 15,
                              end: 16,
                              kind: 13,
                              flags: 0
                            },
                            start: 14,
                            end: 17,
                            kind: 171,
                            flags: 0
                          },
                          value: {
                            type: 'BindingIdentifier',
                            name: '',
                            start: 17,
                            end: 18,
                            kind: 168,
                            flags: 0
                          },
                          start: 14,
                          end: 18,
                          kind: 227,
                          flags: 0
                        }
                      ],
                      start: 13,
                      end: 19,
                      kind: 169,
                      flags: 0
                    },
                    right: null,
                    start: 13,
                    end: 19,
                    kind: 172,
                    flags: 0
                  },
                  {
                    type: 'Elison',
                    start: 12,
                    end: 21,
                    kind: 176,
                    flags: 0
                  }
                ],
                start: 12,
                end: 22,
                kind: 174,
                flags: 0
              },
              start: 9,
              end: 22,
              kind: 175,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 22,
            end: 22,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 22,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function(...[{[x]},,,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 17,
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
          message: '`]` expected',
          code: 5,
          start: 21,
          length: 1
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

  it('function ({function (function (', () => {
    t.deepEqual(recovery('function ({function (function (', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: '',
            start: 8,
            end: 8,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingElement',
              left: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'function',
                    start: 11,
                    end: 19,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: '',
                      start: 21,
                      end: 21,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'BindingIdentifier',
                      name: 'function',
                      start: 21,
                      end: 29,
                      kind: 168,
                      flags: 0
                    },
                    start: 19,
                    end: 29,
                    kind: 227,
                    flags: 0
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: '',
                      start: 31,
                      end: 31,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 31,
                      end: 31,
                      kind: 168,
                      flags: 0
                    },
                    start: 29,
                    end: 31,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 10,
                end: 31,
                kind: 169,
                flags: 0
              },
              right: null,
              start: 10,
              end: 31,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 31,
            end: 31,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 31,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function ({function (function (',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 30,
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
});
