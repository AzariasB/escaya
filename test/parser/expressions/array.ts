import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Array', () => {
  // Invalid cases
  for (const arg of [
    '[',
    '[,',
    '[] += a',
    '[]=>0',
    'a[5',
    'a[5 + 6',
    '[..., ]',
    '[a b c e f]',
    'x, [foo + y, bar] = doo',
    'a[5',
    'a[5 + 6',
    '[2=y]',
    '[a, ...]',
    '[.../x/ y]',
    '[...x, ...y] = [];',
    '[...{a = 0}.x] = []',
    '[...{0=x} = c] ',
    '[...{a: 0=x} = c] ',
    '[x, y, ...z()] = obj',
    '[x, ...z(), y] = obj',
    '[x, y, ...z = arr] = obj',
    '[x, ...z = arr, y] = obj',
    '[x, ...z + arr, y] = obj',
    '[x, ...y, z] = obj',
    '[...rest,] = {};',
    '[x, y, ...z + arr] = obj',
    '[x, y, ...z = arr] = x = obj',
    '[...a, x] = [1, 2, 3]; ',
    //'[[a] ? x : bcd] = x',
    //'[{ x }?x:y] = x',
    //'[ async ()=>x ] = x',
    '[ true ] = x',
    '[ void x ] = x',
    '[this] = obj',
    //'[...{0} = c] ',
    '[...{true=x} = c]',
    '[...{a: true=x} = c]',
    // '[...{true} = c]',
    '[...{a: function=x} = c]',
    '[...{a: true=x} = c]',
    '[...x, y] = 0',
    '[...x,,] = 0',
    '[...{a: 0} = c]',
    '({x:0 = 5})',
    '([...x=y]) = z',
    '[...x, ] = 0;',
    '[...a, ...b, ...c] = [...a, ...b, ...c]',
    '[a, ...b, {c=0}]',
    '[...this, y] = foo;',
    '[a, ...(b = c)] = 0',
    '[{a=0},...0]',
    '[x()] = obj',
    '[(x())] = obj',
    '[...(x), y] = z',
    '[(a = 1)] = t',
    '[([x])] = y',
    '[...a,] = []',
    '[[...a,]] = []',
    '[({ a: [b = 2]})] = t ',
    '[{b: [([a = 1])]}] = t  ',
    '[{a = b}].x',
    '[([x])] = t; ',
    '[(x.y) = [1/42]/=2]',
    '[{b = 1}]',
    '[{} = 2/=2]',
    '[{x = y}].z',
    '[{x = y}].z = obj',
    '[{x = y}].z = "obj"',
    '[{"x" = y}].z = obj',
    '[{x = "y"}].z = obj',
    '[{x = y}.z] = obj',
    '[a)] = [];',
    '[null] = []',
    '[{ y: 2 }] = {}',
    '[[(x, y)]] = [[]];',
    '[x()] = []',
    '[this] = []',
    '[this = 1] = []',
    '[new.target] = []',
    `({x:0 = 5})`,
    '[new.target = 1] = []',
    '[import.meta] = []',
    '[import.meta = 1] = []',
    '[super] = []',
    '[super = 1] = []',
    '[50] = []',
    '[{a = 0}.x] = [];',
    '({a({e: a.b}){}})',
    '({*a({e: a.b}){}})',
    '({set a({e: a.b}){}})',
    '[((((((x = y))))))] = obj',
    '[{}[x ? {zzz} : (z)] /= ...a]',
    // '[...{a = b} = c] = d;',
    '[{} = 2/=2]',
    '[[1] /= e ? f : g ]',
    '[{x=y} = 2/=2]',
    `[...{0=x} = c] `,
    '[a, ...b,,] = 20',
    '[a, ...b = 20] = 20',
    '[a, ...b, c] = 20',
    '[...a, ] = b',
    '[{a=b}]',
    '[x.[y] = 42]',
    '[x.[y] = [z]]',
    '[([async])] = x',
    '[{x = y}]',
    '[++a] = [];',
    '[a + 1] = [];',
    '[1, a] = [];',
    '[((a)] = [];',
    '["string"] = []',
    '[false] = []',
    '[[foo].food()] = x',
    '[[foo].food() = x] = x',
    '[a.g(...[])] = []',
    '[{a = b}.c]',
    '[a,b+=[x,y]] = z',
    '[{x = y}]',
    '[([async])] = x',
    '[{a = 0}.x] = [];',
    '[(50)] = []',
    // '[function f() {}] = []',
    // '[async function f() {}] = []',
    // '[function* f() {}] = []',
    '[a=5, b=(7).c.(d)] = ([1])',
    // '[function(){}] = x',
    '[null] = x',
    '[x] += 0',
    '[{a=0},{b=0},0] = 0',
    '[(x)](y) = obj',
    '[([b])] = t;',
    '[{x = y}]',
    '[([a])] = 12;',
    '[[(x, y)]] = x;',
    '({a: {b = 0}.x} = {})',
    '[(a = b.call(c)) = (a = b * 2)]',
    '[x()] = a;',
    '[a] *= 0;',
    '[ ] [ [ ] >[ ]< [ ] ] [ ]',
    '([foo]) = arr;',
    '[{..}]',
    '[[1]] = [];',
    '[[..]=x]',
    '[{a: 1} = []];',
    '([a]], ...[bcd] = (x))',
    '[x=await y]=z',
    '[ x += x ] = a;',
    '[(a = 0)] = 1',
    '[{x=1, y = ({z=2} = {})}];',
    '[[a] = [[a] = [[a] = ([[a] = x]]]])',
    '[[[a.b =[{ x: x.b }]]]] = ([{ a = b / 2}])',
    '[[[a.b =[{ x: x.b = 123 }]a(b=c)]]]',
    '[(a.b.c.d = e) = ()]',
    '[(1) = (a = b.c)]',
    '[() = ()]',
    '[(a=5, b=(x)) = y] = ([1]);',
    '[(a=5, b=(7))] = ([1]);',
    '[...a, ,] = [...a, ,]',
    '[this=x]',
    '[this]=x',
    '[true = x] = x',
    '[false] = x;',
    '[x + y] = x;',
    '[{} = 2/=2]',
    '[ x + y ] = x',
    '[a,b^=[x,y]] = z',
    '[(x, y)] = x;',
    '["b" /= e ? f : g ]',
    '[([b].c.(d)) **= e ? f : g /= 1]',
    '[true = x] = x',
    '[["b"] /= e ? f : g ]',
    '[/[/]',
    '[{a = 0}.x] = [];',
    // '++[a];',
    'let [...x=y] = z',
    '[, x, ...y,] = 0',
    '[v] += ary',
    '[[..][foo]] = x',
    '[[..].foo] = x',
    '[[..]], x]',
    '[[..].x]',
    '[[..], x]',
    '[[..]]',
    '[a=5], b=7] = ([1]) = x;',
    '[(a=5], b=(x)) = y] = ([1]);',
    '[(a=5], b=(7))] = ([1]);',
    '[a=5], b=(7).c.(d)] = ([1])',
    '[a=5], b=(7).c.(d)[e]] = ([1]);',
    '([[a](b) = [[a] = [[a] = ([[a] = x]]]]))',
    '([[a](b.c) = [[a] = [[a] = ([[a] = x]]]]))',
    '({[a / b = c]: {}})',
    '([x]=await y)=>z',
    '[...], ...]',
    '[...x += y] = a;',
    '[{x = y}] in z',
    '[...a = 1 = a]',
    '[...1 = a]',
    '[x], ...y], z] = obj',
    '[x], y], ...z()] = obj',
    '[x], ...z = arr], y] = obj',
    '[x], ...z()], y] = obj',
    '[x, ...z + arr], y] = obj',
    '[...this] = obj',
    '[...new] = x',
    '[..."foo"=x] = x',
    '[...[a](1)=2] = 3',
    '[...[a].1] = 3',
    '[...[1], "a"(b)] = x',
    '[...[1], ["a"](b)] = x',
    '[...]',
    '[..."x"=b]',
    '[...a=b] = x',
    '[..."foo".foo=x] = x',
    '[x], y], ...z = arr] = obj',
    '[x], y], ...z = arr] = x = obj',
    '[..."foo"+bar] = x',
    //'[ ...[ ( [ a ] ) ] ] = a;',
    //'[...[(x, y)]] = x;',
    '[...[a](1)] = 3',
    '[...[x].map(y], z)] = a;',
    '[ ...([a] = []) = a;',
    '[...++x] = a;',
    '[...x--] = a;',
    '[...!x] = a;',
    '[...x + y] = a;',
    '[...z = 1] = a;',
    '[x], y], ...z = 1] = a;',
    '[...x],] = a;',
    '[x], ...y, z] = a;',
    '[x], y], ...z()] = obj',
    '[new x] = x',
    '[typeof x] = x',
    '[void x] = x',
    '[--x = 1]',
    '[x--] = a;',
    '[x + y] = x',
    '[50] = a;',
    '[0] = 0',
    '[[async].await()] = x',
    '[--x = 1] = a;',
    '[ (++y) ] = a;',
    '[ ([a]) ] = a;',
    '[(foo())] = a;',
    '[x[yield]]] = value;',
    '[...0,{a=0}]=0',
    //'[...{a=0}]',
    '[...{a=0}],]=0',
    '[...0,...{a=0}]=0',
    '[...0,a]=0',
    '[a,b,...rest, x] = x',
    '[x, y], ...[z] = [1]] = a;',
    //'[...[z] = [1]] = a;',
    '[[x], ...y, z] = a;',
    '[this = 1] = a;',
    '[...x],] = a;',
    '[...!x] = a;',
    '([(({a})], ({b = c / 2}))])',
    '([(({a[d]})], ({b = c / 2}))])',
    '([(({a.b.c[d]})], ({b = c / 2}))])',
    '([a] / ...bcd)',
    '[() = ()]',
    '[(1) = (a = b)]',
    '[break]',
    '[((((((x = y))))))] = obj',
    '[(a = b.call(c)) = ()]',
    '[[[[[[[a=b] = c]]] = c] = (c=d)] = c] = ({a = b}) = foo;',
    '[(a = b.call(c)) = (a = b / 2)]',
    '[ delete x.y ] = x'
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
    '[foo, [x,y = 20,z], bar = B] = arr;',
    '[a, b] = c = d',
    '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;',
    'x, [foo, bar] = doo',
    '[{}[x]] = y',
    '[[][x]] = y',
    '[a[x.y] = a] = z',
    '[a[x.y] = a + b] = z',
    '[x()[y] = a + b] = z',
    '[new x()[y]] = z',
    '[new x()[y] = a + b] = z',
    '[new x()[y] = a] = z',
    '[x().y = a] = z',
    '[{x = y}] = z',
    '[new x().y] = z',
    'x, [foo, bar] = doo;',
    '[new x().y = a + b] = z',
    '[x, y, ...z] = obj',
    '[[x] = true] = y',

    '[(x())[y],] = z;',
    '[((((a)))), b] = [];',
    '[x] = obj',
    '[(x.y)] = obj',
    '[[1].c] = [];',
    '[foo] = arr;',
    '[...x.list] = a;',
    '([(x), y] = x);',
    '[{a: 1}.c] = [];',
    '[...let [x] = y]',
    '[x, y, ...z = 1]',
    '[(x)] = obj',
    '[x, y, z = 1]',
    'function a([x, , [, z]]) {}',
    `[this];`,
    '[,a,]',
    '[a,,,,,,,,,b]',
    '[,,]',
    '[[]]',
    '[...[x]] = x',
    '[[{},{}]]',
    '[{}[foo]] = x',
    '[this]',
    '[a.b=[c.d]=e] = f',
    '[{x: y.z}]',
    '[((((a)))), b] = [];',
    '[...z = 1]',
    '[arguments] = []',
    '[x, {y = 1}] = [0, {}]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '[a,,b] = array;',
    '[{a = 0}] = [{}];',
    'function f([...[{a = 0}]]) {}',
    'function f1({a} = {a:1}, b, [c] = [2]) {}',
    'h = ([...[{a = 0}]]) => {};',
    '[a,b,...rest]= {}',
    '[a,,...rest]= {}',
    '[[...x] = [2, 1, 3]]',
    '[foo()[x] ] = {}',
    '[ x[y] ]',
    '[{ foo: foo().y = 10 }]',
    '[{ x : y[z] = 10 } = {}]',
    '[{ x : foo().y = 10 } = {}]',
    '[[ foo()[y] ]]',
    '[{ x : [ y ] } = {}] = z',
    '[{ x : { foo: foo().y } } = {}] = z',
    '[{ x : { foo: foo()[y] } } = {}] = z',
    '[{ x : y[z] } = {}] = z',
    '[{ z : { __proto__: x, __proto__: y } = z } = {}]',
    '[{ foo: y[z] = 10 } = {}]',
    '[ x.y ] = {}',
    '[[ { x : foo()[y] } ]] = {}',
    '[{x: 1, y: 2, a: 5, b: 3}]',
    '[ { x : y } ] = {}',
    '[ { x : foo().y } ] = {}',
    '[ { x : foo()[y] } ] = {}',
    '[ { x : x.y } ] = {}',
    '[ [ x ] ] = {}',
    '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]] = {}',
    '[x,,y] = {}',
    'x, [foo, bar] = doo',
    'x = [a, b] = y',

    '[x.a=a] = b',
    '[...[...a[x]]] = b',
    '[{a=0},{a=0}] = 0',
    '[[[[[[[[[[[[[[[[[[[[{a=b[0]}]]]]]]]]]]]]]]]]]]]]=0;',
    '[a = 0, ...{b = 0}] = 0',
    '[{a=0}, ...b] = 0',
    '[a, b] = [b, a]',
    '[...a] = [];',
    '[a] = [,,];',
    '[[a]=[1]] = [];',
    '[((((((x.y))))))] = obj',
    '[((((((x))))))] = obj',
    '[(x.y)] = obj',
    '[(x), async] = await;',
    '[,,a] = [];',
    '[,...a]',
    '[a, ...(b=c)]',
    '[ 0, ]',
    '[...x] = it',
    '[[ x ]] = [null];',
    '[ x ] = [];',
    '[ ...x ] = [];',
    '[...x[yield]] = [];',
    '[ a = x += 1, b = x *= 2 ]',
    '[arguments = 4, eval = 5]',
    '[ x = yield ]',
    '[ x = async ]',
    '[[ _ ]]',
    '[[ x ]]',
    '[x.y]',
    '[4]',
    '[ x , , ]',
    '[ x , ...y ]',
    '[...x, y]',
    '[...x,]',
    '[...x, ...y]',
    '[ , ...x]',
    '[, , x, , ...y]',
    '[...x = 1]',
    '0, [...x.y] = [23];',
    '[x = 23]',
    '[{ x: null }]',
    '[{ a: 4 }]',
    '[{}]',
    '[{[foo()] : foo().bar}]',
    '[_, x]',
    '[(x) = y] = z',
    '[(x) = y]',
    'a = {...b.c} = d;',
    '[ [ x[y] ] ] = x',
    '[ x = 10 ] = x',
    '[ foo().x = 10 ] = x',
    '[ foo()[x] = 10 ] = x',
    '[ x.y = 10 ] = x',
    '[ x[y] = 10 ] = x',
    '[ { x = 10 } = {} ] = x',
    '[ { x : y = 10 } = {} ] = x',
    '[ { x : foo().y = 10 } = {} ] = x',
    '[[y] = /a/ ]',
    '[{y} = /a/ ]',
    '[ { x : foo()[y] = 10 } = {} ] = x',
    '[ [ x = 10 ] = {} ] = x',
    '[ [ foo()[x] = 10 ] = {} ] = x',
    '[ [ x.y = 10 ] = {} ] = x',
    '[x,y,z] = x',
    '[x, y = 42, z] = x',
    '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]] = x',
    '[(x)] = x',
    '[((x, y) => z).x] = x',
    '[((x, y) => z)["x"]] = x',
    '[ ...(a) ] = x',
    '[ (foo.bar) ] = x',
    '[[].length] = x',
    '[[x].length] = x',
    '[{}.length] = x',
    '[...true]',
    '[..."f".toString()]',
    '[...50]',
    '[..."foo".bar]',
    '[...(x)]',
    '[...(x,y)]',
    '[..."x".y]',
    '(x|y)^y',
    '[...{a = b}] = x',
    '[..."x" + y]',
    '[[[[z++]]]]',
    'array[1] === 2',
    '[5, ...[6, 7, 8], 9]',
    '[() => {}]',
    '[abc => {}]',
    '[x,,,]',
    '[x,,y]',
    '[this];',
    '[,,,]',
    '[,,x]',
    '[x, y, ...z]',
    '[x.y] = z',
    '[x().y] = z',
    '[1, 2, ...target = source]',
    '[[ x ]] = [ , ];',
    '[[ x ]] = [undefined];',
    '[ a = x += 1, b = x *= 2 ] = value',
    '[a,b=0,[c,...a[0]]={}]=0;',
    '[{a=b}=0]',
    '[...a[0]] = 0;',
    '[x, , [, z]] = [1,2,[3,4]]',
    '[{ x }] = [null];',
    '[{ x }] = [];',
    '[{ x }] = [ , ];',
    'a = [{ x = yield }] = value;',
    'a = [[x[yield]]] = 123;',
    '[a = 0, ...{b = 0}] = 0',
    '[x.a=a] = 0',
    '[a, ...b] = c;',
    '[...a] = b;',
    '[{ a, b }, ...c] = d;',
    '[a, ...[b, c]] = d;',
    '[a, b] = [b, a];',
    '[x = 10, y = 5, z = 1] = a;',
    '[x = 10, y, z] = a;',
    '[ok.v] = 20;',
    '([y]) => x;',
    '[x=10] = x',
    '[x = 10, [ z = 10]] = a;',
    '[x, , [, z]] = [1,2,[3,4]];',
    '[x[a]=a] = 0',
    '[ { x = 10 } = {} ]',
    '[ { x : y = 10 } = {} ]',
    '[ { x : foo().y = 10 } = {} ]',
    '[ { x : foo()[y] = 10 } = {} ]',
    '[ { x : x.y = 10 } = {} ]',
    '[ { x : x[y] = 10 } = {} ]',
    '[ [ x = 10 ] = {} ]',
    '[ [ foo().x = 10 ] = {} ]',
    '[ [ foo()[x] = 10 ] = {} ]',
    'function x([ a, b ]){}',
    '[{a = b} = x]',
    '[{x: y.z}] = a',
    '[{a}] = x',
    '[{a:b}] = x',
    '[{a:b}] = x',
    '[{a:1}.foo] = x',
    'x, [foo = y, bar] = doo',
    '"use strict"; const { [eval]: []} = a;',
    'function *f(){ return [...yield]; }',
    '[x = true] = y',
    '[[x] = true] = y',
    '["foo".foo] = x',
    'result = [...{ x = yield }] = y;',
    '[/foo/.length] = x',
    'function* g() {   [...{ x = yield }] = y   }',
    '[[x = true] = true] = y',
    '[...{x}=y];',
    '[(a)] = 1',
    '[...x.list];',
    '[...x.list] = a;',
    '[a, {b:d}, c] = obj',
    '[a, {[b]:d}, c] = obj',
    '[please, {[make]: it}, stop] = bwahahahaha',
    '[pweeze = [pretty] = please, {[make]: it}, stop] = bwahahahaha',
    'log({foo: [bar]});',
    'log({foo: [bar]} = obj);',
    '[...{a = b} = c];',
    '[a, {b}, c] = obj',
    '[z++]',
    '[...a === e ? f : g ]',
    '[...a === e ? f : g ]',
    'x = { ...1 ? a : []}',
    '[foo = A, bar = B] = arr;',
    '[{}.foo] = x',
    `[...await]`,
    `[...{x}**y]`,
    '[a=[...b], ...c] = obj;',
    `x = [a, ...b]`,
    '[]',
    '[]',
    '[[,,]]',
    '[[],,]',
    '[[[]]]',
    '[[],[]]',
    '[]',
    '[ ([a] = []) ]',
    '[(foo())]',
    'x, [foo, bar] = doo;',
    '[(50)]',
    '[(a) = b] = [];',
    '[(a.b)] = [];',
    '[x().foo = x] = x',
    '[x + y]',
    '[x]',
    '[a.b] = c',
    '[a] = b;',
    '[x, y]',
    '[x = y]',
    '[x.y = z]',
    '[x = y, z]',
    '[x = true]',
    '[x, z]',
    '[x, z = {}]',
    '[x, (z)]',
    '[(x), (z) = x]',
    '[x, z = y() ** 2]',
    '[x /= 2, z]',
    '[x(y), z]',
    '[x, z() ** y]',
    '[x, z.y = (foo) ** 2]',
    '[x, z][[x2>>>3]]',
    '[...x]',
    '[x,y,...z]',
    '[x,,...z]',
    '[ ...(foo.bar) ]',
    '[a = 1]',
    '[ (y) ]',
    '[ (foo.bar) ]',
    '[x, y, ...z] = obj',
    '[{}.x] = y',
    '[x, ...y, z]',
    '[x, y, ...z()]',
    '[x, y, ...z + arr]',
    '[x, ...z = arr, y]',
    '[x, ...z + arr, y]',
    '[x, ...z(), y]',
    '[foo, [x,y,z], bar = B] = arr;',
    '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;',
    '[foo, [x,y = 20,z], bar = B] = arr;',
    '[[x].length - 2, z() - 2]',
    '[x.b = 2, z]',
    '[x.b /= 2, z]',
    '[x.b /= 2, z.y().foo ** bar]',
    '[x, z ? (2) : y]',
    '[x, z = y ? (2) : y]',
    '[x] = obj',
    '[x().foo = x] = x',
    '[x().foo] = x',
    '[(a), b] = [];',
    '[x().foo = x, x().foo = x, (x)] = x ** y',
    '[(x), (y) = z, (z) ? x : 2] = x ** y',
    '[{}, {x: b = c ? d : e}]',
    '[[foo].length] = {}',
    '[[foo].length = x] = x',
    '[a[x.y]] = z',
    '[x()[y]] = z',
    '[x.y = a] = z',
    '[a,b=[x,y]] = z',
    '[[].x] = y',
    '([x[y]] = z)',
    '[5..length] = x',
    '[(a)] = x',
    '[(a) = x] = x',
    '[((((vrh190 )))) = 5184] = []',
    '[(x).foo = x] = x',
    '[([1].c)] = []',
    '[(x().foo)] = x',
    '[x()[y] = a ] = z',
    '[a[x.y] = a + b] = z',
    '[a[x.y] = a] = z',
    '[x.y] = z',
    '[...[{prop: 1}.prop]] = []',
    '[this.a ] = []',
    '[1 <= 0]',
    '[a, ...b=c.d = 2]',
    '[a, ...b=c]',
    '([a, ...b=c])',
    '[ c.d === (e ? f : g )]',
    '[["b"] === e ? f : g ]',
    '[([b].c.d) === e ? f : g ]',
    '[([b].c.d) === e ? f : g /= 1]',
    '[...{}[x ? {zzz} : (z)] /= a]',
    '[..."b" === e ? f : g ]',
    '[...[b].c.d === e ? f : g ]',
    '[...{}[x ? y : z] += a]',
    '[...[][x ? y : z] += a]',
    '[ ...c.d === e ? (f) : (g) ]',
    '[(x.y) = 42]',
    '[x.y = 42]',
    '[[], [b, c], []];',
    '[a,, b,];',
    '[a,,,, b];',
    '[a, b,, c];',
    '[(a), ] = x;',
    '[ [b].c.d === e ? f : g ]',
    '[ c.d === (e ? f : g ) ? x : y]',
    '[([b].c.d) === {string} ? f : g ]',
    '[([3].c.d) === e ? f : g /= 1]',
    '[(x.y) = [1/42]]',
    '[{}[x ? {zzz} : (z)] /= a]',
    '[ c.d === e ? (f) : (g) ]',
    '[{}[x ? y : z] += a]',
    '["b" === e ? f : g ]',
    '[ c.d === (e ? f : g ) ? x : y]',
    '[(a) = (b)]',
    '[(x) = y = (z)]',
    '[a=5, b=7] = [1];',
    '[a=5, b=(7)] = ([1]);',
    '[a=5, b=(async)] = ([1]);',
    '[({a})]',
    '[({a}), ({b})]',
    '[(({a}), ({b}))]',
    '([(({a}), ({b}))])',
    '[1, ...rest]',
    '[...rest, 1]',
    '[...rest, ,1]',
    '[{a: 0}.x] = [];',
    '[[0].x] = [];',
    '[...{a: 0}.x] = [];',
    '[...[0].x] = [];',
    '({a: {b: 0}.x} = {});',
    '({a: [0].x} = {});',
    '({...{b: 0}.x} = {});',
    '({...[0].x} = {});',
    '({...{eval}.x} = {});',
    '[{eval}.x] = [];',
    '[[[[[[[101]]]]]]];',
    '[[[[[[[a]]]]]]] = b;',
    '[[[[[[[a=b]]]] = c] = c] = c] = c;',
    '[[[[[[[a=b] = c] = c] = c] = c] = c] = c] = c;',
    '[[[[[[[a=b]] = c]] = c] = c] = c] = c;',
    '[[[[[[[a=b] = c]]] = c] = c] = c] = c;',
    '[[[[[[[a=b]]]] = c] = c] = c] = c;',
    '[[[[[[[a=b] = c] = c] = c] = c] = c] = c] = [[[[[[[a=b] = c]]] = c] = c] = c] = c;',
    '[[[[[[[a=b]] = c]] = c] = c[[[[[[[a=b] = c]]] = c] = c] = c] = c] = c] = c;',
    '[ x = yield ] ',
    '0, [[ _ ]] = [null];',
    '[[1]];',
    '[[a] ? x : bcd]',
    '[[a] / bcd]',
    '([a] / bcd)',
    '[ x ] = [];',
    '[a, b] = f(() => {  }); ',
    '[a, b] = f(() => { [a, b.c] = [d.e, (f.g) = h] }); ',
    '([a, b] = f(() => { [a, b.c] = [d.e, (f.g) = h] }));',
    '[a, b] = f(); ',
    '[(a) = (b)]',
    '[(x) = y = (z)]',
    '[(x) = y = (z) => (a)]',
    '[(x) => y = (z)]',
    '[(x), y = x] = x;',
    '[(x), y] = x;',
    '[(async), y] = x;',
    '[(x), async] = x;',
    '[(x), await] = x;',
    '[a, b, c];',
    '[ x[yield] ] = [33];',
    '[5[foo]] = x',
    '[,] = [];',
    '[] = null',
    '[{a: 1, b: 2, ...null}]',
    '[{a: 1, b: 2, ...o}]',
    '[5, ...[6, 7, 8], 9]',
    '[,,,1,2]',
    '[,,,,,,,,,,,,,,,,,,,,,,,,,]',
    '[,,,,a,,,,,,b,,,,,,,,,1,,,,,,]',
    '[,,,,,,,,[5, ...[6, 7, 8], 9],,,,,,,,,,,,,,,,,]',
    '[,,,,,,,,,,,,,,,,,,,,,,,,,]',
    '[,,,,,,,,,,,,,,,,,,,,,,,,,]',
    `[({a: 1}.c)] = [];`,
    '[,,3,,,];',
    '[[1,2], [3], []];',
    '0, [ x = y ] = [];',
    '[(a) = 0] = 1',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '[([1].c)] = [];',
    '[a = (b = c)] = 0',
    '[(a = 0)]',
    '({a:(b)} = 0)',
    `[,a,,]`,
    `[,a,a,]`,
    `[,a,]`,
    `[,a,,]`,
    `[,a,a,]`,
    `[,,a]`,
    `[,a,a]`,
    `[,,a,]`,
    `[,,a,]`,
    `[,,,a]`,
    `[,,a,a]`,
    'a = [,]',
    'a = [,]',
    '[[1,2], [3], []]',
    '[1,2,,4,5]',
    '[0, ...a];',
    '[...iter];',
    'a = [a = [,],a = [a = [,],a = [,]]]',
    'async = [,]',
    `async ([[[]]]) => [[,,a,a=> {}]]`,
    `[[,,a,a=> {}]]`,
    `[[,,a=> {},a]]`,
    `[[a=> {},,a,]]`,
    `[[] = [9], {} = [], c = d, [,,a,a=> {}]]`,
    `[[,,a,a=> {}]]`,
    '([].x);',
    '[...this, y];',
    '[...x, y];',
    '[...x];',
    '[...a]',
    '[...a,]',
    '[...a, ,]',
    '[, ...a]',
    '[...a, ...b]',
    '[...a, , ...b]',
    '[...[...a]]',
    '[...[...async]]',
    '[, ...a]',
    '[, , ...a]',
    '[,]',
    `[...50..bar]`,
    `[...50]`,
    '[...a=b]',
    '[{}.foo] = x',
    '[{}[foo]] = x',
    `[[]]`,
    '([...x]) => x',
    '([...x]);',
    '([...x=y]);',
    '([...x, ...y]);',
    '([...x.y] = z)',
    '([...x, ...y]);',
    '[{}.foo]=x',
    '[5[foo]]=x',
    `[x]=y`,
    `[x=y]=z`,
    `({15: bar});`,
    `({15(){}});`,
    `({15: bar}) => x`,
    '[...a.b] = c',
    '([...a.b] = c)',
    '([...[x]]) => x',
    '[(a)] = x',
    '(z = [...x.y] = z) => z',
    '(z = [...x.y]) => z',
    '[...[x]=y];',

    `[...a = b] `,
    'result = [ x = yield ] = [[22]];',
    'result = [[x[yield]]] = [[22]];',
    '[{...o, ...o2}]',
    '({...this, y})',
    '(null, [...[]])',
    'apply(null, [...[]])',
    '[...target = source]',
    '[foo.foo, foo.bar] = [1, 2];',
    '({ a: {prop: 1}.prop } = {})',
    '[foo, bar] = [0,1];',
    '[a,a,,...a]=0',
    '[...a[0]] = 0',
    `({25: true})`,
    '[a.b=[c.d]=e] = f;',
    '([a=[b.c]=d]) => e;',
    '[{x: y.z}] = a',
    '([a] = b) => c;',
    '([a]) => b;',
    '[...x] = y;',
    '[...async] = y;',
    '[...this];',
    '[...new x];',
    '[...x/y];',
    '[...x = x];',
    '([...x=y])',
    'async([].x);',
    '[...[a]=1]',
    '[...[1]]',
    'a = [,] = b = [] = c[9]',
    'a = [(b), (c), (d)]',
    'a = [(b) => {}, (c) => {}, (d) => { [b]}]',
    'a = [(b) => {}, [(b) => {}, (c) => {}, (d) => { [b]}]]',
    'a = [,]',
    'a = [,]',
    'a = [a = [,],a = [a = [,],a = [,]]]',
    '[...(x), y]',
    `[...{a: b.b}.d] = c`,
    `[...{a: b}.c] = []`,
    `[...[{a: b}.c]] = [];`,
    '[...{length}] = [ 1, 2, 3]',
    `[(a) = x] = x`,
    `[a, {[b]:d}, c] = obj`,
    `[(a)] = x`,
    '[a, b, [c, d], e=2, ...f] = g',
    '[a]={b}=c',
    '[...bar]',
    '[a, ...bar]',
    '[...bar, a]',
    '[...bar,,,,]',
    '[,,,,...bar]',
    '[{}.x] = y',
    '({a: x = true} = y)',
    '[[ x ]] = [null];',
    '[.../x/]',
    '[.../x/+y]',
    '[.../x//y]',
    '[.../x/g/y]',
    'function foo([{y1:y1 = 1} = {y1:2}] = [{y1:3}]) {}',
    '[[ x ]] = [ , ];',
    '[[ x ]] = [undefined];',
    '[[ x ]] = [];',
    '[1,2,3,4,5]',
    '[, ...(o.prop)]',
    '[, ...(o.call().prop)]',
    '[, ...[...(o.prop)]]',
    '[, ...[...(o.call().prop)]]',
    '{a: [, ...rest]}',
    '[, ...[...rest]]',
    '[, [, ...[...rest]]]',
    '{a: [, ...[...rest]]}',
    '[, ...{0: a, 1: b}]',
    '[, [, ...{0: a, 1: b}]]',
    '({a:(b) = 0} = 1)',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})',
    '[a] = 0;',
    `[...a = b] `,
    '[foo.foo, foo.bar] = [1, 2]',
    '[[a, b]] = [[1, 2]]',
    '[a, b, ...c] = [1, 2, 3, 4]',
    '[[a, b, ...c]] = [[1, 2, 3, 4]]',
    '[a, b] = [1, 2, 3]',
    '[[a, b]] = [[1, 2, 3]]',
    '[a[0], a[1]] = [a[1], a[0]]',
    '[a, b] = [foo(), bar]',
    '[a, b] = [1, 2];',
    '[a, b] = [, 2]',
    '[a, b] = f()',
    'result = [ x = yield ] = [[22]];',
    'result = [[x[yield]]] = [[22]];',
    '[] = true',
    '[a=5, b=(7).c.d] = ([1]);',
    '[a, b] = [b, a];',
    '[a, b.c] = [d.e, f.g];',
    '[a, b.c] = [d.e, (f.g) = h];',
    '[a, ...b] = [1, 2, 3];',
    '[a, ...b] = [1, 2, ...c];',
    '[a, ...b] = [1, 2, ...(c / 2)];',
    '[a, ...b] = [1, 2, ...c / 2];',
    '[a, ...b] = ([1, 2, ...c / 2]);',
    '[async, ...b] = ([1, 2, ...c / 2]);',
    '[a, ...b] = ([1, 2, ...async / 2]);',
    '[[[a.b =[]]]]',
    '[[[a.b =[{ x: x.b }]]]]',
    '[[[a.b =[{ x: x.b }]]]]',
    '[[[a.b =[{ x: x.b }]]] = abc]',
    '[(x) => y = (z)]',
    '[a, b, ...rest] = [10, 20, 30, 40, 50];',
    '[(x), y = x] = x;',
    '[a, b] = [1];',
    '[a] = [2];',
    '[x.y = a + b] = z',
    '[x().y = a + b] = z',
    '[x().y = a] = z',
    '[...a.b] = c',
    '[[][x]] = y',
    '[...[...[...[...[...[]]]]]]',
    '[...[...[...[...[...[5]]]]]]',
    '[x, ...a] = [1, 2, 3]',
    '[...a, ...a, ...a]',
    '[1, 2, ...a, 1, 2]',
    '[1].concat(a)',
    '[50..foo] = x',
    '[ x += x ]',
    'foo([a, b] = arr);',
    'a = [, , x, , ...y] = value;',
    '[ ...(a) ]',
    '[ {}[x()] ]',
    '[[(x, y)]]',
    '[[x[yield]]]',
    '[...{ 1: x }]',
    '[(a.x)] = t; ',
    '[(((x)))]',
    '[...x.y]',
    '[x,] = 0',
    '[x,,] = 0',
    '[, x,,] = 0',
    '[x, ...y] = [1, 2, 3];',
    '[, ...x] = [1, 2, 3];',
    '[...{x = 1}] = [{}]',
    '[x, ...{0: y}] = 0',
    '[ ...(++y) ]',
    '[x, x] = 0',
    '[({a: 1}.c)] = []',
    '[x, ...x] = 0',
    '[[...x] = [2, 1, 3]]',
    '[{ x: 11, y: 22, z: 33 }]',
    '[{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
    'a = [{ x }] =  [{ x: 2 }];',
    '[{ x = 10 } = {}]',
    '[o.x=1]=[]',
    'a = [x.y] = [123];',
    'a = [x.y] = value;',
    '[a,a,,...a]=0;',
    '[(a.x)] = t;',
    '[(x)] = t; ',
    '[(((x)))] = t',
    'a = [ x[yield] ] = [33];',
    'a = [...[x, y]] = [null];',
    'a = [...x.y] = [4, 3, 2];',
    'a = [...[x[yield]]] = [2018];',
    'a = [...{ 0: x, length }] = value;',
    'a = [...{ 1: x }] = [1, 2, 3];',
    '[,] = null;',
    '[[x]] = [[1]];',
    'a = [ x = yield ] = [];',
    'result = [, x, , y, ,] = [1, 2, 3, 4, 5, 6];',
    'a = [ x = flag = true ] = [];',
    'a = [ a = x += 1, b = x *= 2 ] = [];',
    'a = [arguments = 4, eval = 5] = value;',
    '[...++x]',
    '[(a)] = 0',
    '[(a.b)] = 0',
    '[a, b] = [1, 2]',
    '[(a) = 0] = 1',
    '[a, ...b = 20,,]',
    '[...{ a }] = b',
    '[...{eval}.x] = [] = {}',
    '[(x).foo = x] = x',
    '[x()]',
    '[(x)] = obj',
    '[a.b=[c.d]=e] = f;',
    '[[[[[[[a=b] = c] = c] = c] = c] = c] = c] = [[[[[[[a=b] = c]]] = c] = c] = c] = c;',
    'a = [ a = x += 1, b = x *= 2 ] = value;',
    '[x.y = z]',
    '[1, 2, 3, ...[]]',
    '[[[[z++]]]]',
    '[...[ x = 5 ] ] = x',
    '[void x]',
    '[false]',
    '[function(){}.length] = x',
    '(foo, [bar, baz] = doo);',
    '[a,b=[x,y]] = z',
    '[...[{a: b}.c]] = [];',

    '[...[x].map(y, z)[x]] = a;',
    '[(x())[y] = a,] = z;',
    '[(x())[y],] = z;',
    '[((((a)))), b] = [];',
    '[x] = obj',
    '[(x.y)] = obj',
    '[[1].c] = [];',
    '[foo] = arr;',
    '[...[x].map(y, z)];',
    '[...x.list] = a;',
    '([(x), y] = x);',
    '[{a: 1}.c] = [];',
    '[...let [x] = y]',
    '[x, y, ...z = 1]',
    '[(x)] = obj',
    '[x, y, z = 1]',
    'function a([x, , [, z]]) {}',
    '[,a,]',
    '[a,,,,,,,,,b]',
    '[x, y] = [y, x];',
    'b = [y, x], x = b[0], y = b[1];',
    '[,,]',
    '[[]]',
    '[...[x]] = x',
    '[[{},{}]]',
    '[{}[foo]] = x',
    '[this]',
    '[a.b=[c.d]=e] = f',
    '[{x: y.z}]',
    '[((((a)))), b] = [];',
    '[...z = 1]',
    '[arguments] = []',
    '[x, {y = 1}] = [0, {}]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '[a,,b] = array;',
    '[{a = 0}] = [{}];',
    'function f([...[{a = 0}]]) {}',
    'function f1({a} = {a:1}, b, [c] = [2]) {}',
    'h = ([...[{a = 0}]]) => {};',
    '[a,b,...rest]= {}',
    '[a,,...rest]= {}',
    '[[...x] = [2, 1, 3]]',
    '[foo()[x] ] = {}',
    '[ x[y] ]',
    '[{ foo: foo().y = 10 }]',
    '[{ x : y[z] = 10 } = {}]',
    '[{ x : foo().y = 10 } = {}]',
    '[[ foo()[y] ]]',
    '[{ x : [ y ] } = {}] = z',
    '[{ x : { foo: foo().y } } = {}] = z',
    '[{ x : { foo: foo()[y] } } = {}] = z',
    '[{ x : y[z] } = {}] = z',
    '[{ z : { __proto__: x, __proto__: y } = z } = {}]',
    '[{ foo: y[z] = 10 } = {}]',
    '[ x.y ] = {}',
    '[[ { x : foo()[y] } ]] = {}',
    '[{x: 1, y: 2, a: 5, b: 3}]',
    '[ { x : y } ] = {}',
    '[ { x : foo().y } ] = {}',
    '[ { x : foo()[y] } ] = {}',
    '[ { x : x.y } ] = {}',
    '[ [ x ] ] = {}',
    '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]] = {}',
    '[x,,y] = {}',
    'x, [foo, bar] = doo',

    '[a, b] = c = d',
    '[[x] = true] = y',
    '[foo = A] = arr;',
    '[...await]',
    '[.../x//yield]',
    '[...x = y];',
    '[x, y = 42, z] = {}',
    '[(x),,(y)] = {}',
    '[(x)] = {}',
    '[{[foo()] : foo().bar}] = {}',
    '[x,,...z]  = {}',
    '[{ x: (foo.bar) }] = {}',
    '[ ...(foo.bar) ]  = {}',
    '[x,y,...z] = {}',
    '[{[1+1] : (z)}] = {}',
    '[{ x: [321] }]',
    '[z, (y), z.y]',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }]',
    '[{ x }]',
    '[{ x: y = foo(1 ** 2) }] = {}',
    '[[foo]=[42]] = []',
    '[foo] = arr',
    '[[x = true] = true] = y',
    '[{ 1: y = foo((b)) } ]',
    '[a, ...b]',
    '[...[]]',
    '([a,,b]=0)',
    '([[]]=0)',
    '([...{x}] = y)',
    '([...a] = 0)',
    '[a,b=0,[c,...a[0]]={}]=0',
    '[ { x = 10 } = {} ]',
    '[ { x : y = 10 } = {} ]',
    '[ { x : foo().y = 10 } = {} ]',
    '[ { x : foo()[y] = 10 } = {} ]',
    '[ { x : x.y = 10 } = {} ]',
    '[ { x : x[y] = 10 } = {} ]',
    '[ [ x = 10 ] = {} ]',
    '[ [ foo().x = 10 ] = {} ]',
    '[ [ foo()[x] = 10 ] = {} ]',
    '[] = 0',
    '[...[...a[x]]] = 1',
    'for([a,b[a],{c,d=e,[f]:[g,h().a,(0).k,...i[0]]}] in 0);',
    '[...x] = {}',
    '[ ...(foo.bar) ] = []',
    '[ (y) ] = []',
    '[ (foo.bar) ] = []',
    '[x,y,...z] = {}',
    '[x,,...z] = {}',
    '[ok.v] = 20; ',
    '[a=10] = 0',
    '[,,]=0',
    '[a] = {};',
    '[...{a}] = [{}];',
    '[a] = [];',
    '[a] = [1, 2];',
    '[...((a))] = [1, 2, 3]',
    '[...[...[...a]]] = [[[]]];',
    'x; [{ x = 10 } = {}]',
    '[...[a].b1] = 3',
    '[ { x : foo().y } ] = x',
    '[ { x : foo()[y] } ] = x',
    '[ { x : x.y } ] = x',
    '[ [ x ] ] = x',
    '[ [ foo().x ] ] = x',
    '[ [ foo()[x] ] ] = x',
    '[ [ x.y ] ] = x',
    '[ [ x[y] ] ] = x',
    '[[[], ...x](y)]',
    '[[[[], ...x](y)]]',
    '[ {}.length ]',
    '[ {x: y}.length ]',
    '[ class{} ]',
    '[ function(){} ]',
    '[ null ]',
    '["X".length] = x',
    '[...a += b]',
    '[...a = b]',
    '[7 * 1]',
    '[a * 1]',
    '[...a += b = b]',
    '[...a = b = b]',
    '[[]].x',
    '[[]].x[y]',
    '[[]]?.x[y]',
    '[[]] * y / z',
    '[[]]?x:y;',
    '[{}.length]',
    '[...[x]/y]',
    '[void x]',
    '[false]',
    '[ [].length ] = x',
    '[ delete x.y ]',
    '[ {}.length ] = x',
    '[ {x: y}.length ] = x',
    '(foo, [bar, baz] = doo);',
    '[`a${5}b`.length] = x',
    '[...{x}/y]',
    '[/x/g.length] = x',
    '[[].length]',
    '[class{}]',
    '[async ()=>x]',
    '[typeof x]',
    '[{ x }]?x:y;',
    '[{ x }?x:y]',
    '[{ x }*y]',
    '[{ x }[y]]',
    '[[...a], ...b] = [[],];',
    '[[[...a]]] = [[[]]];',
    '[a, [b]] = [1, []];',
    '[[a]] = [[]];',
    '[a = 1, b] = [];',
    '[a = 1] = [];',
    '[...this[0]] = []',
    '[obj.a ] = []',
    '[obj[0]] = []',
    '[a,b] = [10,20];',
    '[[x]] = 0',
    '[{m: 5 + t()}]',
    '[[1]];',
    '[[a] ? x : bcd]',
    '[[x].length] = x;',
    '[[a] / bcd]',
    '[...a.b] = c',
    '[(a)] = x',
    '[...[]] ',
    '[1, 2, 3], x = _f[0], a = _f.slice(1);',
    '[x, ...a] = [1, 2, 3];',
    '[x, y, z, ...a] = [1, 2, 3];',
    '[...[...[...[...[]]]]] ',
    '[...a] = [1, "hello", true];',
    '[x, ...a] = [1, "hello", true];',
    '[x, y, ...a] = [1, "hello", true];'
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});