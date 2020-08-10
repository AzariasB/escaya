import * as t from 'assert';
import { parseScript, parseModule, recovery } from '../../../src/escaya';

describe('Expressions - Import meta', () => {
  // Invalid cases
  for (const arg of ['[', '[,', '[] += a']) {
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

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'if (1) { import.meta }',
    'var f = function() {import.meta.couldBeMutable = true}',

    'do { import.meta } while (0)',
    't = [...import.meta]',
    // 'import.meta.url',
    '({m() { do { import.meta } while (0)}})',
    'class C {set x(_) { import.meta.url }}',
    'class C {set x(_) { import.meta[0] }}',
    'function f() { import.meta.couldBeMutable = true }',
    'class C {set x(_) { import.meta() }}',
    '({set x(_) { new import.meta.MagicClass}})',
    '({set x(_) { new import.meta}})',
    '({set x(_) { t = [...import.meta]}})',
    'class C {set x(_) { f = {...import.meta} }}',
    'class C {set x(_) { delete import.meta }}',
    //"'use strict'; import.meta",
    "'use strict'; () => { import.meta }",
    "'use strict'; () => import.meta",
    "'use strict'; if (1) { import.meta }",
    "'use strict'; if (1) {} else { import.meta }",
    "'use strict'; while (0) { import.meta }",
    "'use strict'; do { import.meta } while (0)",
    'class C {m() { import.meta }}',
    'class C {m() { () => { import.meta } }}',
    'class C {m() { () => import.meta }}',
    'class C {m() { if (1) { import.meta } }}',
    'class C {m() { if (1) {} else { import.meta } }}',
    '({m() { do { import.meta } while (0)}})',
    '({m() { import.meta.url}})',
    '({m() { import.meta[0]}})',
    '({m() { import.meta.couldBeMutable = true}})',
    '({m() { import.meta()}})',
    '({m() { new import.meta.MagicClass}})',
    '({m: function() {new import.meta}})',
    '({m: function() {t = [...import.meta]}})',
    '({m: function() {f = {...import.meta}}})',
    '({m: function() {delete import.meta}})',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    'while (0) { import.meta }',
    'do { import.meta } while (0)',
    'var f = function() {import.meta.url}',
    'var f = function() {import.meta[0]}',
    'var f = function() {import.meta.couldBeMutable = true}',
    'var f = function() {import.meta()}',
    'var f = function() {new import.meta.MagicClass}',
    'var f = function() {new import.meta}',
    'var f = function() {t = [...import.meta]}',
    'var f = function() {f = {...import.meta}}',
    'var f = function() {delete import.meta}',
    'f = {...import.meta}',
    '(import.meta([x = (import.meta([x = (x)](x = 123)))](x = 123)))',
    '(import.meta([x = (a??a)](x = 123)))',
    'class C {set x(_) { () => import.meta }}',
    '({m() { if (1) {} else { import.meta }}})',
    '({m() { while (0) { import.meta }}})',
    'function f() { import.meta}',
    '() => { import.meta }',
    't = [...import.meta]'
    /*


       'import.meta[0]',
    'import.meta()',
    'delete import.meta',

    'export var meta = import.meta;',
    'export function getMeta() { return import.meta;}',
    'import.meta.url',
    '(import.meta([x = (a??a)](x = a?.b123)))',
    'import.meta[0]',
    'import.meta[0] = 123',
    'import.meta[0] = 123',
    't = [...import.meta]',
    'export var meta = import.meta;',
    'export function getMeta() { return import.meta;}',

    '(a?.import("string")?.import.meta??(a))',
    'import.meta?.(a?.import("string")?.import.meta??(a))',
    'var a = import.meta;',



    "'use strict'; import.meta.url",
    "'use strict'; import.meta[0]",
    "'use strict'; import.meta.couldBeMutable = true",
    "'use strict'; import.meta()",
    "'use strict'; new import.meta.MagicClass",
    "'use strict'; new import.meta",
    "'use strict'; t = [...import.meta]",
    "'use strict'; f = {...import.meta}",
    '(import.meta?.a)',
    '(a?.import.meta)',
    "'use strict'; delete import.meta",

    'class C {m() { while (0) { import.meta } }}',

    '({set x(_) {import.meta}})',
    "'use strict'; ({m: function() { while (0) { import.meta }}})",
    'function f() { do { import.meta } while (0)}',

    'delete import.meta',
    'import.meta',

    'import.meta.url',
    'import.meta[0]()',
    'import.meta[0](x = 123) ',
    'import.meta([0](x = 123))',
    '(import.meta([0](x = 123)))',

    'import.meta;',
    'import.meta.couldBeMutable = true',
    '(import.meta.couldBeMutable = true)',
    'import.meta()',
    'new import.meta.MagicClass',
    'new import.meta',
    'import.meta.resolve("something")',
    'const size = import.meta.scriptElement.dataset.size || 300;',
    'x = import.meta',

    */
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true });
      });
    });
  }
});
