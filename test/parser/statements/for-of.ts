import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('leafs - For of', () => {
  // Invalid cases
  for (const arg of [
    'do/("while',
    'do\nx;while',
    'do\n/x/g while',
    'do\nwhile',
    'do while',
    'do catch while',
    'do let {} = y',
    // 'do debugger while(x) x',
    // 'do x: function s(){}while(y)',
    // 'do foo while (bar);',
    'do async \n f(){}; while (y)',
    'do let x = 1; while (false)',
    'do async \n f(){}; while (y)',
    // 'do x, y while (z)',
    //'do foo while (bar);',
    //'do ()=>x while(c)',
    'do(x) { case y: {...x} } while',
    'do(x) { case y: foo /a/ while }',
    'do(x) { case y:{ class { x() {} } while }}',
    'do({x=y}) { case y: [...a]  while}'
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
    'for(x of y);',
    'for (x of [1,2,3]) {}',
    'for (x of {a: 1}) {}',
    'for ({j} of x) { let [foo] = [j] }',
    'for ([x] of [[1],[2],[3]]) {}',
    'for ([x] of {ab: 1}) {}',
    `for ({a: b.c} of d) e`,
    `for ({a: b.c}.foo of d) e`,
    'for ([...x] of {ab: 1}) {}',
    'for (x of { x : foo().y } = {});',
    'for (x of { x : foo()[y] } = {});',
    'for (x of { x : y.z } = {});',
    'for (x of { x : y[z] } = {});',
    'for (x of { x : { y } } = {});',
    'for (x of { x : { foo: y } } = {});',
    'for (x of { x : { foo: foo().y } } = {});',
    'for (x of { x : { foo: foo()[y] } } = {});',
    'for (x of { x : { foo: y.z } } = {});',
    'for (x of { x : { foo: y[z] } } = {});',
    'for (x of { x : [ y ] } = {});',
    'for (x of { x : [ foo().y ] } = {});',
    'for (x of { x : [ foo()[y] ] } = {});',
    'for (x of { x : [ y.z ] } = {});',
    'for (x of { x : [ y[z] ] } = {});',
    'for (x of { x : y = 10 } = {});',
    'for (x of { x : foo().y = 10 } = {});',
    'for (x of { x : foo()[y] = 10 } = {});',
    'for (x of { x : y.z = 10 } = {});',
    'for (x of { x : y[z] = 10 } = {});',
    'for (x of { x : { y = 10 } = {} } = {});',
    'for (x of { x : { foo: y = 10 } = {} } = {});',
    'for (let , x;;);',
    'for (x of { x : { foo: foo().y = 10 } = {} } = {});',
    'for (x of { x : { foo: foo()[y] = 10 } = {} } = {});',
    'for (x of { x : { foo: y.z = 10 } = {} } = {});',
    'for (x of {42 : x} = {});',
    'for (x of {42e-2 : x} = {});',
    'for (x of {"hi" : x} = {});',
    'for (x of { x : { foo: y[z] = 10 } = {} } = {});',
    'for (x of { x : [ y = 10 ] = {} } = {});',
    'for (x of { z : { __proto__: x, __proto__: y } = z } = {});',
    'for (x of { x : [ y[z] = 10 ] = {} } = {});',
    'for (x of { x : [ y.z = 10 ] = {} } = {});',
    `for ([ a = b = c ] of d) ;`,
    `for ([ x = yield ] of [[]]) {}`,
    `for (j of x) { var [[foo]=[42]] = [] }`,
    `for (j of x) { [[foo]=[42]] = [] }`,
    `for ([{ x }] of [[null]]) {}`,
    `for ([{ x }] of [[{ x: 2 }]]) {}`,
    `for ([ x[yield] ] of [[33]]) {}`,
    `for ("foo".x of c) d;`,
    `for (456[x] of c) d;`,
    `for ("foo".x of c) d;`,
    `for ("foo"[x] of c) d;`,
    `for ({ x: [y] } of [{ x: [321] }]) {}`,
    `for ({...rest} of [{ get z() { calls.push("z") }, get a() { calls.push("a") } }]) {}`,
    `for (var j of x) { var [[foo]=[42]] = [] }`,
    `for (a of b);`,
    'for (let {[x]: y = z} of obj);',
    `for (456[x] of c) d;`,
    `for ({ prop = "x" in {} } of [{}]) {}`,
    `for ({ y: x = 1 } of [{ y: 2 }]) {}`,
    `for (var a of b);`,
    `for (let {j} of x) { foo = j }`,
    `for (const {j} of x) { var [foo] = [j] }`,
    `for([{a=0}] of b);`,
    `for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}`,
    `for ((a in b).x of {});`,
    `for (function(){ }[x in y] of x);`,
    `for (a of b);`,
    `for (a of b=c);`,
    `for ([a.b].foo of c) d`,
    `for ({a: b.c}.foo of d) e`,
    `for ([] of [[]]) {}`,
    `for ({x, y} of z);`,
    `for (a of b=c);`,
    'for (var {j} in x) { var [foo] = [j] }',
    'for (x--;;);',
    'for (let a = (b in c); ;);',
    'for (let a = (b in c && d); ;);',
    'for (let a = b => (b in c); ;);',
    'for (let a = ((b in c) && (d in e)); ;);',
    'for (let a = (b && c in d); ;);',
    'for (let a = (b => c => b in c); ;);',
    'for ( let[x] in obj ) {}',
    'for (var {j} in x) { foo = j }',
    'for (let in {}) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var let in {}) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'for (var {j} in x) { [foo] = [j] }',
    'for (var {j} in x) { [[foo]=[42]] = [] }',
    'for (var {j} in x) { var foo = j }',
    'for (var {j} in x) { var [foo] = [j] }',
    'for (let {x,} of obj);',
    'for (let [...[foo, bar]] of obj);',
    'for (let [foo, ...bar] of obj);',
    'for (let {x = y, z = a} of obj);',
    'for (x of [ { x : foo().y = 10 } = {} ] = z = {});',
    'for (x of { x : x, y : y = 42 } = z = {});',
    'for (x of [{x:x, y:y}, [,x,z,]] = z = {});',
    'for (x of [x,y,...z] = z = {});',
    'for (x of [(({ x } = { x: 1 }) => x).a] = z = {});',
    'for (x of [ (foo.bar) ] = z = {});',
    'for (x of {[1+1] : z} = z = {});',
    'for (x of {[1+1] : (z)} = z = {});',
    'for (x of {[foo()] : z} = z = {});',
    'for (x of {[foo()] : (z)} = z = {});',
    'for ({} of [false]) {}',
    'for ((let)[x].foo of x);',
    'for ((let)[x] of x);',
    'for ({} of [undefined]) {}',
    'for ({ x = 1 } of [{}]) {}',
    'for ({ x = yield } of [{}]) {}',
    'for ({ x = yield * 1} of [{}]) {}',
    'for ({ y: x = 1 } of [{ y: 2 }]) {}',
    'for ({ x: x = yield } of [{}]) {}',
    'for ({ w, a: x } of [{ a: 4 }]) {}',
    'for (const foo of x);',
    'for ({ x: [ x ] } of [{ x: null }]) {}',
    'for ({ x: [y] } of [{ x: [321] }]) {}',
    'for ({ x: { y } } of [{ x: { y: 2 } }]) {}',
    'for (x.y of [23]) {}',
    'for ((x.y) of [23]) {}',
    'for ([x.y] of [23]) {}',
    'for ([(x), y] of [x = y]) {}',
    'for ([z, (y), z] of [x = y]) {}',
    'for ([z, (y), z.y] of [x = y]) {}',
    `for (x.y of [23]) {}
    for (x.y of [23]) {}
    for (x.y of [23]) {}
    for (x.y of [23]) {}`,
    'for ((a in b).x of {});',
    'for (x of { x : [ foo()[y] = 10 ] = {} } = {});',
    'for (x of { x : [ foo().y = 10 ] = {} } = {});',
    'for (x of [ x ] = {});',
    'for (a of b=c);',
    'for ({a: b.c} of d) e',
    'for ({a: b.c}.foo of d) e',
    'for (x of [ foo().x ] = {});',
    'for (x of [ foo()[x] ] = {});',
    'for (x of [ x.y ] = {});',
    'for (x of [ x[y] ] = {});',
    'for (x of [ { x } ] = {});',
    'for (x of [ { x : y } ] = {});',
    'for (x of [ { x : foo().y } ] = {});',
    'for (x of [ { x : foo()[y] } ] = {});',
    'for (x of [ { x : x.y } ] = {});',
    'for (x of [ { x : x[y] } ] = {});',
    'for (x of [ [ x ] ] = {});',
    'for (x of [ [ foo().x ] ] = {});',
    'for (x of [ [ foo()[x] ] ] = {});',
    'for (x of [ [ x.y ] ] = {});',
    'for (x of [ [ x[y] ] ] = {});',
    'for (x of [ x = 10 ] = {});',
    'for (x of [ { x : x.y = 10 } = {} ] = {});',
    'for (x of [ [ x = 10 ] = {} ] = {});',
    'for (x of [ { x : foo().y = 10 } = {} ] = z = {});',
    'for (var [[x, y, z] = [4, 5, 6]] of [[]]) {}',
    'for (x of [{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]] = {});',
    'for (x of [x,,y] = {});',
    'for (x of [x, y = 42, z] = {});',
    'for (x of { x : x, y : y } = {});',
    'for (x of [(x),,(y)] = {});',
    'for (x of [(x)] = {});',
    'for (x of {42 : x} = {});',
    'for (x of {42e-2 : x} = {});',
    'for (x of {"hi" : x} = {});',
    'for (x of {[foo()] : z} = {});',
    'for (x of {[foo()] : (z)} = {});',
    'for (x of {[foo()] : foo().bar} = {});',
    'for (x of {[foo()] : foo()["bar"]} = {});',
    'for (x of {[foo()] : "foo".bar} = {});',
    'for (x of [x,y,...z] = {});',
    'for (x of [x,,...z] = {});',
    'for (x of [((x, y) => z).x] = {});',
    'for (x of {x: ((y, z) => z)["x"]} = {});',
    'for (x of { ...d.x } = {});',
    'for (x of { ...c[0]} = {});',
    'for (x of { x: (y) } = {});',
    'for (x of { x: (foo.bar) } = {});',
    'for (x of { x: (foo["bar"]) } = {});',
    'for (x of [ ...(a) ] = {});',
    'for (x of [ ...(foo.bar) ] = {});',
    'for (x of [ (y) ] = {});',
    'for (let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: null }]) {}',
    'for (let j of x) { var [[foo]=[42]] = [] }',
    'for (let j of x) { let foo; foo = j }',
    'for (let j of x) { let foo; [foo] = [j] }',
    'for (let j of x) { let foo; [[foo]=[42]] = [] }',
    'for (let [[] = function() { initCount += 1; return iter; }()] of [[]]) {}',
    'for (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}',
    'for (let {} of [obj]) {}',
    'for (let { w: [x, y, z] = [4, 5, 6] } of [{ w: [7, undefined, ] }]) {}',
    'for (const {} of [null]) {}',
    'for (const {x = y} of [null]) {}',
    'for (const { x, } of [{ x: 23 }]) {}',
    'for (x instanceof a>c;;) x',
    'for (const { w: [x, y, z] = [4, 5, 6] } of [{}]) {}',
    'for (const { x: y = 33 } of [{ }]) {}',
    'for (const { x: y } of [{ x: 23 }]) {}',
    'for (const [[x]] of [[null]]) {}',
    'for (const [x = 23] of [[,]]) {}',
    'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}',
    'for (const [,] of [g()]) {}',
    'for (const [[...x] = [2, 1, 3]] of [[]]) {}',
    'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}',
    'for (const [...[x, y, z]] of [[3, 4, 5]]) {}',
    'for (const [...x] of [[1, 2, 3]]) {}',
    'for (let {x : y, z, a : b = c} of obj);',
    'for ({x} = y of z);',
    'for ([x] = y of z);',
    'for (let {x, y} of obj);',
    'for (let {} of obj);',
    'for (let [foo=a] of arr);',
    'for (let [foo,bar] of arr);',
    'for (let [foo=a, bar] of arr);',
    'for (let [foo,,bar] of arr);',
    'for (let [foo, bar=b] of arr);',
    'for (let [foo] of arr);',
    'for (let [x, ...[foo, bar]] of obj);',
    'for (x--;;);',
    'for (function(){ }[foo] of x);',
    'for (function(){ }[x in y] of x);',
    'for (function(){ if (a in b); }.prop of x);',
    'for (function(){ a in b; }.prop of x);',
    'for (const [{a, ...b}] of []) {}',
    'for ([{a, ...b}] of []) {}',
    'async function a() {for await ([{a, ...b}] of []) {}}',
    'for ([{a}] in {}) {}',
    'for ([{a}] of []) {}',
    'for ([a, ...b] of []) {}',
    'for (function(){ }[foo] of x);',
    'for (function(){ }[x in y] of x);',
    'for (function(){ if (a in b); }.prop of x);',
    'for (function(){ a in b; }.prop of x);',
    'for (const [{a, ...b}] of []) {}',
    'for ([{a, ...b}] of []) {}',
    'for ([{a}] in {}) {}',
    'for ([{a}] of []) {}',
    `for (let [x] in y);`,
    `for (let {x} of y);`,
    `for (let x of y);`,
    `for (var a of /b/) {}`,
    `for (var {a} of /b/) {}`,
    `for (let {a} of /b/) {}`,
    `for (let foo of bar) { let foo = 1; }`,
    `for({a=0} of b);`,
    `for (const [...x] of [[1, 2, 3]]) {}`,
    `for (/foo/g[x] of c) d;`,
    `for ({ x = 1 } of [{}]) {}`,
    'for (var [...{ length }] of [[1, 2, 3]]) {}',
    `for ([a.b].foo of c) d`,
    `for ({x, y} of [{x: 1, y: 2}]) {}`,
    `for (let {j} of x) { foo = j }`,
    `for (const {j} of x) { var [foo] = [j] }`,
    `for([{a=0}] of b);`,
    `for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}`,
    `for ([] of [[]]) {}`,
    `for ({x, y} of z);`,
    `for (let of = 10; false; ) { }`,
    `for (j of x) { function foo() {return j} }`,
    `for(let [a] of b);`,
    `for ( let[x] of [[34]] ) {}`,
    `for (let a of b);`,
    `for ({ x: [ x ] } of [{}]) {}`,
    `for ({ x = y } of [{}]) {}`,
    `for (const a of b);`,
    `for (let a of b);`,
    'for (let {j} of x) { [foo] = [j] }',
    'function* g() { for(var x of yield) {} }',
    'for (let [a=[...b], ...c] of obj);',
    'for(let [a] of b);',
    'for ( let[x] of [[34]] ) {}',
    'for ({ x: [ x ] } of [{}]) {}',
    'for ({ y: x = 1 } of [{ y: undefined }]) {}',
    'for ({ x = y } of [{}]) {}',
    'for (var { x = y } of [{}]) {}',
    `for (const foo of bar); for (const foo of bar);`,
    `for (let foo in bar) { let foo = 1; }`,
    'for ([a, ...b] of []) {}',
    'for ([a, ...b] in {}) {}',
    `for ({a: b.c}.foo of d) e`,
    `for (foo=10;;);`,
    `for ({x, y} of [{x: 1, y: 2}]) {}`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
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
