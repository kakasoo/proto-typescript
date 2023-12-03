export type NotAUnion<T, U = T> = U extends any
    ? [T] extends [U]
        ? T
        : never
    : never;
