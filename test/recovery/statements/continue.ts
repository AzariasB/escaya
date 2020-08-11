import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Continue', () => {
  it('Unclosed block statement', () => {
    t.deepEqual(recovery('while ! continue {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 7,
              end: 7,
              flags: 2
            },
            start: 5,
            end: 7,
            kind: 160,
            flags: 0
          },
          statement: {
            type: 'ContinueStatement',
            label: null,
            start: 7,
            end: 16,
            kind: 125,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 139,
          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 16,
          end: 18,
          kind: 123,
          flags: 0
        }
      ],
      text: 'while ! continue {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
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
          start: 8,
          length: 8
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 17,
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
        start: 18,
        end: 18
      },
      start: 0,
      length: 18,
      end: 18
    });
  });

  it('as keyword', () => {
    t.deepEqual(recovery('continue', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ContinueStatement',
          label: null,
          start: 0,
          end: 8,
          kind: 125,
          flags: 0
        }
      ],
      text: 'continue',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `continue` statement can only be used within an enclosing iteration statement',
          code: 42,
          start: 0,
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
        start: 8,
        end: 8
      },
      start: 0,
      length: 8,
      end: 8
    });
  });
});
