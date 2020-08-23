import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Whith', () => {
  it('with(true) /a/', () => {
    t.deepEqual(recovery('with(true) /a/', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [],
      directives: [],
      end: 14,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          end: 14,
          expression: {
            end: 9,
            flags: 0,
            kind: 166,
            start: 5,
            type: 'BooleanLiteral',
            value: true
          },
          flags: 0,
          kind: 128,
          start: 0,
          statement: {
            end: 14,
            expression: {
              end: 14,
              flag: '',
              flags: 0,
              kind: 15,
              pattern: 'a',
              start: 10,
              type: 'RegularExpressionLiteral'
            },
            flags: 0,
            kind: 122,
            start: 10,
            type: 'ExpressionStatement'
          },
          type: 'WithStatement'
        }
      ],
      length: 14,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'with(true) /a/'
    });
  });

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
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 4,
      end: 4
    });
  });
});
