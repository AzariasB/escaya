import { Node } from '../node';
import { IdentifierReference } from '../expressions/identifierreference';

/**
 * Continue statement.
 */
export interface ContinueStatement extends Node {
  readonly label: IdentifierReference | null;
}

export function createContinueStatement(label: IdentifierReference | null): ContinueStatement {
  return {
    type: 'ContinueStatement',
    label
  };
}
