import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - For await of', () => {
  for (const arg of [
    'async function f() { for await (a = 1 of []); }',
    'async function f() { for await (a = 1) of []); }',
    'async function f() { for await (a.b = 1 of []); }',
    'async function f() { for await ((a.b = 1) of []); }',
    'for await (a of b) let [x]',
    // 'async function f() { "use strict"; for await ([a] = 1 of []); }',
    'async function f() { for await (([a] = 1) of []){ } }',
    // 'async function * f() { for await ([a = 1] = 1 of []){ } }',
    'async function f() { for await (([a = 1] = 1) of []){ } }',
    'async function * f() { for await ([a = 1 = 1, ...b] = 1 of []){ } }',
    'async function f() { for await (([a = 1 = 1, ...b] = 1) of []){ } }',
    //'async function * f() { for await ({a} = 1 of []){ } }',
    'async function f() { for await (({a} = 1) of []){ } }',
    //'async function * f() { for await ({a: a} = 1 of []){ } }',
    'async function f() { for await (({a: a} = 1) of []); }',
    //'async function f() { for await ({"a": a} = 1 of []); }',
    //'async function f() { for await ({[Symbol.iterator]: a} = 1 of []); }',
    'async function f() { for await (({[Symbol.iterator]: a} = 1) of []); }',
    //'async function f() { "use strict"; for await ({0: a} = 1 of []); }',
    'async function f() { for await (({0: a} = 1) of []){ } }',
    //'async function * f() { for await ({a = 1} = 1 of []){ } }',
    'async function f() { for await (({a = 1} = 1) of []){ } }',
    //'async function * f() { for await ({a: a = 1} = 1 of []){ } }',
    'async function f() { for await (({a: a = 1} = 1) of []){ } }',
    //'async function * f() { for await ({[Symbol.iterator]: a = 1} = 1 of []){ } }',
    'async function f() { for await (({[Symbol.iterator]: a = 1} = 1) of []){ } }',
    'async function * f() { for await (function a() {} of []){ } }',
    'async function f() { for await (({0: a = 1} = 1) of []); }',
    //'async function f() { for await ({0: a = 1} = 1 of []); }',
    'async function f() { for await (var {a}, b of []){ } }',
    'async function * f() { for await (var {a: a} = 1 of []){ } }',
    'async function f() { for await (var {a: a}, b of []){ } }',
    'async function f() { for await (const {0: a = 1}, b of []); }',
    'async function f() { for await (const {a}, b of []); }',
    'async function f() { for await (const {a} = 1 of []); }',
    'async function f() { for await (const [a = 1] = 1 of []); }',
    'async function f() { "use strict"; for await ", " ; }',
    'async function f() { for await (const [a = 1, ...b] = 1 of []){ } }',
    'async function * f() { for await (const {0: a}, b of []){ } }',
    'async function f() { for await (const {a: a = 1} = 1 of []){ } }',
    'async function * f() { for await (const {a: a = 1}, b of []){ } }',
    'async function f() { for await (const {[Symbol.iterator]: a = 1}, b of []){ } }',
    'async function * f() { for await (const {0: a = 1} = 1 of []){ } }',
    'async function f() { for await (let {0: a} = 1 of []); }',
    'async function f() { "use strict"; for await (let {0: a = 1} = 1 of []); }',
    'async function f() { for await (const [a = 1] = 1 of []){ } }',
    'async function * f() { for await (const [a = 1], b of []){ } }',
    'async function f() { for await ([1] of []); }',
    'async function f() { for await ({a: 1} of []); }',
    'async function f() { "use strict"; for await (var [a = 1 = 1, ...b] of []); }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    'async function f() { for await (a of []) ; }',
    'async function f() { for await (a.b of []) ; }',
    'async function f() { for await ([a] of []) ; }',
    'async function f() { for await ([a = 1] of []) ; }',
    'async function f() { for await ([a = 1, ...b] of []) ; }',
    'async function f() { for await ({a} of []) ; }',
    'async function f() { for\nawait ({a: a} of []) { } }',
    'async function f() { for\nawait ({"a": a} of []) { } }',
    'async function f() { for\nawait ({[Symbol.iterator]: a} of []) { } }',
    'async function f() { for\nawait ({0: a} of []) { } }',
    'async function f() { for\nawait ({a = 1} of []) ; }',
    'async function f() { for\nawait ({a: a = 1} of []) ; }',
    'async function f() { for\nawait ({[Symbol.iterator]: a = 1} of []) ; }',
    'async function f() { for\nawait ({0: a = 1} of []) ; }',
    'async function f() { for\nawait (var [a] of []) ; }',
    'async function f() { for\nawait (var {a: a = 1} of []) ; }',
    'async function f() { for\nawait (var {a} of []) ; }',
    'async function f() { for\nawait (var [a = 1, ...b] of []) ; }',
    'async function f() { for\nawait (var [a] of []) ; }',
    'async function f() { "use strict"; for\nawait (var [a = 1, ...b] of []) ; }',
    'async function f() { "use strict"; for\nawait (var {a} of []) ; }',
    'async function f() { "use strict"; for\nawait (var {a: a} of []) ; }',
    'async function f() { "use strict"; for\nawait (let {a: a} of []) ; }',
    'async function f() { "use strict"; for\nawait (let {[Symbol.iterator]: a} of []) ; }',
    'async function f() { for await\n(let [a = 1, ...b] of []) { } }',
    'async function f() { for await\n(let a of []) { } }',
    'async function f() { for await\n(const [a = 1, ...b] of []) { } }',
    'async function f() { for await\n(const {a: a} of []) { } }',
    'async function * f() { for await\n(const {a = 1} of []) { } }',
    'async function * f() { for await\n(var [a = 1, ...b] of []) { } }',
    'async function * f() { for await\n({[Symbol.iterator]: a = 1} of []) { } }',
    'async function f() { "use strict"; for await\n(const {a: a = 1} of []) ; }',
    'async function f() { "use strict"; for await\n(const {a: a} of []) ; }',
    'async function f() { "use strict"; for await\n(const [a = 1, ...b] of []) ; }',
    'async function f() { "use strict"; for await\n(const [a = 1] of []) { } }',
    'async function *f() { "use strict"; for await\n(let {0: a = 1} of []) { } }',
    'async function *f() { "use strict"; for await\n(let [a] of []) { } }',
    'async function *f() { "use strict"; for await\n([a = 1] of []) { } }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('for(var a in b);', () => {
    t.deepEqual(parseScript('for(var a in b);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForInStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a'
                },
                initializer: null
              }
            ],
            kind: 'var'
          },
          expression: {
            type: 'IdentifierReference',
            name: 'b'
          },
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });
});
