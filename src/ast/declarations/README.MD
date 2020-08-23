# Declaration

```js
interface Declaration <: Node { }
```

## HoistableDeclaration

```js
interface FunctionDeclaration <: Declaration {
    type: 'FunctionDeclaration';
    name: BindingIdentifier;
    params: [ BindingIdentifier | BindingElement | BindingRestElement ];
    contents: FunctionBody;
    generator: boolean;
    async: boolean;
}
```

`GeneratorDeclaration` and `AsyncFunctionDeclaration` and `AsyncGeneratorDeclaration` have been
merged into `FunctionDeclaration`. An `async` and `generator` property has been used instead.

## ClassDeclaration

```js
interface ClassDeclaration <: Declaration {
    type: 'ClassDeclaration';
    name: BindingIdentifier;
    heritage: Expression | null;
    elements: [ ClassElement ];
}
```

## LexicalDeclaration

```js
interface LexicalDeclaration <: Declaration {
    type: 'LexicalDeclaration';
    declarations: [ LexicalBinding ];
    isConst: boolean;
}
```
`isConst` property is an replacement for `isConstOrLet` mentioned in the specs and require less byte than a text string.
It should be set to `true` for lexical `const` declarations


## ForDeclaration

```js
interface ForDeclaration <: Declaration {
    type: 'ForDeclaration';
    declarations: [ VariableDeclaration | LexicalDeclaration ];
}

```

See `13.7 Iteration Statements`.
