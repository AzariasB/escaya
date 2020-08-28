import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Async Arrows', () => {
  it('async () =>(', () => {
    t.deepEqual(recovery('async () =>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                start: 11,
                end: 12,
                kind: 189,
                flags: 0
              },
              start: 11,
              end: 12,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 12,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async () =>(',
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('async (() =>', () => {
    t.deepEqual(recovery('async (() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ArrowFunction',
                params: [],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 12,
                    end: 12,
                    kind: 13,
                    flags: 2
                  },
                  start: 12,
                  end: 12,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 7,
                end: 12,
                kind: 188,
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
      text: 'async (() =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 2
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

  it('async yield =>( "use strict";', () => {
    t.deepEqual(recovery('async yield =>( "use strict";', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'yield',
                start: 5,
                end: 11,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'StringLiteral',
                  value: 'use strict',
                  start: 15,
                  end: 28,
                  kind: 12,
                  flags: 0
                },
                start: 14,
                end: 28,
                kind: 189,
                flags: 0
              },
              start: 14,
              end: 28,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 28,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 29,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async yield =>( "use strict";',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
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

  it('"use strict"; async ( =>(', () => {
    t.deepEqual(recovery('"use strict"; async ( =>(', 'recovery.js'), {
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
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 25,
                  end: 25,
                  kind: 13,
                  flags: 2
                },
                start: 24,
                end: 25,
                kind: 189,
                flags: 0
              },
              start: 24,
              end: 25,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 13,
            end: 25,
            kind: 188,
            flags: 0
          },
          start: 13,
          end: 25,
          kind: 122,
          flags: 0
        }
      ],
      text: '"use strict"; async ( =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 22,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 24,
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

  it('"use strict"; async (yield await =>(', () => {
    t.deepEqual(recovery('"use strict"; async (yield await =>(', 'recovery.js'), {
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
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 13,
              end: 19,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'yield',
                start: 21,
                end: 26,
                kind: 13,
                flags: 0
              },
              {
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'await',
                    start: 26,
                    end: 32,
                    kind: 168,
                    flags: 0
                  }
                ],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: '',
                      start: 36,
                      end: 36,
                      kind: 13,
                      flags: 2
                    },
                    start: 35,
                    end: 36,
                    kind: 189,
                    flags: 0
                  },
                  start: 35,
                  end: 36,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 26,
                end: 36,
                kind: 188,
                flags: 0
              }
            ],
            start: 13,
            end: 36,
            kind: 156,
            flags: 0
          },
          start: 13,
          end: 36,
          kind: 122,
          flags: 0
        }
      ],
      text: '"use strict"; async (yield await =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 21,
          kind: 3,
          length: 5,
          message: 'Unexpected `yield` as identifier in this context',
          source: 2,
          start: 21
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 35,
          length: 1
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

  it('async await =>(', () => {
    t.deepEqual(recovery('async await =>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'await',
                start: 5,
                end: 11,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 15,
                  end: 15,
                  kind: 13,
                  flags: 2
                },
                start: 14,
                end: 15,
                kind: 189,
                flags: 0
              },
              start: 14,
              end: 15,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 15,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async await =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 14,
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

  it('async (((1n))) =>!', () => {
    t.deepEqual(recovery('async (((1n))) =>!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'BigIntLiteral',
                    value: '1',
                    start: 9,
                    end: 11,
                    kind: 11,
                    flags: 0
                  },
                  start: 8,
                  end: 12,
                  kind: 189,
                  flags: 0
                },
                start: 7,
                end: 13,
                kind: 189,
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
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
            start: 17,
            end: 18,
            kind: 160,
            flags: 0
          },
          start: 17,
          end: 18,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async (((1n))) =>!',
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
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('async a...=>(', () => {
    t.deepEqual(recovery('async a...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a',
                start: 5,
                end: 7,
                kind: 168,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
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
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 7,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 7,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,
              kind: 13,
              flags: 2
            },
            start: 12,
            end: 13,
            kind: 189,
            flags: 0
          },
          start: 12,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async a...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 5,
          start: 7,
          length: 3
        },
        {
          kind: 2,
          source: 2,
          message: 'Statement expected',
          code: 8,
          start: 10,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('async ([]) =>(', () => {
    t.deepEqual(recovery('async ([]) =>(', 'recovery.js'), {
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
                elements: [],
                start: 7,
                end: 9,
                kind: 178,
                flags: 0
              }
            ],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 14,
                  end: 14,
                  kind: 13,
                  flags: 2
                },
                start: 13,
                end: 14,
                kind: 189,
                flags: 0
              },
              start: 13,
              end: 14,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 14,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async ([]) =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('async (a, ...=>(', () => {
    t.deepEqual(recovery('async (a, ...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'IdentifierReference',
                name: 'a',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              },
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 13,
                  end: 13,
                  kind: 13,
                  flags: 2
                },
                start: 9,
                end: 13,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 13,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 13,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 16,
              end: 16,
              kind: 13,
              flags: 2
            },
            start: 15,
            end: 16,
            kind: 189,
            flags: 0
          },
          start: 15,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async (a, ...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 13,
          length: 2
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
      length: 16,
      end: 16
    });
  });

  it('async (...=>(', () => {
    t.deepEqual(recovery('async (...=>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'AssignmentRestElement',
                argument: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 10,
                  end: 10,
                  kind: 13,
                  flags: 2
                },
                start: 7,
                end: 10,
                kind: 200,
                flags: 0
              }
            ],
            start: 0,
            end: 10,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 13,
              end: 13,
              kind: 13,
              flags: 2
            },
            start: 12,
            end: 13,
            kind: 189,
            flags: 0
          },
          start: 12,
          end: 13,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async (...=>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('(async () =>', () => {
    t.deepEqual(recovery('(async () =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrowFunction',
              params: [],
              contents: {
                type: 'ConciseBody',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                start: 12,
                end: 12,
                kind: 187,
                flags: 0
              },
              async: true,
              start: 1,
              end: 12,
              kind: 188,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '(async () =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 2
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

  it('(() async =>() =>', () => {
    t.deepEqual(recovery('(() async =>() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 3,
                end: 3,
                kind: 13,
                flags: 2
              },
              start: 1,
              end: 3,
              kind: 189,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: {
              type: 'IdentifierReference',
              name: 'async',
              start: 3,
              end: 9,
              kind: 13,
              flags: 0
            },
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ArrowFunction',
                params: [],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 17,
                    end: 17,
                    kind: 13,
                    flags: 2
                  },
                  start: 17,
                  end: 17,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 12,
                end: 17,
                kind: 188,
                flags: 0
              },
              start: 12,
              end: 17,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 3,
            end: 17,
            kind: 188,
            flags: 0
          },
          start: 3,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '(() async =>() =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 4,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
          length: 2
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
});
