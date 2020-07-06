import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Expressions - New', () => {
  // Invalid cases
  for (const arg of ['new x(await foo);', 'foo.|1.', `foo.123.`]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'new foo',
    'new foo();',
    'new foo(1);',
    'new foo(1, 2);',
    // The first () will be processed as a part of the NewExpression and the
    // second () will be processed as part of LeftHandSideExpression.
    'new foo()();',
    // The first () will be processed as a part of the inner NewExpression and
    // the second () will be processed as a part of the outer NewExpression.
    'new new foo()();',
    'new foo.bar;',
    'new foo.bar();',
    'new foo.bar.baz;',
    'new foo.bar().baz;',
    'new foo[bar];',
    'new foo[bar]();'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Double wrapped group in the middle', () => {
    t.deepEqual(parseScript('x = ((y)) = z'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'y'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });

  it('Assign with dud group', () => {
    t.deepEqual(parseScript('a = ((b)) = c;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'IdentifierReference',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'ParenthesizedExpression',
                expression: {
                  type: 'ParenthesizedExpression',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'b'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'IdentifierReference',
                name: 'c'
              }
            }
          }
        }
      ],
      webCompat: true
    });
  });
});
