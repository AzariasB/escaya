import { DiagnosticCode } from './diagnostic-code';

export const diagnosticMap: {
  [key: string]: string;
} = {
  [DiagnosticCode.Unexpected]: 'Unexpected token',
  [DiagnosticCode.UnexpectedToken]: 'Unexpected token - `%0`',
  [DiagnosticCode.UnexpectedKeyword]: 'Unexpected keyword',
  [DiagnosticCode.UnexpectedIdentifier]: 'Unexpected identifier',
  [DiagnosticCode.UnexpectedEOF]: 'Unexpected end of input',
  [DiagnosticCode.ExpectedIdentifier]: 'Identifier expected',
  [DiagnosticCode.Expected]: '`%0` expected',
  [DiagnosticCode.ExpectedExpression]: 'Expression expected',
  [DiagnosticCode.ExpectedStatement]: 'Statement expected',
  [DiagnosticCode.InvalidCharacter]: 'Invalid character',
  [DiagnosticCode.MissingFuncName]: 'Function declaration require a name in this context',
  [DiagnosticCode.MissingClassName]: 'Class declaration require a name in this context',
  [DiagnosticCode.UnterminatedRegExp]: 'Unterminated regular expression',
  [DiagnosticCode.DuplicateRegExpFlag]: 'Duplicate regular expression flag',
  [DiagnosticCode.UnknownRegExpFlag]: 'Unknown regular expression flag',
  [DiagnosticCode.ExpectedParamDecl]: 'Parameter declaration expected',
  [DiagnosticCode.ExpectedVarOrLexDecl]: 'Variable declaration or lexical binding expected',
  [DiagnosticCode.ExpectedForDecl]: 'For declaration expected',
  [DiagnosticCode.ExpectedArrow]: '`=>` expected',
  [DiagnosticCode.StrictModeReserved]: 'Unexpected reserved word in strict mode',
  [DiagnosticCode.ExpectedBindingIdent]: 'Expected an binding identifier',
  [DiagnosticCode.ExpectedAnIdentifier]: 'Expected an identifier',
  [DiagnosticCode.UnexpectedYieldAsIdent]: 'Unexpected `yield` as identifier in this context',
  [DiagnosticCode.UnexpectedAwaitAsIdent]: 'Unexpected `await` as identifier in this context',
  [DiagnosticCode.AwaitInParameter]: '`Await` expression not allowed in formal parameters',
  [DiagnosticCode.YieldInParameter]: '`Yield` expression not allowed in formal parameters',
  [DiagnosticCode.NewlineAfterThrow]: 'Line break not allowed after `throw`',
  [DiagnosticCode.AnnexBB34]: 'B.3.4 FunctionDeclarations in IfStatement Statement Clauses',
  [DiagnosticCode.AnnexBB32]: 'B.3.2 Labelled Function Declarations',
  [DiagnosticCode.IllegalReturn]: 'A `return` statement can only be used within a function body.',
  [DiagnosticCode.CompundArrLit]: 'Cannot compound-assign to an array literal',
  [DiagnosticCode.CompundObjLit]: 'Cannot compound-assign to an object literal',
  [DiagnosticCode.ExpectedImportDecl]: 'Import declaration expected',
  [DiagnosticCode.ExpectedExportDecl]: 'Export declaration expected',
  [DiagnosticCode.ColonExpected]: '`:` expected',
  [DiagnosticCode.YieldAsIdent]: '`yield` may not be used as an identifier in this context',
  [DiagnosticCode.AwaitAsIdent]: '`await` may not be used as an identifier in this context',
  [DiagnosticCode.InvalidSuperCall]:
    'Calls to super must be in the "constructor" method of a class expression or class declaration that has a super class',
  [DiagnosticCode.InvalidSuperProperty]: 'Member access on super must be in a method',
  [DiagnosticCode.ChainingNoSuper]: 'Invalid optional chain from super property',
  [DiagnosticCode.InvalidExponentation]:
    'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
  [DiagnosticCode.StrictDelete]: 'Calling delete on expression not allowed in strict mode',
  [DiagnosticCode.ExpectedAccessor]: 'Unexpected token. A accessor was expected',
  [DiagnosticCode.StaticPrototype]: 'Classes may not have a static property named prototype',
  [DiagnosticCode.InvalidBreak]: 'A `break` statement can only be used within an enclosing iteration or switch',
  [DiagnosticCode.IllegalContinue]: 'A `continue` statement can only be used within an enclosing iteration statement',
  [DiagnosticCode.StrictWith]: 'A `with` statements are not allowed in strict mode',
  [DiagnosticCode.MissingDestructInit]: 'A destructuring declaration must have an initializer',
  [DiagnosticCode.InvalidCoalescing]:
    'Coalescing and logical operators used together in the same expression must be disambiguated with parentheses',
  [DiagnosticCode.InvalidTrailSurrogate]: "Invalid lower surrogate '%0'",
  [DiagnosticCode.InvalidAstralCharacter]: "Invalid astral character '%0'",
  [DiagnosticCode.InvalidUnicodeEscapeSequence]: 'Invalid Unicode escape sequence',
  [DiagnosticCode.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
  [DiagnosticCode.UnterminatedTemplate]: 'Unterminated template literal',
  [DiagnosticCode.UnsupportedUnicodeIdent]: 'Unsupported unicode escape in identifier escapes start',
  [DiagnosticCode.TemplateBadEscape]: 'Bad escape sequence in untagged template literal',
  [DiagnosticCode.UnterminatedString]: 'Unterminated string literal',
  [DiagnosticCode.StrictOctalEscape]: 'Octal escape sequences are not allowed in strict mode',
  [DiagnosticCode.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [DiagnosticCode.IdafterNumber]: 'An identifier or keyword cannot immediately follow a numeric literal',
  [DiagnosticCode.StrictOctal]: 'Octal literals are not allowed in strict mode',
  [DiagnosticCode.BinarySequence]: 'Binary integer literal like sequence containing an invalid digit',
  [DiagnosticCode.OctalSequence]: 'Octal integer literal like sequence containing an invalid digit',
  [DiagnosticCode.BinarySequenceNoDigits]: 'Binary integer literal like sequence without any digits',
  [DiagnosticCode.OctalSequenceNoDigits]: 'Octal integer literal like sequence without any digits',
  [DiagnosticCode.HexSequenceNoDigits]: 'Hex integer literal like sequence without any digits',
  [DiagnosticCode.MissingExponent]: 'Non-number after exponent indicator',
  [DiagnosticCode.UnknownDigit]: 'Unknown digit',
  [DiagnosticCode.InvalidBigIntLiteral]: 'Invalid BigInt syntax',
  [DiagnosticCode.SeparatorsDisallowed]: 'Numeric separators not allowed here',
  [DiagnosticCode.ContinuousNumericSeparator]: 'Multiple consecutive numeric separators are not permitted',
  [DiagnosticCode.TrailingNumericSeparator]: 'Numeric separators are not allowed at the end of numeric literals',
  [DiagnosticCode.UnderscoreAfterZero]: 'Numeric separator can not be used after leading 0',
  [DiagnosticCode.DisallowedLetInStrict]: 'Identifier "let" disallowed as left-hand side expression in strict mode',
  [DiagnosticCode.ForOfLet]: "The left-hand side of a for-of loop may not start with 'let'",
  [DiagnosticCode.StrictFunction]:
    'In strict mode code or without web compability enabled, functions can only be declared at top level or inside a block',
  [DiagnosticCode.SloppyFunction]:
    'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [DiagnosticCode.ClassForbiddenAsStatement]: "Class declaration can't appear in single-statement context",
  [DiagnosticCode.WebCompatFunction]:
    'Without web compability enabled functions can not be declared at top level, inside a block, or as the body of an if statement',
  [DiagnosticCode.AsyncFunctionInSingleStatementContext]:
    'Async functions can only be declared at the top level or inside a block',
  [DiagnosticCode.ChainNoTemplate]: 'Invalid optional chain in tagged template',
  [DiagnosticCode.BlockBodyInvokedWithoutGroup]: 'Block body arrows can not be immediately invoked without a group',
  [DiagnosticCode.BlockBodyAccessedWithoutGroup]: 'Block body arrows can not be immediately accessed without a group',
  [DiagnosticCode.BlockBodyTaggedWithoutGroup]: 'Block body arrows can not be immediately tagged without a group',
  [DiagnosticCode.ArrowOperatorToRight]: 'An arrow function can not be part of an operator to the right',
  [DiagnosticCode.UnclosedComment]: '`*/` expected',
  [DiagnosticCode.InvalidLetConstBinding]: 'A lexical declaration can not define a `let` binding',

  [DiagnosticCode.StrictInvalidLetInExprPos]: 'An arrow function can not be part of an operator to the right'
};
