import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Throw', () => {
  it('as keyword', () => {
    t.deepEqual(recovery('throw', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 5,
            end: 5,
            flags: 2
          },
          start: 0,
          end: 5,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 0,
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
        start: 5,
        end: 5
      },
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('with paren', () => {
    t.deepEqual(recovery('throw(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 6,
              end: 6,
              flags: 2
            },
            start: 5,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 137,
          flags: 0
        }
      ],
      text: 'throw(',
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
        start: 6,
        end: 6
      },
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('malformed throw', () => {
    t.deepEqual(recovery('throw (x) {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: 'x',
              start: 7,
              end: 8,
              flags: 0
            },
            start: 5,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 9,
          end: 12,
          kind: 123,
          flags: 0
        }
      ],
      text: 'throw (x) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
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

  it('throw with catch', () => {
    t.deepEqual(recovery('throw {x} catch', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,
              kind: 123,
              flags: 0
            },
            start: 9,
            end: 15,
            kind: 140,
            flags: 0
          },
          finalizer: null,
          start: 9,
          end: 15,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 10,
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
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('throw with catch', () => {
    t.deepEqual(recovery('throw {x} catch', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,
              kind: 123,
              flags: 0
            },
            start: 9,
            end: 15,
            kind: 140,
            flags: 0
          },
          finalizer: null,
          start: 9,
          end: 15,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} catch',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 10,
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
        start: 15,
        end: 15
      },
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('throw with finally', () => {
    t.deepEqual(recovery('throw {x} finally', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
            flags: 0
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 17,
            end: 17,
            kind: 123,
            flags: 0
          },
          start: 9,
          end: 17,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 10,
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
        start: 17,
        end: 17
      },
      start: 0,
      length: 17,
      end: 17
    });
  });

  it('throw with catch and finally', () => {
    t.deepEqual(recovery('throw {x} catch finally', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ThrowStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x',
                start: 7,
                end: 8,
                kind: 13,
                flags: 0
              }
            ],
            start: 5,
            end: 9,
            kind: 179,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 137,
          flags: 0
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 9,
            end: 9,
            kind: 123,
            flags: 0
          },
          catchClause: {
            type: 'CatchClause',
            binding: null,
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 15,
              end: 15,
              kind: 123,
              flags: 0
            },
            start: 9,
            end: 15,
            kind: 140,
            flags: 0
          },
          finalizer: {
            type: 'BlockStatement',
            leafs: [],
            start: 23,
            end: 23,
            kind: 123,
            flags: 0
          },
          start: 9,
          end: 23,
          kind: 138,
          flags: 0
        }
      ],
      text: 'throw {x} catch finally',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`try` expected',
          code: 5,
          start: 10,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 16,
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
        start: 23,
        end: 23
      },
      start: 0,
      length: 23,
      end: 23
    });
  });
});
