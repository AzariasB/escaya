import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/ast/token';
import { scanSingleToken } from '../../src/lexer/scan';

describe('Scanner - Whitespace', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      scanSingleToken(parser, Context.Empty);
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

  function passAll(name: (lt: string) => string, opts: (lt: string) => any) {
    pass(name('line feed'), opts('\n'));
    pass(name('carriage return'), opts('\r'));
    pass(name('Windows newline'), opts('\r'));
    pass(name('line separators'), opts('\u2028'));
    pass(name('paragraph separators'), opts('\u2029'));
  }

  pass('skips nothing in an empty source', {
    source: '',
    hasNext: false,
    index: 0,
    line: 1,
    column: 0
  });

  pass('skips spaces', {
    source: '        ',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips tabs', {
    source: '\t\t\t\t\t\t\t\t',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips vertical tabs', {
    source: '\v\v\v\v\v\v\v\u000B',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips horizontal tabs', {
    source: '\u0009\u0009\u0009\u0009\u0009',
    hasNext: false,
    line: 1,
    column: 5
  });

  passAll(
    (lt) => `skips ${lt}s`,
    (lt) => ({
      source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
      hasNext: false,
      line: 9,
      column: 0
    })
  );

  pass('skips mixed whitespace', {
    source: '    \t \r\n \n\r \v\f\t ',
    hasNext: false,
    line: 4,
    column: 5
  });

  pass('skips nl + lf', {
    source: '\n\r',
    hasNext: false,
    line: 3,
    column: 0
  });

  pass('skips lf + nl', {
    source: '\r\n ',
    hasNext: false,
    line: 2,
    column: 1
  });

  pass('skips exotic whitespace (1)', {
    source:
      '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF',
    hasNext: false,
    line: 4,
    column: 1
  });

  pass('skips exotic whitespace (1)', {
    source: '\u2003',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips exotic whitespace (2)', {
    source: '\u8202',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips exotic whitespace (3)', {
    source: '\u8197\u8202',
    hasNext: false,
    line: 1,
    column: 2
  });

  pass('skips exotic whitespace (4)', {
    source: '\u2001\u2002\u2003',
    hasNext: false,
    line: 1,
    column: 3
  });

  pass('skips mixed whitespace', {
    source: '    \t \r\n \n\r \v\f\t ',
    hasNext: false,
    line: 4,
    column: 5
  });
});
