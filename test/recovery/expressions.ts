import * as t from 'assert';
import { recovery } from '../../src/escaya';

describe('Recovery - Expressions', () => {
  it('Should parse a simple unary expression', () => {
    const root = recovery('++a', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 3,
      expression: {
        end: 3,
        id: 1,
        nodeType: 68,
        operand: {
          end: 3,
          id: 0,
          name: 'a',
          nodeType: 88,
          parent: null,
          start: 2,
          type: 'IdentifierReference'
        },
        operator: '++',
        parent: null,
        start: 0,
        type: 'PrefixUpdateExpression'
      },
      id: 2,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('!(a)', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 4,
      expression: {
        end: 4,
        id: 2,
        nodeType: 69,
        operand: {
          end: 4,
          expression: {
            end: 3,
            id: 0,
            name: 'a',
            nodeType: 88,
            parent: null,
            start: 2,
            type: 'IdentifierReference'
          },
          id: 1,
          nodeType: 74,
          parent: null,
          start: 1,
          type: 'ParenthesizedExpression'
        },
        operator: '!',
        parent: null,
        start: 0,
        type: 'UnaryExpression'
      },
      id: 3,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a parenthesized expression', () => {
    const root = recovery('(a,b,c)', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 7,
      expression: {
        end: 7,
        expression: {
          end: 6,
          id: 3,
          leafs: [
            {
              end: 2,
              id: 0,
              name: 'a',
              nodeType: 88,
              parent: null,
              start: 1,
              type: 'IdentifierReference'
            },
            {
              end: 4,
              id: 1,
              name: 'b',
              nodeType: 88,
              parent: null,
              start: 3,
              type: 'IdentifierReference'
            },
            {
              end: 6,
              id: 2,
              name: 'c',
              nodeType: 88,
              parent: null,
              start: 5,
              type: 'IdentifierReference'
            }
          ],
          nodeType: 58,
          parent: null,
          start: 0,
          type: 'CommaOperator'
        },
        id: 4,
        nodeType: 74,
        parent: null,
        start: 0,
        type: 'ParenthesizedExpression'
      },
      id: 5,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a parenthesized arrow', () => {
    const root = recovery('() => !a', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 8,
      expression: {
        async: false,
        contents: {
          body: {
            end: 8,
            id: 1,
            nodeType: 69,
            operand: {
              end: 8,
              id: 0,
              name: 'a',
              nodeType: 88,
              parent: null,
              start: 7,
              type: 'IdentifierReference'
            },
            operator: '!',
            parent: null,
            start: 5,
            type: 'UnaryExpression'
          },
          end: 8,
          id: 2,
          nodeType: 35,
          parent: null,
          start: 5,
          type: 'ConciseBody'
        },
        end: 8,
        id: 3,
        nodeType: 34,
        params: [],
        parent: null,
        start: 2,
        type: 'ArrowFunction'
      },
      id: 4,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple arrow', () => {
    const root = recovery('a => b', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 6,
      expression: {
        async: false,
        contents: {
          body: {
            end: 6,
            id: 1,
            name: 'b',
            nodeType: 88,
            parent: null,
            start: 4,
            type: 'IdentifierReference'
          },
          end: 6,
          id: 2,
          nodeType: 35,
          parent: null,
          start: 4,
          type: 'ConciseBody'
        },
        end: 6,
        id: 3,
        nodeType: 34,
        params: [
          {
            end: 1,
            id: 0,
            name: 'a',
            nodeType: 88,
            parent: null,
            start: 0,
            type: 'BindingIdentifier'
          }
        ],
        parent: null,
        start: 1,
        type: 'ArrowFunction'
      },
      id: 4,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple async arrow', () => {
    const root = recovery('async a => b', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 12,
      expression: {
        async: true,
        contents: {
          body: {
            end: 12,
            id: 1,
            name: 'b',
            nodeType: 88,
            parent: null,
            start: 10,
            type: 'IdentifierReference'
          },
          end: 12,
          id: 2,
          nodeType: 35,
          parent: null,
          start: 10,
          type: 'ConciseBody'
        },
        end: 12,
        id: 3,
        nodeType: 34,
        params: [
          {
            end: 7,
            id: 0,
            name: 'a',
            nodeType: 88,
            parent: null,
            start: 5,
            type: 'BindingIdentifier'
          }
        ],
        parent: null,
        start: 0,
        type: 'ArrowFunction'
      },
      id: 4,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a binary expression', () => {
    const root = recovery('a ** b - c / d', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 14,
      expression: {
        end: 14,
        id: 6,
        left: {
          end: 6,
          id: 2,
          left: {
            end: 1,
            id: 0,
            name: 'a',
            nodeType: 88,
            parent: null,
            start: 0,
            type: 'IdentifierReference'
          },
          nodeType: 60,
          operator: '**',
          parent: null,
          right: {
            end: 6,
            id: 1,
            name: 'b',
            nodeType: 88,
            parent: null,
            start: 4,
            type: 'IdentifierReference'
          },
          start: 0,
          type: 'BinaryExpression'
        },
        nodeType: 60,
        operator: '-',
        parent: null,
        right: {
          end: 14,
          id: 5,
          left: {
            end: 10,
            id: 3,
            name: 'c',
            nodeType: 88,
            parent: null,
            start: 8,
            type: 'IdentifierReference'
          },
          nodeType: 60,
          operator: '/',
          parent: null,
          right: {
            end: 14,
            id: 4,
            name: 'd',
            nodeType: 88,
            parent: null,
            start: 12,
            type: 'IdentifierReference'
          },
          start: 0,
          type: 'BinaryExpression'
        },
        start: 0,
        type: 'BinaryExpression'
      },
      id: 7,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('!a', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 2,
      expression: {
        end: 2,
        id: 1,
        nodeType: 69,
        operand: {
          end: 2,
          id: 0,
          name: 'a',
          nodeType: 88,
          parent: null,
          start: 1,
          type: 'IdentifierReference'
        },
        operator: '!',
        parent: null,
        start: 0,
        type: 'UnaryExpression'
      },
      id: 2,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('!a', 'recovery.js').leafs[0];
    t.deepEqual(root, {
      end: 2,
      expression: {
        end: 2,
        id: 1,
        nodeType: 69,
        operand: {
          end: 2,
          id: 0,
          name: 'a',
          nodeType: 88,
          parent: null,
          start: 1,
          type: 'IdentifierReference'
        },
        operator: '!',
        parent: null,
        start: 0,
        type: 'UnaryExpression'
      },
      id: 2,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('x\\u{0 foo', 'recovery.js');
    t.deepEqual((root as any).diagnostics, [
      {
        end: 5,
        kind: 2,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      },
      {
        end: 9,
        kind: 2,
        message: "Unexpected token 'identifier'",
        source: 0,
        start: 5
      }
    ]);
    t.deepEqual(root.leafs[0], {
      end: 5,
      expression: {
        end: 5,
        id: 0,
        name: 'x\\u{0',
        nodeType: 88,
        parent: null,
        start: 0,
        type: 'IdentifierReference'
      },
      id: 1,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('\\u{0 foo', 'recovery.js');
    t.deepEqual((root as any).diagnostics, [
      {
        end: 4,
        kind: 2,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      },
      {
        end: 8,
        kind: 2,
        message: "Unexpected token 'identifier'",
        source: 0,
        start: 4
      }
    ]);
    t.deepEqual(root.leafs[0], {
      end: 4,
      expression: {
        end: 4,
        id: 0,
        name: '￿',
        nodeType: 88,
        parent: null,
        start: 0,
        type: 'IdentifierReference'
      },
      id: 1,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a invalid Unicode escape sequence', () => {
    const root = recovery('\\u00088', 'recovery.js');
    t.deepEqual((root as any).diagnostics, [
      {
        end: 6,
        kind: 2,
        message: 'Invalid Unicode escape sequence',
        source: 0,
        start: 0
      },
      {
        end: 7,
        kind: 2,
        message: "Unexpected token 'number'",
        source: 0,
        start: 6
      }
    ]);
    t.deepEqual(root.leafs[0], {
      end: 6,
      expression: {
        end: 6,
        id: 0,
        name: '￿',
        nodeType: 88,
        parent: null,
        start: 0,
        type: 'IdentifierReference'
      },
      id: 1,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse a simple unary expression', () => {
    const root = recovery('x\\u%', 'recovery.js');
    t.deepEqual((root as any).diagnostics, [
      {
        end: 3,
        kind: 2,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      },
      {
        end: 4,
        kind: 2,
        message: 'Unknown token',
        source: 2,
        start: 4
      }
    ]);
    t.deepEqual(root.leafs[0], {
      end: 4,
      expression: {
        end: 4,
        id: 2,
        left: {
          end: 3,
          id: 0,
          name: 'x\\u',
          nodeType: 88,
          parent: null,
          start: 0,
          type: 'IdentifierReference'
        },
        nodeType: 60,
        operator: '%',
        parent: null,
        right: {
          end: 4,
          id: 1,
          nodeType: 6,
          parent: null,
          start: 4,
          type: 'Synthetic',
          value: '##'
        },
        start: 0,
        type: 'BinaryExpression'
      },
      id: 3,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });
});
