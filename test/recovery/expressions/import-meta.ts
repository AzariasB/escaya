import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Import meta', () => {
  it('import.meta(', () => {
    t.deepEqual(recovery('import.meta(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ImportCall',
            import: {
              type: 'CallExpression',
              expression: {
                type: 'MemberExpression',
                member: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 6,
                  end: 6,
                  kind: 13,
                  flags: 2
                },
                expression: {
                  type: 'IdentifierName',
                  name: 'meta',
                  start: 7,
                  end: 11,
                  kind: 13,
                  flags: 0
                },
                computed: false,
                start: 6,
                end: 11,
                kind: 154,
                flags: 0
              },
              arguments: [],
              start: 6,
              end: 12,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 199,
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
          message: '`(` expected',
          code: 5,
          start: 6,
          length: 1
        },
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
