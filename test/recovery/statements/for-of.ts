import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - For of', () => {
  it('missing ident plus if statement mixed in', () => {
    t.deepEqual(recovery('for (of if{)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'IdentifierReference',
            kind: 13,
            name: 'of',
            start: 5,
            end: 7,
            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 7,
            end: 7,
            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            kind: 13,
            name: '',
            start: 7,
            end: 7,
            flags: 2
          },
          statement: {
            type: 'IfStatement',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 10,
              end: 11,
              kind: 179,
              flags: 0
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                kind: 13,
                name: '',
                start: 12,
                end: 12,
                flags: 2
              },
              start: 12,
              end: 12,
              kind: 122,
              flags: 0
            },
            alternate: null,
            start: 7,
            end: 12,
            kind: 133,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 132,
          flags: 0
        }
      ],
      text: 'for (of if{)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 5,
          start: 8,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 11,
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
        start: 12,
        end: 12
      },
      start: 0,
      length: 12,
      end: 12
    });
  });
});
