import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Unary', () => {
  // Invalid cases
  for (const arg of [
    '(((x)))\n++;',
    'if (a\n++\nb);',
    '- async({a = 1}, {b = 2}, {c = 3} = {});',
    '- async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    '- async({a = 1});',
    'async function f(){   async function fh([- await x]) { }   }',
    `!  a.b
    /foo/`,
    'async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    '! async({a = 1}, {b = 2}, {c = 3} = {});',
    '! async({a = 1});',
    'async function f(){   async function fh({x: ! await x}) { "use strict"; }   }',
    'async function f(){   async function g(x = ! await x) { "use strict"; }  }',
    //'async function f(){   function g(x = ! await x) {}  }',
    'async function f(){   function fh({x: ! await x}) {}   }',
    'typeof async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    'async function f(){   async function fh({x: void await x}) {}   }'

    // 'new typeof x.x',

    //'let x = ! async (x) => x'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Invalid cases
  for (const arg of [
    'delete ((a)) => b)',
    'delete (((x)) => x)',
    'delete (x)\n/f/',
    'delete x\n/f/',
    'delete x\nfoo',
    'delete ((true)++)',
    '(foo \n ++)',
    'delete ((((true)))=x)',
    'delete (a + b)=>b)',
    //'delete (((foo)));',
    'typeof async({a = 1});',
    'typeof async({a = 1}, {b = 2} = {}, {c = 3} = {});',
    // 'delete ()=>bar',
    // 'delete (((((foo(yield)))))).bar',
    // 'delete (((((foo(await)))))).bar',
    // 'delete yield.foo',
    'delete async \n (...) => x'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { impliedStrict: true });
      });
    });
  }

  // Valid cases
  for (const arg of [
    '!a',
    '+a',
    '~a',
    'delete x.y',
    '! x.def + ! y.x',
    '! x.abc + y.x',
    'x + ! y.x',
    `! a.b
  /foo`,
    '! async({a});',
    'typeof x',
    'void x',
    'typeof async',
    'typeof await',
    'typeof x',
    'delete true',
    'delete foo.bar',
    'typeof async({a});',
    'typeof x + y',
    'delete x.y',
    'delete foo()',
    'delete typeof true',
    'delete (foo.bar);',
    'delete foo.bar, z;',
    'delete /foo/.bar;',
    'delete ((foo).x)',
    'delete ((((foo))).x)',
    //'(delete (((x))) \n x)',
    'delete ((a)=>b)',
    'delete ((a, b, [c])=>b)',
    'delete ((()=>b))',
    'delete "x".y',
    'delete ("foo", "bar")',
    'delete ("foo".bar = 20)',
    'delete ((foo)++)',
    'delete ( \n () => x)',
    'delete x.y',
    'delete foo.bar',
    '++this.x',
    'foo = !a',
    '(typeof async (x))',
    'a(void b)',
    '(delete a.b)',
    'foo = ~b',
    '+null',
    'foo = !42',
    'a ? b : !c',
    '![]',
    'foo = (![])',
    'a = +a',
    '~false',
    'typeof [1,2,3] ',
    'typeof {hi: "world"}',
    'delete lunch.beans;',
    'console.log(Math.PI);',
    'typeof void 0',
    'void x !== undefined',
    'isNaN(+(void 0)) !== true',
    '!love',
    '-a',
    'void love',
    'typeof love',
    'void (x = 1) !== undefined',
    'delete ((foo).x)',
    'delete (a, b).c',
    'delete ((a, b, [c])=>b)',
    'delete (((a)=b).x)',
    'delete true.__proto__.foo',
    'delete "x".y',
    'delete ("foo".bar = 20)',
    'delete ((((foo))).x)',
    'delete a[2]',
    'delete await;',
    'delete false;',
    'delete null;',
    'delete this;',
    'delete true;',
    'delete yield;',
    'delete o[Math.pow(2,30)]'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
