import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Switch', () => {
  // Invalid cases
  for (const arg of [
    'switch (x',
    'switch (x);',
    'switch (x) {',
    'switch {}',
    'switch (x) {  a();      for (;;) break b;      c(); }'
    // `if (x) {} else if (y) {} else var foo = 1; let foo = 1;`,
    //'switch(x) { default: break; case y: break; case z: break; default: break; }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  // Valid cases
  for (const arg of [
    'switch (A) {case B: C; default: D;}',
    'switch (A) {case B: C; case D: E;}',
    'switch (A) {case B: C; break; case D: E; break;}',
    'switch(a){case 1:default:}',
    'switch(a){default:case 2:}',
    'switch (x) { case x: function * f() {} }',
    'switch (answer) { case 0: hi(); break; default: break }',
    'switch(a){case 1:}',
    'switch (a) { case b: let [x] = y }',
    'switch (answer) { case 0: let a; }',
    'switch (x) { case y: this.x; }',
    'switch (x) { case y: this(x,z); }',
    'switch (x) { case y: this[z]; }',
    'switch (x) { case y:  a(); }',
    'switch (x) { default: b("c"); }',
    'switch (x) { case y: this[z]; }',
    'switch (x) { case y: this[z]; }',
    'switch (x) { case y: this[z]; }',

    'switch (A) {default: B;}',
    'switch (a) { case 99: switch (b) { } }',
    'switch (0) { case 1: var f; default: var f }',
    'switch (A) {default: B; break;}',
    'switch (A) {default: B;}',
    `switch (a) { default: let
      [] = y }`,
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
    `for (let f of [0]) { switch (1) { case 1:function f() {  } }}`,
    `switch (X) {}`,
    `switch (X) {
    case k:
      foo: bar: function f(){}
  }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('switch(null) {}', () => {
    t.deepEqual(parseScript('switch(null) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NullLiteral',
            value: null
          },
          clauses: []
        }
      ],
      webCompat: true
    });
  });

  it('switch(null) {}', () => {
    t.deepEqual(parseScript('switch(null) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NullLiteral',
            value: null
          },
          clauses: []
        }
      ],
      webCompat: true
    });
  });

  it('switch(null) { default: case foo: let x = y; }', () => {
    t.deepEqual(parseScript('switch(null) { default: case foo: let x = y; }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NullLiteral',
            value: null
          },
          clauses: [
            {
              type: 'DefaultClause',
              statements: []
            },
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'foo'
              },
              statements: [
                {
                  type: 'LexicalDeclaration',
                  kind: 'let',
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'x'
                      },
                      initializer: {
                        type: 'IdentifierReference',
                        name: 'y'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('switch(1) { case: foo; }', () => {
    t.deepEqual(parseScript('switch(1) { }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 1
          },
          clauses: []
        }
      ],
      webCompat: true
    });
  });
});
