import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Empty', () => {
  it(';/a*/', () => {
    t.deepEqual(parseScript(';/a*/'), {
      directives: [],
      leafs: [
        {
          type: 'EmptyStatement'
        },
        {
          expression: {
            flags: '',
            pattern: 'a*',
            type: 'RegularExpressionLiteral'
          },
          type: 'ExpressionStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });

  it(';;', () => {
    t.deepEqual(parseScript(';;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'EmptyStatement'
        },
        {
          type: 'EmptyStatement'
        }
      ],
      webCompat: true
    });
  });
});
