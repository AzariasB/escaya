import { SyntaxNode } from '../syntax-node';

/**
 * Import call.
 */
export type ImportMeta = SyntaxNode;

export function createImportMeta(): ImportMeta {
  return {
    type: 'ImportMeta'
  };
}
