import { Node } from '../node';

/**
 * Import Meta
 */
export type ImportMeta = Node;

export function createImportMeta(): ImportMeta {
  return {
    type: 'ImportMeta'
  };
}
