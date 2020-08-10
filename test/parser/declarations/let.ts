import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Let', () => {
  // Invalid cases
  for (const arg of ['switch/("', 'let [1 <= 0] = "foo"']) {
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
    'var let;',
    'var foo, let;',
    'let',
    'let x = function *f(foo = await){}',
    'let o = {f(foo = await){}}',
    `do let
    while(x)`,
    'try { } catch (let) { }',
    'let {let: foo} = x;',
    `while (x) let
    {}`,
    'function let() { }',
    '(function let() { })',
    '(let).foo in x;',
    '(let) in x',
    'function foo(let) { }',
    'function foo(bar, let) { }',
    'let = 1;',
    'let await',
    'let private',
    'let protected',
    'var foo = let = 1;',
    'if (x) ; else let',
    `for (;;) let
    x = 1`,
    '_ => let[foo];',
    `_ => let
    {foo};`,
    'let();',
    'let ℮',
    'let * 2;',
    '++let;',
    'let++;',
    'let: 34',
    'let: while (true) continue let;',
    'let: let;',
    'foo: let: y;',
    'if (x) let: y;',
    '_ => { let: foo; }',
    'function f(){ let: foo; }',
    'let: foo;',
    `for (;;) let
    {}`,
    `if (x) let
    {}`,
    'function let(let) { let: let(let + let(0)); }',
    '({ let: 1 })',
    '({ get let() { 1 } })',
    'let(100)',
    'L: let\nx',
    'L: let\n{x}',
    'let',
    'let = 1',
    'for (let = 1; let < 1; let++) {}',
    'for (let in {}) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var let in {}) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'var let',
    'let;',
    'let f = /* before */async /* a */ ( /* b */ a /* c */ , /* d */ b /* e */ ) /* f */ => /* g */ { /* h */ ; /* i */ }/* after */;',
    'let g = /* before */async /* a */ ( /* b */ ) /* c */ => /* d */ 0/* after */;',
    'let h = /* before */async /* a */ a /* b */ => /* c */ 0/* after */;',
    'let [ , , ...x] = [1, 2, 3, 4, 5];',
    'let test262id8;',
    'let a1; [a1] = [1]',
    'let [...rest2] = [1, 2, 3, 4, 5];',
    'let [a4, b4, c4, ...rest4] = [1, 2, 3];',
    'let a1; [[a1]] = [[1]];',
    'let a1; [[a1, b1] = [1, 2]] = [];',
    'let a1; [a1, b1, c1, d1, ...rest1] = "testing";',
    'let arrow = () => {};',
    `let x = class x {};
   let y = class {};
   let z = class { static name() {} };`,
    'let [{ a }, { b }, { c = "" }] = [a, b, c];',
    'let [{ x }] = [x];',
    'let [[x]] = [null];',
    'let [x = 23] = [undefined];',
    'let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];',
    'let [,] = function* g() { first += 1;  second += 1; };',
    'let [ , , ...x] = [1, 2, 3, 4, 5];',
    'let { arrow = () => {} } = {};',
    'let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };',
    'function foo() { var let = 1, test = 2; }',
    'let [arrow = () => {}] = [];',
    'let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];',
    'let [{ x }] = [];',
    'let [...x] = [1, 2, 3];',
    'let z = {...x}',
    'z = {x, ...y}',
    'let { x, } = { x: 23 };',
    'let [a,] = 0;',
    'let [...[x]] = y',
    'let a; [[a]] = [[]];',
    'let [[a]] = [[]];',
    'let [a, [b]] = [1, []];',
    'let a, b; [((((a)))), b] = [];',
    'let [[[...a]]] = [[[]]];',
    'let {} = 0',
    'let x  ;\n',
    'let _a = 5;\n',
    'let {a:{}} = 0',
    'let x = 5, y = 6;',
    'let x = 5, y = fcall();',
    'let x = 5, y = 6, z = 7;',
    'let $ = 5;',
    'let x = 5, a = 6, z = 7;',
    'let x = 5, y = 6, a = 7;',
    'let x = /* bef */5 + 3/* aft */;',
    'let [x, ...[a, b]] = obj;',
    'let x = y + 5;',
    'let x=y + 5;',
    'let [[a]=[1]] = [[2]];',
    'let/foo/g',
    `{ let x = 5; let y = 6; }`,
    'let {a,b=0,c:d,e:f=0,[g]:[h]}=0',
    'let [...a] = 0;',
    'let [a,,]=0',
    'let [{a}] = 0',
    'let { x: y = 33 } = { };',
    'let { x: y } = { x: 23 };',
    'let { x, y, } = obj;',
    'let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: null };',
    'let {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};',
    'let o = { 999999999999999999n: true };',
    'let { 1n: a } = { "1": "foo" };',
    `let a = "a";
  let b = "b";
  let { x, y, } = obj;
  for (let x = "x", i = 0; i < 1; i++) { let y = "y"; }`,
    '[1 <= 0]',
    `let y = async x => { await x; }`,
    `let o = {*f(await){}}`,
    'let a; [a] = [];',
    'let a, b; [a, b] = [1];',
    'let [a] = [1, 2];',
    'let a; [a,] = [];',
    'let a; [,,a] = [];',
    'let [a] = [,,];',
    'let a; [...a] = [];',
    'let a; [a = 1] = [];',
    'let [[a]] = [[]];',
    'let a, b; [a, [b]] = [1, []];',
    'let [[[...a]]] = [[[]]];',
    'let b = async () => [];',
    'let [[...a], ...b] = [[],];',
    'let a = {}; [a.x] = [];',
    'let a; [a, a] = [];',
    'let [[...x] = [2, 1, 3]] = [];',
    'let [[] = function() {}()] = [[23]];',
    'let [[] = function() { return function*() {}(); }()] = [];',
    'let [,,] = x;',
    'letarguments',
    'letarguments.length',
    'let\nawait',
    'let\nimplements',
    'let\ninterface',
    'letpackage',
    'letprivate',
    'letyield',
    'let eval',
    'let eval',
    'let implements',
    'let eval',
    'let\nfoo',
    'let\n[foo]\r=\n2\n;',
    'let foo = bar, zoo = boo',
    'let foo = bar',
    'let foo = bar;',
    'let foo, bar',
    'let foo, bar;',
    'let foo;',
    'let {foo} = x, b = y;',
    'let {foo} = x, {bar} = y;',
    'let [foo,bar=b] = x;',
    'let x = y, [foo] = z;',
    'let [foo,bar] = x;',
    `while (x) let
   {}`,
    'let [foo] = x;',
    'let [foo] = arr, [bar] = arr2;',
    'let [foo] = arr, bar;',
    'let [foo] = arr, bar = arr2;',
    'let foo, [bar] = arr2;',
    'let foo = arr, [bar] = arr2;',
    'let [foo=a] = arr;',
    'let [foo=a, bar] = arr;',
    'let [foo, bar=b] = arr;',
    'let [foo=a, bar=b] = arr;',
    `let async
   function f(){}`,
    'let [foo, ...bar] = obj;',
    'let [...[foo, bar]] = obj;',
    'let [x, ...[foo, bar]] = obj;',
    'let [a=[...b], ...c] = obj;',
    'let {} = obj;',
    'let {x} = obj;',
    'let {x, y} = obj;',
    'let {x} = a, {y} = obj;',
    'let {x} = a, y = obj;',
    'let {x} = a, obj;',
    'let f = async function g(){}',
    'let x = a, {y} = obj;',
    'let x, {y} = obj;',
    'let {x = y, z} = obj;',
    'let {x = y} = obj;',
    'let {x, y = z} = obj;',
    'let f = a + b + async\n() + d',
    'let f = a + b + async\nfunction g(){} + d',
    'let f = function f(await) {}',
    'let {x = y, z = a} = obj;',
    'let {x : y} = obj;',
    'let {x : y, z} = obj;',
    'let {x, y : z} = obj;',
    'let {x : y, z : a} = obj;',
    'let {x : y = z} = obj;',
    `let a = b?.c;`,
    'let {x : y, z, a : b = c} = obj;',
    'let {[x]: y} = z;',
    'let {[x]: y} = z;',
    'let {[x]: y = z} = a;',
    'let, lot',
    'let {a, [x]: y} = a;',
    'let [foo,,] = x;',
    'let [foo] = x, b;',
    'let obj = { 1: 1, 2: 2, 3: 3, 4: 4 };',
    'for (let foo = bar, zoo = boo;;);',
    'for (let foo in x);',
    'for (let\nfoo;;);',
    'for (let\nfoo in x);',
    'for (let foo of x);',
    'for (let\nfoo of x);',
    'for (let [] = x;;);',
    'let [] = x;',
    'let [foo,,] = arr;',
    'let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: "" };',
    'let { fn = function () {}, xFn = function x() {} } = {};',
    'switch (true) { case true: let x = 1; }',
    `let a = [];
 for (let i = 0; i < 5; a.push(function () { return i; }), ++i) { }
 for (let k = 0; k < 5; ++k) {
 }`,
    'let { x, } = { x: 23 };',
    'let { w: [x, y, z] = [4, 5, 6] } = {};',
    'let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };',
    'let { x: y = 33 } = { };',
    'let { x: y, } = { x: 23 };',
    'let x',
    'let x = 1',
    'let a, x\\u{E01D5}',
    'let xCls = class x {};',
    'let cls = class {};',
    'let\n{x} = x;',
    `let x = {y=z} = d`,
    'let x = () => ++a;',
    'let x = () => ++\na;',
    'let',
    `let x = ({y=z}) => d`,
    'let {x}\n= x;',
    'let xCls2 = class { static name() {} };',
    'let { s: t = a(), u: v = b(), w: x = c(), y: z = d() } = { s: null, u: 0, w: false, y: "" };',
    'let {} = obj;',
    'let {} = undefined;',
    'let {} = obj;',
    'let {} = undefined;',
    'let [, , ...x] = [1, 2];',
    'let test262id8;',
    'foo: let: y;',
    'let {a, b, c} = {}, e, f;',
    'let {a, b} = {}, c = 0;',
    'let {a, b} = c, d;',
    'let {a, b, c} = {}, e, f;',
    'if (1) let\n{}',
    'let {a, b} = {}, c = 0;',
    'let x = {y=z} = d',
    'let x = ({y=z}) => d',
    'let x = ({y=z}=e) => d',
    'let [foo] = arr;',
    'let [,] = x;',
    `if (false) {
    L: let // ASI
    x = 1;
  }`,
    `if (false) {
    L: let // ASI
    x = 1;
  }`,
    `if (false) {
    L: let // ASI
    x = 1;
  }`,
    'for (;let;);',
    'let.foo;',
    'let {let: foo} = x;',
    'let {a, let: foo} = x;',
    'let();',
    'let [x, ...[foo, bar]] = obj;',
    'let {} = obj;',
    'let {x} = obj;',
    'let {x, y} = obj;',
    `let.let = foo`,
    'var [let] = []'
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
});
