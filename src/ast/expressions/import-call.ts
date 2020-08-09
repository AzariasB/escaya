import { SyntaxNode } from '../syntax-node';
import { Expression } from '.';

/**
 * Import call.
 */
export interface ImportCall extends SyntaxNode {
  readonly import: Expression;
}

export function createImportCall(_import: Expression): ImportCall {
  return {
    type: 'ImportCall',
    import: _import
  };
}
