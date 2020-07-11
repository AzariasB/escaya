import * as Types from './types';
import { NodeType } from './nodeType';
import { Context, ParserState, finishNode, BindingType, RootNode } from './common';
import { LeafsCallback } from './parser';
import { parseInRecoveryMode } from './recovery';

export function parseInIncrementalMode(
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

  return parseInRecoveryMode(text, filename, context, flags);
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

export function createArray(_parser: ParserState, array: any, _start: number): any[] {
  return array;
}

export function createMissingList(_start: number, list: any): Types.MissingList {
  return list;
}

export function createIdentifier(parser: ParserState, context: Context): Types.IdentifierReference {
  return finishNode(
    parser,
    context,
    parser.startIndex,
    { type: 'IdentifierReference', name: '' },
    NodeType.IdentifierReference | NodeType.HasErrors
  );
}
