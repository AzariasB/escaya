import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('scanner - identifiers', () => {
  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scan(parser, context));
    });
  }

  fail('invalid astral character', '🀒', Context.Empty);
  fail('invalid astral character', '😍', Context.Empty);
  fail('invalid astral character in the middle', 'a🤨c', Context.Empty);
  fail('invalid IdentifierStart', '፰', Context.Empty);
  fail('invalid IdentifierStart', '£', Context.Empty);
  fail('invalid IdentifierStart', '€', Context.Empty);
  fail('invalid escape', '\\', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u}', Context.Empty);
  fail('invalid u after Unicode \\u', 'x\\u', Context.Empty);
  fail('invalid escape after \\', '\\\\', Context.Empty);
  fail('invalid escape after \\', 'x\\', Context.Empty);
  fail('invalid escape after Unicode \\u{', 'x\\u{%', Context.Empty);
  fail('invalid escape after Unicode \\u', 'x\\u%', Context.Empty);
  fail('invalid escape after Unicode \\u{', 'x\\u{000072', Context.Empty);
  fail('invalid escape after Unicode \\u', 'x\\u000072', Context.Empty);
  fail('invalid newlines after Unicode \\u0', 'x\\u0\nnewline', Context.Empty);
  fail('invalid carriage returns Unicode \\u0', 'x\\u0\rnewline', Context.Empty);
  fail('invalid paragraph separators Unicode \\u0', 'x\\u0\u2029newline', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u{u foo', Context.Empty);
  fail('invalid u after Unicode \\u', 'x\\uu foo', Context.Empty);
  fail('invalid u after Unicode \\u{0', 'x\\u{0u foo', Context.Empty);
  fail('invalid u after Unicode \\u{a', 'x\\u{au foo', Context.Empty);
  fail('invalid u after Unicode \\u0', 'x\\u0u foo', Context.Empty);
  fail('invalid u after Unicode \\ua', 'x\\uau foo', Context.Empty);
  fail('invalid u after Unicode \\u00', 'x\\u00u foo', Context.Empty);
  fail('invalid u after Unicode', 'x\\u0au foo', Context.Empty);
  fail('invalid u after Unicode \\u000', '\\u00088', Context.Empty);
  fail('invalid u after Unicode \\u{', '\\u{g0}', Context.Empty);
  fail('invalid u after Unicode \\u', '\\ug0', Context.Empty);
  fail('invalid u after Unicode \\u000', '\\u{g0}', Context.Empty);
  fail('invalid u after Unicode \\u{0', '\\u{0g}', Context.Empty);
  fail('invalid u after Unicode \\u0', '\\u0g', Context.Empty);
  fail('invalid u after Unicode \\u{7', '\\u{70bc', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u{!', Context.Empty);
  fail('invalid u after Unicode \\u[', 'x\\}', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\{4fff', Context.Empty);
  fail('invalid u after Unicode \\u[', 'x\\u[]', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u{110000}', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u0x11ffff', Context.Empty);
  fail('invalid u after Unicode \\u{', 'x\\u{10401', Context.Empty);
  fail('invalid u after Unicode \\u[', '\\u[]', Context.Empty);
  fail('invalid u after Unicode \\u[', '\\u[', Context.Empty);
  fail('invalid X after Unicode \\u00', 'x\\u00aX foo', Context.Empty);
  fail('invalid x after Unicode \\u{', 'x\\u{x foo', Context.Empty);
  fail('invalid \\ after Unicode \\u{', 'x\\u{\\ foo', Context.Empty);
  fail('invalid \\ after Unicode \\u{0', 'x\\u{0\\ foo', Context.Empty);
  fail('invalid } after Unicode \\u{', 'x\\u{} foo', Context.Empty);
  fail('invalid } after Unicode \\u{', 'x\\u{} foo', Context.Empty);
  fail('invalid } after Unicode \\u000', 'x\\u000g${', Context.Empty);
  fail('invalid } after Unicode \\u00a', 'x\\u00a} foo', Context.Empty);
  fail('invalid } after Unicode \\u0a{', 'x\\u0a} foo', Context.Empty);
  fail('invalid } after Unicode \\u', 'x\\u} foo', Context.Empty);
  fail('invalid { after Unicode \\u{', 'x\\u{{', Context.Empty);
  fail('invalid { after Unicode \\u00', 'x\\u000g', Context.Empty);
  fail('invalid { after Unicode \\ugggg', 'x\\ugggg', Context.Empty);
  fail('invalid { after Unicode \\ugggg', 'x\\ugggg', Context.Empty);
  fail('invalid { after Unicode \\u', '\\u1', Context.Empty);
  fail('invalid legacy octal', '\\7', Context.Empty);
  fail('invalid legacy octal', '\\77', Context.Empty);
  fail('invalid escaped character', '\\t', Context.Empty);
  fail('invalid escaped character', '\\v', Context.Empty);
  fail('invalid escaped hex character', '\\x0g', Context.Empty);

  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.Identifier, '𐨪', '𐨪'],
    [Context.Empty, Token.Identifier, '𞸊𞸋', '𞸊𞸋'],
    [Context.Empty, Token.Identifier, '𐅫', '𐅫'],
    [Context.Empty, Token.Identifier, '𓁬', '𓁬'],
    [Context.Empty, Token.Identifier, '𒅹', '𒅹'],
    [Context.Empty, Token.Identifier, '𒅹𒅹', '𒅹𒅹'],
    [Context.Empty, Token.Identifier, '𑄥', '𑄥'],
    [Context.Empty, Token.Identifier, 'a𑁪', 'a𑁪'],
    [Context.Empty, Token.Identifier, '𑁪a', '𑁪a'],
    [Context.Empty, Token.Identifier, 'a𑄁', 'a𑄁'],
    [Context.Empty, Token.Identifier, 'a𐒤', 'a𐒤'],
    [Context.Empty, Token.Identifier, '𐒤a', '𐒤a'],
    [Context.Empty, Token.Identifier, 'abc', 'abc'],
    [Context.Empty, Token.Identifier, '゜', '゜'],
    [Context.Empty, Token.Identifier, 'ab_c', 'ab_c'],
    [Context.Empty, Token.Identifier, '$_abc', '$_abc'],
    [Context.Empty, Token.Identifier, '_$abc', '_$abc'],
    [Context.Empty, Token.Identifier, '$_123', '$_123'],
    [Context.Empty, Token.Identifier, '_123', '_123'],
    [Context.Empty, Token.Identifier, '$', '$'],
    [Context.Empty, Token.Identifier, '$_123abc', '$_123abc'],
    [Context.Empty, Token.Identifier, '$_abc123', '$_abc123'],
    [Context.Empty, Token.Identifier, 'a', 'a'],
    [Context.Empty, Token.Identifier, 'M5', 'M5'],
    [Context.Empty, Token.Identifier, '$A', '$A'],
    [Context.Empty, Token.Identifier, '__', '__'],
    [Context.Empty, Token.Identifier, '$x', '$x'],
    [Context.Empty, Token.Identifier, '$', '$'],
    [Context.Empty, Token.Identifier, '$$', '$$'],
    [Context.Empty, Token.Identifier, 'Ab', 'Ab'],
    [Context.Empty, Token.Identifier, 'Ab', 'Ab'],
    [Context.Empty, Token.Identifier, 'aBc', 'aBc'],
    [Context.Empty, Token.Identifier, 'aBC', 'aBC'],
    [Context.Empty, Token.Identifier, '_O', '_O'],
    [
      Context.Empty,
      Token.Identifier,
      '________foo_________________________bar________________',
      '________foo_________________________bar________________'
    ],
    [Context.Empty, Token.Identifier, 'x_y', 'x_y'],
    [Context.Empty, Token.Identifier, 'x1y1z1', 'x1y1z1'],
    [Context.Empty, Token.Identifier, 'a____123___b$', 'a____123___b$'],
    [Context.Empty, Token.Identifier, '𠮷野家', '𠮷野家'],
    [Context.Empty, Token.Identifier, 'CAN_NOT_BE_A_KEYWORD', 'CAN_NOT_BE_A_KEYWORD'],
    [Context.Empty, Token.Identifier, '/* skip */   $', '$'],
    [Context.Empty, Token.Identifier, '℘', '℘'],
    [Context.Empty, Token.Identifier, '℮', '℮'],
    [Context.Empty, Token.Identifier, 'a𐊧123', 'a𐊧123'],
    [Context.Empty, Token.Identifier, '\\u004C', 'L'],
    [Context.Empty, Token.Identifier, 'a᧚', 'a᧚'],
    [Context.Empty, Token.Identifier, '\\u{70}bc\\u{70}bc', 'pbcpbc'],
    [Context.Empty, Token.Identifier, 'a\\u{0000000000000000000071}c', 'aqc'],
    [Context.Empty, Token.Identifier, 'б', 'б'],
    [Context.Empty, Token.Identifier, 'ц', 'ц'],
    [Context.Empty, Token.Identifier, '\\u0431', 'б'],
    [Context.Empty, Token.Identifier, '\\u{413}', 'Г'],
    [Context.Empty, Token.Identifier, 'название', 'название'],
    [Context.Empty, Token.Identifier, 'دیوانه', 'دیوانه'],
    [Context.Empty, Token.Identifier, 'aᢆ', 'aᢆ'],
    [Context.Empty, Token.Identifier, 'a፰', 'a፰'],
    [Context.Empty, Token.Identifier, '$00xxx\\u0069\\u0524\\u{20BB7}', '$00xxxiԤη'],
    [Context.Empty, Token.Identifier, 'ab\\u{000072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{00072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{0072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{72}', 'abr'],
    [Context.Empty, Token.Identifier, '\\u{000070}bc', 'pbc'],
    [Context.Empty, Token.Identifier, '\\u{070}bc', 'pbc'],
    [Context.Empty, Token.Identifier, '\\u{000000000000000000070}bc', 'pbc'],
    [Context.Empty, Token.Identifier, 'a\\u{0000000000000000000071}c', 'aqc'],
    [Context.Empty, Token.Identifier, 'ab\\u{0000000000000000000072}', 'abr'],
    [Context.Empty, Token.Identifier, 'Ф', 'Ф'],
    [Context.Empty, Token.Identifier, '𞸀', '𞸀'],
    [Context.Empty, Token.Identifier, '_𞸃', '_𞸃'],
    [Context.Empty, Token.Identifier, '𞸆_$', '𞸆_$'],
    [Context.Empty, Token.Identifier, '𐊧', '𐊧'],
    [Context.Empty, Token.Identifier, 'Ƞ', 'Ƞ'],
    [Context.Empty, Token.Identifier, 'ȡ', 'ȡ'],
    [Context.Empty, Token.Identifier, 'ƌ', 'ƌ'],
    [Context.Empty, Token.Identifier, 'ἇἐ', 'ἇἐ'],
    [Context.Empty, Token.Identifier, 'ῴῶ', 'ῴῶ'],
    [Context.Empty, Token.Identifier, 'ṁ', 'ṁ'],
    [Context.Empty, Token.Identifier, 'ẕ', 'ẕ'],
    [Context.Empty, Token.Identifier, 'ӡ', 'ӡ'],
    [Context.Empty, Token.Identifier, 'ӽ', 'ӽ'],
    [Context.Empty, Token.Identifier, 'ⲏⲑⲓⲕⲗⲙⲛⲝ', 'ⲏⲑⲓⲕⲗⲙⲛⲝ'],
    [Context.Empty, Token.Identifier, 'ǆ', 'ǆ'],
    [Context.Empty, Token.Identifier, 'ᶚ', 'ᶚ'],
    [Context.Empty, Token.Identifier, 'ꚁ', 'ꚁ'],
    [Context.Empty, Token.Identifier, 'ꚃ', 'ꚃ'],
    [Context.Empty, Token.Identifier, '俿abc', '俿abc'],
    [Context.Empty, Token.Identifier, 'Ȁ', 'Ȁ'],
    [Context.Empty, Token.Identifier, '\\u{5F}', '_'],
    [Context.Empty, Token.Identifier, '\\u{61}', 'a'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, 'a\\u{5A}b', 'aZb'],
    [Context.Empty, Token.Identifier, 'a\\u{5A}ba\\u{5A}b', 'aZbaZb'],
    [
      Context.Empty,
      Token.Identifier,
      '\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff',
      '俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ'
    ],
    [
      Context.Empty,
      Token.Identifier,
      'x\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff',
      'x俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ'
    ],
    [Context.Empty, Token.Identifier, '\\u{4fff}', '俿'],
    [Context.Empty, Token.Identifier, 'x\\u{4fff}', 'x俿'],
    [Context.Empty, Token.Identifier, '\\u0052oo', 'Roo'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, '\\u{5A}', 'Z'],
    [Context.Empty, Token.Identifier, 'x\\u110000', 'xᄀ00'],
    [Context.Empty, Token.Identifier, 'x\\u11ffff', 'xᇿff'],
    [Context.Empty, Token.Identifier, '\\u{4fff}', '俿'],
    [Context.Empty, Token.Identifier, '\\u{1EE00}', '{Ȁ'],
    [Context.Empty, Token.Identifier, '_\\u{1EE03}', '_{ȃ'],
    [Context.Empty, Token.Identifier, '_\\u{1EE03}', '_{ȃ'],

    // Keywords
    [Context.Empty, Token.PackageKeyword, 'p\\u0061ckage', 'package'],
    [Context.Empty, Token.LetKeyword, 'l\\u0065t', 'let'],
    [Context.Empty, Token.AwaitKeyword, '\\u0061wait', 'await'],
    [Context.Empty, Token.LetKeyword, 'l\\u0065t', 'let']
  ];

  for (const [ctx, token, op, res] of tokens) {
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
          value: res,
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
          hasNext: parser.index < parser.length,
          value: parser.tokenValue,
          line: parser.line,
          column: parser.index - parser.columnOffset
        },
        {
          token,
          hasNext: true,
          value: res,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
