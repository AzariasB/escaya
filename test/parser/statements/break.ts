import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('leafs - Break', () => {
  it('labels and while', () => {
    t.deepEqual(parseScript('foo: do break foo; while(foo);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',

              name: 'foo',
              start: 0,
              end: 4
            },
            labelledItem: {
              type: 'DoWhileStatement',
              expression: {
                type: 'IdentifierReference',

                name: 'foo',
                start: 25,
                end: 28
              },
              statement: {
                type: 'BreakStatement',
                label: {
                  type: 'IdentifierReference',

                  name: 'foo',
                  start: 14,
                  end: 17
                },
                start: 8,
                end: 18
              },
              start: 5,
              end: 30
            },
            start: 0,
            end: 30
          },
          start: 0,
          end: 30
        }
      ],
      start: 0,
      end: 30
    });
  });

  it('with break and no block body', () => {
    t.deepEqual(parseScript('while (x) break'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 7,
            end: 8
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 10,
            end: 15
          },
          start: 0,
          end: 15
        }
      ],
      start: 0,
      end: 15
    });
  });

  it('block wrapped in paren', () => {
    t.deepEqual(parseScript('for (x of y) break'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ForAwaitStatement',
          initializer: {
            type: 'IdentifierReference',

            name: 'x',
            start: 5,
            end: 6
          },
          expression: {
            type: 'IdentifierReference',

            name: 'y',
            start: 10,
            end: 11
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 13,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('do break while', () => {
    t.deepEqual(parseScript('do break; while(foo);'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'foo',
            start: 16,
            end: 19
          },
          statement: {
            type: 'BreakStatement',
            label: null,
            start: 3,
            end: 9
          },
          start: 0,
          end: 21
        }
      ],
      start: 0,
      end: 21
    });
  });

  it('same level', () => {
    t.deepEqual(parseScript('foo: while (true) { break foo; }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'foo',
              start: 0,
              end: 4
            },
            labelledItem: {
              type: 'WhileStatement',
              expression: {
                type: 'BooleanLiteral',
                value: true,
                start: 12,
                end: 16
              },
              statement: {
                type: 'BlockStatement',
                leafs: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'IdentifierReference',
                      name: 'foo',
                      start: 26,
                      end: 29
                    },
                    start: 20,
                    end: 30
                  }
                ],
                start: 18,
                end: 32
              },
              start: 5,
              end: 32
            },
            start: 0,
            end: 32
          },
          start: 0,
          end: 32
        }
      ],
      start: 0,
      end: 32
    });
  });

  it('foo: while (true) if (x); else break foo;', () => {
    t.deepEqual(parseScript('foo: while (true) if (x); else break foo;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'foo',
              start: 0,
              end: 4
            },
            labelledItem: {
              type: 'WhileStatement',
              expression: {
                type: 'BooleanLiteral',
                value: true,
                start: 12,
                end: 16
              },
              statement: {
                type: 'IfStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'x',
                  start: 22,
                  end: 23
                },
                consequent: {
                  type: 'EmptyStatement',
                  start: 24,
                  end: 25
                },
                alternate: {
                  type: 'BreakStatement',
                  label: {
                    type: 'IdentifierReference',
                    name: 'foo',
                    start: 37,
                    end: 40
                  },
                  start: 31,
                  end: 41
                },
                start: 18,
                end: 41
              },
              start: 5,
              end: 41
            },
            start: 0,
            end: 41
          },
          start: 0,
          end: 41
        }
      ],
      start: 0,
      end: 41
    });
  });
});
