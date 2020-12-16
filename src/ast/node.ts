const NodeTypeList = [
  'ArrayLiteral',
  'ArrowFunction',
  'PrefixUpdateExpression',
  'PostfixUpdateExpression',
  'ThrowStatement',
  'SwitchStatement',
  'ReturnStatement',
  'LexicalDeclaration',
  'LexicalBinding',
  'LabelledStatement',
  'ImportDeclaration',
  'IfStatement',
  'FunctionDeclaration',
  'ForStatement',
  'ForOfStatement',
  'ForInStatement',
  'ForBinding',
  'ExpressionStatement',
  'ExportDefault',
  'ExportDeclaration',
  'EmptyStatement',
  'DoWhileStatement',
  'DefaultClause',
  'DebuggerStatement',
  'ContinueStatement',
  'ClassDeclaration',
  'CaseClause',
  'BreakStatement',
  'IdentifierReference',
  'BlockStatement',
  'WhileStatement',
  'AssignmentElement',
  'AssignmentExpression',
  'AssignmentRestElement',
  'AwaitExpression',
  'BigIntLiteral',
  'BinaryExpression',
  'BindingRestElement',
  'BooleanLiteral',
  'CallChain',
  'CallExpression',
  'ClassElement',
  'ClassExpression',
  'CommaOperator',
  'ComputedPropertyName',
  'ConditionalExpression',
  'CoverInitializedName',
  'Elison',
  'FloatingPointLiteral',
  'FunctionBody',
  'FunctionExpression',
  'IdentifierName',
  'ImportCall',
  'ImportMeta',
  'LabelIdentifier',
  'MemberChain',
  'MemberExpression',
  'MethodDefinition',
  'Module',
  'NewExpression',
  'NewTarget',
  'NullLiteral',
  'NumericLiteral',
  'ObjectLiteral',
  'OptionalExpression',
  'ParenthesizedExpression',
  'PropertyName',
  'RegularExpressionLiteral',
  'RootNode',
  'Script',
  'StringLiteral',
  'SuperCall',
  'SuperProperty',
  'TaggedTemplate',
  'TemplateElement',
  'TemplateExpression',
  'TemplateLiteral',
  'ThisExpression',
  'TryStatement',
  'UnaryExpression',
  'VariableDeclaration',
  'VariableStatement',
  'WithStatement',
  'YieldExpression'
];

export type NodeType = typeof NodeTypeList[number];

/**
 * Every single valid AST Node type.
 */
export interface Node<T extends NodeType> {
  type: T;
  meta?: NodeMeta;
  flags?: NodeFlags;
  start?: number;
  end?: number;
}

/**
 * Every single valid CST Node type.
 */
export interface NodeMeta {
  asi?: boolean;
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
