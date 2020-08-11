import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('leafs - Block', () => {
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
        parseScript(`${arg}`);
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
    `{}`,
    `{ let x }`,
    `{debugger;}`,
    `{a}`,
    `{ { var f; } var f }`,
    `{ function f() {} async function* f() {} }`,
    `{ function f() {} ; function f() {} }`,
    `{ if (x) function f() {} ; function f() {} }`,
    `{ async function f(){} } async function f(){}`,
    `{ let foo = 1; { let foo = 2; } }
    { let foo = 1; { let foo = 2; } }`,
    `{ let f = 123; if (false) ; else function f() {  } }`,
    `{ let x; } var x`,
    `{ var f; var f; }`,
    `{ function a(){} function a(){} }`,
    `{ function* f() {} async function f() {} }`,
    `{ function let(){} }`,
    `{ async *[await = 5]()
      {}
    }`,
    `{ (x = [yield]) }`,
    `{ (x = [yield]) => z }`,
    `{ function f(){} async function f(){} }`,
    `{}[];;`,
    `{}() => 42;;`,
    `{}{x: 42};;`,
    `{}let a, b = 42, c;b;;`,
    `{length: 3000}[];;`,
    `{length: 3000}{};`,
    'class C {}[];;',
    `{ let f = 123; { function f() {  } } }`,
    `{ function f() { a = f; f = 123; b = f; return x; } }`,
    `function x() { { var f; var f } }`,
    `class C {}() => { return 42; };;`,
    `function fn() {}{x: 42};;`,
    `function fn() {}let a, b = 42, c;b;;`,
    `{}/1/;;`,
    `function f() {let f}`,
    `"use strict"; { function f() {} function f() {} }`,
    `{ function *f(){} } function *f(){}`,
    `var x; { let x; }`,
    `function f(){} function f(){}`,
    `{ function f(){} } function f(){}`,
    `{}
      /foo/`,
    `{
        let result;
        let x = 1;
        switch (x) {
          case 1:
            let x = 2;
            result = x;
            break;
          default:
            result = 0;
            break;
        }
      }`,
    `{ function* f() {} function* f() {} }`,
    'switch(x) { case y: (foo) }',
    'switch(x) { case y: (foo, bar) }',
    'switch(x) { case y: (foo) = (foo) /* comment */ - b }',
    'switch(x) { case y: foo } // comment',
    'var x; { let x; }',
    '{ let x; } var x',
    '{ function let(){} }',
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
        parseScript(`${arg}`);
      });
    });
    //    it(`${arg}`, () => {
    //    t.doesNotThrow(() => {
    //    parseModule(`${arg}`);
    //});
    //});
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }

  it('simple block', () => {
    t.deepEqual(parseScript('{}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2
        }
      ],
      start: 0,
      end: 2
    });
  });

  it('block with lexical', () => {
    t.deepEqual(parseScript('{let foo = bar;}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'LexicalDeclaration',
              isConst: false,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'foo',
                    start: 5,
                    end: 8
                  },
                  initializer: {
                    type: 'IdentifierReference',
                    name: 'bar',
                    start: 11,
                    end: 14
                  },
                  start: 5,
                  end: 14
                }
              ],
              start: 1,
              end: 15
            }
          ],
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('block wrapped in paren', () => {
    t.deepEqual(parseScript('({})'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 3
            },
            start: 0,
            end: 4
          },
          start: 0,
          end: 4
        }
      ],
      start: 0,
      end: 4
    });
  });

  it('with ; separation', () => {
    t.deepEqual(parseScript('{};{};;;;{};'), {
      directives: [],
      end: 12,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 3,
          start: 2,
          type: 'EmptyStatement'
        },
        {
          end: 5,
          start: 3,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 5,
          type: 'EmptyStatement'
        },
        {
          end: 7,
          start: 6,
          type: 'EmptyStatement'
        },
        {
          end: 8,
          start: 7,
          type: 'EmptyStatement'
        },
        {
          end: 9,
          start: 8,
          type: 'EmptyStatement'
        },
        {
          end: 11,
          start: 9,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 12,
          start: 11,
          type: 'EmptyStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('same level', () => {
    t.deepEqual(parseScript('{}{}{}'), {
      directives: [],
      end: 6,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 4,
          start: 2,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 4,
          leafs: [],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('nested', () => {
    t.deepEqual(parseScript('{{}}'), {
      directives: [],
      end: 4,
      start: 0,
      leafs: [
        {
          end: 4,
          start: 0,
          leafs: [
            {
              end: 3,
              start: 1,
              leafs: [],
              type: 'BlockStatement'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });
});
