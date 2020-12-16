import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { BindingIdentifier } from '../expressions/binding-identifier';
import { StringLiteral } from '../expressions/string-literal';

export interface ImportSpecifier extends Node<'ImportSpecifier'> {
  readonly name: IdentifierName | BindingIdentifier | null;
  readonly binding: IdentifierName | BindingIdentifier | null;
  readonly moduleExportName: StringLiteral | null;
}

export function createImportSpecifier(
  moduleExportName: StringLiteral | null,
  name: IdentifierName | BindingIdentifier | null,
  binding: IdentifierName | BindingIdentifier | null
): ImportSpecifier {
  return {
    type: 'ImportSpecifier',
    moduleExportName,
    name,
    binding
  };
}
