import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Debugger', () => {
  it('followed by incomplete unary expr', () => {
    t.deepEqual(recovery('debugger; !!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'DebuggerStatement',
          start: 0,
          end: 9,
          kind: 126,
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
                kind: 13,
                name: '',
                start: 12,
                end: 12,
                flags: 2
              },
              start: 11,
              end: 12,
              kind: 160,
              flags: 0
            },
            start: 9,
            end: 12,
            kind: 160,
            flags: 0
          },
          start: 9,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'debugger; !!',
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
});
