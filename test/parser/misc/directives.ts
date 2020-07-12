import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Directives', () => {
  // Invalid cases
  for (const arg of [
    '"use strict"; "use strict"; with (x) y;',
    '"haha\
    still\
    fine"; "use strict"; with (x) y;',
    '() => { "use strict"\nwith (x) y; }',
    '"use strict"\n;with (x) y;',
    //'function f(){ "use strict"; with (x) y; }',
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

  // Valid cases
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
    `async x => { "use strict"; }`,
    `function* f() { "use strict"; }`,
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

  it('Simple directive', () => {
    t.deepEqual(parseScript(`"use strict", "Hello\\312World"`), {
      directives: [],
      leafs: [
        {
          leafs: [
            {
              type: 'StringLiteral',
              value: 'use strict'
            },
            {
              type: 'StringLiteral',
              value: 'HelloÊWorld'
            }
          ],
          type: 'CommaOperator'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Array spread with comma', () => {
    t.deepEqual(parseScript(`"x\\0" + 1; "use strict";`), {
      directives: [],
      leafs: [
        {
          left: {
            type: 'StringLiteral',
            value: 'x\u0000'
          },
          operator: '+',
          right: {
            type: 'NumericLiteral',
            value: 1
          },
          type: 'BinaryExpression'
        },
        {
          type: 'EmptyStatement'
        },
        {
          expression: {
            type: 'StringLiteral',
            value: 'use strict'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
