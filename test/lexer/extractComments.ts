import * as t from 'assert';
import { extractComments } from '../../src/lexer/whitespace';
import { ScannerState } from '../../src/lexer/common';

describe('Scanner - Comments', () => {
  it('MultieLine - trailing', () => {
    t.deepStrictEqual(extractComments('/* MultieLine */ bar /* trailing */', 20, false, ScannerState.Trailing), [
      {
        //   comment: ' trailing ',
        end: 35,
        newLine: false,
        start: 21,
        type: 'MultiLine'
      }
    ]);
  });

  it('MultieLine', () => {
    t.deepStrictEqual(extractComments('/* MultieLine */', 0, false, ScannerState.None), [
      {
        //    comment: ' MultieLine ',
        end: 16,
        newLine: false,
        start: 0,
        type: 'MultiLine'
      }
    ]);
  });

  it('SingleLine with line break', () => {
    t.deepStrictEqual(extractComments('// SingleLine line break \n\t ', 0, false, ScannerState.None), [
      {
        //   comment: ' SingleLine line break ',
        end: 25,
        newLine: true,
        start: 0,
        type: 'SingleLine'
      }
    ]);
  });

  it('MultieLine', () => {
    t.deepStrictEqual(
      extractComments(
        '/* MultieLine */ /* MultieLine */ /* MultieLine */ /* MultieLine */',
        0,
        false,
        ScannerState.None
      ),
      [
        {
          //    comment: ' MultieLine ',
          end: 16,
          newLine: false,
          start: 0,
          type: 'MultiLine'
        },
        {
          //    comment: ' MultieLine ',
          end: 33,
          newLine: false,
          start: 17,
          type: 'MultiLine'
        },
        {
          //  comment: ' MultieLine ',
          end: 50,
          newLine: false,
          start: 34,
          type: 'MultiLine'
        },
        {
          //comment: ' MultieLine ',
          end: 67,
          newLine: false,
          start: 51,
          type: 'MultiLine'
        }
      ]
    );
  });

  it('MultieLine and HTML open', () => {
    t.deepStrictEqual(extractComments('/* MultieLine */ <!-- HTML open', 0, false, ScannerState.None), [
      {
        //  comment: ' MultieLine ',
        end: 16,
        newLine: false,
        start: 0,
        type: 'MultiLine'
      },
      {
        //    comment: ' HTML open',
        end: 31,
        newLine: false,
        start: 17,
        type: 'HTMLOpen'
      }
    ]);
  });

  it('HTMLClose', () => {
    t.deepStrictEqual(extractComments('--> HTMLClose', 0, false, ScannerState.None), [
      {
        //   comment: ' HTMLClose',
        end: 13,
        newLine: false,
        start: 0,
        type: 'HTMLClose'
      }
    ]);
  });
  it('SingleLine', () => {
    t.deepStrictEqual(extractComments('// SingleLine', 0, false, ScannerState.None), [
      {
        //    comment: ' SingleLine',
        end: 13,
        newLine: false,
        start: 0,
        type: 'SingleLine'
      }
    ]);
  });

  it('HTMLOpen', () => {
    t.deepStrictEqual(extractComments('<!-- HTML open', 0, false, ScannerState.None), [
      {
        //  comment: ' HTML open',
        end: 14,
        newLine: false,
        start: 0,
        type: 'HTMLOpen'
      }
    ]);
  });
});
