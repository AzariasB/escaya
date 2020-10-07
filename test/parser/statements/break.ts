import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Statements - Break', () => {
  // Invalid cases
  for (const arg of [
    'continue',
    'continue foo',
    'continue foo;',
    'continue; continue;',
    '() => { switch (x){ case z:       break y   }}',
    '() => { switch (x){ case z:       if (x) break y   }}',
    'for (x of 3) break/',
    'for (x of 3) break/x',
    `x: for(;;) break x
     /y`,
    'for (;;)    if (x) break y   }',
    'function f(){ do        if (x) break y   ; while(true);}',
    'loop1: function a() {}  while (true) { continue loop1; }',
    'loop1: while (true) { loop2: function a() { break loop2; } }',
    'loop1: while (true) { loop2: function a() { break loop1; } }',
    'loop; while (true) { break loop1; }',
    'break\nbreak;',
    //'{ break }',
    'if (x) break',
    '{  break foo; var y=2; }',
    'for (x of 3) break/x/',
    'for (x of 3) break/x/g',
    `for (x of 3) break
     /`,
    'x: foo; break x;',
    'break x;',
    'function f(){ { continue } }',
    'switch (x){ case z: if (x) continue y }',
    '() => { switch (x){ case z: continue y }}',
    '() => { switch (x){ case z:  if (x) continue }}',
    'switch (x){ case z:    if (x) break y   }',
    'switch (x){ case z: { continue } }',

    `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
    `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
    `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break IN_DO_FUNC;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`
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
    'switch (x){ case z:    if (x) break }',
    'switch (x){ case z:    { break }  }',
    `x: for(;;) break x
     /y/`,
    'foo: while (x) break foo',
    'do break; while(foo);',
    'for (x of y) break',
    'while (x) break',
    `a: if (true) b: { break a; break b; } else b: { break a; break b; }`,
    'foo: while (true) if (x) break foo;',
    'function f(){ while (true)       if (x) break   }',
    'L: let\nx',
    'ding: foo: bar: while (true) break foo;',
    'switch (x) { default: break; }',
    'switch (x) { case x: if (foo) break; }',
    'foo: switch (x) { case x: break foo; }',
    'foo: switch (x) { case x: if (foo) {break foo;} }',
    'switch (a) { case 123: { if (a) {} break } }',
    'foo: for (x of y) break foo;',
    'foo: while (true) { if (x) break foo; }',
    'foo: while (true) { break foo; }',
    'foo: while (true) if (x); else break foo;',
    'foo: while (true) if (x) break foo;',
    'foo: while (true) while (x) break foo;',
    'foo: while(true)break foo;',
    'bar: foo: while (true) break foo;',
    'foo: switch (x) { default: break foo; }',
    'foo: switch (x) { case x: if (foo) {break foo;} }',
    'switch (x) { case x: if (foo) break; }',
    'foo: for (;;) break foo'
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

  it('labels and while', () => {
    t.deepStrictEqual(parseScript('foo: do break foo; while(foo);', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
        }
      ],
      start: 0,
      end: 30
    });
  });

  it('with break and no block body', () => {
    t.deepStrictEqual(parseScript('while (x) break', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
    t.deepStrictEqual(parseScript('for (x of y) break', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'ForOfStatement',
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
          await: false,
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    });
  });

  it('do break while', () => {
    t.deepStrictEqual(parseScript('do break; while(foo);', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
    t.deepStrictEqual(parseScript('foo: while (true) { break foo; }', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
        }
      ],
      start: 0,
      end: 32
    });
  });

  it('foo: while (true) if (x); else break foo;', () => {
    t.deepStrictEqual(parseScript('foo: while (true) if (x); else break foo;', { loc: true }), {
      type: 'Script',
      webCompat: true,
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
        }
      ],
      start: 0,
      end: 41
    });
  });
});
