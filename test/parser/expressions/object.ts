import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Object', () => {
  // Invalid cases
  for (const arg of [
    '([a.b]) => 0',
    '(["a"]) = []',
    '({"a"}) = 0;',
    '([a]) = 0',
    '({a}) = {}',
    '[...rest,] = {};',
    '(true ? { x = true } : { x = false })',
    '({x+=y})',
    '({*1(){}} = x);',
    '({*foo(){}} = x);',
    '({*"expr"(){}} = x);',
    'var {x:y+1} = {};',
    '({set 8(y){})',
    '({get 8(){})',
    '({,} = {});',
    'var {x:y--} = {};',
    'function foo() { return {}; }; var {x:foo().x} = {};',
    'class foo { method() { ({x:super()} = {}); } }',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({...a, ...b, ...c} = {...a, ...b, ...c})',
    '({x = 42, y = 15})',
    '({x: { y = 10 } })',
    '({ a, b }) = {a: 1, b: 2}',
    '({*a([a.b]){}})',
    '({*: x(){}})',
    'async x*(){}',
    '({...{a,b}} = foo)',
    '({...[a,b]} = foo)',
    '({...[a, b]} = x)',
    '({...{a, b}} = x)',
    '( {...{}} = {} )',
    '({...{}} = {})',
    'async get *x(){}',
    '({set a({e: a.b}){}})',
    '({...x = 1} = {})',
    '({a:a,b,(c), a: {b} });',
    '({ 1:a,b = {c} = d });',
    'x = { set f(...y) {} }',
    '({get x() {}}) => {}',
    'let {...x, ...y} = {}',
    '({...x,}) => z"',
    '({...rest, b} = {})',
    '(([a, ...b = 0]) => {})',
    '(({a, ...b = 0}) => {})',
    '0, {...rest, b} = {}',
    '({...obj1,...obj2} = foo)',
    '({...(a,b)} = foo)',
    '({...{a,b}} = foo)',
    '({"foo": this} = x)',
    //'({await} = x);',
    '({enum} = x);',
    '({case});',
    '({static [expr',
    '({static [expr',
    'x({get "abc": x});',
    'x({get 123: x});',
    '({ [x] });',
    '({ *[x] });',
    '({catch(){}}) => x;',
    '({const}) => x;',
    '({do}) => x;',
    '({790: false} = x)',
    '({   async *[woops',
    '({static [expr"',
    '({[foo]() {}} = y)',
    '+{f(){}==',
    '+{...x)',
    'x/{c:/ /=>',
    '({3200: fail() = x}) => x',
    // '({static}) => x;',
    /*`async function f(){
      (fail = class A {
        [await foo](){};
        "x"(){}
      }) => {}
    }`,*/
    '({static * await(){}});',
    '({static async * catch(){}});',
    '({static async * async(){}});',
    '({static async async(){}});',
    '({static set async(x){}});'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '({}=x);',
    '({a:v=b}=c);',
    '({...{}})',
    '({...a, obj: x})',
    '({obj: x, ...a})',
    '({obj, ...a})',
    '({catch: x});',
    '({...obj,})',
    '({...obj,})',
    's = {foo: yield}',
    //'s = {foo: yield /x/}',
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
    '({async: x} = y);',
    'x({get});',
    'x({a, c:d});',
    'x({set:b});',
    'x({a});',
    'x({a:b, c:d});',
    'x({set});',
    'for ({x=y} of a) b',
    'x({get "foo"(){}});',
    'x({get 123(){}});',
    '({set async(x){}});',
    '({ async async(){} });',
    '({ async case(){} });',
    '({ async false(){} });',
    '({get arguments(){}});',
    '({arguments: x} = y);',
    'x({"a":b, "c":d});',
    'x({1:b, 0:d});',
    'x({15:b});',
    'x({foo(){}, async bar(){}});',
    'x= { get prototype(){} }',
    'x= { set prototype(x){} }',
    'x= { async prototype(){} }',
    'x({async * foo(){}, bar(){}});',
    'x({*"foo"(){}});',
    'x({[a]:b, [15]:d});',
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
  }
});
