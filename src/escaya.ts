import * as Types from './types';
import { Context, Flags, RootNode } from './common';
import { parseModuleItem, parseStatementListItem, parseSource } from './parser';
import { parseIncremental, createNodeCursor, updateNodePositions } from './incremental';

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
  return parseIncremental(
    source,
    filename,
    Context.ErrorRecovery,
    Flags.Empty,
    /* setParents */ false,
    undefined,
    options
  );
}

/**
 * Incrementally parse a module or script in recovery mode
 */
export function update(
  root: RootNode,
  text: string,
  filename: string,
  sourceChangeRange: Types.TextChangeRange
): RootNode {
  if (sourceChangeRange.span.length === 0 && sourceChangeRange.newLength === 0) {
    // if the text didn't change, then we can just return our current source file as-is.
    return root;
  }

  // Inherit the core context bits from the RootNode. This will assure that we are parsing
  // with the same options
  const context = root.contextFlags;

  // Inherit the mutual parser flags from the RootNode, in case any flags need passed by reference
  const flags = root.mutualFlags;

  if (root.leafs.length === 0) return parseIncremental(text, filename, context, flags, /* setParents */ false);

  const nodeCursor = createNodeCursor(root);

  updateNodePositions(root, sourceChangeRange);

  return parseIncremental(text, filename, context, flags, /* setParents */ true, nodeCursor);
}

export const version = '0.0.1';
