import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Parentheized', () => {
  // Invalid cases
  for (const arg of [
    'y.)',
    '({static [expr',
    '({foo: {x:y} += x})',
    '({x:y} += x)',
    '(({x:y}) += x)',
    '(a = b)++;',
    '({foo: {x:y} += x})',
    '[] += a',
    '({async **f(){}})',
    '({*=f(){}})',
    '(case)=2',
    '({x = y})',
    '(({ x: x4, x: (x+=1e4) }) = {})',
    '({a: ({1})})',
    //'(a, ...b)',
    '({x = y}.z) => obj',
    '(({ x: y }) = {})',
    '({y: a.g(...[])} = 1)',
    '({y: eval(...["1"])} = 1)',
    '({y: g(...[])} = 1)',
    '({x = y}).z',
    '{ (x = yield) = {}; }',
    '(x = x) = x;',
    '({ x: x4, x: (x+=1e4) } = {})',
    '(({ x: x4, x: (x+=1e4) } = {}))',
    '({a:({a}), b:((({b})))} = {a:{}, b:{}} );',
    '({a}=1)=1',
    '({a:a}=1)=1',
    '({a}=1=1)',
    '({a:a}=1=1)',
    '([{x = y}].z)',
    '({a: x, ...x = y} = obj)',
    '({a: x, ...{x}} = obj)',
    '(true ? { x = true } : { x = false })',
    '({foo() {}} = {});',
    '({get foo() {}} = {});',
    '({set foo(a) {}} = {});',
    `(q, {a: b * x} = d)`,
    '({...a, x } = { x: 1 })',
    '(q, {...a, x } = { x: 1 })',
    '({...a, x, ...b } = { x: 1 })',
    '(q, {...a, x, ...b } = { x: 1 })',
    '({a, ...rest.b + rest.b} = o)',
    '({a:(a,y) = 0} = 1)',
    '({x=y})=z',
    '([a]) = 2',
    '({a}) = 2',
    '({...{z}} = { z: 1})',
    '({...{}} = {})',
    '([x]++)',
    '({ident: {x:y} += x})',
    '5 + (await bar())',
    '(x, /x/g) => x',
    '({x = y}.z = obj)',
    '({a: ({x = (y)})})',
    '({a = [b]} = 1 / d = a)',
    '({(a) = [b]} = 1 / (d = (a)))',
    '({"a" = [b]} = 1 / (d = (a)))',
    '({["a"]: [b]} = 1 / (d = ((a))  => a))',
    '({1: [b.c = x]} = 2 / (3 = ((a)) = a))',
    '({1: [b.c = x]} = 2 / (dd = ((3)) = a))',
    '({a: ("string") / a[3](((((a /= [b.c] = ([x / 2]()=> a)))))) })',
    '({a: ("string") / a[3](((((a /= [b.c] = ([x / 2]())))))=>) })',
    '({a: ("string") / a[3](((((a /= [b.c] => ([x / 2]())))))) })',
    '({a: ("string") / a[3](((((a /= [b.c => a] = ([x / 2]())))))) })',
    '({a: ("string") / a[3](((((a /= [b.(c) => a] = ([x / 2]())))))) })',
    '({a: ("string") / a[3](((((a /= [(b.c) => a] = ([x / 2]())))))) })',
    //  '({a: ("string") / a[3](((((a /= [(c) => a] = ([x / 2]())))))) })',
    '(({a: ("string") / a[3](((((a /= [b.c ] = ([x / 2]())))))) }))=> a',
    '((({a: ("string") / a[3](((((a /= [b.c ] = ([x / 2]())))))) })) = a',
    '({ x }) = { x: 5 };',
    '({start, stop}) = othernode;',
    '({[a]: {...[a[]]}})',
    '({[a]: {x = [a]}})',
    '({{x}: "b"})',
    '({a: {x = y}, "b"})',
    '({a: {x = y}, "b": a})',
    '([{constructor(){}}] = b);',
    '({ident: [foo, bar] += x} = y)',
    '(a.())',
    '( {a, ...{b}} = {/*...*/})',
    '( {a, ...{}} = {/*...*/})',
    '( {a, ...[b]} = {/*...*/})',
    '( {a, ...[]} = {/*...*/})',
    '( [{a, ...[]}] = [{/*...*/}])',
    '({...[]} = x);',
    '(a = 1) = t ',
    '({[b]}})',
    '((a=b))= (a)',
    '(...a) = a',
    '([...++x]= {});',
    '(a,b)=(c,d);',
    '({a = 0});',
    'function f([x[y]] = z) {}',
    '((a=b))= (a)',
    '((a[b]/b))= (a)',
    '[a]= (a?.b=x)',
    '(a)= (a?.b=x)',
    '({a})= (a)',
    '[(a/b)]= (a)',
    '(a?.b)= (a)',
    '([a]) = (a)',
    '([a]) = (a)[a/b]',
    '([a])/= (a)',
    '({+2 : x}) = {};',
    '({x+=y})',
    '({,} = {});',
    '([a,...b,])=>0;',
    '({a:b[0]})=>0',
    '({get a(){}}) => 0;',
    '({}=>0)',
    '(w, ...x, y) => 10',
    '(...x, y) => 10',
    '({ x: y } = {}) = {}',
    '(({ x: y } = {})) = {}',
    '(({ x: y }) = {}) = {}',
    '([a]) = {}',
    '(([a])) = {}',
    '({a: {d = 1,c = 1}.c = 2} = {});',
    '({a: ({d = 1,c = 1}.c) = 2} = {});',
    '({x}) = foo',
    '({x: {..}})',
    '({x: [..]})',
    `(a = b,)`,
    `({a},)`,
    `(a,)`,
    `(a = b,)`,
    '({[foo]: bar()} = baz)',
    '({[foo]: a + b} = baz)',
    '({x: 15.foo()} = x)',
    '({x: 15.foo} = x)',
    '({a:1},)',
    '({[].length} = x);',
    '({[x].length} = x);',
    '({{}.length} = x);',
    '({{x: y}.length} = x);',
    '({delete(){}} = y);',
    '({yield(){}} = y);',
    '({a({e: a.b}){}})',
    '({a:this}=0)',
    '({*a({e: a.b}){}})',
    '(([a]) = [])',
    '([{x = y}].z = obj)',
    '(1) = y = x',
    '(x) = (1) = z',
    '({a: {x = y}}.z) => obj',
    '({a: 1 = x })',
    '(y) = (1) = x',
    '(1) = x',
    '(a,) = x',
    '([x] = y,) = x',
    '({a: {x = y}}.z = obj)',
    '({a: {x = y}.z})',
    '({a: {x = y}}.z)',
    '({a: {x = y}})',
    '([{x = y}]).z',
    '({[x](){}} = z);',
    '(["a"]) = []',
    '([a]) = []',
    '({a}) = 0;',
    '([a]) = 0',
    '({"a"}) = 0;',
    '({a}) = {}',
    '([{x = y}.z])',
    '([{x = y}].z)',
    '({x = y}.z)',
    '({a: {b = 0}.x} = {})',
    '({3200: fail() = x} = x)',
    '(a:) --b',
    '(a++',
    'a(1,,);',
    `([x] = y,)`,
    `({a} = b,)`,
    '({a}) = 0',
    '({a}) = 2;',
    '({a, b}) = {a: 1, b:2};',
    '(((...a)))',
    '({a: ("string") / a[3](((((a /= [b.c => a] = ([x / 2]())))))) })',
    '({...obj1,} = foo)',
    '({...(a,b)} = foo)',
    '({...(a,b)} = foo)',
    '({ a = 42,  b: c = d, })',
    '({a},)',
    '({...{a, b}} = x)',
    '...x => x',
    '([{x = y}.z] = obj)',
    '[{x = y}]',
    '({...{b = 0}.x} = {});',
    '({a: {b = 0}.x} = {});',
    '([x]++)',
    '(()) => 0',
    '({ x = 123 });',
    '({ident: [foo, bar] += x})',
    '((x={15: (await foo)}) => x',
    '({x: 15.foo()} = x)',
    '({x: 15.foo} = x)',
    '({a: (1) = x })',
    '({a: 1 = x })',
    '({ x: x }) = a;',
    '({foo: {x:y} += x})',
    '({foo: {} += x})',
    '({get a(){}})=0',
    '({x}) = {x: 1};',
    '-(5) ** 6;',
    '([a]) = 0',
    '({a}) = 0',
    '(a = b) = c;',
    '({ a: (a = d) } = {})',
    'x = {x: 15.foo()} = x',
    'x = ({}) = b',
    '({15: 15.foo()}=x)',
    '({,a,} = 0)',
    '({a,,a} = 0)',
    '({a = 5})',
    '({a.b} = 0)',
    '({0} = 0)',
    '([...[[][][]] = x);',
    "'(...(...('z'))",
    "((...'z'))",
    '((...z))',
    "'(...(...z))",
    '({async **=f(){}})',
    '({async *=f(){}})',
    '({a: {x = y}}).z',
    '({x:{1:y()=x},x:{7:3}})>x',
    '({a}) = 1;',
    '({x : , y} = {});',
    `({a}) = 0;`,
    `([a]) = 0;`,
    `({a} += 0);`,
    `(a,) = x`,
    `(a,b,) = x`,
    `(a = b,) = x`,
    `([x],) = x`,
    `({a},) = x`,
    `([x] = y,) = x`,
    `({a} = b,) = x`,
    '({set a([a.b]){}})',
    '({set a([a.b]){}})',
    '(y, x) = "string";',
    '(a %= b) %= c',
    '(a + b) /= c',
    '(-1) *= a',
    '(- 0) /= a',
    '(-1) %= a',
    '(- 0) |= a',
    '({b}) = b;',
    '([a]) = x',
    '("a") = "b"',
    '({a([a.b]){}})',
    '({[a,b]:0})',
    '(a',
    '(a:) --b',
    '((a()',
    '(++)',
    '++()',
    '({a: 1} = []);',
    '(...{a: b}.c = [])',
    '([x]) = 0',
    //'({b => []} = [2])',
    '({a: b + c} = [2])',
    '({[a]: b => []} = [2])',
    '({a = b})',
    '({...rest, b} = {})',
    '(({ x = 10 } = { x = 20 }) => x)({})',
    '({Object = 0, String = 0}) = {};',
    '({a,b}) = {a:2,b:3}',
    '({...obj1,...obj2} = foo)',
    '({...obj1,a} = foo)',
    '({ foo }) = {}',
    '({ [...a] = [] })',
    '([a] = []) = {}',
    '(([a] = [])) = {}',
    '(([a]) = []) = {}',
    '([ ...(++y) ]= {});',
    '({a: this} = 0);',
    '(a[b] ? c : d) = (a)',
    '({a: {a=b}.x}) => x',
    '([{a=b}.x]) => x',
    '(true ? x : y) = "FAIL"; ',
    //'(function() { [a] = [...new.target] = []; })',
    '(a.x++)++',
    '({[b], x})',
    '([0])=>0;',
    '({x = y}).z',
    '[{x = y}]',
    '(a,b+=2',
    '(a,b)+=2',
    '(a, b) = c',
    '(a,b)=2',
    '(a=1)+=2',
    '(a=1)=2',
    //'(package)=2',
    '([a + b] = x);',
    '(...);',
    '(...x);',
    '()',
    '(,,)',
    '(,)',
    '(,,) = x',
    '(a,b,) = x',
    '( this ) = x',
    '( new x ) = x',
    '(...a,)',
    '([x],) = x',
    '({a},) = x',
    '(...a,) = x',
    '(...a = x,) = x',
    '([x] = y,)',
    '([x] = y,,,)',
    '(x--, y) => x;',
    '({var(){}} = y);',
    '({class(){}} = y);',
    's = {"foo": null = x} = x',
    's = {"foo": this = x} = x',
    '({"x": y+z} = x)',
    '({ * *x(){} })',
    '({get +:3})',
    '({a: [foo]-(a) {}})',
    '({a: b + c} = [2])',
    '({foo += bar})',
    '((x,x)) = 5',
    '({a} += 0);',
    '({a,,} = 0)',
    '({ x: { get x() {} } } = { x: {} });',
    '({...(a,b)} = foo)',
    '({...})',
    '({...obj1,a} = foo)',
    '({a: b = 0, c = 0});',
    '({(a):0})',
    '(...abc,)',
    '(...a=b=c)',
    '(...abc,)',
    '(...abc=,)',
    '(...abc,=)',
    '(...abc,,,,,,,=)',
    '(...abc,,,,,,,=====)',
    '(...a=b=c)',
    '(...abc,)',
    '(...)',
    '(++x)=b',
    '(--x)=b',
    '(x++)=b',
    '(x--)=b',
    '({x:true = 5})',
    '([[a](b.c) = [[a] = [[a] = ([[a] = x]]]]))',
    '([[a](b) = [[a] = [[a] = ([[a] = x]]]]))',
    '([[a] = [[a] = [[a] = ([[a] = x]]]]))',
    '([...a, ,] = [...a, ,])',
    '({*a([a.b]){}})',
    '({a, b}) = {a: 1, b:2}',
    '([b]) = b;',
    '(a=b.c)=d;',
    'a=(a=b.c)=d;',
    '({a:for} = 0)',
    // '({var} = 0)',
    // '({function} = 0)',
    '({a:function} = 0)',
    '({[foo]: bar()} = baz)',
    '({[foo]: a + b} = baz)',
    '({[a,b]:0})',
    `(x) = (1) = z`,
    '({"a"} = 0)',
    // '({a: b += 0} = {})',
    '({*foo: x(){}})',
    '({*: x(){}})',
    's = {"foo": true = x}',
    '({"x": [y + x]} = x)',
    '({foo: x() = x} = x)',
    '({"foo": x() = x} = x)',
    '(((x,x))) = 5',
    '({get 1(){}})=0',
    '({1}) = {}',
    '({*1(){}} = x);',
    '({"foo": [1 = 2]} = foo);',
    '({"x" = 42, y = 15})',
    '({[x] = 42, y = 15})',
    '({ident: [foo, bar].join("")} = x)',
    '([b]) = b;',
    '({ obj:20 }) = 42',
    '( { get x() {} } = 0)',
    '({get *ident(){}})',
    '({set *ident(ident){}})',
    '([x, y]) = z;',
    '({x, y}) = z;',
    '([a \n/b/]);',
    '(a \n/b/);',
    '({ , })',
    '({ * *x(){} })',
    '({async *=f(){}})'
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
    '({ a: obj.a } = {})',
    '({ a: this.a } = {})',
    '([...[][x]] = x);',
    '([...{}[x]] = x);',
    '({...{b: 0}.x} = {});',
    '({...[0].x} = {});',
    '({...{b: 0}[x]} = {});',
    '({...[0][x]} = {});',
    '({...[1][2]} = {});',
    '({x=0, y:z} = 0)',
    '({x: y,} = 0)',
    '({[a]: a} = 1)',
    '({ foo, bar } = foo);',
    '({ ...bar } = {});',
    '(_a = a.x, x = _a === void 0 ? 1 : _a);',
    '({ ["x"]: x } = 0); ',
    '(({ p = 14 }) => p)({ p : 15 });',
    '((first, ...rest) => first ? [] : rest.map(n => n > 0))(8,9,10);',
    '({[a = b]: {}})',
    '({[a = (b)]: {}})',
    '({[(a)()]: {}})',
    '({a = [b]} = c)',
    '({ }).x',
    '({ x = y } = {});',
    '({ x: [ x ] } = { x: null });',
    '({ x: { x } } = { x: null });',
    '({ x: { x } } = { x: undefined });',
    '({ x: { x } } = {});',
    '({ a: x } = {});',
    '({ x: [ x ] } = { x: undefined });',
    '({[(a)(x = (y))]: {}})',
    '({a = [b]} = 1 * (c = d))',
    '({a = [b]} = 1 * (d = (e)))',
    '({1: [b.c = x]} = 1 / (d = ((a)) = a))',
    '({1: [b.c = x]} = 2 / (dd = ((a)) = 3))',
    '({1: [b.c = x]} = 2 ** (dd = ((a)) = 3))',
    '({1: [b.c = x]} = 1 * (d = ((a)) = a))',
    '([ [ 12()[x] = 10 ] = {} ])',
    '({a: {b: (c)}})',
    '({x} = {x:3});',
    '({...x}[y])',
    '({} = undefined);',
    '([1 || 1].a = 1)',
    '({x, y:[y]} = {x:5, y:[6]});',
    '({ test = 1 } = {})',
    '({x = 0} = 1)',
    '({x = 0,} = 1)',
    '({var: x} = 0)',
    '({b, c, d, ...{a} })',
    '((a)) = b',
    '({}.length)',
    '({}.x)',
    '([].x)',
    '([x].foo) = x',
    '({*15(){}})',
    '({x, ...y}) => x',
    '({...x.y} = z) ',
    '(z = {...x.y}) => z',
    '(foo[x])',
    '(foo) += 3',
    '({a = [b]} = 1)',
    'a += (b + c)',
    'a + (b += c)',
    'a -= b -= c',
    'a -= (b + c)',
    '({[a]:b, ...rest})',
    `({a:b,...obj}) => {}`,
    `({a,...obj}) => {}`,
    '({   async *"foo"(){}   })',
    '({...a+b})',
    '({obj: x, ...a})',
    '({790: this})',
    '({"foo": this})',
    '({ a: 1, ...y, b: 1 })',
    '({ key: bar.foo + x })',
    '({ key: bar.foo = x })',
    '({x = y} = z)',
    '({x = y}) => z',
    '({ async: async.await + x })',
    '({ async: async??await + x })',
    '({ async: async?.await + x })',
    '({async x() {}, async *x() {}, get x() {}, set x(y) {}, set() {}, get() {}});',
    `({...obj} = {}) => {}`,
    `({a:b,...obj} = foo)`,
    `({...a, ...b})`,
    `({...a}=x)`,
    `({obj: x, ...a})`,
    '(a.b = {});',
    '({...[].x} = x);',
    '({...a[x]} = x);',
    '({...[({...[].x} = x)].x} = x);',
    '({[a]: {}})',
    '({"a": "b"})',
    '({["a"]: "b"})',
    '({a = [b]} = c)',
    '({a = [b]} = "a")',
    '({a = [b]} = 1 / (c = d))',
    '({a = [b]} = 1 / (d = (e)))',
    '({"a": [b]} = 1 / (d = (e)))',
    '({["a"]: [b]} = 1 / (d = (e)))',
    '({["a"]: [b]} = 1 / (d = (a	)  => a))',
    '({["a"]: [b]} = 1 / (d = ((a)) = a))',
    '({"a": [b]} = 1 / (d = ((a)) = a))',
    '({a: [b]} = 1 / (d = ((a)) = a))',
    '({"a": [b.c]} = 1 / (d = ((a)) = a))',
    '({"a": [b.c = x]} = 1 / (d = ((a)) = a))',
    '({a: ("string") / a[3](((((a /= b.c))))) })  ',
    '({a: ("string") / a[3](((((a /= [b.c] = x))))) })',
    '({a: ("string") / a[3](((((a /= [b.c] = (x)))))) })',
    '((a, { b = 0, c = 3 }) => { return a === 1 && b === 2 && c === 3; })(1, { b: 2 });',
    '({a: {}})',
    '({1: a})',
    '({1: (a)})',
    '({1: {a: (a)}})',
    '({"string": {a: (a)}})',

    '({...a.x} = x);',
    '({...x.x, y})',
    '([target()[targetKey()]] = source())',
    '() => {([(x), y] = x)}',
    '([ (foo.bar) ] = {})',
    '([ (y) ]= z = {})',
    '([(({ x } = { x: 1 }) => x).a]= z = {})',
    '([(({ x } = { x: 1 }) => x).a] = z = {})',
    '([(x)] = {})',
    '([(x)]= z = {})',
    '([(x),,(y)] = {})',
    '([ (foo.bar) ]= z = {})',
    '([x.y = a] = ([x.y = a] = ([x.y = a] = z)))',
    '({...{}.x} = x);',
    '([...[].x] = x);',
    '([...[([...[].x] = x)].x] = x);',
    '([...{}.x] = x);',
    '({...[][x]} = x);',
    '({...[][x]} = x = y);',
    '({...[][x]} = x = (y));',
    '({...[][x]} = (x) = (y));',
    '({...{}[x]} = x);',
    '({...{}[x = (y)[z]]} = x);',
    '([...[({...{}[x = (y)[z]]} = x)][x]] = x);',
    '([...[][x]] = x);',
    '([...{}[x]] = x);',
    '({...{b: 0}.x} = {});',
    '({...{b: 0}[x]} = {});',
    '({...[0][x]} = {});',
    '({ x : [ y[z] = 10 ] = {} })',
    '([ x ])',
    '([ foo().x ])',
    '([ foo()[x] ])',
    '([ x.y ])',
    '([ x[y] ])',
    '([ { x } ])',
    '([ { x : y } ])',
    '({...a.b} = c)',
    '([ { x : foo().y } ])',
    '([ { x : foo()[y] } ])',
    '([ { x : x.y } ])',
    '([ { x : x[y] } ])',
    '([ { x = 10 } = {} ])',
    '([ { x : y = 10 } = {} ])',
    '([ { x : foo().y = 10 } = {} ])',
    '([ { x : foo()[y] = 10 } = {} ])',
    '([ { x : x.y = 10 } = {} ])',
    '([ { x : x[y] = 10 } = {} ])',
    '([ [ x = 10 ] = {} ])',
    '([ [ foo().x = 10 ] = {} ])',
    '([ [ foo()[x] = 10 ] = {} ])',
    '({ x : y, ...z })',
    '({ x : y = 1, ...z })',
    '({...x})',
    '({a: [b = 1, c = 2][1]} = {a:[]});',
    '({a: [b = 1, c = 2].b} = {a:[]});',
    '({0: x, 1: x} = 0)',
    '({a:let} = 0);',
    '([[]]=0)',
    '({x: y = 0} = 1)',
    '({x: y = z = 0} = 1)',
    '({x: [y] = 0} = 1)',
    '((a,a),(a,a))',
    '((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))',
    '({ x : y } = z = {});',
    '({ x : foo()[y] } = z = {});',
    '({ x : { foo: foo().y } });',
    '[...{a}] = [{}]',
    '({x:z = 1, x1:y = 20} = {});',
    '(q, { x = 10 } = {});',
    '({ x } = { x: 3 });',
    '({ x = 10 } = {});',
    '([a ** b]);',
    '({a, b} = {a: 1, b: 2});',
    '({ident: [foo, bar].join(s)})',
    '({ident: {x}})',
    '({ident: {x:y}/x/g})',
    '(a / b);',
    '(new x);',
    '({ident: {x:y}**x})',
    '(foo + (bar + boo) + ding)',
    '({ident: {x: y}.join(z)})',
    '({ responseText: text } = res)',
    '(foo, [bar, baz] = doo);',
    '([ ...(a) ] = z = {});',
    '([ (foo.bar) ] = z = {});',
    '(1)',
    '[(a)] = 0',
    '([...x.y] = z)',
    '({123(){}})',
    '({123: expr})',
    '({[key](){}})',
    '({[key]: a.b} = c)',
    '({...key = x})',
    '({...key.prop} = x)',
    '({...key})',
    '([(x).foo = x] = x)',
    '(a = b)',
    '((((((((((x))))))))));',
    '([(x)] = z = {});',
    '([...{}.x] = x);',
    '([...[]] = x);',
    '({x = 1} = {});',
    '({ __proto__: x, __proto__: y } = {})',
    '({x:y} = {});',
    '({a:(b)} = 0)',
    '({a:(b) = 0} = 1)',
    '(typeof x)',
    '({web: true,  __proto__: x, __proto__: y});',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})',
    'delete (foo)',
    '({[key]:x2} = {x:20});',
    '({[`abc${"def"}`]:x2} = {abcdef:30});',
    '({x:a.x} = {x:10});',
    '({x:foo().x, y:foo().y} = {x:20, y:30});',
    '(((((({x:foo().x, y:foo().y} = {x:201, y:301}))))));',
    '({[foo()] : z} = z = {});',
    '({[foo()] : (z)} = z = {});',
    '({[foo()] : foo().bar} = z = {});',
    '({x: y} = 0)',
    '({x} = 0)',
    '({x, y = 1, z = 2} = {});',
    '({42 : x} = {})',
    '(async)=2',
    '({200:exp})',
    '({[foo]: x} = y)',
    '({[foo]: bar} = baz)',
    '(true)',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '([a]) => b;',
    '[{x: y.z}] = a',
    '(foo.x)',
    'async ({x=z}, y) => x;',
    'async (foo = yield)',
    'delete ((foo) => foo)',
    '(delete /a/g.x);',
    '(...x) => x',
    'async("foo".bar);',
    '({...x=y});',
    '(4..x)()',
    '({ x = 123 } = a);',
    '({ x: y.z } = a)',
    '({ x: (y) } = a);',
    '(await = "foo")',
    '"use strict"; (await = "foo")',
    '(x, y, ...z) => foo',
    '({ a: (b) } = {})',
    '(async)=2',
    '({200:exp})',
    '[{x: y.z}]',
    '(x + foo)',
    '({a} + foo)',
    '(q, {a} + foo)',
    '(q, {...x.y} = z)',
    '(q, {...x=y});',
    '(q, {...x+=y});',
    '(q, [...x]);',
    '(q, [...x]) => x',
    '({...x.y} = z)',
    '({...x=y});',
    '({...x+=y});',
    '([...x]);',
    '([...x]) => x',
    '({...x+y});',
    '([...x+y]);',
    '([...x]);',
    '([...x=y]);',
    '(0, a)',
    '(a,a)',
    '({...x, ...y});',
    '({...x, y});',
    '({[x]:y} = z);',
    '({x} = y);',
    '([ foo()[x] = 10 ] = z = {});',
    '([ x.y = 10 ] = z = {});',
    '([ x[y] = 10 ] = z = {});',
    '([ [ foo()[x] = 10 ] = {} ] = z = {})',
    '([ [ x.y = 10 ] = {} ]= z = {})',
    '([ [ foo()[x] = 10 ] = {} ] = {})',
    '([ [ foo()[x] = 10 ] = {} ]= z = {})',
    '([ [ x[y] = 10 ] = {} ]= z = {})',
    '([ [ x.y = 10 ] = {} ] = {})',
    '({ x : [ foo().y ] }= z = {})',
    '({ x : [ foo()[y] ] }= z = {})',
    '({ x : [ y.z ] }= z = {})',
    '({ x : [ y.z ] } = {})',
    '([x.y = a] = ([x.y = a?.y] = ([x.y = a] = z)))',
    '([x.y = a] = ([x.y = a?.y] = ([x.y = a] = z)))',
    '([a]) => b;',
    '([a] = b) => c;',
    '([a=[b.c]=d]) => e;',
    '({...[][x, y]} = x)',
    '({...{}[x, y]} = z)',
    '({...[0][x]} = {})',
    '(a.a(b))',
    '(a.a(b,c))',
    '(a.a([]))',
    '(a=b)',
    '(a=b=c)',
    '(a=(b=c))',
    '((a??b.c)??a.b)',
    '((a??b))',
    '(a.a({}))',
    '(a,b)',
    '(a,b,c, 1,2,3)',
    '(a[b])',
    '(a[{}])',
    '(a[[]])',
    '(a[1])',
    '({...{}.x} = x);',
    '({...[0][x]} = {});',
    '((a))()',
    '({} = 0);',
    '({foo: true ** false});',
    '({ x: x } = a);',
    '({ x } = a);',
    'new c(x)(y)',
    '"use strict"; ({ x: a, x: b } = q);',
    `({
      a,
      a:a,
      a:a=a,
      [a]:{a},
      a:some_call()[a],
      a:this.a
    } = 0);`,
    'a = (b = c)',
    '([(x).foo,] = x)',
    '({ a: (b) } = {})',
    '(([a]))',
    '([a] = [])',
    '({a: {x = y}}) => z',
    '4 + 5 << (6)',
    '(a) + (b)',
    '((a)) = 0',
    '(a) = 0',
    '((y)((y /= x), ({} = x)));',
    'void (a)',
    '(a)++',
    '(a) ? (b) : (c)',
    '(a++)',
    '(void a)',
    '({Foo} = {});',
    '({foo, bar} = {foo: 0, bar: 1});',
    '({} = 0);',
    '({ responseText: text } = res);',
    '({f({x} = {x: 10}) {}})',
    '({f: function({x} = {x: 10}) {}})',
    'f = function({x} = {x: 10}) {};',
    '([a.b])',

    '(a[b])',
    '([x])',
    '({x})',
    `({}.length)`,
    '({a, a})',
    '({a, a: 1})',
    '({a: 1, a})',
    '({a: 1, a})',
    `({a: b = x} = d)`,
    `({a: b = x} / d)`,
    `({a: b * x})`,
    `(q, {a: b = x} = d)`,
    `(q, {a: b = x} / d)`,
    `(q, {a: b * x})`,
    `({a: b} = d)`,
    `(x) = (y) += z`,
    `(x) = (y) = z`,
    `(x) += (y) = z`,
    `(foo.x)`,
    `(foo[x])`,
    `(foo) += 3`,
    '(++this.x)',
    '--(((x)));',
    '({a: 1 || 1}.a = 1)',
    '(q, {a: 1 || 1}.a = 1)',
    '(4,(5,a(3,4))),f[4,a-6]',
    '(([a] = []))',
    '(it, { a: [...z] } = it)',
    '() => { [ [ c ] ]  = [ [ "string" ] ]; }',
    '() => { [ { c } ]  = [ { c: "string" } ]; }',
    '() => { ({ c } = { c: "string" }); }',
    '() => { ({ a: { c } } = { a: { c: "string" } }); }',
    '() => { ({ a: [ c ] } = { a: [ "string" ] }); }',
    '({ x: [ x ] } = {});',
    '({ x: [ x ] } = { x: null });',
    '({ x: [ x ] } = { x: undefined });',
    '({ eval } = {});',
    '(x--, y);',
    '((x));',
    '(++x);',
    '({} + 1);',
    '([] + 1);',
    '(q, {} + 1);',
    '(([(((null))), , (([(2).r = (((308)) ? this : (x)), aihgi] = ({}))), (8), (y)]))',
    '(q, [] + 1);',
    'async ([] + 1);',
    '(a(b,c))',
    '(a([]))',
    '(a({}))',
    '(a.a())',
    '([ foo()[x] ] = z = {})',
    '([ foo().x ] = z = {})',
    '([ foo().x ]= z = {})',
    '([ foo()[x] ] = {})',
    '([ x.y ]= z = {})',
    '([ foo()[x] ]= z = {})',
    '(x = (yield) = f) => {}',
    '([ x[y] ] = z = {})',
    '([ [ foo().x ] ]= z = {})',
    '([ x[y] ]= z = {})',
    '([ [ foo()[x] ] ]= z = {})',
    '([ [ foo()[x] ] ] = {})',
    '([ [ x.y ] ]= z = {})',
    '([ [ x[y] ] ]= z = {})',
    '([ foo().x = 10 ]= z = {})',
    '([ foo()[x] = 10 ]= z = {})',
    '([ x.y = 10 ]= z = {})',
    '([ foo()[x] = 10 ] = {})',
    '(x=(await)=y)=>z',
    '({a: 1, b: 1}, y = { ...x, b: 1 });',
    '({a: 1}, y = { a: 2, ...x });',
    '({a: 3}, y = { a: 2, ...x, a: 3 });',
    '({a: 1, b: 1}, y = { a:2, ...x, b: 1 });',
    '({a: 1, b: 1}, y = { ...x, ...z });',
    '({a: 2, b: 2}, y = { ...x, ...z, a:2, b: 2 });',
    '({a: 1, b: 1}, y = { a: 1, ...x, b: 2, ...z });',
    '({ a: 1 }, y = { ...x });',
    '({0: 0, 1: 1}, y = { ...[0, 1] });',
    '(x + y) >= z',
    '(x + y) <= z',
    '(x + y) != z',
    '(x + y) == z',
    '(x + y) == z',
    '(x) / y',
    '(/x/)',
    '(false)',
    '([{}]);',
    '([delete /a/.x]);',
    '([delete /a/g.x]);',
    '([void /=g/m.x]);',
    '([delete foo.bar]);',
    '({ x, y, ...z } = o)',
    '([...[][x]] = x)',
    '(a = 1, b = 2);',
    '([]())',
    '({}())',
    '([](a))',
    '({}(a))',
    '([](a,b))',
    '({}(a,b))',
    '(a())',
    '(a(b))',
    '([a.b] = x);',
    '(x--);',
    '([target()[targetKey(a=b)]] = x);',
    '([].length) = y',
    '([x].length) = y',
    '({}.length) = z',
    '({x: y}.length) = z',
    '({x});',
    '(2 * 3 ** 2, 18)',
    '(1, 2, 3, 4, 5)',
    '([...x=y])',
    '((((a))((b)()).l))()',
    '({...{}})',
    '({a:b,...obj} = foo)',
    '({1: x})',
    '({1: x}=1)',
    '({1: x}=null)',
    '({1: x})',
    '({1: x}=1)',
    '({1: x}=null)',
    '({a: b}=null)',
    '({[x]: 1})',
    '({a}=1)()',
    '({a:a}=1)()',
    `([...x.y] = z)`,
    `(z = [...x.y] = z) => z`,
    `([...x, ...y]);`,
    '([x, ...y]) => x',
    `([...x+=y]);`,
    `([...x=y]);`,
    `([...x]);`,
    '({1: ({}) / (1)});',
    '({1: ({}) ? (1) : [1]});',
    '({1: (x * y - z)});',
    '([arguments] = []);',
    '({})(a = b);',
    '({1: (x = x) });',
    '({ q } = { x = 10 } = {});',
    '({ x = 10 } = {})',
    '(q, { x = 10 } = {})',
    '({ a, b: x })',
    '(x = {eval})',
    '({eval} = x)',
    '({ async x() {} })',
    '({ async x() {} })',
    '({ async [foo]() {} })',
    '({ get 500() {} })',
    '({ set 500(b) {} })',
    '({ set [foo](d) {} })',
    '({a: {b} = 0}) => x',
    '({a: {b: c} = 0}) => x',
    '([x[y]] = z)',
    '(q, [x[y]] = z)',
    '({a: {arguments}.x} = {});',
    '({...{arguments}.x} = {});',
    '({a: (b) = 0})',
    '({a: (b.x) = 0})',
    '({a: (b) = 0} = 1)',
    '({a: (b.x) = 0} = 1)',
    '([...{a = b} = c])',
    '({a: {a: b.x} = 0})',
    '({a: {b: c} = 0})',
    '({a: {b} = 0})',
    '({set a(yield){}})',
    '({a: {b}})',
    '({a: {b}, c})',
    '({a: [b] = 0})',
    '({a: [b.x] = 0})',
    '({a: [b] = 0}) => x',
    '({...{b: 0}[x]} = {});',
    '({...{b: 0}.x} = {});',
    '([target()[targetKey()]] = x);',
    '({...x.x, y})',
    '({...x.x = y, y})',
    '({...x = y, y})',
    '([x.y = a] = z)',
    '([x.y = a] = ([x.y = a] = ([x.y = a] = z)))',
    '([{x = y}] = z)',
    '({..."x".x} = x);',
    '(a.b) += 1;',
    '(a[b]) += 1;',
    '(this[b]) += 1;',
    '(this.a) += 1;',
    '({...{}.x} = x);',
    '([...[].x] = x);',
    '([...[([...[].x] = x)].x] = x);',
    '({...[({...[].x} = x)].x} = x);',
    '({...[].x} = x);',
    '([...[]] = x);',
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
    '([...[][x]] = x);',
    '([...{}[x]] = x);',
    '([...{}[x]] = "x");',
    '({...{b: 0}.x} = {});',
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
    'x=x=x',
    '({"a b c": bar})',
    '(null)',
    '(x, /x/)',
    '(/x/g)',
    '({ a: {prop: 1}.prop } = {})',
    `({ async* f(a, b, ...c) { await 1; } })`,
    `({ await: async })`,
    '({foo(x=new.target){}})',
    '([(x())[y] = a,] = z);',
    '([(x())[y],] = z);',
    '({...(obj)} = foo),({...obj} = foo),({...obj.x} = foo),({...{}.x} = foo),({...[].x} = foo)',
    '({...await} = obj)',
    '({...yield} = obj)',
    '({ident: {x:y}/x})',
    '(async ());',
    '({ident: [foo, bar]/x/g})',
    '({ident: [foo, bar].join("")})',
    '({[x]: y}) => z;',
    '({[foo]: bar} = baz)',
    '([...x]);',
    '([...x]) => x',
    '(z = [...x.y] = z) => z',
    '(z = [...x.y]) => z',
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
    '({a} = b,) => {}',
    '([x] = y,) => {}',
    '("\\u{10FFFF}")',
    '({a},) => {}',
    '([x],) => {}',
    '(obj[0]) = 1;',
    '({a:((((a1))))} = {a:20})',
    '({ set a([{b = 1}]){}, })',
    '({ get a() { super[1] = 2; } });',
    '({a:a1 = r1 = 44} = {})',
    '({a, a:a, a:a=a, [a]:{a}, a:b()[a], a:this.a} = 0);',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    'f = (argument1, [a,b,c])',
    '({[x]:y});',
    '({ident: [foo, bar] + x})',
    '({ident: {x: y}})',
    '([a / b]);',
    `([a
      /b/g]);`,
    '({...[a, b]})',
    '({...a})',
    '({...{a, b}})',
    '({...a} = x)',
    '({x: {}.length} = x);',
    '({x: {}.length});',
    'x({[a]:b});',
    'x({[a]:b, [15]:d});',
    'x({async foo(){}, bar(){}});',
    'x({foo(){}, async bar(){}});',
    '([async (x, y) => {},].x);',
    '([x => {},].x);',
    'x({async "foo"(){}});',
    'x({async [foo](){}});',
    'x({foo(){}, *bar(){}});',
    'x({*foo(){}});',
    'x({*[foo](){}});',
    'x({*get(){}});',
    'x({*123(){}});',
    '({x: {x: y}.length} = x);',
    '({x: false});',
    '({x: function(){}});',
    '({x: typeof x});',
    '({x: void x});',
    '({x: x + y});',
    '({x: new x});',
    '({x: delete x.y});',
    '(a.b) = 1;',
    '(a) = 1;',
    '(a[b]) = 1;',
    '(a.b().c().d) = 1;',
    '(this.a) += 1;',
    '(this.a) = 1;',
    '(this[b]) = 1;',
    '([x, y] = z);',
    '({x, y} = z);',
    '([[x, y] = z]);',
    '(a.b) += 1;',
    '(a.b().c().d) += 1;',
    `([].x);`,
    '(delete foo.bar);',
    '({});',
    '([...[].x] = x)',
    '([...{}[x]] = x)',
    '([...{}.x] = x)',
    '({...[][x]} = x)',
    '({...[].x} = x)',
    '({...a.x} = x)',
    '({...{}[x]} = x)',
    '([...[].x] = x, [...[].x] = x)',
    '([...{}[x]] = x, [...{}[x]] = x)',
    '([...{}.x] = x, [...{}.x] = x)',
    '(x.foo)',
    '(x + foo)',
    '(x.foo = y)',
    '(typeof x)',
    '({ x : [ y[z] = 10 ] = {} }= z = {})',
    '({ x : [ y.z = 10 ] = {} }= z = {})',
    '({ x : [ foo()[y] = 10 ] = {} } = {})',
    '({ x : [ foo()[y] = 10 ] = {} }= z = {})',
    '({ x : [ foo().y = 10 ] = {} }= z = {})',
    '({ x : [ foo().y = 10 ] = {} } = z = {})',
    '({ x : [ y[z] ] }= z = {})',
    '({ x : [ y.z = 10 ] = {} } = {})',
    '([ [ foo().x = 10 ] = {} ]= z = {})',
    '([ x[y] = 10 ] = {})',
    '({x, 15: x} = obj)',
    '({x, a: {x}} = obj)',
    '({x, "foo": x} = obj)',
    '({[a]: x, [b]: x} = obj)',
    '([ x[y] = 10 ]= z = {})',
    '([ [ foo().x = 10 ] = {} ] = z = {});',
    '(function({x1}, [x2]){})',
    '(x => y)',
    '(async x => y)',
    '((x, z) => y)',
    '(async (x, z) => y)',
    '({x = 1, y = 2} = {})',
    '([y]) => x;',
    '({y}) => x;',
    '({x = 10}) => x',
    '([(x),,(y)] = z = {});',
    '([x,,...z] = z = {});',
    '([z, (y), z])',
    '({ y: x = 1 })',
    'c = ({b} = b);',
    '({b} = b);',
    '([b] = b);',
    '(a.b) = {}',
    '(f().a) = 1;',
    '(obj[0]) = 1;',
    '(obj.a) = 1;',
    '({a:((((a1))))} = {a:20})',
    '({a:a1 = r1 = 44} = {})',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    'f = (argument1, [a,b,c])',
    'f = (argument1, { x : x, y : y = 42 })',
    'f = (argument1, [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]])',
    '(argument1, [a,b,...rest])',
    'f = ( {[x] : z} )',
    '(a, b, c, 1, 2, 3);',
    '({[x]:y});',
    `a = (
      b,
      c
    )`,
    '({ a, ...b } = c)',
    '({ x: y } = {})',
    '({ x: x4, x: (x+=1e4) })',
    '(({ x: x4, x: (x+=1e4) }))',
    '([a])',
    '({ x: x4, x: (x+=1e4) })',
    '({ a } = c)',
    '({a, ...b})',
    '(let.a) += 1;',
    '({0: y} = 0)',
    '({ ...c[0]})',
    '({ ...d.x })',
    '({ x: (y) = [] })',
    '({ x: (foo.bar) })',
    '([a = 1])',
    '({ x: (y) })',
    '({x, ...y} = {})',
    '(x + y);',
    '({x,} = 0)',
    '({x,y} = 0)',
    '({x,y,} = 0)',
    '({var: x} = 0)',
    "({'x': y} = 0)",
    '({let} = 0);',
    '({a:yield} = 0);',
    '({yield} = 0);',
    '({yield = 0} = 0);',
    '({[foo]: bar} = {bar: "bar"});',
    '(function*() { [...{ x = yield }] = 0; })',
    '({d=0,f:h().a} = 0)',
    '({[foo2()]: bar3} = {bar: "bar"});',
    '({ [foo]: bar } = { bar: "bar" });',
    '({ ["bar"]: bar2 } = { bar: "bar" });',
    '({ [foo2()]: bar3 } = { bar: "bar" });',
    '(_a = foo, bar = { bar: "bar" }[_a]);',
    '(bar2 = { bar: "bar" }["bar"]);',
    '({ x : [ y = 10 ] = {} })',
    '({ x : [ foo().y = 10 ] = {} })',
    '({ x : [ foo()[y] = 10 ] = {} })',
    '({ x : [ y.z = 10 ] = {} })',
    '({a: {eval}.x} = {});',
    '({...{eval}.x} = {});',
    '[{arguments}.x] = [];',
    '({ z : { __proto__: x, __proto__: y } = z })',
    '({42 : x = 42})',
    '({[1+1] : z})',
    '({[foo()] : z})',
    '({ x : x, y : y })',
    '({...x})',
    '({x, ...y})',
    '({[x] : z, ...y})',
    '([{x:x, y:y}, [a,b,c]])',
    '([{x:x, y:y, ...z}, [a,b,c]] = {})',
    '({[x] : z, ...y} = {})',
    '({[1+1] : z, ...x} = {})',
    '({arguments: x, ...z} = {});',
    '({"x": y} = 0)',
    '([a,,b]=0)',
    '((window.x)) = 9;',
    '((window["x"])) = 10;',
    '([...a] = 0)',
    '([let] = answer);',
    '(a) = {}',
    '(a["b"]) = {}',
    'test = { a: 1 }',
    '(new f()[0]) = 1;',
    '(new f().a) = 1;',
    '([(({ x } = { x: 1 }) => x).a])',
    '(x, y = 9, z = 8) => {}',
    '( [a] = []);',
    '({x, x1:y = 20} = {});',
    '({ a: obj["a"] } = {})',
    '({__proto__: a, __proto__: b} = {});',
    '({} = {});',
    '([a = 1])',
    '({42e-2 : x})',
    '({42e-2 : x = 42})',
    '({a, ...b} = {})',
    '({...b} = {})',
    '({}) => {}',
    '(a, {}) => {}',
    '({}, a) => {}',
    '([]) => {}',
    '(a, []) => {}',
    '([], a) => {}',
    '(a = b) => {}',
    '(a = b, c) => {}',
    '(a, b = c) => {}',
    '([y, [x]]) => x;',
    '({foo: y, a:{bar: x}}) => x; ',
    '({y, a:{x}}) => x; ',
    '({y}) => x; ',

    '() => 42',

    '({x} = {}, {y} = {})',

    '(null);',
    '(new x)',
    '(class{})',
    '(arguments)',
    `({
      a = function() {},
      b = () => {},
      x = function withName() { },
      y = class { },
      z = class ClassName { },
      q = class { static name() { return 42 } },
      foo: bar = function() {},
      inParens = (() => {}),
      inManyParens = ((((() => {})))),
    } = {});`
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

  it('(a)', () => {
    t.deepEqual(parseScript('(a)', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 1,
              end: 2
            },
            start: 0,
            end: 3
          },
          start: 0,
          end: 3
        }
      ],
      start: 0,
      end: 3
    });
  });

  it('(a, b)', () => {
    t.deepEqual(parseScript('(a, b)', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 1,
                  end: 2
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 4,
                  end: 5
                }
              ],
              start: 0,
              end: 5
            },
            start: 0,
            end: 6
          },
          start: 0,
          end: 6
        }
      ],
      start: 0,
      end: 6
    });
  });
});