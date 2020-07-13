import { Token } from './token';
import { nextToken } from './scanner/scan';
import * as Types from './types';
import { DiagnosticKind, DiagnosticSource, DiagnosticCode } from './diagnostic/enums';
import { addDiagnostic, Diagnostic } from './diagnostic/diagnostics';
import { tokenErrors } from './diagnostic/token-errors';
import { NodeType } from './nodeType';


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
  DisallowArrow            = 1 << 24,
  ImportMeta               = 1 << 27,
  NewTarget                = 1 << 26,
  DisallowIn               = 1 << 29,
}

/**
* The mutable parser flags, in case any flags need passed by reference.
*/
export const enum Flags {
  Empty = 0,
  HasConstructor = 1 << 0,
  Octals  = 1 << 1,
  HasErrors = 1 << 2
}

export const enum BindingKind {
  None = 0,
  ArgumentList = 1 << 0,
  Variable = 1 << 1,
  FunctionVariable = 1 << 2,
  FunctionLexical = 1 << 3,
  FunctionStatement = 1 << 4,
  Let = 1 << 5,
  Const = 1 << 6,
  Class = 1 << 7,
  CatchIdentifier = 1 << 8,
  CatchPattern = 1 << 9,
}

export const enum ModifierKind {
  None = 0,
  Method = 1 << 0,
  Computed = 1 << 1,
  Shorthand = 1 << 2,
  Generator = 1 << 3,
  Async = 1 << 4,
  Static = 1 << 5,
  Constructor = 1 << 6,
  Getter = 1 << 7,
  Setter = 1 << 8
}

export const enum Destructible {
  None = 0,
  Destructible = 0b000000001,
  Assignable = 0b000000010,
  NotDestructible = 0b000000100,
  MustDestruct = 0b000001000,
  DisallowTrailing = 0b000010000,
}

export const enum Precedence {
  Assign = 0b000111110,
  Conditional = 0b000111111,
  Binary = 0b111000000,
  LeftHandSide = 0b111000001,
  Primary = 0b111000010,
  Unary = 0b111000011,
  Async = 0b111000111
}

export const enum BindingType {
  None = 0,
  Pattern = 1 << 0,
  Assignment = 1 << 1,
  AllowLHS = 1 << 2,
  ArgumentList = 1 << 3,
  Let  = 1 << 4,
  Const  = 1 << 5,
  Var  = 1 << 6,
  CatchIdentifier  = 1 << 7,
  CatchPattern   = 1 << 8,
  Literal   = 1 << 9
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  flags: Flags;
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

/**
 * Create a new parser instance.
 */
export function create(source: string, nodeCursor?: Types.NodeCursor): ParserState {
  return {
    source,
    flags: Flags.Empty,
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
    destructible: Destructible.None,
    assignable: true,
    tokenValue: '',
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

/**
 * A top level node which contains the list of statements in a program,
 * and some information about the file which the statements came from.
 */

export interface RootNode extends Types.Root {
  type: 'Script' | 'Module';

  directives: string[];

  leafs: (Types.ImportOrExport | Types.Statement)[];

  contextFlags: Context;

  mutualFlags: Flags;

  text: string;

  fileName: string;

  // True if additional ECMAScript features for Web Browsers are enabled
  webCompat: boolean;

  diagnostics: Diagnostic[];
}

export function consumeOpt<T extends Token>(state: ParserState, context: Context, t: T): boolean {
  if (state.token !== t) return false;
  nextToken(state, context);
  return true;
}

export function optionalBit<T extends Token>(state: ParserState, context: Context, t: T): 0 | 1 {
  if (state.token !== t) return 0;
  nextToken(state, context);
  return 1;
}
export function consume<T extends Token>(state: ParserState, context: Context, t: T): boolean {
  if (state.token === t) {
    nextToken(state, context);
    return true;
  }

  addDiagnostic(state, context, DiagnosticSource.Lexer, tokenErrors(t), DiagnosticKind.Error);

  // Mark that we've encountered an error.  We'll set an appropriate bit on the next
  // node we finish so that it can't be reused incrementally.
  state.flags |= Flags.HasErrors;

  return false;
}

export function finishNode<T extends Types.Node>(
  state: ParserState,
  context: Context,
  start: number,
  node: T,
  flags: NodeType
): T {
  if (context & (Context.ErrorRecovery | Context.OptionsLoc)) {

    // Note: this 'start' doesn't handle WS between tokens. Need to fix this
    // for 'normal parsing mode'
    node.start = start;
    node.end = state.endIndex;

    if (context & Context.ErrorRecovery) {
      node.contextFlags = context;
      node.mutualFlags = state.flags;
      node.nodeType = flags;
      node.parent = null;

      if (state.flags & Flags.HasErrors) {
        state.flags = (state.flags | Flags.HasErrors) ^ Flags.HasErrors;
        node.nodeType |= NodeType.HasErrors;
      }
    }
  }

  return node;
}

export function isClosingTokenOrComma<T extends Token>(t: T, closingToken: Token): boolean {
  return t === closingToken || t === Token.Comma || t === Token.Assign;
}

export function reinterpretArrowParameter(node: any): void {
  if (!node) return;

  switch (node.type) {
    case 'IdentifierName':
    case 'IdentifierReference':
      node.type = 'BindingIdentifier';
      return;

    case 'BindingElement':
      return reinterpretArrowParameter(node.binding);

    case 'ObjectAssignmentPattern':
    case 'ObjectLiteral':
      node.type = 'ObjectBindingPattern';
      const properties = node.properties;
      let i = properties.length;
      while (i--) {
        reinterpretArrowParameter(properties[i]);
      }
      return;
    case 'ArrayLiteral':
      node.type = 'ArrayBindingPattern';
      const leafs = node.leafs;
      let ti = leafs.length;
      while (ti--) {
        reinterpretArrowParameter(leafs[ti]);
      }
      return;
    case 'AssignmentExpression':
      node.type = 'AssignmentPattern';
      delete node.operator;
      reinterpretArrowParameter(node.left);
      return;
    case 'PropertyDefinition':
      node.type = 'BindingProperty';
      reinterpretArrowParameter(node.value);
      return;
    case 'SpreadElement':
      node.type = 'BindingRestProperty';
      reinterpretArrowParameter(node.argument);
      return;
  }
}

export function reinterpretToAssignment(node: any, objlit: boolean): void {
  if (!node) return;
  switch (node.type) {
    case 'IdentifierName':
    case 'BindingIdentifier':
      node.type = 'IdentifierReference';
      return;
    case 'AssignmentRestProperty':
    case 'SpreadElement':
      node.type = objlit ? 'AssignmentRestProperty' : 'AssignmentRestElement';
      //   node.nodeType = objlit ?  NodeType.AssignmentRestProperty : NodeType.AssignmentRestElement;
      reinterpretToAssignment(node.argument, objlit);
      return;
    case 'ArrayBindingPattern':
    case 'ArrayLiteral':
      node.type = 'ArrayAssignmentPattern';
      //   node.nodeType = NodeType.ArrayAssignmentPattern;
      const leafs = node.leafs;
      let i = leafs.length;
      while (i--) {
        reinterpretToAssignment(leafs[i], objlit);
      }
      return;
    case 'BindingProperty':
    case 'PropertyDefinition':
      node.type = 'AssignmentProperty';
      //    node.nodeType = NodeType.AssignmentProperty;
      reinterpretToAssignment(node.value, objlit);
      return;
    case 'AssignmentExpression':
      node.type = 'AssignmentPattern';
      reinterpretToAssignment(node.left, objlit);
      delete node.operator;
      return;
    case 'ObjectBindingPattern':
    case 'ObjectLiteral': {
      node.type = 'ObjectAssignmentPattern';
      //   node.nodeType = NodeType.ObjectAssignmentPattern;
      const properties = node.properties;
      let i = properties.length;
      while (i--) {
        reinterpretToAssignment(properties[i], objlit);
      }
      return;
    }
  }
}
export function canParseSemicolon(state: ParserState): boolean {
  return state.hasLineTerminator || (state.token & Token.IsAutomaticSemicolon) === Token.IsAutomaticSemicolon;
}
export function consumeSemicolon(state: ParserState, context: Context): void {
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Semicolon)) {
    return;
  }
  if (canParseSemicolon(state)) return;
  addDiagnostic(state, context, DiagnosticSource.Lexer, tokenErrors(state.token), DiagnosticKind.Error);
}

export function validateFunctionName(state: ParserState, context: Context, t: Token): void {
  if (context & Context.Strict && (t & Token.FutureKeyword) > 0) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnexpectedStrictReserved, DiagnosticKind.Error);
  }

  if ((t & Token.Keyword) === Token.Keyword)
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  if ((context & (Context.Await | Context.Module)) > 0 && t === Token.AwaitKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  if (context & (Context.Yield | Context.Strict) && t === Token.YieldKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
}

export function isStrictReservedWord(state: ParserState, context: Context, t: Token): boolean {
  if (context & (Context.Await | Context.Module) && t === Token.AwaitKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  if (context & Context.Yield && t === Token.YieldKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  return (t & Token.Keyword) === Token.Keyword || (t & Token.FutureKeyword) === Token.FutureKeyword;
}

export function isCaseOrDefaultKeyword<T extends Token>(t: T): boolean {
  return t === Token.CaseKeyword || t === Token.DefaultKeyword;
}

export function parseAndClassifyIdentifier(
  state: ParserState,
  context: Context,
  t: Token,
  name: string,
  bindingType: BindingType,
  isBinding: boolean,
  start: number
): Types.BindingIdentifier | Types.IdentifierReference {
  if (context & (Context.Module | Context.Await) && state.token === Token.AwaitKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.AwaitOutsideAsync, DiagnosticKind.Error);
  }

  if (context & (Context.Strict | Context.Yield) && state.token === Token.YieldKeyword) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DisallowedYieldInContext,
      DiagnosticKind.Error
    );
  }

  if (t === Token.LetKeyword && bindingType & (BindingType.Let | BindingType.Const)) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidLetConstBinding,
      DiagnosticKind.Error
    );
  }
  if ((t & Token.Keyword) === Token.Keyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.AwaitOutsideAsync, DiagnosticKind.Error);
  }
  if ((t & (Token.Keyword | Token.FutureKeyword | Token.IsIdentifier)) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  nextToken(state, context | Context.AllowRegExp);
  if (isBinding) {
    return finishNode(state, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(state, context, start, { type: 'IdentifierReference', name }, NodeType.IdentifierReference);
}

/**
 * Returns the last element of an array if non-empty, undefined otherwise.
 */
export function lastOrUndefined<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  return array[array.length - 1];
}


export function validateIdentifier(state: ParserState, context: Context, t: Token): void {
  if (context & Context.Strict && (t & Token.FutureKeyword) > 0) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnexpectedStrictReserved, DiagnosticKind.Error);
  }

  if ((t & Token.Keyword) > 0) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.KeywordNotId, DiagnosticKind.Error);
  }

  if (context & (Context.Module | Context.Await) && state.token === Token.AwaitKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.AwaitOutsideAsync, DiagnosticKind.Error);
  }

  if (context & (Context.Strict | Context.Yield) && t === Token.YieldKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.DisallowedYieldInContext, DiagnosticKind.Error);
  }
}
