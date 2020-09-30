import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Template', () => {
  // Invalid cases
  for (const arg of [
    '[',
    '[,',
    'foo() `foo` ++;',
    'foo() `foo` --;',
    '++ foo() `foo`;',
    '-- foo() `foo`;',
    'foo() `foo` = 1;',
    'foo() `foo` += 1;',
    'foo() `foo` -= 1;',
    'foo() `foo` *= 1;',
    'for (foo() `foo` = 0; ; ) {}',
    'for (; ; foo() `foo` = 0) {}',
    '[] += a',
    '`a\\00b`',
    '`foo${a \n`',
    '`${"-->"}{',
    '`${"-->"}{ bbb',
    '`${"-->"}$',
    '`${"-->"}prefix\t',
    '`${"-->"}\'suffix',
    '`${"-->"}"suffix',
    '`${"-->"}\nsuffix',
    '`${"-->"}\rsuffix',
    '`${"-->"}P',
    '`${"-->"}prefix\\t',
    '`${"-->"}\\"suffix',
    '`${"-->"}\\nsuffix',
    '`${"-->"}\\rsuffix',
    '`\\1``\\2`',
    '`\\u{abcdx`',
    '`\\u{abcdx}`',
    '`\\xylophone`',
    '`\\1``\\2`',
    '`${"-->"}\\x8${"<--"}`',
    '`${"-->"}\\xb${"<--"}`',
    '`${"-->"}\\xq0${"<--"}`',
    '`${"-->"}\\xq4${"<--"}`',
    '`${"-->"}\\xq9${"<--"}`',
    '`${"-->"}\\xqa${"<--"}`',
    '`${"-->"}\\x3${"<--"}`',
    '`${"-->"}\\xqd${"<--"}`',
    '`${"-->"}\\x7q${"<--"}`',
    '`${"-->"}\\302${"<--"}`',
    '`${"-->"}\\221${"<--"}`',
    '`${"-->"}\\0008${"<--"}`',
    '`${"-->"}\\302',
    '`${"-->"}\\8',
    '`${"-->"}\\u{af${"<--"}`',
    '`${"-->"}\\66 ${"<--"}`',
    '`${"-->"}\\31',
    '`${"-->"}\\5${"<--"}`',
    '`${"-->"}\\11',
    '`${"-->"}\\11t${"<--"}`',
    '`${"-->"}\\008${"<--"}`',
    '`${"-->"}\\31${"<--"}`',
    '`\\x1q${"<--"}`',
    '`\\x6q${"<--"}`',
    '`\\xF${"<--"}`',
    '`${"-->"}\\u0fail`',
    '`foo${/* comment */ a`',
    '`foo${// commenta}`',
    '`foo${\n a`',
    '`foo${\r\n a`',
    '`foo${\r a`',
    '`foo${fn(}`',
    '`hello\\x`',
    '`hello\\x${1}`',
    '`hello${1}\\x`',
    '`hello${1}\\x${2}`',
    '`hello\\x\n`',
    '`hello\\x\n${1}`',
    '`\\08`',
    '`\\01`',
    '`\\01${0}right`',
    '`left${0}\\01`',
    '`left${0}\\01${1}right`',
    '`\\1`',
    '`\\1${0}right`',
    '`left${0}\\1`',
    '`left${0}\\1${1}right`',
    '`\\xg`',
    '`\\xg${0}right`',
    '`left${0}\\xg`',
    '`left${0}\\xg${1}right`',
    '`\\xAg`',
    '`\\xAg${0}right`',
    '`left${0}\\xAg`',
    '`left${0}\\xAg${1}right`',
    //['`\\u0`',
    '`\\u0${0}right`',
    '`left${0}\\u0`',
    '`left${0}\\u0${1}right`',
    '`\\u0g`',
    '`\\u0g${0}right`',
    '`left${0}\\u0g`',
    '`left${0}\\u0g${1}right`',
    '`\\u00g`',
    '`\\u00g${0}right`',
    '`left${0}\\u00g`',
    '`left${0}\\u00g${1}right`',
    '`\\u000g`',
    '`\\u000g${0}right`',
    '`left${0}\\u000g`',
    '`left${0}\\u000g${1}right`',
    '`\\u{}`',
    '`\\u{}${0}right`',
    '`left${0}\\u{}`',
    '`left${0}\\u{}${1}right`',
    '`\\u{-0}`',
    '`\\u{-0}${0}right`',
    '`left${0}\\u{-0}`',
    '`left${0}\\u{-0}${1}right`',
    '`\\u{g}`',
    '`\\u{g}${0}right`',
    '`left${0}\\u{g}`',
    '`left${0}\\u{g}${1}right`',
    '`\\u{0`',
    '`\\u{0${0}right`',
    '`left${0}\\u{0`',
    '`left${0}\\u{0${1}right`',
    '`\\u{\\u{0}`',
    '`\\u{\\u{0}${0}right`',
    '`left${0}\\u{\\u{0}`',
    '`left${0}\\u{\\u{0}${1}right`',
    '`\\u{110000}`',
    '`\\u{110000}${0}right`',
    '`left${0}\\u{110000}`',
    '`\\u{110000}`',
    '`\\u{110000}${0}right`',
    '`left${0}\\u{110000}`',
    '`left${0}\\u{110000}${1}right`',
    "'use strict'; `template-head${a}",
    "'use strict'; `template-head${a}template-tail",
    "'use strict';`foo${a /* comment } */`",
    "'use strict'; `foo${a /* comment } `*/",
    '`foo${a // comment}`',
    '`foo${a \n`',
    "'use strict'; `foo${a \r\n`",
    '`foo${a \r`',
    '} `foo${/* comment */ a`',
    '`foo${// commenta}`',
    '`foo${\n a`',
    '} `foo${\r\n a`',
    '`foo${\r a`',
    '`foo${fn(}`'
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
    'a.foo`bar`',
    'y`${y,0}`',
    'for(t`${x in y}`;;);',
    'foo`x${a}y${b}z`',
    'tag`okay \\u{110001}`;',
    'tag`phew \\u{110001}`',
    'tag`start \\0137 \\x18 \\u{05} \\0 finish`;',
    'tag`${"\\07"}`;',
    'tag`a\\0b`',
    'tag`\\08`',
    'tag`\\7`',
    '`\\"`',
    "`\\'`",
    "'use strict';`no-subst-template`",
    "'use strict';`template-head${a}`",
    '`${a}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    "'use strict';`foo\n\nbar\r\nbaz`",
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    "'use strict';`foo${a // comment\n}`",
    "'use strict';`foo${a \n}`",
    '`${"a"}`',
    '`${1}`',
    'example3 = 1 + `${foo}${bar}${baz}`',
    '`${""}`',
    'y`${y,0}`',
    '`${y,0}`',
    'foo = `${1}${f}oo${true}${b}ar${0}${baz}`',
    'bar = bar`wow\naB${ 42 } ${_.baz()}`',
    'bar`wow\na${ 42 }b ${_.foobar()}`',
    ' bar`wow\naB${ 42 } ${_.baz()}`',
    'function z() {}; `z`;',
    'function z() {}; `${z}`;',
    'function z() {}; `${z}${z}`;',
    'function z() {}; `${z}${z}${z}`;',
    "function z() {}; `${'z'}${z}${z}`;",
    "function z() {}; `${'z'}${'z'}${z}`;",
    "function z() {}; `${'z'}${'z'}${async}`;",
    'tag`left${0}\\u{110000}${1}right`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`\\u{0${0}right`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'tag`\\u{\\u{0}${0}right`',
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'var string = `foo${`${bar}`}`',
    "simpleTag`str1 ${'str2'} str3 ${'str4'} str5 ${'str6'} str7 ${'str8'} str9`",
    'x`\\ua48c`',
    'x`\\h`',
    'x`\\h`',
    'x`bunch of escape chars \\v\\t\\n\\b\\a`',
    'x`\r\n`',
    'x`\r\n\r\n`',
    'x`\n\n\n\n\n\n\n\n\n\n`',
    '`$$${a}`',
    'z``',
    '``',
    'test`\\uG`;',
    'test`\\xG`;',
    'test`\\18`;',
    '(`\n`)',
    '(`\r`)',
    'new nestedNewOperatorFunction`1``2``3``array`',
    '`a\\u{d}c`',
    'x`a\\u{d}c${0}`',
    '`a\\u{0062}c`',
    '`a\\{000062}c`',
    '`a\\u{00000062}c`',
    '`a\\u{000000062}c`',
    '`\\\0${0}`',
    'x`\0${0}`',
    'x`\\\0${0}`',
    'x`\\r${0}`',
    'x`\\\r\\\n${0}`',
    'x`\\\r\n${0}`',
    'x`\r\\\n${0}`',
    'x`\\r\\n${0}`',
    'x`\\r\n${0}`',
    'x`\r\\n${0}`',
    'x`\\\r\\n${0}`',
    'x`\\\u2028${0}`',
    'x`\u2029${0}`',
    'x`\\\u2029${0}`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'x`\\r\n${0}`',
    'x`\\\r\\n${0}`',
    'f`${x} \\xg ${x}`;',
    'x`\\\u2028${0}`',
    `\`a\${a}a\${b}a\``,
    `\`\${\`\${a}\`}\``,
    'x`\\xF8`',
    'tag`foo${a // comment\n}`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\r\n a}`',
    'tag`foo${\r a}`',
    "tag`foo${'a' in a}`",
    "'use strict'; tag\r\n`a${a}b${b}c${c}`",
    "'use strict'; tag    `${a}a${b}b${c}c`",
    '`\r\n\t\n`',
    'sampleTag`\\01`',
    'sampleTag`left${0}\\u{\\u{0}`',
    'sampleTag`left${0}\\u{-0}${1}right`',
    'sampleTag`left${0}\\u{g}${1}right`',
    'sampleTag`left${0}\\u000g${1}right`',
    'tag`template-head${a}`',
    '`x${z} ${a,b}y`',
    '`x${a,b}y`',
    'tag `no-subst-template`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag`foo${a /* comment */}`',
    '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
    'foo`T\\u200C`',
    'foo`\\u{00000000034}`',
    '`\\ю`',
    '`\\б`',
    'tag`\\1`',
    'tag ``',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\n async}`',
    'tag`async${\n a}`',
    '`a${b}`',
    "'use strict'; `no-subst-template`",
    "function foo(){ 'use strict';`template-head${a}`}",
    "function foo(){ 'use strict';`${a}`}",
    "function foo(){ 'use strict';`${a}template-tail`}",
    "'use strict'; `template-head${a}template-tail`",
    "'use strict'; `${a}${b}${c}`",
    "function foo(){ 'use strict';`a${a}b${b}c${c}`}",
    'function z() {}; z`${`${z}`}`;',
    'function z() {}; z``;',
    'function z() {}; ``;',
    'x`$ $ $ {} } { }} {{`',
    '(`${function(id) { return id }}`);',
    "function y() {} y`${`${'z'}${`${function(id) { return id }})${ /x/g >= 'c'}`}`}`;",
    'tag`foo\\n`',
    't`foo\\n`;',
    'foo`\r\\\n${0}`',
    '`a\\u{062}c`',
    '`a\\u{000000062}c`',
    'tag`foo\\n`',
    't`foo\\n`;',
    '`a\\u{d}c`',
    '`a\\u{062}c`',
    '`a\\u{000000062}c`',
    'async`\n${0}`',
    'foo`\n${0}`',
    'foo`\\\n${0}`',
    'foo`\\r${0}`',
    'foo`\r\n${0}`',
    'foo`\\\r\\\n${0}`',
    'foo`\\\r\n${0}`',
    'foo`\r\\\n${0}`',
    'foo`\\r\\n${0}`',
    'foo`\u2029${0}`',
    'foo`\\\u2029${0}`',
    'foo`\\n${0}`',
    'foo`\\r${0}`',
    'foo`\\\r\\\n${0}`',
    'foo`\r\\n${0}`',
    'foo`\\\u2029${0}`',
    'function x() { var a, b, c; return tag\t`foo\n\nbar\r\nbaz`}',
    'function x() { var a, b, c; return tag\r`foo\n\n${  bar  }\r\nbaz`}',
    'function x() { var a, b, c; return tag`foo${a /* comment */}`}',
    'function x() { var a, b, c; return tag`foo${a // comment\n}`}',
    '`no-subst-template`',
    '`template-head${a}`',
    'f`\\xg ${x}`;',
    '`${a}`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    '`foo\n\nbar\r\nbaz`',
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    '`foo${a // comment\n}`',
    '`foo${a \n}`',
    '`foo${a \r\n}`',
    '`async${a \r\n}`',
    '`foo${a \r}`',
    '`foo${a \r\n}`',
    '`foo${// comment\na}`',
    '`foo${\n a}`',
    '`foo${\r\n a}`',
    '`foo${\r a}`',
    "`foo${'a' in a}`",
    'tag ``',
    'tag `no-subst-template`',
    'tag`template-head${a}`',
    'tag `${a}`',
    'tag `${a}template-tail`',
    'tag   `template-head${a}template-tail`',
    'tag\n`${a}${b}${c}`',
    'tag\r\n`a${a}b${b}c${c}`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    '``',
    '`a`',
    '`a${1}b`',
    '`a${1}b${2}c`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    'tag`foo${a // comment\n}`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    '`foo${1 if}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\r\n a}`',
    'tag`foo${\r a}`',
    "tag`foo${'a' in a}`",
    '`${y, x`)`}`',
    '`${x`)`, y}`',
    '`a${b=c}d`',
    'f`x${/foo/}y`',
    '`foo ${a} and ${b} and ${c} baz`',
    '{`foo baz`}',
    '{`foo ${a} baz`}',
    '{`foo ${a} and ${b} and ${c} baz`}',
    'tag`\\09`',
    'tag`\\123x`',
    'tag`\\129`',
    'tag`\\1230`',
    '`${"a"}`',
    '`${1}`',
    'example3 = 1 + `${foo}${bar}${baz}`',
    '`${""}`',
    'y`${y,0}`',
    '`${y,0}`',
    'foo = `${1}${f}oo${true}${b}ar${0}${baz}`',
    'bar = bar`wow\naB${ 42 } ${_.baz()}`',
    'bar`wow\na${ 42 }b ${_.foobar()}`',
    ' bar`wow\naB${ 42 } ${_.baz()}`',
    'tag`foo\\n`',
    't`foo\\n`;',
    'foo`\r\\\n${0}`',
    '`a\\u{062}c`',
    '`a\\u{000000062}c`',
    'tag`foo\\n`',
    't`foo\\n`;',
    '`a\\u{d}c`',
    '`a\\u{062}c`',
    '`a\\u{000000062}c`',
    'async`\n${0}`',
    'foo`\\u\\n\\r`',
    'foo`\\uaa\\n\\r`',
    'raw`hello ${name}`',
    '`$`',
    '`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`',
    '`\n\r\n\r`',
    "'use strict'; `no-subst-template`",
    'tag `no-subst-template`',
    'tag`\\08`',
    'tag`\\01`',
    'tag`\\01${0}right`',
    'tag`left${0}\\01`',
    'tag`left${0}\\01${1}right`',
    'tag`\\1`',
    'tag`\\1${0}right`',
    'tag`left${0}\\1`',
    'tag`left${0}\\1${1}right`',
    `\`a\``,
    `\`\\\${a}\``,
    `\`$a\``,
    `\`\${a}\${b}\``,
    `\`a\${a}\${b}\``,
    `\`\${a}a\${b}\``,
    `\`a\${a}a\${b}\``,
    'a`\\${a}`',
    `\`\${a}\${b}a\``,
    `\`\${a}a\${b}a\``,
    `\`a\${a}a\${b}a\``,
    `\`\${\`\${a}\`}\``,
    `\`\${\`a\${a}\`}\``,
    `\`\${\`\${a}a\`}\``,
    `\`\${\`a\${a}a\`}\``,
    `\`\${\`\${\`\${a}\`}\`}\``,
    '`xy \\u{abc}} yz`;',
    '`some \\" quote`;',
    '`42`;',
    'tag` ``\\u`',
    'tag`\\u`` `',
    'tag`\\u``\\u`',
    '`\\u`',
    '` ${tag`\\u`}`',
    '` ``\\u`',
    '`\\u```',
    '{`foo baz`}',
    '{`foo ${a} baz`}',
    '{`foo ${a} and ${b} and ${c} baz`}',
    '`foo${{}}baz`',
    '`a ${()=>{}} b`',
    '`foo${{a,b} = x}baz`',
    '`foo${`foo${bar}baz`}baz`',
    '`{`',
    '{`foo ${a} and ${b} and ${`w ${d} x ${e} y ${f} z`} baz`}',
    '`a ${function(){}} b`',
    '`a ${(k)=>{x}} b`',
    '`foo`',
    'for(`${x in y}`;;);',
    '`foo ${a} and ${b} and ${c} baz`',
    '`foo${{a,b}}baz`',
    '`foo${`foo`}baz`',
    '`foo${bar}baz`',
    '`${ {function: 1} }`',
    '`${ {class: 1} }`',
    '`${ foo({class: 1}) }`',
    '`${x} + ${y} = ${x + y}` === "5 + 10 = 15"',
    '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`;',
    '`${/\\d/.exec("1")[0]}`',
    '`${ {delete: 1} }`',
    '`${ {enum: 1} }`',
    '`${function(){}}`',
    '`${class x{}}`',
    'tag`left${0}\\u0g`',
    'tag`left${0}\\u0g${1}right`',
    'tag`\\u00g`',
    'tag`\\u00g${0}right`',
    'tag`left${0}\\u00g`',
    'tag`left${0}\\u00g${1}right`',
    'tag`\\u000g`',
    'tag`\\u000g${0}right`',
    'tag`left${0}\\u000g`',
    'tag`left${0}\\u000g${1}right`',
    'tag`\\u{}`',
    'tag`left${0}\\u{-0}`',
    'tag`left${0}\\u{-0}${1}right`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`\\u{0${0}right`',
    'tag`left${0}\\u{0${1}right`',
    '`a${b}`',
    "'use strict'; `no-subst-template`",
    "function foo(){ 'use strict';`template-head${a}`}",
    "function foo(){ 'use strict';`${a}`}",
    "function foo(){ 'use strict';`${a}template-tail`}",
    "'use strict'; `template-head${a}template-tail`",
    "'use strict'; `${a}${b}${c}`",
    "function foo(){ 'use strict';`a${a}b${b}c${c}`}",
    `\`\${a}\${b}a\``,
    `\`\${a}a\${b}a\``,
    `\`a\${a}a\${b}a\``,
    `\`\${\`\${a}\`}\``,
    `\`\${\`a\${a}\`}\``,
    `\`\${\`\${a}a\`}\``,
    `\`\${\`a\${a}a\`}\``,
    `\`\${\`\${\`\${a}\`}\`}\``,
    'tag`left${0}\\u00g${1}right`',
    'tag`\\u000g`',
    'tag`\\u000g${0}right`',
    'tag`left${0}\\u000g`',
    'tag`left${0}\\u000g${1}right`',
    'tag`\\u{}`',
    'tag`\\u{}${0}right`',
    'tag`left${0}\\u{}`',
    'tag`left${0}\\u{}${1}right`',
    'tag`\\u{-0}`',
    'tag`\\u{-0}${0}right`',
    'tag`left${0}\\u{-0}`',
    'tag`left${0}\\u{-0}${1}right`',
    '`${{}}`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'tag`\\u{\\u{0}${0}right`',
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    '`template string`',
    'raw`\\u0065\\`\r\r\n\n${"test"}check`',
    '`${1 + 1}`',
    '`${1 + 1}`',
    '`${x => x}`',
    '`${x => x}`',
    '`before ${1 + 1} after`',
    '`before ${`nested ${1 + 1}`} after`',
    '`before ${`nested ${1 + 1}`} after`',
    'tag`tagged template string`',
    'tag`tagged template string`',
    'tag`before ${1 + 1} after`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    'tag`foo${a // comment\n}`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    'f`\\xg ${x}`;',
    '`${a}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    '`foo\n\nbar\r\nbaz`',
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    '`foo${a // comment\n}`',
    '`foo${a \n}`',
    '`foo${a \r\n}`',
    '`async${a \r\n}`',
    '`foo${a \r}`',
    '`foo${/* comment */ a}`',
    '`foo${// comment\na}`',
    '`foo${\n a}`',
    '`foo${\r\n a}`',
    '`foo${\r a}`',
    "`foo${'a' in a}`",
    'a``',
    'var async = `simple template`;',
    'let foo = f`template with function`;',
    'const foo = f`template with ${some} ${variables}`;',
    'var foo = f`template with ${some}${variables}${attached}`;',
    'let foo = f()`template with function call before`;',
    'const foo = f().g`template with more complex function call`;',
    '`a℮`',
    '`دیوانه`',
    '`℘`',
    '`foo\\tbar`',
    '`\\x55a`',
    '`f1o2o`',
    '`a\\u{d}c`',
    'x`a\\u{d}c${0}`',
    '`a\\u{0062}c`',
    '`a\\{000062}c`',
    '`a\\u{00000062}c`',
    '`a\\u{000000062}c`',
    '`\\\0${0}`',
    'x`\0${0}`',
    'x`\\\0${0}`',
    'x`\\r${0}`',
    'x`\\\r\\\n${0}`',
    'x`\\\r\n${0}`',
    'x`\r\\\n${0}`',
    'x`\\r\\n${0}`',
    'x`\\r\n${0}`',
    'x`\r\\n${0}`',
    'x`\\\r\\n${0}`',
    'x`\\\u2028${0}`',
    'x`\u2029${0}`',
    'x`\\\u2029${0}`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'var str = `${a}${b}`',
    'var str = `${a + b}${c}`;',
    'var str = x`y${(() => 42)()}`;',
    'var str = `foo${ bar }baz`;',
    'var str = `foo${bar}baz`;',
    'var string = `foo${`${bar}`}`',
    "simpleTag`str1 ${'str2'} str3 ${'str4'} str5 ${'str6'} str7 ${'str8'} str9`",
    'x`\\ua48c`',
    'x`\\h`',
    'x`\\h`',
    'x`bunch of escape chars \\v\\t\\n\\b\\a`',
    'x`$ $ $ {} } { }} {{`',
    'x`\\xF8`',
    'x`\r\n`',
    'x`\r\n\r\n`',
    'x`\n\n\n\n\n\n\n\n\n\n`',
    '`$$${a}`',
    'z``',
    '``',
    'test`\\uG`;',
    'test`\\xG`;',
    'test`\\18`;',
    '(`\n`)',
    '(`\r`)',
    'new nestedNewOperatorFunction`1``2``3``array`',
    'x = `1 ${ yield } 2`',
    'x = `1 ${ yield } 2 ${ 3 } 4`',
    'x = `1 ${ yield x } 2`',
    'x = `1 ${ yield x } 2 ${ 3 } 4`',
    '`x \\u0070 y`;',
    '`\\abc3242`;',
    '`x \\u0070 y`;',
    '`x ${x} \\u0070 ${x} y`;',
    'let a;',
    'var foo = `simple template`;',
    'foo`\\n${0}`',
    '`${x => {}}`'
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
