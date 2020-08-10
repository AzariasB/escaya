import * as t from 'assert';
import { parseScript, recovery, parseModule } from '../../../src/escaya';

describe('leafs - For await of', () => {
  // Invalid cases
  for (const arg of [
    'do/("while',
    'do\nx;while',
    'do\n/x/g while',
    'do\nwhile',
    'do while',
    'do catch while',
    'do let {} = y',
    // 'do debugger while(x) x',
    // 'do x: function s(){}while(y)',
    // 'do foo while (bar);',
    'do async \n f(){}; while (y)',
    'do let x = 1; while (false)',
    'do async \n f(){}; while (y)',
    // 'do x, y while (z)',
    //'do foo while (bar);',
    //'do ()=>x while(c)',
    'do(x) { case y: {...x} } while',
    'do(x) { case y: foo /a/ while }',
    'do(x) { case y:{ class { x() {} } while }}',
    'do({x=y}) { case y: [...a]  while}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
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
    'async function f() { for await (a of []) ; }',
    'async function f() { for await (a.b of []) ; }',
    'async function f() { for await ([a] of []) ; }',
    'async function f() { for await ([a = 1] of []) ; }',
    'async function f() { for await ([a = 1, ...b] of []) ; }',
    'async function f() { for await ({a} of []) ; }',
    'async function f() { for\nawait ({a: a} of []) { } }',
    'async function f() { for\nawait ({"a": a} of []) { } }',
    'async function f() { for\nawait ({[Symbol.iterator]: a} of []) { } }',
    'async function f() { for\nawait ({0: a} of []) { } }',
    'async function f() { for\nawait ({a = 1} of []) ; }',
    'async function f() { for\nawait ({a: a = 1} of []) ; }',
    'async function f() { for\nawait ({[Symbol.iterator]: a = 1} of []) ; }',
    'async function f() { for\nawait ({0: a = 1} of []) ; }',
    'async function f() { for\nawait (var [a] of []) ; }',
    'async function f() { for\nawait (var {a: a = 1} of []) ; }',
    'async function f() { for\nawait (var {a} of []) ; }',
    'async function f() { for\nawait (var [a = 1, ...b] of []) ; }',
    'async function f() { for\nawait (var [a] of []) ; }',
    'async function f() { "use strict"; for\nawait (var [a = 1, ...b] of []) ; }',
    'async function f() { "use strict"; for\nawait (var {a} of []) ; }',
    'async function f() { "use strict"; for\nawait (var {a: a} of []) ; }',
    'async function f() { "use strict"; for\nawait (let {a: a} of []) ; }',
    'async function f() { "use strict"; for\nawait (let {[Symbol.iterator]: a} of []) ; }',
    'async function f() { for await\n(let [a = 1, ...b] of []) { } }',
    'async function f() { for await\n(let a of []) { } }',
    'async function f() { for await\n(const [a = 1, ...b] of []) { } }',
    'async function f() { for await\n(const {a: a} of []) { } }',
    'async function * f() { for await\n(const {a = 1} of []) { } }',
    'async function * f() { for await\n(var [a = 1, ...b] of []) { } }',
    'async function * f() { for await\n({[Symbol.iterator]: a = 1} of []) { } }',
    'async function f() { "use strict"; for await\n(const {a: a = 1} of []) ; }',
    'async function f() { "use strict"; for await\n(const {a: a} of []) ; }',
    'async function f() { "use strict"; for await\n(const [a = 1, ...b] of []) ; }',
    'async function f() { "use strict"; for await\n(const [a = 1] of []) { } }',
    'async function *f() { "use strict"; for await\n(let {0: a = 1} of []) { } }',
    'async function *f() { "use strict"; for await\n(let [a] of []) { } }',
    'async function *f() { "use strict"; for await\n([a = 1] of []) { } }'
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

  it('simple block', () => {
    t.deepEqual(parseScript('{}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [],
          start: 0,
          end: 2
        }
      ],
      start: 0,
      end: 2
    });
  });

  it('block with lexical', () => {
    t.deepEqual(parseScript('{let foo = bar;}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'BlockStatement',
          leafs: [
            {
              type: 'LexicalDeclaration',
              isConst: false,
              declarations: [
                {
                  type: 'LexicalBinding',
                  binding: {
                    type: 'BindingIdentifier',
                    name: 'foo',
                    start: 5,
                    end: 8
                  },
                  initializer: {
                    type: 'IdentifierReference',

                    name: 'bar',
                    start: 11,
                    end: 14
                  },
                  start: 5,
                  end: 14
                }
              ],
              start: 1,
              end: 15
            }
          ],
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('block wrapped in paren', () => {
    t.deepEqual(parseScript('({})'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 3
            },
            start: 0,
            end: 4
          },
          start: 0,
          end: 4
        }
      ],
      start: 0,
      end: 4
    });
  });

  it('with ; separation', () => {
    t.deepEqual(parseScript('{};{};;;;{};'), {
      directives: [],
      end: 12,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 3,
          start: 2,
          type: 'EmptyStatement'
        },
        {
          end: 5,
          start: 3,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 5,
          type: 'EmptyStatement'
        },
        {
          end: 7,
          start: 6,
          type: 'EmptyStatement'
        },
        {
          end: 8,
          start: 7,
          type: 'EmptyStatement'
        },
        {
          end: 9,
          start: 8,
          type: 'EmptyStatement'
        },
        {
          end: 11,
          start: 9,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 12,
          start: 11,
          type: 'EmptyStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('same level', () => {
    t.deepEqual(parseScript('{}{}{}'), {
      directives: [],
      end: 6,
      start: 0,
      leafs: [
        {
          end: 2,
          start: 0,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 4,
          start: 2,
          leafs: [],
          type: 'BlockStatement'
        },
        {
          end: 6,
          start: 4,
          leafs: [],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });

  it('nested', () => {
    t.deepEqual(parseScript('{{}}'), {
      directives: [],
      end: 4,
      start: 0,
      leafs: [
        {
          end: 4,
          start: 0,
          leafs: [
            {
              end: 3,
              start: 1,
              leafs: [],
              type: 'BlockStatement'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      type: 'Script'
    });
  });
});
