import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Labelled', () => {
  it('missing label', () => {
    t.deepEqual(recovery('label: for(;;) break label \n /foo/', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [],
      directives: [],
      end: 34,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          end: 26,
          flags: 0,
          kind: 134,
          label: {
            end: 6,
            flags: 0,
            kind: 13,
            name: 'label',
            start: 0,
            type: 'LabelIdentifier'
          },
          labelledItem: {
            condition: null,
            end: 26,
            flags: 0,
            incrementor: null,
            initializer: null,
            kind: 132,
            start: 6,
            statement: {
              end: 26,
              flags: 0,
              kind: 124,
              label: {
                end: 26,
                flags: 0,
                kind: 13,
                name: 'label',
                start: 20,
                type: 'IdentifierReference'
              },
              start: 14,
              type: 'BreakStatement'
            },
            variableDeclarationList: false,
            type: 'ForStatement'
          },
          start: 0,
          type: 'LabelledStatement'
        },
        {
          end: 34,
          expression: {
            end: 34,
            flag: '',
            flags: 0,
            kind: 15,
            pattern: 'foo',
            start: 26,
            type: 'RegularExpressionLiteral'
          },
          flags: 0,
          kind: 122,
          start: 26,
          type: 'ExpressionStatement'
        }
      ],
      length: 34,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'label: for(;;) break label \n /foo/'
    });
  });

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
