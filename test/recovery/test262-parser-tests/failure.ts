import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('test262-parser-tests - failing tests', () => {
  it(',,,,,,let x, y, ;', () => {
    t.deepEqual(recovery(',,,,,,let x, y, ;', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 0
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 1
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 2
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 3
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 4
        },
        {
          code: 8,
          kind: 2,
          length: 1,
          message: 'Statement expected',
          source: 2,
          start: 5
        },
        {
          code: 16,
          kind: 2,
          length: 1,
          message: 'Lexical binding expected',
          source: 2,
          start: 16
        }
      ],
      directives: [],
      end: 17,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 11,
                flags: 0,
                kind: 168,
                name: 'x',
                start: 9,
                type: 'BindingIdentifier'
              },
              end: 11,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 9,
              type: 'LexicalBinding'
            },
            {
              binding: {
                end: 14,
                flags: 0,
                kind: 168,
                name: 'y',
                start: 12,
                type: 'BindingIdentifier'
              },
              end: 14,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 12,
              type: 'LexicalBinding'
            }
          ],
          end: 17,
          flags: 0,
          isConst: false,
          kind: 145,
          start: 6,
          type: 'LexicalDeclaration'
        }
      ],
      length: 17,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: ',,,,,,let x, y, ;'
    });
  });
  it('var x, ;', () => {
    t.deepEqual(recovery('var x, ;', 'recovery.js'), {
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
                name: 'x',
                start: 3,
                end: 5,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 5,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var x, ;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 116,
          kind: 2,
          length: 1,
          message: 'Variable declaration expected',
          source: 2,
          start: 7
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

  it('({get{a}:0})', () => {
    t.deepEqual(recovery('({get{a}:0})', 'recovery.js'), {
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
                  type: 'IdentifierName',
                  name: 'get',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 6,
                end: 7,
                kind: 13,
                flags: 0
              },
              start: 6,
              end: 7,
              kind: 122,
              flags: 0
            }
          ],
          start: 5,
          end: 8,
          kind: 123,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 9,
            end: 10,
            kind: 10,
            flags: 0
          },
          start: 9,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get{a}:0})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 36,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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

  it('/*";', () => {
    t.deepEqual(recovery('/*";', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [],
      text: '/*";',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: '`*/` expected',
          code: 86,
          start: 0,
          length: 4
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('import * as enum from "foo"', () => {
    t.deepEqual(recovery('import * as enum from "foo"', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 21,
            end: 27,
            kind: 12,
            flags: 0
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: {
              type: 'BindingIdentifier',
              name: '',
              start: 11,
              end: 16,
              kind: 168,
              flags: 0
            },
            namedImports: null,
            start: 6,
            end: 16,
            kind: 218,
            flags: 0
          },
          start: 0,
          end: 27,
          kind: 217,
          flags: 0
        }
      ],
      text: 'import * as enum from "foo"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 12,
          length: 4
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

  it('/42', () => {
    t.deepEqual(recovery('/42', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '4',
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
        }
      ],
      text: '/42',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 0,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('{ return; }', () => {
    t.deepEqual(recovery('{ return; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ReturnStatement',
              expression: null,
              start: 1,
              end: 9,
              kind: 135,
              flags: 0
            }
          ],
          start: 0,
          end: 11,
          kind: 123,
          flags: 0
        }
      ],
      text: '{ return; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `return` statement can only be used within a function body.',
          code: 26,
          start: 2,
          length: 6
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

  it('function null() { }', () => {
    t.deepEqual(recovery('function null() { }', 'recovery.js'), {
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
            type: 'CallExpression',
            expression: {
              type: 'NullLiteral',
              value: null,
              start: 8,
              end: 13,
              kind: 164,
              flags: 0
            },
            arguments: [],
            start: 8,
            end: 15,
            kind: 156,
            flags: 0
          },
          start: 8,
          end: 15,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 15,
          end: 19,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function null() { }',
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
          start: 16,
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

  it('[{a=0},...0]', () => {
    t.deepEqual(recovery('[{a=0},...0]', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'CoverInitializedName',
                    left: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 2,
                      end: 3,
                      kind: 13,
                      flags: 0
                    },
                    right: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 4,
                      end: 5,
                      kind: 10,
                      flags: 0
                    },
                    start: 2,
                    end: 5,
                    kind: 181,
                    flags: 0
                  }
                ],
                start: 1,
                end: 6,
                kind: 179,
                flags: 0
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 10,
                  end: 11,
                  kind: 10,
                  flags: 0
                },
                start: 7,
                end: 11,
                kind: 177,
                flags: 0
              }
            ],
            start: 0,
            end: 12,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '[{a=0},...0]',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=` can only be used in an object literal property inside a destructuring ',
          code: 100,
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

  it('function x(...a = 1){}', () => {
    t.deepEqual(recovery('function x(...a = 1){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,
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
                name: 'a',
                start: 14,
                end: 15,
                kind: 168,
                flags: 0
              },
              start: 11,
              end: 15,
              kind: 175,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 15,
            end: 15,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 17,
            end: 19,
            kind: 10,
            flags: 0
          },
          start: 17,
          end: 19,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 20,
          end: 22,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function x(...a = 1){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A rest element cannot have an initializer',
          code: 106,
          start: 16,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 19,
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

  it('function *g() { function yield() {} }', () => {
    t.deepEqual(recovery('function *g() { function yield() {} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'g',
            start: 10,
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
                  name: 'yield',
                  start: 24,
                  end: 30,
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
                  start: 32,
                  end: 35,
                  kind: 184,
                  flags: 0
                },
                start: 15,
                end: 35,
                kind: 186,
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
      text: 'function *g() { function yield() {} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`yield` can not be used as a function name in this context',
          code: 88,
          start: 25,
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

  it('new.prop', () => {
    t.deepEqual(recovery('new.prop', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              expression: {
                type: 'IdentifierName',
                name: 'prop',
                start: 4,
                end: 8,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 0,
              end: 8,
              kind: 154,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 8,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new.prop',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
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

  it('class', () => {
    t.deepEqual(recovery('class', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 0,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('[+{a = 0}];', () => {
    t.deepEqual(recovery('[+{a = 0}];', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [
              {
                type: 'UnaryExpression',
                operator: '+',
                operand: {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'CoverInitializedName',
                      left: {
                        type: 'IdentifierReference',
                        name: 'a',
                        start: 3,
                        end: 4,
                        kind: 13,
                        flags: 0
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 6,
                        end: 8,
                        kind: 10,
                        flags: 0
                      },
                      start: 3,
                      end: 8,
                      kind: 181,
                      flags: 0
                    }
                  ],
                  start: 2,
                  end: 9,
                  kind: 179,
                  flags: 0
                },
                start: 1,
                end: 9,
                kind: 160,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 178,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: '[+{a = 0}];',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=` can only be used in an object literal property inside a destructuring ',
          code: 100,
          start: 9,
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

  it('foo[/42', () => {
    t.deepEqual(recovery('foo[/42', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 0,
              end: 3,
              kind: 13,
              flags: 0
            },
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: '4',
              flag: '',
              start: 4,
              end: 7,
              kind: 15,
              flags: 0
            },
            computed: true,
            start: 0,
            end: 7,
            kind: 154,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'foo[/42',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 4,
          length: 3
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

  it('yield v', () => {
    t.deepEqual(recovery('yield v', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'yield',
            start: 0,
            end: 5,
            kind: 13,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'v',
            start: 5,
            end: 7,
            kind: 13,
            flags: 0
          },
          start: 5,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'yield v',
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

  it('for (let let;;;) {}', () => {
    t.deepEqual(recovery('for (let let;;;) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
            kind: 145,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 14,
            end: 14,
            kind: 13,
            flags: 2
          },
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
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 16,
          end: 19,
          kind: 123,
          flags: 0
        }
      ],
      text: 'for (let let;;;) {}',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(10) => 0', () => {
    t.deepEqual(recovery('(10) => 0', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'NumericLiteral',
              value: 10,
              start: 1,
              end: 3,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 4,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 7,
            end: 9,
            kind: 10,
            flags: 0
          },
          start: 7,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '(10) => 0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 5,
          length: 2
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

  it('for (let x = 42 in list) process(x);', () => {
    t.deepEqual(recovery('for (let x = 42 in list) process(x);', 'recovery.js'), {
      kind: 209,
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
                  name: 'x',
                  start: 8,
                  end: 10,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 42,
                  start: 12,
                  end: 15,
                  kind: 10,
                  flags: 0
                },
                start: 8,
                end: 15,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 15,
            kind: 145,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'list',
            start: 18,
            end: 23,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'process',
                start: 24,
                end: 32,
                kind: 13,
                flags: 0
              },
              arguments: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 33,
                  end: 34,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 24,
              end: 35,
              kind: 156,
              flags: 0
            },
            start: 24,
            end: 36,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 36,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for (let x = 42 in list) process(x);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of a `for...in` statement cannot be a destructuring pattern',
          code: 112,
          start: 16,
          length: 2
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

  it('({get a(){}})=0', () => {
    t.deepEqual(recovery('({get a(){}})=0', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
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
                end: 12,
                kind: 179,
                flags: 0
              },
              start: 0,
              end: 13,
              kind: 189,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 14,
              end: 15,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: '({get a(){}})=0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 13,
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

  it('({a({e: a.b}){}})', () => {
    t.deepEqual(recovery('({a({e: a.b}){}})', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'MemberExpression',
              member: {
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
                        type: 'BindingElement',
                        left: {
                          type: 'ObjectBindingPattern',
                          properties: [
                            {
                              type: 'PropertyName',
                              key: {
                                type: 'IdentifierName',
                                name: 'e',
                                start: 5,
                                end: 7,
                                kind: 13,
                                flags: 0
                              },
                              value: {
                                type: 'BindingIdentifier',
                                name: 'a',
                                start: 7,
                                end: 9,
                                kind: 168,
                                flags: 0
                              },
                              start: 5,
                              end: 9,
                              kind: 227,
                              flags: 0
                            }
                          ],
                          start: 4,
                          end: 9,
                          kind: 169,
                          flags: 0
                        },
                        right: null,
                        start: 4,
                        end: 9,
                        kind: 172,
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
                      start: 9,
                      end: 9,
                      kind: 184,
                      flags: 0
                    },
                    start: 3,
                    end: 9,
                    kind: 182,
                    flags: 0
                  }
                ],
                start: 1,
                end: 9,
                kind: 179,
                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'b',
                start: 10,
                end: 11,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 1,
              end: 11,
              kind: 154,
              flags: 0
            },
            start: 0,
            end: 11,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 15,
          kind: 123,
          flags: 0
        }
      ],
      text: '({a({e: a.b}){}})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('var [a.b] = 0', () => {
    t.deepEqual(recovery('var [a.b] = 0', 'recovery.js'), {
      kind: 209,
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
                    end: 6,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 3,
                end: 6,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 6,
              kind: 144,
              flags: 0
            },
            {
              type: 'VariableDeclaration',
              binding: {
                type: 'BindingIdentifier',
                name: 'b',
                start: 7,
                end: 8,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 7,
              end: 8,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 11,
            end: 13,
            kind: 10,
            flags: 0
          },
          start: 11,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var [a.b] = 0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Variable declaration expected',
          code: 116,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 10,
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

  it('(function *(x, ...yield){})', () => {
    t.deepEqual(recovery('(function *(x, ...yield){})', 'recovery.js'), {
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
              generator: true,
              async: false,
              params: [
                {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 12,
                  end: 13,
                  kind: 168,
                  flags: 0
                },
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'BindingIdentifier',
                    name: 'yield',
                    start: 18,
                    end: 23,
                    kind: 168,
                    flags: 0
                  },
                  start: 14,
                  end: 23,
                  kind: 175,
                  flags: 0
                }
              ],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 24,
                end: 26,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 26,
              kind: 185,
              flags: 0
            },
            start: 0,
            end: 27,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 27,
          kind: 122,
          flags: 0
        }
      ],
      text: '(function *(x, ...yield){})',
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
      length: 27,
      end: 27
    });
  });

  it('"\\u{FFFF"', () => {
    t.deepEqual(recovery('"\\u{FFFF"', 'recovery.js'), {
      kind: 209,
      directives: [
        {
          type: 'Directive',
          value: '',
          raw: '\\u{FFFF',
          start: 0,
          end: 9,
          kind: 229,
          flags: 0
        }
      ],
      leafs: [],
      text: '"\\u{FFFF"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid hexadecimal escape sequence',
          code: 50,
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

  it('\\ua', () => {
    t.deepEqual(recovery('\\ua', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: '￿',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'ua',
            start: 1,
            end: 3,
            kind: 13,
            flags: 0
          },
          start: 1,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '\\ua',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid hexadecimal escape sequence',
          code: 50,
          start: 0,
          length: 3
        },
        {
          code: 92,
          kind: 2,
          length: 2,
          message: '`;` expected',
          source: 2,
          start: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('let []', () => {
    t.deepEqual(recovery('let []', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: false,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                elements: [],
                start: 3,
                end: 6,
                kind: 174,
                flags: 0
              },
              initializer: null,
              start: 3,
              end: 6,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 145,
          flags: 0
        }
      ],
      text: 'let []',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
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

  it('0b12', () => {
    t.deepEqual(recovery('0b12', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1,
            start: 0,
            end: 4,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: '0b12',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Binary integer literal like sequence containing an invalid digit',
          code: 65,
          start: 3,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('var _𖫵 = 11;', () => {
    t.deepEqual(recovery('var _𖫵 = 11;', 'recovery.js'), {
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
                name: '_𖫵',
                start: 3,
                end: 7,
                kind: 168,
                flags: 0
              },
              initializer: {
                type: 'NumericLiteral',
                value: 11,
                start: 9,
                end: 12,
                kind: 10,
                flags: 0
              },
              start: 3,
              end: 12,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 13,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var _𖫵 = 11;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: "Invalid astral character 'Z˵'",
          code: 51,
          start: 5,
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

  it('\\o', () => {
    t.deepEqual(recovery('\\o', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: '￿',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'o',
            start: 1,
            end: 2,
            kind: 13,
            flags: 0
          },
          start: 1,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '\\o',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid Unicode escape sequence',
          code: 48,
          start: 0,
          length: 0
        },
        {
          code: 92,
          kind: 2,
          length: 1,
          message: '`;` expected',
          source: 2,
          start: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('function true() { }', () => {
    t.deepEqual(recovery('function true() { }', 'recovery.js'), {
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
            type: 'CallExpression',
            expression: {
              type: 'BooleanLiteral',
              value: true,
              start: 8,
              end: 13,
              kind: 166,
              flags: 0
            },
            arguments: [],
            start: 8,
            end: 15,
            kind: 156,
            flags: 0
          },
          start: 8,
          end: 15,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 15,
          end: 19,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function true() { }',
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
          start: 16,
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

  it('"use strict"; for (let [a = let];;) {}', () => {
    t.deepEqual(recovery('"use strict"; for (let [a = let];;) {}', 'recovery.js'), {
      kind: 209,
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
          type: 'ForStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  elements: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 24,
                        end: 25,
                        kind: 168,
                        flags: 0
                      },
                      right: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 27,
                        end: 31,
                        kind: 13,
                        flags: 0
                      },
                      start: 24,
                      end: 31,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  start: 22,
                  end: 32,
                  kind: 174,
                  flags: 0
                },
                initializer: null,
                start: 22,
                end: 32,
                kind: 146,
                flags: 0
              }
            ],
            start: 19,
            end: 32,
            kind: 145,
            flags: 0
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 35,
            end: 38,
            kind: 123,
            flags: 0
          },
          start: 13,
          end: 38,
          kind: 132,
          flags: 0
        }
      ],
      text: '"use strict"; for (let [a = let];;) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The identifier `let` must not be in expression position in strict mode',
          code: 85,
          start: 27,
          length: 4
        },
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 32,
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

  it('(function() { yield 3; })', () => {
    t.deepEqual(recovery('(function() { yield 3; })', 'recovery.js'), {
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
              params: [],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'yield',
                      start: 13,
                      end: 19,
                      kind: 13,
                      flags: 0
                    },
                    start: 13,
                    end: 19,
                    kind: 122,
                    flags: 0
                  },
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'NumericLiteral',
                      value: 3,
                      start: 19,
                      end: 21,
                      kind: 10,
                      flags: 0
                    },
                    start: 19,
                    end: 22,
                    kind: 122,
                    flags: 0
                  }
                ],
                start: 11,
                end: 24,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 24,
              kind: 185,
              flags: 0
            },
            start: 0,
            end: 25,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: '(function() { yield 3; })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 20,
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

  it('({a:b[0]})=>0', () => {
    t.deepEqual(recovery('({a:b[0]})=>0', 'recovery.js'), {
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
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'a',
                      start: 2,
                      end: 3,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'MemberExpression',
                      member: {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 4,
                        end: 5,
                        kind: 13,
                        flags: 0
                      },
                      expression: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 6,
                        end: 7,
                        kind: 10,
                        flags: 0
                      },
                      computed: true,
                      start: 4,
                      end: 8,
                      kind: 154,
                      flags: 0
                    },
                    start: 2,
                    end: 8,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 1,
                end: 9,
                kind: 179,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'NumericLiteral',
                value: 0,
                start: 12,
                end: 13,
                kind: 10,
                flags: 0
              },
              start: 12,
              end: 13,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 13,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: '({a:b[0]})=>0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an arrow function can only be destructed through assignment',
          code: 103,
          start: 10,
          length: 2
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

  it('with(true) let a', () => {
    t.deepEqual(recovery('with(true) let a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 5,
            end: 9,
            kind: 166,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'let',
              start: 10,
              end: 14,
              kind: 13,
              flags: 0
            },
            start: 10,
            end: 14,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 128,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 14,
            end: 16,
            kind: 13,
            flags: 0
          },
          start: 14,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'with(true) let a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('({ * })', () => {
    t.deepEqual(recovery('({ * })', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 20,
          kind: 3,
          length: 1,
          message: 'Expected an identifier',
          source: 2,
          start: 5
        },
        {
          code: 36,
          kind: 2,
          length: 1,
          message: '`:` expected',
          source: 2,
          start: 6
        }
      ],
      directives: [],
      end: 7,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          end: 7,
          expression: {
            end: 7,
            expression: {
              end: 6,
              flags: 0,
              kind: 179,
              properties: [
                {
                  end: 6,
                  flags: 0,
                  kind: 13,
                  name: '',
                  start: 6,
                  type: 'IdentifierName'
                }
              ],
              start: 1,
              type: 'ObjectLiteral'
            },
            flags: 0,
            kind: 189,
            start: 0,
            type: 'ParenthesizedExpression'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 7,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '({ * })'
    });
  });

  it('({ set prop() {} })', () => {
    t.deepEqual(recovery('({ set prop() {} })', 'recovery.js'), {
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
                  getter: false,
                  setter: true,
                  propertySetParameterList: {
                    type: 'BindingIdentifier',
                    name: '',
                    start: 12,
                    end: 13,
                    kind: 168,
                    flags: 0
                  },
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'prop',
                    start: 6,
                    end: 11,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 13,
                    end: 16,
                    kind: 184,
                    flags: 0
                  },
                  start: 11,
                  end: 16,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 18,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 19,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ set prop() {} })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 12,
          length: 1
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
      length: 19,
      end: 19
    });
  });

  it('((a),...b) => 0;', () => {
    t.deepEqual(recovery('((a),...b) => 0;', 'recovery.js'), {
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
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 2,
                    end: 3,
                    kind: 13,
                    flags: 0
                  },
                  start: 1,
                  end: 4,
                  kind: 189,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                }
              ],
              start: 0,
              end: 5,
              kind: 147,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 8,
            end: 9,
            kind: 13,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 13,
            end: 15,
            kind: 10,
            flags: 0
          },
          start: 13,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '((a),...b) => 0;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 5,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 11,
          length: 2
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

  it('a: let a', () => {
    t.deepEqual(recovery('a: let a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'a',
            start: 0,
            end: 2,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'let',
              start: 2,
              end: 6,
              kind: 13,
              flags: 0
            },
            start: 2,
            end: 6,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 134,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 6,
            end: 8,
            kind: 13,
            flags: 0
          },
          start: 6,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a: let a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('for (let x, y, z, let;;;) {}', () => {
    t.deepEqual(recovery('for (let x, y, z, let;;;) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 8,
                  end: 10,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 10,
                kind: 146,
                flags: 0
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'y',
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
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'z',
                  start: 14,
                  end: 16,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 14,
                end: 16,
                kind: 146,
                flags: 0
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 17,
                  end: 21,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 17,
                end: 21,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 21,
            kind: 145,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 23,
            end: 23,
            kind: 13,
            flags: 2
          },
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 23,
            end: 24,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 132,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 25,
          end: 28,
          kind: 123,
          flags: 0
        }
      ],
      text: 'for (let x, y, z, let;;;) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 18,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 24,
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

  it('for ((i in {}));', () => {
    t.deepEqual(recovery('for ((i in {}));', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'i',
                start: 6,
                end: 7,
                kind: 13,
                flags: 0
              },
              operator: 'in',
              right: {
                type: 'ObjectLiteral',
                properties: [],
                start: 10,
                end: 13,
                kind: 179,
                flags: 0
              },
              start: 6,
              end: 13,
              kind: 155,
              flags: 0
            },
            start: 5,
            end: 14,
            kind: 189,
            flags: 0
          },
          condition: null,
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 14,
            end: 14,
            kind: 13,
            flags: 2
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
          kind: 132,
          flags: 0
        }
      ],
      text: 'for ((i in {}));',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
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
      length: 16,
      end: 16
    });
  });

  it('const const;', () => {
    t.deepEqual(recovery('const const;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,
          kind: 145,
          flags: 0
        },
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 5,
          end: 12,
          kind: 145,
          flags: 0
        }
      ],
      text: 'const const;',
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
          length: 5
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

  it('({ set: s(if) { } })', () => {
    t.deepEqual(recovery('({ set: s(if) { } })', 'recovery.js'), {
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
                    name: 'set',
                    start: 2,
                    end: 6,
                    kind: 13,
                    flags: 0
                  },
                  value: {
                    type: 'CallExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 's',
                      start: 7,
                      end: 9,
                      kind: 13,
                      flags: 0
                    },
                    arguments: [],
                    start: 7,
                    end: 10,
                    kind: 156,
                    flags: 0
                  },
                  start: 2,
                  end: 10,
                  kind: 227,
                  flags: 0
                },
                {
                  type: 'IdentifierName',
                  name: 'if',
                  start: 10,
                  end: 12,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 13,
          end: 17,
          kind: 123,
          flags: 0
        }
      ],
      text: '({ set: s(if) { } })',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 36,
          start: 12,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 14,
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

  it('(a,...a)', () => {
    t.deepEqual(recovery('(a,...a)', 'recovery.js'), {
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
              start: 0,
              end: 7,
              kind: 147,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '(a,...a)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('for(var a = 0 of b);', () => {
    t.deepEqual(recovery('for(var a = 0 of b);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForBinding',
            declarations: [
              {
                type: 'VariableDeclaration',
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
                  value: 0,
                  start: 11,
                  end: 13,
                  kind: 10,
                  flags: 0
                },
                start: 7,
                end: 13,
                kind: 144,
                flags: 0
              }
            ],
            start: 4,
            end: 13,
            kind: 202,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 16,
            end: 18,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 19,
            end: 20,
            kind: 148,
            flags: 0
          },
          await: false,
          start: 0,
          end: 20,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(var a = 0 of b);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of a `for...in` statement cannot be a destructuring pattern',
          code: 112,
          start: 14,
          length: 2
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

  it('for(let[a].b of 0);', () => {
    t.deepEqual(recovery('for(let[a].b of 0);', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'LexicalDeclaration',
              isConst: false,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'ArrayBindingPattern',
                    elements: [
                      {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 8,
                        end: 9,
                        kind: 168,
                        flags: 0
                      }
                    ],
                    start: 7,
                    end: 10,
                    kind: 174,
                    flags: 0
                  },
                  initializer: null,
                  start: 7,
                  end: 10,
                  kind: 146,
                  flags: 0
                }
              ],
              start: 4,
              end: 10,
              kind: 145,
              flags: 0
            },
            expression: {
              type: 'IdentifierName',
              name: 'b',
              start: 11,
              end: 12,
              kind: 13,
              flags: 0
            },
            computed: false,
            start: 10,
            end: 12,
            kind: 154,
            flags: 0
          },
          condition: {
            type: 'NumericLiteral',
            value: 0,
            start: 15,
            end: 17,
            kind: 10,
            flags: 0
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'of',
            start: 12,
            end: 15,
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
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(let[a].b of 0);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 13,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 16,
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

  it('function f(a, ...b, c){}', () => {
    t.deepEqual(recovery('function f(a, ...b, c){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f',
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
              name: 'a',
              start: 11,
              end: 12,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingRestElement',
              argument: {
                type: 'BindingIdentifier',
                name: 'b',
                start: 17,
                end: 18,
                kind: 168,
                flags: 0
              },
              start: 13,
              end: 18,
              kind: 175,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'c',
              start: 19,
              end: 21,
              kind: 168,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 22,
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
      text: 'function f(a, ...b, c){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A rest element must be last in a parameter list',
          code: 108,
          start: 20,
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

  it('(class [a] {})', () => {
    t.deepEqual(recovery('(class [a] {})', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'ClassExpression',
                name: null,
                heritage: null,
                elements: [],
                start: 1,
                end: 6,
                kind: 149,
                flags: 0
              },
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 8,
                end: 9,
                kind: 13,
                flags: 0
              },
              computed: true,
              start: 1,
              end: 10,
              kind: 154,
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
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 10,
          end: 13,
          kind: 123,
          flags: 0
        }
      ],
      text: '(class [a] {})',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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

  it('for (const x = 1 of y);', () => {
    t.deepEqual(recovery('for (const x = 1 of y);', 'recovery.js'), {
      kind: 209,
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
                  name: 'x',
                  start: 10,
                  end: 12,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 14,
                  end: 16,
                  kind: 10,
                  flags: 0
                },
                start: 10,
                end: 16,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 16,
            kind: 145,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'y',
            start: 19,
            end: 21,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'EmptyStatement',
            start: 22,
            end: 23,
            kind: 148,
            flags: 0
          },
          await: false,
          start: 0,
          end: 23,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for (const x = 1 of y);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of a `for...of` statement cannot be a destructuring pattern',
          code: 113,
          start: 17,
          length: 2
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

  it('for(;;) function a(){}', () => {
    t.deepEqual(recovery('for(;;) function a(){}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: null,
          condition: null,
          incrementor: null,
          statement: {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'a',
              start: 16,
              end: 18,
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
              start: 20,
              end: 22,
              kind: 184,
              flags: 0
            },
            start: 7,
            end: 22,
            kind: 186,
            flags: 0
          },
          start: 0,
          end: 22,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for(;;) function a(){}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message:
            'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          code: 77,
          start: 8,
          length: 8
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

  it('var this = 10;', () => {
    t.deepEqual(recovery('var this = 10;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [],
          start: 0,
          end: 3,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ThisExpression',
              start: 3,
              end: 8,
              kind: 165,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 10,
              start: 10,
              end: 13,
              kind: 10,
              flags: 0
            },
            start: 3,
            end: 13,
            kind: 152,
            flags: 0
          },
          start: 3,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'var this = 10;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 4,
          length: 4
        },
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 9,
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

  it('function *g() { try {} catch (yield) {} }', () => {
    t.deepEqual(recovery('function *g() { try {} catch (yield) {} }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'g',
            start: 10,
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
                type: 'TryStatement',
                block: {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 19,
                  end: 22,
                  kind: 123,
                  flags: 0
                },
                catchClause: {
                  type: 'CatchClause',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'yield',
                    start: 30,
                    end: 35,
                    kind: 168,
                    flags: 0
                  },
                  block: {
                    type: 'BlockStatement',
                    leafs: [],
                    start: 36,
                    end: 39,
                    kind: 123,
                    flags: 0
                  },
                  start: 22,
                  end: 39,
                  kind: 140,
                  flags: 0
                },
                finalizer: null,
                start: 15,
                end: 39,
                kind: 138,
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
      text: 'function *g() { try {} catch (yield) {} }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 30,
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

  it('for (let x = 42 of list) process(x);', () => {
    t.deepEqual(recovery('for (let x = 42 of list) process(x);', 'recovery.js'), {
      kind: 209,
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
                  name: 'x',
                  start: 8,
                  end: 10,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 42,
                  start: 12,
                  end: 15,
                  kind: 10,
                  flags: 0
                },
                start: 8,
                end: 15,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 15,
            kind: 145,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'list',
            start: 18,
            end: 23,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'process',
                start: 24,
                end: 32,
                kind: 13,
                flags: 0
              },
              arguments: [
                {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 33,
                  end: 34,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 24,
              end: 35,
              kind: 156,
              flags: 0
            },
            start: 24,
            end: 36,
            kind: 122,
            flags: 0
          },
          await: false,
          start: 0,
          end: 36,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for (let x = 42 of list) process(x);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of a `for...of` statement cannot be a destructuring pattern',
          code: 113,
          start: 16,
          length: 2
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

  it('"use strict"; ({ v: eval }) = obj', () => {
    t.deepEqual(recovery('"use strict"; ({ v: eval }) = obj', 'recovery.js'), {
      kind: 209,
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
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierName',
                      name: 'v',
                      start: 16,
                      end: 18,
                      kind: 13,
                      flags: 0
                    },
                    value: {
                      type: 'IdentifierReference',
                      name: 'eval',
                      start: 19,
                      end: 24,
                      kind: 13,
                      flags: 0
                    },
                    start: 16,
                    end: 24,
                    kind: 227,
                    flags: 0
                  }
                ],
                start: 15,
                end: 26,
                kind: 179,
                flags: 0
              },
              start: 13,
              end: 27,
              kind: 189,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'obj',
              start: 29,
              end: 33,
              kind: 13,
              flags: 0
            },
            start: 13,
            end: 33,
            kind: 152,
            flags: 0
          },
          start: 13,
          end: 33,
          kind: 122,
          flags: 0
        }
      ],
      text: '"use strict"; ({ v: eval }) = obj',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 28,
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

  it('/{*/u;', () => {
    t.deepEqual(recovery('/{*/u;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '{*',
            flag: 'u',
            start: 0,
            end: 5,
            kind: 15,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '/{*/u;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('({ *a })', () => {
    t.deepEqual(recovery('({ *a })', 'recovery.js'), {
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
                  type: 'IdentifierName',
                  name: 'a',
                  start: 4,
                  end: 5,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 7,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ *a })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 36,
          start: 6,
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

  it('function *a(){yield*}', () => {
    t.deepEqual(recovery('function *a(){yield*}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 10,
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
                  type: 'YieldExpression',
                  delegate: true,
                  argument: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 20,
                    end: 20,
                    kind: 13,
                    flags: 2
                  },
                  start: 14,
                  end: 20,
                  kind: 193,
                  flags: 0
                },
                start: 14,
                end: 20,
                kind: 122,
                flags: 0
              }
            ],
            start: 13,
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
      text: 'function *a(){yield*}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('try { } catch ([a] = []) { }', () => {
    t.deepEqual(recovery('try { } catch ([a] = []) { }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 3,
            end: 7,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 16,
                  end: 17,
                  kind: 168,
                  flags: 0
                }
              ],
              start: 15,
              end: 18,
              kind: 174,
              flags: 0
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 18,
              end: 18,
              kind: 123,
              flags: 0
            },
            start: 7,
            end: 18,
            kind: 140,
            flags: 0
          },
          finalizer: null,
          start: 0,
          end: 18,
          kind: 138,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [],
            start: 20,
            end: 23,
            flags: 0
          },
          start: 20,
          end: 23,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 24,
          end: 28,
          kind: 123,
          flags: 0
        }
      ],
      text: 'try { } catch ([a] = []) { }',
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
          message: '`;` expected',
          code: 92,
          start: 23,
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

  it('1 / %', () => {
    t.deepEqual(recovery('1 / %', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'BinaryExpression',
              left: {
                type: 'NumericLiteral',
                value: 1,
                start: 0,
                end: 1,
                kind: 10,
                flags: 0
              },
              operator: '/',
              right: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              start: 0,
              end: 3,
              kind: 155,
              flags: 0
            },
            operator: '%',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 5,
            kind: 155,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '1 / %',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('[...0,...{a=0}]=0', () => {
    t.deepEqual(recovery('[...0,...{a=0}]=0', 'recovery.js'), {
      kind: 209,
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
                    type: 'NumericLiteral',
                    value: 0,
                    start: 4,
                    end: 5,
                    kind: 10,
                    flags: 0
                  },
                  start: 1,
                  end: 5,
                  kind: 177,
                  flags: 0
                },
                {
                  type: 'AssignmentRestProperty',
                  argument: {
                    type: 'ObjectAssignmentPattern',
                    properties: [
                      {
                        type: 'AssignmentElement',
                        left: {
                          type: 'IdentifierReference',
                          name: 'a',
                          start: 10,
                          end: 11,
                          kind: 13,
                          flags: 0
                        },
                        right: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 12,
                          end: 13,
                          kind: 10,
                          flags: 0
                        },
                        start: 10,
                        end: 13,
                        kind: 181,
                        flags: 0
                      }
                    ],
                    start: 9,
                    end: 14,
                    kind: 179,
                    flags: 0
                  },
                  start: 6,
                  end: 14,
                  kind: 177,
                  flags: 0
                }
              ],
              start: 0,
              end: 15,
              kind: 178,
              flags: 0
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 16,
              end: 17,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 17,
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '[...0,...{a=0}]=0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
          start: 15,
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

  it('for (let [let];;;) {}', () => {
    t.deepEqual(recovery('for (let [let];;;) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  elements: [
                    {
                      type: 'BindingIdentifier',
                      name: 'let',
                      start: 10,
                      end: 13,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  start: 8,
                  end: 14,
                  kind: 174,
                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 14,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 14,
            kind: 145,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 16,
            end: 16,
            kind: 13,
            flags: 2
          },
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 16,
            end: 17,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 17,
          kind: 132,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 18,
          end: 21,
          kind: 123,
          flags: 0
        }
      ],
      text: 'for (let [let];;;) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 10,
          length: 3
        },
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('func() = 4', () => {
    t.deepEqual(recovery('func() = 4', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'func',
                start: 0,
                end: 4,
                kind: 13,
                flags: 0
              },
              arguments: [],
              start: 0,
              end: 6,
              kind: 156,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 4,
              start: 8,
              end: 10,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'func() = 4',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 7,
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

  it('0xz', () => {
    t.deepEqual(recovery('0xz', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 0,
            end: 3,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '0xz',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'An identifier or keyword cannot immediately follow a numeric literal',
          code: 58,
          start: 2,
          length: 0
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('for (const x = 1, y = 2, z = 3, let = 0;;;) {}', () => {
    t.deepEqual(recovery('for (const x = 1, y = 2, z = 3, let = 0;;;) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 10,
                  end: 12,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 14,
                  end: 16,
                  kind: 10,
                  flags: 0
                },
                start: 10,
                end: 16,
                kind: 146,
                flags: 0
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'y',
                  start: 17,
                  end: 19,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 2,
                  start: 21,
                  end: 23,
                  kind: 10,
                  flags: 0
                },
                start: 17,
                end: 23,
                kind: 146,
                flags: 0
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'z',
                  start: 24,
                  end: 26,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 3,
                  start: 28,
                  end: 30,
                  kind: 10,
                  flags: 0
                },
                start: 24,
                end: 30,
                kind: 146,
                flags: 0
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'let',
                  start: 31,
                  end: 35,
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 37,
                  end: 39,
                  kind: 10,
                  flags: 0
                },
                start: 31,
                end: 39,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 39,
            kind: 145,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 41,
            end: 41,
            kind: 13,
            flags: 2
          },
          incrementor: null,
          statement: {
            type: 'EmptyStatement',
            start: 41,
            end: 42,
            kind: 148,
            flags: 0
          },
          start: 0,
          end: 42,
          kind: 132,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 43,
          end: 46,
          kind: 123,
          flags: 0
        }
      ],
      text: 'for (const x = 1, y = 2, z = 3, let = 0;;;) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A lexical declaration can not define a `let` binding',
          code: 87,
          start: 32,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 41,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 42,
          length: 1
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

  it('[...0,{a=0}]=0', () => {
    t.deepEqual(recovery('[...0,{a=0}]=0', 'recovery.js'), {
      kind: 209,
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
                    type: 'NumericLiteral',
                    value: 0,
                    start: 4,
                    end: 5,
                    kind: 10,
                    flags: 0
                  },
                  start: 1,
                  end: 5,
                  kind: 177,
                  flags: 0
                },
                {
                  type: 'ObjectAssignmentPattern',
                  properties: [
                    {
                      type: 'AssignmentElement',
                      left: {
                        type: 'IdentifierReference',
                        name: 'a',
                        start: 7,
                        end: 8,
                        kind: 13,
                        flags: 0
                      },
                      right: {
                        type: 'NumericLiteral',
                        value: 0,
                        start: 9,
                        end: 10,
                        kind: 10,
                        flags: 0
                      },
                      start: 7,
                      end: 10,
                      kind: 181,
                      flags: 0
                    }
                  ],
                  start: 6,
                  end: 11,
                  kind: 179,
                  flags: 0
                }
              ],
              start: 0,
              end: 12,
              kind: 178,
              flags: 0
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 13,
              end: 14,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '[...0,{a=0}]=0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid destruct',
          code: 96,
          start: 12,
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

  it('\\;', () => {
    t.deepEqual(recovery('\\;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: '￿',
            start: 0,
            end: 1,
            kind: 13,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '\\;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid Unicode escape sequence',
          code: 48,
          start: 0,
          length: 0
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('function false() { }', () => {
    t.deepEqual(recovery('function false() { }', 'recovery.js'), {
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
            type: 'CallExpression',
            expression: {
              type: 'BooleanLiteral',
              value: false,
              start: 8,
              end: 14,
              kind: 166,
              flags: 0
            },
            arguments: [],
            start: 8,
            end: 16,
            kind: 156,
            flags: 0
          },
          start: 8,
          end: 16,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 16,
          end: 20,
          kind: 123,
          flags: 0
        }
      ],
      text: 'function false() { }',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 17,
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

  it('a => {}()', () => {
    t.deepEqual(recovery('a => {}()', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ArrowFunction',
              params: [
                {
                  type: 'BindingIdentifier',
                  name: 'a',
                  start: 0,
                  end: 1,
                  kind: 168,
                  flags: 0
                }
              ],
              contents: {
                type: 'FunctionBody',
                directives: [],
                leafs: [],
                start: 4,
                end: 7,
                kind: 184,
                flags: 0
              },
              async: false,
              start: 0,
              end: 7,
              kind: 188,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 9,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'a => {}()',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Block body arrows can not be immediately invoked without a group',
          code: 83,
          start: 7,
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

  it('obj = {x = 0}', () => {
    t.deepEqual(recovery('obj = {x = 0}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'obj',
              start: 0,
              end: 3,
              kind: 13,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'CoverInitializedName',
                  left: {
                    type: 'IdentifierReference',
                    name: 'x',
                    start: 7,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 0,
                    start: 10,
                    end: 12,
                    kind: 10,
                    flags: 0
                  },
                  start: 7,
                  end: 12,
                  kind: 181,
                  flags: 0
                }
              ],
              start: 5,
              end: 13,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 13,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'obj = {x = 0}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=` can only be used in an object literal property inside a destructuring ',
          code: 100,
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

  it('a class;', () => {
    t.deepEqual(recovery('a class;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
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
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 1,
          end: 7,
          kind: 150,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 7,
          end: 8,
          kind: 148,
          flags: 0
        }
      ],
      text: 'a class;',
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
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
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

  it('function*g() { let yield; }', () => {
    t.deepEqual(recovery('function*g() { let yield; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'g',
            start: 9,
            end: 10,
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
                type: 'LexicalDeclaration',
                isConst: false,
                declarations: [
                  {
                    type: 'LexicalBinding',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'yield',
                      start: 18,
                      end: 24,
                      kind: 168,
                      flags: 0
                    },
                    initializer: null,
                    start: 18,
                    end: 24,
                    kind: 146,
                    flags: 0
                  }
                ],
                start: 14,
                end: 25,
                kind: 145,
                flags: 0
              }
            ],
            start: 12,
            end: 27,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 27,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function*g() { let yield; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Unexpected `yield` as binding identifier in this context',
          code: 90,
          start: 19,
          length: 5
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

  it('var', () => {
    t.deepEqual(recovery('var', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'VariableStatement',
          declarations: [],
          start: 0,
          end: 3,
          kind: 143,
          flags: 0
        }
      ],
      text: 'var',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;', () => {
    t.deepEqual(recovery('([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;', 'recovery.js'), {
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
                elements: [
                  {
                    type: 'ArrayBindingPattern',
                    elements: [
                      {
                        type: 'ArrayBindingPattern',
                        elements: [
                          {
                            type: 'ArrayBindingPattern',
                            elements: [
                              {
                                type: 'ArrayBindingPattern',
                                elements: [
                                  {
                                    type: 'ArrayBindingPattern',
                                    elements: [
                                      {
                                        type: 'ArrayBindingPattern',
                                        elements: [
                                          {
                                            type: 'ArrayBindingPattern',
                                            elements: [
                                              {
                                                type: 'ArrayBindingPattern',
                                                elements: [
                                                  {
                                                    type: 'ArrayBindingPattern',
                                                    elements: [
                                                      {
                                                        type: 'ArrayBindingPattern',
                                                        elements: [
                                                          {
                                                            type: 'ArrayBindingPattern',
                                                            elements: [
                                                              {
                                                                type: 'ArrayBindingPattern',
                                                                elements: [
                                                                  {
                                                                    type: 'ArrayBindingPattern',
                                                                    elements: [
                                                                      {
                                                                        type: 'ArrayBindingPattern',
                                                                        elements: [
                                                                          {
                                                                            type: 'ArrayBindingPattern',
                                                                            elements: [
                                                                              {
                                                                                type: 'ArrayBindingPattern',
                                                                                elements: [
                                                                                  {
                                                                                    type: 'ArrayBindingPattern',
                                                                                    elements: [
                                                                                      {
                                                                                        type: 'ArrayBindingPattern',
                                                                                        elements: [
                                                                                          {
                                                                                            type: 'ArrayBindingPattern',
                                                                                            elements: [
                                                                                              {
                                                                                                type:
                                                                                                  'ObjectBindingPattern',
                                                                                                properties: [
                                                                                                  {
                                                                                                    type:
                                                                                                      'PropertyName',
                                                                                                    key: {
                                                                                                      type:
                                                                                                        'IdentifierName',
                                                                                                      name: 'a',
                                                                                                      start: 22,
                                                                                                      end: 23,
                                                                                                      kind: 13,
                                                                                                      flags: 0
                                                                                                    },
                                                                                                    value: {
                                                                                                      type:
                                                                                                        'MemberExpression',
                                                                                                      member: {
                                                                                                        type:
                                                                                                          'IdentifierReference',
                                                                                                        name: 'b',
                                                                                                        start: 24,
                                                                                                        end: 25,
                                                                                                        kind: 13,
                                                                                                        flags: 0
                                                                                                      },
                                                                                                      expression: {
                                                                                                        type:
                                                                                                          'NumericLiteral',
                                                                                                        value: 0,
                                                                                                        start: 26,
                                                                                                        end: 27,
                                                                                                        kind: 10,
                                                                                                        flags: 0
                                                                                                      },
                                                                                                      computed: true,
                                                                                                      start: 24,
                                                                                                      end: 28,
                                                                                                      kind: 154,
                                                                                                      flags: 0
                                                                                                    },
                                                                                                    start: 22,
                                                                                                    end: 28,
                                                                                                    kind: 227,
                                                                                                    flags: 0
                                                                                                  }
                                                                                                ],
                                                                                                start: 21,
                                                                                                end: 29,
                                                                                                kind: 179,
                                                                                                flags: 0
                                                                                              }
                                                                                            ],
                                                                                            start: 20,
                                                                                            end: 30,
                                                                                            kind: 178,
                                                                                            flags: 0
                                                                                          }
                                                                                        ],
                                                                                        start: 19,
                                                                                        end: 31,
                                                                                        kind: 178,
                                                                                        flags: 0
                                                                                      }
                                                                                    ],
                                                                                    start: 18,
                                                                                    end: 32,
                                                                                    kind: 178,
                                                                                    flags: 0
                                                                                  }
                                                                                ],
                                                                                start: 17,
                                                                                end: 33,
                                                                                kind: 178,
                                                                                flags: 0
                                                                              }
                                                                            ],
                                                                            start: 16,
                                                                            end: 34,
                                                                            kind: 178,
                                                                            flags: 0
                                                                          }
                                                                        ],
                                                                        start: 15,
                                                                        end: 35,
                                                                        kind: 178,
                                                                        flags: 0
                                                                      }
                                                                    ],
                                                                    start: 14,
                                                                    end: 36,
                                                                    kind: 178,
                                                                    flags: 0
                                                                  }
                                                                ],
                                                                start: 13,
                                                                end: 37,
                                                                kind: 178,
                                                                flags: 0
                                                              }
                                                            ],
                                                            start: 12,
                                                            end: 38,
                                                            kind: 178,
                                                            flags: 0
                                                          }
                                                        ],
                                                        start: 11,
                                                        end: 39,
                                                        kind: 178,
                                                        flags: 0
                                                      }
                                                    ],
                                                    start: 10,
                                                    end: 40,
                                                    kind: 178,
                                                    flags: 0
                                                  }
                                                ],
                                                start: 9,
                                                end: 41,
                                                kind: 178,
                                                flags: 0
                                              }
                                            ],
                                            start: 8,
                                            end: 42,
                                            kind: 178,
                                            flags: 0
                                          }
                                        ],
                                        start: 7,
                                        end: 43,
                                        kind: 178,
                                        flags: 0
                                      }
                                    ],
                                    start: 6,
                                    end: 44,
                                    kind: 178,
                                    flags: 0
                                  }
                                ],
                                start: 5,
                                end: 45,
                                kind: 178,
                                flags: 0
                              }
                            ],
                            start: 4,
                            end: 46,
                            kind: 178,
                            flags: 0
                          }
                        ],
                        start: 3,
                        end: 47,
                        kind: 178,
                        flags: 0
                      }
                    ],
                    start: 2,
                    end: 48,
                    kind: 178,
                    flags: 0
                  }
                ],
                start: 1,
                end: 49,
                kind: 178,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'NumericLiteral',
                value: 0,
                start: 52,
                end: 53,
                kind: 10,
                flags: 0
              },
              start: 52,
              end: 53,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 0,
            end: 53,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 54,
          kind: 122,
          flags: 0
        }
      ],
      text: '([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an arrow function can only be destructed through assignment',
          code: 103,
          start: 50,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 54,
      end: 54
    });
  });

  it('(function*() { yield* })', () => {
    t.deepEqual(recovery('(function*() { yield* })', 'recovery.js'), {
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
                      type: 'YieldExpression',
                      delegate: true,
                      argument: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 21,
                        end: 21,
                        kind: 13,
                        flags: 2
                      },
                      start: 14,
                      end: 21,
                      kind: 193,
                      flags: 0
                    },
                    start: 14,
                    end: 21,
                    kind: 122,
                    flags: 0
                  }
                ],
                start: 12,
                end: 23,
                kind: 184,
                flags: 0
              },
              start: 1,
              end: 23,
              kind: 185,
              flags: 0
            },
            start: 0,
            end: 24,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: '(function*() { yield* })',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 22,
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

  it('f(... ... a)', () => {
    t.deepEqual(recovery('f(... ... a)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'f',
              start: 0,
              end: 1,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 5,
                  end: 5,
                  kind: 13,
                  flags: 2
                },
                start: 5,
                end: 5,
                kind: 200,
                flags: 0
              },
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 9,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                start: 9,
                end: 11,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 12,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'f(... ... a)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 3
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

  it('[x] += 0', () => {
    t.deepEqual(recovery('[x] += 0', 'recovery.js'), {
      kind: 209,
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
                  end: 2,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 0,
              end: 3,
              kind: 178,
              flags: 0
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
              start: 6,
              end: 8,
              kind: 10,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 213,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '[x] += 0',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Cannot compound-assign to an array or object literal',
          code: 27,
          start: 4,
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

  it('class A extends B { constructor() { (super)(); } }', () => {
    t.deepEqual(recovery('class A extends B { constructor() { (super)(); } }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'A',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: {
            type: 'IdentifierReference',
            name: 'B',
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
                getter: false,
                setter: false,
                propertySetParameterList: null,
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
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'CallExpression',
                          expression: {
                            type: 'SuperProperty',
                            super: {
                              type: 'IdentifierName',
                              name: '',
                              start: 43,
                              end: 43,
                              kind: 13,
                              flags: 0
                            },
                            start: 37,
                            end: 43,
                            kind: 192,
                            flags: 0
                          },
                          arguments: [],
                          start: 37,
                          end: 45,
                          kind: 156,
                          flags: 0
                        },
                        start: 35,
                        end: 45,
                        kind: 189,
                        flags: 0
                      },
                      start: 35,
                      end: 46,
                      kind: 122,
                      flags: 0
                    }
                  ],
                  start: 33,
                  end: 48,
                  kind: 184,
                  flags: 0
                },
                start: 31,
                end: 48,
                kind: 182,
                flags: 0
              },
              start: 19,
              end: 48,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 50,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class A extends B { constructor() { (super)(); } }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`super` must be followed by an argument list or member access',
          code: 136,
          start: 42,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 45,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 50,
      end: 50
    });
  });
});
