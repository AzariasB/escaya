import { createModuleNode } from '../ast/module-node';
import { createScriptNode } from '../ast/script-node';
import { createWhileStatement } from '../ast/statements/while-stmt';
import { createDoWhileStatement } from '../ast/statements/do-stmt';
import { createIfStatement } from '../ast/statements/if-stmt';
import { createCommaOperator } from '../ast/expressions/commaOperator';
import { createMemberExpression } from '../ast/expressions/member-expr';
import { createCallExpression } from '../ast/expressions/call-expr';
import { createIdentifierReference } from '../ast/expressions/identifierreference';
import { createOptionalExpression } from '../ast/expressions/optional-expr';
import { createOptionalChain } from '../ast/expressions/optional-chain';
import { createFunctionExpression } from '../ast/expressions/function-expr';
import { createFunctionDeclaration } from '../ast/declarations/function-declaration';
import { createForBinding } from '../ast/statements/forBinding';
import { createBindingElement } from '../ast/expressions/binding-element';
import { createArrayBindingPattern } from '../ast/expressions/array-binding-pattern';
import { createClassElement } from '../ast/expressions/class-element';
import { createClassExpression } from '../ast/expressions/class-expr';
import { createClassDeclaration } from '../ast/declarations/class-declaration';
import { createForInStatement } from '../ast/statements/for-in-stmt';
import { createForOfStatement } from '../ast/statements/for-of-stmt';
import { createForStatement } from '../ast/statements/for-stmt';
import { createArrayLiteral } from '../ast/expressions/array-literal';
import { createBindingRestElement } from '../ast/expressions/binding-rest-element';
import { createSuperCall } from '../ast/expressions/super-call';
import { createSuperProperty } from '../ast/expressions/super-property';
import { createSpreadElement } from '../ast/expressions/spread-element';
import { createSpreadProperty } from '../ast/expressions/spread-property';
import { createArrowFunction } from '../ast/expressions/arrow-function';
import { createMethodDefinition } from '../ast/expressions/method-definition';
import { createElison } from '../ast/expressions/elison';
import { createFunctionBody } from '../ast/expressions/function-body';
import { createObjectLiteral } from '../ast/expressions/object-literal';
import { createMemberChain } from '../ast/expressions/member-chain-expr';
import { createThisExpression } from '../ast/expressions/this-expr';
import { createNullExpression } from '../ast/expressions/null-expr';
import { createBooleanLiteral } from '../ast/expressions/boolean-literal';
import { createCallChain } from '../ast/expressions/call-chain';
import { createNewExpression } from '../ast/expressions/new-expr';
import { createIdentifierName } from '../ast/expressions/identifiername';
import { createBindingIdentifier } from '../ast/expressions/binding-identifier';
import { createBindingRestProperty } from '../ast/expressions/binding-rest-property';
import { createExpressionStatement } from '../ast/statements/expression-stmt';
import { createAssignmentExpression } from '../ast/expressions/assignment-expr';
import { createUnaryExpression } from '../ast/expressions/unary-expr';
import { createBlockStatement } from '../ast/statements/block-stmt';
import { createEmptyStatement } from '../ast/statements/empty-stmt';
import { createDebuggerStatement } from '../ast/statements/debugger-stmt';
import { createReturnStatement } from '../ast/statements/return-stmt';
import { createBreakStatement } from '../ast/statements/break-stmt';
import { createContinueStatement } from '../ast/statements/continue-stmt';
import { createLabelledStatement } from '../ast/statements/labelled-stmt';
import { createWithStatement } from '../ast/statements/with-stmt';
import { createThrowStatement } from '../ast/statements/throw-stmt';
import { createConditionalExpression } from '../ast/expressions/conditional-expr';
import { createBinaryExpression } from '../ast/expressions/binary-expr';
import { createLexicalBinding } from '../ast/statements/lexical-binding';
import { createLexicalDeclaration } from '../ast/declarations/lexical-declaration';
import { createVariableStatement } from '../ast/statements/variable-stmt';
import { createVariableDeclaration } from '../ast/declarations/variable-declaration';
import { createSwitchStatement } from '../ast/statements/switch-stmt';
import { createNumericLiteral } from '../ast/expressions/numeric-literal';
import { createFloatingPointLiteral } from '../ast/expressions/floating-point';
import { createBigIntLiteral } from '../ast/expressions/bigint-literal';
import { createStringLiteral } from '../ast/expressions/string-literal';
import { createCoverInitializedName } from '../ast/expressions/cover-initialized-name';
import { createParenthesizedExpression } from '../ast/expressions/parenthesized-expr';
import { createPrefixUpdateExpression } from '../ast/expressions/prefix-update-expr';
import { createPostfixUpdateExpression } from '../ast/expressions/postfix-update-expr';
import { createTryStatement, createCatchClause } from '../ast/statements/try-stmt';
import { createAssignmentRestElement } from '../ast/expressions/assignment-rest-element';
import { createObjectBindingPattern } from '../ast/expressions/object-binding-pattern';
import { createRegularExpressionLiteral } from '../ast/expressions/regular-expression';
import { createCaseClause, createDefaultClause } from '../ast/statements/case-clause';
import { ComputedPropertyName } from '../ast/expressions/computed-property-name';
import { createLabelIdentifier } from '../ast/expressions/labelIdentifier-expr';
import { createAwaitExpression } from '../ast/expressions/await-expr';
import { createYieldExpression } from '../ast/expressions/yield-expr';
import { createNewTarget } from '../ast/expressions/new-target';
import { createAssignmentElement } from '../ast/expressions/assignment-element';
import { createArrayAssignmentPattern } from '../ast/expressions/array-assignment-pattern';
import { createImportDeclaration } from '../ast/module/import-declaration';
import { createExportFromClause } from '../ast/module/export-from-clause';
import { createNamedImports } from '../ast/module/named-imports';
import { createImportClause } from '../ast/module/import-clause';
import { createImportSpecifier } from '../ast/module/import-specifier';
import { createExportDeclaration } from '../ast/module/export-declaration';
import { createExportDefault } from '../ast/module/export-default';
import { createExportSpecifier } from '../ast/module/export-specifier';
import { createSemicolon } from '../ast/expressions/semicolon';
import { createTemplateElement } from '../ast/expressions/template-element';
import { createTemplateExpression } from '../ast/expressions/template-expression';
import { createTemplateLiteral } from '../ast/expressions/template-literal';
import { createTaggedTemplate } from '../ast/expressions/tagged-template';
import { createPropertyName } from '../ast/expressions/property-name';
import { createObjectAssignmentPattern } from '../ast/expressions/object-assignment-pattern';
import { createImportCall } from '../ast/expressions/import-call';
import { createImportMeta } from '../ast/expressions/import-meta';
import { createDirective } from '../ast/directive-node';
import { createAssignmentRestProperty } from '../ast/expressions/assignment-rest-property';

export type Dictionary = { [key: string]: any };

export const DictionaryMap = {
  // All `create*` functions, but named by type
  Module: createModuleNode,
  Script: createScriptNode,
  Target: createNewTarget,
  Semicolon: createSemicolon,
  ArrayAssignmentPattern: createArrayAssignmentPattern,
  AssignmentElement: createAssignmentElement,
  NumericLiteral: createNumericLiteral,
  FloatingPointLiteral: createFloatingPointLiteral,
  BigInt: createBigIntLiteral,
  AwaitExpression: createAwaitExpression,
  YieldExpression: createYieldExpression,
  LabelIdentifier: createLabelIdentifier,
  ComputedPropertyName: ComputedPropertyName,
  StringLiteral: createStringLiteral,
  ArrowFunction: createArrowFunction,
  DefaultClause: createDefaultClause,
  SwitchStatement: createSwitchStatement,
  WhileStatement: createWhileStatement,
  DoWhileStatement: createDoWhileStatement,
  IfStatement: createIfStatement,
  CommaOperator: createCommaOperator,
  RegularExpressionLiteral: createRegularExpressionLiteral,
  MemberExpression: createMemberExpression,
  CallExpression: createCallExpression,
  IdentifierReference: createIdentifierReference,
  OptionalExpression: createOptionalExpression,
  OptionalChain: createOptionalChain,
  AssignmentRestElement: createAssignmentRestElement,
  AssignmentRestProperty: createAssignmentRestProperty,
  ObjectBindingPattern: createObjectBindingPattern,
  FunctionExpression: createFunctionExpression,
  FunctionDeclaration: createFunctionDeclaration,
  ForBinding: createForBinding,
  BindingElement: createBindingElement,
  ArrayBindingPattern: createArrayBindingPattern,
  ClassElement: createClassElement,
  ClassExpression: createClassExpression,
  ClassDeclaration: createClassDeclaration,
  ForInStatement: createForInStatement,
  ForStatement: createForStatement,
  ParenthesizedExpression: createParenthesizedExpression,
  ArrayLiteral: createArrayLiteral,
  BindingRestElement: createBindingRestElement,
  SuperCall: createSuperCall,
  SuperProperty: createSuperProperty,
  SpreadElement: createSpreadElement,
  SpreadProperty: createSpreadProperty,
  MethodDefinition: createMethodDefinition,
  Elison: createElison,
  FunctionBody: createFunctionBody,
  CoverInitializedName: createCoverInitializedName,
  ObjectLiteral: createObjectLiteral,
  MemberChain: createMemberChain,
  ThisExpression: createThisExpression,
  NullExpression: createNullExpression,
  BooleanLiteral: createBooleanLiteral,
  CallChain: createCallChain,
  NewExpression: createNewExpression,
  IdentifierName: createIdentifierName,
  BindingIdentifier: createBindingIdentifier,
  BindingRestProperty: createBindingRestProperty,
  ExpressionStatement: createExpressionStatement,
  AssignmentExpression: createAssignmentExpression,
  UnaryExpression: createUnaryExpression,
  PrefixUpdateExpression: createPrefixUpdateExpression,
  PostfixUpdateExpression: createPostfixUpdateExpression,
  BlockStatement: createBlockStatement,
  EmptyStatement: createEmptyStatement,
  DebuggerStatement: createDebuggerStatement,
  ReturnStatement: createReturnStatement,
  BreakStatement: createBreakStatement,
  ContinueStatement: createContinueStatement,
  LabelledStatement: createLabelledStatement,
  WithStatement: createWithStatement,
  ThrowStatement: createThrowStatement,
  TryStatement: createTryStatement,
  CatchClause: createCatchClause,
  ConditionalExpression: createConditionalExpression,
  BinaryExpression: createBinaryExpression,
  LexicalBinding: createLexicalBinding,
  LexicalDeclaration: createLexicalDeclaration,
  VariableStatement: createVariableStatement,
  VariableDeclaration: createVariableDeclaration,
  CaseClause: createCaseClause,
  PropertyName: createPropertyName,
  ObjectAssignmentPattern: createObjectAssignmentPattern,
  ImportCall: createImportCall,
  ImportMeta: createImportMeta,
  Directive: createDirective,
  ForOfStatement: createForOfStatement,

  // Module

  ImportDeclaration: createImportDeclaration,
  ImportClause: createImportClause,
  ImportSpecifier: createImportSpecifier,
  NamedImports: createNamedImports,
  ExportDeclaration: createExportDeclaration,
  ExportFromClause: createExportFromClause,
  ExportDefault: createExportDefault,
  ExportSpecifier: createExportSpecifier,
  TemplateElement: createTemplateElement,
  TemplateExpression: createTemplateExpression,
  TemplateLiteral: createTemplateLiteral,
  TaggedTemplate: createTaggedTemplate
};
