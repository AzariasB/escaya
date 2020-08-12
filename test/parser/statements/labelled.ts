import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Labelled', () => {
  // Invalid cases
  for (const arg of [
    'switch/(":',
    // 'await\nx:;',
    'foo\n/x/g:',
    '123:\n',
    'bar:',
    'x:£',
    'label catch:',
    'catch: (x) { case y: {...x} }:',
    'finally: (x) { case y: foo /a/ }:',
    'for: (x) { case y:{ class { x() {} } }}',
    'twitter: ({x=y}) { case y: [...a] }'
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

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'switch(x) /* comment */ { case y: foo }',
    'switch([x = y]) { case y: foo }',
    'switch([/a/]) { case y: !x }',
    'switch(x) { case y: {x = b} }',
    'switch(x) { case y: [a / b] }',
    'switch(x) { case y: [a / b, c, (d)] }',
    'switch(x) { case y: a }',
    'switch(x) { case y: x(foo) }',
    'switch(x) { case y: foo=b; }',
    'switch(x) { case y: foo?.b?.c }',
    'switch(x) { case y: foo?.b?.[x] }',
    'switch(x) { case y: foo?.b?.c }',
    'switch(x) { case y: /a/ }',
    'switch(x) { case y: {x} }',
    'switch(x) { case y: x = {...x} }',
    'switch(x) { case y: foo / bar ? 1 : (x) }',
    'switch(x) { case y: foo / bar ? 1 : (x) => {}}',
    'switch(x) { case y: foo ? 1 : (x) => {}}',
    'switch({x:y}) { case y: [...a] }',
    'switch({x:y}) { case y: [...a] = b }',
    'switch(x/b(c)) { case y: foo }',
    'switch(x/b[c]) { case y: foo }',
    'switch(x/b[(c)]) { case y: foo }',
    'switch(x) { case y: (foo) }',
    'switch(x) { case y: (foo, bar) }',
    'switch(x) { case y: (foo) = (foo) /* comment */ - b }',
    'switch(x) { case y: foo } // comment',
    '// should be ignored - switch(x) { case y: foo }',
    'switch(x/a) { case y: foo }',
    'switch(a+b) { case y: foo }',
    'switch(x=y?!a:b++) { case y: foo }',
    'switch(x) { case y:{ foo }}',
    'switch(x) { case y:{ foo + b }}',
    'switch(x) { case y:{ foo(bar) }}',
    'switch(x) { case y:{ x = class { x() {} } } }',
    'switch(x) { case y:{ x = function  a(a){}  }}',
    'switch(x) { case y:{ x = async function  a(a) { await x;  }  }}',
    `switch (x) { default: function *f(){} function *f(){} }`,
    `switch (x) { default: async function *f(){} async function *f(){} }`,
    `switch (x) { case c: async function f(){} async function f(){} }`,
    `switch (x) { case a: var foo; break; default: var foo; break; }`,
    `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
    `switch (0) { case 1: var f; default: var f }`,
    `switch (x) { case a: var foo; break; default: var foo; break; }`,
    `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
    `switch (x) {case a: function f(){}; break; case b: function f(){}; break; }`,
    `switch (x) { case c: function *f(){} function *f(){} }`,
    `switch (0) { case 1: let f = 0; default: [f] }`,
    `switch (0) { case 1: let f = 0; default: [f] }
    switch (0) { case 1: let f = 0; default: [f] }`,
    `switch (0) { default: let f; if (false) ; else function f() {  } }`,
    `switch (0) { case 1: var f; default: var f; }`,
    `switch (x) { case c: function f(){} function f(){} }`,
    `switch (x) { case c: async function *f(){} async function *f(){} }`,
    `switch (0) { case 1: var f; default: var f; }
    switch (0) { case 1: var f; default: var f; }`,
    'switch (x) { case x: function * f() {} }',
    'switch (x) { case x: function * f() {} }',
    'switch(a){case 1:}',
    'switch (a) { case b: let [x] = y }',
    'switch (answer) { case 0: let a; }',
    'switch (x) { case y: this.x; }',
    'switch (x) { case y: this[z]; }',
    'switch (answer) { case 0: hi(); break; default: break }',
    'switch(a){case 1:}',
    'switch (a) { case b: let [x] = y }',
    'switch (answer) { case 0: let a; }',
    'switch (x) { case y: this.x; }',
    'switch (x) { case y: this(x,z); }',
    'switch (x) { case y: this[z]; }',
    'switch (x) { case y:  a(); }',
    'switch (x) { default: b("c"); }',
    'switch (0) { case 1: var f; default: var f }',
    'switch (x) { case a: var foo; break; default: var foo; break; }',
    'switch (0) { case 1: let f = 0; default: [f] }',
    'switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f',
    'switch (x) {case a: function f(){}; break; case b: function f(){}; break; }',
    `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f
    switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
    'switch (0) { case 1: let f = 0; x; default: let x; } var {f} = f',
    'switch (x) { case a: var foo; break; case b: var foo; break; }',
    'switch (0) { case 1: function f() {} default: async function f() {} }',
    'switch (0) { case 1: async function f() {} default: function f() {} }',
    'switch (x) { default: function *f(){} function *f(){} }',
    'switch (x) { case c: function *f(){} function *f(){} }'
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
