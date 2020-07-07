import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Member', () => {
  // Invalid cases
  for (const arg of ['abc???.£', 'foo.|1.', 'let[x]', `foo.123.`, 'abc.£', 'a.[b].c().d.toString()']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '[x()[y] = a + b] = z',
    'await[x]',
    'let.x',
    'let(x)',
    'let?.x',
    'let f = () => { import("foo"); };',
    'foo["bar"];',
    'foo.bar;',
    'foo.bar.foo;',
    'foo.bar["foo"];',
    'foo["foo"]["bar"];',
    'foo[test()][bar()];',
    '0..toString();',
    '0.5.toString();',
    '1.0.toString();',
    '1.000.toString();',
    'abc.package',
    'x[a, b]',
    '(2[x,x],x)>x',
    '(a[b]||(c[d]=e))',
    'a&&(b=c)&&(d=e)',
    'a.$._.B0',
    'a.if',
    'a().b',
    'x.y / z',
    'a[b, c]',
    'a[b]||(c[d]=e)',
    'a&&(b=c)'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
