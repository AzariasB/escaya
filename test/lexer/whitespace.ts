import { deepStrictEqual } from 'assert';
import { Context, Flags } from '../../src/common';
import { ScannerState } from '../../src/lexer/common';
import { create } from '../../src/parser';
import { skipWhitespace } from '../../src/lexer/whitespace';

describe('src/scanner/seek', () => {
  context('script', () => run(false));
  context('module', () => run(true));
  function run(isModule: boolean) {
    interface Opts {
      source: string;
      flags: Flags;
      hasNext: boolean;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const parser = create(opts.source);

        deepStrictEqual(
          {
            flags: skipWhitespace(parser, isModule ? Context.Module : Context.Empty, ScannerState.None),
            hasNext: parser.index < parser.length,
            line: parser.line,
            column: parser.index - parser.columnOffset
          },
          {
            flags: opts.flags,
            hasNext: opts.hasNext,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    function passAll(name: (lt: string) => string, opts: (lt: string) => Opts) {
      pass(name('line feed'), opts('\n'));
      pass(name('carriage return'), opts('\r'));
      pass(name('Windows newline'), opts('\r'));
      pass(name('line separators'), opts('\u2028'));
      pass(name('paragraph separators'), opts('\u2029'));
    }

    pass('skips nothing', {
      source: '',
      flags: Flags.Empty,
      hasNext: false,
      line: 1,
      column: 0
    });

    pass('skips spaces', {
      source: '        ',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips tabs', {
      source: '\t\t\t\t\t\t\t\t',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips vertical tabs', {
      source: '\v\v\v\v\v\v\v\v',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    passAll(
      (lt) => `skips ${lt}s`,
      (lt) => ({
        source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 9,
        column: 0
      })
    );

    pass('skips mixed whitespace', {
      source: '    \t \r\n \n\r \v\f\t ',
      flags: Flags.SeekMoved | Flags.SeekLineTerminator,
      hasNext: false,
      line: 4,
      column: 5
    });

    passAll(
      (lt) => `skips single line comments with ${lt}`,
      (lt) => ({
        source: `  \t // foo bar${lt}  `,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 2,
        column: 2
      })
    );

    passAll(
      (lt) => `skips multiple single line comments with ${lt}`,
      (lt) => ({
        source: `  \t // foo bar${lt} // baz ${lt} //`,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 3,
        column: 3
      })
    );

    pass('skips multiline comments with nothing', {
      source: '  \t /* foo * /* bar */  ',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 24
    });

    passAll(
      (lt) => `skips multiline comments with ${lt}`,
      (lt) => ({
        source: `  \t /* foo * /* bar ${lt} */  `,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 2,
        column: 5
      })
    );

    pass('skips nothing', {
      source: '',
      flags: Flags.Empty,
      hasNext: false,
      line: 1,
      column: 0
    });

    pass('skips spaces', {
      source: '        ',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips tabs', {
      source: '\t\t\t\t\t\t\t\t',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips vertical tabs', {
      source: '\v\v\v\v\v\v\v\v',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 8
    });

    passAll(
      (lt) => `skips ${lt}s`,
      (lt) => ({
        source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 9,
        column: 0
      })
    );

    pass('skips mixed whitespace', {
      source: '    \t \r\n \n\r \v\f\t ',
      flags: Flags.SeekMoved | Flags.SeekLineTerminator,
      hasNext: false,
      line: 4,
      column: 5
    });

    passAll(
      (lt) => `skips single line comments with ${lt}`,
      (lt) => ({
        source: `  \t // foo bar${lt}  `,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 2,
        column: 2
      })
    );

    passAll(
      (lt) => `skips multiple single line comments with ${lt}`,
      (lt) => ({
        source: `  \t // foo bar${lt} // baz ${lt} //`,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 3,
        column: 3
      })
    );

    pass('skips multiline comments with nothing', {
      source: '  \t /* foo * /* bar */  ',
      flags: Flags.SeekMoved,
      hasNext: false,
      line: 1,
      column: 24
    });

    passAll(
      (lt) => `skips multiline comments with ${lt}`,
      (lt) => ({
        source: `  \t /* foo * /* bar ${lt} */  `,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 2,
        column: 5
      })
    );

    passAll(
      (lt) => `skips multiple multiline comments with ${lt}`,
      (lt) => ({
        source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
        flags: Flags.SeekMoved | Flags.SeekLineTerminator,
        hasNext: false,
        line: 3,
        column: 5
      })
    );

    if (isModule) {
      passAll(
        (lt) => `avoids HTML single line comments with ${lt}`,
        (lt) => ({
          source: `  \t <!-- foo bar${lt}  `,
          flags: Flags.SeekMoved,
          hasNext: true,
          line: 1,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids multiple HTML single line comments with ${lt}`,
        (lt) => ({
          source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
          flags: Flags.SeekMoved,
          hasNext: true,
          line: 1,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids single HTML close comment after ${lt}`,
        (lt) => ({
          source: `  \t ${lt}-->  `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 0
        })
      );

      passAll(
        (lt) => `avoids line of single HTML close comment after ${lt}`,
        (lt) => ({
          source: `  \t ${lt}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 0
        })
      );

      passAll(
        (lt) => `allows HTML close comment after ${lt} + WS`,
        (lt) => ({
          source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 3
        })
      );

      passAll(
        (lt) => `avoids single-line block on line of HTML close after ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 56
        })
      );

      passAll(
        (lt) => `avoids 2 single-line block on line of HTML close after ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /**/ /* second optional ${''}SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 68
        })
      );

      passAll(
        (lt) => `avoids block HTML close with ${lt} + empty line`,
        (lt) => ({
          source: `  \t /*${lt}*/  -->${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids block HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids first line block HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` + `the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 2,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids multi block + HTML close with ${lt}`,
        (lt) => ({
          source:
            `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> ` +
            `the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 4,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids multi block + single block + HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 3,
          column: 4
        })
      );

      passAll(
        (lt) => `avoids multi block + 2 single block + HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: true,
          line: 3,
          column: 4
        })
      );
    } else {
      passAll(
        (lt) => `skips HTML single line comments with ${lt}`,
        (lt) => ({
          source: `  \t <!-- foo bar${lt}  `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 2,
          column: 2
        })
      );

      passAll(
        (lt) => `skips multiple HTML single line comments with ${lt}`,
        (lt) => ({
          source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 5
        })
      );

      passAll(
        (lt) => `skips single HTML close comment after ${lt}`,
        (lt) => ({
          source: `  \t ${lt}-->  `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 2,
          column: 5
        })
      );

      passAll(
        (lt) => `skips line of single HTML close comment after ${lt}`,
        (lt) => ({
          source: `  \t ${lt}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `allows HTML close comment after ${lt} + WS`,
        (lt) => ({
          source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips single-line block on line of HTML close after ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips 2 single-line block on line of HTML close after ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /**/ /* second optional ${''}SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips block HTML close with ${lt} + empty line`,
        (lt) => ({
          source: `  \t /*${lt}*/  -->${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips block HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips first line block HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` + `the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 3,
          column: 1
        })
      );

      passAll(
        (lt) => `skips multi block + HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 5,
          column: 1
        })
      );

      passAll(
        (lt) => `skips multi block + single block + HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 4,
          column: 1
        })
      );

      passAll(
        (lt) => `skips multi block + 2 single block + HTML close with ${lt}`,
        (lt) => ({
          source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
          flags: Flags.SeekMoved | Flags.SeekLineTerminator,
          hasNext: false,
          line: 4,
          column: 1
        })
      );
    }

    pass('avoids single-line block on line of HTML close w/o line terminator', {
      source:
        '  \t /* optional SingleLineDelimitedCommentSequence */ ' +
        "   --> the comment doesn't extend to these characters\n ",
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 57
    });

    pass('avoids 2 single-line block on line of HTML close w/o line terminator', {
      source:
        '  \t /**/ /* second optional SingleLineDelimitedCommentSequence */ ' +
        "   --> the comment doesn't extend to these characters\n ",
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 69
    });

    pass('avoids block HTML close with empty line w/o line terminator', {
      source: '  \t /**/  -->\n ',
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 10
    });

    pass('avoids block HTML close with chars w/o line terminator', {
      source: "  \t /**/  --> the comment doesn't extend to these characters\n ",
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 10
    });

    pass('avoids first line block HTML close w/o line terminator', {
      source: '  \t /* optional FirstCommentLine */  --> ' + "the comment doesn't extend to these characters\n ",
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 37
    });

    pass('avoids 2 single block + HTML close w/o line terminator', {
      source:
        '  \t /**/ /* optional second SingleLineDelimitedCommentSequence */' +
        "  --> the comment doesn't extend to these characters\n ",
      flags: Flags.SeekMoved,
      hasNext: true,
      line: 1,
      column: 67
    });
  }
});
