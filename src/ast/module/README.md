# 15.2 Modules

## 15.2.2 Imports

### ImportDeclaration

```js
interface ImportDeclaration <: SyntaxNode {
    type: 'ImportDeclaration';
    importClause: ImportClause | null
    fromClause: StringLiteral | null;
}
```
An import declaration, e.g., `import foo from 'mod';`.

### ImportClause

```js
interface ImportClause <: SyntaxNode {
    type: 'ImportClause';
    defaultBinding: BindingIdentifier | null;
    nameSpaceImport: BindingIdentifier | null;
    namedImports: NamedImports | null;
}
```

### NamedImports

```js
interface NamedImports <: SyntaxNode {
    type: 'NamedImports';
    importsList: [ImportSpecifier]
}
```

### ImportSpecifier

```js
interface ImportSpecifier <: SyntaxNode {
    type: 'ImportSpecifier';
    name: IdentifierName | BindingIdentifier | null,
    binding: IdentifierName | BindingIdentifier | null
}
```

## 15.2.3 Exports

### ExportDeclaration

```js
interface ExportDeclaration <: SyntaxNode {
    type: 'ExportDeclaration';
    declaration: AssignmentExpression | VariableStatement | LexicalDeclaration | FunctionDeclaration | ClassDeclaration | null;
    namedExports: [ExportSpecifier];
    namedBinding: IdentifierName | null;
    fromClause: StringLiteral | null;
}
```
  ### ExportSpecifier

```js
interface ExportSpecifier <: SyntaxNode {
    type: 'ExportSpecifier';
    name: IdentifierName;
    binding: IdentifierName | null;
}
```

### ExportDefault [MODIFIED]

```js
interface ExportDefault <: SyntaxNode {
    type: 'ExportDefault';
    declaration: FunctionDeclaration | ClassDeclaration | Expression;
}
```

Extracted from `ExportDeclaration` to simplify a few things, and save 1 byte vs. using an
'default' property on the `ExportDeclaration` node.
