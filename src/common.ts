import { Token, KeywordDescTable } from './ast/token';
import { nextToken } from './lexer/scan';
import { addDiagnostic, addparserDiagnostic, addEarlyDiagnostic, DiagnosticSource, DiagnosticKind } from './diagnostic';
import { DiagnosticCode } from './diagnostic/diagnostic-code';
import { SyntaxKind, NodeFlags } from './ast/node';
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
  InGlobal = 1 << 7,
  OptionsCST = 1 << 8,
  OptionsTS = 1 << 9,
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
  ImportMeta = 1 << 27,
  InBlock = 1 << 28,
  TopLevel = 1 << 29
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0,
  NodeHasErrors = 1 << 0,
  SeenDefault = 1 << 1,
  Octal = 1 << 2,
  SeenProto = 1 << 3,
  HasProto = 1 << 4,
  HasStrictReserved = 1 << 5,
  SimpleParameterList = 1 << 6
}

export const enum ArrowKind {
  NORMAL,
  ASYNC
}

export const enum DestuctionKind {
  NORMAL,
  REST,
  FOR
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
  Pattern = 1 << 0,
  Assignment = 1 << 1,
  AllowLHS = 1 << 2,
  ArgumentList = 1 << 3,
  Let = 1 << 4,
  Const = 1 << 5,
  Var = 1 << 6,
  CatchIdentifier = 1 << 7,
  CatchPattern = 1 << 8,
  Literal = 1 << 9,
  FunctionLexical = 1 << 10,
  FunctionStatement = 1 << 11,
  Class = 1 << 12,
  Empty = 1 << 13,
  Export = 1 << 14
}

export const enum Destructible {
  None = 0,
  Destructible = 1 << 0,
  Assignable = 1 << 1,
  NotDestructible = 1 << 2,
  MustDestruct = 1 << 3,
  DisallowTrailing = 1 << 4,
  HasProto = 1 << 5
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
  destructible: Destructible;
  assignable: boolean;
  diagnostics: any[];
  exportedNames: any;
  exportedBindings: any;
  nodeCursor: any;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };

  // For the scanner to work around lack of multiple return.
  lastChar: number;
}

export function isValidDirective(state: ParserState): boolean {
  return (
    state.token === Token.NumericLiteral ||
    ((state.token & (Token.IsPropertyOrCall | Token.IsExpressionStart)) === 0 && canConsumeSemicolon(state))
  );
}

export function canConsumeSemicolon(state: ParserState): boolean {
  return (
    state.lineTerminatorBeforeNextToken || (state.token & Token.IsAutomaticSemicolon) === Token.IsAutomaticSemicolon
  );
}

export function expectSemicolon(state: ParserState, context: Context): boolean {
  // Check for automatic semicolon insertion according to
  // the rules given in ECMA-262, section 7.9, page 21.
  if (state.token & Token.IsAutomaticSemicolon || state.lineTerminatorBeforeNextToken) {
    // consume the semicolon if it was explicitly provided.
    return consumeOpt(state, context | Context.AllowRegExp, Token.Semicolon);
  }
  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedSemicolon, DiagnosticKind.Error);
  return false;
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

export function consumeBit<T extends Token>(state: ParserState, context: Context, t: T, code: DiagnosticCode): boolean {
  if (state.token === t) {
    nextToken(state, context);
    return true;
  }
  addDiagnostic(state, context, DiagnosticSource.Parser, code, DiagnosticKind.Error);
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
  if (context & (Context.OptionsLoc | Context.ErrorRecovery)) {
    node.start = start;
    node.end = state.endIndex;
    if ((context & Context.ErrorRecovery) === Context.ErrorRecovery) {
      node.kind = kind;
      node.flags = NodeFlags.None;
    }
  }
  return node;
}

export function reinterpretToPattern(node: any): void {
  if (!node) return;
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
  const { tokenValue, startIndex, token } = state;
  if (context & (Context.Yield | Context.Strict) && token === Token.YieldKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.YieldAsFuncName);
  } else if ((context & (Context.Await | Context.Module)) > 0 && token === Token.AwaitKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.AwaitAsFuncName);
  } else if (context & Context.Strict && (token & Token.IsFutureReserved) > 0) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.StrictModeReserved, DiagnosticKind.Error);
  } else if ((token & Token.IsKeyword) === Token.IsKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
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

export function validateIdentifier(state: ParserState, context: Context, token: Token, start: number): void {
  if (context & (Context.Strict | Context.Yield) && token === Token.YieldKeyword) {
    addparserDiagnostic(state, context, start, DiagnosticCode.UnexpectedYieldAsIdent);
  }
  if (context & (Context.Module | Context.Await) && token === Token.AwaitKeyword) {
    addparserDiagnostic(state, context, start, DiagnosticCode.UnexpectedAwaitAsIdent);
  }
  if (context & Context.Strict && token & Token.IsFutureReserved) {
    addparserDiagnostic(state, context, start, DiagnosticCode.StrictModeReserved);
  }
  if (token & Token.IsKeyword) {
    addparserDiagnostic(state, context, start, DiagnosticCode.LabelAsKeyword);
  }
  if ((token & (Token.IsIdentifier | Token.IsFutureReserved)) === 0) {
    addparserDiagnostic(state, context, start, DiagnosticCode.LabelAsKeyword);
  }
}

export function validateIdentifierReference(state: ParserState, context: Context, start: number): string {
  if (state.token === Token.YieldKeyword) {
    if (context & (Context.Strict | Context.Yield)) {
      addparserDiagnostic(state, context, start, DiagnosticCode.UnexpectedYieldAsIdent);
      // return '';
    }
  } else if (context & (Context.Module | Context.Await) && state.token === Token.AwaitKeyword) {
    addparserDiagnostic(state, context, start, DiagnosticCode.UnexpectedAwaitAsIdent);
    return '';
  } else if (context & Context.Strict) {
    if (state.token === Token.LetKeyword) {
      addparserDiagnostic(state, context, start, DiagnosticCode.StrictInvalidLetInExprPos);
      return '';
    }
    if (context & Context.Strict && state.token & Token.IsFutureReserved) {
      addparserDiagnostic(state, context, start, DiagnosticCode.StrictModeReserved);
      return '';
    }
  }
  return state.tokenValue;
}
export function parseStatementWithLabelSet(t: Token, label: string, labels: any, nestedLabels: any): any {
  if (nestedLabels) {
    nestedLabels.push(label);
  } else {
    nestedLabels = [label];
  }
  if (isIterationStatement(t)) {
    labels.iterationLabels = nestedLabels;
  }
  return nestedLabels;
}

export function isIterationStatement(t: Token): boolean {
  // If encounter 'for', 'while', or 'do', it's an valid iteration statement start
  //
  // Examples:
  //      for(...) {}
  //      while(...) {}
  //      do { } while(...)
  return t === Token.ForKeyword || t === Token.WhileKeyword || t === Token.DoKeyword;
}

export function addLabel(state: ParserState, context: Context, label: string, labels: any, nestedLabels: any): any {
  let set = labels;

  while (set) {
    if (set['#' + label])
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedSemicolon, DiagnosticKind.Error);
    set = set.parentLabels;
  }
  labels = { parentLabels: labels, iterationLabels: null };
  labels['#' + label] = true;

  if (nestedLabels) {
    nestedLabels.push(label);
  } else {
    nestedLabels = [label];
  }

  return labels;
}

export function checkBreakStatement(state: ParserState, context: Context, labels: any, value: string): 0 | 1 {
  if (labels == null) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedSemicolon, DiagnosticKind.Error);
    return 1;
  }

  if (labels['#' + value]) return 1;

  while ((labels = labels.parentLabels)) if (labels['#' + value]) return 1;

  return 0;
}

export function checkContinueStatement(labels: any, value: string): 0 | 1 {
  let iterationLabel: any;

  while (labels) {
    if (labels.iterationLabels) {
      iterationLabel = labels.iterationLabels;
      for (let i = 0; i < iterationLabel.length; i++) {
        if (iterationLabel[i] === value) {
          return 1;
        }
      }
    }
    labels = labels.parentLabels;
  }
  return 0;
}

export function nextLiteralExactlyStrict(state: any, start: number): boolean {
  return (
    (state.lineTerminatorBeforeNextToken && state.startIndex - start === 13) ||
    (state.lineTerminatorBeforeNextToken && state.startIndex - start === 14) ||
    state.startIndex - start === 12
  );
}
