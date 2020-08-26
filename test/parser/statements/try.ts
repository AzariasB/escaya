import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Try', () => {
  // Check that non-lexical declarations can override a simple catch parameter
  for (const declaration of ['var e', 'var f, e', 'var {e} = 0', 'let {} = 0', 'let {e:f} = 0', '{ function e(){} }']) {
    it(`try { throw 0; } catch(e) {${declaration} }`, () => {
      t.doesNotThrow(() => {
        parseScript(`try { throw 0; } catch(e) {${declaration} }`);
      });
    });
  }

  const lexical_e = [
    'let e',
    'let f, g, e',
    'let [f] = [], [] = [], e = e, h',
    'let {e} = 0',
    'let {f, e} = 0',
    'let {f, g} = 0, {e} = 0',
    'let {f = 0, e = 1} = 0',
    'let [e] = 0',
    'let [f, e] = 0',
    'let {f:e} = 0',
    'let [[[], e]] = 0',
    'const e = 0',
    'const f = 0, g = 0, e = 0',
    'const {e} = 0',
    'const [e] = 0',
    'const {f:e} = 0',
    'const [[[], e]] = 0',
    'function e(){}',
    'function* e(){}'
  ];

  // Check that lexical declarations cannot override a simple catch parameter
  for (const declaration of lexical_e) {
    it(`try { throw 0;} catch(e) {${declaration}}`, () => {
      t.throws(() => {
        parseScript(`try { throw 0;} catch(e) {${declaration}}`);
      });
    });

    // Check that lexical declarations cannot override a complex catch parameter
    it(`try { throw 0;} catch({e}) { ${declaration} }`, () => {
      t.throws(() => {
        parseScript(`try { throw 0;} catch({e}) { ${declaration} }`);
      });
    });

    // Check that non-lexical declarations can override a simple catch parameter
    it(`try { throw 0;} catch(e) {${declaration}}`, () => {
      t.throws(() => {
        parseScript(`try { throw 0;} catch(e) {${declaration}}`);
      });
    });

    // Check that the above error does not occur if a declaration scope is between
    // the catch and the loop.
    it(`try {throw 0;} catch(e) {(()=>{${declaration}})();}`, () => {
      t.doesNotThrow(() => {
        parseScript(`try {throw 0;} catch(e) {(()=>{${declaration}})();}`);
      });
    });

    it(`try { throw 0; } catch(e) {(function(){${declaration}})(); }`, () => {
      t.doesNotThrow(() => {
        parseScript(`try { throw 0; } catch(e) { (function(){${declaration}})(); } `);
      });
    });
  }

  // Invalid cases
  for (const arg of [
    'try/("',
    'try\nx;',
    'try\n/x/g',
    'try\n',
    'try',
    'try catch',
    'try { ',
    'try {};',
    `try {  finally { function f(){} function f(){} `,
    `try {} catch (foo`,
    `try { } catch (e) { `,
    'try { x(); } catch ',
    `try { } finally { `,
    `try {} catch (foo) {`,
    `try { } catch`,
    'catch',
    'try',
    'finally',
    'try {} catch ([a,a]) { }',
    'try { } catch ({x}) { let x; }',
    'try {} catch ({x}) { var x; }',
    'switch(x) { case y: {...x} }',
    'try(x) { case y: foo /a/ }',
    'try(x) { case y:{ class { x() {} } }}',
    'try({x=y}) { case y: [...a] }',
    'try {} catch([async(x,y) => z]) {}',
    'try {} catch({ x: (async function() {}) }) {}',
    'try {} catch({ x: function*() {} }) {}',
    'try {} catch({ x: function() {} }) {}',
    'try {} catch({ x: ("str") }) {}',
    'try {} catch({ x: "str" }) {}',
    'try {} catch([a,,...rest,]) {}',
    'try {} catch([ ...([a]) ]) {}',
    'try {} catch([...x--]) {}',
    'try {} catch(e) { const e = 0 }',
    'try { throw 0; } catch(e) { const f = 0, g = 0, e = 0 }',
    'try { throw 0; } catch(e) { let f, g, e }',
    'try { } catch (x) { let x; }',
    'try {} catch ([a, a]) {}',
    'try {} catch ([a] = b) {}',
    'try {} catch(a) { let a; }',
    'try {} catch (x) { let x; }',
    'try {} catch ([x, x]) {}',
    'try {} catch([...x,]) {}',
    'try {} catch({ x : /foo/ }) {}',
    'try {} catch({...{x} }) {}',
    'try {} catch([...++x]) {}',
    'try {} catch([x()]) {}',
    'try {} catch([x--]) {}',
    'try {} catch ([foo]) { var foo; }',
    'try {} catch ({ foo }) { var foo; }',
    'try {} catch ({ a: foo, b: { c: [foo] } }) {}',
    'try {} catch (x) { { let x } ',
    'try { } catch ([x, x]) {}',
    'try {} catch (foo) { let foo = 1; }',
    'try {} catch (foo) { let foo; }',
    'try {} catch (foo) { function foo() {} }',
    'try {} catch(e) { let e; }',
    'try {} catch ({a: e, b: e}) {}',
    'try {} catch ({e = 0, a: e}) {}',
    'try {} catch ({e, e}) {}',
    'function f() { try {} catch (e) { function e(){} } }',
    'try {} catch (e) { let e = x; }',
    'try {} catch (e) { const e = x; }',
    'try {} catch (x) { let x }',
    'let foo; try {} catch (foo) {} let foo;',
    'try { var foo = 1; } catch (e) {} let foo = 1;',
    'try {} catch({ x : y * 2 }) {}',
    'try { throw []; } catch ([...x = []]) {}',
    'try {} catch({ ...function() {} }) {}',
    'try {} catch({x: async (y) => z}) {}',
    'try {} catch([async x => z]) {}',
    'try {} catch({ x: (function*() {}) }) {}',
    'try {} catch({ x: (function() {}) }) {}',
    'try {} catch({ x: (foo()) }) {}',
    'try {} catch({ x: "str" }) {}'
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

  // Invalid cases - WebCompat off
  for (const arg of [
    'try { throw {}; } catch ({ f }) { if (true) function f() {  } }',
    'try { } finally { function f(){} function f(){} }',
    'try {} catch (foo) { for (var foo of bar); }',
    'try { } catch (x) { for (var x of []) {} }',
    'var x; try {} catch (x) { var x = 5; }',
    'try {} catch (e) { { var e = x; } }',
    'try {} catch (e) { for (var e;;) {} }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true, disableWebCompat: true });
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
    'try { throw {}; } catch ({ f }) { if (true) function f() {  } }',
    'try { } finally { function f(){} function f(){} }',
    'try {} catch (foo) { for (var foo of bar); }',
    'try { } catch (x) { for (var x of []) {} }',
    'try {} catch (e) { { var e = x; } }',
    'try {} catch (e) { for (var e;;) {} }',
    'try { f; } catch (exception) { err1 = exception; } switch (1) { case 1: function f() {  } } try { f; } catch (exception) { err2 = exception; }',
    'try { throw {}; } catch ({ f }) {  if (false) ; else function f() {  }  }',
    'try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }',
    `try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }
    try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }`,
    'try {} catch (foo) {} var foo;',
    'try {} catch (foo) {} let foo;',
    'try {} catch (foo) { { let foo; } }',
    'try {} catch (foo) { function x() { var foo; } }',
    'try {} catch (foo) { function x(foo) {} }',
    'try {} catch (foo) { var foo = 1; }',
    'try {} catch (e) { for (var e of y) {} }',
    'try {try { let e; } catch { let e; } finally { let e; }} catch (e) { }',
    `try {} catch (e) { var e = x; }
    try {} catch (e) { var e = x; }`,
    'try {} catch(e) { var e; }',
    'try { } catch (e) { function *f(){} function *f(){} }',
    'try { } finally { function a(){} function a(){} }',
    'try { throw 0; } catch(e) { { function e(){} } }',
    'try {} catch (e) { for (let e = 1;;) {} }',
    'try {} catch (e) { for (var e = 1;;) {} }',
    'try {} catch ([a]) {}',
    'try {} catch (a) {}',
    'try { } catch (e) { function f(){} function f(){} }',
    'try { throw "try"; } catch (x) { for (var x = y; x !== y; x++) {}}',
    'try { } catch (a) { { const a = b; } }',
    'var foo; try {} catch (_) { const foo = 1; }',
    'try {} catch {}',
    'try { } catch (e) { async function f(){} async function f(){} }',
    `try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`,
    'try {} catch (x) { try {} catch (x) {} }',
    'try {} catch (x) { try {} catch (y) { let x } }',
    'try {} catch (foo) { for (var foo = 1;;); }',
    'try {} catch (foo) { for (var foo in bar); }',
    'try {} catch (foo) { for (var [foo] in bar); }',
    'try { } catch (yield) { }',
    'try {} catch([e=x]){}',
    'try {} catch({e=x}){}',
    `try {} catch (e) {}
    /foo/`,
    `try {} finally {}
    /foo/g`,
    'try {} finally {}',
    `try {} catch(x) { with ({}) { x = 1; } }
    try {} catch(x) { with ({}) { x = 1; } }`,
    `try {} catch (foo) {} var foo;`,
    `try { } finally { const y = x }`,
    'try {} finally { function *f(){} }',
    'try { } catch (arguments) { }',
    'try { } catch (eval) { }',
    'try {} catch (e) { { let e = x; } }',
    'try {} catch ([a,b,c]) { }',
    'try {} catch (e) { for (let e;;) {} }',
    'try {} catch (e) { for (const e = y;;) {} }',
    'try {} catch (e) { for (const e in y) {} }',
    'try {} catch (e) { for (let e of y) {} }',
    'try {} catch (e) { for (const e of y) {} }',
    'try {} catch (e) { for (var e in y) {} }',
    'try { } catch (e) { x(e) }',
    'try { x(); } catch (e) { y(e) }',
    'try { } catch(var1) { if (true) { function var1() {} } }',
    `try { } finally { function f(){} function f(){} }`,
    `try {} catch (foo) { try {} catch (_) { var foo; } }`,
    `try { } catch (e) { async function f(){} async function f(){} }`,
    `try { } catch (e) { async function *f(){} async function *f(){} }`,
    `try { } catch (e) { function *f(){} function *f(){} }`,
    `try { } finally { async function f(){} async function f(){} }`,
    `try { } catch (a) { { const a = b; } }`,
    `var foo; try {} catch (_) { const foo = 1; }`,
    `try {} catch (foo) { function x(foo) {} }`,
    `try {} catch (foo) { function x() { var foo; } }`,
    `try {} catch (foo) { { let foo; } }
    try {} catch (foo) { { let foo; } }`,
    `var foo; try {} catch (_) { let foo; }`,
    `try {} catch (e) { for (let e of y) {} }`,
    `try {} catch (e) { var e = x; }`,
    `try {} catch (e) { for (var e;;) {} }`,
    `try {} catch (e) { for (let e;;) {} }`,
    `try {} catch (e) { for (let e in y) {} }`,
    `try {} catch (e) { for (const e in y) {} }`,
    `try { f; } catch (exception) { err1 = exception; } switch (1) { case 1: function f() {  } } try { f; } catch (exception) { err2 = exception; }`,
    `try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }`,
    `try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }`,
    `try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }
     try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }`,
    `try { throw null; } catch (f) { if (false) ; else function f() { return 123; } }`,
    'try {} catch (e) { for (const e = 1;;) {} }',
    'try {} catch (e) { for (var e = 1;;) {} }',
    `try {} catch(e){}`,
    `try {} catch({e}){}`,
    `try {} catch([e]){}`,
    `try {} catch({e=x}){}`,
    `try {} catch {} finally {}`,
    `try{}catch(a){}`,
    `try { } catch (eval) { }`,
    `try { } catch (e) { say(e) }`,
    `try { } catch ([a = 0]) { }`,
    `try { } catch (e) { let a; }`,
    'try { throw [,]; } catch ([x = 23]) {}',
    `try { throw [1, 2, 3]; } catch ([...x]) {}`,
    `try {try { let e; } catch { let e; } finally { let e; }} catch (e) { }`,
    `try {try { } catch { } finally { }} catch ({e}) { }`,
    `try {} catch(x) { x = 0; }`,
    `try {} catch(x) { with ({}) { x = 1; } }`,
    `try {} catch (e) { for (let e = 1;;) {} }`,
    `try {} catch ([a,b,c]) { }`,
    `try { throw null; } catch ({}) {}`,
    `try {} catch(e) { try {} catch (e) {} }`,
    `var foo; try {} catch (_) { let foo; }`,
    `try {} catch (e) { { let e = x; } }`,
    'try {} finally {}',
    'try {} catch({e}){}',
    `try {} catch (foo) {} let foo;`,
    `try {} catch (e) { let b = x; }`,
    'try {} catch (x) { var x }',
    'try {} catch (x) { { let x } }',
    'try {} catch (x) { { var x } }',
    `try { } catch (e) { var x; for (var y of []) {} }`,
    `function __f_3() { try { __f_3(); } catch(e) { eval("let fun = ({a} = {a: 30}) => {"); } }`,
    `try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`,
    `try {
      function nygvdtrorn({PÀ: j, "": w, [((2e308))]: t = (true)} = (((true).eval = (class {}))), ysrnpjb = (function yg(l = (new.target), u = (new.target), {}, [], {}, ...t) {
        debugger;
      }), reqivfsweq = (this), ...{}) {
        for (otou of ([((null)[(263.491)] ^= (((null)))), , , , , ])) throw (((function* d(h, x) {
          "use strict";
          "use strict";
          "use strict";
          "use strict"
        })));
        for (const k of (((({})) ? (('zoo')) : (2e308)))) try {} catch (s) {}
        function* nkblpidxyeyxdnk(ckmebkmngwka, s = (new (null)), [] = (((/[^[-\\x74*-\\x75\\x6B2-\\xfB]/gmu).public)), [] = ((/(?=(?!))/u))) {
          switch (((class {}))) {
            case ((/\\b\\b\\b\\B\\xFf/g)):
            case (true):
            case (this):
            case (/6\\b$/guy):
            case (2e308):
            default:
            case (this):
            case ("«!"):
            case (1775.47):
          }
          while (((((j)) ? ((null)) : (j)))) if ((6.250803124328415e23)) ;
          x: for (;;) return;
          (null)
          ;
        }
        ((i |= (new.target)));
      }
    } catch (le) {
      {
        throw ("t");
        ;
        d: ;
        try {} catch (q) {}
      }
      if (((((null) && (0))))) throw (({})); else ;
    } finally {}`,
    `try {
      class gswsthnadhexi {
        set [((("")))] (psarupq) {
          "use strict";
          do debugger; while (((true)));
          if (((true))) debugger;
          class l {}
        }
        static get [((((true)) == (("É¦Ü"))))]() {
          "use strict";
          throw ((("[8")));
          for (;;) return;
          debugger;
        }
        static set [/\\0?/giy] ([[], q, ...[]]) {
          return;
          eval: for (;;) return;
          {}
          try {} finally {}
        }
        static set [(-eval)] ([] = []) {
          "string";
          debugger;
          while ((((0)))) continue;
          w: ;
        }
        static *">U9"() {}
      }
      ((this));
      switch ((class extends (([(class {}), ...(7245.62), (({})), ...((this))])) {
        static get [true]() {}
        set [("")] (c) {
          "use strict";
          '"f7­';
          "use strict";
        }
        static [(this)]() {}
        static get [(/[-)-\\q+-\\W-]?/iy)]() {
          "use strict";
        }
      })) {
        case (null):
          while ((/^$/gim)) for (;;) break;
          pwogx: ;
          switch (("aøßY")) {
            case (/(?!(?!)?)/gy):
            default:
            case (2e308):
          }
          switch ((2e308)) {
            case (null):
          }
        case ((((((--h)))))):
      }
      do switch (((arguments) ? (((++u))) : ((++x)))) {
        case this:
          (((eval)));
          (((0)));
          try {} finally {}
        default:
          switch ("string") {
            default:
          }
          switch (((589794971639690))) {}
          while ((/(?!\\xDE*?)/imu)) debugger;
          continue;
        case ((((eval)[(false)]))):
          while (((this))) break;
          throw (null);
          y: for (;;) debugger;
          throw (this)
        case (() => {
          "use strict";
        }):
        case (((null) ? (null) : null)):
          while (true) debugger;
          while ((false)) ;
        case ((--q)):
          try {} catch (d) {}
          switch (("string")) {}
        case (((((/\\x6d\\b\\u49Ff/)).with))):
          do debugger; while ((/[)-8\\x84-\\xCd-]/muy));
          while (("")) continue;
          while ((r)) debugger;
          break
      } while ((([...(f), (((("")))[(null)] %= "x·"), ...(this), ...null, , ]) ? (typeof ((5765 <= ((/((?:))*/gimy))))) : ((2e308).break)));
      class eurvuuuq {
        static *[(this)]() {
          "";
        }
        set [(((919582721026900) >>> false))] ({[((true))]: n = (("ù"))}) {
          return;
          debugger;
          while ((this)) return;
        }
        set [(2e308)] ([] = ((this)())) {
          switch (new.target) {}
          throw ((5.836270662185278e130));
        }
      }
    } finally {}
    try {} catch (pxyyqdebctfmujsc) {
      do try {} catch (q) {} while ((e = 8.635821098822318e246, (class {})));
      throw (f ++);
      try {
        for (;;) continue;
      } finally {
        try {} catch (k) {}
        for (;;) break;
        var m = false;
      }
    };`,
    `do switch ((mkssentgaoioo = function* (d, p, q = (6055.45), [], ...u) {
      ;
      {}
      if ((yield)) ;
      for (;;) ;
      try {} catch (n) {}
    }, qlaeiqk) => (("&"))) {
      default:
        2e308
        try {
          while (this) ;
          switch (("^")) {
            default:
          }
          class c {}
          for (;;) break;
          for (n in (this)) break
        } catch (x) {} finally {
          ;
          const j = (this)
          for (;;) debugger
          function* a(k, g, h, d) {
            "use strict"
            "use strict"
          }
        }
        arguments: switch ((((8.109626746903049e291[null] /= (null))))) {
          case 2e308:
          case /(?=(?=[]))/gmu:
          case (true):
          case ((true)):
          case (((this))):
        }
        class atyrhoqwrjmlyd extends (((2e308))) {
          static set [("7tË×E")] (b) {
            "use strict";
            "";
            "use strict";
            "use strict";
          }
          static set [((null))] (h = ((this))) {
          }
          constructor() {
            "use strict"
          }
          static get [((2926))]() {
            ""
            "use strict"
          }
          static set [null] (b = ((eval))) {}
        }
        do ; while (({v, arguments, arguments}));
      case ((class extends ((((0x9B4851D271024)).k)(true, () => arguments)) {
        static get [(true)]() {
        }
        "a7JQ×"() {}
        static *"Ïït -"() {}
        static '"Ï'() {
          "use strict";
        }
      })):
    } while (null);`,
    `if ("string") do try {
      for (o in []) eval: for (;;) debugger;
      {}
    } catch ({}) {
      for (u in (/[h-]/imy)) continue
    } finally {
      continue;
      ("x");
      try {} finally {}
      eval: for (var n of ((this))) debugger
      try {} catch (s) {}
    } while ([, ...((null)), (null), , , ][{arguments}] >>= "!]·"); else ;
    function* rceuxhnojqtemyc(cswkdjkfeekubh = (([, ...((class extends (([])) {
      get [((this))]() {
        "use strict"
      }
    })), , ...q <<= (function (o) {
      "use strict"
    }), ...(new true(t **= (0)))]))) {
      for (; new (eval[(/\\xF1\\b\\b\\B\\x22/gmuy.instanceof /= (() => ((('kendon')))))]);) do arguments: for (var k = (this); (/[^\ -]/gy); (class {})) while ((this)) ; while ((/[-*-\\x85?-{-]/imu))
      {
        for (((2e308)); (0x1E898CAFF70604);) try {} catch (t) {}
      }
    }`
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

  it('try {} catch(eval) {"use strict";}', () => {
    t.deepEqual(parseScript('try {} catch(eval) {"use strict";}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'eval',
              start: 13,
              end: 17
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'StringLiteral',
                    value: 'use strict',
                    start: 20,
                    end: 32
                  },
                  start: 20,
                  end: 33
                }
              ],
              start: 19,
              end: 34
            },
            start: 7,
            end: 34
          },
          finalizer: null,
          start: 0,
          end: 34
        }
      ],
      start: 0,
      end: 34
    });
  });

  it('try { throw [3, 4, 5]; } catch ([...[x, y, z]]) {}', () => {
    t.deepEqual(parseScript('try { throw [3, 4, 5]; } catch ([...[x, y, z]]) {}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ThrowStatement',
                expression: {
                  type: 'ArrayLiteral',

                  elements: [
                    {
                      type: 'NumericLiteral',
                      value: 3,
                      start: 13,
                      end: 14
                    },
                    {
                      type: 'NumericLiteral',
                      value: 4,
                      start: 16,
                      end: 17
                    },
                    {
                      type: 'NumericLiteral',
                      value: 5,
                      start: 19,
                      end: 20
                    }
                  ],
                  start: 12,
                  end: 21
                },
                start: 6,
                end: 22
              }
            ],
            start: 4,
            end: 24
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'ArrayBindingPattern',
                    elements: [
                      {
                        type: 'BindingIdentifier',
                        name: 'x',
                        start: 37,
                        end: 38
                      },
                      {
                        type: 'BindingIdentifier',
                        name: 'y',
                        start: 40,
                        end: 41
                      },
                      {
                        type: 'BindingIdentifier',
                        name: 'z',
                        start: 43,
                        end: 44
                      }
                    ],
                    start: 36,
                    end: 45
                  },
                  start: 33,
                  end: 45
                }
              ],
              start: 32,
              end: 46
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 48,
              end: 50
            },
            start: 25,
            end: 50
          },
          finalizer: null,
          start: 0,
          end: 50
        }
      ],
      start: 0,
      end: 50
    });
  });

  it('try { throw x; } catch ([...[]]) {}', () => {
    t.deepEqual(parseScript('try { throw x; } catch ([...[]]) {}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ThrowStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 12,
                  end: 13
                },
                start: 6,
                end: 14
              }
            ],
            start: 4,
            end: 16
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingRestElement',
                  argument: {
                    type: 'ArrayBindingPattern',
                    elements: [],
                    start: 28,
                    end: 30
                  },
                  start: 25,
                  end: 30
                }
              ],
              start: 24,
              end: 31
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 33,
              end: 35
            },
            start: 17,
            end: 35
          },
          finalizer: null,
          start: 0,
          end: 35
        }
      ],
      start: 0,
      end: 35
    });
  });
  /*
  it('try { throw { w: { x: undefined, z: 7 } }; } catch ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}', () => {
    t.deepEqual(
      parseScript('try { throw { w: { x: undefined, z: 7 } }; } catch ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}'),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ThrowStatement',
                  expression: {
                    type: 'ObjectLiteral',
                    properties: [
                      {
                        type: 'PropertyDefinition',
                        key: {
                          type: 'IdentifierName',
                          name: 'w',
                          start: 14,
                          end: 15
                        },
                        expression: {
                          type: 'ObjectLiteral',
                          properties: [
                            {
                              type: 'PropertyDefinition',
                              key: {
                                type: 'IdentifierName',
                                name: 'x',
                                start: 19,
                                end: 20
                              },
                              expression: {
                                type: 'IdentifierReference',
                                name: 'undefined',
                                start: 22,
                                end: 31
                              },
                              start: 19,
                              end: 31
                            },
                            {
                              type: 'PropertyDefinition',
                              key: {
                                type: 'IdentifierName',
                                name: 'z',
                                start: 33,
                                end: 34
                              },
                              expression: {
                                type: 'NumericLiteral',
                                name: 7,
                                start: 36,
                                end: 37
                              },
                              start: 33,
                              end: 37
                            }
                          ],
                          start: 17,
                          end: 39
                        },
                        start: 14,
                        end: 39
                      }
                    ],
                    start: 12,
                    end: 41
                  },
                  start: 6,
                  end: 42
                }
              ],
              start: 4,
              end: 44
            },
            catchClause: {
              type: 'CatchClause',
              kind: 140,
              binding: {
                type: 'ObjectBindingPattern',
                rest: null,
                properties: [
                  {
                    type: 'BindingProperty',
                    name: {
                      type: 'IdentifierName',
                      name: 'w',
                      start: 54,
                      end: 56
                    },
                    binding: {
                      type: 'BindingElement',
                      binding: {
                        type: 'ObjectBindingPattern',
                        rest: null,
                        properties: [
                          {
                            type: 'SingleNameBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'x',
                              start: 59,
                              end: 60
                            },
                            initializer: null,
                            start: 59,
                            end: 60
                          },
                          {
                            type: 'SingleNameBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'y',
                              start: 62,
                              end: 63
                            },
                            initializer: null,
                            start: 62,
                            end: 63
                          },
                          {
                            type: 'SingleNameBinding',
                            binding: {
                              type: 'BindingIdentifier',
                              name: 'z',
                              start: 65,
                              end: 66
                            },
                            initializer: null,
                            start: 65,
                            end: 66
                          }
                        ],
                        start: 57,
                        end: 68
                      },
                      initializer: {
                        type: 'ObjectLiteral',
                        properties: [
                          {
                            type: 'PropertyDefinition',
                            key: {
                              type: 'IdentifierName',
                              name: 'x',
                              start: 73,
                              end: 74
                            },
                            expression: {
                              type: 'NumericLiteral',
                              name: 4,
                              start: 76,
                              end: 77
                            },
                            start: 73,
                            end: 77
                          },
                          {
                            type: 'PropertyDefinition',
                            key: {
                              type: 'IdentifierName',
                              name: 'y',
                              start: 79,
                              end: 80
                            },
                            expression: {
                              type: 'NumericLiteral',
                              name: 5,
                              start: 82,
                              end: 83
                            },
                            start: 79,
                            end: 83
                          },
                          {
                            type: 'PropertyDefinition',
                            key: {
                              type: 'IdentifierName',
                              name: 'z',
                              start: 85,
                              end: 86
                            },
                            expression: {
                              type: 'NumericLiteral',
                              name: 6,
                              start: 88,
                              end: 89
                            },
                            start: 85,
                            end: 89
                          }
                        ],
                        start: 71,
                        end: 91
                      },
                      start: 57,
                      end: 91
                    },
                    start: 54,
                    end: 91
                  }
                ],
                start: 52,
                end: 93
              },
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 95,
                end: 97
              },
              flags: 0,
              start: 45,
              end: 97
            },
            finalizer: null,
            start: 0,
            end: 97
          }
        ],
        start: 0,
        end: 97
      }
    );
  });
*/
  it('try {} catch ([a=a]) {}', () => {
    t.deepEqual(parseScript('try {} catch ([a=a]) {}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'ArrayBindingPattern',
              elements: [
                {
                  type: 'BindingElement',
                  left: {
                    type: 'BindingIdentifier',
                    name: 'a',
                    start: 15,
                    end: 16
                  },
                  right: {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 17,
                    end: 18
                  },
                  start: 15,
                  end: 18
                }
              ],
              start: 14,
              end: 19
            },
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 21,
              end: 23
            },
            start: 7,
            end: 23
          },
          finalizer: null,
          start: 0,
          end: 23
        }
      ],
      start: 0,
      end: 23
    });
  });

  it('try {} catch (foo) { try {} catch (_) { var foo; } }', () => {
    t.deepEqual(parseScript('try {} catch (foo) { try {} catch (_) { var foo; } }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'foo',
              start: 14,
              end: 17
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    leafs: [],
                    start: 25,
                    end: 27
                  },
                  catchClause: {
                    type: 'CatchClause',
                    binding: {
                      type: 'BindingIdentifier',
                      name: '_',
                      start: 35,
                      end: 36
                    },
                    block: {
                      type: 'BlockStatement',
                      leafs: [
                        {
                          type: 'VariableStatement',
                          declarations: [
                            {
                              type: 'VariableDeclaration',
                              binding: {
                                type: 'BindingIdentifier',
                                name: 'foo',
                                start: 44,
                                end: 47
                              },
                              initializer: null,
                              start: 44,
                              end: 47
                            }
                          ],
                          start: 40,
                          end: 48
                        }
                      ],
                      start: 38,
                      end: 50
                    },
                    start: 28,
                    end: 50
                  },
                  finalizer: null,
                  start: 21,
                  end: 50
                }
              ],
              start: 19,
              end: 52
            },
            start: 7,
            end: 52
          },
          finalizer: null,
          start: 0,
          end: 52
        }
      ],
      start: 0,
      end: 52
    });
  });

  it('try { } catch (e) { async function f(){} async function f(){} }', () => {
    t.deepEqual(parseScript('try { } catch (e) { async function f(){} async function f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 7
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'e',
              start: 15,
              end: 16
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 35,
                    end: 36
                  },
                  generator: false,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 38,
                    end: 40
                  },
                  start: 20,
                  end: 40
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 56,
                    end: 57
                  },
                  generator: false,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 59,
                    end: 61
                  },
                  start: 41,
                  end: 61
                }
              ],
              start: 18,
              end: 63
            },
            start: 8,
            end: 63
          },
          finalizer: null,
          start: 0,
          end: 63
        }
      ],
      start: 0,
      end: 63
    });
  });

  it('try { } catch (e) { async function *f(){} async function *f(){} }', () => {
    t.deepEqual(parseScript('try { } catch (e) { async function *f(){} async function *f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 7
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'e',
              start: 15,
              end: 16
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 36,
                    end: 37
                  },
                  generator: true,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 39,
                    end: 41
                  },
                  start: 20,
                  end: 41
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 58,
                    end: 59
                  },
                  generator: true,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 61,
                    end: 63
                  },
                  start: 42,
                  end: 63
                }
              ],
              start: 18,
              end: 65
            },
            start: 8,
            end: 65
          },
          finalizer: null,
          start: 0,
          end: 65
        }
      ],
      start: 0,
      end: 65
    });
  });

  it('do try {} catch {} while(x) x', () => {
    t.deepEqual(parseScript('do try {} catch {} while(x) x', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 25,
            end: 26
          },
          statement: {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              leafs: [],
              start: 7,
              end: 9
            },
            catchClause: {
              type: 'CatchClause',
              binding: null,
              block: {
                type: 'BlockStatement',
                leafs: [],
                start: 16,
                end: 18
              },
              start: 10,
              end: 18
            },
            finalizer: null,
            start: 3,
            end: 18
          },
          start: 0,
          end: 27
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 28,
            end: 29
          },
          start: 28,
          end: 29
        }
      ],
      start: 0,
      end: 29
    });
  });

  it('try { } catch (e) { function *f(){} function *f(){} }', () => {
    t.deepEqual(parseScript('try { } catch (e) { function *f(){} function *f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 7
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'e',
              start: 15,
              end: 16
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 30,
                    end: 31
                  },
                  generator: true,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 33,
                    end: 35
                  },
                  start: 20,
                  end: 35
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 46,
                    end: 47
                  },
                  generator: true,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 49,
                    end: 51
                  },
                  start: 36,
                  end: 51
                }
              ],
              start: 18,
              end: 53
            },
            start: 8,
            end: 53
          },
          finalizer: null,
          start: 0,
          end: 53
        }
      ],
      start: 0,
      end: 53
    });
  });

  it('try { } finally { async function f(){} async function f(){} }', () => {
    t.deepEqual(parseScript('try { } finally { async function f(){} async function f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 7
          },
          catchClause: null,
          finalizer: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'f',
                  start: 33,
                  end: 34
                },
                generator: false,
                async: true,
                params: [],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 36,
                  end: 38
                },
                start: 18,
                end: 38
              },
              {
                type: 'FunctionDeclaration',
                name: {
                  type: 'BindingIdentifier',
                  name: 'f',
                  start: 54,
                  end: 55
                },
                generator: false,
                async: true,
                params: [],
                contents: {
                  type: 'FunctionBody',
                  directives: [],
                  leafs: [],
                  start: 57,
                  end: 59
                },
                start: 39,
                end: 59
              }
            ],
            start: 16,
            end: 61
          },
          start: 0,
          end: 61
        }
      ],
      start: 0,
      end: 61
    });
  });

  it('try {} catch(x) { x = 0; }', () => {
    t.deepEqual(parseScript('try {} catch(x) { x = 0; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 13,
              end: 14
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 18,
                      end: 19
                    },
                    operator: '=',
                    right: {
                      type: 'NumericLiteral',
                      value: 0,
                      start: 22,
                      end: 23
                    },
                    start: 18,
                    end: 23
                  },
                  start: 18,
                  end: 24
                }
              ],
              start: 16,
              end: 26
            },
            start: 7,
            end: 26
          },
          finalizer: null,
          start: 0,
          end: 26
        }
      ],
      start: 0,
      end: 26
    });
  });

  it('try {} catch(x) { with ({}) { x = 1; } }', () => {
    t.deepEqual(parseScript('try {} catch(x) { with ({}) { x = 1; } }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            leafs: [],
            start: 4,
            end: 6
          },
          catchClause: {
            type: 'CatchClause',
            binding: {
              type: 'BindingIdentifier',
              name: 'x',
              start: 13,
              end: 14
            },
            block: {
              type: 'BlockStatement',
              leafs: [
                {
                  type: 'WithStatement',
                  expression: {
                    type: 'ObjectLiteral',
                    properties: [],
                    start: 24,
                    end: 26
                  },
                  statement: {
                    type: 'BlockStatement',
                    leafs: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'IdentifierReference',
                            name: 'x',
                            start: 30,
                            end: 31
                          },
                          operator: '=',
                          right: {
                            type: 'NumericLiteral',
                            value: 1,
                            start: 34,
                            end: 35
                          },
                          start: 30,
                          end: 35
                        },
                        start: 30,
                        end: 36
                      }
                    ],
                    start: 28,
                    end: 38
                  },
                  start: 18,
                  end: 38
                }
              ],
              start: 16,
              end: 40
            },
            start: 7,
            end: 40
          },
          finalizer: null,
          start: 0,
          end: 40
        }
      ],
      start: 0,
      end: 40
    });
  });
});
