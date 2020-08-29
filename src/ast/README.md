# The EScaya AST specification

Escaya's own `AST` represents the structure of an ECMAScript program as a tree and conforms to the [ECMAScript® 2021 specs](https://tc39.es/ecma262/index.html). The AST have been designed for performance, and it nearly eliminates the chance of accidentally creating an AST that does not represent an ECMAScript program while also requiring fewer bytes than the AST produced by ESTree and Babel.

The AST is also designed to support a simplified definition of *concrete syntax*.

A `ParenthesisExpression` has been added to represent the `( )` and everything in between. See [Primary Expression - Supplemental Syntax](https://tc39.es/ecma262/#sec-primary-expression)

A `Elison` node has been added to represent a splice array in [12.2.5 Array Initializer](https://tc39.es/ecma262/#sec-array-initializer) and [13.3.3 Destructuring Binding Patterns - ArrayBindingPattern](https://tc39.es/ecma262/#prod-ArrayBindingPattern).

A `Semicolon` node has been used  in [ClassElement](https://tc39.es/ecma262/#prod-ClassElement) to represent the `;` token.

```js
interface Script <: Node {
    type: string;
    directives: [ Directive ];
    leafs: [ Statement | ImportDeclaration | ExportDeclaration | ExportDefault ];
    start: number;
    end: number;
}
```

## Module

```js
interface Module <: Node {
    type: string;
    directives: [ Directive ];
    leafs: [ Statement | ImportDeclaration | ExportDeclaration | ExportDefault ];
    start: number;
    end: number;
}
```

`leafs` are used for every new block scope.

## Node

```js
interface Node {
    type: string;
    start?: number;
    end?: number;
    loc?: SourceLocation;
}
```

The `Node` contains all AST nodes represented as `Node` object, which may have any
prototype inheritance.

The `type` field is a string representing the AST variant type, and the `start` and `end`
are optional properties representing the start and end values of each `AST node`.

The optional `loc` field contains the source location information of the node.

```js
interface SourceLocation {
  start: LineAndColumnData;
  end: LineAndColumnData;
}
```

The `start` field is the position of the first character of the parsed source region, and the
`end` field is the position of the first character after the parsed source region.

```js
interface LineAndColumnData {
  line: number;
  column: number;
}
```

The `line` field is `1-indexed` and the `column` field is `0-indexed`

## Directive prologues


```js
interface Directive <: Node {
  value: string;
  raw: string;
}
```

A directive from the directive prologue of a script or function. The `raw` property is the raw
string source of the directive without quotes.

## RootNode

`RootNode` is for `error recovery mode` and represent both `Module` and `Script`.
The current `mutualFlags` property keeps track of which context you are currently parsing in,
and it's property contains a serie of bit masks that can be parsed by reference. This
information isn't known from outside, or exposed through any API.

```js
interface RootNode <: Node {
    kind: SyntaxKind;
    directives: [ Directive ];
    leafs: [ Statement | ImportDeclaration | ExportDeclaration | ExportDefault ];
    text: string;
    filename: string;
    mutualFlags: Flags,
    diagnostics [ Diagnostics ];
    parent: Script | Module | null;
    children: [ Statement | ImportDeclaration | ExportDeclaration | ExportDefault ];
    length: number;
    end: number;
}
```
