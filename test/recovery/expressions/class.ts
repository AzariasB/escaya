import * as t from 'assert';
import { recovery } from '../../../src/escaya';

// See the tests for Class declaration for more Class tests

describe('Recovery - Expressions - Class', () => {
  it('class', () => {
    t.deepEqual(recovery('class', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ClassDeclaration',
          name: null,
          heritage: null,
          elements: [],
          start: 0,
          end: 5,
          kind: 150,
          flags: 0
        }
      ],
      text: 'class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 3,
          source: 2,
          message: 'Class declaration require a name in this context',
          code: 11,
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

  it('(class', () => {
    t.deepEqual(recovery('(class', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ClassExpression',
              name: null,
              heritage: null,
              elements: [],
              start: 1,
              end: 6,
              kind: 149,
              flags: 0
            },
            start: 0,
            end: 6,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '(class',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 1,
          length: 5
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

  it('(class baz { static bar(); }', () => {
    t.deepEqual(recovery('(class baz { static bar(); }', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ClassExpression',
              name: {
                type: 'BindingIdentifier',
                name: 'baz',
                start: 6,
                end: 10,
                kind: 168,
                flags: 0
              },
              heritage: null,
              elements: [
                {
                  type: 'ClassElement',
                  static: true,
                  method: {
                    type: 'MethodDefinition',
                    async: false,
                    generator: false,
                    propertySetParameterList: [],
                    uniqueFormalParameters: [],
                    name: {
                      type: 'IdentifierName',
                      name: 'bar',
                      start: 19,
                      end: 23,
                      kind: 13,
                      flags: 0
                    },
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 25,
                      end: 25,
                      kind: 184,
                      flags: 0
                    },
                    start: 23,
                    end: 25,
                    kind: 182,
                    flags: 0
                  },
                  start: 19,
                  end: 25,
                  kind: 151,
                  flags: 0
                },
                {
                  type: 'Semicolon',
                  start: 25,
                  end: 26,
                  kind: 28,
                  flags: 0
                }
              ],
              start: 1,
              end: 28,
              kind: 149,
              flags: 0
            },
            start: 0,
            end: 28,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 28,
          kind: 122,
          flags: 0
        }
      ],
      text: '(class baz { static bar(); }',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`{` expected',
          code: 5,
          start: 25,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 27,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 28,
      end: 28
    });
  });
});
