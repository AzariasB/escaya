import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Misc - Directives', () => {
  for (const arg of [
    `function f(){
      "foo" "bar"`,
    '"use strict"; "use strict"; with (x) y;',
    '"haha\
    still\
    fine"; "use strict"; with (x) y;',
    '() => { "use strict"\nwith (x) y; }',
    '"use strict"\n;with (x) y;',
    '""/x\n""',
    'function f(){ "use strict"; with (x) y; }',
    "'random\nnewline'",
    "'random\nnewline'",
    "'random\\x\u2029newline'",
    "'random\\x0\rnewline'",
    "'random\\x0\u2029newline'",
    "'random\\u\rnewline'",
    "'random\\u\r\nnewline'",
    "'random\\u\u2028newline'",
    "'random\\u\u2029newline'",
    "'random\\u00\r\nnewline'",
    "'random\\u0a\rnewline'",
    "'random\\u0a\u2029newline'",
    "'random\\u00a\u2029newline'",
    "'random\\u{0\nnewline'",
    "'random\\u{0\u2029newline'",
    "'random\\u foo'",
    "'random\\u00a foo'",
    "'random\\u{\\ foo'",
    "'random\\u{0\\ foo'",
    "'random\\xx foo'",
    "'random\\u{ax foo'",
    "'random\\u{u foo'",
    "'random\\x{ foo'",
    "'random\\u000} foo'",
    `"ignore me" = x`,
    `"ignore me"++`,
    `function f(){
      "foo" "bar"`
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

  for (const arg of [
    '(w, o, e, m) => { "use strict" }',
    '(w, o, e, m) => { "use strict"; "use strict" }',
    `"a"
    "/b"`,
    `((("") / (x)));
    "";`,
    `"ignore me"
    ++x`,
    `function f(){ "use strict" }`,
    '(function () { "use\\x20strict"; with (a); })',
    '(function () { "use\\x20strict"; with (a); }())',
    `"foo";
    'bar';`,
    `"foo";
    "bar";`,
    `"foo";"bar";`,
    `"foo"
    // stuff here
    "bar";`,
    `"ignore me"
    /x/g`,
    `"ignore me"
    + x`,
    `"foo";`,
    `"foo"`,
    `function f(){
      'foo';
      "bar";
      }`,
    `function f(){
      "foo";
      'bar';
      }`,
    `function f(){
      "foo"/*abc
      xyz*/"bar";
      }`,
    `function f(){
      "foo"
      // stuff here
      "bar";
      }`,
    `function f(){
      "foo";
      }`,
    `x => { "use strict"; }`,
    `() => { "use strict"; }`,
    'async x => { "use strict"; }',
    'function* f() { "use strict"; }',
    '() => { "use strict"; }',
    'function f(){ "use strict" }',
    '"use\\x20strict"',
    '"use\\x20strict"; with (a) b = c;',
    '`use strict`; with (x) y;',
    '"use asm";',
    "'use asm'; 'use strict'",
    "'use asm' \n 'use strict'",
    "'use asm' \r 'use strict'",
    "'use asm' \r\n 'use strict'",
    '"use asm" \u2028 "use strict"',
    '"use asm" \u2029 "use strict"',
    '"use asm" \r\n "use strict"',
    '"use asm" \n "use strict"',
    'function f(){\n"foo";\n"bar";\n}',
    'function f(){\n"foo"\n// stuff here\n"bar";\n}',
    'function f(){\n"foo";\n}',
    'function f(){\n"foo"\nx\n}',
    '((("") / (x)));\n"";',
    "'use strict'",
    `"ignore me"
    /x/g`,
    '"\0";"use strict"',
    `"ignore me"
    ++x`
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

  it('"You \\077 ok"', () => {
    t.deepEqual(parseScript('"You \\077 ok"', { loc: true }), {
      directives: [
        {
          end: 13,
          start: 0,
          type: 'Directive',
          raw: 'You \\077 ok',
          value: 'You ? ok'
        }
      ],
      end: 13,
      leafs: [],
      start: 0,
      type: 'Script'
    });
  });

  it('"use\\x20strict";\nwith ({}) {};', () => {
    t.deepEqual(parseScript('"use\\x20strict";\nwith ({}) {};', { loc: true }), {
      directives: [
        {
          end: 15,
          start: 0,
          type: 'Directive',
          value: 'use strict',
          raw: 'use\\x20strict'
        }
      ],
      end: 30,
      leafs: [
        {
          end: 29,
          expression: {
            end: 25,
            properties: [],
            start: 23,
            type: 'ObjectLiteral'
          },
          start: 17,
          statement: {
            end: 29,
            leafs: [],
            start: 27,
            type: 'BlockStatement'
          },
          type: 'WithStatement'
        },
        {
          end: 30,
          start: 29,
          type: 'EmptyStatement'
        }
      ],
      start: 0,
      type: 'Script'
    });
  });

  it('"\\0";"use strict"', () => {
    t.deepEqual(parseScript('"\\0";"use strict"', { loc: true }), {
      directives: [
        {
          end: 4,
          start: 0,
          type: 'Directive',
          raw: '\\0',
          value: '\u0000'
        },
        {
          end: 17,
          start: 5,
          type: 'Directive',
          raw: 'use strict',
          value: 'use strict'
        }
      ],
      end: 17,
      leafs: [],
      start: 0,
      type: 'Script'
    });
  });

  it('"ignore me"\n/x/g', () => {
    t.deepEqual(parseScript('"ignore me"\n/x/g', { loc: true }), {
      directives: [
        {
          end: 11,
          start: 0,
          type: 'Directive',
          raw: 'ignore me',
          value: 'ignore me'
        }
      ],
      end: 16,
      leafs: [
        {
          end: 16,
          expression: {
            end: 16,
            flag: 'g',
            pattern: 'x',
            start: 12,
            type: 'RegularExpressionLiteral'
          },
          start: 12,
          type: 'ExpressionStatement'
        }
      ],
      start: 0,
      type: 'Script'
    });
  });

  it('"foo"', () => {
    t.deepEqual(parseScript('"foo"', { loc: true }), {
      type: 'Script',
      directives: [
        {
          type: 'Directive',
          value: 'foo',
          raw: 'foo',
          start: 0,
          end: 5
        }
      ],
      leafs: [],
      start: 0,
      end: 5
    });
  });

  it('function f(){\n"foo";"bar";\n}', () => {
    t.deepEqual(parseScript('function f(){\n"foo";"bar";\n}', { loc: true }), {
      directives: [],
      end: 28,
      leafs: [
        {
          async: false,
          contents: {
            directives: [
              {
                end: 19,
                start: 14,
                type: 'Directive',
                raw: 'foo',
                value: 'foo'
              },
              {
                end: 25,
                start: 20,
                type: 'Directive',
                raw: 'bar',
                value: 'bar'
              }
            ],
            end: 28,
            leafs: [],
            start: 12,
            type: 'FunctionBody'
          },
          end: 28,
          generator: false,
          name: {
            end: 10,
            name: 'f',
            start: 9,
            type: 'BindingIdentifier'
          },
          params: [],
          start: 0,
          type: 'FunctionDeclaration'
        }
      ],
      start: 0,
      type: 'Script'
    });
  });

  it('"use strict".foo;', () => {
    t.deepEqual(parseScript('"use strict".foo;', { loc: true }), {
      directives: [],
      end: 17,
      leafs: [
        {
          end: 17,
          expression: {
            computed: false,
            end: 16,
            expression: {
              end: 16,
              name: 'foo',
              start: 13,
              type: 'IdentifierName'
            },
            member: {
              end: 12,
              start: 0,
              type: 'StringLiteral',
              value: 'use strict'
            },
            start: 0,
            type: 'MemberExpression'
          },
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      start: 0,
      type: 'Script'
    });
  });

  it('"use strict"(foo);', () => {
    t.deepEqual(parseScript('"use strict"(foo);', { loc: true }), {
      directives: [],
      end: 18,
      leafs: [
        {
          end: 18,
          expression: {
            arguments: [
              {
                end: 16,
                name: 'foo',
                start: 13,
                type: 'IdentifierReference'
              }
            ],
            end: 17,
            expression: {
              end: 12,
              start: 0,
              type: 'StringLiteral',
              value: 'use strict'
            },
            start: 0,
            type: 'CallExpression'
          },
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      start: 0,
      type: 'Script'
    });
  });

  it('"use strict"; foo', () => {
    t.deepEqual(parseScript('"use strict"; foo', { loc: true }), {
      type: 'Script',
      directives: [
        {
          type: 'Directive',
          value: 'use strict',
          raw: 'use strict',
          start: 0,
          end: 12
        }
      ],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'foo',
            start: 14,
            end: 17
          },
          start: 14,
          end: 17
        }
      ],
      start: 0,
      end: 17
    });
  });

  it('() => "use strict"', () => {
    t.deepEqual(parseScript('() => "use strict"', { loc: true }), {
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
              expression: {
                type: 'StringLiteral',
                value: 'use strict',
                start: 6,
                end: 18
              },
              start: 6,
              end: 18
            },
            async: false,
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });
});
