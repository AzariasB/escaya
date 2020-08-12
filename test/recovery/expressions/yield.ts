import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Yield', () => {
  it('yield', () => {
    t.deepEqual(recovery('yield', 'recovery.js'), {
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
        }
      ],
      text: 'yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('(yield', () => {
    t.deepEqual(recovery('(yield', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 1,
              end: 6,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '(yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 1,
          length: 5
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

  it('(!yield', () => {
    t.deepEqual(recovery('(!yield', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 2,
                end: 7,
                kind: 13,
                flags: 0
              },
              start: 1,
              end: 7,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 7,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '(!yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 2,
          length: 5
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

  it('function *a yield (', () => {
    t.deepEqual(recovery('function *a yield (', 'recovery.js'), {
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
            leafs: [],
            start: 11,
            end: 11,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 186,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'yield',
              start: 11,
              end: 17,
              kind: 13,
              flags: 0
            },
            arguments: [],
            start: 11,
            end: 19,
            kind: 156,
            flags: 0
          },
          start: 11,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function *a yield (',
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
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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

  it('function async * yield (', () => {
    t.deepEqual(recovery('function async * yield (', 'recovery.js'), {
      kind: 209,
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
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: '',
              start: 14,
              end: 14,
              kind: 13,
              flags: 2
            },
            operator: '*',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 16,
                end: 22,
                kind: 13,
                flags: 0
              },
              arguments: [],
              start: 16,
              end: 24,
              kind: 156,
              flags: 0
            },
            start: 14,
            end: 24,
            kind: 155,
            flags: 0
          },
          start: 14,
          end: 24,
          kind: 122,
          flags: 0
        }
      ],
      text: 'function async * yield (',
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
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('(*foo=bar yield', () => {
    t.deepEqual(recovery('(*foo=bar yield', 'recovery.js'), {
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
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 1,
                  end: 1,
                  kind: 13,
                  flags: 2
                },
                operator: '*',
                right: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 2,
                  end: 5,
                  kind: 13,
                  flags: 0
                },
                start: 1,
                end: 5,
                kind: 155,
                flags: 0
              },
              start: 0,
              end: 5,
              kind: 189,
              flags: 0
            },
            operator: '=',
            right: {
              type: 'IdentifierReference',
              name: 'bar',
              start: 6,
              end: 9,
              kind: 13,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'yield',
            start: 9,
            end: 15,
            kind: 13,
            flags: 0
          },
          start: 9,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: '(*foo=bar yield',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 1,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 10,
          length: 5
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

  it('!yield(', () => {
    t.deepEqual(recovery('!yield(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'yield',
                start: 1,
                end: 6,
                kind: 13,
                flags: 0
              },
              arguments: [],
              start: 1,
              end: 7,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 7,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: '!yield(',
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

  // Also in this case 'yield' will be parsed out in its own production becae
  // not part of the function body. '{' is missing
  it('async function *x(yield yield x', () => {
    t.deepEqual(recovery('async function *x(yield yield x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 16,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 18,
              end: 23,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 23,
              end: 29,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingIdentifier',
              name: 'x',
              start: 29,
              end: 31,
              kind: 168,
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
      text: 'async function *x(yield yield x',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 24,
          length: 5
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

  it('async function *x(yield { yield x', () => {
    t.deepEqual(recovery('async function *x(yield { yield x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 16,
            end: 17,
            kind: 168,
            flags: 0
          },
          generator: true,
          async: true,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'yield',
              start: 18,
              end: 23,
              kind: 168,
              flags: 0
            },
            {
              type: 'BindingElement',
              left: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'yield',
                    start: 25,
                    end: 31,
                    kind: 168,
                    flags: 0
                  },
                  {
                    type: 'BindingIdentifier',
                    name: 'x',
                    start: 31,
                    end: 33,
                    kind: 168,
                    flags: 0
                  }
                ],
                start: 23,
                end: 33,
                kind: 169,
                flags: 0
              },
              right: null,
              start: 23,
              end: 33,
              kind: 172,
              flags: 0
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [],
            start: 33,
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
      text: 'async function *x(yield { yield x',
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
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 24,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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
      end: 33
    });
  });
});
