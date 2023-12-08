import { Add, Divide, Multiply, NToNumber, Remainder, Sub } from './number.type';
import { Equal, Merge } from './object.type';

export type ElementOf<Tuple extends readonly any[] | any[]> = [...Tuple] extends (infer E)[] ? E : never;

export type Length<T extends any[]> = T['length'];

/**
 * 현재 튜플 형태에 새로운 타입 하나를 추가하는 타입
 *
 * Push<[], any> // [any]
 * Push<[], 1> // [1]
 */
export type Push<T extends any[], V> = [...T, V];

export type NTuple<N extends number, T extends any[] = []> = T['length'] extends N ? T : NTuple<N, Push<T, any>>;

/**
 * N1 * N2 크기의 NTuple을 반환하는 타입으로, 최적화를 위해 N1, N2 숫자를 비교하는 과정이 포함된 타입
 *
 * NNTuple<2,3> = [...NTuple<3>, ...NTuple<3>]
 * NNTuple<3,2> = [...NTuple<3>, ...NTuple<3>]
 */
export type NNTuple<N1 extends number, N2 extends number> = [Sub<N1, N2>] extends [never]
  ? Sub<N1, 1> extends never
    ? []
    : [...NNTuple<Sub<N1, 1>, N2>, ...NTuple<N2>]
  : Sub<N2, 1> extends never
    ? []
    : [...NNTuple<Sub<N2, 1>, N1>, ...NTuple<N1>];

/**
 * Returns matching A to matching B in tuple form.
 * If there are no elements that match A or B, then never type.
 */
export type Slice<T extends any[], A extends any, B extends any, CONDITION extends boolean = false> = T extends [
  infer X,
  ...infer Rest,
]
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

export type Take<T extends any[], P extends number, R extends any[] = []> = Length<R> extends P
  ? R
  : T extends [infer F, ...infer Rest]
    ? Take<Rest, P, Push<R, F>>
    : never;

export type TupleIncludes<T extends readonly any[], U> = T extends [infer P, ...infer R] // T가 P와 나머지 R로 이루어진 배열이라면, 즉 length가 최소한 1 이상인 경우라면
  ? Equal<U, P> extends true
    ? true
    : TupleIncludes<R, U> // U가 P랑 같다면 true, 아니라면 Includes를 재귀적으로 호출한다.
  : false;

export type TupleToUnion<T extends NTuple<number>> = T[number];

export type EntriesToObject<T extends Array<NTuple<2>>> = T extends [infer F, ...infer Rest]
  ? F extends [infer K extends string, infer V]
    ? Rest extends NTuple<2>[]
      ? Merge<Record<K, V>, EntriesToObject<Rest>>
      : never
    : never
  : {};

export type ArrayToUnion<T extends any[]> = T[number];

/**
 * PartitionByTwo<[1,2,3,4,5,6,7,8]> // [[1,2],[3,4],[5,6],[7,8]]
 */
export type PartitionByTwo<T extends any[], L extends number = Length<T>> = T extends [
  infer First,
  infer Second,
  ...infer Rest,
]
  ? [[First, Second], ...PartitionByTwo<Rest, Sub<L, 2>>]
  : [];

/**
 * Join<['a', 'b', 'c']> // 'abc'
 * Join<['a', 'b', 'c'], '-'> // 'a-b-c'
 * Join<string[], "-">; // string
 */
export type Join<
  T extends readonly (string | number)[] | (string | number)[],
  U extends string = ',',
> = T extends readonly [infer F extends string | number, ...infer Rest extends (string | number)[]]
  ? Rest extends []
    ? `${F}`
    : `${F}${U}${Join<Rest, U>}`
  : string; // if `T` is not readonly tuple. ( for example, just `string[]` array type. )

export type IsTuple<T extends readonly any[] | { length: number }> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false;

/**
 * Reverse<[1,2,3]> // [3,2,1]
 */
export type Reverse<T extends any[]> = T extends [infer F, ...infer Rest] ? [...Reverse<Rest>, F] : [];

/**
 * Shift<[1,2,3]> // [2,3]
 */
export type Shift<T extends any[]> = T extends [infer F, ...infer Rest] ? Rest : [];

/**
 * Unshift<[1, 2, 3], 4> // [4,1,2,3]
 */
export type Unshift<T extends any[], V> = [V, ...T];

/**
 * Pop<[1,2,3]> // [1,2]
 */
export type Pop<T extends any[]> = T extends [...infer Rest, infer Last] ? Rest : [];

export type Includes<T extends readonly any[], U> = T extends [infer P, ...infer R]
  ? Equal<U, P> extends true
    ? true
    : Includes<R, U>
  : false;

/**
 * 튜플에서 중복 요소를 제거하는 타입
 *
 * Distinct<[1,1,2,2,3,3,3,4]> // [1,2,3,4]
 */
export type Distinct<T extends any[], P extends any[] = []> = T extends [infer F, ...infer Rest]
  ? Includes<P, F> extends false
    ? Distinct<Rest, [...P, F]>
    : Distinct<Rest, P>
  : P;

export type Compare<N1 extends number, N2 extends number> = N1 extends N2
  ? true
  : [Sub<N1, N2>] extends [never]
    ? false
    : true;

export type BubbleSort<T extends any[], L extends number = Length<T>, ASC extends boolean = false> = L extends 1
  ? T
  : T extends [infer F, infer S, ...infer Rest]
    ? BubbleSort<
        [
          ...(Compare<NToNumber<F>, NToNumber<S>> extends ASC
            ? [F, ...BubbleSort<[S, ...Rest], Sub<L, 1>>]
            : [S, ...BubbleSort<[F, ...Rest], Sub<L, 1>>]),
        ],
        Sub<L, 1>
      >
    : never;

/**
 * 사칙연산을 튜플에 적용한 타입
 *
 * type a = Map<[3, 4, 5], "Add", 2>; // [5, 6, 7]
 * type b = Map<[3, 4, 5], "Multiply", 2>; // [6, 8, 10]
 * type c = Map<[3, 4, 5], "Sub", 2>; // [1, 2, 3]
 * type d = Map<[3, 4, 5], "Divide", 2>; // [1, 2, 2]
 * type e = Map<[3, 4, 5], "Remainder", 2>; // [1, 0, 1]
 */
export type Map<
  T extends readonly number[],
  OP extends 'Add' | 'Multiply' | 'Sub' | 'Divide' | 'Remainder',
  N extends number,
> = OP extends 'Add'
  ? { [K in keyof T]: Add<T[K], N> }
  : OP extends 'Multiply'
    ? { [K in keyof T]: Multiply<T[K], N> }
    : OP extends 'Sub'
      ? { [K in keyof T]: Sub<T[K], N> }
      : OP extends 'Divide'
        ? { [K in keyof T]: Divide<T[K], N> }
        : OP extends 'Remainder'
          ? { [K in keyof T]: Remainder<T[K], N> }
          : never;
