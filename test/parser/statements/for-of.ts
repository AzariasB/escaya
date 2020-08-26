import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - For of', () => {
  // Invalid cases
  for (const arg of [
    // Invalidly parenthesized declaration targets.
    'for (({x}) of [{x:1}]) {}',
    'for (var ({x}) of [{x:1}]) {}',
    'for await (let.x of []) {}',
    'for (const [...,] = obj;;);',
    'for ([].x);',
    'for ({}.x);',
    'for (const foo, zoo of x);',
    'for (a, b of c);',
    'for (const foo = bar of x);',
    'for ({x} = y of z);',
    'for (a, b of c);',
    'for (let.a of x);',
    'for ([x] = y of z);',
    'for (let() of y);',
    'for (let + in y);',
    'for (let {x,,} of obj);',
    'for (let x = void 0 of [1, 2, 3]) {}',
    'for (var { x: (y) = foo() } of [{}]) {}',
    'for ([a.b](foo) of c) d',
    'for ([a.b]`foo` of c) d',
    'for ({a: b.c}() of d) e',
    'for ({a: b.c}`z` of d) e',
    'for (let {x} = a, y of obj);',
    'for (let {x} = a, obj of obj2);',
    'for (let {x}, y);',
    'for (let foo, [bar]);',
    'for (let() of y);',
    'for (var i, j of [1, 2, 3]) {}',
    'for (var i, j = 1 of {}) {}',
    'for (var i, j = void 0 of [1, 2, 3]) {}',
    'for (let i, j of {}) {}',
    'for (let i, j of [1, 2, 3]) {}',
    'for (let i, j = 1 of {}) {}',
    'for (let i, j = void 0 of [1, 2, 3]) {}',
    'for (const i, j of {}) {}',
    'for (const i, j of [1, 2, 3]) {}',
    'for (const i, j = 1 of {}) {}',
    'for (const i, j = void 0 of [1, 2, 3]) {}',
    '"use strict"; for (let[x];;);',
    '"use strict"; for (let;;);',
    '"use strict"; for (let.x in y);',
    'for ({a: b.c}-- of d) e',
    'for ([a.b]++ of c) d',
    'for (let {x} = a, y of obj);',
    'for(x of 3)break/',
    'for(x of 3)continue/',
    'for (a ? b : c of x);',
    'for ({} + b of obj);',
    'for (2 + b of obj);',
    'for ("abc" + b of obj);',
    'for (/x/g + b of obj);',
    'for(x of [], []) {}',
    'for(var x of [], []) {}',
    'for(let x of [], []) {}',
    'for(const x of [], []) {}',
    "'use strict'; for(x of { y = 23 }) {}",
    'for(var x of { y = 23 }) {}',
    'for(let x of { y = 23 }) {}',
    'for(const x of { y = 23 }) {}',
    'for ([{ set y(val) {}}?.y = 42] of [[23]]) ;',
    'for ([{ set y(val) { }}?.y] of [[23]]) ;',
    'for ({ x: y?.z = 42 } of [{ x: 23 }]) ;',
    'for ({ x: y?.z } of [{ x: 23 }]) ;',
    'for ({ x: {set y(val) { }}?.y = 42} of [{x: 42}]) ;',
    'for ({ x: { set y(val) {}}?.y} of [{x: 42}]) ;',
    'for (let foo = arr, [bar] of arr);',
    'for (let [...] of obj);',
    'for (let [...bar = foo] of obj);',
    'for (let [...foo, bar] of obj);',
    'for (let [...[foo, bar],,] of obj);',
    'for (let [..x] of obj);',
    'for (let foo, [bar] of arr);',
    'for (let [...foo,] of obj);',
    'for (let [...foo, bar] of obj);',
    'for (let [...foo,,] of obj);',
    'for({a: 0} of 0);',
    'for (let {x}.y of x);',
    'for(let.a of 0);',
    'for (void a.b of c);',
    'for(x = 0 of {});',
    'for ({...rest, b} of [{}]) ;',
    'for (var { x: (y.z) = foo() } of [{}]) {}',
    'for(x of [], []) {}',
    'for (({x}) of [{x:1}]) {}',
    'for (var ({x}) of [{x:1}]) {}',
    'for (let v of []) { let v; for (let v of [v]) { const v; } }',
    'for(var x of [], []) {}',
    'for ([...x,] of [[]]);',
    'for (x = 0 of {});',
    'for(o[0] = 0 of {});',
    'for (void a.b of c);',
    'for (/foo/ of {});',
    'for(let x of [], []) {}',
    'for (var i, j of {}) {}',
    'for(o.p = 0 of {});',
    'for(o[0] = 0 of {});',
    'for ((a++) of c);',
    'for (let of x) y',
    'for (let x of a,b) c',
    'for (x in y of) ;',
    'for (x in y of z) ;',
    'for (let[a+b] of x);',
    'for(let()of t)x',
    'for (let() of x);',
    'for (let().foo of x);',
    'for (let of x);',
    'for({} /= x in y) {}',
    'for (let [.x] of obj);',
    'function f() { for (of y) { } }',
    'function f() { for (var of y) { } }',
    'function f() { for (x of y;) { } }',
    'function f() { for (var x = 3 of y) { } }',
    'for([] = 0 of {});',
    'for([,] = 0 of {});',
    'for([a = 0] = 0 of {});',
    'for([...a] = 0 of {});',
    'for([...[]] = 0 of {});',
    'for([...[a]] = 0 of {});',
    'for (let [...[foo, bar],] of obj);',
    `for (let of y);`,
    `for (let.foo of x);`,
    `for (let() of x);`,
    `for(let.a of 0);`,
    `for (let.x of y);`,
    `for (let() of y);`,
    `for (let + of y);`,
    'for (x=>{}.x of y);',
    'for (x=>{} of y);',
    'for(([a]) of 0);',
    'for(o[0] = 0 of {});',
    'for(f() = 0 of {});',
    'for (let {x:y=z});',
    'for (let {,,x} of obj);',
    'for (let {,x} of obj);',
    'for (let[x].foo of x);',
    'for(let a of b, c);',
    'for (let {x:y});',
    'for (const a,b,c;;);',
    'for (+a().b of c);'
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
    'for ({x, y} of z);',
    'function* g() { for(x of yield) {} }',
    `for (x.y of [23]) {}`,
    `for (yield[g]--;;);`,
    `for (function(){ }[foo] of x);`,
    `for (function(){ if (a in b); }.prop of x);`,
    `for (var [...{ length }] of [[1, 2, 3]]) {}`,
    `for (var [...[...x]] of [[1, 2, 3]]) {}`,
    `function* g() { for(var x of yield) {} }`,
    `for ({ x: [x = yield] } of [{ x: [] }]) {}`,
    `for ({ x: prop = "x" in {} } of [{}]) {}`,
    `for ({ y: x = 1 } of [{ y: undefined }]) {}`,
    `for ([...x.y] of [[4, 3, 2]]) {}`,
    `for (x of let) {}`,
    `for (var {x, y} of z);`,
    `for(const x = 1; ; ) {}`,
    `for (let [p, q] of r);`,
    `for ({[a]: ""[b]} of c) {}`,
    `for (let of, bar; false; ) { }`,
    'for (let[x] of y);',
    `for ([, , x, , ...y] of [[1, 2, 3, 4, 5, 6]]) {}`,
    'for (let {x = y} of obj);',
    `for ([...x[yield]] of [[33, 44, 55]]) {}`,
    `for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}`,
    `for (/foo/g.x of c) d;`,
    'for (let {[x]: y} of obj);',
    `for (var of of y) { }`,
    `a => {
      for (let a of b) c
    }`,
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
    `for (const key of {}?.a) ;`,
    `for (const key of obj?.a) {}`,
    `for (const key of obj?.a);`,
    'for ((obj?.foo).bar of []);',
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
    'for (let [a = 0, b = 1] of [2, 3]) {}',
    'for (const {x: a = 0, y: b = 1} of [2, 3]) {}',
    'for ([a = 1, b = ""] of x) {}',
    'for ({ a: b = 1, b: a = ""} of []) {}',
    'for (foo().x of ["a", "b", "c"]) {}',
    'for (const {x: a = 0, y: b = 1} of [2, 3]) {}',
    'for (let [a = 0, b = 1] of [2, 3]) {}',
    'for (foo().x of []) { for (foo().x of []) { var p = foo().x; } }',
    'for ([{a}] in {}) {}',
    'for ([{a}] of []) {}',
    `for (let [x] in y);`,
    `for (let {x} of y);`,
    `for (let x of y);`,
    'for (let [var1, var2] of [[1, 1], [2, 2]]) { }',
    'for (const [var1, var2] of [[1, 1], [2, 2]]) { }',
    'for (let [var1, var2] of [[1, 1], [2, 2]]) { var2 = 3; }',
    'for (const [var1, var2] of [[1, 1], [2, 2]]) { () => { var2 = 3; } }',
    'for (let [var1, var2 = function() { var1; var2; }] of [[1]]) { }',
    'for (let [var1, var2 = function() { var1 = 0; }] of [[1]]) { }',
    'for (let [var1, var2 = function() { var2 = 0; }] of [[1]]) { }',
    'for (let [var1, var2 = function() { var1 = 0; var2 = 0; }] of [[1]]) {}',
    'for (let [var1, var2 = function() { var2; }] of [[1]]) {}',
    'for (let [var1, var2 = function() { var1; }] of [[1]]) {}',
    'for (var x of [1, 2, 3]) {}',
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
    'for ({a: b.c}[x] of d) e',
    'for ([a.b][foo] of c) d',
    'function* g() { for(x of yield) {} }',
    "'use strict'; function* g() { for(var x of yield) {} }",
    'function* g() { for(let x of yield) {} }',
    'function* g() { for(const x of yield) {} }',
    `for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}`,
    `for ([] of [[]]) {}`,
    `for ({x, y} of z);`,
    `for (let of = 10; false; ) { }`,
    `for (j of x) { function foo() {return j} }`,
    `for(let [a] of b);`,
    `for ( let[x] of [[34]] ) {}`,
    `for (let a of b);`,
    `for ({ x: [ x ] } of [{}]) {}`,
    'for ([] of x);',
    `for ({ x = y } of [{}]) {}`,
    `for (const a of b);`,
    'for (const v of []) { var x = v; }',
    `for (let a of b);`,
    'for ([{x = y}] of y);',
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
    'for ([a, ...b] in {}) {}',
    `for ({a: b.c}.foo of d) e`,
    `for (foo=10;;);`,
    `for ({x, y} of [{x: 1, y: 2}]) {}`
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
