import { Node } from './node';
import { ImportExport } from './module';
import { Directive } from './directive-node';

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface Module extends Node {
  readonly directives: Directive[];
  readonly leafs: ImportExport[];
  readonly webCompat: boolean;
}

export function createModuleNode(directives: Directive[], leafs: ImportExport[], webCompat: boolean): Module {
  return {
    type: 'Module',
    webCompat,
    directives,
    leafs
  };
}
