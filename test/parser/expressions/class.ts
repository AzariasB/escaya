import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Class', () => {
  // Invalid cases
  for (const arg of [
    '(class { get m() })',
    '(class { m() {}, n() {} })',
    '(class { set m() {} })',
    '(class { m(); n() })',
    '(class {)',
    '(class extends)',
    '(class name extends)',
    '(class name)',
    '(class)',
    `class A extends async
    x => y {}`,
    '(class b {#a:})',
    '(class b {a:})',
    '(class x { `constructor`(){} })',
    '(class x { y; })',
    'class x extends a = b {}',
    'class x {foo, bar(){}}',
    '(class A {async set "foo"(x){}})',
    '(class A {* set "foo"(x){}})',
    '(class A {async get 7(){}})',
    '(class A {* get 8(){}})',
    'class x { static set prototype(x){} }',
    'class x { static *prototype(){} }',
    'class x extends ()=>1 {}',
    '(class { static *get [x](){}}) (class { static *get [x](){}})',
    '(class { static *set [x](y){}})',
    'class A extends await x {}',
    'class A extends oh,no {}',
    'class A extends super.foo {}',
    '(class C {async *(){}})',
    '(class C {async set x(y){}})',
    // 'class A extends {x} = b {}',
    'function *a() { class yield() {} }',
    `let c = class x { async
      /foo/ }`,
    'class x extends await y { }',
    'class X { async constructor() {} }',
    'class x{ async static static(){} }',
    'class x { x \n /foo/ }',
    '(class x{set *555(a){}})',
    `foo(class x { y() {} }
    /foo/)`,
    'class x { async *constructor(){} }',
    'class x { async constructor(){} }',
    '(class x{async *get 8(){}})',
    '(class x{static *set 8(y){}})',
    'class x extends`${08}`{}',
    'class x extends (08) {}',
    '(class A extends B { method() { super() } })',
    '(class { m(); n() })'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    '(class x {})',
    '(class x { a() {}})',
    'f = ([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }]) => {}',
    '(class o {f(){ function x(){}}})',
    '(class A {async * 34(){}})',
    '(class A {set [foo](x){}})',
    '(class X {})',
    '(class x{}())',
    '(class A {set prototype(x){}})',
    '(class x{}.foo())',
    'x = class{} / x',
    'class x { get prototype(){} }',
    '(class x { async prototype(){} })',
    '(class A {static 2(){}})',
    '(class x { get [y](){}})',
    '(class x{*[x](){}})'
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
