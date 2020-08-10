import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Whith', () => {
  it('as keyword', () => {
    t.deepEqual(recovery('with', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 4,
            end: 4,
            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              kind: 13,
              name: '',
              start: 4,
              end: 4,
              flags: 2
            },
            start: 4,
            end: 4,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 128,
          flags: 0
        }
      ],
      text: 'with',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 0,
          length: 4
        }
      ],
      intersectsChange: false,
      hasBeenIncrementallyParsed: false,
      parent: null,
      children: [],
      endOfFileToken: {
        type: 'bilat',
        kind: 16384,
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });
});
