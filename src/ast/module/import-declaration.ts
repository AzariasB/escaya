import { SyntaxNode } from '../syntax-node';
import { StringLiteral } from '../expressions/string-literal';
import { ImportClause } from './import-clause';
import { RootNode } from '../root-node';

export interface ImportDeclaration extends SyntaxNode {
  readonly fromClause: StringLiteral | null;
  readonly moduleSpecifier: StringLiteral | null;
  readonly importClause: ImportClause | null;
  /* @internal */
  readonly parent?: RootNode;
}

export function createImportDeclaration(
  fromClause: StringLiteral | null,
  moduleSpecifier: StringLiteral | null,
  importClause: ImportClause | null
): ImportDeclaration {
  return {
    type: 'ImportDeclaration',
    fromClause,
    moduleSpecifier,
    importClause
  };
}
