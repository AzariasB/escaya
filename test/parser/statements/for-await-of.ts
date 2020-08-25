import * as t from 'assert';
import { parseScript, recovery, parseModule } from '../../../src/escaya';

describe('Statements - For await of', () => {
  // Invalid cases
  for (const arg of [
    // Invalidly parenthesized declaration targets.
    'async function f() { for await (({x}) of [{x:1}]) {} }',
    'async function f() { for await ([x] in y) {} }',
    'async function f() { for await ({x} in y) {} }',
    'async function f() { for await (var x in y) {} }',
    'async function f() { for await (const x in y) {} }',
    `for await ({x} = y of z);`,
    'function f() { for await (x of y) {} }',
    'function f() { for await (x of y) {} }',
    'function f() { for await (x of y) {} }',
    'for await (;;) {}',
    `async function f() { for await ({x} in y); }`,
    `async function f() { for await ("foo".x in y); }`,
    `async function f() { for await for await (a in b) {}; }`,
    `async function f() { for await (x;y;z); }`,
    `async function f() { for await (;;); }`,
    `async function f() { for await (const {'a': a = 1} = 1 of []); }`,
    `async function f() { for await (const {a = 1}, b of []); }`,
    `async function f() { for await (const {[Symbol.iterator]: a}, b of []); }`,
    `async function f() { for await (const {a: a}, b of []); }`,
    `async function f() { for await (const {a: a} = 1 of []); }`,
    `async function f() { for await (const {a}, b of []); }`,
    `async function f() { for await (let {0: a = 1}, b of []); }`,
    `async function f() { for await (let {a: a = 1}, b of []); }`,
    `async function f() { for await (let {0: a} = 1 of []); }`,
    `async function f() { for await (let {"a": a} = 1 of []); }`,
    `async function f() { for await (let {a} = 1 of []); }`,
    `async function f() { for await (let [a = 1], b of []); }`,
    `async function f() { for await (let [a = 1, ...b] = 1 of []); }`,
    `async function f() { for await (var {a}, b of []); }`,
    `async function f() { for await (var a, b of []); }`,
    `async function f() { for await ([1] of []); }`,
    `async function f() { for await (function a() {} of []); }`,
    `async function f() { for await ({[Symbol.iterator]: a} = 1 of []); }`,
    `async function f() { for await (({[Symbol.iterator]: a} = 1) of []); }`,
    `async function f() { for await (([a] = 1) of []); }`,
    `async function f() { for await ([a = 1] = 1 of []); }`,
    `async function f() { for await ([a = 1 = 1, ...b] = 1 of []); }`,
    `async function f() { for await (a = 1 of []); }`,
    `async function f() { for await (a.b = 1 of []); }`,
    `async function f() { for await (([a] = 1) of []); }`,
    `async function f() { for await (({a: a} = 1) of []); }`,
    `async function f() { for await (var {a: a}, b of []); }`,
    `async function f() { for await (var {a: a = 1}, b of []); }`,
    `async function f() { for await (var {"a": a = 1}, b of []); }`,
    `async function f() { for await (let [a] = 1 of []); }`,
    `async function f() { for await (let a, b of []); }`,
    `async function f() { for await (let {0: a}, b of []); }`,
    'async function f() { for await ((x) in y) {} }',
    'async function f() { for await ({0: a = 1} = 1 of []) ; }',
    'async function * f() { for await({a: a = 1} = 1 of []){ } }',
    'async function * f() { for await({a} = 1 of []){ } }',
    'async function f() { for await ([a] = 1 of []) ; }',
    'async function f() { for await ({[Symbol.iterator]: a = 1} = 1 of []) ; }',
    'async function f() { for await ([a] = 1 of []) ; }',
    'async function f() { for await ({x} in y); }',
    'async function f() { for await ("foo".x in y); }',
    'async function f() { for await for await (;;) {}; }',
    'async function f() { for await (x;y;z); }',
    'async function f() { for await (;;); }',
    'async function f() { for await (const {"a": a = 1} = 1 of []); }',
    'async function f() { for await (const {"a": a = 1}, b of []); }',
    'async function f() { for await (const {[Symbol.iterator]: a = 1}, b of []); }',
    'async function f() { for await (const {a: a}, b of []); }',
    'async function f() { for await (let {"a": a = 1} = 1 of []); }',
    'async function f() { for await (let [a = 1, ...b] = 1 of []); }',
    'async function f() { for await (let [a = 1, ...b], c of []); }',
    'async function f() { for await (let {a: a} = 1 of []); }',
    'async function f() { for await (var {a = 1} = 1 of []); }',
    'async function f() { for await (var {[Symbol.iterator]: a}, b of []); }',
    'async function f() { for await (var {"a": a} = 1 of []); }',
    'async function f() { for await (var [a = 1 = 1, ...b] of []); }',
    'async function f() { for await (var [a = 1] = 1 of []); }',
    'async function f() { for await ({0: a} = 1 of []); }',
    'async function f() { for await ({0: a = 1} = 1 of []); }',
    'async function f() { for await (({0: a = 1} = 1) of []); }',
    'async function f() { for await ([1] of []); }',
    'async function f() { for await (([a = 1] = 1) of []); }',
    'async function f() { for await ([a = 1 = 1, ...b] = 1 of []); }',
    'async function f() { for await (([a = 1 = 1, ...b] = 1) of []); }',
    'async function f() { for await ({a} = 1 of []); }',
    'async function f() { for await (({a} = 1) of []); }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
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
    'async function f() { let y; for await (a of []); }',
    'async function * f() { "use strict"; for await\n(a of []); }',
    'async function f() { for\nawait (a of [])  { } }',
    'async function * f() { for await(a of []); }',
    'async function * f() { for await(a.b of []); }',
    'async function f() { "use strict"; let y; for\nawait(a.b of []); }',
    'async function f() { let y; for await (a.b of []); }',
    'async function * f() { "use strict"; for await\n(a.b of []); }',
    'async function f() { for\nawait ([a] of [])  { } }',
    'async function * f() { for await([a] of []); }',
    'async function * f() { for await([a] of []); }',
    'async function f() { "use strict"; let y; for\nawait([a = 1] of []); }',
    'async function f() { let y; for await ([a = 1] of []); }',
    'async function * f() { "use strict"; for await\n([a = 1, ...b] of []); }',
    'async function f() { for\nawait ([a = 1, ...b] of [])  { } }',
    'async function * f() { for await({a} of []); }',
    'async function * f() { for await({a} of []); }',
    'async function f() { "use strict"; let y; for\nawait({a} of []); }',
    'async function f() { let y; for await ({a: a} of []); }',
    'async function * f() { "use strict"; for await\n({a: a} of []); }',
    'async function f() { for\nawait ({a: a} of [])  { } }',
    'async function * f() { for await({a: a} of []); }',
    'async function * f() { for await({[Symbol.iterator]: a} of []); }',
    'async function f() { "use strict"; let y; for\nawait({[Symbol.iterator]: a} of []); }',
    'async function f() { let y; for await ({[Symbol.iterator]: a} of []); }',
    'async function * f() { "use strict"; for await\n({0: a} of []); }',
    'async function f() { for\nawait ({0: a} of [])  { } }',
    'async function * f() { for await({0: a} of []); }',
    'async function * f() { for await({a = 1} of []); }',
    'async function f() { "use strict"; let y; for\nawait({a = 1} of []); }',
    'async function f() { let y; for await ({a = 1} of []); }',
    'async function * f() { "use strict"; for await\n({a: a = 1} of []); }',
    'async function f() { for\nawait ({a: a = 1} of [])  { } }',
    'async function * f() { for await({a: a = 1} of []); }',
    'async function * f() { for await({[Symbol.iterator]: a = 1} of []); }',
    'async function f() { "use strict"; let y; for\nawait({[Symbol.iterator]: a = 1} of []); }',
    'async function f() { let y; for await ({[Symbol.iterator]: a = 1} of []); }',
    'async function * f() { "use strict"; for await\n({0: a = 1} of []); }',
    'async function f() { for\nawait ({0: a = 1} of [])  { } }',
    'async function * f() { for await({0: a = 1} of []); }',
    'async function * f() { for await(var [a] of []); }',
    'async function f() { "use strict"; let y; for\nawait(var [a] of []); }',
    'async function f() { let y; for await (let a of []); }',
    'async function * f() { "use strict"; for await\n(let a of []); }',
    'async function f() { for\nawait (let [a = 1, ...b] of [])  { } }',
    'async function * f() { for await(let [a = 1, ...b] of []); }',
    'async function * f() { for await(/foo/g[x] of c); }',
    'async function f() { "use strict"; let y; for\nawait(/foo/g.x of c); }',
    'async function f() { let y; for await (/foo/g[x] of c); }',
    'async function f() { let y; for await ({"a": a = 1} of []); }',
    'async function f() { let y; for await (var {"a": a} of []); }',
    'async function f() { let y; for await (const {a} of []); }',
    'async function * f() { "use strict"; for await\n(const {"a": a = 1} of []); }',
    'async function f() { for\nawait (const {0: a = 1} of [])  { } }',
    'async function * f() { for await(const {0: a} of []); }',
    'async function * f() { for await(const {0: a} of []); }',
    'async function f() { "use strict"; let y; for\nawait(const {0: a} of []); }',
    'async function f() { let y; for await (const [a] of []); }',
    'async function * f() { "use strict"; for await\n(const [a] of []); }',
    'async function f() { for\nawait (const [a = 1] of [])  { } }',
    'async function * f() { for await(const [a = 1] of []); }',
    'async function * f() { for await(const [a = 1, ...b] of []); }',
    'async function fn() { for await ([v2 = 10, vNull = 11, vHole = 12, vUndefined = 13, vOob = 14] of [[2, null, , undefined]]) {} }',
    'async function fn() { for await ([ a = x += 1, b = x *= 2 ] of [[]]) {} }',
    'async function fn() { for await ([ a = x += 1, b = x *= 2 ] of [[]]) {} }',
    'async function fn() { for await ([[ _ ]] of [[ , ]]) {} }',
    'async function fn() { for await ([[ x ]] of [[]]) {} }',
    'async function fn() { for await ([{ x }] of [[{ x: 2 }]]) {} }',
    'async function fn() { for await ([{ x = yield }] of [[{}]]) {} }',
    'async function fn() { for await ([...{ 0: x, length }] of [[]]) {} }',
    'async function fn() { for await ({} of [false]) {} }',
    'async function fn() { for await ({ w, x, y } of [{ x: 5 }]) {} }',
    'async function fn() { for await ({...src.y} of [{ x: 1, y: 2}]) {} }',
    'async function fn() { for await ({ x: { x = yield } } of [{ x: {} }]) {} }',
    'async function fn() { for await ({ x: x[yield] } of [{ x: 23 }]) {} }',
    'async function fn() { for await ({ y: x = 1 } of [{ y: null }]) {} }',
    'async function fn() { for await ({ eval = 3, arguments = 4 } of [{}]) {} }',
    'async function fn() { for await ({ unresolvable } of [{}]) {} }',
    'async function fn() { for await (const [...[,]] of [g()]) {} }',
    'async function fn() { for await (const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] of (async function*() { yield* [[{ u: 777, w: 888, y: 999 }]]; })()) {} }',
    'async function fn() { for await (let [[...x] = function() {}()] of [[[2, 1, 3]]]) {} }',
    'async function fn() { for await (let [x = 23] of [[]]) {} }',
    'async function fn() { for await (let [...[]] of [function*() {}()]) {} }',
    'async function fn() { for await (let [x = 23] of (async function*() { yield* [[undefined]]; })()) {} }',
    'async function fn() { for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of (async function*() { yield* [[{ x: 11, y: 22, z: 33 }]]; })()) {} }',
    'async function fn() { for await (var [x] of [[]]) {} }',
    'async function fn() { for await (var { w: { x, y, z } = undefined } of [{ }]) { return; } }',
    'async function fn() { for await ({ x: { x = yield } } of [{ x: {} }]) {} }',
    'async function fn() { for await (const [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] of [[]]) {} }',
    'async function fn() { for await (const {} of [undefined]) {} }',
    'async function fn() { for await (const [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of [[7, 8, 9]]) {} }',
    'async function fn() { for await ([x] of y) {} }',
    'async function fn() { for await ({x} of y) {} }',
    'async function fn() { for await ("foo".x of y) {} }',
    'async function fn() { for await (var x of y) {} }',
    'async function fn() { for await (var x of y) {} }',
    'async function fn() { for ([].x in y); }',
    'async function fn() { for await ((x) of y) {} }',
    'async function fn() { for await (let [[x, y, z] = [4, 5, 6]] of [[]]) {} }',
    'async function fn() { for await (let [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] of [[]]) {} }',
    'async function fn() { for await (456..x of c) d; }',
    'async function fn() { for await (const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {} }',
    'async function fn() { for await ([...[x[yield]]] of [[86]]) {} }',
    'async function fn() { for await (let a of b) {} for (let c of d) {} }',
    'async function fn() { for await ("foo"[x] of c) d; }',
    'async function fn() { for ([x] of [[0]]) {} }',
    'async function fn() { for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: null }]) {} }',
    'async function fn() { for await (const x of y) {} }',
    'async function fn() { for await ((x) of y) {} }',
    'async function fn() { for await (let [[] = function() {}()] of [[]]) {} }',
    'async function f() { for await (a of []) ; }',
    'async function f() { for await (a.b of []) ; }',
    'async function f() { for await ([a] of []) ; }',
    'async function f() { for await ([a = 1] of []) ; }',
    'async function f() { for await ([a = 1, ...b] of []) ; }',
    'async function f() { for await ({a} of []) ; }',
    'async function f() { for await ([a] of []); }',
    'async function f(){ for await (x of y) {} }',
    'async () => { for await (x of y) {} }',
    'async function f() { for await ({x} of y) {} }',
    'async function f() { for await ("foo".x of y) {} }',
    'async function f() { for await (var x of y) {} }',
    'async function f() { for await (let x of y) {} }',
    'async function f() { for await (const x of y) {} }',
    'async function f() { for await ((x) of y) {} }',
    'async function f() { for await ([a = 1] of []); }',
    'async function * f() { for await ({a: a} of []); }',
    'async function * f() { for await ({0: a = 1} of []); }',
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
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
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
