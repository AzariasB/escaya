import { parseModule } from './escaya';

export * from './common';
export * from './constants';
export * from './core';
export * from './escaya';
export * from './parser';
export * from './types';

const test = parseModule('voila');
const leaf = test.leafs[0];

if (leaf.type === 'ClassDeclaration') {
  leaf.heritage;
}
