import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - Array', () => {
  // Invalid cases
  for (const arg of [
    '[',
    '[,',
    '[]=>0',
    'a[5',
    'a[5 + 6',
    '[2=y]',
    '[a, ...]',
    '[..., ]',
    '[2=y]',
    '[x()] = obj',
    '[(x())] = obj',
    '[...(x), y] = z',
    '[(a = 1)] = t',
    '[([x])] = y',
    '[...a,] = []',
    '[[...a,]] = []',
    '[({ a: [b = 2]})] = t ',
    '[{b: [([a = 1])]}] = t  ',
    '[...x = a] = a',
    '[{a = b}].x',
    '[([x])] = t; ',
    '[(x.y) = [1/42]/=2]',
    '[{} = 2/=2]',
    '[{x = y}].z',
    '[{x = y}].z = obj',
    '[{x = y}].z = "obj"',
    '[{"x" = y}].z = obj',
    '[{x = "y"}].z = obj',
    '[{x = y}.z] = obj',
    '[{x = y}].z => obj',
    '[a=5, b=7] = ([1]) => x;',
    '[(a=5, b=(x)) = y] = ([1]);',
    '[(a=5, b=(7))] = ([1]);',
    '[a=5, b=(7).c.(d)] = ([1])',
    '[function(){}] = x',
    '[null] = x',
    '[typeof x] = x',
    '[--x = 1]',
    '[ ...([a]) ] = x',
    '[a)] = [];',
    '[null] = []',
    '[{ y: 2 }] = {}',
    '[[(x, y)]] = [[]];',
    '[...x,] = [];',
    `[a, ...b = 0] = []`,
    '[x, y, ...z = 1] = []',
    '[...z = 1] = []',
    '[x, y, ...[z] = [1]] = []',
    '[...a, b] = c',
    '[...[z] = [1]] = []',
    '[...++x] = []',
    '[...x--] = []',
    '[...!x] = []',
    '[...x + y] = []',
    '[x--] = []',
    '[--x = 1] = []',
    '[x()] = []',
    '[this] = []',
    '[this = 1] = []',
    '[new.target] = []',
    '[new.target = 1] = []',
    '[import.meta] = []',
    '[import.meta = 1] = []',
    '[super] = []',
    '[super = 1] = []',
    '[function f() {}] = []',
    '[async function f() {}] = []',
    '[function* f() {}] = []',
    '[50] = []',
    '[(50)] = []',
    '[(function() {})] = []',
    '[...x, ...y] = [];',
    '[{a = 0}.x] = [];',
    `[...{0=x} = c] `,
    `[...{a: 0=x} = c] `,
    `[...{0} = c] `,
    //`[...{a: 0} = c]`,
    '[...{a: true=x} = c]',
    '[...x, ...y] = 0',

    `({x:0 = 5})`,
    `[...{true=x} = c]`,
    `[...{true} = c]`,
    '[[(x, y)]] = [[]];',
    '[...!a] = []',
    `[...a, b] = c`,
    '[...a+b] = []',
    '({a({e: a.b}){}})',
    '({*a({e: a.b}){}})',
    '({set a({e: a.b}){}})',
    '[((((((x = y))))))] = obj',
    '[{}[x ? {zzz} : (z)] /= ...a]',
    '[{} = 2/=2]',
    '[...[1], ...1.a]',
    '[...break]',
    '[([b].c.(d)) **= e ? f : g /= 1]',
    '[...[x ? y : z] += a]',
    '[ c.d === (...[e] ? f : g )]',
    '[[1] /= e ? f : g ]',
    '[{x=y} = 2/=2]',
    '[x.[y] = 42]',
    `[x.[y] = [z]]`,
    '[...break',
    '[...a, b] = v',
    `[...this] => x;`,
    `[{a: 1} = []];`,
    `[...a, ...b] = x`,
    `[([async])] = x`,
    `[{x = y}]`,
    '[{a = 0}.x] = [];',
    `[...{0=x} = c] `,
    '[...a, ] = b;',
    '[a, ...b,] = 20',
    '[a, ...b,,] = 20',
    '[a, ...b = 20] = 20',
    '[a, ...b, c] = 20',
    '[...a, ] = b',
    '[{a=b}]',
    '[++a] = [];',
    '[a + 1] = [];',
    '[1, a] = [];',
    '[((a)] = [];',
    '[a)] = [];',
    '[...c = 1] = []',
    '[...c, d] = []',
    '[123] = []',
    '["string"] = []',
    '[false] = []',
    '[[foo].food()] = x',
    '[[foo].food() = x] = x',
    '[x, y, ...z = arr] = x = obj',
    '[...[a](1)] = 3',
    '[...[a](1)] = 3',
    '[{a = b}.c]',
    '[a,b+=[x,y]] = z',
    '[a.g(...[])] = []',
    '[g(...[])] = []',
    '[0] = 0',
    '[x] += 0',
    '[...x, y] = 0',
    '[...x, ] = 0;',
    '[...x, ...y] = 0',
    '[...x,,] = 0',
    '[{a=0},{b=0},0] = 0',
    '[{a=0},...0]',
    '[...0,a]=0',
    '[...{a = b} = c] = d;',
    '[...{a = b} = c] = x',
    '[+{a = 0}];',
    '[...x, y] = 0',
    '[...x, y] = 0',
    '[this] = obj',
    '[--x = 1]',
    '[new.target]',
    '[new.target = 1]',
    '[import.meta]',
    '[import.meta = 1]',
    '[super]',
    '[super = 1]',
    '[...x += y] = a;',
    '[{a=0},{b=0},0] = 0',
    '[...0,a]=0',
    '[new.target]',
    '[...x, y] = [];',
    '[...a, ...b, ...c] = [...a, ...b, ...c]',
    '[a, ...b, {c=0}]',
    '[a, ...(b = c)] = 0',
    '[{a=0},...0]',
    '[...0,{a=0}]=0',
    '[...0,...{a=0}]=0',
    '[(a=5], b=(x)) = y] = ([1]);',
    '[(a=5], b=(7))] = ([1]);',
    '[50] = a;',
    '[x[yield]]] = value;',
    '[0,{a=0}] = 0',
    '[(foo())] = a;',
    '[ (++y) ] = a;',
    '[(x, y)] = x',
    '[true = x] = x',
    '[...a, ,] = [...a, ,]',
    '[[a] = [[a] = [[a] = ([[a] = x]]]])',
    '[[[a.b =[{ x: x.b }]]]] = ([{ a = b / 2}])',
    '[[[a.b =[{ x: x.b = 123 }]a(b=c)]]]',
    '[(a.b.c.d = e) = ()]',
    '[(1) = (a = b.c)]',
    '[() = ()]',
    '[(1) = (a = b.c)]',
    '[2] = 42',
    'x(a&&b=c)',
    '[(x)](y) = obj',
    '[(a = 1)] = t;',
    '[...{a: 0}] = 0;',
    '[([b])] = t;',
    '[([a])] = 12;',
    '[[(x, y)]] = x;',
    '[...[(x, y)]] = x;',
    '[ ...[ ( [ a ] ) ] ] = a;',
    '[([{ x = y }] = b.call(c)) = ()]',
    '[(a = b.call(c)) = ()]',
    '[(a = b.call(c)) = (a = b * 2)]',
    '[(1) = (a = b)]',
    '[(1) = (a = b.c)]',
    '[() = ()]',
    '[(a.b.c.d = e) = ()]',
    '[[[a.b =[{ x: x.b }]]]] = ([{ a = b / 2}])',
    '[[[a.b =[{ x: x.b = 123 }]a(b=c)]]]',
    '[(foo())] = a;',
    '[a] *= 0;',
    '[([b])] = t;',
    '[([a])] = 12;',
    '[ (++y) ] = a;',
    `[...{a: 0}] = 0;`,
    `[...[0]] = 0;`,
    `[...0] = 0;`,
    '[...[(x, y)]] = x;',
    '[...(a,b)] = [],',
    '[...[z] = [1]] = a;',
    `[...[x].map(y, z)] = a;`,
    '[...rest, x] = x',
    '[.../x/ y]',
    '[ ...[ ( [ a ] ) ] ] = a;',
    '[(a = b.call(c)) = (a = b / 2)]',
    '[(a = async.call(c)) = (a = b / 2)]',
    '[...{a: 0=x} = c]',
    '[[foo].food() = x] = x',
    `[[async].await()] = x`,
    '[...++x] = a;',
    '[--x = 1] = a;',
    '[x, y, ...[z] = [1]] = a;',
    '[[[[[[[a=b] = c]]] = c] = (c=d)] = c] = ({a = b}) = foo;',
    '[x, y, ...[z] = [1]] = a;',
    '[...rest,] = x',
    '[ ...([a] = []) = a;',
    '[...[x].map(y], z)] = a;',
    '[x--] = a;',
    '[x, y, ...z = arr] = obj',
    '[async(x,y) => z] = a;',
    '[this=x]',
    '[true=x]',
    '[x()] = a;',
    '[this = 1] = a;',
    '[x--] = a;',
    '[x + y] = x',
    '[(foo())] = a;',
    '[ ([a]) ] = a;',
    '[[[a.b =[{ x: x.b }]]]] = ([{ a = b / 2}])',
    '[...]',
    '[..."foo"+bar] = x',
    '[...[x].map(y, z)] = a;',
    '[...x--] = a;',
    '[...!x] = a;',
    '[a,b,...rest, x] = x',
    '[{a: 1} = []];',
    '[...0,...{a=0}]=0',
    '[a,,..rest,...rest1]  = x',
    '[...{a = 0}.x] = [];',
    '[,',
    '[...a()] = []',
    '[...a=b] = []',
    '[a, ...b, c] = []',
    '[...a, ,] = []',
    '[...a++] = []',
    '[...(a,b)] = []',
    '[[(y) * 5 / 5 - (foo)] = obj / x',
    '[ ] [ [ ] >[ ]< [ ] ] [ ]',
    '[...a = 1 = a]',
    '[...1 = a]',
    '([a] / ...bcd)',
    '[(a = 0)] = 1',
    '[{x=1, y = ({z=2} = {})}];',
    '([a]], ...[bcd] = (x))',
    '([a]], ...bcd = (x))',
    '([(({a.b.c[d]})], ({b = c / 2}))])',
    '([(({a[d]})], ({b = c / 2}))])',
    '([[a](b.c) = [[a] = [[a] = ([[a] = x]]]]))',
    `[x=await y]=z`,
    '[(a=5, b=(7))] = ([1]);',
    '([(({a.b.c[d]}), ({b = c / 2}))])',
    '([[a](b) = [[a] = [[a] = ([[a] = x]]]]))',
    '[[a] = [[a] = [[a] = ([[a] = x]]]])',
    '([[a] = [[a] = [[a] = ([[a] = x]]]]))',
    '[async()] = x;',
    '[async(x)] = x;',
    '[async(x, y)] = x;',
    '[(a), async(await[async])] = x;',
    '[ x + y ] = x',
    '[[..]=x]',
    '[, x, ...y,] = 0',
    '[...a, ,] = [...a, ,]',
    '[a, ...b, {c=0}]',
    '[a, ...(b = c)] = 0',
    '[(...)]',
    '(...)',
    '[...this, y] = foo;',
    '[{..}, x]',
    '[{..}]',
    '[...0] = 0;',
    `[...{a = b} = c] = x`,
    '[(...)]',
    '[{..}, x]',
    '[(a=5, b=(x)) = y] = ([1]);',
    '[...[a].1] = 3',
    '[...[a](1)] = 3',
    '[x, y, ...z = arr] = obj',
    '[...this] = x;',
    '[...(x), y] = z',
    '[(x = y)] = obj',
    '[...x = y] = a;',
    '[foo + y, bar] = doo',
    '[x, ...z = arr, y] = obj',
    '[x, ...y, z] = obj',
    '[...this] = obj',
    '[...new] = x',
    '[...[1], "a"(b)] = x',
    '[...[1], ["a"](b)] = x',
    '[..."x"=b]',
    '[...a=b] = x',
    '[..."foo".foo=x] = x',
    '[x, y, ...z = arr] = obj',
    '[[..], x]',
    '[[..].x]',
    '[[..]=x]',
    '[[..].foo] = x',
    '[[..][foo]] = x',
    '[{..}]',
    '[{..}, x]',
    '[this]=x',
    '[true = x]',
    '[this=x]',
    '[[[1],[2],[3]]] = z',
    '[]=n/f>>=v',
    '[new ++([])',
    '[ (++y) ] = a;',
    '[this=x]',
    '[x=y]=await z',
    `[[async].await()] = x`,
    '[...{true=x} = c]',
    '[/[/]',
    '[((((((x = y))))))] = obj',
    '[(x = y)] = obj',
    'x, [foo + y, bar] = doo;',
    '[a,b+=[x,y]] = z',
    '[(x.y) = [1/42]/=2]',
    '[{x=y} = 2/=2]',
    '[[1]] = [];',
    '[{a: 1} = []];',
    '[ x += x ] = a;',
    '[x, ...y, z] = a;',
    '[typeof x] = x',
    '([foo]) = arr;',
    '[a=5], b=(7).c.(d)[e]] = ([1]);',
    '[...[z] = [1]] = a;',
    '[a, ...b, c] = []',
    '([...x=y]) = z',
    '[x, y, ...z()] = obj',
    '[x, ...z(), y] = obj',

    '[x, ...z + arr, y] = obj',
    '[x, y, ...z + arr] = obj',
    '[...this] = obj',
    '[a,b^=[x,y]] = z',
    '[[(x, y)]] = x;',
    '[...(x), y] = z',
    'let [...a, b] = [];',
    '[--x = 1]',
    '[...x += y] = a;',
    '[...a = 1 = a]',
    '[...1 = a]',
    '[{a: 1} = []];',
    '({a: {b = 0}.x} = {})',
    '[{x = y}].z',
    '[{x = y}]',
    'function foo() { ({a: {b = 0}.x} = {})}',
    '[([b])] = t;',
    '[([a])] = 12;',
    '[ x + y ] = x',
    '[a, ...(b = c)] = 0',
    '[(x, y)] = x;',
    '[{x = y}].z = obj',
    '[{x = y}] in z',
    '[{x = y}] => z',
    '[x, y, ...z()] = obj',
    'x, [foo + y, bar] = doo',
    '[{x = y}]',
    '[{x = y}].z => obj'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
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
    '[...[{a: b}.c]] = [];',
    'x = [a, b] = y',
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
    '[a, b] = c = d',
    '[[x] = true] = y',
    '[foo = A] = arr;',
    '[...await]',
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
    '[...[x]] = 0',
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
    '[...[{a: b}.c]] = [];',
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
    '[...[x]] = 0',
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
    '[a,b=[x,y]] = z'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  describe('Expressions - Spread', () => {
    it('Array spread with comma', () => {
      t.deepEqual(parseScript('[...(x), y]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'x'
                    }
                  }
                },
                {
                  type: 'IdentifierReference',
                  name: 'y'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with a splat call at the end', () => {
      t.deepEqual(parseScript('[x, y, ...z()]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'IdentifierReference',
                  name: 'y'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    expression: {
                      type: 'IdentifierReference',
                      name: 'z'
                    },
                    arguments: []
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Can splat an assignment at the end', () => {
      t.deepEqual(parseScript('[x, y, ...z = arr]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'IdentifierReference',
                  name: 'y'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'z'
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'arr'
                    }
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Can splat in the middle', () => {
      t.deepEqual(parseScript('[x, ...y, z]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'y'
                  }
                },
                {
                  type: 'IdentifierReference',
                  name: 'z'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Can splan "ThisExpression"', () => {
      t.deepEqual(parseScript('[...this];'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ThisExpression'
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Splat another value', () => {
      t.deepEqual(parseScript('[x, y, ...z]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'IdentifierReference',
                  name: 'y'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'z'
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Spread on identifier property assignment', () => {
      t.deepEqual(parseScript('[...foo.foo=x]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'MemberExpression',
                      member: {
                        type: 'IdentifierReference',
                        name: 'foo'
                      },
                      expression: {
                        type: 'IdentifierName',
                        name: 'foo'
                      },
                      computed: false
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'x'
                    }
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
  });

  describe('Expressions - Literal', () => {
    it('Array with empty ellison', () => {
      t.deepEqual(parseScript('[,]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'Elision'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });

    it('Array with middle elisons', () => {
      t.deepEqual(parseScript('[x,,y]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'Elision'
                },
                {
                  type: 'IdentifierReference',
                  name: 'y'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with identifier and elisons', () => {
      t.deepEqual(parseScript('[x,,,]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                },
                {
                  type: 'Elision'
                },
                {
                  type: 'Elision'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with identifier and leading comma', () => {
      t.deepEqual(parseScript('[,x]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'Elision'
                },
                {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with identifier and trailing comma', () => {
      t.deepEqual(parseScript('[x,]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with two leading comma', () => {
      t.deepEqual(parseScript('[,,x]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'Elision'
                },
                {
                  type: 'Elision'
                },
                {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with "ThisExpression"', () => {
      t.deepEqual(parseScript('[this];'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'ThisExpression'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Empty array', () => {
      t.deepEqual(parseScript('[]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: []
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with identifier', () => {
      t.deepEqual(parseScript('[x]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'IdentifierReference',
                  name: 'x'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with "BinaryExpression" and identifier', () => {
      t.deepEqual(parseScript('[a * 1]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'a'
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 1
                  },
                  operator: '*'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Array with "BinaryExpression" and number', () => {
      t.deepEqual(parseScript('[7 * 1]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'NumericLiteral',
                    value: 7
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 1
                  },
                  operator: '*'
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
  });

  describe('Expressions - Spread', () => {
    it('Destruct an object literal with property in an array', () => {
      t.deepEqual(parseScript('[{}.x] = y'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayAssignmentPattern',
                leafs: [
                  {
                    type: 'MemberExpression',
                    member: {
                      type: 'ObjectLiteral',
                      properties: []
                    },
                    expression: {
                      type: 'IdentifierName',
                      name: 'x'
                    },
                    computed: false
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'y'
              }
            }
          }
        ],
        webCompat: true
      });
    });

    // Note: This is is an assignment. Note the '=" at the end, so
    // the AST will be turned into "assignment pattern".
    it('Destructuring array as call argument', () => {
      t.deepEqual(parseScript('foo([a, b] = arr);'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              expression: {
                type: 'IdentifierReference',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ArrayAssignmentPattern',
                    leafs: [
                      {
                        type: 'IdentifierReference',
                        name: 'a'
                      },
                      {
                        type: 'IdentifierReference',
                        name: 'b'
                      }
                    ]
                  },
                  operator: '=',
                  right: {
                    type: 'IdentifierReference',
                    name: 'arr'
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
    it('Spread with argument less yield keyword', () => {
      t.deepEqual(parseScript('function *f(){ return [...yield]; }'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'f'
            },
            params: {
              type: 'FormalParameters',
              leafs: []
            },
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ReturnStatement',
                  expression: {
                    type: 'ArrayLiteral',
                    leafs: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          delegate: false,
                          expression: null
                        }
                      }
                    ]
                  }
                }
              ],
              directives: []
            },
            async: false,
            generator: true
          }
        ],
        webCompat: true
      });
    });

    it('Spread with array with tail', () => {
      t.deepEqual(parseScript('[...[x].map(y, z)];'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    expression: {
                      type: 'MemberExpression',
                      member: {
                        type: 'ArrayBindingPattern',
                        leafs: [
                          {
                            type: 'IdentifierReference',
                            name: 'x'
                          }
                        ]
                      },
                      expression: {
                        type: 'IdentifierName',
                        name: 'map'
                      },
                      computed: false
                    },
                    arguments: [
                      {
                        type: 'IdentifierReference',
                        name: 'y'
                      },
                      {
                        type: 'IdentifierReference',
                        name: 'z'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });

    it('Spread with await variable', () => {
      t.deepEqual(parseScript('[...await]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'IdentifierReference',
                    name: 'await'
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });

    it('Assignment with two vars and initializer', () => {
      t.deepEqual(parseScript('[foo = A, bar = B] = arr;'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayAssignmentPattern',
                leafs: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'IdentifierReference',
                      name: 'foo'
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: 'A'
                    }
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'IdentifierReference',
                      name: 'bar'
                    },
                    right: {
                      type: 'IdentifierReference',
                      name: 'B'
                    }
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'arr'
              }
            }
          }
        ],
        webCompat: true
      });
    });

    it('Yield in destructuring assignment', () => {
      t.deepEqual(parseScript('function* g() {   [...{ x = yield }] = y   }'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'FunctionDeclaration',
            name: {
              type: 'BindingIdentifier',
              name: 'g'
            },
            params: {
              type: 'FormalParameters',
              leafs: []
            },
            contents: {
              type: 'FunctionBody',
              statements: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ArrayAssignmentPattern',
                      leafs: [
                        {
                          type: 'AssignmentRestElement',
                          argument: {
                            type: 'ObjectAssignmentPattern',
                            properties: [
                              {
                                type: 'BindingElement',
                                binding: {
                                  type: 'IdentifierName',
                                  name: 'x'
                                },
                                initializer: {
                                  type: 'YieldExpression',
                                  delegate: false,
                                  expression: null
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'y'
                    }
                  }
                }
              ],
              directives: []
            },
            async: false,
            generator: true
          }
        ],
        webCompat: true
      });
    });

    it('Double assignment chain', () => {
      t.deepEqual(parseScript('[a, b] = c = d'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayAssignmentPattern',
                leafs: [
                  {
                    type: 'IdentifierReference',
                    name: 'a'
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'b'
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'IdentifierReference',
                  name: 'c'
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'd'
                }
              }
            }
          }
        ],
        webCompat: true
      });
    });

    it('Nested assignment', () => {
      t.deepEqual(parseScript('[[x = true] = true] = y'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayAssignmentPattern',
                leafs: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayAssignmentPattern',
                      leafs: [
                        {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'IdentifierReference',
                            name: 'x'
                          },
                          right: {
                            type: 'BooleanLiteral',
                            value: true
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'BooleanLiteral',
                      value: true
                    }
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'y'
              }
            }
          }
        ],
        webCompat: true
      });
    });

    it('Destructible rest with default yield', () => {
      t.deepEqual(parseScript('result = [...{ x = yield }] = y;'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'IdentifierReference',
                name: 'result'
              },
              operator: '=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'ArrayAssignmentPattern',
                  leafs: [
                    {
                      type: 'AssignmentRestElement',
                      argument: {
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
                              name: 'yield'
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                operator: '=',
                right: {
                  type: 'IdentifierReference',
                  name: 'y'
                }
              }
            }
          }
        ],
        webCompat: true
      });
    });

    it('Spread with identifier and compound assignment', () => {
      t.deepEqual(parseScript('[...x += y]'), {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayLiteral',
              leafs: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'x'
                    },
                    operator: '+=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'y'
                    }
                  }
                }
              ]
            }
          }
        ],
        webCompat: true
      });
    });
  });
});
