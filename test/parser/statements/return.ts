import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Return', () => {
  // Invalid cases
  for (const arg of [
    '() => return',
    'return;return',
    `{return
    foo}`,
    'return foo;',
    'return',
    `return
   /x/`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'function f(){   return   }',
    'function f(){   return;    }',
    'function f(){   return 15;    }',
    '(a, b) => {return}',
    'async foo => {return}',
    'async () => {return}',
    'async function f(){ return; }',
    '(function(){ return })',
    `function f(){
      return
      /x/
    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  it('function x() { return; }', () => {
    t.deepEqual(parseScript('function x() { return; }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x'
          },
          params: { leafs: [], type: 'FormalParameters' },
          contents: {
            type: 'FunctionBody',
            statements: [
              {
                type: 'ReturnStatement',
                expression: null
              }
            ],
            directives: []
          },
          async: false,
          generator: false
        }
      ],
      webCompat: true
    });
  });

  it('function x() { return 1; }', () => {
    t.deepEqual(parseScript('function x() { return 1; }'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'BindingIdentifier',
            name: 'x'
          },
          params: { leafs: [], type: 'FormalParameters' },
          contents: {
            type: 'FunctionBody',
            statements: [
              {
                type: 'ReturnStatement',
                expression: {
                  type: 'NumericLiteral',
                  value: 1
                }
              }
            ],
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
