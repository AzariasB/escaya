import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Labelled', () => {
  it('missing label', () => {
    t.deepEqual(recovery('foo:', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'foo',
            start: 0,
            end: 4,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });
  it('async ident with missing label', () => {
    t.deepEqual(recovery('async:', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'async',
            start: 0,
            end: 6,
            kind: 13,
            flags: 0
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 6,
              end: 6,
              kind: 13,
              flags: 2
            },
            start: 6,
            end: 6,
            kind: 122,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 134,
          flags: 0
        }
      ],
      text: 'async:',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 5,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 6,
      end: 6
    });
  });
});
