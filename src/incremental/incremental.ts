import { Context, ParserState, BindingType } from '../common';
import { nextToken } from '../lexer/scan';

/**
 * Parse block statement nodes. E.g. 'BlockStatement', 'FunctionBody'
 */
export function parseBlockElements(state: ParserState, context: Context, cb: any): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context);
}

/**
 * Parse block statement nodes. E.g. 'BlockStatement', 'FunctionBody'
 */
export function parseBindingElements(state: ParserState, context: Context, type: BindingType, cb: any): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context, type);
}

export function parseForElements(state: ParserState, context: Context, cb: any): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context);
}

export function parseListElements(state: ParserState, context: Context, cb: any): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context);
}

/**
 * Check if possible to 'recover' and reuse this node.
 */
export function currentNode(state: ParserState): any {
  if (!state.nodeCursor) return undefined;
  const node = state.nodeCursor(state.endIndex);
  return node;
}

/**
 * Consumes a node, and move the scanner so it is after the node we just consumed.
 */
export function consumeNode(_state: ParserState, _context: Context, node: any): any {
  return node;
}
