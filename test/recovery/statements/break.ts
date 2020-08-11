import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Break', () => {
  it('as keyword', () => {
    t.deepEqual(recovery('break', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'BreakStatement',
          label: null,
          start: 0,
          end: 5,
          kind: 124,
          flags: 0
        }
      ],
      text: 'break',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'A `break` statement can only be used within an enclosing iteration or switch',
          code: 41,
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
});
