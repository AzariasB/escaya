import { Token, KeywordDescTable } from './ast/token';
import { nextToken } from './lexer/scan';
import { addDiagnostic, addEarlyDiagnostic, DiagnosticSource, DiagnosticKind } from './diagnostic';
import { DiagnosticCode } from './diagnostic/diagnostic-code';
import { SyntaxKind, SyntaxNodeFlags } from './ast/syntax-node';
import { DictionaryMap } from './dictionary/dictionary-map';

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,
  OptionsNext = 1 << 0,
  OptionsLoc = 1 << 1,
  OptionsDisableWebCompat = 1 << 2,
  OptionsGlobalReturn = 1 << 3,
  OptionsModule = 1 << 4,
  DisallowFunction = 1 << 5,
  Return = 1 << 6,
  Strict = 1 << 10,
  Module = 1 << 11,
  AllowRegExp = 1 << 12,
  DisallowIn = 1 << 13,
  Default = 1 << 15,
  TaggedTemplate = 1 << 16,
  InIteration = 1 << 17,
  SuperProperty = 1 << 18,
  SuperCall = 1 << 19,
  InSwitch = 1 << 20,
  Yield = 1 << 21,
  Await = 1 << 22,
  Parameters = 1 << 23,
  InConstructor = 1 << 24,
  ErrorRecovery = 1 << 25,
  NewTarget = 1 << 26,
  ImportMeta = 1 << 27
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0
}
export const enum ArrowKind {
  NORMAL,
  ASYNC
}

export const enum PropertyKind {
  None,
  Async = 1 << 0,
  Getter = 1 << 1,
  Setter = 1 << 2,
  Static = 1 << 3,
  Generator = 1 << 4,
  Constructor = 1 << 5
}

export const enum BindingType {
  None = 0,
  Let = 1 << 0,
  Const = 1 << 1,
  Var = 1 << 2,
  ArgumentList = 1 << 3,
  CatchPattern = 1 << 3,
  CatchIdentifier = 1 << 4
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
  lineTerminatorBeforeNextToken: boolean;
  positionForNextToken: number;
  lineForNextToken: number;
  columnForNextToken: number;
  positionBeforeToken: number;
  regExpPattern: string;
  regExpFlags: string;
  nodeHasError: boolean;
  startIndex: number;
  endIndex: number;
  endColumn: number;
  length: number;
  token: Token;
  tokenValue: any;
  tokenRaw: string;
  diagnostics: any[];
  nodeCursor: any;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };

  // For the scanner to work around lack of multiple return.
  lastChar: number;
}

export function consumeSemicolon(state: ParserState, context: Context): boolean {
  // Check for automatic semicolon insertion according to
  // the rules given in ECMA-262, section 7.9, page 21.
  if (state.token & Token.IsAutomaticSemicolon || state.lineTerminatorBeforeNextToken) {
    // consume the semicolon if it was explicitly provided.
    if (state.token === Token.Semicolon) {
      nextToken(state, context);
    }
    return true;
  }
  return consumeOpt(state, context, Token.Semicolon);
}

export function consume<T extends Token>(state: ParserState, context: Context, t: T): boolean {
  if (state.token === t) {
    nextToken(state, context);
    return true;
  }
  addDiagnostic(
    state,
    context,
    DiagnosticSource.Parser,
    DiagnosticCode.Expected,
    DiagnosticKind.Error,
    KeywordDescTable[t & Token.Type]
  );
  return false;
}

export function consumeOpt<T extends Token>(state: ParserState, context: Context, t: T): boolean {
  if (state.token === t) {
    nextToken(state, context);
    return true;
  }
  return false;
}

export function optionalBit<T extends Token>(state: ParserState, context: Context, t: T): 0 | 1 {
  if (state.token === t) {
    nextToken(state, context);
    return 1;
  }
  return 0;
}

/**
 * Returns the last element of an array if non-empty, `undefined` otherwise.
 */
export function lastOrUndefined<T>(array: readonly T[]): T | undefined {
  return array.length === 0 ? undefined : array[array.length - 1];
}

export function finishNode(state: ParserState, context: Context, start: number, node: any, kind: SyntaxKind): any {
  node.start = start;
  node.end = state.endIndex;
  if ((context & Context.ErrorRecovery) === Context.ErrorRecovery) {
    node.kind = kind;
    node.flags = SyntaxNodeFlags.None;
  }
  return node;
}

export function reinterpretToPattern(node: any): void {
  switch (node.type) {
    case 'IdentifierName':
    case 'IdentifierReference':
      node.type = 'BindingIdentifier';
      return;
    case 'Elison':
      return;
    case 'ArrayLiteral': {
      node.type = 'ArrayBindingPattern';
      const elements = node.elements;
      let i = elements.length;
      while (i--) {
        reinterpretToPattern(elements[i]);
      }
      return;
    }
    case 'ObjectLiteral': {
      node.type = 'ObjectBindingPattern';
      const properties = node.properties;
      let i = properties.length;
      while (i--) {
        reinterpretToPattern(properties[i]);
      }
      return;
    }
    case 'PropertyName': {
      reinterpretToPattern(node.value);
      return node;
    }
    case 'CoverInitializedName': {
      node.type = 'BindingElement';
      reinterpretToAssignment(node.left);
      return node;
    }
    case 'SpreadElement': {
      node.type = 'BindingRestProperty';
      reinterpretToPattern(node.argument);
      return node;
    }
    case 'AssignmentExpression': {
      node.type = 'BindingElement';
      delete node.operator;
      reinterpretToPattern(node.left);
      return node;
    }
  }
}

// #sec-destructuring-assignment
export function reinterpretToAssignment(node: any): void {
  switch (node.type) {
    case 'IdentifierReference':
    case 'Elison':
      return;
    case 'ArrayLiteral': {
      node.type = 'ArrayAssignmentPattern';
      const elements = node.elements;
      let i = elements.length;
      while (i--) {
        reinterpretToAssignment(elements[i]);
      }
      return;
    }
    case 'ObjectLiteral': {
      node.type = 'ObjectAssignmentPattern';
      const properties = node.properties;
      let i = properties.length;
      while (i--) {
        reinterpretToAssignment(properties[i]);
      }
      return;
    }
    case 'PropertyName': {
      reinterpretToAssignment(node.value);
      return;
    }
    case 'CoverInitializedName': {
      node.type = 'AssignmentElement';
      reinterpretToAssignment(node.left);
      return;
    }
    case 'SpreadElement': {
      node.type = 'AssignmentRestProperty';
      reinterpretToAssignment(node.argument);
      return;
    }
    case 'AssignmentExpression': {
      node.type = 'AssignmentElement';
      delete node.operator;
      reinterpretToAssignment(node.left);
      return;
    }
  }
}
export function validateFunctionName(state: ParserState, context: Context): any {
  let { tokenValue, startIndex, token } = state;

  if (context & Context.Strict && (token & Token.IsFutureReserved) > 0) {
    nextToken(state, context);
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.StrictModeReserved, DiagnosticKind.Error);
    tokenValue = '';
    startIndex = state.endIndex;
  } else if ((token & Token.IsKeyword) === Token.IsKeyword) {
    nextToken(state, context);
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
    tokenValue = '';
    startIndex = state.endIndex;
  } else if ((context & (Context.Await | Context.Module)) > 0 && token === Token.AwaitKeyword) {
    nextToken(state, context);
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnexpectedAwaitAsIdent, DiagnosticKind.Error);
    tokenValue = '';
    startIndex = state.endIndex;
  } else if (context & (Context.Yield | Context.Strict) && token === Token.YieldKeyword) {
    nextToken(state, context);
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.UnexpectedYieldAsIdent, DiagnosticKind.Error);
    tokenValue = '';
    startIndex = state.endIndex;
  } else if ((token & (Token.IsIdentifier | Token.IsFutureReserved)) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.ExpectedAnIdentifier, DiagnosticKind.Error);
    tokenValue = '';
    startIndex = state.endIndex;
    return finishNode(
      state,
      context,
      startIndex,
      DictionaryMap.BindingIdentifier(tokenValue),
      SyntaxKind.BindingIdentifier
    );
  }
  nextToken(state, context);
  return finishNode(
    state,
    context,
    startIndex,
    DictionaryMap.BindingIdentifier(tokenValue),
    SyntaxKind.BindingIdentifier
  );
}

export function validateIdentifierReference(state: ParserState, context: Context): string {
  if (state.token === Token.YieldKeyword) {
    if (context & Context.Yield) {
      addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedYieldAsIdent);
      return '';
    }
  } else if (context & Context.Await && state.token === Token.AwaitKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedAwaitAsIdent);
    return '';
  } else if (context & Context.Strict) {
    if (state.token === Token.LetKeyword) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.StrictInvalidLetInExprPos,
        DiagnosticKind.Error
      );
      return '';
    }
    if (context & Context.Strict && state.token & Token.IsFutureReserved) {
      addEarlyDiagnostic(state, context, DiagnosticCode.StrictModeReserved);
      return '';
    }
  }
  return state.tokenValue;
}
