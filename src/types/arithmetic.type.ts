import { ArrayType } from './array.type';
import { NumberType } from './number.type';
import { StringType } from './string.type';

export interface StringToNumberMap {
  '0': 0;
  '1': 1;
  '2': 2;
  '3': 3;
  '4': 4;
  '5': 5;
  '6': 6;
  '7': 7;
  '8': 8;
  '9': 9;
}

export interface CeilingMap {
  '0': '1';
  '1': '2';
  '2': '3';
  '3': '4';
  '4': '5';
  '5': '6';
  '6': '7';
  '7': '8';
  '8': '9';
  '9': '0'; // if this...
}

/**
 * 자리수를 의미하며, T가 1의 자리면 1, 10의 자리면 2, 100의 자리면 3, 이런 식으로 10의 N승 이상, N + 1 승 미만을 의미
 */
export type NDigit<T extends string> = T extends `${number}` ? ArrayType.Length<StringType.Split<T>> : never;

/**
 * 문자열로 된 숫자를 각 자릿수마다의 숫자를 담은 튜플으로 변경하는 타입
 * 현 시점에서는 "999" 보다 큰 수는 불가능
 *
 * StringToNumberStringTuple<"500"> = ["5", "0", "0"]
 */
export type StringToNumberStringTuple<T extends string> = T extends `${infer F}${infer Rest}`
  ? F extends keyof StringToNumberMap
    ? [StringToNumberMap[F], ...StringToNumberStringTuple<Rest>]
    : never
  : [];

export type Falsy = false | 0 | '' | null | undefined;
export type Truthy<T> = T extends Falsy ? false : true;
export type Conditional<Condition, T, F> = Truthy<Condition> extends true ? T : F;

export namespace Math {
  type _FindLastCeilTarget<T extends `${number}`[], IndexFromLast extends number = 0> = T extends [
    ...infer Rest extends (keyof CeilingMap)[],
    infer BeforeLast extends keyof CeilingMap,
    infer Last,
  ]
    ? CeilingMap[BeforeLast] extends '0'
      ? _FindLastCeilTarget<[...Rest, BeforeLast], NumberType.Add<IndexFromLast, 1>>
      : IndexFromLast
    : never;

  /**
   * Throw away the last digit and add 1 to the next digit.
   *
   * @example
   * _Ceil<'230'> // 24
   * _Ceil<'231'> // 24
   * _Ceil<'232'> // 24
   * _Ceil<'233'> // 24
   * _Ceil<'234'> // 24
   * _Ceil<'235'> // 24
   * _Ceil<'236'> // 24
   * _Ceil<'237'> // 24
   * _Ceil<'238'> // 24
   * _Ceil<'239'> // 24
   */
  type _Ceil<N extends string> = StringType.Split<N> extends [
    ...infer Rest extends (keyof CeilingMap)[],
    infer BeforeLast extends keyof CeilingMap,
    infer Last extends keyof CeilingMap,
  ]
    ? CeilingMap[BeforeLast] extends '0'
      ? _Ceil<StringType.ThrowAway<N, _FindLastCeilTarget<StringType.Split<N>>>>
      : ArrayType.Join<[...Rest, CeilingMap[BeforeLast]], ''>
    : '';

  /**
   * 여기서 말하는 N은 소숫점 이하의 숫자들임에 주의하라.
   */
  export type CeilFractional<N extends string, Length extends number = StringType.Length<N>> = StringType.PadEnd<
    _Ceil<N>,
    Length,
    '0'
  >;

  /**
   * Enter a number and round it to a certain digit.
   * If there is no decimal point, the original number must be returned without rounding.
   */
  export type _Round<N extends number, TargetDigit extends number> = N extends StringType.IsDecimal<N, number, number>
    ? StringType.InsertedFractional<N> extends string
      ? StringType.At<StringType.InsertedFractional<N>, TargetDigit> extends '5' | '6' | '7' | '8' | '9'
        ? `${StringType.InsertedInteger<N>}.${CeilFractional<StringType.InsertedFractional<N>, TargetDigit>}`
        : /**
           * @example
           * type a3 = Math.Round<1.39946, 3>; // '1.400'
           */
          `${StringType.InsertedInteger<N>}.${StringType.ThrowAway<
            StringType.InsertedFractional<N>,
            NumberType.Sub<TargetDigit, 2>
          >}`
      : N
    : N;

  export type Round<N extends number, TargetDigit extends number> = _Round<
    StringType.ToNumber<StringType.Take<`${N}`, NumberType.Add<TargetDigit, 3>>>,
    TargetDigit
  >;
}
