import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Class', () => {
  it('class a { ;;; };', () => {
    t.deepEqual(recovery('class a { ;;; }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [
            {
              type: 'Semicolon',
              start: 9,
              end: 11,
              kind: 28,
              flags: 0
            },
            {
              type: 'Semicolon',
              start: 11,
              end: 12,
              kind: 28,
              flags: 0
            },
            {
              type: 'Semicolon',
              start: 12,
              end: 13,
              kind: 28,
              flags: 0
            }
          ],
          start: 0,
          end: 15,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class a { ;;; }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('class  { static prototype', () => {
    t.deepEqual(recovery('class  { static prototype', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'prototype',
                  start: 15,
                  end: 25,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 25,
                  end: 25,
                  kind: 184,
                  flags: 0
                },
                start: 25,
                end: 25,
                kind: 182,
                flags: 0
              },
              start: 15,
              end: 25,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 25,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 25,
        end: 25
      },
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('class { async get(x', () => {
    t.deepEqual(recovery('class { async get(x', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 18,
                    end: 19,
                    kind: 168,
                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 13,
                  end: 17,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 19,
                  end: 19,
                  kind: 184,
                  flags: 0
                },
                start: 17,
                end: 19,
                kind: 182,
                flags: 0
              },
              start: 7,
              end: 19,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 19,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 19,
        end: 19
      },
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('class class class (class)', () => {
    t.deepEqual(recovery('class class class (class)', 'recovery.js'), {
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
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 5,
          end: 11,
          kind: 150,
          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 11,
          end: 17,
          kind: 150,
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
              kind: 149,
              flags: 0
            },
            start: 17,
            end: 25,
            kind: 189,
            flags: 0
          },
          start: 17,
          end: 25,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 25,
        end: 25
      },
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('class { class', () => {
    t.deepEqual(recovery('class { class', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'class',
                  start: 7,
                  end: 13,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 13,
                  end: 13,
                  kind: 184,
                  flags: 0
                },
                start: 13,
                end: 13,
                kind: 182,
                flags: 0
              },
              start: 7,
              end: 13,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 13,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 13,
        end: 13
      },
      start: 0,
      length: 13,
      end: 13
    });
  });

  it('class function async yield await class', () => {
    t.deepEqual(recovery('class function async yield await class', 'recovery.js'), {
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
        },
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
          async: false,
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
          start: 5,
          end: 20,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'yield',
            start: 20,
            end: 26,
            kind: 13,
            flags: 0
          },
          start: 20,
          end: 26,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'await',
            start: 26,
            end: 32,
            kind: 13,
            flags: 0
          },
          start: 26,
          end: 32,
          kind: 122,
          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 32,
          end: 38,
          kind: 150,
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
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
          start: 33,
          length: 5
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 38,
        end: 38
      },
      start: 0,
      length: 38,
      end: 38
    });
  });

  it('[class}!', () => {
    t.deepEqual(recovery('[class}!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [
              {
                type: 'ClassExpression',
                name: null,
                heritage: null,
                elements: [],
                start: 1,
                end: 6,
                kind: 149,
                flags: 0
              }
            ],
            start: 0,
            end: 6,
            flags: 0
          },
          start: 0,
          end: 6,
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
              start: 8,
              end: 8,
              kind: 13,
              flags: 2
            },
            start: 7,
            end: 8,
            kind: 160,
            flags: 0
          },
          start: 7,
          end: 8,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('!class!!', () => {
    t.deepEqual(recovery('!class!!', 'recovery.js'), {
      kind: 209,
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
              kind: 149,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
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
                kind: 13,
                flags: 2
              },
              start: 7,
              end: 8,
              kind: 160,
              flags: 0
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('class x { async get constructor ', () => {
    t.deepEqual(recovery('class x { async get constructor ', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 5,
            end: 7,
            kind: 168,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 15,
                  end: 19,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 19,
                  end: 19,
                  kind: 184,
                  flags: 0
                },
                start: 19,
                end: 19,
                kind: 182,
                flags: 0
              },
              start: 9,
              end: 19,
              kind: 151,
              flags: 0
            },
            {
              type: 'ClassElement',
              static: false,
              method: {
                type: 'MethodDefinition',
                async: false,
                generator: false,
                propertySetParameterList: [],
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
                  leafs: [],
                  start: 31,
                  end: 31,
                  kind: 184,
                  flags: 0
                },
                start: 31,
                end: 31,
                kind: 182,
                flags: 0
              },
              start: 19,
              end: 31,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 31,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class x { async get constructor ',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 31,
          length: 1
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 32,
        end: 32
      },
      start: 0,
      length: 32,
      end: 32
    });
  });

  it('class z y(){} x() {{', () => {
    t.deepEqual(recovery('class z y(){} x() {{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'z',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 7,
          kind: 150,
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
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 7,
            end: 11,
            kind: 156,
            flags: 0
          },
          start: 7,
          end: 11,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 11,
          end: 13,
          kind: 123,
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
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 13,
            end: 17,
            kind: 156,
            flags: 0
          },
          start: 13,
          end: 17,
          kind: 122,
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
              kind: 123,
              flags: 0
            }
          ],
          start: 17,
          end: 20,
          kind: 123,
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
          message: '`}` expected',
          code: 5,
          start: 19,
          length: 1
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 20,
        end: 20
      },
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('Unclosed block statement324', () => {
    t.deepEqual(recovery('class {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 7,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('Unclosed block statement432577', () => {
    t.deepEqual(recovery('{class', 'recovery.js'), {
      kind: 209,
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
              kind: 150,
              flags: 0
            }
          ],
          start: 0,
          end: 6,
          kind: 123,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('Unclosed block statement5482390', () => {
    t.deepEqual(recovery('if(class) {', 'recovery.js'), {
      kind: 209,
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
            kind: 149,
            flags: 0
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 11,
            kind: 123,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 11,
          kind: 133,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('Unclosed block statement33', () => {
    t.deepEqual(recovery('class(class{', 'recovery.js'), {
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
              kind: 149,
              flags: 0
            },
            start: 5,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 5,
          end: 12,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 12,
        end: 12
      },
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('Unclosed block statement3214', () => {
    t.deepEqual(recovery('class a {class', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'class',
                  start: 9,
                  end: 14,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 14,
                  end: 14,
                  kind: 184,
                  flags: 0
                },
                start: 14,
                end: 14,
                kind: 182,
                flags: 0
              },
              start: 9,
              end: 14,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 14,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 14,
        end: 14
      },
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('Unclosed block statement4523', () => {
    t.deepEqual(recovery('class a { a() {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 9,
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
              },
              start: 9,
              end: 16,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 16,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 16,
        end: 16
      },
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('Unclosed block statement425', () => {
    t.deepEqual(recovery('class [}', 'recovery.js'), {
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [],
            flags: 0,
            start: 5,
            end: 7
          },
          start: 5,
          end: 7,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('Unclosed block statement879', () => {
    t.deepEqual(recovery('class { async get () {}}', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'get',
                  start: 13,
                  end: 17,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 20,
                  end: 23,
                  kind: 184,
                  flags: 0
                },
                start: 17,
                end: 23,
                kind: 182,
                flags: 0
              },
              start: 7,
              end: 23,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 24,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 24,
        end: 24
      },
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('Unclosed block statement435', () => {
    t.deepEqual(recovery('class{ static x', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 13,
                  end: 15,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 15,
                  end: 15,
                  kind: 184,
                  flags: 0
                },
                start: 15,
                end: 15,
                kind: 182,
                flags: 0
              },
              start: 13,
              end: 15,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 15,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('class while { constructor x', () => {
    t.deepEqual(recovery('class while { constructor x', 'recovery.js'), {
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
                kind: 13,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 25,
                end: 27,
                kind: 13,
                flags: 0
              }
            ],
            start: 11,
            end: 27,
            kind: 179,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 27,
              end: 27,
              kind: 13,
              flags: 2
            },
            start: 27,
            end: 27,
            kind: 122,
            flags: 0
          },
          start: 5,
          end: 27,
          kind: 139,
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
          message: '`:` expected',
          code: 5,
          start: 26,
          length: 1
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 27,
        end: 27
      },
      start: 0,
      length: 27,
      end: 27
    });
  });

  it('Unclosed block statement908', () => {
    t.deepEqual(recovery('class { constructor x', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'x',
                  start: 19,
                  end: 21,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 21,
                  end: 21,
                  kind: 184,
                  flags: 0
                },
                start: 21,
                end: 21,
                kind: 182,
                flags: 0
              },
              start: 7,
              end: 21,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 21,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 21,
        end: 21
      },
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('Unclosed block statement567', () => {
    t.deepEqual(recovery('class extends {', 'recovery.js'), {
      kind: 209,
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
            kind: 179,
            flags: 0
          },
          elements: [],
          start: 0,
          end: 15,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('Unterminated regexp after class', () => {
    t.deepEqual(recovery('class /a', 'recovery.js'), {
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
      endOfFileToken: {
        end: 8,
        kind: 16384,
        start: 8,
        type: 'bilat'
      },
      fileName: 'recovery.js',
      hasBeenIncrementallyParsed: false,
      intersectsChange: false,
      kind: 209,
      length: 8,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          elements: [],
          end: 5,
          flags: 0,
          kind: 150,
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
            kind: 15,
            pattern: '',
            start: 5,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,
          kind: 122,
          start: 5,
          type: 'ExpressionStatement'
        }
      ],
      text: 'class /a'
    });
  });

  it('Unterminated regexp in parenthesis after class', () => {
    t.deepEqual(recovery('class a (/a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 7,
          kind: 150,
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
              kind: 15,
              flags: 0
            },
            start: 7,
            end: 11,
            kind: 189,
            flags: 0
          },
          start: 7,
          end: 11,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('Unterminated regexp in parenthesis after class element', () => {
    t.deepEqual(recovery('class a {/a', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'a',
            start: 5,
            end: 7,
            kind: 168,
            flags: 0
          },
          heritage: null,
          elements: [],
          start: 0,
          end: 9,
          kind: 150,
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
            kind: 15,
            flags: 0
          },
          start: 9,
          end: 11,
          kind: 122,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('class extends { class', () => {
    t.deepEqual(recovery('class extends { class', 'recovery.js'), {
      kind: 209,
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
                kind: 13,
                flags: 0
              }
            ],
            start: 13,
            end: 21,
            kind: 179,
            flags: 0
          },
          elements: [],
          start: 0,
          end: 21,
          kind: 150,
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
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 16,
          length: 5
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 21,
        end: 21
      },
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('Unclosed block statement78', () => {
    t.deepEqual(recovery('class extends class', 'recovery.js'), {
      kind: 209,
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
            kind: 149,
            flags: 0
          },
          elements: [],
          start: 0,
          end: 19,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 19,
        end: 19
      },
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('Unclosed block statement3', () => {
    t.deepEqual(recovery('class { a() {{', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 7,
                  end: 9,
                  kind: 13,
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
                      kind: 123,
                      flags: 0
                    }
                  ],
                  start: 11,
                  end: 14,
                  kind: 184,
                  flags: 0
                },
                start: 9,
                end: 14,
                kind: 182,
                flags: 0
              },
              start: 7,
              end: 14,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 14,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 14,
        end: 14
      },
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('class{set(x,...', () => {
    t.deepEqual(recovery('class{set(x,...', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 10,
                    end: 11,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 15,
                      end: 15,
                      kind: 168,
                      flags: 0
                    },
                    start: 12,
                    end: 15,
                    kind: 175,
                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'set',
                  start: 6,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 15,
                  end: 15,
                  kind: 184,
                  flags: 0
                },
                start: 9,
                end: 15,
                kind: 182,
                flags: 0
              },
              start: 6,
              end: 15,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 15,
          kind: 150,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('class{foo(....a) class', () => {
    t.deepEqual(recovery('class{foo(....a) class', 'recovery.js'), {
      kind: 209,
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
                propertySetParameterList: [],
                uniqueFormalParameters: [
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 13,
                      end: 14,
                      kind: 168,
                      flags: 0
                    },
                    start: 10,
                    end: 14,
                    kind: 175,
                    flags: 0
                  }
                ],
                name: {
                  type: 'IdentifierName',
                  name: 'foo',
                  start: 6,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 14,
                  end: 14,
                  kind: 184,
                  flags: 0
                },
                start: 9,
                end: 14,
                kind: 182,
                flags: 0
              },
              start: 6,
              end: 14,
              kind: 151,
              flags: 0
            },
            {
              type: 'ClassElement',
              static: false,
              method: {
                type: 'MethodDefinition',
                async: false,
                generator: false,
                propertySetParameterList: [],
                uniqueFormalParameters: [],
                name: {
                  type: 'IdentifierName',
                  name: 'a',
                  start: 14,
                  end: 15,
                  kind: 13,
                  flags: 0
                },
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 15,
                  end: 15,
                  kind: 184,
                  flags: 0
                },
                start: 15,
                end: 15,
                kind: 182,
                flags: 0
              },
              start: 14,
              end: 15,
              kind: 151,
              flags: 0
            }
          ],
          start: 0,
          end: 15,
          kind: 150,
          flags: 0
        },
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 16,
          end: 22,
          kind: 150,
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
          message: '`)` expected',
          code: 5,
          start: 14,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
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
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 22,
        end: 22
      },
      start: 0,
      length: 22,
      end: 22
    });
  });
});
