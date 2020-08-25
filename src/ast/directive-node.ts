import { Node } from './node';

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */
export interface Directive extends Node {
  readonly value: string;
  readonly raw: string;
}

export function createDirective(value: string, raw: string): Directive {
  return {
    type: 'Directive',
    value,
    raw
  };
}
