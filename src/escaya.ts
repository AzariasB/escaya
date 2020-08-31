import { RootNode } from './ast/root-node';
import { Script } from './ast/script-node';
import { Module } from './ast/module-node';
import { TextChangeRange } from './types';
import { parseInNormalMode, parseInCustomMode, parseInRecoveryMode, parseInIncrementalMode, Options } from './core';
import { Dictionary } from './dictionary/dictionary-map';

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Script {
  return parseInNormalMode(source, 0b00100000000000000000000000000000, options) as Script;
}

/**
 * Parse a module, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Module {
  return parseInNormalMode(source, 0b00101000000000000000110000000000, options) as Module;
}

/**
 * Parse a script, optionally with various options and custom AST.
 */
export function parseCustomScript(source: string, dictionary: Dictionary, options?: Options): Script {
  return parseInCustomMode(source, 0b00100000000000000000000010000000, options, dictionary) as Script;
}

/**
 * Parse a module, optionally with various options and custom AST.
 */
export function parseCustomModule(source: string, dictionary: Dictionary, options?: Options): Module {
  return parseInCustomMode(source, 0b00001000000000000000001110000000, options, dictionary) as Module;
}

/**
 * Parse a module or script in recovery mode, optionally with various options.
 */
export function recovery(text: string, fileName: string, options?: Options): RootNode {
  return parseInRecoveryMode(text, fileName, 0b00100000000000000000000010000000, options);
}

/**
 * Incremental update a module or script.
 */
export function update(text: string, fileName: string, root: RootNode, textChangeRange: TextChangeRange): RootNode {
  return parseInIncrementalMode(text, fileName, root, textChangeRange);
}

export const version = '0.22';
