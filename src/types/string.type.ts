import { Conditional } from './arithmetic.type';
import { ArrayType, NTuple } from './array.type';
import { ErrorType } from './error.type';
import { NumberType } from './number.type';
import { Equal } from './object.type';

export namespace StringType {
  export type Blank = ' ' | '\n' | '\t';

  export type ToNumber<T extends string> = T extends NumberType.NumberString<infer R> ? R : never;

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

  export type Substring<T extends string, Start extends number, End extends number | never> = ArrayType.Join<
    ArrayType.Slice<Split<T, ''>, Start, End>,
    ''
  >;

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
  export type Includes<Conatiner extends string, SearchString extends string, Position extends number = 0> = ThrowLeft<
    Conatiner,
    Position
  > extends `${string}${SearchString}${string}`
    ? true
    : false;

  /**
   * It refers to a substitute string, and if there is an un substitute key-value pair, it is inferred as `never`.
   */
  export type Replaced<T extends string> = Includes<T, `\${${string}}`> extends true ? never : T;

  /**
   * StartsWith<'abc', 'a'> // true
   */
  export type StartsWith<T extends string, SearchString extends string, Position extends number> = ThrowLeft<
    T,
    Position
  > extends `${SearchString}${string}`
    ? true
    : false;

  /**
   * EndsWith<'abc', 'c'> // true
   */
  export type EndsWith<T extends string, SearchString extends string, EndPosition extends number> = ThrowRight<
    T,
    NumberType.Sub<Length<T>, EndPosition>
  > extends `${string}${SearchString}`
    ? true
    : false;

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
  export type Split<
    Conatiner extends string,
    Splitter extends string = '',
    Limit extends number = ArrayType.Length<_Split<Conatiner, Splitter>>,
  > = Conditional<Limit extends 0 ? true : false, [], ArrayType.Take<_Split<Conatiner, Splitter>, Limit>>;

  export type SplitIfIncludes<Container extends string, Splitter extends readonly string[] = []> = Container extends ''
    ? []
    : Container extends `${infer FirstWord}${infer SecondWord extends ArrayType.Values<Splitter>}${infer Rest}`
      ? [FirstWord, ...SplitIfIncludes<Rest, Splitter>]
      : [Container];

  /**
   * Type of getting one character from that location with index as the key value in the string
   *
   * @example
   * ```ts
   * type Answer = StringType.At<'abcdefg', 2>; // c
   * ```
   */
  export type At<Container extends string, Index extends number> = ArrayType.At<Split<Container>, Index>;

  export type Length<T extends string> = ArrayType.Includes<Split<T>, string> extends true
    ? number
    : ArrayType.Length<Split<T>>;

  export type IsInt<T extends number> = Includes<`${T}`, '.'> extends true ? ErrorType.IS_NOT_INT_FORMAT : T;

  export type InsertedInteger<T extends number> = Includes<`${T}`, '.'> extends true ? Split<`${T}`, '.'>[0] : '';
  export type InsertedFractional<T extends number> = Includes<`${T}`, '.'> extends true ? Split<`${T}`, '.'>[1] : '';

  export type IsDecimal<
    T extends number,
    Integer extends number,
    Fractional extends number,
  > = InsertedInteger<T> extends `${number}`
    ? NumberType.Compare<Length<InsertedInteger<T>>, '=', Integer> extends true
      ? InsertedFractional<T> extends `${number}`
        ? NumberType.Compare<Length<InsertedFractional<T>>, '=', Fractional> extends true
          ? T
          : `INSERTED FRACTIONAL DOES NOT EQUAL. : ${InsertedFractional<T>}`
        : `INSERTED FRACTIONAL IS NOT NUMBER FORMAT. : ${InsertedFractional<T>}`
      : `INSERTED INTEGER DOES NOT EQUAL. : ${InsertedInteger<T>}`
    : `INSERTED INTEGER IS NOT NUMBER FORMAT. : ${InsertedInteger<T>}`;

  export type PadEnd<
    Container extends string,
    TargetLength extends number,
    PadString extends string = ' ',
  > = NumberType.Compare<Length<Container>, '>=', TargetLength> extends true
    ? Container
    : NumberType.Compare<NumberType.Add<Length<Container>, Length<PadString>>, '<', TargetLength> extends true
      ? PadEnd<`${Container}${PadString}`, TargetLength, PadString>
      : `${Container}${ArrayType.Join<
          ArrayType.Take<Split<PadString>, NumberType.Sub<TargetLength, Length<Container>>>,
          ''
        >}`;

  export type PadStart<
    Container extends string,
    TargetLength extends number,
    PadString extends string = ' ',
  > = NumberType.Compare<Length<Container>, '>=', TargetLength> extends true
    ? Container
    : NumberType.Compare<NumberType.Add<Length<Container>, Length<PadString>>, '<', TargetLength> extends true
      ? PadStart<`${PadString}${Container}`, TargetLength, PadString>
      : `${ArrayType.Join<
          ArrayType.Take<Split<PadString>, NumberType.Sub<TargetLength, Length<Container>>>,
          ''
        >}${Container}`;

  export type Take<T extends string, P extends number> = ArrayType.Join<Split<T, '', P>, ''>;
  export type ThrowRight<T extends string, P extends number> = ArrayType.Join<
    Split<T, '', NumberType.Sub<StringType.Length<T>, P>>,
    ''
  >;

  export type Reverse<T extends string> = ArrayType.Join<ArrayType.Reverse<Split<T>>, ''>;
  export type ThrowLeft<T extends string, P extends number> = Reverse<
    ArrayType.Join<Split<Reverse<T>, '', NumberType.Sub<StringType.Length<T>, P>>, ''>
  >;

  type _IndexOf<
    Container extends string,
    SearchString extends string,
    Stack extends string[] = [],
  > = Container extends `${SearchString}${string}`
    ? ArrayType.Length<Stack>
    : Container extends `${infer FirstLetter}${infer Rest}`
      ? _IndexOf<Rest, SearchString, ArrayType.Push<Stack, FirstLetter>>
      : -1;

  export type IndexOf<Container extends string, SearchString extends string, Position extends number = 0> = _IndexOf<
    StringType.ThrowLeft<Container, Position>,
    SearchString,
    Position extends 0 ? [] : NTuple<Position>
  >;

  export type Slice<Container extends string, Start extends number, End extends number> = ArrayType.Join<
    ArrayType.Slice<Split<Container, ''>, Start, End>,
    ''
  >;
}
