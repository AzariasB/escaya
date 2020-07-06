import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Compound assignment', () => {
  // Invalid cases
  for (const arg of [
    '({a *= -1})',
    '({a} *= -1)',
    '({a}) *=	-1',
    '({a} += a);',
    '([a] += a);',
    `({a} += {a});`,
    `[a >>>= {a} += {a}];`,
    '[1 >>>= a];',
    '[a >>>= a] += 1;',
    '[a >>>= a] += a;',
    '({a: (b = 0)} = {})',
    '([(a = b)] = []',
    // '({a: b += 0} = {})',
    '[a += b] = []',
    '0.toString',
    '1 |= 1;',
    '1 &= 1;',
    '0.toString'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '[a >>>= a];',
    '([a += a] );',
    '([(a *= -1)])',
    '([a *= -1])',
    '([...a += a] );',
    '[a >>>= (a += (a))];',
    '[a >>>= a += {a}];',
    'var z = (x *= -1);',
    '(new foo).bar()',
    'a(0).b(14, 3, 77).c',
    'obj.len &= 10;',
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
