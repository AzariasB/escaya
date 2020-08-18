import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { ImportDeclaration } from './import-declaration';

export interface ExportSpecifier extends Node {
  readonly name: IdentifierName;
  readonly binding: IdentifierName | null;
  /* @internal */
  readonly parent?: ImportDeclaration;
}

export function createExportSpecifier(name: IdentifierName, binding: IdentifierName | null): ExportSpecifier {
  return {
    type: 'ExportSpecifier',
    name,
    binding
  };
}
