import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Statements - Continue', () => {
  // Invalid cases
  for (const arg of [
    'continue',
    'continue foo',
    'continue foo;',
    'continue; continue;',
    '() => { { continue } }',
    '() => continue',
    '() => { if (x) continue y }',
    '() => { if (x) continue }',
    '() => { continue }',
    'function f(){ { continue } }',
    'function f(){ continue y }',
    'function f(){ if (x) continue }',
    'if (x) continue',
    'function f(){ { continue } }',
    'function f(){ { continue } }',
    'switch (x){ case z: if (x) continue y }',
    '() => { switch (x){ case z: continue y }}',
    '() => { for (;;)       continue y   }',
    '() => { do continue y ; while(true);}',
    '() => { switch (x){ case z:  if (x) continue }}',
    'function f(){ do if (x) continue y ; while(true);}',
    '() => { do if (x) continue y ; while(true);}',
    'do if (x) continue y ; while(true);',
    'function f(){ while (true) continue y }',
    'switch (x){ case z: { continue } }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`, { disableWebCompat: true });
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`, { loc: true });
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
    'label: for (;;) continue label \n /foo/',
    'label: for (;;) continue label \n /foo/y',
    'function f(){ while (true) continue }',
    '() => { do { continue } while(true);}',
    '() => { do continue ; while(true);}',
    'for (;;)    if (x) continue',
    'for (;;)    { continue }',
    'foo: bar: do continue foo; while(z)',
    '() => { for (;;)       continue    }',
    'function f(){ for (;;)       { continue }    }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('foo: bar: do continue foo; while(z)', () => {
    t.deepEqual(parseScript('foo: bar: do continue foo; while(z)', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LabelledStatement',
          label: {
            type: 'LabelIdentifier',
            name: 'foo',
            start: 0,
            end: 4
          },
          labelledItem: {
            type: 'LabelledStatement',
            label: {
              type: 'LabelIdentifier',
              name: 'bar',
              start: 5,
              end: 9
            },
            labelledItem: {
              type: 'DoWhileStatement',
              expression: {
                type: 'IdentifierReference',
                name: 'z',
                start: 33,
                end: 34
              },
              statement: {
                type: 'ContinueStatement',
                label: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 22,
                  end: 25
                },
                start: 13,
                end: 26
              },
              start: 10,
              end: 35
            },
            start: 5,
            end: 35
          },
          start: 0,
          end: 35
        }
      ],
      start: 0,
      end: 35
    });
  });

  it('while (true) { x: while (true) continue x; }', () => {
    t.deepEqual(parseScript('while (true) { x: while (true) continue x; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
            start: 7,
            end: 11
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'LabelledStatement',
                label: {
                  type: 'LabelIdentifier',
                  name: 'x',
                  start: 15,
                  end: 17
                },
                labelledItem: {
                  type: 'WhileStatement',
                  expression: {
                    type: 'BooleanLiteral',
                    value: true,
                    start: 25,
                    end: 29
                  },
                  statement: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'IdentifierReference',
                      name: 'x',
                      start: 40,
                      end: 41
                    },
                    start: 31,
                    end: 42
                  },
                  start: 18,
                  end: 42
                },
                start: 15,
                end: 42
              }
            ],
            start: 13,
            end: 44
          },
          start: 0,
          end: 44
        }
      ],
      start: 0,
      end: 44
    });
  });
});
