import { ImportCall } from './ast/expressions/import-call';
import { TemplateLiteral } from './ast/expressions/template-literal';
import { TemplateElement } from './ast/expressions/template-element';
import { TemplateExpression } from './ast/expressions/template-expression';
import { AwaitExpression } from './ast/expressions/await-expr';
import { ImportExport } from './ast/module/index';
import { AssignmentOperator, LogicalAssignmentOperator, AssignmentExpression } from './ast/expressions/assignment-expr';
import { ExportDeclaration } from './ast/module/export-declaration';
import { ExportSpecifier } from './ast/module/export-specifier';
import { ExportDefault } from './ast/module/export-default';
import { ImportSpecifier } from './ast/module/import-specifier';
import { NamedImports } from './ast/module/named-imports';
import { ImportClause } from './ast/module/import-clause';
import { ImportDeclaration } from './ast/module/import-declaration';
import { WhileStatement } from './ast/statements/while-stmt';
import { DoWhileStatement } from './ast/statements/do-stmt';
import { IfStatement } from './ast/statements/if-stmt';
import { CommaOperator } from './ast/expressions/commaOperator';
import { Statement, CaseBlock } from './ast/statements/index';
import { RegularExpressionLiteral } from './ast/expressions/regular-expression';
import { YieldExpression } from './ast/expressions/yield-expr';
import { NewTarget } from './ast/expressions/new-target';
import { AssignmentElement } from './ast/expressions/assignment-element';
import { Expression, MethodName, Parameter, BindingPattern, LeftHandSideExpression } from './ast/expressions/index';
import { createIdentifier, createBindingIdentifier } from './incremental/common';
import { MemberExpression } from './ast/expressions/member-expr';
import { IdentifierReference, createIdentifierReference } from './ast/expressions/identifierreference';
import { OptionalExpression } from './ast/expressions/optional-expr';
import { AssignmentRestElement } from './ast/expressions/assignment-rest-element';
import { ObjectBindingPattern } from './ast/expressions/object-binding-pattern';
import { FunctionExpression } from './ast/expressions/function-expr';
import { FunctionDeclaration } from './ast/declarations/function-declaration';
import { ForDeclaration } from './ast/declarations/for-declaration';
import { BindingElement } from './ast/expressions/binding-element';
import { ArrayBindingPattern } from './ast/expressions/array-binding-pattern';
import { ClassElement } from './ast/expressions/class-element';
import { ClassExpression } from './ast/expressions/class-expr';
import { ClassDeclaration } from './ast/declarations/class-declaration';
import { ForOfStatement, ForAwaitStatement } from './ast/statements/for-of-stmt';
import { ForInStatement } from './ast/statements/for-in-stmt';
import { ForStatement } from './ast/statements/for-stmt';
import { ParenthesizedExpression } from './ast/expressions/parenthesized-expr';
import { ArrayLiteral } from './ast/expressions/array-literal';
import { BindingRestElement } from './ast/expressions/binding-rest-element';
import { SuperCall } from './ast/expressions/super-call';
import { SuperProperty } from './ast/expressions/super-property';
import { SpreadElement } from './ast/expressions/spread-element';
import { SpreadProperty } from './ast/expressions/spread-property';
import { ConciseBody } from './ast/expressions/concise-body';
import { ArrowFunction, ArrowFormals } from './ast/expressions/arrow-function';
import { MethodDefinition } from './ast/expressions/method-definition';
import { FunctionBody } from './ast/expressions/function-body';
import { ObjectLiteral } from './ast/expressions/object-literal';
import { MemberChain } from './ast/expressions/member-chain-expr';
import { ThisExpression } from './ast/expressions/this-expr';
import { NullLiteral } from './ast/expressions/null-expr';
import { StringLiteral } from './ast/expressions/string-literal';
import { NumericLiteral } from './ast/expressions/numeric-literal';
import { BooleanLiteral } from './ast/expressions/boolean-literal';
import { CallChain } from './ast/expressions/call-chain';
import { NewExpression } from './ast/expressions/new-expr';
import { IdentifierName, createIdentifierName } from './ast/expressions/identifiername';
import { BindingIdentifier } from './ast/expressions/binding-identifier';
import { BindingRestProperty } from './ast/expressions/binding-rest-property';
import { ExpressionStatement } from './ast/statements/expression-stmt';
import { UnaryExpression, UnaryOperator } from './ast/expressions/unary-expr';
import { PrefixUpdateExpression, UpdateOp } from './ast/expressions/prefix-update-expr';
import { PostfixUpdateExpression } from './ast/expressions/postfix-update-expr';
import { BlockStatement } from './ast/statements/block-stmt';
import { EmptyStatement } from './ast/statements/empty-stmt';
import { DebuggerStatement } from './ast/statements/debugger-stmt';
import { ReturnStatement } from './ast/statements/return-stmt';
import { BreakStatement } from './ast/statements/break-stmt';
import { ContinueStatement } from './ast/statements/continue-stmt';
import { LabelledStatement } from './ast/statements/labelled-stmt';
import { WithStatement } from './ast/statements/with-stmt';
import { ThrowStatement } from './ast/statements/throw-stmt';
import { CatchClause, TryStatement } from './ast/statements/try-stmt';
import { ConditionalExpression } from './ast/expressions/conditional-expr';
import { BinaryExpression, BinaryOperator } from './ast/expressions/binary-expr';
import { LexicalBinding } from './ast/statements/lexical-binding';
import { LexicalDeclaration } from './ast/declarations/lexical-declaration';
import { VariableStatement } from './ast/statements/variable-stmt';
import { VariableDeclaration } from './ast/declarations/variable-declaration';
import { SwitchStatement } from './ast/statements/switch-stmt';
import { addDiagnostic, addparserDiagnostic, addEarlyDiagnostic, DiagnosticSource, DiagnosticKind } from './diagnostic';
import { DiagnosticCode } from './diagnostic/diagnostic-code';
import { Token, KeywordDescTable } from './ast/token';
import { Constants } from './constants';
import { SyntaxKind } from './ast/node';
import { Directive } from './ast/directive-node';
import { nextToken } from './lexer/scan';
import { scanTemplateTail } from './lexer/template';
import { DictionaryMap } from './dictionary/dictionary-map';
import { ScopeKind } from './scope/common';
import {
  parseBlockElements,
  parseBindingElements,
  parseListElements,
  parseSwitchElements
} from './incremental/incremental';
import {
  createScope,
  createParentScope,
  ScopeState,
  addVarName,
  addBlockName,
  addVarOrBlock,
  declareUnboundVariable,
  addBindingToExports
} from './scope';
import {
  Context,
  Flags,
  BindingType,
  ParserState,
  Destructible,
  consume,
  consumeOpt,
  expectSemicolon,
  optionalBit,
  PropertyKind,
  ArrowKind,
  finishNode,
  canConsumeSemicolon,
  validateFunctionName,
  validateIdentifierReference,
  reinterpretToPattern,
  reinterpretToAssignment,
  DestuctionKind,
  validateIdentifier,
  parseStatementWithLabelSet,
  checkBreakStatement,
  checkContinueStatement,
  nextLiteralExactlyStrict,
  addLabel
} from './common';

/**
 * Interface for statements
 */
export interface StatementCallback {
  (state: ParserState, context: Context, scope: ScopeState, label: any, labelSet: any): Statement;
}

/**
 * Interface for variables and lexicals
 */
export interface LexicalCallback {
  (state: ParserState, context: Context, scope: ScopeState, type: BindingType): LexicalBinding | VariableDeclaration;
}

/**
 * Create a new parser instance.
 */
export function create(source: string, nodeCursor?: any): ParserState {
  return {
    source,
    flags: Flags.Empty,
    index: 0,
    line: 1,
    columnOffset: 0,
    lineTerminatorBeforeNextToken: false,
    positionForNextToken: 0,
    lineForNextToken: 0,
    columnForNextToken: 0,
    startIndex: 0,
    endIndex: 0,
    endColumn: 0,
    regExpPattern: '',
    regExpFlags: '',
    nodeHasError: false,
    positionBeforeToken: 0,
    length: source.length,
    token: 0,
    tokenValue: '',
    tokenRaw: '',
    tokenRegExp: undefined,
    destructible: Destructible.None,
    assignable: true,
    exportedNames: [],
    exportedBindings: [],
    diagnostics: [],
    nodeCursor,
    lastChar: 0
  };
}

// ModuleItemList :
//   ModuleItem
//   ModuleItemListModuleItem
export function parseModuleItemList(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  statementList: Statement[]
): Statement[] {
  while (state.token !== Token.EOF) {
    statementList.push(parseModuleItem(state, context, scope));
  }

  // Use a locale variable for 'exportedBindings' to avoid member access on each iteration.
  const exportedBindings = state.exportedBindings;
  for (const key in exportedBindings) {
    if (key[0] === '#' && !(scope as any)[key]) addEarlyDiagnostic(state, context, DiagnosticCode.NoExpBinding, key);
  }

  return statementList;
}

// StatementList :
//   StatementListItem
//   StatementList StatementListItem
export function parseStatementList(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  statementList: Statement[]
): Statement[] {
  // StatementList ::
  //   (StatementListItem)* <end_token>

  while (state.token !== Token.EOF) {
    statementList.push(parseStatementListItem(state, context, scope, null, null));
  }

  return statementList;
}

// StatementList :
//   StatementListItem
//   StatementList StatementListItem
//
// ModuleItemList :
//   ModuleItem
//   ModuleItemListModuleItem
export function parseStatemenOrModuleItemtList(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  statementList: Statement[],
  cb: StatementCallback
): Statement[] {
  // StatementList ::
  //   (StatementListItem)* <end_token>

  while (state.token !== Token.EOF) {
    if (state.token & Constants.SourceElements) {
      statementList.push(parseBlockElements(state, context, scope, null, null, cb));
      continue;
    }

    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedStatement, DiagnosticKind.Error);

    // We allow regular expressions here for cases like ')=/++!{class'. For this particular case the first
    // two punctuators are consumed.
    // '/' in an statement position should be parsed as an unterminated regular expression.
    nextToken(state, context | Context.AllowRegExp);
  }

  return statementList;
}

// StatementListItem :
//   Statement
//   Declaration
//
// Declaration :
//   HoistableDeclaration
//   ClassDeclaration
//   LexicalDeclaration
export function parseStatementListItem(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  ownLabels: any[] | null
): Statement {
  switch (state.token) {
    case Token.FunctionKeyword:
    case Token.AsyncKeyword:
      return parseFunctionDeclaration(state, context, scope, false);
    case Token.ClassKeyword:
      return parseClassDeclaration(state, context, scope);
    case Token.VarKeyword:
      return parseVariableStatement(state, context, scope, BindingType.Var);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(state, context, scope, BindingType.Const, labels, ownLabels);
    case Token.LetKeyword:
      return parseLexicalDeclaration(state, context, scope, BindingType.Let, labels, ownLabels);
    case Token.ImportKeyword:
      const start = state.startIndex;
      nextToken(state, context | Context.AllowRegExp);
      // `import` `(`
      if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftParen)) {
        return parseImportCall(state, context, start);
      }
      // `import` `.`
      if (consumeOpt(state, context, Token.Period)) {
        return parseImportMeta(state, context, start);
      }
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ImportInScript, DiagnosticKind.Error);
      return parseImportDeclaration(state, context, scope, start);
    case Token.ExportKeyword:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExportInScript, DiagnosticKind.Error);
      return parseExportDeclaration(state, context, scope);
    // falls through
    default:
      return parseStatement(state, context, scope, labels, ownLabels, true);
  }
}

// Statement ::
//   Block
//   VariableStatement
//   EmptyStatement
//   ExpressionStatement
//   IfStatement
//   IterationStatement
//   ContinueStatement
//   BreakStatement
//   ReturnStatement
//   WithStatement
//   LabelledStatement
//   SwitchStatement
//   ThrowStatement
//   TryStatement
//   DebuggerStatement
export function parseStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  ownLabels: any[] | null,
  allowFunction: boolean
): Statement {
  switch (state.token) {
    case Token.LeftBrace:
      return parseBlockStatement(state, context, scope, /* isCatchScope */ false, labels, ownLabels);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.IfKeyword:
      return parseIfStatement(state, context, scope, labels);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context, scope, labels, ownLabels);
    case Token.WhileKeyword:
      return parseWhileStatement(state, context, scope, labels, ownLabels);
    case Token.ForKeyword:
      return parseForStatement(state, context, scope, labels);
    case Token.VarKeyword:
      return parseVariableStatement(state, context, scope, BindingType.Var);
    case Token.ContinueKeyword:
      return parseContinueStatement(state, context, labels);
    case Token.BreakKeyword:
      return parseBreakStatement(state, context, labels);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.TryKeyword:
    // Miscellaneous error cases arguably better caught here than elsewhere.
    case Token.CatchKeyword:
    case Token.FinallyKeyword:
      return parseTryStatement(state, context, scope, labels);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(state, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context, scope, labels, ownLabels);
    case Token.WithKeyword:
      return parseWithStatement(state, context, scope, labels, ownLabels);
    case Token.AsyncKeyword:
      return parseAsyncAsIdentifierReference(state, context, scope);
    case Token.FunctionKeyword:
      // FunctionDeclaration are only allowed as a StatementListItem, not in
      // an arbitrary Statement position.
      addEarlyDiagnostic(
        state,
        context,
        context & Context.Strict
          ? DiagnosticCode.StrictFunction
          : context & Context.OptionsDisableWebCompat /* AnnexB */
          ? DiagnosticCode.WebCompatFunction
          : DiagnosticCode.SloppyFunction
      );
      return parseFunctionDeclaration(state, context, scope, false);
    // In 'recovery mode' we allow this and return an function declaration.
    case Token.ClassKeyword:
      // See the comment above. Same rules apply.
      addEarlyDiagnostic(state, context, DiagnosticCode.ClassForbiddenAsStatement);
      return parseClassDeclaration(state, context, scope);
    default:
      return parseExpressionOrLabelledStatement(state, context, scope, labels, ownLabels, allowFunction);
  }
}

// ModuleItemList :
//   ModuleItem
//   ModuleItemList ModuleItem
//
// ModuleItem :
//   ImportDeclaration
//   ExportDeclaration
//   StatementListItem
export function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): ImportExport {
  switch (state.token) {
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, scope);
    case Token.ImportKeyword:
      const start = state.startIndex;
      nextToken(state, context | Context.AllowRegExp);
      // `import` `(`
      if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftParen)) {
        return parseImportCall(state, context, start);
      }
      // `import` `.`
      if (consumeOpt(state, context, Token.Period)) {
        return parseImportMeta(state, context, start);
      }
      return parseImportDeclaration(state, context, scope, start);
    default:
      return parseStatementListItem(state, context, scope, null, null);
  }
}

// ImportDeclaration :
//   `import` ImportClause FromClause `;`
//   `import` ModuleSpecifier `;`
export function parseImportDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  start: number
): ImportDeclaration | ExpressionStatement {
  let moduleSpecifier = null;
  let importClause = null;
  let fromClause = null;

  if (state.token === Token.StringLiteral) {
    moduleSpecifier = parseStringLiteral(state, context, /* isDirective */ false);
  } else if (
    state.token & Constants.IdentifierOrFutureReserved || // import id
    state.token === Token.Multiply || // import *
    state.token === Token.LeftBrace // import {
  ) {
    importClause = parseImportClause(state, context, scope);
    fromClause = parseFromClause(state, context);
  } else {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedToken,
      DiagnosticKind.Error,
      KeywordDescTable[state.token & Token.Type]
    );
  }

  expectSemicolon(state, context);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ImportDeclaration(fromClause, moduleSpecifier, importClause),
    SyntaxKind.ImportDeclaration
  );
}

// ImportClause :
//   ImportedDefaultBinding
//   NameSpaceImport
//   NamedImports
//   ImportedDefaultBinding `,` NameSpaceImport
//   ImportedDefaultBinding `,` NamedImports
//
// ImportedBinding :
//   BindingIdentifier
//
// // ImportedDefaultBinding : [MODIFIED]
//   BindingIdentifier
export function parseImportClause(state: ParserState, context: Context, scope: ScopeState): ImportClause {
  const start = state.startIndex;
  let defaultBinding = null;
  let namespace = null;
  let namedImports = null;
  if (state.token & Constants.IdentifierOrFutureReserved) {
    defaultBinding = parseBindingIdentifier(state, context, scope, BindingType.Let);
    if (!consumeOpt(state, context, Token.Comma)) {
      return finishNode(
        state,
        context,
        start,
        DictionaryMap.ImportClause(defaultBinding, namespace, namedImports),
        SyntaxKind.ImportClause
      );
    }
  }
  if (state.token === Token.Multiply) {
    namespace = parseNameSpaceImport(state, context, scope);
  } else if (state.token === Token.LeftBrace) {
    namedImports = parseNamedImports(state, context, scope);
  } else {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedToken,
      DiagnosticKind.Error,
      KeywordDescTable[state.token & Token.Type]
    );
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ImportClause(defaultBinding, namespace, namedImports),
    SyntaxKind.ImportClause
  );
}

// NameSpaceImport :
//   `*` `as` ImportedBinding
export function parseNameSpaceImport(state: ParserState, context: Context, scope: ScopeState): BindingIdentifier {
  consume(state, context, Token.Multiply);
  consume(state, context, Token.AsKeyword);
  return parseBindingIdentifier(state, context, scope, BindingType.Let);
}

// NamedImports :
//   `{` `}`
//   `{` ImportsList `}`
//   `{` ImportsList `,` `}`
export function parseNamedImports(state: ParserState, context: Context, scope: ScopeState): NamedImports {
  const start = state.startIndex;
  consume(state, context, Token.LeftBrace);
  const importsList = [];
  const check = context & Context.ErrorRecovery ? Constants.ModuleElementsR : Constants.ModuleElementsN;
  while (state.token & check) {
    importsList.push(parseImportSpecifier(state, context, scope));
    if (state.token === Token.RightBrace) break;
    consume(state, context, Token.Comma);
  }
  consume(state, context | Context.AllowRegExp, Token.RightBrace);
  return finishNode(state, context, start, DictionaryMap.NamedImports(importsList), SyntaxKind.NamedImports);
}

// ImportSpecifier :
//   ImportedBinding
//   IdentifierName `as` ImportedBinding
export function parseImportSpecifier(state: ParserState, context: Context, scope: ScopeState): ImportSpecifier {
  const start = state.startIndex;
  const tokenValue = state.tokenValue;
  const token = state.token;
  const name = parseIdentifierName(state, context);
  let importedBinding: BindingIdentifier | IdentifierName | null = null;
  let identifierName: BindingIdentifier | IdentifierName | null = null;
  if (consumeOpt(state, context, Token.AsKeyword)) {
    identifierName = name;
    importedBinding = parseBindingIdentifier(state, context, scope, BindingType.Let);
  } else {
    // Keywords cannot be bound to themselves, so an import name
    // that is a keyword is a syntax error if it is not followed
    // by the keyword 'as'.
    // See the ImportSpecifier production in ES6 section 15.2.2.
    validateIdentifier(state, context, token, state.startIndex);
    addBlockName(state, context, scope, tokenValue, BindingType.Let);
    importedBinding = name;
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ImportSpecifier(identifierName, importedBinding),
    SyntaxKind.NamedImports
  );
}

// SwitchStatement :
//   `switch` `(` Expression `)` CaseBlock
export function parseSwitchStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  ownLabels: any[] | null
): SwitchStatement {
  const start = state.startIndex;
  consume(state, context, Token.SwitchKeyword);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context, Token.RightParen);
  consume(state, context, Token.LeftBrace);
  const clauses = parseCaseBlock(state, context, scope, labels, ownLabels);
  consume(state, context | Context.AllowRegExp, Token.RightBrace);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.SwitchStatement(expression, clauses),
    SyntaxKind.SwitchStatement
  );
}

// CaseBlock :
//   `{` CaseClauses? `}`
//   `{` CaseClauses? DefaultClause CaseClauses? `}`
export function parseCaseBlock(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  ownLabels: any[] | null
): CaseBlock[] {
  const clauses = [];
  scope = createParentScope(scope, ScopeKind.SwitchStatement);
  // Pass the 'Context.InBlock' bit to mark that we enter a new block scope and unset the
  // 'Context.TopLevel' bit - we are no longer at the 'TopLevel'.
  // Keeping the 'Context.TopLevel' bit will have a bad result on the scope tracking.
  context = (context | 0b00110000000100000000000000000000) ^ 0b00100000000000000000000000000000;
  // In 'normal mode' the 'check' constant allows every token except for 'Token.DefaultKeyword',
  // 'Token.CaseKeyword', and the 'Token.RightBrace'. This is in line with 'normal' parsing behaviour.
  // Only 'Token.IsStatementStart' and 'Token.IsExpressionStart' are allowed in 'recovery mode'.
  const check = context & Context.ErrorRecovery ? Constants.SwitchClausesR : Constants.SwitchClausesN;
  while (state.token & Token.IsCaseOrDefault) {
    clauses.push(parseSwitchElements(state, context, scope, check, labels, ownLabels, parseCaseOrDefaultClause));
  }
  return clauses;
}

// CaseClauses :
//   CaseClause
//   CaseClauses CauseClause
// CaseClause :
//   `case` Expression `:` StatementList?
//
// DefaultClause :
//   `default` `:` StatementList?
export function parseCaseOrDefaultClause(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  check: Constants,
  labels: any[],
  ownLabels: any[] | null
): CaseBlock {
  const statements = [];
  const start = state.startIndex;

  if (consumeOpt(state, context | Context.AllowRegExp, Token.CaseKeyword)) {
    const expression = parseExpressions(state, context);
    consume(state, context | Context.AllowRegExp, Token.Colon);
    while (state.token & check) statements.push(parseStatementListItem(state, context, scope, labels, ownLabels));
    return finishNode(state, context, start, DictionaryMap.CaseClause(expression, statements), SyntaxKind.CaseClause);
  }

  consume(state, context, Token.DefaultKeyword);
  consume(state, context | Context.AllowRegExp, Token.Colon);

  while (state.token & check) statements.push(parseStatementListItem(state, context, scope, labels, ownLabels));
  return finishNode(state, context, start, DictionaryMap.DefaultClause(statements), SyntaxKind.DefaultClause);
}

// WithStatement :
//   `with` `(` Expression `)` Statement
export function parseWithStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  ownLabels: any[] | null
): WithStatement {
  if (context & Context.Strict) addEarlyDiagnostic(state, context, DiagnosticCode.StrictWith);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  // In recovery mode for cases like 'with(true) let a' where a lexical declaration cannot appear
  // in a single-statement context, we can either pretend that a ';' should exist after ')' to trigger ASI.
  // That way we could use 'parseStatementListItem' to parse out 'let' as an lexical declaration, or we can treat
  //  it as two 'IdentifierReferences' - one for 'let' as part of the 'WithStatement' body and one for 'a'.
  //
  // This is an early error in the ECMA specs so we choose the latter to be in line with how
  // this case 'with () let' are being parsed - 'let' as an 'IdentifierReference'.
  // That means we will parse out 'WithStatement' with 'let' as the body, and 'a' as an
  // stand-alone 'IdentifierReference'.
  //
  //  'with(true) let; a'
  //
  // A diagnostic will be given for the missing semicolon - ';'.
  //
  const statement = parseStatement(state, context | Context.InIteration, scope, labels, ownLabels, false);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.WithStatement(expression, statement),
    SyntaxKind.WithStatement
  );
}

// ThrowStatement :
//   `throw` [no LineTerminator here] Expression `;`
export function parseThrowStatement(state: ParserState, context: Context): ThrowStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (state.lineTerminatorBeforeNextToken) addEarlyDiagnostic(state, context, DiagnosticCode.NewlineAfterThrow);
  const expression = parseExpressions(state, context);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ThrowStatement(expression), SyntaxKind.ThrowStatement);
}

// TryStatement :
//   `try` Block Catch
//   `try` Block Finally
//   `try` Block Catch Finally
//
// Catch :
//   `catch` `(` CatchParameter `)` Block
//   `catch` Block
//
// Finally :
//   `finally` Block
//
// CatchParameter :
//   BindingIdentifier
//   BindingPattern
export function parseTryStatement(state: ParserState, context: Context, scope: any, labels: any[]): TryStatement {
  const start = state.startIndex;
  // We can't 'optimize' with 'nextToken()' here because of some weird edge cases
  // like 'throw {x} catch', 'throw {x} finally' and 'throw {x} catch finally'.
  // For this cases we need to reconstruct a malformed 'try statement'.
  // Both 'catch' and 'finally' tokens will be consumed and lead to an invalid
  // 'catch' or 'finally' block that may end in an infinite loop.
  consume(state, context | Context.AllowRegExp, Token.TryKeyword);
  // Allowing regular expressions here results in some weird cases like 'try/catch/finally/{'.
  // In this particular case the 'try' token is already consumed and the 'block' will not be
  // parsed unless we have an '{'. So in this case we will end up constructing a 'Try statement'
  // with no catch clause. The Regular Expression will be parsed out as an 'BinaryExpression'
  // where '/' is the operator and the 'right' is 'ObjectLiteral'.
  const block = parseBlockStatement(state, context, scope, /* isCatchScope */ false, labels, null);
  const catchClause = state.token === Token.CatchKeyword ? parseCatchClause(state, context, scope, labels) : null;
  const finalizer = consumeOpt(state, context | Context.AllowRegExp, Token.FinallyKeyword)
    ? parseBlockStatement(state, context, scope, /* isCatchScope */ false, labels, null)
    : null;

  if (!catchClause && !finalizer) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.NoCatchOrFinally, DiagnosticKind.Error);
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.TryStatement(block, catchClause, finalizer),
    SyntaxKind.TryStatement
  );
}

// Catch :
//   `catch` `(` CatchParameter `)` Block
//   `catch` Block
//
// CatchParameter :
//   BindingIdentifier
//   BindingPattern
export function parseCatchClause(state: ParserState, context: Context, scope: ScopeState, labels: any[]): CatchClause {
  const start = state.startIndex;
  let catchScope: ScopeState = scope;
  let binding = null;
  consume(state, context | Context.AllowRegExp, Token.CatchKeyword);
  if (consumeOpt(state, context, Token.LeftParen)) {
    // Create a lexical scope node around the whole catch clause, including the head
    scope = createParentScope(scope, ScopeKind.Block);
    const type = state.token & Token.IsPatternStart ? BindingType.CatchPattern : BindingType.CatchIdentifier;
    binding = parseBindingPatternOrIdentifier(state, context | Context.AllowRegExp, scope, type);
    consume(state, context | Context.AllowRegExp, Token.RightParen);
    // https://tc39.es/ecma262/#sec-runtime-semantics-catchclauseevaluation
    //
    // Step 8 means that the body of a catch block always has an additional
    // lexical scope.
    catchScope = createParentScope(scope, ScopeKind.CatchBlock);
  }
  const block = parseBlockStatement(state, context, catchScope, /* isCatchScope */ true, labels, null);

  return finishNode(state, context, start, DictionaryMap.CatchClause(binding, block), SyntaxKind.CatchClause);
}

// IfStatement :
//  `if` `(` Expression `)` Statement `else` Statement
//  `if` `(` Expression `)` Statement
export function parseIfStatement(state: ParserState, context: Context, scope: ScopeState, labels: any[]): IfStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const consequent = parseConsequentOrAlternative(state, context, scope, labels);
  const alternate = consumeOpt(state, context, Token.ElseKeyword)
    ? parseConsequentOrAlternative(state, context, scope, labels)
    : null;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.IfStatement(expression, consequent, alternate),
    SyntaxKind.IfStatement
  );
}

// 'B Additional ECMAScript Features for Web Browsers'
//   - B.3.4 FunctionDeclarations in IfStatement Statement Clauses
export function parseConsequentOrAlternative(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[]
): Statement {
  // Annex B.3.4 says that unbraced FunctionDeclarations under if/else in
  // non-strict code act as if they were braced: 'if (x) function f() {}'
  // parses as 'if (x) { function f() {} }'.
  //
  return context & (Context.OptionsDisableWebCompat | Context.Strict) || state.token !== Token.FunctionKeyword
    ? parseStatement(state, context, scope, labels, null, false)
    : parseFunctionDeclaration(state, context, createParentScope(scope, ScopeKind.Block), /* disallowGen */ true);
}

// WhileStatement :
//   `while` `(` Expression `)` Statement
export function parseWhileStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  ownLabels: any[] | null
): WhileStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(state, context | Context.InIteration, scope, labels, ownLabels, false);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.WhileStatement(expression, statement),
    SyntaxKind.WhileStatement
  );
}

// `do` Statement `while` `(` Expression `)` `;`
export function parseDoWhileStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[],
  nestedLabel: any
): DoWhileStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const statement = parseStatement(state, context | Context.InIteration, scope, labels, nestedLabel, false);
  consume(state, context, Token.WhileKeyword);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  consumeOpt(state, context | Context.AllowRegExp, Token.Semicolon);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.DoWhileStatement(expression, statement),
    SyntaxKind.DoWhileStatement
  );
}

// BlockStatement : Block
export function parseBlockStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isCatchScope: boolean,
  labels: any[],
  ownLabels: any[] | null
): BlockStatement {
  const start = state.startIndex;
  const statements = [];
  // We are no longer at the 'TopLevel', so we unset the 'Context.TopLevel' bit now and set the
  // 'Context.InBlock' bit instead to mark that we enter a new block scope for cases like '{}'.
  context = (context | 0b00110000000100000000000000000000) ^ 0b00100000000000000000000000000000;

  if (consume(state, context | Context.AllowRegExp, Token.LeftBrace)) {
    // We avoid making a a new 'catch scope' while parsing out a "TryStatement" for
    // cases like 'try {} catch(x) {}'. Instead we continue with current scope.
    if (!isCatchScope) scope = createParentScope(scope, ScopeKind.Block);
    while (state.token & Constants.SourceElements) {
      statements.push(parseBlockElements(state, context, scope, labels, ownLabels, parseStatementListItem));
    }
    consume(state, context | Context.AllowRegExp, Token.RightBrace);
  }

  return finishNode(state, context, start, DictionaryMap.BlockStatement(statements), SyntaxKind.BlockStatement);
}

// DebuggerStatement : `debugger` `;
export function parseDebuggerStatement(state: ParserState, context: Context): DebuggerStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.DebuggerStatement(), SyntaxKind.DebuggerStatement);
}

// BreakStatement :
//   `break` `;`
//   `break` [no LineTerminator here] LabelIdentifier `;`
export function parseBreakStatement(state: ParserState, context: Context, labels: any[]): BreakStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label = null;
  if (!state.lineTerminatorBeforeNextToken && state.token & Constants.IdentifierOrFutureReserved) {
    // Pass the 'Context.AllowRegExp' bit so we safely can parse out edge cases where
    // there is a newline and the next token is a regex. For example `label: for(;;) break label \n /foo/`.
    // ASI will automatically kick in.
    const tokenValue = state.tokenValue;
    label = parseIdentifierReference(state, context | Context.AllowRegExp);
    if (checkBreakStatement(state, context, labels, tokenValue) === 0) {
      addEarlyDiagnostic(state, context, DiagnosticCode.UnknownLabel, tokenValue);
    }
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    addEarlyDiagnostic(state, context, DiagnosticCode.InvalidBreak);
  }
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.BreakStatement(label), SyntaxKind.BreakStatement);
}

// ContinueStatement :
//   `continue` `;`
//   `continue` [no LineTerminator here] LabelIdentifier `;
export function parseContinueStatement(state: ParserState, context: Context, labels: any[]): ContinueStatement {
  if ((context & Context.InIteration) === 0) addEarlyDiagnostic(state, context, DiagnosticCode.IllegalContinue);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label = null;
  // Pass the 'Context.AllowRegExp' bit for the same reason given for 'parseBreakStatement'.
  if (!state.lineTerminatorBeforeNextToken && state.token & Constants.IdentifierOrFutureReserved) {
    const tokenValue = state.tokenValue;
    label = parseIdentifierReference(state, context | Context.AllowRegExp);
    if (checkContinueStatement(labels, tokenValue) === 0) {
      addEarlyDiagnostic(state, context, DiagnosticCode.UnknownLabel, tokenValue);
    }
  }
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ContinueStatement(label), SyntaxKind.ContinueStatement);
}

// EmptyStatement ::
// ';'
export function parseEmptyStatement(state: ParserState, context: Context): EmptyStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  return finishNode(state, context, start, DictionaryMap.EmptyStatement(), SyntaxKind.EmptyStatement);
}

// ReturnStatement :
//   `return` `;`
//   `return` [no LineTerminator here] Expression `;`
export function parseReturnStatement(state: ParserState, context: Context): ReturnStatement {
  if ((context & Context.Return) === 0) addEarlyDiagnostic(state, context, DiagnosticCode.IllegalReturn);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const expression = canConsumeSemicolon(state) ? null : parseExpressions(state, context);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ReturnStatement(expression), SyntaxKind.ReturnStatement);
}

// `for` `(` [lookahead != `let` `[`] Expression? `;` Expression? `;` Expression? `)` Statement
// `for` `(` `var` VariableDeclarationList `;` Expression? `;` Expression? `)` Statement
// `for` `(` LexicalDeclaration Expression? `;` Expression? `)` Statement
// `for` `(` [lookahead != `let` `[`] LeftHandSideExpression `in` Expression `)` Statement
// `for` `(` `var` ForBinding `in` Expression `)` Statement
// `for` `(` ForDeclaration `in` Expression `)` Statement
// `for` `(` [lookahead != `let`] LeftHandSideExpression `of` AssignmentExpression `)` Statement
// `for` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
// `for` `(` ForDeclaration `of` AssignmentExpression `)` Statement
// `for` `await` `(` [lookahead != `let`] LeftHandSideExpression `of` AssignmentExpression `)` Statement
// `for` `await` `(` `var` ForBinding `of` AssignmentExpression `)` Statement
// `for` `await` `(` ForDeclaration `of` AssignmentExpression `)` Statement

export function parseForStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any[]
): ForStatement | ForAwaitStatement | ForOfStatement | ForInStatement {
  const start = state.startIndex;

  consume(state, context, Token.ForKeyword);

  const isAwait = (context & Context.Await) === Context.Await && consumeOpt(state, context, Token.AwaitKeyword);

  scope = createParentScope(scope, ScopeKind.ForStatement);

  consume(state, context | Context.AllowRegExp, Token.LeftParen);

  let initializer: ForDeclaration | Expression | null | any = null;
  const innerStart = state.startIndex;

  if (state.token !== Token.Semicolon) {
    // 'var', 'let', 'const'
    if (state.token & Token.IsVarLexical) {
      if (state.token === Token.LetKeyword) {
        nextToken(state, context);
        if (state.token & Constants.PatternOrIdentifier) {
          initializer = parseForDeclaration(
            state,
            context | Context.DisallowIn,
            /* isConst */ false,
            scope,
            BindingType.Let,
            parseForLexicalBinding,
            innerStart
          );
          state.assignable = true;
        } else {
          if (context & Context.Strict) addEarlyDiagnostic(state, context, DiagnosticCode.LetInStrict);

          initializer = finishNode(
            state,
            context,
            innerStart,
            DictionaryMap.IdentifierReference('let'),
            SyntaxKind.Identifier
          );

          state.assignable = true;

          initializer = parseMemberExpression(state, context, initializer, true, start);

          // In a for-of loop, 'let' that starts the loop head is a 'let' keyword,
          // per the [lookahead ≠ let] restriction on the LeftHandSideExpression
          // variant of such loops, so 'let' are disallowed here.
          if (state.token === Token.OfKeyword) addEarlyDiagnostic(state, context, DiagnosticCode.LetInStrict);
        }
      } else if (consumeOpt(state, context, Token.ConstKeyword)) {
        initializer = parseForDeclaration(
          state,
          context | Context.DisallowIn,
          /* isConst */ true,
          scope,
          BindingType.Const,
          parseForLexicalBinding,
          innerStart
        );
        state.assignable = true;
      } else {
        nextToken(state, context);
        initializer = parseForDeclaration(
          state,
          context | Context.DisallowIn,
          /* isConst */ false,
          scope,
          BindingType.Var,
          parseForVariableDeclaration,
          innerStart
        );
        state.assignable = true;
      }

      if (
        isAwait
          ? consume(state, context | Context.AllowRegExp, Token.OfKeyword)
          : consumeOpt(state, context | Context.AllowRegExp, Token.OfKeyword)
      ) {
        const expression = parseExpression(state, (context | Context.DisallowIn) ^ Context.DisallowIn);

        consume(state, context, Token.RightParen);

        return finishNode(
          state,
          context,
          start,
          DictionaryMap.ForAwaitStatement(
            initializer,
            expression,
            parseStatement(state, context | Context.InIteration, scope, labels, null, false),
            isAwait
          ),
          SyntaxKind.ForAwaitStatement
        );
      }

      if (consumeOpt(state, context | Context.AllowRegExp, Token.InKeyword)) {
        const expression = parseExpressions(state, context);

        consume(state, context, Token.RightParen);

        return finishNode(
          state,
          context,
          start,
          DictionaryMap.ForInStatement(
            initializer,
            expression,
            parseStatement(state, context | Context.InIteration, scope, labels, null, false)
          ),
          SyntaxKind.ForInStatement
        );
      }

      let condition: Expression | null = null;
      let incrementor: Expression | null = null;

      initializer = parseExpressionOrHigher(state, context, initializer, state.startIndex);

      consume(state, context | Context.AllowRegExp, Token.Semicolon);

      if (state.token !== Token.Semicolon) condition = parseExpressions(state, context);

      consume(state, context | Context.AllowRegExp, Token.Semicolon);

      if (state.token !== Token.RightParen) incrementor = parseExpressions(state, context);

      consume(state, context, Token.RightParen);

      return finishNode(
        state,
        context,
        start,
        DictionaryMap.ForStatement(
          initializer,
          incrementor,
          condition,
          parseStatement(state, context | Context.InIteration, scope, labels, null, false)
        ),
        SyntaxKind.ForStatement
      );
    }

    let destructible!: Destructible;

    if (state.token & Token.IsPatternStart) {
      initializer =
        state.token === Token.LeftBrace
          ? parseObjectLiteral(state, context, void 0, DestuctionKind.FOR, BindingType.Literal)
          : parseArrayLiteral(state, context, void 0, DestuctionKind.FOR, BindingType.Literal);

      destructible = state.destructible;

      state.assignable = (destructible & Destructible.NotDestructible) !== Destructible.NotDestructible;

      initializer = parseMemberExpression(state, context, initializer, true, state.startIndex);
    } else {
      // Pass the 'Context.DisallowIn' bit so that 'in' isn't parsed in a 'BinaryExpression' as a
      // binary operator. 'in' makes it a for-in loop, 'not' an 'in' expression
      initializer = parseLeftHandSideExpression(state, context | Context.DisallowIn, true);
    }
  }

  if (
    isAwait
      ? consume(state, context | Context.AllowRegExp, Token.OfKeyword)
      : consumeOpt(state, context | Context.AllowRegExp, Token.OfKeyword)
  ) {
    if (!state.assignable) addparserDiagnostic(state, context, innerStart, DiagnosticCode.LHSAForLoop);
    reinterpretToAssignment(initializer);
    const expression = parseExpression(state, context);
    consume(state, context | Context.AllowRegExp, Token.RightParen);

    return finishNode(
      state,
      context,
      start,
      DictionaryMap.ForAwaitStatement(
        initializer,
        expression,
        parseStatement(state, context | Context.InIteration, scope, labels, null, false),
        isAwait
      ),
      SyntaxKind.ForOfStatement
    );
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.InKeyword)) {
    if (!state.assignable) addparserDiagnostic(state, context, innerStart, DiagnosticCode.LHSAForLoop);
    reinterpretToAssignment(initializer);
    const expression = parseExpressions(state, context);
    consume(state, context | Context.AllowRegExp, Token.RightParen);
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.ForInStatement(
        initializer,
        expression,
        parseStatement(state, context | Context.InIteration, scope, labels, null, false)
      ),
      SyntaxKind.ForInStatement
    );
  }

  let condition: Expression | null = null;
  let incrementor: Expression | null = null;

  if (state.destructible & Destructible.MustDestruct) addEarlyDiagnostic(state, context, DiagnosticCode.ObjCoverInit);

  initializer = parseExpressionOrHigher(state, context, initializer as Expression, state.startIndex);

  consume(state, context | Context.AllowRegExp, Token.Semicolon);

  if (state.token !== Token.Semicolon) condition = parseExpressions(state, context);

  consume(state, context | Context.AllowRegExp, Token.Semicolon);

  if (state.token !== Token.RightParen) incrementor = parseExpressions(state, context);

  consume(state, context, Token.RightParen);

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ForStatement(
      initializer,
      incrementor,
      condition,
      parseStatement(state, context | Context.InIteration, scope, labels, null, false)
    ),
    SyntaxKind.ForStatement
  );
}

// ForDeclaration : LetOrConst ForBinding  [MODIFIFED]
export function parseForDeclaration(
  state: ParserState,
  context: Context,
  isConst: boolean,
  scope: any,
  type: BindingType,
  cb: LexicalCallback,
  start: number
): ForDeclaration {
  const declarations = parseForBindingList(state, context, scope, type, cb);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ForDeclaration(isConst, declarations),
    SyntaxKind.ForDeclaration
  );
}

// BindingList : [MODIFIED]
//   LexicalBinding
//   BindingList `,` LexicalBinding
//
// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForBindingList(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType,
  cb: LexicalCallback
): (LexicalBinding | VariableDeclaration)[] {
  const declarationList = [];
  let count = 0;
  const check = context & Context.ErrorRecovery ? Constants.PatternOrIdentifier : Constants.PatternOrIdentifier;
  while (state.token & check) {
    declarationList.push(parseBindingElements(state, context, scope, type, cb));
    count++;
    if (consumeOpt(state, context, Token.Comma)) continue;
    if (state.token & (Token.IsInOrOf | Token.IsAutomaticSemicolon) || state.lineTerminatorBeforeNextToken) break;

    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedForDecl, DiagnosticKind.Error);
  }
  if (count > 1 && state.token & Token.IsInOrOf) {
    const code = state.token === Token.OfKeyword ? DiagnosticCode.MultipleOfDecl : DiagnosticCode.MultipleInDecl;
    addEarlyDiagnostic(state, context, code);
  }
  return declarationList;
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForLexicalBinding(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): LexicalBinding {
  const start = state.startIndex;
  let initializer = null;
  const isPattern = state.token & Token.IsPatternStart;
  const binding = parseBindingPatternOrIdentifier(state, context, scope, type);
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    initializer = parseExpression(state, context);
    if (state.token & Token.IsInOrOf) {
      const code = state.token === Token.OfKeyword ? DiagnosticCode.LHSForOfD : DiagnosticCode.LHSForInD;
      addEarlyDiagnostic(state, context, code);
    }
    // Normal const declarations, and const declarations in for(;;) heads, must be initialized.
  } else if ((isPattern || type === BindingType.Const) && (state.token & Token.IsInOrOf) !== Token.IsInOrOf) {
    addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LexicalBinding(binding, initializer),
    SyntaxKind.LexicalBinding
  );
}

// VariableDeclaration :   [MODIFIED]
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForVariableDeclaration(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): VariableDeclaration {
  const start = state.startIndex;
  let binding!: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
  let initializer = null;
  if (state.token & Token.IsPatternStart) {
    binding = parseBindingPattern(state, context, scope, type);
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
      initializer = parseExpression(state, context);
      if (state.token & Token.IsInOrOf) {
        const code = state.token === Token.OfKeyword ? DiagnosticCode.LHSForInD : DiagnosticCode.LHSForInD;
        addEarlyDiagnostic(state, context, code);
      }
    } else if ((state.token & Token.IsInOrOf) !== Token.IsInOrOf) {
      addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
    }
  } else {
    binding = parseBindingIdentifier(state, context, scope, type);
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
      initializer = parseExpression(state, context);
      if (
        state.token === Token.OfKeyword ||
        (state.token === Token.InKeyword && context & (Context.Strict | Context.OptionsDisableWebCompat))
      ) {
        const code = state.token === Token.OfKeyword ? DiagnosticCode.LHSForInD : DiagnosticCode.LHSForInD;
        addEarlyDiagnostic(state, context, code);
      }
    }
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.VariableDeclaration(binding, initializer),
    SyntaxKind.VariableDeclaration
  );
}

// ExpressionStatement :
//   [lookahead != `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` ] Expression `;`
//
// LabelledStatement :
//   LabelIdentifier : LabelledItem
//
// LabelledItem :
//   Statement
//   FunctionDeclaration
export function parseExpressionOrLabelledStatement(
  state: ParserState,
  context: Context,
  scope: any,
  labels: any[],
  ownLabels: any[] | null,
  allowFunction: boolean
): LabelledStatement | ExpressionStatement {
  const { startIndex, token, tokenValue } = state;
  let expr = parsePrimaryExpression(state, context, true);
  // Some keywords that are invalid as an 'LabelledIdentifier' will be parsed out in it's
  // own production. For example this case 'class:' will throw for missing a name. This is done
  // to be in line with how we parse '(class:)'.
  if (
    token & (context & Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword) &&
    state.token === Token.Colon
  ) {
    return parseLabelledStatement(
      state,
      context,
      scope,
      token,
      tokenValue,
      labels,
      ownLabels,
      allowFunction,
      startIndex
    );
  }

  // 'let' followed by '[' means a lexical declaration, which should not appear here.
  if (token === Token.LetKeyword && state.token === Token.LeftBracket) {
    addEarlyDiagnostic(state, context, DiagnosticCode.RestricedLet);
  }

  expr = parseExpressionOrHigher(state, context, expr, startIndex);

  return parseExpressionStatement(state, context, expr, startIndex);
}

// LabelledStatement :
//   LabelIdentifier : LabelledItem
//
// LabelledItem :
//   Statement
//   FunctionDeclaration
export function parseLabelledStatement(
  state: ParserState,
  context: Context,
  scope: any,
  token: Token,
  value: string,
  labels: any[],
  ownLabels: any[] | null,
  allowFunction: boolean,
  start: number
): ExpressionStatement {
  labels = addLabel(state, context, value, labels, ownLabels);

  nextToken(state, context | Context.AllowRegExp);

  validateIdentifier(state, context, token, start);

  ownLabels = parseStatementWithLabelSet(state.token, value, labels, ownLabels);

  const label = finishNode(state, context, start, DictionaryMap.LabelIdentifier(value), SyntaxKind.Identifier);

  // ES#sec-labelled-function-declarations Labelled Function Declarations
  const labelledItem =
    !allowFunction ||
    // Per 13.13.1 it's a syntax error if LabelledItem: FunctionDeclaration
    // is ever matched. Per Annex B.3.2 that modifies this text, this
    // applies only to strict mode code.
    context & (Context.OptionsDisableWebCompat | Context.Strict) ||
    state.token !== Token.FunctionKeyword
      ? parseStatement(state, context, scope, labels, ownLabels, allowFunction)
      : // GeneratorDeclaration is only matched by HoistableDeclaration in
        // StatementListItem, so generators can't be inside labels.
        parseFunctionDeclaration(state, context, scope, /* disallowGen */ true);

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LabelledStatement(label, labelledItem),
    SyntaxKind.LabelledStatement
  );
}

// ExpressionStatement :
//   [lookahead != `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` ] Expression `;`
export function parseExpressionStatement(
  state: ParserState,
  context: Context,
  expression: Expression,
  start: number
): ExpressionStatement {
  expectSemicolon(state, context);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ExpressionStatement(expression),
    SyntaxKind.ExpressionStatement
  );
}

// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpression(state: ParserState, context: Context): Expression {
  const start = state.startIndex;
  const left = parseLeftHandSideExpression(state, context, true);
  return parseAssignmentExpression(state, context, left, start);
}

//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpressions(state: ParserState, context: Context): Expression {
  const start = state.startIndex;
  const expression = parseExpression(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  return parseCommaOperator(state, context, expression, start);
}

// Expression :
//   Expression `,` AssignmentExpression
export function parseCommaOperator(
  state: ParserState,
  context: Context,
  expression: Expression,
  start: number
): CommaOperator | Expression {
  if (state.token !== Token.Comma) return expression;
  const expressions: Expression[] = [expression];
  while (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
    expressions.push(parseExpression(state, context));
  }
  return finishNode(state, context, start, DictionaryMap.CommaOperator(expressions), SyntaxKind.CommaOperator);
}

// IdentifierReference :
//   Identifier
//   [~Yield] `yield`
//   [~Await] `await`
export function parseIdentifierReference(state: ParserState, context: Context): IdentifierReference {
  const start = state.startIndex;
  const value = validateIdentifierReference(state, context, start);
  nextToken(state, context);
  state.assignable = true;
  return finishNode(state, context, start, DictionaryMap.IdentifierReference(value), SyntaxKind.Identifier);
}

// IdentifierName
export function parseIdentifierName(state: ParserState, context: Context): IdentifierName {
  // To avoid double diagnostics, and for incremental mode to work properly
  // for cases like 'try {} catch({{}{{}{}{{}{}{}{}{}{{x)!{}', 'import { import !'
  // and 'function ({function (function (' - we use the 'endIndex' as the start
  // value of this dummy node *after* we parsed out our identifier.
  if (context & Context.ErrorRecovery && (state.token & Constants.IdentifierOrKeyword) === 0) {
    addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedAnIdentifier);
    nextToken(state, context);
    return finishNode(state, context, state.endIndex, DictionaryMap.IdentifierName(''), SyntaxKind.Identifier);
  }
  const start = state.startIndex;
  const value = state.tokenValue;
  nextToken(state, context);
  state.assignable = true;
  return finishNode(state, context, start, DictionaryMap.IdentifierName(value), SyntaxKind.Identifier);
}

// BindingIdentifier :
//   Identifier
//   `yield`
//   `await`
export function parseBindingIdentifier(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): BindingIdentifier {
  let value = state.tokenValue;
  if (context & (Context.Yield | Context.Strict) && state.token === Token.YieldKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedYieldAsBIdent);
  } else if ((context & (Context.Await | Context.Module)) > 0 && state.token === Token.AwaitKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedAwaitAsBIdent);
  } else if (state.token & Token.IsKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
    value = '';
  } else if ((state.token & Constants.IdentifierOrKeyword) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
    value = '';
  }

  if (context & Context.Strict && state.token & Token.IsFutureReserved) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.StrictModeReserved, DiagnosticKind.Error);
    value = '';
  }

  // The BoundNames of LexicalDeclaration and ForDeclaration must not
  // contain 'let'.
  if (type & (BindingType.Let | BindingType.Const) && state.token === Token.LetKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.InvalidLetConstBinding);
  }

  addVarOrBlock(state, context, scope, state.tokenValue, type);

  if (type & BindingType.Export) {
    declareUnboundVariable(state, context, state.tokenValue);
  }
  const start = state.startIndex;
  nextToken(state, context);
  state.assignable = true;
  return finishNode(state, context, start, DictionaryMap.BindingIdentifier(value), SyntaxKind.BindingIdentifier);
}

// VariableStatement : `var` VariableDeclarationList `;`
export function parseVariableStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: BindingType
): VariableStatement {
  const start = state.startIndex;
  // We allow regular expressions here because in recovery mode this case 'var /a/' has to be
  // parsed out as 'VariableStatement' and an unterminated regular expression
  // In 'normal mode' mode this will throw an error.
  consume(state, context | Context.AllowRegExp, Token.VarKeyword);
  const declarations = parseVariableDeclarationList(state, context, scope, type);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.VariableStatement(declarations), SyntaxKind.VariableStatement);
}

// VariableDeclaration :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseVariableDeclaration(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): VariableDeclaration {
  const start = state.startIndex;
  let binding!: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
  let initializer = null;
  if (state.token & Token.IsPatternStart) {
    binding = parseBindingPattern(state, context, scope, type);
    if (state.token === Token.Assign) {
      nextToken(state, context | Context.AllowRegExp);
      initializer = parseExpression(state, context);
    } else {
      addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
    }
  } else {
    binding = parseBindingIdentifier(state, context | Context.AllowRegExp, scope, type);
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
      initializer = parseExpression(state, context);
    }
  }

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.VariableDeclaration(binding, initializer),
    SyntaxKind.VariableDeclaration
  );
}

// VariableDeclarationList :
//   VariableDeclaration
//   VariableDeclarationList `,` VariableDeclaration
export function parseVariableDeclarationList(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: BindingType
): VariableDeclaration[] {
  const declarationList = [];

  const check = context & Context.ErrorRecovery ? Constants.PatternOrIdentifier : Constants.VarOrLexical;

  while (state.token & check) {
    declarationList.push(parseBindingElements(state, context, scope, type, parseVariableDeclaration));

    // For cases like 'var a\nb;' and 'let a;b;'. 'b' will be parsed out in it's own production
    // as an 'IdentifierReference'.
    if (canConsumeSemicolon(state)) break; // 80% hit

    if (consumeOpt(state, context, Token.Comma)) {
      // 17% hit
      // For cases with trailing comma. For example 'var a = 2,', 'const a = 2,', and 'let a = 2,;'.
      if ((state.token & check) === 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedVarDecl, DiagnosticKind.Error);
      }
      continue;
    }

    // A typical typo is to hit '.' instead of ',' because they are next to each other on the keyboard.
    // If that's the case we just skip it and continue. This ensures we get back on track and don't
    // result in tons of parse errors.
    if (consumeOpt(state, context, Token.Period)) {
      // 2% hit
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
      continue;
    }
    // 1% hit
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedVarDecl, DiagnosticKind.Error);
  }

  return declarationList;
}

// LexicalDeclaration : LetOrConst BindingList `;`
export function parseLexicalDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: BindingType,
  labels: any[],
  ownLabels: any[] | null
): LexicalDeclaration | Statement {
  const start = state.startIndex;
  nextToken(state, context);
  // Need to verify that the next token is not a start of a let declaration because
  // '13.3.1.3 Static Semantics: IsConstantDeclaration' turns "let" into an early error and makes
  // this a super edge case. This happens because the static semantics only apply to the full parse tree
  // with ASI applied. That means this can't be parsed as two expressions. ASI resolves during parsing.
  // Otherwise a let declaration must have a name.
  //
  //   let     // not an ASI opportunity
  //   let;
  if (type & BindingType.Let && (state.token & Constants.NextTokenIsNotALetDeclaration) === 0) {
    return parseLetAsIdentifierReference(state, context, start, labels, ownLabels);
  }
  const declarations = parseBindingList(state, (context | Context.InBlock) ^ Context.InBlock, scope, type);
  expectSemicolon(state, context);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LexicalDeclaration((type & BindingType.Const) === BindingType.Const, declarations),
    SyntaxKind.LexicalDeclaration
  );
}

export function parseLetAsIdentifierReference(
  state: ParserState,
  context: Context,
  start: number,
  labels: any[],
  ownLabels: any[] | null
): Statement {
  let expr: Expression;
  if (context & Context.Strict) addEarlyDiagnostic(state, context, DiagnosticCode.StrictInvalidLetInExprPos);
  if (state.token === Token.Arrow) {
    expr = parseArrowFunction(
      state,
      context,
      {},
      [finishNode(state, context, start, DictionaryMap.BindingIdentifier('let'), SyntaxKind.BindingIdentifier)],
      ArrowKind.NORMAL,
      start
    );
    return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
  }
  state.assignable = true;
  expr = finishNode(state, context, start, DictionaryMap.IdentifierReference('let'), SyntaxKind.Identifier);
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, void 0, Token.LetKeyword, 'let', labels, ownLabels, false, start);
  }

  return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
}

export function parseAsyncAsIdentifierReference(state: ParserState, context: Context, scope: any): Statement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (state.token === Token.FunctionKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.AsyncFunctionInSingleStatementContext);
    return parseFunctionDeclaration(state, context | Context.Await, scope, false);
  }
  const expr = finishNode(state, context, start, DictionaryMap.IdentifierReference('async'), SyntaxKind.Identifier);
  state.assignable = true;
  return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseLexicalBinding(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): LexicalBinding {
  const start = state.startIndex;
  let binding!: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
  let initializer = null;
  if (state.token & Token.IsPatternStart) {
    binding = parseBindingPattern(state, context, scope, type);
    if (state.token === Token.Assign) {
      nextToken(state, context | Context.AllowRegExp);
      initializer = parseExpression(state, context);
    } else {
      addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
    }
  } else {
    binding = parseBindingIdentifier(state, context, scope, type);
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
      initializer = parseExpression(state, context);
    } else if (type === BindingType.Const) {
      addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
    }
  }
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LexicalBinding(binding, initializer),
    SyntaxKind.LexicalBinding
  );
}

// BindingList :
//   LexicalBinding
//   BindingList `,` LexicalBinding
//
// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseBindingList(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): (LexicalBinding | VariableDeclaration)[] {
  const declarationList = [];

  const check = context & Context.ErrorRecovery ? Constants.PatternOrIdentifier : Constants.VarOrLexical;

  while (state.token & check) {
    declarationList.push(parseBindingElements(state, context, scope, type, parseLexicalBinding));

    // For cases like 'var a\nb;' and 'let a;b;'. 'b' will be parsed out in it's own production
    // as an 'IdentifierReference'.
    if (canConsumeSemicolon(state)) break; // 80% hit

    if (consumeOpt(state, context, Token.Comma)) {
      // 17% hit
      // For cases with trailing comma. For example 'var a = 2,', 'const a = 2,', and 'let a = 2,;'.
      if ((state.token & check) === 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedLexical, DiagnosticKind.Error);
      }
      continue;
    }

    // A typical typo is to hit '.' instead of ',' because they are next to each other on the keyboard.
    // If that's the case we just skip it and continue. This ensures we get back on track and don't
    // result in tons of parse errors.
    if (consumeOpt(state, context, Token.Period)) {
      // 2% hit
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
      continue;
    }
    // 1% hit
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedLexical, DiagnosticKind.Error);
  }

  return declarationList;
}

// AssignmentExpression :
//   ConditionalExpression
//   [+Yield] YieldExpression
//   ArrowFunction
//   AsyncArrowFunction
//   LeftHandSideExpression `=` AssignmentExpression
//   LeftHandSideExpression AssignmentOperator AssignmentExpression
//   LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
//
// AssignmentOperator : one of
//   *= /= %= += -= <<= >>= >>>= &= ^= |= **=
//
// LogicalAssignmentOperator : one of
//   &&= ||= ??=
export function parseAssignmentExpression(
  state: ParserState,
  context: Context,
  left: Expression,
  start: number
): AssignmentExpression | Expression {
  if ((state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    if (!state.assignable) addEarlyDiagnostic(state, context, DiagnosticCode.InvalidLHS);
    const operator = KeywordDescTable[state.token & Token.Type];
    nextToken(state, context | Context.AllowRegExp);
    const right = parseExpression(state, context);
    state.assignable = false;
    state.destructible = Destructible.None;
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.AssignmentExpression(left, operator as AssignmentOperator | LogicalAssignmentOperator, right),
      SyntaxKind.AssignmentExpression
    );
  }
  return parseConditionalExpression(state, context, left, start);
}

// ConditionalExpression :
//   ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
export function parseConditionalExpression(
  state: ParserState,
  context: Context,
  left: Expression,
  start: number
): Expression | ConditionalExpression {
  const shortCircuit = parseBinaryExpression(state, context, left, /* minPrec */ 4, start);
  if (state.token !== Token.QuestionMark) return shortCircuit;
  nextToken(state, context | Context.AllowRegExp);
  const consequent = parseExpression(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(state, context | Context.AllowRegExp, Token.Colon);
  const alternate = parseExpression(state, context);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ConditionalExpression(shortCircuit, consequent, alternate),
    SyntaxKind.ConditionalExpression
  );
}

// AdditiveExpression : AdditiveExpression + MultiplicativeExpression
//
// RelationalExpression :
//   RelationalExpression `<` ShiftExpression
//   RelationalExpression `>` ShiftExpression
//   RelationalExpression `<=` ShiftExpression
//   RelationalExpression `>=` ShiftExpression
//   RelationalExpression `instanceof` ShiftExpression
//
// EqualityExpression :
//   EqualityExpression `==` RelationalExpression
//   EqualityExpression `!=` RelationalExpression
//   EqualityExpression `===` RelationalExpression
//   EqualityExpression `!==` RelationalExpression
//
// ShiftExpression :
//  ShiftExpression `>>>` AdditiveExpression
//
// MultiplicativeExpression :
//   MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
//
// LogicalANDExpression :
//   LogicalANDExpression `&&` BitwiseORExpression
//
// LogicalORExpression :
//   LogicalORExpression `||` LogicalANDExpression
//
// BitwiseANDExpression : BitwiseANDExpression `&` EqualityExpression
// BitwiseXORExpression : BitwiseXORExpression `^` BitwiseANDExpression
// BitwiseORExpression : BitwiseORExpression `|` BitwiseXORExpression
//
// ShortCircuitExpression :
//   LogicalORExpression
//   CoalesceExpression
//
// ExponentiationExpression : UpdateExpression ** ExponentiationExpression
export function parseBinaryExpression(
  state: ParserState,
  context: Context,
  left: BinaryExpression | Expression,
  minPrec: number,
  start: number
): BinaryExpression | Expression {
  const bit = -((context & Context.DisallowIn) > 0) & Token.InKeyword;
  let t: Token;
  let prec: number;
  while ((state.token & Token.IsBinaryOp) > 0) {
    t = state.token;
    prec = t & Token.Precedence;

    if (prec + (((t === Token.Exponentiate) as any) << 8) - (((bit === t) as any) << 12) <= minPrec) return left;

    nextToken(state, context | Context.AllowRegExp);

    left = finishNode(
      state,
      context,
      start,
      DictionaryMap.BinaryExpression(
        left,
        KeywordDescTable[t & Token.Type] as BinaryOperator,
        parseBinaryExpression(
          state,
          context,
          parseLeftHandSideExpression(state, context, false),
          prec,
          state.startIndex
        )
      ),
      SyntaxKind.BinaryExpression
    );

    state.assignable = false;
  }

  return left;
}

// LeftHandSideExpression :
//  (PrimaryExpression | MemberExpression) ...
export function parseLeftHandSideExpression(state: ParserState, context: Context, assignable: boolean): Expression {
  const start = state.startIndex;
  return parseMemberExpression(state, context, parsePrimaryExpression(state, context, assignable), true, start);
}

/**
 * MemberExpression :
 *   PrimaryExpression
 *   MemberExpression [ AssignmentExpression ]
 *   MemberExpression . IdentifierName
 *   MemberExpression TemplateLiteral
 *   SuperProperty
 *   MetaProperty
 *   new MemberExpression
 *
 * CallExpression :
 *   MemberExpression Arguments
 *   CallExpression Arguments
 *   CallExpression [ AssignmentExpression ]
 *   CallExpression . IdentifierName
 *   CallExpression TemplateLiteral
 *
 * SuperProperty :
 *   super [ Expression ]
 *   super . IdentifierName
 *
 * MetaProperty :
 *   NewTarget
 *   ImportMeta
 */
export function parseMemberExpression(
  state: ParserState,
  context: Context,
  member: Expression,
  allowCalls: boolean,
  start: number
): MemberExpression | OptionalExpression | PostfixUpdateExpression | Expression {
  // Parses this part of MemberExpression:
  // ('[' Expression ']' | '.' Identifier | TemplateLiteral)*
  const check = allowCalls ? Token.IsPropertyOrCall : Token.IsMember;
  while (state.token & check) {
    switch (state.token) {
      /* Update expression */
      case Token.Decrement:
      case Token.Increment:
        return parsePostfixUpdateExpression(state, context, member);

      /* Property */
      case Token.LeftBracket: {
        nextToken(state, context | Context.AllowRegExp);
        const expression = parseExpressions(state, context);
        consume(state, context, Token.RightBracket);
        state.assignable = true;
        member = finishNode(
          state,
          context,
          start,
          DictionaryMap.MemberExpression(member, expression, /* computed */ true),
          SyntaxKind.MemberExpression
        );
        break;
      }

      /* Property */
      case Token.Period:
        state.assignable = true;
        nextToken(state, context | Context.AllowRegExp);
        member = finishNode(
          state,
          context,
          start,
          DictionaryMap.MemberExpression(
            member,
            parsePropertyOrPrivatePropertyName(state, context),
            /* computed */ false
          ),
          SyntaxKind.MemberExpression
        );
        break;

      /* Call */
      case Token.LeftParen:
        member = finishNode(
          state,
          context,
          start,
          DictionaryMap.CallExpression(
            member,
            parseArguments(state, (context | Context.DisallowIn) ^ Context.DisallowIn)
          ),
          SyntaxKind.CallExpression
        );
        state.assignable = false;
        break;

      /* Optional Property */
      case Token.QuestionMarkPeriod:
        member = finishNode(
          state,
          context,
          start,
          DictionaryMap.OptionalExpression(member, parseOptionalChain(state, context)),
          SyntaxKind.OptionalExpression
        );
        state.assignable = false;
        break;

      default:
        /* Tagged template */
        const literal =
          state.token === Token.TemplateTail
            ? parseTemplateLiteral(state, context)
            : parseTemplateExpression(state, context | Context.TaggedTemplate);
        member = finishNode(
          state,
          context,
          start,
          DictionaryMap.TaggedTemplate(member as any, literal as any),
          SyntaxKind.TaggedTemplate
        );
    }
  }
  return member;
}

// IdentifierName
// IdentifierReference
export function parsePropertyOrPrivatePropertyName(
  state: ParserState,
  context: Context
): IdentifierName | IdentifierReference {
  if (state.token & Constants.IdentifierOrKeyword) {
    const { startIndex: start, tokenValue } = state;
    nextToken(state, context);
    return finishNode(state, context, start, DictionaryMap.IdentifierName(tokenValue), SyntaxKind.Identifier);
  }
  // For cases like `(foo.)` where we will hit the ')' instead of discovering a property.
  // To avoid consuming the ')' - which will cause the parse of the parentheses to fail - we
  // return an dummy identifier without priming the scanner.
  return createIdentifier(state, context);
}

// OptionalChain :
// ?.Arguments
// ?.Expression
// ?.IdentifierName
// ?.TemplateLiteral
//
// OptionalChain, Arguments
// OptionalChain, Expression
// OptionalChain, .IdentifierName
// OptionalChain,TemplateLiteral
export function parseOptionalChain(state: ParserState, context: Context): CallChain | MemberChain {
  consume(state, context, Token.QuestionMarkPeriod);
  let chain = null;
  let start = state.startIndex;

  if (state.token === Token.LeftParen) {
    chain = parseCallChain(state, context, chain, parseArguments(state, context), start);
  } else if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    chain = parseMemberChain(state, context, chain, parseExpression(state, context), true, start);
    consumeOpt(state, context, Token.RightBracket);
  } else if (state.token === Token.TemplateCont || state.token === Token.TemplateTail) {
    addEarlyDiagnostic(state, context, DiagnosticCode.ChainNoTemplate);
  } else {
    chain = parseMemberChain(state, context, chain, parseIdentifierReference(state, context), false, start);
  }

  state.assignable = false;

  chain = finishNode(state, context, start, DictionaryMap.OptionalChain(chain), SyntaxKind.OptionalChain);

  while (true) {
    start = state.startIndex;
    if (state.token === Token.LeftParen) {
      chain = parseCallChain(state, context, chain, parseArguments(state, context), start);
      chain = finishNode(state, context, start, DictionaryMap.OptionalChain(chain), SyntaxKind.OptionalChain);
    } else if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
      state.assignable = false;
      chain = parseMemberChain(state, context, chain, parseExpression(state, context), true, start);
      consumeOpt(state, context, Token.RightBracket);
      chain = finishNode(state, context, start, DictionaryMap.OptionalChain(chain), SyntaxKind.OptionalChain);
      state.assignable = false;
    } else if (consumeOpt(state, context | Context.AllowRegExp, Token.Period)) {
      chain = parseMemberChain(state, context, chain, parseIdentifierName(state, context), false, start);
      chain = finishNode(state, context, start, DictionaryMap.OptionalChain(chain), SyntaxKind.OptionalChain);
      state.assignable = false;
    } else if (state.token === Token.TemplateCont || state.token === Token.TemplateTail) {
      addEarlyDiagnostic(state, context, DiagnosticCode.ChainNoTemplate);
      return chain;
    } else {
      if ((state.token & (Token.IsKeyword | Token.IsFutureReserved | Token.IsIdentifier)) === 0) return chain;
      chain = parseMemberChain(state, context, chain, parseIdentifierName(state, context), false, start);
      chain = finishNode(state, context, start, DictionaryMap.OptionalChain(chain), SyntaxKind.OptionalChain);
      state.assignable = false;
    }
  }
}

// MemberChain [MODIFIED]
export function parseMemberChain(
  state: ParserState,
  context: Context,
  chain: MemberChain | CallChain | null,
  expr: Expression,
  computed: boolean,
  start: number
): MemberChain {
  return finishNode(state, context, start, DictionaryMap.MemberChain(chain, expr, computed), SyntaxKind.MemberChain);
}

// CallChain [MODIFIED]
export function parseCallChain(
  state: ParserState,
  context: Context,
  chain: MemberChain | CallChain | null,
  expr: Expression[],
  start: number
): CallChain {
  return finishNode(
    state,
    (context | Context.DisallowIn) ^ Context.DisallowIn,
    start,
    DictionaryMap.CallChain(chain, expr),
    SyntaxKind.MemberChain
  );
}

// ArgumentList
export function parseArguments(state: ParserState, context: Context): (Expression | AssignmentRestElement)[] {
  const args = [];
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const check = context & Context.ErrorRecovery ? Constants.ArgumentList : Constants.DelimitedList;
  while (state.token & check) {
    args.push(parseListElements(state, context, parseArgumentList));
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
    if (state.token === Token.RightParen) break;
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
  }
  consume(state, context, Token.RightParen);
  return args;
}

// AssignmentExpression
// ...AssignmentExpression
//
// ArgumentList, AssignmentExpression
//* ArgumentList, ...AssignmentExpression
export function parseArgumentList(state: ParserState, context: Context): Expression | AssignmentRestElement {
  if (state.token === Token.Ellipsis) {
    nextToken(state, context | Context.AllowRegExp);
    const start = state.startIndex;
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.AssignmentRestElement(parseExpression(state, context)),
      SyntaxKind.AssignmentRestElement
    );
  }
  return parseExpression(state, context);
}

// UnaryExpression :
//   LeftHandSideExpression
//   delete UnaryExpression
//   void UnaryExpression
//   typeof UnaryExpression
//   + UnaryExpression
//   - UnaryExpression
//   ~ UnaryExpression
//   ! UnaryExpression
//   [+Await] AwaitExpression
export function parseUnaryExpression(state: ParserState, context: Context): UnaryExpression {
  const start = state.startIndex;
  const t = state.token;
  const operator = KeywordDescTable[t & Token.Type] as UnaryOperator;
  nextToken(state, context | Context.AllowRegExp);
  const operand = parseLeftHandSideExpression(state, context, false);
  // Report an error for unary expressions on the LHS of **
  if (state.token === Token.Exponentiate) {
    addEarlyDiagnostic(state, context, DiagnosticCode.InvalidExponentation);
  }
  if ((context & Context.Strict) === Context.Strict) {
    // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
    // UnaryExpression is a direct reference to a variable, function argument, or function name
    if (t === Token.DeleteKeyword && operand.type === 'IdentifierReference') {
      addEarlyDiagnostic(state, context, DiagnosticCode.StrictDelete);
    }
  }
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.UnaryExpression(operator, operand),
    SyntaxKind.UnaryExpression
  );
}

/**
 * UpdateExpression :
 *  LeftHandSideExpression
 *  LeftHandSideExpression [no LineTerminator here] ++
 *  LeftHandSideExpression [no LineTerminator here] --
 *
 * In Escaya this is parsed as PostfixUpdateExpression.
 */
export function parsePostfixUpdateExpression(
  state: ParserState,
  context: Context,
  operand: Expression
): PostfixUpdateExpression | Expression {
  if (state.lineTerminatorBeforeNextToken) return operand;
  if (!state.assignable) addEarlyDiagnostic(state, context, DiagnosticCode.LHSPreOp);
  const start = state.startIndex;
  const operator = KeywordDescTable[state.token & Token.Type] as UpdateOp;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.PostfixUpdateExpression(operator, operand),
    SyntaxKind.PostfixUpdateExpression
  );
}

// UpdateExpression :
//   LeftHandSideExpression
//   LeftHandSideExpression [no LineTerminator here] `++`
//   LeftHandSideExpression [no LineTerminator here] `--`
//   `++` UnaryExpression
//   `--` UnaryExpression
export function parsePrefixUpdateExpression(state: ParserState, context: Context): PrefixUpdateExpression {
  const start = state.startIndex;
  const operator = KeywordDescTable[state.token & Token.Type] as UpdateOp;
  nextToken(state, context | Context.AllowRegExp);
  const operand = parseLeftHandSideExpression(state, context, false);
  if (!state.assignable) addEarlyDiagnostic(state, context, DiagnosticCode.LHSPostOp);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.PrefixUpdateExpression(operator, operand),
    SyntaxKind.PrefixUpdateExpression
  );
}

export function parseAwaitExpression(state: ParserState, context: Context): AwaitExpression {
  if (context & Context.Parameters) addEarlyDiagnostic(state, context, DiagnosticCode.AwaitInParameter);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.AwaitExpression(parseExpression(state, context)),
    SyntaxKind.AwaitExpression
  );
}

// YieldExpression :
//   `yield`
//   `yield` [no LineTerminator here] AssignmentExpression
//   `yield` [no LineTerminator here] `*` AssignmentExpression
export function parseYieldExpression(state: ParserState, context: Context): YieldExpression {
  if (context & Context.Parameters) addEarlyDiagnostic(state, context, DiagnosticCode.YieldInParameter);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let expression = null;
  let delegate = false;
  const token = state.token;

  if (token === Token.Multiply) {
    // A `\n` after `yield` is illegal for `yield *`. In 'recovery' mode this is allowed
    // and will be parsed as a 'BinaryExpression'.
    if (state.lineTerminatorBeforeNextToken) {
      addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedExpression);
      // Mark this node as 'dirty' to force a full parse during incremental parsing
      state.flags |= Flags.NodeHasErrors;
    }
    nextToken(state, context | Context.AllowRegExp);
    expression = parseExpression(state, context);
    delegate = true;
  } else if (token & Token.IsExpressionStart) {
    expression = parseExpression(state, context);
  }

  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.YieldExpression(delegate, expression),
    SyntaxKind.YieldExpression
  );
}

/**
 * PrimaryExpression :
 *   this
 *   IdentifierReference
 *   Literal
 *   ArrayLiteral
 *   ObjectLiteral
 *   FunctionExpression
 *   ClassExpression
 *   GeneratorExpression
 *   AsyncFunctionExpression
 *   AsyncGeneratorExpression
 *   RegularExpressionLiteral
 *   TemplateLiteral
 *   CoverParenthesizedExpressionAndArrowParameterList
 *
 * Literal :
 * NullLiteral
 * BooleanLiteral
 * NumericLiteral
 * StringLiteral
 *
 * ParenthesizedExpression :
 * ( Expression )
 *
 */

export function parsePrimaryExpression(
  state: ParserState,
  context: Context,
  assignable: boolean
): LeftHandSideExpression {
  if (state.token & (Token.IsIdentifier | Token.IsFutureReserved)) {
    if (context & Context.Yield && state.token === Token.YieldKeyword) {
      return parseYieldExpression(state, context);
    }
    if (context & Context.Await && state.token === Token.AwaitKeyword) {
      return parseAwaitExpression(state, context);
    }
    if (state.token === Token.AsyncKeyword) return parseFunctionExpression(state, context, assignable);

    const start = state.startIndex;
    const value = validateIdentifierReference(state, context, start);

    nextToken(state, context | Context.TaggedTemplate);

    if (state.token === Token.Arrow) {
      return parseArrowAfterIdentifier(
        state,
        context,
        [finishNode(state, context, start, DictionaryMap.BindingIdentifier(value), SyntaxKind.BindingIdentifier)],
        value,
        assignable,
        ArrowKind.NORMAL,
        start
      );
    }
    state.assignable = true;
    return finishNode(state, context, start, DictionaryMap.IdentifierReference(value), SyntaxKind.Identifier);
  }
  switch (state.token) {
    /* Update expression */
    case Token.Decrement:
    case Token.Increment:
      return parsePrefixUpdateExpression(state, context);
    /* Unary expression */
    case Token.TypeofKeyword:
    case Token.DeleteKeyword:
    case Token.VoidKeyword:
    case Token.Negate:
    case Token.Complement:
    case Token.Add:
    case Token.Subtract:
      return parseUnaryExpression(state, context);
    case Token.NumericLiteral:
      return parseNumericLiteral(state, context);
    case Token.BigIntLiteral:
      return parseBigIntLiteral(state, context);
    case Token.StringLiteral:
      return parseStringLiteral(state, context, /* isDirective */ false);
    case Token.NullKeyword:
      return parseNullLiteral(state, context);
    case Token.ThisKeyword:
      return parseThisExpression(state, context);
    case Token.TrueKeyword:
    case Token.FalseKeyword:
      return parseBooleanLiteral(state, context);
    case Token.LeftParen:
      return parseCoverParenthesizedExpressionAndArrowParameterList(state, context, assignable);
    case Token.FunctionKeyword:
      return parseFunctionExpression(state, context, assignable);
    case Token.ClassKeyword:
      return parseClassExpression(state, context);
    case Token.NewKeyword:
      return parseNewExpression(state, context);
    case Token.ImportKeyword:
      return parseImportMetaOrCall(state, context) as any;
    case Token.LeftBracket:
      const expr = parseArrayLiteral(state, context, void 0, DestuctionKind.NORMAL, BindingType.Literal);
      if ((state.destructible & Destructible.MustDestruct) === Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ObjCoverInit, DiagnosticKind.Error);
      }
      return expr;
    case Token.LeftBrace: {
      const expr = parseObjectLiteral(state, context, void 0, DestuctionKind.NORMAL, BindingType.Literal);
      if ((state.destructible & Destructible.MustDestruct) === Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ObjCoverInit, DiagnosticKind.Error);
      }
      return expr;
    }

    case Token.SuperKeyword:
      return parseSuperCallOrProperty(state, context);
    case Token.RegularExpression:
      return parseRegularExpressionLiteral(state, context);
    case Token.TemplateTail:
      return parseTemplateLiteral(state, context);
    case Token.TemplateCont:
      return parseTemplateExpression(state, context);
    default:
      return createIdentifier(state, context);
  }
}

// ImportCall :
//  import
// ImportMeta:
//   import.meta
export function parseImportMetaOrCall(state: ParserState, context: Context): ImportCall | ImportMeta {
  const start = state.startIndex;
  nextToken(state, context);
  if (context & Context.ImportMeta && consumeOpt(state, context, Token.Period)) {
    consume(state, context, Token.MetaIdentifier);
    return finishNode(state, context, start, DictionaryMap.ImportMeta(), SyntaxKind.ImportMeta);
  }

  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expr = parseExpression(state, context);
  consume(state, context, Token.RightParen);
  return finishNode(state, context, start, DictionaryMap.ImportCall(expr), SyntaxKind.ImportCall);
}

// NewExpression
export function parseNewExpression(state: ParserState, context: Context): NewExpression | NewTarget {
  // NewExpression ::
  //   ('new')+ MemberExpression
  //
  // NewTarget ::
  //   'new' '.' 'target'
  //
  // Examples of new expression:
  // - new foo.bar().baz
  // - new foo()()
  // - new new foo()()
  // - new new foo
  // - new new foo()
  // - new new foo().bar().baz
  // - `new.target[await x]`
  // - `new (foo);`
  // - `new (foo)();`
  // - `new foo()();`
  // - `new (await foo);`
  // - `new x(await foo);`
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (context & Context.NewTarget && state.token === Token.Period) {
    nextToken(state, context);
    if (state.token !== Token.TargetIdentifier) {
      addEarlyDiagnostic(state, context, DiagnosticCode.InvalidNewTarget, state.tokenValue);
    }
    nextToken(state, context);
    return finishNode(state, context, start, DictionaryMap.Target(), SyntaxKind.NewTarget);
  }
  let expression = parsePrimaryExpression(state, context, true);
  if (state.token === Token.QuestionMarkPeriod)
    addEarlyDiagnostic(state, context, DiagnosticCode.OptionalChainingNoNew);
  expression = parseMemberExpression(state, context, expression, false, start);
  const args = state.token === Token.LeftParen ? parseArguments(state, context) : [];
  state.assignable = false;
  return finishNode(state, context, start, DictionaryMap.NewExpression(expression, args), SyntaxKind.NewExpression);
}

// BooleanLiteral :
//   `true`
//   `false`
export function parseBooleanLiteral(state: ParserState, context: Context): BooleanLiteral {
  const start = state.startIndex;
  const value = KeywordDescTable[state.token & Token.Type] === 'true';
  state.assignable = false;
  nextToken(state, context);
  return finishNode(state, context, start, DictionaryMap.BooleanLiteral(value), SyntaxKind.BooleanLiteral);
}

// NumericLiteral
export function parseNumericLiteral(state: ParserState, context: Context): NumericLiteral {
  const start = state.startIndex;
  const value = state.tokenValue;
  state.assignable = false;
  nextToken(state, context);
  return finishNode(state, context, start, DictionaryMap.NumericLiteral(value), SyntaxKind.NumericLiteral);
}
export function parseBigIntLiteral(state: ParserState, context: Context): NumericLiteral {
  const start = state.startIndex;
  const value = state.tokenValue;
  state.assignable = false;
  nextToken(state, context);
  return finishNode(state, context, start, DictionaryMap.BigInt(value), SyntaxKind.BigIntLiteral);
}

// TemplateLiteral
export function parseTemplateLiteral(state: ParserState, context: Context): TemplateLiteral {
  const start = state.startIndex;
  nextToken(state, context);
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  state.assignable = false;
  return finishNode(state, context, start, DictionaryMap.TemplateLiteral(value, raw), SyntaxKind.TemplateLiteral);
}

// StringLiteral
export function parseStringLiteral(state: ParserState, context: Context, isDirective: boolean): StringLiteral {
  const start = state.startIndex;
  const value = state.tokenValue;
  nextToken(state, context);
  state.assignable = false;
  if (isDirective && canConsumeSemicolon(state)) {
    // The `raw` property is the raw string source of the directive without quotes.
    const raw = state.source.slice(start + 1, state.endIndex - 1);
    return finishNode(state, context, start, DictionaryMap.Directive(value, raw), SyntaxKind.Directive);
  }
  return finishNode(state, context, start, DictionaryMap.StringLiteral(value), SyntaxKind.StringLiteral);
}

// NullLiteral
export function parseNullLiteral(state: ParserState, context: Context): NullLiteral {
  const start = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, start, DictionaryMap.NullExpression(), SyntaxKind.NullLiteral);
}

// ThisExpression
export function parseThisExpression(state: ParserState, context: Context): ThisExpression {
  const start = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, start, DictionaryMap.ThisExpression(), SyntaxKind.ThisExpression);
}

// RegularExpressionLiteral :
//   `/` RegularExpressionBody `/` RegularExpressionFlags
export function parseRegularExpressionLiteral(state: ParserState, context: Context): RegularExpressionLiteral {
  const start = state.startIndex;
  const flags = state.regExpFlags;
  const pattern = state.regExpPattern;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.RegularExpressionLiteral(pattern, flags),
    SyntaxKind.RegularExpressionLiteral
  );
}

export function parseTemplateExpression(state: ParserState, context: Context): TemplateExpression {
  const start = state.startIndex;
  const elements: any = [];
  do {
    elements.push(parseTemplateElementContinuation(state, context));
  } while ((state.token = scanTemplateTail(state, context)) === Token.TemplateCont);
  elements.push(parseTemplateElement(state, context));
  consume(state, context | Context.AllowRegExp, Token.TemplateTail);
  return finishNode(state, context, start, DictionaryMap.TemplateExpression(elements), SyntaxKind.TemplateExpression);
}

export function parseTemplateElementContinuation(state: ParserState, context: Context): TemplateElement {
  const start = state.startIndex;
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  consume(state, context | Context.AllowRegExp, Token.TemplateCont);
  const expression = parseExpressions(state, context);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.TemplateElement(raw, value, expression),
    SyntaxKind.TemplateElement
  );
}

export function parseTemplateElement(state: ParserState, context: Context): TemplateElement {
  const start = state.startIndex;
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  return finishNode(state, context, start, DictionaryMap.TemplateElement(raw, value, null), SyntaxKind.TemplateElement);
}

// ObjectBindingPattern :
//   `{` `}`
//   `{` BindingRestProperty `}`
//   `{` BindingPropertyList `}`
//   `{` BindingPropertyList `,` BindingRestProperty? `}`
export function parseObjectBindingPattern(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: BindingType
): ObjectBindingPattern {
  const start = state.startIndex;
  consume(state, context, Token.LeftBrace);
  const properties = [];
  const check = context & Context.ErrorRecovery ? Constants.ObjectPatternR : Constants.ObjectPatternN;
  while (state.token & check) {
    if (state.token === Token.Ellipsis) {
      properties.push(parseBindingRestProperty(state, context, type));
      if (!consumeOpt(state, context, Token.Comma)) break;
      addEarlyDiagnostic(
        state,
        context,
        state.token === Token.RightBrace
          ? // A rest parameter or binding pattern may not have a trailing comma
            DiagnosticCode.RestTrailing
          : // A rest element must be last in destructuring pattern
            DiagnosticCode.RestNotLast
      );
    }
    properties.push(parseBindingProperty(state, context, scope, type));
    if (state.token === Token.RightBrace) break;
    if (consumeOpt(state, context, Token.Comma)) continue;
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
  }
  consume(state, context, Token.RightBrace);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ObjectBindingPattern(properties),
    SyntaxKind.ObjectBindingPattern
  );
}

// BindingRestProperty :
//  ...BindingIdentifier
export function parseBindingRestProperty(state: ParserState, context: Context, type: BindingType): BindingRestProperty {
  const start = state.startIndex;
  nextToken(state, context);
  // let {...(a, b
  // We need to validate first if it's an valid BindingIdentifier so we so we safely can reconstruct
  // the AST for cases like 'let {...(a, b'. For this particular case we need to 'break out' soon
  // as we found '(' without priming the scanner, and let the '(a, b' be parsed out as it's own
  // production.
  let argument!: BindingIdentifier;
  if (state.token & Constants.IdentifierOrKeyword) {
    argument = parseBindingIdentifier(state, context, void 0, type);
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.BindingRestProperty(argument),
      SyntaxKind.BindingRestProperty
    );
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
    argument = finishNode(state, context, start, DictionaryMap.BindingIdentifier(''), SyntaxKind.BindingIdentifier);
  }

  if (state.token === Token.Assign) addEarlyDiagnostic(state, context, DiagnosticCode.RestInit);
  return finishNode(state, context, start, DictionaryMap.BindingRestProperty(argument), SyntaxKind.BindingRestProperty);
}

// BindingProperty :
//   SingleNameBinding
//   PropertyName : BindingElement
export function parseBindingProperty(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: BindingType
): BindingElement | BindingIdentifier {
  const start = state.startIndex;
  let left!: BindingIdentifier | IdentifierName;
  if (state.token & Constants.IdentifierOrKeyword) {
    // We save the 'tokenValue' because we do not know yet if this is an 'SingleNameBinding' or
    // a 'IdentifierName'. We only know this after we have seen a ':'. If we have seen it, we have to
    // parse out an 'IdentifierName' and not an 'BindingIdentifier'.
    const tokenValue = state.tokenValue;
    const token = state.token;
    nextToken(state, context);
    if (consumeOpt(state, context, Token.Colon)) {
      left = finishNode(state, context, start, DictionaryMap.IdentifierName(tokenValue), SyntaxKind.Identifier);
      const right = parseBindingElement(state, context, scope, type);
      return finishNode(state, context, start, DictionaryMap.PropertyName(left, right), SyntaxKind.PropertyName);
    }
    validateIdentifier(state, context, token, start);
    addVarOrBlock(state, context, scope, tokenValue, type);
    left = finishNode(state, context, start, DictionaryMap.BindingIdentifier(tokenValue), SyntaxKind.BindingIdentifier);
    // In EScaya AST there are no 'SingleNameBinding' AST node. Instead we return the BindingIdentifier *as is* if
    // no initializer to be found.
    if (!consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) return left;
    const init = parseExpression(state, context);
    return finishNode(state, context, start, DictionaryMap.BindingElement(left, init), SyntaxKind.BindingElement);
  }
  left = parsePropertyName(state, context);
  consumeOpt(state, context, Token.Colon);
  const right = parseBindingElement(state, context, scope, type);
  return finishNode(state, context, start, DictionaryMap.PropertyName(left, right), SyntaxKind.PropertyName);
}

// BindingElement :
//   SingleNameBinding
//   BindingPattern Initializer?
//
// SingleNameBinding :
//   BindingIdentifier Initializer?
export function parseBindingElement(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): BindingElement | BindingIdentifier {
  const start = state.startIndex;

  let left;

  if (state.token & Token.IsPatternStart) {
    left = parseBindingPattern(state, context, scope, type);
  } else {
    left = parseBindingIdentifier(state, context, scope, type);
    if (state.token !== Token.Assign) return left;
  }

  const right = consumeOpt(state, context | Context.AllowRegExp, Token.Assign) ? parseExpression(state, context) : null;

  return finishNode(state, context, start, DictionaryMap.BindingElement(left, right), SyntaxKind.BindingElement);
}

// BindingPattern:
//   ObjectBindingPattern
//   ArrayBindingPattern
export function parseBindingPattern(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): BindingPattern {
  if (state.token === Token.LeftBrace) return parseObjectBindingPattern(state, context, scope, type);
  return parseArrayBindingPattern(state, context, scope, type);
}

// BindingPattern:
//   ObjectBindingPattern
//   ArrayBindingPattern
//
// BindingIdentifier
export function parseBindingPatternOrIdentifier(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): BindingPattern | BindingIdentifier {
  return state.token & Token.IsPatternStart
    ? parseBindingPattern(state, context, scope, type)
    : parseBindingIdentifier(state, context, scope, type);
}

// ArrayBindingPattern :
//   `[` `]`
//   `[` Elision `]`
//   `[` BindingElementList `]`
//   `[` BindingElementList `,` `]`
//   `[` BindingElementList `,` Elision `,` BindingRestElement `]`
export function parseArrayBindingPattern(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): ArrayBindingPattern {
  const start = state.startIndex;
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  nextToken(state, context | Context.AllowRegExp);
  const list = [];
  const check = context & Context.ErrorRecovery ? Constants.ArrayPattern : Constants.ArrayListN;
  while (state.token & check) {
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      list.push(finishNode(state, context, start, DictionaryMap.Elison(), SyntaxKind.Elison));
    } else {
      if (state.token === Token.Ellipsis) {
        list.push(parseBindingRestElement(state, context, scope, type));
        if (state.token !== Token.Comma) break;
        nextToken(state, context);
        addEarlyDiagnostic(
          state,
          context,
          state.token === Token.RightBrace ? DiagnosticCode.RestTrailing : DiagnosticCode.RestNotLast
        );
      }

      list.push(parseBindingElement(state, context, scope, type));
      if (state.token === Token.RightBracket) break;
      if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
    }
  }
  consume(state, context, Token.RightBracket);
  return finishNode(state, context, start, DictionaryMap.ArrayBindingPattern(list), SyntaxKind.ArrayBindingPattern);
}

// BindingRestElement :
//   `...` BindingIdentifier
//   `...` BindingPattern
export function parseBindingRestElement(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): BindingRestElement {
  const start = state.startIndex;
  nextToken(state, context);
  let argument!: BindingIdentifier | ArrayBindingPattern | ObjectBindingPattern;
  if (state.token & Constants.PatternOrIdentifier) {
    argument = parseBindingPatternOrIdentifier(state, context, scope, type);
  } else {
    //declareUnboundVariable(state, context, name);
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedBindingIdent, DiagnosticKind.Error);
    argument = finishNode(state, context, start, DictionaryMap.BindingIdentifier(''), SyntaxKind.BindingIdentifier);
  }
  if (state.token === Token.Assign) addEarlyDiagnostic(state, context, DiagnosticCode.RestInit);
  state.destructible = Destructible.None;
  return finishNode(state, context, start, DictionaryMap.BindingRestElement(argument), SyntaxKind.BindingRestElement);
}

// ArrayLiteral :
//   `[` `]`
//   `[` Elision `]`
//   `[` ElementList `]`
//   `[` ElementList `,` `]`
//   `[` ElementList `,` Elision `]`
export function parseArrayLiteral(
  state: ParserState,
  context: Context,
  scope: any,
  isRest: DestuctionKind,
  type: BindingType
): ArrayLiteral | AssignmentElement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  const elements = [];
  let destructible = Destructible.None;
  const check = context & Context.ErrorRecovery ? Constants.ArrayListR : Constants.ArrayListN;
  while (state.token & check) {
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      elements.push(finishNode(state, context, state.startIndex, DictionaryMap.Elison(), SyntaxKind.Elison));
    } else {
      elements.push(parseElementList(state, context, scope, type));
      destructible |= state.destructible;
      if (state.token === Token.RightBracket) break;
      if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
    }
  }

  consume(state, context, Token.RightBracket);

  const node = finishNode(state, context, start, DictionaryMap.ArrayLiteral(elements), SyntaxKind.ArrayLiteral);

  if (state.token & Token.IsAssignOp) {
    return parseAssignmentElement(state, context, destructible, node, isRest, start);
  }

  state.destructible = destructible;

  return node;
}

// ElementList :
//   ` Elision `, `AssignmentExpression`
//   ` ElementList `, `SpreadElement`
//   ` ElementList `,` Elision `, `AssignmentExpression`
//   ` ElementList `,` Elision `, `SpreadElement`
export function parseElementList(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): SpreadElement | Expression | AssignmentExpression {
  const start = state.startIndex;
  const tokenValue = state.tokenValue;
  if (state.token === Token.Ellipsis) return parseSpreadElement(state, context, scope, type, start);

  // Simple cases: "[a]", "[a,]", "[a = b]", "[a.[b] ...]",  "[a.b ... ]" and "[a.(b) ...]"'
  if (state.token & Constants.IdentifierOrKeyword) {
    let left = parsePrimaryExpression(state, context, true);

    // Array with only one identifier followed by an assignment, '[a = ', are destructible unless this is a keyword.
    if (state.token === Token.Assign) {
      return parseAssignmentExpression(state, context, left, start);
    }

    // Array with only one identifier, should be 'destructible' except for a few valid identifiers / keywords
    // that can't be assigned to. For example `true` and `typeof`.
    if (state.token === Token.RightBracket || state.token === Token.Comma) {
      let destructible = Destructible.None;

      if (state.assignable) {
        addVarOrBlock(state, context, scope, tokenValue, type);
      } else {
        destructible |= Destructible.NotDestructible;
      }
      state.destructible = destructible;

      return left;
    }

    let destructible =
      type & BindingType.ArgumentList
        ? Destructible.Assignable
        : (type & BindingType.Literal) !== BindingType.Literal
        ? Destructible.NotDestructible
        : Destructible.None;

    // For complex cases like - '[x()]', '[x[y]]', '[x.y]', '[x.y = z]' - the identifier / keyword must be
    // followed by a 'tail' - 'MemberExpression'.

    left = parseMemberExpression(state, context, left, true, start);

    // This isn't destructible if not assiignable or there are no '=', ',', or ']' - after the 'tail'.
    if (
      !state.assignable ||
      (state.token !== Token.Assign && state.token !== Token.Comma && state.token !== Token.RightBracket)
    ) {
      destructible |= Destructible.NotDestructible;
    }

    left = parseAssignmentExpression(state, context, left, start);

    state.destructible = destructible;

    return left;
  }

  // '[[', '[{'
  if (state.token & Token.IsPatternStart) {
    let left: ArrayLiteral | ObjectLiteral | Expression =
      state.token === Token.LeftBracket
        ? parseArrayLiteral(state, context, scope, DestuctionKind.NORMAL, type)
        : parseObjectLiteral(state, context, scope, DestuctionKind.NORMAL, type);

    let destructible = state.destructible;

    if (state.token & (Token.IsPropertyOrCall | Token.IsExpressionStart)) {
      // '=' can only be used in an object literal property inside a destructuring assignment
      if (destructible & Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidSPI, DiagnosticKind.Error);
      }

      left = parseMemberExpression(state, context, left, /* allowCalls */ true, start);

      destructible = state.assignable ? Destructible.None : Destructible.NotDestructible;

      left = parseAssignmentExpression(state, context, left, start);

      // ObjectLiteral or ArrayLiteral followed by ConditionalExpression
    } else if (state.token === Token.QuestionMark) {
      left = parseConditionalExpression(state, context, left, start);
      destructible = Destructible.NotDestructible;
    }

    state.destructible = destructible;

    return left;
  }

  const token = state.token;

  let destructible = Destructible.None;

  let left = parseLeftHandSideExpression(state, context, true);

  if (state.token !== Token.Comma && state.token !== Token.RightBracket) {
    left = parseAssignmentExpression(state, context, left, start);
    if ((BindingType.Literal | BindingType.ArgumentList) === 0 && token === Token.LeftParen) {
      destructible |= Destructible.NotDestructible;
    }
  } else if (!state.assignable) {
    destructible |= Destructible.NotDestructible;
  } else if (token === Token.LeftParen) {
    destructible |=
      state.assignable && BindingType.Literal | BindingType.ArgumentList
        ? Destructible.Assignable
        : Destructible.NotDestructible;
  }

  state.destructible = destructible;

  return left;
}

// SpreadElement :
//   ...AssignmentExpression
export function parseSpreadElement(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType,
  start: number
): SpreadElement {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightBracket, false, scope, type, start);
  return finishNode(state, context, start, DictionaryMap.SpreadElement(argument), SyntaxKind.SpreadElement);
}

// PropertyDefinition :   [MODIFIED]
//   ...AssignmentExpression
export function parseSpreadProperty(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType,
  start: number
): SpreadProperty {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightBrace, true, scope, type, start);
  return finishNode(state, context, start, DictionaryMap.SpreadProperty(argument), SyntaxKind.SpreadProperty);
}

// AssignmentRestElement :
//   ...DestructuringAssignmentTarget
export function parseAssignmentRestElement(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType,
  start: number
): AssignmentRestElement {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightParen, false, scope, type, start);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.AssignmentRestElement(argument),
    SyntaxKind.AssignmentRestElement
  );
}

// SpreadElement :
//   ...AssignmentExpression
//
// PropertyDefinition :   [MODIFIED]
//   ...AssignmentExpression
export function parseSpreadOrPropertyArgument(
  state: ParserState,
  context: Context,
  closingToken: Token,
  isSpread: boolean,
  scope: any,
  type: BindingType,
  start: number
): Expression {
  nextToken(state, context | Context.AllowRegExp); // skips: '...'
  const innerStart = state.startIndex;

  if (state.token & Constants.IdentifierOrKeyword) {
    const tokenValue = state.tokenValue;
    let argument = parsePrimaryExpression(state, context, true);

    // '... )' , '... ]' and '... }'
    if (state.token === closingToken) {
      state.destructible = state.assignable ? Destructible.Destructible : Destructible.NotDestructible;
      return argument;
    }

    // A spread or rest element / property may not have a trailing comma, so we are setting the
    // destructible state to 'NotDestructible' for cases like '..., )',  '..., }'  and '..., ]'.
    if (state.token === Token.Comma) {
      state.destructible = Destructible.NotDestructible;
      return argument;
    }

    // This is the slow path. We shouldn't care too much about performance
    argument = parseMemberExpression(state, context, argument, true, innerStart);

    let destructible = Destructible.None;

    if (state.token !== Token.Comma && state.token !== closingToken) {
      destructible |= Destructible.NotDestructible;
      argument = parseAssignmentExpression(state, context, argument, innerStart);
    }

    if (!state.assignable) {
      destructible |= Destructible.NotDestructible;
    } else if (state.token === Token.Comma || state.token === closingToken) {
      addVarOrBlock(state, context, scope, tokenValue, type);
    } else {
      destructible |= Destructible.Assignable;
    }

    state.destructible = destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

    return argument;
  }

  // '{', '['
  if (state.token & Token.IsPatternStart) {
    let argument: any =
      state.token === Token.LeftBracket
        ? parseArrayLiteral(state, context, scope, DestuctionKind.REST, type)
        : parseObjectLiteral(state, context, scope, DestuctionKind.REST, type);

    // '...[ ] )' , '... { } ]' etc.
    if (state.token === closingToken) {
      if (isSpread) state.destructible |= Destructible.NotDestructible;
      return argument;
    }

    if (state.token === Token.Comma) {
      state.destructible = Destructible.NotDestructible;
      return argument;
    }

    if (state.destructible & Destructible.MustDestruct) {
      addEarlyDiagnostic(state, context, DiagnosticCode.iBDestruct);
    }

    argument = parseMemberExpression(state, context, argument, true, start);

    argument = parseAssignmentExpression(state, context, argument, start);

    state.destructible = state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

    return argument;
  }

  let argument = parseLeftHandSideExpression(state, context, true);

  if (state.token & Token.IsExpressionStart) {
    argument = parseAssignmentExpression(state, context, argument, innerStart);
    state.destructible |= Destructible.NotDestructible;
    return argument;
  }

  if (state.token === Token.Comma) {
    state.destructible = Destructible.NotDestructible;
    return argument;
  }

  argument = parseAssignmentExpression(state, context, argument, innerStart);

  state.destructible = state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

  return argument;
}

// ObjectLiteral :
//   `{` `}`
//   `{` PropertyDefinitionList `}`
//   `{` PropertyDefinitionList `,` `}`
export function parseObjectLiteral(
  state: ParserState,
  context: Context,
  scope: any,
  isRest: DestuctionKind,
  type: BindingType
): ObjectLiteral | AssignmentElement {
  const start = state.startIndex;
  consume(state, context | Context.AllowRegExp, Token.LeftBrace);
  const properties = [];
  let destructible = Destructible.None;
  while (state.token & Constants.ObjectLiteralElements) {
    properties.push(parsePropertyDefinition(state, context, scope, type));
    destructible |= state.destructible;
    if (state.token === Token.RightBrace) break;
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
  }
  consume(state, context, Token.RightBrace);
  const node = finishNode(state, context, start, DictionaryMap.ObjectLiteral(properties), SyntaxKind.ObjectLiteral);
  if (state.token & Token.IsAssignOp) {
    return parseAssignmentElement(state, context, destructible, node, isRest, start);
  }

  state.destructible = destructible;
  return node;
}

// AssignmentElement :
//   DestructuringAssignmentTarget
export function parseAssignmentElement(
  state: ParserState,
  context: Context,
  destructible: Destructible,
  left: ArrayLiteral | ObjectLiteral,
  kind: DestuctionKind,
  start: number
): AssignmentElement {
  if (state.token !== Token.Assign) addEarlyDiagnostic(state, context, DiagnosticCode.CompundArrLit);

  if (destructible & Destructible.NotDestructible) addEarlyDiagnostic(state, context, DiagnosticCode.iBDestruct);

  nextToken(state, context | Context.AllowRegExp);

  reinterpretToAssignment(left);

  if (kind === DestuctionKind.FOR) context |= Context.DisallowIn;

  const right = parseExpression(state, context);

  state.destructible =
    (destructible |
      Destructible.MustDestruct |
      // A rest element cannot have an initializer, so we need to set the 'NotDestructible' bit for
      // cases like '[...{a = b} = c] = d;'.
      (kind !== DestuctionKind.NORMAL ? Destructible.NotDestructible : Destructible.None)) ^
    Destructible.MustDestruct;

  return finishNode(state, context, start, DictionaryMap.AssignmentElement(left, right), SyntaxKind.AssignmentElement);
}

// PropertyDefinition :
//   IdentifierReference
//   CoverInitializedName
//   PropertyName `:` AssignmentExpression
//   MethodDefinition
//   `...` AssignmentExpression
// MethodDefinition :
//   PropertyName `(` UniqueFormalParameters `)` `{` FunctionBody `}`
//   GeneratorMethod
//   AsyncMethod
//   AsyncGeneratorMethod
//   `get` PropertyName `(` `)` `{` FunctionBody `}`
//   `set` PropertyName `(` PropertySetParameterList `)` `{` FunctionBody `}`
// GeneratorMethod :
//   `*` PropertyName `(` UniqueFormalParameters `)` `{` GeneratorBody `}`
// AsyncMethod :
//   `async` [no LineTerminator here] PropertyName `(` UniqueFormalParameters `)` `{` AsyncFunctionBody `}`
// AsyncGeneratorMethod :
//   `async` [no LineTerminator here] `*` Propertyname `(` UniqueFormalParameters `)` `{` AsyncGeneratorBody `}`

export function parsePropertyDefinition(
  state: ParserState,
  context: Context,
  scope: any,
  type: BindingType
): SpreadProperty | MethodDefinition {
  const start = state.startIndex;

  let kind = PropertyKind.None;

  let key;
  const token = state.token;
  if (optionalBit(state, context | Context.AllowRegExp, Token.Multiply)) kind |= PropertyKind.Generator;

  if (token & Constants.IdentifierOrKeyword) {
    const tokenValue = state.tokenValue;

    nextToken(state, context);

    if (state.token === Token.LeftParen) {
      key = finishNode(state, context, start, createIdentifierName(tokenValue), SyntaxKind.Identifier);
      return parseMethodDefinition(state, context, key, kind);
    }

    if (state.token === Token.Assign || state.token === Token.Comma || state.token === Token.RightBrace) {
      validateIdentifier(state, context, token, start);
      key = finishNode(state, context, start, createIdentifierReference(tokenValue), SyntaxKind.Identifier);
      if (state.token === Token.Assign) {
        nextToken(state, context | Context.AllowRegExp);
        const init = parseExpression(state, context);
        state.destructible = Destructible.MustDestruct;
        return finishNode(
          state,
          context,
          start,
          DictionaryMap.CoverInitializedName(key, init),
          SyntaxKind.CoverInitializedName
        );
      }
      state.destructible = Destructible.None;
      addVarOrBlock(state, context, scope, tokenValue, type);
      return key;
    }

    if (token & (Token.IsIdentifier | Token.IsKeyword) && state.token & Constants.CanFollowAccessor) {
      if (token === Token.AsyncKeyword && !state.lineTerminatorBeforeNextToken) {
        kind |= PropertyKind.Async;
        if (optionalBit(state, context, Token.Multiply)) kind |= PropertyKind.Generator;
      } else if (token === Token.GetKeyword) {
        kind |= PropertyKind.Getter;
      } else if (token === Token.SetKeyword) {
        kind |= PropertyKind.Setter;
      }

      // We verify here that we have any valid modifiers for cases like '({random fuck(){}})'.
      if (kind & (PropertyKind.Generator | PropertyKind.Setter | PropertyKind.Getter | PropertyKind.Async)) {
        if (
          kind & (PropertyKind.Generator | PropertyKind.Setter | PropertyKind.Getter) &&
          consumeOpt(state, context, Token.Multiply)
        ) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.NotAGen, DiagnosticKind.Error);
          kind |= PropertyKind.Generator;
        }
        return parseMethodDefinition(state, context, parsePropertyName(state, context), kind);
      }
      // ({ case foo })
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ':');
      return finishNode(state, context, start, createIdentifierReference(tokenValue), SyntaxKind.Identifier);
    }

    key = finishNode(state, context, start, createIdentifierName(tokenValue), SyntaxKind.Identifier);
  } else if (token === Token.Ellipsis) {
    return parseSpreadProperty(state, context, scope, type, start);
  } else {
    key = parsePropertyName(state, context);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.Colon)) {
    let destructible = Destructible.None;
    let value;

    const colonStart = state.startIndex;
    const colonValue = state.tokenValue;

    if (state.token & Constants.IdentifierOrKeyword) {
      value = parsePrimaryExpression(state, context, true);

      const token = state.token;

      value = parseMemberExpression(state, context, value, true, colonStart);

      if (state.token === Token.RightBrace || state.token === Token.Comma) {
        if (token === Token.Assign || token === Token.Comma || token === Token.RightBrace) {
          if (!state.assignable) destructible |= Destructible.NotDestructible;
        } else {
          destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
        }
      } else if (state.token === Token.Assign) {
        if (state.assignable) {
          addVarOrBlock(state, context, scope, colonValue, type);
          destructible |= Destructible.None;
        } else {
          destructible |= Destructible.NotDestructible;
        }
        destructible |= state.assignable ? Destructible.None : Destructible.NotDestructible;
        value = parseAssignmentExpression(state, context, value, colonStart);
      } else {
        destructible |= Destructible.NotDestructible;
        value = parseAssignmentExpression(state, context, value, colonStart);
      }
    } else if (state.token & Token.IsPatternStart) {
      value =
        state.token === Token.LeftBrace
          ? parseObjectLiteral(state, context, scope, DestuctionKind.NORMAL, type)
          : parseArrayLiteral(state, context, scope, DestuctionKind.NORMAL, type);

      destructible = state.destructible;

      if (state.token !== Token.RightBrace && state.token !== Token.Comma) {
        // Catches cases like `({a:{x = y}.z} = x);` and `[{a = b}].x`  because a shorthand with initalizer
        // must be a pattern or the nested object must be a pattern
        if (state.destructible & Destructible.MustDestruct) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
        }
        // Note: The value must have a tail and it isn't (immediately) an assignment.
        value = parseMemberExpression(state, context, value, true, start);

        destructible = state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

        value = parseAssignmentExpression(state, context, value, start);
      }
    } else {
      value = parseLeftHandSideExpression(state, context, true);

      const isAssignToken = state.token === Token.Assign;

      value = parseAssignmentExpression(state, context, value, start);

      destructible |= state.assignable || isAssignToken ? Destructible.Assignable : Destructible.NotDestructible;
    }

    state.destructible = destructible;
    return finishNode(state, context, start, DictionaryMap.PropertyName(key, value), SyntaxKind.PropertyName);
  }

  if (state.token === Token.LeftParen) return parseMethodDefinition(state, context, key, kind);

  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ColonExpected, DiagnosticKind.Error);

  return key;
}

// PropertyName :
//   LiteralPropertyName
//   ComputedPropertyName
// LiteralPropertyName :
//   IdentifierName
//   StringLiteral
//   NumericLiteral
// ComputedPropertyName :
//   `[` AssignmentExpression `]`
export function parsePropertyName(state: ParserState, context: Context): any {
  const start = state.startIndex;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    const value = parseExpression(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
    consume(state, context, Token.RightBracket);
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.ComputedPropertyName(value),
      SyntaxKind.ComputedPropertyName
    );
  }
  if (state.token === Token.StringLiteral) {
    return parseStringLiteral(state, context, /* isDirective */ false);
  }
  if (state.token === Token.NumericLiteral) {
    return parseNumericLiteral(state, context);
  }
  if (state.token === Token.BigIntLiteral) {
    return parseBigIntLiteral(state, context);
  }
  return parseIdentifierName(state, context);
}

// FormalParameters :
//   [empty]
//   FunctionRestParameter
//   FormalParameterList
//   FormalParameterList,
//   FormalParameterList , FunctionRestParameter
export function parseFormalParameters(state: ParserState, context: Context, scope: any): Parameter[] {
  const params = [];
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  let isSimpleParameterList = false;
  if (consume(state, context, Token.LeftParen)) {
    const check = context & Context.ErrorRecovery ? Constants.FormalParams : Constants.DelimitedList;
    while (state.token & check) {
      if (state.token === Token.Ellipsis) {
        params.push(parseBindingRestElement(state, context, scope, BindingType.None));
        isSimpleParameterList = true;
        if (state.token !== Token.Comma) break;
        nextToken(state, context);
        addEarlyDiagnostic(
          state,
          context,
          state.token === Token.RightBrace ? DiagnosticCode.RestTrailing : DiagnosticCode.RestNotLastParam
        );
      }
      isSimpleParameterList = (state.token & Token.IsPatternStart) === Token.IsPatternStart;
      params.push(parseBindingElements(state, context, scope, BindingType.ArgumentList, parseBindingElement));

      if (consumeOpt(state, context, Token.Comma)) continue;
      if (state.token === Token.RightParen) break;
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
    }

    consume(state, context, Token.RightParen);
  }
  if ((isSimpleParameterList || context & Context.Strict) && scope.scopeError) {
    const err = scope.scopeError;
    addparserDiagnostic(state, context, err.start, DiagnosticCode.DupBind, err.name);
  }
  return params;
}

// UniqueFormalParameters :
//    FormalParameters
export function parseUniqueFormalParameters(state: ParserState, context: Context, scope: any): Parameter[] {
  const parameters = parseFormalParameters(state, context | Context.Parameters, scope);
  // 14.1.2 - 'It is a Syntax Error if BoundNames of FormalParameters contains any duplicate elements.'
  if (scope.scopeError) {
    const err = scope.scopeError;
    addparserDiagnostic(state, context, err.start, DiagnosticCode.DupBind, err.name);
  }
  return parameters;
}

// FunctionBody :
//   FunctionStatementList
export function parseFunctionBody(
  state: ParserState,
  context: Context,
  scope: any,
  isStatement: boolean
): FunctionBody {
  const start = state.startIndex;
  const scopeError = scope.scopeError;
  const savedContext = context;
  const directives: Directive[] = [];
  const statements: Statement[] = [];

  context = (context | Context.TopLevel | Context.InBlock) ^ Context.InBlock;

  scope = createParentScope(scope, ScopeKind.FunctionBody);

  if (context & Context.Strict) {
    if (scopeError && (savedContext & Context.Strict) === 0 && (context & Context.InGlobal) === 0) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
    }
  }

  if (consume(state, context | Context.AllowRegExp, Token.LeftBrace)) {
    while (state.token === Token.StringLiteral) {
      const start = state.startIndex;
      const expr = parseStringLiteral(state, context | Context.AllowRegExp, /* isDirective */ true);
      if (canConsumeSemicolon(state)) {
        if (nextLiteralExactlyStrict(state, start)) context |= Context.Strict;
        expectSemicolon(state, context);
        directives.push(expr as Directive);
      } else {
        statements.push(
          parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start)
        );
      }
    }
    context = (context | Context.TopLevel | Context.InBlock) ^ Context.InBlock;
    while (state.token & Constants.SourceElements) {
      statements.push(parseBlockElements(state, context, scope, null, null, parseStatementListItem));
    }
    consume(state, isStatement ? context | Context.AllowRegExp : context, Token.RightBrace);
  }
  return finishNode(state, context, start, DictionaryMap.FunctionBody(directives, statements), SyntaxKind.FunctionBody);
}

// MethodDefinition :
//   PropertyName (UniqueFormalParameters) { FunctionBody }
//   GeneratorMethod
//   AsyncMethod
//   AsyncGeneratorMethod
//   getPropertyName () { FunctionBody }
//   setPropertyName ( PropertySetParameterList ) { FunctionBody }
export function parseMethodDefinition(
  state: ParserState,
  context: Context,
  key: MethodName,
  kind: PropertyKind
): MethodDefinition {
  const modifierFlags =
    (kind & PropertyKind.Constructor) === 0 ? 0b00000001111110100010000001000000 : 0b00000000111100100010000001000000;

  context =
    ((context | 0b00000100000001000000000000000000 | modifierFlags) ^ modifierFlags) |
    (kind & PropertyKind.Async ? Context.Await : 0) |
    (kind & PropertyKind.Generator ? Context.Yield : 0);

  const start = state.startIndex;

  let propertySetParameterList: (BindingIdentifier | BindingElement)[] = [];
  let uniqueFormalParameters: Parameter[] = [];

  const scope = createParentScope(createScope(), ScopeKind.FunctionParams);

  // getter
  if (kind & PropertyKind.Getter) {
    consume(state, context, Token.LeftParen);
    consume(state, context, Token.RightParen);
  } else if (kind & PropertyKind.Setter) {
    consume(state, context, Token.LeftParen);
    propertySetParameterList = [parseBindingElement(state, context, scope, BindingType.ArgumentList)];
    if (scope.scopeError) {
      const err: any = scope.scopeError;
      addparserDiagnostic(state, context, err.start, DiagnosticCode.DupBind, err.name);
    }
    consume(state, context, Token.RightParen);
  } else {
    uniqueFormalParameters = parseUniqueFormalParameters(state, context, scope);
  }

  state.destructible = Destructible.NotDestructible;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.MethodDefinition(
      (kind & PropertyKind.Async) !== 0,
      (kind & PropertyKind.Generator) !== 0,
      propertySetParameterList,
      uniqueFormalParameters,
      key,
      parseFunctionBody(
        state,
        (context | Context.InGlobal | Context.NewTarget | Context.Return) ^ Context.InGlobal,
        scope,
        false
      )
    ),
    SyntaxKind.MethodDefinition
  );
}

// FunctionExpression :
//   `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`
// GeneratorExpression :
//   `function` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`
//
// AsyncGeneratorExpression :
//   `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
//
// Async`FunctionExpression :
//   `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`
export function parseFunctionExpression(
  state: ParserState,
  context: Context,
  assignable: boolean
): FunctionExpression | IdentifierReference | Expression {
  const start = state.startIndex;
  let isAsync = 0;

  if (optionalBit(state, context, Token.AsyncKeyword)) {
    if (state.token !== Token.FunctionKeyword || state.lineTerminatorBeforeNextToken) {
      return parseAsyncArrowExpression(state, context, assignable, start);
    }
    isAsync = 1;
  }

  consume(state, context | Context.AllowRegExp, Token.FunctionKeyword);

  const isGenerator = optionalBit(state, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  let scope = createScope();
  let name: BindingIdentifier | null = null;

  if (
    state.token &
    (context & Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword)
  ) {
    name = validateFunctionName(
      state,
      ((context | 0b00000101111111101010000000000000) ^ 0b00000001111111101010000000000000) | generatorAndAsyncFlags
    );
  } else if (state.token !== Token.LeftParen) {
    name = createBindingIdentifier(state, context, DiagnosticCode.ExpectedBindingIdent, /* shouldConsume */ false);
    scope = createParentScope(scope, ScopeKind.FunctionRoot);
  }
  context =
    ((context | 0b00000101111111101010000000000000) ^ 0b00000001111111101010000000000000) | generatorAndAsyncFlags;

  scope = createParentScope(scope, ScopeKind.FunctionParams);

  const params = parseFormalParameters(state, context | Context.Parameters, scope);

  const contents = parseFunctionBody(
    state,
    (context | Context.InGlobal | Context.Return) ^ Context.InGlobal,
    scope,
    false
  );

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.FunctionExpression(name, isGenerator === 1, isAsync === 1, params, contents),
    SyntaxKind.FunctionExpression
  );
}

export function parseAsyncArrowExpression(
  state: ParserState,
  context: Context,
  assignable: boolean,
  start: number
): Expression {
  const hasLineTerminator = state.lineTerminatorBeforeNextToken;
  if (!hasLineTerminator) {
    // `async` [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
    if (state.token & (Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword)) {
      return parseArrowFunction(
        state,
        context,
        {},
        [parseBindingIdentifier(state, context, {}, BindingType.None)],
        ArrowKind.ASYNC,
        start
      );
    }
  }
  const expr: any = finishNode(
    state,
    context,
    start,
    DictionaryMap.IdentifierReference('async'),
    SyntaxKind.Identifier
  );

  // `async ()`, `async () => ...`
  if (state.token === Token.LeftParen) {
    return parseCoverCallExpressionAndAsyncArrowHead(state, context, expr, hasLineTerminator, assignable, start);
  }

  // IdentifierReference [no LineTerminator here] `=>`
  if (state.token === Token.Arrow) {
    return parseArrowFunction(state, context, {}, expr, ArrowKind.NORMAL, start);
  }
  state.assignable = true;
  // `async`
  return expr;
}

// FunctionDeclaration :
//   `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
//   [+Default] `function` `(` FormalParameters `)` `{` FunctionBody `}`
//
// GeneratorDeclaration :
//   `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
//   [+Default] `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`
//
// AsyncGeneratorDeclaration :
//   `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
//   [+Default] `async` [no LineTerminator here]  `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
//
// AsyncFunctionDeclaration :
//   `async` [no LineTerminator here] `function` ( `FormalParameters` ) `{` FunctionBody `}`
//   `async` [no LineTerminator here] `function` BindingIdentifier ( `FormalParameters` ) `{` FunctionBody `}`
//   [+Default] `async`  [no LineTerminator here] `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
export function parseFunctionDeclaration(
  state: ParserState,
  context: Context,
  scope: any,
  disallowGen: boolean,
  isHoisted = false
): FunctionDeclaration | ExpressionStatement | ArrowFunction {
  const start = state.startIndex;

  let isAsync = 0;

  if (consumeOpt(state, context, Token.AsyncKeyword)) {
    if (state.token !== Token.FunctionKeyword || state.lineTerminatorBeforeNextToken) {
      return parseAsyncArrowDeclaration(state, context, start);
    }
    isAsync = 1;
  }

  consume(state, context | Context.AllowRegExp, Token.FunctionKeyword);

  const isGenerator = optionalBit(state, context, Token.Multiply);

  // FunctionDeclaration doesn't include generators
  if (disallowGen && isGenerator) addEarlyDiagnostic(state, context, DiagnosticCode.FuncGenLabel);

  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  // Create a new function scope
  let innerScope = createScope();

  let name: BindingIdentifier | null = null;
  if (
    state.token &
    (context & Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword)
  ) {
    const { tokenValue } = state;
    name = validateFunctionName(state, context | ((context & 0b0000000000000000000_1100_00000000) << 11));

    if (context & Context.TopLevel && (context & Context.Module) !== Context.Module) {
      addVarName(state, context, scope, tokenValue, BindingType.Var);
    } else {
      addBlockName(state, context, scope, tokenValue, BindingType.FunctionLexical);
    }

    if (isHoisted) declareUnboundVariable(state, context, tokenValue);

    innerScope = createParentScope(innerScope, ScopeKind.FunctionRoot);
  } else {
    // In recovery mode we allow everything that can start an expression as an function name so we can insert an
    // dummy identifier without priming the scanner. It makes a clear distinction when it comes to cases
    // like 'function while() {}', 'function true() {}' and 'function function (function)'.
    if (state.token & Token.IsExpressionStart && (context & Context.Default) !== Context.Default) {
      name = createBindingIdentifier(state, context, DiagnosticCode.ExpectedBindingIdent, /* shouldConsume */ false);
    } else if ((context & Context.Default) !== Context.Default) {
      addEarlyDiagnostic(state, context, DiagnosticCode.MissingFuncName);
    }
  }

  context =
    ((context | 0b00000101111111101010000000000000) ^ 0b00000001111111101010000000000000) | generatorAndAsyncFlags;

  innerScope = createParentScope(innerScope, ScopeKind.FunctionParams);

  const params = parseFormalParameters(state, context | Context.Parameters, innerScope);

  const contents = parseFunctionBody(
    state,
    (context | Context.InGlobal | Context.Return) ^ Context.InGlobal,
    innerScope,
    true
  );

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.FunctionDeclaration(name, isGenerator === 1, isAsync === 1, params, contents),
    SyntaxKind.FunctionDeclaration
  );
}

// `async` [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
export function parseAsyncArrowDeclaration(state: ParserState, context: Context, start: number): any {
  const hasLineTerminator = state.lineTerminatorBeforeNextToken;
  if (!hasLineTerminator) {
    if (state.token & (Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword)) {
      const value = state.tokenValue;
      let expr: any = parseArrowAfterIdentifier(
        state,
        context,
        [parseBindingIdentifier(state, context, {}, BindingType.None)],
        value,
        true,
        ArrowKind.ASYNC,
        start
      );
      // `async foo => ..., async foo => ...`
      expr = parseCommaOperator(state, context, expr, start);
      return parseExpressionStatement(state, context, expr, start);
    }
  }
  let expr: any = finishNode(state, context, start, DictionaryMap.IdentifierReference('async'), SyntaxKind.Identifier);

  // `async: foo`
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, void 0, Token.AsyncKeyword, 'async', [], null, false, start);
  }

  // `async ()`, `async () => ...`
  if (state.token === Token.LeftParen) {
    expr = parseCoverCallExpressionAndAsyncArrowHead(state, context, expr, hasLineTerminator, true, start);
    // `async => ...`
  } else if (state.token === Token.Arrow) {
    expr = parseArrowAfterIdentifier(state, context, expr, 'async', true, ArrowKind.NORMAL, start);
  }
  state.assignable = true;
  // `async++`, `async`\n${0}`:`, `async?.()`
  expr = parseExpressionOrHigher(state, context, expr, start);

  return parseExpressionStatement(state, context, expr, start);
}

export function parseArrowAfterIdentifier(
  state: ParserState,
  context: Context,
  params: ArrowFormals[],
  value: string,
  assignable: boolean,
  kind: ArrowKind,
  start: number
): ArrowFunction {
  // 'x = (a)-c=>{};',
  if (!assignable) {
    addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedExpression);
    // We mark this node as 'dirty' in case we parse something like 'x = (a)-c=>{};' in 'recovery mode'.
    // This isn't an early error and requires a full parse if we do incremental parsing.
    state.flags |= Flags.NodeHasErrors;
  }
  const scope = createParentScope(createScope(), ScopeKind.ArrowParams);
  addBlockName(state, context, scope, value, BindingType.ArgumentList);
  return parseArrowFunction(state, context, scope, params, kind, start);
}

// `CoverCallExpressionAndAsyncArrowHead : MemberExpressionArguments`
export function parseCoverCallExpressionAndAsyncArrowHead(
  state: ParserState,
  context: Context,
  expr: Expression,
  hasLineTerminator: boolean,
  assignable: boolean,
  start: number
): ArrowFunction | Expression {
  nextToken(state, context | Context.AllowRegExp);
  const scope = createParentScope(createScope(), ScopeKind.ArrowParams);

  if (consumeOpt(state, context, Token.RightParen)) {
    if (state.token === Token.Arrow) {
      if (hasLineTerminator) addEarlyDiagnostic(state, context, DiagnosticCode.AsyncLineT);
      return parseArrowFunction(state, context, scope, [], ArrowKind.ASYNC, start);
    }

    return finishNode(state, context, start, DictionaryMap.CallExpression(expr, []), SyntaxKind.CallExpression);
  }

  const check = context & Context.ErrorRecovery ? Constants.ParenthesizedR : Constants.ParenthesizedN;

  // For async arrows in 'Recovery mode' we got tons of edge cases. Example this case 'async(async [ => c'.
  // This particular case will be parsed as
  //
  //         'async(async [ MISSING_BINDING_IDENTIFIER ] ) => c'
  //
  // We do this because both '[' and '{' are start of an pattern in 'AsyncArrowHead'.

  let destructible: Destructible = Destructible.None;
  let expression!: Expression;
  const params: Expression[] = [];

  while (state.token & check) {
    const innerStart = state.startIndex;

    if (state.token & Constants.IdentifierOrKeyword) {
      expression = parsePrimaryExpression(state, context, true);

      // (x, false) => y
      if (state.token === Token.Comma || state.token === Token.RightParen) {
        if (!state.assignable) destructible |= Destructible.NotDestructible;
      } else {
        if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;
        expression = parseMemberExpression(state, context, expression, true, innerStart);

        if (state.token !== Token.RightParen && state.token !== Token.Comma) {
          expression = parseAssignmentExpression(state, context, expression, innerStart);
        }
      }
    } else if (state.token & Token.IsPatternStart) {
      expression =
        state.token === Token.LeftBracket
          ? parseArrayLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList)
          : parseObjectLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList);

      destructible |= state.destructible;

      state.assignable = false;

      if (state.token !== Token.Comma && state.token !== Token.RightParen) {
        if (destructible & Destructible.MustDestruct) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
        }

        expression = parseMemberExpression(state, context, expression, true, innerStart);

        destructible |= Destructible.NotDestructible;

        if (state.token !== Token.Comma || state.token !== Token.LeftParen) {
          expression = parseAssignmentExpression(state, context, expression, innerStart);
          destructible |= !state.assignable ? Destructible.NotDestructible : Destructible.Assignable;
        }
      }
    } else if (state.token === Token.Ellipsis) {
      expression = parseAssignmentRestElement(state, context, scope, BindingType.ArgumentList, innerStart);
      destructible |= state.destructible;
      destructible |= state.token === Token.RightParen ? Destructible.None : Destructible.NotDestructible;
    } else {
      // If we try to parse something that cannot be 'AsyncArrowHead' like '1', '/a/' or (x), we
      // parse out the delimited list and return an 'CallExpression'.
      do {
        params.push(parseArgumentList(state, context));
      } while (consumeOpt(state, context | Context.AllowRegExp, Token.Comma));

      consume(state, context, Token.RightParen);

      state.assignable = false;

      return finishNode(state, context, start, DictionaryMap.CallExpression(expr, params), SyntaxKind.CallExpression);
    }
    params.push(expression);

    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
    if (state.token === Token.RightParen) break;
  }

  consume(state, context, Token.RightParen);

  if (context & Context.ErrorRecovery && destructible & Destructible.NotDestructible) {
    state.assignable = false;
    return finishNode(state, context, start, DictionaryMap.CallExpression(expr, params), SyntaxKind.CallExpression);
  }

  if (state.token === Token.Arrow) {
    if (hasLineTerminator) addEarlyDiagnostic(state, context, DiagnosticCode.AsyncLineT);
    return parseArrowAfterParen(state, context, scope, assignable, destructible, ArrowKind.ASYNC, params as any, start);
  }

  if (destructible & Destructible.MustDestruct) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
  }

  state.assignable = false;
  return finishNode(state, context, start, DictionaryMap.CallExpression(expr, params), SyntaxKind.CallExpression);
}

// ArrowFunction :
//   ArrowParameters
export function parseArrowFunction(
  state: ParserState,
  context: Context,
  scope: any,
  parameters: ArrowFormals[],
  isAsync: ArrowKind,
  start: number
): ArrowFunction {
  consume(state, context | Context.AllowRegExp, Token.Arrow);
  context =
    ((context | 0b0000000111100000000_0000_00000000) ^ 0b0000000111100000000_0000_00000000) |
    (isAsync << 22) |
    Context.Return;

  let i = parameters.length;
  while (i--) {
    reinterpretToPattern(parameters[i]);
  }
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ArrowFunction(parameters, parseConciseOrFunctionBody(state, context, scope), isAsync === 1),
    SyntaxKind.ArrowFunction
  );
}

// FunctionBody :
//   FunctionStatementList
//
// ConciseBody :
//   [lookahead ≠ {]ExpressionBody
//   { FunctionBody }
export function parseConciseOrFunctionBody(
  state: ParserState,
  context: Context,
  scope: any
): FunctionBody | ConciseBody {
  if (scope.scopeError !== void 0) {
    const err = scope.scopeError;
    addparserDiagnostic(state, context, err.start, DiagnosticCode.DupBind, err.name);
  }

  if (state.token === Token.LeftBrace) {
    const body = parseFunctionBody(
      state,
      (context | Context.InGlobal | Context.NewTarget | Context.Return) ^ Context.InGlobal,
      scope,
      true
    );

    if (state.lineTerminatorBeforeNextToken) {
      switch (state.token) {
        case Token.Period:
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.BlockBodyAccessedWithoutGroup,
            DiagnosticKind.Error
          );
          break;
        case Token.QuestionMark:
        case Token.Exponentiate:
        case Token.Multiply:
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.ArrowOperatorToRight,
            DiagnosticKind.Error
          );
          break;
        default: // ignore
      }
    } else {
      if (state.token & Token.IsBinaryOp) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.ArrowOperatorToRight,
          DiagnosticKind.Error
        );
      } else {
        switch (state.token) {
          case Token.Period:
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyAccessedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.LeftParen:
          case Token.LeftBracket:
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyInvokedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.TemplateTail:
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyTaggedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.QuestionMark:
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.ArrowOperatorToRight,
              DiagnosticKind.Error
            );
          default: // ignore
        }
      }
    }
    return body;
  }

  return finishNode(
    state,
    context,
    state.startIndex,
    DictionaryMap.ConciseBody(parseExpression(state, context)),
    SyntaxKind.ConciseBody
  );
}

// CoverParenthesizedExpressionAndArrowParameterList :
//   `(` Expression `)`
//   `(` Expression `,` `)`
//   `(` `)`
//   `(` `...` BindingIdentifier `)`
//   `(` `...` BindingPattern `)`
//   `(` Expression `,` `...` BindingIdentifier `)`
//   `(` Expression `.` `...` BindingPattern `)`
export function parseCoverParenthesizedExpressionAndArrowParameterList(
  state: ParserState,
  context: Context,
  assignable: boolean
): Expression | ArrowFunction | ParenthesizedExpression {
  const start = state.startIndex;
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  consume(state, context | Context.AllowRegExp, Token.LeftParen);

  const scope = createParentScope(createScope(), ScopeKind.ArrowParams);

  let expression: any = [];
  let destructible = Destructible.None;
  let isDelimitedList = false;
  let innerStart = state.startIndex;

  if (!consumeOpt(state, context, Token.RightParen)) {
    if (state.token === Token.Ellipsis) {
      const param = parseBindingRestElement(state, context, scope, BindingType.ArgumentList);
      consume(state, context, Token.RightParen);
      return parseArrowFunction(state, context, scope, [param], ArrowKind.NORMAL, start);
    }

    if (state.token & Constants.IdentifierOrKeyword) {
      addBlockName(state, context, scope, state.tokenValue, BindingType.ArgumentList);
      expression = parsePrimaryExpression(state, context, true);

      if (state.token === Token.Comma || state.token === Token.RightParen) {
        if (!state.assignable) destructible |= Destructible.NotDestructible;
      } else {
        if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;
        expression = parseMemberExpression(state, context, expression, true, innerStart);

        if (state.token !== Token.RightParen && state.token !== Token.Comma) {
          expression = parseAssignmentExpression(state, context, expression, innerStart);
        }
      }
    } else if (state.token & Token.IsPatternStart) {
      expression =
        state.token === Token.LeftBracket
          ? parseArrayLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList)
          : parseObjectLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList);

      destructible |= state.destructible;

      state.assignable = false;

      if (state.token !== Token.Comma && state.token !== Token.RightParen) {
        if (destructible & Destructible.MustDestruct) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
        }
        expression = parseMemberExpression(state, context, expression, true, innerStart);

        destructible |= Destructible.NotDestructible;

        if (state.token !== Token.Comma || state.token !== Token.LeftParen) {
          expression = parseAssignmentExpression(state, context, expression, innerStart);
          destructible |= !state.assignable ? Destructible.NotDestructible : Destructible.Assignable;
        }
      }
    } else {
      destructible |= Destructible.NotDestructible;

      expression = parseExpression(state, context);

      expression = parseCommaOperator(state, context, expression, start);

      consume(state, context, Token.RightParen);

      state.destructible = destructible;

      return finishNode(
        state,
        context,
        start,
        DictionaryMap.ParenthesizedExpression(expression),
        SyntaxKind.ParenthesizedExpression
      );
    }

    // 12.16 Comma Operator
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      // In recovery mode where a comma is missing - for example '(a b' - this is no longer considered
      // as a start of a sequence. The parser will break out of the loop and parse 'a' as its own production.
      //
      // This is in line with how we are dealing with invalid 'CommaOperator' cases.
      //
      // However if we already are inside an sequence - cases like '(a b c foo' - we will just pretend that we
      // have seen a comma and continue to parse it as an sequence. This ensures we get back on track
      // and don't result in tons of parse errors.

      const expressions = [expression];

      isDelimitedList = true;

      if (state.token === Token.RightParen) destructible |= Destructible.DisallowTrailing;

      const check = context & Context.ErrorRecovery ? Constants.ParenthesizedR : Constants.ParenthesizedN;

      while (state.token & check) {
        innerStart = state.startIndex;
        if (state.token & Constants.IdentifierOrKeyword) {
          addBlockName(state, context, scope, state.tokenValue, BindingType.ArgumentList);
          expression = parsePrimaryExpression(state, context, true);

          // (x, false) => y
          if (state.token === Token.Comma || state.token === Token.RightParen) {
            if (!state.assignable) destructible |= Destructible.NotDestructible;
          } else {
            if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;
            expression = parseMemberExpression(state, context, expression, true, innerStart);

            if (state.token !== Token.RightParen && state.token !== Token.Comma) {
              expression = parseAssignmentExpression(state, context, expression, innerStart);
            }
          }
        } else if (state.token & Token.IsPatternStart) {
          expression =
            state.token === Token.LeftBracket
              ? parseArrayLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList)
              : parseObjectLiteral(state, context, scope, DestuctionKind.NORMAL, BindingType.ArgumentList);

          destructible |= state.destructible;

          state.assignable = false;

          if (state.token !== Token.Comma && state.token !== Token.RightParen) {
            if (destructible & Destructible.MustDestruct) {
              addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
            }

            expression = parseMemberExpression(state, context, expression, true, innerStart);

            destructible |= Destructible.NotDestructible;

            if (state.token !== Token.Comma || state.token !== Token.LeftParen) {
              expression = parseAssignmentExpression(state, context, expression, innerStart);
              destructible |= !state.assignable ? Destructible.NotDestructible : Destructible.Assignable;
            }
          }
        } else if (state.token === Token.Ellipsis) {
          expressions.push(parseBindingRestElement(state, context, scope, BindingType.ArgumentList));
          if (state.destructible & Destructible.NotDestructible) {
            addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
          }
          break;
        } else {
          destructible |= Destructible.NotDestructible;

          expression = parseExpression(state, context);

          expression = parseCommaOperator(state, context, expression, start);

          consume(state, context, Token.RightParen);

          state.destructible = destructible;

          return finishNode(
            state,
            context,
            start,
            DictionaryMap.ParenthesizedExpression(expression),
            SyntaxKind.ParenthesizedExpression
          );
        }

        expressions.push(expression);

        if (consumeOpt(state, context, Token.Comma)) continue;
        if (state.token === Token.RightParen) break;
      }

      state.assignable = false;

      expression = finishNode(
        state,
        context,
        start,
        DictionaryMap.CommaOperator(expressions),
        SyntaxKind.CommaOperator
      );
    }

    consume(state, context, Token.RightParen);

    // ({x=>   ({ => {}   (x, {}[a] => async   (x[, {}[a] => async
    if (context & Context.ErrorRecovery && destructible & Destructible.NotDestructible) {
      state.destructible = destructible;

      return finishNode(
        state,
        context,
        start,
        DictionaryMap.ParenthesizedExpression(expression),
        SyntaxKind.ParenthesizedExpression
      );
    }
    // ArrowParameters :
    //   CoverParenthesizedExpressionAndArrowParameterList

    if (state.token === Token.Arrow) {
      const param = isDelimitedList ? expression.expressions : [expression];
      return parseArrowAfterParen(state, context, scope, assignable, destructible, ArrowKind.NORMAL, param, start);
    }

    if (destructible & (Destructible.DisallowTrailing | Destructible.MustDestruct)) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        destructible & Destructible.DisallowTrailing ? DiagnosticCode.ForbiddenTrailing : DiagnosticCode.iBDestruct,
        DiagnosticKind.Error
      );
    }
  } else {
    if (state.token === Token.Arrow) {
      return parseArrowAfterParen(state, context, scope, assignable, destructible, ArrowKind.NORMAL, expression, start);
    }
    expression = createIdentifier(state, context, DiagnosticCode.ExpectedArrow);
  }

  state.destructible = destructible;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ParenthesizedExpression(expression),
    SyntaxKind.ParenthesizedExpression
  );
}

export function parseArrowAfterParen(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  assignable: boolean,
  destructible: Destructible,
  kind: ArrowKind,
  params: ArrowFormals[],
  start: number
): Expression | ArrowFunction | ParenthesizedExpression {
  if (!assignable) {
    addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedExpression);
    // We mark this node as 'dirty' in case we parse something like 'x = (a)-c=>{}' in 'recovery mode'.
    // This isn't an early error and requires a full parse if we do incremental parsing.
    state.flags |= Flags.NodeHasErrors;
  }
  if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
    addEarlyDiagnostic(state, context, DiagnosticCode.LHSADestruct);
  }

  return parseArrowFunction(state, context, scope, params, kind, start);
}

// ClassDeclaration :
//   `class` BindingIdentifier ClassTail
//   [+Default] `class` ClassTail
//
// ClassTail : ClassHeritage? `{` ClassBody? `}`
// ClassHeritage : `extends` LeftHandSideExpression
// ClassBody : ClassElementList
export function parseClassDeclaration(
  state: ParserState,
  context: Context,
  scope: any,
  isHoisted = false
): ClassDeclaration {
  const start = state.startIndex;

  consume(state, context | Context.AllowRegExp, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | Context.InConstructor) ^ Context.InConstructor;

  context |= Context.Strict;

  let name: BindingIdentifier | null = null;
  let heritage: Expression | null = null;

  if (
    state.token &
      (context & Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword) &&
    state.token !== Token.ExtendsKeyword
  ) {
    // A named class creates a new lexical scope with a const binding of the
    // class name for the "inner name".
    if (isHoisted) declareUnboundVariable(state, context, state.tokenValue);
    name = parseBindingIdentifier(state, (context | Context.InBlock) ^ Context.InBlock, scope, BindingType.Const);
  } else if ((context & Context.Default) !== Context.Default) {
    addEarlyDiagnostic(state, context, DiagnosticCode.MissingClassName);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    heritage = parseLeftHandSideExpression(state, context, false);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ClassDeclaration(name, heritage, parseClassElementList(state, inheritedContext, context)),
    SyntaxKind.ClassDeclaration
  );
}

// ClassExpression :
//   `class` BindingIdentifier? ClassTail
//
// ClassTail : ClassHeritage? `{` ClassBody? `}`
// ClassHeritage : `extends` LeftHandSideExpression
// ClassBody : ClassElementList
export function parseClassExpression(state: ParserState, context: Context): ClassExpression {
  const start = state.startIndex;
  consume(state, context, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases

  let inheritedContext = (context | Context.InConstructor) ^ Context.InConstructor;

  context |= Context.Strict;

  let name: BindingIdentifier | null = null;
  let heritage: Expression | null = null;

  if (
    state.token &
      (context & Context.ErrorRecovery ? Constants.IdentifierOrFutureReserved : Constants.IdentifierOrKeyword) &&
    state.token !== Token.ExtendsKeyword
  ) {
    name = parseBindingIdentifier(state, context, void 0, BindingType.None);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    heritage = parseLeftHandSideExpression(state, context, false);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ClassExpression(name, heritage, parseClassElementList(state, inheritedContext, context)),
    SyntaxKind.ClassExpression
  );
}

// ClassElementList :
//   ClassElement
//   ClassElementList
export function parseClassElementList(state: ParserState, context: Context, inheritedContext: Context): ClassElement[] {
  const elements = [];
  if (consume(state, context | Context.AllowRegExp, Token.LeftBrace)) {
    const check = context & Context.ErrorRecovery ? Constants.ClassListR : Constants.ClassListN;
    while (state.token & check) {
      elements.push(parseClassElement(state, context, inheritedContext, false, PropertyKind.None));
      consumeOpt(state, context, Token.Comma);
      if (state.token === Token.RightBrace) break;
    }
    consume(state, context, Token.RightBrace);
  }
  return elements;
}

// ClassElement :
//   `static` MethodDefinition
//   MethodDefinition
// ;
export function parseClassElement(
  state: ParserState,
  context: Context,
  inheritedContext: Context,
  isStatic: boolean,
  kind: PropertyKind
): ClassElement {
  const start = state.startIndex;

  if (state.token === Token.Semicolon) {
    nextToken(state, context);
    return finishNode(state, context, start, DictionaryMap.Semicolon(), SyntaxKind.Semicolon);
  }

  if (state.token & Constants.IdentifierOrKeyword) {
    const token = state.token;
    let key: MethodName = parseIdentifierName(state, context);

    if (!isStatic && token === Token.StaticKeyword) {
      if (state.token === Token.LeftParen) {
        const method = parseMethodDefinition(state, context, key, kind);
        return finishNode(state, context, start, DictionaryMap.ClassElement(isStatic, method), SyntaxKind.ClassElement);
      }
      return parseClassElement(state, context, inheritedContext, true, kind);
    }

    if (token & (Token.IsIdentifier | Token.IsKeyword) && state.token & Constants.CanFollowAccessor) {
      if (!state.lineTerminatorBeforeNextToken && token === Token.AsyncKeyword) {
        kind |= PropertyKind.Async;
        if (consumeOpt(state, context, Token.Multiply)) kind |= PropertyKind.Generator;
      } else if (token === Token.GetKeyword) {
        kind |= PropertyKind.Getter;
      } else if (token === Token.SetKeyword) {
        kind |= PropertyKind.Setter;
      }

      if ((kind & (PropertyKind.Async | PropertyKind.Setter | PropertyKind.Generator | PropertyKind.Getter)) === 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedAccessor, DiagnosticKind.Error);
      }
      if (state.token === Token.Multiply) {
        addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedAccessor);
      }
      if (state.token === Token.LeftBracket) {
        consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket);
        const expr = parseExpression(state, (inheritedContext | Context.DisallowIn) ^ Context.DisallowIn);
        consume(state, context, Token.RightBracket);
        key = finishNode(
          state,
          context,
          start,
          DictionaryMap.ComputedPropertyName(expr),
          SyntaxKind.ComputedPropertyName
        );
      } else {
        if (isStatic) {
          if (state.tokenValue === 'prototype') {
            addEarlyDiagnostic(state, context, DiagnosticCode.StaticPrototype);
          }
        }
        if (!isStatic && state.tokenValue === 'constructor') {
          addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedAccessor);
        }
        key = parsePropertyName(state, inheritedContext);
      }
    } else {
      if (isStatic && state.tokenValue === 'prototype') {
        addEarlyDiagnostic(state, context, DiagnosticCode.StaticPrototype);
      }
      if (state.tokenValue === 'constructor') kind |= PropertyKind.Constructor;
    }

    const method = parseMethodDefinition(state, context, key, kind);

    return finishNode(state, context, start, DictionaryMap.ClassElement(isStatic, method), SyntaxKind.ClassElement);
  }

  if (consumeOpt(state, context, Token.Multiply)) kind |= PropertyKind.Generator;
  if (state.tokenValue === 'constructor') {
    if (!isStatic && kind & PropertyKind.Generator) {
      addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedAccessor);
    }
    kind |= PropertyKind.Constructor;
  }
  const method = parseMethodDefinition(state, context, parsePropertyName(state, inheritedContext), kind);

  return finishNode(state, context, start, DictionaryMap.ClassElement(isStatic, method), SyntaxKind.ClassElement);
}

// SuperCall :
//   superArguments
//
// SuperProperty :
//   super[Expression]
//   super.IdentifierName
export function parseSuperCallOrProperty(state: ParserState, context: Context): SuperCall | SuperProperty {
  const start = state.startIndex;
  nextToken(state, context);

  if (state.token === Token.LeftParen) {
    if ((context & Context.SuperCall) === 0) addEarlyDiagnostic(state, context, DiagnosticCode.NoSuperCall);
    const args = parseArguments(state, context);
    return finishNode(state, context, start, DictionaryMap.SuperCall(args), SyntaxKind.SuperCall);
  }

  if ((context & Context.SuperProperty) === 0) addEarlyDiagnostic(state, context, DiagnosticCode.NoSuperProperty);

  let expr!: Expression | IdentifierName;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    expr = parseExpression(state, context);
    consume(state, context, Token.RightBracket);
  } else {
    if (state.token !== Token.Period) {
      addEarlyDiagnostic(
        state,
        context,
        state.token === Token.QuestionMarkPeriod
          ? // Optional chain disallowed in super property
            DiagnosticCode.ChainingNoSuper
          : // `super` must be followed by an argument list or member access
            DiagnosticCode.NoSuper
      );
    }

    consumeOpt(state, context, Token.Period);
    expr = parseIdentifierName(state, context);
  }

  state.assignable = true;

  return finishNode(state, context, start, DictionaryMap.SuperProperty(expr), SyntaxKind.SuperProperty);
}

// AssignmentExpression :
//   ConditionalExpression
//   [+Yield] YieldExpression
//   ArrowFunction
//   AsyncArrowFunction
//   LeftHandSideExpression `=` AssignmentExpression
//   LeftHandSideExpression AssignmentOperator AssignmentExpression
//   LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
//
// AssignmentOperator : one of
//   *= /= %= += -= <<= >>= >>>= &= ^= |= **=
//
// LogicalAssignmentOperator : one of
//   &&= ||= ??=
//
/**
 * MemberExpression :
 *   PrimaryExpression
 *   MemberExpression [ AssignmentExpression ]
 *   MemberExpression . IdentifierName
 *   MemberExpression TemplateLiteral
 *   SuperProperty
 *   MetaProperty
 *   new MemberExpression
 *
 * CallExpression :
 *   MemberExpression Arguments
 *   CallExpression Arguments
 *   CallExpression [ AssignmentExpression ]
 *   CallExpression . IdentifierName
 *   CallExpression TemplateLiteral
 *
 * SuperProperty :
 *   super [ Expression ]
 *   super . IdentifierName
 *
 * MetaProperty :
 *   NewTarget
 *   ImportMeta
 */
export function parseExpressionOrHigher(
  state: ParserState,
  context: Context,
  expr: Expression | CommaOperator | IdentifierReference | ArrowFunction,
  start: number
): Expression {
  // `.foo`, `.[foo]`, `?.foo`
  expr = parseMemberExpression(state, context, expr, true, start);

  // `foo = bar`, `foo[foo] = bar`, `?.foo = bar`
  expr = parseAssignmentExpression(state, context, expr, start);

  // `foo = bar, zoo()`, `foo[foo], bar`, `?.foo, bar`
  return parseCommaOperator(state, context, expr, start);
}

// ImportCall :
//  import
export function parseImportCall(state: ParserState, context: Context, start: number): ExpressionStatement {
  let expr = parseExpression(state, context);
  consume(state, context, Token.RightParen);
  expr = finishNode(state, context, start, DictionaryMap.ImportCall(expr), SyntaxKind.ImportCall);
  expr = parseExpressionOrHigher(state, context, expr, start);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ExpressionStatement(expr), SyntaxKind.ExpressionStatement);
}

// ImportMeta:
//   import.meta
export function parseImportMeta(state: ParserState, context: Context, start: number): ExpressionStatement {
  consume(state, context, Token.MetaIdentifier);
  let expr = finishNode(state, context, start, DictionaryMap.ImportMeta(), SyntaxKind.ImportMeta);
  state.assignable = false;
  expr = parseExpressionOrHigher(state, context, expr, start);
  expectSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ExpressionStatement(expr), SyntaxKind.ExpressionStatement);
}

// FromClause :
//   `from` ModuleSpecifier
export function parseFromClause(state: ParserState, context: Context): StringLiteral {
  consume(state, context, Token.FromKeyword);
  if (state.token !== Token.StringLiteral) addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedString);
  return parseStringLiteral(state, context, /* isDirective */ false);
}

// ExportDeclaration :
//   `export` ExportFromClause FromClause `;`
//   `export` NamedExports `;`
//   `export` VariableStatement
//   `export` Declaration
//   `export` `default` HoistableDeclaration [MODIFIED]
//   `export` `default` ClassDeclaration  [MODIFIED]
//   `export` `default` AssignmentExpression `;`  [MODIFIED]
//
// ExportFromClause :
//   `*`
//   `*` as IdentifierName
//   NamedExports
export function parseExportDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ExportDeclaration | ExportDefault {
  const start = state.startIndex;

  nextToken(state, context | Context.AllowRegExp);

  if (consumeOpt(state, context | Context.AllowRegExp, Token.DefaultKeyword)) {
    return parseExportDefault(state, context, start, scope);
  }

  let declaration:
    | AssignmentExpression
    | VariableStatement
    | LexicalDeclaration
    | FunctionDeclaration
    | ClassDeclaration
    | Statement
    | null = null;

  let fromClause: StringLiteral | null = null;
  let namedBinding: IdentifierName | null = null;
  let namedExports: ExportSpecifier[] = [];
  const exportedNames: string[] = [];
  const boundNames: string[] = [];

  switch (state.token) {
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, scope, BindingType.Let | BindingType.Export, [], null);
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, scope, BindingType.Const | BindingType.Export, [], null);
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(state, context, scope, true);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(state, context, scope, false, true);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(state, context, scope, false, true);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context, scope, BindingType.Var | BindingType.Export);
      break;
    case Token.LeftBrace: {
      namedExports = parseNamedExports(state, context, exportedNames, boundNames);
      if (state.token === Token.FromKeyword) {
        fromClause = parseFromClause(state, context);
      } else {
        const i = exportedNames.length;
        for (let i = exportedNames.length - 1; i >= 0; i -= 1) {
          const name = '#' + exportedNames[i];
          if (state.exportedNames[name]) {
            addEarlyDiagnostic(state, context, DiagnosticCode.RedeclareVar, exportedNames[i]);
          }
          state.exportedNames[name] = 1;
          state.exportedBindings['#' + boundNames[i]] = 1;
        }
      }
      break;
    }
    case Token.Multiply: {
      nextToken(state, context);
      if (consumeOpt(state, context, Token.AsKeyword)) {
        declareUnboundVariable(state, context, state.tokenValue);
        namedBinding = parseIdentifierName(state, context);
      }
      fromClause = parseFromClause(state, context);
      expectSemicolon(state, context);
      break;
    }
    default:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedExportDecl, DiagnosticKind.Error);
  }
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ExportDeclaration(declaration, namedExports, namedBinding, fromClause, exportedNames, boundNames),
    SyntaxKind.ExportDeclaration
  );
}

// NamedExports :
//   `{` `}`
//   `{` ExportsList `}`
//   `{` ExportsList `,` `}`
export function parseNamedExports(
  state: ParserState,
  context: Context,
  exportedNames: string[],
  exportedBindings: string[]
): ExportSpecifier[] {
  consume(state, context, Token.LeftBrace);
  const exportsList = [];
  const check = context & Context.ErrorRecovery ? Constants.ModuleElementsR : Constants.ModuleElementsN;
  while (state.token & check) {
    exportsList.push(parseExportSpecifier(state, context, exportedNames, exportedBindings));
    if (state.token === Token.RightBrace) break;
    consume(state, context, Token.Comma);
  }
  consume(state, context | Context.AllowRegExp, Token.RightBrace);
  return exportsList;
}

// ExportSpecifier :
//   IdentifierName
//   IdentifierName `as` IdentifierName
export function parseExportSpecifier(
  state: ParserState,
  context: Context,
  exportedNames: string[],
  exportedBindings: string[]
): ExportSpecifier {
  const start = state.startIndex;
  const tokenValue = state.tokenValue;
  let value = tokenValue;
  const name = parseIdentifierName(state, context);
  let exportedName = null;
  if (consumeOpt(state, context, Token.AsKeyword)) {
    value = state.tokenValue;
    exportedName = parseIdentifierName(state, context);
  }

  exportedNames.push(value as string);
  exportedBindings.push(tokenValue);

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ExportSpecifier(name, exportedName),
    SyntaxKind.ExportSpecifier
  );
}

// ExportDefault :
//   `export` `default` HoistableDeclaration [EXTENDED]
//   `export` `default` ClassDeclaration  [EXTENDED]
//   `export` `default` AssignmentExpression `;`  [EXTENDED]
export function parseExportDefault(state: ParserState, context: Context, start: number, scope: any): ExportDefault {
  let declaration;
  switch (state.token) {
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(state, context | Context.Default, scope, false, false);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(state, context | Context.Default, scope, false, false);
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(state, context | Context.Default, scope, false);
      break;
    default:
      // export default {};
      // export default [];
      // export default (1 + 2);
      declaration = parseExpression(state, context);
      expectSemicolon(state, context);
  }
  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
  declareUnboundVariable(state, context, 'default');

  return finishNode(state, context, start, DictionaryMap.ExportDefault(declaration), SyntaxKind.ExportDefault);
}
