import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';
import { IdentifierName } from './identifiername';

/**
 * CoverInitializedName.
 */
export interface CoverInitializedName extends SyntaxNode {
  readonly left: Expression | IdentifierName | null;
  readonly right: Expression;
}

export function createCoverInitializedName(
  left: Expression | IdentifierName | null,
  right: Expression
): CoverInitializedName {
  return {
    type: 'CoverInitializedName',
    left,
    right
  };
}
