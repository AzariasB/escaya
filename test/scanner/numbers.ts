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

  fail('fails on 005', '005', Context.Strict);
  fail('fails on 08', '08', Context.Strict);
  fail('fails on 1_', '1_', Context.Empty);
  fail('fail on 0x', '0x', Context.Empty);
  fail('fail on ', '10e', Context.Empty);
  fail('fail on ', '10e-', Context.Empty);
  fail('fail on ', '10e+', Context.Empty);
  fail('fail on ', '10ef', Context.Empty);
  fail('fail on ', '10e-+', Context.Empty);
  fail('fail on ', '10e-+', Context.Empty);
  fail('fail on 0b0b', '0b0b', Context.Empty);
  fail('fail on 0b0a', '0b0a', Context.Empty);
  fail('fail on 0b0d', '0b0d', Context.Empty);
  fail('fail on 0b0e', '0b0e', Context.Empty);
  fail('fail on 0b0f ', '0b0f', Context.Empty);
  fail('fail on 1t', '1t', Context.Empty);
  fail('fail on 0b0b', '0b0b', Context.Empty);
  fail('fail on 0b0B', '0b0B', Context.Empty);
  fail('fail on 0b0A', '0b0A', Context.Empty);
  fail('fail on 0b0D', '0b0D', Context.Empty);
  fail('fail on 0b0E', '0b0E', Context.Empty);
  fail('fail on 0b0F', '0b0F', Context.Empty);
  fail('fail on 0b0G', '0b0G', Context.Empty);
  fail('fail on 0b0g', '0b0g', Context.Empty);
  fail('fail on 0B0_1', '0B0_1', Context.Empty);
  fail('fail on 0b_1', '0b_1', Context.Empty);
  fail('fail on 0b1_', '0b1_', Context.Empty);
  fail('fail on 0b9', '0b9', Context.Empty);
  fail('fail on 0o9n', '0o9n', Context.Empty);
  fail('fail on 0b2n', '0b2n', Context.Empty);
  fail('fail on 0o9', '0o9', Context.Empty);
  fail('fail on 0b0e', '0b0e', Context.Empty);
  fail('fail on 0b0f', '0b0f', Context.Empty);
  fail('invalid binary with binary letters (b)', '0bB0a', Context.Empty);
  fail('invalid binary with binary letters (B)', '0b0ba', Context.Empty);
  fail('invalid binary with binary letters (b)', '0bB0a', Context.Empty);
  fail('invalid binary with binary letters (B)', '0b0ba', Context.Empty);
  fail('invalid binary with binary letters (b)', '0bB0a', Context.Empty);
  fail('invalid binary with binary letters (B)', '0b0ba', Context.Empty);
  fail('invalid octal with binary letters (b)', '0oB0a', Context.Empty);
  fail('invalid octal with binary letters (B)', '0O0ba', Context.Empty);
  fail('invalid octal with octal letters (o)', '0bo0a', Context.Empty);
  fail('invalid octal with octal letters (O)', '0b0Oa', Context.Empty);
  fail('invalid binary with octal letters (O)', '0bO0a', Context.Empty);
  fail('invalid binary with octal letters (O)', '0b0oa', Context.Empty);
  fail('invalid octal with octal letters (o)', '0oO0a', Context.Empty);
  fail('invalid octal with octal letters (O)', '0O0oa', Context.Empty);
  fail('invalid binary with hex letters (a)', '0b0a', Context.Empty);
  fail('invalid binary with hex letters (c)', '0b0c', Context.Empty);
  fail('invalid binary with hex letters (d)', '0b0d', Context.Empty);
  fail('invalid binary with hex letters (e)', '0b0e', Context.Empty);
  fail('invalid binary with hex letters (f)', '0b0f', Context.Empty);
  fail('invalid octal with hex letters (a)', '0o0a', Context.Empty);
  fail('invalid octal with hex letters (c)', '0o0c', Context.Empty);
  fail('invalid octal with hex letters (d)', '0O0d', Context.Empty);
  fail('invalid octal with hex letters (e)', '0o0e', Context.Empty);
  fail('invalid octal with hex letters (f)', '0o0f', Context.Empty);
  fail('invalid binary octal with binary prefix', '0bB001', Context.Empty);
  fail('invalid octal with octal prefix', '0oB0O01', Context.Empty);
  fail('invalid hex with hex prefix', '0X9786XEFG', Context.Empty);
  fail('invalid hex with hex prefix', '0X9786EFGX', Context.Empty);
  fail('fail on ', '1t', Context.Empty);
  fail('fail on ', '0077', Context.Strict);
  fail('fails on 0b00101abc', '0b00101abc', Context.Empty);
  fail('fails on 0b001013', '0b001013', Context.Empty);
  fail('fails on 0b0_', '0b0_', Context.Empty);
  fail('fails on 0x33in', '0x33in', Context.Empty);
  fail('fails on 1\u005F0123456789', '1\\u005F0123456789', Context.Empty);
  fail('fails on 5instanceof', '5instanceof', Context.Empty);
  fail('fails on 0x33in', '0x33in', Context.Empty);
  fail('fails on 0098n', '0098n', Context.Strict);
  fail('fails on 3in []', '3in []', Context.Empty);
  fail('fails on 3in', '3in', Context.Empty);
  //  fail('fails on 00o0', '00o0', Context.Empty);
  //  fail('fails on 00b0', '00b0', Context.Empty);
  //  fail('fails on 00x0', '00x0', Context.Empty);
  fail('fails on 0o', '0o', Context.Empty);
  fail('fails on 123abc', '123abc', Context.Empty);
  fail('fails on 00', '00', Context.Strict);
  fail('fails on 000', '000', Context.Strict);
  fail('fails on 005', '005', Context.Strict);
  fail('fails on 08', '08', Context.Strict);
  fail('fails on decimal integer followed by identifier', '3in1', Context.Empty);
  fail('fails on decimal integer followed by identifier', '3.e', Context.Empty);
  fail('fails on decimal integer followed by identifier', '3.e+abc', Context.Empty);
  // fail('fails on Binary-integer-literal-like sequence with a leading 0', '00b0;', Context.Empty);
  fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0o8', Context.Strict);
  fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0b3', Context.Strict);
  fail('fails on Octal-integer-literal-like sequence without any digits', '0o', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence without any digits', '0b;', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0b2;', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0077', Context.Strict);
  //  fail('fails on .0000000001n', '.0000000001n', Context.Empty);
  fail('fails on 0xabcinstanceof x', '0xabcinstanceof x', Context.Empty);

  describe('scan()', () => {
    const tokens: Array<[Context, Token, string, any]> = [
      [Context.Empty, Token.NumericLiteral, '57', 57],
      [Context.Empty, Token.NumericLiteral, '.57', 0.57],
      [Context.Empty, Token.NumericLiteral, '1', 1],
      [Context.Empty, Token.NumericLiteral, '31', 31],
      [Context.Empty, Token.NumericLiteral, '1.1', 1.1],
      [Context.Empty, Token.NumericLiteral, '1e-3', 0.001],
      [Context.Empty, Token.NumericLiteral, '1', 1],
      [Context.Empty, Token.NumericLiteral, '.1', 0.1],
      [Context.Empty, Token.NumericLiteral, '0', 0],
      [Context.Empty, Token.NumericLiteral, '233333456789.e-2', 2333334567.89],
      [Context.Empty, Token.NumericLiteral, '2333334567843959725489874578243854239.e-2', 2.33333456784396e34],
      [Context.Empty, Token.NumericLiteral, '2333334567843959725489874578243854239.e-233', 2.3333345678439598e-197],
      [Context.Empty, Token.NumericLiteral, '2333334567843959725489874578243854239.e-233', 2.3333345678439598e-197],
      [Context.Empty, Token.NumericLiteral, '0b1011', 11],
      [Context.Empty, Token.NumericLiteral, '32.', 32],
      [Context.Empty, Token.NumericLiteral, '8.', 8],
      [Context.Empty, Token.NumericLiteral, '1234567890.', 1234567890],
      [Context.Empty, Token.NumericLiteral, '456.', 456],
      [Context.Empty, Token.NumericLiteral, '.3', 0.3],
      [Context.Empty, Token.NumericLiteral, '.3e-3', 0.0003],
      [Context.Empty, Token.NumericLiteral, '2.3', 2.3],
      [Context.Empty, Token.NumericLiteral, '5.5', 5.5],
      [Context.Empty, Token.NumericLiteral, '0.00', 0],
      [Context.Empty, Token.NumericLiteral, '0.001', 0.001],
      [Context.Empty, Token.NumericLiteral, '0.0', 0],
      [Context.Empty, Token.NumericLiteral, '4.0', 4],
      [Context.Empty, Token.NumericLiteral, '0.0', 0],
      [Context.Empty, Token.NumericLiteral, '456.345', 456.345],
      [Context.Empty, Token.NumericLiteral, '1234567890.0987654321', 1234567890.0987654321],

      // Numeric literals with exponent

      [Context.Empty, Token.NumericLiteral, '0E-1', 0],
      [Context.Empty, Token.NumericLiteral, '0e+1', 0],
      [Context.Empty, Token.NumericLiteral, '.00', 0],
      [Context.Empty, Token.NumericLiteral, '.0e1', 0],
      [Context.Empty, Token.NumericLiteral, '0.0', 0],
      [Context.Empty, Token.NumericLiteral, '0.e1', 0],
      [Context.Empty, Token.NumericLiteral, '0.0e-1', 0],
      [Context.Empty, Token.NumericLiteral, '0E01', 0],
      [Context.Empty, Token.NumericLiteral, '0E-01', 0],
      [Context.Empty, Token.NumericLiteral, '0e00', 0],
      [Context.Empty, Token.NumericLiteral, '0x00', 0],
      [Context.Empty, Token.NumericLiteral, '0Xa', 10],
      [Context.Empty, Token.NumericLiteral, '0E-1', 0],
      [Context.Empty, Token.NumericLiteral, '0e+1', 0],
      [Context.Empty, Token.NumericLiteral, '.00', 0],
      [Context.Empty, Token.NumericLiteral, '0e1', 0],
      [Context.Empty, Token.NumericLiteral, '1e2', 100],
      [Context.Empty, Token.NumericLiteral, '5e6', 5000000],
      [Context.Empty, Token.NumericLiteral, '10e10', 100000000000],
      [Context.Empty, Token.NumericLiteral, '7890e789', Infinity],
      [Context.Empty, Token.NumericLiteral, '1234567890e1234567890', Infinity],
      [Context.Empty, Token.NumericLiteral, '.0E10', 0],
      [Context.Empty, Token.NumericLiteral, '.5E00', 0.5],
      [Context.Empty, Token.NumericLiteral, '.10E1', 1],
      [Context.Empty, Token.NumericLiteral, '1.e2', 1e2],
      [Context.Empty, Token.NumericLiteral, '1.e-2', 0.01],
      [Context.Empty, Token.NumericLiteral, '1.E2', 100],
      [Context.Empty, Token.NumericLiteral, '1.E-2', 0.01],
      [Context.Empty, Token.NumericLiteral, '.5e3', 500],
      [Context.Empty, Token.NumericLiteral, '.5e-3', 0.0005],
      [Context.Empty, Token.NumericLiteral, '0.5e3', 500],
      [Context.Empty, Token.NumericLiteral, '55.55e10', 555500000000],
      [Context.Empty, Token.NumericLiteral, '0e-100', 0],
      [Context.Empty, Token.NumericLiteral, '0E-100', 0],
      [Context.Empty, Token.NumericLiteral, '0e+1', 0],
      [Context.Empty, Token.NumericLiteral, '0e01', 0],
      [Context.Empty, Token.NumericLiteral, '6e+1', 60],
      [Context.Empty, Token.NumericLiteral, '9e+1', 90],
      [Context.Empty, Token.NumericLiteral, '1E-1', 0.1],
      [Context.Empty, Token.NumericLiteral, '0e-1', 0],
      [Context.Empty, Token.NumericLiteral, '7E1', 70],
      [Context.Empty, Token.NumericLiteral, '0e0', 0],
      [Context.Empty, Token.NumericLiteral, '0E0', 0],
      [Context.Empty, Token.NumericLiteral, '.6e1', 6],
      [Context.Empty, Token.NumericLiteral, '1.1E-100', 1.1e-100],
      [Context.Empty, Token.NumericLiteral, '.1e-100', 1e-101],
      [Context.Empty, Token.NumericLiteral, '0e+100', 0],
      [Context.Empty, Token.NumericLiteral, '1E+100', 1e100],
      [Context.Empty, Token.NumericLiteral, '.1E+100', 1e99],

      // Hex
      [Context.Empty, Token.NumericLiteral, '0xcafe', 51966],
      [Context.Empty, Token.NumericLiteral, '0x12345678', 305419896],
      [Context.Empty, Token.NumericLiteral, '0x0001', 1],
      [Context.Empty, Token.NumericLiteral, '0x0', 0],
      [Context.Empty, Token.NumericLiteral, '0x2', 2],
      [Context.Empty, Token.NumericLiteral, '0xD', 13],
      [Context.Empty, Token.NumericLiteral, '0xf', 15],
      [Context.Empty, Token.NumericLiteral, '0xb', 11],
      [Context.Empty, Token.NumericLiteral, '0x7', 7],
      [Context.Empty, Token.NumericLiteral, '0x45', 69],
      [Context.Empty, Token.NumericLiteral, '0xC0', 192],
      [Context.Empty, Token.NumericLiteral, '0xF6', 246],
      [Context.Empty, Token.NumericLiteral, '0xd1', 209],
      [Context.Empty, Token.NumericLiteral, '0xAc', 172],
      [Context.Empty, Token.NumericLiteral, '0xD2', 210],
      [Context.Empty, Token.NumericLiteral, '0x23', 35],
      [Context.Empty, Token.NumericLiteral, '0X1', 1],
      [Context.Empty, Token.NumericLiteral, '0Xd', 13],
      [Context.Empty, Token.NumericLiteral, '0Xf', 15],
      [Context.Empty, Token.NumericLiteral, '0X010000000', 268435456],
      [Context.Empty, Token.NumericLiteral, '0X01', 1],
      [Context.Empty, Token.NumericLiteral, '0X010', 16],
      [Context.Empty, Token.NumericLiteral, '0Xa', 10],
      [Context.Empty, Token.NumericLiteral, '0x1234ABCD', 305441741],
      [Context.Empty, Token.NumericLiteral, '0x9a', 154],
      [Context.Empty, Token.NumericLiteral, '0x1234567890abcdefABCEF', 1.3754889323622168e24],
      [Context.Empty, Token.NumericLiteral, '0X1234567890abcdefABCEF1234567890abcdefABCEF', 2.6605825358829506e49],
      [
        Context.Empty,
        Token.NumericLiteral,
        '0X14245890abcdefABCE234567890ab234567890abcdeF1234567890abefABCEF',
        5.694046700000817e74
      ],

      // Binary
      [Context.Empty, Token.NumericLiteral, '0b0', 0],
      [Context.Empty, Token.NumericLiteral, '0b00', 0],
      [Context.Empty, Token.NumericLiteral, '0b11', 3],
      [Context.Empty, Token.NumericLiteral, '0b10', 2],
      [Context.Empty, Token.NumericLiteral, '0B01', 1],
      [Context.Empty, Token.NumericLiteral, '0B00', 0],
      [Context.Empty, Token.NumericLiteral, '0b010', 2],
      [Context.Empty, Token.NumericLiteral, '0b10', 2],
      [Context.Empty, Token.NumericLiteral, '0b011', 3],
      [Context.Empty, Token.NumericLiteral, '0B011', 3],
      [Context.Empty, Token.NumericLiteral, '0B01', 1],
      [Context.Empty, Token.NumericLiteral, '0B01001', 9],
      [Context.Empty, Token.NumericLiteral, '0B011111111111111111111111111111', 536870911],
      [Context.Empty, Token.NumericLiteral, '0B00000111111100000011', 32515],
      [Context.Empty, Token.NumericLiteral, '0B0000000000000000000000000000000000000000000000001111111111', 1023],
      [
        Context.Empty,
        Token.NumericLiteral,
        '0B00000000111111100000000000011111100000000000000000000000000000000000001111111111',
        4.6854818611839925e21
      ],

      // Octals
      [Context.Empty, Token.NumericLiteral, '0O12345670', 2739128],
      [Context.Empty, Token.NumericLiteral, '0o45', 37],
      [Context.Empty, Token.NumericLiteral, '0o5', 5],
      [Context.Empty, Token.NumericLiteral, '0o12', 10],
      [Context.Empty, Token.NumericLiteral, '0o70', 56],
      [Context.Empty, Token.NumericLiteral, '0o0', 0],
      [Context.Empty, Token.NumericLiteral, '0O1', 1],
      [Context.Empty, Token.NumericLiteral, '0o07', 7],
      [Context.Empty, Token.NumericLiteral, '0O011', 9],
      [Context.Empty, Token.NumericLiteral, '0O077', 63],
      [Context.Empty, Token.NumericLiteral, '0O1234567', 342391],
      [Context.Empty, Token.NumericLiteral, '0O12345670003567234567435', 96374499007469390000],

      // Implicit octals
      [Context.Empty, Token.NumericLiteral, '0123', 83],
      [Context.Empty, Token.NumericLiteral, '01', 1],
      [Context.Empty, Token.NumericLiteral, '043', 35],
      [Context.Empty, Token.NumericLiteral, '07', 7],
      [Context.Empty, Token.NumericLiteral, '09', 9],
      [Context.Empty, Token.NumericLiteral, '09.3', 9.3],
      [Context.Empty, Token.NumericLiteral, '09.3e1', 93],
      [Context.Empty, Token.NumericLiteral, '09.3e-1', 0.93],
      [Context.Empty, Token.NumericLiteral, '098', 98],
      [Context.Empty, Token.NumericLiteral, '0098', 98],
      [Context.Empty, Token.NumericLiteral, '000000000098', 98],
      [Context.Empty, Token.NumericLiteral, '0000000000234567454548', 234567454548],

      // BigInt literal

      // [Context.Empty, Token.BigIntLiteral, '1n', 1],
      // [Context.Empty, Token.BigIntLiteral, '1.1n', 1.1],
      // [Context.Empty, Token.BigIntLiteral, '.1n', 0.1],
      [Context.Empty, Token.BigIntLiteral, '0x324ABCdefn', 13500141039],
      [Context.Empty, Token.BigIntLiteral, '0b1110n', 14],
      [Context.Empty, Token.NumericLiteral, '0o1210', 648]
      //[Context.Empty, Token.BigIntLiteral, '0098n', 98]
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
