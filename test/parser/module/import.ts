import * as t from 'assert';
import { parseModule, recovery } from '../../../src/escaya';

describe('Module - Import', () => {
  // Invalid cases
  for (const arg of [
    // It is a Syntax Error if the BoundNames of ImportDeclaration contains any duplicate entries.
    'import a, * as a from "module";',
    'import a, {a} from "module";',
    'import a, {b as a} from "module";',
    'import {a, b as a} from "module";',
    'import {a, a} from "module";',
    'import {b as a, c as a} from "module";',
    'import',
    'import;',
    'import {}',
    'import {};',
    'import { y as yield } from "foo"',
    'import { y as static  } from "foo"',
    'import { y as let } from "foo"',
    'import { y as await  } from "foo"',
    'import(...a);',
    'import(/foo/) /bar/',
    "import {,} from 'a';",
    "import {b,,} from 'a';",
    'import from;',
    'import foo;',
    'import {a: b} from "bar";',
    'import {foo',
    'import {...foo} from "bar";',
    "import {b as,} from 'a';",
    //"import {function} from 'a';",
    "import {a as function} from 'a';",
    '{import {x} from "y";}',
    'function f(){import {x} from "y";}',
    'if (x); else import {x} from "y";',
    'switch (x) { case x: import {x} from "y"; }',
    'try { } finally { import {x} from "y"; }',
    'do import {x} from "y"; while (x);',
    'let x = () => {import {x} from "y";}',
    'switch (x) { case x: import {x} from "y"; }',
    'function f(){import {x} from "y";}',
    'import a, **= from "f";',
    'import ** from "f";',
    'import foo',
    'import',
    'import {await} from "foo";',
    'import {foo as await} from "foo";',
    'import await, {x, y, z} from "foo";',
    //'import eval, {x, y, z} from "foo";',
    'import package, {x, y, z} from "foo";',
    'import a, **= from "f";',
    'import *= from "f";',
    'import ** from "foo";',
    'import * as let',
    'import * as var',
    'import * as class',
    'function foo() { import foo from "foo.js"; }',
    'import { foo }, bar from "foo.js";',
    'import { foo }, from "foo.js";',
    'import { foo }, bar from "foo.js";',
    'import { foo }, * as ns1 from "foo.js";',
    'import { foo }',
    //'import { x as arguments } from "x";',
    //'import { x as eval } from "x";',
    'try { import _try from ""; } catch(e) { }',
    'import { foo as bar ',
    'import { foo as bar, ',
    'while(false) import { default } from "module";',
    'import { foo, , } from "module";',
    'import { foo as switch } from "module";',
    'import / as a from "foo";',
    'import foo, from "foo";',
    'import * as x, {y} from "foo";',
    'import {x}, {y} from "foo";',
    'import { x }, def from "foo";',
    'import {} from;',
    'import { null } from "null"',
    'import * from "foo"',
    'import * as a in b from "foo";',
    "import { 123 } from 'foo';",
    'import foo, from "bar";',
    'import ghost from ;',
    'import ghost from []',
    "import { [123] } from 'foo';",
    "import / as a from 'a'",
    "import * as b, a from 'a'",
    "import * As a from 'a'",
    'import {a b} from "foo";',
    'import [ foo ] from "foo.js";',
    'import { foo }, * as ns1 from "foo.js";',
    'import { foo as ',
    "import a as b from 'a'",
    "import a, b from 'a'",
    "import { !d } from 'foo';",
    "import a, *= from 'foo';",
    'import * as x',
    'import { foo bar } from "module";',
    'import { x as 1 } from "x";',
    'import { x as "string" } from "x";',
    'import [ foo ] from "foo.js";',
    'import * foo from "foo.js";',
    'import { , foo } from "foo.js";',
    '() => { import arrow from ""; }',
    'import { a as class } from "beast"',
    'import { class } from "beast"',
    'import { class, var } from "beast"',
    // 'new import(x);',
    'import { y as enum } from "foo"',
    'import {a, b} fromx "c"',
    'import {} from;',
    'import from;',
    'import(a, b);',
    "import from 'm.js';",
    'import { a } from;',
    "import { a as await } from 'm.js';",
    "import { a as enum } from 'm.js';",
    'import {a, a} from "b"',
    "import {x}, {y} from 'm.js';",
    "import * as x, {y} from 'm.js';",
    "import { a } 'm.js';",
    "import , from 'm.js';",
    "import a , from 'm.js';",
    'import {;',
    'import };',
    'import { , };'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'import "foo";',
    'import * as y from "foo";',
    'import x from "foo";',
    'import x, * as z from "foo";',
    'import {} from "foo";',
    'import {a} from "foo";',
    'import {a as b} from "foo";',
    'import {a,b} from "foo";',
    'import {a as c,b} from "foo";',
    'import {a,b,} from  "foo";',
    "import 'foo';",
    "import { a } from 'foo';",
    `import  * as set from "a"`,
    "import { a, b as d, c, } from 'baz';",
    "import * as thing from 'baz';",
    "import thing from 'foo';",
    "import thing, * as rest from 'foo';",
    "import thing, { a, b, c } from 'foo';",
    "import { arguments as a } from 'baz';",
    `import a, {as} from 'foo'`,
    `import a, {b as c} from 'foo'`,
    `import { static as s } from 'm.js';`,
    `import { } from 'm.js';`,
    `import { a } from 'm.js';`,
    `import { a as implement } from "beast"`,
    `import {x as a, z as b} from "y"`,
    `import {x, z,} from "y"`,
    `import thing, * as rest from 'foo';`,
    `import {m as mm} from 'foo';`,
    `import * as foob from 'bar.js';`,
    `import { a } from 'm.js';`,
    `import * as foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }`,
    `import { foo } from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }`,
    `import e, {f as g, h as i, j} from "module";`,
    `import  * as set from "a"`,
    `import $ from "foo"`,
    `import { a } from 'foo';`,
    `import {n, o as p} from "module";`,
    `import {k as l, m} from "module";`,
    `import foo, {bar} from "foo";`,
    `import { null as nil } from "bar"`,
    `import x, * as ns from "foo"`,
    `import * as thing from 'baz';`,
    `import x, * as a from "y"`,
    `import {as as as} from 'as'`,
    `import a, {function as c} from 'baz'`,
    `import { as, get, set, from } from "baz"`,
    `import { yield as y } from 'm.js';`,
    `import foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) {}`,
    `import {x as z} from "y"`,
    "import { for as f } from 'foo';",
    "import { yield as y } from 'foo';",
    "import { static as s } from 'foo';",
    "import { let as l } from 'foo';",
    "import { q as z } from 'foo';",
    'import { null as nil } from "bar"',
    'import {bar, baz} from "foo";',
    'import {bar as baz, xyz} from "foo";',
    'import foo, {bar} from "foo";',
    'import C from "foo";',
    'import a, { b, c as d } from "foo"',
    'import * as async from "async";',
    "import foo, * as bar from 'baz';",
    'import {} from "foo";',
    "import n from 'n.js';",
    'import a from "module";',
    'import b, * as c from "module";',
    'import * as d from "module";',
    'import e, {f as g, h as i, j} from "module";',
    'import {k as l, m} from "module";',
    'import {n, o as p} from "module";',
    "import 'q.js';",
    "import a, {b,c,} from 'd'",
    "import a, {b,} from 'foo'",
    "import {as as as} from 'as'",
    "import a, {as} from 'foo'",
    "import a, {function as c} from 'baz'",
    "import a, {b as c} from 'foo'",
    "import 'somemodule.js';",
    "import { } from 'm.js';",
    "import { a } from 'm.js';",
    "import { a, b as d, c, } from 'm.js';",
    "import * as thing from 'm.js';",
    "import thing from 'm.js';",
    "import thing, * as rest from 'm.js';",
    "import thing, { a, b, c } from 'm.js';",
    "import { arguments as a } from 'm.js';",
    "import { for as f } from 'm.js';",
    "import { yield as y } from 'm.js';",
    "import { static as s } from 'm.js';",
    "import { let as l } from 'm.js';",
    "import thing from 'a.js'; export {thing};",
    "import a, * as b from 'a'",
    "import a, {} from 'foo'",
    'import {x} from "y"',
    'import {x, z} from "y"',
    'import {x as a, z} from "y"',
    "import a from 'foo'",
    "import * as a from 'a'",
    "import {m as mm} from 'foo';",
    "import {aa} from 'foo';",
    'import icefapper from "await"',
    "import 'foo';",
    "import get from './get.js';",
    "import { a } from 'foo';",
    "import { a, b as d, c, } from 'baz';",
    "import * as foob from 'bar.js';",
    'import { as, get, set, from } from "baz"',
    "import {} from 'x'",
    "import {a} from 'x'",
    "import {a as b} from 'x'",
    "import {a,b,} from 'x'",
    'import $ from "foo"',
    'import {} from "foo";',
    'import * as Scouts from "./export-expname_FIXTURE.js";',
    'import async from "foo";',
    'import defexp, {x,} from "foo";',
    'import { Cocoa as async } from "foo"',
    "import 'somemodule.js';",
    'import "string";',
    'import identifier from "foo";',
    'import { a as of } from "k";',
    'import(call)',
    'import foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) {}',
    'import { foo } from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }',
    'import * as foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }',
    'import { foo as foo22 } from "foo.js"; try { (() => { foo22 = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
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

  it('import X from "y"', () => {
    t.deepStrictEqual(parseModule('import X from "y"', { loc: true }), {
      directives: [],
      end: 17,
      start: 0,
      leafs: [
        {
          end: 17,
          fromClause: {
            end: 17,
            start: 14,
            type: 'StringLiteral',
            value: 'y'
          },
          importClause: {
            defaultBinding: {
              end: 8,
              name: 'X',
              start: 7,
              type: 'BindingIdentifier'
            },
            end: 8,
            nameSpaceImport: null,
            namedImports: null,
            start: 7,
            type: 'ImportClause'
          },
          moduleSpecifier: null,
          start: 0,
          type: 'ImportDeclaration'
        }
      ],
      type: 'Module',
      webCompat: true
    });
  });

  it('import a, {} from "foo"', () => {
    t.deepStrictEqual(parseModule('import a, {} from "foo"', { loc: true }), {
      directives: [],
      end: 23,
      start: 0,
      leafs: [
        {
          end: 23,
          fromClause: {
            end: 23,
            start: 18,
            type: 'StringLiteral',
            value: 'foo'
          },
          importClause: {
            defaultBinding: {
              end: 8,
              name: 'a',
              start: 7,
              type: 'BindingIdentifier'
            },
            end: 12,
            nameSpaceImport: null,
            namedImports: {
              end: 12,
              importsList: [],
              start: 10,
              type: 'NamedImports'
            },
            start: 7,
            type: 'ImportClause'
          },
          moduleSpecifier: null,
          start: 0,
          type: 'ImportDeclaration'
        }
      ],
      type: 'Module',
      webCompat: true
    });
  });

  it('import b, * as c from "module";', () => {
    t.deepStrictEqual(parseModule('import b, * as c from "module";', { loc: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'module',
            start: 22,
            end: 30
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'b',
              start: 7,
              end: 8
            },
            nameSpaceImport: {
              type: 'BindingIdentifier',
              name: 'c',
              start: 15,
              end: 16
            },
            namedImports: null,
            start: 7,
            end: 16
          },
          start: 0,
          end: 31
        }
      ],
      start: 0,
      end: 31
    });
  });

  it('import { let as l } from "foo";', () => {
    t.deepStrictEqual(parseModule('import { let as l } from "foo";', { loc: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'foo',
            start: 25,
            end: 30
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: null,
            nameSpaceImport: null,
            namedImports: {
              type: 'NamedImports',
              importsList: [
                {
                  type: 'ImportSpecifier',
                  moduleExportName: null,
                  name: {
                    type: 'IdentifierName',
                    name: 'let',
                    start: 9,
                    end: 12
                  },
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'l',
                    start: 16,
                    end: 17
                  },
                  start: 9,
                  end: 17
                }
              ],
              start: 7,
              end: 19
            },
            start: 7,
            end: 19
          },
          start: 0,
          end: 31
        }
      ],
      start: 0,
      end: 31
    });
  });

  it('import "string"', () => {
    t.deepStrictEqual(parseModule('import "string"', { loc: true }), {
      directives: [],
      end: 15,
      start: 0,
      leafs: [
        {
          end: 15,
          fromClause: null,
          importClause: null,
          moduleSpecifier: {
            end: 15,
            start: 7,
            type: 'StringLiteral',
            value: 'string'
          },
          start: 0,
          type: 'ImportDeclaration'
        }
      ],
      type: 'Module',
      webCompat: true
    });
  });

  it('import thing, * as rest from "x"', () => {
    t.deepStrictEqual(parseModule('import thing, * as rest from "x"', { loc: true }), {
      type: 'Module',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ImportDeclaration',
          fromClause: {
            type: 'StringLiteral',
            value: 'x',
            start: 29,
            end: 32
          },
          moduleSpecifier: null,
          importClause: {
            type: 'ImportClause',
            defaultBinding: {
              type: 'BindingIdentifier',
              name: 'thing',
              start: 7,
              end: 12
            },
            nameSpaceImport: {
              type: 'BindingIdentifier',
              name: 'rest',
              start: 19,
              end: 23
            },
            namedImports: null,
            start: 7,
            end: 23
          },
          start: 0,
          end: 32
        }
      ],
      start: 0,
      end: 32
    });
  });

  /*  it('simple block', () => {
    t.deepStrictEqual(parseModule('(a, b)', { loc: true}), {});
  });

  it('simple block', () => {
    t.deepStrictEqual(parseModule('(a, b)', { loc: true}), {});
  });

  it('simple block', () => {
    t.deepStrictEqual(parseModule('(a, b)', { loc: true}), {});
  });

  it('simple block', () => {
    t.deepStrictEqual(parseModule('(a, b)', { loc: true}), {});
  });

*/
});
