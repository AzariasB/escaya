import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - If', () => {
  it('if else (', () => {
    t.deepEqual(recovery('if else (', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            arguments: [],
            start: 2,
            end: 9,
            kind: 156,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 9,
            end: 9,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 9,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if else (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 9,
        end: 9
      },
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('if async function else babel (', () => {
    t.deepEqual(recovery('if async function else babel (', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'FunctionExpression',
            name: null,
            generator: false,
            async: true,
            params: [],
            contents: {
              type: 'FunctionBody',
              directives: [],
              leafs: [],
              start: 17,
              end: 17,
              kind: 184,
              flags: 0
            },
            start: 2,
            end: 17,
            kind: 185,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 22,
              end: 22,
              kind: 13,
              flags: 2
            },
            start: 17,
            end: 22,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 22,
          kind: 133,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'babel',
              start: 22,
              end: 28,
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 22,
            end: 30,
            kind: 156,
            flags: 0
          },
          start: 22,
          end: 30,
          kind: 122,
          flags: 0
        }
      ],
      text: 'if async function else babel (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 18,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 29,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 30,
        end: 30
      },
      start: 0,
      length: 30,
      end: 30
    });
  });

  it('if (x async function ) (', () => {
    t.deepEqual(recovery('if (x async function ) (', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 4,
            end: 5,
            kind: 13,
            flags: 0
          },
          consequent: {
            type: 'FunctionDeclaration',
            name: null,
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
            start: 11,
            end: 20,
            kind: 186,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 20,
          kind: 133,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 24,
              end: 24,
              kind: 13,
              flags: 2
            },
            start: 22,
            end: 24,
            kind: 189,
            flags: 0
          },
          start: 22,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: 'if (x async function ) (',
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
          length: 5
        },
        {
          kind: 3,
          source: 2,
          message: 'Async functions can only be declared at the top level or inside a block',
          code: 79,
          start: 12,
          length: 8
        },
        {
          kind: 3,
          source: 2,
          message: 'Function declaration require a name in this context',
          code: 10,
          start: 21,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 23,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 24,
        end: 24
      },
      start: 0,
      length: 24,
      end: 24
    });
  });

  it('if if if if async function else if if else (', () => {
    t.deepEqual(recovery('if if if if async function else if if else (', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 2,
            end: 2,
            kind: 13,
            flags: 2
          },
          consequent: {
            type: 'IfStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            consequent: {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              consequent: {
                type: 'IfStatement',
                expression: {
                  type: 'FunctionExpression',
                  name: null,
                  generator: false,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 26,
                    end: 26,
                    kind: 184,
                    flags: 0
                  },
                  start: 11,
                  end: 26,
                  kind: 185,
                  flags: 0
                },
                consequent: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 31,
                    end: 31,
                    kind: 13,
                    flags: 2
                  },
                  start: 26,
                  end: 31,
                  kind: 122,
                  flags: 0
                },
                alternate: null,
                start: 8,
                end: 31,
                kind: 133,
                flags: 0
              },
              alternate: null,
              start: 5,
              end: 31,
              kind: 133,
              flags: 0
            },
            alternate: null,
            start: 2,
            end: 31,
            kind: 133,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 31,
          kind: 133,
          flags: 0
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 34,
            end: 34,
            kind: 13,
            flags: 2
          },
          consequent: {
            type: 'IfStatement',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 42,
                end: 42,
                kind: 13,
                flags: 2
              },
              arguments: [],
              start: 37,
              end: 44,
              kind: 156,
              flags: 0
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 44,
                end: 44,
                kind: 13,
                flags: 2
              },
              start: 44,
              end: 44,
              kind: 122,
              flags: 0
            },
            alternate: null,
            start: 34,
            end: 44,
            kind: 133,
            flags: 0
          },
          alternate: null,
          start: 31,
          end: 44,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if if if if async function else if if else (',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 9,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 12,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 27,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 32,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 35,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 38,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 43,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 44,
        end: 44
      },
      start: 0,
      length: 44,
      end: 44
    });
  });

  it('if', () => {
    t.deepEqual(recovery('if', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 2,
            end: 2,
            flags: 2
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 2,
              end: 2,
              flags: 2
            },
            start: 2,
            end: 2,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 2,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 0,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 2,
        end: 2
      },
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('Unclosed block statement32', () => {
    t.deepEqual(recovery('if(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 3,
            end: 3,
            flags: 2
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 3,
              end: 3,
              flags: 2
            },
            start: 3,
            end: 3,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 3,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 3,
        end: 3
      },
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('Unclosed block statement2435', () => {
    t.deepEqual(recovery('if(x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'x',
            start: 3,
            end: 4,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 4,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 3,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statementdasdf', () => {
    t.deepEqual(recovery('if((((((((', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'ParenthesizedExpression',
                      expression: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'IdentifierReference',
                          kind: 13,
                          name: '',
                          start: 10,
                          end: 10,
                          flags: 2
                        },
                        start: 9,
                        end: 10,
                        kind: 189,
                        flags: 0
                      },
                      start: 8,
                      end: 10,
                      kind: 189,
                      flags: 0
                    },
                    start: 7,
                    end: 10,
                    kind: 189,
                    flags: 0
                  },
                  start: 6,
                  end: 10,
                  kind: 189,
                  flags: 0
                },
                start: 5,
                end: 10,
                kind: 189,
                flags: 0
              },
              start: 4,
              end: 10,
              kind: 189,
              flags: 0
            },
            start: 3,
            end: 10,
            kind: 189,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 10,
              end: 10,
              flags: 2
            },
            start: 10,
            end: 10,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 10,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if((((((((',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 10,
        end: 10
      },
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('Unclosed block statementewrfd', () => {
    t.deepEqual(recovery('if((((xx))))', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: 'xx',
                  start: 6,
                  end: 8,
                  flags: 0
                },
                start: 5,
                end: 9,
                kind: 189,
                flags: 0
              },
              start: 4,
              end: 10,
              kind: 189,
              flags: 0
            },
            start: 3,
            end: 11,
            kind: 189,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 12,
              end: 12,
              flags: 2
            },
            start: 12,
            end: 12,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 12,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if((((xx))))',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 11,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 12,
        end: 12
      },
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('Unclosed block statementdsa3', () => {
    t.deepEqual(recovery('if(((()', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 7,
                end: 7,
                flags: 2
              },
              start: 4,
              end: 7,
              kind: 189,
              flags: 0
            },
            start: 3,
            end: 7,
            kind: 189,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 7,
              end: 7,
              flags: 2
            },
            start: 7,
            end: 7,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 7,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(((()',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 6,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('Unclosed block statement3', () => {
    t.deepEqual(recovery('if((( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ObjectLiteral',
                properties: [],
                start: 5,
                end: 8,
                kind: 179,
                flags: 0
              },
              start: 4,
              end: 8,
              kind: 189,
              flags: 0
            },
            start: 3,
            end: 8,
            kind: 189,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 8,
              end: 8,
              flags: 2
            },
            start: 8,
            end: 8,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 8,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if((( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 7,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('Unclosed block statement3241', () => {
    t.deepEqual(recovery('if(((((({{{{{{{{{{{]}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'ObjectLiteral',
                      properties: [],
                      start: 8,
                      end: 9,
                      kind: 179,
                      flags: 0
                    },
                    start: 7,
                    end: 9,
                    kind: 189,
                    flags: 0
                  },
                  start: 6,
                  end: 9,
                  kind: 189,
                  flags: 0
                },
                start: 5,
                end: 9,
                kind: 189,
                flags: 0
              },
              start: 4,
              end: 9,
              kind: 189,
              flags: 0
            },
            start: 3,
            end: 9,
            kind: 189,
            flags: 0
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'BlockStatement',
                    leafs: [
                      {
                        type: 'BlockStatement',
                        leafs: [
                          {
                            type: 'BlockStatement',
                            leafs: [
                              {
                                type: 'BlockStatement',
                                leafs: [
                                  {
                                    type: 'BlockStatement',
                                    leafs: [
                                      {
                                        type: 'BlockStatement',
                                        leafs: [
                                          {
                                            type: 'BlockStatement',
                                            leafs: [
                                              {
                                                type: 'BlockStatement',
                                                leafs: [],
                                                start: 18,
                                                end: 19,
                                                kind: 123,
                                                flags: 0
                                              }
                                            ],
                                            start: 17,
                                            end: 19,
                                            kind: 123,
                                            flags: 0
                                          }
                                        ],
                                        start: 16,
                                        end: 19,
                                        kind: 123,
                                        flags: 0
                                      }
                                    ],
                                    start: 15,
                                    end: 19,
                                    kind: 123,
                                    flags: 0
                                  }
                                ],
                                start: 14,
                                end: 19,
                                kind: 123,
                                flags: 0
                              }
                            ],
                            start: 13,
                            end: 19,
                            kind: 123,
                            flags: 0
                          }
                        ],
                        start: 12,
                        end: 19,
                        kind: 123,
                        flags: 0
                      }
                    ],
                    start: 11,
                    end: 19,
                    kind: 123,
                    flags: 0
                  }
                ],
                start: 10,
                end: 19,
                kind: 123,
                flags: 0
              }
            ],
            start: 9,
            end: 19,
            kind: 123,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 19,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(((((({{{{{{{{{{{]}',
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
          message: '`}` expected',
          code: 5,
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
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 21,
        end: 21
      },
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('if(x) {', () => {
    t.deepEqual(recovery('if(x) {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 3,
            end: 4,
            kind: 13,
            flags: 0
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [],
            start: 5,
            end: 7,
            kind: 123,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 7,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(x) {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 6,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('if{x}', () => {
    t.deepEqual(recovery('if{x}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 3,
                end: 4,
                kind: 13,
                flags: 0
              }
            ],
            start: 2,
            end: 5,
            kind: 179,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 5,
            end: 5,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 5,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if{x}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statement23', () => {
    t.deepEqual(recovery('{if{}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'IfStatement',
              expression: {
                type: 'ObjectLiteral',
                properties: [],
                start: 3,
                end: 5,
                kind: 179,
                flags: 0
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 5,
                  end: 5,
                  flags: 2
                },
                start: 5,
                end: 5,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 1,
              end: 5,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 5,
          kind: 123,
          flags: 0
        }
      ],
      text: '{if{}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statementer233dsdd', () => {
    t.deepEqual(recovery('if{else', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'else',
                start: 3,
                end: 7,
                kind: 13,
                flags: 0
              }
            ],
            start: 2,
            end: 7,
            kind: 179,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,
              kind: 13,
              flags: 2
            },
            start: 7,
            end: 7,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 7,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if{else',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 3,
          length: 4
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 7,
        end: 7
      },
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('Unclosed block statementew', () => {
    t.deepEqual(recovery('ifx(function{x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'ifx',
              start: 0,
              end: 3,
              flags: 0
            },
            arguments: [
              {
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
                        kind: 13,
                        name: 'x',
                        start: 13,
                        end: 14,
                        flags: 0
                      },
                      start: 13,
                      end: 14,
                      kind: 122,
                      flags: 0
                    }
                  ],
                  start: 12,
                  end: 14,
                  kind: 184,
                  flags: 0
                },
                start: 4,
                end: 14,
                kind: 185,
                flags: 0
              }
            ],
            start: 0,
            end: 14,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'ifx(function{x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          message: '`}` expected',
          code: 5,
          start: 13,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 14,
        end: 14
      },
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('Unclosed block statement324523984', () => {
    t.deepEqual(recovery('if(x){function x( { ', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 3,
            end: 4,
            kind: 13,
            flags: 0
          },
          consequent: {
            type: 'BlockStatement',
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
                async: false,
                params: [
                  {
                    type: 'BindingElement',
                    left: {
                      type: 'ObjectBindingPattern',

                      properties: [],
                      start: 17,
                      end: 19,
                      kind: 169,
                      flags: 0
                    },
                    right: null,
                    start: 17,
                    end: 19,
                    kind: 172,
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
                start: 6,
                end: 19,
                kind: 186,
                flags: 0
              }
            ],
            start: 5,
            end: 19,
            kind: 123,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 19,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(x){function x( { ',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 20,
        end: 20
      },
      start: 0,
      length: 20,
      end: 20
    });
  });

  it('Unclosed block statement333', () => {
    t.deepEqual(recovery('if else function', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 7,
            end: 7,
            flags: 2
          },
          consequent: {
            type: 'FunctionDeclaration',
            name: null,
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
            start: 7,
            end: 16,
            kind: 186,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 16,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if else function',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
          length: 8
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 16,
        end: 16
      },
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('run for my life', () => {
    t.deepEqual(
      recovery('if I try while I run for my life. then if I fall then i may scream while running', 'recovery.js'),
      {
        kind: 209,
        directives: [],
        leafs: [
          {
            type: 'IfStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'I',
              start: 2,
              end: 4,
              flags: 0
            },
            consequent: {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 8,
                end: 8,
                kind: 123,
                flags: 0
              },
              catchClause: null,
              finalizer: null,
              start: 4,
              end: 8,
              kind: 138,
              flags: 0
            },
            alternate: null,
            start: 0,
            end: 8,
            kind: 133,
            flags: 0
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'I',
              start: 14,
              end: 16,
              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: 'run',
                start: 16,
                end: 20,
                flags: 0
              },
              start: 16,
              end: 20,
              kind: 122,
              flags: 0
            },
            start: 8,
            end: 20,
            kind: 139,
            flags: 0
          },
          {
            type: 'ForStatement',
            initializer: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'my',
              start: 24,
              end: 27,
              flags: 0
            },
            condition: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 38,
              end: 38,
              flags: 2
            },
            incrementor: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                kind: 13,
                name: 'life',
                start: 27,
                end: 32,
                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'then',
                start: 33,
                end: 38,
                kind: 13,
                flags: 0
              },
              computed: false,
              start: 27,
              end: 38,
              kind: 154,
              flags: 0
            },
            statement: {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: 'I',
                start: 41,
                end: 43,
                flags: 0
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: 'fall',
                  start: 43,
                  end: 48,
                  flags: 0
                },
                start: 43,
                end: 48,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 38,
              end: 48,
              kind: 133,
              flags: 0
            },
            start: 20,
            end: 48,
            kind: 132,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'then',
              start: 48,
              end: 53,
              flags: 0
            },
            start: 48,
            end: 53,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'i',
              start: 53,
              end: 55,
              flags: 0
            },
            start: 53,
            end: 55,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'may',
              start: 55,
              end: 59,
              flags: 0
            },
            start: 55,
            end: 59,
            kind: 122,
            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'scream',
              start: 59,
              end: 66,
              flags: 0
            },
            start: 59,
            end: 66,
            kind: 122,
            flags: 0
          },
          {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'running',
              start: 72,
              end: 80,
              flags: 0
            },
            statement: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 80,
                end: 80,
                flags: 2
              },
              start: 80,
              end: 80,
              kind: 122,
              flags: 0
            },
            start: 66,
            end: 80,
            kind: 139,
            flags: 0
          }
        ],
        text: 'if I try while I run for my life. then if I fall then i may scream while running',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 3,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 5,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`{` expected',
            code: 5,
            start: 9,
            length: 5
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
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 17,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 25,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 28,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 5,
            start: 39,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 42,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`)` expected',
            code: 5,
            start: 44,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`(` expected',
            code: 5,
            start: 73,
            length: 7
          }
        ],
        detached: false,
        isIncremental: false,
        parent: null,
        children: [],
        EOF: {
          type: 'CST',
          kind: 16384,
          start: 80,
          end: 80
        },
        start: 0,
        length: 80,
        end: 80
      }
    );
  });

  it('Unclosed block statement332', () => {
    t.deepEqual(recovery('{if with missing ! & bracket and { and bullshit and (x) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              consequent: {
                type: 'WithStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'missing',
                  start: 8,
                  end: 16,
                  kind: 13,
                  flags: 0
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'UnaryExpression',
                      operator: '!',
                      operand: {
                        type: 'IdentifierReference',
                        name: '',
                        start: 18,
                        end: 18,
                        kind: 13,
                        flags: 2
                      },
                      start: 16,
                      end: 18,
                      kind: 160,
                      flags: 0
                    },
                    operator: '&',
                    right: {
                      type: 'IdentifierReference',
                      name: 'bracket',
                      start: 20,
                      end: 28,
                      kind: 13,
                      flags: 0
                    },
                    start: 16,
                    end: 28,
                    kind: 155,
                    flags: 0
                  },
                  start: 16,
                  end: 28,
                  kind: 122,
                  flags: 0
                },
                start: 3,
                end: 28,
                kind: 128,
                flags: 0
              },
              alternate: null,
              start: 1,
              end: 28,
              kind: 133,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'and',
                start: 28,
                end: 32,
                kind: 13,
                flags: 0
              },
              start: 28,
              end: 32,
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
                    name: 'and',
                    start: 34,
                    end: 38,
                    kind: 13,
                    flags: 0
                  },
                  start: 34,
                  end: 38,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'bullshit',
                    start: 38,
                    end: 47,
                    kind: 13,
                    flags: 0
                  },
                  start: 38,
                  end: 47,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'and',
                      start: 47,
                      end: 51,
                      kind: 13,
                      flags: 0
                    },
                    arguments: [
                      {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 53,
                        end: 54,
                        kind: 13,
                        flags: 0
                      }
                    ],
                    start: 47,
                    end: 55,
                    kind: 156,
                    flags: 0
                  },
                  start: 47,
                  end: 55,
                  kind: 122,
                  flags: 0
                },
                {
                  type: 'BlockStatement',
                  leafs: [],
                  start: 55,
                  end: 58,
                  kind: 123,
                  flags: 0
                }
              ],
              start: 32,
              end: 58,
              kind: 123,
              flags: 0
            }
          ],
          start: 0,
          end: 58,
          kind: 123,
          flags: 0
        }
      ],
      text: '{if with missing ! & bracket and { and bullshit and (x) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 4,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 9,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 17,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 57,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 58,
        end: 58
      },
      start: 0,
      length: 58,
      end: 58
    });
  });

  it('Unclosed block statement324231', () => {
    t.deepEqual(recovery('if( hello!! while acorn can not do this', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'hello',
            start: 3,
            end: 9,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 11,
                  end: 11,
                  flags: 2
                },
                start: 10,
                end: 11,
                kind: 160,
                flags: 0
              },
              start: 9,
              end: 11,
              kind: 160,
              flags: 0
            },
            start: 9,
            end: 11,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 11,
          kind: 133,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'acorn',
            start: 17,
            end: 23,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'can',
              start: 23,
              end: 27,
              flags: 0
            },
            start: 23,
            end: 27,
            kind: 122,
            flags: 0
          },
          start: 11,
          end: 27,
          kind: 139,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'not',
            start: 27,
            end: 31,
            flags: 0
          },
          start: 27,
          end: 31,
          kind: 122,
          flags: 0
        },
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 39,
            end: 39,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ThisExpression',
              start: 34,
              end: 39,
              kind: 165,
              flags: 0
            },
            start: 34,
            end: 39,
            kind: 122,
            flags: 0
          },
          start: 31,
          end: 39,
          kind: 127,
          flags: 0
        }
      ],
      text: 'if( hello!! while acorn can not do this',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 12,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 18,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 24,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
          code: 5,
          start: 35,
          length: 4
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 39,
        end: 39
      },
      start: 0,
      length: 39,
      end: 39
    });
  });

  it('Unclosed block statement243234', () => {
    t.deepEqual(recovery('{if if if', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 3,
                end: 3,
                flags: 2
              },
              consequent: {
                type: 'IfStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 6,
                  end: 6,
                  flags: 2
                },
                consequent: {
                  type: 'IfStatement',
                  expression: {
                    type: 'IdentifierReference',
                    kind: 13,
                    name: '',
                    start: 9,
                    end: 9,
                    flags: 2
                  },
                  consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'IdentifierReference',
                      kind: 13,
                      name: '',
                      start: 9,
                      end: 9,
                      flags: 2
                    },
                    start: 9,
                    end: 9,
                    kind: 122,
                    flags: 0
                  },
                  alternate: null,
                  start: 6,
                  end: 9,
                  kind: 133,
                  flags: 0
                },
                alternate: null,
                start: 3,
                end: 9,
                kind: 133,
                flags: 0
              },
              alternate: null,
              start: 1,
              end: 9,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 9,
          kind: 123,
          flags: 0
        }
      ],
      text: '{if if if',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 4,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 7,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 9,
        end: 9
      },
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('if{if', () => {
    t.deepEqual(recovery('if{if', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'if',
                start: 3,
                end: 5,
                kind: 13,
                flags: 0
              }
            ],
            start: 2,
            end: 5,
            kind: 179,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 5,
            end: 5,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 5,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if{if',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 3,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statementewr', () => {
    t.deepEqual(recovery('else{if x=)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 4,
            end: 4,
            kind: 13,
            flags: 2
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'IfStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 7,
                  end: 9,
                  kind: 13,
                  flags: 0
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 11,
                  end: 11,
                  kind: 13,
                  flags: 2
                },
                start: 7,
                end: 11,
                kind: 152,
                flags: 0
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 11,
                  end: 11,
                  kind: 13,
                  flags: 2
                },
                start: 11,
                end: 11,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 5,
              end: 11,
              kind: 133,
              flags: 0
            }
          ],
          start: 4,
          end: 11,
          kind: 123,
          flags: 0
        }
      ],
      text: 'else{if x=)',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 8,
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('Unclosed block statement+', () => {
    t.deepEqual(recovery('if{acorn = sloppy this ! loose while this fast', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'CoverInitializedName',
                left: {
                  type: 'IdentifierName',
                  name: 'acorn',
                  start: 3,
                  end: 10,
                  kind: 13,
                  flags: 0
                },
                right: {
                  type: 'IdentifierReference',
                  name: 'sloppy',
                  start: 10,
                  end: 17,
                  kind: 13,
                  flags: 0
                },
                start: 3,
                end: 17,
                kind: 181,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: 'this',
                start: 17,
                end: 22,
                kind: 13,
                flags: 0
              }
            ],
            start: 2,
            end: 22,
            kind: 179,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: 'loose',
                start: 24,
                end: 30,
                kind: 13,
                flags: 0
              },
              start: 22,
              end: 30,
              kind: 160,
              flags: 0
            },
            start: 22,
            end: 30,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 30,
          kind: 133,
          flags: 0
        },
        {
          type: 'WhileStatement',
          expression: {
            type: 'ThisExpression',
            start: 36,
            end: 41,
            kind: 165,
            flags: 0
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'fast',
              start: 41,
              end: 46,
              kind: 13,
              flags: 0
            },
            start: 41,
            end: 46,
            kind: 122,
            flags: 0
          },
          start: 30,
          end: 46,
          kind: 139,
          flags: 0
        }
      ],
      text: 'if{acorn = sloppy this ! loose while this fast',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 18,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 23,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 37,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 42,
          length: 4
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 46,
        end: 46
      },
      start: 0,
      length: 46,
      end: 46
    });
  });

  it('Unclosed block statement8976', () => {
    t.deepEqual(recovery('if waiting for my package while do this', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'waiting',
            start: 2,
            end: 10,
            flags: 0
          },
          consequent: {
            type: 'ForStatement',
            initializer: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'my',
              start: 14,
              end: 17,
              flags: 0
            },
            condition: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 25,
              end: 25,
              flags: 2
            },
            incrementor: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'package',
              start: 17,
              end: 25,
              flags: 0
            },
            statement: {
              type: 'WhileStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 31,
                end: 31,
                flags: 2
              },
              statement: {
                type: 'DoWhileStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 39,
                  end: 39,
                  flags: 2
                },
                statement: {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ThisExpression',
                    start: 34,
                    end: 39,
                    kind: 165,
                    flags: 0
                  },
                  start: 34,
                  end: 39,
                  kind: 122,
                  flags: 0
                },
                start: 31,
                end: 39,
                kind: 127,
                flags: 0
              },
              start: 25,
              end: 39,
              kind: 139,
              flags: 0
            },
            start: 10,
            end: 39,
            kind: 132,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 39,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if waiting for my package while do this',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 7
        },
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
          message: '`(` expected',
          code: 5,
          start: 15,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 18,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 26,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 32,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`while` expected',
          code: 5,
          start: 35,
          length: 4
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 39,
        end: 39
      },
      start: 0,
      length: 39,
      end: 39
    });
  });

  it('Unclosed block statement74', () => {
    t.deepEqual(recovery('if {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 2,
            end: 4,
            kind: 179,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 4,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statement0+', () => {
    t.deepEqual(recovery('{}}}}}if!!&', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 10,
                  end: 10,
                  kind: 13,
                  flags: 2
                },
                start: 9,
                end: 10,
                kind: 160,
                flags: 0
              },
              start: 8,
              end: 10,
              kind: 160,
              flags: 0
            },
            operator: '&',
            right: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 11,
            kind: 155,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,
              kind: 13,
              flags: 2
            },
            start: 11,
            end: 11,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 6,
          end: 11,
          kind: 133,
          flags: 0
        }
      ],
      text: '{}}}}}if!!&',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 8,
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 11,
        end: 11
      },
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('Unclosed block statement67890', () => {
    t.deepEqual(recovery('if /{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'RegularExpressionLiteral',
            pattern: '',
            flag: '',
            start: 2,
            end: 5,
            kind: 15,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 5,
              end: 5,
              kind: 13,
              flags: 2
            },
            start: 5,
            end: 5,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 5,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if /{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 3,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('Unclosed block statement678u9i0+', () => {
    t.deepEqual(recovery('if else/{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 7,
              end: 7,
              flags: 2
            },
            operator: '/',
            right: {
              type: 'ObjectLiteral',
              properties: [],
              start: 8,
              end: 9,
              kind: 179,
              flags: 0
            },
            start: 2,
            end: 9,
            kind: 155,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 9,
              end: 9,
              flags: 2
            },
            start: 9,
            end: 9,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 9,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if else/{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 7,
          length: 1
        },
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 9,
        end: 9
      },
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('Unclosed block statement90', () => {
    t.deepEqual(recovery('if finally I try this ! {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 2,
            end: 2,
            flags: 2
          },
          consequent: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 2,
              end: 2,
              kind: 123,
              flags: 0
            },
            catchClause: null,
            finalizer: {
              type: 'BlockStatement',
              leafs: [],
              start: 10,
              end: 10,
              kind: 123,
              flags: 0
            },
            start: 2,
            end: 10,
            kind: 138,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 10,
          kind: 133,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'I',
            start: 10,
            end: 12,
            flags: 0
          },
          start: 10,
          end: 12,
          kind: 122,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 16,
            end: 16,
            kind: 123,
            flags: 0
          },
          catchClause: null,
          finalizer: null,
          start: 12,
          end: 16,
          kind: 138,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ThisExpression',
            start: 16,
            end: 21,
            kind: 165,
            flags: 0
          },
          start: 16,
          end: 21,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'ObjectLiteral',
              properties: [],
              start: 23,
              end: 25,
              kind: 179,
              flags: 0
            },
            start: 21,
            end: 25,
            kind: 160,
            flags: 0
          },
          start: 21,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: 'if finally I try this ! {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 7
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 11,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 17,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 24,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 25,
        end: 25
      },
      start: 0,
      length: 25,
      end: 25
    });
  });

  it('{!if { else } ! / j', () => {
    t.deepEqual(recovery('{!if { else } ! / j', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 2,
                  end: 2,
                  kind: 13,
                  flags: 2
                },
                start: 1,
                end: 2,
                kind: 160,
                flags: 0
              },
              start: 1,
              end: 2,
              kind: 122,
              flags: 0
            },
            {
              type: 'IfStatement',
              expression: {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'else',
                    start: 6,
                    end: 11,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 4,
                end: 13,
                kind: 179,
                flags: 0
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'RegularExpressionLiteral',
                    pattern: ' ',
                    flag: '',
                    start: 15,
                    end: 19,
                    kind: 15,
                    flags: 0
                  },
                  start: 13,
                  end: 19,
                  kind: 160,
                  flags: 0
                },
                start: 13,
                end: 19,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 2,
              end: 19,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 19,
          kind: 123,
          flags: 0
        }
      ],
      text: '{!if { else } ! / j',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 5,
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
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 16,
          length: 3
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 19,
        end: 19
      },
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('if(,,,,,,,,,,,,,,,,,,,,,,,,{', () => {
    t.deepEqual(recovery('if(,,,,,,,,,,,,,,,,,,,,,,,,{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'IdentifierReference',
                name: '',
                start: 4,
                end: 4,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 6,
                end: 6,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 10,
                end: 10,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 12,
                end: 12,
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
                start: 16,
                end: 16,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 18,
                end: 18,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 20,
                end: 20,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 22,
                end: 22,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 24,
                end: 24,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 26,
                end: 26,
                kind: 13,
                flags: 2
              },
              {
                type: 'ObjectLiteral',
                properties: [],
                start: 27,
                end: 28,
                kind: 179,
                flags: 0
              }
            ],
            start: 3,
            end: 28,
            kind: 147,
            flags: 0
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 28,
              end: 28,
              kind: 13,
              flags: 2
            },
            start: 28,
            end: 28,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 28,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if(,,,,,,,,,,,,,,,,,,,,,,,,{',
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 12,
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 20,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 22,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 27,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 28,
        end: 28
      },
      start: 0,
      length: 28,
      end: 28
    });
  });

  it('{,,,,,,,,,,,,,,if /a/ ,,,,,}', () => {
    t.deepEqual(recovery('{,,,,,,,,,,,,,,if /a/ ,,,,,}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 1,
          kind: 123,
          flags: 0
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'RegularExpressionLiteral',
                pattern: 'a',
                flag: '',
                start: 17,
                end: 21,
                kind: 15,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 24,
                end: 24,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 26,
                end: 26,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 27,
                end: 27,
                kind: 13,
                flags: 2
              }
            ],
            start: 17,
            end: 27,
            kind: 147,
            flags: 0
          },
          consequent: {
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
          alternate: null,
          start: 15,
          end: 27,
          kind: 133,
          flags: 0
        }
      ],
      text: '{,,,,,,,,,,,,,,if /a/ ,,,,,}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 1,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 4,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 7,
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
          message: '`(` expected',
          code: 5,
          start: 18,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 27,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 28,
        end: 28
      },
      start: 0,
      length: 28,
      end: 28
    });
  });

  it('{;;;;;if /a//a/a/a/a/a while /adf//ads if else get mad', () => {
    t.deepEqual(recovery('{;;;;;if /a//a/a/a/a/a while /adf//ads if else get mad', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'EmptyStatement',
              start: 1,
              end: 2,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 2,
              end: 3,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 3,
              end: 4,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 4,
              end: 5,
              kind: 148,
              flags: 0
            },
            {
              type: 'EmptyStatement',
              start: 5,
              end: 6,
              kind: 148,
              flags: 0
            },
            {
              type: 'IfStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'RegularExpressionLiteral',
                          pattern: 'a',
                          flag: '',
                          start: 8,
                          end: 12,
                          kind: 15,
                          flags: 0
                        },
                        operator: '/',
                        right: {
                          type: 'IdentifierReference',
                          name: 'a',
                          start: 13,
                          end: 14,
                          kind: 13,
                          flags: 0
                        },
                        start: 8,
                        end: 14,
                        kind: 155,
                        flags: 0
                      },
                      operator: '/',
                      right: {
                        type: 'IdentifierReference',
                        name: 'a',
                        start: 15,
                        end: 16,
                        kind: 13,
                        flags: 0
                      },
                      start: 8,
                      end: 16,
                      kind: 155,
                      flags: 0
                    },
                    operator: '/',
                    right: {
                      type: 'IdentifierReference',
                      name: 'a',
                      start: 17,
                      end: 18,
                      kind: 13,
                      flags: 0
                    },
                    start: 8,
                    end: 18,
                    kind: 155,
                    flags: 0
                  },
                  operator: '/',
                  right: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 19,
                    end: 20,
                    kind: 13,
                    flags: 0
                  },
                  start: 8,
                  end: 20,
                  kind: 155,
                  flags: 0
                },
                operator: '/',
                right: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 21,
                  end: 22,
                  kind: 13,
                  flags: 0
                },
                start: 8,
                end: 22,
                kind: 155,
                flags: 0
              },
              consequent: {
                type: 'WhileStatement',
                expression: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'RegularExpressionLiteral',
                    pattern: 'adf',
                    flag: '',
                    start: 28,
                    end: 34,
                    kind: 15,
                    flags: 0
                  },
                  operator: '/',
                  right: {
                    type: 'IdentifierReference',
                    name: 'ads',
                    start: 35,
                    end: 38,
                    kind: 13,
                    flags: 0
                  },
                  start: 28,
                  end: 38,
                  kind: 155,
                  flags: 0
                },
                statement: {
                  type: 'IfStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 46,
                    end: 46,
                    kind: 13,
                    flags: 2
                  },
                  consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'get',
                      start: 46,
                      end: 50,
                      kind: 13,
                      flags: 0
                    },
                    start: 46,
                    end: 50,
                    kind: 122,
                    flags: 0
                  },
                  alternate: null,
                  start: 38,
                  end: 50,
                  kind: 133,
                  flags: 0
                },
                start: 22,
                end: 50,
                kind: 139,
                flags: 0
              },
              alternate: null,
              start: 6,
              end: 50,
              kind: 133,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'mad',
                start: 50,
                end: 54,
                kind: 13,
                flags: 0
              },
              start: 50,
              end: 54,
              kind: 122,
              flags: 0
            }
          ],
          start: 0,
          end: 54,
          kind: 123,
          flags: 0
        }
      ],
      text: '{;;;;;if /a//a/a/a/a/a while /adf//ads if else get mad',
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
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 23,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 29,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 39,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 42,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 47,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 51,
          length: 3
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 54,
        end: 54
      },
      start: 0,
      length: 54,
      end: 54
    });
  });

  it('Unclosed block statement42359870', () => {
    t.deepEqual(recovery('if[]{', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [],
            flags: 0,
            start: 2,
            end: 4
          },
          consequent: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 5,
            kind: 123,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 5,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if[]{',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('{[]if/', () => {
    t.deepEqual(recovery('{[]if/', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ArrayLiteral',
                kind: 178,
                elements: [],
                start: 1,
                end: 3,
                flags: 0
              },
              start: 1,
              end: 3,
              kind: 122,
              flags: 0
            },
            {
              type: 'IfStatement',
              expression: {
                type: 'RegularExpressionLiteral',
                pattern: '',
                flag: '',
                start: 5,
                end: 7,
                kind: 15,
                flags: 0
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 7,
                  end: 7,
                  kind: 13,
                  flags: 2
                },
                start: 7,
                end: 7,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 3,
              end: 7,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 123,
          flags: 0
        }
      ],
      text: '{[]if/',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 5,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('{(((if))', () => {
    t.deepEqual(recovery('{(((if))', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      kind: 13,
                      name: '',
                      start: 4,
                      end: 4,
                      flags: 2
                    },
                    start: 3,
                    end: 4,
                    kind: 189,
                    flags: 0
                  },
                  start: 2,
                  end: 4,
                  kind: 189,
                  flags: 0
                },
                start: 1,
                end: 4,
                kind: 189,
                flags: 0
              },
              start: 1,
              end: 4,
              kind: 122,
              flags: 0
            },
            {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 7,
                end: 7,
                flags: 2
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 8,
                  end: 8,
                  flags: 2
                },
                start: 8,
                end: 8,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 4,
              end: 8,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 123,
          flags: 0
        }
      ],
      text: '{(((if))',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
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
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('Unclosed block statement53496+', () => {
    t.deepEqual(recovery(']if]{', 'recovery.js'), {
      children: [],
      context: 0,
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
          code: 5,
          kind: 2,
          length: 1,
          message: '`(` expected',
          source: 2,
          start: 3
        },
        {
          code: 7,
          kind: 2,
          length: 1,
          message: 'Expression expected',
          source: 2,
          start: 4
        }
      ],
      directives: [],
      end: 5,
      EOF: {
        end: 5,
        kind: 16384,
        start: 5,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 5,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          alternate: null,
          consequent: {
            end: 5,
            flags: 0,
            kind: 123,
            start: 4,
            leafs: [],
            type: 'BlockStatement'
          },
          end: 5,
          expression: {
            end: 4,
            flags: 2,
            kind: 13,
            start: 4,
            type: 'IdentifierReference',
            name: ''
          },
          flags: 0,
          kind: 133,
          start: 1,
          type: 'IfStatement'
        }
      ],
      text: ']if]{'
    });
  });

  it('Unclosed block statement35429+0', () => {
    t.deepEqual(recovery('[if]]else', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 2,
          message: '`]` expected',
          source: 2,
          start: 1
        },
        {
          code: 5,
          kind: 2,
          length: 1,
          message: '`(` expected',
          source: 2,
          start: 3
        },
        {
          code: 7,
          kind: 2,
          length: 1,
          message: 'Expression expected',
          source: 2,
          start: 4
        },
        {
          code: 7,
          kind: 2,
          length: 4,
          message: 'Expression expected',
          source: 2,
          start: 5
        }
      ],
      directives: [],
      end: 9,
      EOF: {
        end: 9,
        kind: 16384,
        start: 9,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 1,
          expression: {
            elements: [],
            end: 1,
            flags: 0,
            kind: 178,
            start: 0,
            type: 'ArrayLiteral'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          alternate: {
            end: 9,
            expression: {
              end: 9,
              flags: 2,
              kind: 13,
              start: 9,
              type: 'IdentifierReference',
              name: ''
            },
            flags: 0,
            kind: 122,
            start: 9,
            type: 'ExpressionStatement'
          },
          consequent: {
            end: 5,
            expression: {
              end: 5,
              flags: 2,
              kind: 13,
              start: 5,
              type: 'IdentifierReference',
              name: ''
            },
            flags: 0,
            kind: 122,
            start: 4,
            type: 'ExpressionStatement'
          },
          end: 9,
          expression: {
            end: 4,
            flags: 2,
            kind: 13,
            start: 4,
            type: 'IdentifierReference',
            name: ''
          },
          flags: 0,
          kind: 133,
          start: 1,
          type: 'IfStatement'
        }
      ],
      text: '[if]]else'
    });
  });

  it('Unclosed block statement4235', () => {
    t.deepEqual(recovery('[]if', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            kind: 178,
            elements: [],
            flags: 0,
            start: 0,
            end: 2
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 4,
            end: 4,
            flags: 2
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 2,
          end: 4,
          kind: 133,
          flags: 0
        }
      ],
      text: '[]if',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statement43252435', () => {
    t.deepEqual(recovery('{}if', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2,
          kind: 123,
          flags: 0
        },
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 4,
            end: 4,
            flags: 2
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,
            kind: 122,
            flags: 0
          },
          alternate: null,
          start: 2,
          end: 4,
          kind: 133,
          flags: 0
        }
      ],
      text: '{}if',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 2,
          length: 2
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block statement203409', () => {
    t.deepEqual(recovery('{if,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'IfStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 4,
                end: 4,
                flags: 2
              },
              consequent: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  kind: 13,
                  name: '',
                  start: 4,
                  end: 4,
                  flags: 2
                },
                start: 4,
                end: 4,
                kind: 122,
                flags: 0
              },
              alternate: null,
              start: 1,
              end: 4,
              kind: 133,
              flags: 0
            }
          ],
          start: 0,
          end: 4,
          kind: 123,
          flags: 0
        }
      ],
      text: '{if,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 1
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });

  it('Unclosed block comment', () => {
    t.deepEqual(recovery('/* /* if(foo) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [],
      text: '/* /* if(foo) {}',
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
          length: 16
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 16,
        end: 16
      },
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('Unclosed block statement2452543', () => {
    t.deepEqual(recovery('if else catch', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'IfStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 7,
            end: 7,
            flags: 2
          },
          consequent: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 7,
              end: 7,
              kind: 123,
              flags: 0
            },
            catchClause: {
              type: 'CatchClause',
              kind: 140,
              binding: null,
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 13,
                end: 13,
                kind: 123,
                flags: 0
              },
              flags: 0,
              start: 7,
              end: 13
            },
            finalizer: null,
            start: 7,
            end: 13,
            kind: 138,
            flags: 0
          },
          alternate: null,
          start: 0,
          end: 13,
          kind: 133,
          flags: 0
        }
      ],
      text: 'if else catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 3,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 8,
          length: 5
        }
      ],
      detached: false,
      isIncremental: false,
      parent: null,
      children: [],
      EOF: {
        type: 'CST',
        kind: 16384,
        start: 13,
        end: 13
      },
      start: 0,
      length: 13,
      end: 13
    });
  });
});
