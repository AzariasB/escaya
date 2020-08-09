import { FunctionBody } from './function-body';
import { ConciseBody } from './concise-body';
import { BindingRestElement } from './binding-rest-element';
import { BindingIdentifier } from './binding-identifier';
import { ArrayBindingPattern } from './array-binding-pattern';
import { ObjectBindingPattern } from './object-binding-pattern';
import { SyntaxNode } from '../syntax-node';

export type ArrowFormals = BindingIdentifier | BindingRestElement | ArrayBindingPattern | ObjectBindingPattern;

export interface ArrowFunction extends SyntaxNode {
  readonly params: ArrowFormals[];
  readonly contents: ConciseBody | FunctionBody;
  // True for `AsyncArrowFunction`, false otherwise.
  async: boolean;
}

export function createArrowFunction(
  params: ArrowFormals[],
  contents: ConciseBody | FunctionBody,
  async: boolean
): ArrowFunction {
  return {
    type: 'ArrowFunction',
    params,
    contents,
    async
  };
}
