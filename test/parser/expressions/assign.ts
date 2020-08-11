import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Assign', () => {
  // Invalid cases
  for (const arg of ['a = b + c = d', '[,', '[] += a']) {
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
    'a -= b',
    '[a, b] = c = d',
    '[(a)] = x',
    'a *= b',
    'a |= b',
    'a += b',
    'a = b = c = d',
    'a=(b=c)',
    'a=b=c',
    '[foo, bar] = doo;',
    '[foo = y, bar] = doo',
    '[(a), b] = [];',
    '[((((a)))), b] = [];',
    '[[1].c] = [];',
    'x = [a, b] = y',
    '({a:(b) = c})',
    '({a:(b) = c} = 1)',
    '({a:(b) = 0} = 1)',
    '({...await} = obj)',
    '[a, b] = c = d',
    '[(x).foo = x] = x',
    '[([1].c)] = [];',
    '(a**b).c=0',
    '[0].length = 0',
    '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0;',
    'a = (b, c)',
    'arguments = 42',
    'b = "a"; ',
    'b = {};',
    '(a)=(0);',
    'x.x *= 0',
    'a = b = c',
    '(a) = b;',
    'a = ((b)) = c;',
    '((a)) = b;',
    'x = ((y)) = z',
    'x = x = y = null;',
    '({...(obj)} = foo),({...obj} = foo),({...obj.x} = foo),({...{}.x} = foo),({...[].x} = foo)',
    '[[1].c] = [];',
    'from === undefined',
    'of = 42',
    'a = /b/',
    '!/^(?:boolean|number|string|undefined)$/',
    'if (from === undefined) {}',
    '([target()[targetKey()]] = source());',
    'x = { __proto__: x, __proto__: y } = value;',
    'x = x = y = null;',
    'x = ({ __proto__: x, __proto__: y } = value);',
    'arrow = () => {};',
    'x <<= 42',
    'x &= 42;',
    'x /= 42',
    'arguments = 42',
    'async = a + await;  a = async++;',
    'd = a + b;  a = b;',
    'x >>>= 42',
    'a=0;',
    '(a)=(0);',
    'x *= 0',
    'x.x *= 0',
    'x /= 0',
    'x **= 0',
    '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0;',
    '[0].length = 0',
    '(a**b).c=0',
    'x = [ x = yield ] = [];',
    'x = [...[x]] = [1, 2, 3]',
    'x = [...{ 0: x, length }] = [null];',
    'x = [...x[yield]] = [33, 44, 55];',
    'x = { yield } = { yield: 3 };',
    'x = { xFn = function x() {}, fn = function() {} } = {}',
    'x = { x: arrow = () => {} } = {};',
    'x = { x: xCover = (0, function() {}), x: cover = (function() {}) } = {};',
    '({...obj.x} = foo)',
    '({...[].x} = foo)',
    '({...{}.x} = foo)',
    '({...obj} = foo)',
    '[([1].c)] = [];',
    '({a:(b) = c})',
    '({a:(b) = c} = 1)',
    '({a:(b) = 0} = 1)',
    '0, { x: x = y } = {};',
    '0, { x: [ x ] } = { x: null };',
    '0, { x: [ x ] } = {};',
    '0, { a: c } = { a: 2 };',
    'x = { xy: x.y } = { xy: 4 };',
    '({ a: {prop: 1}.prop } = {})',
    'x = {async, bar}',
    '({...{}.x} = foo)',
    'of = 42',
    'a=b',
    'a += b',
    'a /= b',
    '(a) = b;',
    '((a)) = b;',
    'a = ((b)) = c',
    'a = b = c',
    '(a) = b;',
    '((a)) = b;',
    '(a**b).c=0',
    '[0].length = 0',
    'x = ((y)) = z',
    'await = 16',
    'if (from === undefined) {}',
    'x = x = y = null;',
    'of = 42',
    '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0;',
    'a = (b, c)',
    '(a)=(0);',
    'x.x *= 0',
    '[(a), b] = [];',
    '[((((a)))), b] = [];',
    'x = [a, b] = y'
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
