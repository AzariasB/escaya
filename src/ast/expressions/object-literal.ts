import { PropertyName } from './property-name';
import { CoverInitializedName } from './cover-initialized-name';
import { IdentifierReference } from './identifierreference';
import { MethodDefinition } from './method-definition';
import { SpreadProperty } from './spread-property';
import { Node } from '../node';

/**
 * ObjectLiteral.
 *
 * https://tc39.es/ecma262/#prod-PropertyDefinition
 */

export type Properties =
  | IdentifierReference
  | PropertyName
  | CoverInitializedName // *recovery mode*
  | MethodDefinition
  | SpreadProperty; // [MODIFIED]

export interface ObjectLiteral extends Node<'ObjectLiteral'> {
  readonly properties: Properties[];
}

export function createObjectLiteral(properties: Properties[]): ObjectLiteral {
  return {
    type: 'ObjectLiteral',
    properties
  };
}
