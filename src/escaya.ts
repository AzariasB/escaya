import { Context } from './common';
import { RootNode } from './ast/root-node';
import { Script } from './ast/script-node';
import { Module } from './ast/module-node';
import { TextChangeRange } from './types';
import { parseInNormalMode, parseInRecoveryMode, parseInIncrementalMode, Options } from './core';
import { Dictionary } from './dictionary/dictionary-map';

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Script {
  return parseInNormalMode(source, Context.Empty, options) as Script;
}

/**
 * Parse a module, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Module {
  return parseInNormalMode(source, Context.Strict | Context.Module | Context.ImportMeta, options) as Module;
}

/**
 * Parse a script, optionally with various options and custom AST.
 */
export function parseCustomScript(source: string, dictionary: Dictionary, options?: Options): Script {
  return parseInNormalMode(source, Context.Empty, options, dictionary) as Script;
}

/**
 * Parse a module, optionally with various options and custom AST.
 */
export function parseCustomModule(source: string, dictionary: Dictionary, options?: Options): Module {
  return parseInNormalMode(source, 134218496, options, dictionary) as Module;
}

/**
 * Parse a module or script in recovery mode, optionally with various options.
 */
export function recovery(text: string, fileName: string, options?: Options): RootNode {
  return parseInRecoveryMode(text, fileName, Context.Empty, options);
}

/**
 * Incremental update a module or script.
 */
export function update(text: string, fileName: string, root: RootNode, textChangeRange: TextChangeRange): RootNode {
  return parseInIncrementalMode(text, fileName, root, textChangeRange);
}
