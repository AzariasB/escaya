import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('Scanner - String literal', () => {
  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scan(parser, context));
    });
  }

  fail('invalid overflow', '"\\"', Context.Empty);
  fail('invalid overflow', '"oops \\u{110001}"', Context.Empty);

  fail('invalid newline', '"xyz \\12x"', Context.Strict);
  fail('invalid newline', '"xyz \\1239"', Context.Strict);

  fail('invalid newline', '"\n"', Context.Empty);
  fail('invalid linefeed', '"\r"', Context.Empty);
  fail('invalid lf + nl', '"\r\n"', Context.Empty);
  fail('invalid closing quote', '"', Context.Empty);
  fail('invalid hex', '"\\x0g"', Context.Empty);
  fail('invalid hex', '"\\xg0"', Context.Empty);
  fail('invalid hex', '"\\xgg"', Context.Empty);
  fail('invalid hex', '"\\xfg"', Context.Empty);
  fail('invalid hex', '"\\u11"', Context.Empty);
  fail('invalid hex', '"\\uAA"', Context.Empty);
  fail('invalid hex', '"\\u111"', Context.Empty);
  fail('invalid hex', '"\\uAAA"', Context.Empty);
  fail('invalid hex', '"\\u{110000}"', Context.Empty);
  fail('invalid hex', '"\\u{110000}"', Context.Empty);
  fail('invalid hex', '"\\u{11ffff}"', Context.Empty);
  fail('invalid hex', '"\\u{g0g}"', Context.Empty);
  fail('invalid hex', '"\\u{0g0}"', Context.Empty);
  fail('invalid hex', '"\\u{0g}"', Context.Empty);
  fail('invalid hex', '"\\u{g0}"', Context.Empty);
  fail('invalid hex', '"\\u{g}"', Context.Empty);
  fail('invalid hex', '"\\\\\\"', Context.Empty);
  fail('invalid octals in strict mode', '"\\1"', Context.Strict);
  fail('invalid octals in strict mode', "'\\7'", Context.Strict);
  fail('invalid newlines after Unicode \\u0', "'x\\u0\nnewline'", Context.Empty);
  fail('invalid carriage returns after Unicode \\u0', "'x\\u0\rnewline'", Context.Empty);
  fail('invalid Windows newlines after Unicode \\u0', "'x\\u0\r\nnewline'", Context.Empty);
  fail('invalid line separators after Unicode \\u0', "'x\\u0\u2028newline'", Context.Empty);
  fail('invalid paragraph separators after Unicode \\u0', "'x\\u0\u2029newline'", Context.Empty);
  fail('invalid newlines after Unicode \\u00', "'x\\u00\nnewline'", Context.Empty);
  fail('invalid carriage returns after Unicode \\u00', "'x\\u00\rnewline'", Context.Empty);
  fail('invalid Windows newlines after Unicode \\u00', "'x\\u00\r\nnewline'", Context.Empty);
  fail('invalid line separators after Unicode \\u00', "'x\\u00\u2028newline'", Context.Empty);
  fail('invalid paragraph separators after Unicode \\u00', "'x\\u00\u2029newline'", Context.Empty);
  fail('invalid newlines after Unicode \\u0a', "'x\\u0a\nnewline'", Context.Empty);
  fail('invalid carriage returns after Unicode \\u0a', "'x\\u0a\rnewline'", Context.Empty);
  fail('invalid Windows newlines after Unicode \\u0a', "'x\\u0a\r\nnewline'", Context.Empty);
  fail('invalid line separators after Unicode \\u0a', "'x\\u0a\u2028newline'", Context.Empty);
  fail('invalid paragraph separators after Unicode \\u0a', "'x\\u0a\u2029newline'", Context.Empty);
  fail('invalid newlines after Unicode \\u000', "'x\\u000\nnewline'", Context.Empty);
  fail('invalid carriage returns after Unicode \\u000', "'x\\u000\rnewline'", Context.Empty);
  fail('invalid Windows newlines after Unicode \\u000', "'x\\u000\r\nnewline'", Context.Empty);
  fail('invalid line separators after Unicode \\u000', "'x\\u000\u2028newline'", Context.Empty);
  fail('invalid paragraph separators after Unicode \\u000', "'x\\u000\u2029newline'", Context.Empty);
  fail('invalid newlines after Unicode \\u00a', "'x\\u00a\nnewline'", Context.Empty);
  fail('invalid carriage returns after Unicode \\u00a', "'x\\u00a\rnewline'", Context.Empty);
  fail('invalid Windows newlines after Unicode \\u00a', "'x\\u00a\r\nnewline'", Context.Empty);
  fail('invalid line separators after Unicode \\u00a', "'x\\u00a\u2028newline'", Context.Empty);
  fail('invalid paragraph separators after Unicode \\u00a', "'x\\u00a\u2029newline'", Context.Empty);
  fail('invalid space after ASCII \\x', "'x\\x foo'", Context.Empty);
  fail('invalid space after ASCII \\x0', "'x\\x0 foo'", Context.Empty);
  fail('invalid space after Unicode \\u', "'x\\u foo'", Context.Empty);
  fail('invalid space after Unicode \\u0', "'x\\u0 foo'", Context.Empty);
  fail('invalid space after Unicode \\ua', "'x\\ua foo'", Context.Empty);
  fail('invalid space after Unicode \\u00', "'x\\u00 foo'", Context.Empty);
  fail('invalid space after Unicode \\u0a', "'x\\u0a foo'", Context.Empty);
  fail('invalid space after Unicode \\u000', "'x\\u000 foo'", Context.Empty);
  fail('invalid space after Unicode \\u00a', "'x\\u00a foo'", Context.Empty);
  fail('invalid space after Unicode \\u{', "'x\\u{ foo'", Context.Empty);
  fail('invalid space after Unicode \\u{0', "'x\\u{0 foo'", Context.Empty);
  fail('invalid space after Unicode \\u{a', "'x\\u{a foo'", Context.Empty);
  fail('invalid \\ after ASCII \\x', "'x\\x\\ foo'", Context.Empty);
  //fail("invalid \\ after ASCII \\x0", "'x\\x0\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u', "'x\\u\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u0', "'x\\u0\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\ua', "'x\\ua\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u00', "'x\\u00\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u0a', "'x\\u0a\\ foo'", Context.Empty);
  // fail("invalid \\ after Unicode \\u000", "'x\\u000\\ foo'", Context.Empty);
  // fail("invalid \\ after Unicode \\u00a", "'x\\u00a\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u{', "'x\\u{\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u{0', "'x\\u{0\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u{a', "'x\\u{a\\ foo'", Context.Empty);
  fail('invalid x after ASCII \\x', "'x\\xx foo'", Context.Empty);
  fail('invalid x after ASCII \\x0', "'x\\x0x foo'", Context.Empty);
  fail('invalid x after Unicode \\u', "'x\\ux foo'", Context.Empty);
  fail('invalid x after Unicode \\u0', "'x\\u0x foo'", Context.Empty);
  fail('invalid x after Unicode \\ua', "'x\\uax foo'", Context.Empty);
  fail('invalid x after Unicode \\u00', "'x\\u00x foo'", Context.Empty);
  fail('invalid x after Unicode \\u0a', "'x\\u0ax foo'", Context.Empty);
  fail('invalid x after Unicode \\u000', "'x\\u000x foo'", Context.Empty);
  fail('invalid x after Unicode \\u00a', "'x\\u00ax foo'", Context.Empty);
  fail('invalid x after Unicode \\u{', "'x\\u{x foo'", Context.Empty);
  fail('invalid x after Unicode \\u{0', "'x\\u{0x foo'", Context.Empty);
  fail('invalid x after Unicode \\u{a', "'x\\u{ax foo'", Context.Empty);
  fail('invalid X after ASCII \\x', "'x\\xX foo'", Context.Empty);
  //fail("invalid X after ASCII \\x0", "'x\\x0X foo'", Context.Empty);
  fail('invalid X after Unicode \\u', "'x\\uX foo'", Context.Empty);
  fail('invalid X after Unicode \\u0', "'x\\u0X foo'", Context.Empty);
  fail('invalid X after Unicode \\ua', "'x\\uaX foo'", Context.Empty);
  fail('invalid X after Unicode \\u00', "'x\\u00X foo'", Context.Empty);
  fail('invalid X after Unicode \\u0a', "'x\\u0aX foo'", Context.Empty);
  //fail("invalid X after Unicode \\u000", "'x\\u000X foo'", Context.Empty);
  //fail("invalid X after Unicode \\u00a", "'x\\u00aX foo'", Context.Empty);
  fail('invalid X after Unicode \\u{', "'x\\u{X foo'", Context.Empty);
  fail('invalid X after Unicode \\u{0', "'x\\u{0X foo'", Context.Empty);
  fail('invalid X after Unicode \\u{a', "'x\\u{aX foo'", Context.Empty);
  fail('invalid u after ASCII \\x', "'x\\xu foo'", Context.Empty);
  fail('invalid u after ASCII \\x0', "'x\\x0u foo'", Context.Empty);
  fail('invalid u after Unicode \\u', "'x\\uu foo'", Context.Empty);
  fail('invalid u after Unicode \\u0', "'x\\u0u foo'", Context.Empty);
  fail('invalid u after Unicode \\ua', "'x\\uau foo'", Context.Empty);
  fail('invalid u after Unicode \\u00', "'x\\u00u foo'", Context.Empty);
  fail('invalid u after Unicode \\u0a', "'x\\u0au foo'", Context.Empty);
  fail('invalid u after Unicode \\u000', "'x\\u000u foo'", Context.Empty);
  fail('invalid u after Unicode \\u00a', "'x\\u00au foo'", Context.Empty);
  fail('invalid u after Unicode \\u{', "'x\\u{u foo'", Context.Empty);
  fail('invalid u after Unicode \\u{0', "'x\\u{0u foo'", Context.Empty);
  fail('invalid u after Unicode \\u{a', "'x\\u{au foo'", Context.Empty);
  fail('invalid U after ASCII \\x', "'x\\xU foo'", Context.Empty);
  fail('invalid U after ASCII \\x0', "'x\\x0U foo'", Context.Empty);
  fail('invalid U after Unicode \\u', "'x\\uU foo'", Context.Empty);
  fail('invalid U after Unicode \\u0', "'x\\u0U foo'", Context.Empty);
  fail('invalid U after Unicode \\ua', "'x\\uaU foo'", Context.Empty);
  fail('invalid U after Unicode \\u00', "'x\\u00U foo'", Context.Empty);
  fail('invalid U after Unicode \\u0a', "'x\\u0aU foo'", Context.Empty);
  fail('invalid U after Unicode \\u000', "'x\\u000U foo'", Context.Empty);
  fail('invalid U after Unicode \\u00a', "'x\\u00aU foo'", Context.Empty);
  fail('invalid U after Unicode \\u{', "'x\\u{U foo'", Context.Empty);
  fail('invalid U after Unicode \\u{0', "'x\\u{0U foo'", Context.Empty);
  fail('invalid U after Unicode \\u{a', "'x\\u{aU foo'", Context.Empty);
  fail('invalid { after ASCII \\x', "'x\\x{ foo'", Context.Empty);
  fail('invalid { after ASCII \\x0', "'x\\x0{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u', "'x\\u{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u0', "'x\\u0{ foo'", Context.Empty);
  fail('invalid { after Unicode \\ua', "'x\\ua{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u00', "'x\\u00{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u0a', "'x\\u0a{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u000', "'x\\u000{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u00a', "'x\\u00a{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u{', "'x\\u{{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u{0', "'x\\u{0{ foo'", Context.Empty);
  fail('invalid { after Unicode \\u{a', "'x\\u{a{ foo'", Context.Empty);
  fail('invalid } after ASCII \\x', "'x\\x} foo'", Context.Empty);
  fail('invalid } after ASCII \\x0', "'x\\x0} foo'", Context.Empty);
  fail('invalid } after Unicode \\u', "'x\\u} foo'", Context.Empty);
  fail('invalid } after Unicode \\u0', "'x\\u0} foo'", Context.Empty);
  fail('invalid } after Unicode \\ua', "'x\\ua} foo'", Context.Empty);
  fail('invalid } after Unicode \\u00', "'x\\u00} foo'", Context.Empty);
  fail('invalid } after Unicode \\u0a', "'x\\u0a} foo'", Context.Empty);
  fail('invalid } after Unicode \\u000', "'x\\u000} foo'", Context.Empty);
  fail('invalid } after Unicode \\u00a', "'x\\u00a} foo'", Context.Empty);
  fail('invalid } after Unicode \\u{', "'x\\u{} foo'", Context.Empty);
  fail('invalid mixed whitespace', '"\t \r\n \n\r \v\f\t"', Context.Empty);
  fail('invalid escape', '"\\"', Context.Empty);
  fail('invalid escape', '"\\8"', Context.Empty);
  fail('invalid escape', '"\\9"', Context.Empty);
  fail('invalid u after Unicode \\u{', '"x\\u}"', Context.Empty);
  fail('invalid u after Unicode \\u', '"x\\u"', Context.Empty);
  fail('invalid escape after \\', '"x\\"', Context.Empty);
  fail('invalid escape after Unicode \\u{', '"x\\u{%"', Context.Empty);
  fail('invalid escape after Unicode \\u', '"x\\u%"', Context.Empty);
  fail('invalid escape after Unicode \\u{', '"x\\u{000072"', Context.Empty);
  fail('invalid newlines after Unicode \\u0', '"x\\u0\nnewline"', Context.Empty);
  fail('invalid carriage returns Unicode \\u0', '"x\\u0\rnewline"', Context.Empty);
  fail('invalid paragraph separators Unicode \\u0', '"x\\u0\u2029newline"', Context.Empty);
  fail('invalid u after Unicode \\u{', '"x\\u{u foo"', Context.Empty);
  fail('invalid u after Unicode \\u', '"x\\uu foo"', Context.Empty);
  fail('invalid u after Unicode \\u{0', '"x\\u{0u foo"', Context.Empty);
  fail('invalid u after Unicode \\u{a', '"x\\u{au foo"', Context.Empty);
  fail('invalid u after Unicode \\u0', '"x\\u0u foo"', Context.Empty);
  fail('invalid u after Unicode \\ua', '"x\\uau foo"', Context.Empty);
  fail('invalid u after Unicode \\ua', '"\\"', Context.Empty);
  fail('invalid missing closing quote \\', '"\\', Context.Empty);

  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.StringLiteral, '"abc"', 'abc'],
    [Context.Empty, Token.StringLiteral, '"\u2028"', '\u2028'],
    [Context.Empty, Token.StringLiteral, '"\\r"', '\r'],
    [Context.Empty, Token.StringLiteral, '"\\123"', 'S'],
    [Context.Empty, Token.StringLiteral, '"\\0"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\05"', '\u0005'],
    [Context.Empty, Token.StringLiteral, '"\\x01F"', '\u0001F'],
    [Context.Empty, Token.StringLiteral, '"\\x05B"', '\u0005B'],
    [Context.Empty, Token.StringLiteral, '"\\x0D3"', '\r3'],
    [Context.Empty, Token.StringLiteral, '"\\x088"', '\b8'],
    [Context.Empty, Token.StringLiteral, '"\\x34"', '4'],
    [Context.Empty, Token.StringLiteral, '"\\xCd"', 'Í'],
    [Context.Empty, Token.StringLiteral, '"\\xF0"', 'ð'],
    [Context.Empty, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.Empty, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.Empty, Token.StringLiteral, '"\\u0041"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\n"', '\n'],
    [Context.Empty, Token.StringLiteral, '"\\n\\r"', '\n\r'],
    [Context.Empty, Token.StringLiteral, '"\\r\\n"', '\r\n'],
    [Context.Empty, Token.StringLiteral, '"\\123"', 'S'],
    [Context.Empty, Token.StringLiteral, '"12abc"', '12abc'],
    [Context.Empty, Token.StringLiteral, '"\\7771"', '?71'],
    [Context.Empty, Token.StringLiteral, '"\\0"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.Empty, Token.StringLiteral, '"\\u{CDEF}"', '췯'],
    [Context.Empty, Token.StringLiteral, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u{10ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.Empty, Token.StringLiteral, '";"', ';'],
    [Context.Empty, Token.StringLiteral, '"\\r"', '\r'],
    [Context.Empty, Token.StringLiteral, '""', ''],
    [Context.Empty, Token.StringLiteral, '"x\\u000072"', 'x\u000072'],
    [Context.Empty, Token.StringLiteral, '"123"', '123'],
    [Context.Empty, Token.StringLiteral, '"\\\\ "', '\\ '],
    [Context.Empty, Token.StringLiteral, '"\\0737 \\xaa \\u{abc} \\0 finish"', ';7 ª ઼ \u0000 finish'],
    [Context.Empty, Token.StringLiteral, '"\0"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\1239"', 'S9'],
    [Context.Empty, Token.StringLiteral, '"\x2028"', ' 28'],
    [Context.Empty, Token.StringLiteral, '"\\2028"', '8'],
    [Context.Empty, Token.StringLiteral, '"a\
    b"', 'a    b'],
    [Context.Empty, Token.StringLiteral, '"true"', 'true'],
    [Context.Empty, Token.StringLiteral, '"a \\u{10300}"', 'a @̀'],
    [Context.Empty, Token.StringLiteral, '"xyz \\abc3242"', 'xyz abc3242'],
    [Context.Empty, Token.StringLiteral, '"xy \\u{abc}} yz"', 'xy ઼} yz'],
    [Context.Empty, Token.StringLiteral, '"\\b\\f\\n\\r\\t\\va"', '\b\f\n\r\t\u000ba'],
    [Context.Empty, Token.StringLiteral, '"\\b"', '\b'],
    [Context.Empty, Token.StringLiteral, '"\\t"', '\t'],
    [Context.Empty, Token.StringLiteral, '"\\n"', '\n'],
    [Context.Empty, Token.StringLiteral, '"\\n"', '\n'],
    [Context.Empty, Token.StringLiteral, '"\\r"', '\r'],
    [Context.Empty, Token.StringLiteral, "'\"'", '"'],
    [Context.Empty, Token.StringLiteral, '"\\0"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\05"', '\u0005'],
    [Context.Empty, Token.StringLiteral, '"\\05"', '\u0005'],
    [Context.Empty, Token.StringLiteral, '"\\u{0f3b}"', '༻'],
    [Context.Empty, Token.StringLiteral, '"\
    "', '    '],

    // Should pass in strict mode
    [Context.Strict, Token.StringLiteral, '"\\0"', '\u0000'],

    // Russian letters
    [Context.Empty, Token.StringLiteral, '"\\б"', 'б'],
    [Context.Empty, Token.StringLiteral, '"\\И"', 'И'],
    [Context.Empty, Token.StringLiteral, '"\\Й"', 'Й'],
    [Context.Empty, Token.StringLiteral, '"\\К"', 'К'],
    [Context.Empty, Token.StringLiteral, '"\\Л"', 'Л'],
    [Context.Empty, Token.StringLiteral, '"\\О"', 'О'],
    [Context.Empty, Token.StringLiteral, '"\\Ф"', 'Ф'],
    [Context.Empty, Token.StringLiteral, '"\\Ц"', 'Ц'],
    [Context.Empty, Token.StringLiteral, '"\\Ш"', 'Ш'],
    [Context.Empty, Token.StringLiteral, '"\\Э"', 'Э'],
    [Context.Empty, Token.StringLiteral, '"\\ж"', 'ж'],
    [Context.Empty, Token.StringLiteral, '"\\з"', 'з'],

    // Escaped letters
    [Context.Empty, Token.StringLiteral, '"\\b"', '\b'],
    [Context.Empty, Token.StringLiteral, '"\\v"', '\v'],
    [Context.Empty, Token.StringLiteral, '"\\t"', '\t'],
    [Context.Empty, Token.StringLiteral, '"\\f"', '\f'],
    [Context.Empty, Token.StringLiteral, '"\\j"', 'j'],
    [Context.Empty, Token.StringLiteral, '"\\A"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\t"', '\t'],
    [Context.Empty, Token.StringLiteral, '"\\fsuffix"', '\fsuffix'],
    [Context.Empty, Token.StringLiteral, '"\\Rsuffix"', 'Rsuffix'],
    [Context.Empty, Token.StringLiteral, '"prefix\\r\\n"', 'prefix\r\n'],

    // Unicode escape sequence

    [Context.Empty, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.Empty, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.Empty, Token.StringLiteral, '"\\u0041"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.Empty, Token.StringLiteral, '"\\u0123"', 'ģ'],
    [Context.Empty, Token.StringLiteral, '"\\u0123 postfix"', 'ģ postfix'],
    [Context.Empty, Token.StringLiteral, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.Empty, Token.StringLiteral, '"\\u{CDEF}"', '췯'],
    [Context.Empty, Token.StringLiteral, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u{10ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u0062"', 'b'],
    [Context.Empty, Token.StringLiteral, '"\\u0410"', 'А'],
    [Context.Empty, Token.StringLiteral, '"\\u0412"', 'В'],
    [Context.Empty, Token.StringLiteral, '"\\u0419"', 'Й'],
    [Context.Empty, Token.StringLiteral, '"\\u042E"', 'Ю'],
    [Context.Empty, Token.StringLiteral, '"\\u0432"', 'в'],
    [Context.Empty, Token.StringLiteral, '"\\u0030"', '0'],
    [Context.Empty, Token.StringLiteral, '"\\u0035"', '5'],
    [Context.Empty, Token.StringLiteral, '"\\u0003"', '\u0003'],
    [Context.Empty, Token.StringLiteral, '"\\u180E"', '᠎'],

    // Escaped hex

    [Context.Empty, Token.StringLiteral, '"\\x01F"', '\u0001F'],
    [Context.Empty, Token.StringLiteral, '"\\x05B"', '\u0005B'],
    [Context.Empty, Token.StringLiteral, '"\\x0D3"', '\r3'],
    [Context.Empty, Token.StringLiteral, '"\\x088"', '\b8'],
    [Context.Empty, Token.StringLiteral, '"\\x34"', '4'],
    [Context.Empty, Token.StringLiteral, '"\\xCd"', 'Í'],
    [Context.Empty, Token.StringLiteral, '"\\xF0"', 'ð'],
    [
      Context.Empty,
      Token.StringLiteral,
      '"\\xF000111FEEEDDAAAB77777999344BBBCCD0"',
      'ð00111FEEEDDAAAB77777999344BBBCCD0'
    ],
    [Context.Empty, Token.StringLiteral, '"\\x128"', '\u00128'],
    [Context.Empty, Token.StringLiteral, '"\\xCd#"', 'Í#'],
    [Context.Empty, Token.StringLiteral, '"\\xDe\\x00"', 'Þ\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\0x0061"', '\u0000x0061'],
    [Context.Empty, Token.StringLiteral, '"\\x41"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\x4A"', 'J'],
    [Context.Empty, Token.StringLiteral, '"\\x4F"', 'O'],
    [Context.Empty, Token.StringLiteral, '"\\x69"', 'i'],

    // Escaped octals
    [Context.Empty, Token.StringLiteral, '"\\01"', '\u0001'],
    [Context.Empty, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.Empty, Token.StringLiteral, '"\\04"', '\u0004'],
    [Context.Empty, Token.StringLiteral, '"\\44444444444"', '$444444444'],
    [Context.Empty, Token.StringLiteral, '"\\777777"', '?7777'],
    [Context.Empty, Token.StringLiteral, '"\\052"', '*'],
    [Context.Empty, Token.StringLiteral, '"\\08"', '\u00008'],
    [Context.Empty, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.Empty, Token.StringLiteral, '"\\052"', '*'],
    [Context.Empty, Token.StringLiteral, '"Hello\\nworld"', 'Hello\nworld'],
    [Context.Empty, Token.StringLiteral, '"Hello\\312World"', 'HelloÊWorld'],
    [Context.Empty, Token.StringLiteral, '"Hello\\712World"', 'Hello92World'],
    [Context.Empty, Token.StringLiteral, '"Hello\\1World"', 'Hello\u0001World'],
    [Context.Empty, Token.StringLiteral, '"Hello\\02World"', 'Hello\u0002World'],
    [Context.Empty, Token.StringLiteral, '"\\46"', '&'],
    [Context.Empty, Token.StringLiteral, '"\\5*"', '\u0005*'],
    [Context.Empty, Token.StringLiteral, '"\\10"', '\b'],
    [Context.Empty, Token.StringLiteral, '"\\02"', '\u0002'],
    [Context.Empty, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.Empty, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.Empty, Token.StringLiteral, '"\\73"', ';'],
    [Context.Empty, Token.StringLiteral, '"\\62a"', '2a'],
    [Context.Empty, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.Empty, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.Empty, Token.StringLiteral, '"\\012"', '\n'],
    [Context.Empty, Token.StringLiteral, '"\\126"', 'V'],
    [Context.Empty, Token.StringLiteral, '"\\302"', 'Â'],
    [Context.Empty, Token.StringLiteral, '"\\000"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\104"', 'D'],
    [Context.Empty, Token.StringLiteral, '"\\221"', '']
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
          value: value,
          line: 1,
          column: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const parser = create(`${op} rest`);
      const found = scan(parser, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.source.length,
          line: parser.line,
          column: parser.index - parser.columnOffset
        },
        {
          token,
          hasNext: true,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
