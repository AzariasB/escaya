import { Node } from './node';

export const enum Token {
  Type = 0xff,

  /* Precedence for binary operators (always positive) */
  PrecStart = 8,
  Precedence = 15 << PrecStart, // 8-11
  IsLogical = 1 << 4,

  IsStatementStart = 1 << 12,
  IsExpressionStart = 1 << 13,
  IsAutomaticSemicolon = 1 << 14,
  IsPatternStart = 1 << 15,
  IsIdentifier = 1 << 16,
  IsAssignOp = 1 << 17,
  IsBinaryOp = 1 << 18,
  IsInOrOf = 1 << 19,
  IsFutureReserved = 1 << 20,
  IsPropertyOrCall = 1 << 21,
  IsMember = 1 << 22,
  IsDotDotDot = 1 << 23,
  IsProperty = 1 << 24,
  IsComma = 1 << 25,
  IsSwitchClauce = 1 << 26,
  IsKeyword = 1 << 27,
  IsCaseOrDefault = 1 << 28,
  IsVarLexical = 1 << 29,
  IsSemicolon = 1 << 30,

  // markers or thrown away tokens.
  EOF = 0 | IsAutomaticSemicolon,

  // 11.5 Tokens - Common token
  // 11.8 Literals

  Identifier = 1 | IsExpressionStart | IsIdentifier,
  NumericLiteral = 2 | IsExpressionStart | IsProperty,
  BigIntLiteral = 3 | IsExpressionStart | IsProperty,
  StringLiteral = 4 | IsExpressionStart | IsProperty,
  RegularExpression = 5 | IsExpressionStart,
  FalseKeyword = 6 | IsKeyword | IsExpressionStart | IsProperty,
  TrueKeyword = 7 | IsKeyword | IsExpressionStart | IsProperty,
  NullKeyword = 8 | IsKeyword | IsExpressionStart | IsProperty,

  // 11.8.6 - Template Literal Lexical Components
  TemplateTail = 9 | IsExpressionStart | IsMember | IsPropertyOrCall,
  TemplateCont = 10 | IsExpressionStart | IsMember | IsPropertyOrCall,

  /* Punctuators */
  Arrow = 11, // =>
  LeftParen = 12 | IsExpressionStart | IsPropertyOrCall, // (
  LeftBrace = 13 | IsExpressionStart | IsPatternStart, // {
  Period = 14 | IsMember | IsPropertyOrCall, // .
  Ellipsis = 15 | IsDotDotDot, // ...
  RightBrace = 16 | IsAutomaticSemicolon, // }
  RightParen = 17, // )
  Semicolon = 18 | IsStatementStart | IsAutomaticSemicolon | IsSemicolon | IsSwitchClauce, // ;
  Comma = 19 | IsComma, // ,
  LeftBracket = 20 | IsExpressionStart | IsPatternStart | IsMember | IsPropertyOrCall | IsProperty, // [
  RightBracket = 21, // ]
  Colon = 22, // :
  QuestionMark = 23, // ?
  Nullish = 24 | IsBinaryOp | (1 << PrecStart), // ??
  QuestionMarkPeriod = 25 | IsPropertyOrCall, // ?.
  SingleQuote = 26, // '
  DoubleQuote = 27, // "

  /* Update operators */
  Increment = 28 | IsExpressionStart | IsPropertyOrCall, // ++
  Decrement = 29 | IsExpressionStart | IsPropertyOrCall, // --

  /* Assign operators */
  Assign = 30 | IsAssignOp, // =
  ShiftLeftAssign = 31 | IsAssignOp, // <<=
  ShiftRightAssign = 32 | IsAssignOp, // >>=
  LogicalShiftRightAssign = 33 | IsAssignOp, // >>>=
  ExponentiateAssign = 34 | IsAssignOp, // **=
  AddAssign = 35 | IsAssignOp, // +=
  SubtractAssign = 36 | IsAssignOp, // -=
  MultiplyAssign = 37 | IsAssignOp, // *=
  DivideAssign = 38 | IsAssignOp, // /=
  ModuloAssign = 39 | IsAssignOp, // %=
  BitwiseXorAssign = 40 | IsAssignOp, // ^=
  BitwiseOrAssign = 41 | IsAssignOp, // |=
  BitwiseAndAssign = 42 | IsAssignOp, // &=
  LogicalOrAssign = 43 | IsAssignOp, // ||=
  LogicalAndAssign = 44 | IsAssignOp, // &&=
  NullishAssign = 45 | IsAssignOp, // ??=

  /* Unary/binary operators */
  TypeofKeyword = 46 | IsExpressionStart | IsKeyword,
  DeleteKeyword = 47 | IsExpressionStart | IsKeyword,
  VoidKeyword = 48 | IsKeyword | IsExpressionStart,
  Negate = 49 | IsExpressionStart, // !
  Complement = 50 | IsExpressionStart, // ~
  Add = 51 | IsExpressionStart | IsBinaryOp | (5 << PrecStart), // +
  Subtract = 52 | IsExpressionStart | IsBinaryOp | (10 << PrecStart), // -
  InKeyword = 53 | IsInOrOf | IsExpressionStart | IsBinaryOp | (8 << PrecStart) | IsKeyword,
  InstanceofKeyword = 54 | IsExpressionStart | IsBinaryOp | (8 << PrecStart) | IsKeyword,
  Multiply = 55 | IsExpressionStart | IsProperty | IsBinaryOp | (6 << PrecStart), // *
  Modulo = 56 | IsExpressionStart | IsBinaryOp | (11 << PrecStart), // %
  Divide = 57 | IsExpressionStart | IsBinaryOp | (11 << PrecStart), // /
  Exponentiate = 58 | IsExpressionStart | IsBinaryOp | (12 << PrecStart), // **
  LogicalAnd = 59 | IsExpressionStart | IsBinaryOp | (3 << PrecStart) | IsLogical, // &&
  LogicalOr = 60 | IsExpressionStart | IsBinaryOp | (2 << PrecStart) | IsLogical, // ||
  StrictEqual = 61 | IsExpressionStart | IsBinaryOp | (7 << PrecStart), // ===
  StrictNotEqual = 62 | IsExpressionStart | IsBinaryOp | (7 << PrecStart), // !==
  LooseEqual = 63 | IsExpressionStart | IsBinaryOp | (7 << PrecStart), // ==
  LooseNotEqual = 64 | IsExpressionStart | IsBinaryOp | (7 << PrecStart), // !=
  LessThanOrEqual = 65 | IsExpressionStart | IsBinaryOp | (8 << PrecStart), // <=
  GreaterThanOrEqual = 66 | IsExpressionStart | IsBinaryOp | (8 << PrecStart), // >=
  LessThan = 67 | IsExpressionStart | IsBinaryOp | (8 << PrecStart), // <
  GreaterThan = 68 | IsExpressionStart | IsBinaryOp | (8 << PrecStart), // >
  ShiftLeft = 69 | IsExpressionStart | IsBinaryOp | (9 << PrecStart), // <<
  ShiftRight = 70 | IsExpressionStart | IsBinaryOp | (9 << PrecStart), // >>
  LogicalShiftRight = 71 | IsExpressionStart | IsBinaryOp | (9 << PrecStart), // >>>
  BitwiseAnd = 72 | IsExpressionStart | IsBinaryOp | (6 << PrecStart), // &
  BitwiseOr = 73 | IsExpressionStart | IsBinaryOp | (4 << PrecStart), // |
  BitwiseXor = 74 | IsExpressionStart | IsBinaryOp | (5 << PrecStart), // ^

  /* Variable declaration kinds */
  VarKeyword = 75 | IsStatementStart | IsVarLexical | IsKeyword,
  LetKeyword = 76 | IsStatementStart | IsVarLexical | IsFutureReserved,
  ConstKeyword = 77 | IsStatementStart | IsVarLexical | IsKeyword,

  /* Other Keyword words */
  BreakKeyword = 78 | IsStatementStart | IsKeyword | IsSwitchClauce,
  CaseKeyword = 79 | IsCaseOrDefault | IsKeyword,
  CatchKeyword = 80 | IsStatementStart | IsKeyword,
  ClassKeyword = 81 | IsExpressionStart | IsSwitchClauce | IsKeyword,
  ContinueKeyword = 82 | IsStatementStart | IsSwitchClauce | IsKeyword,
  DebuggerKeyword = 83 | IsStatementStart | IsSwitchClauce | IsKeyword,
  DefaultKeyword = 84 | IsCaseOrDefault | IsKeyword,
  DoKeyword = 85 | IsStatementStart | IsSwitchClauce | IsKeyword,
  ElseKeyword = 86 | IsKeyword,
  ExportKeyword = 87 | IsKeyword | IsStatementStart,
  ExtendsKeyword = 88 | IsKeyword,
  FinallyKeyword = 89 | IsStatementStart | IsSwitchClauce | IsKeyword,
  ForKeyword = 90 | IsStatementStart | IsSwitchClauce | IsKeyword,
  FunctionKeyword = 91 | IsExpressionStart | IsSwitchClauce | IsKeyword,
  IfKeyword = 92 | IsStatementStart | IsSwitchClauce | IsKeyword,
  ImportKeyword = 93 | IsExpressionStart | IsSwitchClauce | IsKeyword,
  NewKeyword = 94 | IsStatementStart | IsKeyword,
  ReturnKeyword = 95 | IsStatementStart | IsSwitchClauce | IsKeyword,
  SuperKeyword = 96 | IsExpressionStart | IsKeyword,
  SwitchKeyword = 97 | IsStatementStart | IsSwitchClauce | IsKeyword,
  ThisKeyword = 98 | IsExpressionStart | IsKeyword,
  ThrowKeyword = 99 | IsStatementStart | IsSwitchClauce | IsKeyword,
  TryKeyword = 100 | IsStatementStart | IsSwitchClauce | IsKeyword,
  WhileKeyword = 101 | IsStatementStart | IsSwitchClauce | IsKeyword,
  WithKeyword = 102 | IsStatementStart | IsSwitchClauce | IsKeyword,

  /* Strict mode Keyword words */
  ImplementsKeyword = 103 | IsFutureReserved,
  InterfaceKeyword = 104 | IsFutureReserved,
  PackageKeyword = 105 | IsFutureReserved,
  PrivateKeyword = 106 | IsFutureReserved,
  ProtectedKeyword = 107 | IsFutureReserved,
  PublicKeyword = 108 | IsFutureReserved,
  StaticKeyword = 109 | IsFutureReserved,
  YieldKeyword = 110 | IsExpressionStart | IsFutureReserved,

  /* Contextual keywords */
  AsKeyword = 111 | IsIdentifier,
  AsyncKeyword = 112 | IsExpressionStart | IsSwitchClauce | IsIdentifier,
  AwaitKeyword = 113 | IsExpressionStart | IsIdentifier,
  ConstructorKeyword = 114 | IsIdentifier,
  GetKeyword = 115 | IsIdentifier,
  SetKeyword = 116 | IsIdentifier,
  FromKeyword = 117 | IsIdentifier,
  OfKeyword = 118 | IsInOrOf | IsIdentifier,
  EnumKeyword = 119 | IsKeyword,

  // Misc
  TargetIdentifier = 119 | IsIdentifier,
  MetaIdentifier = 120 | IsIdentifier,

  WhiteSpace = 121,
  CarriageReturn = 122,
  LineFeed = 123,
  Unknown = 124,

  EscapedIdentifier = 125,
  IdentifierOrKeyword = 126,
  FloatingPointLiteral = 127 | IsExpressionStart | IsProperty,

  SingleLine = 128,
  MultiLine = 129
}

export const KeywordDescTable = [
  'end of source',

  /* Constants/Bindings */
  'identifier',
  'number',
  'bigInt',
  'string',
  'regular expression',
  'false',
  'true',
  'null',

  /* Template nodes */
  'template continuation',
  'template end',

  /* Punctuators */
  '=>',
  '(',
  '{',
  '.',
  '...',
  '}',
  ')',
  ';',
  ',',
  '[',
  ']',
  ':',
  '?',
  '??',
  '?.',
  "'",
  '"',

  /* Update operators */
  '++',
  '--',

  /* Assign operators */
  '=',
  '<<=',
  '>>=',
  '>>>=',
  '**=',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '^=',
  '|=',
  '&=',
  '||=',
  '&&=',
  '??=',

  /* Unary/binary operators */
  'typeof',
  'delete',
  'void',
  '!',
  '~',
  '+',
  '-',
  'in',
  'instanceof',
  '*',
  '%',
  '/',
  '**',
  '&&',
  '||',
  '===',
  '!==',
  '==',
  '!=',
  '<=',
  '>=',
  '<',
  '>',
  '<<',
  '>>',
  '>>>',
  '&',
  '|',
  '^',

  /* Variable declaration kinds */
  'var',
  'let',
  'const',

  /* Other Keyword words */
  'break',
  'case',
  'catch',
  'class',
  'continue',
  'debugger',
  'default',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'while',
  'with',

  /* Strict mode Keyword words */
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',

  /* Contextual keywords */
  'as',
  'async',
  'await',
  'constructor',
  'get',
  'set',
  'from',
  'of',
  'enum',

  /* Misc */
  'target',
  'meta',

  'WhiteSpace',
  'CarriageReturn',
  'LineFeed',
  'Unknown'
];

export function createToken<T extends Token>(source: string, tokenKind: T): any {
  return {
    type: 'CST',
    kind: tokenKind,
    start: source.length,
    end: source.length
  } as any;
}
