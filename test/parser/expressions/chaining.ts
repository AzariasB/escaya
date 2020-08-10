import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Optional chaining', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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
    'null?.(1, ...a)',
    'arr?.[0]',
    'obj?.[undefined]',
    'arr ?. length',
    `['hi']?.[0]`,
    `() => true?.()`,
    `null?.()().a['b']`,
    `({}).a?.(...a)`,
    `({ x: 'hi' })?.['x']`,
    `({})?.constructor`,
    `0?.valueOf()`,
    `null?.valueOf()`,
    `1?.valueOf()`,
    `for (const key of {}?.a) ;`,
    `for (const key of obj?.a) {}`,
    `for (const key of obj?.a);`,
    `null?.a`,
    `(obj?.a)?.b`,
    `(fn()?.a)?.b`,
    `(function * a () {}?.name)`,
    `async?.(package())`,
    `async?.(async())`,
    `async?.(async?.a, async?.a)`,
    `async?.("string", async?.a, async?.a)`,
    `o3?.a?.b === o4?.a?.b === undefined`,
    `x in (o3?.a)`,
    `a?.[++x]`,
    `a?.b.c(++x).d;`,
    `undefined?.[++x]`,
    `foo?.x?.y?.z?()=>{foo}:bar;`,
    `if (a?.b?.c === 'foobar') {}`,
    `[a, ...b] = [1, 2?.a, 3];`,
    `({ a: null }).a?.(...a)`,
    `() => 5?.(...[])`,
    `(a?.b).c`,
    `0?.()`,
    `0?.valueOf()`,
    `false?.()`,
    `[]?.()`,
    `(a?.b).c;`,
    `(a?.b).c();`,
    `a?.b[3].c?.(x).d`,
    `(obj?.foo).bar++`,
    `(obj?.foo).bar++`,
    `(obj?.foo).bar = 0`,
    `class Foo extends Base { method() { super.method?.(); } }`,
    `class Foo extends Base { method() { super.method?.(); } }`,
    `delete o1?.x`,
    `delete o1.z?.()`,
    //`function a(b) { new.target?.(); }`,
    `obj?.aaa?.bbb`
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
