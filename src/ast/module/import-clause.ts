import { Node } from '../node';
import { NamedImports } from './named-imports';
import { BindingIdentifier } from '../expressions/binding-identifier';
import { ImportDeclaration } from './import-declaration';

export interface ImportClause extends Node {
  readonly defaultBinding: BindingIdentifier | null;
  readonly nameSpaceImport: BindingIdentifier | null;
  readonly namedImports: NamedImports | null;
  /* @internal */
  readonly parent?: ImportDeclaration;
}

export function createImportClause(
  defaultBinding: BindingIdentifier | null,
  nameSpaceImport: BindingIdentifier | null,
  namedImports: NamedImports | null
): ImportClause {
  return {
    type: 'ImportClause',
    defaultBinding,
    nameSpaceImport,
    namedImports
  };
}
