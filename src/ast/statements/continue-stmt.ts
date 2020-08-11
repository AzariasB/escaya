import { SyntaxNode } from '../syntax-node';
import { IdentifierReference } from '../expressions/identifierreference';

/**
 * A list of statements.
 */
export interface ContinueStatement extends SyntaxNode {
  readonly label: IdentifierReference | null;
}

export function createContinueStatement(label: IdentifierReference | null): ContinueStatement {
  return {
    type: 'ContinueStatement',
    label
  };
}
