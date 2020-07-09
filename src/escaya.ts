import * as Types from './types';
import { Context, Flags, RootNode } from './common';
import { parseModuleItem, parseStatementListItem, parseSource } from './parser';
import { parseInRecoveryMode } from './recovery';
import { parseInIncrementalMode } from './incremental';

/**
 * The parser options.
 */
export interface Options {
  // Enable stage 3 support (ESNext)
  next?: boolean;
  // Disable web compatibility
  disableWebCompat?: boolean;
  // Enable line/column location information start and end offsets to each node
  loc?: boolean;
  // Allow return in the global scope
  globalReturn?: boolean;
  // Enable implied strict mode
  impliedStrict?: boolean;
  // Allow parsing in module goal in error recovery / incremental
  module?: boolean;
}

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Types.Script {
  return parseSource(source, Context.Empty, parseStatementListItem, options) as Types.Script;
}

/**
 * Parse a module or script, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Types.Module {
  return parseSource(
    source,
    Context.Strict | Context.Module | Context.ImportMeta,
    parseModuleItem,
    options
  ) as Types.Module;
}

/**
 * Parse a module or script, optionally with various options in reovery mode
 */
export function recovery(source: string, filename: string, options?: Options): RootNode {
  return parseInRecoveryMode(source, filename, Context.ErrorRecovery, Flags.Empty, undefined, options);
}

/**
 * Incrementally update a module or script in recovery mode
 */
export function update(
  root: RootNode,
  text: string,
  filename: string,
  sourceChangeRange: Types.TextChangeRange
): RootNode {
  return parseInIncrementalMode(root, text, filename, sourceChangeRange);
}

export const version = '0.0.9';
