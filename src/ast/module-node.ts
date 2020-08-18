import { Node } from './node';
import { ImportExport } from './module';
/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface Module extends Node {
  readonly directives: string[];
  readonly leafs: ImportExport[];
  readonly start: number;
  readonly end: number;
}

export function createModuleNode(source: string, directives: string[], leafs: ImportExport[]): Module {
  return {
    type: 'Module',
    directives,
    leafs,
    start: 0,
    end: source.length
  };
}
