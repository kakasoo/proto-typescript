import { Equal, Merge } from "./object.type";

export type Length<T extends any[]> = T["length"];

export type Push<T extends any[], V> = [...T, V];

export type NTuple<
    N extends number,
    T extends any[] = []
> = T["length"] extends N ? T : NTuple<N, Push<T, any>>;

/**
 * Returns matching A to matching B in tuple form.
 * If there are no elements that match A or B, then never type.
 */
export type Slice<
    T extends any[],
    A extends any,
    B extends any,
    CONDITION extends boolean = false
> = T extends [infer X, ...infer Rest]
    ? CONDITION extends true
        ? X extends B // If you find something that matches B,
            ? [X, ...Slice<Rest, A, B, false>] // End the option to include unconditionally if you find a match for B
            : [X, ...Slice<Rest, A, B, true>] // include next type unconditionally
        : X extends A // If you find something that matches A,
        ? X extends B
            ? [X, ...Slice<Rest, A, B, false>] // include A & CONDTION type is true
            : [X, ...Slice<Rest, A, B, true>] // include A & CONDTION type is true
        : Slice<Rest, A, B, false> // The first type parameter of the Slice type is the intermediate element of the tuple...
    : CONDITION extends true // If CONDITION is still true while circulating all arrays, then the last point was not found, so never
    ? never
    : [];

export type Take<
    T extends any[],
    P extends number,
    R extends any[] = []
> = Length<R> extends P
    ? R
    : T extends [infer F, ...infer Rest]
    ? Take<Rest, P, Push<R, F>>
    : never;

export type TupleIncludes<T extends readonly any[], U> = T extends [
    infer P,
    ...infer R
] // T가 P와 나머지 R로 이루어진 배열이라면, 즉 length가 최소한 1 이상인 경우라면
    ? Equal<U, P> extends true
        ? true
        : TupleIncludes<R, U> // U가 P랑 같다면 true, 아니라면 Includes를 재귀적으로 호출한다.
    : false;

export type TupleToUnion<T extends NTuple<number>> = T[number];

export type EntriesToObject<T extends Array<NTuple<2>>> = T extends [
    infer F,
    ...infer Rest
]
    ? F extends [infer K extends string, infer V]
        ? Rest extends NTuple<2>[]
            ? Merge<Record<K, V>, EntriesToObject<Rest>>
            : never
        : never
    : {};
