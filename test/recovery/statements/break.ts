import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Break', () => {
  it('foo: do break foo; while(foo);', () => {
    t.deepEqual(recovery('foo: do break foo; while(foo);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'foo',
            start: 0,
            end: 4,

            flags: 0
          },
          labelledItem: {
            type: 'DoWhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 25,
              end: 28,

              flags: 0
            },
            statement: {
              type: 'BreakStatement',
              label: {
                type: 'IdentifierReference',
                name: 'foo',
                start: 13,
                end: 17,

                flags: 0
              },
              start: 7,
              end: 18,

              flags: 0
            },
            start: 4,
            end: 30,

            flags: 0
          },
          start: 0,
          end: 30,

          flags: 0
        }
      ],
      text: 'foo: do break foo; while(foo);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 30,
      end: 30
    });
  });

  it('while (x) break', () => {
    t.deepEqual(recovery('while (x) break', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 7,
            end: 8,

            flags: 0
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 9,
            end: 15,

            flags: 0
          },
          start: 0,
          end: 15,

          flags: 0
        }
      ],
      text: 'while (x) break',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('for (x of y) break', () => {
    t.deepEqual(recovery('for (x of y) break', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'IdentifierReference',
            name: 'x',
            start: 5,
            end: 6,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'y',
            start: 9,
            end: 11,

            flags: 0
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 12,
            end: 18,

            flags: 0
          },
          await: false,
          start: 0,
          end: 18,

          flags: 0
        }
      ],
      text: 'for (x of y) break',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 18,
      end: 18
    });
  });

  it('do break; while(foo);', () => {
    t.deepEqual(recovery('do break; while(foo);', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo',
            start: 16,
            end: 19,

            flags: 0
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 2,
            end: 9,

            flags: 0
          },
          start: 0,
          end: 21,

          flags: 0
        }
      ],
      text: 'do break; while(foo);',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });

  it('as keyword', () => {
    t.deepEqual(recovery('break', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'BreakStatement',
          label: null,
          start: 0,
          end: 5,

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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });
});
