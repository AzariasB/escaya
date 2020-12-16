import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { StringLiteral } from '../expressions/string-literal';
import { ImportDeclaration } from './import-declaration';

export interface ExportSpecifier extends Node<'ExportSpecifier'> {
  readonly name: IdentifierName;
  readonly binding: IdentifierName | null;
  readonly moduleExportName: StringLiteral | null;
  /* @internal */
  readonly parent?: ImportDeclaration;
}

export function createExportSpecifier(
  name: IdentifierName,
  moduleExportName: StringLiteral | null,
  binding: IdentifierName | null
): ExportSpecifier {
  return {
    type: 'ExportSpecifier',
    moduleExportName,
    name,
    binding
  };
}
