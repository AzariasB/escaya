# 12 ECMAScript Language: Expressions

```js
interface Expression <: Node { }
```

## 12.1 Identifiers

### IdentifierName

```js
interface IdentifierName <: Expression {
    type: 'IdentifierName';
    name: string;
}
```

### IdentifierReference

```js
interface IdentifierReference <: Expression {
    type: 'IdentifierReference';
    name: string;
}
```

An identifier that is a `PrimaryExpression`. E.g. `id in id()`


### BindingIdentifier

```js
interface BindingIdentifier <: Expression {
    type: 'BindingIdentifier';
    name: string;
}
```

### LabelIdentifier

```js
interface LabelIdentifier <: Expression {
    type: 'LabelIdentifier';
    name: string;
}
```

## 12.2.4 Literals

### NumericLiteral

```js
interface NumericLiteral <: Expression {
    type: 'NumericLiteral';
    value: number;
}
```

### BigIntLiteral

```js
interface BigIntLiteral <: Expression {
    type: 'BigIntLiteral';
    value: number | null;
}
```

### BooleanLiteral

```js
interface BooleanLiteral <: Expression {
    type: 'BooleanLiteral';
    value: boolean;
}
```

### TemplateLiteral

```js
interface TemplateLiteral <: Expression {
    raw: string;
    value: string;
}
```

### NullLiteral

```js
interface NullLiteral <: Expression {
    type: 'NullLiteral';
    value: null;
}
```

### StringLiteral

```js
interface StringLiteral <: Expression {
    type: 'StringLiteral';
    value: string;
}
```

### RegExpFlags

```js
enum RegExpFlags { 'g' | 'i' | 'm' | 'u' | 's' | 'y'; }
```

### RegularExpressionLiteral

```js
interface RegularExpressionLiteral <: Expression {
    type: 'RegularExpressionLiteral';
    pattern: string;
    flag: RegExpFlags;
}
```

## 12.16 Comma Operator

```js
interface CommaOperator  <: Expression {
    type: 'CommaOperator';
    expressions: [ Expression ];
}
```

A sequence expression, i.e., a comma-separated sequence of expressions.


## 12.2 Primary Expression and others

### ThisExpression

```js
interface ThisExpression <: Expression {
    type: 'ThisExpression';
}
```
### ArrayLiteral

```js
interface ArrayLiteral <: Expression {
    type: 'IdentifierReference';
    elements: [ Elison | SpreadElement | Expression ];
}
```

### ArrowFunction

```js
interface ArrowFunction <: Expression {
    type: 'ArrowFunction';
    params: [ BindingIdentifier | BindingRestElement | ArrayBindingPattern | ObjectBindingPattern ];
}
```

### AssignmentElement

```js
interface AssignmentElement <: Expression {
    type: 'AssignmentElement';
    left: ObjectAssignmentPattern | ArrayAssignmentPattern | IdentifierReference;
    right: Expression | null;
}
```
### AssignmentOperator

```js

enum AssignmentOperator {
    '=',
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '<<=',
    '>>=',
    '>>>=',
    '|=',
    '^=',
    '&='
}
```

### LogicalAssignmentOperator

```js
enum LogicalAssignmentOperator {
    '||=',
    '&&=',
    '??='
}
```

### AssignmentExpression

```js
interface AssignmentExpression <: Expression {
    type: 'AssignmentExpression';
    left: ObjectAssignmentPattern | ArrayAssignmentPattern | Expression;
    operator: AssignmentOperator | LogicalAssignmentOperator;
    right: Expression;
}
```

### AssignmentRestElement

```js
interface AssignmentRestElement <: Expression {
    type: 'AssignmentRestElement';
    argument: Expression;
}
```

### AssignmentRestProperty

```js
interface AssignmentRestProperty <: Expression {
    type: 'AssignmentRestProperty';
    argument: ArrayAssignmentPattern | ObjectAssignmentPattern | AssignmentElement | Expression;
}
```

### AwaitExpression

```js
interface AwaitExpression <: Expression {
    type: 'AwaitExpression';
    argument: UnaryExpression;
}
```

### BinaryOperator

```js
enum BinaryOperator {
    '==' ,
    '!=',
    '===',
    '!==',
    '<',
    '<=',
    '>',
    '>=',
    '<<',
    '>>',
    '>>>',
    '+',
    '-',
    '*',
    '/',
    '%',
    '|',
    '^',
    '&',
    'in',
    'instanceof'
}
```

### BinaryExpression

```js
interface BinaryExpression <: Expression {
    type: 'BinaryExpression';
    left: Expression;
    operator: BinaryOperator
    right: Expression;
}
```

### BindingElement

```js
interface BindingElement <: Expression {
    type: 'BindingElement';
    key: PropertyKey;
    value: BindingElement | Expression;
}
```

### BindingRestElement

```js
interface BindingRestElement <: Expression {
    type: 'BindingRestElement';
    argument: ObjectBindingPattern | ArrayBindingPattern | BindingIdentifier;
}
```

### ArrayBindingPattern

```js
interface ArrayBindingPattern <: Expression {
    type: 'ArrayBindingPattern';
    elements: [ Elison | BindingRestElement | BindingIdentifier | BindingElement ];
}
```

### ArrayAssignmentPattern

```js
interface ArrayAssignmentPattern <: Expression {
    type: 'ArrayAssignmentPattern';
    elements: [ Elison | AssignmentRestElement | AssignmentElement ];
}
```

### BindingRestProperty

```js
interface BindingRestProperty <: Expression {
    type: 'BindingRestProperty';
    argument: BindingIdentifier;
}
```

### CallExpression

```js
interface CallExpression  <: Expression {
    type: 'CallExpression';
    expression: Expression;
    arguments: [ AssignmentRestElement | Expression ];
}
```

### ClassExpression

```js
interface ClassExpression <: Expression {
    type: 'ClassExpression';
    name: BindingIdentifier | null;
    heritage: Expression | null;
    elements: [ Semicolon | ClassElement ];
}
```

See [14.6 Class Definitions](https://tc39.es/ecma262/#sec-class-definitions)


### ClassElement

```js
interface ClassElement <: Expression {
    type: 'ClassElement';
    static: boolean;
    method: MethodDefinition;
}
```
The `static` boolean is true if `static` of ClassElement is true.

### Semicolon

```js
interface Semicolon <: Expression {
    type: 'Semicolon';
}

```
This node is part of the `ClassElement` production. See[`14.6 Class Definitions`](https://tc39.es/ecma262/#prod-ClassElement).


### ComputedPropertyName

```js
interface ComputedPropertyName <: Expression {
    type: 'ComputedPropertyName';
    expression: Expression;
}
```

### ConciseBody

```js
interface ConciseBody <: Expression {
    type: 'ConciseBody';
    expression: Expression;
}
```

### ConditionalExpression

```js
interface ConditionalExpression  <: Expression {
    type: 'ConditionalExpression';
    shortCircuit: Expression;
    consequent: Expression;
    alternate: Expression;
}
```

For simplicity the `ShortCircuitExpression` have been merged with `ConditionalExpression`.
However. The `shortCircuit` property should start with `BinaryExpression`, and it's precedence
value should start with `|` - right above  `&&`, `||` and `??`.


### CoverInitializedName

```js
interface CoverInitializedName <: Expression {
    type: 'CoverInitializedName';
    left: Expression | IdentifierName | null;
    right: Expression;
}
```
 Use of this node should automatically force an grammar error to appear in actual object initializer.

### Elison

```js
interface Elison <: Expression {
    type: 'Elison';
}
```

Used to represent an splice array in [ArrayLiteral](https://tc39.es/ecma262/#prod-ArrayLiteral)


### FunctionBody

```js
interface FunctionBody <: Expression {
    type: 'FunctionBody';
    directives: [ Directive ];
    leafs: [ Statement ];
}
```

### FunctionExpression

```js
interface FunctionExpression <: Expression {
    type: 'FunctionExpression';
    argument: Expression;
    name: BindingIdentifier | null;
    generator: boolean;
    async: boolean;
    params: [ BindingIdentifier | BindingElement | BindingRestElement ];
    contents: FunctionBody;
}
```

 A `BindingIdentifier` without an initializer represent the `SingleNameBinding` mentioned in the specs.

### ImportCall

```js
interface ImportCall <: Expression {
    type: 'ImportCall';
    import: Expression;
}
```

### ImportMeta

```js
interface ImportMeta <: Expression {
    type: 'ImportMeta';
}
```

### MemberExpression

```js
interface MemberExpression <: Expression {
    type: 'MemberExpression';
    member: Expression | OptionalExpression;
    expression: Expression;
    computed: boolean;
}
```

### MethodDefinition

```js
interface MethodDefinition <: Expression {
    type: 'MethodDefinition';
    async: boolean;
    generator: boolean;
    getter: boolean;
    propertySetParameterList: BindingIdentifier | BindingElement | null;
    uniqueFormalParameters: [ BindingIdentifier | BindingElement | BindingRestElement ];
    name: IdentifierReference | StringLiteral | BigIntLiteral | NumericLiteral | IdentifierName;
    contents: FunctionBody;
}
```
`getter` should be true **only** if `propertySetParameterList` is set to `null` and `uniqueFormalParameters` has
an empty list. A getter cannot have any parameters.

`propertySetParameterList` should be set if `getter` is false and `uniqueFormalParameters` has
an empty list. E.g `({set x(y) {}})` can only have one paramater.

This changes conforms to the ECMA specification.

### NewExpression

```js
interface NewExpression <: Expression {
    type: 'NewExpression';
    expression: Expression;
    arguments: [ AssignmentRestElement | Expression ];
}
```

### NewTarget

```js
interface NewTarget <: Expression {
    type: 'NewTarget';
}
```

### SpreadElement

```js
interface SpreadElement <: Expression {
    type: 'SpreadElement';
    argument: Expression;
}
```

### SpreadProperty

```js
interface SpreadProperty <: Expression {
    type: 'SpreadProperty';
    argument: AssignmentExpression;
}
```

See `12.2.6 Object Initializer`. The `SpreadProperty` AST node is not mentioned in the specs, but has been
added to represent the `...AssignmentExpression` production.


### SuperProperty

```js
interface SuperProperty <: Expression {
    type: 'SuperProperty';
    super: Expression | IdentifierName | null;
    computed: boolean;
}
```

### SuperCall

```js
interface SuperCall <: Expression {
    type: 'SuperCall';
    arguments: [ Arguments ];
}
```


### TaggedTemplate

```js
interface TaggedTemplate <: Expression {
    type: 'TaggedTemplate';
    member: MemberExpression;
    literal: TemplateLiteral | TemplateExpression;
}
```

### TemplateElement

```js
interface TemplateElement <: Expression {
    type: 'TemplateElement';
    raw: string;
    value: string;
    expression: Expression | null;
}
```
 The `raw` property is the raw string source of the template element.

### TemplateExpression

```js
interface TemplateExpression <: Expression {
    type: 'TemplateExpression';
    elements: [ TemplateElement ];
}
```

### UnaryOperator

```js
  enum UnaryOperator {
    '+',
    '-',
    '!',
    '~',
    'delete',
    'void',
    'typeof'
  }
```

### UnaryExpression

```js
interface UnaryExpression <: Expression {
    type: 'UnaryExpression';
    operator: UnaryOperator;
    operand: Expression;
}
```

### YieldExpression

```js
interface YieldExpression <: Expression {
    type: 'YieldExpression';
    delegate: boolean;
    argument: Expression | null;
}
```

### ParenthesizedExpression

```js
interface ParenthesizedExpression <: Expression {
    type: 'ParenthesizedExpression';
    expression: Expression | CommaOperator;
}
```

### OptionalExpression

```js
interface OptionalExpression <: Expression {
    type: 'OptionalExpression';
    member: Expression;
    chain: OptionalChain;
}
```

See `12.3 Left-Hand-Side Expressions - OptionalExpression`.

### OptionalChain

```js
interface OptionalChain <: Expression {
    type: 'OptionalChain';
    chain: MemberChain | CallChain | null;
}
```

### MemberChain

```js
interface MemberChain <: Expression {
    type: 'MemberChain';
    chain: MemberChain | CallChain | null;
    property: Expression | IdentifierName | null;
    computed: boolean;
}
```

### CallChain

```js
interface CallChain <: Expression {
    type: 'CallChain';
    chain: MemberChain | CallChain | null;
    arguments: [ Expression ] | null;
}
```

### PropertyKey

```js
enum PropertyKey {
    IdentifierName, NumericLiteral, BigIntLiteral, StringLiteral, ComputedPropertyName
}
```

### PropertyName

```js
interface PropertyName <: Expression {
    type: 'PropertyName';
    key: PropertyKey;
    value: Expression;
}
```

### UnaryOperator

```js
  enum UpdateOp {
    '++',
    '--'
  }
```

### PrefixUpdateExpression

```js
interface PrefixUpdateExpression <: Expression {
    type: 'PrefixUpdateExpression';
    operator: UpdateOp;
    operand: Expression;
}
```

`UpdateExpression` has been separated into `PrefixUpdateExpression` and `PostfixUpdateExpression` to reduce AST
file size.

### PostfixUpdateExpression

```js
interface PostfixUpdateExpression <: Expression {
    type: 'PrefixUpdateExpression';
    operator: UpdateOp;
    operand: Expression;
}
```

### ObjectLiteral

```js
interface ObjectLiteral <: Expression {
    type: 'ObjectLiteral';
    properties: [ PropertyDefinition | MethodDefinition | SpreadProperty | CoverInitializedName | Expression ];
}
```

### ObjectBindingPattern

```js
interface ObjectBindingPattern <: Expression {
    type: 'ObjectBindingPattern';
    properties: [ BindingRestProperty | BindingElement | BindingIdentifier ];
}
```

### ObjectAssignmentPattern

```js
interface ObjectAssignmentPattern <: Expression {
    type: 'ObjectAssignmentPattern';
    properties: [ IdentifierReference | IdentifierName | AssignmentElement | AssignmentRestProperty ];
}
```
