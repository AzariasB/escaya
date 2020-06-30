import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { scan } from '../../src/scanner/scan';

describe('Scanner - Comments', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      scan(parser, Context.Empty);
      t.deepEqual(
        {
          hasNext: parser.index < parser.source.length,
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
    hasNext: false,
    line: 1,
    column: 29
  });

  pass('skips multi line comment with SPACE (U+0020)', {
    source: '/*\u0020 multi line \u0020 comment \u0020 x = 1;*/',
    hasNext: false,
    line: 1,
    column: 35
  });

  pass('skips multi line comment with NO-BREAK SPACE (U+00A0)', {
    source: '/*\u00A0 multi line \u00A0 comment \u00A0 x = 1;*/',
    hasNext: false,
    line: 1,
    column: 35
  });

  pass('skips multi line comment with VERTICAL TAB (U+000B)', {
    source: '/*\u000B multi line \u000B comment \u000B*/',
    hasNext: false,
    line: 1,
    column: 28
  });

  pass('skips correct interpretation of single line comments', {
    source: '///',
    hasNext: false,
    line: 1,
    column: 3
  });

  pass('skips single and Multi line comments used together (1)', {
    source: '// var /* x / = */ 1 */',
    hasNext: false,
    line: 1,
    column: 23
  });

  pass('skips single and Multi line comments used together (2)', {
    source: '// var /* x */',
    hasNext: false,
    line: 1,
    column: 14
  });

  pass('skips multi line comment with a mix of line terminators (1)', {
    source: '/* \u2029 \u2028 \r\n \u2028 */',
    hasNext: false,
    line: 5,
    column: 3
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
      hasNext: false,
      line: 9,
      column: 0
    })
  );

  passAll(
    lt => `skips multiple single line comments with ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt} // baz ${lt} //`,
      hasNext: false,
      line: 3,
      column: 3
    })
  );

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    hasNext: false,
    line: 1,
    column: 24
  });

  passAll(
    lt => `skips multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo * /* bar ${lt} */  `,
      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      hasNext: false,
      line: 3,
      column: 5
    })
  );
});
