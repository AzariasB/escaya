import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Async Function', () => {
  it('async function f(x = await', () => {
    t.deepStrictEqual(recovery('async function f(x = await', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'BindingElement',
              left: {
                type: 'BindingIdentifier',
                name: 'x',
                start: 17,
                end: 18,
                kind: 168,
                flags: 0
              },
              right: {
                type: 'AwaitExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 26,
                  end: 26,
                  kind: 13,
                  flags: 2
                },
                start: 20,
                end: 26,
                kind: 190,
                flags: 0
              },
              start: 17,
              end: 26,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 26,
            end: 26,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 26,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f(x = await',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`Await` expression cannot be used in function parameters',
          code: 23,
          start: 21,
          length: 5
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

  it('async function f(await){', () => {
    t.deepStrictEqual(recovery('async function f(await){', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'await',
              start: 17,
              end: 22,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 23,
            end: 24,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f(await){',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `await` as binding identifier in this context',
          code: 91,
          start: 17,
          length: 5
        },
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

  it('async function f(){ let', () => {
    t.deepStrictEqual(recovery('async function f(){ let', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'let',
                  start: 19,
                  end: 23,
                  kind: 13,
                  flags: 0
                },
                start: 19,
                end: 23,
                kind: 122,
                flags: 0
              }
            ],
            start: 18,
            end: 23,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f(){ let',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 20,
          length: 3
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

  it('async function f() { let y = await x *', () => {
    t.deepStrictEqual(recovery('async function f() { let y = await x *', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
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
                      name: 'y',
                      start: 24,
                      end: 26,
                      kind: 168,
                      flags: 0
                    },
                    initializer: {
                      type: 'AwaitExpression',
                      expression: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'IdentifierReference',
                          name: 'x',
                          start: 34,
                          end: 36,
                          kind: 13,
                          flags: 0
                        },
                        operator: '*',
                        right: {
                          type: 'IdentifierReference',
                          name: '',
                          start: 38,
                          end: 38,
                          kind: 13,
                          flags: 2
                        },
                        start: 34,
                        end: 38,
                        kind: 155,
                        flags: 0
                      },
                      start: 28,
                      end: 38,
                      kind: 190,
                      flags: 0
                    },
                    start: 24,
                    end: 38,
                    kind: 146,
                    flags: 0
                  }
                ],
                start: 20,
                end: 38,
                kind: 145,
                flags: 0
              }
            ],
            start: 18,
            end: 38,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 38,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f() { let y = await x *',
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

  it('async function x({x}', () => {
    t.deepStrictEqual(recovery('async function x({x}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 18,
                  end: 19,
                  kind: 168,
                  flags: 0
                }
              ],
              start: 17,
              end: 20,
              kind: 169,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 20,
            end: 20,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 20,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function x({x}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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
      webCompat: true,
      end: 20
    });
  });

  it('async function x({x, y) { var z =', () => {
    t.deepStrictEqual(recovery('async function x({x, y) { var z =', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 18,
                  end: 19,
                  kind: 168,
                  flags: 0
                },
                {
                  type: 'BindingIdentifier',
                  name: 'y',
                  start: 20,
                  end: 22,
                  kind: 168,
                  flags: 0
                }
              ],
              start: 17,
              end: 22,
              kind: 169,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'z',
                      start: 29,
                      end: 31,
                      kind: 168,
                      flags: 0
                    },
                    initializer: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 33,
                      end: 33,
                      kind: 13,
                      flags: 2
                    },
                    start: 29,
                    end: 33,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 25,
                end: 33,
                kind: 143,
                flags: 0
              }
            ],
            start: 23,
            end: 33,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 33,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function x({x, y) { var z =',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
      webCompat: true,
      end: 33
    });
  });

  it('"use strict"; async function a() {{', () => {
    t.deepStrictEqual(recovery('"use strict"; async function a() {{', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12,
          kind: 229,
          flags: 0
        }
      ],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 28,
            end: 30,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'BlockStatement',
                leafs: [],
                start: 34,
                end: 35,
                kind: 123,
                flags: 0
              }
            ],
            start: 32,
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
      text: '"use strict"; async function a() {{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 34,
          length: 1
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

  it('async function foo(a = () => x) { var x; return', () => {
    t.deepStrictEqual(recovery('async function foo(a = () => x) { var x; return', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 14,
            end: 18,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'BindingElement',
              left: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 19,
                end: 20,
                kind: 168,
                flags: 0
              },
              right: {
                type: 'ArrowFunction',
                arrowParameters: true,
                params: [],
                contents: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 28,
                  end: 30,
                  kind: 13,
                  flags: 0
                },
                async: false,
                start: 22,
                end: 30,
                kind: 188,
                flags: 0
              },
              start: 19,
              end: 30,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'x',
                      start: 37,
                      end: 39,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 37,
                    end: 39,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 33,
                end: 40,
                kind: 143,
                flags: 0
              },
              {
                type: 'ReturnStatement',
                expression: null,
                start: 40,
                end: 47,
                kind: 135,
                flags: 0
              }
            ],
            start: 31,
            end: 47,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 47,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function foo(a = () => x) { var x; return',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 41,
          length: 6
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 47,
      webCompat: true,
      end: 47
    });
  });

  it('async function foo(/ {', () => {
    t.deepStrictEqual(recovery('async function foo(/ {', 'recovery.js'), {
      kind: 209,
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
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
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
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 19,
              end: 19,
              kind: 13,
              flags: 2
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 20,
              end: 22,
              kind: 179,
              flags: 0
            },
            start: 19,
            end: 22,
            kind: 155,
            flags: 0
          },
          start: 19,
          end: 22,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async function foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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

  it('function async foo(/ {', () => {
    t.deepStrictEqual(recovery('function async foo(/ {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 8,
            end: 14,
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
            end: 14,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 14,
              end: 18,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'RegularExpressionLiteral',
                pattern: ' ',
                flag: '',
                start: 19,
                end: 22,
                kind: 15,
                flags: 0
              }
            ],
            start: 14,
            end: 22,
            kind: 156,
            flags: 0
          },
          start: 14,
          end: 22,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function async foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 3
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 19,
          length: 3
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

  it('!!function async foo(/ {', () => {
    t.deepStrictEqual(recovery('!!function async foo(/ {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
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
                type: 'FunctionExpression',
                name: {
                  type: 'BindingIdentifier',
                  name: 'async',
                  start: 10,
                  end: 16,
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
                  start: 16,
                  end: 16,
                  kind: 184,
                  flags: 0
                },
                start: 2,
                end: 16,
                kind: 185,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 16,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 16,
              end: 20,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'RegularExpressionLiteral',
                pattern: ' ',
                flag: '',
                start: 21,
                end: 24,
                kind: 15,
                flags: 0
              }
            ],
            start: 16,
            end: 24,
            kind: 156,
            flags: 0
          },
          start: 16,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: '!!function async foo(/ {',
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
          length: 3
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 21,
          length: 3
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

  it('async function async function async function foo(/ {', () => {
    t.deepStrictEqual(recovery('async function async function async function foo(/ {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 14,
            end: 20,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 20,
            end: 20,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 20,
          kind: 186,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'async',
            start: 29,
            end: 35,
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
            start: 35,
            end: 35,
            kind: 184,
            flags: 0
          },
          start: 20,
          end: 35,
          kind: 186,
          flags: 0
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 44,
            end: 48,
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
            start: 49,
            end: 49,
            kind: 184,
            flags: 0
          },
          start: 35,
          end: 49,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 49,
              end: 49,
              kind: 13,
              flags: 2
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 50,
              end: 52,
              kind: 179,
              flags: 0
            },
            start: 49,
            end: 52,
            kind: 155,
            flags: 0
          },
          start: 49,
          end: 52,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async function async function async function foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 21,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 36,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 49,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 51,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 52,
      end: 52
    });
  });

  it('function foo(/ !{ async function', () => {
    t.deepStrictEqual(recovery('function foo(/ !{ async function', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'foo',
            start: 8,
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
            start: 13,
            end: 13,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,
              kind: 13,
              flags: 2
            },
            operator: '/',
            right: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'MethodDefinition',
                    async: true,
                    generator: false,
                    getter: false,
                    setter: false,
                    propertySetParameterList: null,
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'function',
                      start: 23,
                      end: 32,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 32,
                      end: 32,
                      kind: 184,
                      flags: 0
                    },
                    start: 32,
                    end: 32,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 16,
                end: 32,
                kind: 179,
                flags: 0
              },
              start: 14,
              end: 32,
              kind: 160,
              flags: 0
            },
            start: 13,
            end: 32,
            kind: 155,
            flags: 0
          },
          start: 13,
          end: 32,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function foo(/ !{ async function',
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
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 24,
          length: 8
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

  it('async function yield', () => {
    t.deepStrictEqual(recovery('async function yield', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'yield',
            start: 14,
            end: 20,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 20,
            end: 20,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 20,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 5
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

  it('async function* x(a, b, ...c', () => {
    t.deepStrictEqual(recovery('async function* x(a, b, ...c', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 15,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'a',
              start: 18,
              end: 19,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'b',
              start: 20,
              end: 22,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: 'c',
                start: 27,
                end: 28,
                kind: 168,
                flags: 0
              },
              start: 23,
              end: 28,
              kind: 175,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 28,
            end: 28,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 28,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function* x(a, b, ...c',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('async function f() {   class x {', () => {
    t.deepStrictEqual(recovery('async function f() {   class x {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ClassDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 28,
                  end: 30,
                  kind: 168,
                  flags: 0
                },
                heritage: null,
                elements: [],
                start: 20,
                end: 32,
                kind: 150,
                flags: 0
              }
            ],
            start: 18,
            end: 32,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 32,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f() {   class x {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 31,
          length: 1
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

  it('async function fn() { const x = await import(a(', () => {
    t.deepStrictEqual(recovery('async function fn() { const x = await import(a(', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'fn',
            start: 14,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
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
                      name: 'x',
                      start: 27,
                      end: 29,
                      kind: 168,
                      flags: 0
                    },
                    initializer: {
                      type: 'AwaitExpression',
                      expression: {
                        type: 'ImportCall',
                        import: {
                          type: 'CallExpression',
                          expression: {
                            type: 'IdentifierReference',
                            name: 'a',
                            start: 45,
                            end: 46,
                            kind: 13,
                            flags: 0
                          },
                          arguments: [],
                          start: 45,
                          end: 47,
                          kind: 156,
                          flags: 0
                        },
                        start: 37,
                        end: 47,
                        kind: 199,
                        flags: 0
                      },
                      start: 31,
                      end: 47,
                      kind: 190,
                      flags: 0
                    },
                    start: 27,
                    end: 47,
                    kind: 146,
                    flags: 0
                  }
                ],
                start: 21,
                end: 47,
                kind: 145,
                flags: 0
              }
            ],
            start: 19,
            end: 47,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 47,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function fn() { const x = await import(a(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('async function fn() { (await x).a foo(/ {', () => {
    t.deepStrictEqual(recovery('async function fn() { (await x).a foo(/ {', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'fn',
            start: 14,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'MemberExpression',
                  member: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'AwaitExpression',
                      expression: {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 28,
                        end: 30,
                        kind: 13,
                        flags: 0
                      },
                      start: 23,
                      end: 30,
                      kind: 190,
                      flags: 0
                    },
                    start: 21,
                    end: 31,
                    kind: 189,
                    flags: 0
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 32,
                    end: 33,
                    kind: 13,
                    flags: 0
                  },
                  computed: false,
                  start: 21,
                  end: 33,
                  kind: 154,
                  flags: 0
                },
                start: 21,
                end: 33,
                kind: 122,
                flags: 0
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'foo',
                    start: 33,
                    end: 37,
                    kind: 13,
                    flags: 0
                  },
                  arguments: [
                    {
                      type: 'RegularExpressionLiteral',
                      pattern: ' ',
                      flag: '',
                      start: 38,
                      end: 41,
                      kind: 15,
                      flags: 0
                    }
                  ],
                  start: 33,
                  end: 41,
                  kind: 156,
                  flags: 0
                },
                start: 33,
                end: 41,
                kind: 122,
                flags: 0
              }
            ],
            start: 19,
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
      text: 'async function fn() { (await x).a foo(/ {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 34,
          length: 3
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 38,
          length: 3
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

  it('async function f() { for await (x[a in', () => {
    t.deepStrictEqual(recovery('async function f() { for await (x[a in', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 14,
            end: 16,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ForStatement',
                variableDeclarationList: false,
                initializer: {
                  type: 'MemberExpression',
                  member: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 32,
                    end: 33,
                    kind: 13,
                    flags: 0
                  },
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 34,
                      end: 35,
                      kind: 13,
                      flags: 0
                    },
                    operator: 'in',
                    right: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 38,
                      end: 38,
                      kind: 13,
                      flags: 2
                    },
                    start: 34,
                    end: 38,
                    kind: 155,
                    flags: 0
                  },
                  computed: true,
                  start: 32,
                  end: 38,
                  kind: 154,
                  flags: 0
                },
                condition: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 38,
                  end: 38,
                  kind: 13,
                  flags: 2
                },
                incrementor: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 38,
                  end: 38,
                  kind: 13,
                  flags: 2
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 38,
                    end: 38,
                    kind: 13,
                    flags: 2
                  },
                  start: 38,
                  end: 38,
                  kind: 122,
                  flags: 0
                },
                start: 20,
                end: 38,
                kind: 132,
                flags: 0
              }
            ],
            start: 18,
            end: 38,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 38,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function f() { for await (x[a in',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 36,
          length: 2
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

  it('async function f13({x}, y, [z], v) { var x,', () => {
    t.deepStrictEqual(recovery('async function f13({x}, y, [z], v) { var x,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f13',
            start: 14,
            end: 18,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: true,
          params: [
            {
              type: 'ObjectBindingPattern',
              properties: [
                {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 20,
                  end: 21,
                  kind: 168,
                  flags: 0
                }
              ],
              start: 19,
              end: 22,
              kind: 169,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'y',
              start: 23,
              end: 25,
              kind: 168,
              flags: 0
            },
            {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingIdentifier',
                  name: 'z',
                  start: 28,
                  end: 29,
                  kind: 168,
                  flags: 0
                }
              ],
              start: 26,
              end: 30,
              kind: 174,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'v',
              start: 31,
              end: 33,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'VariableStatement',
                declarations: [
                  {
                    type: 'VariableDeclaration',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'x',
                      start: 40,
                      end: 42,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 40,
                    end: 42,
                    kind: 144,
                    flags: 0
                  }
                ],
                start: 36,
                end: 43,
                kind: 143,
                flags: 0
              }
            ],
            start: 34,
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
      text: 'async function f13({x}, y, [z], v) { var x,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration expected',
          code: 116,
          start: 42,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 43,
      webCompat: true,
      end: 43
    });
  });

  it('async function* f([{ x, y, z } = { x: 44, y: 55, z: 66', () => {
    t.deepStrictEqual(recovery('async function* f([{ x, y, z } = { x: 44, y: 55, z: 66', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
            start: 15,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingElement',
                  left: {
                    type: 'ObjectBindingPattern',
                    properties: [
                      {
                        type: 'BindingIdentifier',
                        name: 'x',
                        start: 20,
                        end: 22,
                        kind: 168,
                        flags: 0
                      },
                      {
                        type: 'BindingIdentifier',
                        name: 'y',
                        start: 23,
                        end: 25,
                        kind: 168,
                        flags: 0
                      },
                      {
                        type: 'BindingIdentifier',
                        name: 'z',
                        start: 26,
                        end: 28,
                        kind: 168,
                        flags: 0
                      }
                    ],
                    start: 19,
                    end: 30,
                    kind: 169,
                    flags: 0
                  },
                  right: {
                    type: 'ObjectLiteral',
                    properties: [
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'IdentifierName',
                          name: 'x',
                          start: 34,
                          end: 36,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'NumericLiteral',
                          value: 44,
                          start: 37,
                          end: 40,
                          kind: 10,
                          flags: 0
                        },
                        start: 34,
                        end: 40,
                        kind: 227,
                        flags: 0
                      },
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'IdentifierName',
                          name: 'y',
                          start: 41,
                          end: 43,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'NumericLiteral',
                          value: 55,
                          start: 44,
                          end: 47,
                          kind: 10,
                          flags: 0
                        },
                        start: 41,
                        end: 47,
                        kind: 227,
                        flags: 0
                      },
                      {
                        type: 'PropertyName',
                        key: {
                          type: 'IdentifierName',
                          name: 'z',
                          start: 48,
                          end: 50,
                          kind: 13,
                          flags: 0
                        },
                        value: {
                          type: 'NumericLiteral',
                          value: 66,
                          start: 51,
                          end: 54,
                          kind: 10,
                          flags: 0
                        },
                        start: 48,
                        end: 54,
                        kind: 227,
                        flags: 0
                      }
                    ],
                    start: 32,
                    end: 54,
                    kind: 179,
                    flags: 0
                  },
                  start: 19,
                  end: 54,
                  kind: 172,
                  flags: 0
                }
              ],
              start: 18,
              end: 54,
              kind: 174,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 54,
            end: 54,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 54,
          kind: 186,
          flags: 0
        }
      ],
      text: 'async function* f([{ x, y, z } = { x: 44, y: 55, z: 66',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 52,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 54,
      webCompat: true,
      end: 54
    });
  });
});
