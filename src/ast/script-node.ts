import { Node } from './node';
import { Directive } from './directive-node';
import { Statement } from './statements';

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface Script extends Node<'Script'> {
  readonly directives: Directive[];
  readonly leafs: Statement[];
  readonly webCompat: boolean;
}

export function createScriptNode(directives: Directive[], leafs: Statement[], webCompat: boolean): Script {
  return {
    type: 'Script',
    webCompat,
    directives,
    leafs
  };
}
