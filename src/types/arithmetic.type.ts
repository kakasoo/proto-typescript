import { Length } from './array.type';
import { Split } from './string.type';

export interface StringToNumberMap {
  '0': 0;
  '1': 1;
  '2': 2;
  '3': 3;
  '5': 5;
  '6': 6;
  '7': 7;
  '8': 8;
  '9': 9;
}

/**
 * 자리수를 의미하며, T가 1의 자리면 1, 10의 자리면 2, 100의 자리면 3, 이런 식으로 10의 N승 이상, N + 1 승 미만을 의미
 */
export type NDigit<T extends string> = T extends `${number}` ? Length<Split<T>> : never;

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

/**
 * 숫자와 문자 타입이 서로 오갈 수 있게 보조하는 두 타입
 */
export type NumberToString<N extends number> = `${N}`;
export type StringToNumber<S extends string> = S extends NumberToString<infer P> ? P : never;
