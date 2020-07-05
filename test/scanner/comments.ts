import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('Scanner - Comments', () => {
  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source);
      t.throws(() => scan(state, context));
    });
  }

  fail('fails on /**', '/**', Context.Empty);
  fail('fails on HTML Close in module code', ' -->', Context.Module);
  fail('fails on HTML Close without AnnexB', '-->', Context.OptionsDisableWebCompat);
  fail('fails on HTML Open in module code', ' <!--', Context.Module);
  fail('fails on HTML Open without AnnexB', '<!--', Context.OptionsDisableWebCompat);

  const tokens: [Context, Token, string, string][] = [
    [Context.Empty, Token.EndOfSource, '//', ''],
    [Context.Empty, Token.EndOfSource, '// foo', ''],
    [Context.Empty, Token.EndOfSource, '// foo\n', ''],
    [Context.Empty, Token.EndOfSource, '// /', ''],
    [Context.Empty, Token.EndOfSource, '// */', ''],
    [Context.Empty, Token.EndOfSource, '// /* */ foo', ''],
    [Context.Empty, Token.EndOfSource, '//\\n \\r \\x0a \\u000a foo bar', ''],
    [Context.Empty, Token.EndOfSource, '//\\unope \\u{nope} \\xno ', ''],
    [Context.Empty, Token.EndOfSource, '/**/', ''],
    [Context.Empty, Token.EndOfSource, '/* comment */', ''],
    [Context.Empty, Token.EndOfSource, '/*foo*/', ''],
    [Context.Empty, Token.EndOfSource, '/*foo\nbar\nbaz*/', ''],
    [Context.Empty, Token.EndOfSource, '/*\n*/', ''],
    [Context.Empty, Token.EndOfSource, '/* \n */', ''],
    [Context.Empty, Token.EndOfSource, '/* \n\n\n */', ''],
    [Context.Empty, Token.EndOfSource, '/* \\n \\r \\x0a \\u000a */', ''],
    [Context.Empty, Token.EndOfSource, '/* /* */', ''],
    [Context.Empty, Token.EndOfSource, '/*\u000C multi line \u000C comment \u000C*/', ''],
    [Context.Empty, Token.EndOfSource, '/*\u00A0 multi line \u00A0 comment \u00A0 x = 1;*/', ''],
    [Context.Empty, Token.EndOfSource, '/*\u0020 multi line \u0020 comment \u0020 x = 1;*/', ''],
    [Context.Empty, Token.EndOfSource, '//\u000B single line \u000B comment \u000B x = 1;', ''],
    [Context.Empty, Token.EndOfSource, '// single line comment x = 1;', ''],
    [Context.Empty, Token.EndOfSource, '// single line comment x = 1;', ''],
    // [Context.Empty, Token.EndOfSource, '/*/ try and confuse the lexer\n */\n', ''],
    [Context.Empty, Token.EndOfSource, '/* comments can have embedded "strings" */', ''],
    [Context.Empty, Token.EndOfSource, '/* " /* */', ''],
    [Context.Empty, Token.Identifier, '//foo!@#^&$1234\nbar', ''],
    [Context.Empty, Token.EndOfSource, '/* abcd!@#@$* { } && null*/', ''],
    [Context.Empty, Token.EndOfSource, '/*x*x*/', ''],
    [Context.Empty, Token.EndOfSource, '/**/', ''],
    [Context.Empty, Token.EndOfSource, '//\r', ''],
    [Context.Empty, Token.EndOfSource, '//\n', ''],
    [Context.Empty, Token.EndOfSource, '<!--', ''],
    [Context.Empty, Token.EndOfSource, '\n--' + '>', '']
  ];

  for (const [ctx, token, op] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const state = create(op);
      const found = scan(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          index: state.index
        },
        {
          token: token,
          hasNext: false,
          index: op.length
        }
      );
    });
  }

  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      scan(parser, opts.context);
      t.deepEqual(
        {
          hasNext: parser.index < parser.length,
          line: parser.line,
          column: parser.index - parser.columnOffset
        },
        {
          hasNext: opts.hasNext,
          line: opts.line,
          column: opts.column
        }
      );
    });
  }
  pass('skips single line comment with SPACE (U+0020)', {
    source: '// single line comment x = 1;',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 29
  });

  pass('skips multi line comment with SPACE (U+0020)', {
    source: '/*\u0020 multi line \u0020 comment \u0020 x = 1;*/',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 35
  });

  pass('skips multi line comment with NO-BREAK SPACE (U+00A0)', {
    source: '/*\u00A0 multi line \u00A0 comment \u00A0 x = 1;*/',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 35
  });

  pass('skips multi line comment with VERTICAL TAB (U+000B)', {
    source: '/*\u000B multi line \u000B comment \u000B*/',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 28
  });

  pass('skips correct interpretation of single line comments', {
    source: '///',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 3
  });

  pass('skips single and Multi line comments used together (1)', {
    source: '// var /* x / = */ 1 */',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 23
  });

  pass('skips single and Multi line comments used together (2)', {
    source: '// var /* x */',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 14
  });

  pass('skips multi line comment with a mix of line terminators (1)', {
    source: '/* \u2029 \u2028 \r\n \u2028 */',
    context: Context.Empty,
    hasNext: false,
    line: 5,
    column: 3
  });

  pass('skips single line comment with no break space', {
    source: '//\u00A0 single line \u00A0 comment \u00A0',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 27
  });

  pass('skips single line comment with horizontal tab (U+0009)', {
    source: '//\u0009 single line \u0009 comment \u0009',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 27
  });

  pass('skips single line comment single space (U+0020)', {
    source: '//\u0020 single line \u0020 comment \u0020',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 27
  });

  function passAll(name: (lt: string) => string, opts: (lt: string) => any) {
    pass(name('line feed'), opts('\n'));
    pass(name('carriage return'), opts('\r'));
    pass(name('Windows newline'), opts('\r'));
    pass(name('line separators'), opts('\u2028'));
    pass(name('paragraph separators'), opts('\u2029'));
  }

  passAll(
    lt => `skips ${lt}s`,
    lt => ({
      source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
      context: Context.Empty,
      hasNext: false,
      line: 9,
      column: 0
    })
  );

  passAll(
    lt => `skips multiple single line comments with ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt} // baz ${lt} //`,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 3
    })
  );

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    context: Context.Empty,
    hasNext: false,
    line: 1,
    column: 24
  });

  passAll(
    lt => `skips multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo * /* bar ${lt} */  `,
      context: Context.Empty,
      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      context: Context.Module,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      context: Context.Module,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips HTML single line comments with ${lt}`,
    lt => ({
      source: `  \t <!-- foo bar${lt}  `,
      context: Context.Empty,
      hasNext: false,
      line: 2,
      column: 2
    })
  );

  passAll(
    lt => `skips multiple HTML single line comments with ${lt}`,
    lt => ({
      source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips single HTML close comment after ${lt}`,
    lt => ({
      source: `  \t ${lt}-->  `,
      context: Context.Empty,
      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips line of single HTML close comment after ${lt}`,
    lt => ({
      source: `  \t ${lt}--> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `allows HTML close comment after ${lt} + WS`,
    lt => ({
      source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips single-line block on line of HTML close after ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );
  passAll(
    lt => `skips 2 single-line block on line of HTML close after ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /**/ /* second optional ${''}SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt} + empty line`,
    lt => ({
      source: `  \t /*${lt}*/  -->${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt} + empty line`,
    lt => ({
      source: `  \t /*${lt}*/  -->${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips first line block HTML close with ${lt}`,
    lt => ({
      source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` + `the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 5,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + single block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 4,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + 2 single block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
      context: Context.Empty,
      hasNext: false,
      line: 4,
      column: 1
    })
  );
});
