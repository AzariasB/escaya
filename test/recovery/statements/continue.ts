import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Continue', () => {
  it('while ! continue {', () => {
    t.deepEqual(recovery('while ! continue {', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 7,
              end: 7,

              flags: 2
            },
            start: 5,
            end: 7,

            flags: 0
          },
          statement: {
            type: 'ContinueStatement',
            label: null,
            start: 7,
            end: 16,

            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        },
        {
          type: 'BlockStatement',
          leafs: [],
          start: 16,
          end: 18,

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
          message: '`;` expected',
          code: 92,
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

  it('as keyword', () => {
    t.deepEqual(recovery('continue', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ContinueStatement',
          label: null,
          start: 0,
          end: 8,

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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });
});
