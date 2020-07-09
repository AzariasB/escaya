import { Token, KeywordDescTable } from './token';
import { nextToken } from './scanner/scan';
import { Constants } from './constants';
import { scanTemplateTail } from './scanner/template';
import * as Types from './types';
import { NodeType } from './nodeType';
import { Options } from './escaya';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from './diagnostics';
import {
  insertSyntheticNode,
  parseLeafElement,
  createBlockArray,
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
  isClosingTokenOrComma,
  reinterpretToAssignment,
  reinterpretToPattern,
  validateFunctionName,
  canParseSemicolon,
  consumeSemicolon,
  isCaseOrDefaultKeyword,
  isStrictReservedWord,
  parseAndClassifyIdentifier,
  consume,
  consumeOpt,
  optionalBit,
  finishNode
} from './common';

/**
 * An interface for leafs
 */
export interface LeafsCallback {
  (parser: ParserState, context: Context): Types.ImportOrExport | Types.Statement;
}

/**
 * Interface for variable declaration and binding list
 */
export interface VarLexCallback {
  (parser: ParserState, context: Context, bindingType: BindingType, start: number):
    | Types.VariableDeclaration
    | Types.LexicalBinding;
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

  const parser = create(source);

  nextToken(parser, context | Context.AllowRegExp);

  /**
   * The stack of leafs currently being parsed.
   */
  const leafs: (Types.ImportOrExport | Types.Statement)[] = [];

  /**
   * The stack of directives currently being parsed.
   */
  const directives: string[] = [];

  while (parser.token === Token.StringLiteral) {
    // "use strict" must be the exact literal without escape sequences or line continuation.
    const { token, tokenValue, startIndex } = parser;
    nextToken(parser, context);
    if (parser.token & Token.IsAutomaticSemicolon) {
      if (tokenValue.length === 10 && tokenValue === 'use strict') context |= Context.Strict;
      consumeOpt(parser, context, Token.Semicolon);
      directives.push(parser.source.slice(startIndex, parser.index));
    } else {
      leafs.push(parseDirectives(parser, context, token, tokenValue, startIndex));
    }
  }

  // StatementList ::
  //   (StatementListItem)* <end_token>
  while (parser.token !== Token.EndOfSource) {
    leafs.push(callback(parser, context));
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
export function parseStatementListItem(parser: ParserState, context: Context): Types.Statement {
  switch (parser.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(parser, context, /* isAsync */ 0, BindingType.AllowLHS);
    case Token.AsyncKeyword:
      return parseFunctionDeclaration(parser, context, /* isAsync */ 1, BindingType.AllowLHS);
    case Token.ClassKeyword:
      return parseClassDeclaration(parser, context);
    case Token.LetKeyword:
      return parseLexicalDeclaration(parser, context, BindingType.Let);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(parser, context, BindingType.Const);
    case Token.ExportKeyword:
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidImportInSloppy,
        DiagnosticKind.Error
      );
    default:
      return parseStatement(parser, context);
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
export function parseStatement(parser: ParserState, context: Context): Types.Statement {
  switch (parser.token) {
    case Token.LeftBrace:
      return parseBlockStatement(parser, context);
    case Token.VarKeyword:
      return parseVariableStatement(parser, context);
    case Token.Semicolon:
      return parseEmptyStatement(parser, context);
    case Token.IfKeyword:
      return parseIfStatement(parser, context);
    case Token.ForKeyword:
      return parseForStatement(parser, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(parser, context);
    case Token.DoKeyword:
      return parseDoWhileStatement(parser, context);
    case Token.WhileKeyword:
      return parseWhileStatement(parser, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(parser, context);
    case Token.BreakKeyword:
      return parseBreakStatement(parser, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(parser, context);
    case Token.WithKeyword:
      return parseWithStatement(parser, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(parser, context);
    case Token.TryKeyword:
      return parseTryStatement(parser, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(parser, context);
    case Token.FunctionKeyword:
      // FunctionDeclaration are only allowed as a StatementListItem, not in
      // an arbitrary Statement position.
      if (context & Constants.StrictOrDisabledWebCompat) {
        addDiagnostic(
          parser,
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
      return parseFunctionDeclaration(parser, context, /* isAsync */ 0, BindingType.AllowLHS);
    case Token.ClassKeyword:
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.ClassForbiddenAsStatement,
        DiagnosticKind.Error
      );

    // Miscellaneous error cases arguably better caught here than elsewhere.

    case Token.CatchKeyword:
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.CatchWithoutTry, DiagnosticKind.Error);
      return parseTryStatement(parser, context);
    case Token.FinallyKeyword:
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.FinallyWithoutTry, DiagnosticKind.Error);
      return parseTryStatement(parser, context);
    default:
      return parseExpressionOrLabelledStatement(parser, context) as any;
  }
}

// LexicalDeclaration : LetOrConst BindingList `;`
export function parseLexicalDeclaration(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.LexicalDeclarationOrIdentifier {
  const token = parser.token;
  const start = parser.startIndex;

  nextToken(parser, context);

  // If the next token is not a 'let' declaration, it has to be an identifier.
  if (bindingType & BindingType.Let && (parser.token & Constants.NextTokenIsNotALetDeclaration) === 0) {
    return parseLetAsIdentifierReference(parser, context, token, bindingType, start);
  }

  const declarations = parseVariableDeclarationOrBindingList(parser, context, bindingType, parseLexicalBinding);

  consumeSemicolon(parser, context);

  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.LexicalBinding {
  let initializer: Types.Expression | null = null;
  const token = parser.token;
  const binding = parseBindingElement(parser, context, bindingType);
  if (parser.token === Token.Assign) {
    initializer = parseInitializer(parser, context);
  } else if (token & Token.IsPatternStart || bindingType === BindingType.Const) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      bindingType === BindingType.Const
        ? DiagnosticCode.ConstMissingDestrictInitializer
        : DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(parser, context, start, { type: 'LexicalBinding', binding, initializer }, NodeType.LexicalBinding);
}

// let expression statement
export function parseLetAsIdentifierReference(
  parser: ParserState,
  context: Context,
  token: Token,
  bindingType: BindingType,
  start: number
): Types.LabelledStatement | Types.ExpressionStatement {
  let expr: any = parseIdentifierReferenceFromValue(parser, context, 'let', bindingType, start);

  if (context & Context.Strict) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.LetInStrictMode, DiagnosticKind.Error);
  }
  // "let" followed by either "[", "{" or an identifier means a lexical
  // declaration, which should not appear here.
  // However, ASI may insert a line break before an identifier or a brace.
  if (parser.token === Token.LeftBracket) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.LetInStrictMode, DiagnosticKind.Error);
  }
  // 'let: foo'
  if (parser.token === Token.Colon) {
    return parseLabelledStatement(parser, context, token, 'let', start);
  }

  if (parser.token === Token.Arrow) {
    expr = parseArrowFunction(parser, context, [expr], bindingType | BindingType.AllowLHS, /* isAsync */ 0, start);
  } else {
    parser.assignable = true;
  }

  // 'let.x', 'let(x)', 'let?.x', 'let => x, let => x'
  expr = parseLeftHandSide(parser, context, expr, Precedence.Assign, bindingType, start);

  // 'let, let', 'let => x, let => x'
  expr = parseCommaOperator(parser, context, expr, start);

  return parseExpressionStatement(parser, context, expr, start);
}

// VariableStatement ::
//   VariableDeclarations ';'
export function parseVariableStatement(parser: ParserState, context: Context): Types.VariableStatement {
  const start = parser.startIndex;
  nextToken(parser, context);
  const declarations = parseVariableDeclarationOrBindingList(
    parser,
    context,
    BindingType.Var,
    parseVariableDeclaration
  );
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'VariableStatement', declarations }, NodeType.VariableStatement);
}

// BindingList :
//   LexicalBinding
//   BindingList `,` LexicalBinding
//
// VariableDeclarationList :
//   VariableDeclaration
//   VariableDeclarationList `,` VariableDeclaration
export function parseVariableDeclarationOrBindingList(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  callback: VarLexCallback
): any[] {
  const declarationList: (Types.LexicalBinding | Types.VariableDeclaration)[] = [];
  if (context & Context.ErrorRecovery) {
    const start = parser.startIndex;
    while (parser.token & Constants.IdentifierOrPattern) {
      declarationList.push(parseLexicalElements(parser, context, bindingType, callback));
      if (consumeOpt(parser, context, Token.Comma)) continue;
      // If we had 'var', 'let' or 'const' followed by something that's not an identifier or pattern,
      // then we break the loop here. Example 'var !' or 'let a !'.
      // The latter will be parsed as an 'UnaryExpression'.
      if ((parser.token & Constants.IdentifierOrPattern) === 0 || parser.hasLineTerminator) break;
      // Give a nice error message for weird cases like 'let a  b c  [] = b, {}' where comma is missing
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedComma, DiagnosticKind.Error);
    }
    return createBlockArray(parser, declarationList, start);
  }

  // Non-recovery mode

  do {
    declarationList.push(callback(parser, context, bindingType, parser.startIndex));
  } while (consumeOpt(parser, context, Token.Comma));

  return declarationList;
}

// VariableDeclaration :
//   BindingIdentifier Initializer?
//   BindingPattern Initializer
export function parseVariableDeclaration(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.VariableDeclaration {
  const token = parser.token;
  const binding = parseBindingElement(parser, context, bindingType);
  let initializer = null;
  if (parser.token === Token.Assign) {
    initializer = parseInitializer(parser, context);
  } else if (token & Token.IsPatternStart) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    parser,
    context,
    start,
    { type: 'VariableDeclaration', binding, initializer },
    NodeType.VariableDeclaration
  );
}

// IfStatement :
//  `if` `(` Expression `)` Statement `else` Statement
//  `if` `(` Expression `)` Statement
export function parseIfStatement(parser: ParserState, context: Context): Types.IfStatement {
  const start = parser.startIndex;
  nextToken(parser, context);
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(parser, context | Context.AllowRegExp, Token.RightParen);
  const consequent = parseStatement(parser, context);
  const alternate = consumeOpt(parser, context, Token.ElseKeyword) ? parseStatement(parser, context) : null;

  return finishNode(
    parser,
    context,
    start,
    { type: 'IfStatement', expression, consequent, alternate },
    NodeType.IfStatement
  );
}

// `while` `(` Expression `)` Statement
export function parseWhileStatement(parser: ParserState, context: Context): Types.WhileStatement {
  const start = parser.startIndex;
  nextToken(parser, context);
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(parser, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(parser, context | Context.InIteration);
  return finishNode(parser, context, start, { type: 'WhileStatement', expression, statement }, NodeType.WhileStatement);
}

// `do` Statement `while` `(` Expression `)` `;`
export function parseDoWhileStatement(parser: ParserState, context: Context): Types.DoWhileStatement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  const statement = parseStatement(parser, context | Context.InIteration);
  consume(parser, context, Token.WhileKeyword);
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(parser, context | Context.AllowRegExp, Token.RightParen);
  consumeOpt(parser, context | Context.AllowRegExp, Token.Semicolon);
  return finishNode(
    parser,
    context,
    start,
    { type: 'DoWhileStatement', statement, expression },
    NodeType.DoWhileStatement
  );
}

// DebuggerStatement ::
//   'debugger' ';'
export function parseDebuggerStatement(parser: ParserState, context: Context): Types.DebuggerStatement {
  const start = parser.startIndex;
  nextToken(parser, context);
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'DebuggerStatement' }, NodeType.DebuggerStatement);
}

// EmptyStatement ::
// ';'
export function parseEmptyStatement(parser: ParserState, context: Context): Types.EmptyStatement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  return finishNode(parser, context, start, { type: 'EmptyStatement' }, NodeType.EmptyStatement);
}

// SwitchStatement :
//   'switch' '(' Expression ')' '{' CaseClause* '}'
// CaseClause :
//   'case' Expression ':' StatementList
//   'default' ':' StatementList
export function parseSwitchStatement(parser: ParserState, context: Context): Types.SwitchStatement {
  const start = parser.startIndex;
  nextToken(parser, context);
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
  consume(parser, context, Token.RightParen);
  consume(parser, context, Token.LeftBrace);
  const clauses = parseCaseBlock(parser, context);
  consume(parser, context, Token.RightBrace);
  return finishNode(parser, context, start, { type: 'SwitchStatement', expression, clauses }, NodeType.SwitchStatement);
}

// CaseBlock :
//   `{` CaseClauses? `}`
//   `{` CaseClauses? DefaultClause CaseClauses? `}`
export function parseCaseBlock(parser: ParserState, context: Context): (Types.DefaultClause | Types.CaseClause)[] {
  const clauses: (Types.DefaultClause | Types.CaseClause)[] = [];
  if (context & Context.ErrorRecovery) {
    const start = parser.startIndex;
    // Both '{' and '}' are optional, but if the '{' is missing - the result will lead to a
    // number of strange cases.
    //
    // For example 'switch (a) case foo: !' will force the parser to
    // parse 'foo' as an expression, but '!' - which is usually invalid syntax - will
    // end up as an 'UnaryExpression' as part of the 'CatchClause'
    //
    // Another weird case is this 'switch (a) case foo ! \n bar'. Here 'bar' will be the 'operand' of the
    // 'UnaryExpression' as part of the 'CatchClause'
    while (isCaseOrDefaultKeyword(parser.token)) {
      clauses.push(parseLeafElement(parser, context, parseCaseOrDefaultClause));
    }
    return createBlockArray(parser, clauses, start);
  }

  while (parser.token !== Token.RightBrace) {
    clauses.push(parseCaseOrDefaultClause(parser, context));
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
  parser: ParserState,
  context: Context
): Types.CaseClause | Types.DefaultClause {
  const statements: Types.Statement[] = [];
  const start = parser.startIndex;
  if (parser.token === Token.CaseKeyword) {
    nextToken(parser, context | Context.AllowRegExp);
    const expression = parseExpressions(parser, context);
    consume(parser, context | Context.AllowRegExp, Token.Colon);
    while (parser.token & Constants.SwitchClauce) {
      statements.push(parseStatementListItem(parser, context | Context.InSwitch));
    }

    return finishNode(parser, context, start, { type: 'CaseClause', expression, statements }, NodeType.CaseClause);
  }
  consume(parser, context, Token.DefaultKeyword);
  consume(parser, context | Context.AllowRegExp, Token.Colon);
  while (parser.token & Constants.SwitchClauce) {
    statements.push(parseStatementListItem(parser, context | Context.InSwitch));
  }

  return finishNode(parser, context, start, { type: 'DefaultClause', statements }, NodeType.DefaultClause);
}

// BreakStatement :
//   `break` `;`
//   `break` [no LineTerminator here] LabelIdentifier `;`
//
export function parseBreakStatement(parser: ParserState, context: Context): Types.BreakStatement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  let label: Types.LabelIdentifier | null = null;
  if (parser.token & Constants.LabelIdentifier && !parser.hasLineTerminator) {
    label = parseLabelIdentifier(parser, context);
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.IllegalBreak, DiagnosticKind.Error);
  }
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'BreakStatement', label }, NodeType.BreakStatement);
}

// ContinueStatement :
//   `continue` `;`
//   `continue` [no LineTerminator here] LabelIdentifier `;`
export function parseContinueStatement(parser: ParserState, context: Context): Types.ContinueStatement {
  if ((context & Context.InIteration) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.IllegalContinue, DiagnosticKind.Error);
  }
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  let label: Types.LabelIdentifier | null = null;
  if (parser.token & Constants.LabelIdentifier && !parser.hasLineTerminator) {
    label = parseLabelIdentifier(parser, context);
  }
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ContinueStatement', label }, NodeType.ContinueStatement);
}

// ReturnStatement :
//   `return` `;`
//   `return` [no LineTerminator here] Expression `;`
export function parseReturnStatement(parser: ParserState, context: Context): Types.ReturnStatement {
  if ((context & Constants.ReturnOrGlobalReturn) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.IllegalReturn, DiagnosticKind.Error);
  }
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  const expression = canParseSemicolon(parser) ? null : parseExpressions(parser, context);
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ReturnStatement', expression }, NodeType.ReturnStatement);
}

// WithStatement :
//   `with` `(` Expression `)` Statement
export function parseWithStatement(parser: ParserState, context: Context): Types.WithStatement {
  if (context & Context.Strict) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.StrictWith, DiagnosticKind.Error);
  }
  const start = parser.startIndex;
  nextToken(parser, context);
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expression = parseExpressions(parser, context);
  consume(parser, context | Context.AllowRegExp, Token.RightParen);
  const statement = parseStatement(parser, context | Context.InIteration);
  return finishNode(parser, context, start, { type: 'WithStatement', expression, statement }, NodeType.WithStatement);
}

// ThrowStatement :
//   `throw` [no LineTerminator here] Expression `;`
export function parseThrowStatement(parser: ParserState, context: Context): Types.ThrowStatement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  if (parser.hasLineTerminator) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.NewlineAfterThrow, DiagnosticKind.Error);
  }
  const expression = parseExpressions(parser, context);
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ThrowStatement', expression }, NodeType.ThrowStatement);
}

// TryStatement :
//   `try` Block Catch
//   `try` Block Finally
//   `try` Block Catch Finally
export function parseTryStatement(parser: ParserState, context: Context): Types.TryStatement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  const block = parseBlockStatement(parser, context);
  const catchClause = parser.token === Token.CatchKeyword ? parseCatchClause(parser, context) : null;
  let finalizer = null;
  if (consumeOpt(parser, context | Context.AllowRegExp, Token.FinallyKeyword)) {
    finalizer = parseBlockStatement(parser, context);
  }
  if (!catchClause && !finalizer) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.NoCatchOrFinally, DiagnosticKind.Error);
  }

  return finishNode(
    parser,
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
export function parseCatchClause(parser: ParserState, context: Context): any {
  let binding = null;
  nextToken(parser, context | Context.AllowRegExp);
  const start = parser.startIndex;
  const bindingType = parser.token & Token.IsPatternStart ? BindingType.CatchPattern : BindingType.CatchIdentifier;
  if (consumeOpt(parser, context, Token.LeftParen)) {
    binding = parseBindingElement(parser, context, bindingType) as any;
    consume(parser, context | Context.AllowRegExp, Token.RightParen);
  }
  const block = parseBlockStatement(parser, context);
  return finishNode(parser, context, start, { type: 'CatchClause', binding, block }, NodeType.CatchClause);
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
  parser: ParserState,
  context: Context
): Types.Expression | Types.LabelledStatement | Types.ExpressionStatement {
  let expr: Types.IdentifierReference | Types.Expression | Types.CommaOperator;
  const { token, tokenValue, startIndex } = parser;

  expr = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, startIndex);

  if (token & Constants.IdentifierOrFutureKeyword && parser.token === Token.Colon) {
    return parseLabelledStatement(parser, context, token, tokenValue, startIndex);
  }

  return parseExpressionStatement(parser, context, parseCommaOperator(parser, context, expr, startIndex), startIndex);
}

// LabelledStatement :
//   LabelIdentifier : LabelledItem
//
// LabelledItem :
//   Statement
//   FunctionDeclaration
export function parseLabelledStatement(
  parser: ParserState,
  context: Context,
  token: Token,
  labelValue: string,
  start: number
): Types.LabelledStatement {
  const label = parseLabelIdentifierFromValue(parser, context, token, labelValue, start);

  nextToken(parser, context | Context.AllowRegExp); // skip: ':'

  return finishNode(
    parser,
    context,
    start,
    { type: 'LabelledStatement', label, labelledItem: parseStatement(parser, context) },
    NodeType.LabelledStatement
  );
}

export function parseLabelIdentifierFromValue<T extends Token>(
  parser: ParserState,
  context: Context,
  t: T,
  name: string,
  start: number
): Types.LabelIdentifier {
  if (context & (Context.Module | Context.Await) && t === Token.AwaitKeyword) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.AwaitOutsideAsync, DiagnosticKind.Error);
  }
  if (context & (Context.Strict | Context.Yield) && t === Token.YieldKeyword) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DisallowedYieldInContext,
      DiagnosticKind.Error
    );
  }
  if ((context & Context.Strict) === Context.Strict && (t & Token.FutureKeyword) === Token.FutureKeyword) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedStrictReserved,
      DiagnosticKind.Error
    );
  }
  return finishNode(parser, context, start, { type: 'LabelIdentifier', name }, NodeType.LabelIdentifier);
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
  parser: ParserState,
  context: Context
): Types.ForStatement | Types.ForAwaitStatement | Types.ForOfStatement | Types.ForInStatement {
  const start = parser.startIndex;
  consume(parser, context, Token.ForKeyword);
  let isAwait = false;

  if (parser.token === Token.AwaitKeyword) {
    // 'for-await' can only be used inside an async function
    if ((context & Context.Await) !== Context.Await) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidForAwait, DiagnosticKind.Error);
    }
    nextToken(parser, context);
    isAwait = true;
  }

  consume(parser, context | Context.AllowRegExp, Token.LeftParen);

  let initializer: any = null;
  let expression: Types.Expression | null = null;
  let statement: Types.Statement;
  let condition: Types.Expression | null = null;
  let incrementor: Types.Expression | null = null;
  let destructible;
  const token = parser.token;

  if (token !== Token.Semicolon) {
    // 'var', 'let', 'const'
    if (parser.token & Token.IsVarDecl) {
      const declStart = parser.startIndex;

      if (token === Token.LetKeyword) {
        initializer = parseIdentifierReference(parser, context, BindingType.None);

        if (parser.token & Constants.NextTokenIsLetAsIdentifierOrPattern) {
          if (parser.token === Token.InKeyword) {
            if (context & Context.Strict) {
              addDiagnostic(
                parser,
                context,
                DiagnosticSource.Parser,
                DiagnosticCode.DisallowedLetInStrict,
                DiagnosticKind.Error
              );
            }
          } else {
            initializer = parseForDeclaration(parser, context | Context.DisallowIn, BindingType.Let, token, declStart);
          }
          parser.assignable = true;
        } else {
          // In sloppy mode, `let` must now be a regular var name.
          if (context & Context.Strict) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.DisallowedLetInStrict,
              DiagnosticKind.Error
            );
          }

          parser.assignable = true;

          initializer = parseLeftHandSide(
            parser,
            context,
            initializer,
            Precedence.LeftHandSide,
            BindingType.AllowLHS,
            start
          );

          // `for of` only allows LeftHandSideExpressions which do not start with `let`, and no other production matches
          if (parser.token === Token.OfKeyword) {
            addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.ForOfLet, DiagnosticKind.Error);
          }
        }
      } else if (consumeOpt(parser, context, Token.ConstKeyword)) {
        initializer = parseForDeclaration(parser, context | Context.DisallowIn, BindingType.Const, token, declStart);
        parser.assignable = true;
      } else {
        nextToken(parser, context);
        initializer = parseForDeclaration(parser, context | Context.DisallowIn, BindingType.Var, token, declStart);
        parser.assignable = true;
      }

      if (
        isAwait
          ? consume(parser, context | Context.AllowRegExp, Token.OfKeyword)
          : consumeOpt(parser, context | Context.AllowRegExp, Token.OfKeyword)
      ) {
        expression = parseExpression(
          parser,
          context,
          Precedence.LeftHandSide,
          BindingType.AllowLHS,
          true,
          parser.startIndex
        );

        consume(parser, context | Context.AllowRegExp, Token.RightParen);

        return finishNode(
          parser,
          context,
          start,
          {
            type: isAwait ? 'ForAwaitStatement' : 'ForOfStatement',
            initializer,
            expression,
            statement: parseStatement(parser, context | Context.InIteration)
          } as any,
          isAwait ? NodeType.ForAwaitStatement : NodeType.ForOfStatement
        );
      }

      if (consumeOpt(parser, context | Context.AllowRegExp, Token.InKeyword)) {
        if (!parser.assignable) {
          addDiagnostic(
            parser,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.CantAssignForInLoop,
            DiagnosticKind.Error
          );
        }

        expression = parseExpressions(parser, context);

        consume(parser, context | Context.AllowRegExp, Token.RightParen);

        statement = parseStatement(parser, context | Context.InIteration);

        return finishNode(
          parser,
          context,
          start,
          { type: 'ForInStatement', initializer, expression, statement },
          NodeType.ForInStatement
        );
      }

      initializer = parseLeftHandSide(
        parser,
        context,
        initializer,
        Precedence.Assign,
        BindingType.AllowLHS,
        parser.startIndex
      );

      initializer = parseCommaOperator(parser, context, initializer, parser.startIndex);

      consume(parser, context, Token.Semicolon);

      if (parser.token !== Token.Semicolon) {
        condition = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, parser.startIndex);
      }

      consume(parser, context, Token.Semicolon);

      if (parser.token !== Token.RightParen) incrementor = parseExpressions(parser, context);

      consume(parser, context | Context.AllowRegExp, Token.RightParen);

      statement = parseStatement(parser, context | Context.InIteration);

      return finishNode(
        parser,
        context,
        start,
        { type: 'ForStatement', initializer, condition, incrementor, statement },
        NodeType.ForStatement
      );
    }

    if (parser.token & Token.IsPatternStart) {
      initializer =
        token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, false, BindingType.Pattern | BindingType.Literal, start)
          : parseArrayLiteralOrPattern(parser, context, false, BindingType.Pattern | BindingType.Literal, start);

      if (parser.token & Token.IsAssignOp && parser.token !== Token.Assign) {
        addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }

      destructible = parser.destructible;

      parser.assignable = (destructible & Destructible.NotDestructible) !== Destructible.NotDestructible;

      initializer = parseLeftHandSide(
        parser,
        context,
        initializer,
        Precedence.LeftHandSide,
        BindingType.AllowLHS,
        start
      );
    } else {
      initializer = parseExpression(parser, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, start);
    }
  }

  if (
    isAwait
      ? consume(parser, context | Context.AllowRegExp, Token.OfKeyword)
      : consumeOpt(parser, context | Context.AllowRegExp, Token.OfKeyword)
  ) {
    if (!parser.assignable) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.CantAssignForLoop, DiagnosticKind.Error);
    }

    reinterpretToAssignment(initializer, false);

    expression = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, parser.startIndex);

    consume(parser, context | Context.AllowRegExp, Token.RightParen);

    statement = parseStatement(parser, context | Context.InIteration);

    return finishNode(
      parser,
      context,
      start,
      { type: isAwait ? 'ForAwaitStatement' : 'ForOfStatement', initializer, expression, statement } as any,
      isAwait ? NodeType.ForAwaitStatement : NodeType.ForOfStatement
    );
  }

  if (consumeOpt(parser, context | Context.AllowRegExp, Token.InKeyword)) {
    if (!parser.assignable) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.CantAssignForInLoop, DiagnosticKind.Error);
    }

    reinterpretToAssignment(initializer, false);

    expression = parseExpressions(parser, context);

    consume(parser, context | Context.AllowRegExp, Token.RightParen);

    statement = parseStatement(parser, context | Context.InIteration);

    return finishNode(
      parser,
      context,
      start,
      { type: 'ForInStatement', initializer, expression, statement },
      NodeType.ForInStatement
    );
  }

  if (token & Token.IsPatternStart) reinterpretToAssignment(initializer, false);

  initializer = parseLeftHandSide(
    parser,
    context,
    initializer,
    Precedence.Assign,
    BindingType.AllowLHS,
    parser.startIndex
  );

  initializer = parseCommaOperator(parser, context, initializer, parser.startIndex);

  consume(parser, context, Token.Semicolon);

  if (parser.token !== Token.Semicolon) {
    condition = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, parser.startIndex);
  }

  consume(parser, context, Token.Semicolon);

  if (parser.token !== Token.RightParen) incrementor = parseExpressions(parser, context);

  consume(parser, context | Context.AllowRegExp, Token.RightParen);

  statement = parseStatement(parser, context | Context.InIteration);

  return finishNode(
    parser,
    context,
    start,
    { type: 'ForStatement', initializer, condition, incrementor, statement },
    NodeType.ForStatement
  );
}

// ForDeclaration : LetOrConst ForBinding
export function parseForDeclaration(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  t: Token,
  start: number
): Types.ForDeclaration {
  let declarations: any = [];
  let count = 0;
  if (context & Context.ErrorRecovery) {
    const start = parser.startIndex;
    while (parser.token & Constants.IdentifierOrPattern) {
      declarations.push(parseLexicalElements(parser, context, bindingType, parseForBinding));
      if (consumeOpt(parser, context, Token.Comma)) continue;
      if ((parser.token & Constants.IdentifierOrPattern) === 0 || parser.hasLineTerminator) break;
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        parser.token === Token.InKeyword
          ? DiagnosticCode.ForInLoopMultiBindings
          : DiagnosticCode.ForOfLoopMultiBindings,
        DiagnosticKind.Error
      );
      count++;
    }
    declarations = createBlockArray(parser, declarations, start);
  } else {
    do {
      declarations.push(parseForBinding(parser, context, bindingType, parser.startIndex));
      count++;
    } while (consumeOpt(parser, context, Token.Comma));
  }

  if (count > 1 && parser.token & Token.IsInOrOf) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      parser.token === Token.InKeyword ? DiagnosticCode.ForInLoopMultiBindings : DiagnosticCode.ForOfLoopMultiBindings,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    parser,
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
export function parseForBinding(parser: ParserState, context: Context, bindingType: BindingType, start: number) {
  let initializer: Types.Expression | null = null;
  const isPattern = (parser.token & Token.IsPatternStart) === Token.IsPatternStart;
  const binding = parseBindingElement(parser, context, bindingType);
  if (parser.token === Token.Assign) {
    initializer = parseInitializer(parser, context);
    if (parser.token & Token.IsInOrOf) {
      if (
        parser.token === Token.OfKeyword ||
        (parser.token === Token.InKeyword &&
          (bindingType & (BindingType.Const | BindingType.Let) ||
            isPattern ||
            context & Constants.StrictOrDisabledWebCompat))
      ) {
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.DeclMissingDestructInitializer,
          DiagnosticKind.Error
        );
      }
    }
  } else if ((bindingType & BindingType.Const || isPattern) && (parser.token & Token.IsInOrOf) === 0) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.DeclMissingDestructInitializer,
      DiagnosticKind.Error
    );
  }
  return finishNode(
    parser,
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

// BlockStatement : Block
export function parseBlockStatement(parser: ParserState, context: Context): Types.BlockStatement {
  const start = parser.startIndex;
  const statements = parseBlock(parser, context, start);
  return finishNode(parser, context, start, { type: 'BlockStatement', statements }, NodeType.BlockStatement);
}

// Block : `{` StatementList `}`
export function parseBlock(parser: ParserState, context: Context, start: number): Types.Statement[] {
  if (context & Context.ErrorRecovery) {
    let statements: any | Types.Statement[] = [];
    if (consume(parser, context | Context.AllowRegExp, Token.LeftBrace)) {
      while (parser.token & Constants.BlockStatement) {
        statements.push(parseLeafElement(parser, context, parseStatementListItem));
        if ((parser.token & Constants.BlockStatement) === 0) break;
      }
      consume(parser, context | Context.AllowRegExp, Token.RightBrace);
      statements = createBlockArray(parser, statements, start);
    } else {
      statements = createMissingList(start);
    }
    return statements;
  }
  consume(parser, context | Context.AllowRegExp, Token.LeftBrace);
  const statements: Types.Statement[] = [];
  while (parser.token !== Token.RightBrace) statements.push(parseStatementListItem(parser, context));
  consume(parser, context | Context.AllowRegExp, Token.RightBrace);
  return statements;
}

// ModuleItemList :
//   ModuleItem
//   ModuleItemList ModuleItem
//
// ModuleItem :
//   ImportDeclaration
//   ExportDeclaration
//   StatementListItem
export function parseModuleItem(parser: ParserState, context: Context): Types.ImportOrExport | Types.Statement {
  switch (parser.token) {
    case Token.ImportKeyword:
      return parseImportDeclaration(parser, context);
    case Token.ExportKeyword:
      return parseExportDeclaration(parser, context, BindingType.AllowLHS);
    default:
      return parseStatementListItem(parser, context);
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
export function parseImportDeclaration(parser: ParserState, context: Context): any {
  const startIndex = parser.startIndex;
  nextToken(parser, context);

  let namedBinding: Types.BindingIdentifier | null = null;
  let defaultBinding: Types.BindingIdentifier | null = null;
  let namedImports: Types.ImportSpecifier[] = [];
  let fromClause: Types.StringLiteral | null = null;
  let moduleSpecifier: Types.StringLiteral | null = null;

  if (parser.token === Token.StringLiteral) {
    moduleSpecifier = parseStringLiteral(parser, context);
    return finishNode(
      parser,
      context,
      startIndex,
      { type: 'ImportDeclaration', moduleSpecifier, defaultBinding, namedImports, namedBinding, fromClause },
      NodeType.ImportDeclaration
    );
  }

  if (consumeOpt(parser, context, Token.Multiply)) {
    consume(parser, context, Token.AsKeyword);
    namedBinding = parseBindingIdentifier(parser, context, BindingType.None);
  } else if ((parser.token & Constants.IdentfierName) > 0) {
    defaultBinding = parseBindingIdentifier(parser, context, BindingType.None);
    if (consumeOpt(parser, context, Token.Comma)) {
      if (consumeOpt(parser, context, Token.Multiply)) {
        consume(parser, context, Token.AsKeyword);
        namedBinding = parseBindingIdentifier(parser, context, BindingType.None);
      } else {
        namedImports = parseImportsList(parser, context, startIndex);
      }
    }
  } else if (consumeOpt(parser, context | Context.AllowRegExp, Token.LeftParen)) {
    return parseImportCallFromModule(parser, context, BindingType.AllowLHS, startIndex);
  } else if (consumeOpt(parser, context, Token.Period)) {
    return parseImportMetaFromModule(parser, context, BindingType.AllowLHS, startIndex);
  } else {
    namedImports = parseImportsList(parser, context, startIndex);
  }

  fromClause = parseFromClause(parser, context);
  consumeSemicolon(parser, context);
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'ImportDeclaration', moduleSpecifier, defaultBinding, fromClause, namedImports, namedBinding },
    NodeType.ImportDeclaration
  );
}

// ImportsList:
//  ImportSpecifier
//  ImportsList, ImportSpecifier
export function parseImportsList(parser: ParserState, context: Context, _start: number): Types.ImportSpecifier | any {
  const importsList: Types.ImportSpecifier[] = [];
  consume(parser, context, Token.LeftBrace);
  while ((parser.token & Constants.IdentfierName) > 0) {
    importsList.push(parseImportSpecifier(parser, context));
    if (parser.token !== Token.RightBrace) consume(parser, context, Token.Comma);
  }
  consume(parser, context, Token.RightBrace);
  return importsList;
}

// ImportSpecifier
export function parseImportSpecifier(parser: ParserState, context: Context): Types.ImportSpecifier {
  const { tokenValue, startIndex } = parser;
  nextToken(parser, context);
  if (consumeOpt(parser, context, Token.AsKeyword)) {
    const name = parseIdentifierNameFromValue(parser, context, tokenValue, BindingType.AllowLHS, startIndex) as any;
    const binding = parseBindingIdentifier(parser, context, BindingType.None);
    return finishNode(
      parser,
      context,
      startIndex,
      { type: 'ImportSpecifier', name, binding },
      NodeType.ImportSpecifier
    );
  }
  const name = parseBindingIdentifierFromValue(parser, context, tokenValue, startIndex);
  return finishNode(
    parser,
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
export function parseExportDeclaration(parser: ParserState, context: Context, bindingType: BindingType): any {
  const startIndex = parser.startIndex;
  consume(parser, context | Context.AllowRegExp, Token.ExportKeyword);

  let declaration: Types.ExportDeclarations | null = null;
  const namedExports: Types.ExportSpecifier[] = [];
  let fromClause: Types.StringLiteral | null = null;
  let namedBinding: Types.IdentifierName | null = null;

  if (consumeOpt(parser, context | Context.AllowRegExp, Token.DefaultKeyword)) {
    let declaration: any;
    switch (parser.token) {
      case Token.FunctionKeyword:
        declaration = parseFunctionDeclaration(parser, context | Context.Default, /* isAsync */ 0, bindingType);
        break;
      case Token.AsyncKeyword:
        declaration = parseFunctionDeclaration(parser, context | Context.Default, /* isAsync */ 1, bindingType);
        break;
      case Token.ClassKeyword:
        declaration = parseClassDeclaration(parser, context | Context.Default);
        break;
      default:
        declaration = parseExpression(parser, context, Precedence.Assign, bindingType, true, startIndex);
        consumeSemicolon(parser, context);
    }
    return finishNode(
      parser,
      context,
      startIndex,
      { type: 'ExportDeclaration', declaration, default: true, namedExports, fromClause, namedBinding },
      NodeType.ExportDeclaration
    );
  }
  switch (parser.token) {
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(parser, context, BindingType.Let) as any;
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(parser, context, BindingType.Const) as any;
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(parser, context, /* isAsync */ 0, bindingType);
      break;
    case Token.AsyncKeyword:
      declaration = parseFunctionDeclaration(parser, context, /* isAsync */ 1, bindingType);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(parser, context);
      break;
    case Token.LeftBrace:
      nextToken(parser, context);
      while ((parser.token & Constants.IdentfierName) > 0) {
        namedExports.push(parseExportSpecifier(parser, context));
        if (parser.token !== Token.RightBrace) consume(parser, context, Token.Comma);
      }
      consume(parser, context, Token.RightBrace);
      if (parser.token === Token.FromKeyword) fromClause = parseFromClause(parser, context);
      consumeSemicolon(parser, context);
      break;
    case Token.Multiply: {
      nextToken(parser, context);
      if (consumeOpt(parser, context, Token.AsKeyword)) {
        namedBinding = parseIdentifierName(parser, context);
      }
      fromClause = parseFromClause(parser, context);
      consumeSemicolon(parser, context);
      break;
    }
    default:
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'ExportDeclaration', namedExports, fromClause, namedBinding, declaration, default: false },
    NodeType.ExportDeclaration
  );
}

export function parseExportSpecifier(parser: ParserState, context: Context): Types.ExportSpecifier {
  const startIndex = parser.startIndex;
  const name = parseIdentifierName(parser, context);
  if (consumeOpt(parser, context, Token.AsKeyword)) {
    const exportedName = parseIdentifierName(parser, context);
    return finishNode(
      parser,
      context,
      startIndex,
      { type: 'ExportSpecifier', name, exportedName },
      NodeType.ExportSpecifier
    );
  }
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'ExportSpecifier', name, exportedName: null },
    NodeType.ExportSpecifier
  );
}

// FromClause : `from` ModuleSpecifier
export function parseFromClause(parser: ParserState, context: Context): Types.StringLiteral {
  consume(parser, context, Token.FromKeyword);
  if (parser.token !== Token.StringLiteral) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  return parseStringLiteral(parser, context);
}

// ImportCall :
//  import
export function parseImportCallFromModule(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.ExpressionStatement {
  let expression: any;
  let expr = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  consume(parser, context, Token.RightParen);
  if ((parser.token & (Token.IsBinaryOp | Token.IsMember | Token.IsAssignOp)) !== 0) {
    expr = parseLeftHandSide(parser, context, expr, Precedence.Assign, bindingType, start);
  }
  expression = finishNode(parser, context, start, { type: 'ImportCall', import: expr }, NodeType.ImportCall);
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}

// ImportMeta:
//   import.meta
export function parseImportMetaFromModule(
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.ExpressionStatement {
  consume(parser, context, Token.MetaKeyword);
  let expression: any = finishNode(parser, context, start, { type: 'ImportMeta' }, NodeType.ImportMeta);
  parser.assignable = false;
  expression = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, parser.startIndex);
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}

// ExpressionStatement :
//   [lookahead != `{`, `function`, `async` [no LineTerminator here] `function`, `class`, `let` `[` ] Expression `;`
export function parseExpressionStatement(
  parser: ParserState,
  context: Context,
  expression: Types.Expression,
  start: number
): Types.ExpressionStatement | Types.LabelledStatement {
  consumeSemicolon(parser, context);
  return finishNode(parser, context, start, { type: 'ExpressionStatement', expression }, NodeType.ExpressionStatement);
}
// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpressions(parser: ParserState, context: Context): Types.Expression {
  const startIndex = parser.startIndex;
  const expr = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, startIndex);
  return parseCommaOperator(parser, context, expr, startIndex);
}

export function parseCommaOperator(
  parser: ParserState,
  context: Context,
  expr: Types.Expression,

  start: number
): Types.CommaOperator | Types.Expression {
  if (parser.token !== Token.Comma) return expr;
  nextToken(parser, context | Context.AllowRegExp);
  const leafs = [expr];
  do {
    leafs.push(parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start));
  } while (consumeOpt(parser, context | Context.AllowRegExp, Token.Comma));
  return finishNode(parser, context, start, { type: 'CommaOperator', leafs }, NodeType.CommaOperator);
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
  parser: ParserState,
  context: Context,
  left: any,

  start: number
): Types.AssignmentExpression | Types.Expression {
  if (!parser.assignable)
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidLHS, DiagnosticKind.Error);
  const operator = KeywordDescTable[parser.token & Token.Type] as any;
  nextToken(parser, context | Context.AllowRegExp);
  const right = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
  parser.assignable = false;
  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  shortCircuit: Types.Expression,
  bindingType: BindingType,
  start: number
): Types.ConditionalExpression {
  const consequent = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  consume(parser, context | Context.AllowRegExp, Token.Colon);
  const alternate = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  parser.assignable = false;
  return finishNode(
    parser,
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
  parser: ParserState,
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
    t = parser.token;
    prec = t & Token.Precedence;
    if (prec + (((t === Token.Exponentiate) as any) << 8) - (((bit === t) as any) << 12) <= minPrec) return left;
    nextToken(parser, context | Context.AllowRegExp);

    right = parseBinaryExpression(
      parser,
      context,
      parseExpression(parser, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, parser.startIndex),
      t & Token.Precedence,
      start
    );
    left = finishNode(
      parser,
      context,
      start,
      { type: 'BinaryExpression', left, right, operator: KeywordDescTable[t & Token.Type] as Types.BinaryOperator },
      NodeType.BinaryExpression
    );
    parser.assignable = false;
  } while ((parser.token & Token.IsBinaryOp) > 0);

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
  parser: ParserState,
  context: Context,
  member: any,
  start: number
): Types.MemberExpression | Types.CallExpression | Types.OptionalExpression | Types.TaggedTemplateExpression {
  switch (parser.token as Token) {
    /* Property */
    case Token.Period:
      parser.assignable = true;
      nextToken(parser, context | Context.AllowRegExp);
      if ((parser.token & Constants.IdentfierName) === 0)
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.InvalidDotProperty,
          DiagnosticKind.Error
        );
      const expression = parseIdentifierName(parser, context);
      return finishNode(
        parser,
        context,
        start,
        { type: 'MemberExpression', member, expression, computed: false },
        NodeType.MemberExpression
      );

    /* Property */
    case Token.LeftBracket: {
      nextToken(parser, context | Context.AllowRegExp);
      const expression = parseExpressions(parser, context);
      consume(parser, context, Token.RightBracket);
      parser.assignable = true;
      return finishNode(
        parser,
        context,
        start,
        { type: 'MemberExpression', member, expression, computed: true },
        NodeType.MemberExpression
      );
    }

    /* Call */
    case Token.LeftParen:
      const args = parseArguments(parser, context);
      parser.assignable = false;
      return finishNode(
        parser,
        context,
        start,
        { type: 'CallExpression', expression: member, arguments: args },
        NodeType.CallExpression
      );

    /* Optional Property */
    case Token.QuestionMarkPeriod:
      parser.assignable = false;
      return finishNode(
        parser,
        context,
        start,
        { type: 'OptionalExpression', member, chain: parseMemberOrCallChain(parser, context) },
        NodeType.OptionalExpression
      );
    case Token.TemplateTail:
      const expressionn: any = parseTemplateLiteral(parser, context | Context.TaggedTemplate);
      member = finishNode(
        parser,
        context,
        start,
        { type: 'TaggedTemplateExpression', expression: expressionn, member, literal: [] } as any,
        NodeType.TaggedTemplateExpression
      );
      break;
    case Token.TemplateCont:
      const literal: any = parseTemplate(parser, context | Context.TaggedTemplate);
      member = finishNode(
        parser,
        context,
        start,
        { type: 'TaggedTemplateExpression', member, literal, expression: null } as any,
        NodeType.TaggedTemplateExpression
      );
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
  parser: ParserState,
  context: Context
): Types.MemberChain | Types.CallChain | any {
  consume(parser, context, Token.QuestionMarkPeriod);
  if (parser.token === Token.QuestionMarkPeriod) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  let property: Types.IdentifierName | Types.Expression | null = null;
  let chain: Types.MemberChain | Types.CallChain | null = null;
  let start = parser.startIndex;
  let computed = false;

  if (parser.token === Token.LeftParen) {
    const arg = parseArguments(parser, context);
    chain = finishNode(parser, context, start, { type: 'CallChain', chain, arguments: arg }, NodeType.CallChain);
  } else if (consumeOpt(parser, context | Context.AllowRegExp, Token.LeftBracket)) {
    property = parseExpressions(parser, context);
    consume(parser, context, Token.RightBracket);
    computed = true;
    parser.assignable = false;
    chain = finishNode(
      parser,
      context,
      start,
      { type: 'MemberChain', chain, property, computed },
      NodeType.MemberChain
    );
  } else if (parser.token === Token.TemplateCont || parser.token === Token.TemplateTail) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.OptionalChainingNoTemplate,
      DiagnosticKind.Error
    );
  } else {
    property = parseIdentifierName(parser, context);
    chain = finishNode(
      parser,
      context,
      start,
      { type: 'MemberChain', chain, property, computed },
      NodeType.MemberChain
    );
  }

  parser.assignable = false;

  while (true) {
    start = parser.index;
    if (parser.token === Token.LeftParen) {
      computed = false;
      property = null;
      parser.assignable = false;
      const args: Types.Arguments[] = parseArguments(parser, context);
      chain = finishNode(parser, context, start, { type: 'CallChain', chain, arguments: args }, NodeType.CallChain);
    } else if (consumeOpt(parser, context | Context.AllowRegExp, Token.LeftBracket)) {
      property = parseExpressions(parser, context);
      computed = true;
      parser.assignable = false;
      consume(parser, context, Token.RightBracket);
      chain = finishNode(
        parser,
        context,
        start,
        { type: 'MemberChain', chain, property, computed },
        NodeType.MemberChain
      );
    } else if (parser.token === Token.TemplateCont || parser.token === Token.TemplateTail) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.OptionalChainingNoTemplate,
        DiagnosticKind.Error
      );
      return chain;
    } else if (consumeOpt(parser, context | Context.AllowRegExp, Token.Period)) {
      computed = false;
      parser.assignable = false;
      property = parseIdentifierName(parser, context);
      chain = finishNode(
        parser,
        context,
        start,
        { type: 'MemberChain', chain, property, computed },
        NodeType.MemberChain
      );
    } else {
      parser.assignable = false;
      if ((parser.token & (Token.Keyword | Token.IsIdentifier | Token.Contextual)) === 0) return chain as any;
      computed = false;
      parser.assignable = false;
      property = parseIdentifierName(parser, context);
      chain = finishNode(
        parser,
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
export function parseArguments(parser: ParserState, context: Context): Types.Arguments[] {
  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  let params: Types.Arguments[] = [];
  if (context & Context.ErrorRecovery) {
    const start = parser.startIndex;
    while (parser.token & Constants.DelimitedList) {
      params.push(parseListElements(parser, context, parseArgumentsList));
      if (consumeOpt(parser, context, Token.Comma)) continue;
      if ((parser.token & Constants.DelimitedList) === 0) break;
      consume(parser, context, Token.Comma);
    }
    params = createBlockArray(parser, params, start);
    consume(parser, context, Token.RightParen);
    return params;
  }
  const args: Types.Arguments[] = [];
  while (parser.token & Constants.DelimitedList) {
    args.push(parseArgumentsList(parser, context));
    if (!consumeOpt(parser, context | Context.AllowRegExp, Token.Comma)) {
      break;
    }
  }

  consume(parser, context, Token.RightParen);
  return args;
}

// ArgumentList
//
// AssignmentExpression
// ...AssignmentExpression
//
// ArgumentList, AssignmentExpression
// ArgumentList, ...AssignmentExpression
export function parseArgumentsList(parser: ParserState, context: Context): Types.Expression | Types.SpreadElement {
  const start = parser.startIndex;
  if (parser.token === Token.Ellipsis) return parseSpreadElement(parser, context);
  return parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
}

// SpreadElement :
//  ...AssignmentExpression
export function parseSpreadElement(parser: ParserState, context: Context): Types.SpreadElement {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  const argument = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
  return finishNode(parser, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
}

// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function parseExpression(
  parser: ParserState,
  context: Context,
  minPrec: Precedence,
  bindingType: BindingType,
  allowCalls: boolean,
  start: number
): any {
  let expr = (void 0 as unknown) as any;

  /**
   * AwaitExpression :
   *  awaitUnaryExpression
   */

  if (context & Context.Await && parser.token === Token.AwaitKeyword) {
    return parseAwaitExpression(parser, context, bindingType);
  }

  /**
   * YieldExpression :
   *
   * yield
   * yield[no LineTerminator here] AssignmentExpression
   * yield[no LineTerminator here] *AssignmentExpression
   */
  if (context & Context.Yield && parser.token === Token.YieldKeyword) {
    return parseYieldExpression(parser, context, bindingType);
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
  if (parser.token & Token.IsUnaryOp) {
    expr = parseUnaryExpression(parser, context, bindingType);
  } else {
    /**
     * UpdateExpression :
     *   ++ UnaryExpression
     *   -- UnaryExpression
     *
     * In this is parsed as PrefixUpdateExpression
     */

    if ((parser.token & Token.IsUpdateOp) > 0) {
      expr = parsePrefixUpdateExpression(parser, context, bindingType);
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
       *   ParenthesizedExpression
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

      if (parser.token & (Token.IsIdentifier | Token.Contextual | Token.FutureKeyword)) {
        if (parser.token === Token.AsyncKeyword) {
          expr = parseFunctionExpression(parser, context, /* isAsync */ 1, bindingType);
        } else {
          const token = parser.token;

          expr = parseIdentifierReference(parser, context | Context.TaggedTemplate, bindingType);

          if (parser.token === Token.Arrow) {
            expr = parseArrowFunction(parser, context, [expr], bindingType, /* isAsync */ 0, parser.startIndex);
          } else if (token === Token.LetKeyword) {
            if (context & Context.Strict) {
              addDiagnostic(
                parser,
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
                parser,
                context,
                DiagnosticSource.Parser,
                DiagnosticCode.InvalidLetConstBinding,
                DiagnosticKind.Error
              );
            }
          }
        }
      } else {
        switch (parser.token) {
          case Token.NumericLiteral:
            expr = parseNumericLiteral(parser, context);
            break;
          case Token.StringLiteral:
            expr = parseStringLiteral(parser, context);
            break;
          case Token.NullKeyword:
            expr = parseNullLiteral(parser, context);
            break;
          case Token.FalseKeyword:
          case Token.TrueKeyword:
            expr = parseBooleanLiteral(parser, context);
            break;
          case Token.ThisKeyword:
            expr = parseThisExpression(parser, context);
            break;
          case Token.LeftBracket:
            expr = parseArrayLiteral(parser, context);
            break;
          case Token.LeftBrace:
            expr = parseObjectLiteral(parser, context);
            break;
          case Token.LeftParen:
            expr = parseParenthesizedExpression(parser, context, bindingType | BindingType.ArgumentList);
            break;
          case Token.FunctionKeyword:
            expr = parseFunctionExpression(parser, context, /* isAsync */ 0, bindingType);
            break;
          case Token.ClassKeyword:
            expr = parseClassExpression(parser, context);
            break;
          case Token.NewKeyword:
            expr = parseNewExpression(parser, context, bindingType);
            break;
          case Token.ImportKeyword:
            expr = parseImportMetaOrCall(parser, context);
            break;
          case Token.SuperKeyword:
            expr = parseSuperPropertyOrCall(parser, context);
            break;
          case Token.RegularExpression:
            expr = parseRegularExpressionLiteral(parser, context);
            break;
          case Token.TemplateTail:
            expr = parseTemplateLiteral(parser, context);
            break;
          case Token.TemplateCont:
            expr = parseTemplate(parser, context);
            break;
          default:
            addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
            expr = insertSyntheticNode(parser, context);
            nextToken(parser, context);
        }
      }

      if (Precedence.LeftHandSide < minPrec) {
        return expr as any;
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

    while (parser.token & (allowCalls ? Token.LeftHandSide : Token.IsMember)) {
      expr = parseMemberExpression(parser, context, expr, start);
    }
    /**
     * UpdateExpression :
     *  LeftHandSideExpression
     *  LeftHandSideExpression [no LineTerminator here] ++
     *  LeftHandSideExpression [no LineTerminator here] --
     *
     * In Escaya this is parsed as PostfixUpdateExpression.
     */
    if (parser.token & Token.IsUpdateOp) {
      expr = parsePostfixUpdateExpression(parser, context, expr);
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
  if ((parser.token & Token.IsBinaryOp) > 0) {
    expr = parseBinaryExpression(parser, context, expr, minPrec, start);
  }

  /**
   * ConditionalExpression :
   *   ShortCircuitExpression
   *   ShortCircuitExpression ? AssignmentExpression : AssignmentExpression
   */
  if (consumeOpt(parser, context | Context.AllowRegExp, Token.QuestionMark)) {
    expr = parseConditionalExpression(parser, context, expr, bindingType, start);
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
  if (parser.token & Token.IsAssignOp) {
    expr = parseAssignmentExpression(parser, context, expr, start);
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
  parser: ParserState,
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
  while ((parser.token & Token.LeftHandSide) > 0) {
    expr = parseMemberExpression(parser, context, expr, start);
  }

  /**
   * UpdateExpression :
   *  LeftHandSideExpression
   *  LeftHandSideExpression [no LineTerminator here] ++
   *  LeftHandSideExpression [no LineTerminator here] --
   *
   * In Escaya this is parsed as PostfixUpdateExpression.
   */
  if (parser.token & Token.IsUpdateOp) {
    expr = parsePostfixUpdateExpression(parser, context, expr);
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
  if ((parser.token & Token.IsBinaryOp) > 0) {
    expr = parseBinaryExpression(parser, context, expr, minPrec, start);
  }

  /**
   * ConditionalExpression :
   *   ShortCircuitExpression
   *   ShortCircuitExpression ? AssignmentExpression : AssignmentExpression
   */
  if (consumeOpt(parser, context | Context.AllowRegExp, Token.QuestionMark)) {
    expr = parseConditionalExpression(parser, context, expr, bindingType, start);
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
  if (parser.token & Token.IsAssignOp) {
    expr = parseAssignmentExpression(parser, context, expr, start);
  }

  return expr;
}

// RegularExpressionLiteral :
//   `/` RegularExpressionBody `/` RegularExpressionFlags
export function parseRegularExpressionLiteral(parser: ParserState, context: Context): Types.RegularExpressionLiteral {
  const { regExpPattern, regExpFlags, startIndex } = parser;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'RegularExpressionLiteral', pattern: regExpPattern, flags: regExpFlags as Types.RegExpFlags },
    NodeType.RegularExpressionLiteral
  );
}

// NumericLiteral
export function parseNumericLiteral(parser: ParserState, context: Context): Types.NumericLiteral {
  const value = parser.tokenValue;
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'NumericLiteral', value }, NodeType.NumericLiteral);
}

// StringLiteral
export function parseStringLiteral(parser: ParserState, context: Context): Types.StringLiteral {
  const value = parser.tokenValue;
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'StringLiteral', value }, NodeType.StringLiteral);
}

// BigIntLiteral
export function parseBigIntLiteral(parser: ParserState, context: Context): Types.BigIntLiteral {
  const value = null; /* parser.tokenValue; */
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'BigIntLiteral', value }, NodeType.BigIntLiteral);
}

// BooleanLiteral
export function parseBooleanLiteral(parser: ParserState, context: Context): Types.BooleanLiteral {
  const value = KeywordDescTable[parser.token & Token.Type] === 'true';
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'BooleanLiteral', value }, NodeType.BooleanLiteral);
}

// NullLiteral
export function parseNullLiteral(parser: ParserState, context: Context): Types.NullLiteral {
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'NullLiteral', value: null }, NodeType.NullLiteral);
}

// ThisExpression
export function parseThisExpression(parser: ParserState, context: Context): Types.ThisExpression {
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(parser, context, startIndex, { type: 'ThisExpression' }, NodeType.ThisExpression);
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.UnaryExpression {
  const start = parser.startIndex;
  const t = parser.token;
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  const operator = KeywordDescTable[t & Token.Type] as Types.UnaryOperator;
  nextToken(parser, context | Context.AllowRegExp);
  const operand = parseExpression(parser, context, Precedence.LeftHandSide, bindingType, true, start);
  if (parser.token === Token.Exponentiate) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidExponentation, DiagnosticKind.Error);
  }
  if ((context & Context.Strict) === Context.Strict) {
    // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
    // UnaryExpression is a direct reference to a variable, function argument, or function name
    if (t === Token.DeleteKeyword && operand.type === 'IdentifierReference') {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.StrictDelete, DiagnosticKind.Error);
    }
  }
  parser.assignable = false;
  return finishNode(parser, context, start, { type: 'UnaryExpression', operator, operand }, NodeType.UnaryExpression);
}

// UpdateExpression :
//   LeftHandSideExpression
//   LeftHandSideExpression [no LineTerminator here] `++`
//   LeftHandSideExpression [no LineTerminator here] `--`
//   `++` UnaryExpression
//   `--` UnaryExpression
export function parsePostfixUpdateExpression(
  parser: ParserState,
  context: Context,
  operand: Types.LeftHandSideExpression
): Types.PostfixUpdateExpression | Types.LeftHandSideExpression {
  if (parser.hasLineTerminator) return operand;
  if (!parser.assignable)
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidIncDecTarget, DiagnosticKind.Error);
  const start = parser.startIndex;
  const operator = KeywordDescTable[parser.token & Token.Type] as Types.UpdateOperator;
  nextToken(parser, context);
  parser.assignable = false;
  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.PrefixUpdateExpression {
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  const start = parser.startIndex;
  const operator = KeywordDescTable[parser.token & Token.Type] as Types.UpdateOperator;
  nextToken(parser, context | Context.AllowRegExp);
  const operand = parseExpression(parser, context, Precedence.LeftHandSide, bindingType, true, start);
  if (!parser.assignable) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidIncDecTarget, DiagnosticKind.Error);
  }
  parser.assignable = false;
  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingIdentifier | Types.IdentifierReference {
  if (context & (Context.Strict | Context.Parameters) && parser.token === Token.YieldKeyword) {
  } else if (
    parser.token !== Token.LetKeyword &&
    context & Context.Strict &&
    (parser.token & Token.FutureKeyword) === Token.FutureKeyword
  ) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.UnexpectedStrictReserved,
      DiagnosticKind.Error
    );
  }

  const start = parser.startIndex;
  const name = parser.tokenValue as string;
  parser.assignable = true;
  nextToken(parser, context);

  if (bindingType & BindingType.Pattern) {
    return finishNode(parser, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(parser, context, start, { type: 'IdentifierReference', name }, NodeType.IdentifierReference);
}

// IdentifierReference:
//   Identifier
//   yield
//   await
//
export function parseIdentifierReferenceFromValue(
  parser: ParserState,
  context: Context,
  name: string,
  bindingType: BindingType,
  start: number
): Types.BindingIdentifier | Types.IdentifierReference {
  parser.assignable = true;

  if (bindingType & BindingType.Pattern) {
    return finishNode(parser, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(parser, context, start, { type: 'IdentifierReference', name }, NodeType.IdentifierReference);
}

export function parseIdentifierNameFromValue(
  parser: ParserState,
  context: Context,
  name: string,
  bindingType: BindingType,
  start: number
): Types.BindingIdentifier | Types.IdentifierName {
  parser.assignable = true;

  if (bindingType & BindingType.Pattern) {
    return finishNode(parser, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
  }
  return finishNode(parser, context, start, { type: 'IdentifierName', name }, NodeType.IdentifierReference);
}
export function parseIdentifierName(parser: ParserState, context: Context): Types.IdentifierName {
  const start = parser.startIndex;
  const name = parser.tokenValue as string;
  parser.assignable = true;
  nextToken(parser, context);
  return finishNode(parser, context, start, { type: 'IdentifierName', name }, NodeType.IdentifierName);
}

// BindingIdentifier :
//   Identifier
//   yield
//   await
export function parseBindingIdentifier(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingIdentifier {
  const { token, startIndex, tokenValue } = parser;

  if ((token & Constants.IdentfierName) === 0) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidBindingIdentifier,
      DiagnosticKind.Error
    );
  }

  if ((token & Token.Keyword) === Token.Keyword) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidKeyword, DiagnosticKind.Error);
  }

  if (context & Context.Strict && (token & Token.FutureKeyword) === Token.FutureKeyword) {
    addDiagnostic(
      parser,
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
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidLetConstBinding,
      DiagnosticKind.Error
    );
  }

  parser.assignable = true;
  nextToken(parser, context);
  return finishNode(
    parser,
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
  const leafs = [];
  let destructible = Destructible.None;
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
  while (i--) {
    reinterpretToAssignment(leafs[i], false);
  }

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

  const leafs = [];
  let destructible = Destructible.None;
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

export function parseElementList(parser: ParserState, context: Context, bindingType: BindingType): any {
  let destructible = Destructible.None;

  const start = parser.startIndex;

  // Simple cases: "[a]", "[a,]", "[a = b]", "[a.[b] ...]",  "[a.b ... ]" and "[a.(b) ...]"'
  if (parser.token & (Token.FutureKeyword | Constants.IdentifierOrKeyword)) {
    // '[a

    let left = parseExpression(parser, context, Precedence.Primary, bindingType, true, start);

    // Simple cases: '[x]', '[x,y]'. This is an array with only one identifier,
    // and should be "destructible" except for a few valid identifiers / keywords
    // that can't be assigned to.
    // For example `true` and `typeof` are not destructible or assignable
    if (parser.token === Token.RightBracket || parser.token === Token.Comma) {
      parser.destructible = parser.assignable ? Destructible.None : Destructible.NotDestructible;
      return left;
    }
    let destructible = Destructible.None;

    // Another simple case: '[a = ... ]. This is an identifier followed by an assignment, '='.
    // The same rules applies here, and should be destructible unless this is a keyword.
    if (parser.token === Token.Assign) {
      return parseAssignmentPattern(
        parser,
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

    left = parseLeftHandSide(parser, context, left, Precedence.LeftHandSide, bindingType, start);

    // Invalid case: '[x.(y) = z]'. This is an identifier followed by a
    // "tail" - 'MemberExpression' and in this case 'CallExpression'.
    // The latter is not 'assignable' so this is a not destructible.
    if (!parser.assignable) destructible |= Destructible.NotDestructible;

    // No closing bracket - ']' after the "tail" - 'MemberExpression'. So this is not destructible.
    if (parser.token !== Token.Assign && parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
      destructible |= Destructible.NotDestructible;
    }

    // Complex cases: '[x.y = z]', '[x.[y] = z]','[x.y = z / foo]', '[x[y] = z / foo]'. A
    // "tail" - 'MemberExpression' is followed by an assignment - '=', binary expression etc.
    left = parseLeftHandSide(parser, context, left, Precedence.Assign, bindingType, start);

    parser.destructible = destructible;

    return left;
  }

  // If encounter "[[" or "[{", this is the start of a binding pattern.
  // Examples:
  //      [[ x ]]
  //      [{ x })
  if ((parser.token & Token.IsPatternStart) > 0) {
    let left =
      parser.token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(parser, context, /* isPattern */ false, bindingType, start)
        : parseArrayLiteralOrPattern(parser, context, /* isPattern */ false, bindingType, start);

    destructible = parser.destructible;

    if (parser.token !== Token.RightBracket && parser.token !== Token.Comma) {
      if (destructible & Destructible.MustDestruct)
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.InvalidBindingDestruct,
          DiagnosticKind.Error
        );

      left = parseLeftHandSide(parser, context, left, Precedence.LeftHandSide, bindingType, start);

      destructible = parser.assignable ? Destructible.None : Destructible.NotDestructible;

      left = parseLeftHandSide(parser, context, left, Precedence.Assign, bindingType, start);
    }

    parser.destructible = destructible;

    return left;
  }

  // Simple case: "[..."
  if (parser.token === Token.Ellipsis) {
    return parseSpreadOrRestElement(parser, context, Token.RightBracket, bindingType, true, false, start);
  }

  const token = parser.token;

  // Note: This cases are only destructible as assignment destructuring if 'simple assignment'.
  // Examples: '[5..length] = x', '[x().y = a] = z', '[x()[y] = a ] = z'
  let left = parseExpression(parser, context, Precedence.LeftHandSide, BindingType.AllowLHS, true, start);

  if (parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
    left = parseLeftHandSide(parser, context, left, Precedence.Assign, bindingType, start);
    if ((BindingType.Literal | BindingType.ArgumentList) === 0 && token === Token.LeftParen) {
      destructible |= Destructible.NotDestructible;
    }
  } else if (!parser.assignable) {
    destructible |= Destructible.NotDestructible;
  } else if (token === Token.LeftParen) {
    destructible |=
      parser.assignable && BindingType.Literal | BindingType.ArgumentList
        ? Destructible.Assignable
        : Destructible.NotDestructible;
  }

  parser.destructible = destructible;

  return left;
}

export function parseArrayAssignment(
  state: ParserState,
  context: Context,
  leafs: any,
  destructible: Destructible,
  start: number,
  bindingType: BindingType
) {
  if (state.token !== Token.Assign)
    addDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.InvalidDestructuringTarget,
      DiagnosticKind.Error
    );

  if (destructible & Destructible.NotDestructible) {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidBindingDestruct, DiagnosticKind.Error);
  }

  nextToken(state, context | Context.AllowRegExp);

  const left = parseArrayAssignmentPattern(state, context, leafs, destructible);

  const right = parseExpression(state, context, Precedence.Assign, bindingType, true, start);

  state.destructible = (destructible | Destructible.MustDestruct) ^ Destructible.MustDestruct;

  return finishNode(
    state,
    context,
    start,
    { type: 'AssignmentExpression', left, operator: '=', right } as any,
    NodeType.AssignmentExpression
  );
}

// ParenthesizedExpression :
//   `(` Expression `)`
export function parseParenthesizedExpression(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.ParenthesizedExpression | Types.ArrowFunction {
  const start = parser.startIndex;

  nextToken(parser, context | Context.AllowRegExp);

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  if (consumeOpt(parser, context, Token.RightParen)) {
    if (parser.token === Token.Arrow) {
      return parseArrowFunction(parser, context, [], bindingType, 0, parser.startIndex);
    }

    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.ExpectedArrow, DiagnosticKind.Error);
    nextToken(parser, context);
    return insertSyntheticNode(parser, context) as any;
  }

  if (parser.token === Token.Ellipsis) {
    const param = parseSpreadOrRestElement(parser, context, Token.RightParen, bindingType, false, false, start);

    // Invalid cases: '(...[ 5 ]) => {}', '(...a = b) => b' etc.
    if (parser.destructible & Destructible.NotDestructible) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidLHSDestructRHS,
        DiagnosticKind.Error
      );
    }

    consume(parser, context, Token.RightParen);
    return parseArrowFunction(parser, context, [param as any], bindingType, /* isAsync */ 0, start);
  }

  let expression: any;
  let destructible = Destructible.None;

  if ((parser.token & Constants.IdentfierName) > 0) {
    expression = parseExpression(parser, context, Precedence.Primary, BindingType.AllowLHS, true, start);

    if (parser.token === Token.Comma || parser.token === Token.RightParen) {
      if (!parser.assignable) destructible |= Destructible.NotDestructible;
    } else {
      if (parser.token !== Token.Assign) destructible |= Destructible.NotDestructible;

      expression = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, start);
    }
  } else if ((parser.token & Token.IsPatternStart) > 0) {
    expression =
      parser.token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(parser, context, false, bindingType, start)
        : parseArrayLiteralOrPattern(parser, context, false, bindingType, start);

    destructible |= parser.destructible;

    parser.assignable = false;

    if (parser.token !== Token.Comma && parser.token !== Token.RightParen) {
      if (destructible & Destructible.MustDestruct) {
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.InvalidBindingDestruct,
          DiagnosticKind.Error
        );
      }
      expression = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, start);
      destructible |= !parser.assignable ? Destructible.NotDestructible : Destructible.Assignable;
    }
  } else {
    destructible |= Destructible.NotDestructible;

    expression = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);

    if (parser.token === Token.Comma) {
      expression = parseCommaOperator(parser, context, expression, start);
    }

    consume(parser, context, Token.RightParen);

    parser.destructible = destructible;

    return finishNode(
      parser,
      context,
      start,
      { type: 'ParenthesizedExpression', expression },
      NodeType.ParenthesizedExpression
    );
  }

  let isCommaOperator = false;
  // 12.16 Comma Operator
  if (parser.token === Token.Comma) {
    const leafs: any[] = [expression];

    isCommaOperator = true;

    while (consumeOpt(parser, context | Context.AllowRegExp, Token.Comma)) {
      if (parser.token === Token.RightParen) {
        // Trailing comma before the closing parenthesis is valid in an arrow
        // function parameters list: `(a, b, ) => body`, so for now we are setting
        // the 'MustDestruct' mask so it will throw for cases like: `(a, b, )`.
        //
        // This can probably be done better because now it's throwing an incorrect
        // error mesage: 'Invalid destructuring assignment target'
        destructible |= Destructible.DisallowTrailing;
        break;
      }

      if ((parser.token & Constants.IdentfierName) > 0) {
        expression = parseExpression(parser, context, Precedence.Primary, bindingType, true, start);

        // (x, false) => y
        if (parser.token === Token.Comma || parser.token === Token.RightParen) {
          if (!parser.assignable) destructible |= Destructible.NotDestructible;
        } else {
          if (parser.token !== Token.Assign) destructible |= Destructible.NotDestructible;

          expression = parseLeftHandSide(parser, context, expression, Precedence.LeftHandSide, bindingType, start);

          if (parser.token !== Token.RightParen && parser.token !== Token.Comma) {
            expression = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, start);
          }
        }
      } else if ((parser.token & Token.IsPatternStart) > 0) {
        expression =
          parser.token === Token.LeftBrace
            ? parseObjectLiteralOrPattern(parser, context, false, bindingType, start)
            : parseArrayLiteralOrPattern(parser, context, false, bindingType, start);

        destructible |= parser.destructible;

        if (parser.token !== Token.Comma && parser.token !== Token.RightParen) {
          if (destructible & Destructible.MustDestruct) {
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.InvalidBindingDestruct,
              DiagnosticKind.Error
            );
          }
          expression = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, start);

          destructible |= parser.assignable ? Destructible.Assignable : Destructible.NotDestructible;
        }
      } else if (parser.token === Token.Ellipsis) {
        expression = parseSpreadOrRestElement(parser, context, Token.RightParen, bindingType, false, false, start);

        // '(a, ...b = 10) => c'
        if (parser.destructible & Destructible.NotDestructible) {
          addDiagnostic(
            parser,
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

        expression = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);

        if (parser.token === Token.Comma) {
          expression = parseCommaOperator(parser, context, expression, start);
        }

        consume(parser, context, Token.RightParen);

        parser.destructible = destructible;

        return finishNode(
          parser,
          context,
          start,
          { type: 'ParenthesizedExpression', expression },
          NodeType.ParenthesizedExpression
        );
      }
      leafs.push(expression);
    }

    parser.assignable = false;
    expression = finishNode(parser, context, start, { type: 'CommaOperator', leafs }, NodeType.CommaOperator);
  }

  consume(parser, context, Token.RightParen);

  if (parser.token === Token.Arrow) {
    if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
      addDiagnostic(
        parser,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidArrowDestructLHS,
        DiagnosticKind.Error
      );
    }
    return parseArrowFunction(parser, context, isCommaOperator ? expression : [expression], bindingType, 0, start);
  }

  if (destructible & (Destructible.DisallowTrailing | Destructible.MustDestruct)) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      destructible & Destructible.DisallowTrailing
        ? DiagnosticCode.InvalidTrailingComma
        : DiagnosticCode.InvalidDestructuringTarget,
      DiagnosticKind.Error
    );
  }

  parser.destructible = destructible;

  return finishNode(
    parser,
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

  const properties: any = [];

  let destructible = Destructible.None;

  while (state.token !== Token.RightBrace) {
    properties.push(parsePropertyDefinitionList(state, context, bindingType, start));
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

  const properties: any = [];

  let destructible = 0;

  while (state.token !== Token.RightBrace) {
    properties.push(parsePropertyDefinitionList(state, context, bindingType, start));
    destructible |= state.destructible;
    if (state.token !== Token.Comma) break;
    nextToken(state, context | Context.AllowRegExp);
  }

  consume(state, context, Token.RightBrace);

  state.destructible = destructible;

  if (!isPattern && (state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    if (state.token !== Token.Assign) {
      addDiagnostic(
        state,
        context,
        DiagnosticSource.Parser,
        DiagnosticCode.InvalidLHSDestructRHS,
        DiagnosticKind.Error
      );
    }

    if ((destructible & Destructible.NotDestructible) === Destructible.NotDestructible) {
      addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDestruct, DiagnosticKind.Error);
    }
    let i = properties.length;
    while (i--) {
      reinterpretToAssignment(properties[i], /* ObjectAssignment */ true);
    }

    nextToken(state, context | Context.AllowRegExp);

    const right = parseExpression(state, context, Precedence.Assign, bindingType, true, start);

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

// PropertyDefinitionList :
//   PropertyDefinition
//   PropertyDefinitionList, PropertyDefinition
export function parsePropertyDefinitionList(
  state: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): Types.PropertyDefinitions {
  let modifiers = consumeOpt(state, context, Token.Multiply) ? ModifierKind.Generator : ModifierKind.None;
  let key = null;
  let value: any = null;
  const token = state.token;
  const innerStart = state.index;

  if (state.token === Token.Ellipsis) {
    return parseSpreadOrRestElement(state, context, Token.RightBrace, bindingType, false, false, start);
  }
  if (token & Constants.IdentfierName && (modifiers & ModifierKind.Generator) === 0) {
    const name = state.tokenValue;

    nextToken(state, context);

    if (state.token === Token.RightBrace || state.token === Token.Comma) {
      if ((token & Token.Keyword) > 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }
      state.destructible = Destructible.None;
      return parseIdentifierReferenceFromValue(state, context, name, bindingType, start);
    }

    // NOTE: This is an super edge case. The 'CoverInitializedName' production exists so that ObjectLiteral
    // can serve as a cover grammar for ObjectAssignmentPattern. It cannot occur in an actual object
    // initializer, and will only exist in the AST if we are in recovery mode.
    if (state.token === Token.Assign) {
      if ((token & Token.Keyword) > 0) {
        addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }

      const initializer = parseInitializer(state, context);

      key = parseIdentifierNameFromValue(state, context, name, bindingType, start);

      state.destructible = Destructible.MustDestruct;

      return finishNode(
        state,
        context,
        innerStart,
        {
          type: bindingType & Constants.AssignmentOrPattern ? 'BindingElement' : 'CoverInitializedName',
          binding: key,
          initializer
        } as any,
        bindingType & Constants.AssignmentOrPattern ? NodeType.BindingElement : NodeType.CoverInitializedName
      );
    }

    key = parseIdentifierNameFromValue(state, context, name, bindingType, start);
  } else {
    key = parsePropertyName(state, context, start);
  }

  if ((modifiers & ModifierKind.Generator) === 0) {
    if ((state.token & Constants.IdentifierAfterModifier) > 0) {
      if (token === Token.AsyncKeyword) {
        modifiers |= (consumeOpt(state, context, Token.Multiply) ? ModifierKind.Generator : 0) | ModifierKind.Async;
      } else if (token === Token.GetKeyword) {
        modifiers |= ModifierKind.Getter;
      } else {
        modifiers |= ModifierKind.Setter;
      }
      key = parsePropertyName(state, context, start);
      state.destructible |= Destructible.NotDestructible;
      return parseMethodDefinition(state, context, key, modifiers);
    }
  }

  if (modifiers & ModifierKind.Generator || state.token === Token.LeftParen) {
    value = parseMethodDefinition(state, context, key, modifiers);
    state.destructible = Destructible.NotDestructible;
    return value;
  }

  let destructible = Destructible.None;

  if (consumeOpt(state, context | Context.AllowRegExp, Token.Colon)) {
    if ((state.token & Constants.IdentfierName) > 0) {
      value = parseExpression(state, context, Precedence.Primary, bindingType, true, start);

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
        if (state.destructible & Destructible.MustDestruct) {
          addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDestruct, DiagnosticKind.Error);
        }

        value = parseLeftHandSide(state, context, value, Precedence.LeftHandSide, bindingType, start);

        destructible = state.assignable ? Destructible.Assignable : Destructible.NotDestructible;

        value = parseLeftHandSide(state, context, value, Precedence.Assign, bindingType, start);
      }
    } else {
      value = parseExpression(state, context, Precedence.LeftHandSide, bindingType, true, start);

      destructible |=
        state.assignable || ((state.token & Token.IsAssignOp) > 0 && state.token === Token.Assign)
          ? Destructible.Assignable
          : Destructible.NotDestructible;

      value = parseLeftHandSide(state, context, value, Precedence.Assign, bindingType, start);
    }
  } else {
    addDiagnostic(state, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  state.destructible = destructible;

  if (bindingType & BindingType.Pattern) {
    return finishNode(
      state,
      context,
      innerStart,
      { type: 'BindingProperty', key, value, computed: token === Token.LeftBracket },
      NodeType.BindingProperty
    );
  }

  return finishNode(
    state,
    context,
    innerStart,
    { type: 'PropertyDefinition', key, value, computed: token === Token.LeftBracket, static: false },
    NodeType.PropertyDefinition
  );
}

// Initializer[In, Yield] :
//     = AssignmentExpression[?In, ?Yield]
export function parseInitializer(parser: ParserState, context: Context): Types.Expression {
  const start = parser.startIndex;
  consume(parser, context | Context.AllowRegExp, Token.Assign);
  return parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
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
export function parsePropertyName(state: ParserState, context: Context, start: number): any {
  if (consumeOpt(state, context | Context.AllowRegExp, Token.LeftBracket)) {
    const e = parseExpression(state, context, Precedence.Assign, BindingType.AllowLHS, true, start);
    consume(state, context, Token.RightBracket);
    return e;
  }
  if (state.token === Token.StringLiteral) {
    return parseStringLiteral(state, context);
  }
  if (state.token === Token.NumericLiteral) {
    return parseNumericLiteral(state, context);
  }
  return parseIdentifierName(state, context);
}

export function parseTemplate(parser: ParserState, context: Context): Types.TemplateLiteral {
  const startIndex = parser.startIndex;
  const spans = [parseTemplateElement(parser, context, /* isTail */ false, startIndex)];
  consume(parser, context | Context.AllowRegExp, Token.TemplateCont);
  const expressions = [parseExpressions(parser, context)];

  while (scanTemplateTail(parser, context)) {
    if (parser.token !== Token.TemplateCont) break;
    const innerStart = parser.startIndex;
    spans.push(parseTemplateElement(parser, context, /* isTail */ false, innerStart));
    consume(parser, context | Context.AllowRegExp, Token.TemplateCont);
    expressions.push(parseExpressions(parser, context));
  }
  spans.push(parseTemplateElement(parser, context, /* isTail */ true, startIndex));
  consume(parser, context, Token.TemplateTail);
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'TemplateLiteral', spans, expressions } as any,
    NodeType.TemplateLiteral
  );
}

export function parseTemplateElement(
  parser: ParserState,
  context: Context,
  tail: boolean,
  start: number
): Types.TemplateElement {
  const cooked = parser.tokenValue;
  const raw = parser.tokenRaw;
  return finishNode(parser, context, start, { type: 'TemplateElement', raw, cooked, tail }, NodeType.TemplateElement);
}

export function parseTemplateLiteral(parser: ParserState, context: Context): Types.TemplateLiteral {
  const startIndex = parser.startIndex;
  nextToken(parser, context);
  const cooked = parser.tokenValue;
  const raw = parser.tokenRaw;
  const expressions: any[] = [];
  const leafs = [parseTemplateElement(parser, context, false, startIndex)];
  return finishNode(
    parser,
    context,
    startIndex,
    { type: 'TemplateLiteral', cooked, raw, expressions, leafs },
    NodeType.TemplateLiteral
  );
}

export function parseSpreadOrRestElement(
  parser: ParserState,
  context: Context,
  closingToken: Token,
  bindingType: BindingType,
  isArray: boolean,
  isAsync: boolean,
  start: number
): any {
  nextToken(parser, context | Context.AllowRegExp); // skip '...'

  let argument: any;
  let destructible: Destructible = Destructible.None;

  let token = parser.token;

  if ((token & Constants.IdentfierName) > 0) {
    argument = parseExpression(parser, context, Precedence.Primary, bindingType, true, start);

    token = parser.token;

    argument = parseLeftHandSide(parser, context, argument, Precedence.LeftHandSide, bindingType, start);

    if (parser.token !== Token.Comma && parser.token !== closingToken) {
      destructible |= Destructible.NotDestructible;

      argument = parseLeftHandSide(parser, context, argument, Precedence.Assign, bindingType, start);
    }

    if (!parser.assignable) {
      destructible |= Destructible.NotDestructible;
    } else if (isClosingTokenOrComma(token, closingToken)) {
      // TODO
    } else {
      destructible |= Destructible.Assignable;
    }
  } else if (token === closingToken) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  } else if (token & Token.IsPatternStart) {
    argument =
      parser.token === Token.LeftBrace
        ? parseObjectBindingPattern(parser, context, bindingType, start)
        : parseArrayBindingPattern(parser, context, bindingType, start);
    token = parser.token;
    if (!isClosingTokenOrComma(token, closingToken)) {
      if (parser.destructible & Destructible.MustDestruct) {
        addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidDestruct, DiagnosticKind.Error);
      }
      argument = parseLeftHandSide(parser, context, argument, Precedence.LeftHandSide, bindingType, start);
      destructible |= parser.assignable ? Destructible.Assignable : Destructible.NotDestructible;
      argument = parseLeftHandSide(parser, context, argument, Precedence.Assign, bindingType, start);
    } else {
      destructible |=
        closingToken === Token.RightBrace && token !== Token.Assign
          ? Destructible.NotDestructible
          : parser.destructible;
    }
  } else {
    destructible |= Destructible.Assignable;

    argument = parseExpression(parser, context, Precedence.Primary, bindingType, true, start);
    const token = parser.token;
    if (token === Token.Assign && token !== closingToken && parser.token === Token.Comma) {
      argument = parseLeftHandSide(parser, context, argument, Precedence.Assign, bindingType, start);
      destructible |= Destructible.NotDestructible;
    } else {
      if (token === Token.Comma) {
        destructible |= Destructible.NotDestructible;
      } else if (token !== closingToken) {
        argument = parseLeftHandSide(parser, context, argument, Precedence.Assign, bindingType, start);
      }
      destructible |= parser.assignable ? Destructible.Assignable : Destructible.NotDestructible;
    }

    parser.destructible = destructible;

    return finishNode(parser, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
  }

  if (parser.token !== closingToken) {
    if (bindingType & BindingType.ArgumentList)
      destructible |= isAsync ? Destructible.NotDestructible : Destructible.Assignable;

    if (parser.token === Token.Assign) {
      const operator = KeywordDescTable[parser.token & Token.Type] as any;
      nextToken(parser, context);
      const right = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
      reinterpretToAssignment(argument, false);
      argument = finishNode(
        parser,
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

  parser.destructible = destructible;

  if (bindingType & BindingType.Pattern) {
    return finishNode(
      parser,
      context,
      start,
      { type: isArray ? 'BindingRestElement' : 'BindingRestProperty', argument },
      isArray ? NodeType.BindingRestElement : NodeType.BindingRestProperty
    );
  }

  return finishNode(parser, context, start, { type: 'SpreadElement', argument }, NodeType.SpreadElement);
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
  parser: ParserState,
  context: Context,
  isAsync: 0 | 1,
  bindingType: BindingType
): Types.FunctionDeclaration {
  const start = parser.startIndex;

  let name: Types.BindingIdentifier | null = null;

  if (optionalBit(parser, context, Token.AsyncKeyword)) {
    if (parser.token !== Token.FunctionKeyword || parser.hasLineTerminator) {
      return parseAsyncArrowDeclaration(parser, context, bindingType, start);
    }
    isAsync = 1;
  }

  consume(parser, context | Context.AllowRegExp, Token.FunctionKeyword);

  const isGenerator = optionalBit(parser, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  if (parser.token & Constants.IdentfierName) {
    const { token, tokenValue, startIndex } = parser;
    validateFunctionName(parser, context | ((context & 0b0000000000000000000_1100_00000000) << 11), token);
    nextToken(parser, context);
    name = parseBindingIdentifierFromValue(parser, context, tokenValue, startIndex);
  } else if ((context & Context.Default) !== Context.Default) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.FuncDeclNoName, DiagnosticKind.Error);
  }

  context =
    ((context | 0b00000110111111100011000000000000) ^ 0b00000000111111100001000000000000) | generatorAndAsyncFlags;

  const params = parseFormalParameters(parser, context | Context.Parameters);

  const contents = parseFunctionBody(parser, context, /* isDeclaration */ true);

  parser.assignable = false;

  return finishNode(
    parser,
    context,
    start,
    { type: 'FunctionDeclaration', name, params, contents, async: isAsync === 1, generator: isGenerator === 1 },
    NodeType.FunctionDeclaration
  );
}

export function parseFunctionExpression(
  parser: ParserState,
  context: Context,
  isAsync: 0 | 1,
  bindingType: BindingType
): Types.FunctionExpression {
  const start = parser.startIndex;

  let name: Types.BindingIdentifier | null = null;

  if (optionalBit(parser, context, Token.AsyncKeyword)) {
    if (parser.token !== Token.FunctionKeyword || parser.hasLineTerminator) {
      return parseAsyncArrowExpression(parser, context, bindingType, start);
    }
    if ((bindingType & BindingType.AllowLHS) === 0) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
    isAsync = 1;
  }

  nextToken(parser, context | Context.AllowRegExp);

  const isGenerator = optionalBit(parser, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  if ((parser.token & Constants.IdentfierName) > 0) {
    const { tokenValue, startIndex } = parser;
    validateFunctionName(
      parser,
      ((context | 0b00000000011000000000000000000000) ^ 0b00000000011000000000000000000000) | generatorAndAsyncFlags,
      parser.token
    );
    nextToken(parser, context);
    name = parseBindingIdentifierFromValue(parser, context, tokenValue, startIndex);
  }

  context =
    ((context | 0b00000110111111100011000000000000) ^ 0b00000000111111100001000000000000) | generatorAndAsyncFlags;

  const params = parseFormalParameters(parser, context | Context.Parameters);
  const contents = parseFunctionBody(parser, context, /* isDeclaration */ false);

  parser.assignable = false;

  return finishNode(
    parser,
    context,
    start,
    { type: 'FunctionExpression', name, params, contents, async: isAsync === 1, generator: isGenerator === 1 },
    NodeType.FunctionExpression
  );
}

// FunctionRestParameter :
// BindingRestElement
export function parseFunctionRestParameter(parser: ParserState, context: Context): Types.FunctionRestParameter {
  const start = parser.startIndex;
  nextToken(parser, context);
  const argument = parseBindingElement(parser, context, BindingType.ArgumentList);
  return finishNode(
    parser,
    context,
    start,
    { type: 'FunctionRestParameter', argument },
    NodeType.FunctionRestParameter
  );
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

export function parseFormalParameters(parser: ParserState, context: Context): Types.FormalParameters | any {
  let leafs: any = [];
  const start = parser.startIndex;
  if (context & Context.ErrorRecovery) {
    // Return an empty list if '(' is missing
    if (parser.token !== Token.LeftParen) return createMissingList(start);

    nextToken(parser, context); // skips: '('

    if (parser.token !== Token.RightParen) {
      while (parser.token & Constants.DelimitedList) {
        if (parser.token === Token.Ellipsis) {
          leafs.push(parseFormalElements(parser, context, BindingType.None, parseFunctionRestParameter));
          break;
        }
        leafs.push(parseFormalElements(parser, context, BindingType.ArgumentList, parseBindingPattern));
        if (consumeOpt(parser, context, Token.Comma)) continue;
        if ((parser.token & Constants.DelimitedList) === 0) break;
        consume(parser, context, Token.Comma);
        continue;
      }
    }

    consume(parser, context, Token.RightParen);
    leafs = createBlockArray(parser, leafs, start);
    return finishNode(parser, context, start, { type: 'FormalParameters', leafs }, NodeType.FormalParameters);
  }
  consume(parser, context, Token.LeftParen);

  while (parser.token & Constants.DelimitedList) {
    if (parser.token === Token.Ellipsis) {
      leafs.push(parseFunctionRestParameter(parser, context));
      break;
    }

    leafs.push(parseBindingPattern(parser, context, BindingType.ArgumentList));
    if (parser.token === Token.RightParen) break;
    consumeOpt(parser, context, Token.Comma);
  }

  consume(parser, context, Token.RightParen);

  return finishNode(parser, context, start, { type: 'FormalParameters', leafs }, NodeType.FormalParameters);
}

// FunctionBody :
//   FunctionStatementList
export function parseFunctionBody(parser: ParserState, context: Context, isDeclaration: boolean): Types.FunctionBody {
  const start = parser.startIndex;

  const directives: string[] = [];

  let statements: any | Types.Statement[] = [];

  if (context & Context.ErrorRecovery) {
    if (consume(parser, context | Context.AllowRegExp, Token.LeftBrace)) {
      while (parser.token === Token.StringLiteral) {
        const { token, tokenValue, startIndex } = parser;
        nextToken(parser, context);
        if (parser.token & Token.IsAutomaticSemicolon) {
          if (tokenValue.length === 10 && tokenValue === 'use strict') context |= Context.Strict;
          consumeOpt(parser, context, Token.Semicolon);
          directives.push(parser.source.slice(startIndex, parser.index));
        } else {
          statements.push(parseDirectives(parser, context, token, tokenValue, startIndex));
        }
      }
      while (parser.token & Constants.BlockStatement) {
        statements.push(parseLeafElement(parser, context, parseStatementListItem));
        if (parser.token === Token.RightBrace) break;
      }
      statements = createBlockArray(parser, statements, start);
    } else {
      statements = createMissingList(start);
    }
    consume(parser, isDeclaration ? context | Context.AllowRegExp : context, Token.RightBrace);
    return finishNode(parser, context, start, { type: 'FunctionBody', statements, directives }, NodeType.FunctionBody);
  }
  consume(parser, context | Context.AllowRegExp, Token.LeftBrace);

  if (parser.token !== Token.RightBrace) {
    while (parser.token === Token.StringLiteral) {
      const { token, tokenValue, startIndex } = parser;
      nextToken(parser, context);
      if (parser.token & Token.IsAutomaticSemicolon) {
        if (tokenValue.length === 12 && tokenValue === 'use strict') context |= Context.Strict;
        consumeOpt(parser, context, Token.Semicolon);
        directives.push(parser.source.slice(startIndex, parser.index));
      } else {
        statements.push(parseDirectives(parser, context, token, tokenValue, startIndex));
      }
    }

    while ((parser.token as Token) !== Token.RightBrace) {
      statements.push(parseStatementListItem(parser, context));
    }
  }

  consume(parser, isDeclaration ? context | Context.AllowRegExp : context, Token.RightBrace);

  return finishNode(parser, context, start, { type: 'FunctionBody', statements, directives }, NodeType.FunctionBody);
}

// ArrowFunction[In, Yield, Await]:
//  ArrowParameters
export function parseArrowFunction(
  parser: ParserState,
  context: Context,
  params: Types.ArrowFormals[],
  bindingType: BindingType,
  isAsync: 0 | 1,
  start: number
): Types.ArrowFunction {
  if ((bindingType & BindingType.AllowLHS) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  if (parser.hasLineTerminator) {
    addDiagnostic(
      parser,
      context,
      DiagnosticSource.Parser,
      DiagnosticCode.LineTerminatorNotPermittedBeforeArrow,
      DiagnosticKind.Error
    );
  }
  consume(parser, context | Context.AllowRegExp, Token.Arrow);

  // Reverse while loop is slightly faster than a regular for loop
  let i = params.length;

  while (i--) {
    reinterpretToPattern(params[i]);
  }
  context =
    ((context | 0b0000000111100000000_0000_00000000) ^ 0b0000000111100000000_0000_00000000) |
    (isAsync << 22) |
    Context.Return;

  const contents = parseFunctionOrConciseBody(parser, context, bindingType);

  parser.assignable = false;

  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.FunctionBody | Types.ConciseBody {
  if (parser.token === Token.LeftBrace) {
    const body = parseFunctionBody(
      parser,
      (context | Context.DisallowIn) ^ Context.DisallowIn,
      /* isDeclaration */ true
    );

    if (parser.hasLineTerminator) {
      switch (parser.token) {
        case Token.Period:
          addDiagnostic(
            parser,
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
            parser,
            context,
            DiagnosticSource.Parser,
            DiagnosticCode.ArrowOperatorToRight,
            DiagnosticKind.Error
          );
          break;
        default: // ignore
      }
    } else {
      if (parser.token & Token.IsBinaryOp) {
        addDiagnostic(
          parser,
          context,
          DiagnosticSource.Parser,
          DiagnosticCode.ArrowOperatorToRight,
          DiagnosticKind.Error
        );
      } else {
        switch (parser.token) {
          case Token.Period:
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyAccessedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.LeftParen:
          case Token.LeftBracket:
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyInvokedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.TemplateTail:
            addDiagnostic(
              parser,
              context,
              DiagnosticSource.Parser,
              DiagnosticCode.BlockBodyTaggedWithoutGroup,
              DiagnosticKind.Error
            );
            break;
          case Token.QuestionMark:
            addDiagnostic(
              parser,
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

  const start = parser.startIndex;
  const body = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  return finishNode(parser, context, start, { type: 'ConciseBody', body }, NodeType.ConciseBody);
}

// BindingPattern :
//   SingleNameBinding
//   BindingPattern Initializer?
// SingleNameBinding :
//   BindingIdentifier Initializer?
export function parseBindingPattern(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.BindingElement {
  const start = parser.startIndex;
  const binding: any = parseBindingElement(parser, context, bindingType);
  const initializer: Types.Expression | null = parser.token === Token.Assign ? parseInitializer(parser, context) : null;
  return finishNode(parser, context, start, { type: 'BindingElement', binding, initializer }, NodeType.BindingElement);
}

// BindingElement :
//   SingleNameBinding
//   BindingPattern Initializer?
// SingleNameBinding :
//   BindingIdentifier Initializer?
export function parseBindingElement(parser: ParserState, context: Context, bindingType: BindingType): any {
  let binding: Types.BindingPattern | Types.AssignmentPattern;
  const start = parser.startIndex;
  if ((parser.token & Token.IsPatternStart) > 0) {
    binding =
      parser.token === Token.LeftBrace
        ? parseObjectBindingPattern(parser, context, bindingType | BindingType.Pattern | BindingType.AllowLHS, start)
        : parseArrayBindingPattern(parser, context, bindingType | BindingType.Pattern | BindingType.AllowLHS, start);
    if ((parser.destructible & (Destructible.NotDestructible | Destructible.Assignable)) > 0) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
    return binding as Types.BindingIdentifier | Types.BindingPattern;
  }
  const token = parser.token;
  return parseAndClassifyIdentifier(parser, context, token, parser.tokenValue, bindingType, true, start);
}

// MethodDefinition :
//   PropertyName
//   GeneratorMethod
//   AsyncMethod
//   AsyncGeneratorMethod
//   getPropertyName
//   setPropertyName
export function parseMethodDefinition(
  parser: ParserState,
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

  const startIndex = parser.startIndex;
  let propertySetParameterList: Types.BindingElement[] = [];
  let uniqueFormalParameters: Types.FormalParameters[] = [];

  // getter
  if (modifiers & ModifierKind.Getter) {
    consume(parser, context, Token.LeftParen);
    consume(parser, context, Token.RightParen);
    // setter
  } else if (modifiers & ModifierKind.Setter) {
    consume(parser, context, Token.LeftParen);
    propertySetParameterList = [parseBindingPattern(parser, context, BindingType.ArgumentList)];
    consume(parser, context, Token.RightParen);
  } else {
    uniqueFormalParameters = parseFormalParameters(parser, context | Context.Parameters);
  }

  const contents = parseFunctionBody(
    parser,
    (context | 0b00000010000100100010000000000000) ^ 0b00000000000100100000000000000000,
    /* isDeclaration */ false
  );

  parser.assignable = false;

  return finishNode(
    parser,
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
export function parseClassDeclaration(parser: ParserState, context: Context): Types.ClassDeclaration {
  const start = parser.startIndex;
  consume(parser, context, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | 0b00000001000000000010000000000000) ^ 0b00000001000000000010000000000000;

  context |= Context.Strict;

  let name: Types.BindingIdentifier | null = null;
  let superClass: Types.LeftHandSideExpression | null = null;

  if (parser.token & (Token.IsIdentifier | Token.FutureKeyword) && parser.token !== Token.ExtendsKeyword) {
    if (isStrictReservedWord(parser, context, parser.token)) {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.StrictReservedWord, DiagnosticKind.Error);
    }
    name = parseBindingIdentifier(parser, context, BindingType.None);
  } else if ((context & Context.Default) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.ClassDeclNoName, DiagnosticKind.Error);
  }

  if (consumeOpt(parser, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    superClass = parseExpression(parser, context, Precedence.LeftHandSide, BindingType.None, true, start);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  parser.flags = (parser.flags | Flags.HasConstructor) ^ Flags.HasConstructor;

  const leafs = parseClassElementList(parser, inheritedContext, context, false);

  parser.assignable = false;

  return finishNode(
    parser,
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
export function parseClassExpression(parser: ParserState, context: Context): Types.ClassExpression {
  const start = parser.startIndex;
  consume(parser, context, Token.ClassKeyword);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | 0b00000001000000000010000000000000) ^ 0b00000001000000000010000000000000;

  context |= Context.Strict;

  let name: Types.BindingIdentifier | null = null;
  let superClass: Types.LeftHandSideExpression | null = null;

  if (parser.token & (Token.IsIdentifier | Token.FutureKeyword) && parser.token !== Token.ExtendsKeyword) {
    if (isStrictReservedWord(parser, context, parser.token)) {
      addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.StrictReservedWord, DiagnosticKind.Error);
    }
    name = parseBindingIdentifier(parser, context, BindingType.None);
  }

  if (consumeOpt(parser, context | Context.AllowRegExp, Token.ExtendsKeyword)) {
    superClass = parseExpression(parser, context, Precedence.LeftHandSide, BindingType.None, true, start);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  parser.flags = (parser.flags | Flags.HasConstructor) ^ Flags.HasConstructor;

  const leafs = parseClassElementList(parser, inheritedContext, context, true);

  parser.assignable = false;

  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  isExpression: boolean
): any {
  if (context & Context.ErrorRecovery) {
    const start = parser.startIndex;
    if (consumeOpt(parser, context | Context.AllowRegExp, Token.LeftBrace)) {
      const classElementList: any[] = [];
      while (parser.token & Constants.ClassElementList) {
        if (consumeOpt(parser, context, Token.Semicolon)) continue;
        classElementList.push(
          parseClassElements(parser, context, inheritedContext, ModifierKind.None, parseClassElement)
        );
      }
      consume(parser, isExpression === false ? context | Context.AllowRegExp : context, Token.RightBrace);
      return createBlockArray(parser, classElementList, start);
    }
    return createMissingList(start);
  }
  const classElementList: any[] = [];
  consume(parser, context | Context.AllowRegExp, Token.LeftBrace);
  while (parser.token & Constants.ClassElementList) {
    if (consumeOpt(parser, context, Token.Semicolon)) continue;
    classElementList.push(parseClassElement(parser, context, inheritedContext, ModifierKind.None));
  }
  consume(parser, isExpression === false ? context | Context.AllowRegExp : context, Token.RightBrace);
  return classElementList;
}

// ClassElement :
//   `static` MethodDefinition
//   MethodDefinition
export function parseClassElement(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  modifiers: ModifierKind
): Types.ClassElement {
  let name: any;
  const token = parser.token;
  const start = parser.startIndex;
  if (token & Constants.IdentfierName) {
    name = parseIdentifierName(parser, context);
    if (parser.token !== Token.LeftParen) {
      if ((modifiers & ModifierKind.Static) === 0 && token === Token.StaticKeyword) {
        return parseClassElement(parser, context, inheritedContext, modifiers | ModifierKind.Static);
      } else if (!parser.hasLineTerminator && token === Token.AsyncKeyword) {
        modifiers |= ModifierKind.Async;
        if (consumeOpt(parser, context, Token.Multiply)) modifiers |= ModifierKind.Generator;
      } else if (token === Token.GetKeyword) {
        modifiers |= ModifierKind.Getter;
      } else if (token === Token.SetKeyword) {
        modifiers |= ModifierKind.Setter;
      }
    }
  } else if (token === Token.NumericLiteral) {
    name = parseNumericLiteral(parser, context);
  } else if (token === Token.StringLiteral) {
    name = parseStringLiteral(parser, context);
  } else if (token === Token.BigIntLiteral) {
    name = parseBigIntLiteral(parser, context);
  } else if (token === Token.LeftBracket) {
    nextToken(parser, context);
    modifiers |= ModifierKind.Computed;
    name = parseExpression(parser, inheritedContext, Precedence.Assign, BindingType.AllowLHS, true, start);
    consume(parser, context, Token.RightBracket);
  } else if (token === Token.Multiply) {
    modifiers |= ModifierKind.Generator;
    nextToken(parser, context); // skip: '*'
  }

  if ((modifiers & 15) > 0) {
    if (parser.token === Token.LeftBracket) {
      nextToken(parser, context);
      modifiers |= ModifierKind.Computed;
      name = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
      consume(parser, context, Token.RightBracket);
    } else {
      name = parsePropertyName(parser, context, start);
    }
  }

  if ((modifiers & ModifierKind.Computed) === 0) {
    if (parser.tokenValue === 'constructor') {
      if ((modifiers & ModifierKind.Static) === 0 && parser.token === Token.LeftParen) {
        if ((modifiers & 13) > 0) {
          addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
        }
        if ((context & Context.SuperCall) !== Context.SuperCall) {
          if (parser.flags & Flags.HasConstructor) {
            addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
          } else {
            parser.flags |= Flags.HasConstructor;
          }
        }
      }
      modifiers |= ModifierKind.Constructor;
    } else if ((modifiers & ModifierKind.Static) > 0 && parser.tokenValue === 'prototype') {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
  }

  const method = parseMethodDefinition(parser, context, name, modifiers);

  return finishNode(
    parser,
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
export function parseSuperPropertyOrCall(parser: ParserState, context: Context): Types.SuperProperty | Types.SuperCall {
  const start = parser.startIndex;
  nextToken(parser, context); // skips: 'super'
  if (parser.token === Token.LeftParen) {
    if ((context & Context.SuperCall) === 0) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidSuperCall, DiagnosticKind.Error);
    }
    const args = parseArguments(parser, context);
    return finishNode(parser, context, start, { type: 'SuperCall', arguments: args }, NodeType.SuperCall);
  }

  if ((context & Context.SuperProperty) === 0) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.InvalidSuperProperty, DiagnosticKind.Error);
  }
  if (parser.token === Token.QuestionMarkPeriod) {
    addDiagnostic(
      parser,
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
  if (consumeOpt(parser, context, Token.LeftBracket)) {
    parser.assignable = true;
    expression = parseExpression(parser, context, Precedence.Assign, BindingType.Assignment, true, start);
    consume(parser, context, Token.RightBracket);
  } else if (parser.token === Token.Period) {
    nextToken(parser, context);
    name = parseIdentifierName(parser, context);
    parser.assignable = true;
  } else {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  return finishNode(parser, context, start, { type: 'SuperProperty', expression, name }, NodeType.SuperProperty);
}

// ImportCall :
//  import
// ImportMeta:
//   import.meta
export function parseImportMetaOrCall(parser: ParserState, context: Context): Types.ImportCall | Types.ImportMeta {
  const start = parser.startIndex;
  nextToken(parser, context);

  if (context & Context.ImportMeta && consumeOpt(parser, context, Token.Period)) {
    consume(parser, context, Token.MetaKeyword);
    parser.assignable = false;
    return finishNode(parser, context, start, { type: 'ImportMeta' }, NodeType.ImportMeta);
  }

  consume(parser, context | Context.AllowRegExp, Token.LeftParen);
  const expr = parseExpression(parser, context, Precedence.Assign, BindingType.AllowLHS, true, start);
  consume(parser, context, Token.RightParen);
  parser.assignable = false;
  return finishNode(parser, context, start, { type: 'ImportCall', import: expr }, NodeType.ImportCall);
}

// NewExpression :
//   MemberExpression
//   new NewExpression
export function parseNewExpression(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.NewTarget | Types.NewExpression {
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  if (context & Context.NewTarget && consumeOpt(parser, context, Token.Period)) {
    return parseNewTargetExpression(parser, context, start);
  }
  const expression = parseExpression(parser, context, Precedence.LeftHandSide, bindingType, false, start);
  const args = parser.token === Token.LeftParen ? parseArguments(parser, context) : [];
  parser.assignable = false;

  return finishNode(
    parser,
    context,
    start,
    { type: 'NewExpression', expression, arguments: args },
    NodeType.NewExpression
  );
}

export function parseNewTargetExpression(
  parser: ParserState,
  context: Context,
  start: number
): Types.NewTarget | Types.NewExpression {
  consume(parser, context, Token.TargetKeyword);
  parser.assignable = false;
  return finishNode(parser, context, start, { type: 'NewTarget' }, NodeType.NewTarget);
}

// YieldExpression :
//   `yield`
//   `yield` [no LineTerminator here] AssignmentExpression
//   `yield` [no LineTerminator here] `*` AssignmentExpression
export function parseYieldExpression(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.YieldExpression | Types.IdentifierReference | Types.ArrowFunction {
  if (context & Context.Parameters) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  const start = parser.startIndex;
  nextToken(parser, context | Context.AllowRegExp);
  let delegate = false;
  let expression: any = null;
  if (!parser.hasLineTerminator) {
    delegate = consumeOpt(parser, context | Context.AllowRegExp, Token.Multiply);
    if (delegate || (parser.token & Token.IsExpressionStart) === Token.IsExpressionStart) {
      expression = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
    }
  }

  parser.assignable = false;

  return finishNode(
    parser,
    context,
    start,
    { type: 'YieldExpression', delegate, expression } as any,
    NodeType.YieldExpression
  );
}

// AwaitExpression : `await` UnaryExpression
export function parseAwaitExpression(
  parser: ParserState,
  context: Context,
  bindingType: BindingType
): Types.AwaitExpression | Types.IdentifierReference | Types.ArrowFunction {
  const start = parser.startIndex;
  if (context & Context.Parameters) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  nextToken(parser, context | Context.AllowRegExp);
  const expression = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  parser.assignable = false;
  return finishNode(parser, context, start, { type: 'AwaitExpression', expression } as any, NodeType.AwaitExpression);
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): any {
  if (!parser.hasLineTerminator) {
    // async Identifier => ...
    if ((parser.token & (Token.FutureKeyword | Token.IsIdentifier)) !== 0) {
      let expr: any = parseIdentifierReference(parser, context, bindingType);
      expr = parseArrowFunction(parser, context, [expr], bindingType, 1, start);
      expr = parseCommaOperator(parser, context, expr, start);
      return parseExpressionStatement(parser, context, expr, start);
    }
  }

  let expr: any = parseIdentifierReferenceFromValue(parser, context, 'async', bindingType, start);

  if (parser.token === Token.LeftParen) {
    expr = parseAsyncArrowOrCallExpression(parser, context, expr, bindingType, start);
  } else if (parser.token === Token.Arrow) {
    expr = parseArrowFunction(parser, context, [expr], bindingType, 0, start);
  }

  if (parser.token === Token.Colon) {
    return parseLabelledStatement(parser, context, Token.AsyncKeyword, 'async', start);
  }

  expr = parseLeftHandSide(parser, context, expr, Precedence.Assign, BindingType.AllowLHS, start);

  expr = parseCommaOperator(parser, context, expr, start);

  return parseExpressionStatement(parser, context, expr, start);
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
  parser: ParserState,
  context: Context,
  bindingType: BindingType,
  start: number
): any {
  if (!parser.hasLineTerminator) {
    // async Identifier => ...
    if ((parser.token & (Token.FutureKeyword | Token.IsIdentifier)) !== 0) {
      if ((bindingType & BindingType.AllowLHS) === 0) {
        addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
      }
      const expr: any = parseIdentifierReference(parser, context, bindingType);
      return parseArrowFunction(parser, context, [expr], bindingType, 1, start);
    }
  }

  const expr: any = parseIdentifierReferenceFromValue(parser, context, 'async', bindingType, start);

  if (parser.token === Token.LeftParen) {
    return parseAsyncArrowOrCallExpression(parser, context, expr, bindingType, start);
  }

  if (parser.token === Token.Arrow) {
    return parseArrowFunction(parser, context, [expr], bindingType, 0, start);
  }

  parser.assignable = true;
  return expr;
}

export function parseAsyncArrowOrCallExpression(
  parser: ParserState,
  context: Context,
  expression: any,
  bindingType: BindingType,
  start: number
): any {
  nextToken(parser, context | Context.AllowRegExp);

  if (parser.token === Token.RightParen) {
    nextToken(parser, context);

    if (parser.token === Token.Arrow) {
      return parseArrowFunction(parser, context, [], bindingType, 1, start);
    }

    parser.assignable = false;

    return finishNode(
      parser,
      context,
      start,
      { type: 'CallExpression', expression, arguments: [] },
      NodeType.CallExpression
    );
  }

  let expr: any = null;

  let destructible: Destructible = Destructible.None;

  const params: Types.Expression[] = [];

  while (parser.token !== Token.RightParen) {
    const startIndex = parser.startIndex;
    const token = parser.token;

    if ((token & Constants.IdentfierName) > 0) {
      expr = parseExpression(parser, context, Precedence.Primary, bindingType, true, startIndex);

      // (x, false) => y
      if (parser.token === Token.Comma || parser.token === Token.RightParen) {
        if (!parser.assignable) destructible |= Destructible.NotDestructible;
      } else {
        expr = parseLeftHandSide(parser, context, expression, Precedence.LeftHandSide, bindingType, startIndex);

        if (parser.token === Token.Assign) parser.assignable = true;

        if (parser.token !== Token.RightParen && parser.token !== Token.Comma) {
          expr = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, startIndex);
        }
      }
    } else if ((parser.token & Token.IsPatternStart) > 0) {
      expr =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, false, bindingType | BindingType.ArgumentList, startIndex)
          : parseArrayLiteralOrPattern(parser, context, false, bindingType | BindingType.ArgumentList, startIndex);

      destructible |= parser.destructible;

      parser.assignable = false;

      if (parser.token !== Token.Comma && parser.token !== Token.RightParen) {
        if (destructible & Destructible.MustDestruct) {
          addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
        }
        expr = parseLeftHandSide(parser, context, expression, Precedence.Assign, bindingType, startIndex);
        destructible |= !parser.assignable ? Destructible.NotDestructible : Destructible.Assignable;
      }
    } else if (token === Token.Ellipsis) {
      expr = parseSpreadOrRestElement(
        parser,
        context,
        Token.RightParen,
        bindingType | BindingType.ArgumentList,
        false,
        true,
        start
      );

      destructible |=
        ((parser.token as Token) === Token.RightParen ? Destructible.None : Destructible.NotDestructible) |
        parser.destructible;
    } else {
      do {
        params.push(parseExpression(parser, context, Precedence.Assign, bindingType, true, startIndex));
        consumeOpt(parser, context | Context.AllowRegExp, Token.Comma);
      } while (parser.token !== Token.RightParen);

      consume(parser, context, Token.RightParen);

      parser.destructible = Destructible.NotDestructible;

      parser.assignable = false;

      return finishNode(
        parser,
        context,
        start,
        { type: 'CallExpression', expression, arguments: params as any },
        NodeType.CallExpression
      );
    }

    params.push(expr as Types.Expression);

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context | Context.AllowRegExp);
  }

  consume(parser, context, Token.RightParen);

  if (parser.token === Token.Arrow) {
    if (destructible & (Destructible.Assignable | Destructible.NotDestructible)) {
      addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
    }
    return parseArrowFunction(parser, context, params as any, bindingType, 1, start);
  }

  if (destructible & Destructible.MustDestruct) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }

  parser.destructible = destructible;

  parser.assignable = false;

  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  left: any,
  bindingType: BindingType,
  start: number
): any {
  if (!parser.assignable) {
    addDiagnostic(parser, context, DiagnosticSource.Parser, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
  }
  nextToken(parser, context | Context.AllowRegExp);
  const right = parseExpression(parser, context, Precedence.Assign, bindingType, true, start);
  parser.destructible = Destructible.None;
  return finishNode(parser, context, start, { type: 'AssignmentPattern', left, right }, NodeType.AssignmentPattern);
}

export function parseLabelIdentifier(parser: ParserState, context: Context): Types.LabelIdentifier {
  const name = parser.tokenValue;
  const start = parser.startIndex;

  nextToken(parser, context | Context.AllowRegExp);

  return finishNode(
    parser,
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
  parser: ParserState,
  context: Context,
  name: string,
  start: number
): Types.BindingIdentifier {
  return finishNode(parser, context, start, { type: 'BindingIdentifier', name }, NodeType.BindingIdentifier);
}

export function parseDirectives(
  parser: ParserState,
  context: Context,
  _token: Token,
  value: string,
  start: number
): any {
  parser.assignable = false;
  let expr = finishNode(parser, context, start, { type: 'StringLiteral', value }, NodeType.StringLiteral);
  if (parser.token !== Token.Semicolon) {
    expr = parseLeftHandSide(parser, context, expr, Precedence.Assign, BindingType.AllowLHS, start);
    expr = parseCommaOperator(parser, context, expr, start) as any;
  }
  return expr;
}
