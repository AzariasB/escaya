import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Numbers', () => {
  it('0b1__2', () => {
    t.deepEqual(recovery('0b1__2', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 0,
            end: 5,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',

            value: 2,
            start: 5,
            end: 6,
            kind: 10,
            flags: 0
          },
          start: 5,
          end: 6,
          kind: 122,
          flags: 0
        }
      ],
      text: '0b1__2',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Multiple consecutive numeric separators are not permitted',
          code: 69,
          start: 3,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`;` expected',
          code: 92,
          start: 5,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 6,
      end: 6
    });
  });

  it('0b_', () => {
    t.deepEqual(recovery('0b_', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 70,
          kind: 2,
          length: 2,
          message: 'Numeric separators are not allowed at the end of numeric literals',
          source: 0,
          start: 2
        }
      ],
      directives: [],
      end: 3,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 3,
          expression: {
            end: 3,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',

            value: 0
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 3,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '0b_'
    });
  });

  it('1a', () => {
    t.deepEqual(recovery('1a', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 0,
            end: 1,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 1,
          kind: 122,
          flags: 0
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'a',
            start: 1,
            end: 2,
            kind: 13,
            flags: 0
          },
          start: 1,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '1a',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'An identifier or keyword cannot immediately follow a numeric literal',
          code: 58,
          start: 1,
          length: 0
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('1e', () => {
    t.deepEqual(recovery('1e', 'recovery.js'), {
      kind: 209,
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 0,
            end: 3,
            kind: 10,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '1e',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 0,
          message: 'Non-number after exponent indicator',
          code: 59,
          start: 2,
          length: 0
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('1e!', () => {
    t.deepEqual(recovery('1e!', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 59,
          kind: 2,
          length: 0,
          message: 'Non-number after exponent indicator',
          source: 0,
          start: 2
        }
      ],
      directives: [],
      end: 3,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 3,
          expression: {
            end: 3,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',

            value: 1
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 3,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '1e!'
    });
  });

  it('1e€', () => {
    t.deepEqual(recovery('1e€', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 59,
          kind: 2,
          length: 0,
          message: 'Non-number after exponent indicator',
          source: 0,
          start: 2
        }
      ],
      directives: [],
      end: 3,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 3,
          expression: {
            end: 3,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',

            value: 1
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 3,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '1e€'
    });
  });

  it('0b', () => {
    t.deepEqual(recovery('0b', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 62,
          kind: 2,
          length: 1,
          message: 'Binary integer literal like sequence without any digits',
          source: 0,
          start: 1
        }
      ],
      directives: [],
      end: 2,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 2,
          expression: {
            end: 2,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',

            value: 0
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 2,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '0b'
    });
  });

  it('0b0017', () => {
    t.deepEqual(recovery('0b0017', 'recovery.js'), {
      children: [],
      context: 0,
      diagnostics: [
        {
          code: 65,
          kind: 2,
          length: 1,
          message: 'Binary integer literal like sequence containing an invalid digit',
          source: 0,
          start: 5
        }
      ],
      directives: [],
      end: 6,
      fileName: 'recovery.js',
      incremental: false,
      detached: false,
      kind: 209,
      webCompat: true,
      leafs: [
        {
          end: 6,
          expression: {
            end: 6,
            flags: 0,
            kind: 10,
            start: 0,
            type: 'NumericLiteral',

            value: 1
          },
          flags: 0,
          kind: 122,
          start: 0,
          type: 'ExpressionStatement'
        }
      ],
      length: 6,
      mutualFlags: 0,
      parent: null,
      start: 0,
      text: '0b0017'
    });
  });
  /*
  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });

  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });

  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });

  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });

  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });

  it('x\\u foo', () => {
    t.deepEqual(recovery('x\\u foo', 'recovery.js'), {
    });
  });


  */
});
