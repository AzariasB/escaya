import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { StringLiteral } from '../expressions/string-literal';
import { ExportDeclaration } from './export-declaration';

export interface ExportFromClause extends Node {
  readonly moduleExportName: StringLiteral | null;
  readonly namedBinding: IdentifierName | null;
  /* @internal */
  readonly parent?: ExportDeclaration;
}

export function createExportFromClause(
  namedBinding: IdentifierName | null,
  moduleExportName: StringLiteral | null
): ExportFromClause {
  return {
    type: 'ExportFromClause',
    moduleExportName,
    namedBinding
  };
}
