import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Regular expression', () => {
  // Invalid cases
  for (const arg of [
    '[(a = 0)] = 1',
    // Assignment of a pattern
    'x = {x=y};',
    // 'y/[]=x',
    'x in [2=y]',
    '({...(a,b)} = foo)',
    '({...{}} = {})',
    '({...obj1,} = foo)',
    '(1) = (y) = x',
    'y = (1) = x',
    '(y) = (1) = x',
    '(1) = x',
    '({a:(a,y) = 0} = 1)',
    'x in [2=y]',
    '[(a = 0)] = 1',

    // Destructuring

    '({a:(a,y) = 0} = 1)',
    '({...obj1,} = foo)',
    '({...obj1,a} = foo)',
    '({...(a,b)} = foo)',
    'x, {a: {a: 1} = []};',
    'x, [foo + y, bar] = doo;',
    '({foo: {x:y} += x})',
    '...{a: b}.c = [])'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'a -= b',
    '[a, b] = c = d',
    '[(a)] = x',
    'a *= b',
    'a += b',
    'a = b = c = d',
    'a = b = c',
    '(a) = b;',
    '((a)) = b;',
    '(a**b).c=0',
    '[0].length = 0',
    'x = ((y)) = z',
    'if (from === undefined) {}',
    'x = x = y = null;',
    'of = 42',
    '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0;',
    'a = (b, c)',
    '(a)=(0);',
    'x.x *= 0',
    '[(a), b] = [];',
    '[((((a)))), b] = [];',
    'x = [a, b] = y',
    '[[1].c] = [];',

    // Destructuring

    '({...obj.x} = foo)',
    '({...[].x} = foo)',
    '({...{}.x} = foo)',
    '({...obj} = foo)',
    '[([1].c)] = [];',
    '({a:(b) = c})',
    '({a:(b) = c} = 1)',
    '({a:(b) = 0} = 1)'
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
