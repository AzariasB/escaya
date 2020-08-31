import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Export', () => {
  it('export function *await(', () => {
    t.deepEqual(recovery('export function *await(', 'recovery.js', { module: true }), {
      kind: 209,
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
              start: 23,
              end: 23,
              kind: 184,
              flags: 0
            },
            start: 6,
            end: 23,
            kind: 186,
            flags: 0
          },
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 23,
          kind: 223,
          flags: 0
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
      end: 23
    });
  });

  it('export { default as', () => {
    t.deepEqual(recovery('export { default as', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'default',
                start: 8,
                end: 16,
                kind: 13,
                flags: 0
              },
              binding: {
                type: 'IdentifierName',
                name: '',
                start: 19,
                end: 19,
                kind: 13,
                flags: 0
              },
              start: 8,
              end: 19,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['default'],
          start: 0,
          end: 19,
          kind: 223,
          flags: 0
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
      end: 19
    });
  });

  it('export { default as !!', () => {
    t.deepEqual(recovery('export { default as !!', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'default',
                start: 8,
                end: 16,
                kind: 13,
                flags: 0
              },
              binding: {
                type: 'IdentifierName',
                name: '',
                start: 21,
                end: 21,
                kind: 13,
                flags: 0
              },
              start: 8,
              end: 21,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['default'],
          start: 0,
          end: 21,
          kind: 223,
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
              start: 22,
              end: 22,
              kind: 13,
              flags: 2
            },
            start: 21,
            end: 22,
            kind: 160,
            flags: 0
          },
          start: 21,
          end: 22,
          kind: 122,
          flags: 0
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
      end: 22
    });
  });

  it('export var y = 0;', () => {
    t.deepEqual(recovery('export var y = 0;', 'recovery.js', { module: true }), {
      kind: 209,
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
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 14,
                  end: 16,
                  kind: 10,
                  flags: 0
                },
                start: 10,
                end: 16,
                kind: 144,
                flags: 0
              }
            ],
            start: 6,
            end: 17,
            kind: 143,
            flags: 0
          },
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 17,
          kind: 223,
          flags: 0
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
      end: 17
    });
  });

  it('export { arguments } from "m.js";', () => {
    t.deepEqual(recovery('export { arguments } from "m.js";', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'arguments',
                start: 8,
                end: 18,
                kind: 13,
                flags: 0
              },
              binding: null,
              start: 8,
              end: 18,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'm.js',
            start: 25,
            end: 32,
            kind: 12,
            flags: 0
          },
          exportedNames: ['arguments'],
          boundNames: ['arguments'],
          start: 0,
          end: 32,
          kind: 223,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 32,
          end: 33,
          kind: 148,
          flags: 0
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
      end: 33
    });
  });

  it('export { a as b } from "m.js";', () => {
    t.deepEqual(recovery('export { a as b } from "m.js";', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 8,
                end: 10,
                kind: 13,
                flags: 0
              },
              binding: {
                type: 'IdentifierName',
                name: 'b',
                start: 13,
                end: 15,
                kind: 13,
                flags: 0
              },
              start: 8,
              end: 15,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'm.js',
            start: 22,
            end: 29,
            kind: 12,
            flags: 0
          },
          exportedNames: ['b'],
          boundNames: ['a'],
          start: 0,
          end: 29,
          kind: 223,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 29,
          end: 30,
          kind: 148,
          flags: 0
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
      end: 30
    });
  });

  it('var a; export { a as b, a as c };', () => {
    t.deepEqual(recovery('var a; export { a as b, a as c };', 'recovery.js', { module: true }), {
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
              initializer: null,
              start: 3,
              end: 5,
              kind: 144,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 143,
          flags: 0
        },
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 15,
                end: 17,
                kind: 13,
                flags: 0
              },
              binding: {
                type: 'IdentifierName',
                name: 'b',
                start: 20,
                end: 22,
                kind: 13,
                flags: 0
              },
              start: 15,
              end: 22,
              kind: 225,
              flags: 0
            },
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 23,
                end: 25,
                kind: 13,
                flags: 0
              },
              binding: {
                type: 'IdentifierName',
                name: 'c',
                start: 28,
                end: 30,
                kind: 13,
                flags: 0
              },
              start: 23,
              end: 30,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['b', 'c'],
          boundNames: ['a', 'a'],
          start: 6,
          end: 32,
          kind: 223,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 32,
          end: 33,
          kind: 148,
          flags: 0
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
      end: 33
    });
  });

  it('class c { }; export default c', () => {
    t.deepEqual(recovery('class c { }; export default c', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'c',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 11,
          kind: 150,
          flags: 0
        },
        {
          type: 'EmptyStatement',
          start: 11,
          end: 12,
          kind: 148,
          flags: 0
        },
        {
          type: 'ExportDefault',
          declaration: {
            type: 'IdentifierReference',
            name: 'c',
            start: 27,
            end: 29,
            kind: 13,
            flags: 0
          },
          start: 12,
          end: 29,
          kind: 224,
          flags: 0
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
      end: 29
    });
  });

  it('export let x = y, [...z] = y;', () => {
    t.deepEqual(recovery('export let x = y, [...z] = y;', 'recovery.js', { module: true }), {
      kind: 209,
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
                  kind: 168,
                  flags: 0
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 14,
                  end: 16,
                  kind: 13,
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
                  type: 'ArrayBindingPattern',
                  elements: [
                    {
                      type: 'BindingRestElement',
                      argument: {
                        type: 'BindingIdentifier',
                        name: 'z',
                        start: 22,
                        end: 23,
                        kind: 168,
                        flags: 0
                      },
                      start: 19,
                      end: 23,
                      kind: 175,
                      flags: 0
                    }
                  ],
                  start: 17,
                  end: 24,
                  kind: 174,
                  flags: 0
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'y',
                  start: 26,
                  end: 28,
                  kind: 13,
                  flags: 0
                },
                start: 17,
                end: 28,
                kind: 146,
                flags: 0
              }
            ],
            start: 6,
            end: 29,
            kind: 145,
            flags: 0
          },
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 29,
          kind: 223,
          flags: 0
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
      end: 29
    });
  });

  it('export default () => {}', () => {
    t.deepEqual(recovery('export default () => {}', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDefault',
          declaration: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 20,
              end: 23,
              kind: 184,
              flags: 0
            },
            async: false,
            start: 14,
            end: 23,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 23,
          kind: 224,
          flags: 0
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
      end: 23
    });
  });

  it('export import from "foo"', () => {
    t.deepEqual(recovery('export import from "foo"', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 6,
          kind: 223,
          flags: 0
        },
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 18,
            end: 24,
            kind: 12,
            flags: 0
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'from',
              start: 13,
              end: 18,
              kind: 168,
              flags: 0
            },
            nameSpaceImport: null,
            namedImports: null,
            start: 13,
            end: 18,
            kind: 218,
            flags: 0
          },
          start: 6,
          end: 24,
          kind: 217,
          flags: 0
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
      end: 24
    });
  });
  it('export {!', () => {
    t.deepEqual(recovery('export {!', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 8,
          kind: 223,
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
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 9,
            kind: 160,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
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
      end: 9
    });
  });
  it('export function !', () => {
    t.deepEqual(recovery('export function !', 'recovery.js', { module: true }), {
      kind: 209,
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
              start: 15,
              end: 15,
              kind: 184,
              flags: 0
            },
            start: 6,
            end: 15,
            kind: 186,
            flags: 0
          },
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 15,
          kind: 223,
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
              start: 17,
              end: 17,
              kind: 13,
              flags: 2
            },
            start: 15,
            end: 17,
            kind: 160,
            flags: 0
          },
          start: 15,
          end: 17,
          kind: 122,
          flags: 0
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
      end: 17
    });
  });
  it('export *', () => {
    t.deepEqual(recovery('export *', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'export',
            start: 8,
            end: 8,
            kind: 12,
            flags: 0
          },
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 8,
          kind: 223,
          flags: 0
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
      end: 8
    });
  });

  it('export { as', () => {
    t.deepEqual(recovery('export { as', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'as',
                start: 8,
                end: 11,
                kind: 13,
                flags: 0
              },
              binding: null,
              start: 8,
              end: 11,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['as'],
          boundNames: ['as'],
          start: 0,
          end: 11,
          kind: 223,
          flags: 0
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
      end: 11
    });
  });

  it('export class function let const var async async function default', () => {
    t.deepEqual(
      recovery('export class function let const var async async function default', 'recovery.js', { module: true }),
      {
        kind: 209,
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
              kind: 150,
              flags: 0
            },
            namedExports: [],
            namedBinding: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 0,
            end: 12,
            kind: 223,
            flags: 0
          },
          {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'let',
              start: 21,
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
              start: 25,
              end: 25,
              kind: 184,
              flags: 0
            },
            start: 12,
            end: 25,
            kind: 186,
            flags: 0
          },
          {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [],
            start: 25,
            end: 31,
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
                  name: 'async',
                  start: 35,
                  end: 41,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 35,
                end: 41,
                kind: 144,
                flags: 0
              },
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'async',
                  start: 41,
                  end: 47,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 41,
                end: 47,
                kind: 144,
                flags: 0
              }
            ],
            start: 31,
            end: 47,
            kind: 143,
            flags: 0
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
              kind: 184,
              flags: 0
            },
            start: 47,
            end: 56,
            kind: 186,
            flags: 0
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
        end: 64
      }
    );
  });

  it('export const {', () => {
    t.deepEqual(recovery('export const {', 'recovery.js', { module: true }), {
      kind: 209,
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
                  kind: 169,
                  flags: 0
                },
                initializer: null,
                start: 12,
                end: 14,
                kind: 146,
                flags: 0
              }
            ],
            start: 6,
            end: 14,
            kind: 145,
            flags: 0
          },
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 14,
          kind: 223,
          flags: 0
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
      end: 14
    });
  });

  it('export +', () => {
    t.deepEqual(recovery('export +', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 6,
          kind: 223,
          flags: 0
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
              kind: 13,
              flags: 2
            },
            start: 6,
            end: 8,
            kind: 160,
            flags: 0
          },
          start: 6,
          end: 8,
          kind: 122,
          flags: 0
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
      end: 8
    });
  });

  it('export { export !', () => {
    t.deepEqual(recovery('export { export !', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'export',
                start: 8,
                end: 15,
                kind: 13,
                flags: 0
              },
              binding: null,
              start: 8,
              end: 15,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['export'],
          boundNames: ['export'],
          start: 0,
          end: 15,
          kind: 223,
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
              start: 17,
              end: 17,
              kind: 13,
              flags: 2
            },
            start: 15,
            end: 17,
            kind: 160,
            flags: 0
          },
          start: 15,
          end: 17,
          kind: 122,
          flags: 0
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
      end: 17
    });
  });

  it('export (a (/  function foo bar !', () => {
    t.deepEqual(recovery('export (a (/  function foo bar !', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 6,
          kind: 223,
          flags: 0
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
                kind: 13,
                flags: 0
              },
              arguments: [
                {
                  type: 'RegularExpressionLiteral',
                  pattern: '  function foo bar ',
                  flag: '',
                  start: 11,
                  end: 32,
                  kind: 15,
                  flags: 0
                }
              ],
              start: 8,
              end: 32,
              kind: 156,
              flags: 0
            },
            start: 6,
            end: 32,
            kind: 189,
            flags: 0
          },
          start: 6,
          end: 32,
          kind: 122,
          flags: 0
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
      end: 32
    });
  });

  it('export export export 3x import import 2x Yeah!', () => {
    t.deepEqual(recovery('export export export 3x import import 2x Yeah!', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 6,
          kind: 223,
          flags: 0
        },
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 6,
          end: 13,
          kind: 223,
          flags: 0
        },
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 13,
          end: 20,
          kind: 223,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 3,
            start: 20,
            end: 22,
            kind: 10,
            flags: 0
          },
          start: 20,
          end: 22,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 22,
            end: 23,
            kind: 13,
            flags: 0
          },
          start: 22,
          end: 23,
          kind: 122,
          flags: 0
        },
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 23,
          end: 30,
          kind: 217,
          flags: 0
        },
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 30,
          end: 37,
          kind: 217,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 2,
            start: 37,
            end: 39,
            kind: 10,
            flags: 0
          },
          start: 37,
          end: 39,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 39,
            end: 40,
            kind: 13,
            flags: 0
          },
          start: 39,
          end: 40,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'Yeah',
            start: 40,
            end: 45,
            kind: 13,
            flags: 0
          },
          start: 40,
          end: 45,
          kind: 122,
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
              start: 46,
              end: 46,
              kind: 13,
              flags: 2
            },
            start: 45,
            end: 46,
            kind: 160,
            flags: 0
          },
          start: 45,
          end: 46,
          kind: 122,
          flags: 0
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
      end: 46
    });
  });

  it('export {,,,,,,,,,,', () => {
    t.deepEqual(recovery('export {,,,,,,,,,,', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          namedBinding: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 8,
          kind: 223,
          flags: 0
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
      end: 18
    });
  });

  it('export {a,,b,,,,,c,', () => {
    t.deepEqual(recovery('export {a,,b,,,,,c,', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 8,
                end: 9,
                kind: 13,
                flags: 0
              },
              binding: null,
              start: 8,
              end: 9,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['a'],
          boundNames: ['a'],
          start: 0,
          end: 10,
          kind: 223,
          flags: 0
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
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 13,
                end: 13,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 15,
                end: 15,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: 'c',
                start: 17,
                end: 18,
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 19,
                end: 19,
                kind: 13,
                flags: 2
              }
            ],
            start: 11,
            end: 19,
            kind: 147,
            flags: 0
          },
          start: 11,
          end: 19,
          kind: 122,
          flags: 0
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
      end: 19
    });
  });

  it('export {a,,b,,,,,c from "string"', () => {
    t.deepEqual(recovery('export {a,,b,,,,,c from "string"', 'recovery.js', { module: true }), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 8,
                end: 9,
                kind: 13,
                flags: 0
              },
              binding: null,
              start: 8,
              end: 9,
              kind: 225,
              flags: 0
            }
          ],
          namedBinding: null,
          fromClause: null,
          exportedNames: ['a'],
          boundNames: ['a'],
          start: 0,
          end: 10,
          kind: 223,
          flags: 0
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
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 13,
                end: 13,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 14,
                end: 14,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 15,
                end: 15,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 16,
                end: 16,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: 'c',
                start: 17,
                end: 18,
                kind: 13,
                flags: 0
              }
            ],
            start: 11,
            end: 18,
            kind: 147,
            flags: 0
          },
          start: 11,
          end: 18,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'from',
            start: 18,
            end: 23,
            kind: 13,
            flags: 0
          },
          start: 18,
          end: 23,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'string',
            start: 23,
            end: 32,
            kind: 12,
            flags: 0
          },
          start: 23,
          end: 32,
          kind: 122,
          flags: 0
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
      end: 32
    });
  });

  it('possible to export import ? ! while I try this, I go for a walk', () => {
    t.deepEqual(
      recovery('possible to export import ? ! while I try this, I go for a walk', 'recovery.js', { module: true }),
      {
        kind: 209,
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'possible',
              start: 0,
              end: 8,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'to',
              start: 8,
              end: 11,
              kind: 13,
              flags: 0
            },
            start: 8,
            end: 11,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExportDeclaration',
            declaration: null,
            namedExports: [],
            namedBinding: null,
            fromClause: null,
            exportedNames: [],
            boundNames: [],
            start: 11,
            end: 18,
            kind: 223,
            flags: 0
          },
          {
            type: 'ImportDeclaration',
            fromClause: null,
            moduleSpecifier: null,
            importClause: null,
            start: 18,
            end: 25,
            kind: 217,
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
                start: 29,
                end: 29,
                kind: 13,
                flags: 2
              },
              start: 27,
              end: 29,
              kind: 160,
              flags: 0
            },
            start: 27,
            end: 29,
            kind: 122,
            flags: 0
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'I',
              start: 35,
              end: 37,
              kind: 13,
              flags: 0
            },
            statement: {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 41,
                end: 41,
                kind: 123,
                flags: 0
              },
              catchClause: null,
              finalizer: null,
              start: 37,
              end: 41,
              kind: 138,
              flags: 0
            },
            start: 29,
            end: 41,
            kind: 139,
            flags: 0
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
                  kind: 165,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'I',
                  start: 47,
                  end: 49,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 41,
              end: 49,
              kind: 147,
              flags: 0
            },
            start: 41,
            end: 49,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'go',
              start: 49,
              end: 52,
              kind: 13,
              flags: 0
            },
            start: 49,
            end: 52,
            kind: 122,
            flags: 0
          },
          {
            type: 'ForStatement',
            initializer: {
              type: 'IdentifierReference',
              name: 'a',
              start: 56,
              end: 58,
              kind: 13,
              flags: 0
            },
            condition: {
              type: 'IdentifierReference',
              name: '',
              start: 63,
              end: 63,
              kind: 13,
              flags: 2
            },
            incrementor: {
              type: 'IdentifierReference',
              name: 'walk',
              start: 58,
              end: 63,
              kind: 13,
              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 63,
                end: 63,
                kind: 13,
                flags: 2
              },
              start: 63,
              end: 63,
              kind: 122,
              flags: 0
            },
            start: 52,
            end: 63,
            kind: 132,
            flags: 0
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
        end: 63
      }
    );
  });
});
