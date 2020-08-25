import { Directive } from './ast/directive-node';
import { Context, canConsumeSemicolon, expectSemicolon, nextLiteralExactlyStrict } from './common';
import { createRootNode, RootNode } from './ast/root-node';
import { Script } from './ast/script-node';
import { Module } from './ast/module-node';
import { Statement } from './ast/statements';
import { nextToken } from './lexer/scan';
import { TextChangeRange } from './types';
import { DictionaryMap, Dictionary } from './dictionary/dictionary-map';
import { createScope, ScopeState } from './scope';
import { Token } from './ast/token';
import {
  create,
  parseStatementList,
  parseStatementListItem,
  parseModuleItem,
  parseStringLiteral,
  parseExpressionOrHigher,
  parseExpressionStatement
} from './parser';

/**
 * The parser options.
 */
export interface Options {
  next?: boolean;
  loc?: boolean;
  disableWebCompat?: boolean;
  impliedStrict?: boolean;
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
    if (options.impliedStrict) context |= Context.Strict;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
  }

  // 'nodeCursor' is undefined in 'normal mode'
  const state = create(source, undefined);

  // Overwrite exisiting dictionaries if in 'custom mode'
  if (dictionary) Object.assign(DictionaryMap, dictionary);

  // Prime the scanner.
  nextToken(state, context | Context.AllowRegExp);

  const scope: ScopeState = createScope();

  const directives: Directive[] = [];

  let leafs: Statement[] = [];

  while (state.token === Token.StringLiteral) {
    const start = state.startIndex;
    const expr = parseStringLiteral(state, context | Context.AllowRegExp, /* isDirective */ true);
    if (canConsumeSemicolon(state)) {
      if (nextLiteralExactlyStrict(state, start)) context |= Context.Strict;
      expectSemicolon(state, context);
      directives.push(expr as Directive);
    } else {
      leafs.push(parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start));
    }
  }

  leafs =
    context & Context.Module
      ? parseStatementList(state, context, scope, leafs, parseModuleItem)
      : parseStatementList(state, context, scope, leafs, parseStatementListItem);

  return context & Context.Module
    ? DictionaryMap.Module(source, directives, leafs)
    : DictionaryMap.Script(source, directives, leafs);
}

/**
 * Parse a source file in recovery / incremental mode, optionally with various options.
 */
export function parseSourceFile(text: string, filename: string, context: Context, nodeCursor?: any): RootNode {
  const state = create(text, nodeCursor);
  // Overwrite exisiting dictionaries if in 'custom mode'

  // Prime the scanner.
  nextToken(state, context | Context.AllowRegExp);

  const scope: ScopeState = createScope();

  const directives: Directive[] = [];

  let leafs: Statement[] = [];

  while (state.token === Token.StringLiteral) {
    const start = state.startIndex;
    const expr = parseStringLiteral(state, context | Context.AllowRegExp, /* isDirective */ true);
    if (canConsumeSemicolon(state)) {
      if (nextLiteralExactlyStrict(state, start)) context |= Context.Strict;
      expectSemicolon(state, context);
      directives.push(expr as Directive);
    } else {
      leafs.push(parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start));
    }
  }

  leafs =
    context & Context.Module
      ? parseStatementList(state, context, scope, leafs, parseModuleItem)
      : parseStatementList(state, context, scope, leafs, parseStatementListItem);

  return createRootNode(directives, leafs, text, filename, state.diagnostics);
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
    if (options.impliedStrict) context |= Context.Strict;
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
