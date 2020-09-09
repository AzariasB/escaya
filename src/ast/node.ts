/**
 * Every single valid AST Node type.
 */
export interface Node {
  type?: string;
  kind?: SyntaxKind | NodeFlags;
  meta?: NodeMeta;
  flags?: NodeFlags;
  start?: number;
  end?: number;
}

/**
 * Every single valid CST Node type.
 */
export interface NodeMeta {
  asi?: boolean,
  newlineBeforNextToken?: boolean;
}

export const enum NodeFlags {
  /**
   * This node has no flags.
   */
  None = 0,
  /**
   * This node has some diagnostics associated with it.
   */
  HasErrors = 1 << 1,
  /**
   * This node was inserted by the compiler.
   */
  Synthetic = 1 << 2,
  /**
   * This node has side effects.
   */
  HasSideEffects = 1 << 3
}

/**
 * Types of syntax which can appear in a source file of Escaya.
 */
export enum SyntaxKind {
  // markers or thrown away tokens.
  EndOfFileToken,
  UnknownToken,
  Comment,

  LeftParen,
  RightParen,
  RightBrace,
  LeftBrace,
  RightBracket,
  LeftBracket,

  // marker
  FirstToken,

  // Literals

  NumericLiteral,
  BigIntLiteral,
  StringLiteral,
  Identifier,
  TemplateTail,
  RegularExpressionLiteral,

  //
  BitwiseOr,
  Complement,
  Negate,
  Modulo,
  BitwiseAnd,
  Multiply,
  Add,
  Comma,
  Subtract,
  Period,
  Divide,
  Colon,
  Semicolon,
  LessThan,
  Assign,
  GreaterThan,
  QuestionMark,
  BitwiseXor,
  QuestionMarkPeriod,
  NullishAssign,
  Nullish,

  BitwiseXorAssign,
  BitwiseOrAssign,
  LogicalOr,
  LogicalOrAssign,
  BitwiseAndAssign,
  LogicalAnd,
  LogicalAndAssign,
  DivideAssign,
  ModuloAssign,
  Exponentiate,
  ExponentiateAssign,
  MultiplyAssign,
  SubtractAssign,
  Decrement,
  AddAssign,
  Increment,
  LooseNotEqual,
  StrictNotEqual,
  Arrow,
  LooseEqual,
  StrictEqual,
  ShiftRight,
  Ellipsis,
  ShiftRightAssign,
  LogicalShiftRight,
  LogicalShiftRightAssign,
  GreaterThanOrEqual,
  ShiftLeft,
  ShiftLeftAssign,
  LessThanOrEqual,

  // keywords

  ThisKeyword,
  FunctionKeyword,
  IfKeyword,
  ReturnKeyword,
  VarKeyword,
  ElseKeyword,
  ForKeyword,
  NewKeyword,
  InKeyword,
  TypeofKeyword,
  WhileKeyword,
  CaseKeyword,
  BreakKeyword,
  TryKeyword,
  CatchKeyword,
  DeleteKeyword,
  ThrowKeyword,
  SwitchKeyword,
  ContinueKeyword,
  DefaultKeyword,
  InstanceofKeyword,
  DoKeyword,
  VoidKeyword,
  FinallyKeyword,
  AsyncKeyword,
  AwaitKeyword,
  ClassKeyword,
  ConstKeyword,
  ConstructorKeyword,
  DebuggerKeyword,
  ExportKeyword,
  ExtendsKeyword,
  FalseKeyword,
  FromKeyword,
  GetKeyword,
  ImplementsKeyword,
  ImportKeyword,
  InterfaceKeyword,
  LetKeyword,
  NullKeyword,
  OfKeyword,
  PackageKeyword,
  PrivateKeyword,
  ProtectedKeyword,
  PublicKeyword,
  SetKeyword,
  StaticKeyword,
  SuperKeyword,
  TrueKeyword,

  WithKeyword,
  YieldKeyword,
  AsKeyword,
  TargetKeyword,
  MetaKeyword,
  EnumKeyword,

  // statements
  ExpressionStatement,
  BlockStatement,
  BreakStatement,
  ContinueStatement,
  DebuggerStatement,
  DoWhileStatement,
  WithStatement,
  ForAwaitStatement,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  IfStatement,
  LabelledStatement,
  ReturnStatement,
  SwitchStatement,
  ThrowStatement,
  TryStatement,
  WhileStatement,
  CatchClause,
  CaseClause,
  DefaultClause,
  VariableStatement,
  VariableDeclaration,
  LexicalDeclaration,
  LexicalBinding,
  CommaOperator,
  EmptyStatement,
  ClassExpression,
  ClassDeclaration,
  ClassElement,

  // Expression

  AssignmentExpression,
  ConditionalExpression,
  MemberExpression,
  BinaryExpression,
  CallExpression,
  OptionalExpression,
  MemberChain,
  CallChain,
  UnaryExpression,
  PrefixUpdateExpression,
  PostfixUpdateExpression,
  NewExpression,
  NullLiteral,
  ThisExpression,
  BooleanLiteral,
  BindingRestProperty,
  BindingIdentifier,
  ObjectBindingPattern,
  BindingProperty,
  ComputedPropertyName,
  BindingElement,
  SingleNameBinding,
  ArrayBindingPattern,
  BindingRestElement,
  Elison,
  SpreadElement,
  ArrayLiteral,
  ObjectLiteral,
  PropertyDefinition,
  CoverInitializedName,
  MethodDefinition,
  FormalParameters,
  FunctionBody,
  FunctionExpression,
  FunctionDeclaration,
  ConciseBody,
  ArrowFunction,
  ParenthesizedExpression,
  AwaitExpression,
  SuperCall,
  SuperProperty,
  YieldExpression,
  TaggedTemplate,
  TemplateElement,
  TemplateExpression,
  TemplateLiteral,
  NewTarget,
  ImportCall,
  AssignmentRestElement,
  ForDeclaration,
  ForBinding,

  // misc
  WhiteSpace,
  CarriageReturn,
  LineFeed,
  Unknown,

  //
  Module,
  Script,
  RootNode,
  EOF,
  ObjectAssignmentPattern,
  AssignmentProperty,
  AssignmentElement,
  ArrayAssignmentPattern,
  SpreadProperty,
  FunctionRestParameter,

  // Module

  ImportDeclaration,
  ImportClause,
  NameSpaceImport,
  ImportedDefaultBinding,
  ImportSpecifier,
  NamedImports,
  ExportDeclaration,
  ExportDefault,
  ExportSpecifier,

  OptionalChain,
  PropertyName,
  ImportMeta,
  Directive
}
