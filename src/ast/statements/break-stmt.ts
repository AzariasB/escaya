import { SyntaxNode } from '../syntax-node';
import { IdentifierReference } from '../expressions/identifierreference';

/**
 * A list of statements.
 */
export interface BreakStatement extends SyntaxNode {
  readonly label: IdentifierReference | null;
}

export function createBreakStatement(label: IdentifierReference | null): BreakStatement {
  return {
    type: 'BreakStatement',
    label
  };
}
