import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Block', () => {
  it('missing label', () => {
    t.deepEqual(recovery('foo:', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              kind: 13,
              name: 'foo',
              start: 0,
              end: 4,
              flags: 0
            },
            labelledItem: {
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
            kind: 134,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        }
      ],
      text: 'foo:',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 3,
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
        start: 4,
        end: 4
      },
      start: 0,
      length: 4,
      end: 4
    });
  });
  it('async ident with missing label', () => {
    t.deepEqual(recovery('async:', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 7,
          kind: 2,
          length: 1,
          message: 'Expression expected',
          source: 2,
          start: 5
        }
      ],
      directives: [],
      end: 6,
      EOF: {
        end: 6,
        kind: 16384,
        start: 6,
        type: 'CST'
      },
      fileName: 'recovery.js',
      isIncremental: false,
      detached: false,
      kind: 209,
      length: 6,
      mutualFlags: 0,
      parent: null,
      start: 0,
      leafs: [
        {
          end: 6,
          expression: {
            end: 6,
            flags: 0,
            kind: 134,
            label: {
              end: 6,
              flags: 0,
              kind: 13,
              start: 0,
              type: 'LabelIdentifier',
              name: 'async'
            },
            labelledItem: {
              end: 6,
              expression: {
                end: 6,
                flags: 2,
                kind: 13,
                start: 6,
                type: 'IdentifierReference',
                name: ''
              },
              flags: 0,
              kind: 122,
              start: 6,
              type: 'ExpressionStatement'
            },
            start: 0,
            type: 'LabelledStatement'
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      text: 'async:'
    });
  });
});
