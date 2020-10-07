import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - With', () => {
  // Invalid cases
  for (const arg of [
    'with (x',
    'with/("',
    'with\nx;',
    'with\n/x/g',
    'with\n',
    'with',
    'with(',
    'with(x',
    'with(x=',
    'with(x=y',
    'with(x=(y',
    'with(x =/y) {}',
    'with(x=(y) {}',
    'with(x=}',
    'with(x=( {',
    'with(x}',
    'with(x{',
    'with(x=y/',
    'with catch',
    'with({}) async function f(){};',
    'with(0) label: function f(){}',
    // Lexical declaration cannot appear in a single-statement context
    'with ({}) let [a] = [42];',
    // Lexical declaration cannot appear in a single-statement context
    'with ({}) let {a: x} = {a: 42};',
    // Lexical declaration cannot appear in a single-statement context
    'with ({}) let a = [];',
    `with ({}) let [a] = [42];`,
    // In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement
    'with(1) b: function a(){}',
    'with ({}) async function f() {}',
    'with(1) function a(){}',
    'with((x,y)=z) {}',
    'with(x) { case y: {...x} }',
    'with(x) { case y: foo /a/ }',
    'with(x) { case y:{ class { x() {} } }}',
    'with({x=y}) { case y: [...a] }',
    'with(x) /* comment */ { case y: foo }',
    'with(x) function * f() {}',
    'with(x) async function f() {}',
    'with(x) { case y: {x} }',
    'with(x) { case y: x = {...x} }',
    'with(x) { case y: foo / bar ? 1 : (x) }',
    'with(x) { case y: foo / bar ? 1 : (x) => {}}',
    'with(x=)=y) {}'
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

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'with(x=y) {}',
    'with(x=(y)) {}',
    'with(x=y/y) {}',
    'with(1..b) {}',
    'with("string") {}',
    'with((x=(y,i,o...y))) {}',
    'with(true) /a/',
    'with({}) {}',
    'with([x=y]) {}',
    'with([x=y/(x)]) {}',
    'with({...b/c}) {}',
    'with(x=y) {}',
    'with ({}) { }',
    'with(x=y) { function a() {} }'
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

  it('with ({}) let', () => {
    t.deepStrictEqual(parseScript('with ({}) let', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: [],
            start: 6,
            end: 8
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'let',
              start: 10,
              end: 13
            },
            start: 10,
            end: 13
          },
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });

  it('with (x) { foo }', () => {
    t.deepStrictEqual(parseScript('with (x) { foo }', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 6,
            end: 7
          },
          statement: {
            type: 'BlockStatement',
            leafs: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'IdentifierReference',
                  name: 'foo',
                  start: 11,
                  end: 14
                },
                start: 11,
                end: 14
              }
            ],
            start: 9,
            end: 16
          },
          start: 0,
          end: 16
        }
      ],
      start: 0,
      end: 16
    });
  });

  it('with (x) foo;', () => {
    t.deepStrictEqual(parseScript('with (x) foo;', { loc: true }), {
      type: 'Script',
      webCompat: true,
      directives: [],
      leafs: [
        {
          type: 'WithStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 6,
            end: 7
          },
          statement: {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'foo',
              start: 9,
              end: 12
            },
            start: 9,
            end: 13
          },
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });
});
