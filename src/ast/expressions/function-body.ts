import { Node } from '../node';
import { Directive } from '../directive-node';
import { Statement } from '../statements';

export interface FunctionBody extends Node<'FunctionBody'> {
  readonly directives: Directive[];
  readonly leafs: Statement[];
}

export function createFunctionBody(directives: Directive[], leafs: Statement[]): FunctionBody {
  return {
    type: 'FunctionBody',
    directives,
    leafs
  };
}
