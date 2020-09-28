# Comments

```js
export interface Comments <: Node {
   type: 'SingleLine' | 'MultiLine' | 'HTMLClose' | 'HTMLOpen';
   comment: string;
   newLine: boolean;
}
```

## SingleLine

```js
interface SingleLine <: Comments {

}
```

## MultiLine

```js
interface MultiLine <: Comments {

}
```

## HTMLOpen

```js
interface HTMLOpen <: Comments {

}
```

## HTMLClose

```js
interface HTMLClose <: Comments {

}
```
