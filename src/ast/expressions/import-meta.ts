import { Node } from '../node';

/**
 * Import Meta
 */
export type ImportMeta = Node<'ImportMeta'>;

export function createImportMeta(): ImportMeta {
  return {
    type: 'ImportMeta'
  };
}
