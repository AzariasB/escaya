import * as t from 'assert';
import { parseModule, recovery } from '../../../src/escaya';

describe('Module - Export', () => {
  // Invalid cases
  for (const arg of [
    // It is a Syntax Error if any element of the LexicallyDeclaredNames of ModuleItemList also occurs in
    // the VarDeclaredNames of ModuleItemList.
    'var a; export class a {};',
    'var a; export function a(){};',
    'var a; export let a;',
    'var a; export const a = 0;',
    'let a; export default function a(){};',
    'let a; export default class a {};',
    // It is a Syntax Error if the ExportedNames of ModuleItemList contains any duplicate entries.
    'export var a; export var a;',
    'let a; export {a, a};',
    'let a, b; export {a, b as a};',
    'let a; export {a, a as a};',
    'export { foo as "\\ud800\\udbff" }',
    'export {a}; export function a(){};',
    'export {a}; export class a{};',
    'export let a; export {a};',
    'export {a}; export const a = 0;',
    'export let a; let b; export {b as a};',
    'export default 0; export default 0;',
    'export default 0; export default function f(){};',
    'export default 0; export default class a {};',
    'var a; export default function() {} export { a as default };',
    'var a; export default class {} export { a as default };',
    'var a, b; export default a; export { b as default };',
    // It is a Syntax Error if any element of the ExportedBindings of ModuleItemList does not also occur
    // in either the VarDeclaredNames of ModuleItemList, or the LexicallyDeclaredNames of ModuleItemList.
    'export {a};',
    'export {b as a};',
    'var a; export {b as a};',
    'export {a as b}; var b;',
    'export {b as a};',
    'let a; export {b as a};',
    'export {a as b}; let b;',
    'export foo;',
    'export {y as z, y as x, y};',
    'export {y as x};',
    'export let f; export const f;',
    'export default var x = 7;',
    'export var new = 10;',
    'export default let x = 7;',
    'export default const x = 7;',
    '"use strict"; export default const x = 7;',
    'var a, b; export { a as b, b };',
    'var a, b; export { a as c, b as c };',
    'function a() {} function a() {}',
    'function a() export {} function a() {}',
    'function a() {} export function a() {}',
    'export function await() {}',
    'export function *await() {}',
    'export { encrypt }',
    'export { default as foo }',
    'export { if }',
    'export new Foo();',
    'export typeof foo;',
    'async package => 1;',
    'class Test {}; export default class Test {}',
    'export { encrypt }; export { encrypt }',
    'export { decrypt as encrypt }; function encrypt() {}',
    'export {x}; export let {...x} = y;',
    'export {x}; export let [x] = y;',
    'export {x}; export let [...x] = y;',
    'export {x}; export let [x] = y;',
    'export let x = y, {...x} = y;',
    'export let x = y, [x] = y;',
    'export let x = y, [...x] = y;',
    'export function x(){}; export let [x] = y;',
    'export let [x, x] = y;',
    'export let [x, x] = y;',
    'var a, b; export {b, a, a}',
    'var a, b; export {a, b as a}',
    `var a, b;
    export {a};
    export {b as a};`,
    `var a,b;
    export {a, b};
    export {a};`,
    'export var [foo = x];',
    'export var [foo], bar;',
    'export var [foo];',
    'export const [foo = x];',
    'export var await = 10;',
    'export let [foo], bar;',
    'export let [foo];',
    '"use strict"; with (x) y;',
    'export class a {} export async function a() {}',
    'export function a() {} export async function a() {}',
    'let a = b; export async function a() {} ',
    'export default async function a() {} export async function a() {}',
    'export class a {} export default async function a() {}',
    'let a = b; export default async function a() {} ',
    'export class extends C {}',
    'export * as foo from',
    'export { a, b as c, c, b };',
    'export class f {} export {f};',
    'export class f{}; async function f(){};',
    'export default function(){}; export default function(){};',
    'export {a as b};',
    'export default x; export {y as default};',
    'export {bar}, * from "bar";',
    'export * as foo, {bar} from "bar";',
    'var a,b; export {c, d}; export {e};',
    'export ...x = y',
    'export default ...x = y',
    'export let ...x = y',
    '{export {x};}',
    'x = { foo(){ export {x}; }}',
    'function f(){ return export {x}; }',
    'with (x) export {x};',
    'export *;',
    'export 12;',
    'export function() {}',
    'function foo() { }; export foo;',
    'export function () { }',
    'function foo() { export default function() { } }',
    'function foo() { }; export { , foo };',
    'function foo() { }; () => { export { foo }; }',
    'for(var i=0; i<1; i++) export default null;',
    'if (false) export default null;',
    'export',
    'export * as;',
    'export * as foo;',
    'export * as foo from;',
    'export * as ,foo from "bar"',
    'export B, * as A, { C, D } from "test";',
    'export typeof foo;',
    'export { , };',
    'var a, b; export { a as , b};',
    'export }',
    'export { Q } from;',
    'export { 123 } from;',
    'export default const x = 7;',
    'export default async function() { yield = 1; }',
    'var a, b; export { a as , b};',
    'var a; export { a',
    'var a; export { a',
    'var a; export { a,',
    'var a; export { a, ;',
    'var a; export { a as };',
    'var a, b; export { a as , b};',
    'export var {[x]} = z;',
    'export var {[x]};',
    'export var {[x] = y} = z;',
    // 'export async',
    'var x; export { x as z }; export * as z from "string";',
    'const a = 0; export let a;',
    'var a; let a;',
    'var a; export const a = 0;',
    'export {a, b as a};',
    'export {a, a as a};',
    'export {a}; export class a{};',
    'export {a}; export function a(){};',
    'export let x = y, [...x] = y;',
    'var a,b; export {a}; export {a, b};',
    'export { x as y };',
    'export var foo; export let foo;',
    'export var [...foo, bar] = obj;',
    'export var [...foo,,] = obj;',
    'export var [...] = obj;',
    'export var [.x] = obj;',
    'export var [foo = x];',
    'export var [... ...foo] = obj;',
    'export default function(a){ let a; }',
    'export default function(a){ const a = 0; }',
    'export {b as a}; export {a};',
    'export {a}; export {b as a};',
    'export {x}; export let [x] = y;',
    'export async function await() {}',
    'export class { }',
    'function foo() { export default function() { } }',
    'function foo() { }; export { , foo };',
    'function foo() { }; () => { export { foo }; }',
    'function foo() { }; { export { foo }; }',
    'export const [x, x] = c',
    'export const [x, {x}] = y',
    'export const {x:x, x:x} = c',
    'export const a = b; let a = c',
    'export let ...x = y',
    'export default ...x = y',
    '{export {x};}',
    'for (;;) export {x};',
    'export *;',
    'export * as;',
    'export {',
    'export *;',
    'export * as;',
    'export * as foo;',
    "export * as foo from ';",
    "export * as ,foo from 'bar'",
    "export * as ,foo from 'bar'",
    'var a; export { a',
    'var a; export { a,',
    'var a; export { a, ;',
    'var a; export { a as };',
    'var a, b; export { a as , b};',
    'export default from "foo"',
    'for (let y in []) import v from "foo"',
    'export 3',
    'let a; let a;',
    'let a; export class a {};',
    'let a; export function a(){};',
    'let a; export let a;',
    'const a = 0; export class a {};',
    'const a = 0; export function a(){};',
    'var a, b; export {b, a, a}',
    'var a, b; export {a, b, c}',
    // 'export async () => y',
    'var a; export { a,',
    'var foo, bar; export {foo, ...bar}',
    'var foo, bar; export {[foo]}',
    'var foo, bar; export {{foo}}',
    'var foo; export {foo(){}}',
    'var foo; export {*foo(){}}',
    'export foo',
    'class C { method() { export default null; } }',
    'function foo() { }; export [ foo ];',
    // 'function foo() { }; export { foo as 100 };',
    'export function f(){}; async function f(){};',
    'export let a; export let a;',
    'export const a = 0; export const a = 0;',
    'let a; export let a;',
    'let a; export let a;',
    'let a; export class a {};',
    'let a; export function a(){};',
    'export default await',
    'var foo, bar; export {foo, ...bar}',
    'export bar, * as foo from "bar";',
    'switch (x) { export {x}; }',
    'export let x = y, [x] = y;',
    'export {x};',
    'export default function f(){}; var a; export { a as default };',
    'export default class a {} export default async function () {}',
    'export var a = x, a = y;',
    'export let [x] = y; export {x};',
    'export let [x] = y; export function x(){};',
    'export let x = ;',
    'export {',
    'var a; export { a',
    'var a; export { a,',
    'var a; export { a, ;',
    'var a; export { a as };',
    'var a, b; export { a as , b};',
    'export }',
    'var foo, bar; export { foo bar };',
    'export let ;',
    'export { foo };',
    'export { , };',
    'export default;',
    'export default var x = 7;',
    'export default let x = 7;',
    'export default const x = 7;',
    'export * from;',
    'export { Q } from;',
    "export default from 'module.js';",
    'export { for }',
    'export { for as foo }',
    'export { arguments }',
    'export { arguments as foo }',
    'var a; export { a, a };',
    'var a, b; export { a as b, b };',
    'var a, b; export { a as c, b as c };',
    'export default function f(){}; export default class C {};',
    'export default function f(){}; var a; export { a as default };',
    'export function() {}',
    'export function*() {}',
    'export class {}',
    'export class extends C {}',
    'export *;',
    'export * as;',
    'export * as foo;',
    'export * as foo from;',
    "export * as foo from ';",
    "export * as ,foo from 'bar'"
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export default async function() {}',
    'export default async function f(){}',
    'export default async function(){}',
    'export default async () => y',
    'export default async (x) => y',
    'export default async x => y',
    'export default async(x);',
    'export default async.x;',
    'export default async function f() {}',
    'export default x;',
    "export * as arguments from 'bar'",
    "export * as await from 'bar'",
    "export * as default from 'bar'",
    "export * as enum from 'bar'",
    "export * as foo from 'bar'",
    "export * as for from 'bar'",
    "export * as let from 'bar'",
    "export * as static from 'bar'",
    "export * as yield from 'bar'",
    'export const foo = async function() { }',
    'export function async() { }',
    'export default function() {}',
    'export default function*() {}',
    'export default class C {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    "export {thing}; import thing from 'a.js';",
    "export {thing}; import {thing} from 'a.js';",
    'export function func() { };',
    'export class C { };',
    'export class A extends B {};',
    'export default class A extends B {};',
    'export { };',
    'export let a3 = 3;',
    'export function set(x) { value = x };',
    'export let value = 0;',
    'export default function*() {}',
    'export function foo() { return 42 }',
    'export default 42;',
    'export let a = 1;',
    'export function set_a(x) { a = x };',
    'export function get_a() { return a };',
    'export {get}; function get() {};',
    'export default x;',
    'export function* v() { return 40 }',
    'export var w = 41;',
    'export let x = 42;',
    'export class y {};',
    'export const z = "hello world";',
    'function f() {}; f(); export { f };',
    "export { a as b } from 'm.js';",
    "export * from 'p.js';",
    'export var foo;',
    'export default class cName { valueOf() { return 45; } }',
    'export function goo() {};',
    'export let hoo;',
    'export const joo = 42;',
    'export default (function koo() {});',
    'export var y = 0;',
    'export function func() { };',
    'export function foo () { return "foo"; }',
    'export const boo = 5;',
    'import {ns} from "three";',
    'export var j = 42;',
    'export let k = 42;',
    'export function l() {}',
    'export default function () {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    "export * as arguments from 'm.js'",
    "export * as await from 'm.js'",
    "export * as default from 'm.js'",
    "export * as foo from 'm.js'",
    "export * as for from 'm.js'",
    "export * as let from 'm.js'",
    "export * as static from 'm.js'",
    "export * as yield from 'm.js'",
    'export default [];',
    'export default 42;',
    'export default { foo: 1 };',
    'export * from "foo";',
    'export * as A from "test";',
    'export {default} from "foo";',
    'export {foo as bar} from "foo";',
    'export function *foo () {}',
    'export function x(){}; export let [z] = y;',
    'export var a = x, b = y;',
    'export var foo = 1;',
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    "export {thing}; import thing from 'a.js';",
    "export {thing}; import {thing} from 'a.js';",
    "export {thing}; import * as thing from 'a.js';",
    "export { a as b } from 'm.js';",
    "export * from 'p.js';",
    'export var foo;',
    'export function goo() {};',
    'export let hoo;',
    `export default class { constructor() {	foo() } a() {	bar()	}	}`,
    'export default (function koo() {});',
    'function f() {}; f(); export { f };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default function *a() {}',
    'export var foo = function () {};',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function*() {}',
    'export default class C {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    `export var x;
  x = 'Pass';`,
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function *a() {}',
    'export var y = 0;',
    'export function func() { };',
    'function f() {}; f(); export { f };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { yield } from 'm.js'",
    'export default function f(){}',
    'export default function* f(){}',
    'export default function(){}',
    'export default function* (){}',
    'export default 15',
    'export * from "x"',
    'export * as y from "x"',
    'export {}',
    'export {} from "x"',
    'export function* f(){}',
    'export function f(){}',
    'export async function f(){}',
    'export async function *f(){}',
    'export {a} from "x"',
    'export {a,} from "x"',
    'export {a as b} from "x"',
    'export {a as b,} from "x"',
    'export {a, b} from "x"',
    'export {a} from "x"',
    'export default function f(){}; export {f};',
    'export default async function f(){}; export {f};',
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    'export var document',
    'export var document = {}',
    'export var document',
    'export default 42',
    'export default class A {}',
    'export default (class{});',
    'export default /foo/',
    'export var namedOther = null;',
    'export var starAsVarDecl;',
    'export let starAsLetDecl;',
    'export const starAsConstDecl = null;',
    'export function starAsFuncDecl() {}',
    'export function* starAsGenDecl() {}',
    'export class starAsClassDecl {}',
    'export default class Foo {}++x',
    "export { x as y } from './y.js';\nexport { x as z } from './z.js';",
    "export { default as y } from './y.js';\nexport default 42;",
    'export default function(x) {};',
    'export default function () { };',
    'export default function _fn2 () { }',
    'class c { }; export default c',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    'var a; export default a = 10;',
    'export default () => 3',
    'function _default() { }; export default _default',
    'export let a, [...x] = y',
    'export let [...x] = y',
    // Named generator function statement
    'function* g() { }; export default g',
    'class c { }; export default c',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    'export default async \nfunction f(){}',
    "export const const2 = 'str';",
    'export const const3 = 3, const4 = 4;',
    'export const const5 = { }',
    'export const const6 = [ ]',
    'export {};',
    "export var var1 = 'string';",
    "export default 'default';",
    'export var var2;',
    'export var var3 = 5, var4',
    'export var var5, var6, var7',
    'export default 1;',
    'var a; export default a = 10;',
    'function _default() { }; export default _default',
    'function* g() { }; export default g',
    'export function *g() { } if (true) { }',
    'export class c1 { } if (true) { }',
    'export default function* _gn2 () { } if (true) { }',
    'export default class _cl2 { } if (true) { }',
    'export default function _fn2 () { } if (true) { }',
    'class c { }; export default c',
    'export async function f(){}; const z = foo;',
    'const f = foo; export async function z(){};',
    'export let x = y, {...z} = y;',
    'export let x = y, [...z] = y;',
    'export let [x] = y; export function z(){};',
    'export function x(){}; export let [z] = y;',
    'export class f {}; export function y() {}',
    'export class f {}; export function y() {}',
    'export default function () {}',
    'export default class {}',
    'export var a = x, b = y;',
    'export let [x, z] = y;',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    `export{};
    export {};
    export {}
    export
    {
    };
    export//-
    {//-
    //-
    };
    export/**/{/**/};`,
    `import {} from 'a';
    import 'b';
    import * as ns1 from 'c';
    import dflt1 from 'd';
    export {} from 'e';
    import dflt2, {} from 'f';
    export * from 'g';
    import dflt3, * as ns2 from 'h';`,
    'var a; export { a as b };',
    'export default 1',
    'export var {x} = a, {y} = obj;',
    `export default async function f() {}`,
    'export var {x} = a, y = obj;',
    'export default () => {}',
    'export { encrypt }\nvar encrypt',
    'function encrypt() {} let decrypt; export { encrypt, decrypt }',
    `export const foo = async function() { }`,
    `export class A extends B {};`,
    `export let a3 = 3;`,
    `export function set(x) { value = x };`,
    `export let value = 0;`,
    `export default function*() {}`,
    `export let x = 42;`,
    `function f() {}; f(); export { f };`,
    `export { a as b } from 'm.js';`,
    `export default class cName { valueOf() { return 45; } }`,
    `export default (function koo() {});`,
    `export * as arguments from 'm.js'`,
    `export * as default from 'm.js'`,
    `export default { foo: 1 };`,
    `var a; export { a as b, a as c };`,
    `export {thing}; import {thing} from 'a.js';`,
    'export async function a(){}',
    'export default async function (){}',
    'export default async\nfunction a(){}',
    `export default class { constructor() {	foo() } a() {	bar()	}	}`,
    `var a, b, c; export { a, b as baz, c };`,
    `export default async function f(){}; export {f};`,
    `export const const6 = [ ]`,
    `export async function *f(){} foo`,
    `function* baz() { }`,
    `function _default() { }; export default _default`,
    `class c { }; export default c`,
    `export let [x] = y; export function z(){};`,
    `export default async function() {}`,
    `export default () => x`,
    `export default async function(){} foo`,
    `export default async function f(){} foo`,
    `export default class {} foo`,
    `export default class {} foo`,
    `export default function f(){} foo`,
    `export class x {} foo`,
    `export * as foo from 'bar';`,
    `export * from 'bar';`,
    `export * from 'bar';`,
    `export let {...x} = y`,
    `export let a, [...x] = y`,
    `export default function* f(){}`,
    `export default function(){}`,
    `export default a in b`,
    `export {}`,
    `export const x = 10, y = 20`,
    `export default x
  /y`,
    `export let x, y`,
    `export default null;`,
    `export default 15;`,
    `export {}
  /foo/`,
    `export {x}; var x;`,
    `var x; export {x as a}`,
    `var x; export {x as a,}`,
    `export default "foo";`,
    `var x,y; export {x, y}`,
    `var x,y; export {x as a, y as b}`,
    `var x,y; export {x as a, y as b,}`,
    `export var x`,
    `export var x = 10, y = 20`,
    `export default {x, y} = x`,
    `export * from 'foo'`,
    'export {x} from "foo"',
    `export {x,} from "foo"`,
    `export default x;`,
    `export let x, y`,
    `export var y = 0;`,
    `var foo; export { foo as for };`,
    `export default 42`,
    `var x; export default x = 7`,
    'export let {a, b} = obj;',
    `export {thing}; import * as thing from 'a.js';`,
    `export default class extends C {}`,
    `export let x = y, {...z} = y;`,
    `export default foo => bar`,
    //'import {"default imports" as bar} from "foo"; bar;',
    'var foo, bar; export {foo as "defaultExports", bar};',
    //    'export { "some imports" as "some exports" } from "foo";',
    'import * as _someExports from "foo";   export { _someExports as "some exports" };',
    'export * as "忠恕。" from "Confucius";',
    'const foo = 42, bar = 42; export { bar as "\\udbff\\udfff" } ',
    'const quotation = ""; export { quotation as "學而時習之，不亦說乎？" };',
    'const foo = 42, bar = 42; export { foo, bar as "foo" }',
    `export default async = 1;`,
    `export * from 'bar';`,
    `export default (class{});`,
    `export default /foo/`,
    `export {};`,
    `export {foo as bar} from "foo";`,
    `export { static } from 'm.js'`,
    `export class Class {}`,
    `export default () => 3`,
    `export const const2 = 'str';`,
    `export { static } from 'm.js'`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true, cst: true });
      });
    });
  }

  it('const a = 1; export {a};', () => {
    t.deepStrictEqual(parseModule('const a = 1; export {a};', { loc: true, cst: true }), {
      directives: [],
      end: 24,
      leafs: [
        {
          declarations: [
            {
              binding: {
                end: 7,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                },
                name: 'a',
                start: 6,
                type: 'BindingIdentifier'
              },
              end: 11,
              initializer: {
                end: 11,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                },
                start: 10,
                type: 'NumericLiteral',
                value: 1
              },
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              },
              start: 6,
              type: 'LexicalBinding'
            }
          ],
          end: 12,
          isConst: true,
          meta: {
            asi: false,
            newlineBeforeNextToken: false
          },
          start: 0,
          type: 'LexicalDeclaration'
        },
        {
          boundNames: ['a'],
          declaration: null,
          end: 24,
          exportFromClause: null,
          exportedNames: ['a'],
          fromClause: null,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          },
          namedExports: [
            {
              binding: null,
              end: 22,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              },
              moduleExportName: null,
              name: {
                end: 22,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                },
                name: 'a',
                start: 21,
                type: 'IdentifierName'
              },
              start: 21,
              type: 'ExportSpecifier'
            }
          ],
          start: 13,
          type: 'ExportDeclaration'
        }
      ],
      start: 0,
      type: 'Module',
      webCompat: true
    });
  });

  it('export { a as b } from "b";', () => {
    t.deepStrictEqual(parseModule('export { a as b } from "b";', { loc: true, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [
            {
              type: 'ExportSpecifier',
              moduleExportName: null,
              name: {
                type: 'IdentifierName',
                name: 'a',
                start: 9,
                end: 10,
                meta: {
                  asi: false,
                  newlineBeforeNextToken: false
                }
              },
              binding: {
                type: 'IdentifierName',
                name: 'b',
                start: 14,
                end: 15,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              },
              start: 9,
              end: 15,
              meta: {
                asi: true,
                newlineBeforeNextToken: false
              }
            }
          ],
          exportFromClause: null,
          fromClause: {
            type: 'StringLiteral',
            value: 'b',
            start: 23,
            end: 26,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          exportedNames: ['b'],
          boundNames: ['a'],
          start: 0,
          end: 27,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      start: 0,
      end: 27
    });
  });

  it('export let x = 0;', () => {
    t.deepStrictEqual(parseModule('export let x = 0;', { loc: true, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'LexicalDeclaration',
            isConst: false,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'x',
                  start: 11,
                  end: 12,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 15,
                  end: 16,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                start: 11,
                end: 16,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 7,
            end: 17,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 17,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      start: 0,
      end: 17
    });
  });

  it('export const z = 0;', () => {
    t.deepStrictEqual(parseModule('export const z = 0;', { loc: true, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'LexicalDeclaration',
            isConst: true,
            declarations: [
              {
                type: 'LexicalBinding',
                binding: {
                  type: 'BindingIdentifier',
                  name: 'z',
                  start: 13,
                  end: 14,
                  meta: {
                    asi: false,
                    newlineBeforeNextToken: false
                  }
                },
                initializer: {
                  type: 'NumericLiteral',
                  value: 0,
                  start: 17,
                  end: 18,
                  meta: {
                    asi: true,
                    newlineBeforeNextToken: false
                  }
                },
                start: 13,
                end: 18,
                meta: {
                  asi: true,
                  newlineBeforeNextToken: false
                }
              }
            ],
            start: 7,
            end: 19,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          start: 0,
          end: 19,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      start: 0,
      end: 19
    });
  });

  it('export default x;', () => {
    t.deepStrictEqual(parseModule('export default x;', { loc: true, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDefault',
          declaration: {
            type: 'IdentifierReference',
            name: 'x',
            start: 15,
            end: 16,
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          start: 0,
          end: 17,
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ],
      start: 0,
      end: 17
    });
  });

  it('export class C { };', () => {
    t.deepStrictEqual(parseModule('export class C { };', { loc: false, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: {
            type: 'ClassDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'C',
              meta: {
                asi: false,
                newlineBeforeNextToken: false
              }
            },
            heritage: null,
            elements: [],
            meta: {
              asi: true,
              newlineBeforeNextToken: false
            }
          },
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        },
        {
          type: 'EmptyStatement',
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ]
    });
  });

  it('export { };', () => {
    t.deepStrictEqual(parseModule('export { };', { loc: false, cst: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExportDeclaration',
          declaration: null,
          namedExports: [],
          exportFromClause: null,
          fromClause: null,
          exportedNames: [],
          boundNames: [],
          meta: {
            asi: true,
            newlineBeforeNextToken: false
          }
        }
      ]
    });
  });
});
