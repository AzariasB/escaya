import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Do', () => {
  // Invalid cases
  for (const arg of [
    'do foo while (bar);',
    'do async \n f(){}; while (y)',
    'do async \n () => x; while(y)',
    'do let x = 1; while (false)',
    'do{};while()',
    'do/("while',
    'do let {} = y',
    'do debugger while(x) x',
    'do\nx;while',
    'do\n/x/g while',
    'do\nwhile',
    'do while',
    'do catch while',
    'do let {} = y',
    'do {} while (',
    'do x, y while (z)',
    'do label: function f(){} while (0)',
    'do label: function f(){} while (0);',
    'do debugger while(x) x',
    'do class X {}; while (x);',
    'do;while(0)return',
    'do x: function s(){}while(y)',
    'do foo while (bar);',
    'do async \n f(){}; while (y)',
    'do let x = 1; while (false)',
    'do async \n f(){}; while (y)',
    'do x, y while (z)',
    'do foo while (bar);',
    'do ()=>x while(c)',
    'do(x) { case y: {...x} } while',
    'do(x) { case y: foo /a/ while }',
    'do(x) { case y:{ class { x() {} } while }}',
    'do({x=y}) { case y: [...a]  while}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bitwise masks
  for (const arg of [
    'do x(); while (true);',
    `do { var [[foo]=[42]] = [] } while (j)`,
    '{ do { } while (false) false }',
    'do x();while (true)',
    'do {} while(x) x',
    'do x=>{}; while(y)',
    'do x, y; while (z)',
    'do debugger; while(x) x',
    'do if (x) {} while(x) x',
    'do switch(x){} while(x) x',
    'do try {} catch {} while(x) x',
    'do ; while (x) y',
    'do ; while(x) \n /foo/',
    'do try {} catch {} while(x) x',
    '{ do { } while (false) false }',
    'do if(8)function s(){}while(y)',
    'do foo; while (bar);',
    'do;while(x)y',
    'do;while(j)try{}finally{}',
    'do ; while(x) \n /foo/',
    `do\n for((function(){});;)x \n while(x);`,
    `do; while(x)\n /x/g`,
    'do { let foo; [[foo]=[42]] = [] } while (j)',
    'do { [[foo]=[42]] = [] } while (j)',
    'do { [foo] = [j] } while (j)',
    'do { var [foo] = [j] } while (j)',
    'do async \n () \n while (y)',
    'do while (x) continue \n while (x);',
    `do if(x=>{});else n
    while(y)`,
    `do
    if(x=>{});
  while(y)`,
    `do
  for((function(){});;)x
while(x);`,
    `do x
    while ({ [y]: {} ? null : false  })`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('do if (x) {} while(x) x', () => {
    t.deepStrictEqual(parseScript('do if (x) {} while(x) x', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 19,
            end: 20
          },
          statement: {
            type: 'IfStatement',
            expression: {
              type: 'IdentifierReference',

              name: 'x',
              start: 7,
              end: 8
            },
            consequent: {
              type: 'BlockStatement',
              leafs: [],
              start: 10,
              end: 12
            },
            alternate: null,
            start: 3,
            end: 12
          },
          start: 0,
          end: 21
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'IdentifierReference',

            name: 'x',
            start: 22,
            end: 23
          },
          start: 22,
          end: 23
        }
      ],
      start: 0,
      end: 23
    });
  });

  it('do; while (1)', () => {
    t.deepStrictEqual(parseScript('do; while (1)', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'DoWhileStatement',
          expression: {
            type: 'NumericLiteral',

            value: 1,
            start: 11,
            end: 12
          },
          statement: {
            type: 'EmptyStatement',
            start: 2,
            end: 3
          },
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });

  it('do async \n while (y)', () => {
    t.deepStrictEqual(parseScript('do async \n while (y)', { loc: true }), {
      directives: [],
      end: 20,
      start: 0,
      leafs: [
        {
          end: 20,
          expression: {
            end: 19,

            start: 18,
            type: 'IdentifierReference',
            name: 'y'
          },
          start: 0,
          statement: {
            end: 8,
            expression: {
              end: 8,

              start: 3,
              type: 'IdentifierReference',
              name: 'async'
            },
            start: 3,
            type: 'ExpressionStatement'
          },
          type: 'DoWhileStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
