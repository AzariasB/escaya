import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Var', () => {
  // Invalid cases
  for (const arg of [
    `(function a({ hello: {var}}) { })`,
    `var var = 2000000;`,
    'var t4 = ++await 1;',
    'var {  ...y, ...y } = {}',
    'var { foo: true / false } = {}',
    'var { *static() {} } = {}',
    'var { static(){} } = {}',
    'var [...] = obj;',
    'var [...bar = foo] = obj;',
    'var [...foo, bar] = obj;',
    'var foo, [bar];',
    'var {a.b: c} = v;',
    'var {[a]: b.c} = v',
    'var 🀒',
    // 'var { async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {} } = {}',
    // 'var { async *method([[,] = g()]) {} } = {}',
    'var a, b; [([a]), (((([b]))))] = [[], []];',
    'var a, b; [({a}), (((({b}))))] = [{}, {}];',
    'var a, b; ({a:({a}), b:((({b})))} = {a:{}, b:{}} );',
    'function foo() { return {}; }; var [foo()] = [];',
    'class foo { method() { var [super()] = []; } }',
    'var {foo:a=b}',
    'var {foo:a}',
    'var {foo}',
    'var {foo,,} = x;',
    'var\nfoo()',
    'var [foo], bar;',
    'var [...foo,,] = obj;',
    'var [...[foo, bar],,] = obj;',
    'var {,} = obj;',
    'var {,,x} = obj;',
    'var {x,, y} = obj;',
    'var {x}, {y} = z;',
    'var {x,, y} = obj;',
    'var [...foo,,] = obj;',
    'var { set: 1, set: 2 } = {}',
    'var a; [a--] = [];',
    'var [a, ...rest, b] = c;',
    'var [a a, b] = c;',
    'var {...x = 1} = {}',
    'var a, b; [...a, b] = [];',
    'var [((a)] = [];',
    'var [[(a)], ((((((([b])))))))] = [[],[]];',
    'var [];',
    'var a.b;'
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
    'var foo = { x = 10 } = {};',
    'var foo = { q } = { x = 10 } = {};',
    'var foo; foo = { x = 10 } = {};',
    'var foo; foo = { q } = { x = 10 } = {};',
    'var x; ({ x = 10 } = {});',
    'var q, x; ({ q } = { x = 10 } = {});',
    'var x; [{ x = 10 } = {}]',
    'var x; (true ? { x = true } = {} : { x = false } = {})',
    'var q, x; (q, { x = 10 } = {});',
    'var { x = 10 } = { x = 20 } = {};',
    'var { __proto__: x, __proto__: y } = {}',
    'var foo = async ({x}) => { var x = 2; return x };',
    'var foo = async ({x}) => { { var x = 2; } return x; };',
    'var foo = async ({x}) => { var y = x; var x = 2; return y; };',
    'var foo = async ({x}, g = () => x) => { { var x = 2; } return g(); };',
    'var foo = async ({x}) => { { var g = () => x; var x = 2; } return g(); };',
    'var foo = async ({x}, g = () => eval("x")) => { var x = 2; return g(); };',
    'var foo = async ({x}, y) => { var y; return y };',
    'var foo = async ({x}, y) => { var z = y; var y = 2; return z; };',
    'var foo = async (y, g = () => y) => { var y = 2; return g(); };',
    'var foo = async ({x}, y, [z], v) => { var x, y, z; return x*y*z*v };',
    'var foo = async ({x}) => { function x() { return 2 }; return x(); }',
    'var foo = async ({x}) => { { function x() { return 2 } } return x(); }',
    'var foo = async (x = 1) => { return x };',
    'var [,,a,b,,,c=2,...d] = a;',
    'var foo = async (x, y = x) => { return x + y; };',
    'var foo = async (x, y = () => x) => { return x + y(); };',
    'var ancestors = [/^VarDef$/, /^(Const|Let|Var)$/, /^Export$/];',
    'var idx = reverse ? --to : from++;',
    'for (var [x, ...[foo, bar]] = obj;;);',
    'var await = { await }',
    'for (var [a=[...b], ...c] = obj;;);',
    'for (var [,,] in x);',
    'var {x=1} = {a: 4, b: (x = 5)};',
    'var x = {a: 4, b: (x = 5)};',
    'var foo = {}; foo.if;',
    'var x; try {} catch (x) { x = 5; }',
    'var x; eval("");',
    'eval(""); var x;',
    'var x; var x;',
    'function x() {}; var x;',
    'var x; try {} catch (x) { var x = 5; }',
    '"use strict"; var x = 0; { let x; x = 6; }',
    '"use strict"; let x = 0; { let x = 6; }',
    'var [x, x] = [4, 5];',
    'var x; [x, x] = [4, 5];',
    'var foo = async (x = () => 1) => { return x() };',
    'var foo = async (x = {a: 1, m() { return 2 }}) => { return x.a + x.m(); };',
    'var foo = async (a = () => x) => { var x; return a(); };',
    'var foo = async (a = eval("x")) => { var x; return a; };',
    'var foo = async (a = x) => { var x = 2; return a; };',
    'var foo = async (a = () => { "use strict"; return eval("x") }) => { var x; return a(); };',
    'var foo = async function f(f = 7, x = f) { return x; }',
    `var foo = [23]
    -->[0];`,
    `var q
    /d/`,
    'var {[null]: y, ...x} = {null: 1, x: 1};',
    'var {[true]: y, ...x} = {true: 1, x: 1};',
    'var {[false]: y, ...x} = {false: 1, x: 1};',
    'var { [key]: y, ...x } = { b: 1, a: 1 };',
    'var {[key]: y, ...x} = {1: 1, a: 1};',
    'var { ...y } =  { ...z} ;',
    'var z = { b: 1}',
    'var [,,,,] = a;',
    `var f0 = function (a, b = a, c = b) {
    return [a, b, c];
  };
  expect(f0(1)).toEqual([1, 1, 1]);
  var f1 = function ({a}, b = a, c = b) {
    return [a, b, c];
  };
  expect(f1({a: 1})).toEqual([1, 1, 1]);
  var f2 = function ({a}, b = a, c = a) {
    return [a, b, c];
  };`,
    'var foo = {}; foo.super;',
    'var foo = {}; foo.interface;',
    'var foo = {}; foo.arguments;',
    'var [,,] = x;',
    'var\nfoo',
    'var [foo,,] = x;',
    'var [,foo] = x;',
    'var [foo,bar] = x;',
    'var [foo] = x, [foo] = y;',
    'var [foo] = x, b;',
    'var [...[a, b]] = obj;',
    'var [foo] = x, b = y;',
    'var x, [foo] = y;',
    'var {} = x;',
    'var {foo,} = x;',
    'var O = { async method() { await 1; } }',
    'var O = { async ["meth" + "od"]() { await 1; } }',
    'var [ a, , b ] = list',
    'var O = { async 0() { await 1; } }',
    'var let',
    'var [let] = []',
    'var x; { with ({}) { x = 1; } }',
    'for (var {x : y} of obj);',
    "var o = { get [/./.exec('')](){} }",
    `var [ a, , b ] = list;
  [ b, a ] = [ a, b ]`,
    'var x, {y} = obj;',
    'var foo, bar',
    'var [a, [b, c, d=2], ...rest] = test;',
    'const [...[x, ...[y, ...{z}]]] = [3, 4, 5];',
    'var [a, b,,,,] = test;',
    'var { 1.5: x, 2: y, ...z } = { 1.5: 1, 2: 2, 3:3 };',
    'var g4 = async (a = eval("x")) => { var x; return a; };',
    'var f13 = async function f(x = f) { function f() {}; return x; }',
    '({ __proto__: x, __proto__: y } = {})',
    'var { x = 10 } = (o = { x = 20 } = {});',
    'var x; (({ x = 10 } = { x = 20 } = {}) => x)({})',
    'var [...a] = [];',
    'var a; [...a] = [];',
    'var [a = 1] = [];',
    'var [a, b = 1] = [];',
    'var a, b; [a, b = 1] = [];',
    'var [[a]] = [[]];',
    'var a; [[a]] = [[]];',
    'var [a, [b]] = [1, []];',
    'var a, b; [a, [b]] = [1, []];',
    'var a, b; [((((a)))), b] = [];',
    'var [[[...a]]] = [[[]]];',
    'var a; [[[...a]]] = [[[]]];',
    'var [[...a], ...b] = [[],];',
    'var a, b; [[...a], ...b] = [[],];',
    'var [a, a] = [];',
    'var hi = function eval() { };',
    'var f = () => {var O = { method() { var await = 1; return await; } };}',
    'var f = () => {var O = { method(await) { return await; } };}',
    'var f = () => {var O = { *method() { var await = 1; return await; } };}',
    'var O = { *method(await) { return await; } };',
    'var { x, } = { x: 23 };',
    'var { w: [x, y, z] = [4, 5, 6] } = {};',
    'var { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };',
    'var { x: y = 33 } = { };',
    'var { x: y, } = { x: 23 };',
    'var xCls = class x {};',
    'var cls = class {};',
    'var\n{x} = x;',
    'var {x}\n= x;',
    'var [...x] = [1, 2, 3];',
    'var { x, } = { x: 23 };',
    'var { x: y = 33 } = { };',
    'var {...x} = { get v() { count++; return 2; } };',
    `var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined };`,
    `var { poisoned: x = ++initEvalCount } = poisonedProperty;`,
    `var { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`,
    `var arrow = () => {};`,
    'var {a: [b]} = c',
    'var {[a]: b} = c',
    'var {[a]: [b]} = c',
    'var {a,b=0,c:d,e:f=0,[g]:[h]}=0',
    'var m = "foo"; var {[m]:[z]} = {foo:[1]}',
    `var xFn = function x() {};`,
    'var obj = { test262id: 1 };',
    'var [] = [];',
    'var [a] = [];',
    'var a; [a] = [];',
    'var a; [a] = [1];',
    'var a, b; [a, b] = [1];',
    'var a; [a] = [1, 2];',
    'var a = [1], i = 0; [a[i++]] = [];',
    'var [,] = [];',
    'var [a,] = [];',
    'var a; [a,] = [];',
    'var [a,,b] = [];',
    'var [,,a] = [];',
    'var a; [a] = [,,];',
    'var [...a] = [];',
    'var a; [...a] = [];',
    `var [[x]] = [null];`,
    `var [fn = function () {}, xFn = function x() {}] = [];`,
    `var arrow = () => {};`,
    'var {a: [o, {p}]} = d;',
    'var { ...x } = z;',
    'var _ref = { z: "bar" };',
    'var { x, ...y } = z;',
    'var { [x]: x, ...y } = z;',
    'var [a, b] = [1, 2];',
    'var {} = null;',
    'var [[a, b]] = [[1, 2]];',
    'var [a, b, ...c] = [1, 2, 3, 4];',
    'var [[a, b, ...c]] = [[1, 2, 3, 4]];',
    'var [a, b] = [foo(), bar];',
    'var [a, b] = [clazz.foo(), bar];',
    'var [a, b] = [clazz.foo, bar];',
    'var arr = [ "a",, "b", ...c ];',
    'var arr = ["a",, "b"].concat(c.d(e));',
    'var [a, b] = [, 2];',
    'var 𞸀',
    '[a, b] = [1, 2];',
    '[a, b] = [, 2];',
    'var x; x = 8;',
    'function x() { x = 0; }',
    "'use strict'; let x; eval('');",
    'var [x, x] = [4, 5];',
    'var z = (x %= 2);',
    'var z = (x &= y);',
    'var z = {};',
    `var {x, y} = o`,
    'var {x: x, y: y} = o',
    'var {x=1, y=2} = o',
    'var a;',
    'var f, g = 42, h = false;',
    `var a = [ , 1 ], b = [ 1, ], c = [ 1, , 2 ], d = [ 1, , , ];`,
    `var foo = { }; foo.eval = {};`,
    `var TRIM = 'trim' in String.prototype;`,
    'var {x} = a, obj;',
    'var x = a, {y} = obj;',
    'var x, {y} = obj;',
    'var {x = y} = obj;',
    'var {x = y, z} = obj;',
    'var {x, y = z} = obj;',
    'var {x = y, z = a} = obj;',
    'var {x : y} = obj;',
    'var {x : y, z} = obj;',
    'var {x, y : z} = obj;',
    'var {x : y, z : a} = obj;',
    'var {x : y = z} = obj;',
    'var {x : y, z, a : b = c} = obj;',
    'var {[x]: y} = z;',
    'var {[x]: y = z} = a;',
    'var {a, [x]: y} = a;',
    'var [...x] = y',
    'var _\\u{1EE03}',
    'var a, [...x] = y',
    'var {...x} = y',
    'var {[2]: y} = {2:3}',
    'var diff = arrayDiff(before, after, function(a, b, callback) {})',
    'var [x, ...[foo, bar]] = obj;',
    'var [a=[...b], ...c] = obj;',
    'var {} = obj;',
    'var {x} = obj;',
    'var {x,} = obj;',
    'for (var [foo] = arr;;);',
    'for (var [foo,] = arr;;);',
    'for (var [foo,,] = arr;;);',
    'for (var [,foo] = arr;;);',
    'for (var [a=[...b], ...c] = obj;;);',
    'for (var {x, y} = obj;;);',
    'for (var {x} = a, {y} = obj;;);',
    'var {a: x, b: x} = {a: 4, b: 5};',
    'var x = 4; var x = 5;',
    'var [foo,bar=b] = x',
    'var [foo=a,bar=b] = x',
    'var [...bar] = obj;',
    'var {[a]: c} = v;',
    'var [foo=a,bar] = x;',
    'var [foo] = x;',
    'var {[a.b]: c} = v;',
    'var [foo, ...bar] = obj;',
    'var {foo} = x, {foo} = y',
    'var {foo} = x, b',
    'var {foo} = x, b = y',
    'var x, {foo} = y',
    'var x = y, {foo} = z',
    'var {foo=a} = x',
    'var {foo=a,bar} = x',
    'var {foo,bar=b} = x',
    'var {foo=a,bar=b} = x',
    'var {foo:a} = x',
    'var {foo:a,bar} = x',
    'var {foo,bar:b} = x',
    'var {foo:a,bar:b} = x',
    'var foo = bar\nvar zoo;',
    'var foo = bar',
    'var foo = bar, zoo = boo;',
    'var foo = bar, zoo = boo',
    'var\nfoo',
    'var [] = x;',
    'var source = "\\uD800!";',
    'var ℘;',
    'var ℘ = x;',
    'var [foo,,] = arr;',
    'var [,foo] = arr;',
    'var [,,foo] = arr;',
    'var [foo,bar] = arr;',
    'var [foo,,bar] = arr;',
    'var [foo] = arr, [bar] = arr2;',
    'var [foo] = arr, bar;',
    'var [foo] = arr, bar = arr2;',
    'var foo, [bar] = arr2;',
    'var [foo=a] = arr;',
    'var { [key++]: y, ...x } = { 1: 1, a: 1 };',
    'var { [++key]: y, [++key]: z, ...rest} = {2: 2, 3: 3};',
    'var { [fn()]: x, ...y } = z;',
    'var [foo=a, bar] = arr;',
    'var [foo, bar=b] = arr;',
    'var [foo=a, bar=b] = arr;',
    '[1 <= 0]',
    'var [] = x',
    'var [,] = x',
    'var [,,] = x',
    'var [foo] = x',
    'var [foo,] = x',
    'var [foo,,] = x',
    'var [,foo] = x',
    'var [,,foo] = x',
    'var [foo,bar] = x',
    'var [foo,,bar] = x',
    'var [foo] = x, [foo] = y',
    'var [foo] = x, b',
    'var [foo] = x, b = y',
    'var x, [foo] = y',
    'var x = y, [foo] = z',
    'var [foo=a] = c',
    'var [foo=a,bar] = x',
    'var [foo,bar=b] = x',
    'var [foo=a,bar=b] = x',
    'var [...bar] = obj;',
    'var [foo, ...bar] = obj;',
    'var {foo} = x, {foo} = y',
    'var {foo} = x, b',
    'var {foo} = x, b = y',
    'var x, {foo} = y',
    'var z = (x *= -1);',
    `var foo = { eval: 1 };`,
    'var await = `simple template`;',
    'var y = `{${x}}`;',
    'var y = `{ ${x} }`;',
    'var b = condition ? a?.x.?y : a?.y?.z;',
    `var foo = { }; foo.eval = {};`
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

  it('const [foo=a,bar=b] = x;', () => {
    t.deepEqual(parseScript('const [foo=a,bar=b] = x;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    }
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'BindingIdentifier',
                      name: 'b'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'x'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const x = y, {foo} = z;', () => {
    t.deepEqual(parseScript('const x = y, {foo} = z;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'x'
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'y'
              }
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'foo'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const { a: { ...bar }, b: { ...baz }, ...foo } = obj;', () => {
    t.deepEqual(parseScript('const { a: { ...bar }, b: { ...baz }, ...foo } = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingProperty',
                    key: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    value: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingRestProperty',
                          argument: {
                            type: 'BindingIdentifier',
                            name: 'bar'
                          }
                        }
                      ]
                    },
                    computed: false
                  },
                  {
                    type: 'BindingProperty',
                    key: {
                      type: 'BindingIdentifier',
                      name: 'b'
                    },
                    value: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingRestProperty',
                          argument: {
                            type: 'BindingIdentifier',
                            name: 'baz'
                          }
                        }
                      ]
                    },
                    computed: false
                  },
                  {
                    type: 'BindingRestProperty',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const [ a, ...bar ] = foo;', () => {
    t.deepEqual(parseScript('const [ a, ...bar ] = foo;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a'
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'foo'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const { [eval]: []} = a;', () => {
    t.deepEqual(parseScript('const { [eval]: []} = a;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingProperty',
                    key: {
                      type: 'IdentifierReference',
                      name: 'eval'
                    },
                    value: {
                      type: 'ArrayBindingPattern',
                      leafs: []
                    },
                    computed: true
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'a'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {foo=a,bar=b} = x;', () => {
    t.deepEqual(parseScript('const {foo=a,bar=b} = x;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingElement',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    initializer: {
                      type: 'IdentifierReference',
                      name: 'a'
                    }
                  },
                  {
                    type: 'BindingElement',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    },
                    initializer: {
                      type: 'IdentifierReference',
                      name: 'b'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'x'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {x} = a, {y} = obj;', () => {
    t.deepEqual(parseScript('const {x} = a, {y} = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'a'
              }
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'y'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const [x, ...[foo, bar]] = obj;', () => {
    t.deepEqual(parseScript('const [x, ...[foo, bar]] = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x'
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'ArrayBindingPattern',
                      leafs: [
                        {
                          type: 'BindingIdentifier',
                          name: 'foo'
                        },
                        {
                          type: 'BindingIdentifier',
                          name: 'bar'
                        }
                      ]
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {[a.b]: c} = v;', () => {
    t.deepEqual(parseScript('const {[a.b]: c} = v;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingProperty',
                    key: {
                      type: 'MemberExpression',
                      member: {
                        type: 'IdentifierReference',
                        name: 'a'
                      },
                      expression: {
                        type: 'IdentifierName',
                        name: 'b'
                      },
                      computed: false
                    },
                    value: {
                      type: 'BindingIdentifier',
                      name: 'c'
                    },
                    computed: true
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'v'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const x = class x {};', () => {
    t.deepEqual(parseScript('const x = class x {};'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'x'
              },
              initializer: {
                type: 'ClassExpression',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x'
                },
                super: null,
                leafs: []
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });
});
