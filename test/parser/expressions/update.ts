import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Expressions - Update', () => {
  // Invalid cases
  for (const arg of [
    // 12.4.1 - It is an early Reference Error if IsValidSimpleAssignmentTarget of LeftHandSideExpression is false.
    '0++',
    '0--',
    // 12.5.1 - It is an early Reference Error if IsValidSimpleAssignmentTarget of UnaryExpression is false.
    '++0',
    '--0',
    '(}.x++)',
    '(this x++)',
    'this x++',
    'let x = ( => a++;',
    'let x = ( => a++;',
    'let x = ( => a++;',
    'let x != ( => a++ !;',
    'let x = -/ => a++;',
    'let x = ( ++=> a++;',
    '++€',
    '€++',
    '++€--',
    '+]+[',
    '++while',
    '++break',
    '++wfor(a',
    '++{while',
    '++!{while',
    'foo[bar]()++;',
    'this()++;',
    'this.foo()++;',
    'this[foo].bar()++;',
    'this.foo[foo].bar(this)(bar)[foo]()++;',
    'this++;',
    '{x: 1}++;',
    'new new foo()[bar]++;',
    'new new foo().bar++;',
    '2++;',
    'function f(){ return ++; }',
    '(x++;',
    '((x)))++;'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    '({}.x++)',
    '[].x++',
    '(this.x++)',
    'this.x++',
    'let x = () => a++;',
    'a++',
    'function f(){ return a++; }',
    '(x)++;',
    '(((x)))++;',
    'if (a) a++;',
    '++{}.foo',
    '++arguments;',
    'eval++;',
    '++/b/.c',
    '++\nfoo;',
    'foo\n++bar',
    '++\nfoo;',
    'let++;',
    '+a++ / 1',
    'a=b\n++c',
    'a,b\n++c',
    'a++\nb',
    'a\n++\nb',
    'a.a--',
    '++a.a',
    'foo\n++bar',
    '--a.a',
    'bar++',
    '++this.x',
    '(this.x++)',
    '++(x);',
    '(x)++;',
    'a\n++b',
    'foo()[bar]++;',
    '++\na',
    'a = ++a',
    'y = x--',
    'typeof a++',
    'typeof ++a',
    `new b
    ++c;`,
    `() => b
    ++c;`,
    `while (true) {b
      ++c};`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('++a.a', () => {
    t.deepStrictEqual(parseScript('++a.a', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PrefixUpdateExpression',
            operator: '++',
            operand: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'a',
                start: 2,
                end: 3
              },
              expression: {
                type: 'IdentifierName',
                name: 'a',
                start: 4,
                end: 5
              },
              computed: false,
              start: 2,
              end: 5
            },
            start: 0,
            end: 5
          },
          start: 0,
          end: 5
        }
      ],
      start: 0,
      end: 5
    });
  });

  it('bar++', () => {
    t.deepStrictEqual(parseScript('bar++', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'PostfixUpdateExpression',
            operator: '++',
            operand: {
              type: 'IdentifierReference',
              name: 'bar',
              start: 0,
              end: 3
            },
            start: 3,
            end: 5
          },
          start: 0,
          end: 5
        }
      ],
      start: 0,
      end: 5
    });
  });
});
