import * as t from 'assert';
import { parseModule } from '../../../src/escaya';

describe('Expressions - Import meta', () => {
  // Invalid cases
  for (const arg of [
    `import?.meta`,
    `import?.meta`,
    `(import?.meta)`,
    `(import.meta([1 = ()](x = 123)))`,
    `import.(meta([0](x = 123)))`,
    `import.meta[0]() = 123`,
    `[import.meta] = [];`,
    `[...import.meta] = [];`,
    `import.meta = 0;`,
    `async function* f() { for await (import.meta of null) ; }`,
    `for (import.meta in null) ;`,
    `({a: import.meta} = {});`,
    `({...import.meta} = {});`,
    // `import.meta++;`,
    `var x, y, z; ( { import.meta } = {});`,
    `([import.meta] = [1])`,
    `var import.meta`,
    `for (var import.meta of [1]) {}`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  // Valid cases
  for (const arg of [
    'if (1) { import.meta }',
    'var f = function() {import.meta.couldBeMutable = true}',
    'import.meta[0]',
    'do { import.meta } while (0)',
    'import.meta()',
    //'"use strict"; ({m() { while (0) { import.meta } }})',
    'delete import.meta',
    'import.meta.resolve("something")',
    'const size = import.meta.scriptElement.dataset.size || 300;',
    'x = import.meta',
    '() => { import.meta }',
    't = [...import.meta]'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
  }
});
