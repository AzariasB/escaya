import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Import call', () => {
  it('import[]!', () => {
    t.deepEqual(recovery('import[]!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: null,
          moduleSpecifier: null,
          importClause: null,
          start: 0,
          end: 6,
          kind: 217,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayLiteral',
            elements: [],
            start: 6,
            end: 8,
            kind: 178,
            flags: 0
          },
          start: 6,
          end: 8,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: '',
              start: 9,
              end: 9,
              kind: 13,
              flags: 2
            },
            start: 8,
            end: 9,
            kind: 160,
            flags: 0
          },
          start: 8,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: 'import[]!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'The `import` keyword can only be used with the module goal',
          code: 95,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 8,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('import("") >>>= 2(!', () => {
    t.deepEqual(recovery('import("") >>>= 2(!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ImportCall',
              import: {
                type: 'StringLiteral',
                value: '',
                start: 7,
                end: 9,
                kind: 12,
                flags: 0
              },
              start: 0,
              end: 10,
              kind: 199,
              flags: 0
            },
            operator: '>>>=',
            right: {
              type: 'CallExpression',
              expression: {
                type: 'NumericLiteral',
                value: 2,
                start: 15,
                end: 17,
                kind: 10,
                flags: 0
              },
              arguments: [
                {
                  type: 'UnaryExpression',
                  operator: '!',
                  operand: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 19,
                    end: 19,
                    kind: 13,
                    flags: 2
                  },
                  start: 18,
                  end: 19,
                  kind: 160,
                  flags: 0
                }
              ],
              start: 15,
              end: 19,
              kind: 156,
              flags: 0
            },
            start: 0,
            end: 19,
            kind: 152,
            flags: 0
          },
          start: 0,
          end: 19,
          kind: 122,
          flags: 0
        }
      ],
      text: 'import("") >>>= 2(!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'The left-hand side of an assignment expression must be a variable or a property access',
          code: 97,
          start: 11,
          length: 4
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 18,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 19,
      end: 19
    });
  });

  it('import(!', () => {
    t.deepEqual(recovery('import(!', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ImportCall',
            import: {
              type: 'UnaryExpression',
              operator: '!',
              operand: {
                type: 'IdentifierReference',
                name: '',
                start: 8,
                end: 8,
                kind: 13,
                flags: 2
              },
              start: 7,
              end: 8,
              kind: 160,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 199,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'import(!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 7,
          length: 1
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
