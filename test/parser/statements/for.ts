import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - For', () => {
  // Invalid cases
  for (const arg of [
    'for (var [foo], bar);',
    'for (let {x,, y} = obj;;);',
    // 'for ({ eval = 0 } ;;) ;',
    'for ({x} = y);',
    'for({}|=y;;);',
    'for({}/=y;;)x',
    'for (;a);',
    // 'for (const x of obj) { var x = 14 }',
    'for (var {x:y=z} = obj, {a:b=c};;);',
    'for (var {[x]};;);',
    'for (var {[x]: y = z};;);',
    'for (var x = y, {z};;);',
    'for (const ...a = 1;;);',
    'for (const foo, bar);',
    'for (const foo = bar);',
    'for (var [...foo] = obj);',
    'for ({}.x);',
    'for (var [foo, ...bar] = obj);',
    'for (var [...foo, bar] = obj);',
    'for (var {x,} = obj);',
    'for (let {[x]: y};;);',
    'for (var {x,,} = obj);',
    'for (let x, {y};;);',
    'for (let {,} = obj;;);',
    'for (let {,,} = obj;;);',
    'for (a, b);',
    'for (let {[x]} = z;;);',
    'for (var {x}, y;;);',
    'for (var {,,x} = obj);',
    'for (let {[x]: y = z};;);',
    'for (let {[x]};;);',
    'for(delete(x in y) in z)x',
    'for(delete((1)?y:x in y) in z)x',
    'for (let {x}, {y} = z;;);',
    'for (a + b);',
    'for (a);',
    'for (let {x,,} = obj;;);',
    'for (let {x=y};;);',
    'for (let {a:=c} = z;;);',
    'for (let[x];;);',
    'for ({});',
    'for ([]);',
    'for (let {[x]: y} = z);',
    'for (let {x}, y);',
    'for (let {x:y=z}, {a:b=c} = obj;;);',
    'for (let {x = y, z = a} = obj);',
    'for (let {x : y, z : a} = obj);',
    'for (let {x}, {y} = z);',
    'for (let {x = y, z} = obj);',
    'for (let {x : y, z} = obj);',
    'for (let {x:y=z} = obj, {a:b=c});',
    'for (let {x:y=z}, {a:b=c} = obj);',
    'for (let {x : y, z, a : b = c} = obj);',
    'for (let {x, y = z} = obj);',
    'for (let {x, y : z} = obj);',
    'for (let {x, y} = obj);',
    'for (let {x} = a, {y} = obj);',
    'for (let {x,, y} = obj);',
    'for (let {a, [x]: y} = a);',
    'for (let {[x]});',
    'for (let x = y, {z});',
    'for (let x = a, {y} = obj);',
    'for (let x, {y} = obj);',
    'for (let {x=y});',
    'for (let {x : y} = obj);',
    'for (let {x:y=z});',
    'for (let {x : y = z} = obj);',
    'for (let {x:y});',
    'for (let {x,,} = obj);',
    'for (let {,x} = obj);',
    'for (let {x,} = obj);',
    //'for (;;) let [x]',
    //'for (;;) let [x] = y',
    'for (const [z, z]; ; ) ;',
    'for (let [foo] = arr, bar = arr2);',
    'for (let [foo] = arr, bar);',
    'for (let [foo] = arr, [bar] = arr2);',
    'for (let [,,foo] = arr);',
    'for (let [foo,,] = arr);',
    'for (let [] = x);',
    'for (let [,,] = x);',
    'for (let [,] = x);',
    'for (let [,foo] = arr);',
    'for (let [foo = x]);',
    'for (let [foo], bar);',
    'for (let [foo]);',
    'for (let foo = arr, [bar] = arr2);',
    'for (let foo, [bar] = arr2);',
    'for (let [foo=a] = arr);',
    'for (let [foo,bar] = arr);',
    'for (let [foo=a, bar] = arr);',
    'for (let [foo, bar=b] = arr);',
    'for (let [foo] = arr);',
    'for (let [...[foo, bar],,] = obj);',
    'for (let [...foo] = obj);',
    'for (let [...foo,] = obj);',
    'for (let [foo, ...bar] = obj);',
    'for (let [.x] = obj);',
    'for (let [x, ...[foo, bar]] = obj);',
    'for (let [.x] = obj);',
    'for (let [a=[...b], ...c] = obj);',
    'for (let [...[foo, bar],] = obj);',
    'for (const [z]; ; ) ;',
    'for (let {x:y=z};;);',
    'for (const x = 5, y; ; ) ;',
    'for (const x; ; ) ;',
    'for (let [z, z]; ; ) ;',
    'for(index=0; index<10; index+=4; index++; index--) ;',
    'for({var index=0; index+=1;} index++<=10; index*2;) {	[].add(""+index);};',
    'for ( ; false; ) class C {}',
    // `for ( ; false; ) function f() {}`,
    'for (var {,,x} = obj);',
    'for (var {,,x} = obj);',
    'for (var {x, y} = obj);',
    'for (var {x,, y} = obj);',
    'for (var {x} = a, {y} = obj);',
    'for (var {x} = a, y = obj);',
    'for (var {x} = a, obj);',
    'for (var x = a, {y} = obj);',
    'for (var x, {y} = obj);',
    'for (var {x = y} = obj);',
    'for (var {x = y, z} = obj);',
    'for (var {x, y = z} = obj);',
    'for (var {x = y, z = a} = obj);',
    'for (var {x}, {y} = z);',
    'for (var {x}, y);',
    'for (var x = y, {z});',
    'for (var {x}, y);',
    'for (var {x=y});',
    'for (var {x:y=z});',
    'for (var {x:y=z} = obj, {a:b=c});',
    'for (var {x:y=z}, {a:b=c} = obj);',
    'for (var {a:=c} = z);',
    'for (var {[x]: y} = z);',
    'for (var {[x]} = z);',
    'for(x of 3)break/',
    'for(x of 3)continue/',
    'for(x of 3)p/',
    'for (var {[x]: y});',
    'for (var {[x]: y = z});',
    'for (var {[x]: y = z} = a);',
    'for (var {a, [x]: y} = a);',
    'for ({a: x + y} = z;;);',
    'for ([x + y] = z;;);',
    'for ((i in {}));',
    'for (let [];;);',
    'for (let [a = 0];;);',
    'for (let a = 0, [];;);',
    'for (let [] = 0, [];;);',
    'for (let {};;);',
    'for (let {a = 0};;);',
    'for (let a = 0, {};;);',
    'for (let [] = 0, {};;);',
    'for (let [...x = []] = []; a < 1; ) {}',
    'for (let [...{ x } = []] = []; a < 1; ) {}',
    'for (var a in arr;1;){ break; }',
    'for ( ; false; ) class C {}',
    'for (const [...{ x }, y] = [1, 2, 3]; a < 1; ) {}',
    'for (var [...[ x ] = []] = []; a < 1; ) {}',
    'for (var a in arr;1;){ break; }',
    'for (a = b of x);',
    'for (a += b of x);',
    'for (a = b in x);',
    'for (a ? b : c in x);',
    'function *f(){   for (yield x in y in z);   }',
    'for ((x)=>{}.x in y);',
    'for (a ? b : c of x);',
    'for (a ? b : c of x);',
    'function *f(){   for (yield x in y of z);   }',
    'function *f(){   for (yield x of y);   }',
    'function *f(){   for (yield of y);   }',
    'function *f(){ for (yield of obj); }',
    'for ((x)=>{}.x of y);',
    'for (((x)=>{}) of y);',
    'for ((x)=>{} of y);',
    'for (x=>{}.x of y);',
    'for (x=>{} of y);',
    'for (const [...[foo, bar],,] = obj);',
    'for (const [... ...foo] = obj);',
    'for (const [...] = obj);',
    'for (const [...,] = obj);',
    'for (const [..x] = obj);',
    `for (const
      foo();;);`,
    `for (const
      foo;;);`,
    'for (const [a=[...b], ...c] = obj);',
    'for (const {,} = obj);',
    'for (const {x} = obj);',
    'for (const {,x} = obj);',
    'for (const {x,, y} = obj);',
    'for (const {x, y} = obj);',
    'for (const {x} = a, y = obj);',
    'for (let x = y, {z};;);',
    'for (const {x} = a, obj);',
    'for (const {x = y} = obj);',
    'for (const x, {y} = obj);',
    'for (const {x = y, z = a} = obj);',
    'for (const foo;;);',
    'for (const\nfoo();;);',
    'for (const foo);',
    'for (const [...,] = obj;;);',
    'for (const foo, bar);',
    'for (const foo = bar, zoo = boo);',
    'for (const\nfoo);',
    'for (const foo = bar in x);',
    'for (const foo = bar, zoo = boo in x);',
    'for (const foo, bar of x);',
    'for (let a = b in c) {}',
    'for (a = b in c) {}',
    'for (const foo = bar of x);',
    'for (const foo = bar, zoo = boo of x);',
    'for (const foo, zoo of x);',
    'for (const foo, [bar] = arr2;;);',
    'for (var [foo = x];;);',
    'for (const [foo];;);',
    'for (var {x};;);',
    'for (var [..x] = obj;;);',
    'for (var [...foo,] = obj;;);',
    'for (var {,,x} = obj;;);',
    'for (const [foo = x];;);'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'for (var x of obj) { const x = 1 }',
    `for (let foo in bar) { let foo = 1; }`,
    `for (let foo of bar) { let foo = 1; }`,
    `for (let [,] = x;;);`,
    `for(()=>{a in b};;);`,
    `for (let [foo] = arr, bar;;);`,
    'for (var foo = arr, [bar] = arr2;;);',
    `for (() => { this in null };;);`,
    `for (let [foo, ...bar] = obj;;);`,
    `for (let {x} = obj;;);`,
    `for ({x = y} = (z);;) {}`,
    'for (var {x : y = z} = obj;;);',
    'for (var {x = y, z = a} = obj;;);',
    `for (let [foo, bar=b] in arr);`,
    `for (let [foo=a, bar=b] in arr);`,
    'for (var x, {y} = obj;;);',
    `for (let [...foo] = obj;;);`,
    `for (a * b + c * d;b;c);`,
    `for (const {...x} in y){}`,
    `for (var a in stored = a, {a: 0, b: 1, c: 2});`,
    `for ([a.b] in c) d`,
    'for(()=>{a in b};;);',
    `let = 4;
  for ( [let][0]; ; )
    break;
  `,
    'for (var a=1, b=2;;);',
    'for (const foo = bar, zoo = boo;;);',
    'for (var a, b=1;;);',
    'for (var a=1, b;;);',
    'for (let a of b);',
    'for (let [,,] = x;;);',
    'for (let [foo] = arr;;);',
    'for (let foo;;);',
    'for (let foo = bar;;);',
    'for (yield[g]--;;);',
    'for (let foo, bar;;);',
    'for (let [foo] = arr, [bar] = arr2;;);',
    'for (let=10;;);',
    'for (var a=1;;);',
    'for (var a;;) { let a; }',
    'for (var x = 0; x < 1000000; x++);',
    'for (var a,b,c;;);',
    'for (var a;;);',
    'for (var a = b in c);',
    'for (var a=1, b=2;;);',
    'for (let x = a, {y} = obj;;);',
    `for(let x = 0;;);`,
    `for (let [,] = a(); b < 1; ) {}`,
    `for (const [ x, ] = y; a < 1; ) {};
   for (const [ x, ] =  z; a < 1; ) {};`,
    'for (var x = 3;;) { const x = 1 }',
    'for (var x = 3;;) { const x = 1 }',
    `for (let [a]=x;;);
   for (let [a]=x;;);`,
    'for (let { x, } = { x: 23 }; a < 1; ) {}; for (let { x, } = { x: 23 }; a < 1; ) {};',
    'for ([] in (class {})) for (;;) continue',
    'for (const [,foo] = arr;;);',
    'for (var {x, y : z} = obj;;);',
    'for (let [[x] = [1]] = []; i < 1; i++) {}',
    'for (const [foo] of arr);',
    'for (const {x = y, z = a} = obj;;);',
    'for (var x of y);',
    `for (var x;;);`,
    `for (let x of y);`,
    `for (let x;;);`,
    `for (let x of y);`,
    `for ([] + x;;);`,
    `for (let x of y);`,
    `for (let [x] in y);`,
    `for (let {x} of y);`,
    `for (let x of y);`,
    `for (let {x} = x;;);`,
    `for (let [x] = x;;);`,
    `for (let x;;);`,
    `for (let {x} of y);`,
    `for (let [x] in y);`,
    `for (let in x);`,
    `for (let in x) {}`,
    `for (let x of y);`,
    `for (let[x] in y);`,
    `for (let[x] of y);`,
    `for (let , x;;);`,
    `for (let + x;;);`,
    `for (let.x;;);`,
    `for (let.foo in x);`,
    `for (let();;);`,
    `for (let().foo in x);`,
    `for (let=10;;);`,
    `for (let.foo;;);`,
    `for (let [,,] = x;;);`,
    `for (;;) let
    {}`,
    `for (let [foo] = arr, [bar] = arr2;;);`,
    `for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}`,
    `for(function(){};;)x`,
    `for ([].w ^= s;;) x;`,
    `for ([][y] <<= p;;) x;`,
    `for ([].u |= c;;) x;`,
    `for ({}.u |= c;;) x;`,
    `for ({}[y] ^= x;;) x;`,
    `for (2 + b;;);`,
    `for ({} + b;;);`,
    `for ("abc" + b;;);`,
    `for ([] !== x;;);`,
    'for (let {} = obj;;);',
    `for ([x];;);`,
    'for (/foo/;;);',
    'for ("foo".x += z;;);',
    `for ([x.y] = z;;);`,
    `for ({x} = z;;);`,
    `for ("foo".bar;;);`,
    `for ({__proto__: 1, __proto__: 2};;);`,
    'for ({};;);',
    `for (((x)=>{}) ;;);`,
    `for(function(){while(x in y)t};;)x`,
    `for(function(){do;while(x in t)};;)x`,
    `function *f(){ for (yield;;); }`,
    'for (let {x} = a, {y} = obj;;);',
    'for (let {a, [x]: y} = a;;);',
    `for ([{x:a.b}]=x ;;) ;`,
    `for ([{x,...x}]=x ;;) ;`,
    `for ([{x=y}]=x ;;) ;`,
    `for ([][b] in c) d;`,
    `for (a()[b] in c) d;`,
    `for (function(){};;);`,
    `for (function(){ }[foo];;);`,
    `for (function(){ if (a in b); };;);`,
    `for (function(){ a in b; };;);`,
    `for ({x,...x}=x ;;) ;`,
    `for ({x=y}=x ;;) ;`,
    `for (a.b in c) d;`,
    `for (x[a in b] ;;);`,
    `for (a;b;c);`,
    `for (a;b;);`,
    `for (a;;c);`,
    `for (;b;);`,
    `for (true ? a in b : {}; false; ) ;`,
    'for (var x;;) { let x; }',
    `try {} catch (e) { for (let e;;) {} }`,
    `a => { for (let a of b) c }`,
    `for (x(x in t);;) x`,
    `for (let [a]=x;;);
  for (let [a]=x;;);`,
    `for (let;;);`,
    'for (const [,] of x);',
    'for ((let)[x].foo;;);',
    'for ((let).foo;;);',
    'for ((let);;);',
    'for (const {a, [x]: y} in obj);',
    'for (const {[x]: y} in obj);',
    'for (const {x : y, z, a : b = c} in obj);',
    'for (const {x} of obj);',
    'for (const [foo,] in arr);',
    'for (const [] in x);',
    'for (const {a, [x]: y} = a;;);',
    'for (const {[x]: y = z} = a;;);',
    'for (const {[x]: y} = z;;);',
    'for (const {x : y, z, a : b = c} = obj;;);',
    'for (const {x : y = z} = obj;;);',
    'for (const {x, y : z} = obj;;);',
    'for (const {x : y, z} = obj;;);',
    'for (const {x : y} = obj;;);',
    'for (const {x : y = z} in obj);',
    'for (const {x : y, z : a} in obj);',
    'for (const {x, y : z} in obj);',
    'for (const {x : y, z} in obj);',
    'for (const {x : y} in obj);',
    'for (const {x = y, z = a} in obj);',
    'for (const {x, y = z} in obj);',
    'for (const {x = y, z} in obj);',
    'for (const {x = y} in obj);',
    'for (let {x = y, z} = obj;;);',
    'for (let {x : y, z} = obj;;);',
    'for (const [a=[...b], ...c] in obj);',
    'for (const [...[foo, bar]] in obj);',
    'for (const [foo, ...bar] in obj);',
    'for (const [...foo] in obj);',
    'for (const [foo=a, bar=b] in arr);',
    'for (const [foo, bar=b] in arr);',
    'for (const {x, y} in obj);',
    `for (const {} in obj);`,
    'for (const {x,} = obj;;);',
    'for (let {x : y, z : a} = obj;;);',
    'for (const {x} = obj;;);',
    'for (const [foo, ...bar] = obj;;);',
    'for (const [foo=a, bar=b] = arr;;);',
    'for (const [foo=a, bar] = arr;;);',
    'for (const [foo=a] = arr;;);',
    'for (const foo = arr, [bar] = arr2;;);',
    'for (const [foo] = arr, bar = arr2;;);',
    'for ([x];;);',
    'for ([x.y];;);',
    'for ([x] = z;;);',
    'for ([x.y] = z;;);',
    'for ({x};;);',
    'for ({x: a.b};;);',
    'for ({a: x + y};;);',
    'for ({x} = z;;);',
    'for ({a: x.y} = z;;);',
    'for ("foo".bar;;);',
    'for ("foo".bar = x ;;);',
    'for ({}.bar ;;);',
    'for ({}.bar = x ;;);',
    'for ([].bar ;;);',
    'for ([].bar = x ;;);',
    'for (let [x] = iter; a < 1; ) {}',
    'for (let [arrow = () => {}] = []; a < 1; ) {}',
    'for (let [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]; a < 1; ) {}',
    'for (let [,] = g(); a < 1; ) {}',
    'for (let [ , , ...x] = values; a < 1; ) {}',
    'for (let { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}',
    'for (let { gen = function* () {}, xGen = function* x() {} } = {}; a < 1; ) {}',
    'for (let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }; a < 1; ) {}',
    'for (let {...x} = { get v() { count++; return 2; } }; a < 1; ) {}',
    'for (var [x, y, z] = [1, 2, 3]; a < 1; ) {}',
    'for (var [[x]] = [null]; a < 1; ) {}',
    'for (var [,] = g(); a < 1; ) {}',
    'for (var [...x] = values; a < 1; ) {}',
    'for (var { x, } = { x: 23 }; a < 1; ) {}',
    'for (var { x: y } = { x: 23 }; a < 1; ) {}',
    'for (var {...x} = { get v() { count++; return 2; } }; a < 1; ) {}',
    'for (x=>{};;);',
    'for ((x)=>{};;);',
    'for (x=>{x in y};;);',
    'for (let [,] = x;;);',
    `let = 4;
    for ( [let][0]; ; )
      break;
    `,
    'for (let\nfoo;;);',
    'for (let [] = x;;);',
    'for (let x, {y} = obj;;);',
    'for (let {x : y} = obj;;);',
    'for (let = 1; let < 1; let++) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'for (let [foo] = arr, bar;;);',
    'for (let [foo, ...bar] = obj;;);',
    'for (let {x} = obj;;);',
    'for (let [foo, bar=b] in arr);',
    'for (((x)=>{}) ;;);',
    'for (((x)=>{}).x ;;);',
    'for (let a;;);',
    'for (let a,b,c;;);',
    'for (let foo in x);',
    'for (var a = ++b in c);',
    'for (var a = 0 in stored = a, {});',
    'for (var a = (++effects, -1) in x);',
    'for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2});',
    'for (var a in stored = a, {a: 0, b: 1, c: 2});',
    'for (a * b + c * d;b;c);',
    'for ((a * b + c) * d;b;c);',
    'for ([a.b].foo in c) d',
    'for ({a: b.c} in d) e',
    'for ({a: b.c}.foo in d) e',
    'for (a + b * c * d;b;c);',
    'for(var x = 0;;);',
    'for (let [foo=a, bar=b] in arr);',
    'for (let foo = arr, [bar] = arr2;;);',
    'for (const [...x] in y){}',
    'for (;;);',
    'for (a;;);',
    'for (x--;;);',
    'for (foo=10;;);',
    'for (;;) 12',
    'for (;;) {}',
    'yield\nfor (;;) {}',
    'for (;;) let \n {}',
    'for (let {x} = obj;;);',
    'for (let {x,} = obj;;);',
    'for (let {x : y = z} = obj;;);',
    'for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}',
    'for (;;) let \n x = 1',
    'for (true ? a in b : {}; false; ) ;',
    'for (a;b;c);',
    'for ((a * b + c) * d;b;c);',
    `for (var c, f; (/[+-\\\\l-]/u); ((class {}).with)) var i;`,
    `for ({da = 2e308} of ([, , , (arguments[((f))]).break = (null)] = (/(?=\\B\\b)/gmuy === njbcpwhomopc.switch))) continue`,
    'for (const [target, weights] of Array.from(weightsPerTarget)) {}',
    'for (x instanceof a>c;;) x',
    'for (let a = b => (b in c); ;);',
    'for (/x/g + b;;);',
    'for ("abc" + b;;);',
    'for (2 + b;;);',
    'for ({} + b;;);',
    'for ([] + b;;);',
    'for (a + b;;);',
    'for ([] !== x;;);',
    'for ([] instanceof obj;;);',
    'for (12 instanceof obj;;);',
    'for (a instanceof b;;);',
    `for ([] + x;;);`,
    `for ([], x;;);`,
    `for ([] + x;;);`,
    `for ({x} = z;;);`,
    `for (a=>b;;);`,
    'for ({x} = y;;);',
    'for ({eval = 0} ;;);',
    'for ([x] = y;;);',
    'for (; ([x, bw, y = z], [{j, [(((t)))]: g = "N	¯B", c, o} = class u extends `c` {}], bar, ka) => `c{([, ] ** delete 2e308.static ++), arguments}`;) hnjtmujeg: for (ikdgsltnabvjnk of false) var y = /([])*?|K\x78B\b/gu',
    `for ({"a": ((~2e308)).eq = ((((t)[2e308] = (4.940161093774018e132[(null)] --)))), a, [(function* (b) {
  })]: c} of (2969)) debugger;`,
    'for (;; (k = x)) throw (null)',
    'for (;; ({} = (--x), of, ...bar) => (a)) {}',
    'for (o of ((946090429347418))[("")]) try {} finally {}',
    'foo("0,1,2,3", forInNames.join());',
    'for (const var1 in {a: 6}) { function foo() { var1 = 0; } }',
    'for ([var1, var2] of [[1, 1], [2, 2]]) { }',
    'for (a,(b in c) ;;) break',
    'for ((2935) instanceof ((2e308));;) debugger',
    'for (; false; ) let\n{}',
    'for (var x in obj) { const x = 1 }',
    'for(let\n{} = {};;);',
    'for (let [,] = x;;);',
    'for (let [,,] = x;;);',
    'for (let [foo] = arr;;);',
    'for (let [foo,] = arr;;);',
    'for (let [foo,,] = arr;;);',
    'for (let [,foo] = arr;;);',
    'for (let [,,foo] = arr;;);',
    'for (let [foo,bar] = arr;;);',
    'for (let [foo,,bar] = arr;;);',
    'for (a+b;;) c;',
    'for (x;;);',
    'for (let [foo] = arr, [bar] = arr2;;);',
    'for (let [foo] = arr, bar;;);',
    'for (let [foo] = arr, bar = arr2;;);',
    'for (let foo = arr, [bar] = arr2;;);',
    'for (let [foo=a, bar] = arr;;);',
    'for (let [foo, bar=b] = arr;;);',
    'for (let [foo=a, bar=b] = arr;;);',
    'for (let [...foo] = obj;;);',
    'for (let [foo, ...bar] = obj;;);',
    'for (let [...[foo, bar]] = obj;;);',
    'for (let {} = obj;;);',
    'for (let {x} = obj;;);',
    'for (let {x,} = obj;;);',
    'for (let {x, y} = obj;;);',
    'for (let {[x]: y = z} = a;;);',
    'for (let {a, [x]: y} = a;;);',
    'for (let [foo,] in arr);',
    'for (let {[x]: y} in obj);',
    'for (let {[x]: y = z} in obj);',
    'for (let {x, y} of obj);',
    'for (let x = 1; x < 1; x++) {}',
    'for (let x in {}) {}',
    'for (let x of []) {}',
    'for (var a, b ; ; ) { break } ',
    'for (var a = b, b = a ; ; ) break',
    'for (var a = b, c, d, b = a ; x in b ; ) { break }',
    'for (var a = b, c, d ; ; 1 in a()) break',
    'for (var a in b in c) break',
    'for (var a = foo("should be hit") in b) break',
    'for (const x = 20; ; ) break',
    'for (const x of []) break',
    'for (const x in {}) break',
    'for (const x = 20; ; ) { const x = 20; break; }',
    'for (const x of []) { const x = 20; break; }',
    'for (const x in {}) { const x = 20; break; }',
    'for (a;b;);',
    'for (;;c);',
    'for ({x = y} = (z);;) {}',
    'for (;;c);',
    'for (;b;);',
    'for (a;;c);',
    'for (;b;c);',
    'for (`<${new arguments(++r.function[eval], () => {}, function () {""}, (a)in this, true)}`; x ^= arguments;) {}',
    'for (() => { this in null };;);',
    `let = 4;
  for ( [let][0]; ; )
    break;
  `
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Non destructible with initializer and destruct', () => {
    t.deepEqual(parseScript('for (let x = a, {y} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x'
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'a'
                }
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'y'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Empty object', () => {
    t.deepEqual(parseScript('for (let {} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: []
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Dynamic property as second property', () => {
    t.deepEqual(parseScript('for (let {a, [x]: y} = a;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    {
                      type: 'BindingProperty',
                      key: {
                        type: 'IdentifierReference',
                        name: 'x'
                      },
                      value: {
                        type: 'BindingIdentifier',
                        name: 'y'
                      },
                      computed: true
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'a'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Double variable simple', () => {
    t.deepEqual(parseScript('for (let {x} = a, {y} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'a'
                }
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'y'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Double destruct without and with initializer', () => {
    t.deepEqual(parseScript('for (let {x, y = z} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x'
                    },
                    {
                      type: 'BindingElement',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'y'
                      },
                      initializer: {
                        type: 'IdentifierReference',
                        name: 'z'
                      }
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Double destruct both with initializer', () => {
    t.deepEqual(parseScript('for (let {x = y, z = a} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingElement',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'x'
                      },
                      initializer: {
                        type: 'IdentifierReference',
                        name: 'y'
                      }
                    },
                    {
                      type: 'BindingElement',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'z'
                      },
                      initializer: {
                        type: 'IdentifierReference',
                        name: 'a'
                      }
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Destruct and non-destruct with initializer', () => {
    t.deepEqual(parseScript('for (let {x} = a, obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'a'
                }
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'obj'
                },
                initializer: null
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('Correct dynamic property', () => {
    t.deepEqual(parseScript('for (let {[x]: y} = z;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingProperty',
                      key: {
                        type: 'IdentifierReference',
                        name: 'x'
                      },
                      value: {
                        type: 'BindingIdentifier',
                        name: 'y'
                      },
                      computed: true
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'z'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for(;;) {}', () => {
    t.deepEqual(parseScript('for(;;) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: null,
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [] = x;;);', () => {
    t.deepEqual(parseScript('for (let [] = x;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: []
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  // it('for (let = 1; let < 1; let++) {}', () => {
  //     t.deepEqual(parseScript('for (let = 1; let < 1; let++) {}'), {});
  //  });
  it('for (let [foo, ...bar] = obj;;);', () => {
    t.deepEqual(parseScript('for (let [foo, ...bar] = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    {
                      type: 'BindingRestElement',
                      argument: {
                        type: 'BindingIdentifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let a;;);', () => {
    t.deepEqual(parseScript('for (let a;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ((a * b + c) * d;b;c);', () => {
    t.deepEqual(parseScript('for ((a * b + c) * d;b;c);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'BinaryExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a'
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'b'
                  },
                  operator: '*'
                },
                right: {
                  type: 'IdentifierReference',
                  name: 'c'
                },
                operator: '+'
              }
            },
            right: {
              type: 'IdentifierReference',
              name: 'd'
            },
            operator: '*'
          },
          condition: {
            type: 'IdentifierReference',
            name: 'b'
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (a + b * c * d;b;c);', () => {
    t.deepEqual(parseScript('for (a + b * c * d;b;c);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'BinaryExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'b'
                },
                right: {
                  type: 'IdentifierReference',
                  name: 'c'
                },
                operator: '*'
              },
              right: {
                type: 'IdentifierReference',
                name: 'd'
              },
              operator: '*'
            },
            operator: '+'
          },
          condition: {
            type: 'IdentifierReference',
            name: 'b'
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for(var x = 0;;);', () => {
    t.deepEqual(parseScript('for(var x = 0;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x'
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0
                }
              }
            ],
            kind: 'var'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (a;;);', () => {
    t.deepEqual(parseScript('for (a;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'IdentifierReference',
            name: 'a'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (x--;;);', () => {
    t.deepEqual(parseScript('for (x--;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'PostfixUpdateExpression',
            operator: '--',
            operand: {
              type: 'IdentifierReference',
              name: 'x'
            }
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (foo=10;;);', () => {
    t.deepEqual(parseScript('for (foo=10;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'foo'
            },
            operator: '=',
            right: {
              type: 'NumericLiteral',
              value: 10
            }
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (;;) 12', () => {
    t.deepEqual(parseScript('for (;;) 12'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: null,
          condition: null,
          incrementor: null,
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',
              value: 12
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (;;) {}', () => {
    t.deepEqual(parseScript('for (;;) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: null,
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            statements: []
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (true ? a in b : {}; false; ) ;', () => {
    t.deepEqual(parseScript('for (true ? a in b : {}; false; ) ;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ConditionalExpression',
            shortCircuit: {
              type: 'BooleanLiteral',
              value: true
            },
            consequent: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'a'
              },
              right: {
                type: 'IdentifierReference',
                name: 'b'
              },
              operator: 'in'
            },
            alternate: {
              type: 'ObjectLiteral',
              properties: []
            }
          },
          condition: {
            type: 'BooleanLiteral',
            value: false
          },
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (a;b;c);', () => {
    t.deepEqual(parseScript('for (a;b;c);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'IdentifierReference',
            name: 'a'
          },
          condition: {
            type: 'IdentifierReference',
            name: 'b'
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for ((a * b + c) * d;b;c);', () => {
    t.deepEqual(parseScript('for ((a * b + c) * d;b;c);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'BinaryExpression',
            left: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a'
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'b'
                  },
                  operator: '*'
                },
                right: {
                  type: 'IdentifierReference',
                  name: 'c'
                },
                operator: '+'
              }
            },
            right: {
              type: 'IdentifierReference',
              name: 'd'
            },
            operator: '*'
          },
          condition: {
            type: 'IdentifierReference',
            name: 'b'
          },
          incrementor: {
            type: 'IdentifierReference',
            name: 'c'
          },
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (((x)=>{}) ;;);', () => {
    t.deepEqual(parseScript('for (((x)=>{}) ;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ArrowFunction',
              params: [
                {
                  type: 'BindingIdentifier',
                  name: 'x'
                }
              ],
              contents: {
                type: 'FunctionBody',
                statements: [],
                directives: []
              },
              async: false
            }
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (((x)=>{}).x ;;);', () => {
    t.deepEqual(parseScript('for (((x)=>{}).x ;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'MemberExpression',
            member: {
              type: 'ParenthesizedExpression',
              expression: {
                type: 'ArrowFunction',
                params: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x'
                  }
                ],
                contents: {
                  type: 'FunctionBody',
                  statements: [],
                  directives: []
                },
                async: false
              }
            },
            expression: {
              type: 'IdentifierName',
              name: 'x'
            },
            computed: false
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let a;;);', () => {
    t.deepEqual(parseScript('for (let a;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [,] = x;;);', () => {
    t.deepEqual(parseScript('for (let [,] = x;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (() => { this in null };;);', () => {
    t.deepEqual(parseScript('for (() => { this in null };;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'ThisExpression'
                    },
                    right: {
                      type: 'NullLiteral',
                      value: null
                    },
                    operator: 'in'
                  }
                }
              ],
              directives: []
            },
            async: false
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [foo, ...bar] = obj;;);', () => {
    t.deepEqual(parseScript('for (let [foo, ...bar] = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    {
                      type: 'BindingRestElement',
                      argument: {
                        type: 'BindingIdentifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (var a;;);', () => {
    t.deepEqual(parseScript('for (var a;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (var a,b,c;;);', () => {
    t.deepEqual(parseScript('for (var a,b,c;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
              },
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'b'
                },
                initializer: null
              },
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'c'
                },
                initializer: null
              }
            ],
            kind: 'var'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  // it('for (var x = 0; x < 1000000; x++);', () => {
  //   t.deepEqual(parseScript('for (var x = 0; x < 1000000; x++);'), {});
  // });

  it('for (let a,b,c;;);', () => {
    t.deepEqual(parseScript('for (let a,b,c;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'b'
                },
                initializer: null
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'c'
                },
                initializer: null
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (var a;;) { let a; }', () => {
    t.deepEqual(parseScript('for (var a;;) { let a; }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            statements: [
              {
                type: 'LexicalDeclaration',
                kind: 'let',
                declarations: [
                  {
                    type: 'LexicalBinding',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    initializer: null
                  }
                ]
              }
            ]
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [foo=a] = arr;;);', () => {
    t.deepEqual(parseScript('for (let [foo=a] = arr;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'BindingIdentifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'arr'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (var a=1;;);', () => {
    t.deepEqual(parseScript('for (var a=1;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'VariableDeclaration',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'a'
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 1
                }
              }
            ],
            kind: 'var'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [,,] = x;;);', () => {
    t.deepEqual(parseScript('for (let [,,] = x;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [foo] = arr;;);', () => {
    t.deepEqual(parseScript('for (let [foo] = arr;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'arr'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [foo,] = arr;;);', () => {
    t.deepEqual(parseScript('for (let [foo,] = arr;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'arr'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let [foo] = arr, [bar] = arr2;;);', () => {
    t.deepEqual(parseScript('for (let [foo] = arr, [bar] = arr2;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'arr'
                }
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'arr2'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}', () => {
    t.deepEqual(parseScript('for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
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
              },
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'b'
                    }
                  ]
                },
                initializer: {
                  type: 'ObjectLiteral',
                  properties: []
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'BlockStatement',
            statements: [
              {
                type: 'LexicalDeclaration',
                kind: 'let',
                declarations: [
                  {
                    type: 'LexicalBinding',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    initializer: null
                  },
                  {
                    type: 'LexicalBinding',
                    binding: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingIdentifier',
                          name: 'b'
                        }
                      ]
                    },
                    initializer: {
                      type: 'ObjectLiteral',
                      properties: []
                    }
                  }
                ]
              },
              {
                type: 'BlockStatement',
                statements: [
                  {
                    type: 'LexicalDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'LexicalBinding',
                        binding: {
                          type: 'BindingIdentifier',
                          name: 'a'
                        },
                        initializer: null
                      },
                      {
                        type: 'LexicalBinding',
                        binding: {
                          type: 'ObjectBindingPattern',
                          properties: [
                            {
                              type: 'BindingIdentifier',
                              name: 'b'
                            }
                          ]
                        },
                        initializer: {
                          type: 'ObjectLiteral',
                          properties: []
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ],
      webCompat: true
    });
  });

  it('for (let {x} = obj;;);', () => {
    t.deepEqual(parseScript('for (let {x} = obj;;);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForStatement',
          initializer: {
            type: 'ForDeclaration',
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'BindingIdentifier',
                      name: 'x'
                    }
                  ]
                },
                initializer: {
                  type: 'IdentifierReference',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          },
          condition: null,
          incrementor: null,
          statement: {
            type: 'EmptyStatement'
          }
        }
      ],
      webCompat: true
    });
  });
});
