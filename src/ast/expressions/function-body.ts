import { Node } from '../node';
import { Statement } from '../statements';

export interface FunctionBody extends Node {
  readonly directives: string[];
  readonly leafs: Statement[];
}

export function createFunctionBody(directives: string[], leafs: Statement[]): FunctionBody {
  return {
    type: 'FunctionBody',
    directives,
    leafs
  };
}
