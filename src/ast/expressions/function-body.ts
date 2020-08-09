import { SyntaxNode } from '../syntax-node';
import { Statement } from '../statements';

export interface FunctionBody extends SyntaxNode {
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
