import { ParserState } from './common';
import { Token } from './token';
import * as Types from './types';

/**
 * Create a new parser instance.
 */
export function create(source: string, nodeCursor?: Types.NodeCursor): ParserState {
  return {
    source,
    flags: 0,
    index: 0,
    line: 1,
    columnOffset: 0,
    length: source.length,
    hasLineTerminator: false,
    startLine: 0,
    startColumn: 0,
    startIndex: 0,
    endIndex: 0,
    endColumn: 0,
    tokenIndex: 0,
    token: Token.EndOfSource,
    destructible: 0,
    assignable: true,
    tokenValue: void 0,
    tokenRaw: '',
    diagnostics: [],
    regExpPattern: '',
    regExpFlags: '',
    nodeCursor,
    counter: 0,
    buf: '',
    lastChar: 0
  };
}
