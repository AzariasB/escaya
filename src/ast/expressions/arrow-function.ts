import { FunctionBody } from './function-body';
import { BindingRestElement } from './binding-rest-element';
import { BindingIdentifier } from './binding-identifier';
import { ArrayBindingPattern } from './array-binding-pattern';
import { ObjectBindingPattern } from './object-binding-pattern';
import { Expression } from './';
import { Node } from '../node';

export type ArrowFormals = BindingIdentifier | BindingRestElement | ArrayBindingPattern | ObjectBindingPattern;

export interface ArrowFunction extends Node {
  readonly params: BindingIdentifier | ArrowFormals[];
  readonly contents: Expression | FunctionBody;
  readonly arrowParameters: boolean;
  // True for `AsyncArrowFunction`, false otherwise.
  async: boolean;
}

export function createArrowFunction(
  params: BindingIdentifier | ArrowFormals[],
  contents: Expression | FunctionBody,
  arrowParameters: boolean,
  async: boolean
): ArrowFunction {
  return {
    type: 'ArrowFunction',
    params,
    contents,
    arrowParameters,
    async
  };
}
