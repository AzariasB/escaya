import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Continue', () => {
  // Invalid cases
  for (const arg of [
    'switch/("',
    'switch\nx;',
    'switch\n/x/g',
    'switch\n',
    'switch',
    'switch catch',
    'switch(x) { case y: {...x} }',
    'switch(x) { case y: foo /a/ }',
    'switch(x) { case y:{ class { x() {} } }}'
    //'switch({x=y}) { case y: [...a] }'
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

  it('foo: bar: do continue foo; while(z)', () => {
    t.deepEqual(parseScript('foo: bar: do continue foo; while(z)', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
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
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',

                  name: 'bar',
                  start: 5,
                  end: 9
                },
                labelledItem: {
                  type: 'DoWhileStatement',
                  expression: {
                    type: 'IdentifierReference',

                    name: 'z',
                    start: 33,
                    end: 34
                  },
                  statement: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'IdentifierReference',

                      name: 'foo',
                      start: 22,
                      end: 25
                    },
                    start: 13,
                    end: 26
                  },
                  start: 10,
                  end: 35
                },
                start: 5,
                end: 35
              },
              start: 5,
              end: 35
            },
            start: 0,
            end: 35
          },
          start: 0,
          end: 35
        }
      ],
      start: 0,
      end: 35
    });
  });

  it('while (true) { x: while (true) continue x; }', () => {
    t.deepEqual(parseScript('while (true) { x: while (true) continue x; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 7,
            end: 11
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'LabelledStatement',
                  label: {
                    type: 'LabelIdentifier',
                    name: 'x',
                    start: 15,
                    end: 17
                  },
                  labelledItem: {
                    type: 'WhileStatement',
                    expression: {
                      type: 'BooleanLiteral',
                      value: true,
                      start: 25,
                      end: 29
                    },
                    statement: {
                      type: 'ContinueStatement',
                      label: {
                        type: 'IdentifierReference',
                        name: 'x',
                        start: 40,
                        end: 41
                      },
                      start: 31,
                      end: 42
                    },
                    start: 18,
                    end: 42
                  },
                  start: 15,
                  end: 42
                },
                start: 15,
                end: 42
              }
            ],
            start: 13,
            end: 44
          },
          start: 0,
          end: 44
        }
      ],
      start: 0,
      end: 44
    });
  });
});
