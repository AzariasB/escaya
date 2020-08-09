import { SyntaxNode } from '../syntax-node';
import { IdentifierName } from '../expressions/identifiername';
import { BindingIdentifier } from '../expressions/binding-identifier';

export interface ImportSpecifier extends SyntaxNode {
  readonly type: 'ImportSpecifier';
  readonly name: IdentifierName | BindingIdentifier | null;
  readonly binding: IdentifierName | BindingIdentifier | null;
}

export function createImportSpecifier(
  name: IdentifierName | BindingIdentifier | null,
  binding: IdentifierName | BindingIdentifier | null
): ImportSpecifier {
  return {
    type: 'ImportSpecifier',
    name,
    binding
  };
}
