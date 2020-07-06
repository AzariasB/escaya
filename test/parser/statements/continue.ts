import * as t from 'assert';
import { parseScript } from '../../../src/escaya';

describe('Statements - Continue', () => {
  // Invalid cases
  for (const arg of [
    'continue',
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

  it('while({}){continue;}', () => {
    t.deepEqual(parseScript('while({}){continue;}'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'WhileStatement',
          expression: {
            type: 'ObjectLiteral',
            properties: []
          },
          statement: {
            type: 'BlockStatement',
            statements: [
              {
                type: 'ContinueStatement',
                label: null
              }
            ]
          }
        }
      ],
      webCompat: true
    });
  });
});
