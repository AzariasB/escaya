import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('leafs - Empty', () => {
  it(';;;', () => {
    t.deepEqual(parseScript(';;;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'EmptyStatement',
          start: 0,
          end: 1
        },
        {
          type: 'EmptyStatement',
          start: 1,
          end: 2
        },
        {
          type: 'EmptyStatement',
          start: 2,
          end: 3
        }
      ],
      start: 0,
      end: 3
    });
  });

  it(';;; EMPTY;;;', () => {
    t.deepEqual(parseScript(';;; EMPTY;;;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'EmptyStatement',
          start: 0,
          end: 1
        },
        {
          type: 'EmptyStatement',
          start: 1,
          end: 2
        },
        {
          type: 'EmptyStatement',
          start: 2,
          end: 3
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'EMPTY',
            start: 4,
            end: 9
          },
          start: 4,
          end: 10
        },
        {
          type: 'EmptyStatement',
          start: 10,
          end: 11
        },
        {
          type: 'EmptyStatement',
          start: 11,
          end: 12
        }
      ],
      start: 0,
      end: 12
    });
  });
});
