import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Declarations - Async generator', () => {
  // Invalid cases
  for (const arg of ['async function* f([...{ x }, y]) {}']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'async function* f([[] = function() {}()]) { }',
    'async function* f([[x]]) {  }',
    'var gen = async function *() { yield { ...yield, y: 1, ...yield yield, }; };',
    'async function* f([arrow = () => {}]) {  }',
    'async function* f([fn = function () {}, xFn = function x() {}]) {  }',
    'async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {  }',
    'async function* f([{ x }]) {  }',
    'async function * gen() { await (yield 10) }',
    'async function * gen() { yield await 10; return }',
    'async function * gen() { yield await 10; return; }',
    'async function * gen() { yield await 10; return 10 }',
    'async function * gen() { await /* comment */ 10 }',
    'async function * gen() { await // comment\n 10 }',
    'async function * gen() { yield await /* comment\n */ 10 }',
    'async function * gen() { yield await // comment\n 10 }',
    'async function * gen() { await (yield /* comment */) }',
    'async function * gen() { await (yield /* comment */) }',
    'async function * gen() { for await (x of xs); }',
    'async function * gen() { await a; yield b; }',
    'async function * gen() { class A { async f() { for await (x of xs); } } }',
    'async function * gen() { (yield) \n ? yield : yield }',
    'async function * gen() { (yield) ? yield : yield }',
    'async function * gen() { yield; yield; yield; yield; }',
    'async function * gen() { yield; yield }',
    'async function * gen() { yield // comment\n\r\f }',
    'async function * gen() { yield // comment\n }',
    'async function * gen() { yield /* comment */ }',
    'async function * gen() { yield\n }',
    'async function * gen() { ({ [await 1]: x } = { }) }',
    'async function * gen() { ({ [yield]: x } = { }) }',
    'async function * gen() { ({ get await() { } }) }',
    'async function * gen() { yield * 1; return 3; yield * "foo"; }',
    'async function * gen() { yield { yield: 12 } }',
    'async function * gen() { (yield * 3) + (yield * 4); }',
    'async function * gen() { yield * 3 + (yield * 4); }',
    'async function * gen() { yield * \t 2; }',
    'async function * gen() { yield * \n\f\r 2; }',
    'async function * gen() { yield * \f\n\r 2; }',
    'async function * gen() { yield yield 1; }',
    'async function * gen() { yield * yield * 1; }',
    'async function * gen() { yield 3 + (yield 4) + 4; }',
    'async function* f([ , , ...x]) {  }',
    'async function* f([arrow = () => {}] = []) {}',
    'async function* f([[x]] = [null]) {}',
    'async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
    'async function* f({ fn = function () {}, xFn = function x() {} } = {}) {}',
    'async function* f({ x: y = 33 } = { }) {}',
    'async function* f({ x: y }) {}',
    'async function* f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
    'async function* f({...x}) {}',
    'async function* x() {}',
    '(async function*() {})',
    'var gen = { async *method() {} }',
    'async function* f({a, b, ...rest}) {}',
    'async function* f() { await a; yield b; }',
    'f = async function*() { await a; yield b; }',
    'obj = { async* f() { await a; yield b; } }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('Array in object', () => {
    t.deepEqual(parseScript('function fk({x: [a, {b: []}]}) {}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'fk'
          },
          params: {
            type: 'FormalParameters',
            leafs: [
              {
                type: 'BindingElement',
                binding: {
                  type: 'ObjectBindingPattern',
                  properties: [
                    {
                      type: 'PropertyName',
                      key: {
                        type: 'BindingIdentifier',
                        name: 'x'
                      },
                      value: {
                        type: 'ArrayBindingPattern',
                        leafs: [
                          {
                            type: 'BindingIdentifier',
                            name: 'a'
                          },
                          {
                            type: 'ObjectBindingPattern',
                            properties: [
                              {
                                type: 'PropertyName',
                                key: {
                                  type: 'BindingIdentifier',
                                  name: 'b'
                                },
                                value: {
                                  type: 'ArrayBindingPattern',
                                  leafs: []
                                },
                                computed: false
                              }
                            ]
                          }
                        ]
                      },
                      computed: false
                    }
                  ]
                },
                initializer: null
              }
            ]
          },
          contents: {
            type: 'FunctionBody',
            statements: [],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });

  it('Double identifier in array sans default', () => {
    t.deepEqual(parseScript('function f([foo,bar=b]){}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'f'
          },
          params: {
            type: 'FormalParameters',
            leafs: [
              {
                type: 'BindingElement',
                binding: {
                  type: 'ArrayBindingPattern',
                  leafs: [
                    {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'BindingIdentifier',
                        name: 'b'
                      }
                    }
                  ]
                },
                initializer: null
              }
            ]
          },
          contents: {
            type: 'FunctionBody',
            statements: [],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });
});
