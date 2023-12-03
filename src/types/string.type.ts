import { Sub } from "./number.type";

export type ToStringTuple<T> = T extends string[] ? T : never;

export type ToString<T> = T extends string
    ? T
    : T extends number
    ? `${T}`
    : never;

export type Join<T extends string[], U extends string | number> = T extends [
    infer F,
    ...infer Rest
]
    ? Rest extends []
        ? F
        : `${ToString<F>}${U}${Join<ToStringTuple<Rest>, U>}`
    : "";

export type IsAlphabet<T extends string> = Uppercase<T> extends Lowercase<T>
    ? Lowercase<T> extends Uppercase<T>
        ? true
        : false
    : false;

export type IsUpperCase<T extends string> = Uppercase<T> extends T
    ? true
    : false;

export type IsLowerCase<T extends string> = Lowercase<T> extends T
    ? true
    : false;

/**
 * Means to repeat T string N times
 */
export type Repeat<T extends string, N extends number> = N extends 0
    ? ""
    : `${T}${Repeat<T, Sub<N, 1>>}`;

export type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
> = From extends ""
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

export type StringIncludes<
    T extends string,
    P extends string
> = T extends `${string}${P}${string}` ? true : false;

/**
 * It refers to a substitute string, and if there is an un substitute key-value pair, it is inferred as `never`.
 */
export type Replaced<T extends string> = StringIncludes<
    T,
    `\${${string}}`
> extends true
    ? never
    : T;

/**
 * StartsWith<'abc', 'a'> // true
 */
export type StartsWith<
    T extends string,
    U extends string
> = T extends `${U}${string}` ? true : false;

/**
 * EndsWith<'abc', 'c'> // true
 */
export type EndsWith<
    T extends string,
    U extends string
> = T extends `${string}${U}` ? true : false;

/**
 * 글자를 분리하여 튜플로 변경하는 타입
 *
 * Split<"abcdefg"> // ["a", "b", "c", "d", "e", "f", "g"]
 */
export type Split<T extends string> = T extends `${infer F}${infer Rest}`
    ? [F, ...Split<Rest>]
    : [];
