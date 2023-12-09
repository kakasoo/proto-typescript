import { ArrayToUnion, ArrayValues, Length, NNTuple, NTuple, Push, TupleIncludes } from './array.type';

export type NToNumber<N> = N extends number ? N : never;

export type NToNumberTuple<N> = N extends number[] ? N : never;

export type Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export type ToNumber<T> = T extends number ? T : never;

export type Add<N1 extends number, N2 extends number> = [...NTuple<N1>, ...NTuple<N2>] extends [...infer U]
  ? Length<U>
  : never;

export type Sub<A extends number, B extends number> = NTuple<A> extends [...infer U, ...NTuple<B>] ? Length<U> : never;

export type IsDigit<T extends string> = TupleIncludes<Digits, T>;

export type NumberString<T extends number> = `${T}`;

export type ToNumberFromString<T extends string> = T extends NumberString<infer R> ? R : never;

export type LessThan<N extends number, T extends any[] = []> = T['length'] extends N
  ? T
  : LessThan<N, Push<T, T['length']>>;

export type AIsLessThanOrEqualB<A extends number, B extends number> = ArrayValues<LessThan<A>> extends ArrayValues<
  LessThan<B>
>
  ? true
  : false;

export type LessThanEqual<N extends number, T extends any[] = []> = LessThan<NToNumber<Add<N, 1>>>;

export type GaussSum<N1 extends number, K = ArrayToUnion<LessThanEqual<N1>>> = K extends number ? NTuple<K> : never;

export type Multiply<T1 extends number, T2 extends number> = Length<NNTuple<T1, T2>>;

export type Divide<T extends number, N extends number, Answer extends number = 0> = NTuple<T> extends [
  ...NTuple<N>,
  ...infer Rest,
]
  ? Divide<Length<Rest>, N, NToNumber<Add<Answer, 1>>>
  : Answer;

export type Remainder<T extends number, N extends number> = Sub<T, NToNumber<Multiply<N, Divide<T, N>>>>;

/**
 * 수의 절대값을 추론하는 타입
 */
export type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`;
