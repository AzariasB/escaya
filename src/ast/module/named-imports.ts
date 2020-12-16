import { Node } from '../node';
import { ImportSpecifier } from './import-specifier';

export interface NamedImports extends Node<'NamedImports'> {
  readonly importsList: ImportSpecifier[];
}

export function createNamedImports(importsList: ImportSpecifier[]): NamedImports {
  return {
    type: 'NamedImports',
    importsList
  };
}
