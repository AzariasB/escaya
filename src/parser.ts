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
import { Expression, Parameter, BindingPattern, LeftHandSideExpression } from './ast/expressions/index';
import { parseBlockElements, parseBindingElements, parseListElements } from './incremental/incremental';
import { createIdentifier, createBindingIdentifier } from './incremental/common';
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
import { addDiagnostic, addEarlyDiagnostic, DiagnosticSource, DiagnosticKind } from './diagnostic';
import { DiagnosticCode } from './diagnostic/diagnostic-code';
import { Token, KeywordDescTable } from './ast/token';
import { Constants } from './constants';
import { SyntaxKind } from './ast/syntax-node';
import { nextToken } from './lexer/scan';
import { scanTemplateTail } from './lexer/template';
import { DictionaryMap } from './dictionary/dictionary-map';
import {
  Context,
  Flags,
  BindingType,
  ParserState,
  Destructible,
  consume,
  consumeOpt,
  consumeSemicolon,
  optionalBit,
  PropertyKind,
  ArrowKind,
  finishNode,
  validateFunctionName,
  validateIdentifierReference,
  reinterpretToPattern,
  reinterpretToAssignment,
  DestuctionKind
} from './common';

/**
 * Interface for statements
 */
export interface StatementCallback {
  (parser: ParserState, context: Context): Statement;
}

/**
 * Interface for variables and lexicals
 */
export interface PatternCallback {
  (parser: ParserState, context: Context, type: BindingType): LexicalBinding | VariableDeclaration;
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
    diagnostics: [],
    nodeCursor,
    lastChar: 0
  };
}

// StatementList :
//   StatementListItem
//   StatementList StatementListItem
export function parseStatementList(state: ParserState, context: Context, cb: StatementCallback): Statement[] {
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
      return parseImportDeclaration(state, context, start);
    case Token.ExportKeyword:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExportInScript, DiagnosticKind.Error);
      return parseExportDeclaration(state, context);
    // falls through
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
      addEarlyDiagnostic(
        state,
        context,
        context & Context.Strict
          ? DiagnosticCode.StrictFunction
          : context & Context.OptionsDisableWebCompat /* AnnexB */
          ? DiagnosticCode.WebCompatFunction
          : DiagnosticCode.SloppyFunction
      );
      return parseFunctionDeclaration(state, context);
    // In 'recovery mode' we allow this and return an function declaration.
    case Token.ClassKeyword:
      // See the comment above. Same rules apply.
      addEarlyDiagnostic(state, context, DiagnosticCode.ClassForbiddenAsStatement);
      return parseClassDeclaration(state, context);
    default:
      return parseExpressionOrLabelledStatement(state, context);
  }
}

// SwitchStatement :
//   `switch` `(` Expression `)` CaseBlock
export function parseSwitchStatement(state: ParserState, context: Context): SwitchStatement {
  const start = state.startIndex;
  consume(state, context, Token.SwitchKeyword);
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
  // 'with(true) let a' is an edge case here. For this case we parse out
  // 'let' as an statement / body of the 'With statement', and after we parse
  // out 'a' separately as an 'IdentifierReference'.
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
    const type = state.token & Token.IsPatternStart ? BindingType.CatchPattern : BindingType.CatchIdentifier;
    binding = parseBindingPatternOrIdentifier(state, context | Context.AllowRegExp, type);
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
    while (state.token & Constants.IsSourceElement) {
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
  if (state.token & (Token.IsFutureReserved | Token.IsIdentifier)) {
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
  if (state.token & (Token.IsFutureReserved | Token.IsIdentifier)) label = parseIdentifierReference(state, context);
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
  context: Context
): ForStatement | ForAwaitStatement | ForOfStatement | ForInStatement {
  const start = state.startIndex;
  consume(state, context, Token.ForKeyword);
  let isAwait = false;
  if (context & Context.Await && state.token === Token.AwaitKeyword) {
    nextToken(state, context);
    isAwait = true;
  }

  consume(state, context | Context.AllowRegExp, Token.LeftParen);

  let initializer = null;
  let destructible = Destructible.None;

  if (state.token !== Token.Semicolon) {
    if (state.token & Token.IsVarLexical) {
      const innerStart = state.startIndex;

      if (state.token === Token.LetKeyword) {
        initializer = parseIdentifierReference(state, context);
        if (state.token & (Token.IsIdentifier | Token.IsFutureReserved | Token.IsKeyword | Token.IsPatternStart)) {
          if (state.token === Token.InKeyword) {
            if (context & Context.Strict) addEarlyDiagnostic(state, context, DiagnosticCode.LetInStrict);
          } else {
            initializer = parseForDeclaration(
              state,
              context | Context.DisallowIn,
              /* isConst */ false,
              BindingType.Let,
              parseForLexicalBinding,
              innerStart
            );
            state.assignable = true;
          }
        } else {
          // In sloppy mode, `let` must now be a regular var name.
          if (context & Context.Strict) {
            addEarlyDiagnostic(state, context, DiagnosticCode.LetInStrict);
          }

          // `for of` only allows LeftHandSideExpressions which do not start with `let`, and no other production matches
          state.assignable = true;

          initializer = parseMemberExpression(state, context, initializer, true, start);

          if (state.token === Token.OfKeyword) {
            addEarlyDiagnostic(state, context, DiagnosticCode.LetInStrict);
          }
        }
      } else if (consumeOpt(state, context, Token.ConstKeyword)) {
        initializer = parseForDeclaration(
          state,
          context | Context.DisallowIn,
          /* isConst */ true,
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
            parseStatement(state, context | Context.InIteration),
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
          DictionaryMap.ForInStatement(initializer, expression, parseStatement(state, context | Context.InIteration)),
          SyntaxKind.ForInStatement
        );
      }

      let condition = null;
      let incrementor = null;

      initializer = parseExpressionOrHigher(state, context, initializer, state.startIndex);

      consume(state, context | Context.AllowRegExp, Token.Semicolon);

      if (state.token !== Token.Semicolon) condition = parseExpression(state, context);

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
          parseStatement(state, context | Context.InIteration)
        ),
        SyntaxKind.ForStatement
      );
    }
    if (state.token & Token.IsPatternStart) {
      // Because we are parsing out initializer and transform to assignment pattern in
      // 'ObjectLiteral' and 'ArrayLiteral', we must pass 'DestuctionKind.FOR'. This because
      // the left side of a `for-of` and `for-in` can not be an assignment, even if it is a BindingPattern
      // 'Destructible.NotDestructible' will be returned because we don't know *yet* if this is an
      // regular 'for-loop' or an 'for in / of loop'.
      initializer =
        state.token === Token.LeftBrace
          ? parseObjectLiteral(state, context, DestuctionKind.FOR, BindingType.Literal)
          : parseArrayLiteral(state, context, DestuctionKind.FOR, BindingType.Literal);

      if (state.token & Token.IsAssignOp && state.token !== Token.Assign) {
        addEarlyDiagnostic(state, context, DiagnosticCode.CompundArrLit); // InvalidCompoundAssign
      }

      destructible = state.destructible;

      state.assignable = (destructible & Destructible.NotDestructible) !== Destructible.NotDestructible;

      initializer = parseMemberExpression(state, context, initializer, true, state.index);

      destructible = state.destructible;
    } else {
      initializer = parseLeftHandSideExpression(state, context | Context.DisallowIn);
    }
  }

  if (
    isAwait
      ? consume(state, context | Context.AllowRegExp, Token.OfKeyword)
      : consumeOpt(state, context | Context.AllowRegExp, Token.OfKeyword)
  ) {
    if (!state.assignable) addEarlyDiagnostic(state, context, DiagnosticCode.LHSAForLoop);
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
        parseStatement(state, context | Context.InIteration),
        isAwait
      ),
      SyntaxKind.ForOfStatement
    );
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.InKeyword)) {
    if (!state.assignable) addEarlyDiagnostic(state, context, DiagnosticCode.LHSAForLoop);
    reinterpretToAssignment(initializer);
    const expression = parseExpressions(state, context);
    consume(state, context | Context.AllowRegExp, Token.RightParen);
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.ForInStatement(initializer, expression, parseStatement(state, context | Context.InIteration)),
      SyntaxKind.ForInStatement
    );
  }

  let condition = null;
  let incrementor = null;

  if (state.destructible & Destructible.MustDestruct) addEarlyDiagnostic(state, context, DiagnosticCode.ObjCoverInit);

  initializer = parseExpressionOrHigher(state, context, initializer as Expression, state.startIndex);

  consume(state, context | Context.AllowRegExp, Token.Semicolon);

  if (state.token !== Token.Semicolon) condition = parseExpression(state, context);

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
      parseStatement(state, context | Context.InIteration)
    ),
    SyntaxKind.ForStatement
  );
}

// ForDeclaration : LetOrConst ForBinding  [MODIFIFED]
export function parseForDeclaration(
  state: ParserState,
  context: Context,
  isConst: boolean,
  type: BindingType,
  cb: PatternCallback,
  start: number
): ForDeclaration {
  const declarations = parseBindingList(state, context, type, cb);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ForDeclaration(isConst, declarations),
    SyntaxKind.ForDeclaration
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
  type: BindingType,
  cb: PatternCallback
): (LexicalBinding | VariableDeclaration)[] {
  const declarationList = [];

  const check =
    context & Context.ErrorRecovery ? Constants.IsPatternOrIdentifierRecovery : Constants.IsPatternOrIdentifierNormal;
  while (state.token & check) {
    declarationList.push(parseBindingElements(state, context, type, cb));
    if (consumeOpt(state, context, Token.Comma)) continue;
    if (state.token & (Token.IsInOrOf | Token.IsAutomaticSemicolon) || state.lineTerminatorBeforeNextToken) break;

    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedForDecl, DiagnosticKind.Error);
  }
  return declarationList;
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseForLexicalBinding(state: ParserState, context: Context, type: BindingType): LexicalBinding {
  const start = state.startIndex;
  const token = state.token;
  let initializer = null;
  const binding = parseBindingPatternOrIdentifier(state, context, type);
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
  type: BindingType
): VariableDeclaration {
  const start = state.startIndex;
  const token = state.token;
  const binding = parseBindingPatternOrIdentifier(state, context, type);
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
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LabelledStatement(label, labelledItem),
    SyntaxKind.LabelledStatement
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

// IdentifierReference :
//   Identifier
//   [~Yield] `yield`
//   [~Await] `await`
export function parseIdentifierReference(state: ParserState, context: Context): IdentifierReference {
  const value = validateIdentifierReference(state, context);
  const start = state.startIndex;
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
  if (context & Context.ErrorRecovery && (state.token & Constants.IsIdentifierOrKeyword) === 0) {
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
export function parseBindingIdentifier(state: ParserState, context: Context, type: BindingType): BindingIdentifier {
  let value = state.tokenValue;
  if (context & (Context.Yield | Context.Strict) && state.token === Token.YieldKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedYieldAsBIdent);
  } else if ((context & (Context.Await | Context.Module)) > 0 && state.token === Token.AwaitKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.UnexpectedAwaitAsBIdent);
  } else if ((state.token & Constants.IsIdentifierOrKeyword) === 0) {
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
  const start = state.startIndex;
  nextToken(state, context);
  state.assignable = true;
  return finishNode(state, context, start, DictionaryMap.BindingIdentifier(value), SyntaxKind.BindingIdentifier);
}

// VariableStatement : `var` VariableDeclarationList `;`
export function parseVariableStatement(state: ParserState, context: Context): VariableStatement {
  const start = state.startIndex;
  // We allow regular expressions here because in recovery mode this case 'var /a/' has to be
  // parsed out as 'VariableStatement' and an unterminated regular expression
  // In 'normal mode' mode this will throw an error.
  consume(state, context | Context.AllowRegExp, Token.VarKeyword);
  const declarations = parseBindingOrDeclarationList(
    state,
    context | Context.AllowRegExp,
    BindingType.Var,
    parseVariableDeclaration
  );
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.VariableStatement(declarations), SyntaxKind.VariableStatement);
}

// VariableDeclaration :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseVariableDeclaration(state: ParserState, context: Context, type: BindingType): VariableDeclaration {
  const start = state.startIndex;
  const token = state.token;
  const binding = parseBindingPatternOrIdentifier(state, context, type);
  let initializer = null;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    initializer = parseExpression(state, context);
  } else if (token & Token.IsPatternStart) {
    addEarlyDiagnostic(state, context, DiagnosticCode.MissingDestructInit);
  }
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.VariableDeclaration(binding, initializer),
    SyntaxKind.VariableDeclaration
  );
}

// LexicalDeclaration : LetOrConst BindingList `;`
export function parseLexicalDeclaration(
  state: ParserState,
  context: Context,
  type: BindingType
): LexicalDeclaration | Statement {
  const start = state.startIndex;
  nextToken(state, context);
  if (
    type & BindingType.Let &&
    (state.token & (Token.IsIdentifier | Token.IsPatternStart | Token.IsKeyword | Token.IsFutureReserved)) === 0
  ) {
    return parseLetAsIdentifierReference(state, context, start);
  }
  const declarations = parseBindingOrDeclarationList(state, context, type, parseLexicalBinding);
  consumeSemicolon(state, context);
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.LexicalDeclaration((type & BindingType.Const) === BindingType.Const, declarations),
    SyntaxKind.LexicalDeclaration
  );
}

export function parseLetAsIdentifierReference(state: ParserState, context: Context, start: number): Statement {
  let expr: Expression;
  if (state.token === Token.Arrow) {
    expr = parseArrowFunction(
      state,
      context,
      [finishNode(state, context, start, DictionaryMap.BindingIdentifier('let'), SyntaxKind.BindingIdentifier)],
      ArrowKind.NORMAL,
      start
    );
    return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
  }
  state.assignable = true;
  expr = finishNode(state, context, start, DictionaryMap.IdentifierReference('let'), SyntaxKind.Identifier);
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, Token.LetKeyword, 'let', start);
  }

  return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
}

export function parseAsyncAsIdentifierReference(state: ParserState, context: Context): Statement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (state.token === Token.FunctionKeyword) {
    addEarlyDiagnostic(state, context, DiagnosticCode.AsyncFunctionInSingleStatementContext);
    return parseFunctionDeclaration(state, context | Context.Await);
  }
  let expr: Expression;
  if (state.token === Token.Arrow) {
    expr = parseArrowFunction(
      state,
      context,
      [finishNode(state, context, start, DictionaryMap.BindingIdentifier('async'), SyntaxKind.BindingIdentifier)],
      ArrowKind.NORMAL,
      start
    );
    return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
  }
  state.assignable = true;
  expr = finishNode(state, context, start, DictionaryMap.IdentifierReference('async'), SyntaxKind.Identifier);
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, Token.LetKeyword, 'async', start);
  }

  return parseExpressionStatement(state, context, parseExpressionOrHigher(state, context, expr, start), start);
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseLexicalBinding(state: ParserState, context: Context, type: BindingType): LexicalBinding {
  const start = state.startIndex;
  const token = state.token;
  let initializer = null;
  const binding = parseBindingPatternOrIdentifier(state, context, type);
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    initializer = parseExpression(state, context);
  } else if (token & Token.IsPatternStart || type === BindingType.Const) {
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

// BindingList :
//   LexicalBinding
//   BindingList `,` LexicalBinding
//
// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
//
// VariableDeclarationList :
//   VariableDeclaration
//   VariableDeclarationList `,` VariableDeclaration
export function parseBindingOrDeclarationList(
  state: ParserState,
  context: Context,
  type: BindingType,
  cb: PatternCallback
): (LexicalBinding | VariableDeclaration)[] {
  const declarationList = [];

  const check =
    context & Context.ErrorRecovery ? Constants.IsPatternOrIdentifierRecovery : Constants.IsPatternOrIdentifierNormal;
  while (state.token & check) {
    declarationList.push(parseBindingElements(state, context, type, cb));

    if (consumeOpt(state, context, Token.Comma)) {
      if ((state.token & check) === 0) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.ExpectedVarOrLexDecl,
          DiagnosticKind.Error
        );
      }
      continue;
    }
    // A typical typo is to hit '.' instead of ',' because they are next to each other on the keyboard.
    // If that's the case we just skip it and continue. This ensures we get back on track and don't
    // result in tons of parse errors.
    if (consumeOpt(state, context, Token.Period)) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
      continue;
    }

    if (state.token & Token.IsAutomaticSemicolon || state.lineTerminatorBeforeNextToken) break;

    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedVarOrLexDecl, DiagnosticKind.Error);
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
    if (!state.assignable)
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidLHS, DiagnosticKind.Error);
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

//   AdditiveExpression : AdditiveExpression + MultiplicativeExpression
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
        parseBinaryExpression(state, context, parseLeftHandSideExpression(state, context), prec, state.startIndex)
      ),
      SyntaxKind.BinaryExpression
    );

    state.assignable = false;
  }

  return left;
}

// LeftHandSideExpression :
//  (PrimaryExpression | MemberExpression) ...
export function parseLeftHandSideExpression(state: ParserState, context: Context): Expression {
  const start = state.startIndex;
  let expr: LeftHandSideExpression = parsePrimaryExpression(state, context);

  expr = parseMemberExpression(state, context, expr, true, start);
  return expr;
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
  if (state.token & Constants.IsIdentifierOrKeyword) {
    const { startIndex: start, tokenValue } = state;
    nextToken(state, context);
    return finishNode(state, context, start, DictionaryMap.IdentifierName(tokenValue), SyntaxKind.Identifier);
  }
  // For cases like `(foo.)` where we will hit the ')' instead of discovering a property.
  // To avoid consuming the ')' - which will cause the parse of the paretheses to fail - we
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
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ChainNoTemplate, DiagnosticKind.Error);
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
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ChainNoTemplate, DiagnosticKind.Error);
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
  const check = context & Context.ErrorRecovery ? Constants.IsDelimitedListRecovery : Constants.IsDelimitedListNormal;
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
  const operand = parseLeftHandSideExpression(state, context);
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
  const operand = parseLeftHandSideExpression(state, context);
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
  let delegate = false;
  let expression = null;
  if (!state.lineTerminatorBeforeNextToken) {
    delegate = consumeOpt(state, context | Context.AllowRegExp, Token.Multiply);
    if (state.token & Token.IsExpressionStart || delegate) {
      expression = parseExpression(state, context);
    }
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
export function parsePrimaryExpression(state: ParserState, context: Context): LeftHandSideExpression {
  if (state.token & (Token.IsIdentifier | Token.IsFutureReserved)) {
    if (context & Context.Yield && state.token === Token.YieldKeyword) {
      return parseYieldExpression(state, context);
    }
    if (context & Context.Await && state.token === Token.AwaitKeyword) {
      return parseAwaitExpression(state, context);
    }
    if (state.token === Token.AsyncKeyword) return parseFunctionExpression(state, context);

    const start = state.startIndex;
    const value = validateIdentifierReference(state, context);

    nextToken(state, context | Context.TaggedTemplate);

    if (state.token === Token.Arrow) {
      return parseArrowFunction(
        state,
        context,
        [finishNode(state, context, start, DictionaryMap.BindingIdentifier(value), SyntaxKind.BindingIdentifier)],
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
    case Token.StringLiteral:
      return parseStringLiteral(state, context);
    case Token.NullKeyword:
      return parseNullLiteral(state, context);
    case Token.ThisKeyword:
      return parseThisExpression(state, context);
    case Token.TrueKeyword:
    case Token.FalseKeyword:
      return parseBooleanLiteral(state, context);
    case Token.LeftParen:
      return parseCoverParenthesizedExpressionAndArrowParameterList(
        state,
        (context | Context.DisallowIn) ^ Context.DisallowIn
      );
    case Token.FunctionKeyword:
      return parseFunctionExpression(state, context);
    case Token.ClassKeyword:
      return parseClassExpression(state, context);
    case Token.NewKeyword:
      return parseNewExpression(state, context);
    case Token.ImportKeyword:
      return parseImportMetaOrCall(state, context) as any;
    case Token.LeftBracket:
      const x = parseArrayLiteral(state, context, DestuctionKind.NORMAL, BindingType.Literal);
      if ((state.destructible & Destructible.MustDestruct) === Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ObjCoverInit, DiagnosticKind.Error);
      }
      return x;
    case Token.LeftBrace: {
      const x = parseObjectLiteral(state, context, DestuctionKind.NORMAL, BindingType.Literal);
      if ((state.destructible & Destructible.MustDestruct) === Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ObjCoverInit, DiagnosticKind.Error);
      }
      return x;
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
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (context & Context.NewTarget && state.token === Token.Period) {
    nextToken(state, context);
    if (state.token !== Token.TargetIdentifier) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidNewTarget,
        DiagnosticKind.Early,
        state.tokenValue
      );
    }
    nextToken(state, context);
    return finishNode(state, context, start, DictionaryMap.Target(), SyntaxKind.NewTarget);
  }
  let expression = parsePrimaryExpression(state, context);
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
export function parseStringLiteral(state: ParserState, context: Context): StringLiteral {
  const start = state.startIndex;
  const value = state.tokenValue;
  nextToken(state, context);
  state.assignable = false;
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
  type: BindingType
): ObjectBindingPattern {
  const start = state.startIndex;
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  consume(state, context, Token.LeftBrace);
  const properties = [];

  while (state.token & Constants.ObjectList) {
    if (state.token === Token.Ellipsis) {
      properties.push(parseBindingRestProperty(state, context, type));
      if (state.token !== Token.Comma) break;
      nextToken(state, context);
      addEarlyDiagnostic(
        state,
        context,
        state.token === Token.RightBrace ? DiagnosticCode.RestTrailing : DiagnosticCode.RestNotLast
      );
    }
    properties.push(parseBindingProperty(state, context, type));
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
  const argument = parseBindingIdentifier(state, context, type);
  if (state.token === Token.Assign) addEarlyDiagnostic(state, context, DiagnosticCode.RestInit);
  return finishNode(state, context, start, DictionaryMap.BindingRestProperty(argument), SyntaxKind.BindingRestProperty);
}

// BindingProperty :
//   SingleNameBinding
//   PropertyName : BindingElement
export function parseBindingProperty(
  state: ParserState,
  context: Context,
  type: BindingType
): PropertyName | BindingElement | BindingIdentifier {
  const start = state.startIndex;

  if (state.token & Constants.IsIdentifierOrKeyword) {
    const tokenValue = state.tokenValue;
    nextToken(state, context);
    if (consumeOpt(state, context, Token.Colon)) {
      const key = finishNode(state, context, start, DictionaryMap.IdentifierName(tokenValue), SyntaxKind.Identifier);
      return finishNode(
        state,
        context,
        start,
        DictionaryMap.PropertyName(key, parseBindingElement(state, context, type)),
        SyntaxKind.PropertyName
      );
    }

    const binding = finishNode(
      state,
      context,
      start,
      DictionaryMap.BindingIdentifier(tokenValue),
      SyntaxKind.BindingIdentifier
    );
    if (state.token === Token.Assign) {
      return finishNode(
        state,
        context,
        start,
        DictionaryMap.BindingElement(binding, parseInitializerOpt(state, context)),
        SyntaxKind.BindingElement
      );
    }
    return binding;
  }
  const name = parsePropertyName(state, context);

  consumeOpt(state, context, Token.Colon);

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.PropertyName(name, parseBindingElement(state, context, type)),
    SyntaxKind.PropertyName
  );
}

// Initializer : `=` AssignmentExpression
export function parseInitializerOpt(state: ParserState, context: Context): Expression | null {
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
    return parseExpression(state, context);
  }
  return null;
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
  type: BindingType
): BindingElement | BindingIdentifier {
  const start = state.startIndex;

  let left;
  let right = null;

  if (state.token & Token.IsPatternStart) {
    left = parseBindingPattern(state, context, type);
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) right = parseExpression(state, context);
    return finishNode(state, context, start, DictionaryMap.BindingElement(left, right), SyntaxKind.BindingElement);
  }

  left = parseBindingIdentifier(state, context, type);
  if (!consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) return left;
  right = parseExpression(state, context);
  return finishNode(state, context, start, DictionaryMap.BindingElement(left, right), SyntaxKind.BindingElement);
}

// BindingPattern:
//   ObjectBindingPattern
//   ArrayBindingPattern
export function parseBindingPattern(state: ParserState, context: Context, type: BindingType): BindingPattern {
  if (state.token === Token.LeftBrace) return parseObjectBindingPattern(state, context, type);
  return parseArrayBindingPattern(state, context, type);
}

// BindingPattern:
//   ObjectBindingPattern
//   ArrayBindingPattern
//
// BindingIdentifier
export function parseBindingPatternOrIdentifier(
  state: ParserState,
  context: Context,
  type: BindingType
): BindingPattern | BindingIdentifier {
  return state.token & Token.IsPatternStart
    ? parseBindingPattern(state, context, type)
    : parseBindingIdentifier(state, context, type);
}

// ArrayBindingPattern :
//   `[` `]`
//   `[` Elision `]`
//   `[` BindingElementList `]`
//   `[` BindingElementList `,` `]`
//   `[` BindingElementList `,` Elision `,` BindingRestElement `]`
export function parseArrayBindingPattern(state: ParserState, context: Context, type: BindingType): ArrayBindingPattern {
  const start = state.startIndex;
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  nextToken(state, context | Context.AllowRegExp);
  const list = [];
  const check = context & Context.ErrorRecovery ? Constants.ArrayListRecovery : Constants.ArrayListNormal;
  while (state.token & check) {
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      list.push(finishNode(state, context, start, DictionaryMap.Elison(), SyntaxKind.Elison));
    } else {
      if (state.token === Token.Ellipsis) {
        list.push(parseBindingRestElement(state, context, type));
        if (state.token !== Token.Comma) break;
        nextToken(state, context);
        addEarlyDiagnostic(
          state,
          context,
          state.token === Token.RightBrace ? DiagnosticCode.RestTrailing : DiagnosticCode.RestNotLast
        );
      }
      list.push(parseBindingElement(state, context, type));
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
export function parseBindingRestElement(state: ParserState, context: Context, type: BindingType): BindingRestElement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const binding = parseBindingPatternOrIdentifier(state, context, type);
  if (state.token === Token.Assign) addEarlyDiagnostic(state, context, DiagnosticCode.RestInit);
  return finishNode(state, context, start, DictionaryMap.BindingRestElement(binding), SyntaxKind.BindingRestElement);
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
  isRest: DestuctionKind,
  type: BindingType
): ArrayLiteral | AssignmentElement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  const elements = [];
  let destructible = Destructible.None;
  const check = context & Context.ErrorRecovery ? Constants.ArrayListRecovery : Constants.ArrayListNormal;
  while (state.token & check) {
    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      elements.push(finishNode(state, context, state.startIndex, DictionaryMap.Elison(), SyntaxKind.Elison));
    } else {
      elements.push(parseElementList(state, context, type));
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
  type: BindingType
): SpreadElement | Expression | AssignmentExpression {
  const start = state.startIndex;

  if (state.token === Token.Ellipsis) return parseSpreadElement(state, context, type, start);

  // Simple cases: "[a]", "[a,]", "[a = b]", "[a.[b] ...]",  "[a.b ... ]" and "[a.(b) ...]"'
  if (state.token & Constants.IsIdentifierOrKeyword) {
    let left = parsePrimaryExpression(state, context);

    // Array with only one identifier, should be 'destructible' except for a few valid identifiers / keywords
    // that can't be assigned to. For example `true` and `typeof`.
    if (state.token === Token.RightBracket || state.token === Token.Comma) {
      state.destructible = state.assignable ? Destructible.None : Destructible.NotDestructible;
      return left;
    }

    // Array with only one identifier followed by an assignment, '[a = ', are destructible unless this is a keyword.
    if (state.token === Token.Assign) return parseAssignmentExpression(state, context, left, start);

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
        ? parseArrayLiteral(state, context, DestuctionKind.NORMAL, type)
        : parseObjectLiteral(state, context, DestuctionKind.NORMAL, type);

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

  let left = parseLeftHandSideExpression(state, context);

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
  type: BindingType,
  start: number
): SpreadElement {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightBracket, type, start);
  return finishNode(state, context, start, DictionaryMap.SpreadElement(argument), SyntaxKind.SpreadElement);
}

// PropertyDefinition :   [MODIFIED]
//   ...AssignmentExpression
export function parseSpreadProperty(
  state: ParserState,
  context: Context,
  type: BindingType,
  start: number
): SpreadProperty {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightBrace, type, start);
  return finishNode(state, context, start, DictionaryMap.SpreadProperty(argument), SyntaxKind.SpreadProperty);
}

// AssignmentRestElement :
//   ...DestructuringAssignmentTarget
export function parseAssignmentRestElement(
  state: ParserState,
  context: Context,
  type: BindingType,
  start: number
): AssignmentRestElement {
  const argument = parseSpreadOrPropertyArgument(state, context, Token.RightParen, type, start);
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
  type: BindingType,
  start: number
): Expression {
  nextToken(state, context | Context.AllowRegExp); // skips: '...'
  const innerStart = state.startIndex;
  let destructible = Destructible.None;
  let argument;

  if (state.token & Constants.IsIdentifierOrKeyword) {
    argument = parsePrimaryExpression(state, context);

    const token = state.token;

    argument = parseMemberExpression(state, context, argument, true, innerStart);

    if (state.token !== Token.Comma && state.token !== closingToken) {
      destructible |= Destructible.NotDestructible;
      argument = parseAssignmentExpression(state, context, argument, innerStart);
    }

    if (!state.assignable) {
      destructible |= Destructible.NotDestructible;
    } else if (token === Token.Comma || token === closingToken) {
      // TODO
    } else {
      destructible |= Destructible.Assignable;
    }
  } else if (state.token & Token.IsPatternStart) {
    argument =
      state.token === Token.LeftBracket
        ? parseArrayLiteral(state, context, DestuctionKind.REST, type)
        : parseObjectLiteral(state, context, DestuctionKind.REST, type);

    const token = state.token;

    if (token !== Token.Assign && token !== closingToken && token !== Token.Comma) {
      if (state.destructible & Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
      }
      argument = parseMemberExpression(state, context, argument, true, start);
      destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
      argument = parseAssignmentExpression(state, context, argument, start);
    } else {
      destructible |=
        closingToken === Token.RightBrace && token !== Token.Assign ? Destructible.NotDestructible : state.destructible;
    }
  } else {
    destructible |= Destructible.Assignable;

    argument = parseLeftHandSideExpression(state, context);

    const token = state.token;

    if (token & Token.IsExpressionStart) {
      argument = parseAssignmentExpression(state, context, argument, innerStart);
      // [..."foo"+bar] = x:
      destructible |= Destructible.NotDestructible;
    } else {
      // [...(x), y] = z
      if (token === Token.Comma) {
        destructible |= Destructible.NotDestructible;
      } else if (token !== closingToken) {
        // ({ ...1 ? a : []}), '({ ...0 ? 1 : a => {} })'
        argument = parseAssignmentExpression(state, context, argument, innerStart);
      }

      if (!state.assignable) destructible |= Destructible.NotDestructible;
    }

    state.destructible = destructible;

    return argument;
  }

  state.destructible = state.token !== closingToken ? Destructible.NotDestructible : destructible;

  return argument;
}

// ObjectLiteral :
//   `{` `}`
//   `{` PropertyDefinitionList `}`
//   `{` PropertyDefinitionList `,` `}`
export function parseObjectLiteral(
  state: ParserState,
  context: Context,
  isRest: DestuctionKind,
  type: BindingType
): ObjectLiteral | AssignmentElement {
  const start = state.startIndex;
  consume(state, context | Context.AllowRegExp, Token.LeftBrace);
  const properties = [];
  let destructible = Destructible.None;
  while (state.token & Constants.ObjectListRecovery) {
    properties.push(parsePropertyDefinition(state, context, type));
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

  if (destructible & Destructible.NotDestructible) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
  }

  nextToken(state, context | Context.AllowRegExp);

  reinterpretToAssignment(left);

  const right = parseExpression(state, context);

  state.destructible = (destructible | Destructible.MustDestruct) ^ Destructible.MustDestruct;

  // A rest element cannot have an initializer, so for cases like '[...{a = b} = c] = d;' , we
  // need to set the destructibe to 'NotDestructible'
  if (kind !== DestuctionKind.NORMAL) state.destructible = Destructible.NotDestructible;

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
  type: BindingType
): SpreadProperty | MethodDefinition {
  const start = state.startIndex;
  if (state.token === Token.Ellipsis) {
    return parseSpreadProperty(state, context, type, start);
  }
  let key;
  let kind = optionalBit(state, context | Context.AllowRegExp, Token.Multiply)
    ? PropertyKind.Generator
    : PropertyKind.None;
  const token = state.token;

  if (token & Constants.IsIdentifierOrKeyword) {
    const tokenValue = state.tokenValue;

    nextToken(state, context);

    if (state.token === Token.LeftParen) {
      key = finishNode(state, context, start, createIdentifierName(tokenValue), SyntaxKind.Identifier);
      return parseMethodDefinition(state, context, key, kind);
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
        return parseMethodDefinition(state, context, parsePropertyName(state, context), kind);
      }
      // ({ case foo })
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ':');
      return finishNode(state, context, start, createIdentifierReference(tokenValue), SyntaxKind.Identifier);
    }

    if (consumeOpt(state, context | Context.AllowRegExp, Token.Assign)) {
      key = finishNode(state, context, start, createIdentifierName(tokenValue), SyntaxKind.Identifier);

      const initializer = parseExpression(state, context);
      state.destructible = Destructible.MustDestruct;

      return finishNode(
        state,
        context,
        start,
        DictionaryMap.CoverInitializedName(key, initializer),
        SyntaxKind.CoverInitializedName
      );
    }

    let destructible = Destructible.None;

    if (consumeOpt(state, context | Context.AllowRegExp, Token.Colon)) {
      key = finishNode(state, context, start, createIdentifierName(tokenValue), SyntaxKind.Identifier);
      let value;
      const colonStart = state.startIndex;
      if (state.token & (Token.IsIdentifier | Token.IsKeyword | Token.IsFutureReserved)) {
        if (context & Context.ErrorRecovery && (state.token & Token.IsExpressionStart) === 0) {
          value = parseIdentifierReference(state, context);
          return finishNode(state, context, start, DictionaryMap.PropertyName(key, value), SyntaxKind.PropertyName);
        }

        value = parsePrimaryExpression(state, context);

        const token = state.token;

        value = parseMemberExpression(state, context, value, true, colonStart);

        if (state.token === Token.RightBrace || state.token === Token.Comma) {
          if (token === Token.Assign || token === Token.Comma || token === Token.RightBrace) {
            if (!state.assignable) destructible |= Destructible.NotDestructible;
          } else {
            destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
          }
        } else {
          if ((state.token & Token.IsAssignOp) === 0) destructible |= Destructible.NotDestructible;
          value = parseAssignmentExpression(state, context, value, colonStart);
        }
      } else if (state.token & Token.IsPatternStart) {
        value =
          state.token === Token.LeftBrace
            ? parseObjectLiteral(state, context, DestuctionKind.NORMAL, type)
            : parseArrayLiteral(state, context, DestuctionKind.NORMAL, type);

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
        value = parseLeftHandSideExpression(state, context);

        const isAssignToken = state.token === Token.Assign;

        value = parseAssignmentExpression(state, context, value, start);

        destructible |= state.assignable || isAssignToken ? Destructible.Assignable : Destructible.NotDestructible;
      }

      state.destructible = destructible;
      return finishNode(state, context, start, DictionaryMap.PropertyName(key, value), SyntaxKind.PropertyName);
    }

    state.destructible = destructible;

    return finishNode(state, context, start, createIdentifierReference(tokenValue), SyntaxKind.Identifier);
  }

  key = parsePropertyName(state, context);

  let destructible = Destructible.None;

  if (consumeOpt(state, context | Context.AllowRegExp, Token.Colon)) {
    let value;
    const colonStart = state.startIndex;
    if (state.token & (Token.IsIdentifier | Token.IsKeyword | Token.IsFutureReserved)) {
      value = parsePrimaryExpression(state, context);

      const token = state.token;

      value = parseMemberExpression(state, context, value, true, colonStart);

      if (state.token === Token.RightBrace || state.token === Token.Comma) {
        if (token === Token.Assign || token === Token.Comma || token === Token.RightBrace) {
          if (!state.assignable) destructible |= Destructible.NotDestructible;
        } else {
          destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
        }
      } else if (state.token === Token.Assign) {
        destructible |= state.assignable ? Destructible.None : Destructible.NotDestructible;
        value = parseAssignmentExpression(state, context, value, colonStart);
      } else {
        destructible |= Destructible.NotDestructible;
        value = parseAssignmentExpression(state, context, value, colonStart);
      }
    } else if (state.token & Token.IsPatternStart) {
      value =
        state.token === Token.LeftBrace
          ? parseObjectLiteral(state, context, DestuctionKind.NORMAL, type)
          : parseArrayLiteral(state, context, DestuctionKind.NORMAL, type);

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
      value = parseLeftHandSideExpression(state, context);

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
    return parseStringLiteral(state, context);
  }
  if (state.token === Token.NumericLiteral) {
    return parseNumericLiteral(state, context);
  }
  if (state.token === Token.BigIntLiteral) {
    //return parseBigint NumericLiteral(state, context);
  }
  return parseIdentifierName(state, context);
}

// FormalParameters :
//   [empty]
//   FunctionRestParameter
//   FormalParameterList
//   FormalParameterList,
//   FormalParameterList , FunctionRestParameter
export function parseFormalParameters(state: ParserState, context: Context): Parameter[] {
  const params = [];
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  if (consume(state, context | Context.AllowRegExp, Token.LeftParen)) {
    // We will continue to consume everything that is thrown at us until if we are missing a
    // closing paren - ')' in recovery / incremental mode. That way we will still stay on track
    // when parsing out super edge cases like 'function(...[{[x]},,,,'
    while (consumeOpt(state, context, Token.Comma)) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedParamDecl, DiagnosticKind.Error);
    }
    const check = context & Context.ErrorRecovery ? Constants.IsDelimitedListRecovery : Constants.IsDelimitedListNormal;
    while (state.token & check) {
      if (state.token === Token.Ellipsis) {
        params.push(parseBindingRestElement(state, context, BindingType.None));
        if (state.token !== Token.Comma) break;
        nextToken(state, context);
        addEarlyDiagnostic(
          state,
          context,
          state.token === Token.RightBrace ? DiagnosticCode.RestTrailing : DiagnosticCode.RestNotLastParam
        );
      }
      params.push(parseBindingElements(state, context, BindingType.ArgumentList, parseBindingElement));

      if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
      if (state.token === Token.RightParen) break;
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.Expected, DiagnosticKind.Error, ',');
    }

    consume(state, context, Token.RightParen);
  }

  return params;
}

// UniqueFormalParameters :
//    FormalParameters
export function parseUniqueFormalParameters(state: ParserState, context: Context): Parameter[] {
  return parseFormalParameters(state, context | Context.Parameters);
}

// FunctionBody :
//   FunctionStatementList
export function parseFunctionBody(state: ParserState, context: Context, isStatement: boolean): FunctionBody {
  const start = state.startIndex;
  const directives: string[] = [];
  const statements: Statement[] = [];

  if (consume(state, context | Context.AllowRegExp, Token.LeftBrace)) {
    while (state.token & Constants.IsSourceElement) {
      statements.push(parseBlockElements(state, context, parseStatementListItem));
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
  key: Expression | IdentifierName,
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

  // getter
  if (kind & PropertyKind.Getter) {
    consume(state, context, Token.LeftParen);
    consume(state, context, Token.RightParen);
  } else if (kind & PropertyKind.Setter) {
    consume(state, context, Token.LeftParen);
    propertySetParameterList = [parseBindingElement(state, context, BindingType.ArgumentList)];
    consume(state, context, Token.RightParen);
  } else {
    uniqueFormalParameters = parseUniqueFormalParameters(state, context);
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
      parseFunctionBody(state, context | Context.Return | Context.NewTarget, false)
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
  context: Context
): FunctionExpression | IdentifierReference {
  const start = state.startIndex;
  let isAsync = 0;

  if (optionalBit(state, context, Token.AsyncKeyword)) {
    if (state.token !== Token.FunctionKeyword || state.lineTerminatorBeforeNextToken) {
      return parseAsyncArrowExpression(state, context, start);
    }
    isAsync = 1;
  }

  consume(state, context | Context.AllowRegExp, Token.FunctionKeyword);

  const isGenerator = optionalBit(state, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  let name: BindingIdentifier | null = null;

  if (
    state.token &
    (context & Context.ErrorRecovery ? Constants.IsIdentifierOrKeywordRecovery : Constants.IsIdentifierOrKeywordNormal)
  ) {
    name = validateFunctionName(
      state,
      ((context | 0b00000101111111101010000000000000) ^ 0b00000001111111101010000000000000) | generatorAndAsyncFlags
    );
  } else if (state.token !== Token.LeftParen) {
    name = createBindingIdentifier(state, context, DiagnosticCode.ExpectedBindingIdent, /* shouldConsume */ false);
  }
  context =
    ((context | 0b00000101111111101010000000000000) ^ 0b00000001111111101010000000000000) | generatorAndAsyncFlags;

  const params = parseFormalParameters(state, context | Context.Parameters);

  const contents = parseFunctionBody(state, context | Context.Return, false);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.FunctionExpression(name, isGenerator === 1, isAsync === 1, params, contents),
    SyntaxKind.FunctionExpression
  );
}

export function parseAsyncArrowExpression(state: ParserState, context: Context, start: number): any {
  const hasLineTerminator = state.lineTerminatorBeforeNextToken;
  if (!hasLineTerminator) {
    // `async` [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
    if ((state.token & (Token.IsFutureReserved | Token.IsIdentifier)) !== 0) {
      return parseArrowFunction(
        state,
        context,
        [parseBindingIdentifier(state, context, BindingType.None)],
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
    return parseCoverCallExpressionAndAsyncArrowHead(state, context, expr, start);
  }

  // IdentifierReference [no LineTerminator here] `=>`
  if (state.token === Token.Arrow) {
    return parseArrowFunction(state, context, expr, ArrowKind.NORMAL, start);
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
  context: Context
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
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  let name: BindingIdentifier | null = null;
  if (
    state.token &
    (context & Context.ErrorRecovery ? Constants.IsIdentifierOrKeywordRecovery : Constants.IsIdentifierOrKeywordNormal)
  ) {
    name = validateFunctionName(state, context | ((context & 0b0000000000000000000_1100_00000000) << 11));
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

  const params = parseFormalParameters(state, context | Context.Parameters);

  const contents = parseFunctionBody(state, context | Context.Return, true);

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
  const hasLineTermiantor = state.lineTerminatorBeforeNextToken;
  if (!hasLineTermiantor) {
    if ((state.token & (Token.IsFutureReserved | Token.IsIdentifier)) !== 0) {
      let expr: any = parseArrowAfterIdentifier(
        state,
        context,
        [parseBindingIdentifier(state, context, BindingType.None)],
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
    return parseLabelledStatement(state, context, Token.AsyncKeyword, 'async', start);
  }

  // `async ()`, `async () => ...`
  if (state.token === Token.LeftParen) {
    expr = parseCoverCallExpressionAndAsyncArrowHead(state, context, expr, start);
    // `async => ...`
  } else if (state.token === Token.Arrow) {
    expr = parseArrowAfterIdentifier(state, context, expr, ArrowKind.NORMAL, start);
  }
  state.assignable = true;
  // `async++`, `async`\n${0}`:`, `async?.()`
  expr = parseExpressionOrHigher(state, context, expr, start);

  return parseExpressionStatement(state, context, expr, start);
}

export function parseArrowAfterIdentifier(
  state: ParserState,
  context: Context,
  params: any,
  kind: ArrowKind,
  start: number
): any {
  return parseArrowFunction(state, context, params, kind, start);
}

// `CoverCallExpressionAndAsyncArrowHead : MemberExpressionArguments`
export function parseCoverCallExpressionAndAsyncArrowHead(
  state: ParserState,
  context: Context,
  expression: any,
  start: number
): ArrowFunction | Expression {
  nextToken(state, context | Context.AllowRegExp);

  const params: Expression[] = [];

  if (consumeOpt(state, context, Token.RightParen)) {
    if (state.token === Token.Arrow) return parseArrowFunction(state, context, [], ArrowKind.ASYNC, start);

    return finishNode(
      state,
      context,
      start,
      DictionaryMap.CallExpression(expression, params),
      SyntaxKind.CallExpression
    );
  }

  const check =
    context & Context.ErrorRecovery ? Constants.IsGroupParnethizedRecovery : Constants.IsGroupParnethizedNormal;

  let destructible: Destructible = Destructible.None;

  while (state.token & check) {
    const innerStart = state.startIndex;

    if (state.token & Constants.IsIdentifierOrKeyword) {
      expression = parsePrimaryExpression(state, context);

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
          ? parseArrayLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList)
          : parseObjectLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList);

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
      expression = parseAssignmentRestElement(state, context, BindingType.ArgumentList, innerStart);
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

      return finishNode(
        state,
        context,
        start,
        DictionaryMap.CallExpression(expression, params),
        SyntaxKind.CallExpression
      );
    }
    params.push(expression);

    if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
    if (state.token === Token.RightParen) break;
  }

  consume(state, context, Token.RightParen);

  if (state.token === Token.Arrow) {
    if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.LHSADestruct, DiagnosticKind.Error);
    }
    return parseArrowFunction(state, context, expression, ArrowKind.ASYNC, start);
  }

  if (destructible & Destructible.MustDestruct) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.iBDestruct, DiagnosticKind.Error);
  }

  state.assignable = false;

  return finishNode(state, context, start, DictionaryMap.CallExpression(expression, params), SyntaxKind.CallExpression);
}

// ArrowFunction :
//   ArrowParameters
export function parseArrowFunction(
  state: ParserState,
  context: Context,
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
    DictionaryMap.ArrowFunction(parameters, parseConciseOrFunctionBody(state, context), isAsync === 1),
    SyntaxKind.ArrowFunction
  );
}

// FunctionBody :
//   FunctionStatementList
//
// ConciseBody :
//   [lookahead ≠ {]ExpressionBody
//   { FunctionBody }
export function parseConciseOrFunctionBody(state: ParserState, context: Context): FunctionBody | ConciseBody {
  if (state.token === Token.LeftBrace) {
    const body = parseFunctionBody(state, context | Context.Return | Context.NewTarget, true);

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
  context: Context
): Expression | ArrowFunction | ParenthesizedExpression {
  const start = state.startIndex;

  consume(state, context | Context.AllowRegExp, Token.LeftParen);

  if (consumeOpt(state, context, Token.RightParen)) {
    if (state.token === Token.Arrow) {
      return parseArrowFunction(state, context, [], ArrowKind.NORMAL, start);
    }
    return createIdentifier(state, context, DiagnosticCode.ExpectedArrow);
  }

  let innerStart = state.startIndex;

  if (state.token === Token.Ellipsis) {
    const param = parseBindingRestElement(state, context, BindingType.ArgumentList);
    consume(state, context, Token.RightParen);
    return parseArrowFunction(state, context, [param], ArrowKind.NORMAL, start);
  }

  let expression: any;
  let destructible = Destructible.None;

  if (state.token & Constants.IsIdentifierOrKeyword) {
    expression = parsePrimaryExpression(state, context);

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
        ? parseArrayLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList)
        : parseObjectLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList);

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

  let isDelimitedList = false;

  // 12.16 Comma Operator
  if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
    // In recovery mode where a comma is missing - for example '(a b' - this is no longer considered
    // as a start of a sequence. The parser will break out of the loop and parse 'a' as its own production.
    //
    // This is in line with how we are dealing with invalid 'CommaOperator' cases.
    //
    // However if we already are inside an sequence - cases like '(a b c foo' - we will just pretend that we
    // have seen a comma and continue to parse it as an sequence. This ensures we get back on track
    // and don't result in tons of parse errors.

    const expressions = [expression];

    isDelimitedList = true;

    if (state.token === Token.RightParen) destructible |= Destructible.DisallowTrailing;

    const check =
      context & Context.ErrorRecovery ? Constants.IsGroupParnethizedRecovery : Constants.IsGroupParnethizedNormal;

    while (state.token & check) {
      innerStart = state.startIndex;
      if (state.token & Constants.IsIdentifierOrKeyword) {
        expression = parsePrimaryExpression(state, context);

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
            ? parseArrayLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList)
            : parseObjectLiteral(state, context, DestuctionKind.NORMAL, BindingType.ArgumentList);

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
        expressions.push(parseBindingRestElement(state, context, BindingType.ArgumentList));
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

    expression = finishNode(state, context, start, DictionaryMap.CommaOperator(expressions), SyntaxKind.CommaOperator);
  }

  consume(state, context, Token.RightParen);

  // ArrowParameters :
  //   CoverParenthesizedExpressionAndArrowParameterList
  if (state.token === Token.Arrow) {
    if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.LHSADestruct, DiagnosticKind.Error);
    }
    const param = isDelimitedList ? expression.expressions : [expression];
    return parseArrowFunction(state, context, param, ArrowKind.NORMAL, start);
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
  state.destructible = destructible;

  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ParenthesizedExpression(expression),
    SyntaxKind.ParenthesizedExpression
  );
}

// ClassDeclaration :
//   `class` BindingIdentifier ClassTail
//   [+Default] `class` ClassTail
//
// ClassTail : ClassHeritage? `{` ClassBody? `}`
// ClassHeritage : `extends` LeftHandSideExpression
// ClassBody : ClassElementList
export function parseClassDeclaration(state: ParserState, context: Context): ClassDeclaration {
  const start = state.startIndex;

  consume(state, context | Context.AllowRegExp, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | Context.InConstructor) ^ Context.InConstructor;

  context |= Context.Strict;

  let name: BindingIdentifier | null = null;
  let heritage: Expression | null = null;

  if (
    state.token &
      (context & Context.ErrorRecovery
        ? Constants.IsIdentifierOrKeywordRecovery
        : Constants.IsIdentifierOrKeywordNormal) &&
    state.token !== Token.ExtendsKeyword
  ) {
    name = parseBindingIdentifier(state, context, BindingType.None);
  } else if ((context & Context.Default) !== Context.Default) {
    addEarlyDiagnostic(state, context, DiagnosticCode.MissingClassName);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    heritage = parseLeftHandSideExpression(state, context);
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
      (context & Context.ErrorRecovery
        ? Constants.IsIdentifierOrKeywordRecovery
        : Constants.IsIdentifierOrKeywordNormal) &&
    state.token !== Token.ExtendsKeyword
  ) {
    name = parseBindingIdentifier(state, context, BindingType.None);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    heritage = parseLeftHandSideExpression(state, context);
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
    const check = context & Context.ErrorRecovery ? Constants.ClassListRecovery : Constants.ClassListNormal;
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

  if (state.token & Constants.IsIdentifierOrKeyword) {
    const token = state.token;
    let key: IdentifierName | Expression = parseIdentifierName(state, context);

    if (!isStatic && token === Token.StaticKeyword) {
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
      if (state.token === Token.LeftBracket) {
        consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket);
        key = parseExpression(state, (inheritedContext | Context.DisallowIn) ^ Context.DisallowIn);
        consume(state, context, Token.RightBracket);
        key = finishNode(
          state,
          context,
          start,
          DictionaryMap.ComputedPropertyName(key),
          SyntaxKind.ComputedPropertyName
        );
      } else {
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
  if (state.tokenValue === 'constructor') kind |= PropertyKind.Constructor;
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
    if ((context & Context.SuperCall) === 0) {
      addEarlyDiagnostic(state, context, DiagnosticCode.InvalidSuperCall);
    }
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.SuperCall(parseArguments(state, context)),
      SyntaxKind.SuperCall
    );
  }
  if ((context & Context.SuperProperty) === 0) {
    addEarlyDiagnostic(state, context, DiagnosticCode.InvalidSuperProperty);
  }
  if (state.token === Token.QuestionMarkPeriod) {
    addEarlyDiagnostic(state, context, DiagnosticCode.ChainingNoSuper);
  }
  let expression = null;
  let name = null;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    expression = parseExpression(state, context);
    consume(state, context, Token.RightBracket);
    state.assignable = true;
  } else if (state.token === Token.Period) {
    state.assignable = true;
    nextToken(state, context);
    name = parseIdentifierName(state, context);
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedExpression, DiagnosticKind.Error);
  }

  return finishNode(state, context, start, DictionaryMap.SuperProperty(expression, name), SyntaxKind.SuperProperty);
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

// ModuleItemList :
//   ModuleItem
//   ModuleItemList ModuleItem
//
// ModuleItem :
//   ImportDeclaration
//   ExportDeclaration
//   StatementListItem
export function parseModuleItem(state: ParserState, context: Context): ImportExport {
  switch (state.token) {
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
      return parseImportDeclaration(state, context, start);
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context);
    default:
      return parseStatementListItem(state, context);
  }
}

// ImportDeclaration :
//   `import` ImportClause FromClause `;`
//   `import` ModuleSpecifier `;`
export function parseImportDeclaration(
  state: ParserState,
  context: Context,
  start: number
): ImportDeclaration | ExpressionStatement {
  let moduleSpecifier = null;
  let importClause = null;
  let fromClause = null;

  if (state.token === Token.StringLiteral) {
    moduleSpecifier = parseStringLiteral(state, context);
  } else {
    importClause = parseImportClause(state, context);
    if (state.token === Token.FromKeyword) {
      fromClause = parseFromClause(state, context);
    }
  }
  consumeSemicolon(state, context);
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
export function parseImportClause(state: ParserState, context: Context): ImportClause {
  const start = state.startIndex;
  let defaultBinding = null;
  let namespace = null;
  let namedImports = null;
  if (state.token & (Token.IsFutureReserved | Token.IsIdentifier)) {
    defaultBinding = parseBindingIdentifier(state, context, BindingType.None);
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
    namespace = parseNameSpaceImport(state, context);
  } else if (state.token === Token.LeftBrace) {
    namedImports = parseNamedImports(state, context);
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedStatement, DiagnosticKind.Error);
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
export function parseNameSpaceImport(state: ParserState, context: Context): BindingIdentifier {
  consume(state, context, Token.Multiply);
  consume(state, context, Token.AsKeyword);
  return parseBindingIdentifier(state, context, BindingType.None);
}

// NamedImports :
//   `{` `}`
//   `{` ImportsList `}`
//   `{` ImportsList `,` `}`
export function parseNamedImports(state: ParserState, context: Context): NamedImports {
  const start = state.startIndex;
  consume(state, context, Token.LeftBrace);
  const importsList = []; // run, and the ',' consumed as invalid punctuator, and the '!' will be // parsed out as an 'UnaryExpression' with a dummy. // // Errors thrown for this is 'Statement expected'. I think this is correct because // ',' isn't a valid start of a statement. // // The alternative is to 'consume' the ',' inside the import list, but // the result is a lot of dummy nodes as done for this case 'import {a,,,,b,,,,,c!'. // // For this specific case we insert a dummy as a placeholder in the // import list, but break out soon as we see '!', and parse it out as an // "UnaryExpression" instead.
  // For cases like 'import {,,,,,,,,,,,,,,,,, !' the while loop will not
  while (state.token & Constants.ImportExportSpecifier) {
    importsList.push(parseImportSpecifier(state, context));
    if (state.token === Token.RightBrace) break;
    consume(state, context, Token.Comma);
  }
  consume(state, context | Context.AllowRegExp, Token.RightBrace);
  return finishNode(state, context, start, DictionaryMap.NamedImports(importsList), SyntaxKind.NamedImports);
}

// ImportSpecifier :
//   ImportedBinding
//   IdentifierName `as` ImportedBinding
export function parseImportSpecifier(state: ParserState, context: Context): ImportSpecifier {
  const start = state.startIndex;
  const name = parseIdentifierName(state, context);
  let importedBinding: BindingIdentifier | IdentifierName | null = null;
  let identifierName: BindingIdentifier | IdentifierName | null = null;
  if (consumeOpt(state, context, Token.AsKeyword)) {
    identifierName = name;
    importedBinding = parseBindingIdentifier(state, context, BindingType.None);
  } else {
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

// ImportCall :
//  import
export function parseImportCall(state: ParserState, context: Context, start: number): ExpressionStatement {
  let expr = parseExpression(state, context);
  consume(state, context, Token.RightParen);
  expr = finishNode(state, context, start, DictionaryMap.ImportCall(expr), SyntaxKind.ImportCall);
  expr = parseExpressionOrHigher(state, context, expr, start);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ExpressionStatement(expr), SyntaxKind.ExpressionStatement);
}

// ImportMeta:
//   import.meta
export function parseImportMeta(state: ParserState, context: Context, start: number): ExpressionStatement {
  consume(state, context, Token.MetaIdentifier);
  let expr = finishNode(state, context, start, DictionaryMap.ImportMeta(), SyntaxKind.ImportMeta);
  state.assignable = false;
  expr = parseExpressionOrHigher(state, context, expr, start);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, DictionaryMap.ExpressionStatement(expr), SyntaxKind.ExpressionStatement);
}

// FromClause :
//   `from` ModuleSpecifier
export function parseFromClause(state: ParserState, context: Context): StringLiteral {
  consume(state, context, Token.FromKeyword);
  return parseStringLiteral(state, context);
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
export function parseExportDeclaration(state: ParserState, context: Context): ExportDeclaration | ExportDefault {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);

  if (consumeOpt(state, context | Context.AllowRegExp, Token.DefaultKeyword)) {
    return parseExportDefault(state, context, start);
  }

  let declaration: any = null;
  let fromClause: StringLiteral | null = null;
  let namedBinding: IdentifierName | null = null;
  let namedExports: any[] = [];

  switch (state.token) {
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Let);
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Const);
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(state, context);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(state, context);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(state, context);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context);
      break;
    case Token.LeftBrace:
      namedExports = parseNamedExports(state, context);
      if (state.token === Token.FromKeyword) fromClause = parseFromClause(state, context);
      break;
    case Token.Multiply: {
      nextToken(state, context);
      if (consumeOpt(state, context, Token.AsKeyword)) namedBinding = parseIdentifierName(state, context);
      if (state.token === Token.FromKeyword) fromClause = parseFromClause(state, context);
      consumeSemicolon(state, context);
      break;
    }
    default:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedExportDecl, DiagnosticKind.Error);
  }
  return finishNode(
    state,
    context,
    start,
    DictionaryMap.ExportDeclaration(declaration, namedExports, namedBinding, fromClause),
    SyntaxKind.ExportDeclaration
  );
}

// NamedExports :
//   `{` `}`
//   `{` ExportsList `}`
//   `{` ExportsList `,` `}`
export function parseNamedExports(state: ParserState, context: Context): ExportSpecifier[] {
  consume(state, context, Token.LeftBrace);
  const exportsList = [];
  while (state.token & Constants.ImportExportSpecifier) {
    exportsList.push(parseExportSpecifier(state, context));
    if (state.token === Token.RightBrace) break;
    consume(state, context, Token.Comma);
  }
  consume(state, context | Context.AllowRegExp, Token.RightBrace);
  return exportsList;
}

// ExportSpecifier :
//   IdentifierName
//   IdentifierName `as` IdentifierName
export function parseExportSpecifier(state: ParserState, context: Context): ExportSpecifier {
  const start = state.startIndex;
  const name = parseIdentifierName(state, context);
  if (consumeOpt(state, context, Token.AsKeyword)) {
    const exportedName = parseIdentifierName(state, context);
    return finishNode(
      state,
      context,
      start,
      DictionaryMap.ExportSpecifier(name, exportedName),
      SyntaxKind.ExportSpecifier
    );
  }
  return finishNode(state, context, start, DictionaryMap.ExportSpecifier(name, null), SyntaxKind.ExportSpecifier);
}

// ExportDefault :
//   `export` `default` HoistableDeclaration [EXTENDED]
//   `export` `default` ClassDeclaration  [EXTENDED]
//   `export` `default` AssignmentExpression `;`  [EXTENDED]
export function parseExportDefault(state: ParserState, context: Context, start: number): ExportDefault {
  let declaration;
  switch (state.token) {
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(state, context | Context.Default);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(state, context | Context.Default);
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(state, context | Context.Default);
      break;
    default:
      declaration = parseExpression(state, context);
      consumeSemicolon(state, context);
  }
  return finishNode(state, context, start, DictionaryMap.ExportDefault(declaration), SyntaxKind.ExportDefault);
}
