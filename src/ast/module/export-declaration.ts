import { Node } from '../node';
import { IdentifierName } from '../expressions/identifiername';
import { StringLiteral } from '../expressions/string-literal';
import { ExportSpecifier } from './export-specifier';
import { RootNode } from '../root-node';
import { AssignmentExpression } from '../expressions/assignment-expr';
import { VariableStatement } from '../statements/variable-stmt';
import { LexicalDeclaration } from '../declarations/lexical-declaration';
import { FunctionDeclaration } from '../declarations/function-declaration';
import { ClassDeclaration } from '../declarations/class-declaration';

/** Export declaration */

export interface ExportDeclaration extends Node {
  readonly declaration:
    | AssignmentExpression
    | VariableStatement
    | LexicalDeclaration
    | FunctionDeclaration
    | ClassDeclaration
    | null;
  readonly namedExports: ExportSpecifier[];
  readonly namedBinding: IdentifierName | null;
  readonly fromClause: StringLiteral | null;
  /* @internal */
  readonly parent?: RootNode;
}

export function createExportDeclaration(
  declaration:
    | AssignmentExpression
    | VariableStatement
    | LexicalDeclaration
    | FunctionDeclaration
    | ClassDeclaration
    | null,
  namedExports: ExportSpecifier[],
  namedBinding: IdentifierName | null,
  fromClause: StringLiteral | null
): ExportDeclaration {
  return {
    type: 'ExportDeclaration',
    declaration,
    namedExports,
    namedBinding,
    fromClause
  };
}
