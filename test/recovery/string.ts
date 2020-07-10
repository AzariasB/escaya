import * as t from 'assert';
import { recovery } from '../../src/escaya';

describe('Recovery - String literal', () => {
  it('invalid u after Unicode \\u{', () => {
    const root = recovery('"x\\u}"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 4,
        kind: 2,
        code: 74,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      }
    ]);
    t.deepEqual(root.directives, ['"x\\u}"']);
  });

  it('invalid { after Unicode \\ua1111111', () => {
    const root = recovery('x = "x\\ua{ foo"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 9,
        kind: 2,
        code: 74,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 3
      }
    ]);
    t.deepEqual(root.leafs[0], {
      contextFlags: 128,
      end: 15,
      expression: {
        contextFlags: 128,
        end: 15,
        id: 2,
        left: {
          contextFlags: 65664,
          end: 1,
          id: 0,
          mutualFlags: 0,
          name: 'x',
          nodeType: 88,
          parent: null,
          start: 0,
          type: 'IdentifierReference'
        },
        mutualFlags: 0,
        nodeType: 47,
        operator: '=',
        parent: null,
        right: {
          contextFlags: 128,
          end: 15,
          id: 1,
          mutualFlags: 0,
          nodeType: 77,
          parent: null,
          start: 3,
          type: 'StringLiteral',
          value: 'x{ foo'
        },
        start: 0,
        type: 'AssignmentExpression'
      },
      id: 3,
      mutualFlags: 0,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('invalid unclosed string', () => {
    const root = recovery('"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 2,
        kind: 2,
        code: 35,
        message: 'Unterminated string literal',
        source: 0,
        start: 0
      }
    ]);
    t.deepEqual(root.directives, ['"']);
  });

  it('invalid unclosed string assignment', () => {
    const root = recovery('x = "', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 6,
        kind: 2,
        code: 35,
        message: 'Unterminated string literal',
        source: 0,
        start: 3
      }
    ]);
    t.deepEqual(root.leafs[0], {
      contextFlags: 128,
      end: 6,
      expression: {
        contextFlags: 128,
        end: 6,
        id: 2,
        left: {
          contextFlags: 65664,
          end: 1,
          id: 0,
          mutualFlags: 0,
          name: 'x',
          nodeType: 88,
          parent: null,
          start: 0,
          type: 'IdentifierReference'
        },
        mutualFlags: 0,
        nodeType: 47,
        operator: '=',
        parent: null,
        right: {
          contextFlags: 128,
          end: 6,
          id: 1,
          mutualFlags: 0,
          nodeType: 77,
          parent: null,
          start: 3,
          type: 'StringLiteral',
          value: ''
        },
        start: 0,
        type: 'AssignmentExpression'
      },
      id: 3,
      mutualFlags: 0,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });

  it('Should parse invalid string as directive33', () => {
    const root = recovery('"\\u{g0}"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 4,
        kind: 2,
        code: 74,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      }
    ]);
    t.deepEqual(root.directives, ['"\\u{g0}"']);
  });

  it('Should parse invalid string as directive11', () => {
    const root = recovery('"\\u{g0}"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 4,
        kind: 2,
        code: 74,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 0
      }
    ]);
    t.deepEqual(root.directives, ['"\\u{g0}"']);
  });

  it('Should parse invalid string as directive3', () => {
    const root = recovery('x = "\\u{g0}"', 'recovery.js');
    t.deepEqual(root.diagnostics, [
      {
        end: 8,
        kind: 2,
        code: 74,
        message: 'Invalid hexadecimal escape sequence',
        source: 0,
        start: 3
      }
    ]);

    t.deepEqual(root.leafs[0], {
      contextFlags: 128,
      end: 12,
      expression: {
        contextFlags: 128,
        end: 12,
        id: 2,
        left: {
          contextFlags: 65664,
          end: 1,
          id: 0,
          mutualFlags: 0,
          name: 'x',
          nodeType: 88,
          parent: null,
          start: 0,
          type: 'IdentifierReference'
        },
        mutualFlags: 0,
        nodeType: 47,
        operator: '=',
        parent: null,
        right: {
          contextFlags: 128,
          end: 12,
          id: 1,
          mutualFlags: 0,
          nodeType: 77,
          parent: null,
          start: 3,
          type: 'StringLiteral',
          value: 'g0}'
        },
        start: 0,
        type: 'AssignmentExpression'
      },
      id: 3,
      mutualFlags: 0,
      nodeType: 4,
      parent: null,
      start: 0,
      type: 'ExpressionStatement'
    });
  });
});
