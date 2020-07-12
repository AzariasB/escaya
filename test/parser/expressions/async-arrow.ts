import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Async arrow', () => {
  // Invalid cases
  for (const arg of [
    'async () => {}()',
    'async (x) => {}()',
    'async (x) => {}()',
    'async (x, y) => {}()',
    'async=>{}`x`',
    'async => {}() => {}',
    'async => {}()',
    'async (x) => {}()',
    'async (x, y) => {}()',
    'async => {}()',
    'async 1 => b;',
    '(x--, y) => x;',
    "(async()['foo19'] foo20 => 1)",
    '(async().foo11 foo12 => 1)',
    '(async().foo13 () => 1)',
    "(async['foo14'] => 1)",
    "(async['foo15'] foo16 => 1)",
    "(async['foo17'] () => 1)",
    "(async()['foo18'] => 1)",
    'var f = async() => ((async(x = await 1) => x)();',
    '(async function foo1() { } foo2 => 1)',
    '(async function foo3() { } () => 1)',
    'async(...a = b) => b',
    'async(...a,) => b',
    'async(...a, b) => b',
    "(async()['foo21'] () => 1)",
    'async\n() => x,\nfoo + async \n() => x',
    '[async \n () => x]',
    'async \n x \n => x',
    'async \n  => async',
    //'async () => x, y',
    '(async (...x = []) => {});',
    '(async`foo31`.bar32 () => 1)',
    '(async["foo15"] foo16 => 1)',
    'async x => [...await x] = obj',
    '(async ()=>x) => x;',
    '(async().foo13 () => 1)',
    '(async (...x = []) => {});',
    '({async set foo(value) { }})',
    'var x = 1 y => y',
    'async (a, 1, "c", d, e, f) => x;',
    '(a, 1, "c", d, e, f) => x;',
    'async (a, 1) => bar',
    'async (a, ...b+b=c) => a;',
    'async (a, ...b=true) => a;',
    'async (a, ...true=b) => a;',
    'async (a, ...b=fail) => a;',
    'async ([a + b] = x) => a;',
    'async({a = 1}, {b = 2} = {}, {c = 3} = {})',
    'delete async async => {}',
    'async (/foo/) => bar',
    '++async () => ok',
    '++(x, y) => ok',
    '++(x) => {}',
    '(x--, y) => x;',
    'async if => {}',
    'async (x--, y) => x;',
    '([a + b] = x) => a;',
    'async ([a + b] = x) => a;',
    'async x => do = 1',
    'async ([].a ? b : c) => x',
    'async x => else = 1',
    'async x => for = 1',
    'async x => function = 1',
    'function* a(){ async (yield) => {}; }',
    '(class { async })',
    'async ({x: void x})  => {}',
    'async ({x: this})  => {}',
    'async ({x: function(){}})  => {}',
    'async ({x: async ()=>x})  => {}',
    'async => ;',
    'async() => await',
    '(async function foo4() { } => 1)',
    '(async function() { } foo5 => 1)',
    '(async function() { } () => 1)',
    '(async function() { } => 1)',
    'async x => for = 1',
    'async x => if = 1',
    'async ([](a)) => x',
    'async ([(x)]) => x',
    'async ({a} = b,=c) => {}',
    'async ({a: {a=b}.x}) => x',
    'async ([...x.y]) => z',
    `async ([...x.y] = z) => z`,
    'async ([{a=b}.x]) => x',
    'async (x, [{a=b}.x]) => x',
    //'async(a = (await) => {}) => {};',
    'async ({get x() {}})=>x;',
    'async ({ident: {x}.join(x)}) => x',
    'async ({a: b => []} = [2])',
    'async (foo, break) => {}',
    `async ({x = y}.z) => obj`,
    `async (q, {x: y}.length) => x;`,
    `async (q, {x = y}.z) => obj`,
    `async ([...x.y] = z) => z`,
    `async ([...x.y]) => z`,
    `async (([a, ...b = 0]) => {})`,
    `async ({a: {x = y}}.z) => obj`,
    `async (localVar |= defaultValue) => {}`,
    'async ({get a(){}}) => 0;',
    'async (...[ 5 ]) => {}',
    'async ({x: const}) => null',
    `async ([a.a]) => 42`,
    'async ({a=b}.x) => x',
    'async ({a=b}[x]) => x',
    'async ({a=b}(x)) => x',
    'async ([{a=b}].x) => x',
    'async ([{a=b}][x]) => x',
    'async ([{a=b}](x)) => x',
    'async (q, {a=b}.x) => x',
    'async (q, {a=b}[x]) => x',
    'async (q, {a=b}(x)) => x',
    'async (q, [{a=b}].x) => x',
    'async (q, [{a=b}][x]) => x',
    'async (q, [{a=b}](x)) => x',
    'async (x, {ident: [foo, bar] += x} = y)',
    'async (x, {ident: [foo, bar] += x})',
    'async (x, {ident: [foo, bar]/x}) => x',
    'async (x, {ident: [foo, bar] += x} = y)',
    'async (x, {ident: [foo, bar] += x})',
    'async (x, {ident: [foo, bar]/x}) => x',
    'async (x, {ident: [foo, bar].join(y)}) => x',
    'async ([a.b]) => 0',
    'async (a=1 => 42)',
    'async ([a, b] => 42)',
    'async ([a, b] = [] => 42)',
    'async (if) => {}',
    'async (a, if) => {}',
    'async (c, a.b) => {}',
    'async (foo ? bar : baz) => {}',
    'async (a + b) => {}',
    'async (a + b, c) => {}',
    'async (q, a + b) => {}',
    'async (q, a + b, c) => {}',
    //'async (...a => 42)',
    'async ({x, ...this}) => x;',
    'async foo(([x = 25]) => x => x =>)',
    'async ({x = y}.z) => obj',
    'async (x, {x = y}.z = obj)',
    'async ({x = y}.z = obj)',
    'async ({x = y}).z',
    'async ([{x = y}].z) => obj',
    'async ([{x = y}]).z',
    'async ([{x: y.z} = a]) => b',
    'async ({x: y.z} = a) => b',
    'async ([{1: y.z} = a]) => b',
    'async ({333: y.z} = a) => b',
    'async ({ ...[x] }) => {}',
    'async (a++, b) => {}',
    'async (a, b++) => {}',
    'async ({...(a,b)}) => {}',
    'async ({...{a,b}}) => {}',
    'async ({...[a,b]}) => {}',
    'async (o.f=1)=>0',
    'async ({a: (x) * a[3](((((a /= [b.c] = ([x * 2]()=> a)))))) })',
    'async ({}=>0)',
    'async ([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0',
    'async ({a:b[0]})=>0',
    'async ([a,...b,])=>0',
    'async f = (...x = 10) => x',
    'async f = (q, ...x = 10) => x',
    'async x => (while) = 1',
    'async (...a = b) => b',
    'async ([...{ x }, y]) => {};',
    'async ([{x: y.z} = a]) => b',
    'async ([{x: y.z}] = a) => b',
    'async ({0})=>0;',
    `async left = (aSize.width/2) - ()`,
    'async (-a) => {}',
    'async (-a, b) => {}',
    'async (a, -b) => {}',
    'async ([a = yield b]) => x',
    //'({async foo() { return {await} }})',
    'async(,)',
    'async (,) => b;',
    'async ([x.y]=z) => z',
    'async ([{x: y.z}]) => b',
    'a + async () => {}',
    `async(...x,) => x`,
    //'async(...await) => {}',
    'async ({x: function(){}})  => {}',
    'async ({x: async ()=>x})  => {}',
    'async (...x = []) => {}',
    'async(foo = super()) => {}',
    'async ([x].foo) => x',
    '(async(a, ...(b)) => x)',
    // 'async (x=(await)=y)=>z',
    '(async().foo13 () => 1)',
    // 'async (a = (...await) => {}) => {};',
    'async a => async function',
    'async a => async function()',
    'async({a = 1}, {b = 2} = {}, {c = 3} = {})',
    'async ([{x: y.z} = a]) => b',
    '(async()["foo18"] => 1)',
    'async(async() () => {})(async() () => {})(async() () => {})(async() () => {})(async() () => {})',
    '({ async get a(){} })',
    'async (a, ...b, ...c) => {}',
    //'async await => {}',
    '(async.foo6 => 1)',
    '(async((a), ...(b)) => x)',
    '(async.foo7 foo8 => 1)',
    '(async.foo9 () => 1)',
    '(async().foo10 => 1)',
    '(async`foo22` => 1)',
    '(async`foo23` foo24 => 1)',
    '(async`foo25` () => 1)',
    '(async`foo26`.bar27 => 1)',
    '(async`foo28`.bar29 foo30 => 1)',
    '(async`foo31`.bar32 () => 1)',
    '(async["foo15"] foo16 => 1)',
    '(async().foo13 () => 1)',
    '(async["foo14"] => 1)',
    '(async["foo15"] foo16 => 1)',
    '(async["foo17"] () => 1)',
    '(async()["foo18"] => 1)',
    '(async()["foo19"] foo20 => 1)',
    '"(async()["foo21"] () => 1)',
    '(async`foo28`.bar29 foo30 => 1)',
    'async => {} ++foo',
    'async x => await = 1',
    'async x => class = 1',
    'async x => delete = 1',
    'async x => void = 1',
    'async x => (await) = 1',
    '()=>{}[x]',
    '()=>{}(foo)',
    'async ({x: void x})  => {}',
    '(async function foo4() { } => 1)',
    'async a => {} ()',
    'async \n x \n => x',
    'async=>{}[x]',
    'async x \n => x',
    'async foo ? bar : baz => {}',
    '(async()["foo18"] => 1)',
    '(async["foo17"] () => 1)',
    '(async`foo28`.bar29 foo30 => 1)',
    '(async["foo15"] foo16 => 1)',
    'async (a, b = await 1) => {}',
    'x={x: async \n () => x}',
    `async=>{}
    .x`,
    `()=>{}
    = 5`,
    `async x=>{}{x}`,
    `async x=>{}(foo)`,
    `async x => {} ++foo`,
    'async=>{}.x',
    'async=>{}(foo)',
    'async ({x} = await bar) => {}',
    'async ({x} = await bar);',
    'async ([x] = await bar) => {}',
    '(foo = [{m: 5 + t(await bar)}]) => {}',
    '({o} = [{m: 5 + t(await bar)}]) => {}',
    '([p] = [{m: 5 + t(await bar)}]) => {}',
    'try {} catch(e = async \n () => x) {}',
    'async ([p] = [{m: 5 + t(await bar)}]) => {}',
    'async ([p] = [{m: 5 + t(await bar)}]);',
    // 'async(a = (await) => {}) => {};',
    // 'async (a, await) => { }',
    'async () => { await => { }; }',
    'async () => { (a, await) => { }; }',
    /// 'async () => { (x, y, z = await 0) => { }; }',
    'async(a, 1) => x',
    'async (x, y) => ok async (x, y) => ok',
    'async => {} async => {}',
    'async => ok async => ok',
    'async async => ok async async => ok',
    'async async => ok async async => ok'
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
    'async X => {yield}',
    'async yield => {X}',
    'async yield => {yield}',
    'function* g() { async X => yield }',
    'async ([a])',
    'async ([a, b])',
    'async ({a})',
    'async ({a = 1}) => {};',
    'async ({a = 1}, {b = 2}) => {};',
    'async ({a = 1}, {b = 2}, {c = 3}) => {};',
    'async ({a = 1} = {}, {b = 2}, {c = 3}) => {};',
    'async ({a = 1} = {}, {b = 2} = {}, {c = 3}) => {};',
    'async ({a = 1} = {}, {b = 2} = {}, {c = 3} = {}) => {};',
    'async ({a, b})',
    `()=>{}
    + a`,
    'a ? async () => {1} : b',
    'a ? b : async () => {1}',
    'async ([{a = 0}]) => {};',
    'async ([...[{a = 0}]]) => {};',
    'async (a, (a, (b, c) => 0))',
    'async (a, (a) => 0)',
    'async (a, async (a) => 0)',
    'async (a, async (a = b => 0) => 0)',
    'async ({x}, [y], z) => x',
    'async ({x = 30}, [y], z) => x;',
    'async r => result = [...{ x = await x }] = y;',
    'async  (x = 20) => x;',
    'async ([x] = 20, y) => x;',
    'async ([x = 20] = 20) => x;',
    'async ([x = 25]) => x => x => ({x} = {});',
    'foo(async ({x}, [y], z) => x)',
    'foo(async ({x = 30}, [y], z) => x)',
    'foo(async foo => x)',
    'foo(async foo => x => (x = 20) => (x = 20) => x)',
    'foo(async foo => x => x => x => x)',
    'var f = cond ? async x=> x : async x=>2',
    'async () => await (5)',
    'async (a, b, c, d, e, f) => { return "" + a + b + c + d + e + f; };',
    'async x => () => x;',
    'async x => x => x;',
    `async=>{}
    (foo)`,
    'async x => x',
    'async () => bar;',
    'async foo => bar;',
    'async (x, y, z) => x + y + z;',
    'async x => () => x;',
    'async (x, y) => { return x + y; };',
    'async () => { return () => { return this; } };',
    'async x => { return () => x; }',
    'async ({})[x => x]',
    'async function a() { await 0; }',
    '(async function a() { await 0; })',
    'async () => await 0',
    '({ async a(){ await 0; } })',
    'async;\n(a, b) => 0',
    'async\nfunction a(){}',
    `y = async x => await x`,
    `async x => async (a = await b - a)`,
    `async x => async (a = await b - a / (async))`,
    `async x => async (a = await b - a / await(async))`,
    `async x => async ((a = await b) - a / (async))`,
    `async x => async ((a = b) => a - a / (await))`,
    `async x => async (a = await b)`,
    `async x => async ([a = await b])`,
    `async x => async ({a: b = await c})`,
    'async (a, ...b) => a;',
    `({a = await}) => x`,
    `({await}) => x`,
    `({a: b = await}) => x`,
    'new async()',
    'async()``',
    '(async x => { return x }).toString()',
    '() => ({ async f() { return "test4"; } }).f()',
    '() => ({ async f() { return "test4"; } }).f()',
    'async a => a',
    'async a => a',
    'async a => a',
    'async a => a',
    'async a => a',
    'async function foo(a = async () => await b) {}',
    '({async: 1})',
    'async yield => 1',
    'f(a, async (b, c) => await [b, c], d)',
    'f(a, async (b, c) => await [b, c], d)',
    'async()',
    'async(a, b)',
    'async(...a, ...b)',
    '({ ...async () => { }})',
    '(async x => y)',
    '(async (x, z) => y)',
    '({x: async (y,w) => z})',
    'async({x = yield}) => 1; ',
    'async (icefapper = bad) => {  }',
    'async ({a: b = c})',
    'async ((a))',
    'async function a(){}(0)',
    '(async function a(){}(0))',
    '(async function() { (await y); })',
    'async function a(){}',
    '(async function a(){})',
    'async function a() { function b(c = await (0)) {} }',
    '({ async })',
    'async("foo".bar);',
    'var asyncFn = async({ foo = 1 }) => foo;',
    'var asyncFn = async({ foo = 1 } = {}) => foo;',
    'async (async) => 1',
    'async ([a]) => 1',
    'async ([a, b]) => 1',
    'async ({a}) => 1',
    'async ({a, b}) => 1',
    'async () => () => 0',
    'async () => x => (a, b, c) => 0',
    'async y => () => (a) => 0',
    'async () => (("๏บบ"))',
    'async () => ("\\u{20ac}")',
    'async () => (() => (123))',
    'async() => a = ({});',
    'async () => a = (() => b = (123))',
    'async() => a = (async() => b = ("str"));',
    'async () => true ? 1 : (0)',
    'async () => true ? 1 : ("๏บบ")',
    'async() => true ? 1 : (() => false ? 1 : (0))',
    'async (argMath139 = (/a/ instanceof ((typeof Boolean == "function" ) ? Boolean : Object)),argMath140,argMath141) => {  return await ("valueOf" in i32);  }',
    'async x => { return x => x; }',
    'async (a = b => await (0)) => {}',
    '(async(a, b, ...c) => await 1)',
    'async () => (async(foo, { a = NaN }) => foo + a)("1", { a: "0" })',
    'async () => (async(foo, { a = "0" }) => foo + a)("2", { a: undefined })',
    `async x => {}
     async (x) =>  {}`,
    `async (x) =>  {}
     async x => {}`,
    'var f = cond ? x=>{x.foo } : x=>x + x + x + x + x + x + (x =>x)',
    '(a, b, (c, d) => 0)',
    'async (a = (...await) => {});',
    '(a, b) => 0, (c, d) => 1',
    '(a, b => {}, a => a + 1)',
    'async((a, b) => {}, (a => a + 1))',
    'async ({}) => {}',
    'async (a, {}) => {}',
    'async ({}, a) => {}',
    'async ([]) => {}',
    'async (a, []) => {}',
    'async ([], a) => {}',
    'async (a = b) => {}',
    'async x => (let) = 1',
    'async x => y => x + y',
    'async(a = (await) => {});',
    'async (x, y) => (u, v) => x*u + y*v',
    'async (x, y) => z => z * (x + y)',
    'async x => (y, z) => z * (x + y)',
    'async ([a]) => [0]',
    'async ([a,b])=>0',
    'async ({})=>0',
    'async g => (x = [await y])',
    'async (eval) => eval',
    'async eval => eval',
    'async arguments => arguments',
    'async (x) => { return x }',
    'async (...x) => { return x.length; }',
    'async (() => 1)(), 1',
    '(async a => a + 1)(1), 2',
    'async (() => { return 3; })(), 3',
    '(async a => { return a + 3; })(1), 4',
    'async () => f1({x: 1})',
    'async () => f10({x: 6}, 2)',
    'async x => (arguments) = 1',
    '(async (a, b) => a + b)(1, 4), 5',
    'async x => {}, a',
    'async x => ok, a',
    'a, async () => ok',
    'a, async (x) => {}',
    `async=>{}
    [x]`,
    `async=>x
    , y`,
    /*`a => {}
    () => {}`, */
    'async=>x, y',
    `async g => (x = [await y])`,
    'async => async',
    `async ({await: a}) => 1`,
    'async (arguments) => {}',
    'async arguments => {}',
    'async (arguments) => {"use strict";}',
    'async arguments => {"use strict";}',
    'async eval => {}',
    'a, async (x, y) => ok',
    'a, async async => {}',
    'a, async x => ok',
    '(async => {}) (async => {})',
    '(async (x) => {}) * x',
    '(async (x, y) => {}) * x',
    '(async => {}) * x',
    '(async => ok) * x',
    '(async x => ok) * x',
    'f(async ()=>c)',
    'x * (async => ok)',
    'x * ((x, y) => ok)',
    'x * (async () => {})',
    'x * (async () => ok)',
    'x = {arrow: async (x) => ok}',
    'x = {arrow: async (x, y) => ok}',
    'x = {arrow: async async => ok}',

    `async=>{}
    {x}`,
    `async => {}
    ++foo`,
    '(async => {}) * x',
    '(async => ok) * x',
    '(async x => ok) * x',
    '(async (x) => {}) * x',
    '(async (x, y) => {}) * x',
    '(async => {}) * x',
    '(async => ok) * x',
    '(async x => ok) * x'
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

  it('Assigned async arrow', () => {
    t.deepEqual(parseScript('id = async x => x, square = async (y) => { y * y }'), {
      directives: [],
      leafs: [
        {
          expression: {
            leafs: [
              {
                left: {
                  name: 'id',
                  type: 'IdentifierReference'
                },
                operator: '=',
                right: {
                  async: true,
                  contents: {
                    body: {
                      name: 'x',
                      type: 'IdentifierReference'
                    },
                    type: 'ConciseBody'
                  },
                  params: [
                    {
                      name: 'x',
                      type: 'BindingIdentifier'
                    }
                  ],
                  type: 'ArrowFunction'
                },
                type: 'AssignmentExpression'
              },
              {
                left: {
                  name: 'square',
                  type: 'IdentifierReference'
                },
                operator: '=',
                right: {
                  async: true,
                  contents: {
                    directives: [],
                    statements: [
                      {
                        expression: {
                          left: {
                            name: 'y',
                            type: 'IdentifierReference'
                          },
                          operator: '*',
                          right: {
                            name: 'y',
                            type: 'IdentifierReference'
                          },
                          type: 'BinaryExpression'
                        },
                        type: 'ExpressionStatement'
                      }
                    ],
                    type: 'FunctionBody'
                  },
                  params: [
                    {
                      name: 'y',
                      type: 'BindingIdentifier'
                    }
                  ],
                  type: 'ArrowFunction'
                },
                type: 'AssignmentExpression'
              }
            ],
            type: 'CommaOperator'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Async arrow no arguments', () => {
    t.deepEqual(parseScript('async () => 42'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [],
            contents: {
              type: 'ConciseBody',
              body: {
                type: 'NumericLiteral',
                value: 42
              }
            },
            async: true
          }
        }
      ],
      webCompat: true
    });
  });

  it('Async arrow one argument with await', () => {
    t.deepEqual(parseScript('async a => { await a }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'a'
              }
            ],
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'a'
                    }
                  }
                }
              ],
              directives: []
            },
            async: true
          }
        }
      ],
      webCompat: true
    });
  });

  it('Async arrow object pattern parameter', () => {
    t.deepEqual(parseScript('async ({x: y = z}) => x'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingProperty',
                    static: false,
                    key: {
                      type: 'IdentifierName',
                      name: 'x'
                    },
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'y'
                      },
                      right: {
                        type: 'IdentifierReference',
                        name: 'z'
                      }
                    },
                    computed: false
                  }
                ]
              }
            ],
            contents: {
              type: 'ConciseBody',
              body: {
                type: 'IdentifierReference',
                name: 'x'
              }
            },
            async: true
          }
        }
      ],
      webCompat: true
    });
  });

  it('Async arrow parenthesized', () => {
    t.deepEqual(parseScript('async (x) => { x * x }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'x'
              }
            ],
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'x'
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: 'x'
                    },
                    operator: '*'
                  }
                }
              ],
              directives: []
            },
            async: true
          }
        }
      ],
      webCompat: true
    });
  });

  it('Async arrow yield', () => {
    t.deepEqual(parseScript('async yield => 0;'), {
      directives: [],
      leafs: [
        {
          expression: {
            async: true,
            contents: {
              body: {
                type: 'NumericLiteral',
                value: 0
              },
              type: 'ConciseBody'
            },
            params: [
              {
                name: 'yield',
                type: 'BindingIdentifier'
              }
            ],
            type: 'ArrowFunction'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Async arrow package', () => {
    t.deepEqual(parseScript('async package => 0;'), {
      directives: [],
      leafs: [
        {
          expression: {
            async: true,
            contents: {
              body: {
                type: 'NumericLiteral',
                value: 0
              },
              type: 'ConciseBody'
            },
            params: [
              {
                name: 'package',
                type: 'BindingIdentifier'
              }
            ],
            type: 'ArrowFunction'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Async arrow multiple args', () => {
    t.deepEqual(parseScript('async (x, y) => { x * y }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunction',
            params: [
              {
                type: 'BindingIdentifier',
                name: 'x'
              },
              {
                type: 'BindingIdentifier',
                name: 'y'
              }
            ],
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'x'
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: 'y'
                    },
                    operator: '*'
                  }
                }
              ],
              directives: []
            },
            async: true
          }
        }
      ],
      webCompat: true
    });
  });
});
