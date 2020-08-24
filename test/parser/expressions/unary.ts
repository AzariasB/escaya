import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Binary', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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
    'x = a instanceof b + c',
    'x = a instanceof b > c',
    'delete String.prototype[Symbol.iterator];',
    'this + (this ? 1 : 2);',
    'delete true',
    'delete foo.bar',
    'typeof async({a});',
    'typeof x + y',
    'delete new /U/',
    'delete x.y',
    'delete foo()',
    'delete typeof true',
    'delete (foo.bar);',
    'delete foo.bar, z;',
    'delete /foo/.bar;',
    'x + typeof y.x',
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
    'delete o[Math.pow(2,30)]',
    'delete ((foo).x)',
    'delete ((((foo))).x)',
    'isNaN(+(void 0)) !== true',
    '!love',
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
    'foo = ~b'
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
