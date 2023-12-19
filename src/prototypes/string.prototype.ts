import { ArrayType, StringType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';

export const StringPrototype = {
  /**
   * Removes the leading white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trimStart<Conatiner extends string>(container: Conatiner): StringType.TrimStart<Conatiner> {
    return container.trimStart() as StringType.TrimStart<Conatiner>;
  },

  /**
   * Removes the trailing white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trimEnd<Conatiner extends string>(container: Conatiner): StringType.TrimEnd<Conatiner> {
    return container.trimEnd() as StringType.TrimEnd<Conatiner>;
  },

  /**
   * Removes the leading and trailing white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trim<Conatiner extends string>(container: Conatiner): StringType.Trim<Conatiner> {
    return container.trim() as StringType.Trim<Conatiner>;
  },

  /**
   * Returns a string that contains the concatenation of two or more strings.
   * @param strings The strings to append to the end of the string.
   */
  concat<Container extends string, Strings extends ReadonlyOrNot<string[]>>(
    container: Container,
    ...strings: Strings
  ): ArrayType.Join<[Container, ...Strings], ''> {
    return [container, ...strings].join('') as ArrayType.Join<[Container, ...Strings], ''>;
  },

  /**
   * Returns a new String consisting of the single UTF-16 code unit located at the specified index.
   * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
   */
  at<Container extends string, Index extends number>(
    container: Container,
    index: Index,
  ): StringType.At<Container, Index> {
    return container.at(index) as StringType.At<Container, Index>;
  },

  /**
   * type-safe split.
   * @example StringPrototype.split('abcde', 'c', 1) // ['ab']
   *
   * @param container original string value.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   *
   * @todo support `RegExp` as splitter
   */
  split<Container extends string, Splitter extends string = '', Limit extends number = 0>(
    container: Container,
    splitter: Splitter,
    limit?: Limit,
  ): StringType.Split<Container, Splitter, Limit> {
    return container.split(splitter, limit) as StringType.Split<Container, Splitter, Limit>;
  },
};
