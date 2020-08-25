import { parseScript, parseModule } from '../../src/escaya';
import { readdirSync, readFileSync } from 'fs';
import * as t from 'assert';

// Note! Some tests are skipped because they are either invalid
// or should fail only in strict mode or module goal and I don't
// don't test for that.
//
// AnnexB is on by default.

const Test262Dir = 'node_modules/test262-parser-tests';

const expectations = {
  pass: ['a62c6323a3696fa8.js', '110fa1efdd0868b8.js'],
  explicit: ['110fa1efdd0868b8.js'],
  fail: [
    'fc7ed197a376fa5f.js',
    'f44552157bc0db6e.module.js',
    'f2db53245b89c72f.js',
    'efcb54b62e8f0e06.js',
    'c7ad2478fd72bffe.js',
    'c510fa0f191310ed.js',
    'a38011d2c010999e.js',
    '944ea2478d838026.js',
    '3dbb6e166b14a6c0.js',
    '665ab370012f20cf.js',
    '6cd36f7e68bdfb7a.js',
    'e808e347646c2670.js',
    'fb130c395c6aafe7.js',
    '78e861dca5c2377d.js',
    'fb130c395c6aafe7.js',
    '15a6123f6b825c38.js',
    '147fa078a7436e0e.js',
    '1acada3c651821cf.js',
    '1aefe47e20eb91fa.module.js',
    '320eade064b2c635.js',
    '328fddc7bdffb499.js',
    '3bc2b27a7430f818.js',
    'e4a43066905a597b.js',
    'bf49ec8d96884562.js',
    '8af69d8f15295ed2.js',
    '78c215fabdf13bae.js',
    '66e383bfd18e66ab.js',
    '647e21f8f157c338.js',
    '7b876ca5139f1ca8.js',
    'e3fbcf63d7e43ead.js',
    'fd2a45941e114896.js'
  ],
  early: [
    'ec31fa5e521c5df4.js',
    'e262ea7682c36f92.js',
    'be7329119eaa3d47.js',
    '4de83a7417cd30dd.js',
    '1aff49273f3e3a98.js',
    '12a74c60f52a60de.js',
    '0f5f47108da5c34e.js',
    '2fcc5b7e8d0ff3c9.js',
    '4435f19f2a2a24bd.js'
  ]
};

const parse = (src: string, module: boolean) => (module ? parseModule : parseScript)(src);

const isModule = (val: string) => /\.module\.js/.test(val);

describe('Test262 Parser tests', () => {
  describe('Pass', () => {
    for (const f of readdirSync(`${Test262Dir}/pass`)) {
      if (expectations.pass.indexOf(f) !== -1) continue;
      it(`Should pass -  [${f}]`, () => {
        t.doesNotThrow(() => {
          parse(readFileSync(`${Test262Dir}/pass/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });
  /*  describe('Fail', () => {
    for (const f of readdirSync(`${Test262Dir}/fail`)) {
      if (expectations.fail.indexOf(f) !== -1) continue;
      it(`Should fail on - [${f}]`, () => {
        t.throws(() => {
          parse(readFileSync(`${Test262Dir}/fail/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });

  describe('Early errors', () => {
    for (const f of readdirSync(`${Test262Dir}/early`)) {
      if (expectations.early.indexOf(f) !== -1) continue;
      it(`should fail on early error [${f}]`, () => {
        t.throws(() => {
          parse(readFileSync(`${Test262Dir}/early/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });*/

  describe('Pass explicit', () => {
    for (const f of readdirSync(`${Test262Dir}/pass-explicit`)) {
      if (expectations.explicit.indexOf(f) !== -1) continue;
      it(`Should pass -  [${f}]`, () => {
        t.doesNotThrow(() => {
          parse(readFileSync(`${Test262Dir}/pass-explicit/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });
});
