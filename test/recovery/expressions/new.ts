import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - New', () => {
  it('new.;', () => {
    t.deepEqual(recovery('new.;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            arguments: [],
            start: 0,
            end: 4,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new.;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 1
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

  it('new.target', () => {
    t.deepEqual(recovery('new.target', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 4,
              end: 4,
              kind: 13,
              flags: 2
            },
            arguments: [],
            start: 0,
            end: 4,
            kind: 163,
            flags: 0
          },
          start: 0,
          end: 4,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'target',
            start: 4,
            end: 10,
            kind: 13,
            flags: 0
          },
          start: 4,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'new.target',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 4,
          length: 6
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

  it('function x() { new.foo', () => {
    t.deepEqual(recovery('function x() { new.foo', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'NewTarget',
                  start: 14,
                  end: 22,
                  kind: 198,
                  flags: 0
                },
                start: 14,
                end: 22,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 22,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 22,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function x() { new.foo',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`foo` is not a valid meta-property for keyword `new`.',
          code: 93,
          start: 19,
          length: 3
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 22,
      end: 22
    });
  });

  it('function x() { new.!!', () => {
    t.deepEqual(recovery('function x() { new.!!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x',
            start: 8,
            end: 10,
            kind: 168,
            flags: 0
          },
          generator: false,
          async: false,
          params: [],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'NewTarget',
                  start: 14,
                  end: 20,
                  kind: 198,
                  flags: 0
                },
                start: 14,
                end: 20,
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
                    start: 21,
                    end: 21,
                    kind: 13,
                    flags: 2
                  },
                  start: 20,
                  end: 21,
                  kind: 160,
                  flags: 0
                },
                start: 20,
                end: 21,
                kind: 122,
                flags: 0
              }
            ],
            start: 12,
            end: 21,
            kind: 184,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 186,
          flags: 0
        }
      ],
      text: 'function x() { new.!!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: '`new` is not a valid meta-property for keyword `new`.',
          code: 93,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 20,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 21,
      end: 21
    });
  });
});
