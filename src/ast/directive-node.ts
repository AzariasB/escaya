import { Node } from './node';

/**
 * A directive from the directive prologue of a script or function. The `raw` property is the raw
 * string source of the directive without quotes.
 */
export interface Directive extends Node<'Directive'> {
  readonly value: string;
  readonly raw: string;
}

export function createDirective(value: string, raw: string /* no quotes */): Directive {
  return {
    type: 'Directive',
    value,
    raw
  };
}
