import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Const', () => {
  it('const a;b;', () => {
    t.deepEqual(recovery('const a;b;', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'a',
                start: 5,
                end: 7,
                kind: 168,
                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 8,
          kind: 145,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'b',
            start: 8,
            end: 9,
            kind: 13,
            flags: 0
          },
          start: 8,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: 'const a;b;',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Missing initializer in destructuring declaration',
          code: 45,
          start: 7,
          length: 1
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

  it('const \nb;', () => {
    t.deepEqual(recovery('const \nb;', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 45,
          kind: 3,
          length: 1,
          message: 'Missing initializer in destructuring declaration',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 9,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 8,
                flags: 0,
                kind: 168,
                name: 'b',
                start: 5,
                type: 'BindingIdentifier'
              },
              end: 8,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 5,
              type: 'LexicalBinding'
            }
          ],
          end: 9,
          flags: 0,
          isConst: true,
          kind: 145,
          start: 0,
          type: 'LexicalDeclaration'
        }
      ],
      length: 9,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'const \nb;'
    });
  });

  it('const a\nb;', () => {
    t.deepEqual(recovery('const a\nb;', 'recovery.js'), {
      children: [],
      context: 0,
      detached: false,
      diagnostics: [
        {
          code: 45,
          kind: 3,
          length: 1,
          message: 'Missing initializer in destructuring declaration',
          source: 2,
          start: 8
        }
      ],
      directives: [],
      end: 10,
      fileName: 'recovery.js',
      incremental: false,
      kind: 209,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 7,
                flags: 0,
                kind: 168,
                name: 'a',
                start: 5,
                type: 'BindingIdentifier'
              },
              end: 7,
              flags: 0,
              initializer: null,
              kind: 146,
              start: 5,
              type: 'LexicalBinding'
            }
          ],
          end: 7,
          flags: 0,
          isConst: true,
          kind: 145,
          start: 0,
          type: 'LexicalDeclaration'
        },
        {
          end: 10,
          expression: {
            end: 9,
            flags: 0,
            kind: 13,
            name: 'b',
            start: 7,
            type: 'IdentifierReference'
          },
          flags: 0,
          kind: 122,
          start: 7,
          type: 'ExpressionStatement'
        }
      ],
      length: 10,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: 'const a\nb;'
    });
  });

  it('const', () => {
    t.deepEqual(recovery('const', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,
          kind: 145,
          flags: 0
        }
      ],
      text: 'const',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('const {', () => {
    t.deepEqual(recovery('const {', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [],
                start: 5,
                end: 7,
                kind: 169,
                flags: 0
              },
              initializer: null,
              start: 5,
              end: 7,
              kind: 146,
              flags: 0
            }
          ],
          start: 0,
          end: 7,
          kind: 145,
          flags: 0
        }
      ],
      text: 'const {',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 6,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 7,
      end: 7
    });
  });

  it('!{const ,,,', () => {
    t.deepEqual(recovery('!{const ,,,', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CommaOperator',
            expressions: [
              {
                type: 'UnaryExpression',
                operator: '!',
                operand: {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'IdentifierReference',
                      name: 'const',
                      start: 2,
                      end: 7,
                      kind: 13,
                      flags: 0
                    }
                  ],
                  start: 1,
                  end: 9,
                  kind: 179,
                  flags: 0
                },
                start: 0,
                end: 9,
                kind: 160,
                flags: 0
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 10,
                end: 10,
                kind: 13,
                flags: 2
              },
              {
                type: 'IdentifierReference',
                name: '',
                start: 11,
                end: 11,
                kind: 13,
                flags: 2
              }
            ],
            start: 0,
            end: 11,
            kind: 147,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: '!{const ,,,',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('const ({', () => {
    t.deepEqual(recovery('const ({', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          isConst: true,
          declarations: [],
          start: 0,
          end: 5,
          kind: 145,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 7,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 5,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 5,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: 'const ({',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
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
