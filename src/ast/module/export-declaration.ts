import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { StringLiteral } from '../expressions/string-literal';
import { ExportSpecifier } from './export-specifier';
import { RootNode } from '../root-node';
import { Statement } from '../statements';
import { AssignmentExpression } from '../expressions/assignment-expr';
import { VariableStatement } from '../statements/variable-stmt';
import { LexicalDeclaration } from '../declarations/lexical-declaration';
import { FunctionDeclaration } from '../declarations/function-declaration';
import { ClassDeclaration } from '../declarations/class-declaration';
import { ExportFromClause } from './export-from-clause';

/** Export declaration */
export type ExportDeclarations =
  | AssignmentExpression
  | VariableStatement
  | LexicalDeclaration
  | FunctionDeclaration
  | ClassDeclaration
  | Statement;

export interface ExportDeclaration extends Node {
  readonly declaration: ExportDeclarations | null;
  readonly namedExports: ExportSpecifier[];
  readonly fromClause: StringLiteral | null;
  readonly exportFromClause: ExportFromClause | null;
  readonly exportedNames?: string[];
  readonly boundNames?: string[];
  /* @internal */
  readonly parent?: RootNode;
}

export function createExportDeclaration(
  declaration: ExportDeclarations | null,
  namedExports: ExportSpecifier[],
  fromClause: StringLiteral | null,
  exportFromClause: ExportFromClause | null,
  cst: boolean,
  exportedNames?: string[],
  boundNames?: string[]
): ExportDeclaration {
  return cst
    ? {
        type: 'ExportDeclaration',
        declaration,
        namedExports,
        exportFromClause,
        fromClause,
        exportedNames,
        boundNames
      }
    : {
        type: 'ExportDeclaration',
        declaration,
        namedExports,
        exportFromClause,
        fromClause
      };
}
