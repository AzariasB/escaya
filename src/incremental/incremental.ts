import { Constants } from '../constants';
import { Context, ParserState, BindingType } from '../common';

/**
 * Parse block statement nodes. E.g. 'BlockStatement', 'FunctionBody'
 */
export function parseBlockElements(
  state: ParserState,
  context: Context,
  scope: any,
  labels: any,
  nestedLabels: any,
  cb: any
): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context, scope, labels, nestedLabels);
}

export function parseSwitchElements(
  state: ParserState,
  context: Context,
  scope: any,
  check: Constants,
  labels: any,
  nestedLabels: any,
  cb: any
): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context, scope, check, labels, nestedLabels);
}

/**
 * Parse block statement nodes. E.g. 'BlockStatement', 'FunctionBody'
 */
export function parseBindingElements(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType,
  cb: any
): any {
  const node = currentNode(state);
  if (node) {
    return consumeNode(state, context, node);
  }
  return cb(state, context, scope, type);
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
