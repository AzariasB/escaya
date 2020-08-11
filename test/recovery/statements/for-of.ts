import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - For of', () => {
  it('for (let x in of if{)', () => {
    t.deepEqual(recovery('for (let x in of if{)', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 8,
                  end: 10,
                  kind: 168,
                  flags: 0
                },
                initializer: null,
                start: 8,
                end: 10,
                kind: 146,
                flags: 0
              }
            ],
            start: 5,
            end: 10,
            kind: 201,
            flags: 0
          },
          expression: {
            type: 'IdentifierReference',
            name: 'of',
            start: 13,
            end: 16,
            kind: 13,
            flags: 0
          },
          statement: {
            type: 'IfStatement',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 19,
              end: 20,
              kind: 179,
              flags: 0
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'IdentifierReference',
                name: '',
                start: 21,
                end: 21,
                kind: 13,
                flags: 2
              },
              start: 21,
              end: 21,
              kind: 122,
              flags: 0
            },
            alternate: null,
            start: 16,
            end: 21,
            kind: 133,
            flags: 0
          },
          start: 0,
          end: 21,
          kind: 130,
          flags: 0
        }
      ],
      text: 'for (let x in of if{)',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 17,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`(` expected',
          code: 5,
          start: 19,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });
});
