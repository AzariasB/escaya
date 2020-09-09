import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Identifier', () => {
  it('0b0122', () => {
    t.deepEqual(recovery('0b0122', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 65,
          kind: 2,
          length: 1,
          message: 'Binary integer literal like sequence containing an invalid digit',
          source: 0,
          start: 4
        },
        {
          code: 65,
          kind: 2,
          length: 1,
          message: 'Binary integer literal like sequence containing an invalid digit',
          source: 0,
          start: 5
        }
      ],
      directives: [],
      end: 6,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 6,
          expression: {
            end: 6,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',
            floatingPoint: false,
            value: 1
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 6,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '0b0122'
    });
  });
  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
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
            name: '￿',
            start: 1,
            end: 2,
            kind: 13,
            flags: 0
          },
          start: 1,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'u',
            start: 2,
            end: 3,
            kind: 13,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo',
            start: 3,
            end: 7,
            kind: 13,
            flags: 0
          },
          start: 3,
          end: 7,
          kind: 122,
          flags: 0
        }
      ],
      text: 'x\\u foo',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid hexadecimal escape sequence',
          code: 50,
          start: 1,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
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

  it('x\\', () => {
    t.deepEqual(recovery('x\\', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 48,
          kind: 2,
          length: 0,
          message: 'Invalid Unicode escape sequence',
          source: 0,
          start: 1
        }
      ],
      directives: [],
      end: 2,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 1,
          expression: {
            end: 1,
            flags: 0,
            kind: 13,
            name: 'x',
            start: 0,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 2,
          expression: {
            end: 2,
            flags: 0,
            kind: 13,
            name: '￿',
            start: 1,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 1,
          type: 'ExpressionStatement'
        }
      ],
      length: 2,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'x\\'
    });
  });

  it('x\\u{0 foo', () => {
    t.deepEqual(recovery('x\\u{0 foo', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
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
            name: '￿',
            start: 1,
            end: 2,
            kind: 13,
            flags: 0
          },
          start: 1,
          end: 2,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'u',
            start: 2,
            end: 3,
            kind: 13,
            flags: 0
          },
          start: 2,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'NumericLiteral',
                floatingPoint: false,
                value: 0,
                start: 4,
                end: 5,
                kind: 10,
                flags: 0
              },
              start: 4,
              end: 5,
              kind: 122,
              flags: 0
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'foo',
                start: 5,
                end: 9,
                kind: 13,
                flags: 0
              },
              start: 5,
              end: 9,
              kind: 122,
              flags: 0
            }
          ],
          start: 3,
          end: 9,
          kind: 123,
          flags: 0
        }
      ],
      text: 'x\\u{0 foo',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Invalid hexadecimal escape sequence',
          code: 50,
          start: 1,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 2,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 6,
          length: 3
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
});
