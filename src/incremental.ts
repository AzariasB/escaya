import * as Types from './types';
import { NodeType } from './nodeType';
import { nextToken } from './scanner/scan';
import { Context, Flags, ParserState, finishNode, BindingType, consumeOpt, RootNode } from './common';
import { create, LeafsCallback, parseModuleItem, parseStatementListItem, parseDirectives } from './parser';
import { Constants } from './constants';
import { Token } from './token';
import { Options } from './escaya';

/**
 * Parses the source code in reocovery mode
 */
export function parseIncremental(
  text: string,
  fileName: string,
  context: Context,
  flags: Flags,
  _setParents: boolean,
  diagnostics: any[],
  nodeCursor?: Types.NodeCursor,
  options?: Options
): RootNode {
  if (options !== undefined) {
    if (options.next) context |= Context.OptionsNext;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    if (options.module) context |= Context.Strict | Context.Module;
    if (options.impliedStrict) context |= Context.Strict;
  }

  const parser = create(text, diagnostics, nodeCursor);

  nextToken(parser, context | Context.AllowRegExp);

  /**
   * The stack of leafs currently being parsed.
   */
  const leafs: (Types.ImportOrExport | Types.Statement)[] = [];

  /**
   * The stack of directives currently being parsed.
   */
  const directives: string[] = [];

  /*
   * Directive parsing is tricky because we can only reuse a node if it was parsed in the same context
   * that we're currently in. i.e if we originally parsed in 'sloppy mode' and add '"use strict" - the
   * entire parser will be set to strict mode, and prevent resuse of nodes.
   *
   * We work around this in 'incremental mode' by not allowing setting options and force the parser to recover
   * with the same options set during 'recovery mode', but this isn't possible with directives on root level.
   */
  while (parser.token === Token.StringLiteral) {
    const { token, tokenValue, startIndex } = parser;
    nextToken(parser, context);
    if (parser.token & Token.IsAutomaticSemicolon) {
      if (tokenValue === 'use strict') context |= Context.Strict;
      consumeOpt(parser, context, Token.Semicolon);
      directives.push(parser.source.slice(startIndex, parser.index));
    } else {
      leafs.push(parseDirectives(parser, context, token, tokenValue, startIndex));
    }
  }

  /* This check will prevent the parser for running into an "infinity loop", and
   * also skip some invalid tokens. These tokens are superfluous
   * and will causes more diagnostic messages.
   */
  while (parser.token & Constants.RootLeafs) {
    leafs.push(parseLeafElement(parser, context, context & Context.Module ? parseModuleItem : parseStatementListItem));
  }

  return {
    type: context & Context.Module ? 'Module' : 'Script',
    directives,
    contextFlags: context,
    mutualFlags: flags,
    leafs: createBlockArray(parser, leafs, /* root always '0' */ 0),
    text,
    fileName,
    nodeType: NodeType.RootNode,
    diagnostics: parser.diagnostics,
    webCompat: (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat,
    id: 0,
    start: 0,
    end: text.length
  };
}

/**
 * Interface for delimited Element
 */
export interface ElementsCallback {
  (parser: ParserState, context: Context, start: number): any;
}

export function parseLeafElement(parser: ParserState, context: Context, cb: any): LeafsCallback | any {
  return cb(parser, context);
}

export function parseLexicalElements<T extends Types.Node>(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  cb: any
): T {
  return cb(parser, context, bindingType, parser.startIndex);
}

export function parseListElements<T extends Types.Node>(
  parser: ParserState,
  context: Context,
  cb: ElementsCallback
): T {
  return cb(parser, context, parser.startIndex);
}

export function parseFormalElements<T extends Types.Node>(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  cb: ElementsCallback
): T {
  return cb(parser, context, bindingType);
}

export function parseClassElements(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  modifier: any,
  cb: any
): any {
  return cb(parser, context, inheritedContext, modifier);
}

export function createBlockArray(_parser: ParserState, array: any, _start: number): any[] {
  return array;
}

export function createMissingList(_start: number): Types.MissingList {
  const list: any = [];
  return list;
}

/** Synthetic nodes */

export function insertSyntheticNode(parser: ParserState, context: Context): Types.Synthetic {
  return finishNode(
    parser,
    context,
    parser.startIndex,
    { type: 'Synthetic', value: '##' },
    NodeType.Synthetic | NodeType.HasErrors
  );
}
