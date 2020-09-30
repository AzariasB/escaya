import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Compound assignment', () => {
  // Invalid cases
  for (const arg of [
    '1 &= 1;',
    '1 |= 1;',
    '[a] *= 0;',
    '[] += a',
    '({a} += {a});',
    '({a}) *=	-1',
    '({a} *= -1)',
    '[a >>>= a] += 1;',
    '([(a = b)] = []',
    '[a >>>= a] += 1;',
    '({a: (b = 0)} = {})',
    'foo() += 1;',
    'foo() /= 1;',
    '1 >>>= 1;',
    '1 &= 1;',
    '0.toString'
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
    '[a >>>= a];',
    '([a += a] );',
    '([(a *= -1)])',
    '([a *= -1])',
    '([...a += a] );',
    'x ^= new String("1");',
    '[a >>>= (a += (a))];',
    '[a >>>= a += {a}];',
    'x *= undefined;',
    'x |= "1";',
    'x *= null;',
    'z = (x %= y);',
    'x += "1";',
    'x >>= true;',
    'x |= true',
    'x |= 1',
    'x += true',
    'x -= 1;',
    '(new foo).bar()',
    'a(0).b(14, 3, 77).c',
    'x /= true;',
    'obj.len &= 10;',
    '(x + y) >= z',
    '(x + y) <= z',
    `obj.prop >>= 20;`,
    `a |= 2;`,
    `obj.prop &= 20;`,
    'obj.len ^= 10;',
    'var z = (x += 1);',
    'var z = (x <<= 1);',
    'x -= 1 ',
    'y1 = (y %= 2);',
    'y1 === -1',
    'x *= "1";',
    'x /= null;',
    'x >>>= true;',
    'if (scope.x !== 2) {}',
    '([...a += a += a += (a) >>>= 2]);',
    '[...a %= (a)];',
    'y1 = (y %= 2);',
    '({a: a *= -1})',
    'x /= y',
    'x >>>= true;',
    'if (scope.x !== 2) {}',
    '[a >>>= a += {a}];',
    'base[prop()] /= expr();',
    'y1 = (y <<= 1);',
    'x |= 1'
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
