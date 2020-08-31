import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Labelled', () => {
  for (const arg of [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'null',
    'true',
    'false',
    'enum'
  ]) {
    it(`${arg}:`, () => {
      t.throws(() => {
        parseScript(`${arg}:`);
      });
    });
    it(`${arg}:x`, () => {
      t.throws(() => {
        parseScript(`${arg}:x`);
      });
    });
  }

  // Invalid cases
  for (const arg of [
    'switch/(":',
    'label: class C {};',
    'label: let x;',
    'a: async function* a(){}',
    'label: function* g() {}',
    'do { test262: { continue test262; } } while (false)',
    '() => {super: while(true) { break super; }}"',
    'false: ;',
    '(async function*() { yield: 1; });',
    'yield: { function *f(){ break await; } }',
    'bar: foo: ding: foo: x',
    'foo: bar: foo: x',
    'foo:for;',
    //'await: 1;',
    //'await\nx:;',
    'L: let\n [a] = 0;',
    '"use strict"; label: function g() {}',
    'foo\n/x/g:',
    '123:\n',
    'bar:',
    'x:£',
    'label catch:',
    'catch: (x) { case y: {...x} }:',
    'finally: (x) { case y: foo /a/ }:',
    'for: (x) { case y:{ class { x() {} } }}',
    'twitter: ({x=y}) { case y: [...a] }',
    'function *f(){ yield: x; }',
    'await: { async function f(){ break await; } }',
    'await: { function *f(){ break await; } }',
    'yield: { function *f(){ break await; } }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Invalid cases - WebCompat off
  for (const arg of ['label: function* g() {}', 'label: function* g() {}']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'a: "b", c',
    'yield: await',
    'L: let\nx',
    'L: let\n{x}',
    'let: 34',
    'let: x',
    'foo: x;',
    'yield: x',
    'await: x',
    'foo: /bar/',
    'foo: \n /bar/g',
    'label: for(;;) break label \n /foo/',
    'foo: for(;;) for (;;) continue foo',
    'yield: 34',
    'a: b, c',
    'foo: for(;;) { for (;;) continue foo }',
    'foo: bar: for(;;) { for (;;) continue foo }',
    'foo: for(;;) { bar: for (;;) continue foo }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('yield: x', () => {
    t.deepEqual(parseScript('yield: x', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'yield',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 7,
              end: 8
            },
            start: 7,
            end: 8
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });

  it('a:b;!c', () => {
    t.deepEqual(parseScript('a:b;!c', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'a',
            start: 0,
            end: 2
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'b',
              start: 2,
              end: 3
            },
            start: 2,
            end: 4
          },
          start: 0,
          end: 4
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            operand: {
              type: 'IdentifierReference',
              name: 'c',
              start: 5,
              end: 6
            },
            start: 4,
            end: 6
          },
          start: 4,
          end: 6
        }
      ],
      start: 0,
      end: 6
    });
  });

  it('await: x', () => {
    t.deepEqual(parseScript('await: x', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'await',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 7,
              end: 8
            },
            start: 7,
            end: 8
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });

  it('foo: bar;', () => {
    t.deepEqual(parseScript('foo: bar;', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'foo',
            start: 0,
            end: 4
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'bar',
              start: 5,
              end: 8
            },
            start: 5,
            end: 9
          },
          start: 0,
          end: 9
        }
      ],
      start: 0,
      end: 9
    });
  });

  it('await: while (await) { continue await; }', () => {
    t.deepEqual(parseScript('await: while (await) { continue await; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'await',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'await',
              start: 14,
              end: 19
            },
            statement: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ContinueStatement',
                  label: {
                    type: 'IdentifierReference',
                    name: 'await',
                    start: 32,
                    end: 37
                  },
                  start: 23,
                  end: 38
                }
              ],
              start: 21,
              end: 40
            },
            start: 7,
            end: 40
          },
          start: 0,
          end: 40
        }
      ],
      start: 0,
      end: 40
    });
  });

  it('async: while (async) { continue async; }', () => {
    t.deepEqual(parseScript('async: while (async) { continue async; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'async',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'WhileStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'async',
              start: 14,
              end: 19
            },
            statement: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ContinueStatement',
                  label: {
                    type: 'IdentifierReference',
                    name: 'async',
                    start: 32,
                    end: 37
                  },
                  start: 23,
                  end: 38
                }
              ],
              start: 21,
              end: 40
            },
            start: 7,
            end: 40
          },
          start: 0,
          end: 40
        }
      ],
      start: 0,
      end: 40
    });
  });

  it('let: foo', () => {
    t.deepEqual(parseScript('let: foo', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'let',
            start: 0,
            end: 4
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 5,
              end: 8
            },
            start: 5,
            end: 8
          },
          start: 0,
          end: 8
        }
      ],
      start: 0,
      end: 8
    });
  });

  it('yield: await', () => {
    t.deepEqual(parseScript('yield: await', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'yield',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'await',
              start: 7,
              end: 12
            },
            start: 7,
            end: 12
          },
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('__proto__: test', () => {
    t.deepEqual(parseScript('__proto__: test', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: '__proto__',
            start: 0,
            end: 10
          },
          labelledItem: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'test',
              start: 11,
              end: 15
            },
            start: 11,
            end: 15
          },
          start: 0,
          end: 15
        }
      ],
      start: 0,
      end: 15
    });
  });

  it('a:{break a;}', () => {
    t.deepEqual(parseScript('a:{break a;}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'a',
            start: 0,
            end: 2
          },
          labelledItem: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'BreakStatement',
                label: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 9,
                  end: 10
                },
                start: 3,
                end: 11
              }
            ],
            start: 2,
            end: 12
          },
          start: 0,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });

  it('start: while (true) break start', () => {
    t.deepEqual(parseScript('start: while (true) break start', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'start',
            start: 0,
            end: 6
          },
          labelledItem: {
            type: 'WhileStatement',
            expression: {
              type: 'BooleanLiteral',
              value: true,
              start: 14,
              end: 18
            },
            statement: {
              type: 'BreakStatement',
              label: {
                type: 'IdentifierReference',
                name: 'start',
                start: 26,
                end: 31
              },
              start: 20,
              end: 31
            },
            start: 7,
            end: 31
          },
          start: 0,
          end: 31
        }
      ],
      start: 0,
      end: 31
    });
  });

  it('function w(casecase){y:j:function casecase(){}}', () => {
    t.deepEqual(parseScript('function w(casecase){y:j:function casecase(){}}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'w',
            start: 9,
            end: 10
          },
          generator: false,
          async: false,
          params: [
            {
              type: 'BindingIdentifier',
              name: 'casecase',
              start: 11,
              end: 19
            }
          ],
          contents: {
            type: 'FunctionBody',
            directives: [],
            leafs: [
              {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'y',
                  start: 21,
                  end: 23
                },
                labelledItem: {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'j',
                    start: 23,
                    end: 25
                  },
                  labelledItem: {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'casecase',
                      start: 34,
                      end: 42
                    },
                    generator: false,
                    async: false,
                    params: [],
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 44,
                      end: 46
                    },
                    start: 25,
                    end: 46
                  },
                  start: 23,
                  end: 46
                },
                start: 21,
                end: 46
              }
            ],
            start: 20,
            end: 47
          },
          start: 0,
          end: 47
        }
      ],
      start: 0,
      end: 47
    });
  });

  it(`foo:
  /bar/`, () => {
    t.deepEqual(
      parseScript(
        `foo:
    /bar/`,
        { loc: true }
      ),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'foo',
              start: 0,
              end: 4
            },
            labelledItem: {
              type: 'ExpressionStatement',
              expression: {
                type: 'RegularExpressionLiteral',
                pattern: 'bar',
                flag: '',
                start: 9,
                end: 14
              },
              start: 9,
              end: 14
            },
            start: 0,
            end: 14
          }
        ],
        start: 0,
        end: 14
      }
    );
  });
});
