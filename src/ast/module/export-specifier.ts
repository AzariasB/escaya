import { SyntaxNode } from '../syntax-node';
import { IdentifierName } from '../expressions/identifiername';
import { ImportDeclaration } from './import-declaration';

export interface ExportSpecifier extends SyntaxNode {
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
