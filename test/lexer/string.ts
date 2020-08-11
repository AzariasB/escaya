import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/ast/token';
import { scanSingleToken } from '../../src/lexer/scan';

describe('Scanner - Numeric literals', () => {
  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scanSingleToken(parser, context));
    });
  }

  fail('invalid overflow', '"\\"', Context.Empty);
  fail('invalid overflow', '"oops \\u{110001}"', Context.Empty);
  fail('invalid newline', '"xyz \\12x"', Context.Strict);
  fail('invalid newline', '"xyz \\1239"', Context.Strict);
  fail('invalid newline', '"\n"', Context.Empty);
  fail('invalid linefeed', '"\r"', Context.Empty);
  fail('invalid lf + nl', '"\r\n"', Context.Empty);
  fail('invalid linefeed', '"\\001"', Context.Strict);
  fail('invalid linefeed', '"\\01"', Context.Strict);
  fail('invalid linefeed', '"\\6"', Context.Strict);
  fail('invalid linefeed', '"\\7"', Context.Strict);
  fail('invalid linefeed', '"\\8"', Context.Strict);
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
  fail('invalid \\ after ASCII \\x0', "'x\\x0\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u', "'x\\u\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u0', "'x\\u0\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\ua', "'x\\ua\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u00', "'x\\u00\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u0a', "'x\\u0a\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u000', "'x\\u000\\ foo'", Context.Empty);
  fail('invalid \\ after Unicode \\u00a', "'x\\u00a\\ foo'", Context.Empty);
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
  fail('invalid X after ASCII \\x0', "'x\\x0X foo'", Context.Empty);
  fail('invalid X after Unicode \\u', "'x\\uX foo'", Context.Empty);
  fail('invalid X after Unicode \\u0', "'x\\u0X foo'", Context.Empty);
  fail('invalid X after Unicode \\ua', "'x\\uaX foo'", Context.Empty);
  fail('invalid X after Unicode \\u00', "'x\\u00X foo'", Context.Empty);
  fail('invalid X after Unicode \\u0a', "'x\\u0aX foo'", Context.Empty);
  fail('invalid X after Unicode \\u000', "'x\\u000X foo'", Context.Empty);
  fail('invalid X after Unicode \\u00a', "'x\\u00aX foo'", Context.Empty);
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
  fail('invalid missing closing quote \\', '"', Context.Empty);
  fail('invalid missing closing quote \\', '"\\"', Context.Empty);
  fail('invalid u HexDigit (one, two or three time)', '"\\u1"', Context.Empty);
  fail('invalid u HexDigit (one, two or three time)', '"\\uA"', Context.Empty);
  fail('invalid unicode escape no hex', '"\\u"', Context.Empty);
  fail('invalid legacy octal escape sequence prologue strict', '"asterisk: \\052"', Context.Strict);
  fail('invalid octal in strict mode \\', '"\\7"', Context.Strict);

  fail(
    'invalid line break',
    `"
  "`,
    Context.Empty
  );

  const tokens: Array<[Context, string, string]> = [
    [Context.Empty, '"abc"', 'abc'],
    [Context.Empty, '"\u2028"', '\u2028'],
    // [Context.Empty, '"\u00A0str\u00A0ing\u00A0"', ' str ing '],
    // [Context.Empty, '"\u0020str\u0020ing\u0020"', ' str ing '],
    [Context.Empty, '"\u000Bstr\u000Bing\u000B"', '\u000bstr\u000bing\u000b'],
    [Context.Empty, '"\\r"', '\r'],
    [Context.Empty, '"\\123"', 'S'],
    [Context.Empty, '"\\0"', '\u0000'],
    [Context.Empty, '"\\05"', '\u0005'],
    [Context.Empty, '"\\x01F"', '\u0001F'],
    [Context.Empty, '"\\x05B"', '\u0005B'],
    [Context.Empty, '"\\x0D3"', '\r3'],
    [Context.Empty, '"\\x088"', '\b8'],
    [Context.Empty, '"\\x34"', '4'],
    [Context.Empty, '"\\xCd"', 'Í'],
    [Context.Empty, '"\\xF0"', 'ð'],
    [Context.Empty, '"\\u1000"', 'က'],
    [Context.Empty, '"\\uf2ff"', ''],
    [Context.Empty, '"\\u0041"', 'A'],
    [Context.Empty, '"\\n"', '\n'],
    [Context.Empty, '"\\n\\r"', '\n\r'],
    [Context.Empty, '"\\r\\n"', '\r\n'],
    [Context.Empty, '"\\123"', 'S'],
    [Context.Empty, '"12abc"', '12abc'],
    [Context.Empty, '"\\7771"', '?71'],
    [Context.Empty, '"\\0"', '\u0000'],
    [Context.Empty, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.Empty, '"\\u{CDEF}"', '췯'],
    [Context.Empty, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.Empty, '"\\u{10ffff}"', 'пϿ'],
    [Context.Empty, '"\\u1000"', 'က'],
    [Context.Empty, '";"', ';'],
    [Context.Empty, '"\\r"', '\r'],
    [Context.Empty, '""', ''],
    [Context.Empty, '"x\\u000072"', 'x\u000072'],
    [Context.Empty, '"123"', '123'],
    [Context.Empty, '"\\\\ "', '\\ '],
    [Context.Empty, '"\\0737 \\xaa \\u{abc} \\0 finish"', ';7 ª ઼ \u0000 finish'],
    [Context.Empty, '"\0"', '\u0000'],
    [Context.Empty, '"\\1239"', 'S9'],
    [Context.Empty, '"\x2028"', ' 28'],
    [Context.Empty, '"\\2028"', '8'],
    [Context.Empty, '"a\
    b"', 'a    b'],
    [Context.Empty, '"true"', 'true'],
    [Context.Empty, '"a \\u{10300}"', 'a @̀'],
    [Context.Empty, '"xyz \\abc3242"', 'xyz abc3242'],
    [Context.Empty, '"xy \\u{abc}} yz"', 'xy ઼} yz'],
    [Context.Empty, '"а"', 'а'],
    [Context.Empty, '"б"', 'б'],
    [Context.Empty, '"в"', 'в'],
    [Context.Empty, '"д"', 'д'],
    [Context.Empty, '"й"', 'й'],
    [Context.Empty, '"\\а"', 'а'],
    [Context.Empty, '"0x0435"', '0x0435'],
    [Context.Empty, '"\\b\\f\\n\\r\\t\\va"', '\b\f\n\r\t\u000ba'],
    [Context.Empty, '"\\b"', '\b'],
    [Context.Empty, '"\\t"', '\t'],
    [Context.Empty, '"\\n"', '\n'],

    [Context.Empty, '"\\n"', '\n'],
    [Context.Empty, '"\\r"', '\r'],
    [Context.Empty, "'\"'", '"'],
    [Context.Empty, '"\\0"', '\u0000'],
    [Context.Empty, '"\\05"', '\u0005'],
    [Context.Empty, '"\\05"', '\u0005'],
    [Context.Empty, '"\\u{0f3b}"', '༻'],
    [Context.Empty, '"\
    "', '    '],

    // Should pass in strict mode
    [Context.Strict, '"\\0"', '\u0000'],

    // Russian letters
    [Context.Empty, '"\\б"', 'б'],
    [Context.Empty, '"\\И"', 'И'],
    [Context.Empty, '"\\Й"', 'Й'],
    [Context.Empty, '"\\К"', 'К'],
    [Context.Empty, '"\\Л"', 'Л'],
    [Context.Empty, '"\\О"', 'О'],
    [Context.Empty, '"\\Ф"', 'Ф'],
    [Context.Empty, '"\\Ц"', 'Ц'],
    [Context.Empty, '"\\Ш"', 'Ш'],
    [Context.Empty, '"\\Э"', 'Э'],
    [Context.Empty, '"\\ж"', 'ж'],
    [Context.Empty, '"\\з"', 'з'],

    // Escaped letters
    [Context.Empty, '"\\b"', '\b'],
    [Context.Empty, '"\\v"', '\v'],
    [Context.Empty, '"\\t"', '\t'],
    [Context.Empty, '"\\f"', '\f'],
    [Context.Empty, '"\\j"', 'j'],
    [Context.Empty, '"\\A"', 'A'],
    [Context.Empty, '"\\t"', '\t'],

    // Unicode escape sequence

    [Context.Empty, '"\\u0041"', 'A'],
    [Context.Empty, '"\\u0042"', 'B'],
    [Context.Empty, '"\\u0043"', 'C'],
    [Context.Empty, '"\\u0044"', 'D'],
    [Context.Empty, '"\\u0045"', 'E'],
    [Context.Empty, '"\\u0046"', 'F'],
    [Context.Empty, '"\\u0047"', 'G'],
    [Context.Empty, '"\\u0048"', 'H'],
    [Context.Empty, '"\\u0049"', 'I'],
    [Context.Empty, '"\\u0061"', 'a'],
    [Context.Empty, '"\\u0065"', 'e'],
    [Context.Empty, '"\\u006B"', 'k'],
    [Context.Empty, '"\\u0073"', 's'],
    [Context.Empty, '"\\u1000"', 'က'],
    [Context.Empty, '"\\uf2ff"', ''],
    [Context.Empty, '"\\u0041"', 'A'],
    [Context.Empty, '"\\uf2ff"', ''],
    [Context.Empty, '"\\u0123"', 'ģ'],
    [Context.Empty, '"\\u0002"', '\u0002'],
    [Context.Empty, '"\\u0004"', '\u0004'],
    [Context.Empty, '"\\u0005"', '\u0005'],
    [Context.Empty, '"\\u0006"', '\u0006'],
    [Context.Empty, '"\\u0007"', '\u0007'],
    [Context.Empty, '"\\u0008"', '\u0008'],
    [Context.Empty, '"\\u0009"', '\u0009'],
    [Context.Empty, '"\\u000C"', '\f'],
    [Context.Empty, '"\\u000D"', '\r'],
    [Context.Empty, '"\\u000E"', '\u000e'],
    [Context.Empty, '"\\u000F"', '\u000f'],
    [Context.Empty, '"\\u000C"', '\f'],
    [Context.Empty, '"\\fsuffix"', '\fsuffix'],
    [Context.Empty, '"\\Rsuffix"', 'Rsuffix'],
    [Context.Empty, '"prefix\\r\\n"', 'prefix\r\n'],
    [Context.Empty, '"\\u0123 postfix"', 'ģ postfix'],
    [Context.Empty, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.Empty, '"\\u{CDEF}"', '췯'],
    [Context.Empty, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.Empty, '"\\u{10ffff}"', 'пϿ'],
    [Context.Empty, '"\\u0062"', 'b'],
    [Context.Empty, '"\\u0410"', 'А'],
    [Context.Empty, '"\\u0412"', 'В'],
    [Context.Empty, '"\\u0419"', 'Й'],
    [Context.Empty, '"\\u042E"', 'Ю'],
    [Context.Empty, '"\\u0432"', 'в'],
    [Context.Empty, '"\\u0030"', '0'],
    [Context.Empty, '"\\u0035"', '5'],
    [Context.Empty, '"\\u0003"', '\u0003'],
    [Context.Empty, '"\\u180E"', '᠎'],

    // Russian

    [Context.Empty, '"\\u0410"', 'А'],
    [Context.Empty, '"\\u0411"', 'Б'],
    [Context.Empty, '"\\u0412"', 'В'],
    [Context.Empty, '"\\u0413"', 'Г'],
    [Context.Empty, '"\\u0414"', 'Д'],
    [Context.Empty, '"\\u0415"', 'Е'],

    // Escaped hex

    [Context.Empty, '"\\x00"', '\u0000'],
    [Context.Empty, '"\\x01"', '\u0001'],
    [Context.Empty, '"\\x02"', '\u0002'],
    [Context.Empty, '"\\x03"', '\u0003'],
    [Context.Empty, '"\\x07"', '\u0007'],
    [Context.Empty, '"\\x0B"', '\u000b'],
    [Context.Empty, '"\\x0D"', '\r'],
    [Context.Empty, '"\\x0E"', '\u000e'],
    [Context.Empty, '"\\x0F"', '\u000f'],
    [Context.Empty, '"\\x04C"', '\u0004C'],
    [Context.Empty, '"\\x03D"', '\u0003D'],
    [Context.Empty, '"\\x01F"', '\u0001F'],
    [Context.Empty, '"\\x05B"', '\u0005B'],
    [Context.Empty, '"\\x06A"', '\u0006A'],
    [Context.Empty, '"\\x097"', '\t7'],
    [Context.Empty, '"\\x0B5"', '\u000b5'],
    [Context.Empty, '"\\x0C4"', '\f4'],
    [Context.Empty, '"\\x0E2"', '\u000e2'],
    [Context.Empty, '"\\x0F1"', '\u000f1'],
    [Context.Empty, '"\\x01"', '\u0001'],
    [Context.Empty, '"\\x04"', '\u0004'],
    [Context.Empty, '"\\x09"', '\t'],
    [Context.Empty, '"\\x0C"', '\f'],
    [Context.Empty, '"\\x0D"', '\r'],
    [Context.Empty, '"\\x0E"', '\u000e'],
    [Context.Empty, '"\\x0F"', '\u000f'],
    [Context.Empty, '"\\x079"', '\u00079'],
    [Context.Empty, '"\\x088"', '\b8'],
    [Context.Empty, '"\\x0A6"', '\n6'],
    [Context.Empty, '"\\x0D3"', '\r3'],
    [Context.Empty, '"\\x0E2"', '\u000e2'],
    [Context.Empty, '"\\x0F1"', '\u000f1'],
    [Context.Empty, '"\\x01F"', '\u0001F'],
    [Context.Empty, '"\\x05B"', '\u0005B'],
    [Context.Empty, '"\\x0D3"', '\r3'],
    [Context.Empty, '"\\x088"', '\b8'],
    [Context.Empty, '"\\x34"', '4'],
    [Context.Empty, '"\\xCd"', 'Í'],
    [Context.Empty, '"\\xF0"', 'ð'],

    // Letters i hex

    [Context.Empty, '"\\x61"', 'a'],
    [Context.Empty, '"\\x62"', 'b'],
    [Context.Empty, '"\\x63"', 'c'],
    [Context.Empty, '"\\x64"', 'd'],
    [Context.Empty, '"\\x65"', 'e'],
    [Context.Empty, '"\\x66"', 'f'],
    [Context.Empty, '"\\x67"', 'g'],
    [Context.Empty, '"\\x68"', 'h'],
    [Context.Empty, '"\\x6E"', 'n'],
    [Context.Empty, '"\\x73"', 's'],
    [Context.Empty, '"\\x7A"', 'z'],
    [Context.Empty, '"\\x74"', 't'],
    [Context.Empty, '"\\x6F"', 'o'],

    [Context.Empty, '"\\xF000111FEEEDDAAAB77777999344BBBCCD0"', 'ð00111FEEEDDAAAB77777999344BBBCCD0'],
    [Context.Empty, '"\\x128"', '\u00128'],
    [Context.Empty, '"\\xCd#"', 'Í#'],
    [Context.Empty, '"\\xDe\\x00"', 'Þ\u0000'],
    [Context.Empty, '"\\0x0061"', '\u0000x0061'],
    [Context.Empty, '"\\x41"', 'A'],
    [Context.Empty, '"\\x4A"', 'J'],
    [Context.Empty, '"\\x4F"', 'O'],
    [Context.Empty, '"\\x69"', 'i'],

    // Escaped octals
    [Context.Empty, '"\\01"', '\u0001'],
    [Context.Empty, '"\\023"', '\u0013'],
    [Context.Empty, '"\\04"', '\u0004'],
    [Context.Empty, '"\\44444444444"', '$444444444'],
    [Context.Empty, '"\\777777"', '?7777'],
    [Context.Empty, '"\\052"', '*'],
    [Context.Empty, '"\\08"', '\u00008'],
    [Context.Empty, '"\\7"', '\u0007'],
    [Context.Empty, '"\\052"', '*'],
    [Context.Empty, '"Hello\\nworld"', 'Hello\nworld'],
    [Context.Empty, '"Hello\\312World"', 'HelloÊWorld'],
    [Context.Empty, '"Hello\\712World"', 'Hello92World'],
    [Context.Empty, '"Hello\\1World"', 'Hello\u0001World'],
    [Context.Empty, '"Hello\\02World"', 'Hello\u0002World'],
    [Context.Empty, '"\\46"', '&'],
    [Context.Empty, '"\\5*"', '\u0005*'],
    [Context.Empty, '"\\10"', '\b'],
    [Context.Empty, '"\\02"', '\u0002'],
    [Context.Empty, '"\\02a"', '\u0002a'],
    [Context.Empty, '"\\02a"', '\u0002a'],
    [Context.Empty, '"\\73"', ';'],
    [Context.Empty, '"\\62a"', '2a'],
    [Context.Empty, '"\\023"', '\u0013'],
    [Context.Empty, '"\\7"', '\u0007'],
    [Context.Empty, '"\\012"', '\n'],
    [Context.Empty, '"\\126"', 'V'],
    [Context.Empty, '"\\302"', 'Â'],
    [Context.Empty, '"\\000"', '\u0000'],
    [Context.Empty, '"\\104"', 'D'],
    [Context.Empty, '"\\221"', '']
  ];

  for (const [ctx, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const parser = create(op);
      const found = scanSingleToken(parser, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.length,
          line: parser.line,
          value: parser.tokenValue,
          column: parser.index - parser.columnOffset
        },
        {
          token: Token.StringLiteral,
          hasNext: false,
          value: value,
          line: 1,
          column: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const parser = create(`${op} rest`);
      const found = scanSingleToken(parser, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.source.length,
          line: parser.line,
          column: parser.index - parser.columnOffset
        },
        {
          token: Token.StringLiteral,
          hasNext: true,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
