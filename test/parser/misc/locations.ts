import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Misc - Location', () => {
  it('Array in object', () => {
    t.deepEqual(parseScript('a = b / c', { loc: true }), {
      directives: [],
      end: 9,
      leafs: [
        {
          end: 9,
          expression: {
            end: 9,
            left: {
              end: 1,
              name: 'a',
              start: 0,
              type: 'IdentifierReference'
            },
            operator: '=',
            right: {
              end: 9,
              left: {
                end: 5,
                name: 'b',
                start: 4,
                type: 'IdentifierReference'
              },
              operator: '/',
              right: {
                end: 9,
                name: 'c',
                start: 8,
                type: 'IdentifierReference'
              },
              start: 0,
              type: 'BinaryExpression'
            },
            start: 0,
            type: 'AssignmentExpression'
          },
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      start: 0,
      type: 'Script',
      webCompat: true
    });

    t.deepEqual(parseScript('a(b)', { loc: true }), {
      directives: [],
      end: 4,
      leafs: [
        {
          end: 4,
          expression: {
            arguments: [
              {
                end: 3,
                name: 'b',
                start: 2,
                type: 'IdentifierReference'
              }
            ],
            end: 4,
            expression: {
              end: 1,
              name: 'a',
              start: 0,
              type: 'IdentifierReference'
            },
            start: 0,
            type: 'CallExpression'
          },
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      start: 0,
      type: 'Script',
      webCompat: true
    });
  });
});
