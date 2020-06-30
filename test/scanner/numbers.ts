import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('Scanner - numeric literals', () => {
  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scan(parser, context));
    });
  }

  fail('invalid 1t', '1t', Context.Empty);
  fail('invalid 1e', '1e', Context.Empty);
  fail('invalid 3in1', '3in1', Context.Empty);

  describe('scan()', () => {
    const tokens: Array<[Context, Token, string, any]> = [
      [Context.Empty, Token.NumericLiteral, '1', 1],
      [Context.Empty, Token.NumericLiteral, '12345678', 12345678],
      [Context.Empty, Token.NumericLiteral, '1234567890', 1234567890],
      [Context.Empty, Token.NumericLiteral, '1.2', '1.2'],
      [Context.Empty, Token.NumericLiteral, '2e+1', '2e+1'],
      [Context.Empty, Token.NumericLiteral, '0.', '0.'],
      [Context.Empty, Token.NumericLiteral, '5.5', 5.5],
      [Context.Empty, Token.NumericLiteral, '0.00', 0],
      [Context.Empty, Token.NumericLiteral, '0.001', 0.001],
      [Context.Empty, Token.NumericLiteral, '0.0', 0],
      [Context.Empty, Token.NumericLiteral, '4.0', 4],
      [Context.Empty, Token.NumericLiteral, '0.0', 0],
      [Context.Empty, Token.NumericLiteral, '456.345', 456.345],
      [Context.Empty, Token.NumericLiteral, '1234567890.0987654321', 1234567890.0987654321],
      [Context.Empty, Token.NumericLiteral, '1.', 1],
      [Context.Empty, Token.NumericLiteral, '888888888888888226184763125762148956324857623485', 8.888888888888883e47]
    ];

    for (const [ctx, token, op, value] of tokens) {
      it(`scans '${op}' at the end`, () => {
        const parser = create(op);
        const found = scan(parser, ctx);
        t.deepEqual(
          {
            token: found,
            hasNext: parser.index < parser.length,
            line: parser.line,
            value: parser.tokenValue,
            column: parser.index - parser.columnOffset
          },
          {
            token: token,
            hasNext: false,
            value,
            line: 1,
            column: op.length
          }
        );
      });
    }
  });
});
