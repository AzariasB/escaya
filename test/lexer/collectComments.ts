import * as t from 'assert';
import { collectComments } from '../../src/lexer/comments';

describe('Scanner - Comments', () => {
  it('MultieLine - trailing', () => {
    t.deepStrictEqual(collectComments('/* MultieLine */ bar /* trailing */', 20, false, true), [
      {
        comment: ' trailing ',
        end: 35,
        newLine: false,
        start: 21,
        type: 'MultiLine'
      }
    ]);
  });

  it('MultieLine', () => {
    t.deepStrictEqual(collectComments('/* MultieLine */', 0, false, false), [
      {
        comment: ' MultieLine ',
        end: 16,
        newLine: false,
        start: 0,
        type: 'MultiLine'
      }
    ]);
  });

  it('SingleLine with line break', () => {
    t.deepStrictEqual(collectComments('// SingleLine line break \n\t ', 0, false, false), [
      {
        comment: ' SingleLine line break ',
        end: 25,
        newLine: true,
        start: 0,
        type: 'SingleLine'
      }
    ]);
  });

  it('MultieLine', () => {
    t.deepStrictEqual(
      collectComments('/* MultieLine */ /* MultieLine */ /* MultieLine */ /* MultieLine */', 0, false, false),
      [
        {
          comment: ' MultieLine ',
          end: 16,
          newLine: false,
          start: 0,
          type: 'MultiLine'
        },
        {
          comment: ' MultieLine ',
          end: 33,
          newLine: false,
          start: 17,
          type: 'MultiLine'
        },
        {
          comment: ' MultieLine ',
          end: 50,
          newLine: false,
          start: 34,
          type: 'MultiLine'
        },
        {
          comment: ' MultieLine ',
          end: 67,
          newLine: false,
          start: 51,
          type: 'MultiLine'
        }
      ]
    );
  });

  it('MultieLine and HTML open', () => {
    t.deepStrictEqual(collectComments('/* MultieLine */ <!-- HTML open', 0, false, false), [
      {
        comment: ' MultieLine ',
        end: 16,
        newLine: false,
        start: 0,
        type: 'MultiLine'
      },
      {
        comment: ' HTML open',
        end: 31,
        newLine: false,
        start: 17,
        type: 'HTMLOpen'
      }
    ]);
  });

  it('HTMLClose', () => {
    t.deepStrictEqual(collectComments('--> HTMLClose', 0, false, false), [
      {
        comment: ' HTMLClose',
        end: 13,
        newLine: false,
        start: 0,
        type: 'HTMLClose'
      }
    ]);
  });
  it('SingleLine', () => {
    t.deepStrictEqual(collectComments('// SingleLine', 0, false, false), [
      {
        comment: ' SingleLine',
        end: 13,
        newLine: false,
        start: 0,
        type: 'SingleLine'
      }
    ]);
  });

  it('HTMLOpen', () => {
    t.deepStrictEqual(collectComments('<!-- HTML open', 0, false, false), [
      {
        comment: ' HTML open',
        end: 14,
        newLine: false,
        start: 0,
        type: 'HTMLOpen'
      }
    ]);
  });
});
