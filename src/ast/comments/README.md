# Comments

```js
export interface Comment <: Node {
   type: 'SingleLine' | 'MultiLine' | 'HTMLClose' | 'HTMLOpen';
   comment: string;
   newLine: boolean;
}
```

## SingleLine

```js
interface SingleLine <: Comment {

}
```

## MultiLine

```js
interface MultiLine <: Comment {

}
```

## HTMLOpen

```js
interface HTMLOpen <: Comment {

}
```

## HTMLClose

```js
interface HTMLClose <: Comment {

}
```
