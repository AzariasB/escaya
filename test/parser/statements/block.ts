import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Block', () => {
  // Invalid cases
  for (const arg of [
    '{',
    '}',
    `{ let x; `,
    `{ var f; var`,
    `{ function a(){`,
    `{ function* f() {} async `,
    `{ function let{ }`,
    '}/("',
    '}\nx;',
    '}\n/x/g',
    '{\n',
    '{ catch',
    '{(x) { case y: {...x} }',
    '{(x) { case y: foo /a/ }',
    '{(x) { case y:{ class { x() {} } }}'
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
    '{name1: var1}',
    `{ async *[await = 5]()
      {}
    }`,
    '{ let x = 42 }',
    '{ let x }',
    '{ let x = 14, y = 3, z = 1977 }',
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
    'var x; { let x; }',
    '{ let x; } var x',
    '{ function let(){} }',
    '{}\n/foo/g'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
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
    t.deepEqual(parseScript('{}', { loc: true }), {
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
    t.deepEqual(parseScript('{let foo = bar;}', { loc: true }), {
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
    t.deepEqual(parseScript('({})', { loc: true }), {
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
    t.deepEqual(parseScript('{};{};;;;{};', { loc: true }), {
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
    t.deepEqual(parseScript('{}{}{}', { loc: true }), {
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
    t.deepEqual(parseScript('{{}}', { loc: true }), {
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
