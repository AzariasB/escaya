export const enum Token {
  Type = 0xff,

  /* Precedence for binary operators (always positive) */
  PrecStart = 8,
  Precedence = 15 << PrecStart, // 8-11

  /* Attribute names */
  IsStatementStart     = 0b0001000000000000,
  IsExpressionStart    = 0b0010000000000000,
  Contextual           = 0b0100000000000000,
  Keyword              = 0b00000000000000001000000000000000,
  FutureKeyword        = 0b00000000000000010000000000000000,
  IsAssignOp           = 0b00000000000000100000000000000000,
  IsBinaryOp           = 0b00000000000001000000000000000000,
  IsUnaryOp            = 0b00000000000010000000000000000000,
  IsUpdateOp           = 0b00000000000100000000000000000000,
  LeftHandSide         = 0b00000000001000000000000000000000,
  IsIdentifier         = 0b00000000010000000100000000000000,
  IsPatternStart       = 0b00000000100000000000000000000000,
  IsMember             = 0b00000001000000000000000000000000,
  IsProperty           = 0b10000000000000000000000000,
  IsVarDecl            = 0b00000100000000000000000000000000,
  IsAutomaticSemicolon = 0b00001000000000000000000000000000,
  IsCaseBlock          = 0b00010000000000000000000000000000,
  IsEllipsis           = 0b100000000000000000000000000000,
  IsInOrOf             = 0b1000000000000000000000000000000,

  /* Node types */
  EndOfSource = 0 | IsAutomaticSemicolon, // Pseudo

  /* Constants/Bindings */
  Identifier        = 0b00000000010000000110000000000001,
  NumericLiteral    = 0b10000000000010000000000010,
  BigIntLiteral     = 3 | IsProperty | IsExpressionStart,
  StringLiteral     = 4 | IsProperty | IsExpressionStart,
  RegularExpression = 5 | IsExpressionStart,
  FalseKeyword      = 6 | Keyword | IsExpressionStart,
  TrueKeyword       = 7 | Keyword | IsExpressionStart,
  NullKeyword       = 8 | Keyword | IsExpressionStart,

  /* Template nodes */
  TemplateCont = 9 | IsMember | LeftHandSide | IsExpressionStart,
  TemplateTail = 10 | IsMember | LeftHandSide | IsExpressionStart,

  /* Punctuators */
  Arrow        = 11, // =>
  LeftParen    = 12 | LeftHandSide | IsExpressionStart, // (
  LeftBrace    = 13 | IsPatternStart | IsExpressionStart, // {
  Period       = 14 | IsMember | LeftHandSide, // .
  Ellipsis     = 15 | IsEllipsis, // ...
  RightBrace   = 16 | IsAutomaticSemicolon, // }
  RightParen   = 17, // )
  Semicolon    = 18 | IsAutomaticSemicolon  | IsStatementStart| IsCaseBlock, // ;
  Comma        = 19, // ,
  LeftBracket  = 20 | IsMember | LeftHandSide | IsPatternStart | IsProperty | IsExpressionStart, // [
  RightBracket = 21, // ]
  Colon        = 22, // :
  QuestionMark = 23, // ?
  Coalesce     = 24 | IsBinaryOp | 1 << PrecStart, // ??
  QuestionMarkPeriod = 25 | LeftHandSide, // ?.
  SingleQuote  = 26, // '
  DoubleQuote  = 27, // "

  /* Update operators */
  Increment = 28 | IsUpdateOp | IsExpressionStart, // ++
  Decrement = 29 | IsUpdateOp | IsExpressionStart, // --

  /* Assign operators */
  Assign                  = 30 | IsAssignOp, // =
  ShiftLeftAssign         = 31 | IsAssignOp, // <<=
  ShiftRightAssign        = 32 | IsAssignOp, // >>=
  LogicalShiftRightAssign = 33 | IsAssignOp, // >>>=
  ExponentiateAssign      = 34 | IsAssignOp, // **=
  AddAssign               = 35 | IsAssignOp, // +=
  SubtractAssign          = 36 | IsAssignOp, // -=
  MultiplyAssign          = 37 | IsAssignOp, // *=
  DivideAssign            = 38 | IsAssignOp, // /=
  ModuloAssign            = 39 | IsAssignOp, // %=
  BitwiseXorAssign        = 40 | IsAssignOp, // ^=
  BitwiseOrAssign         = 41 | IsAssignOp, // |=
  BitwiseAndAssign        = 42 | IsAssignOp, // &=
  LogicalOrAssign         = 43 | IsAssignOp, // ||=
  LogicalAndAssign        = 44 | IsAssignOp, // &&=
  CoalesceAssign          = 45 | IsAssignOp, // ??=

  /* Unary/binary operators */
  TypeofKeyword      = 46 | IsUnaryOp | Keyword | IsExpressionStart,
  DeleteKeyword      = 47 | IsUnaryOp | Keyword | IsExpressionStart,
  VoidKeyword        = 48 | IsUnaryOp | Keyword | IsExpressionStart,
  Negate             = 49 | IsUnaryOp | IsExpressionStart, // !
  Complement         = 50 | IsUnaryOp | IsExpressionStart, // ~
  Add                = 51 | IsBinaryOp | IsUnaryOp | 5 << PrecStart | IsExpressionStart, // +
  Subtract           = 52 | IsBinaryOp | IsUnaryOp | 10 << PrecStart | IsExpressionStart, // -
  InKeyword          = 53 | IsBinaryOp | 8 << PrecStart | Keyword | IsInOrOf | IsExpressionStart,
  InstanceofKeyword  = 54 | IsBinaryOp | 8 << PrecStart | Keyword | IsExpressionStart,
  Multiply           = 55 | IsBinaryOp | 6 << PrecStart | IsProperty | IsExpressionStart, // *
  Modulo             = 56 | IsBinaryOp | 11 << PrecStart | IsExpressionStart, // %
  Divide             = 57 | IsBinaryOp | 11 << PrecStart | IsExpressionStart, // /
  Exponentiate       = 58 | IsBinaryOp | 12 << PrecStart | IsExpressionStart, // **
  LogicalAnd         = 59 | IsBinaryOp | 3 << PrecStart | IsExpressionStart, // &&
  LogicalOr          = 60 | IsBinaryOp | 2 << PrecStart | IsExpressionStart, // ||
  StrictEqual        = 61 | IsBinaryOp | 7 << PrecStart | IsExpressionStart, // ===
  StrictNotEqual     = 62 | IsBinaryOp | 7 << PrecStart | IsExpressionStart, // !==
  LooseEqual         = 63 | IsBinaryOp | 7 << PrecStart | IsExpressionStart, // ==
  LooseNotEqual      = 64 | IsBinaryOp | 7 << PrecStart | IsExpressionStart, // !=
  LessThanOrEqual    = 65 | IsBinaryOp | 8 << PrecStart | IsExpressionStart, // <=
  GreaterThanOrEqual = 66 | IsBinaryOp | 8 << PrecStart | IsExpressionStart, // >=
  LessThan           = 67 | IsBinaryOp | 8 << PrecStart | IsExpressionStart, // <
  GreaterThan        = 68 | IsBinaryOp | 8 << PrecStart | IsExpressionStart, // >
  ShiftLeft          = 69 | IsBinaryOp | 9 << PrecStart | IsExpressionStart, // <<
  ShiftRight         = 70 | IsBinaryOp | 9 << PrecStart | IsExpressionStart, // >>
  LogicalShiftRight  = 71 | IsBinaryOp | 9 << PrecStart | IsExpressionStart, // >>>
  BitwiseAnd         = 72 | IsBinaryOp | 6 << PrecStart | IsExpressionStart, // &
  BitwiseOr          = 73 | IsBinaryOp | 4 << PrecStart | IsExpressionStart, // |
  BitwiseXor         = 74 | IsBinaryOp | 5 << PrecStart | IsExpressionStart, // ^

  /* Variable declaration kinds */
  VarKeyword   = 75 | Keyword  | IsStatementStart | IsCaseBlock | IsVarDecl | IsExpressionStart,
  LetKeyword   = 76 | FutureKeyword  | IsStatementStart | IsCaseBlock | IsVarDecl | IsExpressionStart,
  ConstKeyword = 77 | Keyword  | IsStatementStart | IsCaseBlock | IsVarDecl | IsExpressionStart,

  /* Other Keyword words */
  BreakKeyword    = 78 | Keyword  | IsStatementStart | IsCaseBlock,
  CaseKeyword     = 79 | Keyword,
  CatchKeyword    = 80 | Keyword,
  ClassKeyword    = 81 | Keyword  | IsStatementStart | IsCaseBlock | IsExpressionStart,
  ContinueKeyword = 82 | Keyword  | IsStatementStart | IsCaseBlock,
  DebuggerKeyword = 83 | Keyword  | IsStatementStart | IsCaseBlock,
  DefaultKeyword  = 84 | Keyword,
  DoKeyword       = 85 | Keyword  | IsStatementStart | IsCaseBlock,
  ElseKeyword     = 86 | Keyword,
  ExportKeyword   = 87 | Keyword,
  ExtendsKeyword  = 88 | Keyword,
  FinallyKeyword  = 89 | Keyword,
  ForKeyword      = 90 | Keyword  | IsStatementStart | IsCaseBlock,
  FunctionKeyword = 91 | Keyword  | IsStatementStart | IsCaseBlock | IsExpressionStart,
  IfKeyword       = 92 | Keyword  | IsStatementStart | IsCaseBlock,
  ImportKeyword   = 93 | Keyword  | IsExpressionStart,
  NewKeyword      = 94 | Keyword  | IsStatementStart,
  ReturnKeyword   = 95 | Keyword  | IsStatementStart | IsCaseBlock,
  SuperKeyword    = 96 | Keyword  | IsStatementStart,
  SwitchKeyword   = 97 | Keyword  | IsStatementStart | IsCaseBlock,
  ThisKeyword     = 98 | Keyword  | IsStatementStart | IsCaseBlock,
  ThrowKeyword    = 99 | Keyword  | IsStatementStart | IsCaseBlock,
  TryKeyword      = 100 | Keyword | IsStatementStart | IsCaseBlock,
  WhileKeyword    = 101 | Keyword | IsStatementStart | IsCaseBlock,
  WithKeyword     = 102 | Keyword | IsStatementStart | IsCaseBlock,

  /* Strict mode Keyword words */
  ImplementsKeyword = 103 | FutureKeyword,
  InterfaceKeyword  = 104 | FutureKeyword,
  PackageKeyword    = 105 | FutureKeyword,
  PrivateKeyword    = 106 | FutureKeyword,
  ProtectedKeyword  = 107 | FutureKeyword,
  PublicKeyword     = 108 | FutureKeyword,
  StaticKeyword     = 109 | FutureKeyword,
  YieldKeyword      = 110 | FutureKeyword | IsExpressionStart,

  /* Contextual keywords */
  AsKeyword          = 111 | Contextual,
  AsyncKeyword       = 112 | Contextual | IsCaseBlock | IsExpressionStart,
  AwaitKeyword       = 113 | Contextual | IsExpressionStart,
  ConstructorKeyword = 114 | Contextual,
  GetKeyword         = 115 | Contextual,
  SetKeyword         = 116 | Contextual,
  FromKeyword        = 117 | Contextual,
  OfKeyword          = 118 | Contextual | IsInOrOf,
  EnumKeyword        = 119 | Keyword,

  /* Whitespace */
  WhiteSpace         = 120,
  LineFeed           = 121,
  CarriageReturn     = 122,

  /* Misc */
  Unknown            = 123,
  TargetKeyword      = 124 | IsIdentifier,
  MetaKeyword        = 125 | IsIdentifier,

  /* Comments */

  SingleLine         = 126,
  MultiLine          = 127,
  EscapedIdentifier  = 128,
  PrivateName        = 129,
  MaybeKeyword       = 130,
}

// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
export const KeywordDescTable = [
  "end of source",

  /* Constants/Bindings */
  "identifier", "number", "bigInt", "string", "regular expression",
  "false", "true", "null",

  /* Template nodes */
  "template continuation", "template end",

  /* Punctuators */
  "=>", "(", "{", ".", "...", "}", ")", ";", ",", "[", "]", ":", "?", "??", "?.", "'", "\"",

  /* Update operators */
  "++", "--",

  /* Assign operators */
  "=", "<<=", ">>=", ">>>=", "**=", "+=", "-=", "*=", "/=", "%=", "^=", "|=",
  "&=", "||=", "&&=", "??=",

  /* Unary/binary operators */
  "typeof", "delete", "void", "!", "~", "+", "-", "in", "instanceof", "*", "%", "/", "**", "&&",
  "||", "===", "!==", "==", "!=", "<=", ">=", "<", ">", "<<", ">>", ">>>", "&", "|", "^",

  /* Variable declaration kinds */
  "var", "let", "const",

  /* Other Keyword words */
  "break", "case", "catch", "class", "continue", "debugger", "default", "do", "else", "export",
  "extends", "finally", "for", "function", "if", "import", "new", "return", "super", "switch",
  "this", "throw", "try", "while", "with",

  /* Strict mode Keyword words */
  "implements", "interface", "package", "private", "protected", "public", "static", "yield",

  /* Contextual keywords */
  "as", "async", "await", "constructor", "get", "set", "from", "of",
];


export const descKeywordTable = new Map<string, any>();

const kwdObj: { [key: string]: Token } = {
  this: Token.ThisKeyword,
  function: Token.FunctionKeyword,
  if: Token.IfKeyword,
  return: Token.ReturnKeyword,
  var: Token.VarKeyword,
  else: Token.ElseKeyword,
  for: Token.ForKeyword,
  new: Token.NewKeyword,
  in: Token.InKeyword,
  typeof: Token.TypeofKeyword,
  while: Token.WhileKeyword,
  case: Token.CaseKeyword,
  break: Token.BreakKeyword,
  try: Token.TryKeyword,
  catch: Token.CatchKeyword,
  delete: Token.DeleteKeyword,
  throw: Token.ThrowKeyword,
  switch: Token.SwitchKeyword,
  continue: Token.ContinueKeyword,
  default: Token.DefaultKeyword,
  instanceof: Token.InstanceofKeyword,
  do: Token.DoKeyword,
  void: Token.VoidKeyword,
  finally: Token.FinallyKeyword,
  async: Token.AsyncKeyword,
  await: Token.AwaitKeyword,
  class: Token.ClassKeyword,
  const: Token.ConstKeyword,
  constructor: Token.ConstructorKeyword,
  debugger: Token.DebuggerKeyword,
  export: Token.ExportKeyword,
  extends: Token.ExtendsKeyword,
  false: Token.FalseKeyword,
  from: Token.FromKeyword,
  get: Token.GetKeyword,
  implements: Token.ImplementsKeyword,
  import: Token.ImportKeyword,
  interface: Token.InterfaceKeyword,
  let: Token.LetKeyword,
  null: Token.NullKeyword,
  of: Token.OfKeyword,
  package: Token.PackageKeyword,
  private: Token.PrivateKeyword,
  protected: Token.ProtectedKeyword,
  public: Token.PublicKeyword,
  set: Token.SetKeyword,
  static: Token.StaticKeyword,
  super: Token.SuperKeyword,
  true: Token.TrueKeyword,
  with: Token.WithKeyword,
  yield: Token.YieldKeyword,
  as: Token.AsKeyword,
  target: Token.TargetKeyword,
  meta: Token.MetaKeyword,
  enum: Token.EnumKeyword,
  '#': Token.PrivateName,
};

    for (const key in kwdObj) {
        if (Object.prototype.hasOwnProperty.call(kwdObj, key)) {
          descKeywordTable.set(key, kwdObj[key]);
        }
    }
