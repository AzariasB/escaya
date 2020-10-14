# Optional AST nodes

Optional expression AST nodes

```js
interface Expression <: Node { }
```

## FormalParameterList

```js
interface FormalParameterList <: Expression {
    type: 'FormalParameterList';
    parameters: BindingElement;
}
```

See [FormalParameterList](https://tc39.es/ecma262/#prod-FormalParameterList).
