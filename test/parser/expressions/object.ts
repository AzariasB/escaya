import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Object literal', () => {
  // Invalid cases
  for (const arg of [
    '({} /= x)',
    '({} |= x)',
    '({x=y})',
    '({set * bar(x){})',
    '({static * bar(x){})',
    '({ *method(x = yield) {} })',
    '({a = 1}, {b = 2}, {c = 3});',
    '({a = 1}, {b = 2}, {c = 3} = {});',
    '({a = 1}, {b = 2} = {}, {c = 3} = {});',
    '({ set x(a, b, c) { } })',
    '({ set x() { } })',
    'x({set 123: x});',
    'x({set "abc": x});',
    's = {"foo": typeof}',
    'x({set bar(...x){}});',
    'x = {f([b, a], {b}) {}}',
    'x = {f([b, a], b) {}}',
    '({ *method(yield) {} });',
    'x = {f([b, a], b=x) {}}',
    'x = {f([a, a, b]) {}}',
    'x = {f([b, a, a]) {}}',
    'x = {f(b, a, a) {}}',
    'x = {f(b, a, b, a = x) {}}',
    'x = {f(b, a, b, ...a) {}}',
    'x = {f(a, a) {}}',
    'x = {x=y};',
    '({get [1, 2](): 3})',
    '({get [expr], 0(})',
    '({get [expr]()',
    '({set [if (0) 0;](a){}})',
    '({[expr] 0})',
    '({[1, 2]: 3})', // because '1,2' is an Expression but not an AssignmentExpression
    '({[1;]: 1})', // and not an ExpressionStatement
    '({[if (0) 0;]})', // much less a Statement
    '({set [1;](a) {return 1}})',
    '!{ f(){ let a; var a; } };',
    '!{ *g(){ let a; var a; } };',
    '!{ get f(){ let a; var a; } };',
    '!{ set f(b){ let a; var a; } };',
    '!{ f(a, a){} };',
    '!{ f([a, a]){} };',
    '!{ *g(a, a){} };',
    '!{ *g([a, a]){} };',
    '!{ *g({a, a}){} };',
    '!{ f(a) { let a; } };',
    '!{ f([a]){ let a; } };',
    '!{ f({a}){ let a; } };',
    '!{ set f({a, a}){} };',
    '!{ set f([a, a]){} };',
    '!{ *g([a, a]){} };',
    '!{ set f(a) { let a; } };',
    '!{f(){ var x; let x; }}',
    '!{f(){ let x; var x; }}',
    '!{f(){ var x; let x; }}',
    '!{f(){ const x = y; var x; }}',
    '!{f(){ var x; const x = y; }}',
    '!{f(){ let x; function x(){} }}',
    '!{f(){ function x(){} let x; }}',
    '!{f(){ const x = y; function x(){} }}',
    '!{f(){ function x(){} const x = y; }}',
    '!{ *foo(x) { const x = 3; } }',
    '!{f({2: b}, ...b) {}}',
    '!{f({[a]: b}, ...b) {}}',
    '!{f({[x]: b}, b = ((b) => {}) ) {}}',
    '!{f({[a]: b}, ...b) {}}',
    '!{f({[a]: b}, ...b) {}}',
    '!{f({a: b}, ...b) {}}',
    '!{f({"a": b}, ...b) {}}',
    '!{f([b, a], ...b) {}}',
    '!{f([b, a], b=x) {}}',
    '!{f([a, a, b]) {}}',
    '!{f([b, a, b, a]) {}}',
    '!{f([b, a], b) {}}',
    '!{ set f([a]){ let a; } };',
    '!{ set f({a}){ let a; } };',
    '!{f(x) { const x = y }}',
    '!{ set f(a) { let a; } };',
    '!{ f({a, a}){} };',
    '!{ f({a, a}){} };',
    '!{ *foo(x) { let x = 3; } }',
    '({method(case){}});',
    '"use strict"; ({method(class){}});',
    '({*method(class){}});',
    '"use strict"; ({*method(catch){}});',
    '({method(enum){}});',
    '({ set prop(...a) {} }).prop = 1;',
    '"use strict"; ({method(extends){}});',
    //    '"use strict"; ({method(eval){}});',
    //  '({*method(eval){}});',
    '({*method(export){}});',
    '"use strict"; ({*method(this){}});',
    '"use strict"; ({*method(import){}});',
    '"use strict"; ({method(typeof){}});',
    '({*method(typeof){}});',
    '({method(new){}});',
    '"use strict"; ({method(super){}});',
    '({*method(void){}});',
    '"use strict"; ({*method(void){}});',
    '({method(var){}});',
    '({ set prop(...arguments) {} }).prop = 1;',
    "'use strict';(new (class { set prop(...a) {} })).prop = 1;",
    "'use strict';(new (class { set prop(...arguments) {} })).prop = 1;",
    '(new (class { set prop(...a) {} })).prop = 1;',
    '"use strict"; ({method(private){}});',
    '"use strict"; var myobject = {get bar(x) {}};',
    '"use strict"; ({*method(let){}});',
    '"use strict"; ({*method(protected){}});',
    '"use strict"; var myobject = { get bar(x, y) {}};',
    '"use strict"; var myobject = { set bar() {}};',
    '"use strict"; var myobject = {get foo( +};',
    '"use strict"; var myobject = {get foo() "error"};',
    '"use strict"; var myobject = {"static x: 0};',
    '"use strict"; var myobject = {static x(){}};',
    '"use strict"; var myobject = {static async x(){}};',
    '"use strict"; var myobject = {static get x(){}};',
    '"use strict"; var myobject = {static get x : 0};',
    // '"use strict"; var myobject = {*get x(){}};',
    //'"use strict"; var myobject = {*set x(y){}};',
    '"use strict"; var myobject = {get x*(){}};',
    '"use strict"; var myobject = {static async x(){}};',
    '"use strict"; var myobject = {async get x(){}};',
    '"use strict"; var myobject = {async get : 0};',
    '({,});',
    //'({*get x(){}});',
    '({set x*(y){}});',
    '({x*(){}});',
    '({static async get x : 0});',
    '({async x*(){}});',
    '({async x : 0});',
    '({async get *x(){}});',
    '({async set x(y){}});',
    '({async get : 0});',
    '({static get x : 0});',
    'var {x:y+1} = {};',
    '({set 8(y){})',
    '({get 8(){})',
    '({,} = {});',
    'var {x:y--} = {};',
    'function foo() { return {}; }; var {x:foo().x} = {};',
    'class foo { method() { ({x:super()} = {}); } }',
    'async get *x(){}',
    'x = {f(x) { const x = y }}',
    '({a:a,b,(c), a: {b} });',
    '({ 1:a,b = {c} = d });',
    'x = { set f(...y) {} }',
    '({get x() {}}) => {}',
    'let {...x, ...y} = {}',
    '({ set x({a: A}, ...b) { } })',
    '({...x,}) => z"',
    '(([a, ...b = 0]) => {})',
    '(({a, ...b = 0}) => {})',
    '0, {...rest, b} = {}',
    '({...obj1,...obj2} = foo)',
    '({...(a,b)} = foo)',
    '({...{a,b}} = foo)',
    '({"foo": this} = x)',
    //'({await} = x);',
    // '({enum} = x);',
    // '({case});',
    '({static [expr',
    'x({get "abc": x});',
    'x({get 123: x});',
    '({catch(){}}) => x;',
    //    '({const}) => x;',
    //    '({do}) => x;',
    'x = {f(){ const x = y; var x; }}',
    'x = {f(){ function x(){} const x = y; }}',
    'x = {f(){ const x = y; var x; }}',
    'x = {f(){ var x; let x; }}',
    '({790: false} = x)',
    '({   async *[woops',
    '({static [expr"',
    '({get [1, 2]() {}});',
    '({set [1, 2](_) {}});',
    '({[var name]() {}});',
    '({*[var name]() {}});',
    '(class {get [1, 2]() {}});',
    '(class {set [1, 2](_) {}});',
    '(class {[var name]() {}});',
    '(class {*[var name]() {}});',
    '({[foo]() {}} = y)',
    '+{f(){}==',
    '+{...x)',
    'async x*(){}',
    '({static * await(){}});',
    '({static async * catch(){}});',
    '({static async * async(){}});',
    '({static async async(){}});',
    '({static set async(x){}});',
    '({"foo": (x) = (1) = "bar"})',
    '{x: foo + y, bar} = doo',
    '({..."foo"=x}) => x',
    's = {foo: yield /x/}',
    '{*[expr](){}} = x',
    'x = {5};',
    '{x: [..] = y}',
    //'({false} = x);',
    //   '({for} = x);',
    '({790: null}) => x',
    '({790: null} = x)',
    '({**=f(){}})',
    '({async **=f(){}})',
    '({3200: fail() = x}) => x',
    '({3200: fail() = x} = x)',
    '({a: b()} = x) => y',
    '{x} *= y',
    'x={...x=y}=z',
    '({...a+b}) => x',
    '({...a=b}) => x',
    '({...{a, b}}) => x',
    '({foo = 10})',
    '({eval = x});',
    '({a = 0});',
    '({a = b})',
    '({*[expr](){}}) = x',
    '({...{b = 0}.x} = {});',
    '({a: {b = 0}.x} = {});',
    '({a: {a=b}.x}) => x',
    '({a: 0} = 0);',
    '({a=b}.x) => x',
    '({a:function} = 0)',
    '({ x: { get x() {} } } = { x: {} });',
    '({*(){}})',
    '({   async *[x"',
    '({   async *[x',
    '({...(a,b)} = foo)',
    '({...(obj)}) => {}',
    '({...(a,b)}) => {}',
    '({...{a,b}}) => {}',
    '({...[a,b]}) => {}',
    '({...x,}) => z',
    '({*=f(){}})',
    '({x+=y})',
    '({..."foo"=x})',
    'x, {x: foo + y, bar} = doo',
    '({...a=b} = x)',
    '({...[a, b]} = x)',
    '({...a, ...b} = x)',
    '({...{a, b}} = x)',
    '({*1(){}} = x);',
    's = {s: new}',
    's = {s: typeof}',
    '({ set x(...a){} })',
    '({ get x(...a){} })',
    '({...{x} }= {});',
    '({ [...a] = [] })',
    '({...x)',
    '({a ...b})',
    'let {...obj1,} = foo',
    '({...obj1,} = foo)',
    '({...a,} = {});',
    '({...a,} = {});',
    '({...obj1,...obj2} = foo)',
    '({...{a,b}} = foo)',
    '({...[a,b]} = foo)',
    '({...[a, b]} = x)',
    '({...{a, b}} = x)',
    '( {...{}} = {} )',
    '({...{}} = {})',
    '({...[]} = {})',
    '({...x = 1} = {})',
    '{...x)',
    '!{f(b, a, b, ...a) {}}',
    'x={..."foo"=x} = x',
    'x={..."foo".foo=x} = x',
    '({...rest, b} = {})',
    '({...a, ...b, ...c} = {...a, ...b, ...c})',
    '({...obj1,a} = foo)',
    //'f = (argument1, {...[ x = 5 ] }) => {};',
    '({*foo(){}} = x);',
    '({*"expr"(){}} = x);',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({set a({e: a.b}){}})',
    '({ [x] });',
    '({ *[x] });',
    '({[a] = b});',
    //'({true = x} = y)',
    // '({debugger}) => x;',
    //'({null} = x);',
    '({1: ({}) += (1)});',
    '({1: ({}) = (1)});',
    '({ a = 0 });',
    '({a,,a} = 0)',
    '({}) = 1',
    '({...})',
    '({get a(){}} = 0)',
    '({[a] = b});',
    '({a:  2 /= 3 })',
    '({1:  2 /= 3 })',
    '({[a]:  2 /= 3 })',
    'o = {key: typeof = a}',
    'x = {key: typeof = a}',
    'x = {key: bar.foo + x = y}',
    '({x=1} = {y=1});',
    '({x: y={z=1}}={})',
    '++({x=1})',
    '({[foo]: bar()} = baz)',
    '({[foo]: a + b} = baz)',
    '({a: [a + 1] = []});',
    '[((a)] = [];',
    '({a}) = 2;',
    '({a: b = 0, c = 0});',
    '({ set prop() {} })',
    '({a:this}=0)',
    //'({ *a })',
    //'({ *a: 0 })',
    //'({ *[0]: 0 })',
    '({ a (b, ...c,) {} })',
    '({x = ({y=1}) => y})',
    '(({x=1})) => x',
    '({async get : 0})',
    '({get foo( +})',
    '({static x: 0})',
    //'({*x: 0})',
    '({static x(){}})',
    '({e=[]}==(;',
    '({[x].length} = x)',
    '{a,,b}',
    '{x: {..} = y}',
    '({x=1}[-1]);',
    '({x=1}.abc)',
    'const z = {x={y=1}}={};',
    'const {x={y=33}}={};',
    '{ x : y * 2 } = {}',
    '{ get x() {} } = {}',
    '{ set x() {} } = {}',
    '((({w = x} >(-9)',
    '({x}) = foo',
    '({12n:  a + b = c / (d)})',
    '({12n:  [a].b.(c)})',
    '({12n:  a + b = c })',
    '({12n = a })',
    '({12n = 1 })',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({y: [foo, bar].join("") = x} = x)',
    '({Object = 0, String = 0}) = {};',
    '({b}) = b;',
    '([b]) = b;',
    '({x: {..} = y})',
    '({x: [..]})',
    '({x: {..}})',
    '({"x": y+z} = x)',
    '({"x": 600}) => x',
    '({3200: x() = x}) => x',
    '({foo: x() = x} = x)',
    '({a({e: a.b}){}})',
    '({...(x) }) => {}',
    '({1}) = {}',
    '({"x": y+z}) => x',
    '({"x": [y + x]}) => x',
    '({async async});',
    'x = { async f: function() {} }',
    '({[fgrumpy] 1(){}})',
    '({async 8(){});',
    '({get 8(){});',
    '({set 8(){});',
    '({get [x](y){});',
    '({get "x"(){})',
    '({"foo": x() = x}) => x',
    '({"foo": x() = 1}) => x',
    '({0} = 0)',
    '({"a"}) = 0;',
    '(["x"]) = 0',
    '({+2 : x}) = {};',
    '({[x] = 42, y = 15})',
    '({set *5(ident){}})',
    '({get *5(){}})',
    '({"foo": [1 = 2] = foo});',
    '({"foo": [1 = 2]} = foo);',
    '{...rest, b} = {}',
    '({async set foo(){}});',
    '({a.b} = 0)',
    '({a,,} = 0)',
    //  '({function} = 0)',
    '({ *[yield iter]() {} })',
    '({ 5 }) => {}',
    '({a({e: a.b}){}})',
    'x = (argument1, {...[ y = 5 ] }) => {};',
    '({a}) = 0',
    '(x=1)=y',
    '([a]) = []',
    '({a}) = {}',
    '({a}) = 0;',
    '([x]) = 0',
    '([a.b]) => 0',
    '(["a"]) = []',
    '([a]) = 0',
    '[...rest,] = {};',
    '({x:y;a:b})',
    '({x:y;})',
    '({;x:y,a:b})',
    '({;}',
    '({get a(){}})=0',
    '({a} += 0);',
    '({[foo]-(a) {}})',
    '({a([a.b]){}})',
    'a = { x: [(x, y)] } = { x: [] };',
    'a = { x: [(x, y)] } = {};',
    'a = { x: [(x, y)] } = { 1: [] = [(a = b)] };',
    'a = { x: [(x, y)] } = undefined',
    'a = { x: [(x, y)] } = null',
    'a = { x: [(x, y)] } = 51',
    'a = { x: [(x, y)] } = false',
    'a = { x: [(x, y)] } = b',
    'a = { x: [(x, y)] } = { x: null }',
    'x = { [a]: {} /= a }',
    'x = { a: {} /= a }',
    'x = { a: {} ++a }',
    's = {"foo": false = x} = x',
    's = {"foo": null = x} = x',
    's = {"foo": super = x} = x',
    '({1} ? a : b)',
    '({a: b => []} = [2])',
    '({a = {}})',
    '({a = []})',
    // '({a: ({1})})',
    '({a, b}) = {a: 1, b:2};',
    '({a: ({x = (y)})})',
    '({a: 0, b = 0});',
    '({x=1}),',
    '({[]*+})',
    '({*[expr](){}}) = x',
    // '({default} = x);',
    '{*15(){}} = x',
    '({x = 42, y = 15})',
    '({x: { y = 10 } })',
    '({ a, b }) = {a: 1, b: 2}',
    'x = {f(){ function x(){} const x = y; }}',
    'x = {f([a, a, b]) {}}',
    'x = {f([a, b, a]) {}}',
    'x = {f([b, a, a]) {}}',
    'x = {f([b, a, b, a]) {}}',
    'x = {f([b, a], b) {}}',
    'x = {f([b, a], {b}) {}}',
    'x = {f([b, a], ...b) {}}',
    '({ *method(x = yield) {} }) ',
    '({*a([a.b]){}})',
    '({*: x(){}})',
    '({set *5(y){}})',
    '({get *"x"(){}})',
    '({get *[x](){}})',
    '({get *10(){}})',
    '({get *[expr](){}})'
    // '({eval} = x);',
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

  // Invalid cases - module goal
  for (const arg of [
    '!{f(){ const x = y; function x(){} }}',
    '!{f(){ function x(){} const x = y; }}',
    '!{f(){ var x; let x; }}',
    '!{f(){ let x; var x; }}',
    '!{f([b, a], {b}) {}}'
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
    '({   async *x(){}   })',
    '({   async *1(){}   })',
    'x({async foo(){}, bar(){}});',
    'x({async foo(){}});',
    'x({async [foo](){}});',
    'x({async foo(){}, async bar(){}});',
    'x({set [foo](a){}});',
    'x = {a, b} = y',
    '({y:y2} = {y:y2-2})',
    '({yield: 10 });',
    '({[foo]: x} = x) => y',
    'x = { y, z }',
    'x = { method(test) { } }',
    'x = { "method"() { } }',
    'x = { set() { } }',
    'o = { f: function(a, ...b) {} }',
    'x = { f: function(a=1) {} }',
    'x = { method(...test) { } }',
    '({ __proto__: null, get __proto__(){} })',
    '({ __proto__: null, __proto__(){}, })',
    '({ __proto__: null, set __proto__(x){} })',
    '({ "__proto__": null, get __proto__(){}, set __proto__(x){} })',
    '({ "__proto__": null, __proto__(){}, })',
    '({ "__proto__": null, set __proto__(x){} })',
    '({ "__proto__": null, __proto__ })',
    '({ __proto__, __proto__ })',
    '({[foo](){}, get [bar](){}});',
    '({ toast(a, b = 10, c) {}  });',
    '({ x([ a, b ]){} });',
    'x = { method() { }};;',
    'x = { [5 + 5]: foo }',
    '({get [x]() {}, set [x](v) {}});',
    '({a:  b.c })',
    '({a:  b.c  = d })',
    '({a:  b.c  = d  ? e : f })',
    'x({a:b=x}=y);',
    'x({a:b, c}=obj);',
    'x({a, c:d}=obj);',
    's = {s: true}',
    '({ a, b: x })',
    '({key: {}})',
    '({key: {a} = x})',
    '({a:b}=obj);',
    '({1:  {}.b ? c : d })',
    '({ a: {prop: 1}.prop } = {})',
    '({1:  + b })',
    '({[a]:  + b })',
    '({a:  + b })',
    '({...(obj)} = foo)',
    '({...(obj)} = foo),({...obj} = foo),({...obj.x} = foo),({...{}.x} = foo),({...[].x} = foo)',
    '({async})',
    '({async: await})',
    '({async: (await) ? yield : foo})',
    '({async: true})',
    '({async() { }})',
    '({async foo() { }})',
    '({foo() { }})',
    '({x, y, z () {}})',
    '({async delete() {}})',
    '({async [foo](){}})',
    '({async 100(){}})',
    '({throw(x, y) {}});',
    '({package(x, y) {}});',
    '({package(x, y) {}});',
    '({this(x, y) {}});',
    '({switch(x, y) {}});',
    '({}=x);',
    'x({}=x);',
    '({a:v=b}=c);',
    '({a=b}=c);',
    '({key: bar = x})',
    'x = {x: a}',
    '({f: function({x} = {x: 10}) {}});',
    '({f({x} = {x: 10}) {}});',
    'function x(a, { b }){};',
    '(function x({ a, b }){});',
    '(let[a] = b);',
    '({...obj}) => {}',
    '({a,...obj} = foo)',
    '({a:b,...obj} = foo)',
    '({...obj} = {}) => {}',
    '({a,...obj}) => {}',
    '({...obj} = foo)',
    'x ={ x = 1 }= z',
    'x ={ x: [ x ] } = { x: undefined }= z',
    '[{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
    '({ z : { __proto__: x, __proto__: y } = z })',
    '({ async(x, y) {}});',
    '[{a: b} = [c]]',
    '({ x } = (y));',
    '({ typeof(x, y) {}});',
    '({ x() {}, x: 1});',
    '({ *x() {}, get x() {}});',
    '({ x() {}, y() {}, x() {} })',
    '({ x() {}, x: 1 })',
    '({ x: 1, x() {} })',
    '({ x: 1, *x() {} })',
    'x({a:b, c}=obj);',
    'x({a=b}=c);',
    'x({a:v=b}=c);',
    '({"x": y+z})',
    '({"x": [y]})',
    '({"x": [y]} = x)',
    '({"x": [y]}) => x',
    '({"x": [y + x]})',
    '({"x": [y].slice(0)})',
    '({"x": {y: z}})',
    '({"x": {y: z}} = x)',
    '({"x": {a: y + x}})',
    '({"x": {a: y + x}.slice(0)})',
    '({"x": 600})',
    'x({[a]:b, [15]:d}=obj);',
    '({s: "foo".foo} = x)',
    '({l: 50..foo} = x)',
    'x, {foo, bar} = doo',
    'x, {foo = y, bar} = doo',
    '({p: {a = 0}} = {p: {}});',
    '({a, b} = c = d)',
    'a={"b":c=d}',
    '({a: x = true} = y)',
    's = {"foo": this}',
    '({x:let} = null)',
    '({x:let})',
    'x({"a":b}=obj);',
    '({x:let}) => null',
    'x({set "foo"(a){}});',
    'x({set 123(a){}});',
    '({ a = 42, [b]: c.d } = e);',
    '({790: null})',
    'x({foo(){}, *bar(){}});',
    'x({*set(){}});',
    '({   async *[ha+ha](){}   })',
    'x({async * foo(){}, bar(){}});',
    '({...a, obj: x})',
    '({...{}})',
    '({...a})',
    '({...obj,})',
    '({a: {b} = c})',
    'x = {10: y}',
    '({...a} = x)',
    '({...[a, b]})',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    '({[foo()] : (z)} = z = {});',
    '({a: 1, a: 2})',
    '({b: x, a: 1, a: 2})',
    '({x=1} = {});',
    '({foo: typeof x});',
    '({foo: true / false});',
    '({a}=obj);',
    '({a:b}=obj);',
    '({a, b}=obj);',
    '({a, c:d}=obj);',
    '({eval} = x);',
    `x = { ...y }`,
    `x = { ...z = y}`,
    `x = { ...y, b: 1}`,
    `x = { a: 1, ...y, b: 1}`,
    '({eval});',
    '({eval = x} = y)',
    'x = {300: x}',
    '({[foo]: x} = y)',
    '({...x=y})',
    '({...x+y})',
    '({...x, ...y});',
    '({...x.y} = z)',
    '({...x, y});',
    '([{x = y}] = z)',
    '[{x = y}] = z',
    'x = {...y}',
    'x = {...a + b}',
    'x = {...[a, b]}',
    'x = {...{a, b}}',
    'x = {...a,}',
    'x = {...y, b}',
    'x = {a, ...y, b}',
    'z = {x, ...y}',
    'x = {...a, ...b}',
    'x({* foo(){},*bar(){}});',
    'x({[foo](){}, get [bar](){}});',
    'x({get [foo](){}});',
    'x({get [foo](){}, get [bar](){}});',
    'x({get foo(){}});',
    'x({get foo(){}, get bar(){}});',
    'x({get "foo"(){}});',
    'x({get 1(){}});',
    'x({get 0x234241(){}});',
    'x({get 0b001(){}});',
    'x({get 0o4567(){}});',
    '({typeof: x} = y);',
    'x({async get(){}});',
    '({async, foo})',
    '({a:b, c:d}=obj);',
    'o = {key: bar.foo + x}',
    '({*method(public){}});',
    '({method(protected){}});',
    '({ [key++]: y, ...x } = { 1: 1, a: 1 })',
    '({ [++key]: y, [++key]: z, ...rest} = {2: 2, 3: 3})',
    '({ [left()]: y, ...x} = right())',
    '({ [(() => 1)()]: a, ...rest } = { 1: a })',
    '({ [1]: bar, ...rest } = foo)',
    '({topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2}} = rect)',
    '({ 3: foo, 5: bar } = [0, 1, 2, 3, 4, 5, 6])',
    '({ [fn()]: x, ...y } = z)',
    '({y})',
    '({key: a.b} = c)',
    '({123: expr})',
    '({123: a.b} = c)',
    '({[key]: expr})',
    '({[key]: a.b} = c)',
    '({[1.2]: "A", [1e55]: "B", [0.000001]: "C", [-0]: "D", [Infinity]: "E", [-Infinity]: "F",[NaN]: "G", });',
    '({get ["a"]() {}})',
    '({set ["a"](x) {}})',
    '({set [0](x) {}})',
    '({set [0](x) { super.m("b", v); }})',
    '({set [0](x) { super.m("1", v); }})',
    '({...key = x})',
    '({...key.prop} = x)',
    'x = {y,}',
    '({ y: x })',
    '(x = {eval})',
    '({ a, b: x })',
    '({y = x} = y)',
    '({a: {b: c} = 0})',
    '({a: {a: b.x} = 0})',
    '({a: {b} = 0})',
    '({a: {b}})',
    '({a: {b}, c})',
    '({a: [b.x] = 0})',
    '({a: [b] = 0})',
    '({a: (b.x) = 0} = 1)',
    '({a: (b) = 0} = 1)',
    '({ ...async () => { }})',
    'x = {get:b}',
    'x = {async:b}',
    'x = {a, b}',
    'x = {a, b} = x',
    '({foo: 1, get foo() {}});',
    '({foo: 1, set foo(v) {}});',
    '({1: 1, set 1(v) {}});',
    '({1: 1, get 1() {}});',
    '({1: 1, set "1"(v) {}});',
    '({foo: 1, bar: 2});',
    '({1: 1, 2: 2});',
    '({get foo() {}});',
    '({set foo(v) {}});',
    '({set 1(v) {}});',
    '({foo: 1, get bar() {}});',
    '({1: 1, get 2() {}});',
    '({get(){}});',
    '({static(){}});',
    '({async(){}});',
    '({*get() {}});',
    '({*set() {}});',
    '({*static() {}});',
    '({*async(){}});',
    '({get : 0});',
    '({if: 4});',
    '({interface: 5});',
    '({eval: 7});',
    '({async static(){}});',
    '({async : 0});',
    '({async(){}});',
    '({*async(){}});',
    '({arguments: 8});',
    '({async 0(){}});',
    '({async 1n(){}});',
    '({async x(){}});',
    '({x: async (y,w) => z})',
    '([ { x : foo()[y] } ])',
    '([ { x : x.y } ])',
    '[ { x : foo().y = 10 } = {} ]',
    '[ { x : y = 10 } = {} ]',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }]',
    '({ x: (y) = [] })',
    '[ { x : foo()[y] = 10 } = {} ]',
    '[ { x : x.y = 10 } = {} ]',
    '({*id() {}})',
    '({*await() {}})',
    '({ async get(){} })',
    '({ method(x = y, y) {} })',
    '({ async *method(...a) {} })',
    '({ if: 4 })',
    '({ eval: 7 })',
    '({async foo() {}})',
    '({ async static(){} })',
    '({ async : 0 })',
    '[{eval}.x] = [];',
    '([ { x : y } ])',
    '({ __proto__: 2 })',
    '({ x, y, z () {} })',
    '({ method(a,) {} })',
    '({ foo: 1, foo: 2 })',
    '({ async *method(x, y = x, z = y) {} })',
    '({ async *method([[...x] = function() {}()] = [[2, 1, 3]]) {} })',
    '({ async *method([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) {} })',
    '({ async *method([...x]) {} })',
    '({ async *method([x]) {} })',
    '({ async *method([[,] = g()]) {} })',
    'x = {*"foo"(){}}',
    'x = {*123(){}}',
    'x = {*[foo](){}}',
    'x = {* foo(){},*bar(){}}',
    'x = {* foo(){}, bar(){}}',
    'x = {foo(){}, *bar(){}}',
    'x = {get foo(){}}',
    'x = {get get(){}}',
    'x = {get foo(){}, get bar(){}}',
    'x = {get foo(){}, bar(){}}',
    'x = {foo(){}, get bar(){}}',
    'x = {get [foo](){}}',
    'x = {get [foo](){}, get [bar](){}}',
    'x = {get [foo](){}, [bar](){}}',
    'x = {[foo](){}, get [bar](){}}',
    'x = {get 123(){}}',
    'x = {set foo(a){}}',
    'x = {set get(a){}}',
    'x = {foo: typeof x}',
    'x = {foo: true / false}',
    'x = {await}  = x',
    'x = {eval}',
    'x = {"x": [y]}',
    'x = {"x": [y]} = x',
    'x = {"x": [y + x]}',
    'x = {"x": [y].slice(0)}',
    'x = {"x": {y: z}}',
    'x = {"x": {y: z}} = x',
    'x = {"x": {a: y + x}}',
    'x = {"x": {a: y + x}.slice(0)}',
    'x = {"x": 600}',
    'x = {"x": 600..xyz}',
    'x = {...y}',
    'x = {x, ...y}',
    'x = {...a=b}',
    'x = {a, ...y, b}',
    'x = {...y, b}',
    'x = {get "foo"(){}}',
    'a = { x: y = function x() {}, x: fn = function() {} } = b',
    'a = { w, a: x } = b',
    'a = {...src.y.x} = b',
    'a = { y: x = 1 } = b',
    'a = { y = function x() {}, fn = function() {} } = b',
    'a = { w, x, y } = b',
    'a = { w, x, y = a ? x : b } = b',
    'a = { w, x, y = c } = b',
    'a = { w, x = b, y } = b',
    'a = { x: x[yield] } = b',
    'a = { x: [ x ] } = b',
    'a = { x: [x = yield] } = b',
    'a = { x: { x = yield } } = b',
    'a = { x: { y } } = b',
    'a = {...rest} = b',
    'a = {...src.y} = b',
    'a = {...src.y.x} = b',
    'x = { [a]: { "a": { "a": [] ? a : b } } }',
    'x = { [a]: {x} = y }',
    'x = { [a]: {x} = y.z }',
    'x = { [a]: [x] = y.z }',
    'x = { "a": [([] ? a : b.c[d])] / 2 }',
    'x = { "a": { "a": { "a": [] ? a : b } } }',
    'x = { "a": {x} = y }',
    'x = { "a": {x} = y.z }',
    'x = { "a": [x] = y.z }',
    '(x = { a: {x} = y }) / y.z',
    '(x = { a: x = y }) / y.z',
    '(x = { a: (x) = y }) / y.z',
    '(x = { a: x = (y) }) / y.z',
    '(x = { a: (x = (y)) }) / y.z',
    '(x = { "a": {x} = y }) / y.z',
    '(x = { "a": x = y }) / y.z',
    '(x = { "a": (x) = y }) / y.z',
    '(x = { "a": x = (y) }) / y.z',
    '(x = { "a": (x = (y)) }) / y.z',
    '(x = { [a]: {x} = y }) / y.z',
    '(x = { [a]: x = y }) / y.z',
    '(x = { [a]: (x) = y }) / y.z',
    '(x = { [a]: x = (y) }) / y.z',
    '(x = { [a]: (x = (y)) }) / y.z',
    'x = { "a": ([] ? a : b.c[d]) }',
    'x = {"d": {}[d] += a}',
    'x = {d: {}[d] += a}',
    '({ test() { super.prop = 14; } }).test();',
    'x = x = {[d]: {}[d] += a}',
    'x = { "a": [] ? a : b.c[d] }',
    'x = { "a": [] ? a : b / 2 - 2}',
    'x = { "a": [] ? a : b }',
    'x = {d: {}[d] += a}',
    'x = {"string": {}[d] += a}',
    'o = {f(f) { }}',
    'o = {f(x) { function x() {} }}',
    'o = {f(x) { var x; }}',
    'x = {["d"]: {}[d] += a}',
    '({ key: bar + x })',
    '({ key: bar/x })',
    '({ key: bar, foo: zoo })',
    '({ } = { })',
    '({  ...undefined })',
    '({  ...1 in {} })',
    '({ set foo(b){}, set bar(d){} })',
    '({ set foo(c){}, bar(){} })',
    '({ foo: typeof x })',
    '({ foo: true / false })',
    '({ ...y  })',
    '({ a: 1, ...y  })',
    '({  b: 1, ...y  })',
    '({ a: 1, ...y, b: 1 })',
    '({ ...1 })',
    '({ set foo(v) {} })',
    '({ 1: 1, 2: 2 })',
    '({ async 100(){} })',
    '({ method({ arrow = () => {} }) {} })',
    '({ method({ x: y, }) {} })',
    '({ async *method([x] = g[Symbol.iterator] = function() {}) {} })',
    '({ async *method([...x] = {}) {} })',
    '({ async *method([...async] = {}) {} })',
    '({ async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {} })',
    '({ async *method({ x: y = thrower() } = {}) {} })',
    '({ async *method([x = 23]) {} })',
    '({ async *method([_, x]) {} })',
    '({ [++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter })',
    '({ async *method(a, b,) {} })',
    '({ eval: 7 })',
    '({ if: 4 })',
    '({ foo: bar = 5 + baz })',
    '({ get foo() {} })',
    '({ a,1:b })',
    '({ 1:a,b })',
    '({ foo: 1, get foo() {} })',
    '({ 1: 1, get 1() {} })',
    'x = {async(){}}',
    '({ method(a, b,) {} })',
    '({ method(x = y, y) {} })',
    '({ async method(x, y = x, z = y) {} })',
    '({ *id() {} })',
    '({ *[anonSym]() {} })',
    '({ *method(a,) {} })',
    '({ async static(){} })',
    '({}=x);',
    '({a:v=b}=c);',
    '({...{}})',
    '({...a, obj: x})',
    '({obj: x, ...a})',
    '({obj, ...a})',
    '({catch: x});',
    's = {foo: yield}',
    's = {foo: yield / x}',
    's = {foo: yield /x/g}',
    'wrap({get 123(){}});',
    '({get await(){}});',
    '({await: x}) => x;',
    '({async: x}) => x;',
    '({async(){}});',
    'x({get "foo"(){}});',
    'x({async} = x);',
    'x({get} = x);',
    '({x} = foo )',

    'x = {get} = x',
    'x = {a:b, c:d}',
    'x = {a, c:d}',
    'x = {a, c:d} = x',
    'x = {a:b, c} = x',
    '({ [a]: {} [a] })',
    'x = {15:b}',
    'x = {1:b, 0:d}',
    'x = {"a":b}',
    'x = {"a":b, "c":d}',
    'x = {[a]:b}',
    'x = {[a]:b, [15]:d}',
    'x = { *a() {} }',
    'x = {0(){}}',
    'x = {"foo"(){}}',
    'x = {0b001001: y}',
    'x = {10: y}',
    'x = {async foo(){}}',
    'x = {async async(){}}',
    'x = {async "foo"(){}}',
    'x = {async 100(){}}',
    'x = {async [foo](){}}',
    'x = {async foo(){}, async bar(){}}',
    'x = {async foo(){}, bar(){}}',
    'x = {foo(){}, async bar(){}}',
    'x = {*foo(){}}',
    'x = {*get(){}}',
    'x = {*set(){}}',
    'x = {*async(){}}',
    '({ get "0"() { } });',
    '({ get 0() { } });',
    '({ get 0.0() { } });',
    '({ get 0.() { } });',
    '({ get 1.() { } });',
    '({ get 5.2322341234123() { } });',
    '({ set "0"(q) { } });',
    '({ set 0(q) { } });',
    '({ set 0.0(q) { } });',
    '({ set 0.(q) { } });',
    '({ set 1.(q) { } });',
    '({ set 5.2322341234123(q) { } });',
    '({x, ...y, a, ...b, c, })',
    '({ *method([[x, async, z] = [4, 5, 6]]) {} })',
    '({eval});',
    '({async x() {}});',
    '({async *x() {}});',
    '({async get() {}});',
    '({get x() {}});',
    '({x:function(){"use strict";}})',
    '({ get(...a) { } });',
    '({ get(a, ...b) { } });',
    '({ get([a], ...b) { } });',
    '({ get({a}, ...b) { } });',
    '({ get({a: A}, ...b) { } });',
    '({ set(...a) { } });',
    '({ set(a, ...b) { } });',
    '({ set([a], ...b) { } });',
    '({ set({a: A}, ...b) { } });',
    '({set x(y) {}});',
    '({get() {}});',
    '({set() {}});',
    '({async() {}});',
    '({await() {}});',
    '({async = async} = x);',
    '({async});',
    '({x});',
    '([a,,...rest] = {})',
    '({} = 0);',
    '({..."x"[x]} = x);',
    `({let} = 0);`,
    'x?.({ a: obj.a } = {})',
    '({...{}[x?.y]} = x?.y??z);',
    '({a: 33})?.a',
    '({y}) => x;',
    '({ a: 1 }).a === 1',
    '({ responseText: text } = res)',
    '(({a = {b} = {b: 42}}) => a.b)({})',
    '({ x : [ y = 10 ] = {} })',
    '({ x : [ foo().y = 10 ] = {} })',
    '({ x : [ foo()[y] = 10 ] = {} })',
    '({ x : [ y.z = 10 ] = {} })',
    '({ x : [ y[z] = 10 ] = {} })',
    '({ x : x, y : y })',
    '({ x : y, ...z })',
    '({ x : y = 1, ...z })',
    '({...x})',
    '({x, ...y})',
    '({x = 1} = {});',
    '({x, y = 1, z = 2} = {});',
    'x = {__proto__(){}, __proto__: 2}',
    'x = {__proto__(){}, __proto__(){}}',
    'x = {async __proto__(){}, *__proto__(){}}',
    '({x} = 0)',
    '({x,} = 0)',
    '({x,y,} = 0)',
    '({x,y} = 0)',
    '({x = 0} = 1)',
    '({x = 0,} = 1)',
    '({x: y = z = 0} = 1)',
    '({x: [y] = 0} = 1)',
    '({a:let} = 0);',
    '({let} = 0);',
    '({a:yield} = 0);',
    '({yield} = 0);',
    '({yield = 0} = 0);',
    '(a) = {}',
    '({x: ((y, z) => z).x})',
    '({ ...d.x })',
    '({ x: (foo.bar) })',
    '({foo: y, a:{bar: x}}) => x;',
    '({y, a:{x}}) => x;',
    'o = {f(){ function x(){} var x = y; }}',
    '({b, c, d, ...{a} })',
    's = {s: this}',
    '({a, ...b} = {})',
    '[a,b=0,[c,...a[0]]={}]=0;',
    '(a.b = {});',
    '({ x: [ x ] } = { x: null });',
    '[{a=0},{a=0}] = 0',
    '({a: (b) = c} = [2])',
    '({...x = y, y})',
    '({y: [foo].length} = x)',
    '({y: [foo].length = x} = x)',
    '({a:b,...obj}) => {}',
    '({x, ...y} = {x, ...y})',
    '([ { x : foo().y } ])',
    '({b: x, a: 1, a: 2})',
    '({x: a[b]})',
    '({x: a(b)})',
    '({x: [],})',
    '({x: x = expr})',
    '({y: (y) = expr})',
    '({x: a.b = expr})',
    '({x: a[b] = expr})',
    '({x: [] = expr,})',
    '({x: {} = expr,})',
    'o = {key: bar + x}',
    'o = {key: bar = x}',
    'o = {key: bar.foo + x}',
    'o = {a: b} = d',
    'x = {x: a}',
    'o = {key: eval = a}',
    'o = {key: bar = a}',
    '({foo: true ** false});',
    '({eval} = x)',
    '({await})',
    '({...a+b})',
    '({...a=b})',
    '({ a, b: x })',
    'x({a:b, c});',
    'x({a:b, c} = y);',
    '([{x:x, y:y, ...z}, [a,b,c]] = {})',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    '([{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {});',
    '(_a = { z: { x: 1 } }.z, z = _a === void 0 ? { x: 5 } : _a);',
    '(a = {}, b = a.y2, y2 = b === void 0 ? 5 : b, c = a.y3, y3 = c === void 0 ? { x: 1 } : c);',
    '([{x:x, y:y}, [a,b,c]])',
    '({[1+1] : z, ...x} = {})',
    '({arguments: x, ...z} = {});',
    '({a: {eval}.x} = {});',
    '({...{eval}.x} = {});',
    '(z_1 = { z: 0 }.z);',
    '(a1 = a[0], a2 = a[1], a3 = a[2]);',
    '(x = a.x, y = a.y, z = a.z);',
    '({ a: 1 }).a === 1',
    '([void /=/g/m.x]);',
    '([new x]);',
    '({ a, b } = { b, a });',
    '({ x : [ y = 10 ] = {} })',
    '({ x : [ foo().y = 10 ] = {} })',
    '({ x : [ foo()[y] = 10 ] = {} })',
    '({ x : [ y.z = 10 ] = {} })',
    '({x: a, "y": a});',
    '({ z : { __proto__: x, __proto__: y } = z })',
    '(function f( {p, q} = class C { get [[] = ";"]() {} } ) {})();',
    '(function f1([p, q] = class D extends C { get [[]]() {} }) { })();',
    '([a,,...rest] = {})',
    '({var: x = 42} = {})',
    '({x, ...y, a, ...b, c})',
    '([...[]] = x);',
    'x({a});',
    'x({set:b});',
    'x({a, b});',
    'foo({c=3} = {})',
    '({[a]:b})',
    '({get get(){}});',
    '({set set(x){}});',
    '({get foo(){}});',
    'x = { y = function x() {}, fn = function() {} }= z',
    '([a,,...rest] = {})',
    'function a({x: y, z: { a: b } }) {};',
    '({var: x} = 0)',
    '({[a]:  {}.b ? c : d })',
    '({a:  {}.b = c ? d : e })',
    '({a:  {}.b ? c : d })',
    '({a: (a).b ? c : d })',
    'x({1:b, 2:d});',
    'x = ({[a]:b});',
    'x = ({[a]:b, [15]:d});',
    '({[a]:b}=obj);',
    'x = {__proto__: a, __proto__: b} = y',
    '({__proto__: a, __proto__: b} = x)',
    '({...a}) => x',
    'x({get});',
    'x({a:b, c} = x);',
    'x({static});',
    'x({a, c:d});',
    'x({set:b});',
    'x({a});',
    '({x, a: x} = obj)',
    'x({a:b, c:d});',
    '({ async async(){} });',
    '({ async case(){} });',
    '({ async false(){} });',
    '({get arguments(){}});',
    '({arguments: x} = y);',
    'x({"a":b, "c":d});',
    'x({1:b, 0:d});',
    'x({15:b});',
    'x({"a":b});',
    'x({[a]:b});',
    'x({.9:a, 0x84:b, 0b1:c, 0o27:d, 1e234:e});',
    '({private: x});',
    '({while: x});',
    '({false: x});',
    `({ async [yield]() {} });`,
    `"use strict"; ({ async yield() {} });`,
    `({ async* f(a, b, ...c) { await 1; } })`,
    'x={*f(){ var f }}',
    '({arguments: x});',
    '({interface: x});',
    '({in: x});',
    '({ yield: 1 })',
    '({ get yield() { 1 } })',
    '({ let: 1 })',
    '({ get let() { 1 } })',
    '({debugger: x});',
    'x({foo(){}, bar(){}});',
    'x({foo(a,b,c){}});',
    'x({0(){}});',
    'x({.9(){}, 0x84(){}, 0b1(){}, 0o27(){}, 1e234(){}});',
    '({break: x});',
    'x({async set(){}});',
    'x({async async(){}});',
    'x({async "foo"(){}});',
    'x({async 100(){}});',
    'x({*foo(){}});',
    'x({*get(){}});',
    'x({*set(){}});',
    'x({*async(){}});',
    'x({*123(){}});',
    'x({* foo(){}, bar(){}});',
    '({do: x});',
    'x({get foo(){}, bar(){}});',
    '({extends: x});',
    '({do: x} = y);',
    '({extends: x} = y);',
    'x({foo(){}, async bar(){}});',
    'x= { get prototype(){} }',
    'x= { set prototype(x){} }',
    'x= { async prototype(){} }',
    'x({async * foo(){}, bar(){}});',
    'x = {__proto__: 1, "__proto__": 2}',
    '({ __proto__: null, other: null, "__proto__": null });',
    'x = {__proto__: 1, __proto__}',
    'x = {__proto__, __proto__: 2}',
    'x = {[__proto__]: 1, __proto__: 2}',
    '({__proto__: a, __proto__: b});',
    '({...obj})',
    '({...obj1,...obj2})',
    '({a,...obj1,b:1,...obj2,c:2})',
    '({...(obj)})',
    '({...a,b,c})',
    '({...(a,b),c})',
    'x({set foo([...a]){}});',
    'x({set foo({...a}){}});',
    'x({*"foo"(){}});',
    'x({[a]:b, [15]:d});',
    '({ async f(a) { await 1; } })',
    '({ async f(a, b) { await 1; } })',
    '({ async f(a, b = 2) { await 1; } })',
    '({ async f(a, b, ...c) { await 1; } })',
    'x = {async f(){ var f = 1 }}',
    'x = {async f(){ let f = 1 }}',
    'x = {*f(){ var f = 1 }}',
    'x = {*f(){ let f = 1 }}',
    'x = {f(){ let f = 1 }}',
    'x = {...a,}',
    '({a: b = c} = [2])',
    '({...{}})',
    `x = {
      *""() {},
    }`
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
