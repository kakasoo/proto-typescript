import { ArrayType, NNTuple, NTuple } from './array.type';

export namespace NumberType {
  export type NToNumber<N> = N extends number ? N : never;

  export type NToNumberTuple<N> = N extends number[] ? N : never;

  export type Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  export type ToNumber<T> = T extends number ? T : never;

  export type Add<N1 extends number, N2 extends number> = [...NTuple<N1>, ...NTuple<N2>] extends [...infer U]
    ? ArrayType.Length<U>
    : never;

  export type Sub<A extends number, B extends number> = NTuple<A> extends [...infer U, ...NTuple<B>]
    ? ArrayType.Length<U>
    : never;

  export type IsDigit<T extends string> = ArrayType.Includes<Digits, T>;

  export type NumberString<T extends number> = `${T}`;

  export type ToNumberFromString<T extends string> = T extends NumberString<infer R> ? R : never;

  export type LessThan<N extends number, T extends any[] = []> = T['length'] extends N
    ? T
    : LessThan<N, ArrayType.Push<T, T['length']>>;

  export type Compare<
    N1 extends number,
    Operator extends '>' | '<' | '>=' | '<=' | '=',
    N2 extends number,
  > = Operator extends '>='
    ? N1 extends N2
      ? true
      : [NumberType.Sub<N1, N2>] extends [never]
        ? false
        : true
    : Operator extends '<='
      ? N1 extends N2
        ? true
        : [NumberType.Sub<N2, N1>] extends [never]
          ? false
          : true
      : Operator extends '>'
        ? N1 extends N2
          ? false
          : [NumberType.Sub<N1, N2>] extends [never]
            ? false
            : true
        : Operator extends '<'
          ? N1 extends N2
            ? false
            : [NumberType.Sub<N2, N1>] extends [never]
              ? false
              : true
          : Operator extends '='
            ? N1 extends N2
              ? true
              : false
            : never;

  export type LessThanEqual<N extends number, T extends any[] = []> = LessThan<NToNumber<Add<N, 1>>>;

  export type GaussSum<N1 extends number, K = ArrayType.Values<LessThanEqual<N1>>> = K extends number
    ? NTuple<K>
    : never;

  export type Multiply<T1 extends number, T2 extends number> = ArrayType.Length<NNTuple<T1, T2>>;

  export type Divide<T extends number, N extends number, Answer extends number = 0> = NTuple<T> extends [
    ...NTuple<N>,
    ...infer Rest,
  ]
    ? Divide<ArrayType.Length<Rest>, N, NToNumber<Add<Answer, 1>>>
    : Answer;

  export type Remainder<T extends number, N extends number> = Sub<T, NToNumber<Multiply<N, Divide<T, N>>>>;

  /**
   * 수의 절대값을 추론하는 타입
   */
  export type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`;

  /**
   * number range
   *
   * @exmple 1-9 ok
   * @exmple 5-1 x  (right is less than left)
   * @exmple 2-2 ok (case which is left and right is equals)
   */
  export type Range<T extends number, P extends number> = Compare<T, '<=', P> extends true
    ? `${T}-${P}`
    : never | '`TO` HAVE TO BE BIGGER THAN `FROM`';

  export type Decimal<Integer extends number, Fractional extends number> = `Decimal(${number},${number})`;
  export type Float = `${number}.${number}`;

  export type RealNumber<T extends number> = `${T}` | `+${T}` | `-${T}`;
}
