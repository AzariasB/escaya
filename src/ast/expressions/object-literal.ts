import { LeftHandSideExpression } from '.';
import { PropertyName } from './property-name';
import { CoverInitializedName } from './cover-initialized-name';
import { MethodDefinition } from './method-definition';
import { SpreadProperty } from './spread-property';
import { Node } from '../node';

/**
 * ObjectLiteral.
 */

export type Properties =
  | PropertyName
  | CoverInitializedName
  | MethodDefinition
  | LeftHandSideExpression
  | SpreadProperty;

export interface ObjectLiteral extends Node {
  readonly properties: Properties[];
}

export function createObjectLiteral(properties: Properties[]): ObjectLiteral {
  return {
    type: 'ObjectLiteral',
    properties
  };
}
