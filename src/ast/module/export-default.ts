import { SyntaxNode } from '../syntax-node';
import { RootNode } from '../root-node';
import { Expression } from '../expressions';
import { FunctionDeclaration } from '../declarations/function-declaration';
import { ClassDeclaration } from '../declarations/class-declaration';

// [MODIFIED]

export interface ExportDefault extends SyntaxNode {
  readonly declaration: FunctionDeclaration | ClassDeclaration | Expression;
  /* @internal */
  readonly parent?: RootNode;
}

export function createExportDefault(declaration: FunctionDeclaration | ClassDeclaration | Expression): ExportDefault {
  return {
    type: 'ExportDefault',
    declaration
  };
}
