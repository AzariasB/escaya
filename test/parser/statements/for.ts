import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('leafs - For', () => {
  // Invalid cases
  for (const arg of [
    'do/("while',
    'do\nx;while',
    'do\n/x/g while',
    'do\nwhile',
    'do while',
    'do catch while',
    'do let {} = y',
    // 'do debugger while(x) x',
    // 'do x: function s(){}while(y)',
    // 'do foo while (bar);',
    'do async \n f(){}; while (y)',
    'do let x = 1; while (false)',
    'do async \n f(){}; while (y)',
    // 'do x, y while (z)',
    //'do foo while (bar);',
    //'do ()=>x while(c)',
    'do(x) { case y: {...x} } while',
    'do(x) { case y: foo /a/ while }',
    'do(x) { case y:{ class { x() {} } while }}',
    'do({x=y}) { case y: [...a]  while}'
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
    `for (var i = 0; i < 40000; i++) { src = { ...i, x: -9007199254740991 }; clone = { ...src }; }`,
    `for ([{__proto__: 1, __proto__: 2}];;);`,
    `for ([a];;);`,
    `for ({a};;);`,
    `for (let.foo;;);`,
    `for (let , x;;);`,
    `for (let.x;;);`,
    `for ([], x;;);`,
    `for(x, y;;);`,
    `for (var [[] = function() { a += 1; }()] = [[23]]; b < 1; ) {}`,
    `for (const [ x, ] =  z; a < 1; ) {};`,
    `for (((x)=>{}).x of y);`,
    `for (x(x in t);;) x`,
    `for (const [a=[...b], ...c] of obj);`,
    `for (let [x] in y);`,
    `for ([] + x;;);`,
    `for (let x;;);`,
    `for (let=10;;);`,
    `for (const {a, [x]: y} in obj);`,
    `for (const {[x]: y} = z;;);`,
    `for (const {x : y, z, a : b = c} = obj;;);`,
    `for ({x};;);`,
    `for ({x: a.b};;);`,
    `for (const [[x]] = [null]; ; ) {}`,
    `for (let {...x} = { get v() { count++; return 2; } }; a < 1; ) {}`,
    `for ((x)=>{};;);`,
    `for (((x)=>{}).x ;;);`,
    `for (((x)=>{}).x of y);`,
    `for (() => { this in null };;);`,
    `for (let [foo, ...bar] = obj;;);`,
    `for (let {x} = obj;;);`,
    `for ({x = y} = (z);;) {}`,
    `for (a = b;;);`,
    `for ("foo".bar = x ;;);`,
    `for (let [...foo] = obj;;);`,
    `for (a * b + c * d;b;c);`,
    `for ([a.b] in c) d`,
    `for ({a: b.c} in d) e`,
    `for ([a.b] of c) d`,
    `for ({a: b.c} of d) e`,
    `for ({a: b.c}.foo of d) e`,
    `for (let [foo] = arr, [bar] = arr2;;);`,
    `for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}`,
    `for(function(){};;)x`,
    `for (2 + b;;);`,
    `for ({} + b;;);`,
    `for ([x];;);`,
    `for ("foo".bar;;);`,
    `for ({__proto__: 1, __proto__: 2};;);`,
    `for (((x)=>{}) ;;);`,
    `for(function(){while(x in y)t};;)x`,
    `for(function(){do;while(x in t)};;)x`,
    `function *f(){ for (yield;;); }`,
    `for (function(){};;);`,
    `for (function(){ }[foo];;);`,
    `for (function(){ if (a in b); };;);`,
    `for (function(){ a in b; };;);`,
    `for ({x,...x}=x ;;) ;`,
    `for ({x=y}=x ;;) ;`,
    `for (x[a in b] ;;);`,
    `for (a;b;c);`,
    `for (a;b;);`,
    `for (a;;c);`,
    `for (;b;);`,
    `for (x--;;);`,
    `for (true ? a in b : {}; false; ) ;`,
    `for (var a;;) { let a; }`,
    `for (var x of obj) { const x = 1 }`,
    `for (const foo = bar, zoo = boo;;);`,
    `for (let foo = arr, [bar] = arr2;;);`,
    `for (let {x} = a, y = obj;;);`,
    `for (let {x} = a, obj;;);`,
    `for (const a = x;;) { let a; }`,
    `for (const {x} = a, {y} = obj;;);`,
    `for (let a;;) { let a; }`,
    `var x; for (;;) { let x; }`,
    `for (var x;;) { let x; }`,
    `for ((a * b + c) * d;b;c);`,
    `for (a + b * c * d;b;c);`,
    `for (a;;);`,
    `for (12 instanceof obj;;);`,
    `for (const x = a, {y} = obj;;);`,
    `for ([] instanceof obj;;);`,
    `for (a instanceof b;;);`,
    `for (a.b in c) d;`,
    `for (a()[b] in c) d;`,
    `for ([][b] in c) d;`,
    `for ([{x,...x}]=x ;;) ;`,
    `for ([{x=y}]=x ;;) ;`,
    `for ({x:a.b}=x ;;) ;`,
    `for ([{x:a.b}]=x ;;) ;`,
    `for ({x} = z;;);`,
    `for ([x.y] = z;;);`,
    `for ("abc" + b;;);`,
    `for ([] !== x;;);`,
    `for ({}[y] ^= x;;) x;`,
    `for ({}.u |= c;;) x;`,
    `for ({}[y] ^= x;;) x;`,
    `for ([].u |= c;;) x;`,
    `for ([][y] <<= p;;) x;`,
    `for ([].w ^= s;;) x;`,
    `for (a in b=c);`,
    `for (let [,,] = x;;);`,
    `for (var a in stored = a, {a: 0, b: 1, c: 2});`,
    `for (const {...x} in y){}`,
    `for ({x = y} = (z);;) {}`,
    `for (let [foo, bar=b] in arr);`,
    `for (let [foo=a, bar=b] in arr);`,
    `for (let [foo] = arr, bar;;);`,
    `for (let [foo, ...bar] = obj;;);`,
    `for (let {x} = obj;;);`,
    `for ({x = y} = (z);;) {}`,
    'for (var {x : y = z} = obj;;);',
    'for (var {x = y, z = a} = obj;;);',
    `for (let [foo, bar=b] in arr);`,
    `for (let [foo=a, bar=b] in arr);`,
    'for (var x, {y} = obj;;);',
    `for (let [...foo] = obj;;);`,
    `for (a * b + c * d;b;c);`,
    `for (const {...x} in y){}`,
    `for (var a in stored = a, {a: 0, b: 1, c: 2});`,
    `for ([a.b] in c) d`,
    'for(()=>{a in b};;);',
    `let = 4;
  for ( [let][0]; ; )
    break;
  `,
    'for (var a=1, b=2;;);',
    'for (const foo = bar, zoo = boo;;);',
    'for (var a, b=1;;);',
    'for (var a=1, b;;);',
    'for (let a of b);',
    'for (let [,,] = x;;);',
    'for (let [foo] = arr;;);',
    'for (let foo;;);',
    'for (let foo = bar;;);',
    'for (yield[g]--;;);',
    'for (let foo, bar;;);',
    'for (let [foo] = arr, [bar] = arr2;;);',
    'for (let=10;;);',
    'for (var a=1;;);',
    'for (var a;;) { let a; }',
    'for (var x = 0; x < 1000000; x++);',
    'for (var a,b,c;;);',
    'for (var a;;);',
    'for (var a=1, b=2;;);',
    'for (let x = a, {y} = obj;;);',
    `for(let x = 0;;);`,
    `for (let [,] = a(); b < 1; ) {}`,
    `for (const [ x, ] = y; a < 1; ) {};
   for (const [ x, ] =  z; a < 1; ) {};`,
    'for (var x = 3;;) { const x = 1 }',
    'for (var x = 3;;) { const x = 1 }',
    `for (let [a]=x;;);
   for (let [a]=x;;);`,
    'for (let { x, } = { x: 23 }; a < 1; ) {}; for (let { x, } = { x: 23 }; a < 1; ) {};',
    'for ([] in (class {})) for (;;) continue',
    'for (const [,foo] = arr;;);',
    'for (var {x, y : z} = obj;;);',
    'for (let [[x] = [1]] = []; i < 1; i++) {}',
    'for (const [foo] = arr, bar = arr2;;);',
    'for ([x];;);',
    'for ([x.y];;);',
    'for ([x] = z;;);',
    'for ([x.y] = z;;);',
    'for ({x};;);',
    'for ({x: a.b};;);',
    'for ({a: x + y};;);',
    'for ({x} = z;;);',
    'for ({a: x.y} = z;;);',
    'for ("foo".bar;;);',
    'for ("foo".bar = x ;;);',
    'for ({}.bar ;;);',
    'for ({}.bar = x ;;);',
    'for ([].bar ;;);',
    'for ([].bar = x ;;);',
    'for (let [x] = iter; a < 1; ) {}',
    'for (let [arrow = () => {}] = []; a < 1; ) {}',
    'for (let [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]; a < 1; ) {}',
    'for (let [,] = g(); a < 1; ) {}',
    'for (let [ , , ...x] = values; a < 1; ) {}',
    'for (let { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}',
    'for (let { gen = function* () {}, xGen = function* x() {} } = {}; a < 1; ) {}',
    'for (let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }; a < 1; ) {}',
    'for (let\nfoo;;);',
    'for (let [] = x;;);',
    'for (let x, {y} = obj;;);',
    'for (var a = 0 in stored = a, {});',
    'for (var a = (++effects, -1) in x);',
    'for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2});',
    'for (var a in stored = a, {a: 0, b: 1, c: 2});',
    'for (a * b + c * d;b;c);',
    'for ((a * b + c) * d;b;c);',
    'for ([a.b].foo in c) d',
    'for ({a: b.c} in d) e',
    'for ({a: b.c}.foo in d) e',
    'for (a + b * c * d;b;c);',
    'for(var x = 0;;);',
    'for (let [foo=a, bar=b] in arr);',
    'for (let foo = arr, [bar] = arr2;;);',
    'for (const [...x] in y){}',
    'for (;;);',
    'for (a;;);',
    'for (x--;;);',
    'for (foo=10;;);',
    'for (;;) 12',
    'for (;;) {}',
    'yield\nfor (;;) {}',
    'for (;;) let \n {}',
    'for (let {x} = obj;;);',
    'for (let {x,} = obj;;);',
    'for (let {x : y = z} = obj;;);',
    'for (let a, { b } = {};;) { let a, { b } = {}; { let a, { b } = {}; }}',
    'for (;;) let \n x = 1',
    'for (true ? a in b : {}; false; ) ;',
    'for (a;b;c);',
    'for ((a * b + c) * d;b;c);',
    `for (var c, f; (/[+-\\\\l-]/u); ((class {}).with)) var i;`,
    `for ({da = 2e308} of ([, , , (arguments[((f))]).break = (null)] = (/(?=\\B\\b)/gmuy === njbcpwhomopc.switch))) continue`,
    'for(let\n{} = {};;);',
    'for (let [,] = x;;);',
    'for (let [,,] = x;;);',
    'for (let [foo] = arr;;);',
    'for (let [foo,] = arr;;);',
    'for (let [foo,,] = arr;;);',
    'for (let [,foo] = arr;;);',
    'for (let [,,foo] = arr;;);',
    'for (let [foo,bar] = arr;;);',
    'for (let [foo,,bar] = arr;;);',
    'for (let [foo, ...bar] = obj;;);',
    'for (let [...[foo, bar]] = obj;;);',
    'for (let {} = obj;;);',
    'for (let {x} = obj;;);',
    'for (let {x,} = obj;;);',
    'for (let {x, y} = obj;;);',
    'for (let {[x]: y = z} = a;;);',
    'for (let {a, [x]: y} = a;;);',
    'for (let [foo,] in arr);',
    'for (let {[x]: y} in obj);',
    'for (let {[x]: y = z} in obj);',
    'for (let {x, y} of obj);',
    'for (let x = 1; x < 1; x++) {}',
    'for (let x in {}) {}',
    'for (let x of []) {}',
    'for (var a, b ; ; ) { break } ',
    'for (var a = b, b = a ; ; ) break',
    'for (var a = b, c, d, b = a ; x in b ; ) { break }',
    'for (var a = b, c, d ; ; 1 in a()) break',
    'for (var a in b in c) break',
    'for (;;c);',
    'for (;b;);',
    'for (a;;c);',
    'for (;b;c);',
    'for (a+b;;) c;',
    'for (const [target, weights] of Array.from(weightsPerTarget)) {}',
    'for (x instanceof a>c;;) x',
    'for (let a = b => (b in c); ;);',
    'for (/x/g + b;;);',
    'for ("abc" + b;;);',
    'for (2 + b;;);',
    'for ({} + b;;);',
    'for ([] + b;;);',
    'for (a + b;;);',
    'for ([] !== x;;);',
    'for ([] instanceof obj;;);',
    'for (12 instanceof obj;;);',
    'for (a instanceof b;;);',
    `for ([] + x;;);`,
    `for ([], x;;);`,
    `for ([] + x;;);`,
    `for ({x} = z;;);`,
    `for (a=>b;;);`,
    'for ({x} = y;;);',
    'for ({eval = 0} ;;);',
    'for (let {x : y} = obj;;);',
    'for (let = 1; let < 1; let++) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'for (let [foo] = arr, bar;;);',
    'for (let [foo, ...bar] = obj;;);',
    'for (let {x} = obj;;);',
    'for (let [foo, bar=b] in arr);',
    'for (let {...x} = { get v() { count++; return 2; } }; a < 1; ) {}',
    'for (var [x, y, z] = [1, 2, 3]; a < 1; ) {}',
    'for (var [[x]] = [null]; a < 1; ) {}',
    'for (var [,] = g(); a < 1; ) {}',
    'for (var [...x] = values; a < 1; ) {}',
    'for (const [foo] of arr);',
    'for (const {x = y, z = a} = obj;;);',
    'for (var x of y);',
    `for (var x;;);`,
    `for (let x of y);`,
    `for (let x;;);`,
    `for (let x of y);`,
    `for ([] + x;;);`,
    `for (let x of y);`,
    `for (let [,] = x;;);`,
    `for(()=>{a in b};;);`,
    `for (let foo of bar) { let foo = 1; }`,
    `for (let foo in bar) { let foo = 1; }`,
    `for (((x)=>{}).x in y);`,
    `for ({}.bar = x ;;);`,
    `for ([].bar = x ;;);`,
    `for (var o in ((false)) ^ 2.7262799875259632e293) do ; while ((((eval))))`,
    `for (let [,] = a(); b < 1; ) {}`
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

  it('simple block', () => {
    t.deepEqual(parseScript('{}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2
        }
      ],
      start: 0,
      end: 2
    });
  });

  it('block with lexical', () => {
    t.deepEqual(parseScript('{let foo = bar;}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'LexicalDeclaration',
              isConst: false,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'foo',
                    start: 5,
                    end: 8
                  },
                  initializer: {
                    type: 'IdentifierReference',

                    name: 'bar',
                    start: 11,
                    end: 14
                  },
                  start: 5,
                  end: 14
                }
              ],
              start: 1,
              end: 15
            }
          ],
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('block wrapped in paren', () => {
    t.deepEqual(parseScript('({})'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 3
            },
            start: 0,
            end: 4
          },
          start: 0,
          end: 4
        }
      ],
      start: 0,
      end: 4
    });
  });

  it('with ; separation', () => {
    t.deepEqual(parseScript('{};{};;;;{};'), {
      directives: [],
      end: 12,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 3,
          start: 2,
          type: 'EmptyStatement'
        },
        {
          end: 5,
          start: 3,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 5,
          type: 'EmptyStatement'
        },
        {
          end: 7,
          start: 6,
          type: 'EmptyStatement'
        },
        {
          end: 8,
          start: 7,
          type: 'EmptyStatement'
        },
        {
          end: 9,
          start: 8,
          type: 'EmptyStatement'
        },
        {
          end: 11,
          start: 9,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 12,
          start: 11,
          type: 'EmptyStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('same level', () => {
    t.deepEqual(parseScript('{}{}{}'), {
      directives: [],
      end: 6,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 4,
          start: 2,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 4,
          leafs: [],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('nested', () => {
    t.deepEqual(parseScript('{{}}'), {
      directives: [],
      end: 4,
      start: 0,
      leafs: [
        {
          end: 4,
          start: 0,
          leafs: [
            {
              end: 3,
              start: 1,
              leafs: [],
              type: 'BlockStatement'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });
});
