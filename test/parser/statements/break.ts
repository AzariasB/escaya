import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Statements - Break', () => {
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
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
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('while({}){break;}', () => {
    t.deepEqual(parseScript('while({}){break;}'), {
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
                type: 'BreakStatement',
                label: null
              }
            ]
          }
        }
      ],
      webCompat: true
    });
  });

  it('loop: while({}){break;}', () => {
    t.deepEqual(parseScript('loop: while({}){break loop;}'), {
      directives: [],
      leafs: [
        {
          label: {
            name: 'loop',
            type: 'LabelIdentifier'
          },
          labelledItem: {
            expression: {
              properties: [],
              type: 'ObjectLiteral'
            },
            statement: {
              statements: [
                {
                  label: {
                    name: 'loop',
                    type: 'LabelIdentifier'
                  },
                  type: 'BreakStatement'
                }
              ],
              type: 'BlockStatement'
            },
            type: 'WhileStatement'
          },
          type: 'LabelledStatement'
        }
      ],
      type: 'Script',
      webCompat: true
    });
  });
});
