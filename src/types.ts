/**
 * The Escaya AST specification
 */

export interface Position {
  /**
   * Line number (1-indexed)
   */
  line: number;
  /**
   * Column number on the line (0-indexed)
   */
  column: number;
}

export interface SourceLocation {
  /**
   * The position of the first character of the parsed source region
   */
  start: Position;
  /**
   * The position of the first character after the parsed source region
   */
  end: Position;
}

export interface Root {
  location?: SourceLocation;

  /**
   * The position of the first character of the parsed source region
   */
  start?: number;

  /**
   * The position of the first character of the parsed source region
   */
  end?: number;

  /*
   * An optional linear incrementing id to be used to optionally store
   * 4 * 4 bytes (32bit for start, stop, col, line) per
   * node as a blob of binary data on the 'buffer' property on the 'RootNode'.
   */

  id?: number;

  /*
   * Optionally stores comments as meta-data on adjacent nodes
   */
  comments?: Comment[];

  /**
   * Optionally track the state on each node upon incremental parsing
   */
  nodeType?: number;

  parent?: any;
}

/*
 * Comments and their different types
 */
export type CommentType = 'MultiLine' | 'SingleLine' | 'HTMLClose' | 'HTMLOpen' | 'SheBang';

export interface Comment extends Root {
  type: CommentType;
  value: string;
  hasTrailingNewLine?: boolean;
}

// Every single valid AST Node

export type Node =
  | ArrayLiteral
  | ArrowFunction
  | ArrayAssignmentPattern
  | ArrayObjectPattern
  | ArrayBindingPattern
  | AssignmentExpression
  | AssignmentPattern
  | AssignmentRestElement
  | AwaitExpression
  | BigIntLiteral
  | BinaryExpression
  | BindingRestElement
  | BindingElement
  | BindingRestProperty
  | BlockStatement
  | BreakStatement
  | CallExpression
  | CaseClause
  | CatchClause
  | ClassDeclaration
  | ClassExpression
  | ConciseBody
  | CommaOperator
  | SpreadElement
  | ConditionalExpression
  | ContinueStatement
  | CoverInitializedName
  | DebuggerStatement
  | DecimalLiteral
  | DefaultClause
  | DoWhileStatement
  | EmptyStatement
  | MissingList
  | Elision
  | ExportDeclaration
  | ExportSpecifier
  | ExpressionStatement
  | ForBinding
  | ForAwaitStatement
  | ForDeclaration
  | ForInStatement
  | FormalParameters
  | ForOfStatement
  | ForStatement
  | FunctionDeclaration
  | FunctionExpression
  | FunctionBody
  | FunctionRestParameter
  | Identifier
  | IdentifierReference
  | IdentifierName
  | LabelIdentifier
  | BindingIdentifier
  | IfStatement
  | ImportCall
  | ImportDeclaration
  | ImportMeta
  | ImportSpecifier
  | LabelledStatement
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | RegularExpressionLiteral
  | StringLiteral
  | MemberExpression
  | MethodDefinition
  | Module
  | NewTarget
  | PropertyDefinition
  | BindingProperty
  | NewExpression
  | ObjectLiteral
  | OptionalExpression
  | TokenNode
  | MemberChain
  | CallChain
  | PrefixUpdateExpression
  | PostfixUpdateExpression
  | ParenthesizedExpression
  | Script
  | ReturnStatement
  | SuperCall
  | SuperProperty
  | SwitchStatement
  | SpreadElement
  | TaggedTemplateExpression
  | TemplateElement
  | TemplateLiteral
  | ThisExpression
  | ThrowStatement
  | TryStatement
  | UnaryExpression
  | UniqueFormalParameters
  | VariableStatement
  | VariableDeclaration
  | LexicalDeclaration
  | LexicalBinding
  | BindingPattern
  | ObjectBindingPattern
  | ObjectAssignmentPattern
  | Synthetic
  | WhileStatement
  | WithStatement
  | YieldExpression;

export type StatementList = Statement | Declaration;
export type StatementListItem = Statement | Declaration;
export type Declaration = FunctionDeclaration | ClassDeclaration | LexicalDeclaration;

export type ShortCircuit =
  | BinaryExpression
  | AwaitExpression
  | UnaryExpression
  | UpdateExpression
  | LeftHandSideExpression;
export type Expression =
  | ArrowFunction
  | AssignmentExpression
  | ShortCircuit
  | CommaOperator
  | ConditionalExpression
  | LeftHandSideExpression
  | BindingPattern
  | NewExpression
  | YieldExpression;
export type LeftHandSideExpression =
  | CallExpression
  | ImportCall
  | ClassExpression
  | ClassDeclaration
  | FunctionExpression
  | BigIntLiteral
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | OptionalExpression
  | PrimaryExpression
  | PostfixUpdateExpression
  | PrefixUpdateExpression
  | RegularExpressionLiteral
  | StringLiteral
  | TemplateLiteral
  | TaggedTemplateExpression
  | MemberExpression
  | ArrowFunction;
export type PrimaryExpression =
  | ArrayLiteral
  | BigIntLiteral
  | BooleanLiteral
  | ClassExpression
  | FunctionExpression
  | IdentifierReference
  | ImportMeta
  | ImportCall
  | BooleanLiteral
  | NumericLiteral
  | NullLiteral
  | RegularExpressionLiteral
  | StringLiteral
  | Parenthesized
  | PostfixUpdateExpression
  | PrefixUpdateExpression
  | MemberExpression
  | RegularExpressionLiteral
  | StringLiteral
  | TemplateLiteral
  | ObjectLiteral
  | SpreadElement
  | SuperCall
  | NewExpression
  | SuperProperty
  | Synthetic
  | TemplateLiteral
  | UnaryExpression
  | ThisExpression;
export type Statement =
  | BlockStatement
  | BreakStatement
  | ContinueStatement
  | ClassDeclaration
  | DebuggerStatement
  | DoWhileStatement
  | EmptyStatement
  | ExpressionStatement
  | FunctionDeclaration
  | ForStatement
  | ForInStatement
  | ForOfStatement
  | ForAwaitStatement
  | IfStatement
  | IterationStatement
  | LabelledStatement
  | LexicalDeclaration
  | ReturnStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | VariableStatement
  | WhileStatement
  | WithStatement;

///////////////
// Escaya AST Nodes
///////////////

export type Parenthesized = ParenthesizedExpression | ArrowFunction;

export interface ParenthesizedExpression extends Root {
  type: 'ParenthesizedExpression';
  expression: AssignmentExpression | CommaOperator;
}

export interface CommaOperator extends Root {
  type: 'CommaOperator';
  leafs: Expression[];
}

export interface Elision extends Root {
  type: 'Elision';
}

export interface ArrayLiteral extends Root {
  type: 'ArrayLiteral';
  // The elements of the array literal; a 'Elision' node represents an elision.
  leafs: (SpreadElement | AssignmentExpression | Elision)[];
}

export interface FunctionRestParameter extends Root {
  type: 'FunctionRestParameter';
  argument: ArrayBindingPattern | BindingIdentifier | ObjectBindingPattern;
}

export interface BindingRestProperty extends Root {
  type: 'BindingRestProperty';
  argument: BindingIdentifier;
}

export interface BindingRestElement extends Root {
  type: 'BindingRestElement';
  argument: BindingIdentifier | BindingPattern;
  parent?: ObjectBindingPattern;
}

export interface SpreadElement extends Root {
  type: 'SpreadElement';
  argument: AssignmentExpression;
  parent?: ArrayLiteral | CallExpression | NewExpression;
}

export type ArrowFormals = IdentifierReference | FormalParameters | SpreadElement;

// `ArrowFunction`,
// `AsyncArrowFunction`
export interface ArrowFunction extends Root {
  type: 'ArrowFunction';
  params: ArrowFormals[];
  contents: ConciseBody | FunctionBody;
  // True for `AsyncArrowFunction`, false otherwise.
  async: boolean;
}

// Use a 'ConciseBody' to save 1 byte vs a 'expression' property
// in ESTree
export interface ConciseBody extends Root {
  type: 'ConciseBody';
  body: Expression;
}

export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  | '**=';

export type LogicalAssignmentOperator = '||=' | '&&=' | '??=';

export interface AssignmentExpression extends Root {
  type: 'AssignmentExpression';
  operator: LogicalAssignmentOperator | AssignmentOperator;
  left: Expression | Identifier | ArrayBindingPattern | ObjectBindingPattern;
  right: Expression;
}

export interface AwaitExpression extends Root {
  type: 'AwaitExpression';
  expression: Expression;
}

// The set of syntax tokens which are valid binary expression operators
export type BinaryOperator =
  | '||'
  | '&&'
  | '|'
  | '^'
  | '&'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'in'
  | 'instanceof'
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '**'
  | '??';

export interface BinaryExpression extends Root {
  type: 'BinaryExpression';
  // left can be a private name (e.g. #foo) when operator is "in".
  left: Expression | PrivateIdentifier;
  operator: BinaryOperator;
  right: Expression;
}

export interface BlockStatement extends Root {
  type: 'BlockStatement';
  statements: (FunctionBody | Statement)[];
}

export interface BreakStatement extends Root {
  type: 'BreakStatement';
  label: LabelIdentifier | null;
}

export interface ContinueStatement extends Root {
  type: 'ContinueStatement';
  label: LabelIdentifier | null;
}

export interface CallExpression extends Root {
  type: 'CallExpression';
  expression: LeftHandSideExpression;
  arguments: Arguments[];
}

interface ClassDeclarationBase extends Root {
  // *only* 'null' in recovery mode
  name: BindingIdentifier | null;
  super: LeftHandSideExpression | null;
  leafs: ClassElement[];
}

export interface ClassDeclaration extends ClassDeclarationBase {
  type: 'ClassDeclaration';
}

export interface ClassExpression extends ClassDeclarationBase {
  type: 'ClassExpression';
}

export interface ClassElement extends Root {
  type: 'ClassElement';
  // True if `IsStatic` of ClassElement is true.
  static: boolean;
  method: MethodDefinition;
  parent?: ClassExpression | ClassDeclaration;
}

export interface ConditionalExpression extends Root {
  type: 'ConditionalExpression';
  // The `ShortCircuitExpression`.
  shortCircuit: BinaryExpression | Expression;
  // The first `AssignmentExpression`.
  consequent: Expression;
  // The second `AssignmentExpression`.
  alternate: Expression;
}

export interface DebuggerStatement extends Root {
  type: 'DebuggerStatement';
}

export interface EmptyStatement extends Root {
  type: 'EmptyStatement';
}

export interface ExpressionStatement extends Root {
  type: 'ExpressionStatement';
  expression: Expression;
  parent?: Module | Script;
}

export type ForInOfLeft = IdentifierReference | ForDeclaration | BindingPattern;

// `for ( LeftHandSideExpression in Expression ) Statement`,
// `for ( var ForBinding in Expression ) Statement`,
// `for ( ForDeclaration in Expression ) Statement`,
// `for ( var BindingIdentifier Initializer in Expression ) Statement`
export interface ForInStatement extends IterationStatement {
  type: 'ForInStatement';
  // The expression or declaration before `in`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

// `for ( LeftHandSideExpression of Expression ) Statement`,
// `for ( var ForBinding of AssignmentExpression ) Statement`,
// `for ( ForDeclaration of Expression ) Statement`
export interface ForOfStatement extends IterationStatement {
  type: 'ForOfStatement';
  // The expression or declaration before `of`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

// `for await ( LeftHandSideExpression of Expression ) Statement`,
// `for await ( var ForBinding of AssignmentExpression ) Statement`,
// `for await ( ForDeclaration of Expression ) Statement`
export interface ForAwaitStatement extends IterationStatement {
  type: 'ForAwaitStatement';
  // The expression or declaration before `of`.
  initializer: IdentifierReference | ForDeclaration | BindingPattern | Expression;
}

export type ForDeclarationKind = 'let' | 'const' | 'var';

// `ForDeclaration :: LetOrConst : ForBinding`
export interface ForDeclaration extends Root {
  type: 'ForDeclaration';
  kind: ForDeclarationKind;
  declarations: ForBinding | LexicalBinding | VariableDeclaration | null;
}

// `for ( Expression ; Expression ; Expression ) Statement`,
// `for ( var VariableDeclarationList ; Expression ; Expression ) Statement`
export interface ForStatement extends Root {
  type: 'ForStatement';
  // The expression or declaration before the first `;`, if present
  initializer: Expression | VariableDeclaration | null;
  // The expression before the second `;`, if present
  condition: Expression | null;
  // The expression after the second `;`, if present
  incrementor: Expression | null;
  statement: Statement;
}

export interface FunctionBody extends Root {
  type: 'FunctionBody';
  directives: string[];
  statements: Statement[];
}

interface FunctionDeclarationBase extends Root {
  name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  async: boolean;
  params: FormalParameters[];
  contents: FunctionBody;
}

// `FunctionDeclaration`, `GeneratorDeclaration`, `AsyncFunctionDeclaration`
export interface FunctionDeclaration extends Root {
  type: 'FunctionDeclaration';
  name: BindingIdentifier | null;
  // True for `GeneratorExpression` and `GeneratorDeclaration`, false otherwise.
  generator: boolean;
  // True for `AsyncFunctionExpression` and `AsyncFunctionDeclaration`, false otherwise.
  async: boolean;
  params: MissingList | FormalParameters[];
  contents: FunctionBody;
}

// `FunctionExpresssion`, `GeneratorExpresssion`, `AsyncExpresssion`
export interface FunctionExpression extends FunctionDeclarationBase {
  type: 'FunctionExpression';
}

export interface LabelIdentifier extends Root {
  type: 'LabelIdentifier';
  name: string;
}

//  Identifier:: IdentifierName but not ReservedWord
export interface IdentifierName extends Root {
  type: 'IdentifierName';
  name: string;
}

export interface IdentifierReference extends Root {
  type: 'IdentifierReference';
  name: string;
}

export interface BindingIdentifier extends Root {
  type: 'BindingIdentifier';
  name: string;
}

export interface Identifier extends Root {
  type: 'Identifier';
  name: string;
}

// `if ( Expression ) Statement`,
// `if ( Expression ) Statement else Statement`
export interface IfStatement extends Root {
  type: 'IfStatement';
  expression: any;
  // The first `Statement`.
  consequent: Statement;
  // The second `Statement`, if present.
  alternate: Statement | null;
}

export type ImportOrExport = ExportDeclaration | ImportDeclaration;

export interface ImportClause extends Root {
  defaultBinding: BindingIdentifier | null;
  namedImports: ImportSpecifier[];
  namedBinding: BindingIdentifier | null;
  parent?: Script | Module;
}

export interface ImportDeclaration extends ImportClause {
  type: 'ImportDeclaration';
  fromClause: StringLiteral | null;
  moduleSpecifier: StringLiteral | null;
}

export interface ImportSpecifier extends Root {
  type: 'ImportSpecifier';
  name: IdentifierName | BindingIdentifier;
  // Name preceding "as" keyword (or null when "as" is absent)
  binding: IdentifierName | BindingIdentifier | null;
  parent?: ImportDeclaration;
}

export type ExportDeclarations =
  | AssignmentExpression
  | VariableStatement
  | LexicalDeclaration
  | FunctionDeclaration
  | ClassDeclaration
  | LexicalDeclaration;

export interface ExportDeclaration extends Root {
  type: 'ExportDeclaration';
  declaration: ExportDeclarations | null;
  default: boolean;
  namedExports: ExportSpecifier[];
  namedBinding: IdentifierName | null;
  fromClause: StringLiteral | null;
  parent?: Script | Module;
}

export interface ExportSpecifier extends Root {
  type: 'ExportSpecifier';
  name: IdentifierName;
  exportedName: IdentifierName | null;
  parent?: ImportDeclaration;
}

export type HoistableDeclaration = Root;

export interface LabelledStatement extends Root {
  type: 'LabelledStatement';
  label: LabelIdentifier;
  labelledItem: Statement;
}

export interface NewTarget extends Root {
  type: 'NewTarget';
}

export interface NewExpression extends Root {
  type: 'NewExpression';
  expression: Expression;
  arguments: Arguments[];
}

export type Arguments = Expression | AssignmentRestElement;

export interface AssignmentRestElement extends Root {
  type: 'AssignmentRestElement';
  argument: Expression;
}

export interface NumericLiteral extends Root {
  type: 'NumericLiteral';
  value: number;
}

// Decimal property is the string representation of the bigdecimal value. It doesn't include the suffix m.
export interface DecimalLiteral extends Root {
  type: 'DecimalLiteral';
  decimal: string;
  value: number | null;
}

export interface BigIntLiteral extends Root {
  type: 'BigIntLiteral';
  value: number | null;
}
export type RegExpFlags = 'g' | 'i' | 'm' | 'u' | 's' | 'y';

export interface RegularExpressionLiteral extends Root {
  type: 'RegularExpressionLiteral';
  pattern: string;
  flags: RegExpFlags;
}

export interface StringLiteral extends Root {
  type: 'StringLiteral';
  value: string;
}

export interface NullLiteral extends Root {
  type: 'NullLiteral';
  value: null;
}

export interface BooleanLiteral extends Root {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface ObjectLiteral extends Root {
  type: 'ObjectLiteral';
  properties: (IdentifierReference | MethodDefinition | PropertyDefinition)[];
}

export type PropertyDefinitions =
  | PropertyDefinition
  | BindingProperty
  | SpreadElement
  | IdentifierReference
  | BindingIdentifier
  | BindingRestProperty
  | BindingRestElement
  | BindingElement
  | CoverInitializedName
  | MethodDefinition;

// `PropertyDefinition :: PropertyName : AssignmentExpression`
export interface PropertyDefinition extends Root {
  type: 'PropertyDefinition';
  key: IdentifierName | NumericLiteral | StringLiteral | BigIntLiteral | PrivateIdentifier | null;
  value: Expression | null;
  computed: boolean;
  static: boolean;
  parent?: ObjectLiteral;
}

export interface PrivateIdentifier extends Root {
  type: 'PrivateIdentifier';
  name: string;
}

export interface AssignmentProperty extends Root {
  type: 'AssignmentProperty';
  key: BindingIdentifier | NumericLiteral | StringLiteral | BigIntLiteral | PrivateIdentifier | null;
  value: BindingPattern | BindingIdentifier;
  computed: boolean;
  static?: boolean;
  private?: boolean;
  parent?: ObjectBindingPattern | ObjectAssignmentPattern;
}

export interface BindingProperty extends Root {
  type: 'BindingProperty';
  key: BindingIdentifier | NumericLiteral | StringLiteral | BigIntLiteral | PrivateIdentifier | null;
  value: BindingPattern | BindingIdentifier;
  computed: boolean;
  static?: boolean;
  private?: boolean;
  parent?: ObjectBindingPattern | ObjectAssignmentPattern;
}

// When `key` is a `PrivateIdentifier`, `computed` must be `false` and `kind` can not be `"constructor"`.
export interface MethodDefinition extends Root {
  type: 'MethodDefinition';
  async: boolean;
  generator: boolean;
  propertySetParameterList: BindingElement[];
  uniqueFormalParameters: FormalParameters[];
  name: Expression | PrivateIdentifier;
  contents: FunctionBody;
  parent?: ObjectLiteral | ClassElement;
}

/* internal */
interface Program extends Root {
  directives: string[];
  leafs: (ImportOrExport | Statement)[];
  // True if additional ECMAScript features for Web Browsers are enabled
  webCompat: boolean;
}

export interface Script extends Program {
  type: 'Script';
}

export interface Module extends Program {
  type: 'Module';
}

export interface ReturnStatement extends Root {
  type: 'ReturnStatement';
  expression: Expression | null;
  parent?: FunctionBody | ConciseBody;
}

export interface SuperCall extends Root {
  type: 'SuperCall';
  arguments: Arguments[];
}
export interface SuperProperty extends Root {
  type: 'SuperProperty';
  expression: Expression | null;
  name: IdentifierName | null;
}

export interface SwitchStatement extends Root {
  type: 'SwitchStatement';
  expression: Expression;
  clauses: (DefaultClause | CaseClause)[];
}

interface ClauseBase extends Root {
  statements: Statement[];
  parent?: SwitchStatement;
}

export interface CaseClause extends ClauseBase {
  type: 'CaseClause';
  expression: Expression;
}

export interface DefaultClause extends ClauseBase {
  type: 'DefaultClause';
}

export interface TaggedTemplateExpression extends Root {
  // The second `MemberExpression` or `CallExpression`, if present.
  type: 'TaggedTemplateExpression';
  member: MemberExpression;
  literal: TemplateElement[];
  expression: LeftHandSideExpression | null;
}

export interface TemplateElement extends Root {
  type: 'TemplateElement';
  raw: string;
  cooked: string;
  tail: boolean;
}

export interface TemplateLiteral extends Root {
  type: 'TemplateLiteral';
  leafs: TemplateElement[];
  expressions: Expression[];
}

export interface ThisExpression extends Root {
  type: 'ThisExpression';
}

export interface ThrowStatement extends Root {
  type: 'ThrowStatement';
  expression: Expression;
}

export interface TryStatement extends Root {
  type: 'TryStatement';
  // The `Block`.
  block: BlockStatement;
  // The `Catch`, if present.
  catchClause: CatchClause | null;
  // The `Finally`.
  finalizer: BlockStatement | null;
}

export interface CatchClause extends Root {
  type: 'CatchClause';
  binding: BindingPattern | BindingIdentifier | LexicalBinding | null;
  block: BlockStatement;
  parent?: TryStatement;
}

export type UpdateOperator = '++' | '--';

interface UpdateExpressionBase extends Root {
  // True for `UpdateExpression :: ++ LeftHandSideExpression` and
  // `UpdateExpression :: -- LeftHandSideExpression`, false otherwise.
  operator: UpdateOperator;
  operand: LeftHandSideExpression;
}

export type UpdateExpression = PrefixUpdateExpression | PostfixUpdateExpression;

// Instead of reserving one byte for a 'isPrefix' property - 'UpdateExpression'
// are separated into 'PrefixUpdateExpression' and 'PostfixUpdateExpression'
export interface PrefixUpdateExpression extends UpdateExpressionBase {
  type: 'PrefixUpdateExpression';
}

export interface PostfixUpdateExpression extends UpdateExpressionBase {
  type: 'PostfixUpdateExpression';
}

// The set of syntax tokens which are valid unary expression operators
export type UnaryOperator = '+' | '-' | '!' | '~' | 'delete' | 'void' | 'typeof';

export interface UnaryExpression extends Root {
  type: 'UnaryExpression';
  operator: UnaryOperator;
  operand: LeftHandSideExpression;
}

export interface VariableStatement extends Root {
  type: 'VariableStatement';
  declarations: VariableDeclaration[];
}

export interface VariableDeclaration extends Root {
  type: 'VariableDeclaration';
  binding: BindingPattern | BindingIdentifier;
  initializer: Expression | null;
  parent?: VariableStatement | ForDeclaration;
}

export type LexicalDeclarationOrIdentifier = LexicalDeclaration | LabelledStatement | ExpressionStatement;

export interface LexicalDeclaration extends Root {
  type: 'LexicalDeclaration';
  declarations: LexicalBinding[];
  kind: 'let' | 'const';
}

export interface UniqueFormalParameters extends Root {
  type: 'UniqueFormalParameters';
  leafs: BindingPattern[];
  parent?: ArrowFunction | FunctionDeclaration | FunctionExpression;
}

export interface FormalParameters extends Root {
  type: 'FormalParameters';
  leafs: (FunctionRestParameter | BindingElement)[];
  parent?: ArrowFunction | FunctionDeclaration | FunctionExpression | BindingProperty;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export interface BindingElement extends Root {
  type: 'BindingElement';
  binding: BindingPattern | BindingIdentifier;
  initializer: Expression | null;
  parent?: FormalParameters | VariableStatement;
}

// `ForBinding :: BindingIdentifier`
// `ForBinding :: BindingPattern`
export interface ForBinding extends Root {
  type: 'ForBinding';
  binding: BindingIdentifier | BindingPattern;
  initializer: Expression | null;
  parent?: ForDeclaration;
}

export interface LexicalBinding extends Root {
  type: 'LexicalBinding';
  binding: BindingIdentifier | BindingPattern;
  initializer: Expression | null;
  parent?: LexicalDeclaration | ForDeclaration;
}

export interface ObjectBindingBase extends Root {
  properties: (PropertyDefinition | BindingRestElement | BindingIdentifier | MethodDefinition)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ObjectBindingPattern extends ObjectBindingBase {
  type: 'ObjectBindingPattern';
  properties: (PropertyDefinition | BindingRestElement | BindingIdentifier | MethodDefinition)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ObjectAssignmentPattern extends ObjectBindingBase {
  type: 'ObjectAssignmentPattern';
}

export interface CoverInitializedName extends Root {
  type: 'CoverInitializedName';
  binding: Expression;
  initializer: ObjectAssignmentPattern | ArrayAssignmentPattern;
}
export interface AssignmentPattern extends Root {
  type: 'AssignmentPattern';
  left: Expression;
  right: ObjectAssignmentPattern | ArrayAssignmentPattern;
}

export interface ArrayBindingPattern extends Root {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayBindingPattern';
  leafs: (Elision | AssignmentPattern | BindingRestElement)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern | PrimaryExpression;
}

export interface ArrayAssignmentPattern extends Root {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayAssignmentPattern';
  leafs: (Elision | AssignmentPattern | AssignmentRestElement)[];
  parent?: VariableDeclaration | LexicalBinding | BindingPattern;
}

export interface ArrayObjectPattern extends Root {
  // The elements of the array literal; a 'Elision' node represents an elision.
  type: 'ArrayObjectPattern';
  leafs: (Elision | AssignmentPattern | AssignmentRestElement)[];
}

export interface IterationStatement extends Root {
  expression: Expression;
  statement: Statement;
}

export interface WhileStatement extends Root {
  type: 'WhileStatement';
}

export interface WithStatement extends Root {
  type: 'WithStatement';
}

export interface DoWhileStatement extends Root {
  type: 'DoWhileStatement';
}

// `YieldExpression :: yield`, `YieldExpression :: yield AssignmentExpression`
// `YieldExpression :: yield * AssignmentExpression`
export interface YieldExpression extends Root {
  type: 'YieldExpression';
  delegate: boolean;
  argument: AssignmentExpression | null;
}

// Note:
// - When `property` is a `PrivateIdentifier`, `computed` must be `false`.
// - When `object` is a `Super`, `property` can not be a `PrivateIdentifier`.
export interface MemberExpression extends Root {
  type: 'MemberExpression';
  member: Expression | SuperProperty;
  expression: Expression | IdentifierName | PrivateIdentifier;
  computed: boolean;
}

export interface OptionalExpression extends Root {
  type: 'OptionalExpression';
  member: Expression | null;
  chain: MemberChain | CallChain;
}

export interface CallChainBase extends Root {
  chain: MemberChain | CallChain | null;
}

export interface MemberChain extends CallChainBase {
  type: 'MemberChain';
  property: Expression | IdentifierName | TemplateLiteral | null;
  computed: boolean;
}

export interface CallChain extends CallChainBase {
  type: 'CallChain';
  arguments: Arguments[] | null;
}

export interface ImportMeta extends Root {
  type: 'ImportMeta';
}

export interface ImportCall extends Root {
  type: 'ImportCall';
  import: Expression;
}

export type PropertyName = Expression | StringLiteral | NumericLiteral | IdentifierName;

/** Incremental */

export interface Synthetic extends Root {
  type: 'Synthetic';
  value: '##'; // Dummy node inserted by the parser. No real value should exist
}

export type TokenKind =
  /* Constants/Bindings */
  | 'identifier'
  | 'number'
  | 'bigint'
  | 'string'
  | 'regular expression'
  | 'false'
  | 'true'
  | 'null'

  /* Template nodes */
  | 'template continuation'
  | 'template end'

  /* Punctuators */
  | '=>'
  | '('
  | '{'
  | '.'
  | '...'
  | '}'
  | ')'
  | ';'
  | ' | '
  | '['
  | ']'
  | ':'
  | '?'
  | '??'
  | '?.'

  /* Update operators */
  | '++'
  | '--'

  /* Assign operators */
  | '='
  | '<<='
  | '>>='
  | '>>>='
  | '**='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '^='
  | '|='
  | '&='
  | '||='
  | '&&='
  | '??='

  /* Unary/binary operators */
  | 'typeof'
  | 'delete'
  | 'void'
  | '!'
  | '~'
  | '+'
  | '-'
  | 'in'
  | 'instanceof'
  | '*'
  | '%'
  | '/'
  | '**'
  | '&&'
  | '||'
  | '==='
  | '!=='
  | '=='
  | '!='
  | '<='
  | '>='
  | '<'
  | '>'
  | '<<'
  | '>>'
  | '>>>'
  | '&'
  | '|'
  | '^'

  /* Variable declaration kinds */
  | 'var'
  | 'let'
  | 'const'

  /* Other reserved words */
  | 'break'
  | 'case'
  | 'catch'
  | 'class'
  | 'continue'
  | 'debugger'
  | 'default'
  | 'do'
  | 'else'
  | 'export'
  | 'extends'
  | 'finally'
  | 'for'
  | 'function'
  | 'if'
  | 'import'
  | 'new'
  | 'return'
  | 'super'
  | 'switch'
  | 'this'
  | 'throw'
  | 'try'
  | 'while'
  | 'with'

  /* Strict mode reserved words */
  | 'implements'
  | 'interface'
  | 'package'
  | 'private'
  | 'protected'
  | 'public'
  | 'static'
  | 'yield'

  /* Contextual keywords */
  | 'as'
  | 'async'
  | 'await'
  | 'constructor'
  | 'get'
  | 'set'
  | 'from'
  | 'of';

// A node that can include single characters, operators and keywords
export interface TokenNode extends Root {
  type: TokenKind;
}

// NodeCursor interface
export type NodeCursor = void | ((pos: number) => Root | undefined);

export interface MissingList extends Root {
  start: number;
  length: number;
}

export interface TextSpan {
  start: number;
  length: number;
}

export interface TextChangeRange {
  span: TextSpan;
  newLength: number;
}

export interface TextRange {
  start: number;
  end: number;
}

export interface ArrayList extends Root {
  start: number;
  end: number;
  list: any[];
}
