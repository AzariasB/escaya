import { Node } from './node';
import { Statement } from './statements';

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface Script extends Node {
  readonly directives: string[];
  readonly leafs: Statement[];
  readonly start: number;
  readonly end: number;
}

export function createScriptNode(source: string, directives: string[], leafs: Statement[]): Script {
  return {
    type: 'Script',
    directives,
    leafs,
    start: 0,
    end: source.length
  };
}
