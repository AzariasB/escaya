import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Super', () => {
  // Invalid cases
  for (const arg of [
    'class x extends feh(super()) { }',
    'super(this)',
    'super',
    'super?.a',
    'class x extends y { constructor(){ ({ constructor(x=super()){} }); } }',
    'class x extends y { constructor(){ class z { constructor(x=super()){} }; } }',
    'var C = class { async *method() { super(); } }',
    'var gen = { async *method() { var x = { y: function () { super(); } } } }',
    'x={ dsda(){ return (a=super()) => a; }}',
    'x={ fo(){ return () => super(); }}',
    'class x extends y { foo(){ return () => () => super(); }}',
    'class x extends y { dsda(){ return (a=super()) => a; }}',
    'class x { [super y](){} }',
    //'class f { constructor(){  class super { }  }}',
    'class f { constructor(){  class x extends super { }  }}',
    'class f { constructor(){  class x extends super y { }  }}',
    'class f { constructor(){  class x extends feh(super) { }  }}',
    'class f { constructor(){  class x extends feh(super y) { }  }}',
    //'class f { constructor(){  class x { foo(super){} }  }}',
    'class f { constructor(){  class x { foo(x=super){} }  }}',
    'class f { constructor(){  class x { foo(x=super y){} }  }}',
    'class f { constructor(){  class x { foo(x=new (super)()){} }  }}',
    'class f { constructor(){  class x { [super](){} }  }}',
    'class f { constructor(){  class x { [super y](){} }  }}',
    //'class f { bar(){ class super {} }}',
    'class f { bar(){ class x extends super { }  }}',
    'class f { bar(){ class x extends super y { }  }}',
    'class f { bar(){ class x extends feh(super) { }  }}',
    'class f { bar(){ class x extends feh(super y) { }  }}',
    //'class f { bar(){ class x { foo(super){} }  }}',
    'class f extends bar { constructor(){ class x extends super { }  }}',
    'class f extends bar { constructor(){ class x extends super y { }  }}',
    'class f extends bar { constructor(){ class x extends feh(super) { }  }}',
    'class f extends bar { constructor(){ class x extends feh(super y) { }  }}',
    'class f { constructor(){ class x extends super.foo y { }  }}',
    'class f { constructor(){ class x extends feh(super.foo y) { }  }}',
    'class f { constructor(){ class x { foo(super.foo){} }  }}',
    'g=function f(x = super()){ }',
    'g={f: function f(){ super() }]',
    '!{ a() { !function* (a = super.b()){} } };',
    'async(foo) => { super() };',
    'class A extends B { constructor() { (super)() } }',
    'function wrap() { function foo(a = super(), b = super.foo()) {}}',
    '({ a() { (super).b(); } });',
    'class f { constructor(){ class x { [super.foo y](){} } }}',
    'class f extends bar { constructor(){ class x extends feh(super.foo y) { }  }}',
    'class f extends bar { constructor(){ class x { foo(super.foo){} }  }}',
    'class f extends bar { constructor(){ class x { foo(x=super.foo y){} }  }}',
    'class x { [super()](){} }',
    'new super[27]()',
    'class C { method() { super(); } }',
    'class C { method() { () => super(); } }',
    '({ m() { function f() {foo(super)} } })',
    'class f { constructor(){ class x { foo(x=super()){} } }}',
    'class f { constructor(){ class x { foo(x=super() y){} } }}',
    'class f { bar(){ class super() {}  }}',
    'class f extends bar { constructor(){ class x { super.foo(){} }  }}',
    'class f extends bar { constructor(){ class x { [super.foo y](){} }  }}',
    'class f extends bar { x(){ class super.foo { }  }}',
    'class f extends bar { x(){ class x extends super.foo y { }  }}',
    //'class f extends bar { xxx(){ class super {} }}',
    'class f extends bar { x(){ class x extends feh(super()) {} }}',
    'class f extends bar { x(){ class x extends feh(super() y) { } }}',
    'class f extends bar { x(){ class x { [super() y](){} } }}',
    'class f extends bar { xxx(){ class x extends super { }  }}',
    'class f extends bar { xxx(){ class x extends super y { }  }}',
    'class f extends bar { xxx(){ class x extends feh(super) { }  }}',
    'class f extends bar { xxx(){ class x extends feh(super y) { }  }}',
    //'class f extends bar { xxx(){ class x { foo(super){} }  }}',
    'class f extends bar { xxx(){ class x { foo(x=super){} }  }}',
    'class f extends bar { xxx(){ class x { foo(x=super y){} }  }}',
    'class f extends bar { xxx(){ class x { foo(x=new (super)()){} }  }}',
    'class f extends bar { xxx(){ class x { [super](){} }  }}',
    'class x extends super { }',
    'class x extends super y { }',
    'class x { foo(x=new (super)()){} }',
    'class f extends bar { x(){ class x { [super.foo y](){} }  }}',
    'class f { bar(){ class x extends super.foo y {} }}',
    '({ get x() { super(); } })',
    'class C { method() { new super; } }',
    'class C { method() { new super; } }',
    'class C { set x(_) { new super; } }',
    '({ get x() { new super(); } })',
    '({ set x(_) { new super(); } })',
    '({ f: function() { () => new super(); } })',
    'var f = function() { () => new super(); }',
    '(function*() { () => new super; })',
    'var f = function*() { () => new super; }'
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
    'class a extends b { c() { [super.d] = e } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => super.foo) { return y(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => {return super.foo}) { return y(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => {return () => super.foo}) { return y()(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { constructor(x = () => super.foo) { super(); this._x_f = x; } x() { return this._x_f(); } }',
    'class a extends b { constructor(){   class x extends y { [super()](){} }    }}',
    'class a extends b { constructor(){      class x extends super() {}    }}',
    'class a extends b { constructor(){   class x { [super()](){} }    }}',
    'class a extends b { foo(){      class x extends super.foo {}    }}',
    'class a { foo(){      class x extends super.foo {}    }}',
    'class a extends b { foo(){   class x extends y { [super.foo](){} }    }}',
    'class a extends b { foo(){   class x { [super.foo](){} }    }}',
    'class a { foo(){   class x extends y { [super.foo](){} }    }}',
    'class f extends bar { constructor(){  class x { [super()](){} }  }}',
    'class f extends bar { constructor(){  class x extends feh(super()) { }  }}',
    'class f extends bar { constructor(){  class x extends super() { }  }}',
    'class f extends bar { xxx(){  class x { [super.foo](){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=super.foo){} }  }}',
    'class f extends bar { xxx(){  class x extends feh(super.foo) { }  }}',
    'class f extends bar { xxx(){  class x extends super.foo { }  }}',
    'class f extends bar { constructor(){  class x { [super.foo](){} }  }}',
    'class f extends bar { constructor(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f extends bar { constructor(){  class x { foo(x=super.foo){} }  }}',
    'class f extends bar { constructor(){  class x extends feh(super.foo) { }  }}',
    'class f extends bar { constructor(){  class x extends super.foo { }  }}',
    'class f { bar(){  class x { [super.foo](){} }  }}',
    'class f { bar(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f { bar(){  class x { foo(x=super.foo){} }  }}',
    'class f { bar(){  class x extends feh(super.foo) { }  }}',
    'class f { bar(){  class x extends super.foo { }  }}',
    'class f { constructor(){  class x { [super.foo](){} }  }}',
    'class f { constructor(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f { constructor(){  class x { foo(x=super.foo){} }  }}',
    'class f { constructor(){  class x extends feh(super.foo) { }  }}',
    `class f extends bar { constructor(){  class x { [super.foo](){} }  }}`,
    `class f extends bar { constructor(){  class x { foo(x=new (super.foo)()){} }  }}`,
    `class f { bar(){  class x { [super.foo](){} }  }}`,
    `class f { bar(){  class x { foo(x=super.foo){} }  }}`,
    `class f { constructor(){  class x { [super.foo](){} }  }}`,
    `class f extends bar { xxx(){  class x { super(){} }  }}`,
    `class f { bar(){  class x { super(){} }  }}`,
    `class a { foo(){   class x { [super.foo](){} }    }}`,
    `class f extends bar { constructor(){  class x extends super() { }  }}`,
    `class f extends bar { xxx(){  class x { foo(x=super.foo){} }  }}`,
    `class f extends bar { xxx(){  class x extends super.foo { }  }}`,
    `class f extends bar { constructor(){  class x extends feh(super.foo) { }  }}`,
    `class f { bar(){  class x extends super.foo { }  }}`,
    `class f { bar(){  class x { foo(x=new (super.foo)()){} }  }}`,
    `class a extends b { c() { [super.d] = e } }`,
    `class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => super.foo) { return y(); } }`,
    `class a extends b { foo(){   class x { [super.foo](){} }    }}`,
    `class f { constructor(){  class x { foo(x=new (super.foo)()){} }  }}`,
    `class f { constructor(){  class x { foo(x=super.foo){} }  }}`,
    `class C { constructor() {new super.x; } }`,
    `class x { foo(){ super.foo; }}`,
    `class x extends y { constructor(){ return () => super(); }}`,
    `class x extends y { constructor(){ return (a=super()) => a; }}`,
    `class x extends y { foo(){ return () => () => super.foo; }}`,
    `x={ fo(){ return () => super.foo; }}`,
    `x={ dsda(){ return (a=super.foo) => a; }}`,
    `class x extends y { constructor() { log(super.foo); super(); } }`,
    `class x extends y { constructor(x = this) { super(); } }`,
    `class x extends y { constructor(x = super(), y = this) { } }`,
    `class x extends y { constructor() { super(); super(); } }`,
    'class C extends B { constructor() { () => super(); } }',
    'class C extends B { constructor() { super(); } }',
    'class C { constructor() { new super.x; } }',
    'class C { *method() { new super.x; } }',
    'class C { get x() { new super.x; } }',
    'class C { set x(_) { new super.x; } }',
    '({ method() { new super.x(); } })',
    '({ *method() { new super.x(); } })',
    '({ set x(_) { new super.x(); } })',
    'class C { constructor() { new super.x(); } }',
    'class C { *method() { () => new super.x(); } }',
    'class C { get x() { () => new super.x(); } }',
    'class C { set x(_) { () => new super.x(); } }',
    '({ method() { () => new super.x(); } })',
    '({ *method() { () => new super.x; } })',
    '({ set x(_) { () => new super.x; } })',
    'class C { constructor() { () => new super.x; } }',
    'class C { *method() { () => new super.x; } }',
    '({ method() { new super.x; } })',
    `class x extends y { constructor(){ return () => () => super(); }}`,
    `class x { constructor(){ super.foo; }}`,
    `class x { foo(x=super.foo){ }}`,
    `class x { constructor(){ super[foo]; }}`,
    `class x { foo(x=super[foo]){ }}`,
    `class x extends y { constructor() { log(this); super(); } }`,
    `class x extends y { constructor() { super(this); } }`,
    `class x extends y { constructor() { let xx = x + x; super(); } }`,
    `class x extends y { constructor() { super(); } }`,
    `class x extends y { constructor(x = super()) { } }`,
    'class f { constructor(){  class x extends super.foo { }  }}',
    'class x { foo(x=new (super.foo)()){} }',
    'class x { foo(x=super.foo){} }',
    'class f extends bar { xxx(){  class x { super(){} }  }}',
    'class f extends bar { constructor(){  class x { super(){} }  }}',
    'class f { bar(){  class x { super(){} }  }}',
    'class f { constructor(){  class x { super(){} }  }}',
    'class a { foo(){   class x { [super.foo](){} }    }}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
