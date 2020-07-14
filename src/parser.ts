import { Token, KeywordDescTable } from './token';
import { nextToken } from './scanner/scan';
import { Constants } from './constants';
import { scanTemplateTail } from './scanner/template';
import * as Types from './types';
import { NodeType } from './nodeType';
import { Options } from './escaya';
import { DiagnosticKind, DiagnosticSource, DiagnosticCode } from './diagnostic/enums';
import { addDiagnostic, createDiagnostic } from './diagnostic/diagnostics';
import { tokenErrors } from './diagnostic/token-errors';
import {
  createIdentifier,
  parseLeafElement,
  createArray,
  createMissingList,
  parseLexicalElements,
  parseFormalElements,
  parseClassElements,
  parseListElements
} from './incremental';
import {
  Context,
  Flags,
  ParserState,
  ModifierKind,
  Destructible,
  Precedence,
  BindingType,
  create,
  isClosingTokenOrComma,
  reinterpretToAssignment,
  reinterpretArrowParameter,
  validateFunctionName,
  canParseSemicolon,
  consumeSemicolon,
  isCaseOrDefaultKeyword,
  isStrictReservedWord,
  parseAndClassifyIdentifier,
  validateIdentifier,
  consume,
  consumeOpt,
  optionalBit,
  finishNode
} from './common';

/**
 * An interface for leafs callback
 */
export interface LeafsCallback {
  (state: ParserState, context: Context): Types.ImportOrExport | Types.Statement;
}

/**
 * Interface for variable declaration and binding list
 */
export interface VarLexCallback {
  (state: ParserState, context: Context, bindingType: BindingType, start: number): Types.VarOrLexical;
}

/**
 * Parse a module or script, optionally with various options.
 */
export function parseSource(
  source: string,
  context: Context,
  callback: LeafsCallback,
  options?: Options
): Types.Module | Types.Script {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.impliedStrict) context |= Context.Strict;
    if (options.module) context |= Context.Module;
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
  }

  // Create a new parser object
  const state = create(source);

  nextToken(state, context | Context.AllowRegExp);

  /**
   * The stack of leafs currently being parsed.
   */
  const leafs: (Types.ImportOrExport | Types.Statement)[] = [];

  /**
   * The stack of directives currently being parsed.
   */
  const directives: string[] = [];

  while (state.token === Token.StringLiteral) {
    // "use strict" must be the exact literal without escape sequences or line continuation.
    const { token, tokenValue, startIndex, index } = state;
    nextToken(state, context | Context.AllowRegExp);
    if (state.token & Token.IsAutomaticSemicolon || state.hasLineTerminator) {
      const directive = state.source.slice(startIndex, index);
      if (directive.length === 12 && tokenValue === 'use strict') context |= Context.Strict;
      consumeOpt(state, context, Token.Semicolon);
      directives.push(directive);
    } else {
      leafs.push(parseDirectives(state, context, token, tokenValue, startIndex));
    }
  }

  // StatementList :
  //   (StatementListItem)* <end_token>
  while (state.token !== Token.EndOfSource) {
    leafs.push(callback(state, context));
  }

  if (context & Context.OptionsLoc) {
    return {
      type: context & Context.Module ? 'Module' : 'Script',
      directives,
      leafs,
      start: 0,
      end: source.length,
      webCompat: (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat
    };
  }

  return {
    type: context & Context.Module ? 'Module' : 'Script',
    directives,
    leafs,
    webCompat: (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat
  };
}

// ECMA 262 11th Edition
//
// StatementListItem :
//   Statement
//   Declaration
//
// Declaration :
//   HoistableDeclaration
//   ClassDeclaration
//   LexicalDeclaration
//
// HoistableDeclaration :
//   FunctionDeclaration
//   GeneratorDeclaration
//   AsyncFunctionDeclaration
//   AsyncGeneratorDeclaration
//
// LexicalDeclaration :
//   LetOrConst BindingList ;
export function parseStatementListItem(state: ParserState, context: Context): Types.Statement {
  switch (state.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(state, context, /* isAsync */ 0, BindingType.AllowLHS);
    case Token.AsyncKeyword:
      return parseFunctionDeclaration(state, context, /* isAsync */ 1, BindingType.AllowLHS);
    case Token.ClassKeyword:
      return parseClassDeclaration(state, context);
    case Token.LetKeyword:
      return parseLexicalDeclaration(state, context, BindingType.Let);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(state, context, BindingType.Const);
    case Token.ExportKeyword:
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidImportInSloppy,
        DiagnosticKind.Error
      );
    default:
      return parseStatement(state, context);
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
export function parseStatement(state: ParserState, context: Context): Types.Statement {
  switch (state.token) {
    case Token.LeftBrace:
      return parseBlockStatement(state, context);
    case Token.VarKeyword:
      return parseVariableStatement(state, context);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.IfKeyword:
      return parseIfStatement(state, context);
    case Token.ForKeyword:
      return parseForStatement(state, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context);
    case Token.WhileKeyword:
      return parseWhileStatement(state, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(state, context);
    case Token.BreakKeyword:
      return parseBreakStatement(state, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.WithKeyword:
      return parseWithStatement(state, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.TryKeyword:
      return parseTryStatement(state, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(state, context);
    case Token.FunctionKeyword:
      // FunctionDeclaration are only allowed as a StatementListItem, not in
      // an arbitrary Statement position.
      if (context & Constants.StrictOrDisabledWebCompat) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          context & Context.Strict
            ? DiagnosticCode.StrictFunction
            : context & Context.OptionsDisableWebCompat /* AnnexB */
            ? DiagnosticCode.WebCompatFunction
            : DiagnosticCode.SloppyFunction,
          DiagnosticKind.Error
        );
      }
      return parseFunctionDeclaration(state, context, /* isAsync */ 0, BindingType.AllowLHS);
    case Token.ClassKeyword:
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.ClassForbiddenAsStatement,
        DiagnosticKind.Error
      );

    // Miscellaneous error cases arguably better caught here than elsewhere.

    case Token.CatchKeyword:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.CatchWithoutTry, DiagnosticKind.Error);
      return parseTryStatement(state, context);
    case Token.FinallyKeyword:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.FinallyWithoutTry, DiagnosticKind.Error);
      return parseTryStatement(state, context);
    default:
      return parseExpressionOrLabelledStatement(state, context);
  }
}

// LexicalDeclaration : LetOrConst BindingList `;`
export function parseLexicalDeclaration(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.LexicalDeclarationOrIdentifier {
  const token = state.token;
  const start = state.startIndex;

  nextToken(state, context);

  // If the next token is not a 'let' declaration, it has to be an identifier.
  if (bindingType & BindingType.Let && (state.token & Constants.NextTokenIsNotALetDeclaration) === 0) {
    return parseLetAsIdentifierReference(state, context, token, bindingType, start);
  }

  const declarations = parseVariableDeclarationOrBindingList(state, context, bindingType, parseLexicalBinding);

  consumeSemicolon(state, context);

  return finishNode(
    state,
    context,
    start,
    { type: 'LexicalDeclaration', kind: KeywordDescTable[token & Token.Type] as 'let' | 'const', declarations },
    NodeType.LexicalDeclaration
  );
}

// LexicalBinding :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseLexicalBinding(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.LexicalBinding {
  let initializer: Types.Expression | null = null;
  const token = state.token;
  const binding = parseBindingElement(state, context, bindingType);
  if (state.token === Token.Assign) {
    initializer = parseInitializer(state, context);
  } else if (token & Token.IsPatternStart || bindingType === BindingType.Const) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      bindingType === BindingType.Const
        ? DiagnosticCode.ConstMissingDestrictInitializer
        : DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(state, context, start, { type: 'LexicalBinding', binding, initializer }, NodeType.LexicalBinding);
}

// let expression statement
export function parseLetAsIdentifierReference(
  state: ParserState,
  context: Context,
  token: Token,
  bindingType: BindingType,
  start: number
): Types.LabelledStatement | Types.ExpressionStatement {
  let expr: any = parseIdentifierReferenceFromValue(state, context, 'let', bindingType, start);

  if (context & Context.Strict) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.LetInStrictMode, DiagnosticKind.Error);
  }
  // "let" followed by either "[", "{" or an identifier means a lexical
  // declaration, which should not appear here.
  // However, ASI may insert a line break before an identifier or a brace.
  if (state.token === Token.LeftBracket) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.LetInStrictMode, DiagnosticKind.Error);
  }
  // 'let: foo'
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, token, 'let', start);
  }

  if (state.token === Token.Arrow) {
    expr = parseArrowFunction(state, context, [expr], bindingType | BindingType.AllowLHS, /* isAsync */ 0, start);
  } else {
    state.assignable = true;
  }

  // 'let.x', 'let(x)', 'let?.x', 'let => x, let => x'
  expr = parseLeftHandSide(state, context, expr, Precedence.Assign, bindingType, start);

  // 'let, let', 'let => x, let => x'
  expr = parseCommaOperator(state, context, expr, start);

  return parseExpressionStatement(state, context, expr, start);
}

// VariableStatement ::
//   VariableDeclarations ';'
export function parseVariableStatement(state: ParserState, context: Context): Types.VariableStatement {
  const start = state.startIndex;
  nextToken(state, context);
  const declarations = parseVariableDeclarationOrBindingList(state, context, BindingType.Var, parseVariableDeclaration);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'VariableStatement', declarations }, NodeType.VariableStatement);
}

// BindingList :
//   LexicalBinding
//   BindingList `,` LexicalBinding
//
// VariableDeclarationList :
//   VariableDeclaration
//   VariableDeclarationList `,` VariableDeclaration
export function parseVariableDeclarationOrBindingList(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  callback: VarLexCallback
): any[] {
  const declarationList: (Types.LexicalBinding | Types.VariableDeclaration)[] = [];
  if (context & Context.ErrorRecovery) {
    const start = state.startIndex;
    while (state.token & Constants.IdentifierOrPattern) {
      declarationList.push(parseLexicalElements(state, context, bindingType, callback));
      if (consumeOpt(state, context, Token.Comma)) continue;
      // If we had 'var', 'let' or 'const' followed by something that's not an identifier or pattern,
      // then we break the loop here. Example 'var !' or 'let a !'.
      // The latter will be parsed as an 'UnaryExpression'.
      if ((state.token & Constants.IdentifierOrPattern) === 0 || state.hasLineTerminator) break;
      // Give a nice error message for weird cases like 'let a  b c  [] = b, {}' where comma is missing
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedComma, DiagnosticKind.Error);
    }
    return createArray(state, declarationList, start);
  }

  // Non-recovery mode

  do {
    declarationList.push(callback(state, context, bindingType, state.startIndex));
  } while (consumeOpt(state, context, Token.Comma));

  return declarationList;
}

// VariableDeclaration :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseVariableDeclaration(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.VariableDeclaration {
  const token = state.token;
  const binding = parseBindingElement(state, context, bindingType);
  let initializer = null;
  if (state.token === Token.Assign) {
    initializer = parseInitializer(state, context);
  } else if (token & Token.IsPatternStart) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    state,
    context,
    start,
    { type: 'VariableDeclaration', binding, initializer },
    NodeType.VariableDeclaration
  );
}

// IfStatement :
//  `if` `(` Expression `)` Statement `else` Statement
//  `if` `(` Expression `)` Statement
export function parseIfStatement(state: ParserState, context: Context): Types.IfStatement {
  const start = state.startIndex;
  nextToken(state, context);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const consequent = parseStatement(state, context);
  const alternate = consumeOpt(state, context, Token.ElseKeyword) ? parseStatement(state, context) : null;

  return finishNode(
    state,
    context,
    start,
    { type: 'IfStatement', expression, consequent, alternate },
    NodeType.IfStatement
  );
}

// `while` `(` Expression `)` Statement
export function parseWhileStatement(state: ParserState, context: Context): Types.WhileStatement {
  const start = state.startIndex;
  nextToken(state, context);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(state, context | Context.InIteration);
  return finishNode(state, context, start, { type: 'WhileStatement', expression, statement }, NodeType.WhileStatement);
}

// `do` Statement `while` `(` Expression `)` `;`
export function parseDoWhileStatement(state: ParserState, context: Context): Types.DoWhileStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const statement = parseStatement(state, context | Context.InIteration);
  consume(state, context, Token.WhileKeyword);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  consumeOpt(state, context | Context.AllowRegExp, Token.Semicolon);
  return finishNode(
    state,
    context,
    start,
    { type: 'DoWhileStatement', statement, expression },
    NodeType.DoWhileStatement
  );
}

// DebuggerStatement ::
//   'debugger' ';'
export function parseDebuggerStatement(state: ParserState, context: Context): Types.DebuggerStatement {
  const start = state.startIndex;
  nextToken(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'DebuggerStatement' }, NodeType.DebuggerStatement);
}

// EmptyStatement ::
// ';'
export function parseEmptyStatement(state: ParserState, context: Context): Types.EmptyStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  return finishNode(state, context, start, { type: 'EmptyStatement' }, NodeType.EmptyStatement);
}

// SwitchStatement :
//   'switch' '(' Expression ')' '{' CaseClause* '}'
// CaseClause :
//   'case' Expression ':' StatementList
//   'default' ':' StatementList
export function parseSwitchStatement(state: ParserState, context: Context): Types.SwitchStatement {
  const start = state.startIndex;
  nextToken(state, context);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(state, context, Token.RightParen);
  consume(state, context, Token.LeftBrace);
  const clauses = parseCaseBlock(state, context);
  consume(state, context, Token.RightBrace);
  return finishNode(state, context, start, { type: 'SwitchStatement', expression, clauses }, NodeType.SwitchStatement);
}

// CaseBlock :
//   `{` CaseClauses? `}`
//   `{` CaseClauses? DefaultClause CaseClauses? `}`
export function parseCaseBlock(state: ParserState, context: Context): (Types.DefaultClause | Types.CaseClause)[] {
  const clauses: (Types.DefaultClause | Types.CaseClause)[] = [];
  if (context & Context.ErrorRecovery) {
    const start = state.startIndex;
    // Both '{' and '}' are optional, but if the '{' is missing - the result will lead to a
    // number of strange cases.
    //
    // For example 'switch (a) case foo: !' will force the parser to
    // parse 'foo' as an expression, but '!' - which is usually invalid syntax - will
    // end up as an 'UnaryExpression' as part of the 'CatchClause'
    //
    // Another weird case is 'switch (a) case foo ! \n bar' where 'bar' will be the 'operand' of the
    // 'UnaryExpression' as part of the 'CatchClause'
    while (isCaseOrDefaultKeyword(state.token)) {
      clauses.push(parseLeafElement(state, context, parseCaseOrDefaultClause));
    }
    return createArray(state, clauses, start);
  }

  while (state.token !== Token.RightBrace) {
    clauses.push(parseCaseOrDefaultClause(state, context));
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
export function parseCaseOrDefaultClause(state: ParserState, context: Context): Types.CaseClause | Types.DefaultClause {
  const statements: Types.Statement[] = [];
  const start = state.startIndex;
  if (state.token === Token.CaseKeyword) {
    nextToken(state, context | Context.AllowRegExp);
    const expression = parseExpressions(state, context);
    consume(state, context | Context.AllowRegExp, Token.Colon);
    while (state.token & Constants.SwitchClauce) {
      statements.push(parseStatementListItem(state, context | Context.InSwitch));
    }

    return finishNode(state, context, start, { type: 'CaseClause', expression, statements }, NodeType.CaseClause);
  }
  consume(state, context, Token.DefaultKeyword);
  consume(state, context | Context.AllowRegExp, Token.Colon);
  while (state.token & Constants.SwitchClauce) {
    statements.push(parseStatementListItem(state, context | Context.InSwitch));
  }

  return finishNode(state, context, start, { type: 'DefaultClause', statements }, NodeType.DefaultClause);
}

// BreakStatement :
//   `break` `;`
//   `break` [no LineTerminator here] LabelIdentifier `;`
//
export function parseBreakStatement(state: ParserState, context: Context): Types.BreakStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label: Types.LabelIdentifier | null = null;
  if (state.token & Constants.LabelIdentifier && !state.hasLineTerminator) {
    label = parseLabelIdentifier(state, context);
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.IllegalBreak, DiagnosticKind.Error);
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'BreakStatement', label }, NodeType.BreakStatement);
}

// ContinueStatement :
//   `continue` `;`
//   `continue` [no LineTerminator here] LabelIdentifier `;`
export function parseContinueStatement(state: ParserState, context: Context): Types.ContinueStatement {
  if ((context & Context.InIteration) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.IllegalContinue, DiagnosticKind.Error);
  }
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let label: Types.LabelIdentifier | null = null;
  if (state.token & Constants.LabelIdentifier && !state.hasLineTerminator) {
    label = parseLabelIdentifier(state, context);
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ContinueStatement', label }, NodeType.ContinueStatement);
}

// ReturnStatement :
//   `return` `;`
//   `return` [no LineTerminator here] Expression `;`
export function parseReturnStatement(state: ParserState, context: Context): Types.ReturnStatement {
  if ((context & Constants.ReturnOrGlobalReturn) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.IllegalReturn, DiagnosticKind.Error);
  }
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const expression = canParseSemicolon(state) ? null : parseExpressions(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ReturnStatement', expression }, NodeType.ReturnStatement);
}

// WithStatement :
//   `with` `(` Expression `)` Statement
export function parseWithStatement(state: ParserState, context: Context): Types.WithStatement {
  if (context & Context.Strict) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.StrictWith, DiagnosticKind.Error);
  }
  const start = state.startIndex;
  nextToken(state, context);
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(state, context);
  consume(state, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(state, context | Context.InIteration);
  return finishNode(state, context, start, { type: 'WithStatement', expression, statement }, NodeType.WithStatement);
}

// ThrowStatement :
//   `throw` [no LineTerminator here] Expression `;`
export function parseThrowStatement(state: ParserState, context: Context): Types.ThrowStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (state.hasLineTerminator) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.NewlineAfterThrow, DiagnosticKind.Error);
  }
  const expression = parseExpressions(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ThrowStatement', expression }, NodeType.ThrowStatement);
}

// TryStatement :
//   `try` Block Catch
//   `try` Block Finally
//   `try` Block Catch Finally
export function parseTryStatement(state: ParserState, context: Context): Types.TryStatement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const block = parseBlockStatement(state, context);
  const catchClause = state.token === Token.CatchKeyword ? parseCatchClause(state, context) : null;
  let finalizer = null;
  if (consumeOpt(state, context | Context.AllowRegExp, Token.FinallyKeyword)) {
    finalizer = parseBlockStatement(state, context);
  }
  if (!catchClause && !finalizer) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.NoCatchOrFinally, DiagnosticKind.Error);
  }

  return finishNode(
    state,
    context,
    start,
    { type: 'TryStatement', block, catchClause, finalizer },
    NodeType.TryStatement
  );
}

// Catch :
//   `catch` `(` CatchParameter `)` Block
//   `catch` Block
//
// CatchParameter :
//   BindingIdentifier
//   BindingPattern
export function parseCatchClause(state: ParserState, context: Context): Types.CatchClause {
  let binding = null;
  nextToken(state, context | Context.AllowRegExp);
  const start = state.startIndex;
  const bindingType = state.token & Token.IsPatternStart ? BindingType.CatchPattern : BindingType.CatchIdentifier;
  if (consumeOpt(state, context, Token.LeftParen)) {
    binding = parseBindingElement(state, context, bindingType);
    consume(state, context | Context.AllowRegExp, Token.RightParen);
  }
  const block = parseBlockStatement(state, context);
  return finishNode(state, context, start, { type: 'CatchClause', binding, block }, NodeType.CatchClause);
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
): Types.Expression | Types.LabelledStatement | Types.ExpressionStatement {
  const { token, tokenValue, startIndex } = state;

  const expr = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, startIndex);

  if (token & Constants.IdentifierOrFutureKeyword && state.token === Token.Colon) {
    return parseLabelledStatement(state, context, token, tokenValue, startIndex);
  }

  return parseExpressionStatement(state, context, parseCommaOperator(state, context, expr, startIndex), startIndex);
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
  token: Token,
  labelValue: string,
  start: number
): Types.LabelledStatement {
  const label = parseLabelIdentifierFromValue(state, context, token, labelValue, start);

  nextToken(state, context | Context.AllowRegExp); // skip: ':'

  return finishNode(
    state,
    context,
    start,
    { type: 'LabelledStatement', label, labelledItem: parseStatement(state, context) },
    NodeType.LabelledStatement
  );
}

export function parseLabelIdentifierFromValue<T extends Token>(
  state: ParserState,
  context: Context,
  t: T,
  name: string,
  start: number
): Types.LabelIdentifier {
  if (context & (Context.Module | Context.Await) && t === Token.AwaitKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.AwaitOutsideAsync, DiagnosticKind.Error);
  }
  if (context & (Context.Strict | Context.Yield) && t === Token.YieldKeyword) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DisallowedYieldInContext,
      DiagnosticKind.Error
    );
  }
  if ((context & Context.Strict) === Context.Strict && (t & Token.FutureKeyword) === Token.FutureKeyword) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedStrictReserved,
      DiagnosticKind.Error
    );
  }
  return finishNode(state, context, start, { type: 'LabelIdentifier', name }, NodeType.LabelIdentifier);
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
): Types.ForStatement | Types.ForAwaitStatement | Types.ForOfStatement | Types.ForInStatement {
  const start = state.startIndex;
  consume(state, context, Token.ForKeyword);
  let isAwait = false;

  if (state.token === Token.AwaitKeyword) {
    // 'for-await' can only be used inside an async function
    if ((context & Context.Await) !== Context.Await) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidForAwait, DiagnosticKind.Error);
    }
    nextToken(state, context);
    isAwait = true;
  }

  consume(state, context | Context.AllowRegExp, Token.LeftParen);

  let initializer: any = null;
  let expression: Types.Expression | null = null;
  let statement: Types.Statement;
  let condition: Types.Expression | null = null;
  let incrementor: Types.Expression | null = null;
  let destructible;
  const token = state.token;

  if (token !== Token.Semicolon) {
    // 'var', 'let', 'const'
    if (state.token & Token.IsVarDecl) {
      const declStart = state.startIndex;

      if (token === Token.LetKeyword) {
        initializer = parseIdentifierReference(state, context, BindingType.None);

        if (state.token & Constants.NextTokenIsLetAsIdentifierOrPattern) {
          if (state.token === Token.InKeyword) {
            if (context & Context.Strict) {
              addDiagnostic(
                state,
                context,
                DiagnosticSource.Parser,
                DiagnosticCode.DisallowedLetInStrict,
                DiagnosticKind.Error
              );
            }
          } else {
            initializer = parseForDeclaration(state, context | Context.DisallowIn, BindingType.Let, token, declStart);
          }
          state.assignable = true;
        } else {
          // In sloppy mode, `let` must now be a regular var name.
          if (context & Context.Strict) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.DisallowedLetInStrict,
              DiagnosticKind.Error
            );
          }

          state.assignable = true;

          initializer = parseLeftHandSide(
            state,
            context,
            initializer,
            Precedence.LeftHandSide,
            BindingType.AllowLHS,
            start
          );

          // `for of` only allows LeftHandSideExpressions which do not start with `let`, and no other production matches
          if (state.token === Token.OfKeyword) {
            addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ForOfLet, DiagnosticKind.Error);
          }
        }
      } else if (consumeOpt(state, context, Token.ConstKeyword)) {
        initializer = parseForDeclaration(state, context | Context.DisallowIn, BindingType.Const, token, declStart);
        state.assignable = true;
      } else {
        nextToken(state, context);
        initializer = parseForDeclaration(state, context | Context.DisallowIn, BindingType.Var, token, declStart);
        state.assignable = true;
      }

      if (
        isAwait
          ? consume(state, context | Context.AllowRegExp, Token.OfKeyword)
          : consumeOpt(state, context | Context.AllowRegExp, Token.OfKeyword)
      ) {
        expression = parseExpression(
          state,
          context,
          Precedence.LeftHandSide,
          BindingType.AllowLHS,
          true,
          1,
          state.startIndex
        );

        consume(state, context | Context.AllowRegExp, Token.RightParen);

        return finishNode(
          state,
          context,
          start,
          {
            type: isAwait ? 'ForAwaitStatement' : 'ForOfStatement',
            initializer,
            expression,
            statement: parseStatement(state, context | Context.InIteration)
          } as any,
          isAwait ? NodeType.ForAwaitStatement : NodeType.ForOfStatement
        );
      }

      if (consumeOpt(state, context | Context.AllowRegExp, Token.InKeyword)) {
        if (!state.assignable) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.CantAssignForInLoop,
            DiagnosticKind.Error
          );
        }

        expression = parseExpressions(state, context);

        consume(state, context | Context.AllowRegExp, Token.RightParen);

        statement = parseStatement(state, context | Context.InIteration);

        return finishNode(
          state,
          context,
          start,
          { type: 'ForInStatement', initializer, expression, statement },
          NodeType.ForInStatement
        );
      }

      initializer = parseLeftHandSide(
        state,
        context,
        initializer,
        Precedence.Assign,
        BindingType.AllowLHS,
        state.startIndex
      );

      initializer = parseCommaOperator(state, context, initializer, state.startIndex);

      consume(state, context, Token.Semicolon);

      if (state.token !== Token.Semicolon) {
        condition = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, state.startIndex);
      }

      consume(state, context, Token.Semicolon);

      if (state.token !== Token.RightParen) incrementor = parseExpressions(state, context);

      consume(state, context | Context.AllowRegExp, Token.RightParen);

      statement = parseStatement(state, context | Context.InIteration);

      return finishNode(
        state,
        context,
        start,
        { type: 'ForStatement', initializer, condition, incrementor, statement },
        NodeType.ForStatement
      );
    }

    if (state.token & Token.IsPatternStart) {
      initializer =
        token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(state, context, false, BindingType.Pattern | BindingType.Literal, start)
          : parseArrayLiteralOrPattern(state, context, false, BindingType.Pattern | BindingType.Literal, start);

      if (state.token & Token.IsAssignOp && state.token !== Token.Assign) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }

      destructible = state.destructible;

      state.assignable = (destructible & Destructible.NotDestructible) !== Destructible.NotDestructible;

      initializer = parseLeftHandSide(
        state,
        context,
        initializer,
        Precedence.LeftHandSide,
        BindingType.AllowLHS,
        start
      );
    } else {
      initializer = parseExpression(state, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, 1, start);
    }
  }

  if (
    isAwait
      ? consume(state, context | Context.AllowRegExp, Token.OfKeyword)
      : consumeOpt(state, context | Context.AllowRegExp, Token.OfKeyword)
  ) {
    if (!state.assignable) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.CantAssignForLoop, DiagnosticKind.Error);
    }

    reinterpretToAssignment(initializer, false);

    expression = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, state.startIndex);

    consume(state, context | Context.AllowRegExp, Token.RightParen);

    statement = parseStatement(state, context | Context.InIteration);

    return finishNode(
      state,
      context,
      start,
      { type: isAwait ? 'ForAwaitStatement' : 'ForOfStatement', initializer, expression, statement } as any,
      isAwait ? NodeType.ForAwaitStatement : NodeType.ForOfStatement
    );
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.InKeyword)) {
    if (!state.assignable) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.CantAssignForInLoop, DiagnosticKind.Error);
    }

    reinterpretToAssignment(initializer, false);

    expression = parseExpressions(state, context);

    consume(state, context | Context.AllowRegExp, Token.RightParen);

    statement = parseStatement(state, context | Context.InIteration);

    return finishNode(
      state,
      context,
      start,
      { type: 'ForInStatement', initializer, expression, statement },
      NodeType.ForInStatement
    );
  }

  if (token & Token.IsPatternStart) reinterpretToAssignment(initializer, false);

  initializer = parseLeftHandSide(
    state,
    context,
    initializer,
    Precedence.Assign,
    BindingType.AllowLHS,
    state.startIndex
  );

  initializer = parseCommaOperator(state, context, initializer, state.startIndex);

  consume(state, context, Token.Semicolon);

  if (state.token !== Token.Semicolon) {
    condition = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, state.startIndex);
  }

  consume(state, context, Token.Semicolon);

  if (state.token !== Token.RightParen) incrementor = parseExpressions(state, context);

  consume(state, context | Context.AllowRegExp, Token.RightParen);

  statement = parseStatement(state, context | Context.InIteration);

  return finishNode(
    state,
    context,
    start,
    { type: 'ForStatement', initializer, condition, incrementor, statement },
    NodeType.ForStatement
  );
}

// ForDeclaration : LetOrConst ForBinding
export function parseForDeclaration(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  t: Token,
  start: number
): Types.ForDeclaration {
  let declarations: any = [];
  let count = 0;
  if (context & Context.ErrorRecovery) {
    const start = state.startIndex;
    while (state.token & Constants.IdentifierOrPattern) {
      declarations.push(parseLexicalElements(state, context, bindingType, parseForBinding));
      if (consumeOpt(state, context, Token.Comma)) continue;
      if ((state.token & Constants.IdentifierOrPattern) === 0 || state.hasLineTerminator) break;
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        state.token === Token.InKeyword ? DiagnosticCode.ForInLoopMultiBindings : DiagnosticCode.ForOfLoopMultiBindings,
        DiagnosticKind.Error
      );
      count++;
    }
    declarations = createArray(state, declarations, start);
  } else {
    do {
      declarations.push(parseForBinding(state, context, bindingType, state.startIndex));
      count++;
    } while (consumeOpt(state, context, Token.Comma));
  }

  if (count > 1 && state.token & Token.IsInOrOf) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      state.token === Token.InKeyword ? DiagnosticCode.ForInLoopMultiBindings : DiagnosticCode.ForOfLoopMultiBindings,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    state,
    context,
    start,
    {
      type: 'ForDeclaration',
      declarations,
      kind: KeywordDescTable[t & Token.Type] as Types.ForDeclarationKind
    },
    NodeType.ForDeclaration
  );
}

// ForBinding :
//   BindingIdentifier
//   BindingPattern
export function parseForBinding(state: ParserState, context: Context, bindingType: BindingType, start: number) {
  let initializer: Types.Expression | null = null;
  const isPattern = (state.token & Token.IsPatternStart) === Token.IsPatternStart;
  const binding = parseBindingElement(state, context, bindingType);
  if (state.token === Token.Assign) {
    initializer = parseInitializer(state, context);
    if (state.token & Token.IsInOrOf) {
      if (
        state.token === Token.OfKeyword ||
        (state.token === Token.InKeyword &&
          (bindingType & (BindingType.Const | BindingType.Let) ||
            isPattern ||
            context & Constants.StrictOrDisabledWebCompat))
      ) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.DeclMissingDestructInitializer,
          DiagnosticKind.Error
        );
      }
    }
  } else if ((bindingType & BindingType.Const || isPattern) && (state.token & Token.IsInOrOf) === 0) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    state,
    context,
    start,
    {
      type: bindingType & (BindingType.Const | BindingType.Let) ? 'LexicalBinding' : 'VariableDeclaration',
      binding,
      initializer
    },
    bindingType & (BindingType.Const | BindingType.Let) ? NodeType.LexicalBinding : NodeType.VariableDeclaration
  );
}

// BlockStatement :
//    Block
export function parseBlockStatement(state: ParserState, context: Context): Types.BlockStatement {
  const start = state.startIndex;
  const statements = parseBlock(state, context, start);
  return finishNode(state, context, start, { type: 'BlockStatement', statements }, NodeType.BlockStatement);
}

// Block :
//   '{' StatementList '}'
export function parseBlock(state: ParserState, context: Context, start: number): Types.MissingList | Types.Statement[] {
  const statements: any | Types.Statement[] = [];
  if (state.token === Token.LeftBrace) {
    nextToken(state, context | Context.AllowRegExp);
    if (context & Context.ErrorRecovery) {
      while (state.token & Constants.BlockStatement) {
        statements.push(parseLeafElement(state, context, parseStatementListItem));
        if ((state.token & Constants.BlockStatement) === 0) break;
      }
      if (state.token !== Token.RightBrace) {
        state.flags |= Flags.HasErrors;
        state.diagnostics.push(
          createDiagnostic(
            DiagnosticSource.Parser,
            DiagnosticCode.UnknownToken,
            DiagnosticKind.Error,
            start,
            state.endIndex
          )
        );
      }
      nextToken(state, context | Context.AllowRegExp);
      return createArray(state, statements, start);
    }
    while (state.token & Constants.BlockStatement) statements.push(parseStatementListItem(state, context));
    consume(state, context | Context.AllowRegExp, Token.RightBrace);
    return statements;
  }
  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return createMissingList(start, statements);
}

// ModuleItemList :
//   ModuleItem
//   ModuleItemList ModuleItem
//
// ModuleItem :
//   ImportDeclaration
//   ExportDeclaration
//   StatementListItem
export function parseModuleItem(state: ParserState, context: Context): Types.ImportOrExport | Types.Statement {
  switch (state.token) {
    case Token.ImportKeyword:
      return parseImportDeclaration(state, context);
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, BindingType.AllowLHS);
    default:
      return parseStatementListItem(state, context);
  }
}

// ImportDeclaration :
//   `import` ImportClause FromClause `;`
//   `import` ModuleSpecifier `;`
//
// ImportClause :
//   ImportedDefaultBinding
//   NameSpaceImport
//   NamedImports
//   ImportedDefaultBinding `,` NameSpaceImport
//   ImportedDefaultBinding `,` NamedImports
//
// ImportedDefaultBinding :
//   ImportedBinding
//
// NameSpaceImport :
//   `*` `as` ImportedBinding
//
// NamedImports :
//   `{` `}`
//   `{` ImportsList `}`
//   `{` ImportsList `,` `}`
//
// FromClause :
//   `from` ModuleSpecifier
//
// ImportedBinding :
//   BindingIdentifier
export function parseImportDeclaration(state: ParserState, context: Context): Types.ImportDeclaration | any {
  const startIndex = state.startIndex;

  nextToken(state, context);

  // Note: to make our lives simpler, we combine the 'ImportClause' and 'ImportDeclaration' production

  let namedImports: Types.MissingList | Types.ImportSpecifier[] = [];
  let fromClause: Types.StringLiteral | null = null;
  let namedBinding: Types.BindingIdentifier | null = null;
  let defaultBinding: Types.BindingIdentifier | null = null;
  let moduleSpecifier: Types.StringLiteral | null = null;

  if (context & Context.ErrorRecovery) namedImports = createArray(state, namedImports, startIndex);

  if (state.token === Token.StringLiteral) {
    moduleSpecifier = parseStringLiteral(state, context);

    return finishNode(
      state,
      context,
      startIndex,
      { type: 'ImportDeclaration', moduleSpecifier, defaultBinding, namedImports, namedBinding, fromClause },
      NodeType.ImportDeclaration
    );
  }

  if (consumeOpt(state, context, Token.Multiply)) {
    consume(state, context, Token.AsKeyword);
    namedBinding = parseBindingIdentifier(state, context, BindingType.None);
  } else if ((state.token & Constants.IdentfierName) > 0) {
    defaultBinding = parseBindingIdentifier(state, context, BindingType.None);
    if (consumeOpt(state, context, Token.Comma)) {
      if (consumeOpt(state, context, Token.Multiply)) {
        consume(state, context, Token.AsKeyword);
        namedBinding = parseBindingIdentifier(state, context, BindingType.None);
      } else {
        namedImports = parseImportsList(state, context, namedImports, startIndex);
      }
    }
  } else {
    // `import` `(`
    if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftParen)) {
      return parseImportCallFromModule(state, context, BindingType.AllowLHS, startIndex);
    }
    // `import` `.`
    if (consumeOpt(state, context, Token.Period)) {
      return parseImportMetaFromModule(state, context, BindingType.AllowLHS, startIndex);
    }
    namedImports = parseImportsList(state, context, namedImports, startIndex);
  }

  fromClause = parseFromClause(state, context);

  consumeSemicolon(state, context);

  return finishNode(
    state,
    context,
    startIndex,
    { type: 'ImportDeclaration', moduleSpecifier, defaultBinding, fromClause, namedImports, namedBinding },
    NodeType.ImportDeclaration
  );
}

// ImportsList:
//  ImportSpecifier
//  ImportsList, ImportSpecifier
export function parseImportsList(
  state: ParserState,
  context: Context,
  importsList: Types.ImportSpecifier[] = [],
  start: number
): Types.ImportSpecifier[] | Types.MissingList {
  if (state.token === Token.LeftBrace) {
    nextToken(state, context);
    if (context & Context.ErrorRecovery) {
      while ((state.token & Constants.IdentfierName) > 0) {
        importsList.push(parseImportSpecifier(state, context));
        if (state.token !== Token.RightBrace) consume(state, context, Token.Comma);
      }

      consume(state, context, Token.RightBrace);
      return createArray(state, importsList, start);
    }
    while ((state.token & Constants.IdentfierName) > 0) {
      importsList.push(parseImportSpecifier(state, context));
      if (state.token !== Token.RightBrace) consume(state, context, Token.Comma);
    }
    consume(state, context, Token.RightBrace);
    return importsList;
  }
  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return createMissingList(start, importsList);
}

// ImportSpecifier
export function parseImportSpecifier(state: ParserState, context: Context): Types.ImportSpecifier {
  const { tokenValue, startIndex } = state;

  nextToken(state, context);

  if (consumeOpt(state, context, Token.AsKeyword)) {
    const name = parseIdentifierNameFromValue(state, context, tokenValue, BindingType.AllowLHS, startIndex);
    const binding = parseBindingIdentifier(state, context, BindingType.None);
    return finishNode(state, context, startIndex, { type: 'ImportSpecifier', name, binding }, NodeType.ImportSpecifier);
  }

  const name = parseBindingIdentifierFromValue(state, context, tokenValue, startIndex);

  return finishNode(
    state,
    context,
    startIndex,
    { type: 'ImportSpecifier', name, binding: null },
    NodeType.ImportSpecifier
  );
}

// ExportDeclaration :
//   `export` ExportFromClause FromClause `;`
//   `export` NamedExports `;`
//   `export` VariableStatement
//   `export` Declaration
//   `export` `default` HoistableDeclaration
//   `export` `default` ClassDeclaration
//   `export` `default` AssignmentExpression `;`
//
// ExportFromClause :
//   `*`
//   `*` as IdentifierName
//   NamedExports
export function parseExportDeclaration(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.ExportDeclaration {
  const startIndex = state.startIndex;
  consume(state, context | Context.AllowRegExp, Token.ExportKeyword);

  let declaration: Types.ExportDeclarations | null = null;
  let namedExports: Types.ExportSpecifier[] = [];
  let fromClause: Types.StringLiteral | null = null;
  let namedBinding: Types.IdentifierName | null = null;

  if (consumeOpt(state, context | Context.AllowRegExp, Token.DefaultKeyword)) {
    let declaration;
    switch (state.token) {
      case Token.FunctionKeyword:
        declaration = parseFunctionDeclaration(state, context | Context.Default, /* isAsync */ 0, bindingType);
        break;
      case Token.AsyncKeyword:
        declaration = parseFunctionDeclaration(state, context | Context.Default, /* isAsync */ 1, bindingType);
        break;
      case Token.ClassKeyword:
        declaration = parseClassDeclaration(state, context | Context.Default);
        break;
      default:
        declaration = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, startIndex);
        consumeSemicolon(state, context);
    }

    if (context & Context.ErrorRecovery) namedExports = createArray(state, namedExports, startIndex);

    return finishNode(
      state,
      context,
      startIndex,
      { type: 'ExportDeclaration', declaration, default: true, namedExports, fromClause, namedBinding },
      NodeType.ExportDeclaration
    );
  }

  if (state.token === Token.LeftBrace) {
    namedExports = parseExportSpecifierList(state, context, namedExports, startIndex) as any;
    if (state.token === Token.FromKeyword) fromClause = parseFromClause(state, context);
    consumeSemicolon(state, context);
    return finishNode(
      state,
      context,
      startIndex,
      { type: 'ExportDeclaration', namedExports, fromClause, namedBinding, declaration, default: false },
      NodeType.ExportDeclaration
    );
  }
  switch (state.token) {
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Let) as any;
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Const) as any;
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(state, context);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(state, context, /* isAsync */ 0, bindingType);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(state, context | Context.DisallowArrow, /* isAsync */ 1, bindingType);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context);
      break;

    case Token.Multiply: {
      nextToken(state, context);
      if (consumeOpt(state, context, Token.AsKeyword)) {
        namedBinding = parseIdentifierName(state, context);
      }
      fromClause = parseFromClause(state, context);
      consumeSemicolon(state, context);
      break;
    }
    default:
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  // Note: Needed for error recovery / incremental parsing
  if (context & Context.ErrorRecovery) namedExports = createArray(state, namedExports, startIndex);

  return finishNode(
    state,
    context,
    startIndex,
    { type: 'ExportDeclaration', namedExports, fromClause, namedBinding, declaration, default: false },
    NodeType.ExportDeclaration
  );
}

export function parseExportSpecifierList(
  state: ParserState,
  context: Context,
  namedExports: any,
  start: number
): Types.ExportSpecifier | Types.MissingList {
  if (state.token === Token.LeftBrace) {
    nextToken(state, context);
    while ((state.token & Constants.IdentfierName) > 0) {
      namedExports.push(parseExportSpecifier(state, context));
      if (state.token !== Token.RightBrace) consume(state, context, Token.Comma);
    }
    consume(state, context, Token.RightBrace);
    if (context & Context.ErrorRecovery) namedExports = createArray(state, namedExports, start);

    return namedExports;
  }

  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return createMissingList(state.startIndex, namedExports);
}

export function parseExportSpecifier(state: ParserState, context: Context): Types.ExportSpecifier {
  const startIndex = state.startIndex;
  const name = parseIdentifierName(state, context);
  if (consumeOpt(state, context, Token.AsKeyword)) {
    const exportedName = parseIdentifierName(state, context);
    return finishNode(
      state,
      context,
      startIndex,
      { type: 'ExportSpecifier', name, exportedName },
      NodeType.ExportSpecifier
    );
  }
  return finishNode(
    state,
    context,
    startIndex,
    { type: 'ExportSpecifier', name, exportedName: null },
    NodeType.ExportSpecifier
  );
}

// FromClause : `from` ModuleSpecifier
export function parseFromClause(state: ParserState, context: Context): Types.StringLiteral {
  consume(state, context, Token.FromKeyword);
  if (state.token !== Token.StringLiteral) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  return parseStringLiteral(state, context);
}

// ImportCall :
//  import
export function parseImportCallFromModule(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.ExpressionStatement {
  let expression = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  consume(state, context, Token.RightParen);
  if ((state.token & (Token.IsBinaryOp | Token.IsMember | Token.IsAssignOp)) !== 0) {
    expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);
  }
  expression = finishNode(state, context, start, { type: 'ImportCall', import: expression }, NodeType.ImportCall);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}

// ImportMeta:
//   import.meta
export function parseImportMetaFromModule(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.ExpressionStatement {
  consume(state, context, Token.MetaKeyword);
  let expression = finishNode(state, context, start, { type: 'ImportMeta' }, NodeType.ImportMeta);
  state.assignable = false;
  expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, state.startIndex);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}

// ExpressionStatement :
//   [lookahead != `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` ] Expression `;`
export function parseExpressionStatement(
  state: ParserState,
  context: Context,
  expression: Types.Expression,
  start: number
): Types.ExpressionStatement | Types.LabelledStatement {
  consumeSemicolon(state, context);
  return finishNode(state, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}
// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpressions(state: ParserState, context: Context): Types.Expression {
  const startIndex = state.startIndex;
  const expr = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, startIndex);
  return parseCommaOperator(state, context, expr, startIndex);
}

export function parseCommaOperator(
  state: ParserState,
  context: Context,
  expr: Types.Expression,
  start: number
): Types.CommaOperator | Types.Expression {
  if (state.token !== Token.Comma) return expr;
  nextToken(state, context | Context.AllowRegExp);
  let leafs = [expr];
  do {
    leafs.push(parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start));
  } while (consumeOpt(state, context | Context.AllowRegExp, Token.Comma));
  if (context & Context.ErrorRecovery) leafs = createArray(state, leafs, start);
  return finishNode(state, context, start, { type: 'CommaOperator', leafs }, NodeType.CommaOperator);
}

// AssignmentExpression :
//   ConditionalExpression
//   [+Yield] YieldExpression
//   ArrowFunction
//   AsyncArrowFunction
//   LeftHandSideExpression `=` AssignmentExpression
//   LeftHandSideExpression AssignmentOperator AssignmentExpression
//   [*LogicalAssignment] LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
//
// AssignmentOperator : one of
//   *= /= %= += -= <<= >>= >>>= &= ^= |= **=
//
// LogicalAssignmentOperator : one of
//   &&= ||= ??=
export function parseAssignmentExpression(
  state: ParserState,
  context: Context,
  left: any,
  start: number
): Types.AssignmentExpression | Types.Expression {
  if (!state.assignable)
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidLHS, DiagnosticKind.Error);
  const operator = KeywordDescTable[state.token & Token.Type] as Types.AssignmentOperator;
  nextToken(state, context | Context.AllowRegExp);
  const right = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    { type: 'AssignmentExpression', left, operator, right },
    NodeType.AssignmentExpression
  );
}

// ConditionalExpression :
//   ShortCircuitExpression
//   ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
//
// ShortCircuitExpression :
//   LogicalORExpression
//   CoalesceExpression
//
// CoalesceExpression :
//   CoalesceExpressionHead `??` BitwiseORExpression
//
// CoalesceExpressionHead :
//   CoalesceExpression
//   BitwiseORExpression
export function parseConditionalExpression(
  state: ParserState,
  context: Context,
  shortCircuit: Types.Expression,
  bindingType: BindingType,
  start: number
): Types.ConditionalExpression {
  const consequent = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  consume(state, context | Context.AllowRegExp, Token.Colon);
  const alternate = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    { type: 'ConditionalExpression', shortCircuit, consequent, alternate },
    NodeType.ConditionalExpression
  );
}

// `ExponentiationExpression`,
// `MultiplicativeExpression`,
// `AdditiveExpression`,
// `ShiftExpression`,
// `RelationalExpression`,
// `EqualityExpression`,
// `BitwiseANDExpression`,
// `BitwiseXORExpression`,
// `BitwiseORExpression`,
// `LogicalANDExpression`,
// `LogicalORExpression`
export function parseBinaryExpression(
  state: ParserState,
  context: Context,
  left: Types.Expression,
  minPrec: number,
  start: number
): Types.Expression {
  let t: Token;
  let prec: number;
  let right;
  const bit = -((context & Context.DisallowIn) > 0) & Token.InKeyword;
  do {
    t = state.token;
    prec = t & Token.Precedence;
    if (prec + (((t === Token.Exponentiate) as any) << 8) - (((bit === t) as any) << 12) <= minPrec) return left;
    nextToken(state, context | Context.AllowRegExp);

    right = parseBinaryExpression(
      state,
      context,
      parseExpression(state, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, 0, state.startIndex),
      t & Token.Precedence,
      start
    );
    left = finishNode(
      state,
      context,
      start,
      { type: 'BinaryExpression', left, right, operator: KeywordDescTable[t & Token.Type] as Types.BinaryOperator },
      NodeType.BinaryExpression
    );
    state.assignable = false;
  } while ((state.token & Token.IsBinaryOp) > 0);

  return left;
}

// MemberExpression :
//   PrimaryExpression
//   MemberExpression[
//   MemberExpression
//   MemberExpression
//   SuperProperty
//   MetaProperty
// new MemberExpression
export function parseMemberExpression(
  state: ParserState,
  context: Context,
  member: any,
  start: number
): Types.MemberExpression | Types.CallExpression | Types.OptionalExpression | Types.TaggedTemplate {
  switch (state.token as Token) {
    /* Property */
    case Token.Period:
      state.assignable = true;
      nextToken(state, context | Context.AllowRegExp);
      if ((state.token & Constants.IdentfierName) === 0)
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDotProperty, DiagnosticKind.Error);
      const expression = parseIdentifierName(state, context);
      return finishNode(
        state,
        context,
        start,
        { type: 'MemberExpression', member, expression, computed: false },
        NodeType.MemberExpression
      );

    /* Property */
    case Token.LeftBracket: {
      nextToken(state, context | Context.AllowRegExp);
      const expression = parseExpressions(state, context);
      consume(state, context, Token.RightBracket);
      state.assignable = true;
      return finishNode(
        state,
        context,
        start,
        { type: 'MemberExpression', member, expression, computed: true },
        NodeType.MemberExpression
      );
    }

    /* Call */
    case Token.LeftParen:
      const args = parseArguments(state, context);
      state.assignable = false;
      return finishNode(
        state,
        context,
        start,
        { type: 'CallExpression', expression: member, arguments: args },
        NodeType.CallExpression
      );

    /* Optional Property */
    case Token.QuestionMarkPeriod:
      state.assignable = false;
      return finishNode(
        state,
        context,
        start,
        { type: 'OptionalExpression', member, chain: parseMemberOrCallChain(state, context) },
        NodeType.OptionalExpression
      );

    /* Tagged template */
    case Token.TemplateCont:
    case Token.TemplateTail:
      const literal =
        state.token === Token.TemplateTail
          ? parseTemplateLiteral(state, context)
          : parseTemplateExpression(state, context | Context.TaggedTemplate);
      member = finishNode(state, context, start, { type: 'TaggedTemplate', member, literal }, NodeType.TaggedTemplate);
      break;
  }
  return member;
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
export function parseMemberOrCallChain(
  state: ParserState,
  context: Context
): Types.MemberChain | Types.CallChain | any {
  consume(state, context, Token.QuestionMarkPeriod);
  if (state.token === Token.QuestionMarkPeriod) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  let property: Types.IdentifierName | Types.Expression | null = null;
  let chain: Types.MemberChain | Types.CallChain | null = null;
  let start = state.startIndex;
  let computed = false;

  if (state.token === Token.LeftParen) {
    const arg = parseArguments(state, context);
    chain = finishNode(state, context, start, { type: 'CallChain', chain, arguments: arg }, NodeType.CallChain);
  } else if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    property = parseExpressions(state, context);
    consume(state, context, Token.RightBracket);
    computed = true;
    state.assignable = false;
    chain = finishNode(state, context, start, { type: 'MemberChain', chain, property, computed }, NodeType.MemberChain);
  } else if (state.token === Token.TemplateCont || state.token === Token.TemplateTail) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.OptionalChainingNoTemplate,
      DiagnosticKind.Error
    );
  } else {
    property = parseIdentifierName(state, context);
    chain = finishNode(state, context, start, { type: 'MemberChain', chain, property, computed }, NodeType.MemberChain);
  }

  state.assignable = false;

  while (true) {
    start = state.startIndex;
    if (state.token === Token.LeftParen) {
      computed = false;
      property = null;
      state.assignable = false;
      const args: Types.Arguments[] = parseArguments(state, context);
      chain = finishNode(state, context, start, { type: 'CallChain', chain, arguments: args }, NodeType.CallChain);
    } else if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
      property = parseExpressions(state, context);
      computed = true;
      state.assignable = false;
      consume(state, context, Token.RightBracket);
      chain = finishNode(
        state,
        context,
        start,
        { type: 'MemberChain', chain, property, computed },
        NodeType.MemberChain
      );
    } else if (state.token === Token.TemplateCont || state.token === Token.TemplateTail) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.OptionalChainingNoTemplate,
        DiagnosticKind.Error
      );
      return chain;
    } else if (consumeOpt(state, context | Context.AllowRegExp, Token.Period)) {
      computed = false;
      state.assignable = false;
      property = parseIdentifierName(state, context);
      chain = finishNode(
        state,
        context,
        start,
        { type: 'MemberChain', chain, property, computed },
        NodeType.MemberChain
      );
    } else {
      state.assignable = false;
      if ((state.token & (Token.Keyword | Token.IsIdentifier | Token.Contextual)) === 0) return chain;
      computed = false;
      state.assignable = false;
      property = parseIdentifierName(state, context);
      chain = finishNode(
        state,
        context,
        start,
        { type: 'MemberChain', chain, property, computed },
        NodeType.MemberChain
      );
    }
  }
}

// Arguments :
//   ArgumentList
//   ArgumentList,
export function parseArguments(state: ParserState, context: Context): Types.Arguments[] {
  let args: Types.Arguments[] = [];
  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  if (context & Context.ErrorRecovery) {
    const start = state.startIndex;
    while (state.token & Constants.DelimitedList) {
      args.push(parseListElements(state, context, parseArgumentsList));
      if (consumeOpt(state, context, Token.Comma)) continue;
      if ((state.token & Constants.DelimitedList) === 0) break;
      consume(state, context, Token.Comma);
    }
    args = createArray(state, args, start);
    consume(state, context, Token.RightParen);
    return args;
  }

  while (state.token & Constants.DelimitedList) {
    args.push(parseArgumentsList(state, context));
    if (!consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      break;
    }
  }

  consume(state, context, Token.RightParen);
  return args;
}

// ArgumentList
//
// AssignmentExpression
// ...AssignmentExpression
//
// ArgumentList, AssignmentExpression
// ArgumentList, ...AssignmentExpression
export function parseArgumentsList(state: ParserState, context: Context): Types.Expression | Types.SpreadElement {
  const start = state.startIndex;
  if (state.token === Token.Ellipsis) return parseSpreadElement(state, context);
  return parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
}

// SpreadElement :
//  ...AssignmentExpression
export function parseSpreadElement(state: ParserState, context: Context): Types.SpreadElement {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  const argument = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
  return finishNode(state, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
}

// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpression(
  state: ParserState,
  context: Context,
  minPrec: Precedence,
  bindingType: BindingType,
  allowCalls: boolean,
  canAssign: 0 | 1,
  start: number
): any {
  let expr = (void 0 as unknown) as any;

  /**
   * AwaitExpression :
   *  awaitUnaryExpression
   */

  if (context & Context.Await && state.token === Token.AwaitKeyword) {
    return parseAwaitExpression(state, context, bindingType);
  }

  /**
   * YieldExpression :
   *
   * yield
   * yield[no LineTerminator here] AssignmentExpression
   * yield[no LineTerminator here] *AssignmentExpression
   */
  if (context & Context.Yield && state.token === Token.YieldKeyword) {
    return parseYieldExpression(state, context, bindingType);
  }

  /**
   * UnaryExpression :
   *   LeftHandSideExpression
   *   delete UnaryExpression
   *   void UnaryExpression
   *   typeof UnaryExpression
   *   + UnaryExpression
   *   - UnaryExpression
   *   ~ UnaryExpression
   *   ! UnaryExpression
   *   +Await] AwaitExpression
   */
  if (state.token & Token.IsUnaryOp) {
    expr = parseUnaryExpression(state, context, bindingType);
  } else {
    /**
     * UpdateExpression :
     *   ++ UnaryExpression
     *   -- UnaryExpression
     *
     * In this is parsed as PrefixUpdateExpression
     */

    if ((state.token & Token.IsUpdateOp) > 0) {
      expr = parsePrefixUpdateExpression(state, context, bindingType);
    } else {
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

      if (state.token & (Token.IsIdentifier | Token.Contextual | Token.FutureKeyword)) {
        if (state.token === Token.AsyncKeyword) {
          expr = parseFunctionExpression(state, context, /* isAsync */ 1, canAssign, bindingType);
        } else {
          const token = state.token;

          expr = parseIdentifierReference(state, context | Context.TaggedTemplate, bindingType);

          if (state.token === Token.Arrow) {
            expr = parseArrowAfterIdentifier(state, context, expr, bindingType, /* isAsync */ 0, canAssign, start);
          } else if (token === Token.LetKeyword) {
            if (context & Context.Strict) {
              addDiagnostic(
                state,
                context,
                DiagnosticSource.Parser,
                DiagnosticCode.StrictInvalidLetInExprPos,
                DiagnosticKind.Error
              );
            }
            // The BoundNames of LexicalDeclaration and ForDeclaration must not
            // contain 'let'.
            if (bindingType & (BindingType.Let | BindingType.Const)) {
              addDiagnostic(
                state,
                context,
                DiagnosticSource.Parser,
                DiagnosticCode.InvalidLetConstBinding,
                DiagnosticKind.Error
              );
            }
          }
        }
      } else {
        switch (state.token) {
          case Token.NumericLiteral:
            expr = parseNumericLiteral(state, context);
            break;
          case Token.BigIntLiteral:
            expr = parseBigIntLiteral(state, context);
            break;
          case Token.StringLiteral:
            expr = parseStringLiteral(state, context);
            break;
          case Token.NullKeyword:
            expr = parseNullLiteral(state, context);
            break;
          case Token.FalseKeyword:
          case Token.TrueKeyword:
            expr = parseBooleanLiteral(state, context);
            break;
          case Token.ThisKeyword:
            expr = parseThisExpression(state, context);
            break;
          case Token.LeftBracket:
            expr = parseArrayLiteral(state, context);
            break;
          case Token.LeftBrace:
            expr = parseObjectLiteral(state, context);
            break;
          case Token.LeftParen:
            expr = parseCoverParenthesizedExpressionAndArrowParameterList(
              state,
              context,
              canAssign,
              bindingType | BindingType.ArgumentList
            );
            break;
          case Token.FunctionKeyword:
            expr = parseFunctionExpression(state, context, /* isAsync */ 0, canAssign, bindingType);
            break;
          case Token.ClassKeyword:
            expr = parseClassExpression(state, context);
            break;
          case Token.NewKeyword:
            expr = parseNewExpression(state, context, bindingType);
            break;
          case Token.ImportKeyword:
            expr = parseImportMetaOrCall(state, context);
            break;
          case Token.SuperKeyword:
            expr = parseSuperPropertyOrCall(state, context);
            break;
          case Token.RegularExpression:
            expr = parseRegularExpressionLiteral(state, context);
            break;
          case Token.TemplateTail:
            expr = parseTemplateLiteral(state, context);
            break;
          case Token.TemplateCont:
            expr = parseTemplateExpression(state, context);
            break;
          default:
            expr = createIdentifier(state, context, tokenErrors(state.token));
        }
      }

      if (Precedence.LeftHandSide < minPrec) {
        return expr;
      }
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

    while (state.token & (allowCalls ? Token.LeftHandSide : Token.IsMember)) {
      expr = parseMemberExpression(state, context, expr, start);
    }
    /**
     * UpdateExpression :
     *  LeftHandSideExpression
     *  LeftHandSideExpression [no LineTerminator here] ++
     *  LeftHandSideExpression [no LineTerminator here] --
     *
     * In Escaya this is parsed as PostfixUpdateExpression.
     */
    if (state.token & Token.IsUpdateOp) {
      expr = parsePostfixUpdateExpression(state, context, expr);
    }
  }

  if (Precedence.Binary < minPrec) {
    return expr;
  }

  /**
   * MultiplicativeExpression :
   *   ExponentiationExpression
   *   MultiplicativeExpression * / % ExponentiationExpression
   *
   * AdditiveExpression :
   *   MultiplicativeExpression
   *   AdditiveExpression + MultiplicativeExpression
   *   AdditiveExpression - MultiplicativeExpression
   *
   * RelationalExpression :
   *   ShiftExpression
   *   RelationalExpression < ShiftExpression
   *   RelationalExpression > ShiftExpression
   *   RelationalExpression <= ShiftExpression
   *   RelationalExpression >= ShiftExpression
   *   RelationalExpression instanceof ShiftExpression
   *   RelationalExpression in ShiftExpression
   *
   * EqualityExpression :
   *   RelationalExpression
   *   EqualityExpression == != === !== RelationalExpression
   *
   * LogicalANDExpression :
   *   BitwiseORExpression
   *   LogicalANDExpression && BitwiseORExpression
   *
   * LogicalORExpression :
   *   LogicalANDExpression
   *   LogicalORExpression || LogicalANDExpression
   *
   * CoalesceExpression :
   *   CoalesceExpressionHead ?? BitwiseORExpression
   *
   * CoalesceExpressionHead :
   *   CoalesceExpression
   *   BitwiseORExpression
   *
   * ShortCircuitExpression :
   *   LogicalORExpression
   *   CoalesceExpression
   */
  if ((state.token & Token.IsBinaryOp) > 0) {
    expr = parseBinaryExpression(state, context, expr, minPrec, start);
  }

  /**
   * ConditionalExpression :
   *   ShortCircuitExpression
   *   ShortCircuitExpression ? AssignmentExpression : AssignmentExpression
   */
  if (consumeOpt(state, context | Context.AllowRegExp, Token.QuestionMark)) {
    expr = parseConditionalExpression(state, context, expr, bindingType, start);
  }

  /**
   * AssignmentExpression :
   *   ConditionalExpression
   *   YieldExpression
   *   ArrowFunction
   *   AsyncArrowFunction
   *   LeftHandSideExpression = AssignmentExpression
   *   [*LogicalAssignment] LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
   *
   */
  if (state.token & Token.IsAssignOp) {
    expr = parseAssignmentExpression(state, context, expr, start);
  }

  return expr;
}

// Note: For easier to find out whether we are dealing with a "simple assignment target",
// we extended the LeftSideExpression productions.
// like so:
//
//   MemberExpression : See 12.3
//      PrimaryExpression
//      MemberExpression[Expression]
//      MemberExpression.IdentifierName
//
//   CallExpression : See 11.2
//      MemberExpression
//      CallExpression Arguments
//      CallExpression[Expression]
//      CallExpression.IdentifierName
//
//   ExponentiationExpression : See 12.6
//
//   MultiplicativeExpression : See 12.7
//
//   AdditiveExpression       : See 12.8
//
//   ShiftExpression          : See 12.9
//
//   RelationalExpression     : See 12.10
//
//   EqualityExpression       : See 12.11
//
//   BitwiseANDExpression     : See 12.12
//
//   BitwiseXORExpression     : See 12.12
//
//   BitwiseORExpression      : See 12.12
//
//   LogicalANDExpression     : See 12.13
//
//   LogicalORExpression      : See 12.13
//
//   ConditionalExpression : See 12.14
//     ShortCircuitExpression
//     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
//
//   AssignmentExpression : 12.15
//     ConditionalExpression
//     LeftHandSideExpression `=` AssignmentExpression
//     LeftHandSideExpression AssignmentOperator AssignmentExpression
//     [*LogicalAssignment] LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
//
// We do this by first parsing out the first part of the expression, which tells us the
// "simple assignment target". If that's assignment then it is a simple assignment, and
// we do not need to parse anything more.
//
// If there is anything more to parse for the expression, then we know that this is no longer
// a "simple assignment target", and "parseLeftHandSide" kicks in and let us probably abstract it.
//
export function parseLeftHandSide(
  state: ParserState,
  context: Context,
  expr: any,
  minPrec: Precedence,
  bindingType: BindingType,
  start: number
): any {
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
  while ((state.token & Token.LeftHandSide) > 0) {
    expr = parseMemberExpression(state, context, expr, start);
  }

  /**
   * UpdateExpression :
   *  LeftHandSideExpression
   *  LeftHandSideExpression [no LineTerminator here] ++
   *  LeftHandSideExpression [no LineTerminator here] --
   *
   * In Escaya this is parsed as PostfixUpdateExpression.
   */
  if (state.token & Token.IsUpdateOp) {
    expr = parsePostfixUpdateExpression(state, context, expr);
  }

  if (Precedence.Binary < minPrec) {
    return expr;
  }

  /**
   * MultiplicativeExpression :
   *   ExponentiationExpression
   *   MultiplicativeExpression * / % ExponentiationExpression
   *
   * AdditiveExpression :
   *   MultiplicativeExpression
   *   AdditiveExpression + MultiplicativeExpression
   *   AdditiveExpression - MultiplicativeExpression
   *
   * RelationalExpression :
   *   ShiftExpression
   *   RelationalExpression < ShiftExpression
   *   RelationalExpression > ShiftExpression
   *   RelationalExpression <= ShiftExpression
   *   RelationalExpression >= ShiftExpression
   *   RelationalExpression instanceof ShiftExpression
   *   RelationalExpression in ShiftExpression
   *
   * EqualityExpression :
   *   RelationalExpression
   *   EqualityExpression == != === !== RelationalExpression
   *
   * LogicalANDExpression :
   *   BitwiseORExpression
   *   LogicalANDExpression && BitwiseORExpression
   *
   * LogicalORExpression :
   *   LogicalANDExpression
   *   LogicalORExpression || LogicalANDExpression
   *
   * CoalesceExpression :
   *   CoalesceExpressionHead ?? BitwiseORExpression
   *
   * CoalesceExpressionHead :
   *   CoalesceExpression
   *   BitwiseORExpression
   *
   * ShortCircuitExpression :
   *   LogicalORExpression
   *   CoalesceExpression
   */
  if ((state.token & Token.IsBinaryOp) > 0) {
    expr = parseBinaryExpression(state, context, expr, minPrec, start);
  }

  /**
   * ConditionalExpression :
   *   ShortCircuitExpression
   *   ShortCircuitExpression ? AssignmentExpression : AssignmentExpression
   */
  if (consumeOpt(state, context | Context.AllowRegExp, Token.QuestionMark)) {
    expr = parseConditionalExpression(state, context, expr, bindingType, start);
  }

  /**
   * AssignmentExpression :
   *   ConditionalExpression
   *   YieldExpression
   *   ArrowFunction
   *   AsyncArrowFunction
   *   LeftHandSideExpression = AssignmentExpression
   *   [*LogicalAssignment] LeftHandSideExpression LogicalAssignmentOperator AssignmentExpression
   *
   */
  if (state.token & Token.IsAssignOp) {
    expr = parseAssignmentExpression(state, context, expr, start);
  }

  return expr;
}

// RegularExpressionLiteral :
//   `/` RegularExpressionBody `/` RegularExpressionFlags
export function parseRegularExpressionLiteral(state: ParserState, context: Context): Types.RegularExpressionLiteral {
  const { regExpPattern, regExpFlags, startIndex } = state;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(
    state,
    context,
    startIndex,
    { type: 'RegularExpressionLiteral', pattern: regExpPattern, flags: regExpFlags },
    NodeType.RegularExpressionLiteral
  );
}

// NumericLiteral
export function parseNumericLiteral(state: ParserState, context: Context): Types.NumericLiteral {
  const value = state.tokenValue;
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'NumericLiteral', value }, NodeType.NumericLiteral);
}

// TemplateLiteral
export function parseTemplateLiteral(state: ParserState, context: Context): Types.TemplateLiteral {
  const start = state.startIndex;
  nextToken(state, context);
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  state.assignable = false;
  return finishNode(state, context, start, { type: 'TemplateLiteral', value, raw }, NodeType.TemplateLiteral);
}

// StringLiteral
export function parseStringLiteral(state: ParserState, context: Context): Types.StringLiteral {
  const value = state.tokenValue;
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'StringLiteral', value }, NodeType.StringLiteral);
}

// BigIntLiteral
export function parseBigIntLiteral(state: ParserState, context: Context): Types.BigIntLiteral {
  const value = state.tokenValue;
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'BigIntLiteral', value }, NodeType.BigIntLiteral);
}

// BooleanLiteral
export function parseBooleanLiteral(state: ParserState, context: Context): Types.BooleanLiteral {
  const value = KeywordDescTable[state.token & Token.Type] === 'true';
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'BooleanLiteral', value }, NodeType.BooleanLiteral);
}

// NullLiteral
export function parseNullLiteral(state: ParserState, context: Context): Types.NullLiteral {
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'NullLiteral', value: null }, NodeType.NullLiteral);
}

// ThisExpression
export function parseThisExpression(state: ParserState, context: Context): Types.ThisExpression {
  const startIndex = state.startIndex;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(state, context, startIndex, { type: 'ThisExpression' }, NodeType.ThisExpression);
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
export function parseUnaryExpression(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.UnaryExpression {
  const start = state.startIndex;
  const t = state.token;
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  const operator = KeywordDescTable[t & Token.Type] as Types.UnaryOperator;
  nextToken(state, context | Context.AllowRegExp);
  const operand = parseExpression(state, context, Precedence.LeftHandSide, bindingType, true, 0, start);
  if (state.token === Token.Exponentiate) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidExponentation, DiagnosticKind.Error);
  }
  if ((context & Context.Strict) === Context.Strict) {
    // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
    // UnaryExpression is a direct reference to a variable, function argument, or function name
    if (t === Token.DeleteKeyword && operand.type === 'IdentifierReference') {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.StrictDelete, DiagnosticKind.Error);
    }
  }
  state.assignable = false;
  return finishNode(state, context, start, { type: 'UnaryExpression', operator, operand }, NodeType.UnaryExpression);
}

// UpdateExpression :
//   LeftHandSideExpression
//   LeftHandSideExpression [no LineTerminator here] `++`
//   LeftHandSideExpression [no LineTerminator here] `--`
//   `++` UnaryExpression
//   `--` UnaryExpression
export function parsePostfixUpdateExpression(
  state: ParserState,
  context: Context,
  operand: Types.LeftHandSideExpression
): Types.PostfixUpdateExpression | Types.LeftHandSideExpression {
  if (state.hasLineTerminator) return operand;
  if (!state.assignable)
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidIncDecTarget, DiagnosticKind.Error);
  const start = state.startIndex;
  const operator = KeywordDescTable[state.token & Token.Type] as Types.UpdateOperator;
  nextToken(state, context);
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    { type: 'PostfixUpdateExpression', operator, operand },
    NodeType.PostfixUpdateExpression
  );
}

// UpdateExpression :
//   LeftHandSideExpression
//   LeftHandSideExpression [no LineTerminator here] `++`
//   LeftHandSideExpression [no LineTerminator here] `--`
//   `++` UnaryExpression
//   `--` UnaryExpression
export function parsePrefixUpdateExpression(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.PrefixUpdateExpression {
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  const start = state.startIndex;
  const operator = KeywordDescTable[state.token & Token.Type] as Types.UpdateOperator;
  nextToken(state, context | Context.AllowRegExp);
  const operand = parseExpression(state, context, Precedence.LeftHandSide, bindingType, true, 0, start);
  if (!state.assignable) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidIncDecTarget, DiagnosticKind.Error);
  }
  state.assignable = false;
  return finishNode(
    state,
    context,
    start,
    { type: 'PrefixUpdateExpression', operator, operand },
    NodeType.PrefixUpdateExpression
  );
}

//An identifier that is a PrimaryExpression (e.g., id in id(), id.prop, id +
// IdentifierReference:
//   Identifier
//   yield
//   await
//
export function parseIdentifierReference(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingIdentifier | Types.IdentifierReference {
  if (context & (Context.Strict | Context.Parameters) && state.token === Token.YieldKeyword) {
  } else if (
    state.token !== Token.LetKeyword &&
    context & Context.Strict &&
    (state.token & Token.FutureKeyword) === Token.FutureKeyword
  ) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedStrictReserved,
      DiagnosticKind.Error
    );
  }

  const start = state.startIndex;
  const name = state.tokenValue as string;
  state.assignable = true;
  nextToken(state, context);

  if (bindingType & BindingType.Pattern) {
    return finishNode(state, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(state, context, start, { type: 'IdentifierReference', name }, NodeType.IdentifierReference);
}

// IdentifierReference:
//   Identifier
//   yield
//   await
//
export function parseIdentifierReferenceFromValue(
  state: ParserState,
  context: Context,
  name: string,
  bindingType: BindingType,
  start: number
): Types.BindingIdentifier | Types.IdentifierReference {
  state.assignable = true;

  if (bindingType & BindingType.Pattern) {
    return finishNode(state, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(state, context, start, { type: 'IdentifierReference', name }, NodeType.IdentifierReference);
}

export function parseIdentifierNameFromValue(
  state: ParserState,
  context: Context,
  name: string,
  bindingType: BindingType,
  start: number
): Types.BindingIdentifier | Types.IdentifierName {
  state.assignable = true;

  if (bindingType & BindingType.Pattern) {
    return finishNode(state, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(state, context, start, { type: 'IdentifierName', name }, NodeType.IdentifierReference);
}
export function parseIdentifierName(state: ParserState, context: Context): Types.IdentifierName {
  const start = state.startIndex;
  const name = state.tokenValue as string;
  state.assignable = true;
  nextToken(state, context);
  return finishNode(state, context, start, { type: 'IdentifierName', name }, NodeType.IdentifierName);
}

// BindingIdentifier :
//   Identifier
//   yield
//   await
export function parseBindingIdentifier(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingIdentifier {
  const { token, startIndex, tokenValue } = state;

  if ((token & Constants.IdentfierName) === 0) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidBindingIdentifier,
      DiagnosticKind.Error
    );
  }

  if ((token & Token.Keyword) === Token.Keyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidKeyword, DiagnosticKind.Error);
  }

  if (context & Context.Strict && (token & Token.FutureKeyword) === Token.FutureKeyword) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedStrictReserved,
      DiagnosticKind.Error
    );
  }

  // The BoundNames of LexicalDeclaration and ForDeclaration must not
  // contain 'let'. (CatchParameter is the only lexical binding form
  // without this restriction.)
  if (bindingType & (BindingType.Let | BindingType.Const) && token === Token.LetKeyword) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidLetConstBinding, DiagnosticKind.Error);
  }

  state.assignable = true;
  nextToken(state, context);
  return finishNode(
    state,
    context,
    startIndex,
    { type: 'BindingIdentifier', name: tokenValue },
    NodeType.BindingIdentifier
  );
}
// parseSpreadOrExpressionList
// ArrayLiteral :
//   `[` `]`
//   `[` Elision `]`
//   `[` ElementList `]`
//   `[` ElementList `,` `]`
//   `[` ElementList `,` Elision `]`
export function parseArrayLiteral(state: ParserState, context: Context): Types.ArrayLiteral {
  const start = state.startIndex;
  const expr = parseArrayLiteralOrPattern(state, context, false, BindingType.AllowLHS | BindingType.Literal, start);
  if (state.destructible & Destructible.MustDestruct) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidDestructuringTarget,
      DiagnosticKind.Error
    );
  }
  return expr;
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
  bindingType: BindingType,
  start: number
): Types.ArrayBindingPattern {
  nextToken(state, context | Context.AllowRegExp);
  let leafs = [];
  let destructible = Destructible.None;
  if (context & Context.ErrorRecovery) {
    while (state.token & Constants.DelimitedList) {
      if (consumeOpt(state, context, Token.Comma)) {
        leafs.push(finishNode(state, context, state.startIndex, { type: 'Elision' }, NodeType.Elision));
      } else {
        leafs.push(parseElementList(state, context, bindingType));
        destructible |= state.destructible;
        //
        // We parse the array as an delimited list, and accept missing commas to prevent
        // an incomplete multiline array.
        //
        // Example
        //
        // 'var a = [1,'
        //
        // and
        //
        // 'var a = [
        //   1, '
        //
        // are now treated as single-line array instead
        //
        if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
        if ((state.token & state.token & Constants.DelimitedList) === 0 || state.token === Token.RightBracket) break;
      }
    }
    leafs = createArray(state, leafs, start);
  } else {
    while (state.token !== Token.RightBracket) {
      if (consumeOpt(state, context, Token.Comma)) {
        leafs.push(finishNode(state, context, state.startIndex, { type: 'Elision' }, NodeType.Elision));
      } else {
        leafs.push(parseElementList(state, context, bindingType));
        destructible |= state.destructible;
        if (state.token !== Token.Comma) break;
        nextToken(state, context | Context.AllowRegExp);
      }
    }
  }
  consume(state, context, Token.RightBracket);
  state.destructible = destructible;
  return finishNode(state, context, start, { type: 'ArrayBindingPattern', leafs }, NodeType.ArrayBindingPattern);
}

// ArrayAssignmentPattern :
//   `[` `]`
//   `[` ElisionoptAssignmentRestElement `]`
//   `[` AssignmentElementList `]`
//   `[` AssignmentElementList `,` Elision `,` AssignmentRestElement `]`

export function parseArrayAssignmentPattern(
  state: ParserState,
  context: Context,
  leafs: any,
  start: number
): Types.ArrayAssignmentPattern {
  let i = leafs.length;

  // An while loop scale the best for large arrays, and a reversed while loop seem
  // to be the fastest way to iterate the array now when we need to convert to
  // assignment pattern
  while (i--) {
    reinterpretToAssignment(leafs[i], false);
  }
  if (context & Context.ErrorRecovery) leafs = createArray(state, leafs, start);
  return finishNode(state, context, start, { type: 'ArrayAssignmentPattern', leafs }, NodeType.ArrayAssignmentPattern);
}

// ArrayLiteral :
//   `[` `]`
//   `[` Elision `]`
//   `[` ElementList `]`
//   `[` ElementList `,` `]`
//   `[` ElementList `,` Elision `]`
//
// ArrayBindingPattern :
//   `[` `]`
//   `[` Elision `]`
//   `[` BindingElementList `]`
//   `[` BindingElementList `,` `]`
//   `[` BindingElementList `,` Elision `,` BindingRestElement `]`
export function parseArrayLiteralOrPattern(
  state: ParserState,
  context: Context,
  isPattern: boolean,
  bindingType: BindingType,
  start: number
): any {
  nextToken(state, context | Context.AllowRegExp);
  let leafs = [];
  let destructible = Destructible.None;

  if (context & Context.ErrorRecovery) {
    while (state.token & Constants.DelimitedList) {
      if (consumeOpt(state, context, Token.Comma)) {
        leafs.push(finishNode(state, context, state.startIndex, { type: 'Elision' }, NodeType.Elision));
      } else {
        leafs.push(parseElementList(state, context, bindingType));
        destructible |= state.destructible;
        //
        // We parse the array as an delimited list, and accept missing commas to prevent
        // an incomplete multiline array.
        //
        // Example
        //
        // 'var a = [1,'
        //
        // and
        //
        // 'var a = [
        //   1, '
        //
        // are now treated as single-line array instead
        //
        if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;

        if ((state.token & Constants.DelimitedList) === 0 || state.token === Token.RightBracket) break;
      }
    }
    leafs = createArray(state, leafs, start);
  } else {
    while (state.token !== Token.RightBracket) {
      if (consumeOpt(state, context, Token.Comma)) {
        leafs.push(finishNode(state, context, state.startIndex, { type: 'Elision' }, NodeType.Elision));
      } else {
        leafs.push(parseElementList(state, context, bindingType));
        destructible |= state.destructible;
        if (state.token !== Token.Comma) break;
        nextToken(state, context | Context.AllowRegExp);
      }
    }
  }

  consume(state, context, Token.RightBracket);

  state.destructible = destructible;

  if (!isPattern && (state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    return parseArrayAssignment(state, context, leafs, destructible, start, bindingType);
  }
  state.destructible = destructible;

  if (bindingType & BindingType.Pattern) {
    return finishNode(state, context, start, { type: 'ArrayBindingPattern', leafs }, NodeType.ArrayBindingPattern);
  }
  return finishNode(state, context, start, { type: 'ArrayLiteral', leafs }, NodeType.ArrayLiteral);
}

export function parseElementList(state: ParserState, context: Context, bindingType: BindingType): any {
  let destructible = Destructible.None;

  const start = state.startIndex;

  // Simple cases: "[a]", "[a,]", "[a = b]", "[a.[b] ...]",  "[a.b ... ]" and "[a.(b) ...]"'
  if (state.token & (Token.FutureKeyword | Constants.IdentifierOrKeyword)) {
    // '[a

    let left = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, start);

    // Simple cases: '[x]', '[x,y]'. This is an array with only one identifier,
    // and should be "destructible" except for a few valid identifiers / keywords
    // that can't be assigned to.
    // For example `true` and `typeof` are not destructible or assignable
    if (state.token === Token.RightBracket || state.token === Token.Comma) {
      state.destructible = state.assignable ? Destructible.None : Destructible.NotDestructible;
      return left;
    }
    let destructible = Destructible.None;

    // Another simple case: '[a = ... ]. This is an identifier followed by an assignment, '='.
    // The same rules applies here, and should be destructible unless this is a keyword.
    if (state.token === Token.Assign) {
      return parseAssignmentPattern(
        state,
        (context | Context.DisallowIn) ^ Context.DisallowIn,
        left,
        bindingType,
        start
      );
    }

    // Complex cases: '[x()]', '[x[y]]', '[x.y]', '[x.y = z]' etc.
    // In this case the identifier / keyword must have a "tail" - 'MemberExpression', except
    // for function parameters where different rules applies.
    // Example '[a.b]' and '[a.b] = b' is valid as a stand-alone, but as an
    // function parameter - 'function a([a.b]) {}' this is not destructible.

    destructible |=
      bindingType & BindingType.ArgumentList
        ? Destructible.Assignable
        : (bindingType & BindingType.Literal) !== BindingType.Literal
        ? Destructible.NotDestructible
        : 0;

    left = parseLeftHandSide(state, context, left, Precedence.LeftHandSide, bindingType, start);

    // Invalid case: '[x.(y) = z]'. This is an identifier followed by a
    // "tail" - 'MemberExpression' and in this case 'CallExpression'.
    // The latter is not 'assignable' so this is a not destructible.
    if (!state.assignable) destructible |= Destructible.NotDestructible;

    // No closing bracket - ']' after the "tail" - 'MemberExpression'. So this is not destructible.
    if (state.token !== Token.Assign && state.token !== Token.Comma && state.token !== Token.RightBracket) {
      destructible |= Destructible.NotDestructible;
    }

    // Complex cases: '[x.y = z]', '[x.[y] = z]','[x.y = z / foo]', '[x[y] = z / foo]'. A
    // "tail" - 'MemberExpression' is followed by an assignment - '=', binary expression etc.
    left = parseLeftHandSide(state, context, left, Precedence.Assign, bindingType, start);

    state.destructible = destructible;

    return left;
  }

  // If encounter "[[" or "[{", this is the start of a binding pattern.
  // Examples:
  //      [[ x ]]
  //      [{ x })
  if ((state.token & Token.IsPatternStart) > 0) {
    let left =
      state.token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(state, context, /* isPattern */ false, bindingType, start)
        : parseArrayLiteralOrPattern(state, context, /* isPattern */ false, bindingType, start);

    destructible = state.destructible;

    if (state.token !== Token.RightBracket && state.token !== Token.Comma) {
      if (destructible & Destructible.MustDestruct)
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.InvalidBindingDestruct,
          DiagnosticKind.Error
        );

      left = parseLeftHandSide(state, context, left, Precedence.LeftHandSide, bindingType, start);

      destructible = state.assignable ? Destructible.None : Destructible.NotDestructible;

      left = parseLeftHandSide(state, context, left, Precedence.Assign, bindingType, start);
    }

    state.destructible = destructible;

    return left;
  }

  // Simple case: "[..."
  if (state.token === Token.Ellipsis) {
    return parseSpreadOrRestElement(state, context, Token.RightBracket, bindingType, true, false, start);
  }

  const token = state.token;

  // Note: This cases are only destructible as assignment destructuring if 'simple assignment'.
  // Examples: '[5..length] = x', '[x().y = a] = z', '[x()[y] = a ] = z'
  let left = parseExpression(state, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, 1, start);

  if (state.token !== Token.Comma && state.token !== Token.RightBracket) {
    left = parseLeftHandSide(state, context, left, Precedence.Assign, bindingType, start);
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

export function parseArrayAssignment(
  state: ParserState,
  context: Context,
  leafs: any,
  destructible: Destructible,
  start: number,
  bindingType: BindingType
): Types.AssignmentExpression {
  // Cannot compound-assign to an array literal
  if (state.token !== Token.Assign) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.CompundArrLit, DiagnosticKind.Error);
  }

  if (destructible & Destructible.NotDestructible) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidBindingDestruct, DiagnosticKind.Error);
  }

  nextToken(state, context | Context.AllowRegExp);

  const left = parseArrayAssignmentPattern(state, context, leafs, destructible);

  const right = parseExpression(state, context, Precedence.Assign, bindingType, true, /* canAssign */ 1, start);

  state.destructible = (destructible | Destructible.MustDestruct) ^ Destructible.MustDestruct;

  return finishNode(
    state,
    context,
    start,
    { type: 'AssignmentExpression', left, operator: '=', right },
    NodeType.AssignmentExpression
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
  canAssign: 0 | 1,
  bindingType: BindingType
): Types.ParenthesizedExpression | Types.ArrowFunction | Types.IdentifierReference {
  const start = state.startIndex;

  nextToken(state, context | Context.AllowRegExp);

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  if (consumeOpt(state, context, Token.RightParen)) {
    if (state.token === Token.Arrow) {
      return parseArrowAfterGroup(state, context, [], Destructible.None, bindingType, 0, canAssign, start);
    }
    return createIdentifier(state, context, DiagnosticCode.ExpectedArrow) as any;
  }

  if (state.token === Token.Ellipsis) {
    const param = parseSpreadOrRestElement(state, context, Token.RightParen, bindingType, false, false, start);

    // Invalid cases: '(...[ 5 ]) => {}', '(...a = b) => b' etc.
    if (state.destructible & Destructible.NotDestructible) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidLHSDestructRHS,
        DiagnosticKind.Error
      );
    }

    consume(state, context, Token.RightParen);
    return parseArrowFunction(state, context, [param as Types.ArrowFormals], bindingType, /* isAsync */ 0, start);
  }

  let expression: any;
  let destructible = Destructible.None;

  if ((state.token & Constants.IdentfierName) > 0) {
    expression = parseExpression(state, context, Precedence.Primary, BindingType.AllowLHS, true, 1, start);

    if (state.token === Token.Comma || state.token === Token.RightParen) {
      if (!state.assignable) destructible |= Destructible.NotDestructible;
    } else {
      if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;

      expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);
    }
  } else if ((state.token & Token.IsPatternStart) > 0) {
    expression =
      state.token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(state, context, false, bindingType, start)
        : parseArrayLiteralOrPattern(state, context, false, bindingType, start);

    destructible |= state.destructible;

    state.assignable = false;

    if (state.token !== Token.Comma && state.token !== Token.RightParen) {
      if (destructible & Destructible.MustDestruct) {
        addDiagnostic(
          state,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.InvalidBindingDestruct,
          DiagnosticKind.Error
        );
      }
      expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);
      destructible |= !state.assignable ? Destructible.NotDestructible : Destructible.Assignable;
    }
  } else {
    destructible |= Destructible.NotDestructible;

    expression = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);

    if (state.token === Token.Comma) {
      expression = parseCommaOperator(state, context, expression, start);
    }

    consume(state, context, Token.RightParen);

    state.destructible = destructible;

    return finishNode(
      state,
      context,
      start,
      { type: 'ParenthesizedExpression', expression },
      NodeType.ParenthesizedExpression
    );
  }

  let isCommaOperator = false;
  // 12.16 Comma Operator
  if (state.token === Token.Comma) {
    let leafs: any[] = [expression];

    isCommaOperator = true;

    while (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) {
      if (state.token === Token.RightParen) {
        // Trailing comma before the closing parenthesis is valid in an arrow
        // function parameters list: `(a, b, ) => body`, so for now we are setting
        // the 'MustDestruct' mask so it will throw for cases like: `(a, b, )`.
        //
        // This can probably be done better because now it's throwing an incorrect
        // error mesage: 'Invalid destructuring assignment target'
        destructible |= Destructible.DisallowTrailing;
        break;
      }

      if ((state.token & Constants.IdentfierName) > 0) {
        expression = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, start);

        // (x, false) => y
        if (state.token === Token.Comma || state.token === Token.RightParen) {
          if (!state.assignable) destructible |= Destructible.NotDestructible;
        } else {
          if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;

          expression = parseLeftHandSide(state, context, expression, Precedence.LeftHandSide, bindingType, start);

          if (state.token !== Token.RightParen && state.token !== Token.Comma) {
            expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);
          }
        }
      } else if ((state.token & Token.IsPatternStart) > 0) {
        expression =
          state.token === Token.LeftBrace
            ? parseObjectLiteralOrPattern(state, context, false, bindingType, start)
            : parseArrayLiteralOrPattern(state, context, false, bindingType, start);

        destructible |= state.destructible;

        if (state.token !== Token.Comma && state.token !== Token.RightParen) {
          if (destructible & Destructible.MustDestruct) {
            addDiagnostic(
              state,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.InvalidBindingDestruct,
              DiagnosticKind.Error
            );
          }
          expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);

          destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
        }
      } else if (state.token === Token.Ellipsis) {
        expression = parseSpreadOrRestElement(state, context, Token.RightParen, bindingType, false, false, start);

        // '(a, ...b = 10) => c'
        if (state.destructible & Destructible.NotDestructible) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.InvalidLHSDestructRHS,
            DiagnosticKind.Error
          );
        }
        leafs.push(expression);

        destructible |= Destructible.MustDestruct;

        break;
      } else {
        destructible |= Destructible.NotDestructible;

        expression = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);

        if (state.token === Token.Comma) {
          expression = parseCommaOperator(state, context, expression, start);
        }

        consume(state, context, Token.RightParen);

        state.destructible = destructible;

        return finishNode(
          state,
          context,
          start,
          { type: 'ParenthesizedExpression', expression },
          NodeType.ParenthesizedExpression
        );
      }
      leafs.push(expression);
    }

    if (context & Context.ErrorRecovery) leafs = createArray(state, leafs, start);

    state.assignable = false;
    expression = finishNode(state, context, start, { type: 'CommaOperator', leafs }, NodeType.CommaOperator);
  }

  consume(state, context, Token.RightParen);

  // ArrowParameters :
  //   CoverParenthesizedExpressionAndArrowParameterList
  if (state.token === Token.Arrow) {
    return parseArrowAfterGroup(
      state,
      context,
      isCommaOperator ? expression : [expression],
      destructible,
      bindingType,
      0,
      canAssign,
      start
    );
  }

  if (destructible & (Destructible.DisallowTrailing | Destructible.MustDestruct)) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      destructible & Destructible.DisallowTrailing
        ? DiagnosticCode.InvalidTrailingComma
        : DiagnosticCode.InvalidDestructuringTarget,
      DiagnosticKind.Error
    );
  }

  state.destructible = destructible;

  return finishNode(
    state,
    context,
    start,
    { type: 'ParenthesizedExpression', expression },
    NodeType.ParenthesizedExpression
  );
}

// ObjectLiteral :
//   `{` `}`
//   `{` PropertyDefinitionList `}`
//   `{` PropertyDefinitionList `,` `}`
export function parseObjectLiteral(state: ParserState, context: Context): any {
  const start = state.startIndex;
  const expr = parseObjectLiteralOrPattern(state, context, false, BindingType.AllowLHS | BindingType.Literal, start);
  if (state.destructible & Destructible.MustDestruct) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidArrowDestructLHS,
      DiagnosticKind.Error
    );
  }
  return expr;
}

// ObjectBindingPattern :
//   `{` `}`
//   `{` BindingRestProperty `}`
//   `{` BindingPropertyList `}`
//   `{` BindingPropertyList `,` `}`
export function parseObjectBindingPattern(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.ObjectBindingPattern {
  nextToken(state, context);

  let properties: any = [];

  let destructible = Destructible.None;

  if (context & Context.ErrorRecovery) {
    while (state.token & Constants.DelimitedList) {
      properties.push(parsePropertyDefinition(state, context, bindingType, start));
      destructible |= state.destructible;
      //
      // We parse the array as an delimited list, and accept missing commas to prevent
      // an incomplete multiline array.
      //
      // Example
      //
      // 'var a = { 1,'
      //
      // and
      //
      // 'var a = {
      //   1, '
      //
      // are now treated as single-line array instead
      //
      if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
      if ((state.token & state.token & Constants.DelimitedList) === 0 || state.token === Token.RightBrace) break;
    }

    consume(state, context, Token.RightBrace);

    state.destructible = destructible;

    return finishNode(
      state,
      context,
      start,
      { type: 'ObjectBindingPattern', properties: createArray(state, properties, start) },
      NodeType.ObjectBindingPattern
    );
  }

  while (state.token !== Token.RightBrace) {
    properties.push(parsePropertyDefinition(state, context, bindingType, start));
    destructible |= state.destructible;
    if (state.token !== Token.Comma) break;
    nextToken(state, context | Context.AllowRegExp);
  }

  consume(state, context, Token.RightBrace);

  state.destructible = destructible;
  return finishNode(state, context, start, { type: 'ObjectBindingPattern', properties }, NodeType.ObjectBindingPattern);
}

// ObjectLiteral :
//   `{` `}`
//   `{` PropertyDefinitionList `}`
//   `{` PropertyDefinitionList `,` `}`
//
// ObjectBindingPattern :
//   `{` `}`
//   `{` BindingRestProperty `}`
//   `{` BindingPropertyList `}`
//   `{` BindingPropertyList `,` `}`
export function parseObjectLiteralOrPattern(
  state: ParserState,
  context: Context,
  isPattern: boolean,
  bindingType: BindingType,
  start: number
): any {
  nextToken(state, context);

  let properties: any = [];

  let destructible = Destructible.None;

  if (context & Context.ErrorRecovery) {
    while (state.token & Constants.DelimitedList) {
      properties.push(parsePropertyDefinition(state, context, bindingType, start));
      destructible |= state.destructible;
      //
      // We parse the array as an delimited list, and accept missing commas to prevent
      // an incomplete multiline array.
      //
      // Example
      //
      // 'var a = { 1,'
      //
      // and
      //
      // 'var a = {
      //   1, '
      //
      // are now treated as single-line array instead
      //
      if (consumeOpt(state, context | Context.AllowRegExp, Token.Comma)) continue;
      if ((state.token & state.token & Constants.DelimitedList) === 0 || state.token === Token.RightBrace) break;
    }
    properties = createArray(state, properties, start);
  } else {
    while (state.token !== Token.RightBrace) {
      properties.push(parsePropertyDefinition(state, context, bindingType, start));
      destructible |= state.destructible;
      if (state.token !== Token.Comma) break;
      nextToken(state, context | Context.AllowRegExp);
    }
  }

  consume(state, context, Token.RightBrace);

  state.destructible = destructible;

  if (!isPattern && (state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    return parseObjectAssignmentPattern(state, context, destructible, properties, bindingType, start);
  }

  state.destructible = destructible;

  if (bindingType & BindingType.Pattern) {
    return finishNode(
      state,
      context,
      start,
      { type: 'ObjectBindingPattern', properties },
      NodeType.ObjectBindingPattern
    );
  }
  return finishNode(state, context, start, { type: 'ObjectLiteral', properties }, NodeType.ObjectLiteral);
}

// ObjectAssignmentPattern :
// {}
// { AssignmentRestProperty }
// { AssignmentPropertyList }
// { AssignmentPropertyList, AssignmentRestProperty }
export function parseObjectAssignmentPattern(
  state: ParserState,
  context: Context,
  destructible: Destructible,
  properties: any,
  bindingType: BindingType,
  start: number
): Types.ObjectAssignmentPattern {
  // Cannot compound-assign to an object literal
  if (state.token !== Token.Assign) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.CompundObjLit, DiagnosticKind.Error);
  }

  if ((destructible & Destructible.NotDestructible) === Destructible.NotDestructible) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDestructAssign, DiagnosticKind.Error);
  }

  // An while loop scale the best for large arrays, and a reversed while loop seem
  // to be the fastest way to iterate the array now when we need to convert to
  // assignment pattern
  let i = properties.length;
  while (i--) {
    reinterpretToAssignment(properties[i], /* ObjectAssignment */ true);
  }

  nextToken(state, context | Context.AllowRegExp);

  const right = parseExpression(state, context, Precedence.Assign, bindingType, true, /* canAssign */ 1, start);

  state.destructible = (destructible | Destructible.MustDestruct) ^ Destructible.MustDestruct;

  const left = finishNode(
    state,
    context,
    start,
    { type: 'ObjectAssignmentPattern', properties },
    NodeType.ArrayAssignmentPattern
  );

  return finishNode(
    state,
    context,
    start,
    { type: 'AssignmentExpression', left, operator: '=', right } as any,
    NodeType.AssignmentExpression
  );
}

// To achieve the goal of an AST that consumes less bytes we skip the 'PropertyDefinitionList'
// production and choose to simplify the 'PropertyDefinition' production.
//
// We do this by returning each production separately into one big array. That way we avoid the necessity of
// unnecessary properties that will use 1 byte each.
//
// Original ECMA
// -------------
//
// PropertyDefinitionList :
//   PropertyDefinition
//
// PropertyDefinition :
//   1) IdentifierReference
//   2) CoverInitializedName
//   3) PropertyName
//   4) MethodDefinition
//   5) ...AssignmentExpression
//
// Returned as
// -----------
//
// 1) *as is*
//
// 2) 'CoverInitializedName' or 'BindingElement'
//
// 3) *as is*
//
// 4) *as is*
//
// 5) 'SpreadElement', 'BindingRestElement',  or 'BindingRestProperty',
//
export function parsePropertyDefinition(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): any {
  if (state.token === Token.Ellipsis) {
    return parseSpreadOrRestElement(state, context, Token.RightBrace, bindingType, false, false, state.startIndex);
  }

  let modifiers = consumeOpt(state, context, Token.Multiply) ? ModifierKind.Generator : ModifierKind.None;
  let key = null;
  let value = null;

  const token = state.token;
  const innerStart = state.startIndex;

  if (token & Constants.IdentfierName) {
    key = state.tokenValue;
    nextToken(state, context);
    if (state.token & Constants.NextTokenCanFollowModifier) {
      if ((modifiers & ModifierKind.Generator) === 0) {
        if (token === Token.AsyncKeyword) {
          modifiers |= (consumeOpt(state, context, Token.Multiply) ? ModifierKind.Generator : 0) | ModifierKind.Async;
        } else if (token === Token.GetKeyword) {
          modifiers |= ModifierKind.Getter;
        } else if (token === Token.SetKeyword) {
          modifiers |= ModifierKind.Setter;
        } else if (state.token !== Token.Assign && state.token !== Token.Colon && state.token !== Token.LeftParen) {
          state.destructible = Destructible.None;
          return parseIdentifierReferenceFromValue(state, context, key, bindingType, start);
        }

        key = parsePropertyName(state, context, start);

        if (modifiers & ModifierKind.Generator || state.token === Token.LeftParen) {
          value = parseMethodDefinition(state, context, key, modifiers);
          state.destructible = Destructible.NotDestructible;
          return value;
        }

        // Note: This will 'catch' invalid edge cases like `({ get async })`, `({ get async })`, and `({ get async })`.
        // and also cases like `({ async async:})`, `({ async async*:})` etc.
        //
        // We request for a full reparse in 'incremental mode ' to be sure we get back on track.

        state.flags != Flags.HasErrors;

        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidKeyToken, DiagnosticKind.Error);
      }
    }
    if ((modifiers & ModifierKind.Generator) === 0) {
      if (state.token === Token.RightBrace || state.token === Token.Assign || state.token === Token.Comma) {
        // Identifier : IdentifierName but not ReservedWord
        validateIdentifier(state, context, token);

        // Note: This is an super edge case and has to be interpreted
        // as CoverInitializedName production because of the '=' token.
        //
        // CoverInitializedName :
        //     IdentifierReference Initializer
        //
        // Normally this should have been parsed as pattern, but because of 'recovery mode' and the fact
        // that ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern, we
        // have to parse this out "as is".
        //
        // This is necessary because normally this will trigger an error without the initializer.
        if (state.token === Token.Assign) {
          const initializer = parseInitializer(state, context);

          state.destructible = Destructible.MustDestruct;

          return finishNode(
            state,
            context,
            innerStart,
            {
              type: bindingType & Constants.AssignmentOrPattern ? 'BindingElement' : 'CoverInitializedName',
              binding: parseIdentifierNameFromValue(state, context, key, bindingType, start),
              initializer
            } as any,
            bindingType & Constants.AssignmentOrPattern ? NodeType.BindingElement : NodeType.CoverInitializedName
          );
        }

        // PropertyDefinition :
        //   IdentifierReference
        state.destructible = Destructible.None;
        return parseIdentifierReferenceFromValue(state, context, key, bindingType, start);
      }
    }
    key = parseIdentifierNameFromValue(state, context, key, bindingType, start);
  } else {
    key = parsePropertyName(state, context, start);
  }

  let destructible = Destructible.None;

  if (state.token === Token.Colon) {
    if (modifiers & ModifierKind.Generator) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedLeftParen, DiagnosticKind.Error);
    }

    nextToken(state, context | Context.AllowRegExp);

    if (state.token & Constants.IdentfierName) {
      value = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, start);

      const token = state.token;

      value = parseLeftHandSide(state, context, value, Precedence.LeftHandSide, bindingType, start);

      if (state.token === Token.RightBrace || state.token === Token.Comma) {
        if (token === Token.Assign || token === Token.Comma || token === Token.RightBrace) {
          if (!state.assignable) destructible |= Destructible.NotDestructible;
        } else {
          destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
        }
      } else {
        if ((state.token & Token.IsAssignOp) === 0) destructible |= Destructible.NotDestructible;
        value = parseLeftHandSide(state, context, value, Precedence.Assign, bindingType, start);
      }
    } else if (state.token & Token.IsPatternStart) {
      value =
        state.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(state, context, false, bindingType, start)
          : parseArrayLiteralOrPattern(state, context, false, bindingType, start);

      destructible = state.destructible;

      if (state.token !== Token.RightBrace && state.token !== Token.Comma) {
        // Catches cases like `({a:{x = y}.z} = x);` and `[{a = b}].x`  because a shorthand with initalizer
        // must be a pattern or the nested object must be a pattern
        if (state.destructible & Destructible.MustDestruct) {
          addDiagnostic(
            state,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.InvalidDestructAssign,
            DiagnosticKind.Error
          );
        }
        // Note: The value must have a tail and it isn't (immediately) an assignment.
        value = parseLeftHandSide(state, context, value, Precedence.LeftHandSide, bindingType, start);

        destructible = state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

        value = parseLeftHandSide(state, context, value, Precedence.Assign, bindingType, start);
      }
    } else {
      value = parseExpression(state, context, Precedence.LeftHandSide, bindingType, true, /* canAssign */ 1, start);

      const isAssignToken = state.token === Token.Assign;

      value = parseLeftHandSide(state, context, value, Precedence.Assign, bindingType, start);

      destructible |= state.assignable || isAssignToken ? Destructible.Assignable : Destructible.NotDestructible;
    }
    // Regular object method without modifiers `({ ident() { } })`
  } else if (state.token === Token.LeftParen) {
    value = parseMethodDefinition(state, context, key, modifiers);
    destructible = Destructible.NotDestructible;
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidKeyToken, DiagnosticKind.Error);
  }

  state.destructible = destructible;

  return finishNode(
    state,
    context,
    innerStart,
    { type: 'PropertyName', key, value, computed: token === Token.LeftBracket },
    NodeType.PropertyName
  );
}

// Initializer[In, Yield] :
//     = AssignmentExpression[?In, ?Yield]
export function parseInitializer(state: ParserState, context: Context): Types.Expression {
  const start = state.startIndex;
  consume(state, context | Context.AllowRegExp, Token.Assign);
  return parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
}

// PropertyName :
//   LiteralPropertyName
//   ComputedPropertyName
//
// LiteralPropertyName :
//   IdentifierName
//   StringLiteral
//   NumericLiteral
//
// ComputedPropertyName :
//   `[` AssignmentExpression `]`
export function parsePropertyName(state: ParserState, context: Context, start: number): any {
  if (state.token === Token.NumericLiteral) {
    return parseNumericLiteral(state, context);
  }

  if (state.token === Token.StringLiteral) {
    return parseStringLiteral(state, context);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    const e = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
    consume(state, context, Token.RightBracket);
    return e;
  }

  return parseIdentifierName(state, context);
}

export function parseTemplateExpression(state: ParserState, context: Context): Types.TemplateExpression {
  const start = state.startIndex;
  let leafs: Types.TemplateElement[] = [];
  if (context & Context.ErrorRecovery) {
    do {
      leafs.push(parseTemplateElementContinuation(state, context));
    } while ((state.token = scanTemplateTail(state, context)) === Token.TemplateCont);
    leafs.push(parseTemplateElement(state, context));
    consume(state, context | Context.AllowRegExp, Token.TemplateTail);
    return finishNode(
      state,
      context,
      start,
      { type: 'TemplateExpression', leafs: createArray(state, leafs, start) },
      NodeType.TemplateExpression
    );
  }
  do {
    leafs.push(parseTemplateElementContinuation(state, context));
  } while ((state.token = scanTemplateTail(state, context)) === Token.TemplateCont);
  leafs.push(parseTemplateElement(state, context));
  consume(state, context | Context.AllowRegExp, Token.TemplateTail);
  return finishNode(state, context, start, { type: 'TemplateExpression', leafs }, NodeType.TemplateExpression);
}

export function parseTemplateElementContinuation(state: ParserState, context: Context): Types.TemplateElement {
  const start = state.startIndex;
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  consume(state, context | Context.AllowRegExp, Token.TemplateCont);
  const expression = parseExpressions(state, context);
  return finishNode(
    state,
    context,
    start,
    { type: 'TemplateElement', raw, value, expression },
    NodeType.TemplateElement
  );
}

export function parseTemplateElement(state: ParserState, context: Context): Types.TemplateElement {
  const start = state.startIndex;
  const value = state.tokenValue;
  const raw = state.tokenRaw;
  return finishNode(
    state,
    context,
    start,
    { type: 'TemplateElement', raw, value, expression: null },
    NodeType.TemplateElement
  );
}

export function parseSpreadOrRestElement(
  state: ParserState,
  context: Context,
  closingToken: Token,
  bindingType: BindingType,
  isArray: boolean,
  isAsync: boolean,
  start: number
): any {
  nextToken(state, context | Context.AllowRegExp); // skip '...'

  let argument: any;
  let destructible: Destructible = Destructible.None;

  let token = state.token;

  if ((token & Constants.IdentfierName) > 0) {
    argument = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, start);

    token = state.token;

    argument = parseLeftHandSide(state, context, argument, Precedence.LeftHandSide, bindingType, start);

    if (state.token !== Token.Comma && state.token !== closingToken) {
      destructible |= Destructible.NotDestructible;

      argument = parseLeftHandSide(state, context, argument, Precedence.Assign, bindingType, start);
    }

    if (!state.assignable) {
      destructible |= Destructible.NotDestructible;
    } else if (isClosingTokenOrComma(token, closingToken)) {
      // TODO
    } else {
      destructible |= Destructible.Assignable;
    }
  } else if (token === closingToken) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  } else if (token & Token.IsPatternStart) {
    argument =
      state.token === Token.LeftBrace
        ? parseObjectBindingPattern(state, context, bindingType, start)
        : parseArrayBindingPattern(state, context, bindingType, start);
    token = state.token;
    if (!isClosingTokenOrComma(token, closingToken)) {
      if (state.destructible & Destructible.MustDestruct) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDestruct, DiagnosticKind.Error);
      }
      argument = parseLeftHandSide(state, context, argument, Precedence.LeftHandSide, bindingType, start);
      destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
      argument = parseLeftHandSide(state, context, argument, Precedence.Assign, bindingType, start);
    } else {
      destructible |=
        closingToken === Token.RightBrace && token !== Token.Assign ? Destructible.NotDestructible : state.destructible;
    }
  } else {
    destructible |= Destructible.Assignable;

    argument = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, start);
    const token = state.token;
    if (token === Token.Assign && token !== closingToken && state.token === Token.Comma) {
      argument = parseLeftHandSide(state, context, argument, Precedence.Assign, bindingType, start);
      destructible |= Destructible.NotDestructible;
    } else {
      if (token === Token.Comma) {
        destructible |= Destructible.NotDestructible;
      } else if (token !== closingToken) {
        argument = parseLeftHandSide(state, context, argument, Precedence.Assign, bindingType, start);
      }
      destructible |= state.assignable ? Destructible.Assignable : Destructible.NotDestructible;
    }

    state.destructible = destructible;

    return finishNode(state, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
  }

  if (state.token !== closingToken) {
    if (bindingType & BindingType.ArgumentList)
      destructible |= isAsync ? Destructible.NotDestructible : Destructible.Assignable;

    if (state.token === Token.Assign) {
      const operator = KeywordDescTable[state.token & Token.Type] as any;
      nextToken(state, context);
      const right = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
      reinterpretToAssignment(argument, false);
      argument = finishNode(
        state,
        context,
        start,
        { type: 'AssignmentExpression', left: argument, operator, right },
        NodeType.AssignmentExpression
      );

      destructible = Destructible.NotDestructible;
    } else {
      // Note the difference between '|=' and '=' above
      destructible |= Destructible.NotDestructible;
    }
  }

  state.destructible = destructible;

  if (bindingType & BindingType.Pattern) {
    return finishNode(
      state,
      context,
      start,
      { type: isArray ? 'BindingRestElement' : 'BindingRestProperty', argument },
      isArray ? NodeType.BindingRestElement : NodeType.BindingRestProperty
    );
  }

  return finishNode(state, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
}

// FunctionDeclaration :
//   `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
//   [+Default] `function` `(` FormalParameters `)` `{` FunctionBody `}`
// FunctionExpression :
//   `function` BindingIdentifier? `(` FormalParameters `)` `{` FunctionBody `}`
// GeneratorDeclaration :
//   `function` `*` BindingIdentifier `(` FormalParameters `)` `{` GeneratorBody `}`
//   [+Default] `function` `*` `(` FormalParameters `)` `{` GeneratorBody `}`
// GeneratorExpression :
//   `function` BindingIdentifier? `(` FormalParameters `)` `{` GeneratorBody `}`
// AsyncGeneratorDeclaration :
//   `async` `function` `*` BindingIdentifier `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
//   [+Default] `async` `function` `*` `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
// AsyncGeneratorExpression :
//   `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncGeneratorBody `}`
// AsyncFunctionDeclaration :
//   `async` `function` BindingIdentifier `(` FormalParameters `)` `{` FunctionBody `}`
//   [+Default] `async` `function` `(` FormalParameters `)` `{` AsyncFunctionBody `}`
// Async`FunctionExpression :
//   `async` `function` BindingIdentifier? `(` FormalParameters `)` `{` AsyncFunctionBody `}`
export function parseFunctionDeclaration(
  state: ParserState,
  context: Context,
  isAsync: 0 | 1,
  bindingType: BindingType
): Types.FunctionDeclaration {
  const start = state.startIndex;

  let name: Types.BindingIdentifier | null = null;

  if (optionalBit(state, context, Token.AsyncKeyword)) {
    if (state.token !== Token.FunctionKeyword || state.hasLineTerminator) {
      return parseAsyncArrowDeclaration(state, context, bindingType, start);
    }
    isAsync = 1;
  }

  consume(state, context | Context.AllowRegExp, Token.FunctionKeyword);

  const isGenerator = optionalBit(state, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  if (state.token & Constants.IdentfierName) {
    const { token, tokenValue, startIndex } = state;
    validateFunctionName(state, context | ((context & 0b0000000000000000000_1100_00000000) << 11), token);
    nextToken(state, context);
    name = parseBindingIdentifierFromValue(state, context, tokenValue, startIndex);
  } else if ((context & Context.Default) !== Context.Default) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.FuncDeclNoName, DiagnosticKind.Error);
  }

  context =
    ((context | 0b00000110111111100011000000000000) ^ 0b00000000111111100001000000000000) | generatorAndAsyncFlags;

  const params = parseFormalParameters(state, context | Context.Parameters);

  const contents = parseFunctionBody(state, context, /* isDeclaration */ true);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'FunctionDeclaration', name, params, contents, async: isAsync === 1, generator: isGenerator === 1 },
    NodeType.FunctionDeclaration
  );
}

export function parseFunctionExpression(
  state: ParserState,
  context: Context,
  isAsync: 0 | 1,
  canAssign: 0 | 1,
  bindingType: BindingType
): Types.FunctionExpression {
  const start = state.startIndex;

  let name: Types.BindingIdentifier | null = null;

  if (optionalBit(state, context, Token.AsyncKeyword)) {
    if (state.token !== Token.FunctionKeyword || state.hasLineTerminator) {
      return parseAsyncArrowExpression(state, context, canAssign, bindingType, start);
    }
    if ((bindingType & BindingType.AllowLHS) === 0) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
    isAsync = 1;
  }

  nextToken(state, context | Context.AllowRegExp);

  const isGenerator = optionalBit(state, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  if ((state.token & Constants.IdentfierName) > 0) {
    const { tokenValue, startIndex } = state;
    validateFunctionName(
      state,
      ((context | 0b00000000011000000000000000000000) ^ 0b00000000011000000000000000000000) | generatorAndAsyncFlags,
      state.token
    );
    nextToken(state, context);
    name = parseBindingIdentifierFromValue(state, context, tokenValue, startIndex);
  }

  context =
    ((context | 0b00000110111111100011000000000000) ^ 0b00000000111111100001000000000000) | generatorAndAsyncFlags;

  const params = parseFormalParameters(state, context | Context.Parameters);
  const contents = parseFunctionBody(state, context, /* isDeclaration */ false);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'FunctionExpression', name, params, contents, async: isAsync === 1, generator: isGenerator === 1 },
    NodeType.FunctionExpression
  );
}

// FunctionRestParameter :
// BindingRestElement
export function parseFunctionRestParameter(state: ParserState, context: Context): Types.FunctionRestParameter {
  const start = state.startIndex;
  nextToken(state, context);
  const argument = parseBindingElement(state, context, BindingType.ArgumentList);
  return finishNode(state, context, start, { type: 'FunctionRestParameter', argument }, NodeType.FunctionRestParameter);
}

// FormalParameters
//   [empty]
//   FormalParameterList
//
// FormalParameter:
//   BindingElement
//
// BindingElement :
//   SingleNameBinding
//   BindingPattern
//
// SingleNameBinding :
//   BindingIdentifier

export function parseFormalParameters(state: ParserState, context: Context): Types.FormalParameters | any {
  let leafs: any = [];
  const start = state.startIndex;

  if (state.token === Token.LeftParen) {
    nextToken(state, context); // skips: '('
    if (context & Context.ErrorRecovery) {
      while (state.token & Constants.DelimitedList) {
        if (state.token === Token.Ellipsis) {
          leafs.push(parseFormalElements(state, context, BindingType.None, parseFunctionRestParameter));
          break;
        }
        leafs.push(parseFormalElements(state, context, BindingType.ArgumentList, parseBindingPattern));
        if (consumeOpt(state, context, Token.Comma)) continue;
        if ((state.token & Constants.DelimitedList) === 0) break;
        consume(state, context, Token.Comma);
        continue;
      }
      consume(state, context, Token.RightParen);
      leafs = createArray(state, leafs, start);
      return finishNode(state, context, start, { type: 'FormalParameters', leafs }, NodeType.FormalParameters);
    }
    while (state.token & Constants.DelimitedList) {
      if (state.token === Token.Ellipsis) {
        leafs.push(parseFunctionRestParameter(state, context));
        break;
      }

      leafs.push(parseBindingPattern(state, context, BindingType.ArgumentList));
      if (state.token === Token.RightParen) break;
      consumeOpt(state, context, Token.Comma);
    }

    consume(state, context, Token.RightParen);

    return finishNode(state, context, start, { type: 'FormalParameters', leafs }, NodeType.FormalParameters);
  }

  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return finishNode(
    state,
    context,
    start,
    { type: 'FormalParameters', leafs: createMissingList(start, leafs) },
    NodeType.FormalParameters
  );
}

// FunctionBody :
//   FunctionStatementList
export function parseFunctionBody(state: ParserState, context: Context, isDeclaration: boolean): any {
  const start = state.startIndex;
  let statements: any | Types.Statement[] = [];
  if (state.token === Token.LeftBrace) {
    const directives: string[] = [];

    nextToken(state, context | Context.AllowRegExp);

    while (state.token === Token.StringLiteral) {
      const { token, tokenValue, startIndex, index } = state;
      nextToken(state, context | Context.AllowRegExp);
      if (state.token & Token.IsAutomaticSemicolon || state.hasLineTerminator) {
        const directive = state.source.slice(startIndex, index);
        if (directive.length === 12 && tokenValue === 'use strict') context |= Context.Strict;
        consumeOpt(state, context, Token.Semicolon);
        directives.push(directive);
      } else {
        statements.push(parseDirectives(state, context, token, tokenValue, startIndex));
      }
    }

    if (context & Context.ErrorRecovery) {
      while (state.token & Constants.BlockStatement) {
        statements.push(parseLeafElement(state, context, parseStatementListItem));
        if (state.token === Token.RightBrace) break;
      }

      if (state.token !== Token.RightBrace) {
        state.flags |= Flags.HasErrors;

        state.diagnostics.push(
          createDiagnostic(
            DiagnosticSource.Parser,
            DiagnosticCode.UnknownToken,
            DiagnosticKind.Error,
            start,
            state.endIndex
          )
        );
      }
      nextToken(state, isDeclaration ? context | Context.AllowRegExp : context);
      statements = createArray(state, statements, start);
      return finishNode(state, context, start, { type: 'FunctionBody', statements, directives }, NodeType.FunctionBody);
    }

    while (state.token & Constants.BlockStatement) {
      statements.push(parseStatementListItem(state, context));
    }

    consume(state, isDeclaration ? context | Context.AllowRegExp : context, Token.RightBrace);

    return finishNode(state, context, start, { type: 'FunctionBody', statements, directives }, NodeType.FunctionBody);
  }

  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return finishNode(
    state,
    context,
    start,
    { type: 'FunctionBody', statements: createMissingList(start, statements), directives: [] },
    NodeType.FunctionBody
  );
}

// ArrowFunction[In, Yield, Await]:
//  ArrowParameters
export function parseArrowFunction(
  state: ParserState,
  context: Context,
  params: Types.ArrowFormals[],
  bindingType: BindingType,
  isAsync: 0 | 1,
  start: number
): Types.ArrowFunction {
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  if (state.hasLineTerminator) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.LineTerminatorNotPermittedBeforeArrow,
      DiagnosticKind.Error
    );
  }
  consume(state, context | Context.AllowRegExp, Token.Arrow);

  context =
    ((context | 0b0000000111100000000_0000_00000000) ^ 0b0000000111100000000_0000_00000000) |
    (isAsync << 22) |
    Context.Return;

  const contents = parseFunctionOrConciseBody(state, context, bindingType);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'ArrowFunction', params, contents, async: isAsync === 1 },
    NodeType.ArrowFunction
  );
}

// FunctionBody :
//   FunctionStatementList
//
// ConciseBody[In]:
// [lookahead ≠ {]ExpressionBody[?In, ~Await]
// {FunctionBody[~Yield, ~Await]}
export function parseFunctionOrConciseBody(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.FunctionBody | Types.ConciseBody {
  if (state.token === Token.LeftBrace) {
    const body = parseFunctionBody(
      state,
      (context | Context.DisallowIn) ^ Context.DisallowIn,
      /* isDeclaration */ true
    );

    if (state.hasLineTerminator) {
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

  const start = state.startIndex;
  const body = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  return finishNode(state, context, start, { type: 'ConciseBody', body }, NodeType.ConciseBody);
}

// BindingPattern :
//   SingleNameBinding
//   BindingPattern Initializer?
// SingleNameBinding :
//   BindingIdentifier Initializer?
export function parseBindingPattern(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingElement {
  const start = state.startIndex;
  const binding: any = parseBindingElement(state, context, bindingType);
  const initializer: Types.Expression | null = state.token === Token.Assign ? parseInitializer(state, context) : null;
  return finishNode(state, context, start, { type: 'BindingElement', binding, initializer }, NodeType.BindingElement);
}

// BindingElement :
//   SingleNameBinding
//   BindingPattern Initializer?
// SingleNameBinding :
//   BindingIdentifier Initializer?
export function parseBindingElement(state: ParserState, context: Context, bindingType: BindingType): any {
  let binding: Types.BindingPattern | Types.AssignmentPattern;
  const start = state.startIndex;
  if ((state.token & Token.IsPatternStart) > 0) {
    binding =
      state.token === Token.LeftBrace
        ? parseObjectBindingPattern(state, context, bindingType | BindingType.Pattern | BindingType.AllowLHS, start)
        : parseArrayBindingPattern(state, context, bindingType | BindingType.Pattern | BindingType.AllowLHS, start);
    if ((state.destructible & (Destructible.NotDestructible | Destructible.Assignable)) > 0) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
    return binding as Types.BindingIdentifier | Types.BindingPattern;
  }
  const token = state.token;
  return parseAndClassifyIdentifier(state, context, token, state.tokenValue, bindingType, true, start);
}

// MethodDefinition :
//   PropertyName
//   GeneratorMethod
//   AsyncMethod
//   AsyncGeneratorMethod
//   getPropertyName
//   setPropertyName
export function parseMethodDefinition(
  state: ParserState,
  context: Context,
  name: any,
  modifiers: ModifierKind
): Types.MethodDefinition {
  const modifierFlags =
    (modifiers & ModifierKind.Constructor) === 0
      ? 0b0000001111010000000_0000_00000000
      : 0b0000000111000000000_0000_00000000;

  context =
    ((context | 0b00010000111000000000000000000000 | modifierFlags) ^
      (0b00010000111000000000000000000000 | modifierFlags)) |
    ((modifiers & 0b0000000000000000000_0000_01011000) << 18) |
    0b0000110000001000000_0000_00000000 |
    (modifiers & ModifierKind.Async ? Context.Await : 0) |
    (modifiers & ModifierKind.Generator ? Context.Yield : 0);

  const startIndex = state.startIndex;
  let propertySetParameterList: Types.MissingList | Types.BindingElement[] = [];
  let uniqueFormalParameters: Types.MissingList | Types.FormalParameters[] = [];

  // getter
  if (modifiers & ModifierKind.Getter) {
    consume(state, context, Token.LeftParen);
    // get x(y, ...
    if (state.token !== Token.RightParen) {
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.GetAccessorParms, DiagnosticKind.Error);
    }
    nextToken(state, context);
    if (context & Context.ErrorRecovery) {
      propertySetParameterList = createMissingList(startIndex, propertySetParameterList);
      uniqueFormalParameters = createMissingList(startIndex, uniqueFormalParameters);
    }
    // setter
  } else if (modifiers & ModifierKind.Setter) {
    consume(state, context, Token.LeftParen);
    propertySetParameterList = [parseBindingPattern(state, context, BindingType.ArgumentList)];
    consume(state, context, Token.RightParen);
    if (context & Context.ErrorRecovery) {
      propertySetParameterList = createArray(state, propertySetParameterList, startIndex);
      uniqueFormalParameters = createMissingList(startIndex, uniqueFormalParameters);
    }
  } else {
    uniqueFormalParameters = parseFormalParameters(state, context | Context.Parameters);
    //createArray(state, propertySetParameterList, startIndex);  if (context & Context.ErrorRecovery) {
    //    propertySetParameterList = createArray(state, propertySetParameterList, startIndex);
    //}
  }
  const contents = parseFunctionBody(
    state,
    (context | 0b00000010000100100010000000000000) ^ 0b00000000000100100000000000000000,
    /* isDeclaration */ false
  );

  state.assignable = false;

  return finishNode(
    state,
    context,
    startIndex,
    {
      type: 'MethodDefinition',
      name,
      contents,
      uniqueFormalParameters,
      propertySetParameterList,
      async: (modifiers & ModifierKind.Async) > 0,
      generator: (modifiers & ModifierKind.Generator) > 0
    },
    NodeType.MethodDefinition
  );
}

// ClassDeclaration :
//   `class` BindingIdentifier ClassTail
//   [+Default] `class` ClassTail
//
// ClassTail : ClassHeritage? `{` ClassBody? `}`
// ClassHeritage : `extends` LeftHandSideExpression
// ClassBody : ClassElementList
export function parseClassDeclaration(state: ParserState, context: Context): Types.ClassDeclaration {
  const start = state.startIndex;
  consume(state, context, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | 0b00000001000000000010000000000000) ^ 0b00000001000000000010000000000000;

  context |= Context.Strict;

  let name: Types.BindingIdentifier | null = null;
  let superClass: Types.LeftHandSideExpression | null = null;

  if (state.token & (Token.IsIdentifier | Token.FutureKeyword) && state.token !== Token.ExtendsKeyword) {
    if (isStrictReservedWord(state, context, state.token)) {
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.StrictReservedWord, DiagnosticKind.Error);
    }
    name = parseBindingIdentifier(state, context, BindingType.None);
  } else if ((context & Context.Default) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.ClassDeclNoName, DiagnosticKind.Error);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    superClass = parseExpression(state, context, Precedence.LeftHandSide, BindingType.None, true, 1, start);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  state.flags = (state.flags | Flags.HasConstructor) ^ Flags.HasConstructor;

  const leafs = parseClassElementList(state, inheritedContext, context, false);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'ClassDeclaration', name, super: superClass, leafs },
    NodeType.ClassDeclaration
  );
}

// ClassExpression :
//   `class` BindingIdentifier? ClassTail
//
// ClassTail : ClassHeritage? `{` ClassBody? `}`
// ClassHeritage : `extends` LeftHandSideExpression
// ClassBody : ClassElementList
export function parseClassExpression(state: ParserState, context: Context): Types.ClassExpression {
  const start = state.startIndex;
  consume(state, context, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | 0b00000001000000000010000000000000) ^ 0b00000001000000000010000000000000;

  context |= Context.Strict;

  let name: Types.BindingIdentifier | null = null;
  let superClass: Types.LeftHandSideExpression | null = null;

  if (state.token & (Token.IsIdentifier | Token.FutureKeyword) && state.token !== Token.ExtendsKeyword) {
    if (isStrictReservedWord(state, context, state.token)) {
      addDiagnostic(state, context, DiagnosticSource.Lexer, DiagnosticCode.StrictReservedWord, DiagnosticKind.Error);
    }
    name = parseBindingIdentifier(state, context, BindingType.None);
  }

  if (consumeOpt(state, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    superClass = parseExpression(state, context, Precedence.LeftHandSide, BindingType.None, true, 1, start);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  state.flags = (state.flags | Flags.HasConstructor) ^ Flags.HasConstructor;

  const leafs = parseClassElementList(state, inheritedContext, context, true);

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'ClassExpression', name, super: superClass, leafs },
    NodeType.ClassExpression
  );
}

// ClassElementList :
//   ClassElement
//   ClassElementList
export function parseClassElementList(
  state: ParserState,
  context: Context,
  inheritedContext: Context,
  isExpression: boolean
): any {
  const start = state.startIndex;
  const classElementList: any[] = [];
  if (state.token === Token.LeftBrace) {
    nextToken(state, context | Context.AllowRegExp);
    if (context & Context.ErrorRecovery) {
      while (state.token & Constants.ClassElementList) {
        if (consumeOpt(state, context, Token.Semicolon)) continue;
        classElementList.push(
          parseClassElements(state, context, inheritedContext, ModifierKind.None, parseClassElement)
        );
      }
      consume(state, isExpression === false ? context | Context.AllowRegExp : context, Token.RightBrace);
      return createArray(state, classElementList, start);
    }
    while (state.token & Constants.ClassElementList) {
      if (consumeOpt(state, context, Token.Semicolon)) continue;
      classElementList.push(parseClassElement(state, context, inheritedContext, ModifierKind.None));
    }
    consume(state, isExpression === false ? context | Context.AllowRegExp : context, Token.RightBrace);
    return classElementList;
  }
  addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);

  return createMissingList(start, classElementList);
}

// ClassElement :
//   `static` MethodDefinition
//   MethodDefinition
export function parseClassElement(
  state: ParserState,
  context: Context,
  inheritedContext: Context,
  modifiers: ModifierKind
): Types.ClassElement {
  let name: any;
  const token = state.token;
  const start = state.startIndex;
  if (token & Constants.IdentfierName) {
    name = parseIdentifierName(state, context);
    if (state.token !== Token.LeftParen) {
      if ((modifiers & ModifierKind.Static) === 0 && token === Token.StaticKeyword) {
        return parseClassElement(state, context, inheritedContext, modifiers | ModifierKind.Static);
      } else if (!state.hasLineTerminator && token === Token.AsyncKeyword) {
        modifiers |= ModifierKind.Async;
        if (consumeOpt(state, context, Token.Multiply)) modifiers |= ModifierKind.Generator;
      } else if (token === Token.GetKeyword) {
        modifiers |= ModifierKind.Getter;
      } else if (token === Token.SetKeyword) {
        modifiers |= ModifierKind.Setter;
      }
    }
  } else if (token === Token.NumericLiteral) {
    name = parseNumericLiteral(state, context);
  } else if (token === Token.StringLiteral) {
    name = parseStringLiteral(state, context);
  } else if (token === Token.BigIntLiteral) {
    name = parseBigIntLiteral(state, context);
  } else if (token === Token.LeftBracket) {
    nextToken(state, context);
    modifiers |= ModifierKind.Computed;
    name = parseExpression(state, inheritedContext, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
    consume(state, context, Token.RightBracket);
  } else if (token === Token.Multiply) {
    modifiers |= ModifierKind.Generator;
    nextToken(state, context); // skip: '*'
  }

  if (modifiers & (ModifierKind.Generator | ModifierKind.Async | ModifierKind.Getter | ModifierKind.Setter)) {
    if (state.token === Token.LeftBracket) {
      nextToken(state, context);
      modifiers |= ModifierKind.Computed;
      name = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
      consume(state, context, Token.RightBracket);
    } else {
      name = parsePropertyName(state, context, start);
    }
  }

  if ((modifiers & ModifierKind.Computed) === 0) {
    if (state.tokenValue === 'constructor') {
      if ((modifiers & ModifierKind.Static) === 0 && state.token === Token.LeftParen) {
        if (
          (modifiers &
            (ModifierKind.Static |
              ModifierKind.Getter |
              ModifierKind.Setter |
              ModifierKind.Generator |
              ModifierKind.Async)) >
          0
        ) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
        }
        if ((context & Context.SuperCall) !== Context.SuperCall) {
          if (state.flags & Flags.HasConstructor) {
            addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
          } else {
            state.flags |= Flags.HasConstructor;
          }
        }
      }
      modifiers |= ModifierKind.Constructor;
    } else if ((modifiers & ModifierKind.Static) > 0 && state.tokenValue === 'prototype') {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
  }

  const method = parseMethodDefinition(state, context, name, modifiers);

  return finishNode(
    state,
    context,
    start,
    { type: 'ClassElement', method, static: (modifiers & ModifierKind.Static) !== 0 } as any,
    NodeType.ClassElement
  );
}

// SuperCall :
//   superArguments
//
// SuperProperty :
//   super[Expression[+In, ?Yield, ?Await]]
//   super.IdentifierName
export function parseSuperPropertyOrCall(state: ParserState, context: Context): Types.SuperProperty | Types.SuperCall {
  const start = state.startIndex;
  nextToken(state, context); // skips: 'super'
  if (state.token === Token.LeftParen) {
    if ((context & Context.SuperCall) === 0) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidSuperCall, DiagnosticKind.Error);
    }
    const args = parseArguments(state, context);
    return finishNode(state, context, start, { type: 'SuperCall', arguments: args }, NodeType.SuperCall);
  }

  if ((context & Context.SuperProperty) === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidSuperProperty, DiagnosticKind.Error);
  }
  if (state.token === Token.QuestionMarkPeriod) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.OptionalChainingNoSuper,
      DiagnosticKind.Error
    );
  }
  let expression: Types.Expression | null = null;
  let name: Types.IdentifierName | null = null;
  // If we have seen "super" it must be followed by '(' or '.'.
  // If it wasn't then just try to parse out a '.' and report an error.
  if (consumeOpt(state, context, Token.LeftBracket)) {
    expression = parseExpression(state, context, Precedence.Assign, BindingType.Assignment, true, 1, start);
    consume(state, context, Token.RightBracket);
    state.assignable = true;
  } else if (state.token === Token.Period) {
    nextToken(state, context);
    name = parseIdentifierName(state, context);
    state.assignable = true;
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  return finishNode(state, context, start, { type: 'SuperProperty', expression, name }, NodeType.SuperProperty);
}

// ImportCall :
//  import
// ImportMeta:
//   import.meta
export function parseImportMetaOrCall(state: ParserState, context: Context): Types.ImportCall | Types.ImportMeta {
  const start = state.startIndex;
  nextToken(state, context);

  if (context & Context.ImportMeta && consumeOpt(state, context, Token.Period)) {
    consume(state, context, Token.MetaKeyword);
    state.assignable = false;
    return finishNode(state, context, start, { type: 'ImportMeta' }, NodeType.ImportMeta);
  }

  consume(state, context | Context.AllowRegExp, Token.LeftParen);
  const expr = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, 1, start);
  consume(state, context, Token.RightParen);
  state.assignable = false;
  return finishNode(state, context, start, { type: 'ImportCall', import: expr }, NodeType.ImportCall);
}

// NewExpression :
//   MemberExpression
//   new NewExpression
export function parseNewExpression(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.NewTarget | Types.NewExpression {
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  if (context & Context.NewTarget && consumeOpt(state, context, Token.Period)) {
    return parseNewTargetExpression(state, context, start);
  }
  const expression = parseExpression(state, context, Precedence.LeftHandSide, bindingType, false, 1, start);
  let args: any = [];
  if (state.token === Token.LeftParen) {
    args = parseArguments(state, context);
  } else if (context & Context.ErrorRecovery) {
    args = createArray(state, args, start);
  }

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'NewExpression', expression, arguments: args },
    NodeType.NewExpression
  );
}

export function parseNewTargetExpression(
  state: ParserState,
  context: Context,
  start: number
): Types.NewTarget | Types.NewExpression {
  consume(state, context, Token.TargetKeyword);
  state.assignable = false;
  return finishNode(state, context, start, { type: 'NewTarget' }, NodeType.NewTarget);
}

// YieldExpression :
//   `yield`
//   `yield` [no LineTerminator here] AssignmentExpression
//   `yield` [no LineTerminator here] `*` AssignmentExpression
export function parseYieldExpression(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.YieldExpression | Types.IdentifierReference | Types.ArrowFunction {
  if (context & Context.Parameters) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  const start = state.startIndex;
  nextToken(state, context | Context.AllowRegExp);
  let delegate = false;
  let expression: any = null;
  if (!state.hasLineTerminator) {
    delegate = consumeOpt(state, context | Context.AllowRegExp, Token.Multiply);
    if (delegate || (state.token & Token.IsExpressionStart) === Token.IsExpressionStart) {
      expression = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
    }
  }

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'YieldExpression', delegate, expression } as any,
    NodeType.YieldExpression
  );
}

// AwaitExpression : `await` UnaryExpression
export function parseAwaitExpression(
  state: ParserState,
  context: Context,
  bindingType: BindingType
): Types.AwaitExpression | Types.IdentifierReference | Types.ArrowFunction {
  const start = state.startIndex;
  if (context & Context.Parameters) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  nextToken(state, context | Context.AllowRegExp);
  const expression = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  state.assignable = false;
  return finishNode(state, context, start, { type: 'AwaitExpression', expression } as any, NodeType.AwaitExpression);
}

// AsyncArrowFunction :
//
// async [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
// CoverCallExpressionAndAsyncArrowHead [no LineTerminator here] => AsyncConciseBody
//
// AsyncConciseBody :
//   [lookahead ≠ {]ExpressionBody
//   {AsyncFunctionBody}
//
// AsyncArrowBindingIdentifier :
//   BindingIdentifier
//
// CoverCallExpressionAndAsyncArrowHead:
//   MemberExpression
export function parseAsyncArrowDeclaration(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): any {
  const hasLineTermiantor = state.hasLineTerminator;
  if (!hasLineTermiantor) {
    // `async` [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
    if ((state.token & (Token.FutureKeyword | Token.IsIdentifier)) !== 0) {
      // This happen in cases like 'export async x => y' and 'export async x => {}'
      if (context & Context.DisallowArrow) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.FuncDeclNoName, DiagnosticKind.Error);
      }

      let expr: any = parseArrowAfterIdentifier(
        state,
        context,
        [parseBindingIdentifier(state, context, bindingType)],
        bindingType,
        /* isAsync */ 1,
        1,
        start
      );
      // `async foo => ..., async foo => ...`
      expr = parseCommaOperator(state, context, expr, start);
      return parseExpressionStatement(state, context, expr, start);
    }
  }

  let expr: any = parseIdentifierReferenceFromValue(state, context, 'async', bindingType, start);

  // `async: foo`
  if (state.token === Token.Colon) {
    return parseLabelledStatement(state, context, Token.AsyncKeyword, 'async', start);
  }

  // `async ()`, `async () => ...`
  if (state.token === Token.LeftParen) {
    if (context & Context.DisallowArrow) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.FuncDeclNoName, DiagnosticKind.Error);
    }

    expr = parseCoverCallExpressionAndAsyncArrowHead(state, context, expr, hasLineTermiantor, 1, bindingType, start);
    // `async => ...`
  } else if (state.token === Token.Arrow) {
    if (context & Context.DisallowArrow) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.FuncDeclNoName, DiagnosticKind.Error);
    }

    expr = parseArrowAfterIdentifier(state, context, expr, bindingType, /* isAsync */ 0, 1, start);
  }

  // `async++`, `async`\n${0}`:`, `async?.()`
  expr = parseLeftHandSide(state, context, expr, Precedence.Assign, BindingType.AllowLHS, start);

  // `async() => x, y`, `async => x, y`,
  expr = parseCommaOperator(state, context, expr, start);

  return parseExpressionStatement(state, context, expr, start);
}

// AsyncArrowFunction :
//
// async [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
// CoverCallExpressionAndAsyncArrowHead [no LineTerminator here] => AsyncConciseBody
//
// AsyncConciseBody :
//   [lookahead ≠ {]ExpressionBody
//   {AsyncFunctionBody}
//
// AsyncArrowBindingIdentifier :
//   BindingIdentifier
//
// CoverCallExpressionAndAsyncArrowHead:
//   MemberExpression
export function parseAsyncArrowExpression(
  state: ParserState,
  context: Context,
  canAssign: 0 | 1,
  bindingType: BindingType,
  start: number
): any {
  const hasLineTerminator = state.hasLineTerminator;
  if (!hasLineTerminator) {
    // `async` [no LineTerminator here] AsyncArrowBindingIdentifier [no LineTerminator here] => AsyncConciseBody
    if ((state.token & (Token.FutureKeyword | Token.IsIdentifier)) !== 0) {
      if ((bindingType & BindingType.AllowLHS) === 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }
      return parseArrowAfterIdentifier(
        state,
        context,
        [parseBindingIdentifier(state, context, bindingType)],
        bindingType,
        /* isAsync */ 1,
        canAssign,
        start
      );
    }
  }

  const expr: any = parseIdentifierReferenceFromValue(state, context, 'async', bindingType, start);

  // `async ()`, `async () => ...`
  if (state.token === Token.LeftParen) {
    return parseCoverCallExpressionAndAsyncArrowHead(
      state,
      context,
      expr,
      hasLineTerminator,
      canAssign,
      bindingType,
      start
    );
  }

  // IdentifierReference [no LineTerminator here] `=>`
  if (state.token === Token.Arrow) {
    return parseArrowAfterIdentifier(state, context, expr, bindingType, /* isAsync */ 0, canAssign, start);
  }

  // `async`
  state.assignable = true;
  return expr;
}

export function parseArrowAfterIdentifier(
  state: ParserState,
  context: Context,
  params: any,
  bindingType: BindingType,
  isAsync: 0 | 1,
  canAssign: 0 | 1,
  start: number
): any {
  if (canAssign === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  if (context & Context.ErrorRecovery) params = createArray(state, [params], start);
  return parseArrowFunction(state, context, params, bindingType, isAsync, start);
}

export function parseArrowAfterGroup(
  state: ParserState,
  context: Context,
  params: any,
  destructible: Destructible,
  bindingType: BindingType,
  isAsync: 0 | 1,
  canAssign: 0 | 1,
  start: number
): any {
  if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidArrowDestructLHS,
      DiagnosticKind.Error
    );
  }

  // An while loop scale the best for large arrays, and a reversed while loop seem
  // to be the fastest way to iterate the array now when we need to convert
  // the arrow params to object pattern
  let i = params.length;

  while (i--) {
    reinterpretArrowParameter(params[i]);
  }
  if (canAssign === 0) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  if (context & Context.ErrorRecovery) params = createArray(state, params, start);
  return parseArrowFunction(state, context, params, bindingType, isAsync, start);
}

// `CoverCallExpressionAndAsyncArrowHead : MemberExpressionArguments`
export function parseCoverCallExpressionAndAsyncArrowHead(
  state: ParserState,
  context: Context,
  expression: any,
  hasLineTerminator: boolean,
  canAssign: 0 | 1,
  bindingType: BindingType,
  start: number
): any {
  nextToken(state, context | Context.AllowRegExp);
  let params: Types.Expression[] = [];
  if (state.token === Token.RightParen) {
    nextToken(state, context);

    if (state.token === Token.Arrow) {
      if (hasLineTerminator) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }
      return parseArrowAfterGroup(state, context, [], Destructible.None, bindingType, 1, canAssign, start);
    }

    state.assignable = false;
    if (context & Context.ErrorRecovery) params = createArray(state, params, start);
    return finishNode(
      state,
      context,
      start,
      { type: 'CallExpression', expression, arguments: params },
      NodeType.CallExpression
    );
  }

  let expr: any = null;

  let destructible: Destructible = Destructible.None;

  while (state.token !== Token.RightParen) {
    const startIndex = state.startIndex;
    const token = state.token;

    if ((token & Constants.IdentfierName) > 0) {
      expr = parseExpression(state, context, Precedence.Primary, bindingType, true, 1, startIndex);
      if (state.token === Token.Comma || state.token === Token.RightParen) {
        if (!state.assignable) destructible |= Destructible.NotDestructible;
      } else {
        if (state.token !== Token.Assign) destructible |= Destructible.NotDestructible;
        expression = parseLeftHandSide(state, context, expression, Precedence.LeftHandSide, bindingType, start);
        if (state.token !== Token.RightParen && state.token !== Token.Comma) {
          expression = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, start);
        }
      }
    } else if ((state.token & Token.IsPatternStart) > 0) {
      expr =
        state.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(state, context, false, bindingType | BindingType.ArgumentList, startIndex)
          : parseArrayLiteralOrPattern(state, context, false, bindingType | BindingType.ArgumentList, startIndex);

      destructible |= state.destructible;

      state.assignable = false;

      if (state.token !== Token.Comma && state.token !== Token.RightParen) {
        if (destructible & Destructible.MustDestruct) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
        }
        expr = parseLeftHandSide(state, context, expression, Precedence.Assign, bindingType, startIndex);
        destructible |= !state.assignable ? Destructible.NotDestructible : Destructible.Assignable;
      }
    } else if (token === Token.Ellipsis) {
      expr = parseSpreadOrRestElement(
        state,
        context,
        Token.RightParen,
        bindingType | BindingType.ArgumentList,
        false,
        true,
        start
      );

      destructible |=
        ((state.token as Token) === Token.RightParen ? Destructible.None : Destructible.NotDestructible) |
        state.destructible;
    } else {
      do {
        params.push(parseExpression(state, context, Precedence.Assign, bindingType, true, 1, startIndex));
        consumeOpt(state, context | Context.AllowRegExp, Token.Comma);
      } while (state.token !== Token.RightParen);

      consume(state, context, Token.RightParen);

      state.destructible = Destructible.NotDestructible;

      state.assignable = false;
      if (context & Context.ErrorRecovery) params = createArray(state, params, start);
      return finishNode(
        state,
        context,
        start,
        { type: 'CallExpression', expression, arguments: params as any },
        NodeType.CallExpression
      );
    }

    params.push(expr as Types.Expression);

    if (state.token !== Token.Comma) break;

    nextToken(state, context | Context.AllowRegExp);
  }

  consume(state, context, Token.RightParen);

  if (state.token === Token.Arrow) {
    if (hasLineTerminator) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }

    return parseArrowAfterGroup(state, context, params, destructible, bindingType, 1, canAssign, start);
  }

  if (destructible & Destructible.MustDestruct) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  if (context & Context.ErrorRecovery) params = createArray(state, params, start);
  state.destructible = destructible;

  state.assignable = false;

  return finishNode(
    state,
    context,
    start,
    { type: 'CallExpression', expression, arguments: params as any },
    NodeType.CallExpression
  );
}

// AssignmentPattern :
//   ObjectAssignmentPattern
//   ArrayAssignmentPattern
//
// AssignmentExpression :
//   LeftHandSideExpression `=` AssignmentExpression
//   LeftHandSideExpression AssignmentOperator AssignmentExpression
export function parseAssignmentPattern(
  state: ParserState,
  context: Context,
  left: any,
  bindingType: BindingType,
  start: number
): any {
  if (!state.assignable) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  nextToken(state, context | Context.AllowRegExp);
  const right = parseExpression(state, context, Precedence.Assign, bindingType, true, 1, start);
  state.destructible = Destructible.None;
  return finishNode(state, context, start, { type: 'AssignmentPattern', left, right }, NodeType.AssignmentPattern);
}

export function parseLabelIdentifier(state: ParserState, context: Context): Types.LabelIdentifier {
  const name = state.tokenValue;
  const start = state.startIndex;

  nextToken(state, context | Context.AllowRegExp);

  return finishNode(
    state,
    context,
    start,
    {
      type: 'LabelIdentifier',
      name
    } as any,
    NodeType.LabelIdentifier
  );
}

export function parseBindingIdentifierFromValue(
  state: ParserState,
  context: Context,
  name: string,
  start: number
): Types.BindingIdentifier {
  return finishNode(state, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
}

export function parseDirectives(
  state: ParserState,
  context: Context,
  _token: Token,
  value: string,
  start: number
): any {
  state.assignable = false;
  let expr = finishNode(state, context, start, { type: 'StringLiteral', value }, NodeType.StringLiteral);
  if (state.token !== Token.Semicolon) {
    expr = parseLeftHandSide(state, context, expr, Precedence.Assign, BindingType.AllowLHS, start);
    expr = parseCommaOperator(state, context, expr, start) as any;
  }
  return expr;
}
