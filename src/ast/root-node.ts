import { Node } from './node';
import { Diagnostic } from '../diagnostic';
import { Flags, Context } from '../common';
import { ImportExport } from './module';
import { Directive } from './directive-node';

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface RootNode extends Node<'RootNode'> {
  readonly directives: Directive[];
  readonly leafs: ImportExport[];
  readonly text: string;
  readonly fileName: string;
  readonly context: Context;
  readonly mutualFlags: Flags;
  readonly diagnostics: Diagnostic[];
  readonly parent?: Node<string> | null;
  readonly length?: number;
  readonly children: any[] | null;
  readonly webCompat: boolean;
  readonly start: number;
  readonly end: number;
  detached: boolean;
  incremental: boolean;
}

export function createRootNode(
  directives: Directive[],
  leafs: ImportExport[],
  webCompat: boolean,
  text: string,
  fileName: string,
  diagnostics: Diagnostic[]
): RootNode {
  return {
    type: 'RootNode',
    directives,
    leafs,
    text,
    fileName,
    context: Context.Empty,
    mutualFlags: Flags.Empty,
    diagnostics,
    detached: false,
    incremental: false,
    parent: null,
    children: [],
    start: 0,
    length: text.length,
    webCompat,
    end: text.length
  };
}
