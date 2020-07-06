import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Parenthesized', () => {
  // Invalid cases
  for (const arg of [
    '({ident: [foo, bar] += x} = y)',
    // '({ident: [foo, bar] + x} = y)',
    '([0])=>0;',
    '({x = y}).z',
    '({x = y}.z = obj)',
    '({...[]} = x);',
    '({...obj1,} = foo)',
    '({...obj1,a} = foo)',
    '({...obj1,...obj2} = foo)',
    '({...(a,b)} = foo)',
    '(x=(await z)=y)',
    '([{x = y}].z = obj)',
    '([{x = y}.z])',
    '([{x = y}].z)',
    '(null) = x',
    '({a},) = x',
    '({...(a,b)} = foo)',
    '(do = "sentinal 453543")',
    '(1) = y = x',
    '({a: 1 = x })',
    '(y) = (1) = x',
    '(1) = x',
    '(a,) = x',
    '([x] = y,) = x',
    '({a},)',
    '(,)',
    '({x = y}.z)',
    '([{x = y}])',
    `({15: 15.foo}=x)`,
    '(()) => 0',
    '({...{}} = {})',
    '({...obj1,...obj2} = foo)',
    '({a: {x = y}}.z = obj)',
    '({a: {x = y}.z})',
    '({a: {x = y}}.z)',
    '({a: {x = y}})',
    '([{x = y}]).z',
    '({[x](){}} = z);',
    '({x:{1:y()=x},x:{7:3}})>x',
    '()',
    '(...a)',
    '(...a, b)',
    '(a, ...a) = b',
    '(...a,...a)',
    '({...a}) = b',
    '(a,b)+=2',
    '(a,b)=2',
    '(a=1)+=2',
    '(a=1)=2',
    '();',
    '()',
    '(...x);',
    '(...);'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '({x = y} = z)',
    '({a: {x = y}} = z)',
    '({...a,b,c})',
    '({ident: {x: y}})',
    '(false)',
    `a = (
  b,
  c
)`,
    '([target()[targetKey()]] = x);',
    '({...x.x, y})',
    '({...x.x = y, y})',
    '({...x = y, y})',
    '([x.y = a] = z)',
    '([x.y = a] = ([x.y = a] = ([x.y = a] = z)))',
    '([{x = y}] = z)',
    '({..."x".x} = x);',
    '(a.b) += 1;',
    '(this.a) += 1;',
    '({...{}.x} = x);',
    '([...[].x] = x);',
    '([...[([...[].x] = x)].x] = x);',
    '({...(a,b),c})',
    '([...{}.x] = x);',
    '({...a.x} = x);',
    '({..."x"[x]} = x);',
    '({...[][x]} = x);',
    '({...[][x]} = x = y);',
    '({...[][x]} = x = (y));',
    '({...[][x]} = (x) = (y));',
    '({...{}[x]} = x);',
    '({...{}[x = (y)[z]]} = x);',
    '({a: {x = y}} = z)',
    '([...[({...{}[x = (y)[z]]} = x)][x]] = x);',
    '([...[][x]] = x);',
    '([...{}[x]] = x);',
    '([...{}[x]] = "x");',
    '({...{b: 0}.x} = {});',
    '({...[0].x} = {});',
    '({...{b: 0}[x]} = {});',
    '({...[0][x]} = {});',
    '({...[1][2]} = {});',
    '(let)[x].foo in x;',
    '({x: y.z} = b)',
    'foo({get [bar](){}, [zoo](){}});',
    'foo({[bar](){}, get [zoo](){}});',
    'foo({set [bar](c){}, [zoo](){}});',
    'foo({[bar](){}, set [zoo](e){}});',
    'a = (  b, c  )',
    '([...[].x] = x);',
    '({a:(b) = c})',
    '({a:(b) = 0} = 1)',
    '(x, y, ...z) => foo',
    '({ a: (b) } = {})',
    '(async)=2',
    '({200:exp})',
    '({a:(b) = c} = 1)',
    '({*ident(){}})',
    '({*[expr](){}})',
    '({*20(){}})',
    '(x=(await)=y)',
    '({[foo]: x} = y)',
    '(null)',
    '(x, /x/)',
    '(/x/g)',
    '({ a: {prop: 1}.prop } = {})',
    `({ async* f(a, b, ...c) { await 1; } })`,
    '([(x())[y] = a,] = z);',
    '({ident: {x:y}/x})',
    '({ident: [foo, bar]/x/g})',
    '({ident: [foo, bar].join("")})',
    '({[x]: y}) => z;',
    '({[foo]: bar} = baz)',
    '([...x]);',
    '([...x]) => x',
    '({...obj.x} = foo)',
    '({...obj} = foo)',
    '({...x+y});',
    '({...x, ...y});',
    '({...x, y});',
    '(z = [...x.y]) => z',
    '([...x=y]);',
    '({ x : foo()[y] } = z = {});',
    '({ x : { foo: foo().y } });',
    '(await) = 1',
    '("\\u{10FFFF}")',
    '({a} = b,) => {}',
    '([x] = y,) => {}',
    '({a},) => {}',
    '([x],) => {}',
    '(obj[0]) = 1;',
    '(obj.a) = 1;',
    '({a:((((a1))))} = {a:20})',
    '({a:a1 = r1 = 44} = {})',
    '({a, a:a, a:a=a, [a]:{a}, a:b()[a], a:this.a} = 0);',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    'f = (argument1, [a,b,c])',
    '({[x]:y});',
    '({ident: [foo, bar] + x})',
    '({ident: {x: y}})',
    '([a / b]);',
    `([a
      /b/g]);`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Assignment to something that must destruct', () => {
    t.deepEqual(parseScript('({a: {x = y}} = z)'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ObjectAssignmentPattern',
                properties: [
                  {
                    type: 'AssignmentProperty',
                    static: false,
                    key: {
                      type: 'IdentifierName',
                      name: 'a'
                    },
                    value: {
                      type: 'ObjectAssignmentPattern',
                      properties: [
                        {
                          type: 'BindingElement',
                          binding: {
                            type: 'IdentifierName',
                            name: 'x'
                          },
                          initializer: {
                            type: 'IdentifierReference',
                            name: 'y'
                          }
                        }
                      ]
                    },
                    computed: false
                  }
                ]
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
