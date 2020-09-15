import { IdentifierReference } from './identifierreference';
import { IdentifierName } from './identifiername';
import { BindingIdentifier } from './binding-identifier';
import { CommaOperator } from './commaOperator';
import { AssignmentExpression } from './assignment-expr';
import { ConditionalExpression } from './conditional-expr';
import { MemberExpression } from './member-expr';
import { BinaryExpression } from './binary-expr';
import { CallExpression } from './call-expr';
import { OptionalExpression } from './optional-expr';
import { MemberChain } from './member-chain-expr';
import { CallChain } from './call-chain';
import { UnaryExpression } from './unary-expr';
import { PrefixUpdateExpression } from './prefix-update-expr';
import { PostfixUpdateExpression } from './postfix-update-expr';
import { AssignmentElement } from './assignment-element';
import { NewExpression } from './new-expr';
import { NullLiteral } from './null-expr';
import { ThisExpression } from './this-expr';
import { BooleanLiteral } from './boolean-literal';
import { ArrayLiteral } from './array-literal';
import { ObjectLiteral } from './object-literal';
import { PropertyName } from './property-name';
import { ComputedPropertyName } from './computed-property-name';
import { MethodDefinition } from './method-definition';
import { FunctionExpression } from './function-expr';
import { FunctionBody } from './function-body';
import { ArrowFunction } from './arrow-function';
import { ParenthesizedExpression } from './parenthesized-expr';
import { BindingRestElement } from './binding-rest-element';
import { ClassExpression } from './class-expr';
import { ClassElement } from './class-element';
import { ObjectBindingPattern } from './object-binding-pattern';
import { ArrayBindingPattern } from './array-binding-pattern';
import { BindingElement } from './binding-element';
import { AwaitExpression } from './await-expr';
import { SuperCall } from './super-call';
import { SuperProperty } from './super-property';
import { Elison } from './elison';
import { CoverInitializedName } from './cover-initialized-name';
import { YieldExpression } from './yield-expr';
import { NumericLiteral } from './numeric-literal';
import { BigIntLiteral } from './bigint-literal';
import { StringLiteral } from './string-literal';
import { RegularExpressionLiteral } from './regular-expression';
import { TemplateExpression } from './template-expression';
import { TaggedTemplate } from './tagged-template';
import { TemplateElement } from './template-element';
import { TemplateLiteral } from './template-literal';
import { NewTarget } from './new-target';
import { ImportCall } from './import-call';
import { AssignmentRestElement } from './assignment-rest-element';
import { LabelIdentifier } from './labelIdentifier-expr';
import { ObjectAssignmentPattern } from './object-assignment-pattern';
import { ArrayAssignmentPattern } from './array-assignment-pattern';
import { ImportMeta } from './import-meta';

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export type AssignmentPattern = ObjectAssignmentPattern | ArrayAssignmentPattern;

export type Binding = BindingPattern | BindingIdentifier;

export type Parameter = BindingIdentifier | BindingElement | BindingRestElement;

export type MethodName = IdentifierReference | StringLiteral | BigIntLiteral | NumericLiteral | IdentifierName;

/**
 * The set of all syntax items which are expressions.
 */
export type Expression =
  | LeftHandSideExpression
  | CommaOperator
  | IdentifierReference
  | IdentifierName
  | NewExpression
  | NullLiteral
  | ThisExpression
  | BooleanLiteral
  | AssignmentElement
  | ArrayLiteral
  | ObjectLiteral
  | PropertyName
  | MethodDefinition
  | FunctionExpression
  | Elison
  | ArrowFunction
  | AwaitExpression
  | YieldExpression
  | LabelIdentifier;

/**
 * The set of all syntax items which are allowed on the left side of an expression.
 */
export type LeftHandSideExpression =
  | AssignmentExpression
  | ConditionalExpression
  | MemberExpression
  | BinaryExpression
  | CallExpression
  | OptionalExpression
  | MemberChain
  | CallChain
  | UnaryExpression
  | PrefixUpdateExpression
  | PostfixUpdateExpression
  | FunctionBody
  | ParenthesizedExpression
  | BindingRestElement
  | ClassExpression
  | ClassElement
  | SuperCall
  | SuperProperty
  | CoverInitializedName
  | TemplateExpression
  | TemplateElement
  | TemplateLiteral
  | TaggedTemplate
  | NewTarget
  | ImportCall
  | AssignmentRestElement
  | ComputedPropertyName
  | ImportMeta
  | Literals;

/**
 * The set of all literal nodes
 */
export type Literals = NumericLiteral | BigIntLiteral | StringLiteral | RegularExpressionLiteral | TemplateLiteral;

export type PropertyKey = IdentifierName | NumericLiteral | BigIntLiteral | StringLiteral | ComputedPropertyName;
