import { Expression } from '.';
import { IdentifierName } from './identifiername';
import { Node } from '../node';

/**
 * An super property expression.
 */
export interface SuperProperty extends Node {
  readonly expression: Expression | null;
  readonly name: IdentifierName | null;
}

// see: https://tc39.github.io/ecma262/#prod-SuperProperty
export function createSuperProperty(expression: Expression | null, name: IdentifierName | null): SuperProperty {
  return {
    type: 'SuperProperty',
    expression,
    name
  };
}
