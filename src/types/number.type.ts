import { Length, NTuple, TupleIncludes } from "./array.type";

export type Digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export type ToNumber<T> = T extends number ? T : never;

export type Add<N1 extends number, N2 extends number> = [
    ...NTuple<N1>,
    ...NTuple<N2>
] extends [...infer U]
    ? Length<U>
    : never;

export type Sub<A extends number, B extends number> = NTuple<A> extends [
    ...infer U,
    ...NTuple<B>
]
    ? Length<U>
    : never;

export type IsDigit<T extends string> = TupleIncludes<Digits, T>;

export type NumberString<T extends number> = `${T}`;

export type ToNumberFromString<T extends string> = T extends NumberString<
    infer R
>
    ? R
    : never;
