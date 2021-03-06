import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Module - Import', () => {
  it('import export from "s"', () => {
    t.deepStrictEqual(recovery('import export from "s"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 6,
          end: 13,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'from',
            start: 13,
            end: 18,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 13,
          end: 18,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 's',
            start: 18,
            end: 22,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 18,
          end: 22,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import export from "s"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token - `export`',
          code: 6,
          start: 7,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: 'Export declaration expected',
          code: 30,
          start: 14,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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
      type: 'RootNode',
      webCompat: true,
      end: 22
    });
  });
  it('import import from "s"', () => {
    t.deepStrictEqual(recovery('import import from "s"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 's',
            start: 18,
            end: 22,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'from',
              start: 13,
              end: 18,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            nameSpaceImport: null,
            namedImports: null,
            start: 13,
            end: 18,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 6,
          end: 22,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import import from "s"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token - `import`',
          code: 6,
          start: 7,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: '`from` expected',
          code: 5,
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
      type: 'RootNode',
      webCompat: true,
      end: 22
    });
  });
  it('import class from "s"', () => {
    t.deepStrictEqual(recovery('import class from "s"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'from',
            start: 12,
            end: 17,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          heritage: null,
          elements: [],
          start: 6,
          end: 17,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 's',
            start: 17,
            end: 21,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 17,
          end: 21,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import class from "s"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token - `class`',
          code: 6,
          start: 7,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 18,
          length: 3
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
  it('import function from "s"', () => {
    t.deepStrictEqual(recovery('import function from "s"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'from',
            start: 15,
            end: 20,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
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

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 6,
          end: 20,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 's',
            start: 20,
            end: 24,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 20,
          end: 24,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import function from "s"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token - `function`',
          code: 6,
          start: 7,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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
      type: 'RootNode',
      webCompat: true,
      end: 24
    });
  });
  it('import !foo from "s"', () => {
    t.deepStrictEqual(recovery('import !foo from "s"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 8,
              end: 11,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 11,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 6,
          end: 11,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'from',
            start: 11,
            end: 16,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 11,
          end: 16,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 's',
            start: 16,
            end: 20,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 16,
          end: 20,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import !foo from "s"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Unexpected token - `!`',
          code: 6,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 12,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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
      type: 'RootNode',
      webCompat: true,
      end: 20
    });
  });

  it('import {a,,,,b,,,,,c!', () => {
    t.deepStrictEqual(recovery('import {a,,,,b,,,,,c!', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'a',
            start: 10,
            end: 11,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: null,
                  binding: {
                    type: 'IdentifierName',
                    name: 'a',
                    start: 8,
                    end: 9,

                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 8,
                  end: 9,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 6,
              end: 10,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 10,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 11,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: 'b',
                start: 13,
                end: 14,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 15,
                end: 15,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 17,
                end: 17,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 18,
                end: 18,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: 'c',
                start: 19,
                end: 20,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 13,
            end: 20,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 13,
          end: 20,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 21,
              end: 21,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 20,
            end: 21,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 20,
          end: 21,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import {a,,,,b,,,,,c!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
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
          message: 'Expression expected',
          code: 7,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 18,
          length: 1
        },
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
      length: 21,
      type: 'RootNode',
      webCompat: true,
      end: 21
    });
  });

  it('import {,,,,,,,,,,,,,,,,, !', () => {
    t.deepStrictEqual(recovery('import {,,,,,,,,,,,,,,,,, !', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'import',
            start: 8,
            end: 9,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [],
              start: 6,
              end: 8,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 8,

            flags: 0,
            meta: {
              asi: false,

              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 9,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
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

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 25,
            end: 27,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 25,
          end: 27,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import {,,,,,,,,,,,,,,,,, !',
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
          start: 9,
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
          message: 'Statement expected',
          code: 8,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
      type: 'RootNode',
      webCompat: true,
      end: 27
    });
  });

  it('crazy long human senence', () => {
    t.deepStrictEqual(
      recovery(
        'import babel parser and experience something slow you can export by default or try while waiting to switch for something fast !',
        'recovery.js',
        { module: true, cst: true }
      ),
      {
        directives: [],
        leafs: [
          {
            type: 'ImportDeclaration',
            fromClause: {
              type: 'StringLiteral',
              value: 'parser',
              start: 12,
              end: 19,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            moduleSpecifier: null,
            importClause: {
              type: 'ImportClause',
              defaultBinding: {
                type: 'BindingIdentifier',
                name: 'babel',
                start: 6,
                end: 12,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              nameSpaceImport: null,
              namedImports: null,
              start: 6,
              end: 12,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 0,
            end: 19,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'and',
              start: 19,
              end: 23,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 19,
            end: 23,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'experience',
              start: 23,
              end: 34,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 23,
            end: 34,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'something',
              start: 34,
              end: 44,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 34,
            end: 44,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'slow',
              start: 44,
              end: 49,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 44,
            end: 49,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'you',
              start: 49,
              end: 53,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 49,
            end: 53,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'can',
              start: 53,
              end: 57,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 53,
            end: 57,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 57,
            end: 64,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'by',
              start: 64,
              end: 67,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 64,
            end: 67,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'or',
              start: 75,
              end: 78,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 75,
            end: 78,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 82,
              end: 82,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            catchClause: null,
            finalizer: null,
            start: 78,
            end: 82,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'waiting',
              start: 88,
              end: 96,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'to',
                start: 96,
                end: 99,
                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 96,
              end: 99,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 82,
            end: 99,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'SwitchStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 106,
              end: 106,

              flags: 2,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            clauses: [],
            start: 99,
            end: 106,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ForStatement',
            initializer: {
              type: 'IdentifierReference',
              name: 'something',
              start: 110,
              end: 120,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            condition: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 127,
                end: 127,
                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 125,
              end: 127,
              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            incrementor: {
              type: 'IdentifierReference',
              name: 'fast',
              start: 120,
              end: 125,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            variableDeclarationList: false,
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 127,
                end: 127,

                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 127,
              end: 127,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 106,
            end: 127,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          }
        ],
        text:
          'import babel parser and experience something slow you can export by default or try while waiting to switch for something fast !',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`from` expected',
            code: 5,
            start: 13,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 20,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 24,
            length: 10
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 35,
            length: 9
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 45,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 50,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 54,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 58,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 65,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 68,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 79,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 83,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 89,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 97,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 100,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 107,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 111,
            length: 9
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 121,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 126,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 127,
        type: 'RootNode',
        webCompat: true,
        end: 127
      }
    );
  });

  it('import {', () => {
    t.deepStrictEqual(recovery('import {', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'import',
            start: 8,
            end: 8,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [],
              start: 6,
              end: 8,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 8,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 8,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import {',
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
      type: 'RootNode',
      webCompat: true,
      end: 8
    });
  });

  it('import { import !', () => {
    t.deepStrictEqual(recovery('import { import !', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'import',
            start: 15,
            end: 17,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: null,
                  binding: {
                    type: 'IdentifierName',
                    name: 'import',
                    start: 8,
                    end: 15,

                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 8,
                  end: 15,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 6,
              end: 15,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 15,
            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 17,
          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import { import !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid use of keyword as an identifier',
          code: 131,
          start: 15,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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
      length: 17,
      type: 'RootNode',
      webCompat: true,
      end: 17
    });
  });

  it('import { let as l } from "foo";', () => {
    t.deepStrictEqual(recovery('import { let as l } from "foo";', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 24,
            end: 30,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: {
                    type: 'IdentifierName',
                    name: 'let',
                    start: 8,
                    end: 12,
                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'l',
                    start: 15,
                    end: 17,
                    flags: 0,
                    meta: {
                      asi: true,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 8,
                  end: 17,
                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 6,
              end: 19,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 19,
            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 31,
          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import { let as l } from "foo";',
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
      type: 'RootNode',
      webCompat: true,
      end: 31
    });
  });

  it('import a, {as} from "foo"', () => {
    t.deepStrictEqual(recovery('import a, {as} from "foo"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 19,
            end: 25,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'a',
              start: 6,
              end: 8,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: null,
                  binding: {
                    type: 'IdentifierName',
                    name: 'as',
                    start: 11,
                    end: 13,
                    flags: 0,
                    meta: {
                      asi: true,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 11,
                  end: 13,
                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 9,
              end: 14,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 14,
            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 25,
          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import a, {as} from "foo"',
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
      type: 'RootNode',
      webCompat: true,
      end: 25
    });
  });

  it('import a, {b as c} from "foo"', () => {
    t.deepStrictEqual(recovery('import a, {b as c} from "foo"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 23,
            end: 29,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'a',
              start: 6,
              end: 8,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: {
                    type: 'IdentifierName',
                    name: 'b',
                    start: 11,
                    end: 12,
                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'c',
                    start: 15,
                    end: 17,
                    flags: 0,
                    meta: {
                      asi: true,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 11,
                  end: 17,
                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 9,
              end: 18,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 18,
            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 29,
          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import a, {b as c} from "foo"',
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
      type: 'RootNode',
      webCompat: true,
      end: 29
    });
  });

  it('import { static as s } from "foo"', () => {
    t.deepStrictEqual(recovery('import { static as s } from "foo"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 27,
            end: 33,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: {
                    type: 'IdentifierName',
                    name: 'static',
                    start: 8,
                    end: 15,

                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  binding: {
                    type: 'BindingIdentifier',
                    name: 's',
                    start: 18,
                    end: 20,

                    flags: 0,
                    meta: {
                      asi: true,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 8,
                  end: 20,

                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 6,
              end: 22,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 22,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 33,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import { static as s } from "foo"',
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
      type: 'RootNode',
      webCompat: true,
      end: 33
    });
  });

  it('import {m as mm} from "foo"', () => {
    t.deepStrictEqual(recovery('import {m as mm} from "foo"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 21,
            end: 27,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: {
                    type: 'IdentifierName',
                    name: 'm',
                    start: 8,
                    end: 9,

                    flags: 0,
                    meta: {
                      asi: false,
                      newlineBeforeNextToken: false
                    }
                  },
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'mm',
                    start: 12,
                    end: 15,

                    flags: 0,
                    meta: {
                      asi: true,
                      newlineBeforeNextToken: false
                    }
                  },
                  start: 8,
                  end: 15,

                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 6,
              end: 16,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 16,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 27,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import {m as mm} from "foo"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 27,
      type: 'RootNode',
      webCompat: true,
      end: 27
    });
  });

  it('import x, * as a from "foo"', () => {
    t.deepStrictEqual(recovery('import x, * as a from "foo"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 21,
            end: 27,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 6,
              end: 8,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            nameSpaceImport: {
              type: 'BindingIdentifier',
              name: 'a',
              start: 14,
              end: 16,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            namedImports: null,
            start: 6,
            end: 16,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 27,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'import x, * as a from "foo"',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 27,
      type: 'RootNode',
      webCompat: true,
      end: 27
    });
  });

  it('export import still module code ! script or import', () => {
    t.deepStrictEqual(
      recovery('export import still module code ! script or import', 'recovery.js', { module: true, cst: true }),
      {
        directives: [],
        leafs: [
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 0,
            end: 6,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ImportDeclaration',
            fromClause: {
              type: 'StringLiteral',
              value: 'module',
              start: 19,
              end: 26,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            moduleSpecifier: null,
            importClause: {
              type: 'ImportClause',
              defaultBinding: {
                type: 'BindingIdentifier',
                name: 'still',
                start: 13,
                end: 19,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              nameSpaceImport: null,
              namedImports: null,
              start: 13,
              end: 19,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 26,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'code',
              start: 26,
              end: 31,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 26,
            end: 31,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: 'script',
                start: 33,
                end: 40,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 31,
              end: 40,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 31,
            end: 40,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'or',
              start: 40,
              end: 43,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 40,
            end: 43,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ImportDeclaration',
            fromClause: null,
            moduleSpecifier: null,
            importClause: null,
            start: 43,
            end: 50,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          }
        ],
        text: 'export import still module code ! script or import',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 7,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`from` expected',
            code: 5,
            start: 20,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 27,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 32,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 41,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 44,
            length: 6
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 50,
        type: 'RootNode',
        webCompat: true,
        end: 50
      }
    );
  });

  it('possible to export import ? ! while I try this, I go for a walk', () => {
    t.deepStrictEqual(
      recovery('possible to export import ? ! while I try this, I go for a walk', 'recovery.js', {
        module: true,
        cst: true
      }),
      {
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'possible',
              start: 0,
              end: 8,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 0,
            end: 8,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'to',
              start: 8,
              end: 11,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 8,
            end: 11,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 11,
            end: 18,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ImportDeclaration',
            fromClause: null,
            moduleSpecifier: null,
            importClause: null,
            start: 18,
            end: 25,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 29,
                end: 29,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 27,
              end: 29,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 27,
            end: 29,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 35,
              end: 37,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            statement: {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 41,
                end: 41,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              catchClause: null,
              finalizer: null,
              start: 37,
              end: 41,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 29,
            end: 41,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'ThisExpression',
                  start: 41,
                  end: 46,
                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                {
                  type: 'IdentifierReference',
                  name: 'I',
                  start: 47,
                  end: 49,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 41,
              end: 49,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 41,
            end: 49,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'go',
              start: 49,
              end: 52,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 49,
            end: 52,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ForStatement',
            initializer: {
              type: 'IdentifierReference',
              name: 'a',
              start: 56,
              end: 58,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            condition: {
              type: 'IdentifierReference',
              name: '',
              start: 63,
              end: 63,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            incrementor: {
              type: 'IdentifierReference',
              name: 'walk',
              start: 58,
              end: 63,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            variableDeclarationList: false,
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 63,
                end: 63,

                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 63,
              end: 63,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 52,
            end: 63,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          }
        ],
        text: 'possible to export import ? ! while I try this, I go for a walk',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 9,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 12,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 19,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Unexpected token - `?`',
            code: 6,
            start: 26,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 30,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 36,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 38,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 42,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 50,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 53,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 57,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 59,
            length: 4
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 63,
        type: 'RootNode',
        webCompat: true,
        end: 63
      }
    );
  });

  it('import export || (or) export import? I try while I eat! for 11 time!!', () => {
    t.deepStrictEqual(
      recovery('import export || (or) export import? I try while I eat! for 11 time!!', 'recovery.js', {
        module: true,
        cst: true
      }),
      {
        directives: [],
        leafs: [
          {
            type: 'ImportDeclaration',
            fromClause: null,
            moduleSpecifier: null,
            importClause: null,
            start: 0,
            end: 6,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 6,
            end: 13,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
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

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              operator: '||',
              right: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: 'or',
                  start: 18,
                  end: 20,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                start: 16,
                end: 21,
                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 13,
              end: 21,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 13,
            end: 21,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 21,
            end: 28,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ImportDeclaration',
            fromClause: null,
            moduleSpecifier: null,
            importClause: null,
            start: 28,
            end: 35,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 36,
              end: 38,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 36,
            end: 38,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 42,
              end: 42,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            catchClause: null,
            finalizer: null,
            start: 38,
            end: 42,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 48,
              end: 50,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'eat',
                start: 50,
                end: 54,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 50,
              end: 54,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 42,
            end: 54,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 55,
                end: 55,

                flags: 2,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 54,
              end: 55,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 54,
            end: 55,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ForStatement',
            initializer: {
              type: 'NumericLiteral',
              value: 11,
              start: 59,
              end: 62,
              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            condition: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 69,
                  end: 69,

                  flags: 2,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                start: 68,
                end: 69,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 67,
              end: 69,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            incrementor: {
              type: 'IdentifierReference',
              name: 'time',
              start: 62,
              end: 67,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            variableDeclarationList: false,
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 69,
                end: 69,

                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 69,
              end: 69,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 55,
            end: 69,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          }
        ],
        text: 'import export || (or) export import? I try while I eat! for 11 time!!',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: 'Unexpected token - `export`',
            code: 6,
            start: 7,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 14,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 22,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 29,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Unexpected token - `?`',
            code: 6,
            start: 35,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 39,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 43,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 49,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 51,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 54,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 56,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 60,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 63,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 67,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 68,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 69,
        type: 'RootNode',
        webCompat: true,
        end: 69
      }
    );
  });
});
