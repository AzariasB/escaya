import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Import meta', () => {
  it('import.meta(', () => {
    t.deepEqual(recovery('import.meta(', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'ImportMeta',
              start: 0,
              end: 11,
              kind: 228,
              flags: 0
            },
            arguments: [],
            start: 0,
            end: 12,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'import.meta(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
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
