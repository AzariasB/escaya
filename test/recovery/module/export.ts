import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Export', () => {
  it('export function *await(', () => {
    t.deepStrictEqual(recovery('export function *await(', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'await',
              start: 17,
              end: 22,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            generator: true,
            async: false,
            params: [],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 23,
              end: 23,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 23,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 23,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export function *await(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`await` can not be used as a function name in this context',
          code: 89,
          start: 17,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 22,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 23,
      type: 'RootNode',
      webCompat: true,
      end: 23
    });
  });

  it('export { default as', () => {
    t.deepStrictEqual(recovery('export { default as', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'default',
                start: 8,
                end: 16,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: '',
                start: 19,
                end: 19,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 8,
              end: 19,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['default'],
          start: 0,
          end: 19,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { default as',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an identifier',
          code: 20,
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

  it('export { default as !!', () => {
    t.deepStrictEqual(recovery('export { default as !!', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'default',
                start: 8,
                end: 16,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: '',
                start: 21,
                end: 21,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 8,
              end: 21,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['default'],
          start: 0,
          end: 21,

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
              start: 22,
              end: 22,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 21,
            end: 22,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 21,
          end: 22,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { default as !!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an identifier',
          code: 20,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
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
      type: 'RootNode',
      webCompat: true,
      end: 22
    });
  });

  it('export var y = 0;', () => {
    t.deepStrictEqual(recovery('export var y = 0;', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'VariableStatement',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'y',
                  start: 10,
                  end: 12,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 14,
                  end: 16,

                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                start: 10,
                end: 16,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 6,
            end: 17,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 17,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export var y = 0;',
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
      type: 'RootNode',
      webCompat: true,
      end: 17
    });
  });

  it('export { arguments } from "m.js";', () => {
    t.deepStrictEqual(recovery('export { arguments } from "m.js";', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'arguments',
                start: 8,
                end: 18,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              binding: null,
              start: 8,
              end: 18,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'm.js',
            start: 25,
            end: 32,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          exportedNames: ['arguments'],
          boundNames: ['arguments'],
          start: 0,
          end: 33,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { arguments } from "m.js";',
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

  it('export { a as b } from "m.js";', () => {
    t.deepStrictEqual(recovery('export { a as b } from "m.js";', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 8,
                end: 10,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: 'b',
                start: 13,
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
          exportFromClause: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'm.js',
            start: 22,
            end: 29,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          exportedNames: ['b'],
          boundNames: ['a'],
          start: 0,
          end: 30,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { a as b } from "m.js";',
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
      type: 'RootNode',
      webCompat: true,
      end: 30
    });
  });

  it('var a; export { a as b, a as c };', () => {
    t.deepStrictEqual(recovery('var a; export { a as b, a as c };', 'recovery.js', { module: true, cst: true }), {
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

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              initializer: null,
              start: 3,
              end: 5,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
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
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 15,
                end: 17,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: 'b',
                start: 20,
                end: 22,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              start: 15,
              end: 22,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 23,
                end: 25,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: 'c',
                start: 28,
                end: 30,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 23,
              end: 30,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['b', 'c'],
          boundNames: ['a', 'a'],
          start: 6,
          end: 33,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'var a; export { a as b, a as c };',
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

  it('class c { }; export default c', () => {
    t.deepStrictEqual(recovery('class c { }; export default c', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'c',
            start: 5,
            end: 7,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 11,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'EmptyStatement',
          start: 11,
          end: 12,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'ExportDefault',
          declaration: {
            type: 'IdentifierReference',
            name: 'c',
            start: 27,
            end: 29,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 12,
          end: 29,
          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'class c { }; export default c',
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

  it('export let x = y, [...z] = y;', () => {
    t.deepStrictEqual(recovery('export let x = y, [...z] = y;', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 10,
                  end: 12,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 14,
                  end: 16,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                start: 10,
                end: 16,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  elements: [
                    {
                      type: 'BindingRestElement',
                      argument: {
                        type: 'BindingIdentifier',
                        name: 'z',
                        start: 22,
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
                    }
                  ],
                  start: 17,
                  end: 24,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 26,
                  end: 28,

                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                start: 17,
                end: 28,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 6,
            end: 29,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 29,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export let x = y, [...z] = y;',
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

  it('export default () => {}', () => {
    t.deepStrictEqual(recovery('export default () => {}', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDefault',
          declaration: {
            type: 'ArrowFunction',
            arrowParameters: true,
            params: [],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 20,
              end: 23,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            async: false,
            start: 14,
            end: 23,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 23,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export default () => {}',
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
      type: 'RootNode',
      webCompat: true,
      end: 23
    });
  });

  it('export import from "foo"', () => {
    t.deepStrictEqual(recovery('export import from "foo"', 'recovery.js', { module: true, cst: true }), {
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
            value: 'foo',
            start: 18,
            end: 24,

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
          end: 24,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export import from "foo"',
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
          start: 19,
          length: 5
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
  it('export {!', () => {
    t.deepStrictEqual(recovery('export {!', 'recovery.js', { module: true, cst: true }), {
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
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 8,
            end: 9,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 8,
          end: 9,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export {!',
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
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      type: 'RootNode',
      webCompat: true,
      end: 9
    });
  });
  it('export function !', () => {
    t.deepStrictEqual(recovery('export function !', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: '',
              start: 15,
              end: 15,

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
              start: 15,
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
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 15,

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
              start: 17,
              end: 17,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 15,
            end: 17,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 15,
          end: 17,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export function !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
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
  it('export *', () => {
    t.deepStrictEqual(recovery('export *', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          exportFromClause: {
            type: 'ExportFromClause',
            moduleExportName: null,
            namedBinding: null,
            start: 0,
            end: 8,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          fromClause: {
            type: 'StringLiteral',
            value: 'export',
            start: 8,
            end: 8,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 8,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export *',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`from` expected',
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

  it('export { as', () => {
    t.deepStrictEqual(recovery('export { as', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'as',
                start: 8,
                end: 11,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              binding: null,
              start: 8,
              end: 11,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['as'],
          start: 0,
          end: 11,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { as',
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
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      type: 'RootNode',
      webCompat: true,
      end: 11
    });
  });

  it('export class function let const var async async function default', () => {
    t.deepStrictEqual(
      recovery('export class function let const var async async function default', 'recovery.js', {
        module: true,
        cst: true
      }),
      {
        directives: [],
        leafs: [
          {
            type: 'ExportDeclaration',
            declaration: {
              type: 'ClassDeclaration',
              name: null,
              heritage: null,
              elements: [],
              start: 6,
              end: 12,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 0,
            end: 12,

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
              name: 'let',
              start: 21,
              end: 25,

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
              start: 25,
              end: 25,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 12,
            end: 25,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [],
            start: 25,
            end: 31,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'VariableStatement',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'async',
                  start: 35,
                  end: 41,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: null,
                start: 35,
                end: 41,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'async',
                  start: 41,
                  end: 47,

                  flags: 0,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: null,
                start: 41,
                end: 47,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 31,
            end: 47,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
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
              start: 56,
              end: 56,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 47,
            end: 56,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          }
        ],
        text: 'export class function let const var async async function default',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 3,
            source: 2,
            message: 'Class declaration require a name in this context',
            code: 11,
            start: 13,
            length: 8
          },
          {
            kind: 2,
            source: 0,
            message: 'Unexpected reserved word in strict mode',
            code: 18,
            start: 22,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 26,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 32,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: 'Variable declaration expected',
            code: 116,
            start: 42,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: 'Variable declaration expected',
            code: 116,
            start: 48,
            length: 8
          },
          {
            kind: 3,
            source: 2,
            message: 'Function declaration require a name in this context',
            code: 10,
            start: 57,
            length: 7
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 64,
        type: 'RootNode',
        webCompat: true,
        end: 64
      }
    );
  });

  it('export const {', () => {
    t.deepStrictEqual(recovery('export const {', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [],
                  start: 12,
                  end: 14,
                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: null,
                start: 12,
                end: 14,

                flags: 0,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 6,
            end: 14,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 14,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export const {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
      type: 'RootNode',
      webCompat: true,
      end: 14
    });
  });

  it('export +', () => {
    t.deepStrictEqual(recovery('export +', 'recovery.js', { module: true, cst: true }), {
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
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,

              flags: 2,
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
          start: 6,
          end: 8,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export +',
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

  it('export { export !', () => {
    t.deepStrictEqual(recovery('export { export !', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'export',
                start: 8,
                end: 15,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: null,
              start: 8,
              end: 15,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['export'],
          boundNames: ['export'],
          start: 0,
          end: 15,

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
              start: 17,
              end: 17,

              flags: 2,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 15,
            end: 17,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 15,
          end: 17,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export { export !',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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

  it('export (a (/  function foo bar !', () => {
    t.deepStrictEqual(recovery('export (a (/  function foo bar !', 'recovery.js', { module: true, cst: true }), {
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
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 8,
                end: 9,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              arguments: [
                {
                  type: 'RegularExpressionLiteral',
                  pattern: '  function foo bar ',
                  flag: '',
                  start: 11,
                  end: 32,

                  flags: 0,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                }
              ],
              start: 8,
              end: 32,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 6,
            end: 32,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 6,
          end: 32,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export (a (/  function foo bar !',
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
          length: 1
        },
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 11,
          length: 21
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 32,
      type: 'RootNode',
      webCompat: true,
      end: 32
    });
  });

  it('export export export 3x import import 2x Yeah!', () => {
    t.deepStrictEqual(
      recovery('export export export 3x import import 2x Yeah!', 'recovery.js', { module: true, cst: true }),
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
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            exportFromClause: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
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
              type: 'NumericLiteral',
              value: 3,
              start: 20,
              end: 22,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 20,
            end: 22,

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
              name: 'x',
              start: 22,
              end: 23,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 22,
            end: 23,

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
            start: 23,
            end: 30,

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
            start: 30,
            end: 37,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',
              value: 2,
              start: 37,
              end: 39,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 37,
            end: 39,

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
              name: 'x',
              start: 39,
              end: 40,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 39,
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
              name: 'Yeah',
              start: 40,
              end: 45,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            start: 40,
            end: 45,

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
                start: 46,
                end: 46,

                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 45,
              end: 46,

              flags: 0,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            },
            start: 45,
            end: 46,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          }
        ],
        text: 'export export export 3x import import 2x Yeah!',
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
            message: 'Export declaration expected',
            code: 30,
            start: 14,
            length: 6
          },
          {
            kind: 2,
            source: 0,
            message: 'An identifier or keyword cannot immediately follow a numeric literal',
            code: 58,
            start: 22,
            length: 0
          },
          {
            kind: 2,
            source: 2,
            message: 'Export declaration expected',
            code: 30,
            start: 21,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 22,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 24,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: 'Unexpected token - `import`',
            code: 6,
            start: 31,
            length: 6
          },
          {
            kind: 2,
            source: 0,
            message: 'An identifier or keyword cannot immediately follow a numeric literal',
            code: 58,
            start: 39,
            length: 0
          },
          {
            kind: 2,
            source: 2,
            message: 'Unexpected token - `number`',
            code: 6,
            start: 38,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 39,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 41,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 45,
            length: 1
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 46,
        type: 'RootNode',
        webCompat: true,
        end: 46
      }
    );
  });

  it('export {,,,,,,,,,,', () => {
    t.deepStrictEqual(recovery('export {,,,,,,,,,,', 'recovery.js', { module: true, cst: true }), {
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
          end: 8,

          flags: 0,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export {,,,,,,,,,,',
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
          message: 'Statement expected',
          code: 8,
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
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 18,
      type: 'RootNode',
      webCompat: true,
      end: 18
    });
  });

  it('export {a,,b,,,,,c,', () => {
    t.deepStrictEqual(recovery('export {a,,b,,,,,c,', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
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
              binding: null,
              start: 8,
              end: 9,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['a'],
          boundNames: ['a'],
          start: 0,
          end: 10,

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
                start: 11,
                end: 12,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
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
              {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,

                flags: 2,
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
                name: 'c',
                start: 17,
                end: 18,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 19,
                end: 19,

                flags: 2,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 11,
            end: 19,
            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 11,
          end: 19,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export {a,,b,,,,,c,',
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
          message: 'Expression expected',
          code: 7,
          start: 13,
          length: 1
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
      type: 'RootNode',
      webCompat: true,
      end: 19
    });
  });

  it('export {a,,b,,,,,c from "string"', () => {
    t.deepStrictEqual(recovery('export {a,,b,,,,,c from "string"', 'recovery.js', { module: true, cst: true }), {
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
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
              binding: null,
              start: 8,
              end: 9,

              flags: 0,
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: null,
          exportedNames: ['a'],
          boundNames: ['a'],
          start: 0,
          end: 10,

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
                start: 11,
                end: 12,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              {
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
              {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,

                flags: 2,
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
                name: 'c',
                start: 17,
                end: 18,

                flags: 0,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 11,
            end: 18,
            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 11,
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
            type: 'IdentifierReference',
            name: 'from',
            start: 18,
            end: 23,

            flags: 0,
            meta: {
              asi: false,
              newlineBeforeNextToken: false
            }
          },
          start: 18,
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
            type: 'StringLiteral',
            value: 'string',
            start: 23,
            end: 32,

            flags: 0,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 23,
          end: 32,

          flags: 0,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      text: 'export {a,,b,,,,,c from "string"',
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
          message: 'Expression expected',
          code: 7,
          start: 13,
          length: 1
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
          message: '`;` expected',
          code: 92,
          start: 19,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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
      type: 'RootNode',
      webCompat: true,
      end: 32
    });
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
});
