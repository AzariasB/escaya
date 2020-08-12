import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Async Arrows', () => {
  it('async () =>(', () => {
    t.deepEqual(recovery('async () =>(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                start: 11,
                end: 12,
                kind: 189,
                flags: 0
              },
              start: 11,
              end: 12,
              kind: 187,
              flags: 0
            },
            async: true,
            start: 0,
            end: 12,
            kind: 188,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async () =>(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
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

  it('async (() =>', () => {
    t.deepEqual(recovery('async (() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 0,
              end: 5,
              kind: 13,
              flags: 0
            },
            arguments: [
              {
                type: 'ArrowFunction',
                params: [],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 12,
                    end: 12,
                    kind: 13,
                    flags: 2
                  },
                  start: 12,
                  end: 12,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 7,
                end: 12,
                kind: 188,
                flags: 0
              }
            ],
            start: 0,
            end: 12,
            kind: 156,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: 'async (() =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 2
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

  it('(async () =>', () => {
    t.deepEqual(recovery('(async () =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrowFunction',
              params: [],
              contents: {
                type: 'ConciseBody',
                expression: {
                  type: 'IdentifierReference',
                  name: '',
                  start: 12,
                  end: 12,
                  kind: 13,
                  flags: 2
                },
                start: 12,
                end: 12,
                kind: 187,
                flags: 0
              },
              async: true,
              start: 1,
              end: 12,
              kind: 188,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '(async () =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 10,
          length: 2
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

  it('(() async =>() =>', () => {
    t.deepEqual(recovery('(() async =>() =>', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: '',
              start: 3,
              end: 3,
              kind: 13,
              flags: 2
            },
            start: 0,
            end: 3,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: {
              type: 'IdentifierReference',
              name: 'async',
              start: 3,
              end: 9,
              kind: 13,
              flags: 0
            },
            contents: {
              type: 'ConciseBody',
              expression: {
                type: 'ArrowFunction',
                params: [],
                contents: {
                  type: 'ConciseBody',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 17,
                    end: 17,
                    kind: 13,
                    flags: 2
                  },
                  start: 17,
                  end: 17,
                  kind: 187,
                  flags: 0
                },
                async: false,
                start: 12,
                end: 17,
                kind: 188,
                flags: 0
              },
              start: 12,
              end: 17,
              kind: 187,
              flags: 0
            },
            async: false,
            start: 3,
            end: 17,
            kind: 188,
            flags: 0
          },
          start: 3,
          end: 17,
          kind: 122,
          flags: 0
        }
      ],
      text: '(() async =>() =>',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`=>` expected',
          code: 46,
          start: 4,
          length: 5
        },
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 15,
          length: 2
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 17,
      end: 17
    });
  });
});
