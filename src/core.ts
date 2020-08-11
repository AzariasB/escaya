import { Context } from './common';
import { create, parseStatementList, parseStatementListItem, parseModuleItem } from './parser';
import { createRootNode, RootNode } from './ast/root-node';
import { Script } from './ast/script-node';
import { Module } from './ast/module-node';
import { Statement } from './ast/statements';
import { createToken } from './ast/token';
import { nextToken } from './lexer/scan';
import { TextChangeRange } from './types';
import { DictionaryMap, Dictionary } from './dictionary/dictionary-map';

/**
 * The parser options.
 */
export interface Options {
  next?: boolean;
  loc?: boolean;
  disableWebCompat?: boolean;
  // *only* for recovery / incremental mode
  module?: boolean;
}

/**
 * Parse a module or script, optionally with various options.
 */
export function parseRoot(
  source: string,
  context: Context,
  options?: Options,
  dictionary?: Dictionary
): Script | Module {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
  }

  // 'nodeCursor' is undefined in 'normal mode'
  const state = create(source, undefined);

  // Overwrite exisiting dictionaries if in 'custom mode'
  if (dictionary) Object.assign(DictionaryMap, dictionary);

  // Prime the scanner.
  nextToken(state, context | Context.AllowRegExp);

  const directives: string[] = [];
  const statements: Statement[] =
    context & Context.Module
      ? parseStatementList(state, context, parseModuleItem)
      : parseStatementList(state, context, parseStatementListItem);

  return context & Context.Module
    ? DictionaryMap.Module(source, directives, statements)
    : DictionaryMap.Script(source, directives, statements);
}

/**
 * Parse a source file in recovery / incremental mode, optionally with various options.
 */
export function parseSourceFile(text: string, filename: string, context: Context, nodeCursor?: any): RootNode {
  const state = create(text, nodeCursor);
  // Overwrite exisiting dictionaries if in 'custom mode'

  // Prime the scanner.
  nextToken(state, context | Context.AllowRegExp);

  const directives: string[] = [];
  const statements: Statement[] =
    context & Context.Module
      ? parseStatementList(state, context, parseModuleItem)
      : parseStatementList(state, context, parseStatementListItem);

  return createRootNode(directives, statements, text, filename, state.diagnostics);
}

export function parseInNormalMode(
  source: string,
  context: Context,
  options?: Options,
  dictionary?: Dictionary
): Script | Module {
  return parseRoot(source, context, options, dictionary);
}

export function parseInRecoveryMode(text: string, filename: string, context: Context, options?: Options): RootNode {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.module) context |= Context.Strict | Context.Module;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
  }
  return parseSourceFile(text, filename, context | Context.ErrorRecovery);
}

export function parseInIncrementalMode(
  text: string,
  filename: string,
  _root: RootNode,
  _textChangeRange: TextChangeRange
): RootNode {
  // TODO!
  return parseSourceFile(text, filename, Context.ErrorRecovery);
}
