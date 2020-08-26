import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Misc - Comments', () => {
  for (const arg of [
    'x --> is eol-comment\nvar y = 37;\n',
    '"\\n" --> is eol-comment\nvar y = 37;\n',
    'x/* precomment */ --> is eol-comment\nvar y = 37;\n',
    'var x = 42; --> is eol-comment\nvar y = 37;\n'
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
    '\n --> is eol-comment\nvar y = 37;\n',
    '\n-->is eol-comment\nvar y = 37;\n',
    '\n-->\nvar y = 37;\n'
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

  for (const arg of [
    '/* var*/',
    '\n/*\n^\n*/',
    '""\n/*\n^\n*/',
    '     \n/*\n^\n*/',
    '    /* */      /*   /*  /*    */  \n/*\n^\n*/',
    '\r\r\n/*\n^\n*/',
    '\r\n/*\n^\n*/',
    '\n\r/*\n^\n*/',
    '\r/*\n^\n*/',
    '\n/**/',
    '\n/*\n*/',
    '\n/*\n\n*/',
    '\n/**/\n',
    '\n/*\n\n*/\n',
    '\n/*\nfuse.box\n*/\n',
    'foo\n/*\n\n*/',
    '/*a\r\nb*/ 0',
    '/*a\rb*/ 0',
    '/*a\nb*/ 0',
    '/*a\nc*/ 0',
    'var p1;/* block comment 1 */ /* block comment 2 */',
    '42 /*The*/ /*Answer*/',
    '// one\n',
    '//',
    '\n --> is eol-comment\nvar y = 37;\n',
    '\n-->is eol-comment\nvar y = 37;\n',
    '\n-->\nvar y = 37;\n',
    '/* precomment */ --> is eol-comment\nvar y = 37;\n',
    '/* precomment */-->eol-comment\nvar y = 37;\n',
    '\n/* precomment */ --> is eol-comment\nvar y = 37;\n',
    '\n/*precomment*/-->eol-comment\nvar y = 37;\n',
    // After first real token.
    'var x = 42;\n--> is eol-comment\nvar y = 37;\n',
    'var x = 42;\n/* precomment */ --> is eol-comment\nvar y = 37;\n',
    'x/* precomment\n */ --> is eol-comment\nvar y = 37;\n',
    'var x = 42; /* precomment\n */ --> is eol-comment\nvar y = 37;\n',
    'var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n',
    // With multiple comments preceding HTMLEndComment
    '/* MLC \n */ /* SLDC */ --> is eol-comment\nvar y = 37;\n',
    '/* MLC \n */ /* SLDC1 */ /* SLDC2 */ --> is eol-comment\nvar y = 37;\n',
    '/* MLC1 \n */ /* MLC2 \n */ --> is eol-comment\nvar y = 37;\n',
    '/* SLDC */ /* MLC \n */ --> is eol-comment\nvar y = 37;\n',
    '/* MLC1 \n */ /* SLDC1 */ /* MLC2 \n */ /* SLDC2 */ --> is eol-comment\n',
    'var y = 37;\n',
    'if (x) { doThat() /* Some comment */ }',
    'switch (answer) { case 42: /* perfect */ bingo() }',
    'switch (answer) { case 42: bingo() /* perfect */ }',
    '(function(){ var version = 1; /* sync */ }).call(this)',
    `/**
    * @type {number}
    */
   var a = 5;`,
    `(/* comment */{
      /* comment 2 */
      p1: null
  })`,
    'let a = () => /* = */ { return "b" }',
    'let a = () => { /* = */ return "b" }',
    'let a = () /* = */ => { return "b" }',
    '(/* className: string */) => {}',
    '0 // line comment',
    '// Hello, Icefapper!\n1220',
    '//',
    '0/**/',
    '/* not comment*/; i-->0',
    '// Hello, Icefapper!\n',
    '// line comment\n0',
    '// foo',
    '// /* foo */',
    '\t\t\t\t\t\t\t\t',
    '\t // foo bar${lt}  ',
    `\t // foo bar\n // baz \n //`,
    `\t /* foo * /* bar \u2028 */  `,
    `\t // foo bar\r // baz \r //`,
    `\t /* foo * /* bar \u2029 */  `,
    `\t /* foo bar\r *//* baz*/ \r /**/`,
    `var a; // a`,
    '/**/42',
    '/**/42',
    '//42',
    '42/**/',
    'function x(){ /*foo*/ return; /*bar*/}',
    '0 /*The*/ /*Answer*/',
    'if (x) { // Some comment\ndoThat(); }',
    `var a; // a`,
    '{ x\n++y }',
    '{ x\n--y }',
    '{ throw error\nerror; }',
    '{ throw error// Comment\nerror; }',
    '{ throw error/* Multiline\nComment */error; }',
    'a(/* inner */); b(e, /* inner */)',
    'while (true) { continue /* Multiline\nComment */there; }',
    'while (true) { break /* Multiline\nComment */there; }',
    'while (true) { continue // Comment\nthere; }',
    'while (true) { continue\nthere; }',
    '42 /* block comment 1 */ /* block comment 2 */',
    `/* multiline
  comment
  should
  be
  ignored */ 42`,
    `// line comment
  42`,
    '//',
    'if (x) { /* Some comment */ doThat() }',
    'function f() { /* infinite */ while (true) { } /* bar */ var each; }',
    'function x(){ /*Babel*/ Tenko; /*Acorn*/}',
    '/**/ function a() {}',
    `while (true) {
    /**
     * comments in empty block
     */
  }`,
    'let g = /* before */GeneratorFunction("a", " /* a */ b, c /* b */ //", "/* c */ yield yield; /* d */ //")/* after */;',
    '/* before */async function /* a */ f /* b */ ( /* c */ x /* d */ , /* e */ y /* f */ ) /* g */ { /* h */ ; /* i */ ; /* j */ }/* after */',
    'class H { /* before */async /* a */ [ /* b */ x /* c */ ] /* d */ ( /* e */ ) /* f */ { /* g */ }/* after */ }',
    'class G { /* before */async /* a */ [ /* b */ "g" /* c */ ] /* d */ ( /* e */ ) /* f */ { /* g */ }/* after */ }',
    'class F { /* before */async f /* a */ ( /* b */ ) /* c */ { /* d */ }/* after */ }',
    '/* before */class /* a */ A /* b */ extends /* c */ class /* d */ B /* e */ { /* f */ } /* g */ { /* h */ }/* after */',
    'let g = /* before */function /* a */ ( /* b */ x /* c */ , /* d */ y /* e */ ) /* f */ { /* g */ ; /* h */ ; /* i */ }/* after */;',
    '({ /* before */set /* a */ [ /* b */ x /* c */ ] /* d */ ( /* e */ a /* f */ ) /* g */ { /* h */ }/* after */ })',
    '0xabcn',
    '45n',
    //'a(x:b)',
    //'a(x:c(y:b))',
    `"x\\\\0"; "use strict";`,
    'x \n /foo',
    'x \n /foo/g',
    'debugger \n /foo/',
    'debugger \n /foo/g',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);',
    'for (x--;;);'
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
