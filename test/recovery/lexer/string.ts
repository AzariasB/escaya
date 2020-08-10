import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Identifier', () => {
  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 50,
          kind: 2,
          length: 2,
          message: 'Invalid hexadecimal escape sequence',
          source: 0,
          start: 1
        }
      ],
      directives: [],
      end: 7,
      EOF: {
        end: 7,
        kind: 16384,
        start: 7,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
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
        },
        {
          end: 3,
          expression: {
            end: 3,
            flags: 0,
            kind: 13,
            name: 'u',
            start: 2,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 2,
          type: 'ExpressionStatement'
        },
        {
          end: 7,
          expression: {
            end: 7,
            flags: 0,
            kind: 13,
            name: 'foo',
            start: 3,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 3,
          type: 'ExpressionStatement'
        }
      ],
      length: 7,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'x\\u foo'
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
      EOF: {
        end: 2,
        kind: 16384,
        start: 2,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
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

  /*
  it('x\\u{0 foo', () => {
    t.deepEqual(recovery('x\\u{0 foo', 'recovery.js'), {});
  });

  it('x\\u{0 foo', () => {
    t.deepEqual(recovery('x\\u{0 foo', 'recovery.js'), {});
  });
  */

  it('x\\u{0 foo', () => {
    t.deepEqual(recovery('x\\u{0 foo', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 50,
          kind: 2,
          length: 4,
          message: 'Invalid hexadecimal escape sequence',
          source: 0,
          start: 1
        },
        {
          code: 5,
          kind: 2,
          length: 3,
          message: '`}` expected',
          source: 2,
          start: 6
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
        },
        {
          end: 3,
          expression: {
            end: 3,
            flags: 0,
            kind: 13,
            name: 'u',
            start: 2,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 2,
          type: 'ExpressionStatement'
        },
        {
          end: 9,
          flags: 0,
          kind: 123,
          leafs: [
            {
              end: 5,
              expression: {
                end: 5,
                flags: 0,
                kind: 10,
                start: 4,
                type: 'NumericLiteral',
                value: 0
              },
              flags: 0,
              kind: 122,
              start: 4,
              type: 'ExpressionStatement'
            },
            {
              end: 9,
              expression: {
                end: 9,
                flags: 0,
                kind: 13,
                name: 'foo',
                start: 5,
                type: 'IdentifierReference'
              },
              flags: 0,
              kind: 122,
              start: 5,
              type: 'ExpressionStatement'
            }
          ],
          start: 3,
          type: 'BlockStatement'
        }
      ],
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'x\\u{0 foo'
    });
  });
});
