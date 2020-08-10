import * as t from 'assert';
import { parseModule, recovery } from '../../../src/escaya';

describe('Module - Import', () => {
  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
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
    `import {n, o as p} from "module";`,
    `import  * as set from "a"`,
    `import $ from "foo"`,
    `import {n, o as p} from "module";`,
    `import {k as l, m} from "module";`,
    `import foo, {bar} from "foo";`,
    `import { null as nil } from "bar"`,
    `import x, * as ns from "foo"`,
    `import x, * as a from "y"`,
    `import {as as as} from 'as'`,
    `import a, {function as c} from 'baz'`,
    `import { as, get, set, from } from "baz"`,
    `import $ from "foo"`,
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
    'import $ from "foo"',
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
    "import a, * as b from 'a'",
    "import a, {} from 'foo'",
    "import a from 'foo'",
    "import * as a from 'a'",
    "import {m as mm} from 'foo';",
    "import {aa} from 'foo';",
    'import { as, get, set, from } from "baz"',
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
    "import foo, * as bar from 'baz';",
    'import $ from "foo"',
    'import {} from "foo";',
    "import n from 'n.js';",
    'import a from "module";',
    'import b, * as c from "module";',
    "import { yield as y } from 'm.js';",
    "import { static as s } from 'm.js';",
    "import { yield as y } from 'foo';",
    'import async from "foo";',
    'import defexp, {x,} from "foo";',
    'import { Cocoa as async } from "foo"',
    "import 'somemodule.js';",
    "import { } from 'm.js';",
    "import { a } from 'm.js';",
    "import 'foo';",
    "import { a } from 'foo';",
    'import { a as of } from "k";',
    // Runtime errors
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
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }

  it('import X from "y"', () => {
    t.deepEqual(parseModule('import X from "y"'), {
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
      type: 'Module'
    });
  });

  it('import a, {} from "foo"', () => {
    t.deepEqual(parseModule('import a, {} from "foo"'), {
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
      type: 'Module'
    });
  });

  it('import b, * as c from "module";', () => {
    t.deepEqual(parseModule('import b, * as c from "module";'), {
      type: 'Module',
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

  it('import { a as of } from "k";', () => {
    t.deepEqual(parseModule('import { a as of } from "k";'), {
      directives: [],
      end: 28,
      start: 0,
      leafs: [
        {
          end: 28,
          fromClause: {
            end: 27,
            start: 24,
            type: 'StringLiteral',
            value: 'k'
          },
          importClause: {
            defaultBinding: null,
            end: 18,
            nameSpaceImport: null,
            namedImports: {
              end: 18,
              importsList: [
                {
                  binding: {
                    end: 16,
                    name: 'of',
                    start: 14,
                    type: 'BindingIdentifier'
                  },
                  end: 16,
                  name: {
                    end: 10,
                    name: 'a',
                    start: 9,
                    type: 'IdentifierName'
                  },
                  start: 9,
                  type: 'ImportSpecifier'
                }
              ],
              start: 7,
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
      type: 'Module'
    });
  });

  it('import { let as l } from "foo";', () => {
    t.deepEqual(parseModule('import { let as l } from "foo";'), {
      directives: [],
      end: 31,
      start: 0,
      leafs: [
        {
          end: 31,
          fromClause: {
            end: 30,
            start: 25,
            type: 'StringLiteral',
            value: 'foo'
          },
          importClause: {
            defaultBinding: null,
            end: 19,
            nameSpaceImport: null,
            namedImports: {
              end: 19,
              importsList: [
                {
                  binding: {
                    end: 17,
                    name: 'l',
                    start: 16,
                    type: 'BindingIdentifier'
                  },
                  end: 17,
                  name: {
                    end: 12,
                    name: 'let',
                    start: 9,
                    type: 'IdentifierName'
                  },
                  start: 9,
                  type: 'ImportSpecifier'
                }
              ],
              start: 7,
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
      type: 'Module'
    });
  });

  it('import "string"', () => {
    t.deepEqual(parseModule('import "string"'), {
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
      type: 'Module'
    });
  });

  it('import {x, z,} from "y"', () => {
    t.deepEqual(parseModule('import {x, z,} from "y"'), {
      directives: [],
      end: 23,
      start: 0,
      leafs: [
        {
          end: 23,
          fromClause: {
            end: 23,
            start: 20,
            type: 'StringLiteral',
            value: 'y'
          },
          importClause: {
            defaultBinding: null,
            end: 14,
            nameSpaceImport: null,
            namedImports: {
              end: 14,
              importsList: [
                {
                  binding: {
                    end: 9,
                    name: 'x',
                    start: 8,
                    type: 'IdentifierName'
                  },
                  end: 9,
                  name: null,
                  start: 8,
                  type: 'ImportSpecifier'
                },
                {
                  binding: {
                    end: 12,
                    name: 'z',
                    start: 11,
                    type: 'IdentifierName'
                  },
                  end: 12,
                  name: null,
                  start: 11,
                  type: 'ImportSpecifier'
                }
              ],
              start: 7,
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
      type: 'Module'
    });
  });

  it('import thing, * as rest from "x"', () => {
    t.deepEqual(parseModule('import thing, * as rest from "x"'), {
      type: 'Module',
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
    t.deepEqual(parseModule('(a, b)'), {});
  });

  it('simple block', () => {
    t.deepEqual(parseModule('(a, b)'), {});
  });

  it('simple block', () => {
    t.deepEqual(parseModule('(a, b)'), {});
  });

  it('simple block', () => {
    t.deepEqual(parseModule('(a, b)'), {});
  });

*/
});
