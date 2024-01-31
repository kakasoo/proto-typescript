import { NeverType } from './never.type';
import { NumberType } from './number.type';
import { Equal, ObjectType } from './object.type';
import { Primitive, ReadonlyOrNot } from './primitive.type';

export namespace ArrayType {
  /**
   * @todo don't use `Equal` type and use `includes` of `union types` ( make `union incldues` type )
   */
  export type Filter<T extends ReadonlyOrNot<any[]>, Target> = T extends [infer First, ...infer Rest]
    ? Equal<First, Target> extends true
      ? [First, ...Filter<Rest, Target>]
      : Filter<Rest, Target>
    : [];

  type _FilterNull<FilterNull extends boolean, Target> = FilterNull extends true
    ? Equal<Target, null> extends true
      ? never
      : Target
    : Target;

  type _FilterUndefined<FilterUndefined extends boolean, Target> = FilterUndefined extends true
    ? Equal<Target, undefined> extends true
      ? never
      : Target
    : Target;

  /**
   * type a = ArrayType.Filter<[1, 2, true, 3, undefined, null, 5], true, true> // [1, 2, 3, 5]
   */
  export type FilterNullish<
    T extends ReadonlyOrNot<any[]>,
    AllowNull extends boolean,
    AllowUndefined extends boolean,
  > = T extends [infer First, ...infer Rest]
    ? NeverType.IsNever<_FilterNull<AllowNull, First>> extends true
      ? FilterNullish<Rest, AllowNull, AllowUndefined>
      : NeverType.IsNever<_FilterUndefined<AllowUndefined, First>> extends true
        ? FilterNullish<Rest, AllowNull, AllowUndefined>
        : [First, ...FilterNullish<Rest, AllowNull, AllowUndefined>]
    : [];

  /**
   * Get length of tuple or string literal type.
   */
  export type Length<T extends ReadonlyOrNot<any[]>> = T['length'];

  export type Push<T extends ReadonlyOrNot<any[]>, V extends any> = [...T, V];

  export type Concat<T extends ReadonlyOrNot<any[]>, P extends ReadonlyOrNot<any[]>> = [...T, ...P];

  export type ElementOf<Tuple extends ReadonlyOrNot<any[]>> = [...Tuple] extends (infer E)[] ? E : never;

  export type Values<T extends ReadonlyOrNot<any[]>> = T[number];
  export type TupleToUnion<T extends NTuple<number>> = T[number];

  export type Take<
    T extends ReadonlyOrNot<any[]>,
    P extends number,
    R extends ReadonlyOrNot<any[]> = [],
  > = ArrayType.Length<R> extends P ? R : T extends [infer F, ...infer Rest] ? Take<Rest, P, ArrayType.Push<R, F>> : R;

  export type Slice<T extends ReadonlyOrNot<any[]>, Start extends number, End extends number> = SliceByValue<
    T,
    T[Start],
    NeverType.IsNever<End> extends true ? never : T[End]
  >;

  /**
   * Returns matching A to matching B in tuple form.
   * If there are no elements that match A or B, then never type.
   */
  export type SliceByValue<
    T extends ReadonlyOrNot<any[]>,
    A extends any,
    B extends any,
    CONDITION extends boolean = false,
  > = T extends [infer X, ...infer Rest]
    ? CONDITION extends true
      ? X extends B // If you find something that matches B,
        ? [X, ...SliceByValue<Rest, A, B, false>] // End the option to include unconditionally if you find a match for B
        : [X, ...SliceByValue<Rest, A, B, true>] // include next type unconditionally
      : X extends A // If you find something that matches A,
        ? X extends B
          ? [X, ...SliceByValue<Rest, A, B, false>] // include A & CONDTION type is true
          : [X, ...SliceByValue<Rest, A, B, true>] // include A & CONDTION type is true
        : SliceByValue<Rest, A, B, false> // The first type parameter of the Slice type is the intermediate element of the tuple...
    : CONDITION extends true // If CONDITION is still true while circulating all arrays, then the last point was not found, so get all element of this array.
      ? []
      : [];

  export type At<Tuple extends ReadonlyOrNot<any[]>, Index extends number> = Tuple[Index];

  /**
   * If any of the type elements constituting Union Type U correspond to `If`, it returns true or false.
   */
  export type UnionSome<If, U, T, F> = T extends (U extends If ? T : F) ? T : F;

  /**
   * If any of the type elements constituting Tuple Type U correspond to `If`, it returns true or false.
   */
  export type Some<Target, Tuple extends ReadonlyOrNot<any[]>> =
    | UnionSome<Target, Tuple[number], true, false>
    | boolean;

  export type Includes<T extends ReadonlyOrNot<any[]>, U> = T extends [infer P, ...infer R] // T가 P와 나머지 R로 이루어진 배열이라면, 즉 length가 최소한 1 이상인 경우라면
    ? Equal<U, P> extends true
      ? true
      : Includes<R, U> // U가 P랑 같다면 true, 아니라면 Includes를 재귀적으로 호출한다.
    : false;

  /**
   * Join<['a', 'b', 'c']> // 'abc'
   * Join<['a', 'b', 'c'], '-'> // 'a-b-c'
   * Join<string[], "-">; // string
   * Join<['a', 'b', 'c', true], '-'>; // 'a-b-c-true'
   * Join<['a', 'b', 'c', number], '-'>; // 'a-b-c-${number}'
   */
  export type Join<T extends ReadonlyOrNot<Exclude<Primitive, symbol>[]>, U extends string = ','> = T extends readonly [
    infer F extends Exclude<Primitive, symbol>,
    ...infer Rest extends ReadonlyOrNot<Exclude<Primitive, symbol>[]>,
  ]
    ? Rest extends []
      ? `${F}`
      : `${F}${U}${Join<Rest, U>}`
    : string; // if `T` is not readonly tuple. ( for example, just `string[]` array type. )

  export type IsTuple<T extends ReadonlyOrNot<any[]> | { length: number }> = [T] extends [never]
    ? false
    : T extends ReadonlyOrNot<any[]>
      ? number extends T['length']
        ? false
        : true
      : false;

  /**
   * Reverse<[1,2,3]> // [3,2,1]
   */
  export type Reverse<T extends ReadonlyOrNot<any[]>> = T extends [infer F, ...infer Rest] ? [...Reverse<Rest>, F] : [];

  /**
   * Shift<[1,2,3]> // [2,3]
   */
  export type Shift<T extends ReadonlyOrNot<any[]>> = T extends [infer F, ...infer Rest] ? Rest : [];

  /**
   * Unshift<[1, 2, 3], 4> // [4,1,2,3]
   */
  export type Unshift<T extends ReadonlyOrNot<any[]>, V> = [V, ...T];

  /**
   * Pop<[1,2,3]> // [1,2]
   */
  export type Pop<T extends ReadonlyOrNot<any[]>> = T extends [...infer Rest, infer Last] ? Rest : [];

  /**
   * 튜플에서 중복 요소를 제거하는 타입
   *
   * Distinct<[1,1,2,2,3,3,3,4]> // [1,2,3,4]
   */
  export type Distinct<T extends ReadonlyOrNot<any[]>, P extends ReadonlyOrNot<any[]> = []> = T extends [
    infer F,
    ...infer Rest,
  ]
    ? Includes<P, F> extends false
      ? Distinct<Rest, [...P, F]>
      : Distinct<Rest, P>
    : P;

  export type EntriesToObject<T extends Array<NTuple<2>>> = T extends [infer F, ...infer Rest]
    ? F extends [infer K extends string, infer V]
      ? Rest extends NTuple<2>[]
        ? ObjectType.Merge<Record<K, V>, EntriesToObject<Rest>>
        : never
      : never
    : {};

  /**
   * PartitionByTwo<[1,2,3,4,5,6,7,8]> // [[1,2],[3,4],[5,6],[7,8]]
   */
  export type PartitionByTwo<T extends ReadonlyOrNot<any[]>, L extends number = ArrayType.Length<T>> = T extends [
    infer First,
    infer Second,
    ...infer Rest,
  ]
    ? [[First, Second], ...PartitionByTwo<Rest, NumberType.Sub<L, 2>>]
    : [];

  export type BubbleSort<
    T extends ReadonlyOrNot<any[]>,
    L extends number = ArrayType.Length<T>,
    ASC extends boolean = false,
  > = L extends 1
    ? T
    : T extends [infer F, infer S, ...infer Rest]
      ? BubbleSort<
          [
            ...(NumberType.Compare<NumberType.NToNumber<F>, '>=', NumberType.NToNumber<S>> extends ASC
              ? [F, ...BubbleSort<[S, ...Rest], NumberType.Sub<L, 1>>]
              : [S, ...BubbleSort<[F, ...Rest], NumberType.Sub<L, 1>>]),
          ],
          NumberType.Sub<L, 1>
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
    ? { [K in keyof T]: NumberType.Add<T[K], N> }
    : OP extends 'Multiply'
      ? { [K in keyof T]: NumberType.Multiply<T[K], N> }
      : OP extends 'Sub'
        ? { [K in keyof T]: NumberType.Sub<T[K], N> }
        : OP extends 'Divide'
          ? { [K in keyof T]: NumberType.Divide<T[K], N> }
          : OP extends 'Remainder'
            ? { [K in keyof T]: NumberType.Remainder<T[K], N> }
            : never;
}

/**
 * 현재 튜플 형태에 새로운 타입 하나를 추가하는 타입
 *
 * Push<[], any> // [any]
 * Push<[], 1> // [1]
 */

export type NTuple<N extends number, T extends ReadonlyOrNot<any[]> = [], defaultType = any> = T['length'] extends N
  ? T
  : NTuple<N, ArrayType.Push<T, defaultType>>;

/**
 * N1 * N2 크기의 NTuple을 반환하는 타입으로, 최적화를 위해 N1, N2 숫자를 비교하는 과정이 포함된 타입
 *
 * NNTuple<2,3> = [...NTuple<3>, ...NTuple<3>]
 * NNTuple<3,2> = [...NTuple<3>, ...NTuple<3>]
 */
export type NNTuple<N1 extends number, N2 extends number> = [NumberType.Sub<N1, N2>] extends [never]
  ? NumberType.Sub<N1, 1> extends never
    ? []
    : [...NNTuple<NumberType.Sub<N1, 1>, N2>, ...NTuple<N2>]
  : NumberType.Sub<N2, 1> extends never
    ? []
    : [...NNTuple<NumberType.Sub<N2, 1>, N1>, ...NTuple<N1>];
