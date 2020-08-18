import { Node } from '../node';

/**
 * Import call.
 */
export type ImportMeta = Node;

export function createImportMeta(): ImportMeta {
  return {
    type: 'ImportMeta'
  };
}
