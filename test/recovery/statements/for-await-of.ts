import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - For await of', () => {
  it('for await as two keywords', () => {
    t.deepEqual(recovery('for await', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 5,
          kind: 2,
          length: 5,
          message: '`(` expected',
          source: 2,
          start: 4
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
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          condition: {
            end: 9,
            flags: 2,
            kind: 13,
            start: 9,
            type: 'IdentifierReference',
            name: ''
          },
          end: 9,
          flags: 0,
          incrementor: {
            end: 9,
            flags: 2,
            kind: 13,
            start: 9,
            type: 'IdentifierReference',
            name: ''
          },
          initializer: {
            end: 9,
            flags: 0,
            kind: 13,
            start: 3,
            type: 'IdentifierReference',
            name: 'await'
          },
          kind: 132,
          start: 0,
          statement: {
            end: 9,
            expression: {
              end: 9,
              flags: 2,
              kind: 13,
              start: 9,
              type: 'IdentifierReference',
              name: ''
            },
            flags: 0,
            kind: 122,
            start: 9,
            type: 'ExpressionStatement'
          },
          type: 'ForStatement'
        }
      ],
      text: 'for await'
    });
  });
});
