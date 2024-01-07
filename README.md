# proto-typescript

Utility types and implementations based on JavaScript prototypes.
I plan to share the features that are officially available from 2.0.0.

# TypedClass

## prototype methods

```ts
new TypedArray([1, 2, 3] as const).unshift(4 as const); // TypedArray<[4, 1, 2, 3]>
```

```ts
new TypedArray([1, 2, 3] as const).join(','); // TypedString<'1,2,3'>
```

The return result of 'TypeClass' returns one of the instances of TypeClass again. Therefore, those who know the grammar of JavaScript can use it immediately.

## `refined` methods

```ts
/**
 * error case
 */
new TypedArray<'1-3'>([1, 2, 3]).refine([1, 2, 3] as const).join('-');
new TypedArray<'1-3'>([]).refine([1, 2, 3] as const).join('-');
new TypedArray<'1-3'>().refine([1, 2, 3, 4] as const).join('-');
new TypedArray<'1-3'>().refine([0, 1, 2, 3] as const).join('-');

/**
 * right case
 */
new TypedArray<'1-3'>().refine([2, 3] as const).join('-');
```

`TypedArray`, `TypedNumber` has the `refine` method, which serves to further narrow down the generic type received as a factor. This helps reduce developer mistakes, but it should be careful because it cannot guarantee actual runtime behavior.

> In the future, improvements will be made at the type level.

## toPrimitive method

```ts
new TypedString('abcdef').toPrimitive(); // 'abcdef'
```

You can change it to the primitive type of JavaScript.

```ts
const arr = [...new TypedArray([1, 2, 3, 4, 5] as const)]; // (1 | 2 | 3 | 4 | 5)[]
```

`Iterable/Iterator` is supported.
