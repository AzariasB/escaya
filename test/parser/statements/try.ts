import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Try', () => {
  // Invalid cases
  for (const arg of [
    'try ',
    'try {',
    'try {}',
    'try catch',
    'try ()',
    `try {} catch (e) {}
/foo`,
    'try {} catch (x',
    'try {};',
    'try {} catch [] {}',
    'try {} catch(e, f){}',
    'try {} catch foo {}',
    'try {} catch([e]=x){}',
    `try {}
catch (v = b) {}`,
    'try {} catch(){}',
    'try {} catch(e,){}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    `try {} catch (e) {}
     /foo/`,
    `try {} finally {}
     /foo/g`,
    'try {} finally {}',
    'try {} catch([e=x]){}',
    'try {} catch({e=x}){}',
    'try {} catch(e){}',
    'try {} catch ({}) {}',
    `try {} catch (foo) { try {} catch (_) { var foo; } }`,
    `try { } catch (e) { async function f(){} async function f(){} }`,
    `try { } catch (e) { async function *f(){} async function *f(){} }`,
    `try { } catch (e) { function *f(){} function *f(){} }`,
    `try { } finally { async function f(){} async function f(){} }`,
    `try { } finally { function f(){} function f(){} }`,
    `try { } finally { const y = x }`,
    `try { } catch (e) { const y = x }`,
    `try {} catch (foo) { { let foo; } }
    try {} catch (foo) { { let foo; } }`,
    `try {} catch (foo) { function x() { var foo; } }`,
    `try {} catch (foo) { function x(foo) {} }`,
    `try {} catch(x) { x = 0; }`,
    `try {} catch(x) { with ({}) { x = 1; } }`,
    `try {} catch(x) { with ({}) { x = 1; } }
    try {} catch(x) { with ({}) { x = 1; } }`,
    `try {} catch (foo) {} var foo;`,
    `try { } catch (a) { { const a = b; } }`,
    `var foo; try {} catch (_) { const foo = 1; }`,
    `try {} catch (foo) { { let foo; } }`,
    `try {} catch (foo) { { let foo; } }
    try {} catch (foo) { { let foo; } }`,
    `var foo; try {} catch (_) { let foo; }`,
    `try {} catch (e) { { let e = x; } }`,
    `try {} catch (foo) {} let foo;`,
    `try {} catch (e) { let b = x; }`,
    `try {} catch (e) { for (let e of y) {} }`,
    `try {} catch (e) { var e = x; }`,
    `try {} catch (e) { for (var e;;) {} }`,
    'try {} catch {}',
    `try {} catch (e) { for (let e;;) {} }`,
    `try {} catch (e) { for (let e in y) {} }`,
    `try {} catch (e) { for (const e in y) {} }`,
    `try { f; } catch (exception) { err1 = exception; } switch (1) { case 1: function f() {  } } try { f; } catch (exception) { err2 = exception; }`,
    `try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }`,
    `try {} catch(e){}`,
    `try {} catch({e}){}`,
    `try {} catch([e]){}`,
    `try {} catch({e=x}){}`,
    `try {} catch {} finally {}`,
    `try { } catch (e) { var x; for (var y of []) {} }`,
    `function __f_3() { try { __f_3(); } catch(e) { eval("let fun = ({a} = {a: 30}) => {"); } }`,
    `try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`,
    `try{}catch(a){}`,
    `try { } catch (eval) { }`,
    `try { } catch ([a = 0]) { }`,
    `try { } catch (e) { let a; }`,
    `try { throw [1, 2, 3]; } catch ([...x]) {}`,
    `try {try { let e; } catch { let e; } finally { let e; }} catch (e) { }`,
    `try {try { } catch { } finally { }} catch ({e}) { }`,
    `try {} catch(x) { x = 0; }`,
    `try {} catch(x) { with ({}) { x = 1; } }`,
    `try {} catch (e) { for (let e = 1;;) {} }`,
    `try {} catch ([a,b,c]) { }`,
    `try {} catch (foo) {} var foo;`,
    `try { throw null; } catch ({}) {}`,
    `try { } catch (a) { { const a = b; } }`,
    `try {} catch(e) { try {} catch (e) {} }`,
    `try {} catch (foo) { { let foo; } }`,
    `var foo; try {} catch (_) { let foo; }`,
    `try {} catch (e) { { let e = x; } }`,
    `try {} catch (foo) {} let foo;`,
    `try {} catch (e) { let b = x; }`,
    `try {} catch (e) { for (const e in y) {} }`,
    `try {} catch (e) { for (let e of y) {} }`,
    'try { try {} finally {} } finally {}',
    'try {} finally {}',
    'try {} catch({e}){}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('try { throw [,]; } catch ([x = 23]) {}', () => {
    t.deepEqual(parseScript('try { throw [,]; } catch ([x = 23]) {}'), {
      directives: [],
      leafs: [
        {
          block: {
            statements: [
              {
                expression: {
                  leafs: [
                    {
                      type: 'Elision'
                    }
                  ],
                  type: 'ArrayLiteral'
                },
                type: 'ThrowStatement'
              }
            ],
            type: 'BlockStatement'
          },
          catchClause: {
            binding: {
              leafs: [
                {
                  left: {
                    name: 'x',
                    type: 'BindingIdentifier'
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 23
                  },
                  type: 'AssignmentPattern'
                }
              ],
              type: 'ArrayBindingPattern'
            },
            block: {
              statements: [],
              type: 'BlockStatement'
            },
            type: 'CatchClause'
          },
          finalizer: null,
          type: 'TryStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
