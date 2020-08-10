import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Return', () => {
  it('with incomplete unary', () => {
    t.deepEqual(recovery('return !!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ReturnStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 9,
                end: 9,
                kind: 13,
                flags: 2
              },
              start: 8,
              end: 9,
              kind: 160,
              flags: 0
            },
            start: 6,
            end: 9,
            kind: 160,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 135,
          flags: 0
        }
      ],
      text: 'return !!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `return` statement can only be used within a function body.',
          code: 26,
          start: 0,
          length: 6
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
});
