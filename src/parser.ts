import { ImportCall } from './ast/expressions/import-call';
import { TemplateLiteral } from './ast/expressions/template-literal';
import { TemplateElement } from './ast/expressions/template-element';
import { TemplateExpression } from './ast/expressions/template-expression';
import { AwaitExpression } from './ast/expressions/await-expr';
import { ImportExport } from './ast/module/index';
import { AssignmentOperator, LogicalAssignmentOperator } from './ast/expressions/assignment-expr';
import { ExportDeclaration } from './ast/module/export-declaration';
import { ExportSpecifier } from './ast/module/export-specifier';
import { ExportDefault } from './ast/module/export-default';
import { ImportSpecifier } from 'ast/module/import-specifier';
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
import { FunctionRestParameter } from './ast/expressions/function-rest-parameter';
import { AssignmentElement } from './ast/expressions/assignment-element';
import { Expression, Parameter, BindingPattern, LeftHandSideExpression } from './ast/expressions/index';
import { parseBlockElements, parseVarLexElements, parseListElements } from './incremental/incremental';
import { createIdentifier } from './incremental/common';
import { MemberExpression } from './ast/expressions/member-expr';
import { Elison } from './ast/expressions/elison';
import { IdentifierReference, createIdentifierReference } from './ast/expressions/identifierreference';
import { OptionalExpression } from './ast/expressions/optional-expr';
import { AssignmentRestElement } from './ast/expressions/assignment-rest-element';
import { ObjectBindingPattern } from './ast/expressions/object-binding-pattern';
import { PropertyName } from './ast/expressions/property-name';
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
import { ObjectLiteral, Properties } from './ast/expressions/object-literal';
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
import { AssignmentExpression } from './ast/expressions/assignment-expr';
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
import { addDiagnostic, addEarlyDiagnostic, DiagnosticSource, DiagnosticKind } from './diagnostic';
import { DiagnosticCode } from './diagnostic/diagnostic-code';
import { Token, KeywordDescTable } from './ast/token';
import { Constants } from './constants';
import { SyntaxKind } from './ast/syntax-node';
import { NodeCursor } from './incremental/node-cursor';
import { nextToken } from './lexer/scan';
import { scanTemplateTail } from './lexer/template';
import { DictionaryMap } from './dictionary/dictionary-map';
import {
  Context,
  Flags,
  BindingType,
  ParserState,
  consume,
  consumeOpt,
  consumeSemicolon,
  optionalBit,
  PropertyKind,
  ArrowKind,
  finishNode,
  reinterpretToPattern,
  reinterpretToAssignment
} from './common';

/**
 * Create a new parser instance.
 */
export function create(source: string, nodeCursor?: NodeCursor): ParserState {
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
    tokenValue: undefined,
    tokenRaw: '',
    tokenRegExp: undefined,
    diagnostics: [],
    nodeCursor,
    lastChar: 0
  };
}

// StatementList :
//   StatementListItem
//   StatementList StatementListItem
export function parseStatementList(state: ParserState, context: Context, cb: any): Statement[] {
  const statementList = [];
  while (state.token !== Token.EOF) {
    if (state.token & Constants.IsSourceElement) {
      statementList.push(parseBlockElements(state, context, cb));
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
export function parseStatementListItem(state: ParserState, context: Context): Statement {
  switch (state.token) {
    case Token.FunctionKeyword:
    case Token.AsyncKeyword:
      return parseFunctionDeclaration(state, context);
    case Token.ClassKeyword:
      return parseClassDeclaration(state, context);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(state, context, BindingType.Const);
    case Token.LetKeyword:
      return parseLexicalDeclaration(state, context, BindingType.Let);
    default:
      return parseStatement(state, context);
  }
}

// Statement :
//   ...
export function parseStatement(state: ParserState, context: Context): Statement {
  switch (state.token) {
    case Token.ForKeyword:
      return parseForStatement(state, context);
    case Token.VarKeyword:
      return parseVariableStatement(state, context);
    case Token.LeftBrace:
      return parseBlockStatement(state, context);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.BreakKeyword:
      return parseBreakStatement(state, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(state, context);
    case Token.IfKeyword:
      return parseIfStatement(state, context);
    case Token.WhileKeyword:
      return parseWhileStatement(state, context);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(state, context);
    case Token.WithKeyword:
      return parseWithStatement(state, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.TryKeyword:
    // Miscellaneous error cases arguably better caught here than elsewhere.
    case Token.CatchKeyword:
    case Token.FinallyKeyword:
      return parseTryStatement(state, context);
    case Token.AsyncKeyword:
      return parseAsyncAsIdentifierReference(state, context);
    case Token.FunctionKeyword:
      // FunctionDeclaration are only allowed as a StatementListItem, not in
      // an arbitrary Statement position.
      addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedForDecl);
      return parseFunctionDeclaration(state, context);
    // In 'recovery mode' we allow this and return an function declaration.
    case Token.ClassKeyword:
      // See the comment above. Also ClassDeclaration are only allowed as a StatementListItem, not in
      // an arbitrary Statement position.
      addEarlyDiagnostic(state, context, DiagnosticCode.ExpectedForDecl);
      // In 'recovery mode' we allow this and return an class declaration.
      return parseClassDeclaration(state, context);
    default:
      return parseExpressionOrLabelledStatement(state, context);
  }
}

// SwitchStatement :
//   `switch` `(` Expression `)` CaseBlock
export function parseSwitchStatement(state: ParserState, context: Context): SwitchStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context, Token.RightParen);
  consume(state, context, Token.LeftBrace);
  const clauses = parseCaseBlock(state, context);
  consume(state, context, Token.RightBrace);
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
export function parseCaseBlock(state: ParserState, context: Context): CaseBlock[] {
  const clauses = [];
  while (state.token & Token.IsCaseOrDefault) {
    clauses.push(parseBlockElements(state, context, parseCaseOrDefaultClause));
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
export function parseCaseOrDefaultClause(state: ParserState, context: Context): CaseBlock {
  const statements = [];
  const start = state.startIndex;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.CaseKeyword)) {
    const expression = parseExpressions(state, context);
    consume(state, context | Context.AllowRegExp, Token.Colon);
    // We allow almost everything inside the 'while' loop in 'normal mode' to trigger a nice
    // error message. We do not allow 'Token.DefaultKeyword', 'Token.CaseKeyword', 'Token.RightBrace'.
    // In 'recovery mode' we only allow 'Token.IsStatementStart' and 'Token.IsExpressionStart'.
    const check = context & Context.ErrorRecovery ? Constants.IsClauseRecovery : Constants.IsClauseNormal;
    while (state.token & check) {
      statements.push(parseStatementListItem(state, context | Context.InSwitch));
    }
    return finishNode(state, context, start, DictionaryMap.CaseClause(expression, statements), SyntaxKind.CaseClause);
  }

  consume(state, context, Token.DefaultKeyword);
  consume(state, context | Context.AllowRegExp, Token.Colon);
  const check = context & Context.ErrorRecovery ? Constants.IsClauseRecovery : Constants.IsClauseNormal;
  while (state.token & check) {
    statements.push(parseStatementListItem(state, context | Context.InSwitch));
  }
  return finishNode(state, context, start, DictionaryMap.DefaultClause(statements), SyntaxKind.DefaultClause);
}

// WithStatement :
//   `with` `(` Expression `)` Statement
export function parseWithStatement(state: ParserState, context: Context): WithStatement {
  if (context & Context.Strict) addEarlyDiagnostic(state, context, DiagnosticCode.StrictWith);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context, Token.RightParen);
  const statement = parseStatement(state, context | Context.InIteration);
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
  const expression = parseExpression(state, context);
  consumeSemicolon(state, context);
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
export function parseTryStatement(state: ParserState, context: Context): TryStatement {
  const start = state.startIndex;
  // We can't 'optimize' with 'nextToken()' here because of some weird edge cases
  // like 'throw {x} catch', 'throw {x} finally' and 'throw {x} catch finally'.
  // For this cases we need to reconstruct a malformed 'try statement'.
  // Both 'catch' and 'finally' tokens will be consumed and lead to an invalid
  // 'catch' or 'finally' block that may end in an infinite loop.
  // This also gives us an nice error message in 'normal mode'.
  consume(state, context | Context.AllowRegExp, Token.TryKeyword);
  // Allowing regular expressions here results in some weird cases like 'try/catch/finally/{'.
  // In this particular case the 'try' token is already consumed and the 'block' will not be
  // parsed unless we have an '{'. So in this case we will end up constructing a 'Try statement'
  // with no catch clause. The Regular Expression will be parsed out as an 'BinaryExpression'
  // where '/' is the operator and the 'right' is 'ObjectLiteral'.
  const block = parseBlockStatement(state, context);
  const catchClause = state.token === Token.CatchKeyword ? parseCatchClause(state, context) : null;
  const finalizer = consumeOpt(state, context | Context.AllowRegExp, Token.FinallyKeyword)
    ? parseBlockStatement(state, context)
    : null;

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
export function parseCatchClause(state: ParserState, context: Context): CatchClause {
  let binding = null;
  const start = state.startIndex;
  consume(state, context | Context.AllowRegExp, Token.CatchKeyword);
  if (consumeOpt(state, context, Token.LeftParen)) {
    binding = parseBindingPatternOrIdentifier(state, context | Context.AllowRegExp);
    consume(state, context | Context.AllowRegExp, Token.RightParen);
  }

  const block = parseBlockStatement(state, context);

  return finishNode(state, context, start, DictionaryMap.CatchClause(binding, block), SyntaxKind.CatchClause);
}

// IfStatement :
//  `if` `(` Expression `)` Statement `else` Statement
//  `if` `(` Expression `)` Statement
export function parseIfStatement(state: ParserState, context: Context): IfStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const consequent = parseAnnexBExceptions(state, context, DiagnosticCode.AnnexBB34);
  const alternate = consumeOpt(state, context, Token.ElseKeyword)
    ? parseAnnexBExceptions(state, context, DiagnosticCode.AnnexBB34)
    : null;
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.IfStatement(expression, consequent, alternate),
    SyntaxKind.IfStatement
  );
}

// WhileStatement :
//   `while` `(` Expression `)` Statement
export function parseWhileStatement(state: ParserState, context: Context): WhileStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(state, context | Context.InIteration);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.WhileStatement(expression, statement),
    SyntaxKind.WhileStatement
  );
}

// `do` Statement `while` `(` Expression `)` `;`
export function parseDoWhileStatement(state: ParserState, context: Context): DoWhileStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const statement = parseStatement(state, context | Context.InIteration);
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
export function parseBlockStatement(state: ParserState, context: Context): BlockStatement {
  const start = state.startIndex;
  const statements = [];
  if (consume(state, context | Context.AllowRegExp, Token.LeftBrace)) {
    while (state.token & (Token.IsStatementStart | Token.IsExpressionStart)) {
      statements.push(parseBlockElements(state, context, parseStatementListItem));
    }
    consume(state, context | Context.AllowRegExp, Token.RightBrace);
  }

  return finishNode(state, context, start, DictionaryMap.BlockStatement(statements), SyntaxKind.BlockStatement);
}

// DebuggerStatement : `debugger` `;
export function parseDebuggerStatement(state: ParserState, context: Context): DebuggerStatement {
  const start = state.startIndex;
  nextToken(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.DebuggerStatement(), SyntaxKind.DebuggerStatement);
}

// BreakStatement :
//   `break` `;`
//   `break` [no LineTerminator here] LabelIdentifier `;`
export function parseBreakStatement(state: ParserState, context: Context): BreakStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label = null;
  if (state.token & Token.IsIdentifier) {
    label = parseIdentifierReference(state, context);
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    addEarlyDiagnostic(state, context, DiagnosticCode.InvalidBreak);
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.BreakStatement(label), SyntaxKind.BreakStatement);
}

// ContinueStatement :
//   `continue` `;`
//   `continue` [no LineTerminator here] LabelIdentifier `;
export function parseContinueStatement(state: ParserState, context: Context): ContinueStatement {
  if ((context & Context.InIteration) === 0) addEarlyDiagnostic(state, context, DiagnosticCode.IllegalContinue);
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label = null;
  if (state.token & Token.IsIdentifier) label = parseIdentifierReference(state, context);
  consumeSemicolon(state, context);
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
  const expression =
    state.lineTerminatorBeforeNextToken || (state.token & Token.IsAutomaticSemicolon) === Token.IsAutomaticSemicolon
      ? null
      : parseExpressions(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ReturnStatement(expression), SyntaxKind.ReturnStatement);
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForLexicalBinding(state: ParserState, context: Context, type: BindingType): LexicalBinding {
  const start = state.startIndex;
  const token = state.token;
  let initializer = null;
  const binding = parseBindingPatternOrIdentifier(state, context);
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    initializer = parseExpression(state, context);
    if (state.token & Token.IsInOrOf && token & Token.IsPatternStart) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.MissingDestructInit, DiagnosticKind.Error);
    }
  } else if (
    (token & Token.IsPatternStart || type === BindingType.Const) &&
    (state.token & Token.IsInOrOf) !== Token.IsInOrOf
  ) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.MissingDestructInit, DiagnosticKind.Error);
  }
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LexicalBinding(binding, initializer),
    SyntaxKind.LexicalBinding
  );
}

// VariableDeclaration :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForVariableDeclaration(
  state: ParserState,
  context: Context,
  _type: BindingType
): VariableDeclaration {
  const start = state.startIndex;
  const token = state.token;
  const binding = parseBindingPatternOrIdentifier(state, context);
  let initializer = null;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    initializer = parseExpression(state, context);
  } else if (token & Token.IsPatternStart && (state.token & Token.IsInOrOf) !== Token.IsInOrOf) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.MissingDestructInit, DiagnosticKind.Error);
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
  context: Context
): LabelledStatement | ExpressionStatement {
  const { startIndex, token, tokenValue } = state;
  let expr = parsePrimaryExpression(state, context);
  if (
    token & (context & Context.ErrorRecovery ? Constants.IsLabelRecovery : Constants.IsLabelNormal) &&
    state.token === Token.Colon
  ) {
    return parseLabelledStatement(state, context, token, tokenValue, startIndex);
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
  _token: Token,
  value: string,
  start: number
): ExpressionStatement {
  nextToken(state, context | Context.AllowRegExp);
  const label = finishNode(state, context, start, DictionaryMap.LabelIdentifier(value), SyntaxKind.Identifier);
  const labelledItem = parseAnnexBExceptions(state, context, DiagnosticCode.AnnexBB32);

  return parseExpressionStatement(
    state,
    context,
    finishNode(
      state,
      context,
      start,
      DictionaryMap.LabelledStatement(label, labelledItem),
      SyntaxKind.LabelledStatement
    ),
    start
  );
}

// 'B Additional ECMAScript Features for Web Browsers'
//
//   - B.3.2 Labelled Function Declarations
//   - B.3.4 FunctionDeclarations in IfStatement Statement Clauses
export function parseAnnexBExceptions(state: ParserState, context: Context, code: DiagnosticCode): Statement {
  if (state.token === Token.FunctionKeyword) {
    if (context & (Context.OptionsDisableWebCompat | Context.Strict)) {
      // In 'error recovery mode' we continue to parse this as normal, but we give a diagnostic informing
      // that we bypassed this rule so we can stay on track.
      if (context & Context.ErrorRecovery) {
        addDiagnostic(state, context, DiagnosticSource.Parser, code, DiagnosticKind.AnnexB);
        return parseFunctionDeclaration(state, context);
      }
      // Parse out an statement. This will throw in 'normal mode'.
      return parseStatement(state, context);
    }
    // Nothing to bypass and we are not in strict mode and AnnexB isn't disabled
    return parseFunctionDeclaration(state, context);
  }
  return parseStatement(state, context);
}

// ExpressionStatement :
//   [lookahead != `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` ] Expression `;`
export function parseExpressionStatement(
  state: ParserState,
  context: Context,
  expression: Expression,
  start: number
): ExpressionStatement {
  consumeSemicolon(state, context);
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
  const left = parseLeftHandSideExpression(state, context);
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
