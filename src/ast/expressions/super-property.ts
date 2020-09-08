import { Expression } from '.';
import { IdentifierName } from './identifiername';
import { Node } from '../node';

/**
 * An super property expression.
 */
export interface SuperProperty extends Node {
  readonly super: Expression | IdentifierName;
  readonly computed: boolean;
}

// see: https://tc39.github.io/ecma262/#prod-SuperProperty
export function createSuperProperty(_super: Expression | IdentifierName, computed: boolean): SuperProperty {
  return {
    type: 'SuperProperty',
    super: _super,
    computed
  };
}
