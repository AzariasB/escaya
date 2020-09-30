import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - For in', () => {
  it('missing parenthesis', () => {
    t.deepEqual(recovery('for (x in y', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,

              flags: 2
            },
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'for (x in y',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('for (/a in', () => {
    t.deepEqual(recovery('for (/a in', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          variableDeclarationList: false,
          initializer: {
            type: 'RegularExpressionLiteral',
            pattern: 'a i',
            flag: '',
            start: 5,
            end: 10,

            flags: 0
          },
          condition: {
            type: 'IdentifierReference',
            name: '',
            start: 10,
            end: 10,

            flags: 2
          },
          incrementor: {
            type: 'IdentifierReference',
            name: '',
            start: 10,
            end: 10,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 10,
              end: 10,

              flags: 2
            },
            start: 10,
            end: 10,

            flags: 0
          },
          start: 0,
          end: 10,
          flags: 0
        }
      ],
      text: 'for (/a in',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Unterminated regular expression',
          code: 12,
          start: 5,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('for (/a/ in', () => {
    t.deepEqual(recovery('for (/a/ in', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'RegularExpressionLiteral',
            pattern: 'a',
            flag: '',
            start: 5,
            end: 8,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 11,
            end: 11,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 11,
              end: 11,

              flags: 2
            },
            start: 11,
            end: 11,

            flags: 0
          },
          start: 0,
          end: 11,

          flags: 0
        }
      ],
      text: 'for (/a/ in',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Invalid left-hand side in for-loop',
          code: 104,
          start: 5,
          length: 6
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 9,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('for({} = x in y) {}', () => {
    t.deepEqual(recovery('for({} = x in y) {}', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 104,
          kind: 3,
          length: 11,
          message: 'Invalid left-hand side in for-loop',
          source: 2,
          start: 4
        }
      ],
      directives: [],
      end: 19,
      fileName: 'recovery.js',
      incremental: false,

      type: 'RootNode',
      webCompat: true,
      leafs: [
        {
          end: 19,
          expression: {
            end: 15,
            flags: 0,

            name: 'y',
            start: 13,
            type: 'IdentifierReference'
          },
          flags: 0,
          initializer: {
            end: 10,
            flags: 0,

            left: {
              end: 6,
              flags: 0,

              properties: [],
              start: 4,
              type: 'ObjectAssignmentPattern'
            },
            right: {
              end: 10,
              flags: 0,

              name: 'x',
              start: 8,
              type: 'IdentifierReference'
            },
            start: 4,
            type: 'AssignmentElement'
          },

          start: 0,
          statement: {
            end: 19,
            flags: 0,
            leafs: [],
            start: 16,
            type: 'BlockStatement'
          },
          type: 'ForInStatement'
        }
      ],
      length: 19,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'for({} = x in y) {}'
    });
  });

  it('for (5 in []) {}', () => {
    t.deepEqual(recovery('for (5 in []) {}', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'NumericLiteral',

            value: 5,
            start: 5,
            end: 6,
            flags: 0
          },
          expression: {
            type: 'ArrayLiteral',
            elements: [],
            start: 9,
            end: 12,
            flags: 0
          },
          statement: {
            type: 'BlockStatement',
            leafs: [],
            start: 13,
            end: 16,
            flags: 0
          },
          start: 0,
          end: 16,

          flags: 0
        }
      ],
      text: 'for (5 in []) {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          code: 104,
          kind: 3,
          length: 6,
          message: 'Invalid left-hand side in for-loop',
          source: 2,
          start: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('for(x in', () => {
    t.deepEqual(recovery('for(x in', 'recovery.js'), {
      type: 'RootNode',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'IdentifierReference',
            name: 'x',
            start: 4,
            end: 5,

            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: '',
            start: 8,
            end: 8,

            flags: 2
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 8,
              end: 8,

              flags: 2
            },
            start: 8,
            end: 8,

            flags: 0
          },
          start: 0,
          end: 8,

          flags: 0
        }
      ],
      text: 'for(x in',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 6,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });
});
