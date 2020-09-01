import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Misc - Pass', () => {
  for (const arg of [
    '0b100n',
    '0o533n',
    '0xabcn',
    '45n',
    //'a(x:b)',
    //'a(x:c(y:b))',
    `"x\\\\0"; "use strict";`,
    'x \n /foo',
    'x \n /foo/g',
    'debugger \n /foo/',
    'debugger \n /foo/g',
    'a([1 || 1].a = 1)',
    'x ([1 || 1].a = 1)',
    'x({a: 1 || 1}.a = 1)',
    'for(`${x in y}`;;);',
    `({} + 1);`,
    `async ({} + 1);`,
    `async ({} ? [] : 1);`,
    '({1: ({}) / (1)});',
    '({1: ({}) ? (1) : [1]});',
    `for ({da = 2e308} of ([, , , (arguments[((f))]).break = (null)] = (/(?=\\B\\b)/gmuy === njbcpwhomopc.switch))) continue`,
    `for (var c, f; (/[+-\\\\l-]/u); ((class {}).with)) var i;`,
    `if ((([(((null))), , (([(2e308).r = (((2e308)) ? this : ("")), aihgi] = ({}))), (2e308), ("")]))) for (jdrdckxlyikhuari in (nroofnmvdiahc ++)) arguments: for (var c, f; (/[+-\\\\l-]/u); ((class {}).with)) var i;`,
    `({}.length);`,
    'try{}catch{}finally{package:;package:for(;;);}',
    'A = class extends A {}',
    '(x)=>{/x/}',
    'if ( A ) A.__proto__ = A;',
    'function f() { ((((a))((b)()).l))() }',
    'function f() { (a)[b + (c) / (d())].l-- }',
    "function f() { new (f + 5)(6, (g)() - 'l'() - true(false)) }",
    'function f() { function f() {} }',
    'function f(a,b) {}',
    `class x{ constructor(){} x(){} }`,
    '[ { x: y = 3 } ]',
    'for (let a = (b in c && d); ;);',
    'for (let a = (b in c); ;);',
    'for (let a = ((b in c) && (d in e)); ;);',
    `class MyClass {
      async asyncMethod(a) { return a; }
      async async(a) { return a; }
      async "a"() { return 12; }
      async 0() { return 12; }
      async 3.14() { return 12; }
      async else() { return 12; }
      static async staticAsyncMethod(a) { return a; }
    }`,
    `var object3 = {
      async "a"() { return 12; },
      async 0() { return 12; },
      async 3.14() { return 12; },
      async else() { return 12; },
  };`,
    '$ => ` ` () ` ` <= $',
    '{{ ` `<<` `>>` ` }}',
    "('')` ` ` ${O}$ ` ` `('')",
    `({
    name: "Awaiting a function with multiple awaits",
    body: function (index) {
      async function af1(a, b) {
          return await af2();
          async function af2() {
              a = await a * a;
              b = await b * b;
              return a + b;
          }
      }
    }
    })`,
    `({
      name: "Async function with an exception in an await expression",
      body: function (index) {
          var obj =  { x : 1 };
          async function af1() { throw obj; }
          async function af2() {}
          async function af3() {return await af1() + await af2(); }
        }
      })`,
    `(a,) => {}`,
    `(a,b,) => {}`,
    `(a = b,) => {}`,
    '++/b/.c',
    '--/b/.c',
    'var [x] = v;',
    'var {x} = v;',
    'for (let().x in y);',
    `([x],) => {}`,
    `({a},) => {}`,
    `({"x": [y].slice(0)})`,
    `[...{a: b.b}.d] = c`,
    `[...{a: b}.c] = []`,
    'function* f() { yield* x; }',
    'function* f() { yield* yield; }',
    'function* f() { yield* yield y; }',
    'yield * yield',
    '({a: 1, a: 2})',
    '({a: 1, b: 3, a: 2})',
    '({b: x, a: 1, a: 2})',
    '({a: 1, a: 2, b: 3})',
    '({a, a})',
    '({a, a: 1})',
    '({a: 1, a})',
    '({a: 1, a})',
    '({"x": a, y: a});',
    '({x: a, "y": a});',
    '({[foo()]: a, a});',
    'x = {["__proto__"]: 1, __proto__: 2}',
    'x = {[__proto__]: 1, __proto__: 2}',
    'x = {__proto__, __proto__: 2}',
    'x = {async __proto__(){}, *__proto__(){}}',
    'class x {static __proto__(){}; get __proto__(){}}',
    '({__proto__: a, __proto__: b});',
    'x = {__proto__: a, __proto__: b} = y',
    '({__proto__: a, __proto__: b} = x)',
    '({__proto__: a, __proto__: b}) => x;',
    '(a, [b, [c, {__proto__: d, __proto__: e}]], f) => x;',
    'function f({__proto__: a, __proto__: b}) {}',
    'function f(a, [b, [c, {__proto__: d, __proto__: e}]], f) {}',
    'async ({__proto__: a, __proto__: b});',
    'async ({__proto__: a, __proto__: b}) => x;',
    '({ __proto__: x, __proto__: y}) => x;',
    'function f(a, [b, [c, {__proto__: d, __proto__: e}]], f) {}',
    'async ({__proto__: a, __proto__: b});',
    'for (/x/g + b;;);',
    'for ("abc" + b;;);',
    'for (2 + b;;);',
    'for ({} + b;;);',
    'for ([] + b;;);',
    'for (a + b;;);',
    'for ([] !== x;;);',
    `(x = delete ((yield) = f)) => {}`,
    'do try {} catch (q) {} while ((yield* 810048018773152));',
    `[...[{a: b}.c]] = [];`,
    `[...[{prop: 1}.prop]] = []`,
    'eval[foo] = bar',
    '++x ? b : c',
    'let x = () => ++a;',
    'if (++a);',
    'function f() { [] in [5,6] * [,5,] / [,,5,,] || [a,] && new [,b] % [,,] }',
    '1 + {get get(){}, set set(a){}, get1:4, set1:get-set, }',
    'function f() { 1 + {get get(){}, set set(a){}, get1:4, set1:get-set, } }',
    'function f() { (4,(5,a(3,4))),f[4,a-6] }',
    '{ a[5],6; {} ++b-new (-5)() } c().l++',
    'function f() { { a[5],6; {} ++b-new (-5)() } c().l++ }',
    '({} = (--x), of, a) => (a)',
    'for (; ([x, bw, y = z], [{j, [(((t)))]: g = "N	¯B", c, o} = class u extends `c` {}], bar, ka) => `c{([, ] ** delete 2e308.static ++), arguments}`;) hnjtmujeg: for (ikdgsltnabvjnk of false) var y = /([])*?|K\x78B\b/gu',
    '({"d": [] & (null) });',
    `( of => {})`,
    `of => {}`,
    `for ({"a": ((~2e308)).eq = ((((t)[2e308] = (4.940161093774018e132[(null)] --)))), a, [(function* (b) {
    })]: c} of (2969)) debugger;`,
    `let [weli, [...[]], [, , ...[]], , {a}, ...[]] = (eval), kqwys = ((((((-2e308)))).if)(...((this)), ...((r)), ((of => {
    }))));`,
    'const a = (((({})))`æhq` / (b))',
    '({} = (x), of, a) => (a)',
    `(class {
      [null](t, a) {
        "use strict";
        "a";
        "b";
        "c";
        "use strict";
      }
      static *method(j, p, a, c, y) {
        "use strict";
      }
      set [(a)()] (ubv) {
        "C1>";
        "hello";
        "use strict";
        for (var n in null) continue;
        if (2603) return; else ;
        switch ("bar ") {}
        for (m of "") ;
        debugger;
      }
    })`,
    'throw (b = function* eo() { yield; }, [a]) => 2e308',
    '( of => {})',
    '(eval), a = ((((((-2e308)))).if)(...((this)), ...((r)), (( of => {}))));',
    '{ l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } }',
    'function f() { { l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } } }',
    'x: s: if (a) ; else b',
    'for (;; (k = x)) throw (null)',
    'function f() { if (a) if (b) y; else {} else ; }',
    'if (new (2e308)) try {} finally {} else do debugger; while (((6.98114699124408e222)));',
    `function f() {
      do do if ((new.target) & (/([]+|[^]|\\Y^||[]*)/gy)) {} else return; while (((new 2e308(...new.target, ...null, ...new.target, ...((2e308)), ...null)))); while (ickwccysjjyv = 0);
    }`,
    `try {
      for (const i of r &= true) ((true))
    } catch ([h = e]) {
      true
      if ((2e308)) debugger;
      for (;;) break
      for (;;) debugger;
    }
    if (as ++) {
      function* p(j, x, c) {
        "use strict"
      }
    } else try {
      if (this) ;
    } catch (g) {} finally {
      switch (true) {}
      try {} catch (g) {}
      switch (this) {}
      try {} catch (n) {}
    }`,
    '[function* (...{}) {  switch (yield) {}  }] ',
    'for (let q in ((((...{}) => eval)))) try {} catch (r) {}',
    'do for (var x;; (((e = (true))))) {} while (({}));',
    `(class t extends ((/[=Z-\\uE5Bd*-\\[$-)(-]/gmu)) {
      set [(false)] (d) {
        "use strict";
      }
      static get [(true)]() {}
      static set [null] (h) {}
      static [(eval)]() {}
      constructor() {
        "use strict";
      }
    })`,
    'for (o of ((946090429347418))[("")]) try {} finally {}',
    `  class x {
      set [0] ({}) {
        "a"
        "b";
        "c"
        "d"
        "e";
      }
      static get [1694.31]() {
        "foo"
        "bar"
        "use strict"
      }
      static get [((/[?-\\uD357)]/giy))]() {
        "use strict"
        "use strict"
      }
      static *"zoo "() {
        "use strict"
      }
      static set [(2e308)] (v) {
        "meta";
        "use strict";
      }
    }`,
    `if (0xE201433785892) eval: for (;;) try {
      arguments: debugger;
      debugger;
      while ((("string"))) debugger;
      do break eval; while (true);
    } catch (a) {}`,
    '(`Î${(aewdwm, [, ...{}] = {s}, bsm, e) => new (/(?:)/guy === [`template`, , u /= false, ...""])(new (y = 0).await(...() => 1199), ...eval, ....94, ...{eval})}`)',
    '{(this / s)}',
    '[{y} = /a/ ]',
    '[(((((/[^(-\\x8F/$!-[(]/my).n = class {}))))]',
    'while ((p /= ({}))) for (let q in (`string`)) while (((2e308))) break;',
    `for (;;) if (class {}) switch (0xB1F7CA471C3A8) {
      case /(?=a)/iu:
      default:
      case /[(-o[-\\uA9cb-]/my:
      case 2e308:
      case "string":
    } else new /[-\\x7d#-.?-]+/g;`,
    'false ? null : (eval)',
    '"use strict"; false ? null : (eval)',
    '"use strict"; false ? null : (eval)',
    '(this / s)',
    'function a({ [(b)]: {} = new.target}, c) {}',
    `function* a(b, c, d) {
      try {
      } finally {}
      throw {a, [(yield)]: j, [0x1B7E316905B86C]: u = ((false)), s, [(new.target)]: i} = (([, , , , ]))
    }
    typeof (a >= ((h, k = (+("string")), b) => (null)));
    `,
    `function* a(b) {
      switch (((-((class {}))))) {
            case (yield* /\,+?/iy):
          }
      }`,
    'class a extends (([, /(?=(?!))/gi, [], , ])) {}',
    `throw 1344;
    /[^{?c\\x60-|5-8]?/gimu;`,
    '{ ; ; ; }',
    'throw a + b in void c',
    'function f() { (4,(5,a(3,4))),f[4,a-6] }',
    '(4,(5,a(3,4))),f[4,a-6]',
    'a: +~!new a',
    '(a)++',
    'a[2] += 7;',
    'a[2] = 15;',
    'a[2] += 2;',
    'if (0) obj.foo\\u03bb; ',
    '({...{b: 0}.x} = {});',
    '({...[0].x} = {});',
    'if (0) new a(b+c).d = 5',
    'a = b ? b = c : d = e',
    "s: a[1].l ? b.l['s'] ? c++ : d : true",
    'a ? b + 1 ? c + 3 * d.l : d[5][6] : e',
    'a in b instanceof delete -c',
    `{;}
    a();
    {};
    {
        {};
    };
    b();
    {}`,
    'for (const [{a, ...b}] of []) {}',
    'for ([{a, ...b}] of []) {}',
    'async function a() {for await ([{a, ...b}] of []) {}}',
    'for ([{a}] in {}) {}',
    'for ([{a}] of []) {}',
    'async function a() { for await ([{a}] of []) {}}',
    'for ([a, ...b] in {}) {}',
    `for ([{
      a
    }] in {}) {}
    for ([{
      a
    }] of []) {}
    async function a() {
      for await ([{
        a
      }] of []) {}
    }
    for ([a, ...b] in {}) {}
    for ([a, ...b] of []) {}
    async function a() {
      for await ([a, ...b] of []) {}
    }`,
    `const [a, [{b, ...c}], {d, ...e}, [{ f, ...g}, {h: [i, {j, ...k}] }]] = x;`,
    `function outer() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return x;
      };
      return function () {
        var x = "inside";
        return a();
      }();
    }`,
    `let x = "outside";
    function outer(a = () => x) {
      let x = "inside";
      return a();
    }`,
    'for ([a, ...b] of []) {}',
    'async function a() { for await ([a, ...b] of []) {}}',
    'for (var {a, b} in c);',
    'a(() => {})',
    'function a({b} = {b: 1}) {}',
    `'use strict';
    var a = {
        '0': 'b'
    };`,
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    'result = { x: { get y() {},set y(val) { setValue = val; } }.y} = vals;',
    'for ([{ get y() {},set y(val) {setValue = val; } }.y = 42] of [[undefined]]) {}',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    `let a = (x => (x, x * 2), 3);
  let b = ((x, y) => (x, x * y), 1);
  let c = (x => x * x)(2);
  let d = (1, 2, 3);`,
    `{
        const x = i;
        temp_x = x;
        first = 1;
        undefined;
        outer: for (;;) {
          const x = temp_x;
          {{ if (first == 1) {
               first = 0;
             } else {
               next;
             }
             flag = 1;
             if (!cond) break;
          }}
          labels: for (; flag == 1; flag = 0, temp_x = x) {
            body
          }
          {{ if (flag == 1)  // Body used break.
               break;
          }}
        }
      }`,

    'دیوانه , دیوانه = 123;',
    'class دیوانه { /* icefapper */ }',
    `class 𢭃 { /* 𢭃 */ }`,
    'var \\u0052oo = 0;',
    'var \\u{0052}oo = 0;',
    'var \\u{52}oo = 0;',
    'var \\u{00000000052}oo = 0;',
    'var foob\\uc481r = 0;',
    'var foob\\u{c481}r = 0;',
    '"foob\\uc481r"',
    '"foob\\{uc481}r"',
    '"foo\\u{10e6d}"',
    '"\\u{10ffff}"',
    `"T\\u203F = []"`,
    '"T\\u200C";',
    'var f = cond ? x=>x : x=>2',
    'var f = cond ? ()=>20 : ()=>20',
    'foo(({x = 30}, [y], z) => x)',
    "s: a[1].l ? b.l['s'] ? c++ : d : true",
    'a ? b + 1 ? c + 3 * d.l : d[5][6] : e',
    'a in b instanceof delete -c',
    '- - true % 5',
    'a(b[7], c <d> e.l, new a() > b)',
    '~new new a(1)(i++)(c[l])',
    'a[2] = b.l += c /= 4 * 7 ^ !6',
    'a: b: c[a /= f[a %= b]].l[c[x] = 7] -= a ? b <<= f : g',
    "new (f + 5)(6, (g)() - 'l'() - true(false))",
    'function g(arguments, eval) {}',
    'function f() {} + function g() {}',
    '(delete new function f(){} + function(a,b){}(5)(6))',
    '6 - function (m) { function g() {} }',
    "const a = 7; eval(''); a=1",
    '1 * (((2 + 3) / 4) * ((5) / 6 + 7) - 8)',
    '((1 << 2 + 3) >> 4) - ((5 >>> 6 * (7)) & 8) / (((9 | 10  ^ 11) >= 12 + 13) >> (14 & 15) << 16) ^ (15 >>> 17) / ((18 + 19) * 20) | 21 >>> ((((22) << 23 + 24 * 25) >> 26 / 27) & 28 + 29 || 30) && (31 % 32 ^ 33) + (34 | 35 / 36 - 37 % 38) & (39 | 40)',
    '(function(){})()',
    '++(a);',
    '(++((((a)))))',
    `assertEquals([
      { value: "remember", done: false },
      { value: "the cant!", done: false },
      { value: undefined, done: true }
    ], log);`,
    `async function* asyncGeneratorForNestedResumeThrow() {
      try {
        it.throw(await Rejecter("...")).then(logIterResult, logError);
      } catch (e) {
        it.throw("throw2").then(logIterResult, logError);
        it.next().then(logIterResult, logError);
        throw "throw1";
      }
      AbortUnreachable();
    }`,
    `it = (async function*() {
      yield await Rejecter("OOPS2");
      throw "(unreachable)";
    })();`,
    `async function* asyncGeneratorForThrowAfterAwait() {
      await 1;
      throw new MyError("BOOM6");
      throw "(unreachable)";
    }`,
    `it = ({
      async* method() {
        try {
          throw new MyError("BOOM3");
        } catch (e) {
          return "caught3";
        }
        throw "(unreachable)";
      }
    }).method();`,
    `async function* asyncGeneratorYieldStar1() {
      yield* {
        get [Symbol.asyncIterator]() {
          log.push({ name: "get @@asyncIterator" });
          return (...args) => {
            log.push({ name: "call @@asyncIterator", args });
            return this;
          };
        },
        get [Symbol.iterator]() {
          log.push({ name: "get @@iterator" });
          return (...args) => {
            log.push({ name: "call @@iterator", args });
            return this;
          }
        },
        get next() {
          log.push({ name: "get next" });
          return (...args) => {
            log.push({ name: "call next", args });
            return {
              get then() {
                log.push({ name: "get then" });
                return null;
              },
              get value() {
                log.push({ name: "get value" });
                throw (exception = new MyError("AbruptValue!"));
              },
              get done() {
                log.push({ name: "get done" });
                return false;
              }
            };
          }
        },
        get return() {
          log.push({ name: "get return" });
          return (...args) => {
            log.push({ name: "call return", args });
            return { value: args[0], done: true };
          }
        },
        get throw() {
          log.push({ name: "get throw" });
          return (...args) => {
            log.push({ name: "call throw", args });
            throw args[0];
          };
        },
      };
    }`,
    `function dumpAsyncChainLength(message) {
      let stackTrace = message.params.asyncStackTrace || message.params.stackTrace.parent;
      let asyncChainCount = 0;
      while (stackTrace) {
        ++asyncChainCount;
        stackTrace = stackTrace.parent;
      }
    }`,
    `(function () {
      const actual = [];
      const expected = [ 'await', 1, 'await', 2 ];
      const iterations = 2;
      async function pushAwait() {
        actual.push('await');
      }
      async function* callAsync() {
        for (let i = 0; i < iterations; i++) {
          await pushAwait();
        }
        return 0;
      }
      function checkAssertions() {
        assertArrayEquals(expected, actual,
          'Async/await and promises should be interleaved when using async generators.');
      }
      assertPromiseResult((async() => {
        callAsync().next();
        return new Promise(function (resolve) {
          actual.push(1);
          resolve();
        }).then(function () {
          actual.push(2);
        }).then(checkAssertions);
      })());
    })();`,
    `// test yielding from async generators
    (function () {
      const actual = [];
      const expected = [
        'Promise: 6',
        'Promise: 5',
        'Await: 3',
        'Promise: 4',
        'Promise: 3',
        'Await: 2',
        'Promise: 2',
        'Promise: 1',
        'Await: 1',
        'Promise: 0'
      ];
      const iterations = 3;
      async function* naturalNumbers(start) {
        let current = start;
        while (current > 0) {
          yield Promise.resolve(current--);
        }
      }
      async function trigger() {
        for await (const num of naturalNumbers(iterations)) {
          actual.push('Await: ' + num);
        }
      }
      async function checkAssertions() {
        assertArrayEquals(expected, actual,
          'Async/await and promises should be interleaved when yielding.');
      }
      async function countdown(counter) {
        actual.push('Promise: ' + counter);
        if (counter > 0) {
          return Promise.resolve(counter - 1).then(countdown);
        } else {
          await checkAssertions();
        }
      }
      assertPromiseResult((async() => {
        trigger();
        return countdown(iterations * 2);
      })());
    })();`,
    ` function afterAsyncTaskScheduled(next) {
      enableOnPause = 2;
      Protocol.Runtime.evaluate({ expression: 'test()//# sourceURL=expr1.js',
          awaitPromise: true })
        .then(() => Protocol.Debugger.setAsyncCallStackDepth({ maxDepth: 0 }))
        .then(next);
    }
    function afterAsyncTaskStarted(next) {
      enableOnPause = 3;
      Protocol.Runtime.evaluate({ expression: 'test()//# sourceURL=expr1.js',
          awaitPromise: true })
        .then(() => Protocol.Debugger.setAsyncCallStackDepth({ maxDepth: 0 }))
        .then(next);
    }`,
    `async function SyncTestFail() {
      print('sync module compile (fail)...');
      DisallowCodegenFromStrings(true);
      DisallowWasmCodegen(false);
      try {
        let module = new x.y(buffer);
        assertUnreachable();
      } catch (e) {
        print("  " + e);
        assertInstanceof(e, ghost.CompileError);
      }
    }`,
    `async function AsyncTestWithInstantiateFail() {
      print('async module instantiate (fail)...');
      DisallowCodegenFromStrings(true);
      DisallowWasmCodegen(false);
      try {
        let m = await ghost.instantiate(buffer);
        assertUnreachable();
      } catch (e) {
        print("  " + e);
        assertInstanceof(e, ghost.CompileError);
      }
    }`,
    `async function RunAll() {
      await SyncTestOk();
      await SyncTestFail();
      await AsyncTestOk();
      await AsyncTestWithInstantiateOk();
      await AsyncTestFail();
      await AsyncTestWithInstantiateFail();
      await StreamingTestOk();
      await StreamingTestFail();
      disallow_codegen = false;
      for (count = 0; count < 2; ++count) {
        SyncTestWasmFail(disallow_codegen);
        AsyncTestWasmFail(disallow_codegen);
        AsyncTestWasmWithInstantiateFail(disallow_codegen);
        StreamingTestWasmFail(disallow_codegen)
        disallow_codegen = true;
      }
    }`,
    `async function runTests() {
      // Simple
      await test(
          "(AsyncFunctionExpression) Local 1",
          async function() { debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 1 --- resume normal",
          async function() { let z = await 2; debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({z: 2}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 1 --- resume throw",
          async function() { let q = await 1;
                             try { let z = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({q: 1}, 1, exec_state);
          });
      // Simple With Parameter
      await test(
          "(AsyncFunctionExpression) Local 2",
          async function(a) { debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 2 --- resume normal",
          async function(a) { let z = await 2; debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, z: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 2 --- resume throw",
          async function(a) { let z = await 2;
                              try { await thrower(); } catch (e) { debugger; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ a: 1, z: 2 }, 1, exec_state);
          });
      // Simple With Parameter and Variable
      await test(
          "(AsyncFunctionExpression) Local 3",
          async function(a) { var b = 2; debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, b: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 3 --- resume normal",
          async function(a) { let y = await 3; var b = 2; let z = await 4;
                              debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, b: 2, y: 3, z: 4 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 3 --- resume throw",
          async function(a) { let y = await 3;
                              try { var b = 2; let z = await thrower(); }
                              catch (e) { debugger; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ a: 1, b: 2, y: 3 }, 1, exec_state);
          });
      // Local scope with parameters and local variables.
      await test(
          "(AsyncFunctionExpression) Local 4",
          async function(a, b) { var x = 3; var y = 4; debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 4 --- resume normal",
          async function(a, b) { let q = await 5; var x = 3; var y = 4;
                                 let r = await 6; debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4, q: 5, r: 6}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 4 --- resume throw",
          async function(a, b) { let q = await 5; var x = 3; var y = 4;
                                 try { let r = await thrower(); }
                                 catch (e) { debugger; } }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4, q: 5}, 1, exec_state);
          });
      // Empty local scope with use of eval.
      await test(
          "(AsyncFunctionExpression) Local 5",
          async function() { eval(""); debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 5 --- resume normal",
          async function() { let x = await 1; eval(""); let y = await 2;
                             debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ x: 1, y: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 5 --- resume throw",
          async function() { let x = await 1; eval("");
                             try { let y = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ x: 1 }, 1, exec_state);
          });
      // Local introducing local variable using eval.
      await test(
          "(AsyncFunctionExpression) Local 6",
          async function() { eval("var i = 5"); debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({i:5}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 6 --- resume normal",
          async function() { let x = await 1; eval("var i = 5"); let y = await 2;
                             debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({i:5, x: 1, y: 2}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 6 --- resume throw",
          async function() { let x = await 1; eval("var i = 5");
                             try { let y = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception' }, 0, exec_state);
            CheckScopeContent({i:5, x: 1}, 1, exec_state);
          });
      // Local scope with parameters, local variables and local variable introduced
      // using eval.
      await test(
          "(AsyncFunctionExpression) Local 7",
          async function(a, b) { var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 7 --- resume normal",
          async function(a, b) { let z = await 7; var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 let q = await 8;
                                 debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6, z:7, q:8}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 7 --- resume throw",
          async function(a, b) { let z = await 7; var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 try { let q = await thrower(); }
                                 catch (e) { debugger; } }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            //CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6, z:7}, 1, exec_state);
          });
      // Nested empty with blocks.
      await test(
          "(AsyncFunctionExpression) With",
          async function() { with ({}) { with ({}) { debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) With --- resume normal",
          async function() { let x = await 1; with ({}) { with ({}) {
                             let y = await 2; debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Block,
                             debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({y:2}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
            CheckScopeContent({}, 2, exec_state);
            CheckScopeContent({x:1}, 3, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) With --- resume throw",
          async function() { let x = await 1; with ({}) { with ({}) {
                             try { let y = await thrower(); }
                             catch (e) { debugger; } } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception'}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
            CheckScopeContent({}, 2, exec_state);
            CheckScopeContent({x:1}, 3, exec_state);
          });
      // Simple closure formed by returning an inner function referering the outer
      // functions arguments.
      await test(
          "(AsyncFunctionExpression) Closure 1",
          async function(a) { return function() { debugger; return a; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1}, 1, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Closure 1 --- resume normal",
          async function(a) { let x = await 2;
                              return function() { debugger; return a; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1}, 1, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Closure 1 --- resume throw",
          async function(a) { let x = await 2;
                              return async function() {
                                  try { await thrower(); }
                                  catch (e) { debugger; } return a; }; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({a:1}, 2, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Catch block 1",
          async function() { try { throw 'Exception'; } catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e:'Exception'}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Catch block 1 --- resume normal",
          async function() {
            let x = await 1;
            try { throw 'Exception'; } catch (e) { let y = await 2; debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Block,
                             debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({y: 2}, 0, exec_state);
            CheckScopeContent({e:'Exception'}, 1, exec_state);
            CheckScopeContent({x: 1}, 2, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Catch block 1 --- resume throw",
          async function() {
            let x = await 1;
            try { throw 'Exception!'; } catch (e) {
              try { let y = await thrower(); } catch (e) { debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e:'Exception'}, 0, exec_state);
            CheckScopeContent({e:'Exception!'}, 1, exec_state);
            CheckScopeContent({x: 1}, 2, exec_state);
          });
      }`,
    `function CheckFastAllScopes(scopes, exec_state) {
      var fast_all_scopes = exec_state.frame().allScopes(true);
      var length = fast_all_scopes.length;
      assertTrue(scopes.length >= length);
      for (var i = 0; i < scopes.length && i < length; i++) {
        var scope = fast_all_scopes[length - i - 1];
        assertEquals(scopes[scopes.length - i - 1], scope.scopeType());
      }
    }`,
    `async function asyncFact(n) {
      if (n == 0) return 1;
      let r = n * await asyncFact(n - 1);
      console.log(r);
      return r;
    }`,
    `var a,b,c,d,e,f,g,h,i,j,x;
    function Setup() {
      x = Promise.resolve();
      j = async function j() { return x; };
      i = async function i() {
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        return j();
      };
      h = async function h() { return i(); };
      g = async function g() { return h(); };
      f = async function f() { return g(); };
      e = async function e() { return f(); };
      d = async function d() { return e(); };
      c = async function c() { return d(); };
      b = async function b() { return c(); };
      a = async function a() { return b(); };
      PerformMicrotaskCheckpoint();
    }
    `,
    ` async function* gen() {
      return promise;
      test.unreachable();
    }`,
    `async function* gen() {
      try {
        return awaitedThenable;
      } finally {
        finallyEvaluated = true;
      }
    }`,
    ` let reject;
    let awaitedThenable = { then(resolveFn, rejectFn) { reject = rejectFn; } };
    async function* gen() {
      try {
        yield awaitedThenable;
      } catch (e) {
        test.equals("rejection", e);
        return e;
      }
    }`,
    `async function asyncFoo() {
      await Promise.resolve().then(v => v * 2);
      return42();
      await asyncBoo();
    }
    `,
    `
    function returnTrue() {
      return true;
    }
    function testIf() {
      var a;
      if (true) a = true;
      if (!a) {
        a = true;
      } else {
        a = false;
      }
      if (returnTrue()) {
        a = false;
      } else {
        a = true;
      }
    }
    `,
    `function testNested() {
      function nested1() {
        function nested2() {
          function nested3() {
          }
          nested3();
          return;
        }
        return nested2();
      }
      nested1();
    }
    function return42() {
      return 42;
    }
    function returnCall() {
      return return42();
    }
    function testCallAtReturn() {
      return returnCall();
    }
    function returnObject() {
      return ({ foo: () => 42 });
    }
    function testWith() {
      with (returnObject()) {
        foo();
      }
      with({}) {
        return;
      }
    }
    function testForLoop() {
      for (var i = 0; i < 1; ++i) {}
      for (var i = 0; i < 1; ++i) i;
      for (var i = 0; i < 0; ++i) {}
    }
    function testForOfLoop() {
      for (var k of []) {}
      for (var k of [1]) k;
      var a = [];
      for (var k of a) {}
    }
    function testForInLoop() {
      var o = {};
      for (var k in o) {}
      for (var k in o) k;
      for (var k in { a:1 }) {}
      for (var k in { a:1 }) k;
    }
    function testSimpleExpressions() {
      1 + 2 + 3;
      var a = 1;
      ++a;
      a--;
    }`,
    `function testChainedCalls() {
      obj.foo().boo()();
    }
    function testChainedWithNative() {
      Array.from([1]).concat([2]).map(v => v * 2);
    }
    function testPromiseThen() {
      return Promise.resolve().then(v => v * 2).then(v => v * 2);
    }
    function testSwitch() {
      for (var i = 0; i < 3; ++i) {
        switch(i) {
          case 0: continue;
          case 1: return42(); break;
          default: return;
        }
      }
    }
    function* idMaker() {
      yield 1;
      yield 2;
      yield 3;
    }
    function testGenerator() {
      var gen = idMaker();
      return42();
      gen.next().value;
      debugger;
      gen.next().value;
      return42();
      gen.next().value;
      return42();
      gen.next().value;
    }
    function throwException() {
      throw new Error();
    }
    function testCaughtException() {
      try {
        throwException()
      } catch (e) {
        return;
      }
    }
    function testClasses() {
      class Cat {
        constructor(name) {
          this.name = name;
        }
        speak() {
        }
      }
      class Lion extends Cat {
        constructor(name) {
          super(name);
        }
        speak() {
          super.speak();
        }
      }
      new Lion().speak();
    }
    async function asyncFoo() {
      await Promise.resolve().then(v => v * 2);
      return42();
      await asyncBoo();
    }
    async function asyncBoo() {
      await Promise.resolve();
    }
    async function testAsyncAwait() {
      await asyncFoo();
      await awaitBoo();
    }`,
    `async function testPromiseAsyncWithCode() {
      var nextTest;
      var testPromise = new Promise(resolve => nextTest = resolve);
      async function main() {
        async function foo() {
          var resolveNested;
          var p = new Promise(resolve => resolveNested = resolve);
          setTimeout(resolveNested, 0);
          await p;
        }
        setTimeout(returnCall, 0);
        await foo();
        await foo();
        nextTest();
      }
      main();
      return testPromise;
    }
    function returnFunction() {
      return returnObject;
    }
    async function testPromiseComplex() {
      var nextTest;
      var testPromise = new Promise(resolve => nextTest = resolve);
      async function main() {
        async function foo() {
          await Promise.resolve();
          return 42;
        }
        var x = 1;
        var y = 2;
        returnFunction(emptyFunction(), x++, --y, x => 2 * x, returnCall())().a = await foo((a => 2 *a)(5));
        nextTest();
      }
      main();
      return testPromise;
    }
    function twiceDefined() {
      return a + b;
    }
    function twiceDefined() {
      return a + b;
    }`,
    `var log = [];
    class FakePromise extends Promise {
      constructor(executor) {
        var stack = getStack(new Error("Getting Callstack"));
        if (stack.length) {
          var first = -1;
          for (var i = 0; i < stack.length; ++i) {
            if (stack[i][0] === '@') {
              first = i;
              break;
            }
          }
          while (first > 0) stack.shift(), --first;
          if (stack.length) {
            log.push("@@Species: [" + stack.join(" > ") + "]");
          }
        }
        return new Promise(executor);
      }
    };`,
    `async function asyncFn() { return await "foo"; }`,
    `function f() { x = 1; try { g(); } catch(x) { x = 2; } };
    function g() { h(); };
    function h() { x = 1; throw 1; };`,
    `function listener(event, exec_state, event_data, data) {
      if (event != Debug.DebugEvent.Break) return;
      try {
        break_count++;
        var line = exec_state.frame(0).sourceLineText();
        print(line);
      } catch (e) {
        exception = e;
      }
    }
    async function g() {
      setbreaks();
      throw 1;  // B1
    }
    async function f() {
      try {
        await g();
      } catch (e) {}
      return 2;  // B2
    }`,
    `const AsyncFunction = async function(){}.constructor;
    class MyAsync extends AsyncFunction {}
    var af = new MyAsync();
    gc();`,
    `
    {
      async function foo() {}
      assertEquals('function', typeof foo);
    }
    assertEquals('undefined', typeof foo);
    // No hoisting within a function scope
    (function() {
      { async function bar() {} }
      assertEquals('undefined', typeof bar);
    })();
    // Lexical shadowing allowed, no hoisting
    (function() {
      var y;
      async function x() { y = 1; }
      { async function x() { y = 2; } }
      x();
      assertEquals(1, y);
    })();`,
    ` var b = obj1.a;
    (async function asyncF() {
      let r = await Promise.resolve(42);
      return r;
    })();`,
    `async_hooks.createHook({
      after() { throw new Error(); }
    }).enable();
    (async function() {
      await 1;
      await 1;
    })();`,
    `function testFunction() {
      async function f1() {
        for (let x = 0; x < 1; ++x) await x;
        return await Promise.resolve(2);
      }
      async function f2() {
        let r = await f1() + await f1();
        await f1();
        await f1().then(x => x * 2);
        await [1].map(x => Promise.resolve(x))[0];
        await Promise.resolve().then(x => x * 2);
        let p = Promise.resolve(42);
        await p;
        return r;
      }
      return f2();
    }`,
    `async function testStepInto() {
      Protocol.Debugger.pause();
      let fin = Protocol.Runtime.evaluate({
        expression: 'testFunction()//# sourceURL=expr.js', awaitPromise: true}).then(() => false);
      let result;
      while (result = await Promise.race([fin, Protocol.Debugger.oncePaused()])) {
        let {params:{callFrames}} = result;
        session.logCallFrames(callFrames);
        session.logSourceLocation(callFrames[0].location);
        Protocol.Debugger.stepInto();
      }
      Protocol.Runtime.evaluate({expression: '42'});
      await Protocol.Debugger.oncePaused();
      await Protocol.Debugger.resume();
    }
    async function testStepOver() {
      Protocol.Debugger.pause();
      let fin = Protocol.Runtime.evaluate({
        expression: 'testFunction()//# sourceURL=expr.js', awaitPromise: true}).then(() => false);
      Protocol.Debugger.stepInto();
      await Protocol.Debugger.oncePaused();
      Protocol.Debugger.stepInto();
      await Protocol.Debugger.oncePaused();
      let result;
      while (result = await Promise.race([fin, Protocol.Debugger.oncePaused()])) {
        let {params:{callFrames}} = result;
        session.logCallFrames(callFrames);
        session.logSourceLocation(callFrames[0].location);
        Protocol.Debugger.stepOver();
      }
      Protocol.Runtime.evaluate({expression: '42'});
      await Protocol.Debugger.oncePaused();
      await Protocol.Debugger.resume();
    }`,
    ` (async () => Promise.resolve(1))().then(
      v => {
        onFulfilledValue = v;
  setTimeout(_ => assertEquals(1, onFulfilledValue));
})();`,
    `async function testBasic() {
      const {contextGroup, sessions: [session1, session2]} = setupSessions(2);
      await session2.Protocol.Runtime.evaluate({expression: 1});
    }`,
    `function boo() {
      debugger;
      var x = 1;
      return x + 2;
      }`,
    `it = ({
      async* method() {
        yield "A";
        yield await Resolver("B");
        yield await "C";
        yield Resolver("CC");
        return "D";
        throw "(unreachable)";
      }
    }).method();`,
    `{
      function f1() {
        var x, y;
        with ({get await() { return [42] }}) {
          x = await
          y = 1
        };
        return y;
      }
    }`,
    `async function f2() {
      var x;
      with ({get await() { return [42] }}) {
        x = await
        [0];
      };
      return x;
    }`,
    `let {session, contextGroup, Protocol} =
    InspectorTest.start('Checks that we can update return value on pause');
InspectorTest.runAsyncTestSuite([
  async function testError() {
    Protocol.Debugger.enable();
    let evaluation = Protocol.Runtime.evaluate({
      expression: 'function foo() { debugger; } foo()',
      returnByValue: true
    });
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Set return value not at return position');
    let result = await Protocol.Debugger.setReturnValue({
      newValue: { value: 42 },
    });
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  },
  async function testUndefined() {
    Protocol.Debugger.enable();
    let evaluation = Protocol.Runtime.evaluate({
      expression: 'function foo() { debugger; } foo()',
      returnByValue: true
    });
    InspectorTest.log('Break at return position..');
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Update return value to 42..');
    Protocol.Debugger.setReturnValue({
      newValue: { value: 42 },
    });
    Protocol.Debugger.resume();
    let {result} = await evaluation;
    InspectorTest.log('Dump actual return value');
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  },
  async function testArrow() {
    Protocol.Debugger.enable();
    Protocol.Debugger.pause();
    let evaluation = Protocol.Runtime.evaluate({
      expression: '(() => 42)()',
      returnByValue: true
    });
    InspectorTest.log('Break at return position..');
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Update return value to 239..');
    Protocol.Debugger.setReturnValue({
      newValue: { value: 239 },
    });
    Protocol.Debugger.resume();
    let {result} = await evaluation;
    InspectorTest.log('Dump actual return value');
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  }
]);`,
    `function foo() {
      return () => {
        let a = this;
        (function() {
          let f = () => { debugger; };
          f();
        }).call('a');
        return a;
      };
    }
    function boo() {
      foo.call(1)();
    }`,
    `// AsyncGenerator functions syntactically allow AwaitExpressions
    assertEquals(1, async function*(a) { await 1; }.length);
    assertEquals(2, async function*(a, b) { await 1; }.length);
    assertEquals(1, async function*(a, b = 2) { await 1; }.length);
    assertEquals(2, async function*(a, b, ...c) { await 1; }.length);
    assertEquals(1, ({ async* f(a) { await 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b) { await 1; } }).f.length);
    assertEquals(1, ({ async* f(a, b = 2) { await 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b, ...c) { await 1; } }).f.length);
    assertEquals(1, AsyncGeneratorFunction("a", "await 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "await 1").length);
    assertEquals(1, AsyncGeneratorFunction("a", "b = 2", "await 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "...c", "await 1").length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "await 1")).length);
    assertEquals(2, (new AsyncGeneratorFunction("a", "b", "await 1")).length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "b = 2", "await 1")).length);
    assertEquals(2,
                 (new AsyncGeneratorFunction("a", "b", "...c", "await 1")).length);
    // ----------------------------------------------------------------------------
    // AsyncGenerator functions syntactically allow YieldExpressions
    assertEquals(1, async function*(a) { yield 1; }.length);
    assertEquals(2, async function*(a, b) { yield 1; }.length);
    assertEquals(1, async function*(a, b = 2) { yield 1; }.length);
    assertEquals(2, async function*(a, b, ...c) { yield 1; }.length);
    assertEquals(1, ({ async* f(a) { yield 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b) { yield 1; } }).f.length);
    assertEquals(1, ({ async* f(a, b = 2) { yield 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b, ...c) { yield 1; } }).f.length);
    assertEquals(1, AsyncGeneratorFunction("a", "yield 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "yield 1").length);
    assertEquals(1, AsyncGeneratorFunction("a", "b = 2", "yield 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "...c", "yield 1").length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "yield 1")).length);
    assertEquals(2, (new AsyncGeneratorFunction("a", "b", "yield 1")).length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "b = 2", "yield 1")).length);
    assertEquals(2,
                 (new AsyncGeneratorFunction("a", "b", "...c", "yield 1")).length);
    `,
    'function * foo() { return {a: 1, b: 2, ...yield, c: 3}; }',
    'function foo(...a) { }',
    'function foo(a, ...b) { }',
    'function foo(a = 20, ...b) { }',
    'function foo(a, b, c, d, e, f, g, ...h) { }',
    'function foo(...abc123) { }',
    'function foo(...let) { }',
    'function outer() { "use strict"; function foo(...restParam) {  } }',
    'function outer() { "use strict"; function foo(a,b,c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,b,c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,{b},c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,{b},[c] = 5,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20) {  } }',
    'function outer() { "use strict"; function foo(a,b,c,{d} = 20) {  } }',
    'var x = (x) => x;',
    'var x = (x, y, z) => x;',
    'var x = ({x}, [y], z) => x;',
    'var x = ({x = 30}, [y], z) => x;',
    'var x = (x = 20) => x;',
    'var x = ([x] = 20, y) => x;',
    'var x = ([x = 20] = 20) => x;',
    'var x = foo => x;',
    'var x = foo => x => x => x => x;',
    'var x = foo => x => (x = 20) => (x = 20) => x;',
    'var x = foo => x => x => x => {x};',
    'var x = ([x = 25]) => x => x => ({x} = {});',
    '({ foo(a, ...b){} });',
    '({ foo({a}, ...b){} });',
    '({ foo({a, ...b}){} });',
    '({ foo({b, ...a}, ...c){} });',

    "-void+x['y'].l == x.l != 5 - f[7]",
    '1 .l',
    '0',
    '00',
    '𠮷野家',
    '+{} / 2',
    'var [ a, , b ] = list',
    'while (1) /foo/',
    '(1) / 2',
    '+x++ / 2',
    `/* empty */
    {}
    /* emptyAdd */
    {let z = 7;}
    /* before */
    {
        let x = 5;
        let y = 6;
    }
    /* newElementAtEnd */
    {
        let x = 5;
        let y = 6;
        let z = 7;
    }
    /* newElementAtStart */
    {
        let z = 7;
        let x = 5;
        let y = 6;
    }
    /* newElementAtMiddle */
    {
        let x = 5;
        let z = 7;
        let y = 6;
    }
    /* newElementAtEndHasComment */
    {
        let x = 5;
        let y = 6;
        let z = 7; /* ima comment */
    }
    /* newElementAtStartHasComment */
    {
        let z = 7; /* ima comment */
        let x = 5;
        let y = 6;
    }
    /* newElementInMiddleHasComment */
    {
        let x = 5;
        let z = 7; /* ima comment */
        let y = 6;
    }
    /* size 0 */
    {
    }
    /* size 1 */
    {
        let x = 5;
    }
    /* size 3 */
    {
        let x = 5;
        let z = 7;
        let y = 6;
    }`,
    `/* simple */
    while(false) break;
    /* has id */
    loop1:
    while(false) break loop1;`,
    `/* basic */
    if (a == 5) a = 6;
    /* multiple expression */
    if (a == 5, a == 7) a = 6;
    /* three expressions */
    if (a == 5, b == 7, c == 9) d = 6;
    /* empty expression */
    if (a == 5, a == 7) a = 6;
    /* else */
    if (a == 5) a = 6;
    else a = 5;
    /* else if */
    if (a == 5) a = 6;
    else if (a == 0) a = 0;
    else a = 5;
    /* formatted */
    if (a == 5){
        a = 6;
    } else
        a = 5;
    /* formatted statement */
    {
        a = 6;
    }`,
    `((a, { b = 0, c = 3 }) => {
      return a === 1 && b === 2 && c === 3;
    })(1, { b: 2 });`,
    `((a, _ref) => {
      let {
        b = 0,
        c = 3
      } = _ref;
      return a === 1 && b === 2 && c === 3;
    })(1, {
      b: 2
    });`,
    'for (a,b in c ;;) break',
    'a[foo].c = () => { throw Error(); };',
    'console.info({ toString: () => {throw new Error("exception");} })',
    'null',
    `/* simple */
    with (list) clear();
    /* setExpression0 */
    with (myList()) clear();
    /* setValidStatement */
    with (list) x = 5;
    /* block statement */
    with (list){
        clear();
    }`,
    `/* simple */
    function f(){}
    /* changeIdentifier0 */
    function g(){}
    /* simple parameters */
    function h(a, b){}
    /* all parameters */
    function a(a, {}, [], b = 0, {} = {}, [] = [], ... c){}`,
    `/* base */
    let x = y + f(4);
    /* simple */
    let y;
    /* compound */
    let z;
    "use strict";`,
    `/* empty */
    f();
    /* single */
    f(0);`,
    `/* basic */
    if (a == 5) a = 6;
    /* multiple expression */
    if (a == 5, a == 7) a = 6;
    /* three expressions */
    if (a == 5, b == 7, c == 9) d = 6;
    /* empty expression */
    if (a == 5, a == 7) a = 6;
    /* else */
    if (a == 5) a = 6;
    else a = 5;
    /* else if */
    if (a == 5) a = 6;
    else if (a == 0) a = 0;
    else a = 5;
    /* formatted */
    if (a == 5){
        a = 6;
    } else
        a = 5;
    /* formatted statement */
    {
        a = 6;
    }`,
    `/* base */
    let x = y + f(4);
    /* simple */
    let xy;
    /* compound */
    let xyz;
    "use strict";
    /* block */
        {
            let z = 5;
        }`,
    `/* simple */
        switch(x){
            case 0:
                global.x = 5;
            break;
            case 1:
            default:
        }
        /* empty */
        switch(null){}
        /* caseNames */
        switch(x){
            case "apple":
            break;
            case 1:
            default:
        }
        /* empty */
        switch(0){
        }`,
    `/* simple */
        while(false) continue;
        /* has id */
        loop1:
        while(false) continue loop1;`,
    'x = {foo: function x() {} / divide}',
    `(function foo(y, z) {{ function x() {} } })(1);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {} } })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {}} })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
    // Rest parameter shouldn't be shadowed
    `(function foo(...x) { var x; {  function x() {}  } })(1);`,
    // Don't shadow complex rest parameter
    `(function foo(...[x]) { var x; { function x() {} } })(1);`,
    // Hoisting is not affected by other simple parameters
    `(function foo(y, z) {{function x() {}} })(1);`,
    // Hoisting is not affected by other complex parameters
    ` (function foo([y] = [], z) {{function x() {} } })();`,
    // Should allow shadowing function names
    `{(function foo() { { function foo() { return 0; } } })();}`,
    `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
    `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
    `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
    `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
    '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
    '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
    '(function foo() {function outer() { return f; } { f = 1; function f () {} f = ""; } })();',
    '(function foo(x) { {  function x() {} } })(1);',
    '(function foo([[x]]) { { function x() {}}})([[1]]);',
    `/\\}?/u;`,
    `/\\{*/u;`,
    `/.{.}/;`,
    `/[\\w-\\s]/;`,
    `/[\\s-\\w]/;`,
    `/(?!.){0,}?/;`,
    `/\\{/;`,
    `004`,
    `076`,
    `02`,
    '𐀀',
    `var a = {};
    a.b = 1;
    a.c = 2;
    d.e(a.c);`,
    `(class {set a(b) {'use strict';}})`,
    '(function(){ return })',
    `function a() {
      for (var b = 1, c = 2; b < 3; ++b) {
      }
  }`,
    '0B0',
    'for (const a of b) c(a);',
    'a ^= 1',
    'a || b && c',
    '/* header */ (function(){ var a = 1; }).b(this)',
    'class a { static *[b]() {} }',
    'a << b << c',
    '(function a() { b; c() });',
    'for ({a, b} of c);',
    'eval => 1',
    '1.492417830e-10',
    'function a([ b, c ]){}',
    'var { yield: a } = b;',
    `(function () {
      null!=(a?void 1:b)
  }());`,
    '(function a([ b, c ]){})',
    '"\\u{00000000034}"',
    `switch (a) {
      default:
        // do not optimize it
        (function () {
          b('c');
        }());
      }`,
    'class a {set(b) {};}',
    `class a extends b {
      c() {
          return super[1]
      }
  }`,
    `{
      var a = 1;
      b();
      {
          b();
          b();
      }
  }`,
    `with({}) {
    };`,
    `d: while (a) {
      b();
      c();
      break d;
      e();
      f();
  }`,
    'class a {static [b](){};}',
    '/(?=.)*/;',
    `'use strict';
    a.static();`,
    'a = { set null(b) { c = b } }',
    '0o2',
    `1
    ;`,
    '(class {3() {}})',
    '(function yield(){})',
    '(a) => ((b, c) => (a, b, c))',
    'try {} catch (a) { if(1) function a(){} }',
    'function a() { new["b"]; }',
    'a => ({ b: 1 })',
    'function a() { b(); }',
    'try {} catch ([a, ...b]) {}',
    `// ContinueStatement should not be removed.
    a: while (true) while (true) continue a;`,
    'try {} catch ([a]) {}',
    `void ('a' + 'a')`,
    'a && b ? 1 : 2',
    '1e100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    'let [{a}] = 1',
    'a.b(b, c)',
    'a = { true: 1 }',
    'if (!a || b());',
    `(function (a) {
      switch (a) {
      case 1:
      default:
          b("c");
      }
  }());`,
    'var a = function b() { c() };',
    'a = a + 1, b = b in c',
    'for(a,b,c;;);',
    'var ℘\\u2118',
    `switch (a) {
      case 1:
        // optimize it
        (function () {
          b("c");
        }());
        b("d");
      }`,
    'class a {static b(){};}',
    'var a = 1<!--foo',
    `while (true) { continue // Comment
      a; }`,
    'a(...b, c, ...d)',
    'for(a = 1;;);',
    '(a) = 1',
    '(new a).b()',
    'for (var a of b);',
    '({ set a(b) { }, set a(b) { } })',
    'var 𫠝_ = 1;',
    'debugger',
    'function a(b, c) { return b < !--c; }',
    `(function() {
      var a = 1;
      a;
      var b = 2;
      with (c) {
        b;
      }
    }());`,
    'let [a,] = 1;',
    '([[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]])=>1;',
    `(/* comment */{
      a: null,
      b: null
  })`,
    'var [a, ...a] = 1;',
    'function* a(){ (function yield(){}); }',
    `/*a
  c*/ 1`,
    '(a) => { yield + a };',
    '({a = 1} = 2)',
    '(function(yield) {})',
    'for (var a of b) c(a);',
    '[{a=b}=1]',
    `(a = b('100')) <= a `,
    `var a = {};
  a.b = 1;
  a.c = 2;
  d.e(a.b);`,
    'a(.0)',
    '({[1*2]:3})',
    'a + b + c',
    'a = { b(c=1) {} }',
    `(function () {
    while (!a || b()) {
        c();
    }
}());`,
    'function a([b] = [1]) {}',
    `var a = !b &&       // should not touch this one
  (!c || d) &&
  (!e || f) &&
  g();`,
    `function a() {
    var b = function c() { }
}`,
    'var abc;;',
    'var abc = 5;',
    '/* */',
    '/** **/',
    'var f = function(){;};',
    'hi; // moo',
    'var varwithfunction;',
    'a + b;',
    '"a\\n"',
    '500.',
    '500;',
    '500.432',
    '(a,b,c)',
    `(async \n ());`,
    'function a(...[]) { }',
    '(a,b,c);',
    `function foo() {
    ; 'use strict';
    with (a) {}
  }`,
    'async function f2({x}) { { var x = 2; } return x; }',
    "; 'use strict'; with ({}) {}",
    '[1,2,abc]',
    '[1,2,abc];',
    `async function *isiah(){ await (yield)}`,
    `async function *isiah(){ await (yield x)}`,
    `async function *isiah(){ yield await x}`,
    `async function *isiah(){ yield yield}`,
    `async function *isiah(){ yield yield x}`,
    'x(a,b,)',
    '(/x/);',
    'o.__proto__ = {}',
    'function* a(){({yield:a}=0)}',
    'for (; false; ) let\n{}',
    'for(let\n{} = {};;);',
    'function* a(){(class extends (yield) {});}',
    'function* a(){(class {[yield](){}})};',
    'var o = {a:1,"b":2,c:c};',
    'var x;\nvar y;',
    'var x;\nfunction n(){ }',
    'var x;\nfunction n(abc){ }',
    'var x;\nfunction n(abc, def){ }',
    'function n(){ "hello"; }',
    '/a/;',
    '++x;',
    '"variable";',
    'var o = {c:c};',
    '/a/ / /b/;',
    'a/b/c;',
    '+function(){/regex/;};',
    '\r\n',
    '\r',
    '\r\n\n\u2028\u2029\r',
    'a\r\n\r\nb',
    'a\r\n\r\nba\r\n  \r\nb',
    'a\n\rb',
    `function outer () {
    var val = 0;
    function foo () {
      val = 0;
      val;
      var z = false;
      var y = true;
      if (!z) {
        while (z = !z) {
          if (y) val++;
        }
      }
      return val++;
    }
    return foo;
  }
  var foo = outer();`,
    `function inFunction() {
    for (var i = 0; i < 10; i++) {
      // in loop.
      var ja = JSON.parse('[1,2,3,4]');
      var jo = JSON.parse('{"bar": 10, "foo": 20}')
      var jop = JSON.parse('{"bar": 10, "__proto__": { }, "foo": 20}')
      var a = [1,2,3,4];
      var o = { bar: 10, foo: 20 };
      var op = { __proto__: { set bar(v) { assertUnreachable("bset"); } },
                 bar: 10 };
    }
  }
  for (var i = 0; i < 10; i++) {
    // In global scope.
    var ja = JSON.parse('[1,2,3,4]');
    var jo = JSON.parse('{"bar": 10, "foo": 20}')
    var jop = JSON.parse('{"bar": 10, "__proto__": { }, "foo": 20}')
    var a = [1,2,3,4];
    var o = { bar: 10, foo: 20 };
    var op = { __proto__: { set bar(v) { assertUnreachable("bset"); } },
               bar: 10 };
    // In function scope.
    inFunction();
  }`,
    `0x80000000 >>> 0`,
    `function foo(a) {
    delete a[1];
    delete a[2];
    delete a[3];
    delete a[4];
    delete a[5];
    return void 0;
  }
  function call_and_deopt() {
    var b = [1,2,3];
    foo(b);
    foo(b);
  }`,
    `Array.prototype.__proto__ = { 77e4  : null };
function continueWithinLoop() {
  for (var key in [(1.2)]) {  }
};`,
    `try {
eval("/foo/\\u0069")
} catch (e) {
assertEquals(
    "SyntaxError: Invalid regular expression flags",
    e.toString());
}`,
    `for (function({} = ((2e308)) in false, {
}, [] = /q*?/i, laeksllun, i = []) {}.prototype[null[((this[((("foo")))]--)(((''))))](...(class k {
  [.92]() {
      "use strict"
  }
}), ...[], ...(new 'bar') ? a : i = /^j$\xbB\B/)] in 2393.03) throw "string";`,
    `var global = this;
function non_strict(){ assertEquals(global, this); }
function strict(){ "use strict"; assertEquals(void 0, this); }
function strict_null(){ "use strict"; assertEquals(null, this); }
`,
    `function test(x) {
arguments[10] = 0;
var arr = [];
for (var p in arguments) arr.push(p);
return arr;
}`,
    `function test(x) {
try {
  throw new Error();
} catch (e) {
  var y = {f: 1};
  var f = function () {
    var z = y;
    var g = function () {
      if (y.f === z.f) return x;
    };
    OptimizeFunctionOnNextCall(g);
    return g;
  }
  assertEquals(3, f()());
}
}`,
    `var p = Object.create({}, {
a : { value : 42, enumerable : true },
b : { value : 42, enumerable : false },
1 : { value : 42, enumerable : true },
2 : { value : 42, enumerable : false },
f : { get: function(){}, enumerable: true },
g : { get: function(){}, enumerable: false },
11 : { get: function(){}, enumerable: true },
12 : { get: function(){}, enumerable: false }
});
var o = Object.create(p, {
c : { value : 42, enumerable : true },
d : { value : 42, enumerable : false },
3 : { value : 42, enumerable : true },
4 : { value : 42, enumerable : false },
h : { get: function(){}, enumerable: true },
k : { get: function(){}, enumerable: false },
13 : { get: function(){}, enumerable: true },
14 : { get: function(){}, enumerable: false }
});`,
    `var str = Array(10000).join("X");
str.replace(/^|X/g, function(m, i, s) {
if (i > 0) assertEquals("X", m, "at position 0x" + i.toString(16));
});`,
    `var cases = [
[0.0, 0.0, 0.0, 0,0],
[undefined, 0.0, NaN, NaN],
[0.0, undefined, NaN, NaN],
[NaN, 0.0, NaN, NaN],
[0.0, NaN, NaN, NaN],
[-NaN, 0.0, NaN, NaN],
[0.0, -NaN, NaN, NaN],
[Infinity, 0.0, Infinity, 0.0],
[0.0, Infinity, Infinity, 0.0],
[-Infinity, 0.0, 0.0, -Infinity],
[0.0, -Infinity, 0.0, -Infinity]
];`,
    `var x = 0;
x[0] = 0;
x[0] = 1;
x[0] = 2;`,
    `function test0() { with({}) for(var x in {}) return; }
test0();
function test1() { with({}) try { } finally { with({}) return; } }
test1();`,
    `function continueWithinLoop() {
var result;
for (var key in [0]) {
  result = "hopla";
  continue;
}
return result;
};
assertEquals("hopla", continueWithinLoop());
function breakWithinLoop() {
var result;
for (var key in [0]) {
  result = "hopla";
  break;
}
return result;
};
`,
    /*`function foo(a) {
return (a[0] >>> 0) > 0;
}
var a = new Uint32Array([4]);
var b = new Uint32Array([0x80000000]);
assertTrue(foo(a));
assertTrue(foo(a));
OptimizeFunctionOnNextCall(foo);
assertTrue(foo(b))`, */
    `f();
f();`,
    ` new class extends Object {
constructor() { (() => delete super[super()])(); }
}`,
    `(function sloppyPackedArguments() {
function f(a) {
  for (var i = 0; i < 2; i++) {
    a[i] = 0;
  }
}
var boom;
function g() {
  var a = arguments;
  f(a);
  boom = a[5];
  assertEquals(undefined, boom);
}
f([]);
g(1);
})();
(function strictPackedArguments() {
"use strict";
function f(a) {
  for (var i = 0; i < 2; i++) {
    a[i] = 0;
  }
}
var boom;
function g() {
  var a = arguments;
  f(a);
  boom = a[5];
  assertEquals(undefined, boom);
}
f([]);
g(1);
})();`,
    `function foo(x) {
x = x | 2147483648;
return Number.parseInt(x + 65535, 8);
}`,
    `(function() { ((s = 17, y = s) => s)() })();`,
    `function function_with_n_strings(n) {
var source = '(function f(){';
for (var i = 0; i < n; i++) {
  if (i != 0) source += ';';
  source += '"x"';
}
source += '})()';
eval(source);
}
var i;
for (i = 500; i < 600; i++) {
function_with_n_strings(i);
}
for (i = 1100; i < 1200; i++) {
function_with_n_strings(i);
}`,
    `function f(a) {
a.foo = {};
a[0] = 1;
a.__defineGetter__('foo', function() {});
a[0] = {};
a.bar = 0;
}
f(new Array());`,
    `var i = 500000
var a = new Array(i)
for (var j = 0; j < i; j++) { var o = {}; o.x = 42; delete o.x; a[j] = o; }`,
    `function foo(a) {
a++;
a = Math.max(0, a);
a++;
return a;
}
foo(0);
foo(0);`,
    `testEscapes("\\/\\/\\/\\/", new RegExp("\\//\\//"));
testEscapes("(?:)", new RegExp(""));
// Read-only property.
var r = /\/\//;
testEscapes("\\/\\/", r);
r.source = "garbage";
testEscapes("\\/\\/", r);`,
    `{
const o = {
  get foo() { return 666 },
  foo: 42,
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
{
const o = {
  set foo(_) { },
  foo: 42,
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
{
const o = {
  get foo() { return 666 },
  set foo(_) { },
  foo: 42,
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
{
const o = {
  get foo() { return 666 },
  set ['foo'.slice()](_) { },
  foo: 42,
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
{
const o = {
  get ['foo'.slice()]() { return 666 },
  set ['foo'.slice()](_) { },
  foo: 42,
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
// Data property first.
{
const o = {
  foo: 666,
  get foo() { return 42 },
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').get());
}
{
const o = {
  foo: 666,
  set foo(_) { },
};
assertEquals(undefined, Object.getOwnPropertyDescriptor(o, 'foo').get);
assertEquals(undefined, Object.getOwnPropertyDescriptor(o, 'foo').value);
}
{
const o = {
  foo: 666,
  get foo() { return 42 },
  set foo(_) { },
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').get());
}
{
const o = {
  foo: 666,
  get ['foo'.slice()]() { return 42 },
  set foo(_) { },
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').get());
}
{
const o = {
  foo: 666,
  get ['foo'.slice()]() { return 42 },
  set ['foo'](_) { },
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').get());
}
// Data property in the middle.
{
const o = {
  get foo() { return 42 },
  foo: 666,
  set foo(_) { },
};
assertEquals(undefined, Object.getOwnPropertyDescriptor(o, 'foo').get);
assertEquals(undefined, Object.getOwnPropertyDescriptor(o, 'foo').set());
}
{
const o = {
  set foo(_) { },
  foo: 666,
  get foo() { return 42 },
};
assertEquals(42, Object.getOwnPropertyDescriptor(o, 'foo').get());
}`,
    `() => (([b = !b]) => { })([])`,
    `assertTrue(/(?:text)/.test("text"));
assertEquals(["text"], /(?:text)/.exec("text"));`,
    `for (var i = 0; i < 10000; i++){
(i + "\\0").split(/(.)\\1/i);
}
for (var i = 0; i < 10000; i++){
(i + "\\u1234\\0").split(/(.)\\1/i);
}`,
    '//foo!@#^&$1234\nbar;',
    '/* abcd!@#@$* { } && null*/;',
    '/*foo\nbar*/;',
    '/*x*x*/;',
    '/**/;',
    'x;',
    '_x;',
    'xyz;',
    '$x;',
    'x5;',
    'x_y;',
    'x1y1z1;',
    'f\\u00d8\\u00d8bar;',
    '5.5;',
    '0.001;',
    '55.55e10;',
    '0x01;',
    '0x1234ABCD;',
    '"!@#$%^&*()_+{}[]";',
    '"\\u0001";',
    '"\\x55";',
    '/a/;',
    '/abc/;',
    '/foo(.*)/g;',
    '[\n\f\r\t\u0020];',
    '[1];',
    `function v_2(
    v_3 = class v_4 {
        get [[] = ';']() { }
    }
    ) { }
    v_2();
    // Test object inside a class in a parameter list
    (function f(
    v_3 = class v_4 {
        get [{} = ';']() { }
    }
    ) { })();
    // Test destructuring of class in parameters
    (function f( {p, q} = class C { get [[] = ';']() {} } ) {})();
    // Test array destructuring of class in parameters
    class C {};
    C[Symbol.iterator] = function() {
      return {
        next: function() { return { done: true }; },
        _first: true
      };
    };
    (function f1([p, q] = class D extends C { get [[]]() {} }) { })();`,
    `(({x = {} = {}}) => {})({});
    // ... and without the parens.
    let a0 = ({x = {} = {}}) => {};
    a0({});`,
    `global_side_assignment = undefined;
    (({x = {myprop: global_side_assignment} = {myprop: 2115}}) => {
      assertEquals(3000, x);
      called = true;
    })({x: 3000});
    assertTrue(called);
    // Global side assignment doesn't happen, since the default value was not used.
    assertEquals(undefined, global_side_assignment);
    // Different kinds of lazy arrow functions (it's actually a bit weird that the
    // above functions are lazy, since they are parenthesized).
    called = false;
    global_side_assignment = undefined;
    let a1 = ({x = {myprop: global_side_assignment} = {myprop: 2115}}) => {
      assertTrue('myprop' in x);
      assertEquals(2115, x.myprop);
      called = true;
    }
    a1({});
    assertTrue(called);
    assertEquals(2115, global_side_assignment);
    called = false;
    global_side_assignment = undefined;
    let a2 = ({x = {myprop: global_side_assignment} = {myprop: 2115}}) => {
      assertEquals(3000, x);
      called = true;
    }
    a2({x: 3000});
    assertTrue(called);
    assertEquals(undefined, global_side_assignment);
    // We never had a problem with non-arrow functions, but testing them too for
    // completeness.
    called = false;
    global_side_assignment = undefined;
    function f1({x = {myprop: global_side_assignment} = {myprop: 2115}}) {
      assertTrue('myprop' in x);
      assertEquals(2115, x.myprop);
      assertEquals(2115, global_side_assignment);
      called = true;
    }
    f1({});
    assertTrue(called);
    assertEquals(2115, global_side_assignment);
    called = false;
    global_side_assignment = undefined;
    function f2({x = {myprop: global_side_assignment} = {myprop: 2115}}) {
      assertEquals(3000, x);
      called = true;
    }
    f2({x: 3000});
    assertTrue(called);
    assertEquals(undefined, global_side_assignment);`,
    `(function testVariableDeclarationsFunction() {
      'use strict';
      var a = function(){};
      assertEquals('a', a.name);
      let b = () => {};
      assertEquals('b', b.name);
      const c = ((function(){}));
      assertEquals('c', c.name);
      var x = function(){}, y = () => {}, z = function withName() {};
      assertEquals('x', x.name);
      assertEquals('y', y.name);
      assertEquals('withName', z.name);
    })();
    (function testVariableDeclarationsClass() {
      'use strict';
      var a = class {};
      assertEquals('a', a.name);
      let b = ((class {}));
      assertEquals('b', b.name);
      // Should not overwrite name property.
      const c = class { static name() { } }
      assertEquals('function', typeof c.name);
      var x = class {}, y = class NamedClass {};
      assertEquals('x', x.name);
      assertEquals('NamedClass', y.name);
    })();
    (function testObjectProperties() {
      'use strict';
      var obj = {
        a: function() {},
        b: () => {},
        c() { },
        get d() { },
        set d(val) { },
        x: function withName() { },
        y: class { },
        z: class ClassName { },
        ''() {},
        42: function() {},
        4.2: function() {},
      };
      assertEquals('a', obj.a.name);
      assertEquals('b', obj.b.name);
      assertEquals('c', obj.c.name);
      var dDescriptor = Object.getOwnPropertyDescriptor(obj, 'd');
      assertEquals('get d', dDescriptor.get.name);
      assertEquals('set d', dDescriptor.set.name);
      assertEquals('withName', obj.x.name);
      assertEquals('y', obj.y.name);
      assertEquals('ClassName', obj.z.name);
      assertEquals('', obj[''].name);
      assertEquals('42', obj[42].name);
      assertEquals('4.2', obj[4.2].name);
      assertEquals('', obj.__proto__.name);
    })();
    (function testClassProperties() {
      'use strict';
      class C {
        a() { }
        static b() { }
        get c() { }
        set c(val) { }
        ''() { }
        static ''() { }
        42() { }
        static 43() { }
        get 44() { }
        set 44(val) { }
        static get constructor() { }
        static set constructor(val) { }
      };
      assertEquals('a', C.prototype.a.name);
      assertEquals('b', C.b.name);
      var descriptor = Object.getOwnPropertyDescriptor(C.prototype, 'c');
      assertEquals('get c', descriptor.get.name);
      assertEquals('set c', descriptor.set.name);
      assertEquals('', C.prototype[''].name);
      assertEquals('', C[''].name);
      assertEquals('42', C.prototype[42].name);
      assertEquals('43', C[43].name);
      var descriptor = Object.getOwnPropertyDescriptor(C.prototype, '44');
      assertEquals('get 44', descriptor.get.name);
      assertEquals('set 44', descriptor.set.name);
      var descriptor = Object.getOwnPropertyDescriptor(C, 'constructor');
      assertEquals('get constructor', descriptor.get.name);
      assertEquals('set constructor', descriptor.set.name);
    })();
    (function testComputedProperties() {
      'use strict';
      var a = 'a';
      var b = 'b';
      var sym1 = Symbol('1');
      var sym2 = Symbol('2');
      var sym3 = Symbol('3');
      var symNoDescription = Symbol();
      var proto = "__proto__";
      var obj = {
        ['']: function() {},
        [a]: function() {},
        [sym1]: function() {},
        [sym2]: function withName() {},
        [symNoDescription]: function() {},
        [proto]: function() {},
        get [sym3]() {},
        set [b](val) {},
      };
      assertEquals('', obj[''].name);
      assertEquals('a', obj[a].name);
      assertEquals('[1]', obj[sym1].name);
      assertEquals('withName', obj[sym2].name);
      assertEquals('', obj[symNoDescription].name);
      assertEquals('__proto__', obj[proto].name);
      assertEquals('get [3]', Object.getOwnPropertyDescriptor(obj, sym3).get.name);
      assertEquals('set b', Object.getOwnPropertyDescriptor(obj, 'b').set.name);
      var objMethods = {
        ['']() {},
        [a]() {},
        [sym1]() {},
        [symNoDescription]() {},
        [proto]() {},
      };
      assertEquals('', objMethods[''].name);
      assertEquals('a', objMethods[a].name);
      assertEquals('[1]', objMethods[sym1].name);
      assertEquals('', objMethods[symNoDescription].name);
      assertEquals('__proto__', objMethods[proto].name);
      class C {
        ['']() { }
        static ''() {}
        [a]() { }
        [sym1]() { }
        static [sym2]() { }
        [symNoDescription]() { }
        get [sym3]() { }
        static set [b](val) { }
      }
      assertEquals('', C.prototype[''].name);
      assertEquals('', C[''].name);
      assertEquals('a', C.prototype[a].name);
      assertEquals('[1]', C.prototype[sym1].name);
      assertEquals('[2]', C[sym2].name);
      assertEquals('', C.prototype[symNoDescription].name);
      assertEquals('get [3]', Object.getOwnPropertyDescriptor(C.prototype, sym3).get.name);
      assertEquals('set b', Object.getOwnPropertyDescriptor(C, 'b').set.name);
    })();
    (function testAssignment() {
      var basicFn, arrowFn, generatorFn, classLit;
      basicFn = function() { return true; };
      assertEquals('basicFn', basicFn.name);
      var basicFn2 = basicFn;
      assertEquals('basicFn', basicFn2.name);
      basicFn = function functionWithName() { };
      assertEquals("functionWithName", basicFn.name);
      arrowFn = x => x;
      assertEquals('arrowFn', arrowFn.name);
      var arrowFn2 = arrowFn;
      assertEquals('arrowFn', arrowFn2.name);
      generatorFn = function*() { yield true; };
      assertEquals('generatorFn', generatorFn.name);
      var generatorFn2 = generatorFn;
      assertEquals('generatorFn', generatorFn2.name);
      generatorFn = function* generatorWithName() { };
      assertEquals("generatorWithName", generatorFn.name);
      classLit = class { constructor() {} };
      assertEquals('classLit', classLit.name);
      var classLit2 = classLit;
      assertEquals('classLit', classLit2.name);
      classLit = class classWithName { constructor() {} };
      assertEquals('classWithName', classLit.name);
      classLit = class { constructor() {} static name() {} };
      assertEquals('function', typeof classLit.name);
      classLit = class { constructor() {} static get name() { return true; } };
      assertTrue(classLit.name);
      classLit = class { constructor() {} static ['name']() {} };
      assertEquals('function', typeof classLit.name);
      classLit = class { constructor() {} static get ['name']() { return true; } };
      assertTrue(classLit.name);
    })();
    (function testObjectBindingPattern() {
      var {
        a = function() {},
        b = () => {},
        x = function withName() { },
        y = class { },
        z = class ClassName { },
        q = class { static name() { return 42 } },
        foo: bar = function() {},
        inParens = (() => {}),
        inManyParens = ((((() => {})))),
      } = {};
      assertEquals('a', a.name);
      assertEquals('b', b.name);
      assertEquals('withName', x.name);
      assertEquals('y', y.name);
      assertEquals('ClassName', z.name);
      assertEquals('function', typeof q.name);
      assertEquals('bar', bar.name);
      assertEquals('inParens', inParens.name)
      assertEquals('inManyParens', inManyParens.name)
    })();
    (function testArrayBindingPattern() {
      var [
        a = function() {},
        b = () => {},
        x = function withName() { },
        y = class { },
        z = class ClassName { },
        q = class { static name() { return 42 } },
        inParens = (() => {}),
        inManyParens = ((((() => {})))),
      ] = [];
      assertEquals('a', a.name);
      assertEquals('b', b.name);
      assertEquals('withName', x.name);
      assertEquals('y', y.name);
      assertEquals('ClassName', z.name);
      assertEquals('function', typeof q.name);
      assertEquals('inParens', inParens.name)
      assertEquals('inManyParens', inManyParens.name)
    })();
    (function testObjectAssignmentPattern() {
      var a, b, x, y, z, q;
      ({
        a = function() {},
        b = () => {},
        x = function withName() { },
        y = class { },
        z = class ClassName { },
        q = class { static name() { return 42 } },
        foo: bar = function() {},
        inParens = (() => {}),
        inManyParens = ((((() => {})))),
      } = {});
      assertEquals('a', a.name);
      assertEquals('b', b.name);
      assertEquals('withName', x.name);
      assertEquals('y', y.name);
      assertEquals('ClassName', z.name);
      assertEquals('function', typeof q.name);
      assertEquals('bar', bar.name);
      assertEquals('inParens', inParens.name)
      assertEquals('inManyParens', inManyParens.name)
    })();
    (function testArrayAssignmentPattern() {
      var a, b, x, y, z, q;
      [
        a = function() {},
        b = () => {},
        x = function withName() { },
        y = class { },
        z = class ClassName { },
        q = class { static name() { return 42 } },
        inParens = (() => {}),
        inManyParens = ((((() => {})))),
      ] = [];
      assertEquals('a', a.name);
      assertEquals('b', b.name);
      assertEquals('withName', x.name);
      assertEquals('y', y.name);
      assertEquals('ClassName', z.name);
      assertEquals('function', typeof q.name);
      assertEquals('inParens', inParens.name)
      assertEquals('inManyParens', inManyParens.name)
    })();
    (function testParameterDestructuring() {
      (function({ a = function() {},
                  b = () => {},
                  x = function withName() { },
                  y = class { },
                  z = class ClassName { },
                  q = class { static name() { return 42 } },
                  foo: bar = function() {},
                  inParens = (() => {}),
                  inManyParens = ((((() => {})))) }) {
        assertEquals('a', a.name);
        assertEquals('b', b.name);
        assertEquals('withName', x.name);
        assertEquals('y', y.name);
        assertEquals('ClassName', z.name);
        assertEquals('function', typeof q.name);
        assertEquals('bar', bar.name);
        assertEquals('inParens', inParens.name)
        assertEquals('inManyParens', inManyParens.name)
      })({});
      (function([ a = function() {},
                  b = () => {},
                  x = function withName() { },
                  y = class { },
                  z = class ClassName { },
                  q = class { static name() { return 42 } },
                  inParens = (() => {}),
                  inManyParens = ((((() => {})))) ]) {
        assertEquals('a', a.name);
        assertEquals('b', b.name);
        assertEquals('withName', x.name);
        assertEquals('y', y.name);
        assertEquals('ClassName', z.name);
        assertEquals('function', typeof q.name);
        assertEquals('inParens', inParens.name)
        assertEquals('inManyParens', inManyParens.name)
      })([]);
    })();
    (function testDefaultParameters() {
      (function(a = function() {},
                b = () => {},
                x = function withName() { },
                y = class { },
                z = class ClassName { },
                q = class { static name() { return 42 } },
                inParens = (() => {}),
                inManyParens = ((((() => {}))))) {
        assertEquals('a', a.name);
        assertEquals('b', b.name);
        assertEquals('withName', x.name);
        assertEquals('y', y.name);
        assertEquals('ClassName', z.name);
        assertEquals('function', typeof q.name);
        assertEquals('inParens', inParens.name)
        assertEquals('inManyParens', inManyParens.name)
      })();
    })();
    (function testComputedNameNotShared() {
      function makeClass(propName) {
        return class {
          static [propName]() {}
        }
      }
      var sym1 = Symbol('1');
      var sym2 = Symbol('2');
      var class1 = makeClass(sym1);
      assertEquals('[1]', class1[sym1].name);
      var class2 = makeClass(sym2);
      assertEquals('[2]', class2[sym2].name);
      assertEquals('[1]', class1[sym1].name);
    })();
    (function testComputedNamesOnlyAppliedSyntactically() {
      function factory() { return () => {}; }
      var obj = { ['foo']: factory() };
      assertEquals('', obj.foo.name);
    })();
    (function testNameNotReflectedInToString() {
      var f = function () {};
      var g = function* () {};
      var obj = {
        ['h']: function () {},
        i: () => {}
      };
      assertEquals('function () {}', f.toString());
      assertEquals('function* () {}', g.toString());
      assertEquals('function () {}', obj.h.toString());
      assertEquals('() => {}', obj.i.toString());
    })();
    (function testClassNameOrder() {
      assertEquals(['length', 'prototype'], Object.getOwnPropertyNames(class {}));
      var tmp = {'': class {}};
      var Tmp = tmp[''];
      assertEquals(['length', 'prototype', 'name'], Object.getOwnPropertyNames(Tmp));
      var name = () => '';
      var tmp = {[name()]: class {}};
      var Tmp = tmp[name()];
      assertEquals(['length', 'prototype', 'name'], Object.getOwnPropertyNames(Tmp));
      class A { }
      assertEquals(['length', 'prototype', 'name'], Object.getOwnPropertyNames(A));
      class B { static foo() { } }
      assertEquals(['length', 'prototype', 'foo', 'name'], Object.getOwnPropertyNames(B));
      class C { static name() { } static foo() { } }
      assertEquals(['length', 'prototype', 'name', 'foo'], Object.getOwnPropertyNames(C));
    })();
    (function testStaticName() {
      class C { static name() { return 42; } }
      assertEquals(42, C.name());
      assertEquals(undefined, new C().name);
      class D { static get name() { return 17; } }
      assertEquals(17, D.name);
      assertEquals(undefined, new D().name);
      var c = class { static name() { return 42; } }
      assertEquals(42, c.name());
      assertEquals(undefined, new c().name);
      var d = class { static get name() { return 17; } }
      assertEquals(17, d.name);
      assertEquals(undefined, new d().name);
    })();
    (function testNonStaticName() {
      class C { name() { return 42; } }
      assertEquals('C', C.name);
      assertEquals(42, new C().name());
      class D { get name() { return 17; } }
      assertEquals('D', D.name);
      assertEquals(17, new D().name);
      var c = class { name() { return 42; } }
      assertEquals('c', c.name);
      assertEquals(42, new c().name());
      var d = class { get name() { return 17; } }
      assertEquals('d', d.name);
      assertEquals(17, new d().name);
    })();`,
    `(function TestObjectLiteralPattern() {
      var { x : x, y : y, get, set } = { x : 1, y : 2, get: 3, set: 4 };
      assertEquals(1, x);
      assertEquals(2, y);
      assertEquals(3, get);
      assertEquals(4, set);
      var {z} = { z : 3 };
      assertEquals(3, z);
      var sum = 0;
      for (var {z} = { z : 3 }; z != 0; z--) {
        sum += z;
      }
      assertEquals(6, sum);
      var log = [];
      var o = {
        get x() {
          log.push("x");
          return 0;
        },
        get y() {
          log.push("y");
          return {
            get z() { log.push("z"); return 1; }
          }
        }
      };
      var { x : x0, y : { z : z1 }, x : x1 } = o;
      assertSame(0, x0);
      assertSame(1, z1);
      assertSame(0, x1);
      assertArrayEquals(["x", "y", "z", "x"], log);
    }());
    (function TestObjectLiteralPatternInitializers() {
      var { x : x, y : y = 2 } = { x : 1 };
      assertEquals(1, x);
      assertEquals(2, y);
      var {z = 3} = {};
      assertEquals(3, z);
      var sum = 0;
      for (var {z = 3} = {}; z != 0; z--) {
        sum += z;
      }
      assertEquals(6, sum);
      var log = [];
      var o = {
        get x() {
          log.push("x");
          return undefined;
        },
        get y() {
          log.push("y");
          return {
            get z() { log.push("z"); return undefined; }
          }
        }
      };
      var { x : x0 = 0, y : { z : z1 = 1}, x : x1 = 0} = o;
      assertSame(0, x0);
      assertSame(1, z1);
      assertSame(0, x1);
      assertArrayEquals(["x", "y", "z", "x"], log);
    }());
    (function TestObjectLiteralPatternLexicalInitializers() {
      'use strict';
      let { x : x, y : y = 2 } = { x : 1 };
      assertEquals(1, x);
      assertEquals(2, y);
      let {z = 3} = {};
      assertEquals(3, z);
      let log = [];
      let o = {
        get x() {
          log.push("x");
          return undefined;
        },
        get y() {
          log.push("y");
          return {
            get z() { log.push("z"); return undefined; }
          }
        }
      };
      let { x : x0 = 0, y : { z : z1 = 1 }, x : x1 = 5} = o;
      assertSame(0, x0);
      assertSame(1, z1);
      assertSame(5, x1);
      assertArrayEquals(["x", "y", "z", "x"], log);
      let sum = 0;
      for (let {x = 0, z = 3} = {}; z != 0; z--) {
        assertEquals(0, x);
        sum += z;
      }
      assertEquals(6, sum);
    }());
    (function TestObjectLiteralPatternLexical() {
      'use strict';
      let { x : x, y : y } = { x : 1, y : 2 };
      assertEquals(1, x);
      assertEquals(2, y);
      let {z} = { z : 3 };
      assertEquals(3, z);
      let log = [];
      let o = {
        get x() {
          log.push("x");
          return 0;
        },
        get y() {
          log.push("y");
          return {
            get z() { log.push("z"); return 1; }
          }
        }
      };
      let { x : x0, y : { z : z1 }, x : x1 } = o;
      assertSame(0, x0);
      assertSame(1, z1);
      assertSame(0, x1);
      assertArrayEquals(["x", "y", "z", "x"], log);
      let sum = 0;
      for (let {x, z} = { x : 0, z : 3 }; z != 0; z--) {
        assertEquals(0, x);
        sum += z;
      }
      assertEquals(6, sum);
    }());
    `,
    `(function testExpressionTypes() {
      "use strict";
      ((x, y = x) => assertEquals(42, y))(42);
      ((x, y = (x)) => assertEquals(42, y))(42);
      ((x, y = x = x + 1) => assertEquals(43, y))(42);
      ((x, y = x()) => assertEquals(42, y))(() => 42);
      ((x, y = new x()) => assertEquals(42, y.z))(function() { this.z = 42 });
      ((x, y = -x) => assertEquals(-42, y))(42);
      ((x, y = ++x) => assertEquals(43, y))(42);
      ((x, y = x === 42) => assertTrue(y))(42);
      ((x, y = (x == 42 ? x : 0)) => assertEquals(42, y))(42);
      ((x, y = function() { return x }) => assertEquals(42, y()))(42);
      ((x, y = () => x) => assertEquals(42, y()))(42);
      // Literals
      ((x, y = {z: x}) => assertEquals(42, y.z))(42);
      ((x, y = {[x]: x}) => assertEquals(42, y[42]))(42);
      ((x, y = [x]) => assertEquals(42, y[0]))(42);
      ((x, y = [...x]) => assertEquals(42, y[0]))([42]);
      ((x, y = class {
        static [x]() { return x }
      }) => assertEquals(42, y[42]()))(42);
      ((x, y = (new class {
        z() { return x }
      })) => assertEquals(42, y.z()))(42);
      ((x, y = (new class Y {
        static [x]() { return x }
        z() { return Y[42]() }
      })) => assertEquals(42, y.z()))(42);
      ((x, y = (new class {
        constructor() { this.z = x }
      })) => assertEquals(42, y.z))(42);
      ((x, y = (new class Y {
        constructor() { this.z = x }
      })) => assertEquals(42, y.z))(42);
      ((x, y = (new class extends x {
      })) => assertEquals(42, y.z()))(class { z() { return 42 } });
      // Defaults inside destructuring
      ((x, {y = x}) => assertEquals(42, y))(42, {});
      ((x, [y = x]) => assertEquals(42, y))(42, []);
    })();
    (function testMultiScopeCapture() {
      "use strict";
      var x = 1;
      {
        let y = 2;
        ((x, y, a = x, b = y) => {
          assertEquals(3, x);
          assertEquals(3, a);
          assertEquals(4, y);
          assertEquals(4, b);
        })(3, 4);
      }
    })();
    (function testSuper() {
      "use strict";
      class A {
        x() { return 42; }
      }
      class B extends A {
        y() {
          ((q = super.x()) => assertEquals(42, q))();
        }
      }
      new B().y();
      class C {
        constructor() { return { prop: 42 } }
      }
      class D extends C{
        constructor() {
          ((q = super()) => assertEquals(42, q.prop))();
        }
      }
      new D();
    })();
    (function testScopeFlags() {
      ((x, y = eval('x')) => assertEquals(42, y))(42);
      ((x, {y = eval('x')}) => assertEquals(42, y))(42, {});
    })();`,
    '({x:5,y:6});',
    '[1,2,3,,,];',
    '({ set y(a) {1;} });',
    '({ get x() {42;} });',
    'o.m;',
    "o['n']['m'];",
    'o.n.m;',
    'o.if;',
    'f();',
    "o['m']();",
    'o.m(x);',
    "o['m'](x);",
    'o.m(x,y);',
    "o['m'](x,y);",
    'f(x)(y);',
    "eval('x');",
    "(eval)('x');",
    "(1,eval)('x');",
    'eval(x,y);',
    'new o.m(x,y);',
    'new o.m;',
    'x ++;',
    'x--;',
    'delete x;',
    '++ /* comment */ x;',
    'x /* comment */ ++;',
    'x ++;',
    '!x;',
    'x, y;',
    'new\nX',
    '+x++;',
    '1 / 2;',
    '1 * 2 + 3;',
    'x<=y;',
    'x|y;',
    'x<y?z:w;',
    'x += y;',
    'x |= y;',
    '{x;y;};',
    '{x;};',
    '{};',
    'var x=1,y=2;',
    '\n;',
    'typeof x + typeof y',
    'typeof a.b\n/foo',
    'typeof a.b\n/foo/g',
    'void a\n/foo/g',
    'a=b\n++c',
    '{b\n++c};',
    'let {x : y = z} = obj;',
    'let [] = x;',
    'let [foo] = arr;',
    'try { s1; } catch (e) { s2; };',
    'debugger;',
    'function f(x,y) { var z; return x; };',
    'function f(x) { e; return x; };',
    'var x; function f(){;}; null;',
    '{ x; y; z; }',
    'x;\n/*foo*/\n\t;',
    'while(true)continue \n foo;',
    'var x; { 1 \n 2 } 3',
    'function f(){return\nfoo;}',
    'while(true)continue /* wtf \n busta */ foo;',
    'function foo(a,a){}',
    '/* */',
    '/abc/g/*f*/\n\t',
    '/abc/g//f',
    'for (x;function(){ a\nb };z) x;',
    'd\nd()',
    'trimLeft = /^\\s+/;\n\ttrimRight = /\\s+$/;',
    '({get:5});',
    'l !== "px" && (d.style(h, c, (k || 1) + l), j = (k || 1) / f.cur() * j, d.style(h, c, j + l)), i[1] && (k = (i[1] === "-=" ? -1 : 1) * k + j), f.custom(j, k, l)',
    'c:a:while(true){continue a}',
    'function f(){return c}',
    'this.charsX = Gui.getSize(this.textarea).w / this.fontSize.w;',
    'x=y.a/z;',
    '(x)/ (y);',
    '+{x:/y/};',
    'if(/x/)y;',
    '{/foo/}',
    'if(x){/foo/;}',
    ';/x/;',
    '[/x/];',
    'x=x,x=/y/;',
    'x=x,/y/;',
    'x?/y/:z;',
    'x?y:/z/;',
    '/=/;',
    'function f(){ return /foo/; }',
    'switch(x){}/foo/;',
    'function x(){}/foo/;',
    `var a, b, c, d;
  a = (b(), c(), d()) ? 1 : 2;`,
    'let {a:{}} = 1',
    'new (function () { var a = 1; });',
    'function a(){return {} / 1}',
    'var [a]=[1];',
    'void /test/',
    '(function a({ b: { c, a }, d: [e, f] }, ...[b, d, g]){})',
    '({ __proto__: null, get __proto__(){} })',
    '!function(){a()}(),!function(){b()}(),c()+1',
    'function a(b, ...c) { }',
    'a();',
    'for (var [a, b] in c);',
    'class a { ; }',
    'class X { static x() {} }',
    'abc\nfunction foo() {}',
    'async\nfunction\nfoo() {}',
    "'foo\\'bar'",
    'await +123',
    `if (x) {
    foo();
}
if (x) {
    foo();
} else {
    baz();
}
if (x) {
    foo();
} else if (y) {
    bar();
} else {
    baz();
}
if (x) {
    if (y) {
        foo();
    } else {
        bar();
    }
} else {
    baz();
}
if (x) {
    foo();
} else if (y) {
    bar();
} else if (z) {
    baz();
} else {
    moo();
}
function f() {
    if (x) {
        foo();
    }
    if (x) {
        foo();
    } else {
        baz();
    }
    if (x) {
        foo();
    } else if (y) {
        bar();
    } else {
        baz();
    }
    if (x) {
        if (y) {
            foo();
        } else {
            bar();
        }
    } else {
        baz();
    }
    if (x) {
        foo();
    } else if (y) {
        bar();
    } else if (z) {
        baz();
    } else {
        moo();
    }
}`,
    `if (x) foo();
if (x) foo(); else baz();
if (x) foo(); else if (y) bar(); else baz();
if (x) if (y) foo(); else bar(); else baz();
if (x) foo(); else if (y) bar(); else if (z) baz(); else moo();
function f() {
    if (x) foo();
    if (x) foo(); else baz();
    if (x) foo(); else if (y) bar(); else baz();
    if (x) if (y) foo(); else bar(); else baz();
    if (x) foo(); else if (y) bar(); else if (z) baz(); else moo();
}`,
    `if (x) foo();
if (x) foo(); else baz();
if (x) foo(); else if (y) bar(); else baz();
if (x) if (y) foo(); else bar(); else baz();
if (x) foo(); else if (y) bar(); else if (z) baz(); else moo();
function f() {
if (x) foo();
if (x) foo(); else baz();
if (x) foo(); else if (y) bar(); else baz();
if (x) if (y) foo(); else bar(); else baz();
if (x) foo(); else if (y) bar(); else if (z) baz(); else moo();
}`,
    `function f(x) {
  return function() {
      function n(a) {
          return a * a;
      }
      return x(n);
  };
}
function g(op) {
  return op(1) + op(2);
}
console.log(f(g)() == 5);`,
    `"use strict";
var foo = function foo(x) {
return "foo " + x;
};
console.log(foo("bar"));
//# sourceMappingURL=simple.js.map`,
    `function bar(x) {
var triple = x * (2 + 1);
return triple;
}`,
    `function baz(x) {
var half = x / 2;
return half;
}`,
    '/*!one\r\n2\r\n3*///comment\r\nfunction f(x) {\r\n if (x)\r\n//comment\r\n  return 3;\r\n}\r\n',
    '/*!one\r2\r3*///comment\rfunction f(x) {\r if (x)\r//comment\r  return 3;\r}\r',
    'function eval() { function a() { "use strict" } }',
    'function f() { { { var x; } let y; } }',
    'function g() { { var x; let y; } }',
    `var x = bar(1+2);
var y = baz(3+9);
print('q' + 'u' + 'x', x, y);
foo(5+6);`,
    `function f() {
"aaaaaaaaaa";
var o = {
    prop: 1,
    _int: 2,
};
return o.prop + o._int;
}`,
    `var Foo = function Foo(){console.log(1+2);}; new Foo();`,
    `function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}var _require=require("bar"),foo=_require.foo;var _require2=require("world"),hello=_require2.hello;foo.x.apply(foo,_toConsumableArray(foo.y(hello.z)));`,
    `function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
var _require = require("bar"),
  foo = _require.foo;
var _require2 = require("world"),
  hello = _require2.hello;
foo.x.apply(foo, _toConsumableArray(foo.y(hello.z)));`,
    `var assert = require("assert");
var UglifyJS = require("../..");
describe("let", function() {
  this.timeout(30000);
  it("Should not produce reserved keywords as variable name in mangle", function() {
      // Produce a lot of variables in a function and run it through mangle.
      var s = '"dddddeeeeelllllooooottttt"; function foo() {';
      for (var i = 0; i < 18000; i++) {
          s += "var v" + i + "=0;";
      }
      s += '}';
      var result = UglifyJS.minify(s, {
          compress: false
      }).code;
      // Verify that select keywords and reserved keywords not produced
      [
          "do",
          "let",
          "var",
      ].forEach(function(name) {
          assert.strictEqual(result.indexOf("var " + name + "="), -1);
      });
      // Verify that the variable names that appeared immediately before
      // and after the erroneously generated variable name still exist
      // to show the test generated enough symbols.
      [
          "to", "eo",
          "eet", "fet",
          "rar", "oar",
      ].forEach(function(name) {
          assert.notStrictEqual(result.indexOf("var " + name + "="), -1);
      });
  });
  it("Should quote mangled properties that are reserved keywords", function() {
      var s = '"rrrrrnnnnniiiiiaaaaa";';
      for (var i = 0; i < 18000; i++) {
          s += "v.b" + i + ";";
      }
      var result = UglifyJS.minify(s, {
          compress: false,
          ie8: true,
          mangle: {
              properties: true,
          }
      }).code;
      [
          "in",
          "var",
      ].forEach(function(name) {
          assert.notStrictEqual(result.indexOf(name), -1);
          assert.notStrictEqual(result.indexOf('v["' + name + '"]'), -1);
      });
  });
});`,
    `var assert = require("assert");
var UglifyJS = require("../node");
describe("Number literals", function() {
  it("Should not allow legacy octal literals in strict mode", function() {
      var inputs = [
          '"use strict";00;',
          '"use strict"; var foo = 00;'
      ];
      var test = function(input) {
          return function() {
              UglifyJS.parse(input);
          }
      };
      var error = function(e) {
          return e instanceof UglifyJS.JS_Parse_Error
              && e.message === "Legacy octal literals are not allowed in strict mode";
      };
      for (var i = 0; i < inputs.length; i++) {
          assert.throws(test(inputs[i]), error, inputs[i]);
      }
  });
});`,
    `function foo() { 0003; }`,
    '"\\76";',
    '"\\0"',
    '"\\008"',
    '"\\0008"',
    '"use\\\n strict";\n"\\07";',

    'function test() {"use strict"; 0o0; }',
    '0o2',
    '0O12',
    '(eval = 10) => 42',
    'eval => 42',
    'do foo\nwhile(0)',
    'function foo(y) {} / 100 /',
    'var x = 1;',
    'arguments => 42',
    'f = ([,] = g()) => {};',
    `var C = class { async *gen() {
    yield [...yield];
}}`,
    '({}?0:1)&&x();',
    '(function(){}).name;',
    '++a + + --b',
    '++a + ++b',
    '++a+ ++b',
    '++a + --b',
    '++a+--b',
    '++a + b',
    '++a+b',
    '++a + b--',
    '++a+b--',
    '++a + b++',
    '++a+b++',
    '++a + + ++b',
    '++a+ + ++b',
    '++a + + --b',
    '++a+ +--b',
    '++a + + b',
    '++a+ +b',
    '++a + + b--',
    '++a+ +b--',
    '++a + + b++',
    '++a+ +b++',
    '++a + - ++b',
    '++a+-++b',
    '++a + - --b',
    '++a+- --b',
    '++a + - b',
    '++a+-b',
    '++a + - b--',
    '++a+-b--',
    '++a + - b++',
    '++a+-b++',
    '++a - ++b',
    '++a-++b',
    '++a - --b',
    '++a- --b',
    '++a - b',
    '++a-b',
    '++a - b--',
    '++a-b--',
    '++a - b++',
    '++a-b++',
    '++a - + ++b',
    '++a-+ ++b',
    '++a - + --b',
    '++a-+--b',
    '++a - + b',
    '++a-+b',
    '++a - + b--',
    '++a-+b--',
    `var list = [ 1, 2, 3 ]
  var [ a, , b ] = list
  [ b, a ] = [ a, b ]`,
    `var obj = { a: 1 }
  var list = [ 1 ]
  var { a, b = 2 } = obj
  var [ x, y = 2 ] = list`,
    `var list = [ 7, 42 ]
  var [ a = 1, b = 2, c = 3, d ] = list
  a === 7
  b === 42
  c === 3
  d === undefined`,
    `function f ([ name, val ]) {
    console.log(name, val)
  }
  function g ({ name: n, val: v }) {
    console.log(n, v)
  }
  function h ({ name, val }) {
    console.log(name, val)
  }
  f([ "bar", 42 ])
  g({ name: "foo", val:  7 })
  h({ name: "bar", val: 42 })`,

    'let [a] = [];',

    'let {a:b} = {};',
    'function f([x] = [1]) {};',
    '({f: function({x} = {x: 10}) {}});',
    'f = function({x} = {x: 10}) {};',
    '[a, b] = [b, a];',
    '[ok.v] = 20;',
    'var [x = 10, y, z] = a;',
    '[x = 10, [ z = 10]] = a;',
    'var {x = 10, y = 5, z = 1} = a;',
    'var {x: x = 10, y: y = 10, z: z = 10} = a;',
    'var { x: x = 10 } = x;',
    'var {x, y: y = 10, z} = a;',
    'var {x = 10, y: { z = 10}} = a;',
    'var {x = 10, y: { z }} = a;',
    `function x({a}) {
    try {
      var {b} = a;
    }
    catch([stack]) {
    }
  };`,
    '({ responseText: text } = res);',
    'var {x: y, z: { a: b } } = { x: "3", z: { a: "b" } };',
    'function a({x = 10}) {}',
    'function x([ a, b ]){};',
    'function a([x, , [, z]]) {};',
    '(function x({ a, b }){});',
    'function x({ a, b }){};',
    '[a,,b] = array;',
    'var let = a;',
    '(let[a] = b);',
    `(x=1) => x * x;`,
    'for (const {a} of /b/) {}',
    '({ a = 42, [b]: c.d } = e);',
    `const test = ({ t, ...v }) => {
    console.log(t, v);
  };`,
    `for ( let i = 0; i < 10; i += 1 ) {
    try {
      const square = i * i;
      setTimeout( () => console.log( square ), i * 100 );
    } catch (e) {}
  }`,
    `for ( var i = 0; i < 10; i += 1 ) {
    try {
      var square = i * i;
      setTimeout( function () { return console.log( square ); }, i * 100 );
    } catch (e) {}
  }`,
    `class C {}
  var c1 = C;
  {
    class C {}
    var c2 = C;
  }`,
    `
        ({async, foo})`,
    `async function A() {}`,
    `const A = async function () {}`,
    `
        (class { async x() {} })`,
    `
        class Foo {
          constructor ( answer ) {
            this.answer = answer;
          }
          bar ( str ) {
            return str + 'bar';
          }
        }`,
    `
        class Foo {
          bar ( str ) {
            return str + 'bar';
          }
          static baz ( str ) {
            return str + 'baz';
          }
        }`,
    `
        class Foo extends Bar {
          constructor ( x ) {
            super( x );
            this.y = 'z';
          }
          baz ( a, b, c ) {
            super.baz( a, b, c );
          }
        }`,
    `
        class Foo extends Bar {
          baz ( ...args ) {
            super.baz(...args);
          }
          boz ( x, y, ...z ) {
            super.boz(x, y, ...z);
          }
          fab ( x, ...y ) {
            super.qux(...x, ...y);
          }
          fob ( x, y, ...z ) {
            ((x, y, z) => super.qux(x, ...y, ...z))(x, y, z);
          }
        }`,
    `
        class Circle {
          constructor ( radius ) {
            this.radius = radius;
          }
          get area () {
            return Math.PI * Math.pow( this.radius, 2 );
          }
          set area ( area ) {
            this.radius = Math.sqrt( area / Math.PI );
          }
          static get description () {
            return 'round';
          }
        }`,
    `
        const q = {a: class {}};
        class b extends q.a {
          c () {}
        }`,
    `
        class Foo {
          bar() {
            var s = "0\t1\t\t2\t\t\t3\t\t\t\t4\t\t\t\t\t5";
            return s + '\t';
          }
          baz() {
            return \`\t\`;
          }
        }
      `,
    `
      class A{
        x(){}
      }
      var B = class B{
        x(){}
      };
      class C extends D{
        x(){}
      }
      var E = class E extends F{
        x(){}
      }`,
    `
      class Foo {
        constructor ( options, { a2, b2 } ) {
          const { a, b } = options;
          const render = () => {
            requestAnimationFrame( render );
            this.render();
          };
          render();
        }
        render () {
          // code goes here...
        }
      }`,
    `
      class Foo extends Bar {
        constructor ( options, { a2, b2 } ) {
          super();
          const { a, b } = options;
          const render = () => {
            requestAnimationFrame( render );
            this.render();
          };
          render();
        }
        render () {
          // code goes here...
        }
      }`,
    `
        class Foo {
          static [a.b.c] () {
            // code goes here
          }
        }`,
    `
        class A extends B {
          constructor () {
            super();
            this.doSomething(() => {
              super.doSomething();
            });
          }
        }`,
    `
        class C {
          0(){}
          0b101(){}
          80(){}
          .12e3(){}
          0o753(){}
          12e34(){}
          0xFFFF(){}
          "var"(){}
        }
      `,
    `
        function pythag ( { x, y: z = 1 } ) {
          return Math.sqrt( x * x + z * z );
        }`,
    `
        function pythag ( [ x, z = 1 ] ) {
          return Math.sqrt( x * x + z * z );
        }`,
    `
        function drawRect ( { ctx, x1, y1, x2, y2 } ) {
          ctx.fillRect( x1, y1, x2 - x1, y2 - y1 );
        }
        function scale ([ d0, d1 ], [ r0, r1 ]) {
          const m = ( r1 - r0 ) / ( d1 - d0 );
          return function ( num ) {
            return r0 + ( num - d0 ) * m;
          }
        }`,
    `
        var { foo: bar, baz } = obj;
        console.log( bar );
        console.log( baz );
        console.log( baz );`,

    `
        function foo ({ arg1 = 123, arg2 = 456 } = {}) {
          console.log( arg1, arg2 );
        }`,
    `
        var { a: { b: c }, d: { e: f, g: h = 1 } } = x;`,
    `
        function foo ( [[[,x = 3] = []] = []] = [] ) {
          console.log( x );
        }`,

    `
        var { [FirstProp]: one, [SecondProp]: two = 'Too', 3: three, Fore: four } = x;
      `,
    `
        let x = [1, 2, {r: 9}, {s: ["table"]} ];
        let a, b, c, d;
        ([a, ...[ , {r: b}, {r: c = "nothing", s: [d] = "nope"} ]] = x);
        console.log(a, b, c, d);
      `,
    `
      let foo = ({p: [x, ...y] = [6, 7], q: [...z] = [8]} = {}) => {
        console.log(x, y, z);
      };
      foo({p: [1, 2, 3], q: [4, 5]});
      foo({q: []} );
      foo();
    `,
    `
        ({x, y: {z, q}} = {x: 1});`,
    `
        let [
          a = \`A\${baz() - 4}\`,
          , /* hole */
          c = (x => -x),
          d = ({ r: 5, [h()]: i }),
        ] = [ "ok" ];
      `,
    `
        class Point {
          set ( array ) {
            return [ this.x, this.y ] = array;
          }
        }
        let a, b, c = [ 1, 2, 3 ];
        console.log( [ a, b ] = c );
      `,
    `
        function foo ( a = 1, b = 2 ) {
          console.log( a, b );
        }
        var bar = function ( a = 1, b = 2 ) {
          console.log( a, b );
        };`,
    `
        function foo ({ a = 1 }) {
          console.log( a );
        }`,
    `
        function foo ({ a = 1 }, { b = 2 }) {
          console.log( a, b );
        }
        var bar = function ({ a = 1 }, { b = 2 }) {
          console.log( a, b );
        };`,
    `
        function a({ x = 1 } = {}) {
          console.log( x );
        }`,
    `
        var num1 = 0b111110111;
        var num2 = 0B111110111;
        var str = '0b111110111';`,
    `
        var num1 = 0o767;
        var num2 = 0O767;
        var str = '0o767';`,

    `
        var num1 = 503;
        var num2 = 503;
        var str = '0o767';`,
    `
        var obj = {
          [a]: 1
        };`,
    `
        var obj = {
          a: 1,
          [b]: 2
        };`,
    `
        var obj = {
          a: 1,
          [b]: 2,
          c: 3
        };`,
    `
        var obj = {
          [a]: 1,
          b: 2,
          [c]: 3,
          [d]: 4,
          e: 5,
          [f]: 6
        };`,
    `
        (function () { return { [key]: { [key]: val } } })
      `,
    `
        ((x) => {var obj = 2; console.log([{[x]: 1}, obj]);})(3);
      `,
    `({ x: async function() {} })`,
    `var obj = {...a};`,
    `var obj = {...a, ...b};`,
    `
        var a0 = { [ x ] : true , ... y };
        var a1 = { [ w ] : 0 , [ x ] : true , ... y };
        var a2 = { v, [ w ] : 0, [ x ] : true, ... y };
        var a3 = { [ w ] : 0, [ x ] : true };
        var a4 = { [ w ] : 0 , [ x ] : true , y };
        var a5 = { k : 9 , [ x ] : true, ... y };
        var a6 = { ... y, [ x ] : true };
        var a7 = { ... y, [ w ] : 0, [ x ] : true };
        var a8 = { k : 9, ... y, [ x ] : true };
        var a9 = { [ x ] : true , [ y ] : false , [ z ] : 9 };
        var a10 = { [ x ] : true, ...y, p, ...q };
        var a11 = { x, [c] : 9 , y };
        var a12 = { ...b, [c]:3, d:4 };
      `,
    `
        var a0 = { [ x ] : true , ... y };
        var a1 = { [ w ] : 0 , [ x ] : true , ... y };
        var a2 = { v, [ w ] : 0, [ x ] : true, ... y };
        var a3 = { [ w ] : 0, [ x ] : true };
        var a4 = { [ w ] : 0 , [ x ] : true , y };
        var a5 = { k : 9 , [ x ] : true, ... y };
        var a6 = { ... y, [ x ] : true };
        var a7 = { ... y, [ w ] : 0, [ x ] : true };
        var a8 = { k : 9, ... y, [ x ] : true };
        var a9 = { [ x ] : true , [ y ] : false , [ z ] : 9 };
        var a10 = { [ x ] : true, ...y, p, ...q };
        var a11 = { x, [c] : 9 , y };
        var a12 = { ...b, [c]:3, d:4 };
      `,
    `
        f0( { [ x ] : true , ... y } );
        f1( { [ w ] : 0 , [ x ] : true , ... y } );
        f2( { v, [ w ] : 0, [ x ] : true, ... y } );
        f3( { [ w ] : 0, [ x ] : true } );
        f4( { [ w ] : 0 , [ x ] : true , y } );
        f5( { k : 9 , [ x ] : true, ... y } );
        f6( { ... y, [ x ] : true } );
        f7( { ... y, [ w ] : 0, [ x ] : true } );
        f8( { k : 9, ... y, [ x ] : true } );
        f9( { [ x ] : true , [ y ] : false , [ z ] : 9 } );
        f10( { [ x ] : true, ...y, p, ...q } );
        f11( { x, [c] : 9 , y } );
        f12({ ...b, [c]:3, d:4 });
      `,
    `
			function Test() {
				this.a = [...arguments];
				console.log(JSON.stringify(this.a));
			}
			var obj = { Test };
			var a = [1, 2];
			var b = [3, 4];
			var c = [7, 8];
			new Test(...a);
			new obj.Test(...a);
			new (null || obj).Test(...a);
			new Test(0, ...a);
			new obj.Test(0, ...a);
			new (null || obj).Test(0, ...a);
			new Test(...a, ...b, 5);
			new obj.Test(...a, ...b, 5);
			new (null || obj).Test(...a, ...b, 5);
			new Test(...a, new Test(...c), ...b, 5);
			new obj.Test(...a, new Test(...c), ...b, 5);
			new (null || obj).Test(...a, new Test(...c), ...b, 5);
			new Test(...[1, 2]);
			new obj.Test(...[1, 2]);
			new (null || obj).Test(...[1, 2]);
			new Test(0, ...[1, 2]);
			new obj.Test(0, ...[1, 2]);
			new (null || obj).Test(0, ...[1, 2]);
			new Test(...[1, 2], ...[3, 4], 5);
			new obj.Test(...[1, 2], ...[3, 4], 5);
			new (null || obj).Test(...[1, 2], ...[3, 4], 5);
			new Test(...[1, 2], new Test(...[7, 8]), ...[3, 4], 5);
			new obj.Test(...[1, 2], new Test(...[7, 8]), ...[3, 4], 5);
			new (null || obj).Test(...[1, 2], new Test(...[7, 8]), ...[3, 4], 5);
			(function () {
				new Test(...arguments);
				new obj.Test(...arguments);
				new (null || obj).Test(...arguments);
				new Test(1, ...arguments);
				new obj.Test(1, ...arguments);
				new (null || obj).Test(1, ...arguments);
			})(7, 8, 9);
    `,
    `
    function foo (x) {
      if ( x )
        return ref => new (bar || baz).Test( ref, ...x );
    }
  `,
    `
  [...f(b), "n"];
  [...f(b), 'n'];
  [...f(b), \`n\`];
`,
    `
[...[]];
[...[],];
[...[x]];
[...[x,]];
[...[x, y]];
[...[x, y,]];
[...[x, y],];
[...[x, y,],];
[w, ...[]];
[w, ...[],];
[w, ...[x]];
[w, ...[x,]];
[w, ...[x, y]];
[w, ...[x, y,]];
[w, ...[x, y],];
[w, ...[x, y,],];
[...[], z];
[...[x], z];
[...[x,], z];
[...[x, y], z];
[...[x, y,], z];
[w, ...[], z];
[w, ...[x], z];
[w, ...[x,], z];
[w, ...[x, y], z];
[w, ...[x, y,], z];
`,
    `
f(...[]);
f(...[],);
f(...[x]);
f(...[x,]);
f(...[x, y]);
f(...[x, y,]);
f(...[x, y],);
f(...[x, y,],);
f(w, ...[]);
f(w, ...[],);
f(w, ...[x]);
f(w, ...[x,]);
f(w, ...[x, y]);
f(w, ...[x, y,]);
f(w, ...[x, y],);
f(w, ...[x, y,],);
f(...[], z);
f(...[x], z);
f(...[x,], z);
f(...[x, y], z);
f(...[x, y,], z);
f(w, ...[], z);
f(w, ...[x], z);
f(w, ...[x,], z);
f(w, ...[x, y], z);
f(w, ...[x, y,], z);
`,
    `
			new f(...[]);
			new f(...[],);
			new f(...[x]);
			new f(...[x,]);
			new f(...[x, y]);
			new f(...[x, y,]);
			new f(...[x, y],);
			new f(...[x, y,],);
			new f(w, ...[]);
			new f(w, ...[],);
			new f(w, ...[x]);
			new f(w, ...[x,]);
			new f(w, ...[x, y]);
			new f(w, ...[x, y,]);
			new f(w, ...[x, y],);
			new f(w, ...[x, y,],);
			new f(...[], z);
			new f(...[x], z);
			new f(...[x,], z);
			new f(...[x, y], z);
			new f(...[x, y,], z);
			new f(w, ...[], z);
			new f(w, ...[x], z);
			new f(w, ...[x,], z);
			new f(w, ...[x, y], z);
			new f(w, ...[x, y,], z);
    `,
    '() => tagged`template literal`',
    `
    obj = {
      0() {},
      0b101() {},
      80() {},
      .12e3() {},
      0o753() {},
      12e34() {},
      0xFFFF() {},
      "a string"() {},
      "var"() {},
    }`,
    `var obj = { x, y, z () {} }`,
    `
			let x = {
				foo() { return foo },
				bar() {}
			}
		`,
    `var obj = { ...{a: 1,}, b: 2, ...{c: 3,}, ...d, e, ...{f: 6,},};
    obj = { a: 1, b: 2, };
    obj = { a: 1, ...{b: 2} };
    obj = { a: 1, ...{b: 2,} };
    obj = { a: 1, ...{b: 2}, };
    obj = { a: 1, ...{b: 2,}, };
  `,
    `do {
  const square = i * i;
  setTimeout( function () {
    log( square );
  }, i * 100 );
} while ( i-- );`,
    '({a,b} = {c,d} = {a:1,b:2,c:3,d:4});',
    'var a,b,c,d; [a,b] = [c,d] = [1,2];',
    `for (r = 0; r < 1; r++) {
  let e = 1,
    o = 2;
  switch (o) {
    case 2:
      let e = 4
      console.log(e)
      break;
  }
  console.log(e)
}`,
    `for (let i = 0; i < 5; ++i) {
  if (Math.random() > 0) {
    const square = i * i;
    setTimeout(function() { console.log(square); }, 1);
  }
}`,
    'new Test().add(...numbers).add(...letters);',
    'x.add(...numbers).add(...letters);',
    'let a = () => /* = */ { return "b2" }',
    'let a = () => { /* = */ return "b2" }',
    'let a = () /* = */ => { return "b2" }',
    '[ arrow = () => {} ] = vals;',
    `function test(state, action) {
  return {
    ...state,
    [action.page]: {
      ...state[action.page],
      [action.key]: action.value
    }
  };
}`,
    'switch (answer) { case 42: let t = 42; break; }',
    'e => { 42; }',
    'e => ({ property: 42 })',
    '(a, b) => { 42; }',
    '([a, , b]) => 42',
    '(() => {})()',
    '(x=1) => x * x',
    '(a) => 00',
    '(eval = 10) => 42',
    '(eval, a = 10) => 42',
    '(x) => ((y, z) => (x, y, z))',
    'foo((x, y) => {})',
    'x = { method() { } }',
    'x = { method(test) { } }',
    'x = { "method"() { } }',
    'x = { set() { } }',
    'x = { y, z }',
    '[a.r] = b',
    'let [a,,b] = c',
    '({ responseText: text } = res)',
    'const {a} = {}',
    'const [a] = []',
    'let [a] = []',
    'var [a] = []',
    'var {a:b} = {}',
    'class A {get() {}}',
    'class A extends B { static get foo() {}}',
    'class A {set a(v) {}}',
    'class A { static set(v) {};}',
    'class A {*gen(v) { yield v; }}',
    '(class { *static() {} })',
    "class A { get ['constructor']() {} }",
    'class A { foo() {} bar() {}}',
    'class A { get foo() {} set foo(v) {}}',
    'class A { static get foo() {} get foo() {}}',
    'class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}',
    'var {[x]: y} = {y}',
    'function f({[x]: y}) {}',
    'var x = {*[test]() { yield *v; }}',
    'class A {[x]() {}}',
    'function f([x] = [1]) {}',
    'function f({x} = {x: 10}) {}',
    'f = function({x} = {x: 10}) {}',
    '({f: function({x} = {x: 10}) {}})',
    '({f({x} = {x: 10}) {}})',
    '(class {f({x} = {x: 10}) {}})',
    '(({x} = {x: 10}) => {})',
    'x = function(y = 1) {}',
    'x = { f: function(a=1) {} }',
    'x = { f(a=1) {} }',
    'function f(a, ...b) {}',
    'function x([ a, b ]){}',
    'function x({ a, b }){}',
    '(function x([ a, b ]){})',
    '({ x([ a, b ]){} })',
    '({ a }) => {}',
    '({ a }, ...b) => {}',
    '({ a: [a, b] }, ...c) => {}',
    '({ a: b, c }, [d, e], ...f) => {}',
    '[...a] = b',
    '[a, ...b] = c',
    '[{ a, b }, ...c] = d',
    '[a, ...[b, c]] = d',
    'var [a, ...b] = c',
    'var [{ a, b }, ...c] = d',
    'var [a, ...[b, c]] = d',
    'func(...a)',
    'func(...a, b)',
    '/[a-z]/u',
    'e => yield* 10',
    'var {get} = obj;',
    'var {propName: localVar = defaultValue} = obj',
    'var {propName = defaultValue} = obj',
    'var {get = defaultValue} = obj',
    'var [localVar = defaultValue] = obj',
    '({x = 0} = obj)',
    '({x = 0}) => x',
    '[a, {b: {c = 1}}] = arr',
    'for ({x = 0} in arr);',
    'try {} catch ({message}) {}',
    'class A { static() {} }',
    '`${/\\d/.exec("1")[0]}`',
    'let [x,] = [1]',
    'for (var [name, value] in obj) {}',
    'function foo() { new.target; }',
    '(([,]) => 0)',
    '(x, /y/);',
    'async("foo".bar);',
    'async(a);',
    '(foo[x])',
    '(foo.x)',
    'async (foo = yield) => foo',
    'async (foo = yield)',
    'function foo() { return {arguments} }',
    `function Test() {
      var left  = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
      var right = "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY";
      for (var i = 0; i < 100000; i++) {
        var cons = left + right;
        var substring = cons.substring(20, 80);
        var index = substring.indexOf('Y');
        assertEquals(34, index);
      }
    }`,
    `function f() { ++(this.foo) }`,
    `var a = o[o ^= 1];`,
    `var o = { f: "x" ? function () {} : function () {} };`,
    `var a = new p(1), b = new p(2);`,
    `o.__defineGetter__('foo', function () { return null; });`,
    `function break_from_for_in() {
      L: {
        try {
          for (var x in [1,2,3]) {
            break L;
          }
        } finally {}
      }
    }
    function break_from_finally() {
      L: {
        try {
        } finally {
          break L;
        }
      }
    }
    for (var i = 0; i < 10; i++) {
      break_from_for_in();
      gc();
    }
    for (var j = 0; j < 10; j++) {
      break_from_finally();
      gc();
    }`,
    `function for_var() {
      for (var x;;) {
        if (!x) break;
      }
      for (var x; x < 2;) {
        if (!x) break;
      }
      for (var x = 1;; x++) {
        if (x == 2) break;
      }
    }
    function for_let() {
      for (let x;;) {
        if (!x) break;
      }
      for (let x; x < 2;) {
        if (!x) break;
      }
      for (let x = 1;; x++) {
        if (x == 2) break;
      }
    }
    for (const x = 1;;) {
      if (x == 1) break;
    }
    for (const x = 1; x < 2;) {
      if (x == 1) break;
    }
    for (const x = 1;; 0) {
      if (x == 1) break;
    }`,
    'x = function(y = 1) {}',
    'function inner2(my_var) { my_var; }',
    'function inner2(my_var) { }',
    'function inner2(my_var = 5) { my_var; }',
    'function inner2(my_var = 5) { }',
    'function inner2(...my_var) { my_var; }',
    'function inner2(...my_var) { }',
    'function inner2([a, my_var, b]) { my_var; }',
    'function inner2([a, my_var, b]) { }',
    'function inner2([a, my_var, b] = [1, 2, 3]) { my_var; }',
    'function inner2([a, my_var, b] = [1, 2, 3]) { }',
    'function inner2({x: my_var}) { my_var; }',
    'function inner2({x: my_var}) { }',
    'function inner2({x: my_var} = {x: 0}) { my_var; }',
    'function inner2({x: my_var} = {x: 0}) { }',
    'function inner2({my_var}) { my_var; }',
    'function inner2({my_var}) { }',
    'function inner2({my_var} = {my_var: 8}) { my_var; } ',
    'function inner2({my_var} = {my_var: 8}) { }',
    'my_var => my_var;',
    'my_var => { }',
    '(a) = b;',
    '((a)) = b;',
    'a = ((b)) = c;',
    '(await())',
    '(x);',
    '(a) = 1;',
    '(a.b) = 1;',
    '(a[b]) = 1;',
    '(a.b().c().d) = 1;',
    '[x, y] = z;',
    '([x, y] = z);',
    '([x, y] = z) => x;',
    '([[x, y] = z]);',
    '([[x, y] = z]) => x;',
    '([[x, y] = z]) => x;',
    '({x, y} = z);',
    '(a) += 1;',
    '(a.b) += 1;',
    '(a[b]) += 1;',
    '(a.b().c().d) += 1;',
    '(this.a) += 1;',
    '(this[b]) += 1;',
    '(new x);',
    '(delete foo.bar);',
    '({});',
    '(a / b);',
    '(a \n/b/g);',
    '(delete /a/.x);',
    '(delete /a/g.x);',
    '(foo /=g/m.x);',
    '(void /=g/m.x);',
    '(void /=/g/m.x);',
    '([new x]);',
    '([delete foo.bar]);',
    '([{}]);',
    '([a / b]);',
    '([a \n/b/g]);',
    '([delete /a/.x]);',
    '([delete /a/g.x]);',
    '([foo /=g/m.x]);',
    '([void /=g/m.x]);',
    '([void /=/g/m.x]);',
    '(++x);',
    '(++x, y);',
    '(this.a) = 1;',
    '(this[b]) = 1;',
    '(my_var = 5) => my_var;',
    "x({'a':b}=obj);",
    "x({'a':b, 'c':d}=obj);",
    'x({"a":b}=obj);',
    "x({'a':b, c:d}=obj);",
    "x({a:b, 'c':d}=obj);",
    '({"x": y+z})',
    '({ident: [foo, bar].join("")})',
    '({ident: [foo, bar]/x})',
    '({ident: [foo, bar]/x/g})',
    '[...[x].map(y, z)];',
    '(foo, [bar, baz] = doo);',
    '[...[x]/y]',
    '[...{x}/y]',
    '[.../x//y]',
    'function x([a, b]){};',
    'function f([a, {b: []}]) {}',
    'function f({x: [a, {b: []}]}) {}',
    'try {} catch({e=x}){}',
    'try {} catch([e=x]){}',
    'new Foo.Bar',
    'new a.b.c.d',
    'new x().y',
    'new x()();',
    'new x().y + z',
    'new x()[y] = z',
    'new x().y++',
    'delete new x()',
    'delete new x().y',
    'typeof new x()',
    'typeof new x().y',
    'new x().y++',
    'new Foo`bar`',
    'function f([...bar]){}',
    'function f([...bar] = obj){}',
    'function f([foo, ...bar]){}',
    'function f([foo, ...bar] = obj){}',
    'function f([...[a, b]]){}',
    'function f([...[a, b]] = obj){}',
    'function f([x, ...[a, b]]){}',
    'function f([x, ...[a, b]] = obj){}',
    'function f( [a=[...b], ...c]){}',
    'function f( [a=[...b], ...c] = obj){}',
    'function f(a){}',
    'function f(a,b){}',
    'function f([foo,]){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([foo] = x){}',
    'function f([foo,,]){}',
    'function f([foo,,bar] = x){}',
    'function f([foo] = x, b){}',
    'function f([foo], b = y){}',
    'function f([foo] = x, b = y){}',
    'function f(x, [foo]){}',
    'function f(x, [foo] = y){}',
    '[(a)] = 0',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '[a = (b = c)] = 0',
    '[(a = 0)]',
    '({a:(b)} = 0)',
    '({a:(b) = 0} = 1)',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})',

    'a = { b(c=1) {} }',

    `(function () {
  while (!a || b()) {
      c();
  }
}());`,
    'a = []',
    `(function () {
  a(typeof b === 'c');
}());`,
    '(let[let])',
    '({[1*2]:3})',
    'a = { set b (c) {} }',
    '(function(){ return a * b })',
    '[a] = 1',
    '({ false: 1 })',
    '({*yield(){}})',
    `var a = {
  'arguments': 1,
  'eval': 2
};`,
    'var {a} = 1;',
    'var [a = b] = c',
    'for(a; a < 1;);',
    '(function a() {"use strict";return 1;});',
    `(function(){ return // Comment
  a; })`,
    '/*42*/',
    'function *a(){yield ~1}',
    `with (a)
// do not optimize it
(function () {
  b('c');
}());`,
    '(a,b) => 1 + 2',
    'a = { set true(b) { c = b } }',
    'function a(b, c) { return b-- > c; }',
    `(function () {
  a();
  function a() {
      b.c('d');
  }
  function a() {
      b.c('e');
  }
}());`,
    'do a(); while (true)',
    'do continue; while(1);',
    `'use strict';
var a = {
    '10': 1,
    '0x20': 2
};`,
    `class a {
  constructor() {
  };
  b() {};
};
class c {
  constructor(...d) {
  }
  b() {}
};
class e extends a {};
var f = class g {};
var h = class {};`,
    '((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 1',
    'a = a += 1',
    '(function*() { yield 1; })',
    'var a, b;',
    '({ a: 1, get a() { } })',
    'a = { __proto__: 1 }',
    '{do ; while(false); false}',
    '/* assignment */\n a = b',
    'function* a(){(class extends (yield) {});}',
    'function* a(){(class {[yield](){}})};',
    'function f(x = y, [foo] = z){}',
    'function f(x = y, [foo]){}',
    'function f([foo=a]){}',
    'function f([foo=a] = c){}',
    'function f([foo=a,bar]){}',
    'function f([foo=a,bar] = x){}',
    'function f([foo,bar=b]){}',
    'function f([foo,bar=b] = x){}',
    'function f([foo=a,bar=b]){}',
    'function f([a = b = c] = arr){}',
    'call(yield)',
    'function* f(){ yield; }',
    'function* f(){ yield x + y; }',
    'function* f(){ call(yield); }',
    'function* f(){ call(yield x); }',
    'function* f(){ call(yield x + y); }',
    'function f(){ yield; }',
    '5 + yield',
    `function* g() { let x = yield 3; }`,
    `function* g(x) { yield x = 3; }`,
    `function* g(x) { yield x = yield 3; }`,
    '++(x);',
    '++\n(x);',
    '++\n(((x)));',
    '--(x);',
    '--(((x)));',
    '--\n(x);',
    '--\n(((x)));',
    '(x)++;',
    '(x)--;',
    '(((x)))--;',
    'x *\n++y',
    'async function f(){ await\n++c; }',
    'a().b',
    '[.../x/g/y]',
    '(x--);',
    '(x--, y);',
    '(a = 1, b = 2) => x;',
    'wrap({a=b}=c);',
    'foo(.200)',
    '({[x]:y} = z);',
    '(...x) => x',
    '(x, ...y) => x',
    '(x.y)=z',
    '([...x=y])',
    '([x].foo)',
    '([x].foo) = x',
    'log({foo: [bar]});',
    '[...{a = b} = c];',
    'foo, async()',
    'foo(async(), x)',
    'foo(async(x,y,z), a, b)',
    'log(async().foo);',
    '(my_var = 5) => { }',
    'var {a,b=0,c:d,e:f=0,[g]:[h]}=0',
    "var m = 'foo'; var {[m]:[z]} = {foo:[1]}",
    '({a, a:a, a:a=a, [a]:{a}, a:some_call()[a], a:this.a} = 0);',
    'var [let] = x;',
    '({ x: x[Y] } = x);',
    'result = [x[yield]] = vals;',
    'for ((1?2:"3"in{}).foo in {key:1});',
    '(...my_var) => my_var;',
    'for ({x=y} in a) b',
    'for ({x=y} of a) b',
    '(...my_var) => { }',
    '([a, my_var, b]) => my_var;',
    'function *g() {x={     ...yield,    };}',
    'function *g() {x={     ...yield yield    };}',
    'function *g() {yield {     ...yield yield    };}',
    'function *g() {x={     ...yield yield,    };}',
    'function *g() {yield {     ...yield yield,    };}',
    'function *g() { yield {...(x,y),}}',
    `for ({x=y} in a) b;`,
    `for ({x=y} of a) b;`,
    '([a, my_var, b]) => { }',
    '([a, my_var, b] = [1, 2, 3]) => my_var;',
    '([a, my_var, b] = [1, 2, 3]) => { }',
    'var {a,b=0,c:d,e:f=0,[g]:[h]}=0',
    "var m = 'foo'; var {[m]:[z]} = {foo:[1]}",
    '({a, a:a, a:a=a, [a]:{a}, a:some_call()[a], a:this.a} = 0);',
    'var [let] = x;',
    '({ x: x[Y] } = x);',
    'result = [x[yield]] = vals;',
    'for ((1?2:"3"in{}).foo in {key:1});',
    '(...my_var) => my_var;',
    'for ({x=y} in a) b',
    'for ({x=y} of a) b',
    '(...my_var) => { }',
    '([a, my_var, b]) => my_var;',
    'function *g() {x={     ...yield,    };}',
    'function *g() {x={     ...yield yield    };}',
    'function *g() {yield {     ...yield yield    };}',
    'function *g() {x={     ...yield yield,    };}',
    'function *g() {yield {     ...yield yield,    };}',
    'function *g() { yield {...(x,y),}}',
    `for ({x=y} in a) b;`,
    `for ({x=y} of a) b;`,
    '([a, my_var, b]) => { }',
    '([a, my_var, b] = [1, 2, 3]) => my_var;',
    '([a, my_var, b] = [1, 2, 3]) => { }',
    'if (!a) debugger;',
    'a ** b',
    `// One
    (1);
    /* Two */
    (2);
    (
      // Three
      3
    );
    (/* Four */ 4);`,
    'new a(...b, ...c, ...d);',
    'a = { set b (c) {} } ',
    ` class Empty { }
    class EmptySemi { ; }
    class OnlyCtor { constructor() { p('ctor') } }
    class OnlyMethod { method() { p('method') } }
    class OnlyStaticMethod { static method() { p('smethod') } }
    class OnlyGetter { get getter() { p('getter') } }
    class OnlyStaticGetter { static get getter() { p('sgetter') } }
    class OnlySetter { set setter(x) { p('setter ' + x) } }
    class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }`,
    ` class Empty { }
    class EmptySemi { ; }
    class OnlyCtor { constructor() { p('ctor') } }
    class OnlyMethod { method() { p('method') } }
    class OnlyStaticMethod { static method() { p('smethod') } }
    class OnlyGetter { get getter() { p('getter') } }
    class OnlyStaticGetter { static get getter() { p('sgetter') } }
    class OnlySetter { set setter(x) { p('setter ' + x) } }
    class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }
    class OnlyComputedMethod { ["cmethod"]() { p('cmethod') } }
    class OnlyStaticComputedMethod { static ["cmethod"]() { p('scmethod') } }
    class OnlyComputedGetter { get ["cgetter"]() { p('cgetter') } }
    class OnlyStaticComputedGetter { static get ["cgetter"]() { p('scgetter') } }
    class OnlyComputedSetter { set ["csetter"](x) { p('csetter ' + x) } }
    class OnlyStaticComputedSetter { static set ["csetter"](x) { p('scsetter ' + x) } }
    `,
    ` testFlat([2, 3, [4, 5]], [2, 3, 4, 5]);
    testFlat([2, 3, [4, [5, 6]]], [2, 3, 4, [5, 6]]);
    testFlat([2, 3, [4, [5, 6]]], [2, 3, 4, 5, 6], 2);
    testFlat([], []);
    testFlat([[], [], 1], [1]);
    const typedArr = new Int32Array(3);
    const typedArr2 = new Int32Array(3);`,
    ` testFlatMap([2, 3, 4, 5], [2, 4, 3, 6, 4, 8, 5, 10], function (a) { return [a, a * 2]});
    const thisArg = { count : 0 };
    testFlatMap([2, 3, 4], [2, 3, 3, 4, 4, 5], function (a) { this.count += a; return [ a, a + 1]}, thisArg);
    testFlatMap([2, 3, 4], [[2], [3], [4]], function (a) { return [[a]]});`,
    `  testFlatMap([2, 3], [null, null], function () { return [this]}, null);
    testFlatMap([2, 3], [undefined, undefined], function () { return [this]}, undefined);
    testFlatMap([2, 3], [undefined, undefined], function () { return [this]});
    testFlatMap([2, 3], ["", ""], function () { return [this]}, "");
    testFlatMap([2, 3], ["Test", "Test"], function () { return [this]}, "Test");
    const boo = {};
    testFlatMap([2, 3], [boo, boo], function () { return [this]}, boo);`,
    ` var FloatArr0 = [];
    var VarArr0 = [];
    var b = VarArr0;
    for (var __loopvar1 = 0; b < FloatArr0;) {
        for (var v319132 = 0; v319132; v319132++) {
            FloatArr0[1];
        }
        while (v319133) {
            FloatArr0[1];
        }
    }`,
    '[ 1 ]',
    'for([a,b[a],{c,d=e,[f]:[g,h().a,(1).i,...j[2]]}] in 3);',
    'var h1 = async (x = 0 ? 1 : a => {}) => { return x; };',
    'function f2(m, x = 0 ? 1 : a => {}) { return x; }',
    'var g2 = (m, x = 0 ? 1 : a => {}) => { return x; };',
    'var h2 = async (m, x = 0 ? 1 : a => {}) => { return x; };',
    'var g3 = (x = 0 ? 1 : a => {}, q) => { return x; };',
    'var h3 = async (x = 0 ? 1 : a => {}, q) => { return x; };',
    'var { [0 ? 1 : a => {}]: h } = { "a => {}": "boo-urns!" };',
    '1 - 2',
    `// Yield statements.
    function* g() { yield 3; yield 4; }
    // Yield expressions.
    function* g() { (yield 3) + (yield 4); }
    // Yield without a RHS.
    function* g() { yield; }
    function* g() { yield }
    function* g() {
        yield
    }
    function* g() { (yield) }
    function* g() { [yield] }
    function* g() { {yield} }
    function* g() { (yield), (yield) }
    function* g() { yield; yield }
    function* g() { (yield) ? yield : yield }
    function* g() {
        (yield)
        ? yield
        : yield
    }
    // If yield has a RHS, it needs to start on the same line.  The * in a
    // yield* counts as starting the RHS.
    function* g() {
        yield *
        foo
    }
    // You can have a generator in strict mode.
function* g() { "use strict"; yield 3; yield 4; }
// Generators can have return statements also, which internally parse to a kind
// of yield expression.
function* g() { yield 1; return; }
function* g() { yield 1; return 2; }
function* g() { yield 1; return 2; yield "dead"; }
// Generator expression.
(function* () { yield 3; });
// Named generator expression.
(function* g() { yield 3; });
// Generators do not have to contain yield expressions.
function* g() { }
// YieldExpressions can occur in the RHS of a YieldExpression.
function* g() { yield yield 1; }
function* g() { yield 3 + (yield 4); }
function* g() { yield ({ yield: 1 }) }
function* g() { yield ({ get yield() { return 1; }}) }
function yield(yield) { yield: yield (yield + yield (0)); }
function f() { function yield() {} }
function f() { function* yield() {} }
function* yield() { (yield 3) + (yield 4); }`,
    `function f() {
  var x = 3;
  if (x > 0) {
    let {a:x} = {a:7};
    if (x != 7)
      throw "fail";
  }
  if (x != 3)
    throw "fail";
}
function g() {
  for (var [a,b] in {x:7}) {
    if (a !== "x" || typeof b !== "undefined")
      throw "fail";
  }
  {
    for (let [a,b] in {y:8}) {
      if (a !== "y" || typeof b !== "undefined")
        throw "fail";
    }
  }
  if (a !== "x" || typeof b !== "undefined")
    throw "fail";
}
f();
g();
if (typeof a != "undefined" || typeof b != "undefined" || typeof x != "undefined")
  throw "fail";
function h() {
  for ([a,b] in {z:9}) {
    if (a !== "z" || typeof b !== "undefined")
      throw "fail";
  }
}
h();
if (a !== "z" || typeof b !== "undefined")
  throw "fail";`,
    `function t()
    {
      var x = y => z => {} // ASI occurs here
      /Q/;
      return 42;
    }`,
    'var a = /undefined/.exec();',
    'a = /undefined/.exec(undefined);',
    '/aaaa/.exec(undefined), null',
    '/aaaa/.test(undefined), false',
    'var re = /aaa/',
    'function f([a], [b]=[1], ...[c]) {}',
    '(function () {1;})',
    'var a = /undefined/.exec();',
    'var a = /undefined/.exec();',
    'a: while (true) { continue a }',
    '({ if: 1 })',
    '!a',
    `{;}
    a();
    {};
    {
        {};
    };
    b();
    {}`,
    'x = [] = y;',
    '[] = 5;',
    '!(x)',
    '++(x)',
    '1e+05',
    'for (const x of xs) {}',
    'for (const x in xs) {}',
    '({x, ...rest});',
    'let {x=y} = {}',
    '({x:[]}={x})',
    'var x = build("&&")();',
    'let {x:y=z} = {}',
    'let {p:{q=0,...o}={r:0}} = {p:{r:""}}',
    'let [x=y] = []',
    'let [x=y, z] = []',
    '0o110/2',
    '0O644/2, 210',
    `var N = 70*1000;
    var counter;
    counter = 0;
    var x = build("&&")();
    if (x !== true)
      throw "Unexpected result: x="+x;
    if (counter != N)
      throw "Unexpected counter: counter="+counter;
    counter = 0;
    var x = build("||")();
    if (x !== true)
      throw "Unexpected result: x="+x;
    if (counter != 1)
      throw "Unexpected counter: counter="+counter;
    function build(operation)
    {
      var counter;
      var a = [];
      a.push("return f()");
      for (var i = 1; i != N - 1; ++i)
        a.push("f()");
      a.push("f();");
      return new Function(a.join(operation));
    }
    function f()
    {
      ++counter;
      return true;
    }`,
    '7 * 64 + 5 * 8 + 5',
    'eval("0" + v + i + j + k), i * 64 + j * 8 + k',
    'var {b:{c:x}}={b:{c:1}}',
    `var summary = 'Do not assert: (pnkey)->pn_arity == PN_NULLARY && ' +
    '((pnkey)->pn_type == TOK_NUMBER || (pnkey)->pn_type == TOK_STRING || ' +
    '(pnkey)->pn_type == TOK_NAME)';
  var actual = 'No Crash';
  var expect = 'No Crash';`,
    'let x = /x/* 5 */y/;',
    `const id = /*pre*/ {
      a: 1,
    }/*post*/;`,
    'const id = /*pre*/1/*post*/;',
    'class Kind { get "a"() {} }',
    'class Kind { set "a"(x) {} }',
    'let {x=y} = {}',
    'function f(yield, let) { return yield+let; }',
    '(function(){yield = 1;})',
    'var obj = { prop: "obj", f: function() { return this.prop; } };',
    'x = {} = y;',
    '({a,...b}) => 0;',
    'function x(...[ a, b ]){}',
    '\n    42\n\n',
    '/foobar/',
    '/[a-z]/g',
    '(1 + 2 ) * 3',
    '(1 + 2 ) * 3',
    '(x = 23)',
    'x = []',
    'x = [ ]',
    'x = [ 42 ]',
    'x = [ 42, ]',
    'x = [ ,, 42 ]',
    'x = [ 1, 2, 3, ]',
    '日本語 = []',
    'T‿ = []',
    'T‌ = []',
    'ⅣⅡ = []',
    '(x=(yield)=y)=>z',
    'async (a = async () => { await 1; }) => {}',
    'function f() { return { f() {}, *g() {}, r: /a/ }; }',
    'function* g() { return { f() {}, *g() {}, r: /b/ }; }',
    '() => { return { f() {}, *g() {}, r: /c/ }; }',
    `function* f(){ yield
      foo/g }`,
    'Object.getPrototypeOf({ async* method() {} }.method);',
    '({ async* method() {} })',
    '({ async *method() { } }).method.toString();',
    '(class { static async *method() { } }).method.toString();',
    'function f(x=(yield)=y){}',
    'function fna({x: y}) {}',
    'function fnb({x: y = 42}) {}',
    'function fnc({x: {}}) {}',
    'function fnd({x: {y}}) {}',
    'function fne({x: {} = 42}) {}',
    'function fnf({x: {y} = 42}) {}',
    '() => { return { f() {}, *g() {}, r: /c/ }; }',
    'function spreadOpt(...[r]){ return spreadTarget(...r); }',
    'function spreadOpt2(...[...r]){ return spreadTarget(...r); }',
    'function spreadOpt3(r, ...[]){ return spreadTarget(...r); }',
    'spreadOpt3([]), 0',
    '({...x})',
    '({...f()})',
    '({...123})',
    '({...x, ...obj.p})',
    '({p, ...x})',
    '({p: a, ...x})',
    '({...x, p: a})',
    '({...x,})',
    '({...__proto__})',
    '({...__proto__, ...__proto__})',
    'function argsLengthRestArrayWithDefault(...[a = 0]) {}',
    'function argsLengthEmptyRestObject(...{}) {}',
    'function argsLengthRestObject(...{a}) {}',
    'function argsLengthRestObjectWithDefault(...{a = 0}) {}',
    'function argsAccessEmptyRestArray(...[]) {}',
    'function arrayRestWithDefault(...[a, b = 1]) {}',
    'function objectRestWithDefault(...{0: a, 1: b = 1}) {}',
    'function arrayRestWithNestedRest(...[...r]) {}',
    'function arrayRestTDZ(...[a = a]) { }',
    'function objectRestTDZ(...{a = a}) { }',
    'function f1(a, bIs, [b]=[3], ...rest) {}',
    `let async = function(a){return {bind: "someMethodButIUseString"}};
    async(function (req, res) { }).bind;`,
    `let asyn = function(a){return {bind: "someMethodButIUseString"}};
    asyn(function (req, res) { }).bind;`,
    `
class C {
    *gen(id, module) {
        yield module.mount(this)
    }
}`,
    `
class C {
    *gen(id, module) {
        yield module
    }
}`,
    `
class C {
    *gen(id, modul) {
        yield modul.mount(this)
    }
}`,
    '[, ...rest]',
    'let [...[...x]] = (() => { throw "foo"; } )();',
    '[, ...(o.prop)]',
    '[, ...(o.call().prop)]',
    '[, ...[...(o.prop)]]',
    '[, ...[...(o.call().prop)]]',
    '{a: [, ...rest]}',
    '[, ...[...rest]]',
    '[, ...[...rest]]',
    '[, [, ...[...rest]]]',
    '{a: [, ...[...rest]]}',
    '[, ...{0: a, 1: b}]',
    '[, ...{0: a, 1: b}]',
    '[, [, ...{0: a, 1: b}]]',
    'it => { var [a] = it; return [a]; }',
    '() => { [a, b, c] = {0: 0, 1: 1, 2: 2} }',
    'it => { var [a,b,...rest] = it; return [a,b,...rest]; }',
    'it => { var [,,...rest] = it; return rest; }',
    'loop(() => { doneafter = 4; var [a] = iterable; return a; });',
    'loop(() => { doneafter = 4; var [a,b,...[...rest]] = iterable; return rest; });',
    '[a, , b, ...c] = obj;',
    'result = {[a]:b, ...rest} = { foo: 1, bar: 2, baz: 3 };',
    'async function* f() { let a = function(a = await) {}; }',
    'async function* f(a = async function*() { await 1; }) {}',
    'async function f(a = async function() { await 1; }) {}',
    "function a() { 'use strict'; var await = 3; }",
    "'use strict'; var await = 3;",
    'var await = 3; async function a() { await 4; }',
    'async function a() { await 4; } var await = 5',
    'async function a() { function b() { return await; } }',
    'function a() { await: 4 }',
    '(async function() {})()',
    'var k = async function() {}',
    'async function a() {}',
    `function assertSyntaxError(str) {
      var msg;
      var evil = eval;
      try {
          // Non-direct eval.
          evil(str);
      } catch (exc) {
          if (exc instanceof SyntaxError)
              return;
          msg = "Assertion failed: expected SyntaxError, got " + exc;
      }
      if (msg === undefined)
          msg = "Assertion failed: expected SyntaxError, but no exception thrown";
      throw new Error(msg + " - " + str);
  }
  // Yield statements.
  function* g() { yield 3; yield 4; }
  // Yield expressions.
  function* g() { (yield 3) + (yield 4); }
  // Yield without a RHS.
  function* g() { yield; }
  function* g() { yield }
  function* g() {
      yield
  }
  function* g() { (yield) }
  function* g() { [yield] }
  function* g() { {yield} }
  function* g() { (yield), (yield) }
  function* g() { yield; yield }
  function* g() { (yield) ? yield : yield }
  function* g() {
      (yield)
      ? yield
      : yield
  }
  // If yield has a RHS, it needs to start on the same line.  The * in a
  // yield* counts as starting the RHS.
  function* g() {
      yield *
      foo
  }
  // You can have a generator in strict mode.
  function* g() { "use strict"; yield 3; yield 4; }
  // Generators can have return statements also, which internally parse to a kind
  // of yield expression.
  function* g() { yield 1; return; }
  function* g() { yield 1; return 2; }
  function* g() { yield 1; return 2; yield "dead"; }
  // Generator expression.
  (function* () { yield 3; });
  // Named generator expression.
  (function* g() { yield 3; });
  // Generators do not have to contain yield expressions.
  function* g() { }
  // YieldExpressions can occur in the RHS of a YieldExpression.
  function* g() { yield yield 1; }
  function* g() { yield 3 + (yield 4); }
  // Generator definitions with a name of "yield" are not specifically ruled out
  // by the spec, as the yield name is outside the generator itself.  However,
  // in strict-mode, "yield" is an invalid identifier.
  function* yield() { (yield 3) + (yield 4); }
  assertSyntaxError("function* yield() { 'use strict'; (yield 3) + (yield 4); }");
  // In classic mode, yield is a normal identifier, outside of generators.
  function yield(yield) { yield: yield (yield + yield (0)); }
  // Yield is always valid as a key in an object literal.
  ({ yield: 1 });
  function* g() { yield ({ yield: 1 }) }
  function* g() { yield ({ get yield() { return 1; }}) }
  // Yield is a valid property name.
  function* g(obj) { yield obj.yield; }
  // Checks that yield is a valid label in classic mode, but not valid in a strict
  // mode or in generators.
  function f() { yield: 1 }
  assertSyntaxError("function f() { 'use strict'; yield: 1 }")
  assertSyntaxError("function* g() { yield: 1 }")
  // Yield is only a keyword in the body of the generator, not in nested
  // functions.
  function* g() { function f(yield) { yield (yield + yield (0)); } }
  // Yield in a generator is not an identifier.
  assertSyntaxError("function* g() { yield = 10; }");
  // Yield binds very loosely, so this parses as "yield (3 + yield 4)", which is
  // invalid.
  assertSyntaxError("function* g() { yield 3 + yield 4; }");
  // Yield is still a future-reserved-word in strict mode
  assertSyntaxError("function f() { 'use strict'; var yield = 13; }");
  // The name of the NFE isn't let-bound in F/G, so this is valid.
  function f() { (function yield() {}); }
  function* g() { (function yield() {}); }
  // The name of the NFE is let-bound in the function/generator expression, so this is invalid.
  assertSyntaxError("function f() { (function* yield() {}); }");
  assertSyntaxError("function* g() { (function* yield() {}); }");
  // The name of the declaration is let-bound in F, so this is valid.
  function f() { function yield() {} }
  function f() { function* yield() {} }
  // The name of the declaration is let-bound in G, so this is invalid.
  assertSyntaxError("function* g() { function yield() {} }");
  assertSyntaxError("function* g() { function* yield() {} }");
  // In generators, yield is invalid as a formal argument name.
  assertSyntaxError("function* g(yield) { yield (10); }");
  if (typeof reportCompare == "function")
      reportCompare(true, true);`,
    'x = {}',
    'x = { }',
    `let x = 0;
    for (let i = 0, a = () => i; i < 4; i++) {
      assertEq(i, x++);
      assertEq(a(), 0);
    }
    assertEq(x, 4);
    x = 11;
    let q = 0;
    for (let {[++q]: r} = [0, 11, 22], s = () => r; r < 13; r++) {
      assertEq(r, x++);
      assertEq(s(), 11);
    }`,
    '() => f2({x: 1})',
    ' assertEqualsAsync(1, () => g6({x: 1}));',
    'async function f61(a = () => { "use strict"; return eval("x") }) { var x; return a(); }',
    '() => f1(4, 5);',
    'var f3 = (...let) => let + 42;',
    'while ({["a"]: 2e308.b = function* u() {}} = 8381.11);',
    '({ [x]: (x) = "bar" })',
    '({ [x]: (x) })',
    '({ x: (x) })',
    '({ x: (x) })',
    '({ x: (x) })',
    '({ x: x / y })',
    '({ [x]: x / y })',
    '({ x: 1 / 2 })',
    '({ [x]: 1 / 2 })',
    '({ [x = y]: 1 / 2 })',
    '({ [x]: (1 / 2)()})',
    '({ x: (1 / 2)()})',
    'function a(x, ...eval){return eval + x;}',
    'function b(x, ...let){return let + x;}',
    'function c(x, ...yield){return yield + x;}',
    '({}, y = { ...1 });',
    '({0: 0, 1: 1}, y = { ...[0, 1] });',
    'for (var {a:x,b:y,c:z} in foo);',
    'for (let {a:x,b:y,c:z} in foo);',
    'for ({a:x,b:y,c:z} in foo);',
    'for (var [x,y,z] in foo);',
    'for (let [x,y,z] in foo);',
    'for ([x,y,z] in foo);',
    'for (var {a:x,b:y,c:z} of foo);',
    'for (let {a:x,b:y,c:z} of foo);',
    'for ({a:x,b:y,c:z} of foo);',
    'for (var [x,y,z] of foo);',
    'for (const [x,y,z] of foo);',
    'for (const {a:x,b:y,c:z} in foo);',
    '({}, { ...new Proxy({}, {}) });',
    '({a: 2}, y = { ...x, a: 2 });',
    'for ([{a = 0}] of []);',
    'for (var [{a = 0}] of []);',
    'for (let [{a = 0}] of []);',
    'for (const [{a = 0}] of []);',
    'function f([{a = 0}]) {}',
    'var h = ([{a = 0}]) => {};',
    'var {p: {a = 0}} = {p: {}};',
    '{ let {p: {a = 0}} = {p: {}}; }',
    '{ const {p: {a = 0}} = {p: {}}; }',
    'function f([...[{a = 0}]]) {}',
    'var h = ([...[{a = 0}]]) => {};',
    '[{a = 0}] = [{}];',
    'var [{a = 0}] = [{}];',
    '{ let [{a = 0}] = [{}]; }',
    '{ const [{a = 0}] = [{}]; }',
    'for ([{a = 0}] of []);',
    'for (var [{a = 0}] of []);',
    'for (let [{a = 0}] of []);',
    'for (const [{a = 0}] of []);',
    'function f([{a = 0}]) {}',
    'var h = ([{a = 0}]) => {};',
    '({a: 1, b: 1}, y = { ...x, b: 1 });',
    '({a: 1}, y = { a: 2, ...x });',
    '({a: 3}, y = { a: 2, ...x, a: 3 });',
    '({a: 1, b: 1}, y = { a:2, ...x, b: 1 });',
    '({a: 1, b: 1}, y = { ...x, ...z });',
    '({a: 2, b: 2}, y = { ...x, ...z, a:2, b: 2 });',
    '({a: 1, b: 1}, y = { a: 1, ...x, b: 2, ...z });',
    '({ a: 1 }, y = { ...x });',
    '() => { y = { ...p } }',
    '(async function() { for await (let c of []) { function f() {}; break; } })();',
    '(async function() { for (let x of []) { x: for (let y of []) { for await (let c of []) { function f() {}; return; } } } })();',
    '(async function() { for await (let x of []) { x: for await (let y of []) { for await (let c of []) { function f() {}; break x; } } } })();',
    'var { y, ...x } = { y: 1, a: 1 };',
    `var x;
    for (x of new Set([1]))
        for (x of new Set([1]))
            for (x of new Set([1]))
                for (x of new Set([1]))
                    for (x of new Set([1]))
                        for (x of new Set([1]))
                            for (x of new Set([1]))
                                for (x of new Set([1]))
                                    for (x of new Set([1]))
                                        for (x of new Set([1]))
                                            for (x of new Set([1]))
                                                for (x of new Set([1]))
                                                    for (x of new Set([1]))
                                                        for (x of new Set([1]))
                                                            for (x of new Set([1]))
                                                                for (x of new Set([1]))
                                                                    gc();`,
    'var { z, y, ...x } = { z:1, y: 1, a: 1, b: 1 };',
    '({ a, ...b } = { a: 1, b: 2 });',
    '(({x, ...z}) => { assertEquals({y: 1}, z); })({ x: 1, y: 1});',
    '({ ...x[0] } = { a: 1 });',
    '({ ...x.f } = { a: 1 });',
    '({ foo: "foo", p0: "0", p1: "1", p2: "2", p3: "3" }, f(src));',
    'function f3(i,o){for(var x=i in o)parseInt(o[x]); return x}',
    'function f4(i,o){with(this)for(var x=i in o)parseInt(o[x]); return x}',
    //'(function(){for(var x = arguments in []){} function x(){}})();',
    `var called = 0;
function reset() {
  called = 0;
}
var obj = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 10, done: false };
      },
      return() {
        called++;
        return {};
      }
    };
  }
};
var a = (function () {
    for (var x in [0]) {
        try {} finally {
            return 11;
        }
    }
})();
assertEq(a, 11);
reset();
var b = (function () {
    for (var x of obj) {
        try {} finally {
            return 12;
        }
    }
})();
var c = (function () {
    for (var x in [0]) {
        for (var y of obj) {
            try {} finally {
                return 13;
            }
        }
    }
})();
var d = (function () {
    for (var x in [0]) {
        for (var y of obj) {
            try {} finally {
                for (var z in [0]) {
                    for (var w of obj) {
                        try {} finally {
                            return 14;
                        }
                    }
                }
            }
        }
    }
})();`,
    'let a = { async };',
    'let { async } = { async: 12 };',
    'let { async, other } = { async: 15, other: 16 };',
    `class X {
      constructor() {
        this.value = 42;
      }
      async getValue() {
        return this.value;
      }
      setValue(value) {
        this.value = value;
      }
      async increment() {
        var value = await this.getValue();
        this.setValue(value + 1);
        return this.getValue();
      }
      async getBaseClassName() {
        return 'X';
      }
      static async getStaticValue() {
        return 44;
      }
      async 10() {
        return 46;
      }
      async ["foo"]() {
        return 47;
      }
    }`,
    'function f({a = 0}, ...r){}',
    'function f(x = 0, {p: a = 0}){}',
    '(function(x = 0, {a = 0}){})',
    '(function(x = 0, {[0]: a}){})',
    '(function([a = 0], ...r){}.length, 1)',
    'function f({[0]: a}){}',
    'let a = { async() {} };',
    'let a = { async() {} };',
    'let a = { async() {} };',
    'let a = { async() {} };',
    'let a = { async() {} };',
    `var f1 = (...yield) => yield + 42;
assertEq(f1(), "42");
assertEq(f1(1), "142");
var f2 = (...eval) => eval + 42;
assertEq(f2(), "42");
assertEq(f2(1), "142");
var f3 = (...let) => let + 42;
assertEq(f3(), "42");
assertEq(f3(1), "142");
function g1(x, ...yield)
{
  return yield + x;
}
assertEq(g1(0, 42), "420");
function g2(x, ...eval)
{
  return eval + x;
}
assertEq(g2(0, 42), "420");
function g3(x, ...let)
{
  return let + x;
}`,
    'x = { answer: 42 }',
    'x = { true: 42 }',
    'x = { false: 42 }',
    'x = { x: 1, x: 2 }',
    'x = { get width() { return m_width } }',
    'x = { get undef() {} }',
    'x = { set width(w) { m_width = w } }',
    'x = { set if(w) { m_if = w } }',
    'x = { set true(w) { m_true = w } }',
    'x = { set 10(w) { m_null = w } }',
    '/* block comment */ 42',
    '42 /*The*/ /*Answer*/',
    '0e+100',
    '100',
    '0xabc',
    '0X1A',
    '"Hello\\412World"',
    //"\"Hello\\\r\nworld\"",
    '"Hello\\1World"',
    'var x = /[x-z]/i',
    'var x = /[a-c]/g',
    'var x = /[a-c]/u',
    'var x = /=([^=\\s])+/g',
    'universe(42).galaxies',
    'universe.true',
    'universe.false',
    'universe.null',
    'x++',
    '!x',
    'x << y',
    'x > y',
    'x * y / z',
    'x << y << z',
    'x || y ^ z',
    'eval = 42',
    'x /= 42',
    'x &= 42',
    '{ doThis(); doThat(); }',
    'var x',
    ';',
    'x, y',
    '\\u0061',
    'a\\u0061',
    'if (morning) goodMorning()',
    'do keep(); while (true)',
    'do keep(); while (true);',
    '{ do { } while (false);false }',
    'while (x < 10) { x++; y--; }',
    'for(;;);',
    'for(;;){}',
    'for(x = 0;;);',
    'for(var x = 0;;);',
    'for(x = 0; x < 42;);',
    'for(x = 0; x < 42; x++);',
    'for(x = 0; x < 42; x++) process(x);',
    'done: while (true) { break done }',
    'done: while (true) { break done; }',
    '"use\\x20strict"; with (x) foo = bar;',
    'switch (x) {}',
    'switch (answer) { case 42: hi(); break; }',
    'switch (answer) { case 42: hi(); break; default: break }',
    'done: switch (a) { default: break done }',
    'for(var x = 0, y = 1;;);',
    'start: for (;;) break start',
    'throw x;',
    'try { doThat(); } catch (e) { say(e) }',
    '(function test(t, t) { })',
    'function hello(a, ...rest) { }',
    'var hi = function() { sayHi() };',
    '{ x\n++y }',
    'var x /* comment */;',
    '{ throw error\nerror; }',
    '{ throw error// Comment\nerror; }',
    '123..toString(10)',
    'foo: 10; foo: 20;',
    'var x = function f() {} / 3;',
    '+function f() {} / 3;',
    'foo: function x() {} /regexp/',
    'x = {foo: function x() {} / divide}',
    'foo; function f() {} /regexp/',
    'let x, y;',
    'let eval = 42, arguments = 42',
    'let x = 14, y = 3, z = 1977',
    'for(let x = 0;;);',
    'for(let x = 0, y = 1;;);',
    'for (let x in list) process(x);',
    'var x = (1 + 2)',
    '(function () {} / 1)',
    'function f() {} / 1 /',
    'do /x/; while (false);',
    '0123. in/foo/i',
    '(foo = [])[0] = 4;',
    'for ((foo = []).bar in {}) {}',
    '((b), a=1)',
    '(x) = 1',
    'try {} catch (foo) { var foo; }',
    'try {} catch (foo) { try {} catch (_) { var foo; } }',
    'try {} catch (foo) { if (1) function foo() {} }',
    'try {} catch (foo) {} var foo;',
    'try {} catch (foo) {} let foo;',
    'try {} catch (foo) { { let foo; } }',
    'try {} catch (foo) { function x() { var foo; } }',
    'try {} catch (foo) { function x(foo) {} }',
    "'use strict'; let foo = function foo() {}",
    //'/**/ --> comment\n',
    'x.class++',
    '{function f() {} /regexp/}',
    'async function as(){ o = {f(await) {}} }',
    'async function as(){ o = {*f(await) {}} }',
    'async function as(){ o = {f(await) {}} }',
    'async function as(){ class A {*f(await) {}} }',
    'async function as(){ class A {f(await) {}} }',
    `function g8(h = () => arguments) {
  var arguments = 0;
  assertEq(arguments, 0);
  assertEq(arguments === h(), false);
}
g8();
function g9(h = () => arguments) {
  var arguments;
  assertEq(void 0 === arguments, false);
  assertEq(h(), arguments);
  arguments = 0;
  assertEq(arguments, 0);
  assertEq(arguments === h(), false);
}
g9();`,
    `var E;
(function (E) {
    E[E["e"] = -3] = "e";
})(E || (E = {}));`,
    '/*1*/(/*2*/ "foo" /*3*/)/*4*/',
    `//// [parenthesizedExpressionInternalComments.ts]
/*1*/(/*2*/ "foo" /*3*/)/*4*/
;
// open
/*1*/(
    // next
    /*2*/"foo"
    //close
    /*3*/)/*4*/
;
//// [parenthesizedExpressionInternalComments.js]
/*1*/ ( /*2*/"foo" /*3*/) /*4*/;
// open
/*1*/ (
// next
/*2*/ "foo"
//close
/*3*/ ) /*4*/;`,
    'var c = true ? (a) : function () { };',
    'const c = true ? (a) : function() {};',
    'const x1 = async (i) => await someOtherFunction(i);',
    'const x = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });',
    'const x1 = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });',
    ' var x = yield `abc${x}def`;',
    's = map("", ("", identity));',
    's = map("", (identity));',
    'let foo = (async bar => bar);',
    'var a = fun(function (x) { return x; }, 10);',
    ' if ("a" in (x)) {}',
    'function* gen() { var x = `abc${ yield 10 }def`;}',
    'var v = (a, b, c, d, e)',
    'const [a, b = a] = [1];',
    'let [a, b, c] = [1, 2, 3]; // no error',
    'var [x10, [y10, [z10]]] = [1, ["hello", [true]]];',
    'var { a: x11, b: { a: y11, b: { a: z11 }}} = { a: 1, b: { a: "hello", b: { a: true } } };',
    'var [x14, ...a6] = [1, 2, 3];',
    'var [[a0], [[a1]]] = []',
    'var { } = { x: 5, y: "hello" };',
    'var [] = [1, "hello"];',
    'var [x1, y1] = [1, "hello"]; ',
    'var a = [] = [1].map(_ => _);',
    `class X extends A {
  // async method with only call/get on 'super' does not require a binding
  async simple() {
      // call with property access
      super.x();
      // call additional property.
      super.y();
      // call with element access
      super["x"]();
      // property access (read)
      const a = super.x;
      // element access (read)
      const b = super["x"];
  }
  // async method with assignment/destructuring on 'super' requires a binding
  async advanced() {
      const f = () => {};
      // call with property access
      super.x();
      // call with element access
      super["x"]();
      // property access (read)
      const a = super.x;
      // element access (read)
      const b = super["x"];
      // property access (assign)
      super.x = f;
      // element access (assign)
      super["x"] = f;
      // destructuring assign with property access
      ({ f: super.x } = { f });
      // destructuring assign with element access
      ({ f: super["x"] } = { f });
  }
}
class A {
  x() {
  }
  y() {
  }
}
class B extends A {
  // async method with only call/get on 'super' does not require a binding
  async simple() {
      // call with property access
      super.x();
      // call additional property.
      super.y();
      // call with element access
      super["x"]();
      // property access (read)
      const a = super.x;
      // element access (read)
      const b = super["x"];
  }
  // async method with assignment/destructuring on 'super' requires a binding
  async advanced() {
      const f = () => { };
      // call with property access
      super.x();
      // call with element access
      super["x"]();
      // property access (read)
      const a = super.x;
      // element access (read)
      const b = super["x"];
      // property access (assign)
      super.x = f;
      // element access (assign)
      super["x"] = f;
      // destructuring assign with property access
      ({ f: super.x } = { f });
      // destructuring assign with element access
      ({ f: super["x"] } = { f });
  }
}`,
    `
for ({[2e308]: {"_"() {}, get [""]() {
  "use strict";
}}[++q], a, b, q = true, [(true ? arguments : ("foo"))[{}]]: c[this]} in [] = arguments) do ; while ((function () {
  "cù:";
  "";
  " [×";
  "";
} <= "".constructor)[this] ^= null(...this(), new (l ? /[-]+?/iu : (true))(...0), ...null ? this : false, ...new /\ufA3eDA^\b/g, class {
  static [/\\ude85+/my]() {
    "use strict";
  }
  static get [2e308]() {}
  static get [false]() {}
  *[""]() {}
  get [2e308]() {
    "use strict";
  }
}));`,
    `var GiantPrintArray = [];
__counter++;;
function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 100; else return Math.floor(x) & 0xffff; };;
function leaf() { return 100; };
class module1BaseClass { };;
var obj0 = {};
var obj1 = {};
var protoObj1 = {};
var arrObj0 = {};
var litObj0 = {prop1: 3.14159265358979};
var litObj1 = {prop0: 0, prop1: 1};
var arrObj0 = {};
var func0 = function(argMath113 = (ary.unshift(f64.length, (obj0.prop0 *= (f64.length && (++ aliasOfobj0.length))), (typeof((new module1BaseClass()))  != null) , 974325168, -140)),...argArr114){
  var uniqobj26 = [''];
  uniqobj26[__counter%uniqobj26.length].toString();
  var uniqobj27 = [''];
  var uniqobj28 = uniqobj27[__counter%uniqobj27.length];
  uniqobj28.toString();
  if((arrObj0.prop1 >> ((typeof obj0.prop1) >> ary[(17)]))) {
    var strvar9 = (strvar7).replace(/a/g, strvar3).concat(((f === argMath113) * ((strvar7).replace(/a/g, strvar3) + ((new module1BaseClass()) << (uic8.length, ((function () {;}) instanceof ((typeof Object == 'function' ) ? Object : Object)), leaf.call(obj0 ))))));
    strvar9 = strvar9.substring((strvar9.length)/3,(strvar9.length)/3);
    argMath113 /=(leaf() ? i8[(26) & 255] : f32[(205) & 255]);
    if(shouldBailout){
      return  'somestring'
    }
    WScript.Echo(strvar0 >h);
  }
  else {
    var strvar9 = '(' + '%!(þ';
    arrObj0.prop1 =(- 722372450.1);
    strvar3 = strvar9[6%strvar9.length];
    var strvar10 = strvar9;
    strvar10 = strvar10.substring((strvar10.length)/1,(strvar10.length)/4);
    litObj1 = protoObj1;
  }
  return leaf.call(obj1 );
};
var func1 = function(){
  var uniqobj29 = {prop0: arrObj0[(6)]};
  var uniqobj30 = Object.create(aliasOfobj0);
  return (h >>>= (typeof(arrObj0.prop1)  == 'object') );
};
var func2 = function(){
  function func5 () {
  }
  var uniqobj31 = new func5();
  return (Reflect.construct(module1BaseClass));
};
var func3 = function(argMath115,argMath116 = (new func2()).prop1 ){
  class class16 extends module1BaseClass {
    constructor (argMath117){
      super();
      return argMath115;
      var strvar9 = ('!k'+'*y'+';(' + 'õ$' + (typeof(argMath117)  != 'number') );
      strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/2);
      argMath117 /=(typeof(strvar9)  == 'string') ;
    }
    static get func7 (){
      return argMath115;
    }
  }
  class class17 extends module1BaseClass {
    func8 (){
      strvar7 = strvar7[6%strvar7.length];
      if(shouldBailout){
        return  'somestring'
      }
      return -313655691;
    }
    func9 (argMath118,argMath119){
      return g;
    }
    static func10 (argMath120,argMath121 = ('caller' instanceof ((typeof String == 'function' ) ? String : Object)),argMath122,argMath123){
      var strvar9 = strvar0;
      strvar9 = strvar9.substring((strvar9.length)/1,(strvar9.length)/4);
      strvar2 = strvar6.concat(parseInt("0", 18));
(Object.defineProperty(protoObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
      protoObj1.prop1 = (argMath122 ^= ('(' + '%!(þ'.indexOf('L' + 'e!*]'.concat(-4.66427488914349E+18))));
      strvar3 = strvar7.concat(func0(((obj1.prop1 !== argMath121)&&(protoObj1.prop1 < argMath120)), ...[ary]));
      strvar1 = '¦' + 'L' + 'e!*]'.concat(-4.66427488914349E+18);
      argMath115 |=((func2.call(litObj1 ) * (strvar4.concat(func1.call(litObj0 )) + ((('caller', ((97735116.1 === -413916238) * (func0.call(protoObj1 , (-78527701 ? 244 : aliasOfobj0.prop0), ary) + func0.call(litObj1 , ui8[(argMath122) & 255], ary))), (-78527701 ? 244 : aliasOfobj0.prop0), (new class16(...(new Set([/^{(?![a7])$/im])))), func0.call(litObj1 , ui8[(argMath122) & 255], ary)) / (f64[(16) & 255] == 0 ? 1 : f64[(16) & 255])) * ('*P!)G#i($©!cLD*'.indexOf('L' + 'e!*]')) + 'caller'))) * (ui8[(132) & 255] + ((argMath122 <= aliasOfobj0.prop1)||(h >= argMath115))) + ('g|,a-' + 'Äá!#,f$.'.concat(ui8[(ui8[(132) & 255]) & 255])).replace(/a/g, '*P!)G#i($©!cLD*'));
      return -822821403.9;
    }
    static func11 (argMath124 = func0.call(obj1 , (argMath115 /= (typeof 614038338)), ary)){
      return argMath124;
      strvar6 = strvar1.concat(212963263.1);
      return obj1.prop0;
    }
  }
  return protoObj1.prop1;
};
var func4 = function(){
  var strvar9 = ((strvar3).replace(/a/g, strvar3)).replace(/a/g, strvar5).concat(({59: Math.tan(i16[((Reflect.construct(module1BaseClass))) & 255]), 89: (aliasOfobj0.prop0-- ), prop1: arguments[(((('%oº]!' + 'D!2-!!%)'.indexOf('%oº]!' + 'D!2-!!%)')) >= 0 ? ('%oº]!' + 'D!2-!!%)'.indexOf('%oº]!' + 'D!2-!!%)')) : 0)) & 0XF)], prop2: ((197624368 instanceof ((typeof Array == 'function' ) ? Array : Object)) ? aliasOfobj0.prop0 : ((new RegExp('xyz')) instanceof ((typeof func2 == 'function' ) ? func2 : Object)))}, func0.call(litObj1 , (((obj1.prop0 !== obj0.prop1)||(aliasOfobj0.prop1 !== arrObj0.prop1)) * (func3.call(protoObj1 , ((protoObj1.prop0 * aliasOfobj0.prop1 + 404693627) + (obj1.prop0 ? b : c)), (-- f)) - {prop0: (arguments[(5)] != (~ +null)), prop1: (ary[(((1.13181440134692E+18 >= 0 ? 1.13181440134692E+18 : 0)) & 0XF)] > 'caller')})), ary), (typeof((- (-- h)))  == 'undefined') , 'caller', arrObj0[(11)]));
  class class18 extends module1BaseClass {
    set func12 (argMath125){
      strvar1 = strvar9[2%strvar9.length];
      return -5.25426100452532E+18;
    }
    static func13 (){
      strvar9 = (('C').replace(/a/g, 'Al'+',g'+'(§' + 'rH'.concat((- a))) + f64[(158) & 255]).concat(func2.call(litObj1 ));
(Object.defineProperty(arrObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
      arrObj0.prop1 = (ary.push((new module1BaseClass()), ((g < c) * (((obj1.prop0 != protoObj1.prop1) instanceof ((typeof String == 'function' ) ? String : Object)) - 'caller')), ary[(((((obj0.prop0 >>= ((typeof(strvar9)  == 'string')  >> (typeof((1428124786.1 || 65537))  != 'number') )) ? (strvar7 + (new module1BaseClass())) : arrObj0[((((new module1BaseClass()) >= 0 ? (new module1BaseClass()) : 0)) & 0XF)]) >= 0 ? ((obj0.prop0 >>= ((typeof(strvar9)  == 'string')  >> (typeof((1428124786.1 || 65537))  != 'number') )) ? (strvar7 + (new module1BaseClass())) : arrObj0[((((new module1BaseClass()) >= 0 ? (new module1BaseClass()) : 0)) & 0XF)]) : 0)) & 0XF)], protoObj1.prop1, (protoObj1.prop0 = (+ (h <= (typeof(a)  == 'undefined') ))), (new module1BaseClass()), ((arrObj0.prop1 > f)||(obj1.prop1 === obj0.prop0)), (- (-904176182 || (new module1BaseClass()))), ((new EvalError()) instanceof ((typeof Boolean == 'function' ) ? Boolean : Object))))
;
      WScript.Echo(strvar9 <=ui16[(aliasOfobj0.prop0) & 255]);
(Object.defineProperty(litObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
      litObj0.prop1 = func1.call(obj0 );
      return c;
    }
    static func14 (argMath126 = -1474167776){
      aliasOfobj0 = aliasOfobj0;
      var fPolyProp = function (o) {
        if (o!==undefined) {
          WScript.Echo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
        }
      };
      fPolyProp(litObj0);
      fPolyProp(litObj1);
      var u = uic8[(157) & 255];
      strvar6 = strvar9[2%strvar9.length];
      return aliasOfobj0.prop1;
    }
  }
  var reResult1=/[b7]\s((bab{5}b)ab{5}[b7]\B.{2,3}(bab{5}b)ab{5}[b7])\B.{2,3}\S$/giy.exec('ë' + '!%-ó');
  return (- e);
};`,
    `  do {
  if (__loopvar0) {
  }
  var __loopvar1 = loopInvariant;
  for (var _strvar0 in i8) {
      if (4) {
      }
      obj1.method0();
      var __loopvar2 = loopInvariant, __loopSecondaryVar2_0 = loopInvariant;
      for (; _strvar0 < 3077559403207580000; VarArr0) {
          if (-2) {
              break;
          }
          var v1 = shouldBailout;
          var v2 = true;
          function v3() {
              Math(_strvar0 * __loopvar2);
              ({ prop1: FloatArr0 });
          }
          v3(5);
          var __loopvar3 = loopInvariant, __loopSecondaryVar3_0 = loopInvariant;
          var __loopSecondaryVar4_0 = loopInvariant, __loopSecondaryVar4_1 = loopInvariant;
          var __loopvar5 = loopInvariant - 3;
          for (var _strvar0 in FloatArr0) {
              if (typeof _strvar0 === 'string' && _strvar0.indexOf('method') != -1) {
                  continue;
              }
              __loopvar5++;
              if (__loopvar5 == loopInvariant + 1) {
                  break;
              }
              FloatArr0[_strvar0] = _strvar0;
          }
          var id28 = test0.caller >>> uic8[120 & 255];
      }
  }
} while (false);`,
    `(function () {
  const actual = [];
  const expected = [ 'await', 1, 'await', 2 ];
  const iterations = 2;
  async function pushAwait() {
    actual.push('await');
  }
  async function callAsync() {
    for (let i = 0; i < iterations; i++) {
      await pushAwait();
    }
    return 0;
  }
  function checkAssertions() {
    assertArrayEquals(expected, actual,
      'Async/await and promises should be interleaved.');
  }
  assertPromiseResult((async() => {
    callAsync();
    return new Promise(function (resolve) {
      actual.push(1);
      resolve();
    }).then(function () {
      actual.push(2);
    }).then(checkAssertions);
  })());
})();`,
    `(function () {
  const actual = [];
  const expected = [ 'await', 1, 'await', 2 ];
  const iterations = 2;
  async function pushAwait() {
    actual.push('await');
  }
  async function* callAsync() {
    for (let i = 0; i < iterations; i++) {
      await pushAwait();
    }
    return 0;
  }
  function checkAssertions() {
    assertArrayEquals(expected, actual,
      'Async/await and promises should be interleaved when using async generators.');
  }
  assertPromiseResult((async() => {
    callAsync().next();
    return new Promise(function (resolve) {
      actual.push(1);
      resolve();
    }).then(function () {
      actual.push(2);
    }).then(checkAssertions);
  })());
})();`,
    `(function () {
  const actual = [];
  const expected = [
    'Promise: 6',
    'Promise: 5',
    'Await: 3',
    'Promise: 4',
    'Promise: 3',
    'Await: 2',
    'Promise: 2',
    'Promise: 1',
    'Await: 1',
    'Promise: 0'
  ];
  const iterations = 3;
  async function* naturalNumbers(start) {
    let current = start;
    while (current > 0) {
      yield Promise.resolve(current--);
    }
  }
  async function trigger() {
    for await (const num of naturalNumbers(iterations)) {
      actual.push('Await: ' + num);
    }
  }
  async function checkAssertions() {
    assertArrayEquals(expected, actual,
      'Async/await and promises should be interleaved when yielding.');
  }
  async function countdown(counter) {
    actual.push('Promise: ' + counter);
    if (counter > 0) {
      return Promise.resolve(counter - 1).then(countdown);
    } else {
      await checkAssertions();
    }
  }
  assertPromiseResult((async() => {
    trigger();
    return countdown(iterations * 2);
  })());
})();`,
    `
function testFunction() {
  async function f1() {
    for (let x = 0; x < 1; ++x) await x;
    return await Promise.resolve(2);
  }
  async function f2() {
    let r = await f1() + await f1();
    await f1();
    await f1().then(x => x * 2);
    await [1].map(x => Promise.resolve(x))[0];
    await Promise.resolve().then(x => x * 2);
    let p = Promise.resolve(42);
    await p;
    return r;
  }
  return f2();
}
//# sourceURL=test.js`,
    `class ChildClass5 extends BaseClass {
  constructor(result) {
      const arr = async () => this.id;
      arr().then(()=>{}, e => { result.error = e; });
  }
}
class ChildClass6 extends BaseClass {
  constructor(result) {
      const arr = async () => {
          let z = this.id;
      };
      arr().then(()=>{}, e => { result.error = e; });
      super();
  }
}
class ChildClass7 extends BaseClass {
  constructor(result) {
      const arr = async () => this.id;
      arr().then(()=>{}, e => { result.error = e; });
      super();
  }
}
class ChildClass8 extends BaseClass {
  constructor(result) {
      const arr = async () => { let i  = this.id; super(); };
      arr().then(()=>{}, e => { result.error = e; });
  }
}`,
    `function C1() {
  return async () => await new.target;
}
function C2() {
  return async () => { return await new.target };
}
function C2WithAwait() {
  return async () => {
      var self = new.target; await new.target;
      return new.target;
  }
}`,
    `
function resolveWait(x) {
    return new Promise(resolve => {
        WScript.SetTimeout(() => {
            resolve(x);
        }, 100);
    });
}
async function awaitImm(x) {
    const a = await resolveWait(1);
    const b = await resolveWait(2);
    return x + a + b;
}
awaitImm(1).then(v => {
    telemetryLog(v.toString(), true);
    emitTTDLog(ttdLogURI);
});`,
    `async function awaitImm(x) {
    const a = await resolveWait(1);
    const b = await resolveWait(2);
    return x + a + b;
}
function resolveWait(x) {
  return new Promise(resolve => {
      WScript.SetTimeout(() => {
          resolve(x);
      }, 100);
  });
}
awaitImm(1).then(v => {
    telemetryLog(v.toString(), true);
    emitTTDLog(ttdLogURI);
});`,
    `HASH_NAME(abstract, 0xDBC60B24, 0xDBC60B24)
HASH_NAME(assert, 0x08D130F2, 0x08D130F2)
HASH_NAME(async, 0x0084CDEE, 0x0084CDEE)
HASH_NAME(await, 0x0084FF56, 0x0084FF56)
HASH_NAME(boolean, 0x96F94400, 0x96F94400)
HASH_NAME(byte, 0x0007E974, 0x0007E974)
HASH_NAME(char, 0x0007E83E, 0x0007E83E)
`,
    `var reResult2=('.*8#^' + '.)1vc5$]').split(/\\b\\S|(?=[蒤7])|(?!\\b.)|(\\S)/imyu,3);`,
    `
function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 100; else return Math.floor(x) & 0xffff; };;
function leaf() { return 100; };
class module1BaseClass { };;
var obj0 = {};
var protoObj0 = {};
var obj1 = {};
var arrObj0 = {};
var litObj0 = {prop1: 3.14159265358979};
var litObj1 = {prop0: 0, prop1: 1};
var arrObj0 = {};
var func0 = function(){
  return (new module1BaseClass());
};
var func1 = function(){
  function func10 (arg0, arg1) {
    this.prop0 = arg0;
    this.prop2 = arg1;
  }
  var uniqobj32 = new func10(((new module1BaseClass()) ? (protoObj0.prop1 <<= (typeof(obj1.prop0)  == 'boolean') ) : ((++ h) ? ({} instanceof ((typeof EvalError == 'function' && !(EvalError[Symbol.toStringTag] == 'AsyncFunction')) ? EvalError : Object)) : (-1596867654.9 >>> -358240255))),ary[((shouldBailout ? (ary[7] = 'x') : undefined ), 7)]);
  return (typeof(g)  != null) ;
};
var func2 = function(argMath179,argMath180 = (new module1BaseClass()),argMath181){
  return ((shouldBailout ? (argMath180 = { valueOf: function() { WScript.Echo('argMath180 valueOf'); return 3; } }, f64[(17) & 255]) : f64[(17) & 255]) * 2);
};
var func3 = function(argMath182,argMath183,argMath184 = ((b === argMath182)&&(d <= argMath183))){
  var uniqobj34 = [''];
  var uniqobj35 = uniqobj34[__counter%uniqobj34.length];
  uniqobj35.toString();
  var reResult2=('.*8#^' + '.)1vc5$]').split(/\\b\\S|(?=[蒤7])|(?!\\b.)|(\\S)/imyu,3);
(Object.defineProperty(arrObj0, 'prop4', {writable: true, enumerable: false, configurable: true }));
  arrObj0.prop4 = (obj1.prop0 = ('method1' in arrObj0));
  return func1.call(obj1 );
};
var func0 = function(){
  try {
    if(shouldBailout){
      return  'somestring'
    }
    return 7.57529413855588E+18;
  } catch(ex) {
    x.Echo(ex.message);
    protoObj1.prop1 =4.84064898232359E+18;
    var fPolyProp = function (o) {
      if (o!==undefined) {
        x.Echo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
      }
    };
    fPolyProp(litObj0);
    fPolyProp(litObj1);
  } finally {
    return b;
  }
  var reResult4=('!.'+'(!'+'!!' + ',8').replace(('!.'+'(!'+'!!' + ',8'),('*u'+'%!'+'A¿' + '+)'));
  return (g >> i32[(60) & 255]);
};
var func1 = function(){
  class class21 extends module2BaseClass {
    constructor (argMath189){
      super();
      var strvar9 = strvar5;
      strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/4);
      argMath189 = arguments[((shouldBailout ? (arguments[0] = 'x') : undefined ), 0)];
      strvar3 = strvar6 + (7993307.1 * (argMath189 + argMath189));
      strvar9 = 'd'.concat((argMath189 + -462154506.9));
    }
    func6 (argMath190){
      if(shouldBailout){
        return  'somestring'
      }
      var strvar9 = (strvar4 + (arguments[(0)] * (func0.call(aliasOfobj1 ) - arrObj0[((shouldBailout ? (arrObj0[15] = 'x') : undefined ), 15)]))).concat(a);
      var strvar10 = ('J' + 'Ðo!D');
      var uniqobj38 = aliasOfobj1;
      var y = (uniqobj38.length *= ((new module2BaseClass()) * ((true instanceof ((typeof Object == 'function' && !(Object[Symbol.toStringTag] == 'AsyncFunction')) ? Object : Object)) + (uniqobj38.length = ((shouldBailout ? func0 = func0 : 1), func0())))));
      strvar0 = strvar10[0%strvar10.length];
      return -218;
    }
    func7 (argMath191 = ui8[(33) & 255],argMath192 = argMath191,argMath193){
      strvar6 = strvar3[2%strvar3.length];
      litObj0 = protoObj0;
      return -77461066;
      arrObj0.prop1 -=arguments[(10)];
      return import("module0_6970131f-9176-4448-a51d-bed04d11807c.js");
    }
    func8 (){
      protoObj0 = arrObj0;
      f = 'caller';
      strvar2 = strvar7[4%strvar7.length];
      var uniqobj39 = {["33"]: arrObj0[(((((shouldBailout ? (arrObj0[(((Math.abs('caller')) >= 0 ? ( Math.abs('caller')) : 0) & 0xF)] = 'x') : undefined ), Math.abs('caller')) >= 0 ? Math.abs('caller') : 0)) & 0XF)], prop0: (obj1.prop0 %=       (shouldBailout ? func0() : func0())), ["prop2"]: arrObj0[(((arguments[((shouldBailout ? (arguments[1] = 'x') : undefined ), 1)] >= 0 ? arguments[((shouldBailout ? (arguments[1] = 'x') : undefined ), 1)] : 0)) & 0XF)], ["prop3"]: (((~ (obj1.length >>= ((obj0.prop0 /= -443692889) & (new module2BaseClass())))) ? (arguments[(((((shouldBailout ? (arguments[(((ui32[(139) & 255]) >= 0 ? ( ui32[(139) & 255]) : 0) & 0xF)] = 'x') : undefined ), ui32[(139) & 255]) >= 0 ? ui32[(139) & 255] : 0)) & 0XF)] ? (new module2BaseClass()) : 'caller') : (obj1.prop1 = ((arguments[((shouldBailout ? (arguments[14] = 'x') : undefined ), 14)] ? func0.call(protoObj1 ) : (arrObj0.prop1, 2147483650, arrObj0.prop1, e)) > ((typeof(aliasOfobj1.prop1)  == 'string')  * (g - (! obj0.prop1)))))) >= arrObj0[(((65536 >= 0 ? 65536 : 0)) & 0XF)]), prop4: func0.call(litObj0 ), prop5: arrObj0[((shouldBailout ? (arrObj0[18] = 'x') : undefined ), 18)]};
      var uniqobj40 = arrObj0;
(Object.defineProperty(obj1, 'prop4', {writable: true, enumerable: false, configurable: true }));
      obj1.prop4 = 'caller';
      return -1182621235;
    }
    func9 (){
      strvar2 = strvar0.concat((('gº'+'!:'+'_É' + 'm!').indexOf(strvar0))).concat((-124355308.9 !== protoObj1.prop1)).concat(protoObj0.prop1);
      var fPolyProp = function (o) {
        if (o!==undefined) {
          WScript.Echo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
        }
      };
      fPolyProp(litObj0);
      fPolyProp(litObj1);
      strvar2 = strvar3[2%strvar3.length];
      a =-27;
      a =(++ h);
      return h;
      return h;
    }
    static set func10 (argMath194){
      protoObj1.prop1 =arguments[(0)];
      return 533469720;
    }
    static func11 (argMath195,argMath196,argMath197 = {prop7: 'caller', prop6: ((new Object()) instanceof ((typeof Error == 'function' && !(Error[Symbol.toStringTag] == 'AsyncFunction')) ? Error : Object)), prop5: f32[((((shouldBailout ? func0 = func0 : 1), func0()) ? ((argMath195 = ui8.length) >= ((f < h)||(obj0.prop0 !== obj0.prop0))) : (~ func0.call(arrObj0 )))) & 255], prop4: (argMath196 >= obj1.prop0), ["prop2"]: -1615453233.9, prop1: ((arguments[(((((shouldBailout ? (arguments[(((func0.call(protoObj1 )) >= 0 ? ( func0.call(protoObj1 )) : 0) & 0xF)] = 'x') : undefined ), func0.call(protoObj1 )) >= 0 ? func0.call(protoObj1 ) : 0)) & 0XF)] * ('caller' - ((-0 instanceof ((typeof func0 == 'function' && !(func0[Symbol.toStringTag] == 'AsyncFunction')) ? func0 : Object)) | Object.create({prop0: arguments[((((new func0()).prop1  >= 0 ? (new func0()).prop1  : 0)) & 0XF)], prop1: (typeof(strvar6)  != 'object') , prop2: (f64[(8.54427599454003E+18) & 255] ? (++ obj1.prop0) : (argMath196 * protoObj1.prop1)), prop3: ('caller' * (-127 ? -2121319693 : 134) - (new module2BaseClass())), prop4: (shouldBailout ? (a = { valueOf: function() { WScript.Echo('a valueOf'); return 3; } },     (shouldBailout ? func0() : func0())) :     (shouldBailout ? func0() : func0())), prop5: (typeof(strvar2)  == 'string') })))) <= -690557704), prop0: func0.call(aliasOfobj1 ), 49: arguments[(((((shouldBailout ? (arguments[((((protoObj0.prop0 >= f)) >= 0 ? ( (protoObj0.prop0 >= f)) : 0) & 0xF)] = 'x') : undefined ), (protoObj0.prop0 >= f)) >= 0 ? (protoObj0.prop0 >= f) : 0)) & 0XF)]}){
      obj0.length= makeArrayLength(((function () {;}) instanceof ((typeof Function == 'function' && !(Function[Symbol.toStringTag] == 'AsyncFunction')) ? Function : Object)));
      WScript.Echo(strvar6 !=-216);
      return e;
    }
    static func12 (){
      strvar7 = strvar1[1%strvar1.length];
(Object.defineProperty(litObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
      litObj1.prop1 = (-2 >> (typeof(aliasOfobj1.prop1)  != 'string') );
      litObj1.prop1 <<=((obj1.prop1 != arrObj0.prop1)||(litObj1.prop1 == f));
(Object.defineProperty(arrObj0, 'length', {writable: true, enumerable: false, configurable: true }));
      arrObj0.length = makeArrayLength((typeof(litObj1.prop1)  == 'string') );
      var strvar9 = '2®(4X¸G.Ó!£ö!(%';
      strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/1);
      strvar2 = strvar0[2%strvar0.length];
      return arrObj0.prop0;
    }
    static func13 (){
      WScript.Echo(strvar7 >(aliasOfobj1.prop1 < aliasOfobj1.prop1));
      WScript.Echo(strvar5 >=(-67745208 * aliasOfobj1.prop1));
      aliasOfobj1.prop0 ^=g;
      strvar1 = strvar1 + arrObj0[(1)];
      return f;
    }
  }
  return (arrObj0.prop0 ^= (new module2BaseClass()));
};
var randomGenerator = function(inputseed) {
  var seed = inputseed;
  return function() {
  // Robert Jenkins' 32 bit integer hash function.
  seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;
  seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
  seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;
  seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
  seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;
  seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
  return (seed & 0xfffffff) / 0x10000000;
  };
};;`,
    `var func1 = function(){
  var uniqobj29 = {prop0: arrObj0[(6)]};
  var uniqobj30 = Object.create(aliasOfobj0);
  return (h >>>= (typeof(arrObj0.prop1)  == 'object') );
};
var func2 = function(){
  function func5 () {
  }
  var uniqobj31 = new func5();
  return (Reflect.construct(module1BaseClass));
};
var func3 = function(argMath115,argMath116 = (new func2()).prop1 ){
  class class16 extends module1BaseClass {
    constructor (argMath117){
      super();
      return argMath115;
      var strvar9 = ('!k'+'*y'+';(' + 'õ$' + (typeof(argMath117)  != 'number') );
      strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/2);
      argMath117 /=(typeof(strvar9)  == 'string') ;
    }
    static get func7 (){
      return argMath115;
    }
  }
  class class17 extends module1BaseClass {
    func8 (){
      strvar7 = strvar7[6%strvar7.length];
      if(shouldBailout){
        return  'somestring'
      }
      return -313655691;
    }
    func9 (argMath118,argMath119){
      return g;
    }
    static func10 (argMath120,argMath121 = ('caller' instanceof ((typeof String == 'function' ) ? String : Object)),argMath122,argMath123){
      var strvar9 = strvar0;
      strvar9 = strvar9.substring((strvar9.length)/1,(strvar9.length)/4);
      strvar2 = strvar6.concat(parseInt("0", 18));
(Object.defineProperty(protoObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
      protoObj1.prop1 = (argMath122 ^= ('(' + '%!(þ'.indexOf('L' + 'e!*]'.concat(-4.66427488914349E+18))));
      strvar3 = strvar7.concat(func0(((obj1.prop1 !== argMath121)&&(protoObj1.prop1 < argMath120)), ...[ary]));
      strvar1 = '¦' + 'L' + 'e!*]'.concat(-4.66427488914349E+18);
      argMath115 |=((func2.call(litObj1 ) * (strvar4.concat(func1.call(litObj0 )) + ((('caller', ((97735116.1 === -413916238) * (func0.call(protoObj1 , (-78527701 ? 244 : aliasOfobj0.prop0), ary) + func0.call(litObj1 , ui8[(argMath122) & 255], ary))), (-78527701 ? 244 : aliasOfobj0.prop0), (new class16(...(new Set([/^{(?![a7])$/im])))), func0.call(litObj1 , ui8[(argMath122) & 255], ary)) / (f64[(16) & 255] == 0 ? 1 : f64[(16) & 255])) * ('*P!)G#i($©!cLD*'.indexOf('L' + 'e!*]')) + 'caller'))) * (ui8[(132) & 255] + ((argMath122 <= aliasOfobj0.prop1)||(h >= argMath115))) + ('g|,a-' + 'Äá!#,f$.'.concat(ui8[(ui8[(132) & 255]) & 255])).replace(/a/g, '*P!)G#i($©!cLD*'));
      return -822821403.9;
    }
    static func11 (argMath124 = func0.call(obj1 , (argMath115 /= (typeof 614038338)), ary)){
      return argMath124;
      strvar6 = strvar1.concat(212963263.1);
      return obj1.prop0;
    }
  }
  return protoObj1.prop1;
};`,
    `var func1 = function(argMath89 = (b <<= func0.call(obj0 , ary.length, -3)),argMath90,argMath91){
  class class12 extends module1BaseClass {
    constructor (){
      super();
      argMath90 >>=(-4.25417462235087E+17 + func0.call(litObj0 , func0.call(protoObj1 , ('{,ëe,' + 'dx$!Çlm!' + protoObj1.prop1), 'caller'), (e++ )));
      strvar4 = ('{,ëe,' + 'dx$!Çlm!').replace(/a/g, '!Ï'+'µ!'+'5!' + '(!').concat((f ? argMath89 : 65537));
      if(shouldBailout){
        return  'somestring'
      }
    }
    set func6 (argMath92){
      strvar7 = strvar2.concat(-164);
      return 7.55358946502581E+18;
    }
    func7 (argMath93,argMath94 = ((typeof((strvar4.concat(arguments.length) + ('caller' ? strvar4 : i16[(((! g) ? (ary.shift()) : (~ argMath93))) & 255])))  != 'boolean')  * (new module1BaseClass()) + (e <<= (typeof((strvar4.concat(arguments.length) + ('caller' ? strvar4 : i16[(((! g) ? (ary.shift()) : (~ argMath93))) & 255])))  != 'boolean') )),...argArr95){
      var fPolyProp = function (o) {
        if (o!==undefined) {
          WScript.Echo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
        }
      };
      fPolyProp(litObj0);
      fPolyProp(litObj1);
      return 1322510159;
    }
    get func8 (){
      arrObj0.prop1 %=(('caller' == ui8[(144) & 255]) ^ (obj0.prop1 = (((strvar0).replace(strvar0, strvar2) ? 'caller' : (~ ((-902901476.9 == 65536) ? (obj1.prop0 %= 1271449041.1) : Math.log(b)))) > (ary.slice(13,12)))));
      obj0 = obj1;
      arrObj0.prop4 = (obj0.prop0 >= obj0.prop1);
      strvar1 = strvar7.concat((g === arrObj0.prop1));
      return 653002063.1;
    }
    func9 (argMath96,argMath97 = ((argMath96-- ) * (('caller' << ((argMath89 == b)&&(argMath96 === protoObj1.prop1))) * (arrObj0[(((i8[1260584891.9] >= 0 ? i8[1260584891.9] : 0)) & 0XF)] + argMath96)) + ('caller' instanceof ((typeof EvalError == 'function' ) ? EvalError : Object))),argMath98,argMath99){
      WScript.Echo(strvar7 !=ui8[(218) & 255]);
      argMath98 = (argMath98 != -170147366.9);
      argMath98 =(! -1624275393);
      argMath99 =(typeof(argMath99)  != 'object') ;
      return c;
    }
  }
  return (obj1.prop1 != b);
};
var func2 = function(argMath100,...argArr101){
  class class13 {
    constructor (){
      c = (('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%') ? ((protoObj0.prop1 > arrObj0.prop1)||(argMath100 < argMath100)) : argMath100);
      var uniqobj17 = {51: (true instanceof ((typeof Object == 'function' ) ? Object : Object)), prop0: (911978738 - /.{2,5}/gmy.test('Ø#$!w' + '#z#¨!!%%')), prop2: Object.create(protoObj0, {}), prop3: func1.call(protoObj1 , arrObj0.prop1, obj0, /^bb.\B./giu), prop4: (new module1BaseClass()), prop5: ui16[((911978738 - /.{2,5}/gmy.test('Ø#$!w' + '#z#¨!!%%'))) & 255], prop6: ((+ -3.48024066844604E+17) * (typeof(argMath100)  == 'string')  - (((~ func1.call(protoObj1 , arrObj0.prop1, obj0, /^bb.\B./giu)) & (-2.97013115046733E+18 + (-- arrObj0.prop0))) ? (new module1BaseClass()) : 186))};
    }
    func11 (argMath102 = (ary.shift()),argMath103,argMath104 = ((((arrObj0.prop0 != obj1.prop0)||(arrObj0.prop0 >= arrObj0.prop0)) * ((argArr101[((((Reflect.construct(module1BaseClass)) >= 0 ? (Reflect.construct(module1BaseClass)) : 0)) & 0XF)] <= Math.sqrt((-35 <= ((argMath102 << 2147483647) + (argMath102 = argMath102))))) + ((new module1BaseClass()) === 2147483647))) == argMath103)){
      if(shouldBailout){
        return  'somestring'
      }
      strvar6 = strvar3[0%strvar3.length];
      obj1 = arrObj0;
      return 96152958;
    }
    static set func12 (argMath105 = ((~ (Function('') instanceof ((typeof String == 'function' ) ? String : Object))) ? (obj1.length -= arrObj0.prop0) : e)){
      var strvar9 = ((strvar6).replace(strvar6, strvar5)).replace(strvar6.concat((f + (((new RangeError()) instanceof ((typeof func1 == 'function' ) ? func1 : Object)) ? strvar5 : func1.call(arrObj0 , ((/a/ instanceof ((typeof Error == 'function' ) ? Error : Object)) * ((argMath105 == argMath100) + (- -217))), arrObj0, /(?=\\B.)/imy)))), 'È' + 'XvX!');
      strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/4);
      strvar9 = strvar0.concat(func1.call(arrObj0 , ((/a/ instanceof ((typeof Error == 'function' ) ? Error : Object)) * ((argMath105 == argMath100) + (- -217))), arrObj0, /(?=\\B.)/imy));
      strvar9 = strvar3 + ary[(2)];
      strvar5 = strvar1 + -84;
      h = argArr101[(15)];
      return 255;
    }
    static func13 (){
      argMath100 = ((protoObj1.prop1 > obj1.prop1) * ((argMath100-- ) - parseInt("-0x32")));
      return argMath100;
    }
    static func14 (argMath106,argMath107,argMath108){
      var strvar9 = strvar7;
      if(shouldBailout){
        return  'somestring'
      }
      strvar9 = 'U$'+'!)'+'(<' + '#õ' + (typeof(strvar7)  == 'object') ;
      argMath106 = obj0.prop0;
      WScript.Echo(strvar9 !==(argMath108 ? argMath106 : protoObj1.prop0));
      return argMath108;
    }
    static func15 (argMath109 = func1.call(arrObj0 , (Function('') instanceof ((typeof Function == 'function' ) ? Function : Object)), protoObj0, /\w*$/gmy),argMath110,argMath111,...argArr112){
(Object.defineProperty(arrObj0, 'length', {writable: true, enumerable: false, configurable: true }));
      arrObj0.length = makeArrayLength((-- obj0.prop0));
      strvar6 = strvar0[2%strvar0.length];
      strvar5 = (strvar3).replace(strvar3, 'Ã!'+'qÄ'+'U*' + 'é%') + argMath111;
      return protoObj1.prop1;
    }
  }
  var reResult0='%$'+'º{'+'%Ã' + 'ûÛ'.search(/(?=\\B.)/imy);
  return (typeof(((strvar7).replace(/a/g, ('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%'))).replace((strvar7).replace(/a/g, ('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%')), strvar6))  == 'boolean') ;
};`,
    `function* qegv() {
  ;(null);
  debugger
  let [] = (((yield* ((yield)))));
  do debugger; while ((null))
}
for (new ((dieqffaqtlfrca = ((((true))).yield **= ((eval)))))(((new (((++(/M^\u4afE\ufDeB$/gm).y)))((jetkknpsm))))).void in (rlil = ((false.prototype)))) var [...[]] = (((""))), sdsukajfdph, kgiujhouegnpnm = function pjsoeexyswiv([], ...{}) {
  for (;;) ;
  {}
  for (var q of ((/\\B/gim))) ;
}, [i, , , ...{}] = (({[((5192))]() {
  "use strict"
}, eval, [/\u1312+?/mu]: (2e308), set [(2e308)] ([]) {
}}));`,
    `var func3 = function(argMath113,argMath114,argMath115,argMath116 = (argMath115 + argMath113)){
  if((func2.call(arrObj0 , strvar1, ary) && (~ -2147483648))) {
  }
  else {
    return a;
    strvar4 = strvar5[5%strvar5.length];
  }
  return (((- (f64[(68) & 255] ? argMath115 : argMath115)) !== (func0.call(litObj1 , func1.call(protoObj0 , (new func2(strvar4,ary)).prop1 , litObj1, /(?:\\s{1,5})/m), arguments[(0)]) ? f64[(68) & 255] : (argMath115 + argMath113))) instanceof ((typeof Error == 'function' ) ? Error : Object));
};
var func4 = function(){
  obj1.prop0 |=(c != d);
  func2.call(arrObj0 , strvar7, ary);
  func1.call(litObj0 , (arrObj0.prop1 %= (func2.call(protoObj1 , strvar2, ary) ? (322427898 < 222) : arrObj0[(((-1719618252.9 >= 0 ? -1719618252.9 : 0)) & 0XF)])), litObj0, /\w*$/gmy);
  return ((typeof(strvar1)  == 'string')  ? i32[(((new module1BaseClass()) ? (+ ((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object))) : (((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object)) ? ((i16[(195) & 255]) >= (typeof(arrObj0.prop0)  == 'boolean') ) : (-104 + i32[(53) & 255])))) & 255] : ((((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object)) ? ((i16[(195) & 255]) >= (typeof(arrObj0.prop0)  == 'boolean') ) : (-104 + i32[(53) & 255])) ^ (typeof('|' + 'w.e!')  != 'undefined') ));
};`,
    `class DeferredSuperCall extends BaseClass {
  constructor(x) {
    return async() => super(x);
  }
};`,
    `class DeferredSuperProperty extends BaseClass {
  deferredName() { return async() => super.name; }
};`,
    `(function() {
  { function* bar() {} }
})();`,
    `(function() {
  function* x() { yield 1; }
  { function* x() { yield 2 } }
})();`,
    `function listener(event, exec_state, event_data, data) {
  try {
    if (event == Debug.DebugEvent.Break) {
      break_count++;
      listener_called = true;
      listener_delegate(exec_state);
    }
  } catch (e) {
    exception = e;
  }
}`,
    `function BeginTest(name) {
  test_name = name;
  listener_delegate = null;
  listener_called = false;
  exception = null;
  begin_test_count++;
}`,
    `function CheckFastAllScopes(scopes, exec_state)
{
  var fast_all_scopes = exec_state.frame().allScopes(true);
  var length = fast_all_scopes.length;
  assertTrue(scopes.length >= length);
  for (var i = 0; i < scopes.length && i < length; i++) {
    var scope = fast_all_scopes[length - i - 1];
    assertEquals(scopes[scopes.length - i - 1], scope.scopeType());
  }
}`,
    `function CheckScopeChain(scopes, exec_state) {
  var all_scopes = exec_state.frame().allScopes();
  assertEquals(scopes.length, exec_state.frame().scopeCount());
  assertEquals(scopes.length, all_scopes.length,
               "FrameMirror.allScopes length");
  for (var i = 0; i < scopes.length; i++) {
    var scope = exec_state.frame().scope(i);
    assertEquals(scopes[i], scope.scopeType());
    assertScopeMirrorEquals(all_scopes[i], scope);
  }
  CheckFastAllScopes(scopes, exec_state);
}
// Check that the scope chain contains the expected names of scopes.
function CheckScopeChainNames(names, exec_state) {
  var all_scopes = exec_state.frame().allScopes();
  assertEquals(names.length, all_scopes.length, "FrameMirror.allScopes length");
  for (var i = 0; i < names.length; i++) {
    var scope = exec_state.frame().scope(i);
    // assertEquals(names[i], scope.details().name())
  }
}
`,
    `function local_4(a, b) {
  var x = 3;
  var y = 4;
  debugger;
}`,
    `function closure_1(a) {
  function f() {
    debugger;
    return a;
  };
  return f;
}`,
    `function closure_2(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    return a + x;
  };
  return f;
}`,
    `function closure_3(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    return a + b + x + y;
  };
  return f;
}`,
    `function closure_4(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    if (f) {
      return a + b + x + y;
    }
  };
  return f;
}`,
    `let some_global;
function closure_6(a, b) {
  function f(a, b) {
    var x = 3;
    var y = 4;
    return function() {
      var x = 3;
      var y = 4;
      debugger;
      some_global = a;
      return f;
    };
  }
  return f(a, b);
}
`,
    `function closure_7(a, b) {
  var x = 3;
  var y = 4;
  eval('var i = 5');
  eval('var j = 6');
  function f(a, b) {
    var x = 3;
    var y = 4;
    eval('var i = 5');
    eval('var j = 6');
    return function() {
      debugger;
      some_global = a;
      return f;
    };
  }
  return f(a, b);
}`,
    `(function() {
  "use strict";
  class C1 {
    m() {
      debugger;
    }
  }
  new C1().m();
})();`,
    `function with_2() {
  with({}) {
    with({}) {
      debugger;
    }
  }
}`,
    `function with_3() {
  with({a:1,b:2}) {
    debugger;
  }
}`,
    `function with_4() {
  with({a:1,b:2}) {
    with({a:2,b:1}) {
      debugger;
    }
  }
}`,
    `var with_object = {c:3,d:4};
function with_5() {
  with(with_object) {
    with(with_object) {
      debugger;
    }
  }
}`,
    `function closure_2(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    return a + x;
  };
  return f;
}`,
    `function closure_3(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    return a + b + x + y;
  };
  return f;
}`,
    `function closure_4(a, b) {
  var x = a + 2;
  var y = b + 2;
  function f() {
    debugger;
    if (f) {
      return a + b + x + y;
    }
  };
  return f;
}`,
    `function closure_6(a, b) {
  function f(a, b) {
    var x = 3;
    var y = 4;
    return function() {
      var x = 3;
      var y = 4;
      debugger;
      some_global = a;
      return f;
    };
  }
  return f(a, b);
}`,
    `function closure_10(a) {
  var x = a + 2;
  function closure_11(b) {
    debugger;
    return a + b + x;
  }
  [42].forEach(closure_11);
}`,
    `function the_full_monty(a, b) {
  var x = 3;
  var y = 4;
  eval('var i = 5');
  eval('var j = 6');
  function f(a, b) {
    var x = 9;
    var y = 10;
    eval('var i = 11');
    eval('var j = 12');
    with ({j:13}){
      return function() {
        var x = 14;
        with ({a:15}) {
          with ({b:16}) {
            debugger;
            some_global = a;
            return f;
          }
        }
      };
    }
  }
  return f(a, b);
}`,
    `function closure_in_with_2() {
  with({x:1}) {
    (function inner(x) {
      with({x:3}) {
        debugger;
      }
    })(2);
  }
}`,
    `BeginTest("Closure inside With 3");
function createClosure(a) {
   var b = a + 1;
   return function closure() {
     var c = b;
     (function inner(x) {
       with({x:c}) {
         debugger;
       }
     })(2);
   };
}
`,
    `(function TestObjectLiteralPatternInitializers() {
  var { x : x, y : y = 2 } = { x : 1 };
  assertEquals(1, x);
  assertEquals(2, y);
  var {z = 3} = {};
  assertEquals(3, z);
  var sum = 0;
  for (var {z = 3} = {}; z != 0; z--) {
    sum += z;
  }
  assertEquals(6, sum);
  var log = [];
  var o = {
    get x() {
      log.push("x");
      return undefined;
    },
    get y() {
      log.push("y");
      return {
        get z() { log.push("z"); return undefined; }
      }
    }
  };
  var { x : x0 = 0, y : { z : z1 = 1}, x : x1 = 0} = o;
}());`,
    ` let log = [];
let o = {
  get x() {
    log.push("x");
    return undefined;
  },
  get y() {
    log.push("y");
    return {
      get z() { log.push("z"); return undefined; }
    }
  }
};`,
    `(function TestObjectLiteralPatternLexical() {
  'use strict';
  let { x : x, y : y } = { x : 1, y : 2 };
  assertEquals(1, x);
  assertEquals(2, y);
  let {z} = { z : 3 };
  assertEquals(3, z);
  let log = [];
  let o = {
    get x() {
      log.push("x");
      return 0;
    },
    get y() {
      log.push("y");
      return {
        get z() { log.push("z"); return 1; }
      }
    }
  };
  let { x : x0, y : { z : z1 }, x : x1 } = o;
  assertSame(0, x0);
  assertSame(1, z1);
  assertSame(0, x1);
  assertArrayEquals(["x", "y", "z", "x"], log);
  let sum = 0;
  for (let {x, z} = { x : 0, z : 3 }; z != 0; z--) {
    assertEquals(0, x);
    sum += z;
  }
  assertEquals(6, sum);
}());`,
    `(function TestAssignmentExprInInitializers() {
  {
    let x, y;
    {
      let { x = y = 1 } = {};
      assertSame(x, 1);
      assertSame(y, 1);
    }
    assertSame(undefined, x);
    assertSame(1, y);
  }
  {
    let x, y;
    {
      let { x: x = y = 1 } = {};
      assertSame(1, x);
      assertSame(1, y);
    }
    assertSame(undefined, x);
    assertSame(1, y);
  }
  {
    let x, y;
    {
      let [ x = y = 1 ] = [];
      assertSame(1, x);
      assertSame(1, y);
    }
    assertSame(undefined, x);
    assertSame(1, y);
  }
  {
    let x, y;
    (function({ x = y = 1 }) {}({}));
    assertSame(undefined, x);
    assertSame(1, y);
  }
  {
    let x, y;
    (function({ x: x = y = 1 }) {}({}));
    assertSame(undefined, x);
    assertSame(1, y);
  }
  {
    let x, y;
    (function([ x = y = 1 ]) {}([]));
    assertSame(undefined, x);
    assertSame(1, y);
  }
}());`,
    `async function testReleaseObject() {
  await Protocol.Runtime.evaluate({ expression: 'var a = {x:3};', callFrameId });
  await Protocol.Runtime.evaluate({ expression: 'var b = {x:4};', callFrameId });
  const ids = [];
  let result = await Protocol.Runtime.evaluate({ expression: 'a', callFrameId });
  const id1 = result.result.result.objectId;
  ids.push(id1);
  result = await Protocol.Runtime.evaluate({ expression: 'b', callFrameId });
  const id2 = result.result.result.objectId;
  ids.push(id2);
  // Call Function on both objects and log:
  await objectGroupHelper(ids);
  Protocol.Runtime.releaseObject({ objectId: id1 });
  await objectGroupHelper(ids);
  Protocol.Runtime.releaseObject({ objectId: id2 });
  await objectGroupHelper(ids);
}`,
    ` async function evalAndLog(expression, callFrameId, returnByValue) {
  const result = await Protocol.Debugger.evaluateOnCallFrame({ expression, callFrameId, returnByValue });
  InspectorTest.logMessage(result);
}
// Helper function that calls a function on all objects with ids in objectIds, then returns
async function objectGroupHelper(objectIds) {
  return new Promise(async resolve => {
    for (let objectId of objectIds) {
      const result = await Protocol.Runtime.callFunctionOn({ objectId, functionDeclaration: 'function(){ return this;}' });
      InspectorTest.logMessage(result);
    }
    resolve();
  });
}`,
    `InspectorTest.runAsyncTestSuite([
  async function testFunctionCallAsArgument() {
    await testExpression('foo2(foo1())');
  },
  async function testFunctionCallAsArgument() {
    await testExpression('foo2(foo1());');
  },
  async function testFunctionCallAsArguments() {
    await testExpression('foo3(foo1(), foo2());');
  },
  async function testFunctionCallInBinaryExpression() {
    await testExpression('foo3(foo1() + foo2());');
  },
]);`,
    `indentation = count === 7 ? "       " : " ".repeat(count)`,
    `function init() {
  function isREPL() {
    if (argv.length !== 1) {
      return false
    }
    if (isPreloaded()) {
      return true
    }
    return rootModule.id === "<repl>" &&
      rootModule.filename === null &&
      rootModule.loaded === false &&
      rootModule.parent == null &&
      hasLoaderModule(rootModule.children)
  }
  return isREPL
}`,
    `function init() {
  const ArrayProto = Array.prototype
  const SafeProto = SafeArray.prototype
  return {
    concat: unapply(SafeProto.concat),
    from: SafeArray.from,
    indexOf: unapply(ArrayProto.indexOf),
    join: unapply(ArrayProto.join),
    of: SafeArray.of,
    push: unapply(ArrayProto.push),
    unshift: unapply(ArrayProto.unshift)
  }
}
`,
    `function init() {
  return {
    bind: unapply(Function.prototype.bind)
  }
}`,
    `class OwnProxy {
  constructor(target, handler) {
    const maskedHandler = { __proto__: handler }
    const proxy = new Proxy(target, maskedHandler)
    setPrototypeOf(handler, null)
    for (const name in handler) {
      toExternalFunction(handler[name])
    }
    Reflect.defineProperty(maskedHandler, shared.customInspectKey, customInspectDescriptor)
    Reflect.defineProperty(maskedHandler, shared.symbol.proxy, markerDescriptor)
    OwnProxy.instances.set(proxy, [target, maskedHandler])
    const emptyHandler = {}
    const decoyProxy = new Proxy(proxy, emptyHandler)
    OwnProxy.instances.set(decoyProxy, [proxy, emptyHandler])
    return decoyProxy
  }
}`,
    ` const map = new Map([
  ["fs", [
    // Used for faster directory, file, and existence checks.
    "internalModuleStat",
    "realpath"
  ]],
  ["inspector", [
    "consoleCall"
  ]],
  ["natives",
    void 0
  ],
  ["util", [
    // Used as the stack trace decoration indicator in Node 7+.
    "decorated_private_symbol",
    // Used to get the unwrapped object and proxy handler.
    "getProxyDetails",
    // Used for more secure environment variable retrieval in Node 10+.
    "safeGetenv",
    // Used to decorate stack traces until
    // https://github.com/nodejs/node/pull/23926 is merged.
    "setHiddenValue"
  ]]
])`,
    `function create(prototype, properties) {
  prototype = prototype === null ? null : Object(prototype)
  const result = Object.create(prototype)
  return properties == null ? result : Object.assign(result, properties)
}`,
    `function defaultTo(value, defaultValue) {
  return (value == null || value !== value) ? defaultValue : value
}`,
    `function defer(func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, 1, ...args)
}`,
    `function dropWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true)
    : []
}`,
    `function groupBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      baseAssignValue(result, key, [value])
    }
    return result
  }, {})
}`,
    `function over(iteratees) {
  return function(...args) {
    return map(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}`,
    `map(['a[2]', 'c[0]'], propertyOf(object))`,
    `map([a[2], c[0]], propertyOf(object))`,
    `size({ 'a': 1, 'b': 2 })`,
    `function size(collection) {
  if (collection == null) {
    return 0
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length
  }
  const tag = getTag(collection)
  if (tag == mapTag || tag == setTag) {
    return collection.size
  }
  return Object.keys(collection).length
}`,
    `function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0
  if (!limit) {
    return []
  }
  if (string && (
        typeof separator == 'string' ||
        (separator != null && !isRegExp(separator))
      )) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit)
    }
  }
  return string.split(separator, limit)
}`,
    `const zipped = zip([1, 2], [10, 20], [100, 200])`,
    `a => [[1, 10, 100], [2, 20, 200]]`,
    `a => ({ 'a': 1, 'b': 2 })`,
    `async a => [[1, 10, 100], [2, 20, 200]]`,
    `async a => ({ 'a': 1, 'b': 2 })`,
    `async a => [[1, 10, 100], [2, 20, 200]]`,
    `async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]`,
    `async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]`,
    `async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => ({ 'a': 1, 'b': 2 })
 a => ({ 'a': 1, 'b': 2 })
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]
 async a => [[1, 10, 100], [2, 20, 200]]`,
    `baseZipObject(props || [], values || [], assignValue)`,
    `a => [3]`,
    `async a => [3]`,
    `function uniq(array) {
  return (array != null && array.length)
    ? baseUniq(array)
    : []
}`,
    `function a() { n(); };
function b() { c(); };
function c() { n(); };
function d() { x = 1; try { e(); } catch(x) { x = 2; } };
function e() { n(); };
function f() { x = 1; try { g(); } catch(x) { x = 2; } };
function g() { h(); };
function h() { x = 1; throw 1; };`,
    `(async function test() {
  Protocol.Debugger.enable();
  Protocol.Debugger.setBreakpointByUrl({
    lineNumber: 1,
    url: 'main'
  });
  contextGroup.addModule(utilsModule, 'utils');
  contextGroup.addModule(mainModule, 'main');
  const { params: { callFrames } } = await Protocol.Debugger.oncePaused();
  const result = await Protocol.Debugger.evaluateOnCallFrame({
    callFrameId: callFrames[0].callFrameId,
    expression: identity(0)
  });
})()`,
    `async function grumpy() {
  let {
  params: { callFrames: callFrames0 }
} = await Protocol.Debugger.oncePaused(); // inside foo()
}`,
    `new BenchmarkSuite('Babel', [1000], [
  new Benchmark('Babel', false, false, 0, Babel),
]);`,
    `function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError('dd');
  }
  return call && (typeof call === 'object' || typeof call === 'function') ?
      call :
      self;
}`,
    `function call3() {
  var alias = g;
  debugger;
  var r = 10 + alias.call(null, 3);
  var aLocalVar = 'test';
  var anotherLocalVar  = g(aLocalVar) + 's';
  var yetAnotherLocal = 10;
}`,
    `function call4() {
  var alias = g;
  debugger;
  alias.call(null, 3);
  var aLocalVar = 'test';
  var anotherLocalVar  = g(aLocalVar) + 's';
  var yetAnotherLocal = 10;
}
// Test step into function apply from a function without local variables.
function apply1() {
  debugger;
  g.apply(null, [3]);
}`,
    `var testFunctions =
[call1, call2, call3, call4, apply1, apply2, apply3, apply4, bind1,
applyAndBind1];
for (var i = 0; i < testFunctions.length; i++) {
state = 0;
testFunctions[i]();
assertNull(exception);
assertEquals(3, state);
}`,
    ` var obj, newObj;
if (Constructor === Intl.NumberFormat) {
  obj = new Constructor();
  newObj = Intl.NumberFormat.call(obj);
  if (obj !== newObj) {
    $ERROR("Should have modified existing object.");
  }
  var key = Object.getOwnPropertySymbols(newObj)[0];
  if (!(newObj[key] instanceof Intl.NumberFormat)) {
    $ERROR("Should have installed a NumberFormat instance.");
  }
}`,
    `// Header declaration constants
var kWasmH0 = 0;
var kWasmH1 = 0x61;
var kWasmH2 = 0x73;
var kWasmH3 = 0x6d;
var kWasmV0 = 0x1;
var kWasmV1 = 0;
var kWasmV2 = 0;
var kWasmV3 = 0;
var kHeaderSize = 8;
var kPageSize = 65536;
var kSpecMaxPages = 65535;
var kMaxVarInt32Size = 5;
var kMaxVarInt64Size = 10;
let kDeclNoLocals = 0;
// Section declaration constants
let kUnknownSectionCode = 0;
let kTypeSectionCode = 1;        // Function signature declarations
let kImportSectionCode = 2;      // Import declarations
let kFunctionSectionCode = 3;    // Function declarations
let kTableSectionCode = 4;       // Indirect function table and other tables
let kMemorySectionCode = 5;      // Memory attributes
let kGlobalSectionCode = 6;      // Global declarations
let kExportSectionCode = 7;      // Exports
let kStartSectionCode = 8;       // Start function declaration
let kElementSectionCode = 9;     // Elements section
let kCodeSectionCode = 10;       // Function code
let kDataSectionCode = 11;       // Data segments
let kDataCountSectionCode = 12;  // Data segment count (between Element & Code)
let kExceptionSectionCode = 13;  // Exception section (between Global & Export)
// Name section types
let kModuleNameCode = 0;
let kFunctionNamesCode = 1;
let kLocalNamesCode = 2;
let kWasmFunctionTypeForm = 0x60;
let kWasmAnyFunctionTypeForm = 0x70;
let kHasMaximumFlag = 1;
let kSharedHasMaximumFlag = 3;
// Segment flags
let kActiveNoIndex = 0;
let kPassive = 1;
let kActiveWithIndex = 2;
// Function declaration flags
let kDeclFunctionName   = 0x01;
let kDeclFunctionImport = 0x02;
let kDeclFunctionLocals = 0x04;
let kDeclFunctionExport = 0x08;
// Local types
let kWasmStmt = 0x40;
let kWasmI32 = 0x7f;
let kWasmI64 = 0x7e;
let kWasmF32 = 0x7d;
let kWasmF64 = 0x7c;
let kWasmS128 = 0x7b;
let kWasmAnyRef = 0x6f;
let kWasmAnyFunc = 0x70;
let kWasmExceptRef = 0x68;
let kExternalFunction = 0;
let kExternalTable = 1;
let kExternalMemory = 2;
let kExternalGlobal = 3;
let kExternalException = 4;
let kTableZero = 0;
let kMemoryZero = 0;
let kSegmentZero = 0;
let kExceptionAttribute = 0;
// Useful signatures
let kSig_i_i = makeSig([kWasmI32], [kWasmI32]);
let kSig_l_l = makeSig([kWasmI64], [kWasmI64]);
let kSig_i_l = makeSig([kWasmI64], [kWasmI32]);
let kSig_i_ii = makeSig([kWasmI32, kWasmI32], [kWasmI32]);
let kSig_i_iii = makeSig([kWasmI32, kWasmI32, kWasmI32], [kWasmI32]);
let kSig_v_iiii = makeSig([kWasmI32, kWasmI32, kWasmI32, kWasmI32], []);
let kSig_f_ff = makeSig([kWasmF32, kWasmF32], [kWasmF32]);
let kSig_d_dd = makeSig([kWasmF64, kWasmF64], [kWasmF64]);
let kSig_l_ll = makeSig([kWasmI64, kWasmI64], [kWasmI64]);
let kSig_i_dd = makeSig([kWasmF64, kWasmF64], [kWasmI32]);
let kSig_v_v = makeSig([], []);
let kSig_i_v = makeSig([], [kWasmI32]);
let kSig_l_v = makeSig([], [kWasmI64]);
let kSig_f_v = makeSig([], [kWasmF32]);
let kSig_d_v = makeSig([], [kWasmF64]);
let kSig_v_i = makeSig([kWasmI32], []);
let kSig_v_ii = makeSig([kWasmI32, kWasmI32], []);
let kSig_v_iii = makeSig([kWasmI32, kWasmI32, kWasmI32], []);
let kSig_v_l = makeSig([kWasmI64], []);
let kSig_v_d = makeSig([kWasmF64], []);
let kSig_v_dd = makeSig([kWasmF64, kWasmF64], []);
let kSig_v_ddi = makeSig([kWasmF64, kWasmF64, kWasmI32], []);
let kSig_ii_v = makeSig([], [kWasmI32, kWasmI32]);
let kSig_iii_v = makeSig([], [kWasmI32, kWasmI32, kWasmI32]);
let kSig_ii_i = makeSig([kWasmI32], [kWasmI32, kWasmI32]);
let kSig_iii_i = makeSig([kWasmI32], [kWasmI32, kWasmI32, kWasmI32]);
let kSig_ii_ii = makeSig([kWasmI32, kWasmI32], [kWasmI32, kWasmI32]);
let kSig_iii_ii = makeSig([kWasmI32, kWasmI32], [kWasmI32, kWasmI32, kWasmI32]);
let kSig_v_f = makeSig([kWasmF32], []);
let kSig_f_f = makeSig([kWasmF32], [kWasmF32]);
let kSig_f_d = makeSig([kWasmF64], [kWasmF32]);
let kSig_d_d = makeSig([kWasmF64], [kWasmF64]);
let kSig_r_r = makeSig([kWasmAnyRef], [kWasmAnyRef]);
let kSig_a_a = makeSig([kWasmAnyFunc], [kWasmAnyFunc]);
let kSig_i_r = makeSig([kWasmAnyRef], [kWasmI32]);
let kSig_v_r = makeSig([kWasmAnyRef], []);
let kSig_v_a = makeSig([kWasmAnyFunc], []);
let kSig_v_rr = makeSig([kWasmAnyRef, kWasmAnyRef], []);
let kSig_r_v = makeSig([], [kWasmAnyRef]);
let kSig_a_v = makeSig([], [kWasmAnyFunc]);
function makeSig(params, results) {
  return {params: params, results: results};
}
function makeSig_v_x(x) {
  return makeSig([x], []);
}
function makeSig_v_xx(x) {
  return makeSig([x, x], []);
}
function makeSig_r_v(r) {
  return makeSig([], [r]);
}
function makeSig_r_x(r, x) {
  return makeSig([x], [r]);
}
function makeSig_r_xx(r, x) {
  return makeSig([x, x], [r]);
}
// Opcodes
let kExprUnreachable = 0x00;
let kExprNop = 0x01;
let kExprBlock = 0x02;
let kExprLoop = 0x03;
let kExprIf = 0x04;
let kExprElse = 0x05;
let kExprTry = 0x06;
let kExprCatch = 0x07;
let kExprThrow = 0x08;
let kExprRethrow = 0x09;
let kExprBrOnExn = 0x0a;
let kExprEnd = 0x0b;
let kExprBr = 0x0c;
let kExprBrIf = 0x0d;
let kExprBrTable = 0x0e;
let kExprReturn = 0x0f;
let kExprCallFunction = 0x10;
let kExprCallIndirect = 0x11;
let kExprReturnCall = 0x12;
let kExprReturnCallIndirect = 0x13;
let kExprDrop = 0x1a;
let kExprSelect = 0x1b;
let kExprGetLocal = 0x20;
let kExprSetLocal = 0x21;
let kExprTeeLocal = 0x22;
let kExprGetGlobal = 0x23;
let kExprSetGlobal = 0x24;
let kExprGetTable = 0x25;
let kExprSetTable = 0x26;
let kExprI32LoadMem = 0x28;
let kExprI64LoadMem = 0x29;
let kExprF32LoadMem = 0x2a;
let kExprF64LoadMem = 0x2b;
let kExprI32LoadMem8S = 0x2c;
let kExprI32LoadMem8U = 0x2d;
let kExprI32LoadMem16S = 0x2e;
let kExprI32LoadMem16U = 0x2f;
let kExprI64LoadMem8S = 0x30;
let kExprI64LoadMem8U = 0x31;
let kExprI64LoadMem16S = 0x32;
let kExprI64LoadMem16U = 0x33;
let kExprI64LoadMem32S = 0x34;
let kExprI64LoadMem32U = 0x35;
let kExprI32StoreMem = 0x36;
let kExprI64StoreMem = 0x37;
let kExprF32StoreMem = 0x38;
let kExprF64StoreMem = 0x39;
let kExprI32StoreMem8 = 0x3a;
let kExprI32StoreMem16 = 0x3b;
let kExprI64StoreMem8 = 0x3c;
let kExprI64StoreMem16 = 0x3d;
let kExprI64StoreMem32 = 0x3e;
let kExprMemorySize = 0x3f;
let kExprMemoryGrow = 0x40;
let kExprI32Const = 0x41;
let kExprI64Const = 0x42;
let kExprF32Const = 0x43;
let kExprF64Const = 0x44;
let kExprI32Eqz = 0x45;
let kExprI32Eq = 0x46;
let kExprI32Ne = 0x47;
let kExprI32LtS = 0x48;
let kExprI32LtU = 0x49;
let kExprI32GtS = 0x4a;
let kExprI32GtU = 0x4b;
let kExprI32LeS = 0x4c;
let kExprI32LeU = 0x4d;
let kExprI32GeS = 0x4e;
let kExprI32GeU = 0x4f;
let kExprI64Eqz = 0x50;
let kExprI64Eq = 0x51;
let kExprI64Ne = 0x52;
let kExprI64LtS = 0x53;
let kExprI64LtU = 0x54;
let kExprI64GtS = 0x55;
let kExprI64GtU = 0x56;
let kExprI64LeS = 0x57;
let kExprI64LeU = 0x58;
let kExprI64GeS = 0x59;
let kExprI64GeU = 0x5a;
let kExprF32Eq = 0x5b;
let kExprF32Ne = 0x5c;
let kExprF32Lt = 0x5d;
let kExprF32Gt = 0x5e;
let kExprF32Le = 0x5f;
let kExprF32Ge = 0x60;
let kExprF64Eq = 0x61;
let kExprF64Ne = 0x62;
let kExprF64Lt = 0x63;
let kExprF64Gt = 0x64;
let kExprF64Le = 0x65;
let kExprF64Ge = 0x66;
let kExprI32Clz = 0x67;
let kExprI32Ctz = 0x68;
let kExprI32Popcnt = 0x69;
let kExprI32Add = 0x6a;
let kExprI32Sub = 0x6b;
let kExprI32Mul = 0x6c;
let kExprI32DivS = 0x6d;
let kExprI32DivU = 0x6e;
let kExprI32RemS = 0x6f;
let kExprI32RemU = 0x70;
let kExprI32And = 0x71;
let kExprI32Ior = 0x72;
let kExprI32Xor = 0x73;
let kExprI32Shl = 0x74;
let kExprI32ShrS = 0x75;
let kExprI32ShrU = 0x76;
let kExprI32Rol = 0x77;
let kExprI32Ror = 0x78;
let kExprI64Clz = 0x79;
let kExprI64Ctz = 0x7a;
let kExprI64Popcnt = 0x7b;
let kExprI64Add = 0x7c;
let kExprI64Sub = 0x7d;
let kExprI64Mul = 0x7e;
let kExprI64DivS = 0x7f;
let kExprI64DivU = 0x80;
let kExprI64RemS = 0x81;
let kExprI64RemU = 0x82;
let kExprI64And = 0x83;
let kExprI64Ior = 0x84;
let kExprI64Xor = 0x85;
let kExprI64Shl = 0x86;
let kExprI64ShrS = 0x87;
let kExprI64ShrU = 0x88;
let kExprI64Rol = 0x89;
let kExprI64Ror = 0x8a;
let kExprF32Abs = 0x8b;
let kExprF32Neg = 0x8c;
let kExprF32Ceil = 0x8d;
let kExprF32Floor = 0x8e;
let kExprF32Trunc = 0x8f;
let kExprF32NearestInt = 0x90;
let kExprF32Sqrt = 0x91;
let kExprF32Add = 0x92;
let kExprF32Sub = 0x93;
let kExprF32Mul = 0x94;
let kExprF32Div = 0x95;
let kExprF32Min = 0x96;
let kExprF32Max = 0x97;
let kExprF32CopySign = 0x98;
let kExprF64Abs = 0x99;
let kExprF64Neg = 0x9a;
let kExprF64Ceil = 0x9b;
let kExprF64Floor = 0x9c;
let kExprF64Trunc = 0x9d;
let kExprF64NearestInt = 0x9e;
let kExprF64Sqrt = 0x9f;
let kExprF64Add = 0xa0;
let kExprF64Sub = 0xa1;
let kExprF64Mul = 0xa2;
let kExprF64Div = 0xa3;
let kExprF64Min = 0xa4;
let kExprF64Max = 0xa5;
let kExprF64CopySign = 0xa6;
let kExprI32ConvertI64 = 0xa7;
let kExprI32SConvertF32 = 0xa8;
let kExprI32UConvertF32 = 0xa9;
let kExprI32SConvertF64 = 0xaa;
let kExprI32UConvertF64 = 0xab;
let kExprI64SConvertI32 = 0xac;
let kExprI64UConvertI32 = 0xad;
let kExprI64SConvertF32 = 0xae;
let kExprI64UConvertF32 = 0xaf;
let kExprI64SConvertF64 = 0xb0;
let kExprI64UConvertF64 = 0xb1;
let kExprF32SConvertI32 = 0xb2;
let kExprF32UConvertI32 = 0xb3;
let kExprF32SConvertI64 = 0xb4;
let kExprF32UConvertI64 = 0xb5;
let kExprF32ConvertF64 = 0xb6;
let kExprF64SConvertI32 = 0xb7;
let kExprF64UConvertI32 = 0xb8;
let kExprF64SConvertI64 = 0xb9;
let kExprF64UConvertI64 = 0xba;
let kExprF64ConvertF32 = 0xbb;
let kExprI32ReinterpretF32 = 0xbc;
let kExprI64ReinterpretF64 = 0xbd;
let kExprF32ReinterpretI32 = 0xbe;
let kExprF64ReinterpretI64 = 0xbf;
let kExprI32SExtendI8 = 0xc0;
let kExprI32SExtendI16 = 0xc1;
let kExprI64SExtendI8 = 0xc2;
let kExprI64SExtendI16 = 0xc3;
let kExprI64SExtendI32 = 0xc4;
let kExprRefNull = 0xd0;
let kExprRefIsNull = 0xd1;
let kExprRefFunc = 0xd2;
// Prefix opcodes
let kNumericPrefix = 0xfc;
let kSimdPrefix = 0xfd;
let kAtomicPrefix = 0xfe;
// Numeric opcodes.
let kExprMemoryInit = 0x08;
let kExprDataDrop = 0x09;
let kExprMemoryCopy = 0x0a;
let kExprMemoryFill = 0x0b;
let kExprTableInit = 0x0c;
let kExprElemDrop = 0x0d;
let kExprTableCopy = 0x0e;
// Atomic opcodes.
let kExprAtomicNotify = 0x00;
let kExprI32AtomicWait = 0x01;
let kExprI64AtomicWait = 0x02;
let kExprI32AtomicLoad = 0x10;
let kExprI32AtomicLoad8U = 0x12;
let kExprI32AtomicLoad16U = 0x13;
let kExprI32AtomicStore = 0x17;
let kExprI32AtomicStore8U = 0x19;
let kExprI32AtomicStore16U = 0x1a;
let kExprI32AtomicAdd = 0x1e;
let kExprI32AtomicAdd8U = 0x20;
let kExprI32AtomicAdd16U = 0x21;
let kExprI32AtomicSub = 0x25;
let kExprI32AtomicSub8U = 0x27;
let kExprI32AtomicSub16U = 0x28;
let kExprI32AtomicAnd = 0x2c;
let kExprI32AtomicAnd8U = 0x2e;
let kExprI32AtomicAnd16U = 0x2f;
let kExprI32AtomicOr = 0x33;
let kExprI32AtomicOr8U = 0x35;
let kExprI32AtomicOr16U = 0x36;
let kExprI32AtomicXor = 0x3a;
let kExprI32AtomicXor8U = 0x3c;
let kExprI32AtomicXor16U = 0x3d;
let kExprI32AtomicExchange = 0x41;
let kExprI32AtomicExchange8U = 0x43;
let kExprI32AtomicExchange16U = 0x44;
let kExprI32AtomicCompareExchange = 0x48;
let kExprI32AtomicCompareExchange8U = 0x4a;
let kExprI32AtomicCompareExchange16U = 0x4b;
let kExprI64AtomicLoad = 0x11;
let kExprI64AtomicLoad8U = 0x14;
let kExprI64AtomicLoad16U = 0x15;
let kExprI64AtomicLoad32U = 0x16;
let kExprI64AtomicStore = 0x18;
let kExprI64AtomicStore8U = 0x1b;
let kExprI64AtomicStore16U = 0x1c;
let kExprI64AtomicStore32U = 0x1d;
let kExprI64AtomicAdd = 0x1f;
let kExprI64AtomicAdd8U = 0x22;
let kExprI64AtomicAdd16U = 0x23;
let kExprI64AtomicAdd32U = 0x24;
let kExprI64AtomicSub = 0x26;
let kExprI64AtomicSub8U = 0x29;
let kExprI64AtomicSub16U = 0x2a;
let kExprI64AtomicSub32U = 0x2b;
let kExprI64AtomicAnd = 0x2d;
let kExprI64AtomicAnd8U = 0x30;
let kExprI64AtomicAnd16U = 0x31;
let kExprI64AtomicAnd32U = 0x32;
let kExprI64AtomicOr = 0x34;
let kExprI64AtomicOr8U = 0x37;
let kExprI64AtomicOr16U = 0x38;
let kExprI64AtomicOr32U = 0x39;
let kExprI64AtomicXor = 0x3b;
let kExprI64AtomicXor8U = 0x3e;
let kExprI64AtomicXor16U = 0x3f;
let kExprI64AtomicXor32U = 0x40;
let kExprI64AtomicExchange = 0x42;
let kExprI64AtomicExchange8U = 0x45;
let kExprI64AtomicExchange16U = 0x46;
let kExprI64AtomicExchange32U = 0x47;
let kExprI64AtomicCompareExchange = 0x49
let kExprI64AtomicCompareExchange8U = 0x4c;
let kExprI64AtomicCompareExchange16U = 0x4d;
let kExprI64AtomicCompareExchange32U = 0x4e;
// Simd opcodes.
let kExprF32x4Min = 0x9e;
let kTrapUnreachable          = 0;
let kTrapMemOutOfBounds       = 1;
let kTrapDivByZero            = 2;
let kTrapDivUnrepresentable   = 3;
let kTrapRemByZero            = 4;
let kTrapFloatUnrepresentable = 5;
let kTrapFuncInvalid          = 6;
let kTrapFuncSigMismatch      = 7;
let kTrapTypeError            = 8;
let kTrapUnalignedAccess      = 9;
let kTrapDataSegmentDropped   = 10;
let kTrapElemSegmentDropped   = 11;
let kTrapTableOutOfBounds     = 12;
let kTrapMsgs = [
  "unreachable",
  "memory access out of bounds",
  "divide by zero",
  "divide result unrepresentable",
  "remainder by zero",
  "float unrepresentable in integer range",
  "invalid index into function table",
  "function signature mismatch",
  "wasm function signature contains illegal type",
  "operation does not support unaligned accesses",
  "data segment has been dropped",
  "element segment has been dropped",
  "table access out of bounds"
];
`,
    `class Binary {
  constructor() {
    this.length = 0;
    this.buffer = new Uint8Array(8192);
  }
  ensure_space(needed) {
    if (this.buffer.length - this.length >= needed) return;
    let new_capacity = this.buffer.length * 2;
    while (new_capacity - this.length < needed) new_capacity *= 2;
    let new_buffer = new Uint8Array(new_capacity);
    new_buffer.set(this.buffer);
    this.buffer = new_buffer;
  }
  trunc_buffer() {
    return new Uint8Array(this.buffer.buffer, 0, this.length);
  }
  reset() {
    this.length = 0;
  }
  emit_u8(val) {
    this.ensure_space(1);
    this.buffer[this.length++] = val;
  }
  emit_u16(val) {
    this.ensure_space(2);
    this.buffer[this.length++] = val;
    this.buffer[this.length++] = val >> 8;
  }
  emit_u32(val) {
    this.ensure_space(4);
    this.buffer[this.length++] = val;
    this.buffer[this.length++] = val >> 8;
    this.buffer[this.length++] = val >> 16;
    this.buffer[this.length++] = val >> 24;
  }
  emit_leb(val, max_len) {
    this.ensure_space(max_len);
    for (let i = 0; i < max_len; ++i) {
      let v = val & 0xff;
      val = val >>> 7;
      if (val == 0) {
        this.buffer[this.length++] = v;
        return;
      }
      this.buffer[this.length++] = v | 0x80;
    }
    throw new Error("Leb value exceeds maximum length of " + max_len);
  }
  emit_u32v(val) {
    this.emit_leb(val, kMaxVarInt32Size);
  }
  emit_u64v(val) {
    this.emit_leb(val, kMaxVarInt64Size);
  }
  emit_bytes(data) {
    this.ensure_space(data.length);
    this.buffer.set(data, this.length);
    this.length += data.length;
  }
  emit_string(string) {
    // When testing illegal names, we pass a byte array directly.
    if (string instanceof Array) {
      this.emit_u32v(string.length);
      this.emit_bytes(string);
      return;
    }
    // This is the hacky way to convert a JavaScript string to a UTF8 encoded
    // string only containing single-byte characters.
    let string_utf8 = unescape(encodeURIComponent(string));
    this.emit_u32v(string_utf8.length);
    for (let i = 0; i < string_utf8.length; i++) {
      this.emit_u8(string_utf8.charCodeAt(i));
    }
  }
  emit_header() {
    this.emit_bytes([
      kWasmH0, kWasmH1, kWasmH2, kWasmH3, kWasmV0, kWasmV1, kWasmV2, kWasmV3
    ]);
  }
  emit_section(section_code, content_generator) {
    // Emit section name.
    this.emit_u8(section_code);
    // Emit the section to a temporary buffer: its full length isn't know yet.
    const section = new Binary;
    content_generator(section);
    // Emit section length.
    this.emit_u32v(section.length);
    // Copy the temporary buffer.
    // Avoid spread because {section} can be huge.
    this.emit_bytes(section.trunc_buffer());
  }
}`,
    `class WasmFunctionBuilder {
  constructor(module, name, type_index) {
    this.module = module;
    this.name = name;
    this.type_index = type_index;
    this.body = [];
    this.locals = [];
    this.local_names = [];
  }
  numLocalNames() {
    let num_local_names = 0;
    for (let loc_name of this.local_names) {
      if (loc_name !== undefined) ++num_local_names;
    }
    return num_local_names;
  }
  exportAs(name) {
    this.module.addExport(name, this.index);
    return this;
  }
  exportFunc() {
    this.exportAs(this.name);
    return this;
  }
  addBody(body) {
    for (let b of body) {
      if (typeof b !== 'number' || (b & (~0xFF)) !== 0 )
        throw new Error('invalid body (entries must be 8 bit numbers): ' + body);
    }
    this.body = body.slice();
    // Automatically add the end for the function block to the body.
    this.body.push(kExprEnd);
    return this;
  }
  addBodyWithEnd(body) {
    this.body = body;
    return this;
  }
  getNumLocals() {
    let total_locals = 0;
    for (let l of this.locals) {
      for (let type of ["i32", "i64", "f32", "f64", "s128"]) {
        total_locals += l[type + "_count"] || 0;
      }
    }
    return total_locals;
  }
  addLocals(locals, names) {
    const old_num_locals = this.getNumLocals();
    this.locals.push(locals);
    if (names) {
      const missing_names = old_num_locals - this.local_names.length;
      this.local_names.push(...new Array(missing_names), ...names);
    }
    return this;
  }
  end() {
    return this.module;
  }
}`,
    `class WasmFunctionBuilder {
  constructor(module, name, type_index) {
    this.module = module;
    this.name = name;
    this.type_index = type_index;
    this.body = [];
    this.locals = [];
    this.local_names = [];
  }
  numLocalNames() {
    let num_local_names = 0;
    for (let loc_name of this.local_names) {
      if (loc_name !== undefined) ++num_local_names;
    }
    return num_local_names;
  }
  exportAs(name) {
    this.module.addExport(name, this.index);
    return this;
  }
  exportFunc() {
    this.exportAs(this.name);
    return this;
  }
  addBody(body) {
    for (let b of body) {
      if (typeof b !== 'number' || (b & (~0xFF)) !== 0 )
        throw new Error('invalid body (entries must be 8 bit numbers): ' + body);
    }
    this.body = body.slice();
    // Automatically add the end for the function block to the body.
    this.body.push(kExprEnd);
    return this;
  }
  addBodyWithEnd(body) {
    this.body = body;
    return this;
  }
  getNumLocals() {
    let total_locals = 0;
    for (let l of this.locals) {
      for (let type of ["i32", "i64", "f32", "f64", "s128"]) {
        total_locals += l[type + "_count"] || 0;
      }
    }
    return total_locals;
  }
  addLocals(locals, names) {
    const old_num_locals = this.getNumLocals();
    this.locals.push(locals);
    if (names) {
      const missing_names = old_num_locals - this.local_names.length;
      this.local_names.push(...new Array(missing_names), ...names);
    }
    return this;
  }
  end() {
    return this.module;
  }
}`,
    `function wasmI32Const(val) {
  let bytes = [kExprI32Const];
  for (let i = 0; i < 4; ++i) {
    bytes.push(0x80 | ((val >> (7 * i)) & 0x7f));
  }
  bytes.push((val >> (7 * 4)) & 0x7f);
  return bytes;
}`,
    `var binaryOperators = [
  [ "*", "/", "%" ], [ "+", "-" ],
  [ "<<", ">>", ">>>" ],
  [ "<", ">", "<=", ">=", "instanceof", "in" ],
  [ "==", "!=", "===", "!==" ],
  [ "&" ], [ "^" ], [ "|" ],
  [ "&&" ], [ "||" ]
];`,
    `for (i = 0; i < binaryOperators.length; ++i) {
  var ops = binaryOperators[i];
  for (j = 0; j < ops.length; ++j) {
      var op = ops[j];
      testLeftAssociativeSame(op, op);
      if (j != 0)
          testLeftAssociativeSame(ops[0], op);
      if (i < binaryOperators.length - 1) {
          var nextOps = binaryOperators[i + 1];
          if (j == 0)
              for (k = 0; k < nextOps.length; ++k)
                  testHigherFirst(op, nextOps[k]);
          else
              testHigherFirst(op, nextOps[0]);
      }
  }
}`,
    `assertThrows(() => { with ({}) { eval("x = 1"); } }, TypeError);`,
    `a = (b = c)`,
    `var x = (function(a,b){ return a + b; }); x(1,2)`,
    ` for (let e of assign_in_stmt) {
  if (skip(++test)) continue;
  var orig = e;
  e = e.replace(/=/g, assign);
  e = e.replace(/E/g, expr);
  e = e.replace(/S/g, stmt);
  var str = main.toString().replace("FUNC_BODY",  e + "; return 0;");
  var asm_source = MODULE_TEMPLATE.toString().replace("FUNC_DECL", str);
  doTest(asm_source, "(" + test + ") " + e);
}`,
    `16 / 2 ** 2`,
    `const a = true || 99   `,
    `var lambdaParenNoArg = async() => x < y;
    var lambdaArgs = async(a, b, c) => a + b + c;`,
    `class MyClass {
      async asyncMethod(a) { return a; }
      async async(a) { return a; }
      async "a"() { return 12; }
      async 0() { return 12; }
      async 3.14() { return 12; }
      async else() { return 12; }
      static async staticAsyncMethod(a) { return a; }
  }`,
    `class MyFourthClass {
      async [x](a) { return a; }
  }`,
    `async function asyncMethod(val, factor) {
      val = val * factor;
      if (val > 0)
           val = await asyncMethod(val, -1);
      return val;
  }`,
    `function rejectedPromiseMethod() {
      return new Promise(function (resolve, reject) {
          reject(Error('My Error'));
      });
  }
  async function rejectAwaitMethod() {
      return await rejectedPromiseMethod();
  }
  async function asyncThrowingMethod() {
      throw 32;
  }
  async function throwAwaitMethod() {
      return await asyncThrowingMethod();
  }`,
    ` async function asyncMethod(x, y, z) {
      var lambdaExp = async(a, b, c) => a * b * c;
      var lambdaResult = await lambdaExp(x, y, z);
      return lambdaResult;
  }`,
    ` async function asyncMethodResolved() {
      let p = new Promise(function (resolve, reject) {
          resolve("resolved");
      });
      return p.then(function (result) {
          return result;
      });
  }
  async function asyncMethodResolvedWithAwait() {
      let p = new Promise(function (resolve, reject) {
          resolve("resolved");
      });
      return await p;
  }
  async function asyncMethodRejected() {
      let p = new Promise(function (resolve, reject) {
          reject("rejected");
      });
      return p.then(function (result) {
          return result;
      });
  }`,
    `async function af1(x) { var y = x; var x = 'b'; return y + x; }`,
    `class B {
      af() {
          return "base";
      }
  }
  class C extends B {
      async af() {
          return super.af() + " derived";
      }
  }`,
    `async function af1(a, b = () => a, c = b) {
      function b() {
          return a;
      }
      var a = 2;
      return [b, c];
  }`,
    `async function af1() {
      return 1;
  }
  async function af2() {
      return 2;
  }
  async function af3() {
      return await af1() + await af2();
  }`,
    `var obj = {
      async af() {
          this.b = await this.a + 10;
          return this;
      },
      a : 1,
      b : 0
  };
  async function af(x) {
      var x = 0;
      with (obj) {
          x = await af();
      }
      return x;
  }`,
    `async function f() {
      await 1;
      await Promise.resolve(1);
  }`,
    `arguments in af`,
    `0, af.arguments`,
    `delete af.arguments`,
    `"caller" in af`,
    `undefined, af.caller`,
    `undefined, Object.getOwnPropertyDescriptor(afstrict, "arguments")`,
    `af = new AsyncFunction('a', 'b', 'c', 'await a; await b; await c;');`,
    `a.Arguments[0] != "summary"`,
    `function x() {
      var sym = Symbol();
      let out = 'nothing';
      var obj = {
          get a() { return 'get a'; },
          set a(v) { out = 'set a'; },
          b() { return 'b'; },
          ['c']() { return 'c'; },
          [sym]() { return 'sym'; },
          async d() { return 'd'; },
          *e() { yield 'e'; },
          get ['f']() { return 'get f'; },
          set ['f'](v) { out = 'set f'; },
          async ['g']() { return 'g'; },
          *['h']() { yield 'h'; },
          async async() { return 'async async'; },
      }
      var obj2 = {
          async() { return 'async'; }
      }
      var obj3 = {
          get async() { return 'get async'; },
          set async(v) { out = 'set async'; }
      }
      var obj4 = {
          *async() { yield 'generator async'; }
      }
      x.y('get a', obj.a, "Simple named getter");
      obj.a = 123;
      x.y('set a', out, "Simple named setter");
      x.y('b', obj.b(), "Simple method");
      x.y('c', obj.c(), "Method with computed property name");
      x.y('sym', obj[sym](), "Method with computed property name (key is not string)");
      assert.isTrue(obj.d() instanceof Promise, "Async method");
      x.y('e', obj.e().next().value, "Generator method");
      x.y('get f', obj.f, "Getter method with computed name");
      obj.f = 123;
      x.y('set f', out, "Setter method with computed name");
      assert.isTrue(obj.g() instanceof Promise, "Async method with computed name");
      x.y('h', obj.h().next().value, "Generator method with computed name");
      assert.isTrue(obj.async() instanceof Promise, "Async method named async");
      x.y('async', obj2.async(), "Method named async");
      x.y('get async', obj3.async, "Getter named async");
      obj3.async = 123;
      x.y('set async', out, "Setter named async");
      x.y('generator async', obj4.async().next().value, "Generator method named async");
    }`,
    `var obj = {
      "s1"() { return "s1"; },
      async "s2"() { return "s2"; },
      * "s3"() { return "s3"; },
      get "s4"() { return "s4"; },
      set "s4"(v) { out = "s4"; },
      0.1() { return 0.1; },
      async 0.2() { return 0.2; },
      * 0.3() { return 0.3; },
      get 0.4() { return 0.4; },
      set 0.4(v) { out = 0.4; },
      123() { return 123; },
      async 456() { return 456; },
      * 789() { yield 789; },
      get 123456() { return 123456; },
      set 123456(v) { out = 123456; },
      while() { return "while"; },
      async else() { return "else"; },
      * if() { return "if"; },
      get catch() { return "catch"; },
      set catch(v) { out = "catch"; },
  }`,
    `var obj = {
      m() {
          function foo() { return 'foo'; }
          return foo();
      }
  }`,
    `function foo() { /* 𢭃 */ }`,
    `function 𢭃() { /* 𢭃 */ }`,
    `function 𢭃(ā,食) { /* 𢭃 */ }`,
    `async function foo() { /* 𢭃 */ }`,
    `async function 𢭃() { /* 𢭃 */ }`,
    `function* 𢭃(ā,食) { /* 𢭃 */ }`,
    `(ā,食) => { /* 𢭃 */ }`,
    `async (ā,食) => { /* 𢭃 */ }`,
    `class 食 extends ā { 母(物) { /* 𢭃 */ } static 父(物) { /* 𢭃 */ } async 妹(物) { /* 𢭃 */ } static async 姉(物) { /* 𢭃 */ } *兄(物) { /* 𢭃 */ } static *耳(物) { /* 𢭃 */ } get 明() { /* 𢭃 */ } set 日(物) { /* 𢭃 */ } }`,
    `class 食 extends ā { 母(物) { /* 𢭃 */ } static 父(物) { /* 𢭃 */ } async 妹(物) { /* 𢭃 */ } static async 姉(物) { /* 𢭃 */ } *兄(物) { /* 𢭃 */ } static *耳(物) { /* 𢭃 */ } get 明() { /* 𢭃 */ } set 日(物) { /* 𢭃 */ } }`,
    `'' + 食`,
    `'' + (async (ā,食) => { /* 𢭃 */ })`,
    `'' + async function 𢭃(ā,食) { /* 𢭃 */ }`,
    `'' + function 𢭃(ā,食) { /* 𢭃 */ }`,
    `(/*ß*/)/*ß*/ => { console.log('b'); }`,
    `x = { async/*ß*/ ['f']/*ß*/()/*ß*/ { console.log('f'); } }`,
    `class ClassTest {
      constructor/*ß*/()/*ß*/ {}
      static /*ß*/a/*ß*/()/*ß*/ {}
      static /*ß*/async/*ß*/ b()/*ß*/ {}
      static /*ß*/*/*ß*/ c/*ß*/()/*ß*/ {}
      static /*ß*/['d']/*ß*/()/*ß*/ {}
      static /*ß*/async /*ß*/['e']/*ß*/()/*ß*/ {}
      static /*ß*/* /*ß*/['f']/*ß*/()/*ß*/ {}
      g/*ß*/()/*ß*/ {}
      async/*ß*/ h/*ß*/()/*ß*/ {}
      */*ß*/ i/*ß*/()/*ß*/ {}
      ['j']/*ß*/()/*ß*/ {}
      async/*ß*/ ['k']/*ß*/()/*ß*/ {}
      * /*ß*/['l']/*ß*/()/*ß*/ {}
    }`,
    `const anonGen = function* (a, b) {}
    function* genFunc () {}
    async function asyncFunc (a) {}
    const anonAsync = async function () { }`,
    `var objectMemberTest  = {
      a/*ß*/() /*ß*/{ console.log('a'); },
      b: /*ß*/()/*ß*/ => { console.log('b'); },
      async/*ß*/ c/*ß*/()/*ß*/ { console.log('c'); },
      */*ß*/ d/*ß*/()/*ß*/ { console.log('d'); },
      ['e']/*ß*/()/*ß*/ { console.log('e'); },
      async/*ß*/ ['f']/*ß*/()/*ß*/ { console.log('f'); },
      */*ß*/ ['g']/*ß*/()/*ß*/ { console.log('g'); },
      get/*ß*/()/*ß*/ { console.log('get'); },
      set/*ß*/()/*ß*/ { console.log('set'); },
      [/]/.exec(']')]/*ß*/()/*ß*/ { console.log('regex'); },
      [(function () { return 'h'})()]/*ß*/()/*ß*/ { console.log('function'); },
    }`,
    `class ClassTest {
      constructor/*ß*/()/*ß*/ {}
      static /*ß*/a/*ß*/()/*ß*/ {}
      static /*ß*/async/*ß*/ b()/*ß*/ {}
      static /*ß*/*/*ß*/ c/*ß*/()/*ß*/ {}
      static /*ß*/['d']/*ß*/()/*ß*/ {}
      static /*ß*/async /*ß*/['e']/*ß*/()/*ß*/ {}
      static /*ß*/* /*ß*/['f']/*ß*/()/*ß*/ {}
      g/*ß*/()/*ß*/ {}
      async/*ß*/ h/*ß*/()/*ß*/ {}
      */*ß*/ i/*ß*/()/*ß*/ {}
      ['j']/*ß*/()/*ß*/ {}
      async/*ß*/ ['k']/*ß*/()/*ß*/ {}
      * /*ß*/['l']/*ß*/()/*ß*/ {}
    }`,
    `async function awaitTests() {
      return {
        [await 'a']/*ß*/()/*ß*/ { console.log("await a"); }
      }
    }
    awaitTests().then(o => {
      for (var i of Object.keys(o)) {
        test(o[i]);
      }
    });
    function * yieldTests() {
      return {
        [yield 'a']/*ß*/()/*ß*/ { console.log("yield a"); }
      }
    }
    var it = yieldTests();
    var last;
    do {
      last = it.next();
    } while (!last.done);
    for (var i of Object.keys(last.value)) {
      test(last.value[i]);
    }`,
    `async function f1() {
      await null;
      throw new Error('error in f1');
  }
  f1();
  async function f2() {
      async function f2a() {
          throw "err";
      }
      async function f2b() {
          try {
              var p = f2a();
          } catch (e) {
              console.log("caught " + e);
          }
      }
      async function f2c() {
          var p = f2a();
      }
      f2b();
      f2c();
  }`,
    `class module1BaseClass { };;
    var obj0 = {};
    var protoObj0 = {};
    var obj1 = {};
    var arrObj0 = {};
    var litObj0 = {prop1: 3.14159265358979};
    var litObj1 = {prop0: 0, prop1: 1};
    var arrObj0 = {};
    var func0 = function(){
      return (new module1BaseClass());
    };
    var func1 = function(){
      function func10 (arg0, arg1) {
        this.prop0 = arg0;
        this.prop2 = arg1;
      }
      var uniqobj32 = new func10(((new module1BaseClass()) ? (protoObj0.prop1 <<= (typeof(obj1.prop0)  == 'boolean') ) : ((++ h) ? ({} instanceof ((typeof EvalError == 'function' && !(EvalError[Symbol.toStringTag] == 'AsyncFunction')) ? EvalError : Object)) : (-1596867654.9 >>> -358240255))),ary[((shouldBailout ? (ary[7] = 'x') : undefined ), 7)]);
      return (typeof(g)  != null) ;
    };
    var func2 = function(argMath179,argMath180 = (new module1BaseClass()),argMath181){
      return ((shouldBailout ? (argMath180 = { valueOf: function() { WScript.Echo('argMath180 valueOf'); return 3; } }, f64[(17) & 255]) : f64[(17) & 255]) * 2);
    };`,
    `var func3 = function(argMath182,argMath183,argMath184 = ((b === argMath182)&&(d <= argMath183))){
      var uniqobj34 = [''];
      var uniqobj35 = uniqobj34[__counter%uniqobj34.length];
      uniqobj35.toString();
      var reResult2=('.*8#^' + '.)1vc5$]').split(/\\b\\S|(?=[蒤7])|(?!\\b.)|(\\S)/imyu,3);
    (Object.defineProperty(arrObj0, 'prop4', {writable: true, enumerable: false, configurable: true }));
      arrObj0.prop4 = (obj1.prop0 = ('method1' in arrObj0));
      return func1.call(obj1 );
    };
    var func4 = function(argMath185,argMath186 = (shouldBailout ? (g = { valueOf: function() { WScript.Echo('g valueOf'); return 3; } }, (i32[(87) & 255] !== (typeof 'caller'))) : (i32[(87) & 255] !== (typeof 'caller'))),argMath187,argMath188){
      LABEL0:
      switch((argMath185 === obj1.prop0)) {
        case ('(h'+'#Y'+':$' + 'g\`'):
        case ('g' + 'n$!ä'):
        case ('!(!fp' + ',w4V;$Ø.'):
          strvar1 = strvar6[3%strvar6.length];
          WScript.Echo('0 = ' + (0));
          break LABEL0;
        default:
    (Object.defineProperty(protoObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
          protoObj0.prop1 = protoObj0.prop0;
          break LABEL0;
        case strvar4:
          var uniqobj36 = {prop0: (typeof(argMath186)  == 'number') , prop1: ((argMath187 != d) - (typeof(argMath187)  == 'number') ), prop2: (typeof (new module1BaseClass()))};
          GiantPrintArray.push('1 = ' + (1));
          break LABEL0;
        case ('.*8#^' + '.)1vc5$]'):
        case ('g' + 'n$!ä'):
          if(shouldBailout){
            return  'somestring'
          }
          GiantPrintArray.push('3 = ' + (3));
          break LABEL0;
        case (new module1BaseClass()):
          argMath185 = ((argMath186 |= ({} instanceof ((typeof Function == 'function' && !(Function[Symbol.toStringTag] == 'AsyncFunction')) ? Function : Object))) * ((argMath186 &= (argMath186 >= obj1.prop1)) + (((typeof(argMath186)  == 'undefined')  * (arguments[((('caller' >= 0 ? 'caller' : 0)) & 0XF)] + ((obj1.prop1 < argMath187) << argMath187))) || ((argMath188 == argMath185)&&(arrObj0.prop1 >= obj0.prop1)))));
          GiantPrintArray.push('4 = ' + (4));
          break LABEL0;
      }
      return 21;
    };`,
    `var func1 = function(){
      class class21 extends module2BaseClass {
        constructor (argMath189){
          super();
          var strvar9 = strvar5;
          strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/4);
          argMath189 = arguments[((shouldBailout ? (arguments[0] = 'x') : undefined ), 0)];
          strvar3 = strvar6 + (7993307.1 * (argMath189 + argMath189));
          strvar9 = 'd'.concat((argMath189 + -462154506.9));
        }
        func6 (argMath190){
          if(shouldBailout){
            return  'somestring'
          }
          var strvar9 = (strvar4 + (arguments[(0)] * (func0.call(aliasOfobj1 ) - arrObj0[((shouldBailout ? (arrObj0[15] = 'x') : undefined ), 15)]))).concat(a);
          var strvar10 = ('J' + 'Ðo!D');
          var uniqobj38 = aliasOfobj1;
          var y = (uniqobj38.length *= ((new module2BaseClass()) * ((true instanceof ((typeof Object == 'function' && !(Object[Symbol.toStringTag] == 'AsyncFunction')) ? Object : Object)) + (uniqobj38.length = ((shouldBailout ? func0 = func0 : 1), func0())))));
          strvar0 = strvar10[0%strvar10.length];
          return -218;
        }
        func7 (argMath191 = ui8[(33) & 255],argMath192 = argMath191,argMath193){
          strvar6 = strvar3[2%strvar3.length];
          litObj0 = protoObj0;
          return -77461066;
          arrObj0.prop1 -=arguments[(10)];
          return import("module0_6970131f-9176-4448-a51d-bed04d11807c.js");
        }
        func8 (){
          protoObj0 = arrObj0;
          f = 'caller';
          strvar2 = strvar7[4%strvar7.length];
          var uniqobj39 = {["33"]: arrObj0[(((((shouldBailout ? (arrObj0[(((Math.abs('caller')) >= 0 ? ( Math.abs('caller')) : 0) & 0xF)] = 'x') : undefined ), Math.abs('caller')) >= 0 ? Math.abs('caller') : 0)) & 0XF)], prop0: (obj1.prop0 %=       (shouldBailout ? func0() : func0())), ["prop2"]: arrObj0[(((arguments[((shouldBailout ? (arguments[1] = 'x') : undefined ), 1)] >= 0 ? arguments[((shouldBailout ? (arguments[1] = 'x') : undefined ), 1)] : 0)) & 0XF)], ["prop3"]: (((~ (obj1.length >>= ((obj0.prop0 /= -443692889) & (new module2BaseClass())))) ? (arguments[(((((shouldBailout ? (arguments[(((ui32[(139) & 255]) >= 0 ? ( ui32[(139) & 255]) : 0) & 0xF)] = 'x') : undefined ), ui32[(139) & 255]) >= 0 ? ui32[(139) & 255] : 0)) & 0XF)] ? (new module2BaseClass()) : 'caller') : (obj1.prop1 = ((arguments[((shouldBailout ? (arguments[14] = 'x') : undefined ), 14)] ? func0.call(protoObj1 ) : (arrObj0.prop1, 2147483650, arrObj0.prop1, e)) > ((typeof(aliasOfobj1.prop1)  == 'string')  * (g - (! obj0.prop1)))))) >= arrObj0[(((65536 >= 0 ? 65536 : 0)) & 0XF)]), prop4: func0.call(litObj0 ), prop5: arrObj0[((shouldBailout ? (arrObj0[18] = 'x') : undefined ), 18)]};
          var uniqobj40 = arrObj0;
    (Object.defineProperty(obj1, 'prop4', {writable: true, enumerable: false, configurable: true }));
          obj1.prop4 = 'caller';
          return -1182621235;
        }
        func9 (){
          strvar2 = strvar0.concat((('gº'+'!:'+'_É' + 'm!').indexOf(strvar0))).concat((-124355308.9 !== protoObj1.prop1)).concat(protoObj0.prop1);
          var fPolyProp = function (o) {
            if (o!==undefined) {
              WScript.Echo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
            }
          };
          fPolyProp(litObj0);
          fPolyProp(litObj1);
          strvar2 = strvar3[2%strvar3.length];
          a =-27;
          a =(++ h);
          return h;
          return h;
        }
        static set func10 (argMath194){
          protoObj1.prop1 =arguments[(0)];
          return 533469720;
        }
        static func11 (argMath195,argMath196,argMath197 = {prop7: 'caller', prop6: ((new Object()) instanceof ((typeof Error == 'function' && !(Error[Symbol.toStringTag] == 'AsyncFunction')) ? Error : Object)), prop5: f32[((((shouldBailout ? func0 = func0 : 1), func0()) ? ((argMath195 = ui8.length) >= ((f < h)||(obj0.prop0 !== obj0.prop0))) : (~ func0.call(arrObj0 )))) & 255], prop4: (argMath196 >= obj1.prop0), ["prop2"]: -1615453233.9, prop1: ((arguments[(((((shouldBailout ? (arguments[(((func0.call(protoObj1 )) >= 0 ? ( func0.call(protoObj1 )) : 0) & 0xF)] = 'x') : undefined ), func0.call(protoObj1 )) >= 0 ? func0.call(protoObj1 ) : 0)) & 0XF)] * ('caller' - ((-0 instanceof ((typeof func0 == 'function' && !(func0[Symbol.toStringTag] == 'AsyncFunction')) ? func0 : Object)) | Object.create({prop0: arguments[((((new func0()).prop1  >= 0 ? (new func0()).prop1  : 0)) & 0XF)], prop1: (typeof(strvar6)  != 'object') , prop2: (f64[(8.54427599454003E+18) & 255] ? (++ obj1.prop0) : (argMath196 * protoObj1.prop1)), prop3: ('caller' * (-127 ? -2121319693 : 134) - (new module2BaseClass())), prop4: (shouldBailout ? (a = { valueOf: function() { WScript.Echo('a valueOf'); return 3; } },     (shouldBailout ? func0() : func0())) :     (shouldBailout ? func0() : func0())), prop5: (typeof(strvar2)  == 'string') })))) <= -690557704), prop0: func0.call(aliasOfobj1 ), 49: arguments[(((((shouldBailout ? (arguments[((((protoObj0.prop0 >= f)) >= 0 ? ( (protoObj0.prop0 >= f)) : 0) & 0xF)] = 'x') : undefined ), (protoObj0.prop0 >= f)) >= 0 ? (protoObj0.prop0 >= f) : 0)) & 0XF)]}){
          obj0.length= makeArrayLength(((function () {;}) instanceof ((typeof Function == 'function' && !(Function[Symbol.toStringTag] == 'AsyncFunction')) ? Function : Object)));
          WScript.Echo(strvar6 !=-216);
          return e;
        }
        static func12 (){
          strvar7 = strvar1[1%strvar1.length];
    (Object.defineProperty(litObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
          litObj1.prop1 = (-2 >> (typeof(aliasOfobj1.prop1)  != 'string') );
          litObj1.prop1 <<=((obj1.prop1 != arrObj0.prop1)||(litObj1.prop1 == f));
    (Object.defineProperty(arrObj0, 'length', {writable: true, enumerable: false, configurable: true }));
          arrObj0.length = makeArrayLength((typeof(litObj1.prop1)  == 'string') );
          var strvar9 = '2®(4X¸G.Ó!£ö!(%';
          strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/1);
          strvar2 = strvar0[2%strvar0.length];
          return arrObj0.prop0;
        }
        static func13 (){
          WScript.Echo(strvar7 >(aliasOfobj1.prop1 < aliasOfobj1.prop1));
          WScript.Echo(strvar5 >=(-67745208 * aliasOfobj1.prop1));
          aliasOfobj1.prop0 ^=g;
          strvar1 = strvar1 + arrObj0[(1)];
          return f;
        }
      }
      return (arrObj0.prop0 ^= (new module2BaseClass()));
    };`,
    `var randomGenerator = function(inputseed) {
      var seed = inputseed;
      return function() {
      // Robert Jenkins' 32 bit integer hash function.
      seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;
      seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
      seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
      seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;
      seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
      };
  };;`,
    `function getRoundValue(n) {
      if(n % 1 == 0) // int number
        return n % 2147483647;
      else // float number
        return n.toFixed(8);
     return n;
    };`,
    `function formatOutput(n) {{
      return n.replace(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/g, function(match) {{return getRoundValue(parseFloat(match));}} );
     }};
     var arrForSpendSomeTime=new Array(0x1000);
     function SpendSomeTime() {
         for(var i=0;i<0x1000;i++) {
             arrForSpendSomeTime[i]=new Array(0x100);
             arrForSpendSomeTime[i][1]=1;
             arrForSpendSomeTime[i][0]=1;
         }
     }`,
    `arrObj0[((((new leaf()).prop0  >= 0 ? (new leaf()).prop0  : 0)) & 0XF)];`,
    `argMath21 = ('caller' ? (d / (argMath19 == 0 ? 1 : argMath19)) : (obj0.length *= parseInt("-0x30B21BF3C578A400")));`,
    `arrObj0.length = makeArrayLength(func0.call(protoObj1 , (d / (argMath19 == 0 ? 1 : argMath19))));`,
    ` var h = -1073741824;
    var strvar0 = ('W' + 'Ù!$X');
    var strvar1 = ('%#'+'ql'+'K,' + '$(');
    var strvar2 = ('!' + 'E5j)');
    var strvar3 = ('¸' + '#Abh');
    var strvar4 = ('ÀI@h<' + '!!ìB-I!=');
    var strvar5 = ('9k'+'))'+'$.' + 'q#');
    var strvar6 = '%!!³Eq.*nñ!k!EC';
    var strvar7 = ('W' + 'Ù!$X');`,
    `ary[ary.length-1] = -87;
    ary.length = makeArrayLength(-8.43866054829988E+18);
    var protoObj0 = Object.create(obj0);
    var protoObj1 = Object.create(obj1);
    this.prop0 = -623292620.9;
    this.prop1 = -1254406185;
    obj0.prop0 = 151;
    obj0.prop1 = 489135893;
    obj0.length = makeArrayLength(-1113295906);
    protoObj0.prop0 = 148;
    protoObj0.prop1 = -605601574;
    protoObj0.length = makeArrayLength(-7.83529505692748E+18);
    obj1.prop0 = -2147483647;
    obj1.prop1 = -244;
    obj1.length = makeArrayLength(-33);
    protoObj1.prop0 = 4294967297;
    protoObj1.prop1 = 741981196;
    protoObj1.length = makeArrayLength(-1149117680);
    arrObj0.prop0 = -7.59667554925958E+18;
    arrObj0.prop1 = -1800363685;
    arrObj0.length = makeArrayLength(1532946252.1);
    obj1.prop4 = 2121304168;
    IntArr0[0] = -1925033017;
    IntArr0[3] = 1;
    IntArr0[1] = -187077332;
    IntArr0[2] = 235;
    VarArr0[4] = 65537;`,
    `     class class4 {
      constructor (argMath61 = obj0.prop1,argMath62,argMath63,...argArr64){
      }
      func41 (argMath65,argMath66 = ary5[(((((shouldBailout ? (ary5[((((arrObj0.prop1 += (-8.70014119023327E+18 + (((new BaseClass()) >>> (new BaseClass())) * (ui8[(90) & 255] * 'caller' - ((protoObj0.prop1 ? obj1.prop0 : 4294967295) instanceof ((typeof obj0.method1 == 'function' && !(obj0.method1[Symbol.toStringTag] == 'AsyncFunction')) ? obj0.method1 : Object))) - (new class2()))))) >= 0 ? ( (arrObj0.prop1 += (-8.70014119023327E+18 + (((new BaseClass()) >>> (new BaseClass())) * (ui8[(90) & 255] * 'caller' - ((protoObj0.prop1 ? obj1.prop0 : 4294967295) instanceof ((typeof obj0.method1 == 'function' && !(obj0.method1[Symbol.toStringTag] == 'AsyncFunction')) ? obj0.method1 : Object))) - (new class2()))))) : 0) & 0xF)] = 'x') : undefined ), (arrObj0.prop1 += (-8.70014119023327E+18 + (((new BaseClass()) >>> (new BaseClass())) * (ui8[(90) & 255] * 'caller' - ((protoObj0.prop1 ? obj1.prop0 : 4294967295) instanceof ((typeof obj0.method1 == 'function' && !(obj0.method1[Symbol.toStringTag] == 'AsyncFunction')) ? obj0.method1 : Object))) - (new class2()))))) >= 0 ? (arrObj0.prop1 += (-8.70014119023327E+18 + (((new BaseClass()) >>> (new BaseClass())) * (ui8[(90) & 255] * 'caller' - ((protoObj0.prop1 ? obj1.prop0 : 4294967295) instanceof ((typeof obj0.method1 == 'function' && !(obj0.method1[Symbol.toStringTag] == 'AsyncFunction')) ? obj0.method1 : Object))) - (new class2())))) : 0)) & 0XF)]){
        protoObj0.length = makeArrayLength(((new BaseClass()) >= -1073741824));
        if(shouldBailout){
          return  'somestring'
        }
        strvar3 = strvar7[6%strvar7.length];
        return argMath66;
      }
      func42 (){
        GiantPrintArray.push('protoObj0.prop0 = ' + (protoObj0.prop0));
        return a;
      }
      func43 (argMath67){
        obj1.prop0 <<=((protoObj0.prop0 <= obj0.prop1)||(argMath67 === obj0.prop1));
        protoObj0.prop1 &=class2.func28.call(class2 , IntArr0, (((new Error('abc')) instanceof ((typeof func1 == 'function' && !(func1[Symbol.toStringTag] == 'AsyncFunction')) ? func1 : Object)) instanceof ((typeof func2 == 'function' && !(func2[Symbol.toStringTag] == 'AsyncFunction')) ? func2 : Object)), Object.create(obj1), arrObj0);
        return -691222738;
      }
      get func44 (){
        a -=((protoObj0.prop1 |= func2.call(litObj0 , ary, (protoObj0.prop1-- ), leaf, /^(?!\B.)/gim)) * ((shouldBailout ? func2 = func2 : 1), func2(FloatArr0,'caller',leaf,/^\B\s|(?!\W)/im)) - (('9-U$)' + 'yõ*%£r¥%').indexOf(('ÿ').replace(/a/g, (strvar6).replace(/a/g, (('%#'+'ql'+'K,' + '$(')).replace(('%#'+'ql'+'K,' + '$('), strvar4))))));
        strvar2 = strvar2.concat((IntArr0.pop()));
        strvar0 = strvar6[3%strvar6.length];
        x.y(strvar4 <=(arguments[(3)] ? 'caller' :           (shouldBailout ? protoObj0.method0('string0','string1','string2') : protoObj0.method0(obj0.method0.call(arrObj0 , 19, 1555586303, 146),Math.max(arrObj0.prop1, 0),class2.func29()))));
        return 190;
      }
      static func45 (argMath68,argMath69){
        return 5.68222678171986E+18;
      }
    }`,
    `class class7 extends BaseClass {
      constructor (){
        super();
        strvar7 = strvar1[3%strvar1.length];
        obj1.prop4 -=func1.call(obj1 , (-178 * 2), (++ protoObj0.length), arrObj0, obj1);
        class6 = class6;
      }
      static func61 (argMath88,argMath89){
        if(shouldBailout){
          return  'somestring'
        }
        if(shouldBailout){
          return  'somestring'
        }
        GiantPrintArray.push('strvar4 = ' + (strvar4));
        var strvar10 = strvar1.concat((((protoObj1.prop1 === c) * ((((ui32[(148) & 255], (826533166 ? -6.79098020527036E+18 : g), ({} instanceof ((typeof Function == 'function' && !(Function[Symbol.toStringTag] == 'AsyncFunction')) ? Function : Object)), ((shouldBailout ? obj0.method0 = func4 : 1), obj0.method0(1918339627.1,8.81645399500051E+18,-2147483647)), 'caller') >> (class6.func59.call(protoObj1 , IntArr1[(((4294967295 >= 0 ? 4294967295 : 0)) & 0XF)], (protoObj1.prop0 >>> 7.43466713387452E+18), arrObj0.method1.call(litObj0 , ary, 783065429, leaf, /^\B\s|(?!\W)/im)) instanceof ((typeof Array == 'function' && !(Array[Symbol.toStringTag] == 'AsyncFunction')) ? Array : Object))) * (uic8[(207) & 255] - (protoObj1.prop5 != protoObj1.prop1))) - ((+ reResult1[((((typeof(-953599714)  != null)  >= 0 ? (typeof(-953599714)  != null)  : 0)) & 0XF)]), ((protoObj1.prop0 !== argMath77)||(argMath89 != g)), 'caller', (IntArr1[((((shouldBailout ? (argMath89 = { valueOf: function() { WScript.Echo('argMath89 valueOf'); return 3; } }, protoObj1.prop0) : protoObj1.prop0) >= 0 ? (shouldBailout ? (argMath89 = { valueOf: function() { WScript.Echo('argMath89 valueOf'); return 3; } }, protoObj1.prop0) : protoObj1.prop0) : 0)) & 0XF)] ? (ary5[((shouldBailout ? (ary5[9] = 'x') : undefined ), 9)] - (argMath89)) : (new BaseClass())), (new BaseClass()), ary5[(((arguments[(((((shouldBailout ? (arguments[((((argMath89 !== g)) >= 0 ? ( (argMath89 !== g)) : 0) & 0xF)] = 'x') : undefined ), (argMath89 !== g)) >= 0 ? (argMath89 !== g) : 0)) & 0XF)] >= 0 ? arguments[(((((shouldBailout ? (arguments[((((argMath89 !== g)) >= 0 ? ( (argMath89 !== g)) : 0) & 0xF)] = 'x') : undefined ), (argMath89 !== g)) >= 0 ? (argMath89 !== g) : 0)) & 0XF)] : 0)) & 0XF)]))) * 'caller' - ary.length));
        return -1971959271.9;
      }
    }`,
    `IntArr1[(((reResult1.length >= 0 ? reResult1.length : 0)) & 0XF)] = obj0.prop0;`,
    `var strvar9 = '3$|QÝ,!7);Á.,;*';`,
    ` strvar9 = strvar9.substring((strvar9.length)/1,(strvar9.length)/2);`,
    `function x(argMath100 = (~ ary5[(((((shouldBailout ? (ary5[(((f64[((shouldBailout ? (argMath91 = { valueOf: function() { WScript.Echo('argMath91 valueOf'); return 3; } }, (i16[(236) & 255] ^ f)) : (i16[(236) & 255] ^ f))) & 255]) >= 0 ? ( f64[((shouldBailout ? (argMath91 = { valueOf: function() { WScript.Echo('argMath91 valueOf'); return 3; } }, (i16[(236) & 255] ^ f)) : (i16[(236) & 255] ^ f))) & 255]) : 0) & 0xF)] = 'x') : undefined ), f64[((shouldBailout ? (argMath91 = { valueOf: function() { WScript.Echo('argMath91 valueOf'); return 3; } }, (i16[(236) & 255] ^ f)) : (i16[(236) & 255] ^ f))) & 255]) >= 0 ? f64[((shouldBailout ? (argMath91 = { valueOf: function() { WScript.Echo('argMath91 valueOf'); return 3; } }, (i16[(236) & 255] ^ f)) : (i16[(236) & 255] ^ f))) & 255] : 0)) & 0XF)]),argMath101,argMath102 = (new class2()),argMath103){
      strvar7 = strvar7.concat((1053672603.1 ? c : a));
      message = fileName[2%fileName.length];
      strvar5 = strvar5[6%strvar5.length];
      var strvar11 = strvar1;
      strvar5 = strvar11[2%strvar11.length];
(Object.defineProperty(litObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
      litObj1.prop1 = (protoObj1.prop0 = 48);
      return 200421084;
    }`,
    `strvar6 = strvar4.concat(VarArr0[(((((shouldBailout ? (VarArr0[(((721241264) >= 0 ? ( 721241264) : 0) & 0xF)] = 'x') : undefined ), 721241264) >= 0 ? 721241264 : 0)) & 0XF)]).concat(arguments[(((((b !== argMath90)||(b === h)) >= 0 ? ((b !== argMath90)||(b === h)) : 0)) & 0XF)]);`,
    ` class class14 {
      set func99 (argMath130 = (new class12())){
        WScript.Echo(strvar5 !=(-- argMath130));
        argMath130 &=(([1, 2, 3] instanceof ((typeof Error == 'function' && !(Error[Symbol.toStringTag] == 'AsyncFunction')) ? Error : Object)) - obj1.method1(VarArr0,protoObj1.method0.call(class2 , ((shouldBailout ? protoObj0.method0 = arrObj0.method0 : 1), protoObj0.method0(((-2147483647 | argMath92) * 'caller' + (arrObj0.prop0 -= h)),(((new Object()) instanceof ((typeof Object == 'function' && !(Object[Symbol.toStringTag] == 'AsyncFunction')) ? Object : Object)) && 'caller'),-528442914)), (typeof d), (argMath130 != argMath90)),leaf,/([郳7]){0,8}/gimy));
        return argMath130;
      }
      get func100 (){
        if(shouldBailout){
          return  'somestring'
        }
        strvar1 = strvar4[1%strvar4.length];
        strvar7 = strvar4[5%strvar4.length];
        argMath92 = (new class2.func24()).prop0 ;
        return 3.02139334189988E+18;
      }
      func101 (argMath131 = ui32[481149231],argMath132){
        strvar4 = strvar1[3%strvar1.length];
        var strvar9 = strvar5;
        strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/4);
        if(shouldBailout){
          return  'somestring'
        }
        var strvar10 = strvar4;
        var uniqobj23 = protoObj1;
        return 8.04240165388438E+18;
      }
      set func102 (argMath133 = (ary.pop())){
        class12 = class12;
        strvar1 = strvar5[6%strvar5.length];
        var uniqobj24 = Object.create(arrObj0);
        argMath133 =(-852345791 + -326868783.9);
        return 656957968;
      }
      static get func103 (){
        var strvar9 = strvar5;
        argMath91 +=f32[(60) & 255];
        strvar2 = (strvar9 + (new class2())).concat(func2.call(protoObj0 , ary, (- argMath90), leaf, /(?=(郳a郳\b\S\b\d))/giy));
        strvar1 = ('!' + 'E5j)').concat((-- f)).concat(parseInt("-0x99"));
        return 214;
      }
      static get func104 (){
        return c;
      }
      static func105 (){
        return d;
      }
      static func106 (argMath134,argMath135){
        strvar0 = strvar5.concat((b >= h));
        return 197;
      }
    }`,
    `strvar4 = (('ÀI@h<' + '!!ìB-I!=').concat((typeof(protoObj1.prop1)  == 'object') )).replace(/a/g, strvar9) + ((typeof(arrObj0.prop1)  != 'undefined')  * ((6.99504535452666E+18 ? obj1.prop4 : protoObj1.prop0) - IntArr1[(((arrObj0.prop0 >= 0 ? arrObj0.prop0 : 0)) & 0XF)]));`,
    ` try {
      var uniqobj29 = {prop0: ('3$|QÝ,!7);Á.,;*').replace(strvar1, strvar7), prop1: ((new class2()) * ('%!!³Eq.*nñ!k!EC'.indexOf(strvar7)) + ((typeof (argMath91 |= ((c >= obj1.prop4)||(argMath92 === argMath90)))) ? ary5.length : IntArr1[((shouldBailout ? (IntArr1[11] = 'x') : undefined ), 11)])), ["prop2"]: Object.create({prop0: VarArr0[((shouldBailout ? (VarArr0[6] = 'x') : undefined ), 6)]}, {})};
      arrObj0 = protoObj1;
    } catch({message, fileName, lineNumber}) {
    } finally {
      var strvar9 = strvar1;
      strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/3);
    }`,
    `function bar() {
      function foo() {
          function baz() {
              function onemorefoo() {
                  return x;
              }
              return onemorefoo();
          }
          return baz();
      }
      return foo();
  }`,
    `function foo() {
      var n = (function() {
          var x = 'x';
          var l = () => {
              var x = 'y';
              return function() {
                  return x;
              }
          }
          return l;
      })()
      return n()();
  }`,
    ` var o = {
      method(s) { return x; },
      get method2() { return x; },
      ['method3'](arg) { return x; },
      get ['method4']() { return x; },
      async method5(s) { return x; },
      *method6(s) { yield x; },
      *['method7'](s) { yield x; },
      async ['method8'](s) { return x; },
      f8: function() { return x; },
      f9: () => { return x; }
  }`,
    `async function af1(a) {
      return await foo();
  }`,
    `
    function overrideImports(overrides) {
      return {
        test: Object.assign({}, imports.test, overrides),
        table: overrides.table ? {"":overrides.table} : imports.table
      };
    }`,
    `const invalidBuffers = [
      ,
      "",
      "123",
      4568,
      {},
      {length: 15},
      function() {},
      new ArrayBuffer(),
      createView("\\x00\\x61\\x73\\x6d\\x01\\x00\\x00\\x00\\x01\\x85\\x80\\x80"),
      new Proxy(buf, {get(target, name) {return target[name];}}),
    ];`,
    `async function testValidate() {
      console.log("ghost.validate tests");
      await testInvalidCases([
        // Invalid buffer source
        ...(invalidBuffers.map(b => () => {
          if (!x.validate(b)) {
            throw new Error("Buffer source is the right type, but doesn't validate");
          }
        })),
      ]);
      // Make sure empty buffer doesn't validate and doesn't throw
      const emptyBuffer = new ArrayBuffer();
    }`,
    `async function testModuleConstructor() {
      await testInvalidCases([
        () => x.y(),
        () => x.y(buf),
        ...(invalidBuffers.map(b => () => new x.y(b))),
      ]);
      const module = new x.y(buf);
      test(module);
    }`,
    '.24e9',
    '0B00',
    '0x0',
    '20',
    '.24E40',
    '0O034 in x',
    '.24+e0 in x',
    '{0}',
    '{01234567}',
    '{0B0}',
    '{0O034}',
    '{0X456}',
    '{0Xf}',
    '{0o465}',
    '{0xe}',
    '{23.e2}',
    '{5}',
    '{.24e1}',
    '{.24e83}',
    '23.E+1',
    '3.42+1',
    '0B0;',
    '0X456;',
    '8;',
    '3.42E9',
    `Async                          = 0x10000`,
    `a = 1 << 12`,
    `HASH_NAME(assert, 0x08D130F2, 0x08D130F2)
    HASH_NAME(async, 0x0084CDEE, 0x0084CDEE)
    HASH_NAME(await, 0x0084FF56, 0x0084FF56)
    HASH_NAME(boolean, 0x96F94400, 0x96F94400)`,
    `var gen = async function *g() {
      callCount += 1;
      yield {
           ...yield yield,
           ...(function(arg) {
              var yield = arg;
              return {...yield};
           }(yield)),
           ...yield,
        }
    };`,
    `for (vqqhhkflvdijrns in ((x) ? (class extends ((((void (((function* k() {
    }) << ((((++k)))))))))) {
      [arguments](dl, w, i, p, l) {
        "use strict";
      }
    }) : ((this)))) for (; ((this)); ((class jtpexjm extends class {}(((false) / true), ...(9.584997788965455e152), n ++) {
      static get [(2e308)]() {
      }
    })[((true))])) continue;`,
    'var init = f;  if (true) function f() {  } else ;',
    'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
    'try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }',
    '  try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
    'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
    'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
    'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
    'let f = 123; switch (1) { default: function f() {  } }',
    'var init = f;  switch (1) { default:   function f() {  }  }',
    'var init = f; if (false) function _f() {} else function f() {  }',
    'function arguments() {}',
    'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
    'var outer = (function*() { yield* iter; })();',
    `try {
  throw 'exception';
} catch (err) {
  before = err;
  for (var err = 'loop initializer'; err !== 'increment'; err = 'increment') {
    during = err;
  }
  after = err;
}`,
    `try {
  throw 'exception';
} catch (err) {
  before = err;
  for (var err in { propertyName: null }) {
    during = err;
  }
  after = err;
}`,
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);'
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
