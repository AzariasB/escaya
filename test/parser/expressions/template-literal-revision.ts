import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Template literal revision', () => {
  // Invalid cases
  for (const arg of [
    'y`\\x`; /[\\',
    'x`\\`',
    'x`\\unicode',
    '`template-head${a}template-tail',
    '`${a}${b}${c}',
    '`a${a}b${b}c${c}',
    '`${a}a${b}b${c}c',
    '`x\n\nbar\r\nbaz',
    '`x\n\n${  bar  }\r\nbaz',
    '`x${\n a`',
    '`x${\r\n a`',
    '`x${\r a`',
    '`x${fn(}`',
    '`foo${a /* comment } `*/',
    '`foo${a // comment}`',
    '`foo${a \n`'
    //"`x${1 if}`",
    // 'x`x ${a b} bar`',
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
    'x`\\0`',
    'x`\\08`',
    'x`\\0\\0`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'x`\\r\n${0}`',
    'x`\\\r\\n${0}`',
    'tag`\\u{}${0}right`',
    'tag `no-subst-template`',
    'tag`template-head${a}`',
    'tag `${a}`',
    'tag `${a}template-tail`',
    'a`hello${1}\\x\n`',
    'tag   `template-head${a}template-tail`',
    "'use strict'; tag\n`${a}${b}${c}`",
    "'use strict'; tag\r\n`a${a}b${b}c${c}`",
    'tag    `${a}a${b}b${c}c`',
    'tag\t`x\n\nbar\r\nbaz`',
    'tag\r`x\n\n${  bar  }\r\nbaz`',
    'tag`x${a /* comment */}`',
    'tag`x${a // comment\n}`',
    'tag`x${a \n}`',
    'tag`x${a \r\n}`',
    'tag`x${a \r}`',
    'tag`x${/* comment */ a}`',
    'tag`x${// comment\na}`',
    'tag`x${\n a}`',
    'tag`x${\r\n a}`',
    'tag`x${\r a}`',
    "tag`x${'a' in a}`",
    'a.x`bar`',
    'a`\\u{abcdx`',
    'a`\\u{abcdx}`', // undefined ??
    'a`\\xylophone`', // undefined ??
    'x`\\unicode`',
    'x`x${bar}\\unicode`',
    'x`\\u`',
    'x`\\u{`',
    'x`\\u{abcdx`',
    'x`\\u{abcdx}`',
    'x`\\unicode\\\\`',
    'tag`\\u0`',
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`',
    'x`left${0}\\u00g`',
    'x`left${0}\\u00g${1}right`',
    'x`\\u000g`',
    'x`\\u000g${0}right`',
    'x`left${0}\\u000g`',
    'x`left${0}\\u000g${1}right`',
    'x`\\u{}`',
    'x`\\u{}${0}right`',
    'x`left${0}\\u{}`',
    'x`left${0}\\u{}${1}right`',
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`',
    'tag`\\u0`',
    'tag`\\u0${0}right`',
    'tag`left${0}\\u0`',
    'tag`left${0}\\u0${1}right`',
    'tag`\\u0g`',
    'tag`\\u0g${0}right`',
    'tag`left${0}\\u0g`',
    'tag`left${0}\\u0g${1}right`',
    'tag`\\u00g`',
    'tag`\\u00g${0}right`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`\\u{0`',
    'tag`\\u{0${0}right`',
    'tag`left${0}\\u{0`',
    'tag`left${0}\\u{0${1}right`',
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    'tag`left${0}\\u{110000}`',
    'tag`\\123`',
    'tag`a \\8 b`;',
    'tag`\\513`',
    'tag`\\1239`',
    'tag`\\123x`',
    'tag`\\08`',
    'tag`\\07`',
    'tag`\\0x`',
    'tag`\\00`',
    'tag`\\01`',
    'tag`\\02`',
    'tag`\\03`',
    'tag`\\003`',
    'tag`\\005`',
    'tag`\\001`',
    'tag`\\408`',
    'tag`\\40x`',
    'tag`a\\00b`',
    'tag`okay \\u{110001}`',
    'foo`x${a}y${b}z`',
    'tag`start \\0737 \\xaa \\u{abc} \\0 finish`;',
    "tag`some ' quote`;",
    'tag`\\\\\\\\\\\\`;',
    'tag`\\ `;',
    'tag`xy \\u{abc}} yz`;',
    'tag`start \\0137 \\x18 \\u{05} \\0 finish`;',
    'tag`left${0}\\u{110000}${1}right`',
    'tag` ${tag`\\u`}`',
    'tag`template-head${a}`',
    'tag `${a}`',
    'tag `${a}template-tail`',
    'tag   `template-head${a}template-tail`',
    'tag\n`${a}${b}${c}`',
    'tag\r\n`a${a}b${b}c${c}`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'x`\\u{-0}`',
    'x`\\u{-0}${0}right`',
    'x`left${0}\\u{-0}`',
    'x`left${0}\\u{-0}${1}right`',
    'x`\\u{g}`',
    'x`\\u{g}${0}right`',
    'x`left${0}\\u{g}`',
    'x`left${0}\\u{g}${1}right`',
    'x`\\u{0`',
    'x`\\u{0${0}right`',
    'x`left${0}\\u{0`',
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
    'test`\\uG`;',
    'test`\\xG`;',
    'test`\\18`;',
    'x`\\u{abcdx`',
    'x`\\u{abcdx}`',
    'x`\\unicode\\\\`',
    'x`left${0}\\u0${1}right`',
    'x`left${0}\\u0g${1}right`',
    'x`left${0}\\u00g`',
    'x`\\u000g${0}right`',
    'x`left${0}\\u000g`',
    'x`left${0}\\u000g${1}right`',
    'x`\\u{}`',
    'x`\\u{}${0}right`',
    'x`left${0}\\u{-0}`',
    'x`\\u{g}`',
    'x`\\u{g}${0}right`',
    'x`left${0}\\u{g}`',
    'x`left${0}\\u{${1}right`',
    'x`\\u{\\${0}right`',
    'x`\\u{\\`${0}right`',
    'x`left${0}\\u{\\``',
    'x`\\01${0}right`',
    'x`\\u0`',
    'x`left${0}\\u{0`',
    'x`left${0}\\u{0${1}right`',
    'x`left${0}\\u{\\u{0}`',
    'x`left${0}\\1`',
    'x`\\1${0}right`',
    'x`\\1`',
    'x`left${0}\\01${1}right`',
    'x`left${0}\\01`',
    'x`\\xg`',
    'x`left${0}\\u{110000}${1}right`',
    '`x\n\nbar\r\nbaz`',
    '`x\n\n${  bar  }\r\nbaz`',
    '`x${a /* comment */}`',
    '`x${a // comment\n}`',
    '`x${a \n}`',
    '`x${a \r\n}`',
    '`x${a \r}`',
    '`x${/* comment */ a}`',
    '`x${// comment\na}`',
    '`x${\n a}`',
    '`x${\r\n a}`',
    '`x${\r a}`',
    "`x${'a' in a}`",
    'tag\n`${a}${b}${c}`',
    'tag\r\n`a${a}b${b}c${c}`',
    'tag`\\u{}${0}right`',
    'tag`left${0}\\u{}`',
    'tag`left${0}\\u{}${1}right`',
    'tag`\\u{-0}`',
    'tag`\\u{-0}${0}right`',
    'tag`left${0}\\u{-0}`',
    `a\`a\${b}a\${c}\``,
    `a\`\${\`a\${a}\`}\``,
    `a\`\${\`\${\`\${a}\`}\`}\``,
    `a\`$a\``,
    'tag`\\xg`',
    'x`\\0`',
    'x`\\08`',
    'x`\\0\\0`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'x`\\r\n${0}`',
    'x`\\\r\\n${0}`',
    'f`${x} \\xg ${x}`;',
    'x`\\\u2028${0}`',
    '`a℮`',
    '`دیوانه`',
    '`$$$a}`',
    'tag`\\1`',
    'tag ``',
    'tag`x${a \r\n}`',
    'tag`x${a \r}`',
    'x`\n${0}`',
    'x`\\\n${0}`',
    'x`\\r${0}`',
    'x`\r\n${0}`',
    'x`\\\r\\\n${0}`',
    'x`\\\r\n${0}`',
    'x`\r\\\n${0}`',
    'x`\\r\\n${0}`',
    'x`\u2029${0}`',
    'x`\\\u2029${0}`',
    'x`\\n${0}`',
    'x`\\r${0}`',
    'x`\\\r\\\n${0}`',
    'x`\r\\n${0}`',
    'x`\\\u2029${0}`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'x`x${a,b}y`',
    'x`x${a,b}y`',
    'x`X${a => b}Y`',
    'x`a ${() => {}} b`',
    'x`a ${() => ok} b`',
    'x`\\u{10ffff}`',
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'x`\\xAg${0}right`',
    'tag`\\unicode and \\u{55}`;',
    'tag`\\01`;',
    'tag`\\xg${0}right`;',
    'tag`left${0}\\xg`;',
    'tag`left${0}\\xg${1}right`;',
    'tag`left${0}\\u000g${1}right`;',
    'tag`left${0}\\u{-0}${1}right`;',
    'tag`\\unicode and \\u{55}`;',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`'
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

  it('Line terminators', () => {
    t.deepEqual(parseScript('x`\n\r`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: '\n\r',
              raw: '\n\r',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'x',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes', () => {
    t.deepEqual(parseScript('f`${x} \\xg ${x}`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: null,
            literal: {
              leafs: [
                {
                  cooked: '',
                  expression: {
                    name: 'x',
                    type: 'IdentifierReference'
                  },
                  raw: '',
                  type: 'TemplateElement'
                },
                {
                  cooked: null,
                  expression: {
                    name: 'x',
                    type: 'IdentifierReference'
                  },
                  raw: ' \\xg ',
                  type: 'TemplateElement'
                },
                {
                  cooked: '',
                  expression: null,
                  raw: '',
                  type: 'TemplateElement'
                }
              ],
              type: 'TemplateExpression'
            },
            member: {
              name: 'f',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
  it('Cooked template value should be "null"', () => {
    t.deepEqual(parseScript('a`\\u{g`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\u{g',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Invalid hexidecimal character escape sequence truncated', () => {
    t.deepEqual(parseScript('a`\\x0G`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\x0G',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
  it('Invalid unicode escape sequence', () => {
    t.deepEqual(parseScript('a`\\u0g`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\u0g',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Invalid unicode escape sequence', () => {
    t.deepEqual(parseScript('a`\\u{10FFFFF}${"inner"}right`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: null,
            literal: {
              leafs: [
                {
                  cooked: null,
                  expression: {
                    type: 'StringLiteral',
                    value: 'inner'
                  },
                  raw: '\\u{10FFFFF}',
                  type: 'TemplateElement'
                },
                {
                  cooked: 'right',
                  expression: null,
                  raw: 'right',
                  type: 'TemplateElement'
                }
              ],
              type: 'TemplateExpression'
            },
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Bad vary escape', () => {
    t.deepEqual(parseScript('tag`oops \\u{110001}`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: 'oops \\u{110001}',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'tag',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
  it('Escape double quote', () => {
    t.deepEqual(parseScript('tag`some " quote`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: 'some " quote',
              raw: 'some " quote',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'tag',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes in tick1', () => {
    t.deepEqual(parseScript('a`okay \\u{110001}`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: 'okay \\u{110001}',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes in tick2', () => {
    t.deepEqual(parseScript('tag`phew \\u{110001}`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: 'phew \\u{110001}',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'tag',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Octal in quasi', () => {
    t.deepEqual(parseScript('tag`${"\\07"}`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: null,
            literal: {
              leafs: [
                {
                  cooked: '',
                  expression: {
                    type: 'StringLiteral',
                    value: '\u0007'
                  },
                  raw: '',
                  type: 'TemplateElement'
                },
                {
                  cooked: '',
                  expression: null,
                  raw: '',
                  type: 'TemplateElement'
                }
              ],
              type: 'TemplateExpression'
            },
            member: {
              name: 'tag',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Octal at start', () => {
    t.deepEqual(parseScript('tag`\\00`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\00',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'tag',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Exception to 9 in tagged template', () => {
    t.deepEqual(parseScript('a`\\9`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\9',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes in tick', () => {
    t.deepEqual(parseScript('`x${bar}\\u25a0`'), {
      directives: [],
      leafs: [
        {
          expression: {
            leafs: [
              {
                cooked: 'x',
                expression: {
                  name: 'bar',
                  type: 'IdentifierReference'
                },
                raw: 'x',
                type: 'TemplateElement'
              },
              {
                cooked: '■',
                expression: null,
                raw: '\\u25a0',
                type: 'TemplateElement'
              }
            ],
            type: 'TemplateExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
  it('Illegal escapes in tick4', () => {
    t.deepEqual(parseScript('x`x${bar}\\u25a0`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: null,
            literal: {
              leafs: [
                {
                  cooked: 'x',
                  expression: {
                    name: 'bar',
                    type: 'IdentifierReference'
                  },
                  raw: 'x',
                  type: 'TemplateElement'
                },
                {
                  cooked: '■',
                  expression: null,
                  raw: '\\u25a0',
                  type: 'TemplateElement'
                }
              ],
              type: 'TemplateExpression'
            },
            member: {
              name: 'x',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes in tick', () => {
    t.deepEqual(parseScript('f`\\xg ${x}`;'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: null,
            literal: {
              leafs: [
                {
                  cooked: null,
                  expression: {
                    name: 'x',
                    type: 'IdentifierReference'
                  },
                  raw: '\\xg ',
                  type: 'TemplateElement'
                },
                {
                  cooked: '',
                  expression: null,
                  raw: '',
                  type: 'TemplateElement'
                }
              ],
              type: 'TemplateExpression'
            },
            member: {
              name: 'f',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it('Illegal escapes in tick234', () => {
    t.deepEqual(parseScript('a`\\u{abcdx}`'), {
      directives: [],
      leafs: [
        {
          expression: {
            expression: {
              cooked: null,
              raw: '\\u{abcdx}',
              type: 'TemplateLiteral'
            },
            literal: [],
            member: {
              name: 'a',
              type: 'IdentifierReference'
            },
            type: 'TaggedTemplate'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
