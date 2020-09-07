import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Misc - Strict', () => {
  for (const arg of [
    '+implements;',
    '+interface;',
    '+let;',
    '+package;',
    '+yield;',
    'static:0;',
    'yield:0;',
    'public:0;',
    'function a([yield,...a]){}',
    'function a([yield]){}',
    '([let]) => {}',
    'with(0);',
    'function f(a, a){}',
    'label: function f(){}',
    'if (0) function f(){}',
    'if (0) function f(){} else;',
    'if (0); else function f(){}'
    // 'delete a;',
    // 'delete (a);',
    // 'delete ((a));',
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseModule(`"use strict"; ${arg}`);
      });
    });
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`"use strict"; ${arg}`, 'recovery.js');
      });
    });
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`"use strict"; ${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
