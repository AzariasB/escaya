# The EScaya AST specification

Escaya's own `AST` represents the structure of an ECMAScript program as a tree and conforms to the [ECMAScript® 2021 specs](https://tc39.es/ecma262/index.html). The AST have been designed for performance, and it nearly eliminates the chance of accidentally creating an AST that does not represent an ECMAScript program while also requiring fewer bytes than the AST produced by ESTree and Babel.

## Script and Module

 A javaScript program can be either [a script or a module](https://tc39.github.io/ecma262/index.html#sec-ecmascript-language-scripts-and-modules) as
 defined in the `ES2015` specs and later.


```js
interface Script {
    type: string;
    directives: [ Directives ];
    leafs: [ Statement | ModuleDeclaration ];
    start: number;
    end: number;
}
```

## Module

```js
interface Module {
    type: string;
    directives: [ Directives ];
    leafs: [ Statement | ModuleDeclaration ];
    start: number;
    end: number;
}
```

'leafs' are used for every new block scope.

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


## RootNode

`RootNode` is for `error recovery mode` and represent both `Module` and `Script`.
The current `mutualFlags` property keeps track of which context you are currently parsing in,
and it's property contains a serie of bit masks that can be parsed by reference. This
information isn't known from outside, or exposed through any API.

```js
interface RootNode {
    kind: SyntaxKind;
    directives: [ Directives ];
    leafs: [ Statement | ModuleDeclaration ];
    text: string;
    filename: string;
    mutualFlags: Flags,
    diagnostics [ Diagnostics ];
    parent: Script | Module | null;
    children: [ Statement | ModuleDeclaration ];
    length: number;
    end: number;
}
```
