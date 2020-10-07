import { deepStrictEqual } from 'assert';
import { create } from '../../src/parser';
import { skipHashbang } from '../../src/lexer/comments';

describe('src/scanner/seek', () => {
  context('script', () => run());
  context('module', () => run());
  function run() {
    interface Opts {
      source: string;
      hasNext: boolean;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const parser = create(opts.source);
        skipHashbang(parser, opts.source),
          deepStrictEqual(
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

    pass('should ignore', {
      source: '#!---IGNORED---\n',
      hasNext: true,
      line: 1,
      column: 15
    });

    pass('should ignore', {
      source: '#!---IGNORED---\xE2\x80\xA8',
      hasNext: false,
      line: 1,
      column: 18
    });
  }
});
