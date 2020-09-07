import { Directive } from './ast/directive-node';
import { Context, isValidDirective, expectSemicolon, nextLiteralExactlyStrict } from './common';
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
  parseStatemenOrModuleItemtList,
  parseModuleItemList,
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
  cst?: boolean;
  ts?: boolean;
}

/**
 * Parse a module or script, optionally with various options.
 */
export function parseRoot(source: string, context: Context, options?: Options): Script | Module {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.impliedStrict) context |= Context.Strict;
    if (options.cst) context |= Context.OptionsCST;
    if (options.ts) context |= Context.OptionsTS;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
  }

  // 'nodeCursor' is undefined in 'normal mode'
  const state = create(source, undefined);

  // Prime the scanner.
  nextToken(state, context | Context.AllowRegExp);

  const scope: ScopeState = createScope();

  const directives: Directive[] = [];

  let leafs: Statement[] = [];

  while (state.token === Token.StringLiteral) {
    const start = state.startIndex;
    const expr = parseStringLiteral(state, context, /* isDirective */ true);
    if (isValidDirective(state)) {
      if (nextLiteralExactlyStrict(state, start)) context |= Context.Strict;
      expectSemicolon(state, context);
      directives.push(expr as Directive);
    } else {
      leafs.push(parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start));
    }
  }

  leafs =
    context & Context.Module
      ? parseModuleItemList(state, context, scope, leafs)
      : parseStatementList(state, context, scope, leafs);

  const node =
    context & Context.Module ? DictionaryMap.Module(directives, leafs) : DictionaryMap.Script(directives, leafs);

  if (context & Context.OptionsLoc) {
    node.start = 0;
    node.end = source.length;
  }
  return node;
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
    const expr = parseStringLiteral(state, context, /* isDirective */ true);
    if (isValidDirective(state)) {
      if (nextLiteralExactlyStrict(state, start)) context |= Context.Strict;
      expectSemicolon(state, context);
      directives.push(expr as Directive);
    } else {
      leafs.push(parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start));
    }
  }

  leafs =
    context & Context.Module
      ? parseStatemenOrModuleItemtList(state, context, scope, leafs, parseModuleItem)
      : parseStatemenOrModuleItemtList(state, context, scope, leafs, parseStatementListItem);

  return createRootNode(directives, leafs, text, filename, state.diagnostics);
}

export function parseInNormalMode(source: string, context: Context, options?: Options): Script | Module {
  return parseRoot(source, context, options);
}

export function parseInCustomMode(
  source: string,
  context: Context,
  options?: Options,
  dictionary?: Dictionary
): Script | Module {
  // Overwrite exisiting dictionaries
  if (dictionary) Object.assign(DictionaryMap, dictionary);
  return parseRoot(source, context, options);
}

export function parseInRecoveryMode(text: string, filename: string, context: Context, options?: Options): RootNode {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.impliedStrict) context |= Context.Strict;
    if (options.module) context |= Context.Strict | Context.Module;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
    if (options.cst) context |= Context.OptionsCST;
    if (options.ts) context |= Context.OptionsTS;
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
