import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Assignment', () => {
  // Invalid cases
  for (const arg of [
    '[(a = 0)] = 1',
    // Assignment of a pattern
    'x = {x=y};',
    // 'y/[]=x',
    '"x" = 42;',
    '42 = 42;',
    '(([a])=0);',
    '(({a})=0);',
    'a = b + c = d',
    'x in [2=y]',
    'x in [2=y]',
    'x = {x=y};',
    '[(a = 0)] = 1',
    'a = b + c = d',
    '({...(a,b)} = foo)',
    '({...{}} = {})',
    '({...obj1,} = foo)',
    '(case = "sentinal 453543")',
    '(1) = (y) = x',
    'y = (1) = x',
    '(y) = (1) = x',
    '(1) = x',
    '({a:(a,y) = 0} = 1)',
    'x in [2=y]',
    '[(a = 0)] = 1',
    '1 = x',
    'x, {a: 1} = [];',
    '(catch = "sentinal 453543")',

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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
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
    '((a)) = b;',
    'x = ((y)) = z',
    'x = x = y = null;',
    '({...(obj)} = foo),({...obj} = foo),({...obj.x} = foo),({...{}.x} = foo),({...[].x} = foo)',
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
    'x = [a, b] = y',
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
    '0, { x: x = y } = {};',
    '0, { x: [ x ] } = { x: null };',
    '0, { x: [ x ] } = {};',
    '0, { a: c } = { a: 2 };',
    'x = { xy: x.y } = { xy: 4 };',
    '(arguments = "sentinal 543665")',
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
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
