import { Node } from '../node';
import { IdentifierReference } from '../expressions/identifierreference';

/**
 * Break statement.
 */
export interface BreakStatement extends Node {
  readonly label: IdentifierReference | null;
}

export function createBreakStatement(label: IdentifierReference | null): BreakStatement {
  return {
    type: 'BreakStatement',
    label
  };
}
