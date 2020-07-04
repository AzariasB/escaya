import { ParserState, Context } from './common';

/**
 * Diagnostic types
 */

/**
 * The base type of all types which represent some kind of diagnostic.
 */
export interface Diagnostic {
  kind: /* Message */ 0 | /* Warning */ 1 | /* Error */ 2 | /* Hint */ 3;
  source: DiagnosticSource;
  message: string;
  start: number;
  end: number;
}

/**
 * Sources of diagnostic messages.
 */
export const enum DiagnosticSource {
  Lexer = 0,
  Parser = 1 << 1
}

/**
 * Types of diagnostics which can be generated.
 */
export enum DiagnosticKind {
  Message,
  Warning,
  Error,
  Hint
}

/**
 * Unique codes for each diagnostic message which can be generated.
 */
export enum DiagnosticCode {
  // errors
  Unexpected,
  Expected,
  UnknownToken,
  InvalidBindingIdentifier,
  InvalidLHS,
  InvalidDestruct,
  InvalidIncDecTarget,
  InvalidExponentation,
  IllegalReturn,
  InvalidDestructuringTarget,
  InvalidLHSDestructRHS,
  InvalidBindingDestruct,
  InvalidArrowDestructLHS,
  StrictFunction,
  SloppyFunction,
  ClassForbiddenAsStatement,
  StrictWith,
  NewlineAfterThrow,
  RestricedLetProduction,
  StrictReservedWord,
  LineTerminatorNotPermittedBeforeArrow,
  FuncDeclNoName,
  ClassDeclNoName,
  BlockBodyInvokedWithoutGroup,
  BlockBodyAccessedWithoutGroup,
  BlockBodyTaggedWithoutGroup,
  ArrowOperatorToRight,
  ArrowPostfixUpdateOperator,
  DuplicateDefaultClause,
  InvalidSuperProperty,
  InvalidSuperCall,
  ExpectedIdentifier,
  DuplicateRegExpFlag,
  UnterminatedRegExp,
  UnknownRegExpFlag,
  UnterminatedString,
  UnterminatedTemplate,
  InvalidOctalEscapeInTemplate,
  ExpectedComma,
  DeclMissingDestructInitializer,
  ConstMissingDestrictInitializer,
  ExpectedArrow,
  CantAssignToLoop,
  CantAssignForInLoop,
  CantAssignForLoop,
  CantAssignForAwaitLoop,
  ForOfLet,
  DisallowedLetInStrict,
  WebCompatFunction,
  AsyncFunctionInSingleStatementContext,
  InvalidDotProperty,
  OptionalChainingNoTemplate,
  StrictDelete,
  ForInLoopMultiBindings,
  ForOfLoopMultiBindings,
  InvalidImportInSloppy,
  NoCatchOrFinally,
  CatchWithoutTry,
  FinallyWithoutTry,
  InvalidTrailingComma,
  IllegalBreak,
  IllegalContinue,
  AwaitOutsideAsync,
  DisallowedYieldInContext,
  UnexpectedStrictReserved,
  StrictInvalidLetInExprPos,
  InvalidForAwait,
  InvalidLetConstBinding,
  InvalidKeyword,
  LetInStrictMode,
  HtmlCommentInModule,
  InvalidCharacter,
  InvalidLowerSurrogate,
  InvalidUnicodeEscapeSequence,
  InvalidHexEscapeSequence,
  UnicodeOverflow,
  InvalidAstralCharacter,
  StrictOctalEscape,
  InvalidEightAndNine,
  IdafterNumber,
  StrictOctal,
  OctalSequence,
  BinarySequence,
  BinarySequenceNoDigits,
  OctalSequenceNoDigits,
  HexSequenceNoDigits,
  UnknownDigit,
  MissingExponent,
  InvalidBigIntLiteral,
  UnterminatedComment,
  TemplateBadEscape,
  UnsupportedUnicodeIdent
}

export const DiagnosticMessages: {
  [key: string]: string;
} = {
  [DiagnosticCode.UnterminatedComment]: "Multiline comment isn't closed properly",
  [DiagnosticCode.StrictOctalEscape]: 'Octal escape sequences are not allowed in strict mode',
  [DiagnosticCode.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [DiagnosticCode.UnicodeOverflow]: 'Unicode codepoint must not be greater than 0x10FFFF',
  [DiagnosticCode.InvalidAstralCharacter]: "Invalid astral character '%0'",
  [DiagnosticCode.InvalidUnicodeEscapeSequence]: 'Invalid Unicode escape sequence',
  [DiagnosticCode.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
  [DiagnosticCode.HtmlCommentInModule]: 'HTML comments are not allowed in modules or without AnnexB support',
  [DiagnosticCode.InvalidBindingIdentifier]: "'Invalid binding identifier",
  [DiagnosticCode.InvalidForAwait]: "'for-await' can only be used inside an async function",
  [DiagnosticCode.StrictReservedWord]: 'StrictReservedWord',
  [DiagnosticCode.StrictInvalidLetInExprPos]: 'StrictInvalidLetInExprPos',
  [DiagnosticCode.LetInStrictMode]: "'let' is a reserved word in strict mode",
  [DiagnosticCode.InvalidKeyword]: 'Invalid keyword',
  [DiagnosticCode.InvalidLetConstBinding]: "'A lexical declaration can't define a 'let' binding",
  [DiagnosticCode.DisallowedYieldInContext]: "'yield' may not be used as an identifier in this context",
  [DiagnosticCode.AwaitOutsideAsync]: 'Await is only valid in async functions',
  [DiagnosticCode.UnexpectedStrictReserved]: 'Unexpected reserved keyword in strict mode',
  [DiagnosticCode.IllegalContinue]: 'Illegal continue statement',
  [DiagnosticCode.IllegalBreak]: 'Illegal break statement',
  [DiagnosticCode.InvalidTrailingComma]: 'Invalid trailing comma before the closing parenthesis',
  [DiagnosticCode.NoCatchOrFinally]: 'Missing catch or finally after Try',
  [DiagnosticCode.CatchWithoutTry]: 'Catch without Try',
  [DiagnosticCode.FinallyWithoutTry]: 'Finally without Try',
  [DiagnosticCode.Unexpected]: "Unexpected token '%0'",
  [DiagnosticCode.InvalidCharacter]: "Invalid character '%0'",
  [DiagnosticCode.InvalidLowerSurrogate]: "Invalid lower surrogate '%0'",
  [DiagnosticCode.Expected]: 'Expected %0',
  [DiagnosticCode.InvalidImportInSloppy]: 'The export keyword can only be used with the module goal',
  [DiagnosticCode.ForInLoopMultiBindings]: 'Invalid left-hand side in for-In loop: Must have a single binding',
  [DiagnosticCode.ForOfLoopMultiBindings]: 'Invalid left-hand side in for-of loop: Must have a single binding',
  [DiagnosticCode.UnknownToken]: 'Unknown token',
  [DiagnosticCode.StrictReservedWord]: 'Use of future reserved word in strict mode',
  [DiagnosticCode.InvalidLHS]: 'Invalid left-hand side in assignment',
  [DiagnosticCode.InvalidDestruct]: 'Invalid destruct',
  [DiagnosticCode.InvalidIncDecTarget]: 'Invalid increment/decrement operand',
  [DiagnosticCode.InvalidExponentation]:
    'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
  [DiagnosticCode.IllegalReturn]: 'Illegal return statement',
  [DiagnosticCode.InvalidDestructuringTarget]: 'Invalid destructuring assignment target',
  [DiagnosticCode.InvalidLHSDestructRHS]: 'Invalid left-hand side assignment to a destructible right-hand side',
  [DiagnosticCode.InvalidArrowDestructLHS]: 'The left-hand side of the arrow can only be destructed through assignment',
  [DiagnosticCode.InvalidBindingDestruct]: 'The binding declaration is not destructible',
  [DiagnosticCode.DeclMissingDestructInitializer]: 'A destructuring declaration must have an initializer',
  [DiagnosticCode.ConstMissingDestrictInitializer]: "'const' declarations must be initialized",
  [DiagnosticCode.StrictFunction]:
    'In strict mode code or without web compability enabled, functions can only be declared at top level or inside a block',
  [DiagnosticCode.SloppyFunction]:
    'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [DiagnosticCode.ClassForbiddenAsStatement]: "Class declaration can't appear in single-statement context",
  [DiagnosticCode.StrictWith]: 'Strict mode code may not include a with statement',
  [DiagnosticCode.NewlineAfterThrow]: 'Illegal newline after throw',
  [DiagnosticCode.RestricedLetProduction]: 'RestricedLetProduction',
  [DiagnosticCode.LineTerminatorNotPermittedBeforeArrow]: 'Line terminator not permitted before arrow',
  [DiagnosticCode.FuncDeclNoName]: 'A function declaration must have a name in this context',
  [DiagnosticCode.ClassDeclNoName]: 'A class declaration must have a name in this context',
  [DiagnosticCode.BlockBodyInvokedWithoutGroup]: 'Block body arrows can not be immediately invoked without a group',
  [DiagnosticCode.BlockBodyAccessedWithoutGroup]: 'Block body arrows can not be immediately accessed without a group',
  [DiagnosticCode.BlockBodyTaggedWithoutGroup]: 'Block body arrows can not be immediately tagged without a group',
  [DiagnosticCode.ArrowOperatorToRight]: 'An arrow function can not be part of an operator to the right',
  [DiagnosticCode.ArrowPostfixUpdateOperator]: 'An arrow function can not have a postfix update operator',
  [DiagnosticCode.DuplicateDefaultClause]: "A 'default' clause cannot appear more than once in a 'switch' statement.",
  [DiagnosticCode.InvalidSuperCall]:
    'Calls to super must be in the "constructor" method of a class expression or class declaration that has a super class',
  [DiagnosticCode.InvalidSuperProperty]: 'Member access on super must be in a method',
  [DiagnosticCode.ExpectedIdentifier]: 'Expected an identifier',
  [DiagnosticCode.UnterminatedRegExp]: 'Unterminated regular expression',
  [DiagnosticCode.UnknownRegExpFlag]: 'Unexpected regular expression flag',
  [DiagnosticCode.DuplicateRegExpFlag]: 'Duplicate regular expression flag',
  [DiagnosticCode.UnterminatedString]: 'Unterminated string literal',
  [DiagnosticCode.UnterminatedTemplate]: 'Unterminated template literal',
  [DiagnosticCode.InvalidOctalEscapeInTemplate]: 'Template literals may not contain octal escape sequences',
  [DiagnosticCode.TemplateBadEscape]: 'Bad escape sequence in untagged template literal',
  [DiagnosticCode.ExpectedComma]: "',' expected",
  [DiagnosticCode.ExpectedArrow]: "'=>' expected",
  [DiagnosticCode.CantAssignToLoop]: 'Invalid left-hand side in for loop',
  [DiagnosticCode.CantAssignForInLoop]: 'Invalid left-hand side in for-in loop',
  [DiagnosticCode.CantAssignForLoop]: 'Invalid left-hand side in for-of loop',
  [DiagnosticCode.CantAssignForAwaitLoop]: 'Invalid left-hand side in for-await loop',
  [DiagnosticCode.ForOfLet]: "The left-hand side of a for-of loop may not start with 'let'",
  [DiagnosticCode.InvalidDotProperty]: 'InvalidDotProperty',
  [DiagnosticCode.OptionalChainingNoTemplate]: 'OptionalChainingNoTemplate',
  [DiagnosticCode.DisallowedLetInStrict]: 'Identifier "let" disallowed as left-hand side expression in strict mode',
  [DiagnosticCode.WebCompatFunction]:
    'Without web compability enabled functions can not be declared at top level, inside a block, or as the body of an if statement',
  [DiagnosticCode.AsyncFunctionInSingleStatementContext]:
    'Async functions can only be declared at the top level or inside a block',
  [DiagnosticCode.IdafterNumber]: 'An identifier or keyword cannot immediately follow a numeric literal',
  [DiagnosticCode.StrictOctal]: 'Octal literals are not allowed in strict mode',
  [DiagnosticCode.BinarySequence]: 'Binary integer literal like sequence containing an invalid digit',
  [DiagnosticCode.OctalSequence]: 'Octal integer literal like sequence containing an invalid digit',
  [DiagnosticCode.BinarySequenceNoDigits]: 'Binary integer literal like sequence without any digits',
  [DiagnosticCode.OctalSequenceNoDigits]: 'Octal integer literal like sequence without any digits',
  [DiagnosticCode.HexSequenceNoDigits]: 'Hex integer literal like sequence without any digits',
  [DiagnosticCode.MissingExponent]: 'Non-number found after exponent indicator',
  [DiagnosticCode.UnknownDigit]: 'Unknown digit',
  [DiagnosticCode.InvalidBigIntLiteral]: 'Invalid BigInt syntax',
  [DiagnosticCode.UnsupportedUnicodeIdent]: 'Unsupported unicode escape in identifier escapes start'
};

export function createDiagnostic(
  source: DiagnosticSource,
  message: string,
  kind: DiagnosticKind,
  start: number,
  end: number
): Diagnostic {
  return {
    kind,
    source,
    message,
    start,
    end
  };
}

export function addDiagnostic(
  parser: ParserState,
  context: any,
  source: DiagnosticSource,
  code: DiagnosticCode,
  kind: DiagnosticKind,
  ...args: string[]
): void {
  let message = DiagnosticMessages[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  if ((context & Context.ErrorRecovery) === 0) {
    throw `line:${parser.line}, column:${parser.index - parser.columnOffset} - ${message}`;
  }

  parser.diagnostics.push(createDiagnostic(source, message, kind, parser.startIndex, parser.index));
}

export function addDiagnosticByIndex(
  parser: ParserState,
  context: any,
  index: number,
  source: DiagnosticSource,
  code: DiagnosticCode,
  kind: DiagnosticKind,
  ...args: string[]
): void {
  let message = DiagnosticMessages[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  if ((context & Context.ErrorRecovery) === 0) {
    throw `line:${parser.line}, column:${index - parser.columnOffset} - ${message}`;
  }
  parser.diagnostics.push(createDiagnostic(source, message, kind, index, parser.index));
}

export function formatStringFromArgs(message: string, args: string[]): string {
  return message.replace(/%(\d+)/g, (__match: string, i: number) => args[i]);
}
