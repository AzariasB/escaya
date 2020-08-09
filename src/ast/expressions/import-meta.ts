import { SyntaxNode } from '../syntax-node';

/**
 * Import call.
 */
export interface ImportMeta extends SyntaxNode {}

export function createImportMeta(): ImportMeta {
  return {
    type: 'ImportMeta'
  };
}
