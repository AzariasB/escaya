import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Labeled', () => {
  // Invalid cases
  for (const arg of [
    '() => return',
    'return;return',
    `{return
    foo}`,
    'return foo;',
    'return',
    `return
   /x/`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    `yield: x`,
    `await: x`,
    `foo: bar;`,
    `foo:
    /bar/`,
    `foo:/bar/`,
    `await: while (await) { continue await; }`,
    `async: while (async) { continue async; }`,
    `let: foo`,
    `yield: await`,
    `__proto__: test`,
    `a:{break a;}`,
    `start: while (true) break start`,
    `a: b;`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('x: y', () => {
    t.deepEqual(parseScript('x: y'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'x'
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'y'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('await: while (await) { continue await; }', () => {
    t.deepEqual(parseScript('await: while (await) { continue await; }'), {
      directives: [],
      leafs: [
        {
          label: {
            name: 'await',
            type: 'LabelIdentifier'
          },
          labelledItem: {
            expression: {
              name: 'await',
              type: 'IdentifierReference'
            },
            statement: {
              statements: [
                {
                  label: {
                    name: 'await',
                    type: 'LabelIdentifier'
                  },
                  type: 'ContinueStatement'
                }
              ],
              type: 'BlockStatement'
            },
            type: 'WhileStatement'
          },
          type: 'LabelledStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('yield: x', () => {
    t.deepEqual(parseScript('yield: x'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'yield'
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('await: x', () => {
    t.deepEqual(parseScript('await: x'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'await'
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('function w(casecase){y:j:function casecase(){}}', () => {
    t.deepEqual(parseScript('function w(casecase){y:j:function casecase(){}}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'w'
          },
          params: {
            type: 'FormalParameters',
            leafs: [
              {
                type: 'BindingElement',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'casecase'
                },
                initializer: null
              }
            ]
          },
          contents: {
            type: 'FunctionBody',
            statements: [
              {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'y'
                },
                labelledItem: {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'j'
                  },
                  labelledItem: {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'casecase'
                    },
                    params: { leafs: [], type: 'FormalParameters' },
                    contents: {
                      type: 'FunctionBody',
                      statements: [],
                      directives: []
                    },
                    async: false,
                    generator: false
                  }
                }
              }
            ],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });
  it('async: async', () => {
    t.deepEqual(parseScript('async: async'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'async'
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'async'
            }
          }
        }
      ],
      webCompat: true
    });
  });
  it('__proto__: test', () => {
    t.deepEqual(parseScript('__proto__: test'), {
      directives: [],
      leafs: [
        {
          label: {
            name: '__proto__',
            type: 'LabelIdentifier'
          },
          labelledItem: {
            expression: {
              name: 'test',
              type: 'IdentifierReference'
            },
            type: 'ExpressionStatement'
          },
          type: 'LabelledStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
