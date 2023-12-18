import { Conditional } from './arithmetic.type';
import { ArrayType } from './array.type';
import { NumberType } from './number.type';
import { Equal } from './object.type';

export namespace StringType {
  export type IsAlphabet<T extends string> = Uppercase<T> extends Lowercase<T>
    ? Lowercase<T> extends Uppercase<T>
      ? true
      : false
    : false;

  export type IsUpperCase<T extends string> = Uppercase<T> extends T ? true : false;

  export type IsLowerCase<T extends string> = Lowercase<T> extends T ? true : false;

  /**
   * Means to repeat T string N times
   */
  export type Repeat<T extends string, N extends number> = N extends 0 ? '' : `${T}${Repeat<T, NumberType.Sub<N, 1>>}`;

  export type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
    ? S
    : S extends From
      ? To
      : S extends `${From}${infer Rest}`
        ? `${To}${ReplaceAll<Rest, From, To>}`
        : S extends `${infer First}${From}${infer Last}`
          ? `${First}${To}${ReplaceAll<Last, From, To>}`
          : S extends `${infer First}${From}`
            ? `${First}${To}`
            : S;

  export type StringIncludes<T extends string, P extends string> = T extends `${string}${P}${string}` ? true : false;

  /**
   * It refers to a substitute string, and if there is an un substitute key-value pair, it is inferred as `never`.
   */
  export type Replaced<T extends string> = StringIncludes<T, `\${${string}}`> extends true ? never : T;

  /**
   * StartsWith<'abc', 'a'> // true
   */
  export type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false;

  /**
   * EndsWith<'abc', 'c'> // true
   */
  export type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;

  type _Split<Conatiner extends string, Splitter extends string = ''> = Conatiner extends ''
    ? []
    : Equal<Splitter, string> extends true
      ? string[]
      : Conatiner extends `${infer FirstWord}${Splitter}${infer Rest}`
        ? [FirstWord, ...Split<Rest, Splitter>]
        : [Conatiner];

  /**
   * Split<"abcdefg"> // ["a", "b", "c", "d", "e", "f", "g"]
   * Split<"abcdefg", ""> // ["a", "b", "c", "d", "e", "f", "g"]
   * Split<"abcdefg", "", 3> // ["a", "b", "c"]
   */
  export type Split<Conatiner extends string, Splitter extends string = '', Limit extends number = 0> = Conditional<
    Limit extends 0 ? true : false,
    _Split<Conatiner, Splitter>,
    ArrayType.Take<_Split<Conatiner, Splitter>, Limit>
  >;

  /**
   * Type of getting one character from that location with index as the key value in the string
   *
   * @example
   * ```ts
   * type Answer = StringAt<'abcdefg', 2>; // c
   * ```
   */
  export type StringAt<Container extends string, Index extends number> = ArrayType.ArrayAt<Split<Container>, Index>;
}
