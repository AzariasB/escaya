import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Class', () => {
  // Invalid cases
  for (const arg of [
    'class foo { async get x(){} }',
    'class foo { async set x(y){} }',
    'class foo { async x : 0 }',
    'class foo { async static x(){} }',
    'class foo { "static *async x(){} }',
    'class foo { static async *(){} }',
    'class foo { static async get x(){} }',
    'class foo { static async set x(y){} }',
    'class foo { static async x : 0 }',
    'class x extends super() {}',
    'class a { constructor(){      class x extends super() {}    }}',
    'class A {async get [x](){}}',
    'class A {async get [foo](){}}',
    // class x{*[yield](a){}}
    'class x{get *[x](){}}',
    'class x { *"x"(){}',
    'class X {    async constructor() {}   }',
    'class yield { }',
    'class w {  t[x](){}  }',
    'class x extends 08 {}',
    'class x { x = new y<a>() }',
    'class x { x = new y<a>() }',
    'class C {} class D extends C { foo() { return super?.bar; } }',
    'class C {} class D extends C { foo() { return super?.["bar"]; }',
    'class C {} class D extends C { constructor() { super?.(); } }',
    'class Y {;* get [1](){}set get(b){};get set(){}}',
    'class P {set "constructor"(E){};async *"x"(){};get l(){}}',
    'class C {;;;async "x"(){}get get async(){}}',
    'class Y extends super.foo {;;set 3.(x){};;}',
    'class x extends y { i() { a, class {async *constructor(){}async set(){}async *"__proto__"(){}} } }',
    'class q extends super() {;;get [.2](){}}',
    'class u extends super.foo {;get get M(){};async set set(H){};}',
    'class b extends [] {set async *3.(){};get get(){}}',
    'class q extends super.foo {;;set async(L){};}',
    'class i {;async *async(){}* async *4e5(){};}',
    'class l extends {} {;;get set "y"($){}async *"constructor"(){}* set async(i){}}',
    'class x { b() { a, class extends super() {;async *"x"(){}} } }',
    'class f {set async *set(){};* set get(C){};set async set(){}}',
    'class extends super() {;set B(x){};;}',
    'let B = class t extends super() {get ["y"](){};}',
    'async function *o(){ a, class {get async get(){};async async(){}} }',
    'class W extends super.foo {get set set(t){}async set set get "x"(){}async *d(){};;}',
    `class A {* get [x](){}}`,
    'class A {* set [foo](x){}}',
    `class x{get *foo(){}}`,
    `class x{get *"foo"(){}}`,
    `class x{async *%x(a){}}`,
    `class x{set *555(a){}}`,
    `class A {async set 11(x){}}`,
    `class A {async **f(){}}`,
    `class A {**=f(){}}`,
    'class A { *async x(){} }',
    'class A { async *(){} }',
    'class x {*f(foo = [{m: t(await bar)}]){}}',
    'class x {async f(foo = [{m: t(await bar)}]){}}',
    'class x {f(foo = [{m: t(await bar)}]){}}',
    //'class x {f(foo = await bar){}}',
    'class x {async f(foo = await bar){}}',
    'class x {async *f(foo = await bar){}}',
    //'class x {*f(foo = await bar){}}',
    'class A { async constructor() {} }',
    'class A { async set foo() {} }',
    'class C { async\nam() { } };',
    'class x {set set __proto__(f){};get get(){}get [super.foo](){}async *[s](){}}',
    'class x extends y { B() { a, class D extends super() {* * set 3.(d){};;} } }',
    'class x extends await y { }',
    'class X { async constructor() {} }',
    'class x{ async static static(){} }',
    'class x { async *constructor(){} }',
    'class x { async constructor(){} }',
    '(class x{async *get 8(){}})',
    'class extends base {}',
    'class name { * }',
    'class name { *',
    'class name { *; }',
    'class name { *get x() {}',
    'class name { *set x(_) {} }',
    'class name { *static m() {} }',
    'class C extends Base { *async x(){} }',
    'class C extends Base { async set x(y){} }',
    'class C extends Base { async x : 0 }',
    'class C {async *(){}}',
    'class A {* get foo(){}}',
    'class C {async set x(y){}}',
    // 'class x{[x](a=await Y){}}',
    'class x{set *"foo"(a){}}',
    'class x{set *[x](a){}}',
    'class A {"x"){}}',
    'class A {"x"{}}',
    'class x{get *"foo"(){}}',
    'class x{get *foo(){}}',
    'class A {async **=f(){}}',
    'class A {async **f(){}}',
    'class A {*=f(){}}',
    'class A {**f(){}}',
    'class A {* get "foo"(){}}',
    `(class A {async
      'y'(){}get .2(){};;})`,
    'class x{   async static static(){}    }',
    'class A {async set 11(x){}}',
    'class A {* set 12(x){}}',
    'class x{get *%x(){}}',
    `class x { async
      /foo/ }`,
    `class x
      /foo/ {}`,
    `class x {
        /foo/ }`,
    `class x { set
          /foo/ }`,
    `class x { x
            /foo/ }`
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

  // Valid cases
  for (const arg of [
    'class name  {}',
    'class name {}',
    'class name  extends F {}',
    'class name extends F {}',
    'class x {static *[y](){}}',
    'class A {get [foo](){}}',
    'class x { get [y](){}}',
    'class x{*555(){}}',
    'class A {set [foo](x){}}',
    'class x{   *static(){}    }',
    'class A {static get [foo](){}}',
    'class A {static set [foo](x){}}',
    'class A {get "foo"(){}}',
    'class A {"constructor"(){}}',
    'class A {set "foo"(x){}}',
    'class A {static get "foo"(){}}',
    'class A {static "x"(){}}',
    'class A {static set "foo"(x){}}',
    'class A {"set"(){} "get"(){} "async"(){}}',
    'class A {[a](){}}',
    'class A {;}',
    '(class {;})',
    'class A {*foo(){}}',
    'class x { *prototype(){} }',
    'class A {async 3(){}}',
    'class x { async prototype(){} }',
    'class x { "prot\\x6ftype"(){} }',
    //'class x { async *prot\\u006ftype(){} }',
    // 'class x { async *prot\\u006ftype(){} }',
    'class x { "prototype"(){} }',
    'class A {get foo(){}}',
    'class A {set foo(x){}}',
    'class A { true(x){}}',
    'class A { 42e2(x){}}',
    'class A { 42e-2(x){}}',
    'class A { const(x){}}',
    'class A { class(x){}}',
    'class A { yield(x){}}',
    'class A { else(x){}}',
    'class A { async class(x){}}',
    'class A { static yield(x){}}',
    'class A { do(x){}}',
    'class A { catch(x){}}',
    'class A {static get foo(){}}',
    'class A {static set foo(x){}}',
    'class x{async *foo(a){}}',
    'class x{async *"foo"(a){}}',
    'class x{[x](a=await){}}',
    'class name  extends (F, G) {}',
    'class name extends (F, G) {}',
    'class foo { constructor() {} }',
    'class C { "constructor"(){} ["constructor"](){} }',
    'class C { async method(x, y = x, z = y) {} }',
    'class C { async *gen() {} }',
    'class x { "construct\\u{6f}r"(){} }',
    'class x{*foo(){}}',
    'class x{[yield](a){}}',
    'class x{*"foo"(){}}',
    'class x { async *prototype(){} }',
    'class x { get prototype(){} }',
    'class C { static async *method() {} }',
    'class C { async *method(a, b,) {} }',
    'class x{ constructor(){  (super.a) += 1;  }}',
    'class a extends b { constructor(){      class x extends super() {}    }}',
    'class C { async *method({...rest} = {a: 3, b: 4}) {} }',
    'class C { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {} }',
    'class C { async *method([, , ...x]) {} }',
    'class C { static async *method([x]) {} }',
    'class x{[x](await){}}',
    'class x {f(await){}}',
    'class x {async await(){}}',
    'class x {async *await(){}}',
    'class x {*await(){}}',
    'class C { async *method({ [function icefapper() {}]: x }) {} }',
    'class C { async *method({ a, b = function c(){}, d = ++icefapper }) {} }',
    'class C { static *constructor() {} }',
    'class C { static async *method([,] = function*() {}) {} }',
    'class C { static async *method([_, x] = []) {} }',
    'class C { a(){}b(){} }',
    'class C { a(){} }',
    'class C { *[1]() {} }',
    'class C { set "doubleQuote"(a) {} }',
    'class C { set 0(a) {a} }',
    'class C { set "unicod\\u{000065}Escape"(a) {} }',
    'class C { get "character\tescape"() { return "get string"; } }',
    `class foo { constructor() { class bar { constructor() {} }} }`,
    'class foo extends bar {}',
    'class foo extends bar { method() {} get property() { return this._property; }  set property(value) {  this._property = value; }}',
    'class foo extends class bar {} {}',
    'class foo extends class { constructor() {}} {}',
    'class foo extends class { constructor() {} } { constructor() {} }',
    'class foo { [Symbol.iterator]() {} ["method"]() {} }',
    'class foo { static classMethod() {} method() {} }',
    'class foo { static get property() {} static set property(value) {} }',
    'class foo { async method(a, b = 39,) {} }',
    'class foo { async method(a, b,) {} }',
    'class foo { static method(a,) {} }',
    'class foo { static set a(_ = null) {} }',
    'class name extends class {} {}',
    'class name extends class {} {}',
    'class name extends class base {} {}',
    'class name extends class base {} {}',
    'class A {get 5(){}}',
    'class x { a() {}}',

    'class x {;;;;;;;;;;;;;;;;;;;}',
    'class x {;;;; a() {}}',
    'class x {;;;;  a() {} ;;;; b() {};;;  static a() {};;;}',
    'class x {static *bar() { }}',
    'class x {static[a](){}; static[b](){}  }',
    'class x {static a(){} static get a(){} static set a(b){}}',
    'class x { static ["prototype"](){}}',
    'class x { async() { }}',
    'class x {*async() { }}',
    'class x {static foo() {} foo() {}}',
    'class x {static foo() {} static foo() {}}',

    'class x {static get foo() {} static get foo() {}}',
    'class x {static set foo(x) {} static set foo(x) {}}',
    'class x {static get foo() {} static set foo(x) {} get foo() {} set foo(x) {}}',
    'class x {static foo() {} get foo() {} set foo(x) {}}',
    'class x {set arguments(_) {}}',
    'class x {static arguments() {}}',
    'class x {static set arguments(_) {}}',
    'class x {static async foo() { }}',
    'class x {async await() {}}',
    'class x {static async await() { }}',
    'class x {constructor() {}; static constructor() {}}',
    'class x {get get() {}}',
    'class x {prototype() {}}',
    'class x {eval() {}}',
    'class x {constructor(a, b, c) {}}',
    'class x {static ["prototype"](){}}',
    'class x {static constructor(){} static constructor(){}}',
    'class x {static async method(a, b,) {}}',
    'class x {async method(x, y = x, z = y) {}}',
    'class x {async *method({...rest} = {a: 3, b: 4}) {}}',
    'class x {async *method([, , ...x] = [1, 2]) {}}',
    'class x {async *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {}}',
    'class x {async *method([...{ length }]) {}}',
    'class x {async *method([...x]) {}}',
    'class x {async *method([, , ...x]) {}}',
    'class x {static async *method([...{ length }]) {}}',
    'class x {static async *method([...[,]]) {}}',
    'class x {static async *method([x]) {}}',
    'class x {async *method({ a, b = function c(){}, d = ++x}) {}}',
    'class x {static get constructor() {}}',
    'class x {static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = []) {}}',
    'class x {static async *method([[] = function() { initCount += 1; }()] = [[23]]) {}}',
    'class x {static async *method([x] = {}) {}}',
    'class x {static async *method([x] = {}) {}}',
    'class x {set x(v) {}}',
    'class x {set "doubleQuote"(a) {}}',
    'class x {set 0o10(a) {a}}',
    'class x {set 0(a) {a}}',
    'class x {static set [_ = "str' + 'ing"](param) {}}',
    'class x {get "character\tescape"() { return "get string"; }}',
    'class x { async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}}',
    'class x { async *method({ x: y } = { x: 23 }) {}}',
    'class x { static x(){}}',
    'class x { static [x](){}}',
    'class x { static get 8(){}}',
    'class x { method([[...x] = values]) {}}',
    'class x extends await { }',
    'class a { b(c,) {} }',
    'class C {set x(_) {do { new.target } while (0)}}',
    'class X { constructor() { new.target }}',
    'class X { foo() { new.target }}',
    'class X { static foo() { new.target }}',
    'class A {constructor(x=new.target){}}',
    'class A {a(x=new.target){}}',
    'class C { set 0o10(a) {a}}',
    'class C { set 0(a) {a}}',
    'class C { set "unicod\\u{000065}Escape"(a) {}}',
    'class C { static async *method([arrow = () => {}] = []) {}}',
    'class C { static async *method([_, x] = []) {}}',
    'class C { async *method({ a: b = c }) {}}',
    'class C { async *method({ s: t = a(), u: v = b(), w: x = c(), y: z = d() }) {}}',
    'class C { async *method({ [function x() {}]: x }) {}}',
    'class C { async *method([, ...x] = (function*() {})()) {}}',
    'class C { static constructor(){} static constructor(){}}',
    'class C { [1]() { return "B"; }}',
    'class C { static get ""() { return "get string"; }}',
    'class C { [ID(2)]() { }}',
    'class C { async await() {}}',
    'class C { static* async() {}}',
    'class C { *async() {}}',
    'class C { foo() {} static get foo() {} static set foo(x) {}}',
    'class C { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {}}',
    'class C { ;;;;  a() {} ;;;; b() {};;;  static a() {};;;}',
    'class C { async *method([arrow = () => {}] = []) { }}',
    'class C { async foo(a) { await a }}',
    'class C { static foo() {} foo() {}}',
    'class C { async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}}',
    'class C { static async await() { }}',
    'class C { static* async() { }}',
    'class C { static async() { }}',
    'class C { static async foo() { }}',
    'class A { async* f() { await a; yield b; } }',
    'class A { static async* f() { await a; yield b; } }',
    'class x extends feh(await) { }',
    'class x {static static(){}}',
    'class x { [await](){} }',
    'f = ([cls = class {}]) => {}',
    'f = ([xCls2 = class { name() {} }]) => {}',
    '(class x{}.foo())',
    `(class{}
      / foo / g)`,
    `x = class{}
      / foo / g`,
    'class x{ constructor(){} *9(){} }',
    'class x{ constructor(){} 9(){} }',
    'class x { [constructor](){} }',
    'class x { static constructor(){} }',
    'class A extends 1.2 {}',
    'class A extends async {}',
    'class A extends await {}',
    'class A extends fooo {}',
    'class A {async [foo](){}}',
    'class x { async [y](){}}',
    'class gsleitgutmw extends this {}',
    'class A {*[foo](){}}',
    'class x { static async [y](){}}',
    'class x {[`{`](){}}',
    `class C extends (
      a,
      c
    ) {
    }`,
    `class X {
      ''() { }
    }`,
    'class A extends (oh,yes) {}',
    'class x{async *555(a){}}',
    'class x{   static *static(){}    }',
    'class x{   async static(){}    }',
    'class x {[x](){}}',
    `class x extends y{}
     09`,
    'class x{   static static(){}    }',
    'class x {a(){}; a(){}; b(){}}',
    `class C extends (
      a,
      c
    ) {
    }`,
    'class n extends ({} = x) {}',
    'class n extends ([] = x) {}',
    'class x { foo(x=await){} }',
    'class x extends feh(await) { }',
    'class x extends y {constructor(){    ({790: super.cool})    }}',
    'class A {*4(){}}',
    'class x { *[expr](){} }',
    'class A {1(){}}',
    'class x {static break(){}}',
    'class x {get break(){}}',
    'class x {get break(){}}',
    'class A extends B { *get() {} }',
    'class A {static 2(){}}',
    'class A {static constructor(){}}',
    'class A { async* f() { await a; yield b; } }',
    'class A { static async* f() { await a; yield b; } }',
    'class x { async *[y](){}}',
    //'class A{ b(){ return super?.b; } }',
    'const o = { C: class {} }; new o?.C();',
    'const o = { C: class {} }; new o?.["C"]();',
    'class C {} new C?.();',
    // 'class C {} new C?.();',
    'class a { a() { } }'
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

  // Tests reserved keywords
  for (const arg of [
    'implements',
    'interface',
    'let',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'var',
    'yield'
  ]) {
    it(`class ${arg} {};`, () => {
      t.throws(() => {
        parseScript(`class ${arg} {};`);
      });
    });

    it(`"use strict"; class ${arg} {};`, () => {
      t.throws(() => {
        parseScript(`"use strict"; class ${arg} {};`);
      });
    });
  }

  it('Double wrapped group in the middle', () => {
    t.deepEqual(parseScript('x = ((y)) = z'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'y'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('Assign with dud group', () => {
    t.deepEqual(parseScript('a = ((b)) = c;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'c'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });
});
