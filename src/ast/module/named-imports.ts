import { SyntaxNode } from '../syntax-node';
import { RootNode } from '../root-node';
import { ImportSpecifier } from './import-specifier';

export interface NamedImports extends SyntaxNode {
  readonly importsList: ImportSpecifier[];
}

export function createNamedImports(importsList: ImportSpecifier[]): NamedImports {
  return {
    type: 'NamedImports',
    importsList
  };
}
