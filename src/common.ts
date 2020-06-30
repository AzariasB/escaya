import { Token } from './token'
import { Diagnostic } from './diagnostics';

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,
  OptionsNext              = 1 << 0,
  OptionsLoc               = 1 << 1,
  OptionsDisableWebCompat  = 1 << 2,
  OptionsGlobalReturn      = 1 << 3,
  OptionsModule            = 1 << 4,
  DisallowFunction         = 1 << 5,
  ErrorRecovery            = 1 << 7,
  Strict                   = 1 << 8,
  Module                   = 1 << 9,
  AllowRegExp              = 1 << 10,
  DisallowLHS              = 1 << 11,
  Default                  = 1 << 12,
  Return                   = 1 << 13,
  TaggedTemplate           = 1 << 16,
  InIteration              = 1 << 17,
  SuperProperty            = 1 << 18,
  SuperCall                = 1 << 19,
  InSwitch                 = 1 << 20,
  Yield                    = 1 << 21,
  Await                    = 1 << 22,
  Parameters               = 1 << 23,
  ImportMeta               = 1 << 24,
  NewTarget                = 1 << 26,
  DisallowIn               = 1 << 29,
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  flags: 0;
  index: number;
  line: number;
  columnOffset: number;
  length: number;
  hasLineTerminator: boolean;
  startLine: number;
  startColumn: number;
  startIndex: number;
  endIndex: number;
  endColumn: number;
  tokenIndex: number;
  token: Token;
  tokenValue: any;
  tokenRaw: string;
  destructible: number;
  assignable: boolean;
  diagnostics: Diagnostic[];
  regExpPattern: string;
  regExpFlags: string;
  nodeCursor: any;
  counter: number;
  buf: any;
  // For the scanner to work around lack of multiple return.
  lastChar: number;
}
