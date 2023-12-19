import { Conditional } from './arithmetic.type';
import { ArrayType } from './array.type';
import { NumberType } from './number.type';
import { Equal } from './object.type';

type a = StringType.Includes<'abcde', 'b', 1>;

export namespace StringType {
  export type Blank = ' ' | '\n' | '\t';

  /**
   * Remove the blank characters that are clustered on the left side of the string.
   */
  export type TrimStart<S extends string> = S extends `${Blank}${infer Rest}` ? TrimStart<Rest> : S;

  /**
   * Remove the blank characters that are clustered on the right side of the string.
   */
  export type TrimEnd<S extends string> = S extends `${infer Rest}${Blank}` ? TrimEnd<Rest> : S;

  /**
   * Remove the blank characters that are clustered on the left and right side of the string.
   */
  export type Trim<S extends string> = TrimEnd<TrimStart<S>>;

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

  /**
   * @todo support Position type
   */
  export type Includes<
    Conatiner extends string,
    SearchString extends string,
    Position extends number = 0,
  > = Conatiner extends `${string}${SearchString}${string}` ? true : false;

  /**
   * It refers to a substitute string, and if there is an un substitute key-value pair, it is inferred as `never`.
   */
  export type Replaced<T extends string> = Includes<T, `\${${string}}`> extends true ? never : T;

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
   * type Answer = StringType.At<'abcdefg', 2>; // c
   * ```
   */
  export type At<Container extends string, Index extends number> = ArrayType.At<Split<Container>, Index>;

  export type Length<T extends string> = ArrayType.Length<Split<T>>;
}
