import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - For of', () => {
  for (const arg of [
    'for await (let.x of []) {}',
    'for (const [...,] = obj;;);',
    'for ([].x);',
    'for ({}.x);',
    'for (const foo, zoo of x);',
    'for (a, b of c);',
    'for (const foo = bar of x);',
    'for (let() of y);',
    'for (let + in y);',
    'for (let {x,,} of obj);',
    'for (var { x: (y) = foo() } of [{}]) {}',
    'for (let {x} = a, y of obj);',
    'for (let {x} = a, obj of obj2);',
    'for (let {x}, y);',
    'for (let foo, [bar]);',
    'for (let() of y);',
    '"use strict"; for (let[x];;);',
    '"use strict"; for (let;;);',
    '"use strict"; for (let.x in y);',
    'for (let.x of y);',
    'for (let + in y);',
    'for (let + of y);',
    'for (let() in y);',
    'for (let() of y);',
    'for (let [foo]);',
    'for ([x?.y = 42] of [[23]]) ;',
    'for ([x?.y] of [[23]]) ;',
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
    //'for ({eval = 0} ;;);',
    //'for (;false;) function g() {}',
    'for({a: 0} of 0);',
    'for (let {x}.y of x);',
    'for(let.a of 0);',
    'for (let {x:y=z});',
    'for (let {,,x} of obj);',
    'for (let {,x} of obj);',
    'for (let[x].foo of x);',
    'for(let a of b, c);',
    'for (let {x:y});',
    'for (const a,b,c;;);',
    'for (+a().b of c);',
    'for (void a.b of c);',
    'for(x = 0 of {});',
    'for ({...rest, b} of [{}]) ;',
    'for (var { x: (y.z) = foo() } of [{}]) {}',
    'for(x of [], []) {}',
    'for (({x}) of [{x:1}]) {}',
    'for (var ({x}) of [{x:1}]) {}',
    'for(var x of [], []) {}',
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
    'for (let [.x] of obj);',
    'function f() { for (of y) { } }',
    'function f() { for (var of y) { } }',
    'function f() { for (x of y;) { } }',
    'function f() { for (var x = 3 of y) { } }',
    // 'for([] = 0 of {});',
    // 'for([,] = 0 of {});',
    // 'for([a = 0] = 0 of {});',
    // 'for([...a] = 0 of {});',
    // 'for([...[]] = 0 of {});',
    // 'for([...[a]] = 0 of {});',
    'for (let [...[foo, bar],] of obj);',
    `for (let of y);`,
    `for (let.foo of x);`,
    `for (let() of x);`,
    `for(let.a of 0);`,
    `for (let.x of y);`,
    `for (let() of y);`,
    `for (let + of y);`,
    'for(o[0] = 0 of {});',
    'for(f() = 0 of {});',
    'for(({a}) of 0);',
    // 'for({x} = 0 of {});',
    // 'for ({p: x = 0} = 0 of {});',
    'for (this of []) {}',
    'for (a = b of x);',
    'for (a += b of x);',
    'for (a ? b : c of x);',
    'for ((x)=>{}.x of y);',
    'for (((x)=>{}) of y);',
    'for ((x)=>{} of y);',
    'for ({} + b of obj);',
    'for (2 + b of obj);',
    'for (let {x=y});',
    'for (function(){} of x);',
    'for (let [...{ x } = []] of [[]]) {}',
    'for (let.x of []) {}',
    //'for ([...[a]] = 0 of {});',
    //'for ([] = 0 of {});',
    'for (x=>{}.x of y);',
    'for (x=>{} of y);',
    'for(([a]) of 0);'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

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
    'for (x of [ (foo["bar"]) ] = {});',
    'for (x of { x : [ foo().y ] } = z = {});',
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
    'for (let of of [0]) { }',
    'for (let of; false; ) { }',
    'for (let of, bar; false; ) { }',
    'for (let of = 10; false; ) { }',
    'for (var {j} of x) { foo = j }',
    'for (let x of y) { }',
    'for (x of y) { }',
    'for (var x of g()) { break; }',
    'for (let of of y) { }',
    'for (var of of y) { }',
    'for (of in y) { }',
    'for (var [[x, y, z] = [4, 5, 6]] of [[]]) {}',
    'for (var [{ x }] of [[null]]) {}',
    'for (var [{ x }] of [[null]]) {}',
    'for (var {} of [obj]) {}',
    'for (var { x: y = 33 } of [{ }]) {}',
    'for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: null }]) {}',
    'for (var {a, b, ...rest} of [{x: 1, y: 2, a: 5, b: 3}]) {}',
    'for (var {} of [obj]) {}',
    'for (var { x: y = foo() } of [{}]) {}',
    'for (var { x: y = foo(1 / 2) } of [{}]) {}',
    'for (var { x: y = foo(() => a) } of [{}]) {}',
    'for (var { 1: y = foo(() => a) } of [{}]) {}',
    'for (var [[...x] = [2, 1, 3]] of [[]]) {}',
    'for (yield[g]--;;);',
    'for (var let = 1; let < 1; let++) {}',
    'for (var let in {}) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (let a = b => { return b in c; }; ;);',
    'for (let\n{x} of list) process(x);',
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
    'for (let {x : y, z : a} of obj);',
    'for (let {x = y, z = a} of obj);',
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
    'async function a() { for await ([{a}] of []) {}}',
    'for ([a, ...b] in {}) {}',
    'for (var {j} in x) { var [foo] = [j] }',
    'for (x--;;);',
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
    'for (var [...[...x]] of [[1, 2, 3]]) {}',
    `for (var [{ x }] of [[null]]) {}`,
    'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}',
    'for ([...{ 0: x, length }] of [[null]]) {}',
    'for ({x, y} of z);',
    'function* g() { for(x of yield) {} }',
    'for (let {j} of x) { [foo] = [j] }',
    'function* g() { for(var x of yield) {} }',
    'for (let [a=[...b], ...c] of obj);',
    'for(let [a] of b);',
    'for ( let[x] of [[34]] ) {}',
    'for ({ x: [ x ] } of [{}]) {}',
    'for ({ y: x = 1 } of [{ y: undefined }]) {}',
    'for ({ x = y } of [{}]) {}',
    'for (var { x = y } of [{}]) {}',
    'for ([...x.y] of [[4, 3, 2]]) {}',
    'for (x of let) {}',
    `for ({j} of x) { var [[foo]=[42]] = [] }`,
    `for (x.y of [23]) {}`,
    `for (var { 1: y = foo(() => a) } of [{}]) {}`,
    `for (yield[g]--;;);`,
    `for (function(){ }[foo] of x);`,
    `for (function(){ if (a in b); }.prop of x);`,
    `for (var [...{ length }] of [[1, 2, 3]]) {}`,
    `for (var [...[...x]] of [[1, 2, 3]]) {}`,
    `for (let of, bar; false; ) { }`,
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
    `for ([, , x, , ...y] of [[1, 2, 3, 4, 5, 6]]) {}`,
    'for (let {x = y} of obj);',
    `for ([...x[yield]] of [[33, 44, 55]]) {}`,
    `for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}`,
    `for (/foo/g.x of c) d;`,
    'for (let {[x]: y} of obj);',
    'for (let {[x]: y = z} of obj);',
    `for (456[x] of c) d;`,
    `for ({ prop = "x" in {} } of [{}]) {}`,
    `for ({ y: x = 1 } of [{ y: 2 }]) {}`,
    `for (var of of y) { }`,
    `a => {
      for (let a of b) c
    }`,
    `for ((a in b).x of {});`,
    `for (function(){ }[x in y] of x);`,
    `for (a of b);`,
    `for (var a of b);`,
    `for (var a of b);`,
    `for (a of b=c);`,
    `for ([a.b].foo of c) d`,
    `for ({a: b.c}.foo of d) e`,
    `for (foo=10;;);`,
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
    `for (const foo of bar); for (const foo of bar);`,
    `for (let foo in bar) { let foo = 1; }`,
    'for ([a, ...b] of []) {}',
    'for ([a, ...b] in {}) {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('for (let {} of [obj]) {}', () => {
    t.deepEqual(parseScript('for (let {} of [obj]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: []
                },
                initializer: null
              }
            ],
            kind: 'let'
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'IdentifierReference',
                name: 'obj'
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });
  it('for (x.y of [23]) {}', () => {
    t.deepEqual(parseScript('for (x.y of [23]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'IdentifierReference',
              name: 'x'
            },
            expression: {
              type: 'IdentifierName',
              name: 'y'
            },
            computed: false
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'NumericLiteral',
                value: 23
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ({} of [null]) {}', () => {
    t.deepEqual(parseScript('for ({} of [null]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ObjectAssignmentPattern',
            properties: []
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'NullLiteral',
                value: null
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [, , ...x] of [[1, 2]]) {}', () => {
    t.deepEqual(parseScript('for (let [, , ...x] of [[1, 2]]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'Elision'
                    },
                    {
                      type: 'Elision'
                    },
                    {
                      type: 'BindingRestElement',
                      argument: {
                        type: 'BindingIdentifier',
                        name: 'x'
                      }
                    }
                  ]
                },
                initializer: null
              }
            ],
            kind: 'let'
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'ArrayLiteral',
                leafs: [
                  {
                    type: 'NumericLiteral',
                    value: 1
                  },
                  {
                    type: 'NumericLiteral',
                    value: 2
                  }
                ]
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (const a of b);', () => {
    t.deepEqual(parseScript('for (const a of b);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a'
                },
                initializer: null
              }
            ],
            kind: 'const'
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

  it('for ([a.b] of c) d', () => {
    t.deepEqual(parseScript('for ([a.b] of c) d'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ArrayAssignmentPattern',
            leafs: [
              {
                type: 'MemberExpression',
                member: {
                  type: 'BindingIdentifier',
                  name: 'a'
                },
                expression: {
                  type: 'IdentifierName',
                  name: 'b'
                },
                computed: false
              }
            ]
          },
          expression: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'd'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ([a.b].foo of c) d', () => {
    t.deepEqual(parseScript('for ([a.b].foo of c) d'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'ArrayBindingPattern',
              leafs: [
                {
                  type: 'MemberExpression',
                  member: {
                    type: 'BindingIdentifier',
                    name: 'a'
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'b'
                  },
                  computed: false
                }
              ]
            },
            expression: {
              type: 'IdentifierName',
              name: 'foo'
            },
            computed: false
          },
          expression: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'd'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ({a: b.c} of d) e', () => {
    t.deepEqual(parseScript('for ({a: b.c} of d) e'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ObjectAssignmentPattern',
            properties: [
              {
                type: 'AssignmentProperty',
                key: {
                  type: 'BindingIdentifier',
                  name: 'a'
                },
                value: {
                  type: 'MemberExpression',
                  member: {
                    type: 'BindingIdentifier',
                    name: 'b'
                  },
                  expression: {
                    type: 'IdentifierName',
                    name: 'c'
                  },
                  computed: false
                },
                computed: false
              }
            ]
          },
          expression: {
            type: 'IdentifierReference',
            name: 'd'
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'e'
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ({x, y} of [{x: 1, y: 2}]) {}', () => {
    t.deepEqual(parseScript('for ({x, y} of [{x: 1, y: 2}]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ObjectAssignmentPattern',
            properties: [
              {
                type: 'IdentifierReference',
                name: 'x'
              },
              {
                type: 'IdentifierReference',
                name: 'y'
              }
            ]
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'ObjectLiteral',
                properties: [
                  {
                    type: 'PropertyDefinition',
                    static: false,
                    key: {
                      type: 'IdentifierName',
                      name: 'x'
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 1
                    },
                    computed: false
                  },
                  {
                    type: 'PropertyDefinition',
                    static: false,
                    key: {
                      type: 'IdentifierName',
                      name: 'y'
                    },
                    value: {
                      type: 'NumericLiteral',
                      value: 2
                    },
                    computed: false
                  }
                ]
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}', () => {
    t.deepEqual(
      parseScript('for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}'),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ForOfStatement',
            initializer: {
              type: 'ArrayAssignmentPattern',
              leafs: []
            },
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'ObjectLiteral',
                  properties: [
                    {
                      type: 'PropertyDefinition',
                      static: false,
                      key: {
                        type: 'IdentifierName',
                        name: 'next'
                      },
                      value: {
                        type: 'FunctionExpression',
                        name: null,
                        params: {
                          type: 'FormalParameters',
                          leafs: []
                        },
                        contents: {
                          type: 'FunctionBody',
                          statements: [
                            {
                              type: 'ReturnStatement',
                              expression: {
                                type: 'ObjectLiteral',
                                properties: [
                                  {
                                    type: 'PropertyDefinition',
                                    static: false,
                                    key: {
                                      type: 'IdentifierName',
                                      name: 'done'
                                    },
                                    value: {
                                      type: 'BooleanLiteral',
                                      value: true
                                    },
                                    computed: false
                                  }
                                ]
                              }
                            }
                          ],
                          directives: []
                        },
                        async: false,
                        generator: false
                      },
                      computed: false
                    },
                    {
                      type: 'PropertyDefinition',
                      static: false,
                      key: {
                        type: 'IdentifierName',
                        name: 'return'
                      },
                      value: {
                        type: 'FunctionExpression',
                        name: null,
                        params: {
                          type: 'FormalParameters',
                          leafs: []
                        },
                        contents: {
                          type: 'FunctionBody',
                          statements: [
                            {
                              type: 'ReturnStatement',
                              expression: {
                                type: 'ObjectLiteral',
                                properties: []
                              }
                            }
                          ],
                          directives: []
                        },
                        async: false,
                        generator: false
                      },
                      computed: false
                    }
                  ]
                }
              ]
            },
            statement: {
              type: 'BlockStatement',
              statements: []
            }
          }
        ],
        webCompat: true
      }
    );
  });

  it('for([{a=0}] of b);', () => {
    t.deepEqual(parseScript('for([{a=0}] of b);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ArrayAssignmentPattern',
            leafs: [
              {
                type: 'ObjectAssignmentPattern',
                properties: [
                  {
                    type: 'BindingElement',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    initializer: {
                      type: 'NumericLiteral',
                      value: 0
                    }
                  }
                ]
              }
            ]
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

  it('for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}', () => {
    t.deepEqual(parseScript('for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingElement',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'cover'
                      },
                      initializer: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'FunctionExpression',
                          name: null,
                          params: {
                            type: 'FormalParameters',
                            leafs: []
                          },
                          contents: {
                            type: 'FunctionBody',
                            statements: [],
                            directives: []
                          },
                          async: false,
                          generator: false
                        }
                      }
                    },
                    {
                      type: 'BindingElement',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'a'
                      },
                      initializer: {
                        type: 'ParenthesizedExpression',
                        expression: {
                          type: 'CommaOperator',
                          leafs: [
                            {
                              type: 'NumericLiteral',
                              value: 0
                            },
                            {
                              type: 'FunctionExpression',
                              name: null,
                              params: {
                                type: 'FormalParameters',
                                leafs: []
                              },
                              contents: {
                                type: 'FunctionBody',
                                statements: [],
                                directives: []
                              },
                              async: false,
                              generator: false
                            }
                          ]
                        }
                      }
                    }
                  ]
                },
                initializer: null
              }
            ],
            kind: 'var'
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'ObjectLiteral',
                properties: []
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ([] of [[]]) {}', () => {
    t.deepEqual(parseScript('for ([] of [[]]) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
          initializer: {
            type: 'ArrayAssignmentPattern',
            leafs: []
          },
          expression: {
            type: 'ArrayLiteral',
            leafs: [
              {
                type: 'ArrayLiteral',
                leafs: []
              }
            ]
          },
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });
});
